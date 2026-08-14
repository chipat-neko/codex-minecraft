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
    note: '5 % des zombies apparaissent en « zombie bébé » : plus rapides, donnent 12 XP, peuvent chevaucher une poule.'
  },
  {
    nom: 'Squelette', cat: 'hostile',
    tags: [{ txt: 'Surworld', cls: 'ok' }, { txt: '5 XP', cls: 'gold' }],
    ou: 'Zones sombres du Surworld, grottes, donjons, générateurs. Dans le Nether : forteresses (withers squelettes).',
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
      'Coquille de nautile (3 % ; 100 % s\'il en tient un dans la main gauche) — 8 coquilles + cœur de la mer = conduit',
      'Lingot de cuivre ×0–1 (11 %) — seule source renouvelable de cuivre'
    ],
    note: 'Les noyés issus de la conversion d\'un zombie ne lâchent jamais de trident : il faut des noyés apparus naturellement.'
  },
  {
    nom: 'Momifié (Husk)', cat: 'hostile',
    tags: [{ txt: 'Déserts', cls: 'gold' }, { txt: '5 XP', cls: 'gold' }],
    ou: 'Déserts, à n\'importe quelle heure — il ne brûle pas au soleil.',
    drops: [
      'Chair putréfiée ×0–2, mêmes drops rares que le zombie (fer, carotte, pomme de terre)',
      'Se transforme en zombie normal s\'il se noie'
    ],
    note: 'Ses coups infligent la Faim : emportez de la nourriture en excès quand vous traversez un désert la nuit.'
  },
  {
    nom: 'Vagabond (Stray)', cat: 'hostile',
    tags: [{ txt: 'Biomes glacés', cls: 'cyan' }, { txt: '5 XP', cls: 'gold' }],
    ou: 'Plaines enneigées, pics glacés, toundra — à ciel ouvert.',
    drops: [
      'Os ×0–2, flèche ×0–2',
      'Flèche de Lenteur ×0–1 (50 %) — impossible à fabriquer autrement sans brassage'
    ],
    note: 'Piège à joueur : ses flèches ralentissent, ce qui rend la fuite très difficile en terrain découvert.'
  },
  {
    nom: 'Embourbé (Bogged)', cat: 'hostile',
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
    nom: 'Poisson d\'argent (Silverfish)', cat: 'hostile',
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
    nom: 'Grinceur (Creaking)', cat: 'hostile',
    tags: [{ txt: 'Forêt pâle', cls: 'purple' }, { txt: 'Invincible', cls: 'red' }],
    ou: 'Forêt pâle (pale garden), la nuit, engendré par un « cœur de grinceur » (creaking heart) présent dans les troncs de chêne pâle.',
    drops: [
      'Le mob lui-même ne lâche rien — il est indestructible tant que son cœur existe',
      'Détruire le cœur de grinceur (pioche + Toucher de soie) : le mob disparaît en particules'
    ],
    note: 'Il ne bouge que lorsque vous ne le regardez pas. Pour l\'éliminer : suivez ses particules jusqu\'au tronc contenant le cœur et cassez-le.'
  },
  {
    nom: 'Pillard (Pillager)', cat: 'hostile',
    tags: [{ txt: 'Avant-postes / raids', cls: 'red' }, { txt: '5 XP', cls: 'gold' }],
    ou: 'Avant-postes de pillards, patrouilles aléatoires en surface, vagues de raid.',
    drops: [
      'Fiole funeste (100 %) — capitaine uniquement, celui qui porte la bannière ; c\'est le seul butin de sa table',
      'Arbalète (8,5 %) — parfois enchantée',
      'Flèches (uniquement celles chargées dans l\'arbalète)',
      'Butin de raid : émeraudes, objets de vague (uniquement pendant un raid)'
    ],
    note: 'Tuer un capitaine (celui qui porte la bannière) fait tomber une FIOLE FUNESTE : l\'effet « Mauvais présage » ne s\'applique plus tout seul, il faut boire la fiole avant d\'entrer dans un village pour déclencher un raid.'
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
    drops: ['Bâton de Breeze (wind charge) — fabrique les charges de vent et la masse (mace)'],
    note: 'Ses projectiles activent boutons, leviers et plaques : les salles d\'épreuve exploitent cette mécanique dans leurs pièges.'
  },
  {
    nom: 'Gardien (Guardian)', cat: 'hostile',
    tags: [{ txt: 'Monument marin', cls: 'blue' }, { txt: '10 XP', cls: 'gold' }],
    ou: 'Uniquement dans et autour des monuments océaniques.',
    drops: [
      'Éclat de prismarine ×0–2',
      'Cristal de prismarine ×0–1 (40 %) — sert aux lanternes aquatiques',
      'Morue crue (40 %) — même lot que le cristal de prismarine : le gardien lâche l\'un OU l\'autre, jamais les deux'
    ],
    note: 'Une ferme à gardiens sur monument vidé produit prismarine, cristaux et XP en quantités industrielles.'
  },
  {
    nom: 'Grand gardien (Elder Guardian)', cat: 'hostile',
    tags: [{ txt: 'Monument marin', cls: 'blue' }, { txt: 'Mini-boss', cls: 'red' }],
    ou: 'Trois par monument océanique : un au sommet, deux dans les ailes.',
    drops: [
      'Éclat de prismarine ×0–2 (garanti à chaque mort)',
      'Éponge mouillée (100 %) — à cuire au four pour absorber l\'eau',
      'Morue crue (50 %) — ou cristal de prismarine (33 %) : les deux sortent du même lot, jamais ensemble'
    ],
    note: 'Inflige « Fatigue de minage III » à 50 blocs. Buvez du lait, ou tuez les trois grands gardiens avant de vider le monument.'
  },
  {
    nom: 'Warden', cat: 'hostile',
    tags: [{ txt: 'Cité antique', cls: 'purple' }, { txt: 'Danger extrême', cls: 'red' }],
    ou: 'Cité antique (deep dark), invoqué par 3 alertes de « hurleur sculk ». Ne peut pas apparaître naturellement autrement.',
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
    nom: 'Wither squelette', cat: 'nether',
    tags: [{ txt: 'Forteresse', cls: 'red' }, { txt: '5 XP', cls: 'gold' }],
    ou: 'Forteresses du Nether, sur les blocs de briques du Nether (lumière ≤ 11).',
    drops: [
      'Charbon ×0–1 (33 %), os ×0–2',
      'Crâne de Wither squelette (2,5 %, +1 % par niveau de Butin) — il en faut 3 pour invoquer le Wither',
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
    nom: 'Piglin barbare', cat: 'nether',
    tags: [{ txt: 'Bastion', cls: 'red' }, { txt: '20 XP', cls: 'gold' }],
    ou: 'Bastions uniquement.',
    drops: ['Hache en or (8,5 %)'],
    note: 'L\'or ne l\'apaise pas et il ne troque pas. Il tape fort : privilégiez la fuite ou les blocs de couverture.'
  },
  {
    nom: 'Hoglin', cat: 'nether',
    tags: [{ txt: 'Forêt écarlate', cls: 'red' }, { txt: '5 XP', cls: 'gold' }],
    ou: 'Forêts écarlates et bastions.',
    drops: ['Côtelette de porc crue ×2–4 (jusqu\'à 7 avec Butin III)', 'Cuir ×0–1'],
    note: 'Seule source de viande élevable du Nether : ils se reproduisent avec des champignons carmin (crimson fungus).'
  },
  {
    nom: 'Piglin zombifié (Zombified Piglin)', cat: 'nether',
    tags: [{ txt: 'Nether', cls: 'gold' }, { txt: 'Neutre', cls: '' }],
    ou: 'Partout dans le Nether ; apparaît aussi dans le Surworld près d\'un portail actif, ou quand un cochon est frappé par la foudre.',
    drops: [
      'Chair putréfiée ×0–1, pépite d\'or ×0–1',
      'Lingot d\'or (2,5 %), épée en or (8,5 %)'
    ],
    note: 'Neutre jusqu\'à provocation — puis TOUT le groupe attaque. Base des fermes à or via portail du Nether.'
  },
  {
    nom: 'Cube de magma', cat: 'nether',
    tags: [{ txt: 'Nether', cls: 'red' }, { txt: '1–4 XP', cls: 'gold' }],
    ou: 'Partout dans le Nether, surtout dans les deltas de basalte et les bastions.',
    drops: ['Crème de magma ×0–1 (seulement les tailles moyenne et grande)'],
    note: 'La crème de magma sert à la potion de Résistance au feu : indispensable pour explorer le Nether sereinement.'
  },
  {
    nom: 'Arpenteur (Strider)', cat: 'nether',
    tags: [{ txt: 'Lave', cls: 'red' }, { txt: 'Monture', cls: 'ok' }],
    ou: 'Sur les mers de lave du Nether.',
    drops: ['Ficelle ×2–5'],
    note: 'Sellez-le et dirigez-le avec un champignon biscornu au bout d\'une canne à pêche : le meilleur moyen de traverser un océan de lave.'
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
    nom: 'Ender Dragon', cat: 'boss',
    tags: [{ txt: 'Boss', cls: 'red' }, { txt: '12 000 XP', cls: 'gold' }],
    ou: 'Île centrale de l\'End. Réinvocable avec 4 cristaux de l\'End posés sur les bords du portail de sortie.',
    drops: [
      'Œuf de dragon ×1 (première victoire seulement) — se récupère en le poussant avec un piston',
      'Portail de sortie + passerelle vers les îles extérieures',
      '12 000 points d\'expérience (500 pour les invocations suivantes)',
      'Souffle de dragon : à récolter dans une fiole en verre dans son nuage d\'haleine → potions persistantes'
    ],
    note: 'Détruisez d\'abord les cristaux de guérison sur les tours d\'obsidienne (arc, boule de neige ou pioche pour les cages en fer).'
  },
  {
    nom: 'Wither', cat: 'boss',
    tags: [{ txt: 'Boss invoqué', cls: 'red' }, { txt: '50 XP', cls: 'gold' }],
    ou: 'Invoqué : 4 blocs de sable des âmes en T + 3 crânes de Wither squelette au sommet.',
    drops: [
      'Étoile du Nether ×1 (100 %) — étoile + 3 verres + 5 blocs d\'obsidienne = balise',
      'Laisse derrière lui des roses de Wither là où il tue des mobs'
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
    nom: 'Poule', cat: 'passif',
    tags: [{ txt: 'Élevage', cls: 'ok' }],
    ou: 'Plaines et forêts.',
    drops: ['Poulet cru ×1', 'Plume ×0–2 (flèches)', 'Pond un œuf toutes les 5–10 minutes'],
    note: 'Les œufs sont automatisables à 100 % : la ferme à poules auto-cuiseur est la première « usine » à monter.'
  },
  {
    nom: 'Cochon', cat: 'passif',
    tags: [{ txt: 'Élevage', cls: 'ok' }],
    ou: 'Plaines et forêts.',
    drops: ['Côtelette de porc crue ×1–3'],
    note: 'Se selle et se dirige à la carotte sur un bâton. Frappé par la foudre → piglin zombifié.'
  },
  {
    nom: 'Lapin', cat: 'passif',
    tags: [{ txt: 'Désert / neige', cls: 'gold' }],
    ou: 'Déserts, plaines enneigées, taïgas, forêts de fleurs.',
    drops: [
      'Lapin cru ×1 (toujours au moins un), peau de lapin ×0–1',
      'Patte de lapin (10 %) — potion de Saut',
      'Le « Lapin tueur » (killer bunny) : très rare, hostile'
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
    ou: 'Apparaît aléatoirement près du joueur, accompagné de 2 lamas de marchand.',
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
    note: 'Équipez-le d\'une armure pour loup (écailles de tatou) : il devient un compagnon de combat sérieux.'
  },
  {
    nom: 'Tatou (Armadillo)', cat: 'passif',
    tags: [{ txt: 'Savane', cls: 'gold' }],
    ou: 'Savanes et savanes en plateau.',
    drops: [
      'Écaille de tatou : à récolter au pinceau (brush) toutes les 5 min, sans le tuer',
      '4 écailles + 2… → armure pour loup'
    ],
    note: 'Se reproduit avec des yeux d\'araignée (spider eyes). Ne le tuez pas : le pinceau est renouvelable, la mort ne l\'est pas.'
  },
  {
    nom: 'Renifleur (Sniffer)', cat: 'passif',
    tags: [{ txt: 'Archéologie', cls: 'gold' }],
    ou: 'Éclos d\'un œuf de renifleur, obtenu en brossant le SABLE suspect des ruines sous-marines chaudes (et non les ruines de sentier).',
    drops: ['Rien', 'Il fouille le sol et déterre des graines de plantes anciennes : torche-fleur et gousse de planturne'],
    note: 'Les seules sources de torche-fleur et de planturne du jeu passent par le renifleur.'
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
    drops: ['Écaille de tortue (bébé devenu adulte) — 5 écailles = carapace de tortue (respiration +10 s)'],
    note: 'Protégez les œufs : les zombies les piétinent volontairement. Entourez-les de blocs et éclairez la plage.'
  },
  {
    nom: 'Grenouille', cat: 'passif',
    tags: [{ txt: 'Marais', cls: 'ok' }],
    ou: 'Marais et marais de mangrove ; 3 variantes selon le biome où le têtard grandit (tempéré, froid, chaud).',
    drops: [
      'Rien',
      'Elle mange les petits cubes de magma → lâche une « grelampe » (verdoyante / nacrée / ocrée)'
    ],
    note: 'Les grelampes sont les meilleurs blocs de lumière décoratifs (niveau 15). Faites grandir vos têtards dans 3 biomes différents pour les 3 couleurs.'
  },
  {
    nom: 'Allay', cat: 'passif',
    tags: [{ txt: 'Utilitaire', cls: 'cyan' }],
    ou: 'Cages des avant-postes de pillards et des manoirs des bois.',
    drops: ['Rien', 'Il ramasse et rapporte tous les objets identiques à celui qu\'on lui donne'],
    note: 'Donnez-lui un objet, il collecte tout ce qui lui ressemble au sol et le rapporte vers un bloc de note qu\'on a fait sonner. Se duplique avec un éclat d\'améthyste + une danse au disque de musique.'
  },
  {
    nom: 'Poissons (morue, saumon, poisson-globe, tropical)', cat: 'passif',
    tags: [{ txt: 'Océans', cls: 'blue' }],
    ou: 'Océans selon leur température ; le saumon aussi en rivières et rivières glacées.',
    drops: [
      'Poisson cru correspondant ×1, poudre d\'os ×1 (5 %)',
      'Capture au seau : garde l\'espèce et la variante exacte'
    ],
    note: 'Le poisson-globe est l\'ingrédient de la potion de Respiration aquatique. Le tropical sert au colorant et aux aquariums.'
  },
  {
    nom: 'Poulpe / poulpe luisant', cat: 'passif',
    tags: [{ txt: 'Eau', cls: 'blue' }],
    ou: 'Poulpe : toute eau sous Y = 63. Poulpe luisant : grottes noyées, dans le noir.',
    drops: ['Poche d\'encre ×1–3 (colorant noir, livre et plume)', 'Poche d\'encre luisante (cadre lumineux, panneaux éclairés)'],
    note: 'Une ferme à poulpes fournit une quantité illimitée de colorant noir pour les bannières et les panneaux.'
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
      'Catalyseur de sculk, hurleur sculk, capteur sculk : uniquement au Toucher de soie',
      'Le sculk lâche 1 XP à la pioche',
      'Coffres des cités : livre de Furtivité rapide (swift sneak), seul enchantement fixe de la table et introuvable ailleurs, éclats d\'écho ×1–3, disque « otherside » et fragments de disque « 5 », ornement des abîmes (ward) et ornement du silence, houe en diamant enchantée (niveau 30–50), bougies ordinaires'
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
      'Coffres selon le métier : forgeron d\'armes (fer, diamant, obsidienne, lances en cuivre et en fer, selle, armures de cheval), forgeron d\'outils (diamant, pioche et pelle en fer), fermier (graines, blé, émeraude), boucher, berger, cartographe, pêcheur — aucun coffre de village ne contient de pomme dorée',
      'Blocs à métier réutilisables : établi, alambic, table de cartographie, chaudron, tonneau, forge…',
      'Lits, cloches, cultures gratuites'
    ],
    note: 'Le vrai trésor d\'un village, ce sont les lits et les blocs de métier : ils permettent de reproduire les villageois et d\'installer un hall de commerce.'
  },
  {
    nom: 'Donjon (salle du générateur)', cat: 'structure',
    tags: [{ txt: 'Souterrain', cls: 'gold' }],
    ou: 'Petites salles de pierres moussues sous terre, avec un générateur de zombies, squelettes ou araignées, et 1–2 coffres.',
    drops: [
      'Coffres : armures de cheval (cuivre, fer, or, diamant), disques de musique (13, cat, otherside), pomme dorée, pomme dorée enchantée (rare), étiquette, livre enchanté, seau, lingots de fer et d\'or, poudre de redstone, charbon, graines — aucune selle',
      'Générateur : à convertir en ferme à XP (ne pas le casser !)'
    ],
    note: 'Éclairez le générateur avec des torches pour le désactiver le temps d\'aménager la pièce.'
  },
  {
    nom: 'Mine abandonnée', cat: 'structure',
    tags: [{ txt: 'Souterrain', cls: 'gold' }],
    ou: 'Réseaux de tunnels avec rails, entre Y -60 et 30 (jusqu\'en surface dans les badlands).',
    drops: [
      'Wagonnets de stockage : rails, rails de propulsion/détecteurs, diamants, lapis, fer, or, pain, baies lumineuses, graines de pastèque, de citrouille et de betterave, torches ×1–16',
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
      'Bibliothèque : livres, papier, livres enchantés (niveau 30), carte vierge, boussole, ornement de l\'œil (eye) — aucun pain, il est dans le couloir',
      'Coffres du couloir : perles de l\'Ender, panoplie et outils en fer, diamants ×1–3, redstone, pomme dorée ORDINAIRE (il n\'y a pas de version enchantée), disque « otherside », ornement de l\'œil (eye)',
      'Le portail de l\'End : 12 cadres, certains déjà pourvus d\'un œil'
    ],
    note: 'Ne cassez JAMAIS un cadre de portail (bloc incassable en survie). Prévoyez 15 yeux : ils ont 20 % de chance de se briser au lancer.'
  },
  {
    nom: 'Temple du désert', cat: 'structure',
    tags: [{ txt: 'Désert', cls: 'gold' }, { txt: 'Piège TNT', cls: 'red' }],
    ou: 'Pyramides de grès dans les déserts.',
    drops: [
      '4 coffres : diamant, émeraude, or, fer, poudre à canon, os, chair putréfiée, armures de cheval, pomme dorée enchantée (rare), ornement des dunes (dune) dans un coffre sur sept — aucune selle',
      'Beaucoup de grès taillé récupérable'
    ],
    note: 'Une plaque de pression au centre déclenche 9 blocs de TNT. Cassez un bloc sur le côté et désamorcez la plaque AVANT de descendre.'
  },
  {
    nom: 'Temple de la jungle', cat: 'structure',
    tags: [{ txt: 'Jungle', cls: 'ok' }, { txt: 'Pièges à flèches', cls: 'red' }],
    ou: 'Jungles denses, en pierres moussues.',
    drops: ['2 coffres : diamant, émeraude, fer, or, os, chair putréfiée, bambou, armures de cheval, livre enchanté (niveau 30), ornement des jungles (wild) dans un coffre sur trois — aucune selle', 'Distributeurs, plaques, leviers et redstone à récupérer'],
    note: 'Le puzzle à 3 leviers ouvre la salle du bas ; les fils de détente déclenchent des distributeurs de flèches.'
  },
  {
    nom: 'Manoir des bois', cat: 'structure',
    tags: [{ txt: 'Forêt sombre', cls: 'red' }, { txt: 'Très rare', cls: 'purple' }],
    ou: 'Uniquement en forêt sombre, souvent à plusieurs milliers de blocs ; localisable via la carte de l\'explorateur des bois (cartographe).',
    drops: [
      'Totems d\'immortalité (évocateurs)',
      'Coffres : pomme dorée enchantée, ornement des Vex (un coffre sur deux), houe et plastron en diamant, cotte de mailles, amas de résine ×2–4 (l\'objet le plus fréquent), laisse, disques 13 et cat, livres enchantés — ni selle ni diamant brut',
      'Salles secrètes : bloc de diamant caché derrière de la laine bleue, allays en cage'
    ],
    note: 'Structure la plus dangereuse hors boss : venez avec armure en diamant, boucliers, potions et un totem si possible.'
  },
  {
    nom: 'Monument océanique', cat: 'structure',
    tags: [{ txt: 'Océan profond', cls: 'blue' }],
    ou: 'Océans profonds, en prismarine, gardé par 3 grands gardiens.',
    drops: [
      '8 blocs d\'or dans la chambre centrale (sous du prismarine sombre)',
      'Éponges (salle aux éponges) — utiles pour vider un chantier sous-marin',
      'Prismarine, lanternes aquatiques, et des gardiens à l\'infini'
    ],
    note: 'Emportez potions de Respiration aquatique + Vision nocturne, une éponge et un conduit. Vidé, il devient une ferme à gardiens idéale.'
  },
  {
    nom: 'Bastion (Nether)', cat: 'structure',
    tags: [{ txt: 'Nether', cls: 'red' }],
    ou: 'Nether, tous biomes sauf mers de lave. Quatre types : trésor, pont, écuries de hoglin, salle des piglins.',
    drops: [
      'Coffres : lingots et blocs d\'or, débris antiques et lingots de netherite (bastion trésor), modèle de forge « amélioration en netherite », ornement des groins (snout), pommes dorées enchantées, ARBALÈTES enchantées (le bastion ne contient aucun arc), selle dans les écuries de hoglins',
      'Blocs de roche noire et briques d\'or récupérables'
    ],
    note: 'Le bastion trésor (coffres gardés par des piglins barbares, derrière un pont) est la meilleure source de débris antiques sans minage.'
  },
  {
    nom: 'Forteresse du Nether', cat: 'structure',
    tags: [{ txt: 'Nether', cls: 'red' }],
    ou: 'Nether, en bandes traversant plusieurs biomes ; visible de loin grâce à ses ponts.',
    drops: [
      'Générateurs de Blaze (poudre de Blaze)',
      'Withers squelettes (crânes)',
      'Verrue du Nether dans les escaliers (indispensable au brassage)',
      'Coffres : selle, épée et plastron EN OR, armures de cheval (or, cuivre, fer, diamant), diamants ×1–3, verrues du Nether ×3–7, briquet, obsidienne, ornement des côtes (rib)'
    ],
    note: 'Récupérez la verrue du Nether + le sable des âmes : elles se replantent chez vous et alimentent toutes vos potions.'
  },
  {
    nom: 'Cité de l\'End', cat: 'structure',
    tags: [{ txt: 'End extérieur', cls: 'purple' }],
    ou: 'Îles extérieures de l\'End (après la passerelle du portail de sortie ou une perle de l\'Ender).',
    drops: [
      'Élytres : dans le cadre d\'objet du « navire de l\'End » (End ship)',
      'Coffres : diamants ×2–7, lingots de fer ×4–8 et d\'or ×2–7, émeraudes, selle, armures de cheval, ornement des tours (spire), et surtout des panoplies et des outils complets en diamant et en fer, enchantés au niveau 20–39',
      'Carapaces de shulker, blocs de purpur, tiges de chorus'
    ],
    note: 'Toutes les cités n\'ont pas de navire. Cherchez la tour la plus haute : l\'élytre est là, gardée par un shulker et une tête de dragon.'
  },
  {
    nom: 'Chambres d\'épreuve (Trial Chambers)', cat: 'structure',
    tags: [{ txt: 'Souterrain', cls: 'cyan' }, { txt: '1.21+', cls: 'ok' }],
    ou: 'Complexes en tuf et cuivre, entre Y -40 et +20, dans la plupart des biomes du Surworld.',
    drops: [
      'Coffres-forts (vaults) : à ouvrir avec une clé des épreuves (trial key) — armures enchantées, diamants, émeraudes, disques, potions',
      'Coffres-forts funestes : clé des épreuves funeste (après une fiole funeste) — objets uniques, noyau lourd (heavy core)',
      'Générateurs des épreuves : vagues de mobs, lâchent des clés des épreuves',
      'Blocs de cuivre, tuf, bougies, fabricateurs (crafters)'
    ],
    note: 'Le coffre-fort ne se vide qu\'une fois par joueur : en multijoueur, chacun peut l\'ouvrir. Reproductible à l\'infini en revenant avec des clés.'
  },
  {
    nom: 'Ruines de sentier (Trail Ruins)', cat: 'structure',
    tags: [{ txt: 'Archéologie', cls: 'gold' }],
    ou: 'Enterrées dans les taïgas, jungles, forêts de bouleaux, marais de mangrove, plaines enneigées.',
    drops: [
      'Pinceau sur gravier suspect : tessons de poterie (sept motifs), quatre ornements exclusifs — éclaireurs, éleveurs, modeleurs, hôtes —, disque « relic », et en butin courant teintures, bougies colorées, vitres teintées, pancartes suspendues, argile, briques, émeraudes (mais PAS d\'œufs de renifleur : ceux-là viennent des ruines sous-marines chaudes)',
      'Blocs décoratifs uniques'
    ],
    note: 'Il faut un pinceau (plume + cuivre + bâton). Une seule structure fournit assez de tessons pour composer des jarres décoratives.'
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
      'Coffre de ravitaillement : pommes de terre (dont des empoisonnées), carottes, blé, soupe suspecte, papier, charbon, bambou, citrouille, poudre à canon, TNT, armure en cuir enchantée — aucune potion',
      'Coffre du trésor : lingots et pépites de fer et d\'or, émeraudes, lapis-lazuli, diamant (rare), fioles d\'expérience — mais aucune carte',
      'Coffre de la carte (cabine arrière) : la carte du trésor enfoui, GARANTIE, plus boussole, montre, carte vierge, papier, plumes et livres'
    ],
    note: 'Trois coffres différents par épave, et trois seulement : ravitaillement à la proue, trésor dans la cale, carte dans la cabine arrière.'
  },
  {
    nom: 'Portail ruiné', cat: 'structure',
    tags: [{ txt: 'Deux dimensions', cls: 'purple' }],
    ou: 'Partout dans le Surworld et le Nether, entouré d\'or brut et de blocs corrompus.',
    drops: [
      'Coffre : outils et armures EN OR enchantés (aucune pièce en fer), pomme dorée et, rarement, pomme dorée enchantée, obsidienne, briquet, charge de feu, lingots et pépites d\'or, carottes dorées, tranche de pastèque scintillante, cloche, montre, magnétite',
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
      'Sous-sol (1 sur 2) : un villageois zombifié en cellule + un villageois, une pomme dorée et une potion de Faiblesse dans un coffre',
      'Coffre : pomme dorée (garantie, dans un lot à elle seule), charbon, pomme, blé, pépites d\'or, chair putréfiée, émeraude, hache en pierre — aucune pierre'
    ],
    note: 'Le kit du sous-sol est exactement ce qu\'il faut pour SOIGNER un villageois zombifié : votre premier commerce à prix cassé.'
  },

  {
    nom: 'Nautile (Nautilus)', cat: 'passif',
    tags: [
      { txt: 'Océans', cls: 'blue' },
      { txt: 'Sellable', cls: 'ok' },
      { txt: 'Armure dédiée', cls: 'copper' }
    ],
    ou: 'Créature aquatique (catégorie water_creature), toujours en groupe de 1. Poids 5 dans ocean, warm_ocean, lukewarm_ocean, deep_ocean et deep_lukewarm_ocean ; poids 2 dans cold_ocean, deep_cold_ocean, frozen_ocean et deep_frozen_ocean.',
    drops: [
      'Coquille de nautile ×1 — uniquement si le mob est tué par le joueur ; 5 % sans enchantement, 6 % avec Butin I puis +1 % par niveau supplémentaire'
    ],
    note: 'Il figure dans les tags can_equip_saddle, can_wear_nautilus_armor, can_breathe_under_water, aquatic et not_scary_for_pufferfish. nautilus_taming_items ne contient que le poisson-globe et le seau de poisson-globe ; nautilus_food ajoute tous les poissons et les seaux de morue, saumon, poisson tropical et poisson-globe. nautilus_hostiles ne contient que le poisson-globe. Le jar fournit un écran d\'inventaire dédié (textures/gui/container/nautilus.png) et un effet « Breath of the Nautilus » déclaré dans en_us.json.'
  },

  {
    nom: 'Desséché (Parched)', cat: 'hostile',
    tags: [
      { txt: 'Désert', cls: 'gold' },
      { txt: 'Squelette', cls: '' },
      { txt: 'Mort-vivant', cls: 'purple' }
    ],
    ou: 'Uniquement dans le biome desert, catégorie monster, poids 50, par groupes de 4 exactement (minCount = maxCount = 4). Il cohabite avec le momifié (poids 80) déjà présent dans ce biome.',
    drops: [
      'Flèche ×0–2 — +0 à 1 par niveau de Butin',
      'Os ×0–2 — +0 à 1 par niveau de Butin',
      'Flèche de Faiblesse ×0–1 — uniquement si tué par le joueur ; +0 à 1 avec Butin, plafonné à 1 flèche supplémentaire'
    ],
    note: 'Il appartient au tag entity_type/skeletons, donc au tag undead qui en dépend. C\'est le seul mob dont la table de butin produit directement une flèche à effet (set_potion : minecraft:weakness), sans passer par une potion.'
  },

  {
    nom: 'Golem de cuivre (Copper Golem)', cat: 'passif',
    tags: [
      { txt: 'Cuivre', cls: 'copper' },
      { txt: 'Statues', cls: '' },
      { txt: 'Aucun spawn naturel', cls: 'red' }
    ],
    ou: 'Aucun fichier de biome ne le déclare dans ses spawners : il n\'apparaît naturellement dans aucun biome d\'après les données. Le jar fournit un œuf d\'apparition (copper_golem_spawn_egg) et une famille de blocs « statue de golem de cuivre » en 4 stades d\'oxydation, chacun décliné en version cirée (tag item/copper_golem_statues, 8 blocs).',
    drops: [
      'Lingot de cuivre ×1–3 — +0 à 1 par niveau de Butin ; aucune condition, le butin tombe quelle que soit la cause de la mort'
    ],
    note: 'Il est le seul membre du tag accepts_iron_golem_gift, et le tag shearable_from_copper_golem ne contient que le coquelicot. Il figure aussi dans can_breathe_under_water et fall_damage_immune. Les blocs statue conservent leur nom personnalisé et leur état copper_golem_pose quand on les casse (fonctions copy_components et copy_state de leur table de butin).'
  },

  {
    nom: 'Dromadaire momifié (Camel Husk)', cat: 'hostile',
    tags: [
      { txt: 'Monture', cls: 'gold' },
      { txt: 'Mort-vivant', cls: 'purple' },
      { txt: 'Aucun spawn de biome', cls: 'red' }
    ],
    ou: 'Aucun fichier de worldgen/biome ne le liste dans ses spawners. En revanche la table de butin du momifié le désigne comme monture : un momifié tué alors qu\'il chevauche un camel_husk lâche un butin supplémentaire.',
    drops: [
      'Chair putréfiée ×2–3 — +0 à 1 par niveau de Butin ; aucune condition de mise à mort'
    ],
    note: 'Il fait partie du tag entity_type/zombies (donc undead), ainsi que de can_equip_saddle et can_float_while_ridden. camel_husk_food ne contient qu\'un seul objet : la patte de lapin. Le momifié qui le chevauche lâche justement une patte de lapin ×0–1 (+0 à 1 avec Butin), butin qui n\'existe que dans cette configuration.'
  },

  {
    nom: 'Nautile-zombie (Zombie Nautilus)', cat: 'hostile',
    tags: [
      { txt: 'Aquatique', cls: 'blue' },
      { txt: 'Mort-vivant', cls: 'purple' },
      { txt: 'Brûle au jour', cls: 'red' }
    ],
    ou: 'Aucun spawner de biome ne le mentionne. Les données définissent en revanche deux variantes d\'apparence : « temperate » par défaut (priorité 0) et « warm », texture corallienne, appliquée dans les biomes du tag spawns_coral_variant_zombie_nautilus, qui ne contient que warm_ocean.',
    drops: [
      'Chair putréfiée ×0–3 — uniquement si le mob est tué par le joueur ; +0 à 1 par niveau de Butin'
    ],
    note: 'Il figure dans burn_in_daylight, entity_type/zombies (donc undead), aquatic, can_equip_saddle, can_wear_nautilus_armor, cannot_be_pushed_onto_boats et not_scary_for_pufferfish. Comme le nautile vivant, il peut donc porter une selle et une armure pour nautile.'
  },

  {
    nom: 'Cube de soufre (Sulfur Cube)', cat: 'hostile',
    tags: [
      { txt: 'Grottes de soufre', cls: 'gold' },
      { txt: '12 archétypes', cls: 'cyan' },
      { txt: 'Aucun butin', cls: 'red' }
    ],
    ou: 'Biome sulfur_caves uniquement, catégorie monster, poids 100 — le poids le plus élevé du biome, devant le creeper, le squelette et le zombie (50 chacun) —, par groupes de 2 à 4.',
    drops: [
      'Sa table de butin ne contient AUCUN pool : le fichier se limite au type et à la séquence aléatoire. Le cube de soufre ne lâche donc rien à sa mort.'
    ],
    note: 'Douze archétypes sont définis dans data/minecraft/sulfur_cube_archetype/ : regular, bouncy, slow_bouncy, slow_flat, fast_flat, slow_sliding, fast_sliding, light, sticky, high_resistance, hot et explosive. Chacun modifie des attributs (bounciness, friction_modifier, air_drag_modifier, résistance au recul) et est associé à un tag d\'objets qu\'il peut avaler (sulfur_cube_swallowable). L\'archétype « hot » inflige 1 point de dégâts au contact via le type de dégâts sulfur_cube_hot (effet « burning ») ; « explosive » déclare une explosion de puissance 3, mèche 120, sans mise à feu. Un seau dédié existe (sulfur_cube_bucket) et sulfur_cube_food ne contient que la boule de slime.'
  },

  {
    nom: 'Ghast joyeux (Happy Ghast)', cat: 'passif',
    tags: [
      { txt: 'Harnais', cls: 'cyan' },
      { txt: 'Vol', cls: 'ok' },
      { txt: 'Aucun butin', cls: 'red' }
    ],
    ou: 'Aucun spawner de biome ne le déclare. Le jar fournit un œuf d\'apparition (happy_ghast_spawn_egg) et le bloc Dried Ghast, dont l\'état « hydration » va de 0 à 3 et possède une propriété waterlogged.',
    drops: [
      'Sa table de butin ne contient AUCUN pool : elle se limite au type et à la séquence aléatoire. Le ghast joyeux ne lâche rien à sa mort.'
    ],
    note: 'Il est le seul membre du tag can_equip_harness ; 16 harnais colorés plus un harnais de base sont déclarés dans en_us.json et dans assets/minecraft/equipment/. Il figure aussi dans dismounts_underwater, fall_damage_immune et followable_friendly_mobs.'
  },

  {
    nom: 'Mannequin (Mannequin)', cat: 'passif',
    tags: [
      { txt: 'PNJ', cls: '' },
      { txt: 'Commande', cls: 'cyan' },
      { txt: 'Aucun butin', cls: 'red' }
    ],
    ou: 'Aucun spawner de biome, aucun œuf d\'apparition, aucune recette. Le seul point d\'entrée visible dans les données est la clé de traduction commands.fetchprofile.summon_mannequin (« Summon Mannequin »).',
    drops: [
      'Sa table de butin ne contient AUCUN pool : elle se limite au type et à la séquence aléatoire. Le mannequin ne lâche rien.'
    ],
    note: 'en_us.json lui associe une étiquette dédiée : entity.minecraft.mannequin.label vaut « NPC ». Aucun autre fichier de données du jar ne le mentionne — ni tag, ni progrès, ni recette.'
  },

  {
    nom: 'Lances (Spears)', cat: 'bloc',
    tags: [
      { txt: '7 matériaux', cls: 'ok' },
      { txt: 'Attaque chargée', cls: 'gold' },
      { txt: 'Emplacement dédié', cls: 'cyan' }
    ],
    ou: 'Fabricables dans les 7 matériaux (bois, pierre, cuivre, fer, or, diamant, netherite). On en trouve aussi en coffre : forge de village (lance en fer poids 5, lance en cuivre poids 7), trésor enfoui (lance en fer), ruines sous-marines petites et grandes (lance en pierre, poids 2), trésor de bastion (lance en diamant, poids 6, usée et enchantée aléatoirement), trésor de cité de l\'End (lance en diamant, poids 3, enchantée à 20–39 niveaux).',
    drops: [
      'Recette commune : motif « X / # / # » en diagonale (pattern " X", " # ", "# ") — une tête de matériau plus deux bâtons',
      'Lance en netherite : forge uniquement, smithing_transform à partir de la lance en diamant, d\'un modèle de forgeage netherite_upgrade et de netherite_tool_materials',
      'Type de dégâts propre : minecraft:spear, épuisement 0,1, message_id « spear », scaling when_caused_by_living_non_player',
      'Tag minecraft:spears : les 7 lances y sont regroupées'
    ],
    note: 'Le progrès adventure/spear_many_mobs (« Mob Kabob », cadre goal, icône lance en fer) demande de toucher cinq mobs dans la même attaque chargée à la lance : les données confirment donc l\'existence d\'une attaque chargée touchant plusieurs cibles. Une texture d\'emplacement d\'inventaire dédiée existe (gui/sprites/container/slot/spear.png), ainsi qu\'un modèle « en main » distinct pour chaque lance.'
  },

  {
    nom: 'Armure pour nautile (Nautilus Armor)', cat: 'bloc',
    tags: [
      { txt: '5 matériaux', cls: 'ok' },
      { txt: 'Butin marin', cls: 'blue' },
      { txt: 'Non fabricable', cls: 'red' }
    ],
    ou: 'Cinq variantes : cuivre, fer, or, diamant, netherite. Aucune recette d\'artisanat n\'existe pour les quatre premières — seul netherite_nautilus_armor_smithing.json est présent dans data/minecraft/recipe/. Elles se trouvent donc uniquement en coffre, dans un même lot partagé par cinq tables : trésor enfoui, épave (carte, réserve, trésor) et ruines sous-marines (petites et grandes).',
    drops: [
      'Lot de coffre : rien (poids 148), armure en cuivre pour nautile (20), en fer (10), en or (5), en diamant (2) — un seul tirage, une seule pièce',
      'Armure en netherite pour nautile : forge uniquement, à partir de la version diamant plus un modèle netherite_upgrade et netherite_tool_materials'
    ],
    note: 'Le tag can_wear_nautilus_armor ne contient que deux entités : le nautile et le nautile-zombie. Le jar contient les textures d\'équipement correspondantes (entity/equipment/nautilus_body/ en cuivre, fer, or, diamant, netherite) et une texture de selle séparée (nautilus_saddle). Deux emplacements d\'inventaire dédiés existent aussi (slot/nautilus_armor.png et nautilus_armor_inventory.png).'
  },

  {
    nom: 'Armure en cuivre pour cheval (Copper Horse Armor)', cat: 'bloc',
    tags: [
      { txt: 'Cuivre', cls: 'copper' },
      { txt: 'Coffres', cls: 'gold' },
      { txt: 'Non fabricable', cls: 'red' }
    ],
    ou: 'Aucune recette dans data/minecraft/recipe/. On la trouve exclusivement en coffre : pyramide du désert (poids 15, à égalité avec l\'armure en fer), temple de la jungle, pont du Nether, donjon simple, couloir de forteresse, trésor de cité de l\'End et forge de village.',
    drops: [
      'Un exemplaire par tirage, sans fonction de dégâts ni d\'enchantement dans les tables consultées',
      'Dans la pyramide du désert, elle partage le même poids (15) que l\'armure en fer pour cheval, devant l\'or et le diamant',
      'Dans la forge de village et le trésor de cité de l\'End, elle est listée juste avant les armures en fer, or et diamant, au même poids par défaut'
    ],
    note: 'Elle complète la gamme existante (fer, or, diamant) par le bas. C\'est le seul objet « cuivre » de 26.2 qui ne dispose d\'aucune recette : tous les autres (outils, armure, lance) se fabriquent.'
  },

  {
    nom: 'Outils et armure en cuivre (Copper tools & armor)', cat: 'bloc',
    tags: [
      { txt: 'Cuivre', cls: 'copper' },
      { txt: '10 objets', cls: 'ok' },
      { txt: 'Fabricable', cls: 'ok' }
    ],
    ou: 'Dix objets nouveaux fabricables : épée, pioche, hache, pelle, houe et lance en cuivre, plus casque, plastron, jambières et bottes en cuivre. Toutes les recettes sont dans data/minecraft/recipe/, catégorie « equipment ».',
    drops: [
      'Outils : motifs vanilla habituels, avec le tag #minecraft:copper_tool_materials en tête de manche — ce tag ne contient qu\'une valeur, le lingot de cuivre',
      'Armure : motifs vanilla habituels utilisant directement minecraft:copper_ingot (casque « XXX / X X », plastron « X X / XXX / XXX », jambières « XXX / X X / X X », bottes « X X / X X »)',
      'Un jeu de textures d\'équipement porté est fourni : assets/minecraft/equipment/copper.json'
    ],
    note: 'Le cuivre s\'insère ainsi comme un palier d\'équipement complet, au même titre que le fer ou l\'or. Les valeurs d\'armure et de durabilité ne figurent dans aucun fichier de données du jar : elles sont définies dans le code, elles ne sont donc pas documentées ici.'
  },

  {
    nom: 'Ghast desséché (Dried Ghast)', cat: 'bloc',
    tags: [
      { txt: 'Nether', cls: 'red' },
      { txt: '4 stades d\'hydratation', cls: 'blue' },
      { txt: 'Troc piglin', cls: 'gold' }
    ],
    ou: 'Fabricable, ou obtenu par troc avec un piglin : il figure dans gameplay/piglin_bartering.json avec un poids de 10 pour 1 exemplaire.',
    drops: [
      'Recette : 8 larmes de ghast autour d\'1 bloc de sable des âmes (motif « ### / #X# / ### »), catégorie building, groupe « dry_ghast »',
      'Table de butin du bloc : il se lâche lui-même, sous la seule condition survives_explosion',
      'Le blocstate expose une propriété « hydration » à 4 valeurs (0 à 3) et une propriété « facing » sur 4 directions ; le bloc est aquifiable (waterlogged)'
    ],
    note: 'Le progrès husbandry/place_dried_ghast_in_water (« Stay Hydrated! ») se déclenche en posant un bloc Dried Ghast dans l\'eau, c\'est-à-dire à l\'état waterlogged=true. C\'est le seul lien que les données établissent entre ce bloc et le ghast joyeux, qui ne possède ni butin ni apparition naturelle.'
  },

  {
    nom: 'Soufre et cinabre (Sulfur & Cinnabar)', cat: 'bloc',
    tags: [
      { txt: 'Grottes de soufre', cls: 'gold' },
      { txt: 'Pioche', cls: '' },
      { txt: '2 familles complètes', cls: 'cyan' }
    ],
    ou: 'Les deux blocs constituent la matière des grottes de soufre : les règles de surface du Surworld les placent dans ce seul biome, selon le bruit sulfur_cave_gradient. Les deux figurent dans le tag mineable/pickaxe.',
    drops: [
      'Soufre : famille complète — dalle, escalier, muret, version polie (dalle, escalier, muret), version taillée (dalle, escalier, muret) et version sculptée ; chaque bloc se lâche lui-même',
      'Pointe de soufre (sulfur_spike) : bloc de type spéléothème, généré vers le haut comme vers le bas ; 4 pointes en carré 2×2 redonnent 1 bloc de soufre',
      'Soufre concentré (potent_sulfur) : 9 blocs de soufre sans forme imposée ; il apparaît naturellement à l\'état « wet » au fond des bassins de soufre',
      'Cinabre : mêmes déclinaisons que le soufre (poli, taillé, sculpté, dalles, escaliers, murets) ; aucune recette ne le produit, il ne s\'obtient qu\'en le minant',
      'Marchand ambulant : 1 émeraude → 2 pointes de soufre (5 utilisations)'
    ],
    note: 'sulfur_spike_replaceable_blocks ne contient que deux blocs, le soufre et le cinabre : les pointes ne poussent que dans cette matière. Toutes les variantes taillées sont accessibles au tailleur de pierre en plus de l\'établi.'
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
  ['Obsidienne pleureuse',                    '8,53 %', '1–3'],
  ['Charge de feu',                            '8,53 %', '1'],
  ['Cuir',                                    '8,53 %', '2–4'],
  ['Sable des âmes',                          '8,53 %', '2–8'],
  ['Brique du Nether',                        '8,53 %', '2–8'],
  ['Flèches spectrales',                      '8,53 %', '6–12'],
  ['Gravier',                                 '8,53 %', '8–16'],
  ['Roche noire',                            '8,53 %', '8–16'],
  ['Ficelle',                                 '4,26 %', '3–9'],
  ['Quartz du Nether',                        '4,26 %', '5–12'],
  ['Fiole d\'eau',                            '2,13 %', '1'],
  ['Pépites de fer',                          '2,13 %', '10–36'],
  ['Perles de l\'Ender',                      '2,13 %', '2–4'],
  ['Ghast desséché',                          '2,13 %', '1'],
  ['Bottes en fer (Agilité des âmes)',        '1,71 %', '1'],
  ['Potion de Résistance au feu',             '1,71 %', '1'],
  ['Potion jetable de Résistance au feu',     '1,71 %', '1'],
  ['Livre enchanté (Agilité des âmes)',       '1,07 %', '1']
];
