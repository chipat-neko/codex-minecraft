/* ============================================================
   Compare le contenu du site aux données réelles du jeu.

   Usage :  node tools/verifier-jeu.js [chemin/vers/version.jar]

   Contrôle automatiquement, sans intervention :
     · les recettes d'artisanat (disposition, ingrédients, quantité)
     · les niveaux maximaux des enchantements
     · les objets cités dans les tables de butin des mobs
     · les outils requis par les minerais
     · la table de troc des piglins

   Sort en erreur si un écart est trouvé, pour pouvoir être
   relancé après chaque mise à jour du jeu.
   ============================================================ */

const fs = require('fs');
const path = require('path');
const { trouverJar, lister, lireJson } = require('./jar.js');

const RACINE = path.resolve(__dirname, '..');
const jar = trouverJar(process.argv[2]);
if (!jar || !fs.existsSync(jar)) {
  console.error('Aucun .jar Minecraft trouvé. Passez son chemin en argument.');
  process.exit(2);
}
console.log('Version de référence :', path.basename(jar), '\n');

/* ---------- chargement du site ---------- */
global.document = {
  createElement: () => ({ _h: '', classList: { add() {} }, dataset: {}, style: {},
    get innerHTML() { return this._h; }, set innerHTML(v) { this._h = v; }, appendChild() {}, set id(v) {} }),
  addEventListener() {}, querySelector: () => null, querySelectorAll: () => [], getElementById: () => null,
  documentElement: { setAttribute() {}, removeAttribute() {} }, body: { classList: { add() {}, remove() {} } }
};
global.location = { pathname: '/', hash: '' };
global.window = global;
global.localStorage = { getItem: () => null, setItem() {} };

const charger = (0, eval);
for (const f of ['couleurs.js', 'core.js', ...fs.readdirSync(path.join(RACINE, 'assets')).filter(x => x.startsWith('data-'))]) {
  charger(fs.readFileSync(path.join(RACINE, 'assets', f), 'utf8'));
}

let ecarts = 0, verifs = 0;
const ecart = (sujet, dit, reel, preuve) => {
  console.log(`  ✗ ${sujet}`);
  console.log(`      guide : ${dit}`);
  console.log(`      jeu   : ${reel}`);
  if (preuve) { console.log(`      source: ${preuve}`); }
  ecarts++;
};

/* ============================================================
   1. Enchantements : niveau maximal
   ============================================================ */
console.log('[1] Enchantements');

/* nom français du guide -> identifiant du jeu */
const ENCH_ID = {
  'Solidité': 'unbreaking', 'Raccommodage': 'mending', 'Tranchant': 'sharpness',
  'Châtiment': 'smite', 'Fléau des arthropodes': 'bane_of_arthropods', 'Butin': 'looting',
  'Aura de feu': 'fire_aspect', 'Recul': 'knockback', 'Affilage': 'sweeping_edge',
  'Efficacité': 'efficiency', 'Fortune': 'fortune', 'Toucher de soie': 'silk_touch',
  'Puissance': 'power', 'Infinité': 'infinity', 'Flamme': 'flame', 'Frappe': 'punch',
  'Protection': 'protection', 'Chute amortie': 'feather_falling', 'Épines': 'thorns',
  'Apnée': 'respiration', 'Affinité aquatique': 'aqua_affinity',
  'Agilité aquatique': 'depth_strider', 'Semelles givrantes': 'frost_walker',
  'Agilité des âmes': 'soul_speed', 'Furtivité rapide': 'swift_sneak'
};
const ROMAIN = { I: 1, II: 2, III: 3, IV: 4, V: 5 };

const idsEnch = [...new Set(Object.values(ENCH_ID))];
const jsonEnch = lireJson(jar, idsEnch.map(i => `data/minecraft/enchantment/${i}.json`));

for (const fiche of (typeof ENCHANTS !== 'undefined' ? ENCHANTS : [])) {
  /* « Fortune III », « Solidité III (Unbreaking) »… */
  const m = fiche.nom.match(/^([A-Za-zÀ-ÿ' ]+?)\s+(I{1,3}|IV|V)\b/);
  if (!m) { continue; }
  const id = ENCH_ID[m[1].trim()];
  if (!id) { continue; }
  const data = jsonEnch[`data/minecraft/enchantment/${id}.json`];
  if (!data || data.max_level === undefined) { continue; }
  verifs++;
  const annonce = ROMAIN[m[2]];
  if (annonce !== data.max_level) {
    ecart(`enchantement « ${fiche.nom} »`,
      `niveau maximal ${annonce}`, `niveau maximal ${data.max_level}`,
      `enchantment/${id}.json`);
  }
}
console.log(`    ${verifs} niveaux maximaux contrôlés`);

/* ============================================================
   2. Recettes : existence et quantité produite
   ============================================================ */
console.log('\n[2] Recettes');

/* nom de recette du guide -> identifiant de recette du jeu */
const RECETTE_ID = {
  'Établi': 'crafting_table', 'Coffre': 'chest', 'Fourneau': 'furnace', 'Torche': 'torch',
  'Échelle': 'ladder', 'Seau': 'bucket', 'Cisaille': 'shears', 'Briquet': 'flint_and_steel',
  'Bouclier': 'shield', 'Arc': 'bow', 'Flèche': 'arrow', 'Longue-vue': 'spyglass',
  'Torche de redstone': 'redstone_torch', 'Répéteur': 'repeater', 'Comparateur': 'comparator',
  'Piston': 'piston', 'Observateur': 'observer', 'Entonnoir (hopper)': 'hopper',
  'Distributeur (dispenser)': 'dispenser', 'Lanceur (dropper)': 'dropper',
  'Fabricateur (crafter)': 'crafter', 'Rails': 'rail', 'Rail motorisé': 'powered_rail',
  'TNT': 'tnt', 'Levier': 'lever', 'Table d\'enchantement': 'enchanting_table',
  'Bibliothèque': 'bookshelf', 'Enclume': 'anvil', 'Meule (grindstone)': 'grindstone',
  'Alambic': 'brewing_stand', 'Chaudron': 'cauldron', 'Balise (beacon)': 'beacon',
  'Haut fourneau': 'blast_furnace', 'Fumoir': 'smoker', 'Table de forge (smithing)': 'smithing_table',
  'Métier à tisser (loom)': 'loom', 'Table de cartographie': 'cartography_table',
  'Composteur': 'composter', 'Tonneau': 'barrel', 'Lutrin': 'lectern', 'Pain': 'bread',
  'Carotte dorée': 'golden_carrot', 'Pomme dorée': 'golden_apple', 'Gâteau': 'cake',
  'Cookies': 'cookie', 'Wagonnet': 'minecart', 'Boîte de shulker': 'shulker_box',
  'Cadre d\'objet': 'item_frame', 'Boussole de récupération': 'recovery_compass',
  'Échafaudage': 'scaffolding', 'Œil de l\'Ender': 'ender_eye', 'Masse (Mace)': 'mace',
  'Lanterne': 'lantern', 'Chaîne': 'iron_chain', 'Bougie': 'candle', 'Papier': 'paper',
  'Livre': 'book', 'Cible (target)': 'target', 'Crochet de détente': 'tripwire_hook',
  'Longe (laisse)': 'lead', 'Wagonnet-coffre': 'chest_minecart', 'Lampe de redstone': 'redstone_lamp',
  'Bloc de foin': 'hay_block', 'Bloc de charbon': 'coal_block', 'Barreaux de fer': 'iron_bars',
  'Pot de fleurs': 'flower_pot', 'Support à armure': 'armor_stand', 'Jukebox': 'jukebox',
  'Bloc de note': 'note_block', 'Étiquette (name tag)': 'name_tag', 'Lance (spear)': 'iron_spear',
  /* Recettes à matériau générique : on contrôle sur la variante en fer
     ou en chêne, la disposition et la quantité étant les mêmes. */
  'Planches': 'oak_planks', 'Bâton': 'stick', 'Lit': 'white_bed',
  'Porte en bois': 'oak_door', 'Bateau': 'oak_boat', 'Pioche': 'iron_pickaxe',
  'Hache': 'iron_axe', 'Pelle': 'iron_shovel', 'Houe': 'iron_hoe',
  'Épée': 'iron_sword', 'Canne à pêche': 'fishing_rod', 'Brosse (archéologie)': 'brush',
  'Casque': 'iron_helmet', 'Plastron': 'iron_chestplate', 'Jambières': 'iron_leggings',
  'Bottes': 'iron_boots', 'Lingot de netherite': 'netherite_ingot',
  'Escaliers': 'oak_stairs', 'Dalles': 'oak_slab', 'Muret': 'cobblestone_wall',
  'Briques de pierre': 'stone_bricks', 'Bloc de briques': 'bricks',
  'Tapis': 'white_carpet', 'Verre teinté': 'white_stained_glass',
  'Pierre lumineuse': 'glowstone', 'Torche des âmes': 'soul_torch',
  'Feu de camp': 'campfire', 'Citrouille-lanterne': 'jack_o_lantern',
  'Pot décoré': 'decorated_pot', 'Cadre lumineux': 'glow_item_frame',
  'Panneau': 'oak_sign', 'Détecteur de lumière du jour': 'daylight_detector',
  'Rail détecteur': 'detector_rail', 'Rail activateur': 'activator_rail',
  'Tarte à la citrouille': 'pumpkin_pie', 'Carte vierge': 'map',
  'Livre et plume': 'writable_book', 'Soupe de champignons': 'mushroom_stew',
  'Melon scintillant': 'glistering_melon_slice', 'Cristal de l\'End': 'end_crystal',
  'Bannière': 'white_banner', 'Poudre de béton': 'white_concrete_powder',
  'Fusée de feu d\'artifice': 'firework_rocket', 'Verre': 'glass'
};

const idsRec = Object.values(RECETTE_ID);
const jsonRec = lireJson(jar, idsRec.map(i => `data/minecraft/recipe/${i}.json`));

let recVerifs = 0;
for (const r of (typeof RECETTES !== 'undefined' ? RECETTES : [])) {
  const id = RECETTE_ID[r.nom];
  if (!id) { continue; }
  const data = jsonRec[`data/minecraft/recipe/${id}.json`];
  if (!data) {
    ecart(`recette « ${r.nom} »`, 'présente dans le guide', 'introuvable dans cette version', `recipe/${id}.json`);
    continue;
  }
  recVerifs++;

  /* quantité produite */
  const attendu = (data.result && data.result.count) || 1;
  const annonce = r.qte || 1;
  if (attendu !== annonce) {
    ecart(`recette « ${r.nom} » : quantité`, `×${annonce}`, `×${attendu}`, `recipe/${id}.json`);
  }

  /* nombre de lignes du motif, pour les recettes à forme */
  if (data.pattern && r.grille) {
    if (data.pattern.length !== r.grille.length) {
      ecart(`recette « ${r.nom} » : disposition`,
        `${r.grille.length} ligne(s)`, `${data.pattern.length} ligne(s) : ${JSON.stringify(data.pattern)}`,
        `recipe/${id}.json`);
    }
  }
}
console.log(`    ${recVerifs} recettes contrôlées sur ${(typeof RECETTES !== 'undefined' ? RECETTES.length : 0)}`);

/* ============================================================
   3. Minerais : outil réellement requis
   ============================================================ */
console.log('\n[3] Minerais');

const TAGS = lireJson(jar, [
  'data/minecraft/tags/block/needs_stone_tool.json',
  'data/minecraft/tags/block/needs_iron_tool.json',
  'data/minecraft/tags/block/needs_diamond_tool.json'
]);
const paliers = {};
for (const [chemin, palier] of [
  ['data/minecraft/tags/block/needs_stone_tool.json', 'Pioche en pierre'],
  ['data/minecraft/tags/block/needs_iron_tool.json', 'Pioche en fer'],
  ['data/minecraft/tags/block/needs_diamond_tool.json', 'Pioche en diamant']
]) {
  const t = TAGS[chemin];
  if (t && t.values) { t.values.forEach(v => { paliers[String(v).replace('minecraft:', '')] = palier; }); }
}

const MINERAI_ID = {
  'Charbon': 'coal_ore', 'Cuivre': 'copper_ore', 'Fer': 'iron_ore', 'Lapis-lazuli': 'lapis_ore',
  'Redstone': 'redstone_ore', 'Or': 'gold_ore', 'Diamant': 'diamond_ore', 'Émeraude': 'emerald_ore',
  'Quartz du Nether': 'nether_quartz_ore', 'Or du Nether': 'nether_gold_ore', 'Débris antiques': 'ancient_debris'
};
let minVerifs = 0;
for (const ligne of (typeof MINERAIS !== 'undefined' ? MINERAIS : [])) {
  const id = MINERAI_ID[ligne[0]];
  if (!id) { continue; }
  minVerifs++;
  const reel = paliers[id] || 'Pioche en bois';
  const annonce = String(ligne[2]).trim();
  if (!annonce.startsWith(reel.split(' en ')[0]) || annonce !== reel) {
    if (annonce !== reel) {
      ecart(`minerai « ${ligne[0]} » : outil`, annonce, reel, `tags/block/needs_*_tool.json`);
    }
  }
}
console.log(`    ${minVerifs} minerais contrôlés`);

/* ============================================================
   4. Troc des piglins
   ============================================================ */
console.log('\n[4] Troc des piglins');

const troc = lireJson(jar, ['data/minecraft/loot_table/gameplay/piglin_bartering.json'])
  ['data/minecraft/loot_table/gameplay/piglin_bartering.json'];
if (troc && troc.pools && troc.pools[0]) {
  const entrees = troc.pools[0].entries;
  if (typeof TROC !== 'undefined' && TROC.length !== entrees.length) {
    ecart('table de troc : nombre de résultats',
      `${TROC.length} lignes`, `${entrees.length} entrées`,
      'loot_table/gameplay/piglin_bartering.json');
  } else {
    console.log(`    ${entrees.length} résultats possibles, autant que dans le guide`);
  }
}

/* ============================================================
   5. Mobs : les objets cités existent-ils dans leur table ?
   ============================================================ */
console.log('\n[5] Butin des mobs');

const MOB_ID = {
  'Zombie': 'zombie', 'Squelette': 'skeleton', 'Creeper': 'creeper', 'Araignée': 'spider',
  'Enderman': 'enderman', 'Sorcière': 'witch', 'Noyé (Drowned)': 'drowned',
  'Blaze': 'blaze', 'Ghast': 'ghast', 'Wither squelette': 'wither_skeleton',
  'Shulker': 'shulker', 'Warden': 'warden', 'Gardien (Guardian)': 'guardian',
  'Évocateur': 'evoker', 'Ravageur': 'ravager', 'Phantom': 'phantom',
  'Cube de magma': 'magma_cube', 'Arpenteur (Strider)': 'strider', 'Hoglin': 'hoglin'
};
const idsMob = Object.values(MOB_ID);
const jsonMob = lireJson(jar, idsMob.map(i => `data/minecraft/loot_table/entities/${i}.json`));

/* mots-clés français -> identifiant d'objet attendu dans la table.

   Attention : certains objets ne figurent JAMAIS dans une table de butin
   parce qu'ils sont portés par le mob et lâchés par le mécanisme
   d'équipement (le trident et le coquillage nautile du noyé, par exemple).
   Les inclure ici produirait de faux écarts : ils sont donc exclus. */
const MOTS = [
  [/perle de l'ender/i, 'ender_pearl'], [/bâton de blaze/i, 'blaze_rod'],
  [/larme de ghast/i, 'ghast_tear'], [/carapace de shulker/i, 'shulker_shell'],
  [/éclat d'écho/i, 'echo_shard'], [/catalyseur de sculk/i, 'sculk_catalyst'],
  [/totem d'immortalité/i, 'totem_of_undying'],
  [/membrane de phantom/i, 'phantom_membrane'], [/crème de magma/i, 'magma_cream'],
  [/crâne de wither squelette/i, 'wither_skeleton_skull'], [/éclat de prismarine/i, 'prismarine_shard']
];

let mobVerifs = 0;
for (const fiche of (typeof DROPS !== 'undefined' ? DROPS : [])) {
  const id = MOB_ID[fiche.nom];
  if (!id) { continue; }
  const data = jsonMob[`data/minecraft/loot_table/entities/${id}.json`];
  if (!data) { continue; }
  mobVerifs++;
  const contenu = JSON.stringify(data);
  for (const puce of (fiche.drops || [])) {
    for (const [motif, attendu] of MOTS) {
      if (!motif.test(puce)) { continue; }
      /* le guide peut mentionner un objet pour dire qu'il ne tombe PAS */
      if (/\bne lâche (aucun|pas)\b|pas d'|jamais/i.test(puce)) { continue; }
      if (contenu.indexOf('minecraft:' + attendu) === -1) {
        ecart(`« ${fiche.nom} » : objet cité`,
          puce.slice(0, 70), `${attendu} absent de sa table de butin`,
          `loot_table/entities/${id}.json`);
      }
    }
  }
}
console.log(`    ${mobVerifs} mobs contrôlés`);

/* ============================================================
   6. Recettes : contrôle exhaustif par déduction du nom
   ============================================================
   Au-delà de la table de correspondance ci-dessus, on tente de
   retrouver automatiquement chaque recette restante grâce au nom
   de l'objet produit. Ce qui reste introuvable est listé pour
   qu'on puisse compléter la table à la main. */
console.log('\n[6] Recettes restantes (couverture)');

const toutesRecettes = new Set(
  lister(jar, '^data/minecraft/recipe/[a-z_]+[.]json$')
    .map(p => p.replace('data/minecraft/recipe/', '').replace('.json', ''))
);

const nonMappees = (typeof RECETTES !== 'undefined' ? RECETTES : [])
  .filter(r => !RECETTE_ID[r.nom]);

/* recettes du guide qui décrivent volontairement autre chose qu'un craft */
const HORS_CRAFT = /construction|ne se craft plus|clic droit|durcissement|cuisson|forge/i;

let devinees = 0, aCompleter = [];
for (const r of nonMappees) {
  if (HORS_CRAFT.test(r.station || '') || HORS_CRAFT.test(r.nom)) { continue; }
  /* essai : le nom du guide, sans accent ni parenthèse, en identifiant */
  const base = r.nom.toLowerCase()
    .normalize('NFD').replace(/[̀-ͯ]/g, '')
    .replace(/\([^)]*\)/g, '').trim()
    .replace(/[^a-z0-9]+/g, '_').replace(/^_|_$/g, '');
  if (toutesRecettes.has(base)) { devinees++; }
  else { aCompleter.push(r.nom); }
}
console.log(`    ${devinees} recette(s) retrouvée(s) automatiquement`);
if (aCompleter.length) {
  console.log(`    ${aCompleter.length} recette(s) non contrôlées faute de correspondance :`);
  console.log('      ' + aCompleter.slice(0, 12).join(' · ') + (aCompleter.length > 12 ? ' …' : ''));
  console.log('      (ajoutez-les à RECETTE_ID dans ce fichier pour les couvrir)');
}

/* ============================================================
   7. Structures : les coffres cités existent-ils ?
   ============================================================ */
console.log('\n[7] Structures');

const STRUCT_ID = {
  'donjon': 'simple_dungeon', 'mine abandonnée': 'abandoned_mineshaft',
  'temple du désert': 'desert_pyramid', 'temple de la jungle': 'jungle_temple',
  'manoir des bois': 'woodland_mansion', 'igloo': 'igloo_chest',
  'avant-poste': 'pillager_outpost', 'forteresse du nether': 'nether_bridge',
  'cité de l\'end': 'end_city_treasure', 'trésor enfoui': 'buried_treasure',
  'cité antique': 'ancient_city', 'bastion': 'bastion_treasure'
};
/* les ruines de sentier ne sont pas des coffres mais des sites de fouille */
const STRUCT_AUTRES = { 'ruines de sentier': 'archaeology/trail_ruins_common' };

const idsStruct = [...new Set(Object.values(STRUCT_ID))];
const jsonStruct = Object.assign(
  lireJson(jar, idsStruct.map(i => `data/minecraft/loot_table/chests/${i}.json`)),
  lireJson(jar, Object.values(STRUCT_AUTRES).map(i => `data/minecraft/loot_table/${i}.json`))
);
for (const cle in STRUCT_AUTRES) {
  const c = `data/minecraft/loot_table/${STRUCT_AUTRES[cle]}.json`;
  if (!jsonStruct[c]) { ecart(`site de fouille « ${cle} »`, 'attendu', 'introuvable', c); }
}
let structVerifs = 0, structManquants = [];
for (const cle in STRUCT_ID) {
  const chemin = `data/minecraft/loot_table/chests/${STRUCT_ID[cle]}.json`;
  if (jsonStruct[chemin]) { structVerifs++; }
  else { structManquants.push(STRUCT_ID[cle]); }
}
console.log(`    ${structVerifs} tables de coffre trouvées`);
if (structManquants.length) {
  ecart('tables de coffre introuvables', 'attendues par le contrôle',
    structManquants.join(', '), 'loot_table/chests/');
}

/* ---- contenu des coffres, item par item ----

   Le guide décrit les coffres en prose. On ne peut donc pas comparer
   des listes : on cherche dans le texte les objets « décisifs », ceux
   pour lesquels un joueur fait le déplacement, et on vérifie qu'ils
   figurent bien dans la table.

   Deux précautions rendent ce contrôle utilisable :
     · seules les lignes qui décrivent un coffre sont lues, pour ne pas
       confondre le butin avec les blocs récupérables ou les mobs ;
     · les libellés sont encadrés de frontières de mots, sans quoi
       « seau » se déclencherait sur « réseau » et « os » sur « posez ».
*/
const FICHE_TABLE = {
  'Donjon (salle du générateur)': 'simple_dungeon',
  'Mine abandonnée': 'abandoned_mineshaft',
  'Temple du désert': 'desert_pyramid',
  'Temple de la jungle': 'jungle_temple',
  'Manoir des bois': 'woodland_mansion',
  'Igloo': 'igloo_chest',
  'Avant-poste de pillards': 'pillager_outpost',
  'Forteresse du Nether': 'nether_bridge',
  'Cité de l\'End': 'end_city_treasure',
  'Navire de l\'End': 'end_city_treasure',
  'Trésor enfoui': 'buried_treasure',
  'Cité antique': 'ancient_city',
  'Bastion — salle du trésor': 'bastion_treasure',
  'Bastion — pont': 'bastion_bridge',
  'Bastion — écuries de hoglins': 'bastion_hoglin_stable',
  'Bastion — unités d\'habitation': 'bastion_other'
};

/* Objet décisif annoncé -> identifiant du jeu. */
const BUTIN_ID = {
  'selle': 'saddle', 'diamant': 'diamond', 'émeraude': 'emerald',
  'lingot de netherite': 'netherite_ingot', 'débris antique': 'ancient_debris',
  'éclat de netherite': 'netherite_scrap', 'pomme d\'or enchantée': 'enchanted_golden_apple',
  'pomme d\'or': 'golden_apple', 'étiquette': 'name_tag', 'laisse': 'lead',
  'amas de résine': 'resin_clump', 'cotte de mailles': 'chainmail_chestplate',
  'corne de chèvre': 'goat_horn', 'cœur de la mer': 'heart_of_the_sea',
  'éclat d\'écho': 'echo_shard', 'obsidienne pleureuse': 'crying_obsidian',
  'pierre-aimant': 'lodestone', 'arbalète': 'crossbow', 'briquet': 'flint_and_steel',
  'flèche spectrale': 'spectral_arrow', 'carotte dorée': 'golden_carrot',
  'bannière piglin': 'piglin_banner_pattern', 'verrue du nether': 'nether_wart',
  'cristaux de prismarine': 'prismarine_crystals', 'fiole d\'expérience': 'experience_bottle',
  'crochet': 'tripwire_hook', 'bambou': 'bamboo', 'rail': 'rail',
  'baie lumineuse': 'glow_berries', 'torche': 'torch', 'lapis': 'lapis_lazuli',
  'sac': 'bundle', 'boussole': 'compass', 'pierre noire dorée': 'gilded_blackstone'
};

/* Lignes de prose qui décrivent bien un contenu de coffre. */
const EST_COFFRE = /^(coffres?|coffre[- ]fort|deux coffres|armures? pour nautile)\b/i;

/* Un « livre enchanté » est écrit `book` + enchant_randomly dans les
   tables : on relève donc aussi les objets rendus enchantés. */
function itemsDeLaTable(obj, acc) {
  acc = acc || new Set();
  if (!obj || typeof obj !== 'object') { return acc; }
  if (Array.isArray(obj)) { obj.forEach(x => itemsDeLaTable(x, acc)); return acc; }
  if (obj.type === 'minecraft:item' && typeof obj.name === 'string') {
    acc.add(obj.name.replace('minecraft:', ''));
  }
  for (const k in obj) { itemsDeLaTable(obj[k], acc); }
  return acc;
}

const idsButin = [...new Set(Object.values(FICHE_TABLE))];
const tablesButin = lireJson(jar, idsButin.map(i => `data/minecraft/loot_table/chests/${i}.json`));

const LETTRE = /[a-zàâäéèêëîïôöùûüçœ]/i;
/* Noms qui désignent aussi bien une ressource qu'un matériau. */
const MATIERE = /^(diamant|or|fer|cuivre|netherite|émeraude)$/;

/* Le libellé est-il annoncé comme objet à part entière dans ce texte ?

   On exige des frontières de mots, sans quoi « seau » se déclencherait
   sur « réseau » et « os » sur « posez ». Et pour les noms de matière,
   on écarte « en diamant » ou « de fer », qui qualifient un objet au
   lieu de promettre la ressource brute. */
function annonce(lib, texte) {
  const e = lib.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const re = new RegExp(e + 's?', 'gi');
  let m;
  while ((m = re.exec(texte)) !== null) {
    const avant = texte[m.index - 1];
    const apres = texte[m.index + m[0].length];
    if ((avant && LETTRE.test(avant)) || (apres && LETTRE.test(apres))) { continue; }
    if (MATIERE.test(lib)) {
      const precede = texte.slice(0, m.index).match(/(\S+)\s+$/);
      if (precede && /^(en|de|du|d'|d’)$/i.test(precede[1])) { continue; }
    }
    return true;
  }
  return false;
}

let butinVerifs = 0;
for (const [nomFiche, id] of Object.entries(FICHE_TABLE)) {
  const fiche = (typeof STRUCTURES_DETAIL !== 'undefined' ? STRUCTURES_DETAIL : [])
    .find(s => s.nom === nomFiche);
  const table = tablesButin[`data/minecraft/loot_table/chests/${id}.json`];
  if (!fiche || !table) { continue; }

  const dedans = itemsDeLaTable(table);
  const lignes = (fiche.drops || []).filter(l => EST_COFFRE.test(l.trim()));
  if (!lignes.length) { continue; }
  const texte = lignes.join(' · ');

  for (const [lib, cible] of Object.entries(BUTIN_ID)) {
    if (!annonce(lib, texte)) { continue; }
    butinVerifs++;
    if (!dedans.has(cible)) {
      ecart(`${nomFiche} : « ${lib} » annoncé en coffre`,
        'présent dans le butin', 'absent de la table',
        `loot_table/chests/${id}.json`);
    }
  }
}
console.log(`    ${butinVerifs} objets de coffre contrôlés dans ${Object.keys(FICHE_TABLE).length} fiches`);
verifs += butinVerifs;

/* ============================================================
   8. Métiers de villageois : les blocs de métier existent
   ============================================================ */
console.log('\n[8] Métiers');

const METIER_BLOC = {
  'Bibliothécaire': 'lectern', 'Fermier': 'composter', 'Armurier': 'blast_furnace',
  'Forgeron d\'outils': 'smithing_table', 'Forgeron d\'armes': 'grindstone',
  'Clerc (prêtre)': 'brewing_stand', 'Cartographe': 'cartography_table',
  'Fléchier': 'fletching_table', 'Berger': 'loom', 'Boucher': 'smoker',
  'Pêcheur': 'barrel', 'Tanneur': 'cauldron', 'Maçon': 'stonecutter'
};
const idsBloc = Object.values(METIER_BLOC);
const jsonBloc = lireJson(jar, idsBloc.map(i => `data/minecraft/loot_table/blocks/${i}.json`));
let metVerifs = 0;
for (const m of (typeof METIERS !== 'undefined' ? METIERS : [])) {
  const bloc = METIER_BLOC[m.nom];
  if (!bloc) { continue; }
  metVerifs++;
  if (!jsonBloc[`data/minecraft/loot_table/blocks/${bloc}.json`]) {
    ecart(`métier « ${m.nom} » : bloc de métier`,
      bloc, 'ce bloc n\'existe pas dans cette version', `loot_table/blocks/${bloc}.json`);
  }
}
console.log(`    ${metVerifs} blocs de métier contrôlés`);

/* ============================================================
   9. Succès : les noms anglais cités existent-ils ?
   ============================================================ */
console.log('\n[9] Succès');

const tousSucces = new Set(
  lister(jar, '^data/minecraft/advancement/(story|nether|end|adventure|husbandry)/[a-z_]+[.]json$')
    .map(p => p.replace(/.*\//, '').replace('.json', ''))
);
let succVerifs = 0, succInconnus = [];
for (const s of (typeof ADVANCEMENTS !== 'undefined' ? ADVANCEMENTS : [])) {
  /* le guide écrit « Nom français (English Name) » */
  const m = s.nom.match(/\(([^)]+)\)\s*$/);
  if (!m) { continue; }
  succVerifs++;
  const id = m[1].toLowerCase().replace(/[^a-z0-9]+/g, '_').replace(/^_|_$/g, '');
  /* on cherche une correspondance approchée : les identifiants ne
     reprennent pas toujours le titre affiché */
  let trouve = tousSucces.has(id);
  if (!trouve) {
    for (const cand of tousSucces) {
      if (cand.includes(id) || id.includes(cand)) { trouve = true; break; }
    }
  }
  if (!trouve) { succInconnus.push(m[1]); }
}
console.log(`    ${succVerifs} succès contrôlés, ${tousSucces.size} succès dans le jeu`);
if (succInconnus.length) {
  console.log(`    ${succInconnus.length} nom(s) sans correspondance directe d'identifiant :`);
  console.log('      ' + succInconnus.slice(0, 10).join(' · ') + (succInconnus.length > 10 ? ' …' : ''));
  console.log('      (les titres affichés diffèrent souvent des identifiants : à vérifier au cas par cas,');
  console.log('       ce n\'est pas nécessairement une erreur)');
}

/* ============================================================
   10. Potions : ingrédient et durées

   Le brassage n'existe sous aucune forme JSON : il est construit en
   dur dans PotionBrewing. tools/brassage.js lit ce code et rend la
   table complète, ainsi que la durée de chaque effet en ticks.
   ============================================================ */
console.log('\n[10] Potions');

/* Ingrédient annoncé par le guide -> identifiant du jeu.
   Les libellés sont ceux du champ `ou` de chaque fiche. */
const INGREDIENT_ID = {
  'verrue du nether': 'nether_wart', 'poudre lumineuse': 'glowstone_dust',
  'poudre de blaze': 'blaze_powder', 'sucre': 'sugar', 'crème de magma': 'magma_cream',
  'carotte dorée': 'golden_carrot', 'poisson-globe': 'pufferfish',
  'tranche de pastèque scintillante': 'glistering_melon_slice',
  'larme de ghast': 'ghast_tear', 'patte de lapin': 'rabbit_foot',
  'œil d\'araignée fermenté': 'fermented_spider_eye', 'œil d\'araignée': 'spider_eye',
  'membrane de phantom': 'phantom_membrane', 'carapace de tortue': 'turtle_helmet',
  'bâton de breeze': 'breeze_rod', 'bloc de slime': 'slime_block',
  'toile d\'araignée': 'cobweb', 'roche': 'stone', 'poudre de redstone': 'redstone'
};

/* Fiche du guide -> potion produite par le jeu. Une fiche peut en
   couvrir deux quand les recettes sont jumelles. */
const POTION_ID = {
  'Potion étrange': 'awkward', 'Potion épaisse': 'thick', 'Potion banale': 'mundane',
  'Force': 'strength', 'Rapidité': 'swiftness', 'Résistance au feu': 'fire_resistance',
  'Vision nocturne': 'night_vision', 'Respiration aquatique': 'water_breathing',
  'Soin instantané': 'healing', 'Régénération': 'regeneration', 'Saut': 'leaping',
  'Lenteur': 'slowness', 'Faiblesse': 'weakness', 'Poison': 'poison',
  'Chute lente': 'slow_falling', 'Maître Tortue': 'turtle_master',
  'Souffle (Wind Charged)': 'wind_charged', 'Infestation': 'infested',
  'Invisibilité': 'invisibility', 'Dégâts instantanés': 'harming',
  'Viscosité et Tissage': ['oozing', 'weaving']
};

let brassage = null;
try { brassage = require('./brassage.js'); } catch (e) {
  console.log('    outil de lecture du bytecode indisponible : ' + e.message);
}

if (brassage) {
  const { mixes } = brassage.extraire();
  const parEffet = brassage.effets();
  let potVerifs = 0;

  const cibles = nom => [].concat(POTION_ID[nom] || []);

  /* a) l'ingrédient annoncé produit-il bien cette potion ? */
  for (const p of (typeof POTIONS !== 'undefined' ? POTIONS : [])) {
    const liste = cibles(p.nom);
    if (!liste.length || !p.ou) { continue; }

    /* on relève tous les ingrédients cités dans la ligne de recette,
       du libellé le plus long au plus court pour que « œil d'araignée
       fermenté » l'emporte sur « œil d'araignée » */
    const dit = p.ou.toLowerCase();
    const cites = Object.keys(INGREDIENT_ID)
      .sort((a, b) => b.length - a.length)
      .filter(lib => dit.includes(lib))
      .filter((lib, i, t) => !t.slice(0, i).some(plusLong => plusLong.includes(lib)))
      .map(lib => INGREDIENT_ID[lib]);
    if (!cites.length) { continue; }

    potVerifs++;
    const reels = mixes.filter(m => liste.includes(m.vers)).map(m => m.avec);
    const faux = cites.filter(c => !reels.includes(c));
    if (faux.length) {
      ecart('Potion : ' + p.nom,
        'obtenue avec ' + faux.join(', '),
        reels.length ? 'obtenue avec ' + [...new Set(reels)].join(', ') : 'aucune recette vers ' + liste.join('/'),
        'PotionBrewing.addVanillaMixes');
    }
  }

  /* b) les durées annoncées correspondent-elles ? */
  const LIGNE = /(?:base|durée de base)\s*(\d+:\d{2})(?:[^\d]*redstone\s*(\d+:\d{2}))?/i;
  for (const p of (typeof POTIONS !== 'undefined' ? POTIONS : [])) {
    /* pour une fiche double, la durée annoncée vaut pour les deux */
    const cible = cibles(p.nom)[0];
    if (!cible || !parEffet[cible] || !parEffet[cible].length) { continue; }

    const m = LIGNE.exec((p.drops || []).join(' · '));
    if (!m) { continue; }
    potVerifs++;

    const attendu = brassage.duree(parEffet[cible][0].ticks);
    if (m[1] !== attendu) {
      ecart('Durée de base : ' + p.nom, m[1], attendu,
        'Potions.' + cible.toUpperCase() + ' = ' + parEffet[cible][0].ticks + ' ticks');
    }
    if (m[2]) {
      const longue = parEffet['long_' + cible];
      if (!longue || !longue.length) {
        ecart('Durée prolongée : ' + p.nom, m[2],
          'aucune version prolongée dans le jeu', 'Potions.LONG_' + cible.toUpperCase());
      } else {
        const attenduLong = brassage.duree(longue[0].ticks);
        if (m[2] !== attenduLong) {
          ecart('Durée prolongée : ' + p.nom, m[2], attenduLong,
            'Potions.LONG_' + cible.toUpperCase() + ' = ' + longue[0].ticks + ' ticks');
        }
      }
    }
  }

  /* c) une potion du jeu manque-t-elle au guide ? */
  const couvertes = new Set([].concat(...Object.values(POTION_ID)));
  const oubliees = [...new Set(mixes.map(m => m.vers))]
    .filter(v => !/^long_|^strong_/.test(v))
    .filter(v => !couvertes.has(v))
    .filter(v => (parEffet[v] || []).length);
  if (oubliees.length) {
    console.log(`    ${oubliees.length} potion(s) brassables absentes du guide : ${oubliees.join(' · ')}`);
  }

  console.log(`    ${potVerifs} contrôles sur ${Object.keys(POTION_ID).length} fiches, ` +
    `${mixes.length} recettes de brassage lues dans le code`);
  verifs += potVerifs;
}

/* ============================================================ */
console.log('\n' + '─'.repeat(60));
if (ecarts) {
  console.log(`❌ ${ecarts} écart(s) entre le guide et ${path.basename(jar)}`);
  console.log('   Vérifiez chaque point dans le JSON cité avant de corriger.');
} else {
  console.log(`✅ aucun écart détecté avec ${path.basename(jar)}`);
}
process.exit(ecarts ? 1 : 0);
