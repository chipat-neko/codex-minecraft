/* ============================================================
   Données : drops, lieux d'apparition, minerais, butin de structures
   Toutes les probabilités sont données en difficulté Normale,
   sans enchantement, sauf mention contraire.
   ============================================================ */

var DROPS = [

  /* ---------------- MONSTRES — SURWORLD ---------------- */
  {
    nom: 'Zombie', cat: 'hostile',
    tags: [{ txt: 'Surworld', cls: 'ok' }, { txt: '5 XP', cls: 'gold' }],
    ou: 'Partout où la lumière du bloc est à 0 : surface la nuit, grottes, donjons. Apparaît aussi dans les villages (siège de zombies) et via les générateurs de donjon.',
    drops: [
      'Chair putréfiée ×0–2 — +1 par niveau de Butin (max 5)',
      'Rare (2,5 %) : lingot de fer, carotte ou pomme de terre — +1 % par niveau de Butin',
      'Équipement porté (5–8,5 %) : l\'armure ou l\'arme qu\'il tient, avec durabilité aléatoire',
      'Tête de zombie : uniquement s\'il est tué par un creeper chargé'
    ],
    note: '5 % des zombies apparaissent en « zombie bébé » : plus rapides, donnent 12 XP, peuvent chevaucher un poulet.'
  },
  {
    nom: 'Squelette', cat: 'hostile',
    tags: [{ txt: 'Surworld', cls: 'ok' }, { txt: '5 XP', cls: 'gold' }],
    ou: 'Zones sombres du Surworld, grottes, donjons, générateurs. Dans le Nether : forteresses (squelettes wither).',
    drops: [
      'Os ×0–2 — jusqu\'à 5 avec Butin III',
      'Flèche ×0–2 — jusqu\'à 5 avec Butin III',
      'Arc (8,5 %) et équipement porté',
      'Tête de squelette : uniquement tué par un creeper chargé'
    ],
    note: 'Source principale de poudre d\'os : 1 os → 3 poudres d\'os → engrais pour toutes les cultures.'
  },
  {
    nom: 'Creeper', cat: 'hostile',
    tags: [{ txt: 'Surworld', cls: 'ok' }, { txt: '5 XP', cls: 'gold' }],
    ou: 'Zones sombres, ne brûle pas au soleil : on en croise donc en plein jour. Jamais dans les donjons via générateur.',
    drops: [
      'Poudre à canon ×0–2 — jusqu\'à 5 avec Butin III',
      'Disque de musique : si le creeper est tué par une flèche de squelette (13, cat, blocks, chirp, far, mall, mellohi, stal, strad, ward, 11, wait)',
      'Tête de creeper : tué par l\'explosion d\'un creeper chargé'
    ],
    note: 'Un creeper frappé par la foudre devient « chargé » : son explosion fait tomber la tête des mobs voisins.'
  },
  {
    nom: 'Araignée', cat: 'hostile',
    tags: [{ txt: 'Surworld', cls: 'ok' }, { txt: '5 XP', cls: 'gold' }],
    ou: 'Zones sombres, grottes, mines abandonnées (araignée venimeuse via cocons). Neutre en pleine lumière.',
    drops: [
      'Ficelle ×0–2 — jusqu\'à 5 avec Butin III',
      'Œil d\'araignée (33 % si tuée par le joueur) — ingrédient des potions de poison / soin instantané'
    ],
    note: 'L\'araignée grimpe aux murs : toute ferme ou base doit prévoir un surplomb ou des murs de 2 blocs en dévers.'
  },
  {
    nom: 'Enderman', cat: 'hostile',
    tags: [{ txt: 'Surworld / Nether / End', cls: 'purple' }, { txt: '5 XP', cls: 'gold' }],
    ou: 'Lumière ≤ 7 dans le Surworld, très fréquent dans les plaines de l\'End et dans les vallées de sable des âmes / forêts déformées du Nether.',
    drops: [
      'Perle de l\'Ender ×0–1 (50 %) — jusqu\'à 4 avec Butin III',
      'Le bloc qu\'il transportait (si applicable)'
    ],
    note: 'Indispensable : perle + poudre de Blaze = œil de l\'Ender, la clé du portail de l\'End. Prévoyez au moins 15 yeux.'
  },
  {
    nom: 'Sorcière', cat: 'hostile',
    tags: [{ txt: 'Surworld', cls: 'ok' }, { txt: '5 XP', cls: 'gold' }],
    ou: 'Zones sombres, huttes de marais (avec un chat noir), raids de pillards.',
    drops: [
      'Redstone : GARANTIE à chaque mort, dans un second lot indépendant du tirage aléatoire',
      'Butin aléatoire ×1–3 parmi : poudre lumineuse, sucre, œil d\'araignée, fiole en verre, poudre à canon, bâton',
      'Potion en cours de consommation : rarement lâchée telle quelle'
    ],
    note: 'La redstone tombe à tous les coups : c\'est la meilleure source renouvelable sans minage, et la raison d\'être des fermes à sorcières en hutte de marais.'
  },
  {
    nom: 'Noyé (Drowned)', cat: 'hostile',
    tags: [{ txt: 'Océans / rivières', cls: 'blue' }, { txt: '5 XP', cls: 'gold' }],
    ou: 'Océans, rivières, grottes aquatiques (Y ≤ 58). Un zombie qui se noie 30 s se transforme en noyé.',
    drops: [
      'Chair putréfiée ×0–2',
      'Trident (8,5 % de ceux qui en portent — environ 6,25 % des noyés en tiennent un)',
      'Coquillage nautile (3 % ; 100 % s\'il en tient un dans la main gauche) — 8 coquillages + cœur de la mer = conduit',
      'Cuivre ×0–1 (11 %) — seule source renouvelable de cuivre'
    ],
    note: 'Les noyés issus de la conversion d\'un zombie ne lâchent jamais de trident : il faut des noyés apparus naturellement.'
  },
  {
    nom: 'Husk (zombie du désert)', cat: 'hostile',
    tags: [{ txt: 'Déserts', cls: 'gold' }, { txt: '5 XP', cls: 'gold' }],
    ou: 'Déserts, à n\'importe quelle heure — il ne brûle pas au soleil.',
    drops: [
      'Chair putréfiée ×0–2, mêmes drops rares que le zombie (fer, carotte, pomme de terre)',
      'Se transforme en zombie normal s\'il se noie'
    ],
    note: 'Ses coups infligent la Faim : emportez de la nourriture en excès quand vous traversez un désert la nuit.'
  },
  {
    nom: 'Stray (squelette des neiges)', cat: 'hostile',
    tags: [{ txt: 'Biomes glacés', cls: 'cyan' }, { txt: '5 XP', cls: 'gold' }],
    ou: 'Plaines enneigées, pics glacés, toundra — à ciel ouvert.',
    drops: [
      'Os ×0–2, flèche ×0–2',
      'Flèche de Lenteur ×0–1 (50 %) — impossible à fabriquer autrement sans brassage'
    ],
    note: 'Piège à joueur : ses flèches ralentissent, ce qui rend la fuite très difficile en terrain découvert.'
  },
  {
    nom: 'Bogged (squelette des marais)', cat: 'hostile',
    tags: [{ txt: 'Marais / chambres', cls: 'ok' }, { txt: '5 XP', cls: 'gold' }],
    ou: 'Marais, marais de mangrove, et générateurs des chambres d\'épreuve.',
    drops: [
      'Os ×0–2, flèche ×0–2',
      'Champignon rouge ou brun (tondable à la cisaille pour récupérer des champignons)'
    ],
    note: 'Ses flèches empoisonnent. Tondez-le à la cisaille : il perd ses champignons et devient un squelette classique visuellement.'
  },
  {
    nom: 'Araignée venimeuse', cat: 'hostile',
    tags: [{ txt: 'Mines abandonnées', cls: 'gold' }, { txt: '5 XP', cls: 'gold' }],
    ou: 'Exclusivement via les générateurs entourés de toiles dans les mines abandonnées.',
    drops: ['Ficelle ×0–2', 'Œil d\'araignée (33 %)'],
    note: 'Empoisonne (pas en Facile). Sa petite taille lui permet de passer dans un espace d\'un demi-bloc — bouchez les dalles.'
  },
  {
    nom: 'Slime', cat: 'hostile',
    tags: [{ txt: 'Chunks à slime / marais', cls: 'ok' }, { txt: '1–4 XP', cls: 'gold' }],
    ou: 'Sous Y = 40 dans environ 1 chunk sur 10 (« slime chunks », déterminés par la graine du monde), et dans les marais entre Y 50 et 70 par nuit de pleine lune.',
    drops: [
      'Boule de slime ×0–2 (uniquement le petit slime)',
      'Un gros slime se scinde en 2–4 slimes moyens, puis en petits'
    ],
    note: 'Le bloc de slime est la pierre angulaire des machines volantes, ascenseurs à pistons et fermes à TNT.'
  },
  {
    nom: 'Silverfish (poisson d\'argent)', cat: 'hostile',
    tags: [{ txt: 'Monts / forteresse', cls: '' }, { txt: '5 XP', cls: 'gold' }],
    ou: 'Blocs infestés en montagne et dans les forteresses (près du portail de l\'End).',
    drops: ['Aucun objet — seulement de l\'XP'],
    note: 'Frapper un poisson d\'argent réveille tous ceux qui sont cachés dans les blocs alentour : utilisez une épée à balayage ou de la lave.'
  },
  {
    nom: 'Phantom', cat: 'hostile',
    tags: [{ txt: 'Ciel nocturne', cls: 'purple' }, { txt: '5 XP', cls: 'gold' }],
    ou: 'Apparaît au-dessus du joueur quand il n\'a pas dormi depuis 3 jours en jeu et se trouve à ciel ouvert.',
    drops: ['Membrane de Phantom ×0–1 — répare l\'élytre à l\'enclume et sert à la potion de Chute lente'],
    note: 'Seule source de membranes : gardez volontairement 3 nuits sans dormir avant une session de chasse.'
  },
  {
    nom: 'Creaking (le Craquant)', cat: 'hostile',
    tags: [{ txt: 'Forêt pâle', cls: 'purple' }, { txt: 'Invincible', cls: 'red' }],
    ou: 'Forêt pâle (pale garden), la nuit, engendré par un « cœur du Craquant » (creaking heart) présent dans les troncs de chêne pâle.',
    drops: [
      'Le mob lui-même ne lâche rien — il est indestructible tant que son cœur existe',
      'Détruire le cœur du Craquant (pioche + Toucher de soie) : le mob disparaît en particules'
    ],
    note: 'Il ne bouge que lorsque vous ne le regardez pas. Pour l\'éliminer : suivez ses particules jusqu\'au tronc contenant le cœur et cassez-le.'
  },
  {
    nom: 'Pillard (Pillager)', cat: 'hostile',
    tags: [{ txt: 'Avant-postes / raids', cls: 'red' }, { txt: '5 XP', cls: 'gold' }],
    ou: 'Avant-postes de pillards, patrouilles aléatoires en surface, vagues de raid.',
    drops: [
      'Arbalète (8,5 %) — parfois enchantée',
      'Flèches (uniquement celles chargées dans l\'arbalète)',
      'Butin de raid : émeraudes, objets de vague (uniquement pendant un raid)'
    ],
    note: 'Tuer un capitaine (celui qui porte la bannière) donne « Mauvais présage » : entrer dans un village déclenche alors un raid.'
  },
  {
    nom: 'Vindicateur', cat: 'hostile',
    tags: [{ txt: 'Manoir / raids', cls: 'red' }, { txt: '5 XP', cls: 'gold' }],
    ou: 'Manoirs des bois, raids de village.',
    drops: ['Hache en fer (8,5 %)', 'Émeraude ×0–1 pendant un raid'],
    note: '« Johnny » (renommé à l\'étiquette) attaque tous les mobs sauf les autres illageois — pratique et dangereux.'
  },
  {
    nom: 'Évocateur', cat: 'hostile',
    tags: [{ txt: 'Manoir / raids', cls: 'red' }, { txt: '10 XP', cls: 'gold' }],
    ou: 'Manoirs des bois (salle secrète) et vague finale des raids.',
    drops: [
      'Totem d\'immortalité (100 %) — évite une mort, se tient en main secondaire',
      'Émeraude ×0–1 pendant un raid'
    ],
    note: 'Le totem est l\'objet le plus précieux du jeu en survie hardcore : une ferme à raids en produit des piles entières.'
  },
  {
    nom: 'Ravageur', cat: 'hostile',
    tags: [{ txt: 'Raids', cls: 'red' }, { txt: '20 XP', cls: 'gold' }],
    ou: 'Vagues avancées de raid, monté par un pillard ou un évocateur.',
    drops: ['Selle (100 %)'],
    note: 'Il détruit feuillage et cultures et projette le joueur en l\'air. Le bloquer derrière des murs de pierre : il ne casse pas la pierre.'
  },
  {
    nom: 'Vex', cat: 'hostile',
    tags: [{ txt: 'Invoqué', cls: 'purple' }, { txt: '3 XP', cls: 'gold' }],
    ou: 'Invoqué par les évocateurs — traverse les murs.',
    drops: ['Épée en fer (8,5 %)'],
    note: 'Il disparaît tout seul au bout de 30–120 s : se cacher derrière un mur épais ne suffit pas, mais attendre oui.'
  },
  {
    nom: 'Breeze', cat: 'hostile',
    tags: [{ txt: 'Chambres d\'épreuve', cls: 'cyan' }, { txt: '10 XP', cls: 'gold' }],
    ou: 'Générateurs d\'épreuve dans les chambres d\'épreuve (trial chambers).',
    drops: ['Tige de Breeze (wind charge) — fabrique les charges de vent et le brise-vent (mace / masse)'],
    note: 'Ses projectiles activent boutons, leviers et plaques : les salles d\'épreuve exploitent cette mécanique dans leurs pièges.'
  },
  {
    nom: 'Gardien (Guardian)', cat: 'hostile',
    tags: [{ txt: 'Monument marin', cls: 'blue' }, { txt: '10 XP', cls: 'gold' }],
    ou: 'Uniquement dans et autour des monuments océaniques.',
    drops: [
      'Éclat de prismarine ×0–2',
      'Cristal de prismarine ×0–1 (40 %) — sert aux lanternes marines',
      'Poisson cru (2,5 %)'
    ],
    note: 'Une ferme à gardiens sur monument vidé produit prismarine, cristaux et XP en quantités industrielles.'
  },
  {
    nom: 'Gardien ancien (Elder Guardian)', cat: 'hostile',
    tags: [{ txt: 'Monument marin', cls: 'blue' }, { txt: 'Mini-boss', cls: 'red' }],
    ou: 'Trois par monument océanique : un au sommet, deux dans les ailes.',
    drops: [
      'Éclat de prismarine ×0–2, cristal de prismarine ×0–1',
      'Éponge mouillée (100 %) — à cuire au four pour absorber l\'eau',
      'Poisson cru (2,5 %)'
    ],
    note: 'Inflige « Fatigue de minage III » à 50 blocs. Buvez du lait, ou tuez les trois anciens avant de vider le monument.'
  },
  {
    nom: 'Warden', cat: 'hostile',
    tags: [{ txt: 'Cité antique', cls: 'purple' }, { txt: 'Danger extrême', cls: 'red' }],
    ou: 'Cité antique (deep dark), invoqué par 3 alertes de « shrieker » à sculk. Ne peut pas apparaître naturellement autrement.',
    drops: [
      'Catalyseur de sculk ×1 — c\'est son SEUL butin',
      'Il ne lâche AUCUN éclat d\'écho : ceux-ci se trouvent uniquement dans les coffres de la cité antique. Inutile de le combattre pour eux'
    ],
    note: 'Il est aveugle et chasse aux vibrations. Accroupissez-vous, jetez une boule de neige pour créer un leurre sonore, et fuyez : il ne peut pas être vaincu efficacement en équipement standard.'
  },

  /* ---------------- MONSTRES — NETHER ---------------- */
  {
    nom: 'Blaze', cat: 'nether',
    tags: [{ txt: 'Nether', cls: 'red' }, { txt: '10 XP', cls: 'gold' }],
    ou: 'Forteresses du Nether, presque exclusivement via les générateurs de Blaze.',
    drops: ['Bâton de Blaze ×0–1 (50 % si tué par le joueur) — jusqu\'à 4 avec Butin III'],
    note: '1 bâton = 2 poudres de Blaze. Il faut de la poudre pour l\'alambic ET pour les yeux de l\'Ender : sécurisez un générateur de Blaze.'
  },
  {
    nom: 'Ghast', cat: 'nether',
    tags: [{ txt: 'Nether', cls: 'red' }, { txt: '5 XP', cls: 'gold' }],
    ou: 'Vastes espaces ouverts : mer de lave, deltas de basalte, vallées de sable des âmes.',
    drops: [
      'Larme de Ghast ×0–1 (50 %) — potion de Régénération, cristal de l\'End',
      'Poudre à canon ×0–2'
    ],
    note: 'Ses boules de feu peuvent être renvoyées d\'un coup d\'épée ou d\'un projectile : c\'est aussi ainsi qu\'on allume un portail sans briquet.'
  },
  {
    nom: 'Squelette wither', cat: 'nether',
    tags: [{ txt: 'Forteresse', cls: 'red' }, { txt: '5 XP', cls: 'gold' }],
    ou: 'Forteresses du Nether, sur les blocs de briques du Nether (lumière ≤ 11).',
    drops: [
      'Charbon ×0–1 (33 %), os ×0–2',
      'Crâne de squelette wither (2,5 %, +1 % par niveau de Butin) — il en faut 3 pour invoquer le Wither',
      'Épée en pierre (8,5 %)'
    ],
    note: 'Sa taille de 2,4 blocs : un plafond à 2 blocs de haut l\'empêche d\'apparaître, très utile pour aménager une forteresse.'
  },
  {
    nom: 'Piglin', cat: 'nether',
    tags: [{ txt: 'Nether', cls: 'gold' }, { txt: 'Troc', cls: 'ok' }],
    ou: 'Forêts écarlates, deltas de basalte, vallées de sable des âmes, bastions.',
    drops: [
      'Son équipement (arbalète, épée en or, armure) 8,5 %',
      'Troc : jetez-lui un lingot d\'or, il rend un objet aléatoire (voir la table de troc)'
    ],
    note: 'Portez au moins une pièce d\'armure en or pour ne pas être attaqué. Ouvrir un coffre ou casser de l\'or les rend hostiles quand même.'
  },
  {
    nom: 'Piglin brute', cat: 'nether',
    tags: [{ txt: 'Bastion', cls: 'red' }, { txt: '20 XP', cls: 'gold' }],
    ou: 'Bastions uniquement.',
    drops: ['Hache en or (8,5 %)'],
    note: 'L\'or ne l\'apaise pas et il ne troque pas. Il tape fort : privilégiez la fuite ou les blocs de couverture.'
  },
  {
    nom: 'Hoglin', cat: 'nether',
    tags: [{ txt: 'Forêt écarlate', cls: 'red' }, { txt: '5 XP', cls: 'gold' }],
    ou: 'Forêts écarlates et bastions.',
    drops: ['Longe de porc crue ×2–4 (jusqu\'à 7 avec Butin III)', 'Cuir ×0–1'],
    note: 'Seule source de viande élevable du Nether : ils se reproduisent avec des champignons difformes (crimson fungus).'
  },
  {
    nom: 'Zombie-piglin (zombified piglin)', cat: 'nether',
    tags: [{ txt: 'Nether', cls: 'gold' }, { txt: 'Neutre', cls: '' }],
    ou: 'Partout dans le Nether ; apparaît aussi dans le Surworld près d\'un portail actif, ou quand un cochon est frappé par la foudre.',
    drops: [
      'Chair putréfiée ×0–1, pépite d\'or ×0–1',
      'Lingot d\'or (2,5 %), épée en or (8,5 %)'
    ],
    note: 'Neutre jusqu\'à provocation — puis TOUT le groupe attaque. Base des fermes à or via portail du Nether.'
  },
  {
    nom: 'Magma cube', cat: 'nether',
    tags: [{ txt: 'Nether', cls: 'red' }, { txt: '1–4 XP', cls: 'gold' }],
    ou: 'Partout dans le Nether, surtout dans les deltas de basalte et les bastions.',
    drops: ['Crème de magma ×0–1 (seulement les tailles moyenne et grande)'],
    note: 'La crème de magma sert à la potion de Résistance au feu : indispensable pour explorer le Nether sereinement.'
  },
  {
    nom: 'Strider', cat: 'nether',
    tags: [{ txt: 'Lave', cls: 'red' }, { txt: 'Monture', cls: 'ok' }],
    ou: 'Sur les mers de lave du Nether.',
    drops: ['Ficelle ×2–5'],
    note: 'Sellez-le et dirigez-le avec un champignon difforme au bout d\'une canne à pêche : le meilleur moyen de traverser un océan de lave.'
  },

  /* ---------------- MONSTRES — END ---------------- */
  {
    nom: 'Shulker', cat: 'end',
    tags: [{ txt: 'Cité de l\'End', cls: 'purple' }, { txt: '5 XP', cls: 'gold' }],
    ou: 'Cités de l\'End, sur les murs et les tours.',
    drops: [
      'Carapace de shulker ×0–1 : 50 % sans enchantement, 56,25 % avec Butin I, puis +6,25 % par niveau — soit 68,75 % au maximum avec Butin III',
      '2 carapaces + 1 coffre = boîte de shulker'
    ],
    note: 'La boîte de shulker garde son contenu quand on la casse : c\'est LE conteneur portable du jeu. Visez 6+ carapaces par voyage.'
  },
  {
    nom: 'Endermite', cat: 'end',
    tags: [{ txt: 'Rare', cls: '' }, { txt: '3 XP', cls: 'gold' }],
    ou: '0,4 % de chance d\'apparaître quand un joueur lance une perle de l\'Ender.',
    drops: ['Aucun objet'],
    note: 'Utilisé comme appât dans certaines fermes à enderman : les endermans le chassent, ce qui les attire vers la zone de mise à mort.'
  },
  {
    nom: 'Dragon de l\'End', cat: 'boss',
    tags: [{ txt: 'Boss', cls: 'red' }, { txt: '12 000 XP', cls: 'gold' }],
    ou: 'Île centrale de l\'End. Réinvocable avec 4 cristaux de l\'End posés sur les bords du portail de sortie.',
    drops: [
      'Œuf de dragon ×1 (première victoire seulement) — se récupère en le poussant avec un piston',
      'Portail de sortie + passerelle vers les îles extérieures',
      '12 000 points d\'expérience (500 pour les invocations suivantes)',
      'Souffle du dragon : à récolter dans une fiole en verre dans son nuage d\'haleine → potions persistantes'
    ],
    note: 'Détruisez d\'abord les cristaux de guérison sur les tours d\'obsidienne (arc, boule de neige ou pioche pour les cages en fer).'
  },
  {
    nom: 'Wither', cat: 'boss',
    tags: [{ txt: 'Boss invoqué', cls: 'red' }, { txt: '50 XP', cls: 'gold' }],
    ou: 'Invoqué : 4 blocs de sable des âmes en T + 3 crânes de squelette wither au sommet.',
    drops: [
      'Étoile du Nether ×1 (100 %) — étoile + 3 verres + 5 blocs d\'obsidienne = balise',
      'Laisse derrière lui des blocs de débris de wither rose là où il tue des mobs'
    ],
    note: 'Invoquez-le dans le End ou dans un caisson d\'obsidienne/bedrock : il détruit presque tous les blocs et vole.'
  },

  /* ---------------- MOBS PASSIFS & NEUTRES ---------------- */
  {
    nom: 'Vache', cat: 'passif',
    tags: [{ txt: 'Élevage', cls: 'ok' }],
    ou: 'Plaines, forêts, prairies — sur l\'herbe, à la lumière.',
    drops: ['Bœuf cru ×1–3 (cuit si l\'animal brûle)', 'Cuir ×0–2', 'Lait : clic droit avec un seau (annule tous les effets)'],
    note: 'Reproduction au blé. Le cuir est indispensable pour les livres → enchantements → bibliothèque.'
  },
  {
    nom: 'Mooshroom (vache-champignon)', cat: 'passif',
    tags: [{ txt: 'Champignonnière', cls: 'purple' }],
    ou: 'Uniquement dans le biome « champs de champignons » (mushroom fields), extrêmement rare.',
    drops: [
      'Bœuf cru + cuir comme une vache',
      'Cisaille → 5 champignons + la vache redevient normale',
      'Bol → soupe de champignons (ressource illimitée !)'
    ],
    note: 'Frappée par la foudre, la mooshroom rouge devient brune : donner une petite fleur donne alors une soupe suspecte à effet.'
  },
  {
    nom: 'Mouton', cat: 'passif',
    tags: [{ txt: 'Élevage', cls: 'ok' }],
    ou: 'Plaines, forêts, prairies.',
    drops: ['Laine ×1 (cisaille : 1–3, et la laine repousse)', 'Mouton cru ×1–2'],
    note: 'Colorez le mouton avec une teinture avant de le tondre : la laine repousse dans la couleur. Base des fermes à laine.'
  },
  {
    nom: 'Poulet', cat: 'passif',
    tags: [{ txt: 'Élevage', cls: 'ok' }],
    ou: 'Plaines et forêts.',
    drops: ['Poulet cru ×1', 'Plume ×0–2 (flèches)', 'Pond un œuf toutes les 5–10 minutes'],
    note: 'Les œufs sont automatisables à 100 % : la ferme à poulets auto-cuiseur est la première « usine » à monter.'
  },
  {
    nom: 'Cochon', cat: 'passif',
    tags: [{ txt: 'Élevage', cls: 'ok' }],
    ou: 'Plaines et forêts.',
    drops: ['Longe de porc crue ×1–3'],
    note: 'Se selle et se dirige à la carotte sur un bâton. Frappé par la foudre → zombie-piglin.'
  },
  {
    nom: 'Lapin', cat: 'passif',
    tags: [{ txt: 'Désert / neige', cls: 'gold' }],
    ou: 'Déserts, plaines enneigées, taïgas, forêts de fleurs.',
    drops: [
      'Lapin cru ×0–1, peau de lapin ×0–1',
      'Patte de lapin (10 %) — potion de Saut',
      'Le lapin « le Tueur » (skin killer bunny) : très rare, hostile'
    ],
    note: '4 peaux de lapin = 1 cuir. Le ragoût de lapin est l\'un des aliments les plus nourrissants du jeu.'
  },
  {
    nom: 'Abeille', cat: 'passif',
    tags: [{ txt: 'Neutre', cls: 'gold' }],
    ou: 'Autour des nids d\'abeilles, dans les biomes fleuris, forêts de bouleaux et prairies.',
    drops: ['Rien en la tuant (mauvaise idée)', 'Le nid/ruche à niveau de miel 5 : cisaille → 3 rayons de miel ; bouteille → miel'],
    note: 'Placez un feu de camp SOUS la ruche : les abeilles ne s\'énervent pas quand vous récoltez. Elles accélèrent la croissance des cultures.'
  },
  {
    nom: 'Villageois', cat: 'passif',
    tags: [{ txt: 'Commerce', cls: 'ok' }],
    ou: 'Villages, igloos (sous-sol), fermes de zombies-villageois soignés.',
    drops: [
      'Rien en le tuant',
      'Commerce : émeraudes contre presque tout — voir la section « échanges »'
    ],
    note: 'Le vrai « drop » du villageois, c\'est son métier : bibliothécaire (enchantements), armurier (diamant), fermier (émeraudes contre blé).'
  },
  {
    nom: 'Marchand ambulant', cat: 'passif',
    tags: [{ txt: 'Aléatoire', cls: '' }],
    ou: 'Apparaît aléatoirement près du joueur, accompagné de 2 lamas commerçants.',
    drops: ['Lait (via ses lamas : laine), et ses échanges : plants rares, coraux, sable rouge, semis de tous les biomes'],
    note: 'Il vend souvent des plants et des blocs impossibles à trouver autrement dans votre région : très utile en début de partie.'
  },
  {
    nom: 'Golem de fer', cat: 'passif',
    tags: [{ txt: 'Neutre', cls: 'cyan' }, { txt: 'Automatisable', cls: 'ok' }],
    ou: 'Villages (1 pour 10 villageois avec lit), ou construit : 4 blocs de fer en T + citrouille sculptée.',
    drops: ['Lingot de fer ×3–5', 'Coquelicot ×0–2'],
    note: 'Base de la ferme à fer : c\'est la seule source renouvelable de fer massive du jeu.'
  },
  {
    nom: 'Golem de neige', cat: 'passif',
    tags: [{ txt: 'Construit', cls: 'cyan' }],
    ou: 'Construit : 2 blocs de neige + citrouille sculptée au sommet.',
    drops: ['Boule de neige ×0–15 (à la mort)', 'Laisse une traînée de neige : à pelleter en continu'],
    note: 'Ferme à neige : un golem enfermé sur un sol pelleté par un piston fournit une neige infinie (bouteilles, blocs, projectiles).'
  },
  {
    nom: 'Loup', cat: 'passif',
    tags: [{ txt: 'Apprivoisable', cls: 'ok' }],
    ou: 'Forêts, taïgas, toundras, bosquets — variantes visuelles selon le biome.',
    drops: ['Rien', 'Apprivoisement : os (plusieurs essais)'],
    note: 'Équipez-le d\'une armure de loup (écailles d\'armadillo) : il devient un compagnon de combat sérieux.'
  },
  {
    nom: 'Armadillo', cat: 'passif',
    tags: [{ txt: 'Savane', cls: 'gold' }],
    ou: 'Savanes et savanes en plateau.',
    drops: [
      'Écaille d\'armadillo : à récolter à la brosse (brush) toutes les 5 min, sans le tuer',
      '4 écailles + 2… → armure de loup'
    ],
    note: 'Se reproduit avec des araignées en boule (spider eyes). Ne le tuez pas : la brosse est renouvelable, la mort ne l\'est pas.'
  },
  {
    nom: 'Sniffer', cat: 'passif',
    tags: [{ txt: 'Archéologie', cls: 'gold' }],
    ou: 'Éclos d\'un œuf de sniffer, obtenu en brossant le SABLE suspect des ruines sous-marines chaudes (et non les ruines de sentier).',
    drops: ['Rien', 'Il fouille le sol et déterre des graines de plantes anciennes : torchflower et pitcher pod'],
    note: 'Les seules sources de torchflower et de pitcher plant du jeu passent par le sniffer.'
  },
  {
    nom: 'Axolotl', cat: 'passif',
    tags: [{ txt: 'Grottes luxuriantes', cls: 'ok' }],
    ou: 'Grottes luxuriantes, dans l\'eau sous Y = 63, sur de l\'argile.',
    drops: ['Rien', 'Se capture au seau'],
    note: 'Il combat les mobs aquatiques et donne au joueur « Régénération » quand il tue une cible : un allié pour vider un monument marin.'
  },
  {
    nom: 'Chèvre', cat: 'passif',
    tags: [{ txt: 'Montagne', cls: 'cyan' }],
    ou: 'Pics enneigés, versants, bosquets.',
    drops: ['Corne de chèvre : elle la perd en chargeant un bloc dur (pierre, bûche, bloc de fer)', 'Lait au seau'],
    note: '8 cornes différentes existent. Faites-la charger dans un mur de pierre en vous plaçant derrière.'
  },
  {
    nom: 'Tortue', cat: 'passif',
    tags: [{ txt: 'Plages', cls: 'ok' }],
    ou: 'Plages chaudes ; pond ses œufs sur le sable de sa plage natale.',
    drops: ['Écaille de tortue (bébé devenu adulte) — 5 écailles = carapace (respiration +10 s)'],
    note: 'Protégez les œufs : les zombies les piétinent volontairement. Entourez-les de blocs et éclairez la plage.'
  },
  {
    nom: 'Grenouille', cat: 'passif',
    tags: [{ txt: 'Marais', cls: 'ok' }],
    ou: 'Marais et marais de mangrove ; 3 variantes selon le biome où le têtard grandit (tempéré, froid, chaud).',
    drops: [
      'Rien',
      'Elle mange les petits magma cubes → lâche une « froglight » (verte / perlée / ocre)'
    ],
    note: 'Les froglights sont les meilleurs blocs de lumière décoratifs (niveau 15). Faites grandir vos têtards dans 3 biomes différents pour les 3 couleurs.'
  },
  {
    nom: 'Allay', cat: 'passif',
    tags: [{ txt: 'Utilitaire', cls: 'cyan' }],
    ou: 'Cages des avant-postes de pillards et des manoirs des bois.',
    drops: ['Rien', 'Il ramasse et rapporte tous les objets identiques à celui qu\'on lui donne'],
    note: 'Donnez-lui un objet, il collecte tout ce qui lui ressemble au sol et le rapporte vers un bloc de note qu\'on a fait sonner. Se duplique avec une amethyste + une danse au disque de musique.'
  },
  {
    nom: 'Poissons (cabillaud, saumon, poisson-globe, tropical)', cat: 'passif',
    tags: [{ txt: 'Océans', cls: 'blue' }],
    ou: 'Océans selon leur température ; le saumon aussi en rivières et rivières glacées.',
    drops: [
      'Poisson cru correspondant, arête ×0–1',
      'Capture au seau : garde l\'espèce et la variante exacte'
    ],
    note: 'Le poisson-globe est l\'ingrédient de la potion de Respiration aquatique. Le tropical sert au colorant et aux aquariums.'
  },
  {
    nom: 'Calmar / calmar luisant', cat: 'passif',
    tags: [{ txt: 'Eau', cls: 'blue' }],
    ou: 'Calmar : toute eau sous Y = 63. Calmar luisant : grottes noyées, dans le noir.',
    drops: ['Poche d\'encre ×1–3 (colorant noir, livre et plume)', 'Sac d\'encre luisant (cadre lumineux, panneaux éclairés)'],
    note: 'Une ferme à calmars fournit une quantité illimitée de colorant noir pour les bannières et les panneaux.'
  },

  /* ---------------- BLOCS & MINAGE ---------------- */
  {
    nom: 'Minerai de diamant', cat: 'bloc',
    tags: [{ txt: 'Pioche en fer+', cls: 'cyan' }, { txt: 'Y -59', cls: 'gold' }],
    ou: 'Y -64 à +16, pic de densité à Y = -59. Plus fréquent quand il est exposé à l\'air (grottes, ravins, cités antiques).',
    drops: [
      'Diamant ×1 (×2–4 avec Fortune III)',
      'Toucher de soie : le bloc de minerai lui-même'
    ],
    note: 'Minez en tunnel de 2 blocs de haut à Y = -59 ou -58, ou explorez les cités antiques : elles en regorgent en surface.'
  },
  {
    nom: 'Minerai de fer', cat: 'bloc',
    tags: [{ txt: 'Pioche en pierre+', cls: '' }, { txt: 'Y 16 / 232', cls: 'gold' }],
    ou: 'Deux pics : Y = 16 (grottes) et Y = 232 (sommets des montagnes). Présent de Y -64 à 320.',
    drops: ['Fer brut ×1 (×2–4 avec Fortune III) → à fondre en lingot'],
    note: 'En montagne, le fer affleure à ciel ouvert : c\'est souvent plus rapide que de creuser.'
  },
  {
    nom: 'Minerai d\'or', cat: 'bloc',
    tags: [{ txt: 'Pioche en fer+', cls: 'gold' }, { txt: 'Y -16', cls: 'gold' }],
    ou: 'Y -64 à +32, pic à Y = -16. Dans les mesas / badlands : gisements énormes entre Y 32 et 256, à ciel ouvert.',
    drops: ['Or brut ×1 (×2–4 avec Fortune III)'],
    note: 'Le Nether en regorge, et son minerai d\'or ne demande AUCUN palier d\'outil : une pioche en bois suffit, et chaque bloc donne 2–6 pépites.'
  },
  {
    nom: 'Minerai de redstone', cat: 'bloc',
    tags: [{ txt: 'Pioche en fer+', cls: 'red' }, { txt: 'Y -59', cls: 'gold' }],
    ou: 'Y -64 à +15, densité maximale sous Y = -32, pic à Y = -59.',
    drops: ['Poudre de redstone ×4–5 (jusqu\'à 8 avec Fortune III)'],
    note: 'Même profondeur que le diamant : un seul tunnel à Y -59 rentabilise les deux.'
  },
  {
    nom: 'Minerai de cuivre', cat: 'bloc',
    tags: [{ txt: 'Pioche en pierre+', cls: 'copper' }, { txt: 'Y 48', cls: 'gold' }],
    ou: 'Y -16 à +112, pic à Y = 48. Gisements géants dans les grottes de dripstone.',
    drops: ['Cuivre brut ×2–5 (jusqu\'à 20 avec Fortune III)'],
    note: 'Cire-le au rayon de miel pour figer sa patine. Nécessaire aux paratonnerres, longues-vues et blocs décoratifs.'
  },
  {
    nom: 'Minerai de lapis-lazuli', cat: 'bloc',
    tags: [{ txt: 'Pioche en pierre+', cls: 'blue' }, { txt: 'Y 0', cls: 'gold' }],
    ou: 'Y -64 à +64, pic à Y = 0.',
    drops: ['Lapis-lazuli ×4–9 (jusqu\'à 36 avec Fortune III)'],
    note: 'Chaque enchantement consomme 1 à 3 lapis : prévoyez une réserve avant de monter une table d\'enchantement.'
  },
  {
    nom: 'Minerai d\'émeraude', cat: 'bloc',
    tags: [{ txt: 'Pioche en fer+', cls: 'ok' }, { txt: 'Montagnes', cls: 'gold' }],
    ou: 'UNIQUEMENT dans les biomes de montagne (versants, pics, bosquets, prairies), Y -16 à 320, pic à Y = 236.',
    drops: ['Émeraude ×1 (×2–4 avec Fortune III)'],
    note: 'Le minerai le plus rare en génération, mais le commerce villageois en fournit bien plus vite que le minage.'
  },
  {
    nom: 'Débris antiques (Ancient Debris)', cat: 'bloc',
    tags: [{ txt: 'Pioche en diamant', cls: 'purple' }, { txt: 'Nether Y 15', cls: 'red' }],
    ou: 'Nether, Y 8 à 119, pic à Y = 15. Jamais exposé à l\'air : impossible de le voir depuis une grotte.',
    drops: ['Débris antique ×1 (résiste à la lave et aux explosions)'],
    note: 'Méthode : creusez un tunnel à Y 15 et posez du TNT à intervalles réguliers, ou utilisez un lit (explose dans le Nether). 4 débris + 4 or = 1 lingot de netherite.'
  },
  {
    nom: 'Minerai de quartz du Nether', cat: 'bloc',
    tags: [{ txt: 'Pioche en bois+', cls: '' }, { txt: 'Nether', cls: 'red' }],
    ou: 'Partout dans le Nether, entre Y 10 et 117, très abondant dans les deltas de basalte.',
    drops: ['Quartz du Nether ×1 (jusqu\'à 4 avec Fortune III)'],
    note: 'Indispensable aux comparateurs, capteurs de lumière et blocs décoratifs blancs.'
  },
  {
    nom: 'Géode d\'améthyste', cat: 'bloc',
    tags: [{ txt: 'Pioche', cls: 'purple' }, { txt: 'Renouvelable', cls: 'ok' }],
    ou: 'Sphères creuses entre Y -64 et +30, souvent visibles depuis un océan ou une grotte (calcite + basalte lisse).',
    drops: [
      'Amas d\'améthyste au stade 4 : éclat d\'améthyste ×4 (jusqu\'à 8 avec Fortune III)',
      'Toucher de soie : le bloc d\'amas entier'
    ],
    note: 'Les bourgeons repoussent : c\'est renouvelable. Une ferme d\'améthyste alimente longues-vues, spyglass, blocs de teinte et la duplication d\'allays.'
  },
  {
    nom: 'Bloc de sculk / cité antique', cat: 'bloc',
    tags: [{ txt: 'Deep dark', cls: 'purple' }],
    ou: 'Biome deep dark, généralement sous Y = 0, sous les montagnes.',
    drops: [
      'Catalyseur de sculk / shrieker / capteur : uniquement au Toucher de soie',
      'Le sculk lâche 1 XP à la pioche',
      'Coffres des cités : disque « otherside », patron d\'armure « silence », enchantements Toucher de soie, houe en diamant enchantée, bougies bleues'
    ],
    note: 'Le catalyseur de sculk pose du sculk là où un mob meurt : c\'est la base des fermes à XP les plus compactes.'
  },
  {
    nom: 'Obsidienne', cat: 'bloc',
    tags: [{ txt: 'Pioche en diamant', cls: 'purple' }],
    ou: 'Là où de l\'eau touche une source de lave, autour des lacs de lave sous Y 0, et dans les portails ruinés.',
    drops: ['Obsidienne ×1'],
    note: 'Générateur simple : un seau d\'eau versé sur une source de lave. Un « générateur d\'obsidienne » automatique combine dispenseur + eau + lave.'
  },

  /* ---------------- STRUCTURES & COFFRES ---------------- */
  {
    nom: 'Village', cat: 'structure',
    tags: [{ txt: 'Surface', cls: 'ok' }],
    ou: 'Plaines, déserts, savanes, taïgas, toundras enneigées.',
    drops: [
      'Coffres selon le métier : forgeron (fer, diamant, obsidienne, pomme d\'or), fermier (graines, blé, émeraude), boucher, berger, cartographe, pêcheur',
      'Blocs à métier réutilisables : établi, alambic, table de cartographie, chaudron, tonneau, forge…',
      'Lits, cloches, cultures gratuites'
    ],
    note: 'Le vrai trésor d\'un village, ce sont les lits et les blocs de métier : ils permettent de reproduire les villageois et d\'installer un hall de commerce.'
  },
  {
    nom: 'Donjon (salle du générateur)', cat: 'structure',
    tags: [{ txt: 'Souterrain', cls: 'gold' }],
    ou: 'Petites salles de cobblestone moussue sous terre, avec un générateur de zombies, squelettes ou araignées, et 1–2 coffres.',
    drops: [
      'Coffres : selle, disques de musique (13 et cat), pomme d\'or, lingot de fer/or, poudre de redstone, livre enchanté, étiquette, œuf d\'or (golden apple)',
      'Générateur : à convertir en ferme à XP (ne pas le casser !)'
    ],
    note: 'Éclairez le générateur avec des torches pour le désactiver le temps d\'aménager la pièce.'
  },
  {
    nom: 'Mine abandonnée', cat: 'structure',
    tags: [{ txt: 'Souterrain', cls: 'gold' }],
    ou: 'Réseaux de tunnels avec rails, entre Y -60 et 30 (jusqu\'en surface dans les badlands).',
    drops: [
      'Wagons-coffres : rails, rails motorisés/détecteurs, diamants, lapis, fer, or, pain, graines de melon, pastèque',
      'Rails à récupérer directement (des centaines)',
      'Générateurs d\'araignées venimeuses'
    ],
    note: 'Les mines des badlands génèrent en surface avec un butin identique : très rentable et sans danger d\'eau.'
  },
  {
    nom: 'Forteresse (Stronghold)', cat: 'structure',
    tags: [{ txt: 'Souterrain', cls: 'purple' }],
    ou: 'Entre 128 et 3 000 blocs du centre du monde, en anneaux ; localisée en lançant des yeux de l\'Ender.',
    drops: [
      'Bibliothèque : livres enchantés, papier, livres, pain',
      'Coffres du couloir : pomme d\'or enchantée (rare), fer, redstone',
      'Le portail de l\'End : 12 cadres, certains déjà pourvus d\'un œil'
    ],
    note: 'Ne cassez JAMAIS un cadre de portail (bloc incassable en survie). Prévoyez 15 yeux : ils ont 20 % de chance de se briser au lancer.'
  },
  {
    nom: 'Temple du désert', cat: 'structure',
    tags: [{ txt: 'Désert', cls: 'gold' }, { txt: 'Piège TNT', cls: 'red' }],
    ou: 'Pyramides de grès dans les déserts.',
    drops: [
      '4 coffres : diamant, émeraude, or, fer, poudre à canon, os, pourriture, selle, pomme d\'or enchantée (rare)',
      'Beaucoup de grès taillé récupérable'
    ],
    note: 'Une plaque de pression au centre déclenche 9 blocs de TNT. Cassez un bloc sur le côté et désamorcez la plaque AVANT de descendre.'
  },
  {
    nom: 'Temple de la jungle', cat: 'structure',
    tags: [{ txt: 'Jungle', cls: 'ok' }, { txt: 'Pièges à flèches', cls: 'red' }],
    ou: 'Jungles denses, en pierre moussue.',
    drops: ['2 coffres : diamant, émeraude, fer, or, os, moisissure, selle', 'Distributeurs, plaques, leviers et redstone à récupérer'],
    note: 'Le puzzle à 3 leviers ouvre la salle du bas ; les fils de détente déclenchent des distributeurs de flèches.'
  },
  {
    nom: 'Manoir des bois', cat: 'structure',
    tags: [{ txt: 'Forêt sombre', cls: 'red' }, { txt: 'Très rare', cls: 'purple' }],
    ou: 'Uniquement en forêt sombre, souvent à plusieurs milliers de blocs ; localisable via la carte de l\'explorateur des bois (cartographe).',
    drops: [
      'Totems d\'immortalité (évocateurs)',
      'Coffres : pomme d\'or enchantée, patron d\'armure « vex », diamants, livres enchantés, selle',
      'Salles secrètes : bloc de diamant caché derrière de la laine bleue, allays en cage'
    ],
    note: 'Structure la plus dangereuse hors boss : venez avec armure en diamant, boucliers, potions et un totem si possible.'
  },
  {
    nom: 'Monument océanique', cat: 'structure',
    tags: [{ txt: 'Océan profond', cls: 'blue' }],
    ou: 'Océans profonds, en prismarine, gardé par 3 gardiens anciens.',
    drops: [
      '8 blocs d\'or dans la chambre centrale (sous du prismarine sombre)',
      'Éponges (salle aux éponges) — utiles pour vider un chantier sous-marin',
      'Prismarine, lanternes marines, et des gardiens à l\'infini'
    ],
    note: 'Emportez potions de Respiration aquatique + Vision nocturne, une éponge et un conduit. Vidé, il devient une ferme à gardiens idéale.'
  },
  {
    nom: 'Bastion (Nether)', cat: 'structure',
    tags: [{ txt: 'Nether', cls: 'red' }],
    ou: 'Nether, tous biomes sauf mers de lave. Quatre types : trésor, pont, écuries de hoglin, salle des piglins.',
    drops: [
      'Coffres : lingots d\'or, blocs d\'or, débris antiques (bastion trésor), patron d\'armure « groin » (snout), pommes d\'or enchantées, arcs enchantés, selles',
      'Blocs de pierre noire et briques d\'or récupérables'
    ],
    note: 'Le bastion trésor (coffres gardés par des piglins brutes, derrière un pont) est la meilleure source de débris antiques sans minage.'
  },
  {
    nom: 'Forteresse du Nether', cat: 'structure',
    tags: [{ txt: 'Nether', cls: 'red' }],
    ou: 'Nether, en bandes traversant plusieurs biomes ; visible de loin grâce à ses ponts.',
    drops: [
      'Générateurs de Blaze (poudre de Blaze)',
      'Squelettes wither (crânes)',
      'Verrue du Nether dans les escaliers (indispensable au brassage)',
      'Coffres : selle, épée en diamant, cheval en or, obsidienne, or, patron d\'armure « côte » (rib)'
    ],
    note: 'Récupérez la verrue du Nether + le sable des âmes : elles se replantent chez vous et alimentent toutes vos potions.'
  },
  {
    nom: 'Cité de l\'End', cat: 'structure',
    tags: [{ txt: 'End extérieur', cls: 'purple' }],
    ou: 'Îles extérieures de l\'End (après la passerelle du portail de sortie ou une perle de l\'Ender).',
    drops: [
      'Élytres : dans le cadre d\'objet du « navire de l\'End » (End ship)',
      'Coffres : diamants, lingots de fer/or, pommes d\'or enchantées, patron « spire », épées et pioches en diamant enchantées, bâtons de sel de béryl',
      'Carapaces de shulker, blocs de purpur, tiges de chorus'
    ],
    note: 'Toutes les cités n\'ont pas de navire. Cherchez la tour la plus haute : l\'élytre est là, gardée par un shulker et une tête de dragon.'
  },
  {
    nom: 'Chambres d\'épreuve (Trial Chambers)', cat: 'structure',
    tags: [{ txt: 'Souterrain', cls: 'cyan' }, { txt: '1.21+', cls: 'ok' }],
    ou: 'Complexes en tuff et cuivre, entre Y -40 et +20, dans la plupart des biomes du Surworld.',
    drops: [
      'Coffres-forts (vaults) : à ouvrir avec une clé d\'épreuve (trial key) — armures enchantées, diamants, émeraudes, disques, potions',
      'Coffres-forts ominous : clé ominous (après une bouteille de mauvais présage) — objets uniques, fragment de masse (mace)',
      'Générateurs d\'épreuve : vagues de mobs, lâchent des clés d\'épreuve',
      'Blocs de cuivre, tuff, chandeliers, lanceurs (crafters)'
    ],
    note: 'Le coffre-fort ne se vide qu\'une fois par joueur : en multijoueur, chacun peut l\'ouvrir. Reproductible à l\'infini en revenant avec des clés.'
  },
  {
    nom: 'Ruines de sentier (Trail Ruins)', cat: 'structure',
    tags: [{ txt: 'Archéologie', cls: 'gold' }],
    ou: 'Enterrées dans les taïgas, jungles, forêts de bouleaux, marais de mangrove, plaines enneigées.',
    drops: [
      'Brosse sur gravier suspect : tessons de poterie, perles d\'ambre, plants de bois rares (mais PAS d\'œufs de sniffer : ceux-là viennent des ruines sous-marines chaudes)',
      'Blocs décoratifs uniques'
    ],
    note: 'Il faut une brosse (plume + cuivre + bâton). Une seule structure fournit assez de tessons pour composer des jarres décoratives.'
  },
  {
    nom: 'Trésor enfoui', cat: 'structure',
    tags: [{ txt: 'Plage', cls: 'gold' }],
    ou: 'Sous les plages et le fond des océans — localisé grâce à la carte au trésor des épaves et des ruines sous-marines.',
    drops: ['Cœur de la mer (100 %)', 'Lingots d\'or/fer, diamants, TNT, émeraudes, potions'],
    note: 'Le cœur de la mer est indispensable au conduit et à la boussole de récupération : c\'est la seule source.'
  },
  {
    nom: 'Épave / ruines sous-marines', cat: 'structure',
    tags: [{ txt: 'Océan', cls: 'blue' }],
    ou: 'Fond des océans et parfois échouées sur les plages.',
    drops: [
      'Coffre de ravitaillement : nourriture, papier, potions d\'eau',
      'Coffre du trésor : lingots d\'or, émeraudes, diamants, cartes au trésor',
      'Coffre de cargaison : blé, papier, cuir, TNT'
    ],
    note: 'Trois coffres différents par épave : fouillez la proue, la cale ET la poupe.'
  },
  {
    nom: 'Portail ruiné', cat: 'structure',
    tags: [{ txt: 'Deux dimensions', cls: 'purple' }],
    ou: 'Partout dans le Surworld et le Nether, entouré d\'or brut et de blocs corrompus.',
    drops: [
      'Coffre : pommes d\'or enchantées, obsidienne, briquet, lingots d\'or, bottes en fer enchantées, carottes dorées',
      'Obsidienne du cadre récupérable',
      'De l\'or brut / blocs de gravier autour'
    ],
    note: 'Il suffit souvent de compléter le cadre avec quelques blocs d\'obsidienne pour disposer d\'un portail du Nether gratuit.'
  },
  {
    nom: 'Igloo', cat: 'structure',
    tags: [{ txt: 'Toundra', cls: 'cyan' }],
    ou: 'Plaines enneigées et taïgas enneigées.',
    drops: [
      'Sous-sol (1 sur 2) : un villageois zombifié en cellule + un villageois, une pomme d\'or et une potion de Faiblesse dans un coffre',
      'Coffre : charbon, pomme, blé, or, pierre, hache en pierre'
    ],
    note: 'Le kit du sous-sol est exactement ce qu\'il faut pour SOIGNER un villageois zombifié : votre premier commerce à prix cassé.'
  }
];

/* ---------- Table des minerais (vue synthétique) ---------- */
var MINERAIS = [
  ['Charbon',            'Y 0 → 320 (pic Y 96)',   'Pioche en bois',    'Charbon ×1 (Fortune ×2–4)',       'Très abondant, souvent exposé en falaise'],
  ['Cuivre',             'Y -16 → 112 (pic Y 48)', 'Pioche en pierre',  'Cuivre brut ×2–5',                'Gisements géants en grottes de dripstone'],
  ['Fer',                'Y -64 → 320 (pics 16 & 232)', 'Pioche en pierre', 'Fer brut ×1 (Fortune ×2–4)', 'Affleure sur les sommets de montagne'],
  ['Lapis-lazuli',       'Y -64 → 64 (pic Y 0)',   'Pioche en pierre',  'Lapis ×4–9',                      'Nécessaire à chaque enchantement'],
  ['Redstone',           'Y -64 → 15 (pic Y -59)', 'Pioche en fer',     'Poudre ×4–5 (Fortune → 8)',       'Même couche que le diamant'],
  ['Or',                 'Y -64 → 32 (pic Y -16)', 'Pioche en fer',     'Or brut ×1 (Fortune ×2–4)',       'Explose en quantité dans les badlands'],
  ['Diamant',            'Y -64 → 16 (pic Y -59)', 'Pioche en fer',     'Diamant ×1 (Fortune ×2–4)',       'Plus fréquent exposé à l\'air'],
  ['Émeraude',           'Y -16 → 320 (pic Y 236)', 'Pioche en fer',    'Émeraude ×1',                     'Montagnes UNIQUEMENT'],
  ['Quartz du Nether',   'Nether Y 10 → 117',      'Pioche en bois',    'Quartz ×1 (Fortune ×4)',          'Très abondant, deltas de basalte'],
  ['Or du Nether',       'Nether, tout Y',         'Pioche en bois',    'Pépites d\'or ×2–6',              'Aucun palier d\'outil requis — minable dès le premier jour'],
  ['Débris antiques',    'Nether Y 8 → 119 (pic 15)', 'Pioche en diamant', 'Débris ×1',                  'Jamais exposé à l\'air — TNT ou lits'],
  ['Améthyste',          'Y -64 → 30 (géodes)',    'Toute pioche',      'Éclats ×4 (stade 4 uniquement)',  'Repousse : ressource renouvelable']
];

/* ---------- Troc avec les piglins (1 lingot d'or lancé) ----------
   Table reprise telle quelle de gameplay/piglin_bartering.json (26.2) :
   19 résultats possibles, pour un total de poids de 469. */
var TROC = [
  ['Obsidienne',                              '8,53 %', '1'],
  ['Obsidienne pleurante',                    '8,53 %', '1–3'],
  ['Boule de feu',                            '8,53 %', '1'],
  ['Cuir',                                    '8,53 %', '2–4'],
  ['Sable des âmes',                          '8,53 %', '2–8'],
  ['Brique du Nether',                        '8,53 %', '2–8'],
  ['Flèches spectrales',                      '8,53 %', '6–12'],
  ['Gravier',                                 '8,53 %', '8–16'],
  ['Pierre noire',                            '8,53 %', '8–16'],
  ['Ficelle',                                 '4,26 %', '3–9'],
  ['Quartz du Nether',                        '4,26 %', '5–12'],
  ['Fiole d\'eau',                            '2,13 %', '1'],
  ['Pépites de fer',                          '2,13 %', '10–36'],
  ['Perles de l\'Ender',                      '2,13 %', '2–4'],
  ['Ghast desséché',                          '2,13 %', '1'],
  ['Bottes en fer (Vitesse des âmes)',        '1,71 %', '1'],
  ['Potion de Résistance au feu',             '1,71 %', '1'],
  ['Potion jetable de Résistance au feu',     '1,71 %', '1'],
  ['Livre enchanté (Vitesse des âmes)',       '1,07 %', '1']
];
