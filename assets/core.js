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
    (isoPossible(bp) ? '<button class="act" data-iso="' + esc(bp.id) + '">🧊 Voir en volume</button>' : '') +
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
/* Beaucoup de fiches mêlent aux niveaux Y des projections dessinées à
   la main — « Vue de côté », « Coupe d'un tunnel ». Elles portent un
   `vue: 1` dans les données : les empiler comme des étages donnerait
   n'importe quoi.

   Ne restent donc que les vrais niveaux, et il en faut au moins deux
   pour qu'un volume ait un sens. Les 43 fiches entièrement décrites
   en vues de côté — la plupart des usines à redstone — n'en ont
   aucun, et gardent leurs schémas d'origine. */
function couchesY(bp) {
  return (bp.couches || []).filter(function (c) { return !c.vue; });
}

function isoPossible(bp) {
  return couchesY(bp).length >= 2;
}

function shade(hex, f) {
  var h = hex.replace('#', '');
  if (h.length === 3) { h = h[0] + h[0] + h[1] + h[1] + h[2] + h[2]; }
  var r = parseInt(h.slice(0, 2), 16), g = parseInt(h.slice(2, 4), 16), b = parseInt(h.slice(4, 6), 16);
  var cl = function (v) { return Math.max(0, Math.min(255, Math.round(v * f))); };
  return 'rgb(' + cl(r) + ',' + cl(g) + ',' + cl(b) + ')';
}

/* `limite` : nombre de couches à dessiner en partant du bas.
   Masquer les couches hautes est le seul moyen de voir l'intérieur
   d'un bâtiment fermé. */
function renderIso(bp, limite) {
  /* TZ = 2 × TH est la seule hauteur qui rende les motifs de texture
     alignables : les pas entre cubes voisins — (TW, TH) en x,
     (−TW, TH) en z, (0, −TZ) en hauteur — doivent tous être des
     combinaisons entières des vecteurs de la tuile de chaque face.
     Vérifié pour toute hauteur de 8 à 24 : 16 est la seule qui marche.
     C'est aussi la proportion d'un vrai cube en isométrie 2:1 ; à 13,
     les blocs étaient discrètement écrasés. */
  var TW = 16, TH = 8, TZ = 16;          /* demi-largeur, demi-profondeur, hauteur d'un cube */
  var toutes = couchesY(bp);
  var couches = toutes.slice(0, limite || toutes.length);
  /* le cadre se mesure sur TOUTES les couches, jamais sur celles que
     le curseur laisse voir : sinon le dessin saute latéralement dès
     qu'on masque l'étage le plus large */
  var maxW = 0, maxD = 0;
  toutes.forEach(function (c) {
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

  /* la hauteur du cadre reste celle du plan complet : ainsi le dessin
     ne saute pas quand on masque des couches */
  var total = toutes.length;
  var w = (maxW + maxD) * TW + 40;
  var h = (maxW + maxD) * TH + total * TZ + 40;
  var ox = maxD * TW + 20;
  var oy = 20 + total * TZ;

  /* Trois motifs par bloc texturé : un par orientation de face.

     Un seul motif partagé, comme avant, revenait à tendre une
     tapisserie alignée sur l'écran et à y découper les faces : la
     texture ne suivait pas les arêtes, et l'alignement qu'on croyait
     voir n'était qu'une coïncidence sur certaines faces.

     patternTransform envoie ici la tuile carrée sur le losange du
     dessus et sur les deux parallélogrammes latéraux. Le décalage
     (e, f) ancre chaque tuile sur le sommet correspondant du cube
     posé à l'origine ; les pas entre cubes étant des multiples des
     vecteurs de tuile, tous les autres suivent.

     Le voile d'ombre est peint DANS le motif, ce qui ramène chaque
     face à un seul polygone au lieu de deux. */
  var S = 16;                                   /* côté de la tuile */
  var FACES = [
    { cle: 'd', m: [TW / S, TH / S, -TW / S, TH / S, 0, 0], voile: '#fff', op: .10 },
    { cle: 'g', m: [TW / S, TH / S, 0, TZ / S, -TW, TH], voile: '#000', op: .34 },
    { cle: 'r', m: [-TW / S, TH / S, 0, TZ / S, 0, 2 * TH], voile: '#000', op: .14 }
  ];

  var defs = '';
  for (var ch in motifs) {
    var t = motifs[ch].t, dossier = motifs[ch].dossier;
    /* une texture animée empile ses images : on lui donne sa hauteur
       réelle et la tuile ne montre alors que la première */
    var hImg = S * (t.n || 1);
    for (var fi = 0; fi < FACES.length; fi++) {
      var F = FACES[fi];
      defs += '<pattern id="tx' + ch.charCodeAt(0) + F.cle + '" patternUnits="userSpaceOnUse" ' +
        'width="' + S + '" height="' + S + '" patternTransform="matrix(' + F.m.join(' ') + ')">' +
        '<image href="' + dossier + t.f + '" x="0" y="0" width="' + S + '" height="' + hImg +
        '" preserveAspectRatio="none" style="image-rendering:pixelated"/>' +
        (t.t ? '<rect width="' + S + '" height="' + S + '" fill="' + t.t + '" style="mix-blend-mode:multiply"/>' : '') +
        '<rect width="' + S + '" height="' + S + '" fill="' + F.voile + '" opacity="' + F.op + '"/>' +
        '</pattern>';
    }
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
  if (ch) {
    /* un motif par orientation, ombre comprise : une face, un polygone */
    var code = ch.charCodeAt(0);
    var face = function (p, cle) {
      return '<polygon points="' + pts(p) + '" fill="url(#tx' + code + cle + ')"/>';
    };
    return '<g><title>' + esc(nom) + '</title>' +
      face(l, 'g') + face(r, 'r') + face(t, 'd') + '</g>';
  }
  var poly = function (p, c) { return '<polygon points="' + pts(p) + '" fill="' + c + '"/>'; };
  return '<g><title>' + esc(nom) + '</title>' +
    poly(l, shade(col, .72)) + poly(r, shade(col, .9)) + poly(t, shade(col, 1.15)) + '</g>';
}

/* -----------------------------------------------------------
   11 bis. Les autres axes de vue

   La vue de dessus et l'isométrie ne suffisent pas à bâtir : on
   monte un mur en le regardant DE FACE, et on ne voit jamais ce
   qu'il y a derrière ni sous le plancher. D'où trois ajouts qui
   dérivent tous des mêmes grilles, sans nouvelle donnée à saisir.
   ----------------------------------------------------------- */

/* Pivote une grille d'un quart de tour horaire, `quart` fois.
   La ligne du haut devient la colonne de droite : g'[x][z] prend
   g[hauteur-1-z][x], et largeur et profondeur s'échangent.
   Quatre quarts ramènent exactement à la grille d'origine. */
function pivoterGrille(g, quart) {
  var r = g.slice();
  var n = ((quart % 4) + 4) % 4;
  for (var k = 0; k < n; k++) {
    var h = r.length;
    var w = r.reduce(function (m, l) { return Math.max(m, l.length); }, 0);
    var out = [];
    for (var x = 0; x < w; x++) {
      var ligne = '';
      for (var z = h - 1; z >= 0; z--) {
        ligne += (r[z][x] !== undefined ? r[z][x] : ' ');
      }
      out.push(ligne);
    }
    r = out;
  }
  return r;
}

function pivoterPlan(bp, quart) {
  if (!(((quart % 4) + 4) % 4)) { return bp; }
  var copie = {};
  for (var k in bp) { if (bp.hasOwnProperty(k)) { copie[k] = bp[k]; } }
  copie.couches = (bp.couches || []).map(function (c) {
    /* on recopie TOUS les champs et on ne remplace que la grille :
       n'en lister que quelques-uns perdait le drapeau `vue`, et la
       cathédrale gagnait une couche fantôme au premier clic sur ⟳ */
    var n = {};
    for (var j in c) { if (c.hasOwnProperty(j)) { n[j] = c[j]; } }
    n.g = pivoterGrille(c.g, quart);
    return n;
  });
  return copie;
}

/* Le caractère occupe-t-il vraiment de l'espace ?
   Les grilles notent le vide par un point ou un espace ; tout autre
   caractère absent de BLOCKS reste considéré comme plein, pour ne
   pas faire disparaître un bloc à cause d'une légende manquante. */
function estVide(ch) {
  if (ch === undefined || ch === ' ' || ch === '.') { return true; }
  var b = BLOCKS[ch];
  return !!(b && !b.c);
}

/* Élévation : la façade, vue depuis le bas de la grille.

   Pour chaque colonne et chaque niveau, on remonte du premier plan
   vers le fond et on garde le premier bloc rencontré — c'est lui
   qui masque les autres. Combinée à pivoterPlan, cette seule
   fonction donne les quatre façades. */
/* Cadre commun à toutes les couches, et décalage de recentrage d'une
   couche donnée. Les étages n'ont pas tous la même empreinte : un toit
   plus étroit que ses murs est centré, exactement comme le fait
   renderIso. Sans ce décalage, la façade d'une maison à toit pentu
   part en escalier vers la gauche au lieu de faire une pyramide.
   Le Math.floor reprend la formule de renderIso, arrondi compris. */
function cadreCommun(couches) {
  var f = { maxW: 0, maxD: 0 };
  couches.forEach(function (c) {
    f.maxD = Math.max(f.maxD, c.g.length);
    c.g.forEach(function (l) { f.maxW = Math.max(f.maxW, l.length); });
  });
  return f;
}

function decalage(c, f) {
  var w = c.g.reduce(function (m, l) { return Math.max(m, l.length); }, 0);
  return { x: Math.floor((f.maxW - w) / 2), z: Math.floor((f.maxD - c.g.length) / 2) };
}

/* Case lue dans le repère commun ; hors de l'emprise de la couche,
   c'est de l'air. */
function caseDe(c, o, X, Z) {
  var z = Z - o.z, x = X - o.x;
  if (z < 0 || z >= c.g.length) { return ' '; }
  if (x < 0 || x >= c.g[z].length) { return ' '; }
  return c.g[z][x];
}

/* ---- Hauteurs réelles ----

   Les couches ne décrivent que des niveaux CLÉS : la cathédrale en a
   cinq pour vingt-huit blocs de haut, la tour de guet cinq pour vingt.
   Les empiler à intervalle régulier donnerait une façade qui ment sur
   la seule chose qu'on vient y lire — une hauteur.

   Chaque titre porte son altitude (« Y+13 · toitures de la nef »), et
   les 36 fiches concernées en ont une. On s'en sert pour placer chaque
   rangée à sa vraie hauteur, et on laisse les rangs non décrits en
   bandes explicites : mieux vaut dire « sept rangées non détaillées »
   que de recopier l'étage du dessous en faisant croire qu'on sait. */
var RE_Y = /Y\s*([+−-])\s*(\d+)/;
var RE_REP = /répéter\s+(\d+)\s+fois/i;
/* Une couche qui vaut pour plusieurs niveaux le dit dans son titre :
   « Y+1…Y+15 · fût (à répéter) », « Y+2 → Y+11 », « jusqu'à Y+3 ».
   Sans lire cette borne, on prendrait pour des lacunes des niveaux
   que les données décrivent parfaitement. */
var RE_FIN = /(?:…|\.\.\.|→|->|jusqu[’']à)\s*Y\s*([+−-])\s*(\d+)/;

function niveauxY(couches) {
  var out = [], precedent = -1;
  for (var i = 0; i < couches.length; i++) {
    var t = couches[i].t || '';
    var m = RE_Y.exec(t);
    var y = m ? (m[1] === '+' ? 1 : -1) * parseInt(m[2], 10) : precedent + 1;
    precedent = y;
    var f = RE_FIN.exec(t), r = RE_REP.exec(t), fin;
    if (f) { fin = (f[1] === '+' ? 1 : -1) * parseInt(f[2], 10); }
    else if (r) { fin = y + parseInt(r[1], 10) - 1; }
    else { fin = y; }
    out.push({ L: i, y: y, fin: Math.max(y, fin) });
  }
  /* une couche ne peut pas déborder sur la suivante */
  for (var k = 0; k < out.length - 1; k++) {
    if (out[k].fin >= out[k + 1].y) { out[k].fin = Math.max(out[k].y, out[k + 1].y - 1); }
  }
  return out;
}

/* Une entrée par rangée de hauteur, du haut vers le bas.
   `L` vaut null quand aucune couche ne décrit ce niveau. */
function rangeesY(couches) {
  var niv = niveauxY(couches);
  if (!niv.length) { return []; }
  var bas = niv[0].y, haut = niv[0].fin;
  niv.forEach(function (n) { bas = Math.min(bas, n.y); haut = Math.max(haut, n.fin); });

  var out = [];
  for (var Y = haut; Y >= bas; Y--) {
    var trouve = null;
    for (var j = 0; j < niv.length; j++) {
      if (niv[j].y <= Y && Y <= niv[j].fin) { trouve = niv[j]; if (niv[j].y === Y) { break; } }
    }
    out.push(trouve
      ? { y: Y, L: trouve.L, repet: Y !== trouve.y }
      : { y: Y, L: null });
  }
  return out;
}

/* Regroupe les rangées non décrites consécutives en une seule bande. */
function grouperTrous(rangees) {
  var out = [];
  for (var i = 0; i < rangees.length; i++) {
    if (rangees[i].L !== null) { out.push(rangees[i]); continue; }
    var j = i;
    while (j + 1 < rangees.length && rangees[j + 1].L === null) { j++; }
    /* les rangées descendent : i est le haut de la bande, j le bas */
    out.push({ bande: true, haut: rangees[i].y, bas: rangees[j].y, n: j - i + 1 });
    i = j;
  }
  return out;
}

function elevationLignes(couches) {
  var f = cadreCommun(couches);
  var lignes = [];
  for (var L = couches.length - 1; L >= 0; L--) {
    var o = decalage(couches[L], f);
    var ligne = '';
    for (var X = 0; X < f.maxW; X++) {
      var vu = '.';
      for (var Z = f.maxD - 1; Z >= 0; Z--) {
        var ch = caseDe(couches[L], o, X, Z);
        if (!estVide(ch)) { vu = ch; break; }
      }
      ligne += vu;
    }
    lignes.push(ligne);
  }
  return lignes;
}

/* Coupe : une tranche verticale à une profondeur donnée.
   C'est la seule vue qui montre l'intérieur sans rien retirer —
   indispensable pour la redstone enterrée sous un plancher. */
function coupeLignes(couches, Z) {
  var f = cadreCommun(couches);
  var lignes = [];
  for (var L = couches.length - 1; L >= 0; L--) {
    var o = decalage(couches[L], f);
    var ligne = '';
    for (var X = 0; X < f.maxW; X++) {
      var ch = caseDe(couches[L], o, X, Z);
      ligne += (ch === ' ' ? '.' : ch);
    }
    lignes.push(ligne);
  }
  return lignes;
}

/* Profondeur maximale, toutes couches confondues. */
function profondeurPlan(bp) {
  return couchesY(bp).reduce(function (m, c) { return Math.max(m, c.g.length); }, 0);
}

/* Rendu d'une vue verticale : une rangée par bloc de hauteur, avec
   son altitude en marge, et les niveaux non décrits en bandes.
   `ligneDe(L)` rend la chaîne de caractères de la couche L. */
function vueVerticaleHTML(couches, ligneDe, chars) {
  var groupes = grouperTrous(rangeesY(couches));
  var cols = cadreCommun(couches).maxW;
  var h = '<div class="vue-rangees" style="grid-template-columns:44px repeat(' + cols + ',17px)">';

  groupes.forEach(function (r) {
    if (r.bande) {
      h += '<div class="vue-y">⋯</div>' +
        '<div class="vue-bande">' + r.n + ' rangée' + (r.n > 1 ? 's' : '') +
        ' non détaillée' + (r.n > 1 ? 's' : '') + ' · ' +
        (r.n > 1 ? 'Y+' + r.bas + ' → Y+' + r.haut : 'Y+' + r.bas) + '</div>';
      return;
    }
    h += '<div class="vue-y' + (r.repet ? ' repet' : '') + '">Y' +
      (r.y < 0 ? '−' + Math.abs(r.y) : '+' + r.y) + '</div>';
    var ligne = ligneDe(r.L);
    for (var x = 0; x < cols; x++) {
      var ch = ligne[x] || '.';
      var b = BLOCKS[ch];
      if (!b) { b = { n: 'Bloc « ' + ch + ' »', c: '#4c5566' }; }
      if (b.c) {
        if (chars) { chars[ch] = b; }
        h += '<div class="bp-cell" style="' + texStyle('blocs', ch, b.c) + '" title="' + esc(b.n) + '"></div>';
      } else {
        h += '<div class="bp-cell air" title="Air"></div>';
      }
    }
  });
  return h + '</div>';
}

/* Ce que la vue verticale annonce sous le dessin. */
function resumeHauteur(couches) {
  var rs = rangeesY(couches);
  if (!rs.length) { return ''; }
  var trous = rs.filter(function (r) { return r.L === null; }).length;
  var hi = rs[0].y, lo = rs[rs.length - 1].y;
  return 'Hauteur réelle : ' + rs.length + ' rangées, Y+' + lo + ' → Y+' + hi +
    (trous ? ', dont ' + trous + ' non détaillée' + (trous > 1 ? 's' : '') + '.' : '.');
}

var ORIENTATIONS = ['Face', 'Droite', 'Arrière', 'Gauche'];

/* Construit le contenu du panneau pour l'état courant. */
function vueHTML(bp, etat) {
  var n = couchesY(bp).length;
  var pivote = pivoterPlan(bp, etat.quart);
  var chars = {};
  var corps, ctrl, aide;

  if (etat.mode === 'iso') {
    corps = '<div class="vue-dessin">' + renderIso(pivote, etat.niveau) + '</div>';
    ctrl = '<label for="niv-' + esc(bp.id) + '">Couches visibles</label>' +
      '<input id="niv-' + esc(bp.id) + '" type="range" min="1" max="' + n + '" value="' + etat.niveau + '" ' +
      'data-vue-niveau="' + esc(bp.id) + '">' +
      '<span class="iso-niv">' + etat.niveau + ' / ' + n + '</span>';
    aide = 'Réduisez le curseur pour retirer les couches hautes et voir l\'intérieur. ' +
      'Faites pivoter pour découvrir l\'arrière.';
  } else if (etat.mode === 'face') {
    var cf = couchesY(pivote);
    var lignesF = elevationLignes(cf);
    /* elevationLignes rend du haut vers le bas : la couche L y occupe
       la position (nombre de couches − 1 − L) */
    corps = '<div class="vue-dessin">' +
      vueVerticaleHTML(cf, function (L) { return lignesF[cf.length - 1 - L]; }, chars) + '</div>';
    ctrl = '';
    aide = 'La façade telle qu\'on la voit en la construisant : chaque case est le bloc ' +
      'le plus en avant, placé à sa hauteur réelle. ' + resumeHauteur(cf) +
      ' Pivotez pour passer aux trois autres côtés.';
  } else {
    var prof = profondeurPlan(pivote);
    var z = Math.min(etat.tranche, prof - 1);
    var cc = couchesY(pivote);
    var lignesC = coupeLignes(cc, z);
    corps = '<div class="vue-dessin">' +
      vueVerticaleHTML(cc, function (L) { return lignesC[cc.length - 1 - L]; }, chars) + '</div>';
    ctrl = '<label for="cpe-' + esc(bp.id) + '">Profondeur</label>' +
      '<input id="cpe-' + esc(bp.id) + '" type="range" min="0" max="' + (prof - 1) + '" value="' + z + '" ' +
      'data-vue-tranche="' + esc(bp.id) + '">' +
      '<span class="iso-niv">' + (z + 1) + ' / ' + prof + '</span>';
    aide = 'Une tranche verticale, du plus près au plus loin. C\'est la seule vue qui ' +
      'montre ce qui est enfermé : redstone sous le plancher, pièce sans fenêtre. ' +
      resumeHauteur(cc);
  }

  var onglet = function (cle, texte) {
    return '<button class="vue-tab' + (etat.mode === cle ? ' on' : '') + '" data-vue-mode="' + cle +
      '" data-vue-id="' + esc(bp.id) + '">' + texte + '</button>';
  };

  return '<div class="vue-tabs">' +
      onglet('iso', '🧊 Isométrie') + onglet('face', '🧱 Façade') + onglet('coupe', '✂️ Coupe') +
      '<button class="vue-tab vue-pivot" data-vue-pivot="' + esc(bp.id) + '" ' +
      'title="Faire pivoter d\'un quart de tour">⟳ ' + ORIENTATIONS[etat.quart] + '</button>' +
    '</div>' +
    corps +
    (Object.keys(chars).length ? legendHTML(chars) : '') +
    (ctrl ? '<div class="iso-ctrl">' + ctrl + '</div>' : '') +
    '<p class="iso-hint">' + aide + '<br>Survolez un bloc pour lire son nom.</p>';
}

/* État de chaque panneau, par identifiant de plan. */
var etatsVue = {};
function etatDe(bp) {
  if (!etatsVue[bp.id]) {
    etatsVue[bp.id] = { mode: 'iso', quart: 0, niveau: couchesY(bp).length, tranche: 0 };
  }
  return etatsVue[bp.id];
}

function redessinerVue(bp) {
  var box = document.getElementById('vues-' + bp.id);
  if (box) { box.innerHTML = vueHTML(bp, etatDe(bp)); }
}

/* Bouton « Vues » : le panneau n'est construit qu'au premier clic */
document.addEventListener('click', function (ev) {
  if (!ev.target.closest) { return; }

  var b = ev.target.closest('[data-iso]');
  if (b) {
    var host = b.closest('[data-search]');
    var box = host && host.querySelector('.iso-wrap');
    if (!box) { return; }
    if (!box.dataset.built) {
      var bp = (window.__isoIndex || {})[b.dataset.iso];
      if (!bp) { return; }
      box.id = 'vues-' + bp.id;
      box.innerHTML = vueHTML(bp, etatDe(bp));
      box.dataset.built = '1';
    }
    var open = box.classList.toggle('open');
    b.classList.toggle('on', open);
    b.textContent = open ? '◾ Masquer les vues' : '🧊 Voir en volume';
    return;
  }

  var t = ev.target.closest('[data-vue-mode]');
  if (t) {
    var bpm = (window.__isoIndex || {})[t.dataset.vueId];
    if (!bpm) { return; }
    etatDe(bpm).mode = t.dataset.vueMode;
    redessinerVue(bpm);
    return;
  }

  var p = ev.target.closest('[data-vue-pivot]');
  if (p) {
    var bpp = (window.__isoIndex || {})[p.dataset.vuePivot];
    if (!bpp) { return; }
    var e = etatDe(bpp);
    e.quart = (e.quart + 1) % 4;
    /* la profondeur change avec l'orientation : on ramène la coupe
       dans les bornes plutôt que de la laisser hors champ */
    e.tranche = Math.min(e.tranche, profondeurPlan(pivoterPlan(bpp, e.quart)) - 1);
    redessinerVue(bpp);
  }
});

/* Curseurs : couches visibles en isométrie, profondeur en coupe.

   On ne redessine ici QUE le dessin et son compteur : refaire tout le
   panneau détruirait le curseur en cours de glissement, et le geste
   s'interromprait au premier cran. */
document.addEventListener('input', function (ev) {
  var s = ev.target;
  if (!s || !s.dataset) { return; }
  var id = s.dataset.vueNiveau || s.dataset.vueTranche;
  if (!id) { return; }
  var bp = (window.__isoIndex || {})[id];
  if (!bp) { return; }

  var box = s.closest('.iso-wrap');
  var dessin = box && box.querySelector('.vue-dessin');
  var compteur = box && box.querySelector('.iso-niv');
  if (!dessin) { return; }

  var e = etatDe(bp);
  var v = parseInt(s.value, 10);
  if (s.dataset.vueNiveau) {
    e.niveau = v;
    dessin.innerHTML = renderIso(pivoterPlan(bp, e.quart), v);
    if (compteur) { compteur.textContent = v + ' / ' + couchesY(bp).length; }
  } else {
    e.tranche = v;
    var pivote = pivoterPlan(bp, e.quart);
    var cc = couchesY(pivote);
    var lignes = coupeLignes(cc, v);
    dessin.innerHTML = vueVerticaleHTML(cc, function (L) { return lignes[cc.length - 1 - L]; }, {});
    if (compteur) { compteur.textContent = (v + 1) + ' / ' + profondeurPlan(pivote); }
  }
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

/* Une vue de côté montre les mêmes blocs qu'un niveau, sous un autre
   angle : les compter tous les deux double le total. Quand la fiche a
   de vrais niveaux, on s'en tient à eux.

   Reste le cas des 43 usines décrites uniquement en vues de côté :
   là, il n'y a rien d'autre à compter. Le total est alors approché,
   et `approche` sert à le dire au lieu de le taire. */
function calculerMateriaux(bp) {
  var total = {}, repetees = [];
  var niveaux = couchesY(bp);
  var approche = niveaux.length === 0;
  var source = approche ? (bp.couches || []) : niveaux;

  source.forEach(function (c) {
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
  return { liste: liste, repetees: repetees, approche: approche };
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

  if (r.approche) {
    h += '<p class="mat-note avert">⚠ Cette fiche est décrite en vues de côté, qui montrent ' +
      'les mêmes blocs sous plusieurs angles : le total ci-dessus les compte donc plusieurs fois. ' +
      'Prenez-le comme un ordre de grandeur, pas comme une liste de courses.</p>';
  }

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
