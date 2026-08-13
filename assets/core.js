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
      g += slotHTML(it);
    }
  }
  g += '</div>';

  var outItem = ITEMS[r.sortieItem] || { n: r.sortie, c: '#2fd47a', t: '✔' };
  var out = '<div class="out">' + slotHTML(outItem) +
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

function slotHTML(it) {
  if (!it || !it.c) { return '<div class="slot"></div>'; }
  return '<div class="slot filled" style="background:' + it.c + '" title="' + esc(it.n) + '">' +
    '<span class="lbl">' + esc(it.t || '') + '</span></div>';
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
    (isoPossible(bp) ? '<button class="act" data-iso="' + esc(bp.id) + '">🧊 Vue 3D</button>' : '') +
    '</div><div class="iso-wrap"></div>';

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
        h += '<div class="bp-cell" style="background:' + b.c + '" title="' + esc(b.n) + '"></div>';
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
    return '<span class="legend-item"><span class="legend-swatch" style="background:' +
      chars[k].c + '"></span><code>' + esc(k) + '</code> ' + esc(chars[k].n) + '</span>';
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

  var tags = '';
  (e.tags || []).forEach(function (t) {
    tags += '<span class="tag ' + (t.cls || '') + '">' + esc(t.txt || t) + '</span>';
  });

  var html = '<div class="entry-head"><h3>' + esc(e.nom) + '</h3>' + tags + favBtnHTML(e.nom) + '</div>';
  if (e.ou) { html += '<div class="where">📍 ' + esc(e.ou) + '</div>'; }
  if (e.drops && e.drops.length) {
    html += '<ul>' + e.drops.map(function (d) { return '<li>' + boldFirst(d) + '</li>'; }).join('') + '</ul>';
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

/* Met en gras la partie avant « : » ou « — » puis échappe le reste. */
function boldFirst(s) {
  s = String(s);
  var m = s.match(/^([^:—]{2,42})(\s*[:—]\s*)([\s\S]+)$/);
  if (m) { return '<b>' + esc(m[1]) + '</b>' + esc(m[2]) + esc(m[3]); }
  return esc(s);
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
        cells.push({ x: x + offX, z: z + offZ, c: blk.c, n: blk.n });
      }
    }
    /* du fond vers l'avant pour un recouvrement correct */
    cells.sort(function (a, b) { return (a.x + a.z) - (b.x + b.z); });
    cells.forEach(function (c) {
      var sx = (c.x - c.z) * TW;
      var sy = (c.x + c.z) * TH - L * TZ;
      parts.push(cube(sx, sy, TW, TH, TZ, c.c, c.n));
    });
  }

  var w = (maxW + maxD) * TW + 40;
  var h = (maxW + maxD) * TH + couches.length * TZ + 40;
  var ox = maxD * TW + 20;
  var oy = 20 + couches.length * TZ;

  return '<svg viewBox="0 0 ' + w + ' ' + h + '" width="' + Math.max(300, Math.min(w, 900)) + '" role="img" ' +
    'aria-label="Vue isométrique de ' + esc(bp.nom) + '">' +
    '<g transform="translate(' + ox + ',' + oy + ')">' + parts.join('') + '</g></svg>';
}

function cube(x, y, tw, th, tz, col, nom) {
  var top = shade(col, 1.15), left = shade(col, .72), right = shade(col, .9);
  var t = [x, y, x + tw, y + th, x, y + 2 * th, x - tw, y + th];
  var l = [x - tw, y + th, x, y + 2 * th, x, y + 2 * th + tz, x - tw, y + th + tz];
  var r = [x + tw, y + th, x, y + 2 * th, x, y + 2 * th + tz, x + tw, y + th + tz];
  var poly = function (p, c) {
    return '<polygon points="' + p[0] + ',' + p[1] + ' ' + p[2] + ',' + p[3] + ' ' +
      p[4] + ',' + p[5] + ' ' + p[6] + ',' + p[7] + '" fill="' + c + '"/>';
  };
  return '<g><title>' + esc(nom) + '</title>' + poly(l, left) + poly(r, right) + poly(t, top) + '</g>';
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

/* Raccourci « / » pour aller à la recherche */
document.addEventListener('keydown', function (ev) {
  if (ev.key === '/' && document.activeElement.tagName !== 'INPUT') {
    var s = document.querySelector('.search');
    if (s) { ev.preventDefault(); s.focus(); }
  }
});

/* Surligne l'onglet actif et installe le bouton de thème */
document.addEventListener('DOMContentLoaded', function () {
  initTheme();
  var page = (location.pathname.split('/').pop() || 'index.html').toLowerCase();
  var links = document.querySelectorAll('.nav a');
  for (var i = 0; i < links.length; i++) {
    var href = (links[i].getAttribute('href') || '').toLowerCase();
    if (href === page || (page === '' && href === 'index.html')) {
      links[i].classList.add('is-active');
    }
  }
});
