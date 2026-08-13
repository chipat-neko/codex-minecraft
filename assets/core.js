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

  var head = '<div class="recipe-title"><h3>' + esc(r.nom) + '</h3>' +
    '<span class="tag ' + (r.tagCls || '') + '">' + esc(r.station || 'Établi') + '</span></div>';

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

  var html = '<div class="bp-head"><h3>' + esc(bp.nom) + '</h3>' +
    (bp.taille ? '<span class="tag">' + esc(bp.taille) + '</span>' : '') +
    (bp.diff ? '<span class="tag ' + diffCls(bp.diff) + '">' + esc(bp.diff) + '</span>' : '') +
    '</div>';

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

  var tags = '';
  (e.tags || []).forEach(function (t) {
    tags += '<span class="tag ' + (t.cls || '') + '">' + esc(t.txt || t) + '</span>';
  });

  var html = '<div class="entry-head"><h3>' + esc(e.nom) + '</h3>' + tags + '</div>';
  if (e.ou) { html += '<div class="where">📍 ' + esc(e.ou) + '</div>'; }
  if (e.drops && e.drops.length) {
    html += '<ul>' + e.drops.map(function (d) { return '<li>' + boldFirst(d) + '</li>'; }).join('') + '</ul>';
  }
  if (e.note) { html += '<div class="note">💡 ' + esc(e.note) + '</div>'; }

  el.innerHTML = html;
  return el;
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
      var okCat = active === 'all' || it.dataset.cat === active;
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
    if (empty) { empty.style.display = shown ? 'none' : ''; }
  }

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

/* Raccourci « / » pour aller à la recherche */
document.addEventListener('keydown', function (ev) {
  if (ev.key === '/' && document.activeElement.tagName !== 'INPUT') {
    var s = document.querySelector('.search');
    if (s) { ev.preventDefault(); s.focus(); }
  }
});

/* Surligne l'onglet actif */
document.addEventListener('DOMContentLoaded', function () {
  var page = (location.pathname.split('/').pop() || 'index.html').toLowerCase();
  var links = document.querySelectorAll('.nav a');
  for (var i = 0; i < links.length; i++) {
    var href = (links[i].getAttribute('href') || '').toLowerCase();
    if (href === page || (page === '' && href === 'index.html')) {
      links[i].classList.add('is-active');
    }
  }
});
