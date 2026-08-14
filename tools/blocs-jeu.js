/* ============================================================
   Correspondance entre les caractères des schémas et les blocs
   réellement posables dans le jeu.

   texture-map.js donne des chemins de TEXTURE, ce qui suffit pour
   dessiner mais pas pour construire : la texture d'un escalier est
   celle de ses planches, celle d'une porte est sa moitié basse. Pour
   poser un plan dans un serveur, il faut l'identifiant du bloc.

   Les états sont donnés quand ils comptent pour la pose : une porte
   a besoin de sa moitié, une échelle d'une face d'appui, un entonnoir
   d'une direction. Ils valent pour un essai de tenue, pas pour une
   ferme qui fonctionne — l'orientation utile dépend du montage.
   ============================================================ */

/* caractère -> identifiant, éventuellement avec états */
var BLOCS_JEU = {
  '#': 'oak_planks',
  'o': 'oak_log',
  'k': 'stripped_oak_log',
  'b': 'stone_bricks',
  'c': 'cobblestone',
  'm': 'mossy_stone_bricks',
  'd': 'polished_deepslate',
  'n': 'polished_blackstone',
  'a': 'sandstone',
  'r': 'nether_bricks',
  'q': 'quartz_block',
  'g': 'glass',
  'G': 'glass_pane',
  'w': 'water',
  '~': 'water',
  'l': 'lava',
  't': 'dirt',
  'f': 'farmland',
  'e': 'grass_block',
  '%': 'oak_leaves[persistent=true]',
  '*': 'lantern',
  'D': 'oak_door[half=lower]',
  '/': 'oak_stairs',
  '-': 'smooth_stone_slab',
  '|': 'oak_fence',
  '+': 'oak_trapdoor',
  'W': 'white_wool',
  'L': 'ladder[facing=north]',
  'M': 'cobblestone_wall',
  'O': 'obsidian',
  'A': 'sand',
  'B': 'stone',
  's': 'oak_sign',
  '@': 'spawner',
  'R': 'redstone_wire',
  'X': 'redstone_torch',
  'Z': 'repeater',
  'V': 'comparator',
  'P': 'piston',
  'S': 'sticky_piston',
  'Q': 'observer',
  'H': 'hopper',
  'E': 'chest',
  'U': 'furnace',
  'Y': 'crafting_table',
  'I': 'iron_block',
  'J': 'slime_block',
  '=': 'rail',
  '_': 'stone_pressure_plate',
  '!': 'lever',
  'T': 'hopper',
  'K': 'note_block',
  'N': 'moss_block',
  'C': 'cauldron',
  'F': 'campfire',
  'p': 'cactus',
  'u': 'sugar_cane',
  'z': 'bamboo',
  'v': 'vine',
  'h': 'hay_block',
  'i': 'ice',
  'j': 'honey_block',
  'y': 'beehive',
  '&': 'bookshelf',
  '$': 'enchanting_table',
  '(': 'anvil',
  '<': 'red_bed[part=foot]',
  ';': 'white_banner',      /* trône, bannière de décor */
  '>': 'iron_door[half=lower]',
  '?': 'brewing_stand',
  ',': 'dirt_path',
  '}': 'bell',
  '^': 'air',            /* repère d'entrée : pas un bloc */
  'x': 'air',            /* emplacement du joueur */
  '1': 'air', '2': 'air', '3': 'air',   /* repères numérotés */
  '.': 'air', ' ': 'air'
};

/* Blocs qui ne tiennent que si quelque chose les porte : ce sont eux
   qui révèlent un plan impossible. */
var EXIGE_APPUI = {
  'lantern': 'dessus ou dessous, sur une face pleine',
  'ladder': 'un mur plein derrière',
  'oak_door': 'un bloc plein dessous',
  'iron_door': 'un bloc plein dessous',
  'red_bed': 'un bloc plein dessous',
  'white_banner': 'un sol ou un mur',
  'brewing_stand': 'un bloc plein dessous',
  'dirt_path': 'de la terre, et rien de plein au-dessus',
  'bell': 'un support (sol, mur ou plafond)',
  'torch': 'un sol ou un mur plein',
  'redstone_torch': 'un sol ou un mur plein',
  'redstone_wire': 'un bloc plein dessous',
  'repeater': 'un bloc plein dessous',
  'comparator': 'un bloc plein dessous',
  'rail': 'un bloc plein dessous',
  'stone_pressure_plate': 'un bloc plein dessous',
  'lever': 'un sol, un mur ou un plafond',
  'sugar_cane': 'du sable ou de la terre, avec de l\'eau à côté',
  'cactus': 'du sable, sans bloc adjacent',
  'bamboo': 'de la terre ou du sable',
  'vine': 'une face pleine à laquelle s\'accrocher',
  'oak_sign': 'un appui',
  'campfire': 'un support',
  'snow': 'un sol'
};

/* Quelques caractères désignent deux blocs selon ce qu'ils surmontent.
   « h » est le plus net : « Foin / culture » dans la légende, il vaut
   botte de foin dans un grenier et blé mûr sur une parcelle. Poser la
   botte sur de la terre labourée la retasse en terre — c'est le champ
   entier qui disparaît. */
var SELON_DESSOUS = {
  'h': { farmland: 'wheat[age=7]', defaut: 'hay_block' },
  'u': { sand: 'sugar_cane', dirt: 'sugar_cane', grass_block: 'sugar_cane', defaut: 'sugar_cane' },
  'p': { sand: 'cactus', defaut: 'cactus' }
};

function identifiant(ch, dessous) {
  var contexte = SELON_DESSOUS[ch];
  if (contexte) {
    var sous = racine(dessous || '');
    return contexte[sous] || contexte.defaut;
  }
  var v = BLOCS_JEU[ch];
  return v === undefined ? null : v;
}

/* Nom du bloc sans ses états, pour interroger EXIGE_APPUI. */
function racine(id) {
  return String(id).replace(/\[.*$/, '');
}

module.exports = { BLOCS_JEU, EXIGE_APPUI, SELON_DESSOUS, identifiant, racine };

if (require.main === module) {
  var fs = require('fs');
  var path = require('path');
  /* Contrôle : tout caractère utilisé dans un schéma doit être traduit. */
  var charger = (0, eval);
  global.window = global;
  var inerte = function () { return { classList: { add: function () {}, remove: function () {}, toggle: function () {} },
    dataset: {}, style: {}, innerHTML: '', appendChild: function () {}, querySelector: function () { return null; },
    closest: function () { return null; } }; };
  global.document = { addEventListener: function () {}, querySelector: function () { return null; },
    querySelectorAll: function () { return []; }, getElementById: function () { return null; },
    createElement: inerte, documentElement: { setAttribute: function () {}, removeAttribute: function () {} },
    body: { classList: { add: function () {}, remove: function () {} } } };
  global.location = { pathname: '/', hash: '' };
  global.localStorage = { getItem: function () { return null; }, setItem: function () {} };
  var A = path.resolve(__dirname, '..', 'assets');
  charger(fs.readFileSync(path.join(A, 'couleurs.js'), 'utf8'));
  charger(fs.readFileSync(path.join(A, 'core.js'), 'utf8'));
  ['data-plans.js', 'data-usines.js', 'data-redstone.js'].forEach(function (f) {
    charger(fs.readFileSync(path.join(A, f), 'utf8'));
  });
  var tout = [].concat(global.PLANS || [], global.USINES || [], global.CIRCUITS || []);
  var manquants = {};
  tout.forEach(function (p) {
    (p.couches || []).forEach(function (c) {
      c.g.forEach(function (l) {
        for (var i = 0; i < l.length; i++) {
          if (identifiant(l[i]) === null) { (manquants[l[i]] = manquants[l[i]] || []).push(p.id); }
        }
      });
    });
  });
  var k = Object.keys(manquants);
  console.log(Object.keys(BLOCS_JEU).length + ' caractères traduits');
  if (!k.length) { console.log('✅ tous les caractères des schémas ont un bloc'); }
  else {
    console.log('❌ ' + k.length + ' sans bloc : ');
    k.forEach(function (ch) {
      console.log('   « ' + ch +' » dans ' + Array.from(new Set(manquants[ch])).slice(0, 5).join(' '));
    });
    process.exit(1);
  }
}
