/* ============================================================
   Fait tourner une usine dans un vrai serveur et compte ce qu'elle
   produit.

   tester-plan.js vérifie que les blocs tiennent. C'est nécessaire mais
   loin d'être suffisant : une fonderie dont tous les blocs tiennent ne
   fond rien si un entonnoir pointe du mauvais côté. Or un plan vu de
   dessus ne dit pas les orientations — c'est précisément ce qu'un
   essai révèle.

   Chaque usine a donc ici son protocole : ce qu'on pose, comment on
   l'oriente, ce qu'on met en entrée, combien de temps on laisse
   tourner, et ce qu'on doit trouver à l'arrivée.

   Usage :  node tools/tester-usine.js [<id>…]
   ============================================================ */

const banc = require('./banc.js');

const SOL = -60;

/* Attente réelle : le serveur doit avancer de N ticks de jeu.
   On le laisse tourner et on interroge le temps écoulé. */
async function patienter(secondes, etiquette) {
  const t0 = Date.now();
  const fin = t0 + secondes * 1000;
  let dernier = 0;
  while (Date.now() < fin) {
    await banc.cmd('time query gametime', 30000);
    const passe = Math.floor((Date.now() - t0) / 1000);
    if (passe >= dernier + 15) { dernier = passe; process.stdout.write('    … ' + passe + ' s\n'); }
  }
  console.log('    ' + (etiquette || 'on laisse tourner') + ' : ' + secondes + ' s écoulées');
}

/* Contenu d'un conteneur : [{ id, nb }] */
async function contenu(x, y, z) {
  const r = await banc.cmd(`data get block ${x} ${y} ${z} Items`);
  const t = r.join(' ');
  const out = [];
  const re = /id:\s*"?minecraft:([a-z_]+)"?[^}]*?count:\s*(\d+)|count:\s*(\d+)[^}]*?id:\s*"?minecraft:([a-z_]+)"?/g;
  let m;
  while ((m = re.exec(t)) !== null) {
    out.push({ id: m[1] || m[4], nb: parseInt(m[2] || m[3], 10) });
  }
  return out;
}

function resume(items) {
  if (!items.length) { return 'vide'; }
  const par = {};
  items.forEach(i => { par[i.id] = (par[i.id] || 0) + i.nb; });
  return Object.entries(par).map(([k, v]) => v + ' × ' + k).join(', ');
}

/* ---- les protocoles ---- */

const ESSAIS = {

  /* La fonderie : trois entonnoirs aux rôles distincts. Le minerai
     descend par le haut, le carburant entre par le côté, le produit
     sort par le bas. Un entonnoir latéral ne remplit jamais
     l'emplacement du minerai : c'est tout l'enjeu de l'orientation. */
  'four-auto': async () => {
    const x = 4, z = 4;
    await banc.nettoyer(x - 3, SOL - 2, z - 3, x + 5, SOL + 8, z + 5);
    await banc.cmd(`fill ${x - 3} ${SOL - 1} ${z - 3} ${x + 5} ${SOL - 1} ${z + 5} minecraft:stone`);

    /* un module : coffre sortie, entonnoir bas, four, entonnoir latéral,
       coffre carburant, entonnoir haut, coffre entrée */
    await banc.cmd(`setblock ${x} ${SOL} ${z} minecraft:chest`);
    await banc.cmd(`setblock ${x} ${SOL + 1} ${z} minecraft:hopper[facing=down]`);
    await banc.cmd(`setblock ${x} ${SOL + 2} ${z} minecraft:furnace`);
    /* Le coffre de carburant se pose SUR l'entonnoir latéral, pas à
       côté : un entonnoir n'aspire que ce qui le surmonte. */
    await banc.cmd(`setblock ${x - 1} ${SOL + 2} ${z} minecraft:hopper[facing=east]`);
    await banc.cmd(`setblock ${x - 1} ${SOL + 3} ${z} minecraft:chest`);
    await banc.cmd(`setblock ${x} ${SOL + 3} ${z} minecraft:hopper[facing=down]`);
    await banc.cmd(`setblock ${x} ${SOL + 4} ${z} minecraft:chest`);

    await banc.cmd(`item replace block ${x} ${SOL + 4} ${z} container.0 with minecraft:raw_iron 16`);
    await banc.cmd(`item replace block ${x - 1} ${SOL + 3} ${z} container.0 with minecraft:coal 8`);

    console.log('    entrée : 16 minerais de fer bruts, 8 charbons');
    await patienter(75, 'le four fond');

    const sortie = await contenu(x, SOL, z);
    const entree = await contenu(x, SOL + 4, z);
    console.log('    coffre d\'entrée  : ' + resume(entree));
    console.log('    coffre de sortie : ' + resume(sortie));
    const fer = sortie.filter(i => i.id === 'iron_ingot').reduce((n, i) => n + i.nb, 0);
    return {
      ok: fer > 0,
      dit: fer + ' lingot(s) de fer dans le coffre de sortie',
      attendu: 'au moins un lingot : la chaîne minerai → four → sortie fonctionne'
    };
  },

  /* Le portail : une structure d'obsidienne s'allume-t-elle vraiment ?
     La fiche a été corrigée pour un passage de 3 × 3 ; on vérifie que
     le jeu crée bien les blocs de portail. */
  'portail': async () => {
    const x = 30, z = 4;
    await banc.nettoyer(x - 2, SOL, z - 2, x + 8, SOL + 10, z + 8);
    await banc.cmd(`fill ${x - 2} ${SOL - 1} ${z - 2} ${x + 8} ${SOL - 1} ${z + 8} minecraft:stone`);

    /* cadre : 5 de large, passage de 3 × 3, linteau au 5e rang */
    for (let i = 0; i < 5; i++) {
      await banc.cmd(`setblock ${x + i} ${SOL} ${z} minecraft:obsidian`);
      await banc.cmd(`setblock ${x + i} ${SOL + 4} ${z} minecraft:obsidian`);
    }
    for (let h = 1; h <= 3; h++) {
      await banc.cmd(`setblock ${x} ${SOL + h} ${z} minecraft:obsidian`);
      await banc.cmd(`setblock ${x + 4} ${SOL + h} ${z} minecraft:obsidian`);
    }
    /* on l'allume comme le ferait un briquet */
    await banc.cmd(`setblock ${x + 2} ${SOL + 1} ${z} minecraft:fire`);
    await patienter(5, 'le feu prend');

    const r = await banc.cmd(`execute if block ${x + 2} ${SOL + 2} ${z} minecraft:nether_portal run say ALLUME`);
    const allume = r.some(l => /ALLUME/.test(l));
    return {
      ok: allume,
      dit: allume ? 'le portail s\'est allumé' : 'le portail ne s\'est PAS allumé',
      attendu: 'un cadre de 5 × 5 avec un passage de 3 × 3 doit s\'allumer'
    };
  },

  /* La porte NON : le circuit le plus simple du guide, et celui dont
     tout le reste dérive. Une torche fixée sur un bloc alimenté
     s'éteint ; sur un bloc éteint, elle brille. On le vérifie dans
     les deux sens, faute de quoi on ne prouve rien. */
  'porte-non': async () => {
    const x = 50, z = 4;
    await banc.nettoyer(x - 2, SOL, z - 2, x + 6, SOL + 4, z + 6);
    await banc.cmd(`fill ${x - 2} ${SOL - 1} ${z - 2} ${x + 6} ${SOL - 1} ${z + 6} minecraft:stone`);

    /* La torche doit être FIXÉE sur le bloc, pas posée à côté : c'est
       ce contact qui l'éteint. Une torche murale tournée vers l'est
       s'accroche au bloc situé à son ouest.

       On change l'état du support plutôt que d'actionner un levier :
       un levier posé par commande ne propage pas toujours son signal,
       alors qu'un bloc de redstone est une source par nature. */
    await banc.cmd(`setblock ${x + 2} ${SOL} ${z} minecraft:stone`);
    await banc.cmd(`setblock ${x + 3} ${SOL} ${z} minecraft:redstone_wall_torch[facing=east]`);
    await patienter(3, 'le circuit se stabilise');

    const lireTorche = async () => {
      const r = await banc.cmd(`execute if block ${x + 3} ${SOL} ${z} minecraft:redstone_wall_torch[lit=true] run say ALLUMEE`);
      return r.some(l => /ALLUMEE/.test(l));
    };
    const eteint = await lireTorche();
    await banc.cmd(`setblock ${x + 2} ${SOL} ${z} minecraft:redstone_block`);
    await patienter(3, 'le support devient une source');
    const allume = await lireTorche();

    console.log('    support neutre → torche ' + (eteint ? 'allumée' : 'éteinte'));
    console.log('    support alimenté → torche ' + (allume ? 'allumée' : 'éteinte'));
    return {
      ok: eteint && !allume,
      dit: (eteint && !allume) ? 'la sortie est bien l\'inverse de l\'entrée'
        : 'la sortie ne s\'inverse pas',
      attendu: 'entrée éteinte → sortie allumée, et l\'inverse'
    };
  }
};

/* ---- entrée ---- */
(async () => {
  const cibles = process.argv.slice(2).filter(a => !a.startsWith('--'));
  const liste = cibles.length ? cibles : Object.keys(ESSAIS);

  console.log('démarrage du serveur…');
  await banc.demarrer({ zone: '-4 -4 60 60' });
  console.log('prêt.\n');

  let echecs = 0;
  try {
    for (const id of liste) {
      const essai = ESSAIS[id];
      if (!essai) { console.log('### ' + id + ' : aucun protocole d\'essai'); continue; }
      console.log('### ' + id);
      const r = await essai();
      console.log('    ' + (r.ok ? '✅ ' : '❌ ') + r.dit);
      if (!r.ok) { console.log('       attendu : ' + r.attendu); echecs++; }
      console.log('');
    }
  } finally {
    await banc.arreter();
  }
  console.log('─'.repeat(56));
  console.log(liste.length + ' essai(s), ' + echecs + ' échec(s)');
  process.exit(echecs ? 1 : 0);
})().catch(e => { console.error('ÉCHEC : ' + e.message); banc.arreter().finally(() => process.exit(1)); });
