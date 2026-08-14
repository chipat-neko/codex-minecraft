/* ============================================================
   Données : brassage (alambic)
   Durées données pour la potion buvable standard en Java.
   ============================================================ */

/* Toutes les potions : base → ingrédient → effet */
var POTIONS = [
  {
    nom: 'Potion étrange', cat: 'base',
    tags: [{ txt: 'Base obligatoire', cls: 'gold' }],
    ou: 'Fiole d\'eau + verrue du Nether',
    drops: [
      'Aucun effet en soi — c\'est le socle de presque toutes les potions',
      'Verrue du Nether : escaliers des forteresses du Nether, à replanter sur du sable des âmes'
    ],
    note: 'Brassez toujours 3 fioles à la fois : l\'alambic traite les 3 emplacements pour un seul ingrédient.'
  },
  {
    nom: 'Potion épaisse', cat: 'base',
    tags: [{ txt: 'Impasse', cls: 'red' }],
    ou: 'Fiole d\'eau + poudre lumineuse',
    drops: ['Aucun effet et aucune suite possible — c\'est une erreur de brassage, pas une étape'],
    note: 'Si vous obtenez ça, vous avez inversé l\'ordre : la verrue du Nether vient TOUJOURS en premier.'
  },
  {
    nom: 'Potion banale', cat: 'base',
    tags: [{ txt: 'Impasse', cls: 'red' }],
    ou: 'Fiole d\'eau + presque n\'importe quel ingrédient sans verrue',
    drops: ['Aucun effet, aucune suite'],
    note: 'Deux exceptions utiles : l\'eau + poudre à canon donne une fiole d\'eau jetable (éteint le feu), et l\'eau + œil d\'araignée fermenté donne la Faiblesse.'
  },

  {
    nom: 'Force', cat: 'combat',
    tags: [{ txt: '+3 dégâts', cls: 'red' }, { txt: '3:00', cls: '' }],
    ou: 'Potion étrange + poudre de Blaze',
    drops: [
      'Durée de base 3:00 · avec redstone 8:00',
      'Force II avec poudre lumineuse : 1:30, +6 dégâts au corps à corps'
    ],
    note: 'Force II + épée en netherite avec Tranchant V tue un creeper en un coup : c\'est la potion des raids et des manoirs.'
  },
  {
    nom: 'Rapidité', cat: 'utilite',
    tags: [{ txt: '+20 % vitesse', cls: 'ok' }, { txt: '3:00', cls: '' }],
    ou: 'Potion étrange + sucre',
    drops: ['Base 3:00 · redstone 8:00 · poudre lumineuse : Rapidité II (1:30, +40 %)'],
    note: 'Le sucre vient de la canne à sucre : c\'est la seule potion entièrement automatisable dès le début de partie.'
  },
  {
    nom: 'Résistance au feu', cat: 'utilite',
    tags: [{ txt: 'Immunité feu & lave', cls: 'gold' }, { txt: '3:00', cls: '' }],
    ou: 'Potion étrange + crème de magma',
    drops: ['Base 3:00 · redstone 8:00 · pas de version renforcée'],
    note: 'LA potion du Nether. Elle annule les dégâts de lave, de feu et des blazes. Emportez-en 4 avant toute expédition dans un bastion.'
  },
  {
    nom: 'Vision nocturne', cat: 'utilite',
    tags: [{ txt: 'Voir dans le noir', cls: 'blue' }, { txt: '3:00', cls: '' }],
    ou: 'Potion étrange + carotte dorée',
    drops: ['Base 3:00 · redstone 8:00', 'Inversée (œil d\'araignée fermenté) : INVISIBILITÉ — il n\'existe aucune potion de Cécité'],
    note: 'Indispensable sous l\'eau et dans les cités antiques. Combinée à la Respiration aquatique, elle transforme l\'exploration océanique.'
  },
  {
    nom: 'Respiration aquatique', cat: 'utilite',
    tags: [{ txt: 'Apnée illimitée', cls: 'blue' }, { txt: '3:00', cls: '' }],
    ou: 'Potion étrange + poisson-globe',
    drops: ['Base 3:00 · redstone 8:00'],
    note: 'Un conduit (8 coquilles de nautile + 1 cœur de la mer) rend cette potion inutile dans un rayon de 96 blocs : préférez-le pour un gros chantier.'
  },
  {
    nom: 'Soin instantané', cat: 'soin',
    tags: [{ txt: '+2 cœurs', cls: 'ok' }, { txt: 'Instantané', cls: '' }],
    ou: 'Potion étrange + tranche de pastèque scintillante',
    drops: [
      'Soin I : 2 cœurs · Soin II (poudre lumineuse) : 4 cœurs',
      'Inversée (œil fermenté) : Dégâts instantanés — 3 cœurs, ou 6 en version II'
    ],
    note: 'Sur les morts-vivants (zombies, squelettes, noyés), le Soin inflige des DÉGÂTS et les Dégâts instantanés les SOIGNENT.'
  },
  {
    nom: 'Régénération', cat: 'soin',
    tags: [{ txt: 'Soin continu', cls: 'ok' }, { txt: '0:45', cls: '' }],
    ou: 'Potion étrange + larme de Ghast',
    drops: ['Base 0:45 · redstone 1:30 · poudre lumineuse : Régénération II (0:22)'],
    note: 'La meilleure potion de survie en combat prolongé : elle soigne pendant que vous encaissez, contrairement au Soin instantané.'
  },
  {
    nom: 'Saut', cat: 'utilite',
    tags: [{ txt: 'Saut renforcé', cls: '' }, { txt: '3:00', cls: '' }],
    ou: 'Potion étrange + patte de lapin',
    drops: ['Base 3:00 · redstone 8:00 · poudre lumineuse : Saut II', 'Inversée : LENTEUR — il n\'existe aucune potion de Nausée'],
    note: 'Saut II permet de franchir 2 blocs de hauteur : pratique pour explorer une montagne sans creuser d\'escalier.'
  },
  {
    nom: 'Lenteur', cat: 'combat',
    tags: [{ txt: 'Ralentit la cible', cls: 'red' }, { txt: '1:30', cls: '' }],
    ou: 'Potion de Rapidité ou de Saut + œil d\'araignée fermenté',
    drops: ['Base 1:30 · redstone 4:00 · poudre lumineuse : Lenteur IV (0:20, quasi immobilisation)'],
    note: 'En version jetable, c\'est la meilleure façon de figer un ravageur ou un évocateur pendant un raid.'
  },
  {
    nom: 'Faiblesse', cat: 'combat',
    tags: [{ txt: '−4 dégâts', cls: 'red' }, { txt: '1:30', cls: '' }],
    ou: 'Fiole d\'EAU + œil d\'araignée fermenté (pas besoin de verrue !)',
    drops: ['Base 1:30 · redstone 4:00'],
    note: 'Usage principal : SOIGNER un villageois zombifié. Potion de Faiblesse jetable + pomme dorée = un villageois aux prix cassés à vie.'
  },
  {
    nom: 'Poison', cat: 'combat',
    tags: [{ txt: 'Dégâts continus', cls: 'red' }, { txt: '0:45', cls: '' }],
    ou: 'Potion étrange + œil d\'araignée',
    drops: ['Base 0:45 · redstone 1:30 · poudre lumineuse : Poison II', 'Inversée : Dégâts instantanés'],
    note: 'Le Poison ne tue jamais (il s\'arrête à un demi-cœur) et n\'a aucun effet sur les morts-vivants ni sur les araignées.'
  },
  {
    nom: 'Invisibilité', cat: 'utilite',
    tags: [{ txt: 'Invisible', cls: 'purple' }, { txt: '3:00', cls: '' }],
    ou: 'Potion de Vision nocturne + œil d\'araignée fermenté',
    drops: [
      'Base 3:00 · redstone 8:00',
      'Votre armure, vos objets en main et vos flèches plantées restent visibles'
    ],
    note: 'Les mobs vous repèrent quand même à 1 bloc, et les Wardens vous entendent toujours. Videz vos emplacements d\'armure pour être vraiment discret.'
  },
  {
    nom: 'Dégâts instantanés', cat: 'combat',
    tags: [{ txt: '3 cœurs', cls: 'red' }, { txt: 'Instantané', cls: '' }],
    ou: 'Potion de Soin ou de Poison + œil d\'araignée fermenté',
    drops: [
      'Dégâts I : 3 cœurs · Dégâts II (poudre lumineuse) : 6 cœurs',
      'Sur les morts-vivants, l\'effet s\'inverse : elle les soigne'
    ],
    note: 'En version jetable, c\'est l\'arme la plus efficace du jeu contre un joueur ou un mob vivant : aucune armure ne réduit les dégâts de potion.'
  },
  {
    nom: 'Chute lente', cat: 'utilite',
    tags: [{ txt: 'Annule la chute', cls: 'cyan' }, { txt: '1:30', cls: '' }],
    ou: 'Potion étrange + membrane de Phantom',
    drops: ['Base 1:30 · redstone 4:00'],
    note: 'Sauve la vie lors des vols à l\'élytre et permet de descendre d\'une cité de l\'End sans échafaudage. Emportez-en toujours une en poche.'
  },
  {
    nom: 'Maître Tortue', cat: 'combat',
    tags: [{ txt: 'Lenteur IV + Résistance III', cls: 'purple' }, { txt: '0:20', cls: '' }],
    ou: 'Potion étrange + carapace de tortue',
    drops: [
      'Base 0:20 · redstone 0:40 · poudre lumineuse : Lenteur VI + Résistance IV, toujours 0:20',
      'C\'est bien la CARAPACE qu\'il faut, pas l\'écaille : comptez 5 écailles pour la fabriquer'
    ],
    note: 'Vous devenez presque immobile mais encaissez 60 % de dégâts en moins. Utile face au Warden ou pour survivre à une explosion.'
  },
  {
    nom: 'Souffle (Wind Charged)', cat: 'combat',
    tags: [{ txt: 'Chambres d\'épreuve', cls: 'cyan' }, { txt: '3:00', cls: '' }],
    ou: 'Potion étrange + bâton de Breeze',
    drops: ['La cible projette une rafale de vent quand elle est touchée'],
    note: 'Introduite avec les chambres d\'épreuve. Surtout utile en version jetable, pour désorganiser un groupe de mobs.'
  },
  {
    nom: 'Viscosité et Tissage', cat: 'combat',
    tags: [{ txt: 'Chambres d\'épreuve', cls: 'cyan' }, { txt: '3:00', cls: '' }],
    ou: 'Potion étrange + bloc de slime (Viscosité) ou toile d\'araignée (Tissage)',
    drops: [
      'Viscosité : la cible lâche 2 slimes à sa mort',
      'Tissage : la cible laisse des toiles à sa mort',
      'Attention, c\'est le BLOC de slime qu\'il faut, pas la boule : 9 boules par brassage'
    ],
    note: 'La Viscosité ne remplace pas une ferme à slimes : elle coûte 9 boules pour en rendre quelques-unes. Son intérêt est en combat, pas en production.'
  },
  {
    nom: 'Infestation', cat: 'combat',
    tags: [{ txt: 'Chambres d\'épreuve', cls: 'cyan' }, { txt: '3:00', cls: '' }],
    ou: 'Potion étrange + roche',
    drops: [
      'La cible libère des silverfish quand elle est blessée',
      'L\'ingrédient est la roche cuite, pas la pierre brute ni la pierre taillée'
    ],
    note: 'La moins chère de toutes les potions : une pierre au four suffit. En version jetable sur un groupe, elle crée un désordre durable.'
  }
];

/* Les 4 formes d'une potion */
var FORMES = [
  ['Potion buvable', 'La potion de base', 'Effet complet sur vous seul, à boire (1,3 s d\'animation)'],
  ['Potion jetable (splash)', '+ poudre à canon', 'Se lance ; touche plusieurs cibles ; durée réduite à 75 %'],
  ['Potion persistante (lingering)', 'Potion jetable + souffle de dragon', 'Crée un nuage au sol pendant 30 s ; durée par contact réduite à 25 %'],
  ['Flèche à effet', '8 flèches autour d\'une potion persistante', 'Applique l\'effet à la cible touchée ; durée à 12,5 % (mais 8 flèches par potion)']
];

/* Modificateurs */
var MODIFS = [
  ['Poudre de redstone', 'Prolonge la durée', 'Annule l\'effet de la poudre lumineuse — les deux sont exclusifs'],
  ['Poudre lumineuse', 'Renforce le niveau (II)', 'Réduit fortement la durée'],
  ['Poudre à canon', 'Rend la potion jetable', 'S\'applique en dernier, après les autres modificateurs'],
  ['Souffle de dragon', 'Rend la potion persistante', 'Se récolte en fiole dans le nuage d\'haleine de l\'Ender Dragon'],
  ['Œil d\'araignée fermenté', 'Inverse l\'effet', 'Sucre → Lenteur · Soin → Dégâts · Vision nocturne → Invisibilité · Saut → Lenteur']
];

/* Où trouver les ingrédients */
var INGREDIENTS = [
  ['Verrue du Nether', 'Escaliers des forteresses du Nether', 'Se replante sur du sable des âmes : ressource renouvelable'],
  ['Poudre de Blaze', 'Bâtons de Blaze (forteresse du Nether)', '1 bâton = 2 poudres ; sert aussi de carburant à l\'alambic'],
  ['Crème de magma', 'Cubes de magma, ou poudre de Blaze + boule de slime', 'Craftable : c\'est souvent plus rapide que la chasse'],
  ['Larme de Ghast', 'Ghasts (mers de lave, deltas de basalte)', '50 % de drop ; visez-les à l\'arc depuis un abri'],
  ['Tranche de pastèque scintillante', '8 pépites d\'or + 1 tranche de pastèque', 'Ferme à pastèques + ferme à or = production illimitée'],
  ['Carotte dorée', '8 pépites d\'or + 1 carotte', 'Aussi le meilleur aliment du jeu : produisez-en en masse'],
  ['Poisson-globe', 'Pêche en océan chaud, ou capture au seau', 'Une ferme à pêche automatique en fournit régulièrement'],
  ['Patte de lapin', 'Lapins (10 % de drop)', 'Le drop le plus rare des mobs passifs : prévoyez du Butin III'],
  ['Membrane de Phantom', 'Phantoms (3 nuits sans dormir)', 'Sert aussi à réparer l\'élytre à l\'enclume'],
  ['Carapace de tortue', '5 écailles, laissées par les bébés tortues devenus adultes', 'C\'est la carapace fabriquée que réclame l\'alambic, pas l\'écaille brute'],
  ['Bloc de slime', '9 boules de slime', 'Le brassage de la Viscosité consomme le bloc entier'],
  ['Roche', 'Pierre passée au four', 'Ingrédient de la potion d\'Infestation : le moins cher du jeu'],
  ['Œil d\'araignée', 'Araignées (33 %)', 'Fermenté = œil + sucre + champignon brun'],
  ['Bâton de Breeze', 'Breezes (chambres d\'épreuve)', 'Sert aussi aux charges de vent et à la masse'],
  ['Poudre lumineuse', 'Pierre lumineuse du Nether, ou sorcières', 'Une ferme à sorcières en hutte de marais en produit sans limite'],
  ['Souffle de dragon', 'Nuage de l\'Ender Dragon, en fiole vide', 'Le dragon est réinvocable avec 4 cristaux de l\'End']
];
