/* ============================================================
   Codex Minecraft — noyau commun
   Palette de blocs, moteurs de rendu (craft / plans), filtres.
   Scripts classiques (pas de modules ES) pour rester ouvrable
   en file:// sans serveur.
   ============================================================ */

/* -----------------------------------------------------------
   1. Palette de blocs utilisée par TOUS les plans du site.
      clé = caractère utilisé dans les schémas
   ----------------------------------------------------------- */
var BLOCKS = {
  '.': { n: 'Air / vide',                   c: null },
  ' ': { n: 'Air / vide',                   c: null },

  /* Construction */
  '#': { n: 'Planches de chêne',            c: '#b0865a' },
  'o': { n: 'Rondin de chêne',              c: '#6f5133' },
  'k': { n: 'Rondin écorcé (poutre)',       c: '#b99a68' },
  'b': { n: 'Briques de pierre',            c: '#7c7c7c' },
  'c': { n: 'Pierre / Pierre taillée',      c: '#616161' },
  'm': { n: 'Briques de pierre moussues',   c: '#6b7a5e' },
  'd': { n: 'Pierre des profondeurs polie', c: '#3d3d45' },
  'n': { n: 'Pierre noire polie',           c: '#2b2730' },
  'a': { n: 'Grès',                         c: '#ded6a5' },
  'r': { n: 'Briques du Nether',            c: '#4a2429' },
  'q': { n: 'Bloc de quartz',               c: '#ece7e0' },
  'g': { n: 'Bloc de verre',                c: '#8fc7dd' },
  'G': { n: 'Vitre (panneau)',              c: '#5f97ad' },
  'w': { n: 'Eau',                          c: '#2f5fc4' },
  'l': { n: 'Lave',                         c: '#e0672a' },
  't': { n: 'Terre',                        c: '#6e4f34' },
  'f': { n: 'Terre labourée',               c: '#4d3421' },
  'e': { n: 'Bloc d\'herbe',                c: '#5a9440' },
  '%': { n: 'Feuillage',                    c: '#38702a' },
  '*': { n: 'Lanterne / torche',            c: '#ffd257' },
  'D': { n: 'Porte',                        c: '#9c6c37' },
  '/': { n: 'Escalier',                     c: '#9a7a4a' },
  '-': { n: 'Dalle',                        c: '#a08f70' },
  '|': { n: 'Clôture / barreaux de fer',    c: '#8a6a44' },
  '+': { n: 'Trappe',                       c: '#8d6a3e' },
  'W': { n: 'Laine / tapis',                c: '#e2e5e5' },
  'L': { n: 'Échelle',                      c: '#a9843f' },
  'M': { n: 'Muret',                        c: '#585858' },
  'O': { n: 'Obsidienne',                   c: '#170f24' },
  'A': { n: 'Sable / gravier',              c: '#d9cfa0' },
  'B': { n: 'Bloc plein (au choix)',        c: '#4c5566' },
  's': { n: 'Panneau',                      c: '#c0a06a' },
  'x': { n: 'Emplacement joueur / repère',  c: '#f0b429' },
  '@': { n: 'Générateur de monstres',       c: '#20323f' },
  '~': { n: 'Eau courante',                 c: '#3f7fe0' },
  '^': { n: 'Entrée / sortie',              c: '#2fd47a' },

  /* Technique / redstone */
  'R': { n: 'Poudre de redstone',           c: '#c8382c' },
  'X': { n: 'Torche de redstone',           c: '#ff5f4d' },
  'Z': { n: 'Répéteur',                     c: '#cfc7bb' },
  'V': { n: 'Comparateur',                  c: '#b9b1a5' },
  'P': { n: 'Piston',                       c: '#b79a6a' },
  'S': { n: 'Piston collant',               c: '#84a860' },
  'Q': { n: 'Observateur',                  c: '#43434b' },
  'H': { n: 'Entonnoir',                    c: '#474b53' },
  'E': { n: 'Coffre',                       c: '#8a5f2a' },
  'U': { n: 'Fourneau',                     c: '#6f6f6f' },
  'Y': { n: 'Établi',                       c: '#a9743f' },
  'I': { n: 'Bloc de fer',                  c: '#d6d6d6' },
  'J': { n: 'Bloc de slime',                c: '#7fc46a' },
  '=': { n: 'Rail',                         c: '#9a9a9a' },
  '_': { n: 'Plaque de pression',           c: '#8e8e8e' },
  '!': { n: 'Levier',                       c: '#c9b48e' },
  'T': { n: 'Trémie / entonnoir sous coffre', c: '#3d4149' },
  'K': { n: 'Bloc de note / cible',         c: '#c07a4a' },
  'N': { n: 'Bloc de mousse / feuilles',    c: '#4e7d3a' },
  'C': { n: 'Chaudron / cauldron',          c: '#4a4a4a' },
  'F': { n: 'Feu de camp',                  c: '#e2732a' },
  'p': { n: 'Cactus',                       c: '#4f8a3d' },
  'u': { n: 'Canne à sucre',                c: '#8ec96a' },
  'z': { n: 'Bambou',                       c: '#79b83c' },
  'v': { n: 'Vigne / liane',                c: '#356b26' },
  'h': { n: 'Foin / culture',               c: '#c8a83c' },
  'i': { n: 'Glace / glace bleue',          c: '#9fd6ef' },
  'j': { n: 'Bloc de miel',                 c: '#e8a52a' },
  'y': { n: 'Ruche / nid d\'abeilles',      c: '#c08a3e' },
  '1': { n: 'Repère 1',                     c: '#f0b429' },
  '2': { n: 'Repère 2',                     c: '#4d7cf3' },
  '3': { n: 'Repère 3',                     c: '#a06cf0' }
};

/* -----------------------------------------------------------
   2. Items utilisés dans les grilles de craft
      clé = identifiant court ; n = nom ; c = couleur ; t = 1–3 lettres
   ----------------------------------------------------------- */
var ITEMS = {
  bois:      { n: 'Bûche (n\'importe quel bois)', c: '#6f5133', t: 'BÛ' },
  planche:   { n: 'Planches',                     c: '#b0865a', t: 'PL' },
  baton:     { n: 'Bâton',                        c: '#8a6a3e', t: 'BÂ' },
  pierre:    { n: 'Pierre / roche taillée',       c: '#7c7c7c', t: 'PI' },
  cobble:    { n: 'Pierre (cobblestone)',         c: '#6a6a6a', t: 'CB' },
  fer:       { n: 'Lingot de fer',                c: '#d8d8d8', t: 'FE' },
  or:        { n: 'Lingot d\'or',                 c: '#f0c040', t: 'OR' },
  diamant:   { n: 'Diamant',                      c: '#4fd6e0', t: 'DI' },
  netherite: { n: 'Lingot de netherite',          c: '#6b5b52', t: 'NE' },
  cuivre:    { n: 'Lingot de cuivre',             c: '#d97a4a', t: 'CU' },
  redstone:  { n: 'Poudre de redstone',           c: '#c8382c', t: 'RS' },
  lapis:     { n: 'Lapis-lazuli',                 c: '#2c53b8', t: 'LA' },
  emeraude:  { n: 'Émeraude',                     c: '#2fd47a', t: 'ÉM' },
  charbon:   { n: 'Charbon',                      c: '#26262a', t: 'CH' },
  quartz:    { n: 'Quartz du Nether',             c: '#ece7e0', t: 'QZ' },
  obsi:      { n: 'Obsidienne',                   c: '#22163a', t: 'OB' },
  silex:     { n: 'Silex',                        c: '#565660', t: 'SX' },
  ficelle:   { n: 'Ficelle',                      c: '#e8e8e8', t: 'FI' },
  cuir:      { n: 'Cuir',                         c: '#8a5f34', t: 'CR' },
  plume:     { n: 'Plume',                        c: '#f2f2f2', t: 'PU' },
  oeuf:      { n: 'Œuf',                          c: '#e9dcc0', t: 'ŒU' },
  ble:       { n: 'Blé',                          c: '#d3b23c', t: 'BL' },
  sucre:     { n: 'Sucre',                        c: '#f0f0f0', t: 'SU' },
  canne:     { n: 'Canne à sucre',                c: '#8ec96a', t: 'CA' },
  papier:    { n: 'Papier',                       c: '#efeade', t: 'PA' },
  livre:     { n: 'Livre',                        c: '#a8763c', t: 'LI' },
  laine:     { n: 'Laine',                        c: '#e2e5e5', t: 'LN' },
  sable:     { n: 'Sable',                        c: '#ded6a5', t: 'SA' },
  verre:     { n: 'Verre',                        c: '#8fc7dd', t: 'VE' },
  argile:    { n: 'Boule d\'argile',              c: '#a3a8b8', t: 'AR' },
  brique:    { n: 'Brique',                       c: '#a05a48', t: 'BR' },
  poudre:    { n: 'Poudre à canon',               c: '#8c8c8c', t: 'PC' },
  slime:     { n: 'Boule de slime',               c: '#7fc46a', t: 'SL' },
  perle:     { n: 'Perle de l\'Ender',            c: '#1c7a6e', t: 'PE' },
  blaze:     { n: 'Bâton de Blaze',               c: '#f0b429', t: 'BZ' },
  poudreBl:  { n: 'Poudre de Blaze',              c: '#e8a52a', t: 'PB' },
  larme:     { n: 'Larme de Ghast',               c: '#dff0ee', t: 'LG' },
  os:        { n: 'Os / poudre d\'os',            c: '#e8e4d8', t: 'OS' },
  chair:     { n: 'Chair putréfiée',              c: '#7a5a44', t: 'CP' },
  araignee:  { n: 'Œil d\'araignée',              c: '#8c3232', t: 'ŒA' },
  cactus:    { n: 'Cactus',                       c: '#4f8a3d', t: 'CT' },
  champi:    { n: 'Champignon',                   c: '#a05a48', t: 'CM' },
  bol:       { n: 'Bol',                          c: '#8a6a3e', t: 'BO' },
  pomme:     { n: 'Pomme',                        c: '#c93b2e', t: 'PO' },
  amethyste: { n: 'Éclat d\'améthyste',           c: '#a06cf0', t: 'AM' },
  echo:      { n: 'Éclat d\'écho',                c: '#1b3a45', t: 'EC' },
  cuivreB:   { n: 'Bloc de cuivre',               c: '#c06a3a', t: 'BC' },
  ferB:      { n: 'Bloc de fer',                  c: '#d6d6d6', t: 'BF' },
  orB:       { n: 'Bloc d\'or',                   c: '#f0c040', t: 'BO' },
  diamB:     { n: 'Bloc de diamant',              c: '#3ec6d0', t: 'BD' },
  citrouille:{ n: 'Citrouille sculptée',          c: '#d97a20', t: 'CI' },
  neige:     { n: 'Bloc de neige',                c: '#f0f8ff', t: 'NG' },
  ame:       { n: 'Sable des âmes',               c: '#4a3a30', t: 'SÂ' },
  tete:      { n: 'Crâne de Wither',              c: '#3a3a3a', t: 'CW' },
  crampon:   { n: 'Nautile / coque',              c: '#c8b88c', t: 'NA' },
  coeurMer:  { n: 'Cœur de la mer',               c: '#79d6d0', t: 'CŒ' },
  prisma:    { n: 'Éclat de prismarine',          c: '#6fd0bc', t: 'PR' },
  encre:     { n: 'Poche d\'encre',               c: '#22222a', t: 'EN' },
  miel:      { n: 'Bouteille de miel',            c: '#e8a52a', t: 'MI' },
  cire:      { n: 'Rayon de miel',                c: '#c08a3e', t: 'RM' },
  bambou:    { n: 'Bambou',                       c: '#79b83c', t: 'BA' },
  corde:     { n: 'Tripwire / crochet',           c: '#9a9a9a', t: 'CD' },
  fleche:    { n: 'Flèche',                       c: '#b8b8b8', t: 'FL' },
  bouteille: { n: 'Fiole en verre',               c: '#a8d8e8', t: 'FV' },
  nether:    { n: 'Verrue du Nether',             c: '#8c2020', t: 'VN' },
  ecaille:   { n: 'Écaille d\'armadillo',         c: '#8a6a4a', t: 'ÉA' },
  cuivreLg:  { n: 'Lingot de cuivre',             c: '#d97a4a', t: 'CU' },
  ame_torch: { n: 'Terre des âmes',               c: '#4a3a30', t: 'TÂ' },
  scute:     { n: 'Écaille de tortue',            c: '#5aa84a', t: 'ÉT' },
  membrane:  { n: 'Membrane de Phantom',          c: '#6a6a80', t: 'MP' },
  vide:      { n: '(vide)',                       c: null,     t: '' }
};

/* -----------------------------------------------------------
   2 bis. Visuels du jeu
   ---------------------------------------------------------------
   Deux niveaux de fidélité, choisis automatiquement :

   1. `assets/couleurs.js` (toujours présent) remplace les couleurs
      approximatives ci-dessus par la couleur moyenne RÉELLE de
      chaque texture du jeu.
   2. `assets/textures/index.js` (optionnel, généré en local par
      tools/extract-textures.js) fait afficher les VRAIES textures.
      Les assets de Minecraft appartenant à Mojang, ils ne sont pas
      versionnés : sans eux, on garde les aplats de couleur.
   ----------------------------------------------------------- */

(function () {
  if (typeof COULEURS_JEU === 'undefined') { return; }
  var b = COULEURS_JEU.blocs || {}, i = COULEURS_JEU.items || {};
  for (var k in b) { if (BLOCKS[k]) { BLOCKS[k].c = b[k]; } }
  for (var j in i) { if (ITEMS[j]) { ITEMS[j].c = i[j]; } }
}());

/* Cherche la meilleure texture disponible pour une clé donnée.
   Renvoie { dossier, t } ou null. */
function trouverTexture(type, cle) {
  if (typeof TEXTURES !== 'undefined') {
    var t = (TEXTURES[type] || {})[cle];
    if (t) { return { dossier: 'assets/textures/', t: t }; }
  }
  if (typeof TEXTURES_LIBRES !== 'undefined') {
    var l = (TEXTURES_LIBRES[type] || {})[cle];
    if (l) { return { dossier: 'assets/textures-libres/', t: l }; }
  }
  return null;
}

function aTextures() {
  return typeof TEXTURES !== 'undefined' || typeof TEXTURES_LIBRES !== 'undefined';
}

/* Style CSS d'une case texturée. `type` vaut 'blocs' ou 'items'. */
function texStyle(type, cle, couleur) {
  var trouve = trouverTexture(type, cle);
  if (!trouve) { return 'background:' + couleur; }
  var t = trouve.t;
  /* la couleur reste en fond : si l'image ne charge pas, la case reste lisible */
  var s = 'background-color:' + couleur + ';' +
    'background-image:url(' + trouve.dossier + t.f + ');' +
    'background-repeat:no-repeat;image-rendering:pixelated;';
  /* Une texture animée est une bande verticale : on n'affiche que la 1re image. */
  s += t.n ? 'background-size:100% ' + (t.n * 100) + '%;background-position:top center;'
           : 'background-size:100% 100%;';
  /* Herbe, feuillage, eau : textures grises que le jeu colore lui-même. */
  if (t.t) { s += 'background-color:' + t.t + ';background-blend-mode:multiply;'; }
  return s;
}

/* -----------------------------------------------------------
   2 ter. Formes dérivées d'un bloc
   ---------------------------------------------------------------
   Silhouettes vues de face, remplies avec la texture du matériau :
   on voit d'un coup d'œil ce qu'on peut réellement poser avec lui.
   ----------------------------------------------------------- */

/* Chaque forme est décrite par un chemin SVG dans un carré de 16 × 16. */
var FORMES = {
  bloc:      { n: 'Bloc plein',    d: 'M0 0h16v16H0z' },
  escalier:  { n: 'Escalier',      d: 'M0 8h8V0h8v16H0z' },
  dalle:     { n: 'Dalle',         d: 'M0 8h16v8H0z' },
  mur:       { n: 'Muret',         d: 'M0 4h4v12h8V4h4v12h-16z M5 4h6v4H5z' },
  cloture:   { n: 'Clôture',       d: 'M6 0h4v16H6z M0 4h16v3H0z M0 10h16v3H0z' },
  portillon: { n: 'Portillon',     d: 'M1 3h14v3H1z M1 10h14v3H1z M1 3h3v10H1z M12 3h3v10h-3z' },
  porte:     { n: 'Porte',         d: 'M3 0h10v16H3z' },
  trappe:    { n: 'Trappe',        d: 'M0 6h16v4H0z' },
  panneau:   { n: 'Panneau',       d: 'M2 1h12v8H2z M7 9h2v7H7z' },
  bouton:    { n: 'Bouton',        d: 'M5 6h6v4H5z' },
  plaque:    { n: 'Plaque',        d: 'M1 12h14v3H1z' },
  vitre:     { n: 'Vitre',         d: 'M0 0h16v3H0z M6 3h4v13H6z' },
  tapis:     { n: 'Tapis',         d: 'M0 14h16v2H0z' },
  poli:      { n: 'Poli / ciselé', d: 'M0 0h16v16H0z M2 2h5v5H2z M9 9h5v5H9z' },
  cisele:    { n: 'Ciselé',        d: 'M0 0h16v16H0z' }
};

/* Quelles formes existent réellement selon la famille de matériau. */
var FORMES_PAR_CAT = {
  bois:      ['bloc', 'escalier', 'dalle', 'cloture', 'portillon', 'porte', 'trappe', 'panneau', 'bouton', 'plaque'],
  pierre:    ['bloc', 'escalier', 'dalle', 'mur', 'bouton', 'plaque', 'poli'],
  terre:     ['bloc', 'escalier', 'dalle', 'mur'],
  nether:    ['bloc', 'escalier', 'dalle', 'mur', 'cloture'],
  end:       ['bloc', 'escalier', 'dalle', 'mur'],
  aquatique: ['bloc', 'escalier', 'dalle', 'mur'],
  couleur:   ['bloc', 'escalier', 'dalle', 'vitre', 'tapis'],
  lumiere:   ['bloc']
};

/* Rend la bande de formes d'une famille.
   `cleTexture` désigne la texture à utiliser (clé de bloc, ex. '#'). */
function renderFormes(cat, cleTexture, couleur) {
  var noms = FORMES_PAR_CAT[cat];
  if (!noms) { return ''; }
  var tex = trouverTexture('blocs', cleTexture);
  var id = 'fm' + Math.abs(hachage(cat + cleTexture));

  var defs = tex
    ? '<defs><pattern id="' + id + '" patternUnits="userSpaceOnUse" width="16" height="16">' +
      '<image href="' + tex.dossier + tex.t.f + '" width="16" height="16" preserveAspectRatio="none"' +
      (tex.t.n ? ' clip-path="inset(0 0 ' + (100 - 100 / tex.t.n) + '% 0)"' : '') + '/>' +
      (tex.t.t ? '<rect width="16" height="16" fill="' + tex.t.t + '" style="mix-blend-mode:multiply"/>' : '') +
      '</pattern></defs>'
    : '';
  var remplissage = tex ? 'url(#' + id + ')' : couleur;

  var h = '<div class="formes">';
  for (var i = 0; i < noms.length; i++) {
    var f = FORMES[noms[i]];
    if (!f) { continue; }
    h += '<figure class="forme" title="' + esc(f.n) + '">' +
      '<svg viewBox="0 0 16 16" width="34" height="34" aria-hidden="true">' +
      (i === 0 ? defs : '') +
      '<path d="' + f.d + '" fill="' + remplissage + '" fill-rule="evenodd"/></svg>' +
      '<figcaption>' + esc(f.n) + '</figcaption></figure>';
  }
  return h + '</div>';
}

function hachage(s) {
  var h = 0;
  for (var i = 0; i < s.length; i++) { h = (h * 31 + s.charCodeAt(i)) | 0; }
  return h;
}

/* -----------------------------------------------------------
   3. Rendu d'une recette d'artisanat
   ----------------------------------------------------------- */
function renderRecipe(r) {
  var el = document.createElement('div');
  el.className = 'recipe';
  el.dataset.search = (r.nom + ' ' + (r.cat || '') + ' ' + (r.desc || '') + ' ' +
    (r.grille || []).join(' ')).toLowerCase();
  el.dataset.cat = r.cat || '';
  el.dataset.fav = isFav(r.nom) ? '1' : '0';

  var head = '<div class="recipe-title"><h3>' + esc(r.nom) + '</h3>' +
    '<span class="tag ' + (r.tagCls || '') + '">' + esc(r.station || 'Établi') + '</span>' +
    favBtnHTML(r.nom) + '</div>';

  /* grille */
  var rows = r.grille || [];
  var cols = rows.reduce(function (m, l) { return Math.max(m, l.length); }, 0) || 1;
  var cls = cols === 1 ? 'cgrid c1' : cols === 2 ? 'cgrid c2' : 'cgrid';
  var g = '<div class="' + cls + '">';
  var used = {};
  for (var y = 0; y < rows.length; y++) {
    for (var x = 0; x < cols; x++) {
      var ch = rows[y][x] || ' ';
      var key = (r.legende || {})[ch];
      var it = key ? ITEMS[key] : null;
      if (it) { used[key] = true; }
      g += slotHTML(it, key);
    }
  }
  g += '</div>';

  var outItem = ITEMS[r.sortieItem] || { n: r.sortie, c: '#2fd47a', t: '✔' };
  var out = '<div class="out">' + slotHTML(outItem, r.sortieItem) +
    '<div><div class="out-name">' + esc(r.sortie || outItem.n) + '</div>' +
    '<div class="out-qty">×' + (r.qte || 1) + '</div></div></div>';

  var bench = '<div class="bench">' + g + '<span class="arrow">➜</span>' + out + '</div>';

  var lg = '';
  var keys = Object.keys(used);
  if (keys.length) {
    lg = '<div class="legend-inline"><b>Ingrédients :</b> ' +
      keys.map(function (k) { return esc(ITEMS[k].n); }).join(' · ') + '</div>';
  }

  var desc = r.desc ? '<p class="desc">' + esc(r.desc) + '</p>' : '';

  el.innerHTML = head + bench + lg + desc;
  return el;
}

function slotHTML(it, cle) {
  if (!it || !it.c) { return '<div class="slot"></div>'; }
  var texture = cle && trouverTexture('items', cle);
  return '<div class="slot filled' + (texture ? ' tex' : '') + '" style="' +
    texStyle('items', cle, it.c) + '" title="' + esc(it.n) + '">' +
    (texture ? '' : '<span class="lbl">' + esc(it.t || '') + '</span>') + '</div>';
}

/* -----------------------------------------------------------
   4. Rendu d'un plan de construction (couches)
   ----------------------------------------------------------- */
function renderBlueprint(bp) {
  var el = document.createElement('article');
  el.className = 'blueprint';
  el.id = bp.id || '';
  el.dataset.search = (bp.nom + ' ' + (bp.cat || '') + ' ' + (bp.desc || '') + ' ' +
    (bp.tags || []).join(' ')).toLowerCase();
  el.dataset.cat = bp.cat || '';
  el.dataset.fav = isFav(bp.nom) ? '1' : '0';

  /* index utilisé par le bouton « vue 3D » (construction différée) */
  window.__isoIndex = window.__isoIndex || {};
  if (bp.id) { window.__isoIndex[bp.id] = bp; }

  var html = '<div class="bp-head"><h3>' + esc(bp.nom) + '</h3>' +
    (bp.taille ? '<span class="tag">' + esc(bp.taille) + '</span>' : '') +
    (bp.diff ? '<span class="tag ' + diffCls(bp.diff) + '">' + esc(bp.diff) + '</span>' : '') +
    favBtnHTML(bp.nom) + '</div>';

  if (bp.desc) { html += '<p class="lead" style="margin-bottom:0">' + esc(bp.desc) + '</p>'; }

  if (bp.mats && bp.mats.length) {
    html += '<ul class="mats">' + bp.mats.map(function (m) {
      return '<li>' + m.replace(/^(\S+)/, '<b>$1</b>') + '</li>';
    }).join('') + '</ul>';
  }

  /* couches */
  var chars = {};
  if (bp.couches && bp.couches.length) {
    html += '<div class="layers">';
    bp.couches.forEach(function (cch) {
      html += '<div class="layer"><div class="layer-title">' + esc(cch.t) + '</div>' +
        gridHTML(cch.g, chars) + '</div>';
    });
    html += '</div>';
    html += legendHTML(chars);
  }

  if (bp.etapes && bp.etapes.length) {
    html += '<ol class="steps">' + bp.etapes.map(function (s) {
      return '<li>' + boldFirst(s) + '</li>';
    }).join('') + '</ol>';
  }

  if (bp.rendement) {
    html += '<div class="callout info"><b>Rendement</b> — ' + esc(bp.rendement) + '</div>';
  }

  (bp.notes || []).forEach(function (n) {
    html += '<div class="callout ' + (n.type || 'tip') + '">' + boldFirst(n.txt || n) + '</div>';
  });

  /* barre d'actions */
  html += '<div class="bp-actions">' +
    '<button class="act" data-print="1">🖨 Imprimer cette fiche</button>' +
    '<button class="act" data-mat="' + esc(bp.id) + '">📦 Calculer les matériaux</button>' +
    (isoPossible(bp) ? '<button class="act" data-iso="' + esc(bp.id) + '">🧊 Vue 3D</button>' : '') +
    '</div><div class="mat-wrap"></div><div class="iso-wrap"></div>';

  el.innerHTML = html;
  return el;
}

function gridHTML(lines, charsOut) {
  var cols = lines.reduce(function (m, l) { return Math.max(m, l.length); }, 0);
  var h = '<div class="bp-grid" style="grid-template-columns:repeat(' + cols + ',17px)">';
  for (var y = 0; y < lines.length; y++) {
    for (var x = 0; x < cols; x++) {
      var ch = lines[y][x] || '.';
      var b = BLOCKS[ch];
      if (!b) { b = { n: 'Bloc « ' + ch + ' »', c: '#4c5566' }; }
      if (b.c) {
        if (charsOut) { charsOut[ch] = b; }
        h += '<div class="bp-cell" style="' + texStyle('blocs', ch, b.c) + '" title="' + esc(b.n) + '"></div>';
      } else {
        h += '<div class="bp-cell air" title="Air"></div>';
      }
    }
  }
  return h + '</div>';
}

function legendHTML(chars) {
  var keys = Object.keys(chars);
  if (!keys.length) { return ''; }
  keys.sort();
  return '<div class="legend">' + keys.map(function (k) {
    return '<span class="legend-item"><span class="legend-swatch" style="' +
      texStyle('blocs', k, chars[k].c) + '"></span><code>' + esc(k) + '</code> ' + esc(chars[k].n) + '</span>';
  }).join('') + '</div>';
}

function diffCls(d) {
  d = (d || '').toLowerCase();
  if (d.indexOf('débutant') === 0 || d.indexOf('facile') === 0) { return 'ok'; }
  if (d.indexOf('inter') === 0) { return 'gold'; }
  if (d.indexOf('avancé') === 0 || d.indexOf('expert') === 0) { return 'red'; }
  return '';
}

/* -----------------------------------------------------------
   5. Rendu d'une fiche « drop »
   ----------------------------------------------------------- */
function renderEntry(e) {
  var el = document.createElement('article');
  el.className = 'entry';
  el.dataset.search = (e.nom + ' ' + (e.cat || '') + ' ' + (e.ou || '') + ' ' +
    (e.drops || []).join(' ') + ' ' + (e.note || '')).toLowerCase();
  el.dataset.cat = e.cat || '';
  el.dataset.fav = isFav(e.nom) ? '1' : '0';
  /* les fiches ordonnées (parcours) portent un id : il sert d'ancre au sommaire */
  if (e.id) { el.id = e.id; }

  var tags = '';
  (e.tags || []).forEach(function (t) {
    tags += '<span class="tag ' + (t.cls || '') + '">' + esc(t.txt || t) + '</span>';
  });

  var html = '<div class="entry-head"><h3>' + esc(e.nom) + '</h3>' + tags + favBtnHTML(e.nom) + '</div>';
  if (e.ou) { html += '<div class="where">📍 ' + esc(e.ou) + '</div>'; }
  if (e.drops && e.drops.length) {
    /* `e.html` autorise les liens dans les puces (parcours guidé) */
    html += '<ul>' + e.drops.map(function (d) {
      return '<li>' + boldFirst(d, e.html) + '</li>';
    }).join('') + '</ul>';
  }
  if (e.note) { html += '<div class="note">💡 ' + esc(e.note) + '</div>'; }

  el.innerHTML = html;
  return el;
}

/* -----------------------------------------------------------
   5 bis. Remplissage d'un <tbody> à partir d'un tableau de lignes
   ----------------------------------------------------------- */
function fillTable(id, rows) {
  var tb = document.getElementById(id);
  if (!tb) { return; }
  for (var i = 0; i < rows.length; i++) {
    var tr = document.createElement('tr');
    var h = '';
    for (var j = 0; j < rows[i].length; j++) {
      h += j === 0
        ? '<td><b>' + esc(rows[i][j]) + '</b></td>'
        : '<td>' + esc(rows[i][j]) + '</td>';
    }
    tr.innerHTML = h;
    tb.appendChild(tr);
  }
}

/* -----------------------------------------------------------
   6. Utilitaires
   ----------------------------------------------------------- */
function esc(s) {
  return String(s == null ? '' : s)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

/* Met en gras la partie avant « : » ou « — » puis échappe le reste.

   `riche` autorise le HTML APRÈS le séparateur — uniquement pour les
   jeux de données qui en contiennent volontairement (le parcours guidé
   pose des liens vers les autres pages). L'intitulé, lui, reste toujours
   échappé, et rien n'est jamais interprété avant le séparateur. */
function boldFirst(s, riche) {
  s = String(s);
  var m = s.match(/^([^:—<]{2,42})(\s*[:—]\s*)([\s\S]+)$/);
  if (m) { return '<b>' + esc(m[1]) + '</b>' + esc(m[2]) + (riche ? m[3] : esc(m[3])); }
  return riche ? s : esc(s);
}

function norm(s) {
  return String(s).toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');
}

/* -----------------------------------------------------------
   7. Système de filtres (recherche + catégories)
   ----------------------------------------------------------- */
function setupFilter(opts) {
  var root = document.getElementById(opts.container);
  if (!root) { return; }
  var input = document.getElementById(opts.search);
  var chips = document.querySelectorAll('#' + opts.chips + ' .chip');
  var counter = document.getElementById(opts.count);
  var active = 'all';

  function apply() {
    var q = norm(input ? input.value.trim() : '');
    var shown = 0;
    var items = root.querySelectorAll('[data-search]');
    for (var i = 0; i < items.length; i++) {
      var it = items[i];
      var okCat = active === 'all' ? true
        : active === 'fav' ? it.dataset.fav === '1'
        : it.dataset.cat === active;
      var okQ = !q || norm(it.dataset.search).indexOf(q) !== -1;
      var vis = okCat && okQ;
      it.style.display = vis ? '' : 'none';
      if (vis) { shown++; }
    }
    /* masque les groupes vides */
    var groups = root.querySelectorAll('[data-group]');
    for (var j = 0; j < groups.length; j++) {
      var g = groups[j];
      var kids = g.querySelectorAll('[data-search]');
      var any = false;
      for (var k = 0; k < kids.length; k++) {
        if (kids[k].style.display !== 'none') { any = true; break; }
      }
      g.style.display = any ? '' : 'none';
    }
    if (counter) { counter.textContent = shown + ' / ' + items.length + ' résultat' + (shown > 1 ? 's' : ''); }
    var empty = document.getElementById(opts.empty);
    if (empty) {
      empty.style.display = shown ? 'none' : '';
      if (!shown && active === 'fav') {
        empty.textContent = 'Aucun favori pour l\'instant. Cliquez sur l\'étoile ☆ d\'une fiche pour l\'y ajouter.';
      }
    }
  }
  /* permet au bouton favori de rafraîchir la liste */
  window.__reapplyFilter = apply;

  if (input) { input.addEventListener('input', apply); }
  for (var c = 0; c < chips.length; c++) {
    chips[c].addEventListener('click', function () {
      for (var d = 0; d < chips.length; d++) { chips[d].classList.remove('on'); }
      this.classList.add('on');
      active = this.dataset.cat;
      apply();
    });
  }
  apply();
  return apply;
}

/* -----------------------------------------------------------
   8. Thème clair / sombre (mémorisé)
   ----------------------------------------------------------- */
var THEME_KEY = 'codex-mc-theme';

function store(k, v) {
  try { if (v === undefined) { return localStorage.getItem(k); } localStorage.setItem(k, v); }
  catch (e) { return null; }
}

function applyTheme(t) {
  if (t === 'light') { document.documentElement.setAttribute('data-theme', 'light'); }
  else { document.documentElement.removeAttribute('data-theme'); }
  var b = document.getElementById('theme-btn');
  if (b) {
    b.textContent = t === 'light' ? '🌙' : '☀️';
    b.title = t === 'light' ? 'Passer en thème sombre' : 'Passer en thème clair';
  }
}

function initTheme() {
  var t = store(THEME_KEY) || 'dark';
  applyTheme(t);
  var b = document.getElementById('theme-btn');
  if (b) {
    b.addEventListener('click', function () {
      t = t === 'light' ? 'dark' : 'light';
      store(THEME_KEY, t);
      applyTheme(t);
    });
  }
}
/* appliqué au plus tôt pour éviter le flash de thème */
(function () {
  try {
    if (localStorage.getItem(THEME_KEY) === 'light') {
      document.documentElement.setAttribute('data-theme', 'light');
    }
  } catch (e) { /* stockage indisponible */ }
}());

/* -----------------------------------------------------------
   9. Favoris (mémorisés par nom d'entrée)
   ----------------------------------------------------------- */
var FAV_KEY = 'codex-mc-favoris';
var FAVS = (function () {
  try { return JSON.parse(store(FAV_KEY) || '[]'); } catch (e) { return []; }
}());

function isFav(nom) { return FAVS.indexOf(nom) !== -1; }

function toggleFav(nom) {
  var i = FAVS.indexOf(nom);
  if (i === -1) { FAVS.push(nom); } else { FAVS.splice(i, 1); }
  store(FAV_KEY, JSON.stringify(FAVS));
  return isFav(nom);
}

function favBtnHTML(nom) {
  return '<button class="fav-btn' + (isFav(nom) ? ' on' : '') + '" data-fav="' + esc(nom) +
    '" title="Ajouter aux favoris" aria-label="Favori">' + (isFav(nom) ? '★' : '☆') + '</button>';
}

/* délégation : un seul écouteur pour toute la page */
document.addEventListener('click', function (ev) {
  var b = ev.target.closest ? ev.target.closest('.fav-btn') : null;
  if (!b) { return; }
  var on = toggleFav(b.dataset.fav);
  b.classList.toggle('on', on);
  b.textContent = on ? '★' : '☆';
  var host = b.closest('[data-search]');
  if (host) { host.dataset.fav = on ? '1' : '0'; }
  if (window.__reapplyFilter) { window.__reapplyFilter(); }
});

/* -----------------------------------------------------------
   10. Impression d'une fiche isolée
   ----------------------------------------------------------- */
document.addEventListener('click', function (ev) {
  var b = ev.target.closest ? ev.target.closest('[data-print]') : null;
  if (!b) { return; }
  var host = b.closest('[data-search]');
  if (!host) { return; }
  host.classList.add('print-me');
  document.body.classList.add('print-one');
  window.print();
  setTimeout(function () {
    host.classList.remove('print-me');
    document.body.classList.remove('print-one');
  }, 400);
});

/* -----------------------------------------------------------
   11. Vue isométrique d'un plan
   ----------------------------------------------------------- */

/* Une couche « vue de côté / de face / en coupe » ne s'empile pas : pas d'iso. */
function isoPossible(bp) {
  var c = bp.couches || [];
  if (c.length < 2) { return false; }
  for (var i = 0; i < c.length; i++) {
    if (/c[oô]t[ée]|face|coupe|profil/i.test(c[i].t)) { return false; }
  }
  return true;
}

function shade(hex, f) {
  var h = hex.replace('#', '');
  if (h.length === 3) { h = h[0] + h[0] + h[1] + h[1] + h[2] + h[2]; }
  var r = parseInt(h.slice(0, 2), 16), g = parseInt(h.slice(2, 4), 16), b = parseInt(h.slice(4, 6), 16);
  var cl = function (v) { return Math.max(0, Math.min(255, Math.round(v * f))); };
  return 'rgb(' + cl(r) + ',' + cl(g) + ',' + cl(b) + ')';
}

function renderIso(bp) {
  var TW = 16, TH = 8, TZ = 13;          /* demi-largeur, demi-profondeur, hauteur d'un cube */
  var couches = bp.couches || [];
  var maxW = 0, maxD = 0;
  couches.forEach(function (c) {
    maxD = Math.max(maxD, c.g.length);
    c.g.forEach(function (l) { maxW = Math.max(maxW, l.length); });
  });

  var parts = [];
  var motifs = {};   /* caractère -> motif SVG, pour texturer les faces */
  for (var L = 0; L < couches.length; L++) {
    var g = couches[L].g;
    var offX = Math.floor((maxW - g.reduce(function (m, l) { return Math.max(m, l.length); }, 0)) / 2);
    var offZ = Math.floor((maxD - g.length) / 2);
    var cells = [];
    for (var z = 0; z < g.length; z++) {
      for (var x = 0; x < g[z].length; x++) {
        var ch = g[z][x];
        var blk = BLOCKS[ch];
        if (!blk || !blk.c) { continue; }
        cells.push({ x: x + offX, z: z + offZ, c: blk.c, n: blk.n, ch: ch });
        var tex = trouverTexture('blocs', ch);
        if (tex) { motifs[ch] = tex; }
      }
    }
    /* du fond vers l'avant pour un recouvrement correct */
    cells.sort(function (a, b) { return (a.x + a.z) - (b.x + b.z); });
    cells.forEach(function (c) {
      var sx = (c.x - c.z) * TW;
      var sy = (c.x + c.z) * TH - L * TZ;
      parts.push(cube(sx, sy, TW, TH, TZ, c.c, c.n, motifs[c.ch] ? c.ch : null));
    });
  }

  var w = (maxW + maxD) * TW + 40;
  var h = (maxW + maxD) * TH + couches.length * TZ + 40;
  var ox = maxD * TW + 20;
  var oy = 20 + couches.length * TZ;

  /* un motif par bloc texturé, réutilisé par toutes ses faces */
  var defs = '';
  for (var ch in motifs) {
    var t = motifs[ch].t, dossier = motifs[ch].dossier;
    defs += '<pattern id="tx' + ch.charCodeAt(0) + '" patternUnits="userSpaceOnUse" ' +
      'width="' + (TW * 2) + '" height="' + (TZ * 2) + '">' +
      '<image href="' + dossier + t.f + '" x="0" y="0" width="' + (TW * 2) + '" height="' + (TZ * 2) +
      '" preserveAspectRatio="none" style="image-rendering:pixelated"' +
      (t.n ? ' clip-path="inset(0 0 ' + (100 - 100 / t.n) + '% 0)"' : '') + '/>' +
      (t.t ? '<rect width="' + (TW * 2) + '" height="' + (TZ * 2) + '" fill="' + t.t + '" style="mix-blend-mode:multiply"/>' : '') +
      '</pattern>';
  }

  return '<svg viewBox="0 0 ' + w + ' ' + h + '" width="' + Math.max(300, Math.min(w, 900)) + '" role="img" ' +
    'aria-label="Vue isométrique de ' + esc(bp.nom) + '">' +
    (defs ? '<defs>' + defs + '</defs>' : '') +
    '<g transform="translate(' + ox + ',' + oy + ')">' + parts.join('') + '</g></svg>';
}

/* Un cube isométrique : face du dessus, face gauche, face droite.
   `ch` non nul = le bloc a une texture, on peint avec son motif et on
   ajoute un voile d'ombre pour garder le relief. */
function cube(x, y, tw, th, tz, col, nom, ch) {
  var t = [x, y, x + tw, y + th, x, y + 2 * th, x - tw, y + th];
  var l = [x - tw, y + th, x, y + 2 * th, x, y + 2 * th + tz, x - tw, y + th + tz];
  var r = [x + tw, y + th, x, y + 2 * th, x, y + 2 * th + tz, x + tw, y + th + tz];

  var pts = function (p) {
    return p[0] + ',' + p[1] + ' ' + p[2] + ',' + p[3] + ' ' + p[4] + ',' + p[5] + ' ' + p[6] + ',' + p[7];
  };
  var face;
  if (ch) {
    var motif = 'url(#tx' + ch.charCodeAt(0) + ')';
    /* voile : blanc léger sur le dessus, noir sur les côtés */
    face = function (p, voile, opacite) {
      return '<polygon points="' + pts(p) + '" fill="' + motif + '"/>' +
        '<polygon points="' + pts(p) + '" fill="' + voile + '" opacity="' + opacite + '"/>';
    };
    return '<g><title>' + esc(nom) + '</title>' +
      face(l, '#000', .34) + face(r, '#000', .14) + face(t, '#fff', .10) + '</g>';
  }
  var poly = function (p, c) { return '<polygon points="' + pts(p) + '" fill="' + c + '"/>'; };
  return '<g><title>' + esc(nom) + '</title>' +
    poly(l, shade(col, .72)) + poly(r, shade(col, .9)) + poly(t, shade(col, 1.15)) + '</g>';
}

/* Bouton « vue 3D » : le SVG n'est construit qu'au premier clic */
document.addEventListener('click', function (ev) {
  var b = ev.target.closest ? ev.target.closest('[data-iso]') : null;
  if (!b) { return; }
  var host = b.closest('[data-search]');
  var box = host && host.querySelector('.iso-wrap');
  if (!box) { return; }
  if (!box.dataset.built) {
    var bp = (window.__isoIndex || {})[b.dataset.iso];
    if (!bp) { return; }
    box.innerHTML = renderIso(bp) +
      '<p class="iso-hint">Couches empilées du bas vers le haut · survolez un bloc pour son nom<br>' +
      'Sur un bâtiment fermé, les couches hautes masquent l\'intérieur : les plans ci-dessus restent la référence.</p>';
    box.dataset.built = '1';
  }
  var open = box.classList.toggle('open');
  b.classList.toggle('on', open);
  b.textContent = open ? '◾ Masquer la vue 3D' : '🧊 Vue 3D';
});

/* -----------------------------------------------------------
   12. Sommaire latéral
   ----------------------------------------------------------- */
/* Réordonne une liste selon l'ordre des catégories déclaré dans `groupes`,
   en conservant l'ordre d'origine à l'intérieur de chaque catégorie. */
function sortByCat(list, groupes) {
  var ordre = groupes ? Object.keys(groupes) : [];
  if (!ordre.length) { return list.slice(); }
  return list.slice().sort(function (a, b) {
    var ia = ordre.indexOf(a.cat), ib = ordre.indexOf(b.cat);
    if (ia === -1) { ia = 999; }
    if (ib === -1) { ib = 999; }
    return ia - ib || list.indexOf(a) - list.indexOf(b);
  });
}

function buildToc(tocId, list, groupes) {
  var el = document.getElementById(tocId);
  if (!el) { return; }
  list = sortByCat(list, groupes);
  var h = '<h4>Sommaire</h4>';
  var vus = {};
  for (var i = 0; i < list.length; i++) {
    var it = list[i];
    if (groupes && it.cat && !vus[it.cat]) {
      vus[it.cat] = 1;
      h += '<div class="toc-group">' + esc(groupes[it.cat] || it.cat) + '</div>';
    }
    h += '<a href="#' + esc(it.id) + '" data-toc="' + esc(it.id) + '">' + esc(it.nom) + '</a>';
  }
  el.innerHTML = h;

  /* surligne l'entrée visible */
  var liens = el.querySelectorAll('[data-toc]');
  var maj = function () {
    var best = null, bestTop = -1e9;
    for (var j = 0; j < liens.length; j++) {
      var cible = document.getElementById(liens[j].dataset.toc);
      if (!cible || cible.style.display === 'none') { continue; }
      var top = cible.getBoundingClientRect().top - 130;
      if (top <= 0 && top > bestTop) { bestTop = top; best = liens[j]; }
    }
    for (var k = 0; k < liens.length; k++) { liens[k].classList.remove('is-current'); }
    if (best) { best.classList.add('is-current'); }
  };
  window.addEventListener('scroll', maj, { passive: true });
  maj();
}

/* -----------------------------------------------------------
   12 bis. Calculateur de matériaux
   ---------------------------------------------------------------
   Compte les blocs réellement dessinés dans les couches du schéma.
   C'est un décompte exact de ce qui est représenté — pas une
   estimation : les limites sont annoncées sous le tableau.
   ----------------------------------------------------------- */

/* Ce qu'il faut fabriquer pour obtenir un bloc : [source, produit par craft] */
var RECOMPOSITION = {
  '#': ['bûches', 4],      /* 1 bûche → 4 planches */
  '/': ['blocs', 4 / 6],   /* 6 blocs → 4 escaliers */
  '-': ['blocs', 6 / 3],   /* 3 blocs → 6 dalles */
  '|': ['planches et bâtons', 1],
  'M': ['blocs', 6 / 6],
  'b': ['pierre', 4 / 4],  /* 4 pierres → 4 briques */
  'G': ['blocs de verre', 16 / 6]
};

function calculerMateriaux(bp) {
  var total = {}, repetees = [];
  (bp.couches || []).forEach(function (c) {
    if (/répéter|répète|à empiler/i.test(c.t)) { repetees.push(c.t); }
    c.g.forEach(function (ligne) {
      for (var i = 0; i < ligne.length; i++) {
        var ch = ligne[i];
        var b = BLOCKS[ch];
        if (!b || !b.c) { continue; }     /* air */
        total[ch] = (total[ch] || 0) + 1;
      }
    });
  });
  var liste = Object.keys(total).map(function (ch) {
    return { ch: ch, nom: (BLOCKS[ch] || {}).n || ch, n: total[ch], c: (BLOCKS[ch] || {}).c };
  });
  liste.sort(function (a, b) { return b.n - a.n; });
  return { liste: liste, repetees: repetees };
}

function renderMateriaux(bp) {
  var r = calculerMateriaux(bp);
  if (!r.liste.length) { return '<p class="rg-vide">Ce schéma ne contient aucun bloc à compter.</p>'; }

  var somme = 0;
  r.liste.forEach(function (m) { somme += m.n; });

  var h = '<table class="mat-table"><thead><tr><th></th><th>Bloc</th><th>Quantité</th><th>Piles</th><th>À prévoir</th></tr></thead><tbody>';
  r.liste.forEach(function (m) {
    var piles = Math.floor(m.n / 64), reste = m.n % 64;
    var enPiles = piles ? piles + ' pile' + (piles > 1 ? 's' : '') + (reste ? ' + ' + reste : '') : reste + '';
    var rec = RECOMPOSITION[m.ch];
    var prevoir = '';
    if (rec) {
      var brut = Math.ceil(m.n / rec[1]);
      prevoir = brut + ' ' + rec[0];
    }
    h += '<tr><td><span class="mat-puce" style="' + texStyle('blocs', m.ch, m.c) + '"></span></td>' +
      '<td>' + esc(m.nom) + '</td>' +
      '<td class="num">' + m.n + '</td>' +
      '<td class="num">' + enPiles + '</td>' +
      '<td class="mat-prevoir">' + esc(prevoir) + '</td></tr>';
  });
  h += '</tbody></table>';

  h += '<p class="mat-note"><b>' + somme + ' blocs</b> au total dans les couches dessinées, soit ' +
    Math.ceil(somme / 64) + ' pile' + (somme > 64 ? 's' : '') + ' à transporter.</p>';

  if (r.repetees.length) {
    h += '<p class="mat-note avert">⚠ ' + r.repetees.length + ' couche' + (r.repetees.length > 1 ? 's sont marquées' : ' est marquée') +
      ' « à répéter » : elle' + (r.repetees.length > 1 ? 's ne sont comptées qu\'une fois' : ' n\'est comptée qu\'une fois') +
      '. Multipliez par le nombre d\'étages réel.</p>';
  }

  /* Si la fiche annonce une hauteur supérieure au nombre de couches dessinées,
     le décompte ne peut pas être complet : autant le dire franchement. */
  var dims = String(bp.taille || '').match(/\d+/g);
  var hauteur = dims && dims.length >= 3 ? parseInt(dims[2], 10) : 0;
  var nbCouches = (bp.couches || []).length;
  if (hauteur > nbCouches) {
    h += '<p class="mat-note avert">⚠ La fiche annonce ' + hauteur + ' blocs de hauteur pour ' + nbCouches +
      ' couches dessinées : les niveaux identiques ne sont représentés qu\'une fois. Comptez environ ' +
      Math.round(somme * hauteur / nbCouches) + ' blocs au total, et fiez-vous à la liste de matériaux ci-dessus.</p>';
  }

  h += '<p class="mat-note">Ce tableau compte exactement les blocs dessinés dans les schémas. Les finitions ' +
    'décrites dans les étapes (vieillissement, éclairage, mobilier) n\'y figurent pas.</p>';
  return h;
}

/* Bouton : le tableau n'est calculé qu'au premier clic */
document.addEventListener('click', function (ev) {
  var b = ev.target.closest ? ev.target.closest('[data-mat]') : null;
  if (!b) { return; }
  var host = b.closest('[data-search]');
  var box = host && host.querySelector('.mat-wrap');
  if (!box) { return; }
  if (!box.dataset.built) {
    var bp = (window.__isoIndex || {})[b.dataset.mat];
    if (!bp) { return; }
    box.innerHTML = renderMateriaux(bp);
    box.dataset.built = '1';
  }
  var ouvert = box.classList.toggle('open');
  b.classList.toggle('on', ouvert);
  b.textContent = ouvert ? '◾ Masquer les matériaux' : '📦 Calculer les matériaux';
});

/* -----------------------------------------------------------
   13. Recherche globale (toutes les pages à la fois)
   ---------------------------------------------------------------
   L'index est construit une seule fois, à la demande, à partir des
   jeux de données déjà chargés PLUS un index compact des autres
   pages (assets/index-global.js, généré par tools/indexer.js).
   ----------------------------------------------------------- */

var IDX_GLOBAL = null;

function construireIndex() {
  if (IDX_GLOBAL) { return IDX_GLOBAL; }
  IDX_GLOBAL = (typeof INDEX_GLOBAL !== 'undefined') ? INDEX_GLOBAL.slice() : [];
  for (var i = 0; i < IDX_GLOBAL.length; i++) { IDX_GLOBAL[i].q = norm(IDX_GLOBAL[i].n + ' ' + (IDX_GLOBAL[i].d || '')); }
  return IDX_GLOBAL;
}

function ouvrirRechercheGlobale() {
  var d = document.getElementById('rg');
  if (d) { d.classList.add('open'); document.getElementById('rg-input').focus(); return; }

  d = document.createElement('div');
  d.id = 'rg';
  d.className = 'rg open';
  d.innerHTML =
    '<div class="rg-boite" role="dialog" aria-label="Recherche sur tout le site">' +
    '<input id="rg-input" type="search" placeholder="Chercher dans les 12 catalogues…" autocomplete="off">' +
    '<div id="rg-res" class="rg-res"></div>' +
    '<p class="rg-aide"><kbd>↑</kbd><kbd>↓</kbd> naviguer · <kbd>Entrée</kbd> ouvrir · <kbd>Échap</kbd> fermer</p>' +
    '</div>';
  document.body.appendChild(d);

  var input = document.getElementById('rg-input');
  var res = document.getElementById('rg-res');
  var courant = -1;

  function chercher() {
    var q = norm(input.value.trim());
    if (q.length < 2) {
      res.innerHTML = '<p class="rg-vide">Tapez au moins deux lettres.</p>';
      courant = -1;
      return;
    }
    var idx = construireIndex();
    var trouves = [];
    for (var i = 0; i < idx.length && trouves.length < 60; i++) {
      var pos = idx[i].q.indexOf(q);
      if (pos !== -1) { trouves.push({ e: idx[i], score: (pos === 0 ? 0 : 1) + (norm(idx[i].n).indexOf(q) === -1 ? 2 : 0) }); }
    }
    trouves.sort(function (a, b) { return a.score - b.score; });
    if (!trouves.length) {
      res.innerHTML = '<p class="rg-vide">Aucun résultat.</p>';
      courant = -1;
      return;
    }
    res.innerHTML = trouves.map(function (t, k) {
      var e = t.e;
      return '<a class="rg-item' + (k === 0 ? ' sel' : '') + '" href="' + esc(e.p) + (e.a ? '#' + esc(e.a) : '') + '">' +
        '<span class="rg-cat">' + esc(e.c) + '</span>' +
        '<span class="rg-nom">' + esc(e.n) + '</span>' +
        (e.d ? '<span class="rg-desc">' + esc(e.d.slice(0, 90)) + '</span>' : '') + '</a>';
    }).join('');
    courant = 0;
  }

  function bouger(pas) {
    var items = res.querySelectorAll('.rg-item');
    if (!items.length) { return; }
    if (courant >= 0) { items[courant].classList.remove('sel'); }
    courant = (courant + pas + items.length) % items.length;
    items[courant].classList.add('sel');
    items[courant].scrollIntoView({ block: 'nearest' });
  }

  input.addEventListener('input', chercher);
  input.addEventListener('keydown', function (ev) {
    if (ev.key === 'ArrowDown') { ev.preventDefault(); bouger(1); }
    else if (ev.key === 'ArrowUp') { ev.preventDefault(); bouger(-1); }
    else if (ev.key === 'Enter') {
      var sel = res.querySelector('.rg-item.sel');
      if (sel) { ev.preventDefault(); location.href = sel.getAttribute('href'); }
    } else if (ev.key === 'Escape') { fermer(); }
  });
  d.addEventListener('click', function (ev) { if (ev.target === d) { fermer(); } });
  function fermer() { d.classList.remove('open'); }

  chercher();
  input.focus();
}

/* Raccourcis clavier :
   « / » cible la recherche de la page ; Ctrl+K ouvre la recherche globale. */
document.addEventListener('keydown', function (ev) {
  var dansChamp = /^(INPUT|TEXTAREA)$/.test(document.activeElement.tagName);
  if ((ev.ctrlKey || ev.metaKey) && ev.key.toLowerCase() === 'k') {
    ev.preventDefault();
    ouvrirRechercheGlobale();
    return;
  }
  if (ev.key === '/' && !dansChamp) {
    var s = document.querySelector('.search');
    if (s) { ev.preventDefault(); s.focus(); }
    else { ev.preventDefault(); ouvrirRechercheGlobale(); }
  }
});

/* -----------------------------------------------------------
   14. Navigation
   ---------------------------------------------------------------
   Une barre plate deviendrait illisible avec quinze catalogues :
   ils sont donc regroupés par usage, en menus déroulants.
   La barre est construite ici pour rester identique sur toutes
   les pages sans avoir à les modifier une par une.
   ----------------------------------------------------------- */
var NAVIGATION = [
  { page: 'index.html', titre: 'Accueil' },
  { page: 'parcours.html', titre: 'Par où commencer' },
  { titre: 'Jouer', liens: [
    ['mecaniques.html', 'Mécaniques du jeu'],
    ['drops.html', 'Drops & lieux'],
    ['biomes.html', 'Biomes'],
    ['structures.html', 'Structures & butin'],
    ['succes.html', 'Succès']
  ] },
  { titre: 'Fabriquer', liens: [
    ['craft.html', 'Artisanat'],
    ['potions.html', 'Potions & brassage'],
    ['enchantements.html', 'Enchantements'],
    ['villageois.html', 'Villageois & commerce']
  ] },
  { titre: 'Construire', liens: [
    ['plans.html', 'Plans de construction'],
    ['blocs.html', 'Blocs de construction'],
    ['deco.html', 'Décoration'],
    ['transport.html', 'Transport & orientation']
  ] },
  { titre: 'Automatiser', liens: [
    ['usines.html', 'Usines & fermes'],
    ['redstone.html', 'Redstone']
  ] }
];

function construireNav() {
  var nav = document.querySelector('.nav');
  if (!nav) { return; }
  var page = (location.pathname.split('/').pop() || 'index.html').toLowerCase();
  var h = '';

  for (var i = 0; i < NAVIGATION.length; i++) {
    var e = NAVIGATION[i];
    if (e.page) {
      /* une page seule n'est affichée que si elle existe vraiment */
      h += '<a href="' + e.page + '"' + (e.page === page ? ' class="is-active"' : '') + '>' +
        esc(e.titre) + '</a>';
      continue;
    }
    var liens = e.liens.filter(function (l) { return DISPONIBLES[l[0]] !== false; });
    if (!liens.length) { continue; }
    var actif = liens.some(function (l) { return l[0] === page; });
    h += '<div class="nav-groupe' + (actif ? ' actif' : '') + '">' +
      '<button class="nav-titre" type="button" aria-expanded="false">' + esc(e.titre) + '</button>' +
      '<div class="nav-menu">' +
      liens.map(function (l) {
        return '<a href="' + l[0] + '"' + (l[0] === page ? ' class="is-active"' : '') + '>' + esc(l[1]) + '</a>';
      }).join('') +
      '</div></div>';
  }
  nav.innerHTML = h;

  /* ouverture au clic, fermeture au clic extérieur ou à Échap */
  var groupes = nav.querySelectorAll('.nav-groupe');
  function fermerTout(sauf) {
    for (var j = 0; j < groupes.length; j++) {
      if (groupes[j] === sauf) { continue; }
      groupes[j].classList.remove('ouvert');
      groupes[j].querySelector('.nav-titre').setAttribute('aria-expanded', 'false');
    }
  }
  for (var k = 0; k < groupes.length; k++) {
    (function (g) {
      var b = g.querySelector('.nav-titre');
      b.addEventListener('click', function (ev) {
        ev.stopPropagation();
        var ouvert = g.classList.toggle('ouvert');
        b.setAttribute('aria-expanded', ouvert ? 'true' : 'false');
        fermerTout(g);
      });
    }(groupes[k]));
  }
  document.addEventListener('click', function () { fermerTout(null); });
  document.addEventListener('keydown', function (ev) {
    if (ev.key === 'Escape') { fermerTout(null); }
  });
}

/* Pages absentes du site : renseigné par les pages elles-mêmes si besoin. */
var DISPONIBLES = {};

/* Construit la barre et installe le reste */
document.addEventListener('DOMContentLoaded', function () {
  initTheme();
  construireNav();
  var rg = document.getElementById('rg-btn');
  if (rg) { rg.addEventListener('click', ouvrirRechercheGlobale); }
});
