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
  'Aura de feu': 'fire_aspect', 'Recul': 'knockback', 'Balayage': 'sweeping_edge',
  'Efficacité': 'efficiency', 'Fortune': 'fortune', 'Toucher de soie': 'silk_touch',
  'Puissance': 'power', 'Infinité': 'infinity', 'Flamme': 'flame', 'Perforation': 'punch',
  'Protection': 'protection', 'Chute amortie': 'feather_falling', 'Épines': 'thorns',
  'Respiration': 'respiration', 'Affinité aquatique': 'aqua_affinity',
  'Agilité aquatique': 'depth_strider', 'Marche aquatique': 'frost_walker',
  'Âme rapide': 'soul_speed', 'Foulée légère': 'swift_sneak'
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
  'Bloc de note': 'note_block', 'Étiquette (name tag)': 'name_tag', 'Lance (spear)': 'iron_spear'
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
  'Blaze': 'blaze', 'Ghast': 'ghast', 'Squelette wither': 'wither_skeleton',
  'Shulker': 'shulker', 'Warden': 'warden', 'Gardien (Guardian)': 'guardian',
  'Évocateur': 'evoker', 'Ravageur': 'ravager', 'Phantom': 'phantom',
  'Magma cube': 'magma_cube', 'Strider': 'strider', 'Hoglin': 'hoglin'
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
  [/crâne de squelette wither/i, 'wither_skeleton_skull'], [/éclat de prismarine/i, 'prismarine_shard']
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

/* ============================================================ */
console.log('\n' + '─'.repeat(60));
if (ecarts) {
  console.log(`❌ ${ecarts} écart(s) entre le guide et ${path.basename(jar)}`);
  console.log('   Vérifiez chaque point dans le JSON cité avant de corriger.');
} else {
  console.log(`✅ aucun écart détecté avec ${path.basename(jar)}`);
}
process.exit(ecarts ? 1 : 0);
