/* ============================================================
   Met toutes les couches d'une construction à la même taille.

   Le rendu recentre chaque couche dans le cadre commun, avec un
   décalage de floor((max − taille) / 2) sur les deux axes. C'est
   pratique à la saisie, mais invisible et arbitraire : un toit plus
   petit que l'emprise se retrouve centré, donc parfois à côté du
   bâtiment ; une échelle ou une flèche de clocher glisse d'un niveau
   à l'autre sans qu'on s'en aperçoive. Trois plans en ont souffert.

   Cet outil rend le placement explicite : chaque grille est étendue
   à la taille du cadre, l'air comblant le pourtour, exactement à la
   position que le rendu lui donnait. Le dessin est donc rigoureusement
   inchangé — mais il devient modifiable, et le décalage cesse d'exister.

   Usage :  node tools/normaliser-couches.js [--essai]
   ============================================================ */

const fs = require('fs');
const path = require('path');

const RACINE = path.resolve(__dirname, '..');
const A = path.join(RACINE, 'assets');
const FICHIERS = ['data-plans.js', 'data-usines.js', 'data-redstone.js'];
const ESSAI = process.argv.includes('--essai');

/* ---- chargement du site, pour réutiliser ses propres règles ---- */
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
charger(fs.readFileSync(path.join(A, 'couleurs.js'), 'utf8'));
charger(fs.readFileSync(path.join(A, 'core.js'), 'utf8'));
for (const f of FICHIERS) { charger(fs.readFileSync(path.join(A, f), 'utf8')); }

const TOUT = [].concat(global.PLANS || [], global.USINES || [], global.CIRCUITS || []);

/* ---- la transformation ---- */

/* Étend une grille au cadre, à la position que lui donnait le rendu. */
function etendre(couche, cadre) {
  const o = decalage(couche, cadre);
  const lignes = [];
  for (let Z = 0; Z < cadre.maxD; Z++) {
    let ligne = '';
    for (let X = 0; X < cadre.maxW; X++) {
      const ch = caseDe(couche, o, X, Z);
      ligne += (ch === ' ' ? '.' : ch);
    }
    lignes.push(ligne);
  }
  return lignes;
}

/* Ce qu'il faut changer, fiche par fiche. */
const aFaire = {};
for (const p of TOUT) {
  const cy = couchesY(p);
  if (cy.length < 2) { continue; }
  const cadre = cadreCommun(cy);
  const bouge = cy.some(c => {
    const o = decalage(c, cadre);
    return o.x || o.z || c.g.length !== cadre.maxD ||
      c.g.some(l => l.length !== cadre.maxW);
  });
  if (!bouge) { continue; }
  aFaire[p.id] = new Map(cy.map(c => [c, etendre(c, cadre)]));
}

const ids = Object.keys(aFaire);
if (!ids.length) { console.log('Rien à faire : toutes les couches sont déjà au format du cadre.'); process.exit(0); }
console.log(`${ids.length} construction(s) à normaliser :\n  ${ids.join(' · ')}\n`);

/* ---- contrôle de non-régression : le dessin doit être identique ---- */
function empreinte(p) {
  const cy = couchesY(p);
  return JSON.stringify({
    iso: isoPossible(p) ? renderIso(p) : null,
    face: elevationLignes(cy),
    coupes: Array.from({ length: profondeurPlan(p) }, (_, z) => coupeLignes(cy, z)),
    rangees: rangeesY(cy)
  });
}
const avant = {};
for (const id of ids) { avant[id] = empreinte(TOUT.find(p => p.id === id)); }

/* on applique en mémoire, puis on recompare */
for (const id of ids) {
  for (const [couche, lignes] of aFaire[id]) { couche.g = lignes; }
}
let ecarts = 0;
for (const id of ids) {
  if (empreinte(TOUT.find(p => p.id === id)) !== avant[id]) {
    console.log(`  ✗ ${id} : le dessin change — normalisation refusée`);
    ecarts++;
  }
}
if (ecarts) {
  console.log(`\n❌ ${ecarts} construction(s) rendraient différemment. Rien n'a été écrit.`);
  process.exit(1);
}
console.log('Dessin identique avant/après sur toutes les constructions.');
if (ESSAI) { console.log('\n(--essai : aucun fichier modifié)'); process.exit(0); }

/* ---- écriture ---- */
function lit(s) {
  return "'" + String(s).replace(/\\/g, '\\\\').replace(/'/g, "\\'") + "'";
}

/* Remplace le tableau `g:` d'une couche, repérée par son titre DANS la
   fiche indiquée. Chercher le titre seul ne suffit pas : plusieurs
   constructions partagent des intitulés mot pour mot — la tour à mobs
   et la ferme à creepers ont dix couches homonymes — et le premier
   remplacement irait alors écraser la mauvaise fiche. */
function remplacer(src, id, titre, lignes) {
  const iFiche = src.indexOf("id: '" + id + "'");
  if (iFiche < 0) { return null; }
  const cible = 't: ' + lit(titre);
  const iTitre = src.indexOf(cible, iFiche);
  if (iTitre < 0) { return null; }
  /* le titre doit appartenir à cette fiche, pas à la suivante */
  const iSuivante = src.indexOf("\n    id: '", iFiche + 1);
  if (iSuivante >= 0 && iTitre > iSuivante) { return null; }
  const iG = src.indexOf('g: [', iTitre);
  if (iG < 0) { return null; }
  let i = iG + 'g: ['.length, niveau = 1, texte = null;
  while (i < src.length && niveau > 0) {
    const c = src[i];
    if (texte) {
      if (c === '\\') { i += 2; continue; }
      if (c === texte) { texte = null; }
    } else if (c === "'" || c === '"') { texte = c; }
    else if (c === '[') { niveau++; }
    else if (c === ']') { niveau--; }
    i++;
  }
  if (niveau !== 0) { return null; }

  const debutLigne = src.lastIndexOf('\n', iG) + 1;
  const marge = src.slice(debutLigne, iG).match(/^\s*/)[0];
  const corps = lignes.map(l => marge + '  ' + lit(l)).join(',\n');
  return src.slice(0, iG) + 'g: [\n' + corps + '\n' + marge + ']' + src.slice(i);
}

let posees = 0, ratees = [];
for (const nom of FICHIERS) {
  const chemin = path.join(A, nom);
  let src = fs.readFileSync(chemin, 'utf8');
  for (const id of ids) {
    const p = TOUT.find(x => x.id === id);
    if (!src.includes("id: '" + id + "'")) { continue; }
    for (const [couche, lignes] of aFaire[id]) {
      const suivant = remplacer(src, id, couche.t, lignes);
      if (suivant === null) { ratees.push(id + ' / ' + couche.t); continue; }
      src = suivant;
      posees++;
    }
  }
  fs.writeFileSync(chemin, src, 'utf8');
}
console.log(`\n${posees} couche(s) mises au format du cadre`);
if (ratees.length) {
  console.log(`${ratees.length} non trouvée(s) :\n  ` + ratees.join('\n  '));
  process.exit(1);
}

/* ---- relecture depuis le disque ----

   Le contrôle plus haut portait sur des objets en mémoire ; celui-ci
   porte sur ce qui a réellement été écrit. C'est ce qui manquait la
   première fois : une écriture mal ciblée avait remplacé les couches
   d'une construction homonyme sans que rien ne le signale. */
const apres = { PLANS: 0, USINES: 0, CIRCUITS: 0 };
for (const k in apres) { delete global[k]; }
for (const f of FICHIERS) { charger(fs.readFileSync(path.join(A, f), 'utf8')); }
const RELU = [].concat(global.PLANS || [], global.USINES || [], global.CIRCUITS || []);

let regressions = 0;
for (const p of RELU) {
  const attendu = avant[p.id];
  if (attendu === undefined) { continue; }
  if (empreinte(p) !== attendu) {
    console.log(`  ✗ ${p.id} : le dessin relu depuis le disque diffère`);
    regressions++;
  }
}
/* et aucune construction ne doit avoir bougé sans avoir été visée */
for (const p of RELU) {
  const cy = couchesY(p);
  if (cy.length < 2 || avant[p.id] !== undefined) { continue; }
  const cadre = cadreCommun(cy);
  const bouge = cy.some(c => c.g.length !== cadre.maxD || c.g.some(l => l.length !== cadre.maxW));
  if (bouge && !aFaire[p.id]) {
    console.log(`  ✗ ${p.id} : modifiée alors qu'elle n'était pas visée`);
    regressions++;
  }
}
if (regressions) {
  console.log(`\n❌ ${regressions} régression(s) après écriture — annulez avec « git checkout assets/ »`);
  process.exit(1);
}
console.log('✅ relecture depuis le disque : dessin inchangé partout');
