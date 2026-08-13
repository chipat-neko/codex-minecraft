/* ============================================================
   Données : biomes — ce qu'on y trouve d'exclusif
   ============================================================ */

var BIOMES = [

  /* ---------------- TEMPÉRÉS ---------------- */
  {
    nom: 'Plaines', cat: 'tempere',
    tags: [{ txt: 'Surworld', cls: 'ok' }, { txt: 'Départ idéal', cls: 'gold' }],
    ou: 'Le biome le plus courant : herbe plate, quelques chênes, fleurs éparses.',
    drops: [
      'Villages (le type le plus fréquent, avec forgerons)',
      'Chevaux et ânes en troupeaux — les seules montures rapides du jeu',
      'Vaches, moutons, cochons, poulets en abondance',
      'Terrain plat : le meilleur endroit pour bâtir sans terrassement'
    ],
    note: 'Le spawn idéal : plaines adossées à une forêt (bois) et proches d\'une montagne (fer et émeraudes en surface).'
  },
  {
    nom: 'Forêt / Forêt de bouleaux / Forêt de fleurs', cat: 'tempere',
    tags: [{ txt: 'Surworld', cls: 'ok' }],
    ou: 'Couverture dense de chênes ou de bouleaux ; la forêt de fleurs est une variante rare.',
    drops: [
      'Bois en quantité, pommes en cassant les feuillages de chêne',
      'Nids d\'abeilles (surtout en forêt de fleurs et de bouleaux)',
      'Toutes les fleurs à teinture, y compris les grandes (2 colorants)',
      'Loups apprivoisables en forêt'
    ],
    note: 'La forêt de fleurs est la seule source pratique de tous les colorants végétaux au même endroit.'
  },
  {
    nom: 'Forêt sombre', cat: 'tempere',
    tags: [{ txt: 'Dangereux', cls: 'red' }, { txt: 'Manoir', cls: 'purple' }],
    ou: 'Chênes noirs si denses que le sol reste dans l\'obscurité même en plein jour.',
    drops: [
      'Manoir des bois : totems d\'immortalité, allays en cage, patron d\'armure « vex »',
      'Chêne noir : le meilleur bois pour les fermes à arbres (toujours en gros arbre)',
      'Champignons géants et champignons au sol',
      'Mobs qui apparaissent en plein jour à cause de l\'obscurité'
    ],
    note: 'Ne traversez jamais une forêt sombre sans armure : les monstres y apparaissent en permanence, même à midi.'
  },
  {
    nom: 'Forêt pâle (Pale Garden)', cat: 'tempere',
    tags: [{ txt: 'Creaking', cls: 'purple' }, { txt: 'Récent', cls: 'cyan' }],
    ou: 'Variante blafarde de la forêt sombre : chênes pâles, mousse grise, aucun animal.',
    drops: [
      'Bois de chêne pâle et mousse pâle (blocs décoratifs uniques)',
      'Cœur du Craquant (creaking heart) — au Toucher de soie',
      'Le Creaking : un mob invincible qui ne bouge que hors de votre champ de vision',
      'Lucioles décoratives (pale hanging moss)'
    ],
    note: 'Aucun animal n\'y apparaît, et le silence est volontaire : c\'est le biome le plus atmosphérique du jeu.'
  },
  {
    nom: 'Cerisaie (Cherry Grove)', cat: 'tempere',
    tags: [{ txt: 'Montagne', cls: 'ok' }],
    ou: 'Sur les versants de montagne : arbres roses, herbe claire, pétales au sol.',
    drops: [
      'Bois de cerisier et pétales roses (blocs de construction très recherchés)',
      'Abeilles et nids',
      'Cochons, moutons, lapins'
    ],
    note: 'Le bois de cerisier est le seul bois rose du jeu : il change complètement une palette de construction.'
  },
  {
    nom: 'Marais / Marais de mangrove', cat: 'tempere',
    tags: [{ txt: 'Sorcières', cls: 'purple' }],
    ou: 'Eau stagnante, chênes couverts de lianes, argile au fond de l\'eau.',
    drops: [
      'Hutte de sorcière : la base des fermes à sorcières (redstone, poudre lumineuse, sucre)',
      'Argile en quantité (briques, terre cuite)',
      'Slimes la nuit de pleine lune, entre Y 50 et 70',
      'Grenouilles et têtards → froglights · boue et mangrove en marais de mangrove',
      'Nénuphars, champignons bleus'
    ],
    note: 'Une hutte de sorcière transformée en ferme fournit à elle seule redstone, poudre lumineuse, sucre et fioles en verre.'
  },
  {
    nom: 'Jungle', cat: 'tempere',
    tags: [{ txt: 'Ressources uniques', cls: 'gold' }],
    ou: 'Végétation très dense, arbres géants, bambouseraies, cours d\'eau.',
    drops: [
      'Fèves de cacao (colorant marron, cookies) — uniquement sur les troncs de jungle',
      'Bambou (fermes à carburant, échafaudages)',
      'Pastèques sauvages',
      'Ocelots et pandas (bambouseraies), perroquets',
      'Temple de la jungle : diamants, émeraudes, distributeurs et redstone à récupérer'
    ],
    note: 'La jungle est le seul endroit où trouver le cacao ET le bambou : deux ressources qu\'on ne peut pas obtenir ailleurs.'
  },

  /* ---------------- CHAUDS ---------------- */
  {
    nom: 'Désert', cat: 'chaud',
    tags: [{ txt: 'Husks', cls: 'gold' }],
    ou: 'Sable à perte de vue, cactus, aucune pluie.',
    drops: [
      'Temple du désert : diamants, émeraudes, pomme dorée enchantée (piège au TNT)',
      'Village du désert et puits',
      'Sable et grès en quantité illimitée (TNT, verre, construction)',
      'Cactus (colorant vert, fermes à cactus), lapins',
      'Husks : des zombies qui ne brûlent pas au soleil'
    ],
    note: 'Le sable du désert alimente à la fois le verre et le TNT : installez-y une carrière si vous prévoyez de grands chantiers.'
  },
  {
    nom: 'Badlands / Mesa', cat: 'chaud',
    tags: [{ txt: 'Or', cls: 'gold' }, { txt: 'Rare', cls: 'purple' }],
    ou: 'Plateaux de terre cuite colorée en strates, très rares à générer.',
    drops: [
      'OR en surface : gisements géants entre Y 32 et 256, à ciel ouvert',
      'Terre cuite naturelle de toutes les couleurs (le meilleur bloc de construction du jeu)',
      'Mines abandonnées générées EN SURFACE : butin sans danger',
      'Sable rouge, cactus'
    ],
    note: 'Le meilleur biome du jeu pour l\'or : une seule session de minage en badlands rapporte plus que dix heures de tunnels.'
  },
  {
    nom: 'Savane', cat: 'chaud',
    tags: [{ txt: 'Acacia', cls: 'gold' }],
    ou: 'Herbe jaune, acacias aux formes tordues, terrain vallonné.',
    drops: [
      'Bois d\'acacia (orange vif, unique)',
      'Villages de savane',
      'Armadillos : écailles pour l\'armure de loup (à récolter à la brosse)',
      'Chevaux, lamas sur les plateaux'
    ],
    note: 'L\'armadillo se récolte à la brosse toutes les 5 minutes sans le tuer : ne le chassez jamais.'
  },
  {
    nom: 'Champs de champignons', cat: 'chaud',
    tags: [{ txt: 'Très rare', cls: 'purple' }, { txt: 'Zéro monstre', cls: 'ok' }],
    ou: 'Île isolée en plein océan, sol de mycélium, champignons géants.',
    drops: [
      'Mooshrooms : soupe de champignons ILLIMITÉE avec un simple bol',
      'Mycélium et champignons géants',
      'Aucun monstre hostile n\'y apparaît naturellement, même dans le noir'
    ],
    note: 'Le biome le plus sûr du jeu : une base sur champs de champignons n\'a besoin d\'aucun éclairage défensif en surface.'
  },

  /* ---------------- FROIDS ---------------- */
  {
    nom: 'Taïga / Vieille taïga', cat: 'froid',
    tags: [{ txt: 'Épicéa', cls: 'cyan' }],
    ou: 'Sapins, fougères, sol souvent couvert de podzol dans les vieilles taïgas.',
    drops: [
      'Bois d\'épicéa et podzol (le seul sol où poussent les gros champignons partout)',
      'Villages de taïga (avec des coffres à graines de citrouille)',
      'Loups, renards, lapins',
      'Baies sucrées (buissons) : nourriture et appât pour les renards'
    ],
    note: 'Les vieilles taïgas ont des épicéas géants de 2×2 : le bois s\'y récolte deux à trois fois plus vite qu\'ailleurs.'
  },
  {
    nom: 'Plaines enneigées / Pics glacés', cat: 'froid',
    tags: [{ txt: 'Strays', cls: 'cyan' }],
    ou: 'Neige permanente, lacs gelés, pics de glace compactée dans la variante extrême.',
    drops: [
      'Glace compactée (→ glace bleue pour les autoroutes en bateau)',
      'Igloo : le kit complet pour soigner un villageois zombifié',
      'Strays : flèches de Lenteur gratuites',
      'Neige à volonté (boules de neige, blocs, golems)',
      'Villages enneigés, ours polaires, lapins blancs'
    ],
    note: '9 glaces compactées = 1 glace bleue. Une autoroute en glace bleue dans le Nether atteint ≈70 blocs/seconde en bateau.'
  },
  {
    nom: 'Montagnes (versants, pics, bosquets)', cat: 'froid',
    tags: [{ txt: 'Émeraudes', cls: 'ok' }, { txt: 'Fer', cls: 'gold' }],
    ou: 'Reliefs au-dessus de Y 130 : pierre nue, neige, bosquets boisés.',
    drops: [
      'ÉMERAUDES : le seul biome du jeu où elles apparaissent (pic à Y 236)',
      'Fer en surface (deuxième pic de génération à Y 232)',
      'Chèvres : cornes de chèvre (8 variantes)',
      'Chemin le plus court vers les grottes profondes et le deep dark'
    ],
    note: 'Prospecter à flanc de montagne rapporte fer et émeraudes sans creuser un seul tunnel.'
  },

  /* ---------------- AQUATIQUES ---------------- */
  {
    nom: 'Océans (chaud, tiède, froid, gelé)', cat: 'aquatique',
    tags: [{ txt: 'Surworld', cls: 'blue' }],
    ou: 'Selon la température : récifs coralliens en océan chaud, kelp en océan froid.',
    drops: [
      'Épaves et ruines sous-marines : cartes au trésor → cœur de la mer',
      'Coraux et éventails (océan chaud uniquement)',
      'Kelp (carburant séché : le meilleur du jeu, 20 objets par bloc)',
      'Noyés : tridents, coquillages nautiles, cuivre',
      'Dauphins (bonus de vitesse de nage), tortues sur les plages chaudes'
    ],
    note: 'Le kelp séché compacté en blocs est le carburant le plus rentable pour une fonderie automatique.'
  },
  {
    nom: 'Océan profond & monument', cat: 'aquatique',
    tags: [{ txt: 'Monument', cls: 'blue' }, { txt: 'Difficile', cls: 'red' }],
    ou: 'Fonds à Y 30 et moins ; le monument océanique s\'y génère en prismarine.',
    drops: [
      '8 blocs d\'or dans la chambre centrale du monument',
      'Éponges (salle aux éponges) : le seul moyen de vider un volume d\'eau',
      'Prismarine, lanternes marines, gardiens à l\'infini',
      'Cœur de la mer (trésor enfoui) → conduit et boussole de récupération'
    ],
    note: 'Vidé de son eau, un monument devient la ferme la plus productive du jeu, en objets comme en XP.'
  },
  {
    nom: 'Rivière', cat: 'aquatique',
    tags: [{ txt: 'Transport', cls: 'blue' }],
    ou: 'Cours d\'eau traversant tous les biomes terrestres.',
    drops: [
      'Argile et sable au fond',
      'Saumons, calmars',
      'Voie de circulation rapide en bateau pour l\'exploration précoce'
    ],
    note: 'Explorer en bateau sur une rivière est le moyen le plus rapide et le plus sûr de cartographier une région en début de partie.'
  },

  /* ---------------- SOUTERRAINS ---------------- */
  {
    nom: 'Grottes luxuriantes', cat: 'souterrain',
    tags: [{ txt: 'Souterrain', cls: 'ok' }],
    ou: 'Repérables en surface grâce aux azalées : creusez sous un azalée, la grotte est en dessous.',
    drops: [
      'Axolotls (alliés de combat aquatiques, régénération)',
      'Mousse, glow berries (éclairage naturel et nourriture), vignes tombantes',
      'Argile et grands bassins d\'eau claire',
      'Bois d\'azalée'
    ],
    note: 'Le bloc de mousse + poudre d\'os transforme instantanément la pierre en verdure : l\'outil de terraformation le plus rapide du jeu.'
  },
  {
    nom: 'Grottes de dripstone', cat: 'souterrain',
    tags: [{ txt: 'Cuivre', cls: 'copper' }],
    ou: 'Vastes cavités hérissées de stalactites et de stalagmites.',
    drops: [
      'Gisements de CUIVRE géants',
      'Bloc de dripstone : sous un chaudron, il génère eau ou lave à l\'infini',
      'Stalactites : pièges naturels (dégâts de chute) et générateur de lave renouvelable'
    ],
    note: 'Une stalactite au-dessus d\'un chaudron, avec de la lave au-dessus, produit de la lave infinie : le meilleur carburant du jeu.'
  },
  {
    nom: 'Deep Dark & Cité antique', cat: 'souterrain',
    tags: [{ txt: 'Warden', cls: 'red' }, { txt: 'Très dangereux', cls: 'red' }],
    ou: 'Sous les montagnes, généralement sous Y 0. Sol de sculk, silence total.',
    drops: [
      'Cité antique : disque « otherside », patron d\'armure « silence », houe en diamant enchantée, Toucher de soie',
      'Catalyseur de sculk (Toucher de soie) : la meilleure ferme à XP du jeu',
      'Éclat d\'écho (Warden) → boussole de récupération',
      'Diamants exposés en grande quantité dans les couloirs'
    ],
    note: 'Accroupissez-vous en permanence, jetez des boules de neige comme leurres et emportez de la laine pour étouffer les capteurs à sculk.'
  },

  /* ---------------- NETHER ---------------- */
  {
    nom: 'Vallée du sable des âmes', cat: 'nether',
    tags: [{ txt: 'Nether', cls: 'red' }],
    ou: 'Vastes plaines de sable des âmes, squelettes en quantité, ghasts nombreux.',
    drops: [
      'Sable des âmes (invocation du Wither, ascenseurs à bulles, torches des âmes)',
      'Squelettes wither en surnombre, os à volonté',
      'Fossiles de bois nether',
      'Le meilleur biome pour une ferme à zombies-piglins (terrain dégagé)'
    ],
    note: 'Le sable des âmes ralentit fortement : posez toujours un chemin de blocs pleins avant de traverser.'
  },
  {
    nom: 'Forêt écarlate / déformée', cat: 'nether',
    tags: [{ txt: 'Nether', cls: 'red' }],
    ou: 'Forêts de champignons géants rouges (écarlate) ou bleus (déformée).',
    drops: [
      'Bois écarlate et déformé (imputrescible, ininflammable)',
      'Hoglins (viande) en forêt écarlate · endermen en masse en forêt déformée',
      'Champignons difformes (reproduction des hoglins, direction des striders)',
      'Racines lumineuses, vignes tordues'
    ],
    note: 'La forêt déformée est le seul biome du Nether où aucun mob hostile n\'apparaît naturellement — sauf les endermen.'
  },
  {
    nom: 'Deltas de basalte', cat: 'nether',
    tags: [{ txt: 'Nether', cls: 'red' }, { txt: 'Hostile', cls: 'red' }],
    ou: 'Champs de basalte et de blackstone, lacs de lave, cendres en suspension.',
    drops: [
      'Blackstone (pierre noire) : matériau de construction sombre unique',
      'Quartz du Nether en très forte densité',
      'Magma cubes (crème de magma → résistance au feu)'
    ],
    note: 'Le terrain accidenté et les magma cubes en font le biome le plus pénible à traverser : contournez-le si possible.'
  },
  {
    nom: 'Étendue du Nether (Nether Wastes)', cat: 'nether',
    tags: [{ txt: 'Nether', cls: 'red' }],
    ou: 'Le biome classique du Nether : netherrack rouge, lacs de lave, grottes ouvertes.',
    drops: [
      'Forteresses du Nether (Blaze, verrue du Nether, squelettes wither)',
      'Bastions (or, débris antiques, patrons d\'armure)',
      'Quartz, or du Nether, débris antiques (Y 15)',
      'Zombies-piglins pour les fermes à or'
    ],
    note: 'Creusez votre tunnel à débris antiques à Y = 15 : c\'est le pic exact de génération.'
  },

  /* ---------------- END ---------------- */
  {
    nom: 'Île centrale de l\'End', cat: 'end',
    tags: [{ txt: 'Boss', cls: 'purple' }],
    ou: 'L\'île d\'arrivée : obsidienne, tours à cristaux, le dragon.',
    drops: [
      'Dragon de l\'End : 12 000 XP, œuf de dragon, souffle du dragon',
      'Obsidienne en quantité (tours)',
      'Endermen à profusion → perles de l\'Ender'
    ],
    note: 'Emportez une citrouille sculptée : elle permet de regarder les endermen sans les provoquer.'
  },
  {
    nom: 'Îles extérieures de l\'End', cat: 'end',
    tags: [{ txt: 'Élytre', cls: 'purple' }],
    ou: 'Au-delà de la passerelle : îles de pierre de l\'End, arbres à chorus, cités.',
    drops: [
      'ÉLYTRES (navire de l\'End, dans un cadre d\'objet)',
      'Carapaces de shulker → boîtes de shulker',
      'Blocs de purpur, pierre de l\'End, fruits du chorus (téléportation aléatoire)',
      'Coffres : diamants, patron « spire », équipement en diamant enchanté'
    ],
    note: 'Toutes les cités n\'ont pas de navire. Utilisez une longue-vue depuis la tour la plus haute pour repérer le navire de loin.'
  }
];
