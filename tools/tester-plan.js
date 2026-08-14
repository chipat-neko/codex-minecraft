/* ============================================================
   Pose un plan du guide dans un vrai serveur et regarde ce qui tient.

   Le principe est simple et c'est ce qui le rend probant : on pose
   chaque bloc du plan, du bas vers le haut, puis on relit chaque
   position. Un bloc qui n'y est plus n'a pas tenu — une lanterne
   posée sur une lanterne, une échelle sans mur derrière, une porte
   sans support. Aucune connaissance du jeu n'est requise de ma part :
   c'est le serveur qui tranche.

   Usage :
     node tools/tester-plan.js <id> [<id>…]
     node tools/tester-plan.js --tous
     node tools/tester-plan.js --usines
   ============================================================ */

const fs = require('fs');
const path = require('path');
const banc = require('./banc.js');
const { identifiant, racine, EXIGE_APPUI } = require('./blocs-jeu.js');

/* ---- chargement du site ---- */
const charger = (0, eval);
global.window = global;
const inerte = () => ({ classList: { add() {}, remove() {}, toggle() {} }, dataset: {},
  style: {}, innerHTML: '', appendChild() {}, querySelector: () => null, closest: () => null });
global.document = { addEventListener() {}, querySelector: () => null, querySelectorAll: () => [],
  getElementById: () => null, createElement: inerte,
  documentElement: { setAttribute() {}, removeAttribute() {} },
  body: { classList: { add() {}, remove() {} } } };
global.location = { pathname: '/', hash: '' };
global.localStorage = { getItem: () => null, setItem() {} };

const A = path.resolve(__dirname, '..', 'assets');
charger(fs.readFileSync(path.join(A, 'couleurs.js'), 'utf8'));
charger(fs.readFileSync(path.join(A, 'core.js'), 'utf8'));
for (const f of ['data-plans.js', 'data-usines.js', 'data-redstone.js']) {
  charger(fs.readFileSync(path.join(A, f), 'utf8'));
}
const TOUT = [].concat(global.PLANS || [], global.USINES || [], global.CIRCUITS || []);

/* Le monde plat de test : bedrock, pierre, pierre, terre.
   On bâtit sur la terre, au niveau -60. */
const SOL = -60;

/* ---- pose et relecture ---- */

async function testerPlan(p) {
  const couches = global.couchesY(p);
  if (couches.length < 2) { return null; }
  const cadre = global.cadreCommun(couches);
  const rangees = global.rangeesY(couches);
  const bas = rangees[rangees.length - 1].y;

  /* terrain propre, avec de la marge autour */
  const x0 = 0, z0 = 0;
  await banc.nettoyer(x0 - 2, SOL, z0 - 2, x0 + cadre.maxW + 2, SOL + rangees.length + 4, z0 + cadre.maxD + 2);
  await banc.cmd(`fill ${x0 - 2} ${SOL - 1} ${z0 - 2} ${x0 + cadre.maxW + 2} ${SOL - 1} ${z0 + cadre.maxD + 2} minecraft:dirt`, 60000);

  /* on pose du bas vers le haut : un bloc a besoin de son support */
  const poses = [];
  for (let i = rangees.length - 1; i >= 0; i--) {
    const r = rangees[i];
    if (r.L === null) { continue; }
    const g = couches[r.L].g;
    const y = SOL + (r.y - bas);
    /* la couche du dessous, pour les caractères qui changent de bloc
       selon ce qu'ils surmontent (une gerbe de blé, pas une botte de
       foin, quand c'est de la terre labourée) */
    const dessous = (i + 1 < rangees.length && rangees[i + 1].L !== null)
      ? couches[rangees[i + 1].L].g : null;

    for (let z = 0; z < g.length; z++) {
      for (let x = 0; x < g[z].length; x++) {
        const ch = g[z][x];
        const sous = dessous && dessous[z] ? identifiant(dessous[z][x]) : null;
        const id = identifiant(ch, sous);
        if (!id || id === 'air') { continue; }
        poses.push({ ch, id, x: x0 + x, y, z: z0 + z, yPlan: r.y });
      }
    }
  }

  /* Une porte occupe deux blocs : sa moitié basse et sa moitié haute.
     Le schéma marque simplement « il y a une porte ici » sur chaque
     niveau qu'elle traverse. On apparie donc les niveaux consécutifs,
     faute de quoi on poserait des moitiés basses empilées, qui ne
     tiennent pas — et on accuserait le plan d'un défaut de l'outil.
     Un nombre IMPAIR de niveaux reste un vrai défaut : la porte
     dépasse ou il en manque une moitié. */
  const DEUX_MOITIES = /^(oak_door|iron_door)/;
  const colonnes = {};
  for (const b of poses) {
    if (!DEUX_MOITIES.test(racine(b.id))) { continue; }
    (colonnes[b.x + ',' + b.z + ',' + racine(b.id)] = colonnes[b.x + ',' + b.z + ',' + racine(b.id)] || []).push(b);
  }
  const impairs = [];
  for (const k in colonnes) {
    const pile = colonnes[k].sort((a, b) => a.y - b.y);
    /* on découpe en tronçons de niveaux qui se suivent */
    let debut = 0;
    for (let i = 1; i <= pile.length; i++) {
      if (i === pile.length || pile[i].y !== pile[i - 1].y + 1) {
        const tronçon = pile.slice(debut, i);
        for (let j = 0; j < tronçon.length; j++) {
          tronçon[j].id = racine(tronçon[j].id) + (j % 2 === 0 ? '[half=lower]' : '[half=upper]');
        }
        if (tronçon.length % 2 !== 0) { impairs.push(tronçon[tronçon.length - 1]); }
        debut = i;
      }
    }
  }

  /* pose en lots : une commande par bloc, mais sans attendre chacune */
  for (const b of poses) {
    banc.brut(`setblock ${b.x} ${b.y} ${b.z} minecraft:${b.id} replace`);
  }
  await banc.cmd('time set noon', 120000);   /* barrière : vide la file */

  /* Relecture : le serveur signale lui-même les positions vides.
     Attendre la réponse de chaque bloc coûterait des dizaines de
     minutes sur l'ensemble du catalogue ; on envoie donc tout, puis
     on lit d'un coup ce que la console a écrit. */
  const debutJournal = banc.journal.length;
  for (const b of poses) {
    banc.brut(`execute unless block ${b.x} ${b.y} ${b.z} minecraft:${racine(b.id)} ` +
      `run say ABSENT ${b.x} ${b.y} ${b.z}`);
  }
  await banc.cmd('time set noon', 300000);   /* barrière : vide la file */

  const releve = depuis => {
    const s = new Set();
    for (let i = depuis; i < banc.journal.length; i++) {
      const m = /ABSENT (-?\d+) (-?\d+) (-?\d+)/.exec(banc.journal[i]);
      if (m) { s.add(m[1] + ',' + m[2] + ',' + m[3]); }
    }
    return s;
  };
  let manquants = poses.filter(b => releve(debutJournal).has(b.x + ',' + b.y + ',' + b.z));

  /* Seconde passe. Certains blocs refusent d'abord puis acceptent : le
     blé exige une luminosité d'au moins 8 (CropBlock.hasSufficientLight)
     et le moteur d'éclairage travaille en tâche de fond, si bien qu'un
     plant posé trop tôt tombe dans le noir d'un chunk encore sombre.
     Rejouer les manquants distingue ce qui ne tient pas de ce qui n'a
     pas pu être posé au moment où on l'a tenté. */
  if (manquants.length) {
    for (const b of manquants) {
      banc.brut(`setblock ${b.x} ${b.y} ${b.z} minecraft:${b.id} replace`);
    }
    await banc.cmd('time set noon', 120000);
    const seconde = banc.journal.length;
    for (const b of manquants) {
      banc.brut(`execute unless block ${b.x} ${b.y} ${b.z} minecraft:${racine(b.id)} ` +
        `run say ABSENT ${b.x} ${b.y} ${b.z}`);
    }
    await banc.cmd('time set noon', 120000);
    const encore = releve(seconde);
    manquants = manquants.filter(b => encore.has(b.x + ',' + b.y + ',' + b.z));
  }
  const absents = manquants;

  /* Savoir qu'un bloc manque ne dit pas pourquoi. On demande donc au
     serveur ce qu'il y a à la place : de l'air (le bloc n'a pas tenu),
     ou un autre bloc (quelque chose l'a remplacé). */
  for (const b of absents.slice(0, 12)) {
    const r = await banc.cmd(`execute if block ${b.x} ${b.y} ${b.z} minecraft:air run say VIDE`);
    b.remplace = r.some(l => /VIDE/.test(l)) ? 'air' : '?';
    if (b.remplace === '?') {
      const d = await banc.cmd(`clone ${b.x} ${b.y} ${b.z} ${b.x} ${b.y} ${b.z} ${b.x} ${b.y} ${b.z}`);
      b.remplace = (d.join(' ').match(/[a-z_]+/g) || ['inconnu']).slice(-1)[0];
    }
  }
  return { plan: p, poses: poses.length, absents, cadre, rangees: rangees.length, impairs };
}

function rapporter(r) {
  const p = r.plan;
  console.log('\n### ' + p.nom + '  [' + p.id + ']');
  console.log('    ' + r.cadre.maxW + ' × ' + r.cadre.maxD + ' × ' + r.rangees +
    ' — ' + r.poses + ' blocs posés');
  let signales = 0;
  if (r.impairs && r.impairs.length) {
    console.log('    ⚠ ' + r.impairs.length + ' porte(s) sur un nombre impair de niveaux — ' +
      'une porte fait exactement 2 blocs de haut :');
    r.impairs.forEach(b => console.log('       Y+' + b.yPlan + ' en x=' + b.x + ' z=' + b.z));
    signales += r.impairs.length;
  }
  if (!r.absents.length) {
    if (!signales) { console.log('    ✅ tous les blocs tiennent'); }
    return signales;
  }

  /* on regroupe : un même défaut se répète souvent */
  const parBloc = {};
  for (const a of r.absents) {
    const k = racine(a.id);
    (parBloc[k] = parBloc[k] || []).push(a);
  }
  console.log('    ❌ ' + r.absents.length + ' bloc(s) n\'ont pas tenu :');
  for (const k in parBloc) {
    const l = parBloc[k];
    const ex = l[0];
    console.log('       ' + k + ' × ' + l.length +
      '  (ex. Y+' + ex.yPlan + ' en x=' + ex.x + ' z=' + ex.z +
      (ex.remplace ? ', on y trouve ' + ex.remplace : '') + ')' +
      (EXIGE_APPUI[k] ? '  — demande ' + EXIGE_APPUI[k] : ''));
  }
  return signales + r.absents.length;
}

/* ---- entrée ---- */
(async () => {
  let cibles = process.argv.slice(2);
  if (cibles.includes('--tous')) { cibles = TOUT.filter(p => global.couchesY(p).length >= 2).map(p => p.id); }
  else if (cibles.includes('--usines')) { cibles = (global.USINES || []).filter(p => global.couchesY(p).length >= 2).map(p => p.id); }
  else if (cibles.includes('--plans')) { cibles = (global.PLANS || []).filter(p => global.couchesY(p).length >= 2).map(p => p.id); }
  if (!cibles.length) {
    console.log('Usage : node tools/tester-plan.js <id>… | --tous | --plans | --usines');
    process.exit(2);
  }

  console.log('démarrage du serveur…');
  await banc.demarrer({ zone: '-4 -4 260 260' });
  console.log('prêt.\n');

  let total = 0, testes = 0;
  try {
    for (const id of cibles) {
      const p = TOUT.find(x => x.id === id);
      if (!p) { console.log('« ' + id + ' » introuvable'); continue; }
      const r = await testerPlan(p);
      if (!r) { console.log('« ' + id + ' » : moins de deux niveaux, rien à empiler'); continue; }
      total += rapporter(r);
      testes++;
    }
  } finally {
    await banc.arreter();
  }
  console.log('\n' + '─'.repeat(56));
  console.log(testes + ' construction(s) testées dans le jeu, ' + total + ' bloc(s) qui ne tiennent pas');
  process.exit(total ? 1 : 0);
})().catch(e => { console.error('ÉCHEC : ' + e.message); banc.arreter().finally(() => process.exit(1)); });
