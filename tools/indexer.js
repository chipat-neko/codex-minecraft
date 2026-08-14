/* ============================================================
   Construit assets/index-global.js : un index compact de TOUTES
   les entrées du site, pour la recherche globale.

   Usage : node tools/indexer.js
   À relancer après tout ajout de contenu.
   ============================================================ */

const fs = require('fs');
const path = require('path');
const RACINE = path.resolve(__dirname, '..');
const A = f => path.join(RACINE, 'assets', f);

/* environnement navigateur minimal */
global.document = {
  createElement: () => ({ classList: { add() {} }, dataset: {}, style: {}, appendChild() {}, set innerHTML(v) {}, get innerHTML() { return ''; } }),
  addEventListener() {}, querySelector: () => null, querySelectorAll: () => [],
  getElementById: () => null,
  documentElement: { setAttribute() {}, removeAttribute() {} },
  body: { classList: { add() {}, remove() {} } }
};
global.location = { pathname: '/', hash: '' };
global.window = global;
global.localStorage = { getItem: () => null, setItem() {} };

/* eval INDIRECT : les `var` des fichiers deviennent des globales,
   ce qui permet de les retrouver ensuite par leur nom. */
const chargerGlobal = (0, eval);
for (const f of ['couleurs.js', 'core.js', ...fs.readdirSync(path.join(RACINE, 'assets')).filter(x => x.startsWith('data-'))]) {
  chargerGlobal(fs.readFileSync(A(f), 'utf8'));
}

const dispo = n => typeof global[n] !== 'undefined' ? global[n] : null;

/* page, libellé de catégorie, liste, et si les entrées ont une ancre */
const SOURCES = [
  ['mecaniques.html', 'Mécanique', dispo('MECANIQUES_JEU'), false],
  ['drops.html', 'Drops', dispo('DROPS'), false],
  ['craft.html', 'Recette', dispo('RECETTES'), false],
  ['potions.html', 'Potion', dispo('POTIONS'), false],
  ['enchantements.html', 'Enchantement', dispo('ENCHANTS'), false],
  ['redstone.html', 'Composant', dispo('COMPOSANTS'), false],
  ['redstone.html', 'Circuit', dispo('CIRCUITS'), true],
  ['villageois.html', 'Métier', dispo('METIERS'), false],
  ['biomes.html', 'Biome', dispo('BIOMES'), false],
  ['structures.html', 'Structure', dispo('STRUCTURES_DETAIL'), false],
  ['succes.html', 'Succès', dispo('ADVANCEMENTS'), false],
  ['blocs.html', 'Bloc', dispo('FAMILLES_BLOCS'), false],
  ['deco.html', 'Déco', dispo('DECO'), false],
  ['plans.html', 'Plan', dispo('PLANS'), true],
  ['usines.html', 'Usine', dispo('USINES'), true]
];

const index = [];
for (const [page, cat, liste, ancre] of SOURCES) {
  if (!liste) { console.log('  ⚠ jeu de données absent pour', cat); continue; }
  for (const e of liste) {
    const desc = e.desc || e.ou || (e.drops && e.drops[0]) || '';
    index.push({
      n: e.nom,
      c: cat,
      p: page,
      ...(ancre && e.id ? { a: e.id } : {}),
      ...(desc ? { d: String(desc).replace(/\s+/g, ' ').slice(0, 140) } : {})
    });
  }
}

fs.writeFileSync(A('index-global.js'),
  '/* Index de recherche globale — généré par tools/indexer.js.\n' +
  '   Ne pas modifier à la main : relancez le script après tout ajout. */\n' +
  'var INDEX_GLOBAL = ' + JSON.stringify(index) + ';\n', 'utf8');

const parCat = {};
index.forEach(e => { parCat[e.c] = (parCat[e.c] || 0) + 1; });
console.log(`✅ ${index.length} entrées indexées dans assets/index-global.js`);
console.log('  ' + Object.entries(parCat).map(([k, v]) => `${k} ${v}`).join(' · '));
console.log(`  poids : ${(fs.statSync(A('index-global.js')).size / 1024).toFixed(0)} Ko`);
