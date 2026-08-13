/* ============================================================
   Validation complète du site.
   Usage : node tools/valider.js
   Sortie non nulle si une erreur est trouvée.
   ============================================================ */

const fs = require('fs');
const path = require('path');
const RACINE = path.resolve(__dirname, '..');
const A = f => path.join(RACINE, 'assets', f);

/* --- environnement navigateur minimal --- */
global.document = {
  createElement: () => ({
    _h: '', classList: { add() {} }, dataset: {}, style: {},
    get innerHTML() { return this._h; }, set innerHTML(v) { this._h = v; },
    appendChild() {}, set id(v) {}, querySelector: () => null
  }),
  addEventListener() {}, querySelector: () => null, querySelectorAll: () => [],
  getElementById: () => null,
  documentElement: { setAttribute() {}, removeAttribute() {} },
  body: { classList: { add() {}, remove() {} } }
};
global.location = { pathname: '/index.html', hash: '' };
global.window = global;
global.localStorage = { _d: {}, getItem(k) { return this._d[k] ?? null; }, setItem(k, v) { this._d[k] = String(v); } };

let errs = 0;
const err = m => { console.log('  ✗ ' + m); errs++; };

/* --- chargement des données --- */
const FICHIERS = fs.readdirSync(path.join(RACINE, 'assets'))
  .filter(f => f === 'couleurs.js' || f === 'core.js' || f.startsWith('data-'));
/* couleurs et core doivent venir en premier, dans cet ordre */
FICHIERS.sort((a, b) => {
  const rang = f => f === 'couleurs.js' ? 0 : f === 'core.js' ? 1 : 2;
  return rang(a) - rang(b) || a.localeCompare(b);
});
for (const f of FICHIERS) {
  try { eval(fs.readFileSync(A(f), 'utf8')); }
  catch (e) { err(`${f} : ne s'exécute pas — ${e.message}`); }
}

/* --- inventaire des jeux de données présents --- */
const FICHES = [];
const SCHEMAS = [];
const ajouteFiches = (nom, v) => { if (typeof v !== 'undefined') { FICHES.push([nom, v]); } };
const ajouteSchemas = (nom, v) => { if (typeof v !== 'undefined') { SCHEMAS.push([nom, v]); } };

ajouteFiches('DROPS', typeof DROPS !== 'undefined' ? DROPS : undefined);
ajouteFiches('POTIONS', typeof POTIONS !== 'undefined' ? POTIONS : undefined);
ajouteFiches('BIOMES', typeof BIOMES !== 'undefined' ? BIOMES : undefined);
ajouteFiches('ENCHANTS', typeof ENCHANTS !== 'undefined' ? ENCHANTS : undefined);
ajouteFiches('COMPOSANTS', typeof COMPOSANTS !== 'undefined' ? COMPOSANTS : undefined);
ajouteFiches('METIERS', typeof METIERS !== 'undefined' ? METIERS : undefined);
ajouteFiches('FAMILLES_BLOCS', typeof FAMILLES_BLOCS !== 'undefined' ? FAMILLES_BLOCS : undefined);
ajouteFiches('STRUCTURES_DETAIL', typeof STRUCTURES_DETAIL !== 'undefined' ? STRUCTURES_DETAIL : undefined);
ajouteFiches('ADVANCEMENTS', typeof ADVANCEMENTS !== 'undefined' ? ADVANCEMENTS : undefined);
ajouteSchemas('PLANS', typeof PLANS !== 'undefined' ? PLANS : undefined);
ajouteSchemas('USINES', typeof USINES !== 'undefined' ? USINES : undefined);
ajouteSchemas('CIRCUITS', typeof CIRCUITS !== 'undefined' ? CIRCUITS : undefined);

/* --- 1. recettes --- */
if (typeof RECETTES !== 'undefined') {
  for (const r of RECETTES) {
    for (const k in (r.legende || {})) { if (!ITEMS[r.legende[k]]) { err(`recette « ${r.nom} » : item inconnu "${r.legende[k]}"`); } }
    if (r.sortieItem && !ITEMS[r.sortieItem]) { err(`recette « ${r.nom} » : sortieItem inconnu`); }
    const rows = r.grille || [];
    if (!rows.length || rows.length > 3) { err(`recette « ${r.nom} » : ${rows.length} lignes`); }
    for (const l of rows) {
      if (l.length > 3) { err(`recette « ${r.nom} » : ligne "${l}" trop longue`); }
      for (const ch of l) { if (ch !== ' ' && !(r.legende || {})[ch]) { err(`recette « ${r.nom} » : "${ch}" hors légende`); } }
    }
  }
}

/* --- 2. schémas : grilles et identifiants --- */
const inconnus = new Set();
const ids = new Map();
for (const [nom, liste] of SCHEMAS) {
  for (const p of liste) {
    if (!p.id) { err(`${nom} : « ${p.nom} » sans id`); }
    else if (ids.has(p.id)) { err(`id dupliqué "${p.id}" entre ${ids.get(p.id)} et ${nom}`); }
    else { ids.set(p.id, nom); }
    for (const c of (p.couches || [])) {
      const w = c.g[0].length;
      c.g.forEach((l, i) => {
        if (l.length !== w) { err(`${nom} / ${p.id} / ${c.t} : ligne ${i + 1} fait ${l.length} au lieu de ${w}`); }
        for (const ch of l) { if (!BLOCKS[ch]) { inconnus.add(`${ch} (${p.id})`); } }
      });
    }
  }
}

/* --- 3. fiches --- */
for (const [nom, liste] of FICHES) {
  for (const d of liste) {
    if (!d.nom) { err(`${nom} : entrée sans nom`); }
    if (!d.cat) { err(`${nom} / ${d.nom} : sans catégorie`); }
    if (!d.drops || !d.drops.length) { err(`${nom} / ${d.nom} : liste vide`); }
  }
}

/* --- 4. rendu sans exception --- */
let rendus = 0;
const rendre = (fn, liste, lbl) => {
  for (const it of liste) {
    try {
      const h = fn(it).innerHTML || '';
      if (h.length < 40) { throw new Error('HTML anormalement court'); }
      rendus++;
    } catch (e) { err(`rendu ${lbl} « ${it.nom} » : ${e.message}`); }
  }
};
if (typeof RECETTES !== 'undefined') { rendre(renderRecipe, RECETTES, 'recette'); }
for (const [nom, liste] of FICHES) { rendre(renderEntry, liste, nom); }
for (const [nom, liste] of SCHEMAS) { rendre(renderBlueprint, liste, nom); }

/* --- 5. vue isométrique --- */
let iso = 0, sansIso = 0;
for (const [, liste] of SCHEMAS) {
  for (const bp of liste) {
    if (!isoPossible(bp)) { sansIso++; continue; }
    try {
      const svg = renderIso(bp);
      if (!svg.startsWith('<svg') || !svg.includes('<polygon')) { throw new Error('SVG vide'); }
      iso++;
    } catch (e) { err(`vue 3D « ${bp.nom} » : ${e.message}`); }
  }
}

/* --- 6. pages --- */
const PAGES = fs.readdirSync(RACINE).filter(f => f.endsWith('.html')).sort();
const SRC = {
  'drops.html': typeof DROPS !== 'undefined' ? DROPS : null,
  'craft.html': typeof RECETTES !== 'undefined' ? RECETTES : null,
  'potions.html': typeof POTIONS !== 'undefined' ? POTIONS : null,
  'biomes.html': typeof BIOMES !== 'undefined' ? BIOMES : null,
  'enchantements.html': typeof ENCHANTS !== 'undefined' ? ENCHANTS : null,
  'redstone.html': typeof CIRCUITS !== 'undefined' ? CIRCUITS : null,
  'villageois.html': typeof METIERS !== 'undefined' ? METIERS : null,
  'blocs.html': typeof FAMILLES_BLOCS !== 'undefined' ? FAMILLES_BLOCS : null,
  'plans.html': typeof PLANS !== 'undefined' ? PLANS : null,
  'usines.html': typeof USINES !== 'undefined' ? USINES : null
};

for (const p of PAGES) {
  const html = fs.readFileSync(path.join(RACINE, p), 'utf8');

  for (const m of html.matchAll(/(?:src|href)="((?:assets|tools|[a-z-]+\.html)[^"]*)"/g)) {
    const f = m[1].split('#')[0];
    /* les textures sont volontairement optionnelles */
    if (f === 'assets/textures/index.js') { continue; }
    if (f && !fs.existsSync(path.join(RACINE, f))) { err(`${p} : fichier manquant ${f}`); }
  }
  for (const m of html.matchAll(/href="(?:plans|usines|redstone)\.html#([a-z0-9-]+)"/g)) {
    if (!ids.has(m[1])) { err(`${p} : ancre inexistante #${m[1]}`); }
  }
  for (const autre of PAGES) {
    if (autre !== p && !html.includes(`href="${autre}"`)) { err(`${p} : lien de nav manquant vers ${autre}`); }
  }
  if (!html.includes('id="theme-btn"')) { err(`${p} : bouton de thème absent`); }
  if (!html.includes('assets/couleurs.js')) { err(`${p} : couleurs du jeu non chargées`); }
  if (html.includes('setupFilter')) {
    for (const id of ['q', 'chips', 'count', 'vide', 'liste']) {
      if (!html.includes(`id="${id}"`)) { err(`${p} : id="${id}" manquant`); }
    }
    if (!html.includes('data-cat="fav"')) { err(`${p} : chip Favoris absent`); }
  }
  if (html.includes('id="liste"') && !html.includes('class="print-host"')) { err(`${p} : section imprimable non marquée`); }

  const src = SRC[p];
  if (src) {
    const chips = new Set([...html.matchAll(/data-cat="([a-z-]+)"/g)].map(m => m[1]));
    chips.delete('all'); chips.delete('fav');
    const reelles = new Set(src.map(x => x.cat));
    for (const c of chips) { if (!reelles.has(c)) { err(`${p} : filtre "${c}" sans donnée`); } }
    for (const c of reelles) { if (!chips.has(c)) { err(`${p} : catégorie "${c}" sans filtre`); } }
  }
}

/* pages à sommaire latéral */
for (const p of ['plans.html', 'usines.html', 'redstone.html']) {
  if (!PAGES.includes(p)) { continue; }
  const html = fs.readFileSync(path.join(RACINE, p), 'utf8');
  for (const need of ['id="toc"', 'buildToc(', 'sortByCat(']) {
    if (!html.includes(need)) { err(`${p} : ${need} absent`); }
  }
}
const GROUPES = [
  [typeof PLANS !== 'undefined' ? PLANS : [], typeof GROUPES_PLANS !== 'undefined' ? GROUPES_PLANS : {}, 'PLANS'],
  [typeof USINES !== 'undefined' ? USINES : [], typeof GROUPES_USINES !== 'undefined' ? GROUPES_USINES : {}, 'USINES'],
  [typeof CIRCUITS !== 'undefined' ? CIRCUITS : [], typeof GROUPES_REDSTONE !== 'undefined' ? GROUPES_REDSTONE : {}, 'CIRCUITS']
];
for (const [liste, grp, nom] of GROUPES) {
  for (const it of liste) { if (!grp[it.cat]) { err(`${nom} : catégorie "${it.cat}" sans libellé de groupe`); } }
}

/* --- 7. visuels --- */
if (typeof COULEURS_JEU === 'undefined') { err('assets/couleurs.js absent ou invalide'); }
else {
  const nb = Object.keys(COULEURS_JEU.blocs).length + Object.keys(COULEURS_JEU.items).length;
  if (nb < 100) { err(`couleurs du jeu : seulement ${nb} entrées`); }
  for (const k in COULEURS_JEU.blocs) {
    if (!/^#[0-9a-f]{6}$/i.test(COULEURS_JEU.blocs[k])) { err(`couleur invalide pour le bloc "${k}"`); }
  }
}
const css = fs.readFileSync(A('style.css'), 'utf8');
if (!css.includes(':root[data-theme="light"]')) { err('CSS : thème clair absent'); }

/* --- 8. encodage --- */
const tousFichiers = [];
(function parcourir(d) {
  for (const e of fs.readdirSync(d, { withFileTypes: true })) {
    if (e.name === '.git' || e.name === 'textures') { continue; }
    const p = path.join(d, e.name);
    if (e.isDirectory()) { parcourir(p); }
    else if (/\.(html|css|js|md)$/.test(e.name)) { tousFichiers.push(p); }
  }
}(RACINE));
for (const f of tousFichiers) {
  const buf = fs.readFileSync(f);
  const s = buf.toString('utf8');
  const rel = path.relative(RACINE, f).replace(/\\/g, '/');
  if (buf[0] === 0xEF && buf[1] === 0xBB && buf[2] === 0xBF) { err(`${rel} : BOM UTF-8`); }
  /* décoder puis ré-encoder doit redonner exactement les mêmes octets */
  if (!Buffer.from(s, 'utf8').equals(buf)) { err(`${rel} : octets non UTF-8`); }
  /* mojibake typique : « Ã » ou « â » suivi d'un caractère latin-1 haut.
     Testé par code, pour que ce fichier ne se signale pas lui-même. */
  for (let i = 0; i < s.length - 1; i++) {
    const a = s.charCodeAt(i), b = s.charCodeAt(i + 1);
    if ((a === 0xC3 && b >= 0xA0 && b <= 0xBF) || (a === 0xE2 && b === 0x82)) {
      err(`${rel} : mojibake vers la position ${i}`);
      break;
    }
  }
}

/* --- résumé --- */
if (inconnus.size) { console.log('  ⚠ caractères de bloc sans définition :'); inconnus.forEach(c => console.log('    ' + c)); }
console.log('');
for (const [nom, liste] of FICHES) { console.log(`  ${nom.padEnd(18)} ${liste.length}`); }
for (const [nom, liste] of SCHEMAS) { console.log(`  ${nom.padEnd(18)} ${liste.length}`); }
if (typeof RECETTES !== 'undefined') { console.log(`  ${'RECETTES'.padEnd(18)} ${RECETTES.length}`); }
console.log(`\n  ${PAGES.length} pages · ${rendus} éléments rendus · vue 3D : ${iso} rendus, ${sansIso} exclus`);
console.log(`  ${tousFichiers.length} fichiers texte contrôlés`);
console.log(errs ? `\n❌ ${errs} erreur(s)` : '\n✅ aucune erreur');
process.exit(errs ? 1 : 0);
