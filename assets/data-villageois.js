/* ============================================================
   Données : villageois — métiers, commerce, mécaniques
   Les prix varient d'un villageois à l'autre : les valeurs
   indiquées sont les fourchettes usuelles.
   ============================================================ */

var METIERS = [
  {
    nom: 'Bibliothécaire', cat: 'essentiel',
    tags: [{ txt: 'Lutrin', cls: 'gold' }, { txt: 'Le plus rentable', cls: 'ok' }],
    ou: 'Bloc de métier : le lutrin (4 dalles de bois + 1 bibliothèque).',
    drops: [
      'ACHÈTE : papier (24 → 1 émeraude), livres, encre',
      'VEND : livres enchantés — n\'importe lequel, y compris Raccommodage, Efficacité V, Fortune III, Toucher de soie',
      'VEND aussi : bibliothèque dès le niveau novice (9 émeraudes), lanternes, verre, horloge, BOUSSOLE, et des bougies au niveau maître',
      'Il ne vend NI plume NI étiquette : l\'étiquette est passée au marchand ambulant',
      'C\'est le SEUL villageois à vendre une boussole — indispensable pour les cartes de l\'explorateur'
    ],
    note: 'LE métier à installer en priorité. Une ferme à canne à sucre lui fournit du papier à l\'infini, et il vous rend des livres enchantés impossibles à obtenir autrement.'
  },
  {
    nom: 'Fermier', cat: 'essentiel',
    tags: [{ txt: 'Composteur', cls: 'ok' }],
    ou: 'Bloc de métier : le composteur (7 dalles de bois).',
    drops: [
      'ACHÈTE : blé (20 → 1 émeraude), pommes de terre, carottes, betteraves, citrouilles, melons',
      'VEND : pain, tartes à la citrouille, cookies, gâteaux, pommes dorées, carottes dorées, potions suspectes',
      'Il sème et récolte tout seul si vous l\'enfermez au-dessus d\'une parcelle'
    ],
    note: 'C\'est lui qui transforme une ferme à blé automatique en machine à émeraudes. Il nourrit aussi les autres villageois, ce qui permet la reproduction.'
  },
  {
    nom: 'Armurier', cat: 'essentiel',
    tags: [{ txt: 'Haut fourneau', cls: 'cyan' }],
    ou: 'Bloc de métier : le haut fourneau (5 fer + 1 four + 3 pierres lisses).',
    drops: [
      'ACHÈTE : charbon, fer, lave en seau, diamants',
      'VEND : armures en fer, en chaîne, puis en DIAMANT — souvent enchantées',
      'Niveau expert : bottes (8 émeraudes) puis jambières (14) en diamant',
      'Niveau maître : le plastron en diamant (16 émeraudes) — c\'est le dernier palier, pas l\'expert'
    ],
    note: 'Acheter une armure en diamant enchantée coûte quelques piles d\'émeraudes : c\'est infiniment plus rapide que de miner, enchanter et espérer.'
  },
  {
    nom: 'Forgeron d\'outils', cat: 'essentiel',
    tags: [{ txt: 'Table de forge', cls: 'cyan' }],
    ou: 'Bloc de métier : la table de forge (2 fer + 4 planches).',
    drops: [
      'ACHÈTE : charbon, fer, diamants',
      'VEND : pioche, hache, pelle en fer puis en diamant, souvent enchantées',
      'La CLOCHE (36 émeraudes) arrive dès le niveau apprenti, et elle est commune aux trois forgerons'
    ],
    note: 'Une pioche en diamant Efficacité IV + Solidité III achetée d\'un coup fait gagner des heures d\'enchantement aléatoire.'
  },
  {
    nom: 'Forgeron d\'armes', cat: 'essentiel',
    tags: [{ txt: 'Meule', cls: 'cyan' }],
    ou: 'Bloc de métier : la meule (2 bâtons + 1 dalle de pierre + 2 planches).',
    drops: [
      'ACHÈTE : charbon, fer, diamants',
      'VEND : épée et hache en fer puis en diamant, souvent enchantées, et des cloches'
    ],
    note: 'Une épée en diamant enchantée achetée en début de partie change complètement la façon d\'aborder les donjons.'
  },
  {
    nom: 'Clerc (prêtre)', cat: 'utile',
    tags: [{ txt: 'Alambic', cls: 'purple' }],
    ou: 'Bloc de métier : l\'alambic (1 bâton de Blaze + 3 pierres).',
    drops: [
      'ACHÈTE : chair putréfiée (32 → 1 émeraude !), or',
      'VEND : redstone, LAPIS, PERLES DE L\'ENDER (≈5 émeraudes l\'unité), poudre lumineuse, bouteille d\'expérience'
    ],
    note: 'Il achète la chair putréfiée : une ferme à zombies devient directement une source d\'émeraudes. Et il vend des perles de l\'Ender, ce qui évite la chasse aux endermen.'
  },
  {
    nom: 'Cartographe', cat: 'utile',
    tags: [{ txt: 'Table de cartographie', cls: 'gold' }],
    ou: 'Bloc de métier : la table de cartographie (2 papiers + 4 planches).',
    drops: [
      'ACHÈTE : papier, boussole, verre',
      'VEND : cartes de l\'explorateur des BOIS (manoir) et de l\'OCÉAN (monument), bannières, cadres'
    ],
    note: 'La carte du manoir des bois est presque indispensable : un manoir peut être à plusieurs milliers de blocs et rien ne permet de le trouver autrement.'
  },
  {
    nom: 'Fléchier', cat: 'utile',
    tags: [{ txt: 'Établi à flèches', cls: '' }],
    ou: 'Bloc de métier : l\'établi à flèches / fletching table (2 silex + 4 planches).',
    drops: [
      'ACHÈTE : bâtons (32 → 1 émeraude), silex, ficelle, plumes',
      'VEND : flèches, arcs, arbalètes enchantés, flèches à effet'
    ],
    note: 'Il achète des bâtons : 2 bambous = 1 bâton, et une ferme à bambou est trivialement automatisable. C\'est l\'émeraude la moins chère du jeu.'
  },
  {
    nom: 'Berger', cat: 'utile',
    tags: [{ txt: 'Métier à tisser', cls: '' }],
    ou: 'Bloc de métier : le métier à tisser (2 ficelles + 2 planches).',
    drops: [
      'ACHÈTE : laine (18 → 1 émeraude), colorants',
      'VEND : laine teinte, tapis, tableaux, lits, cisailles'
    ],
    note: 'Une ferme à moutons automatique alimente ce commerce sans effort. Il est aussi la seule source pratique de tableaux en quantité.'
  },
  {
    nom: 'Boucher', cat: 'utile',
    tags: [{ txt: 'Fumoir', cls: '' }],
    ou: 'Bloc de métier : le fumoir (4 bûches + 1 four).',
    drops: [
      'ACHÈTE : viandes crues, carottes, pommes de terre, betteraves, lapin, poulet',
      'VEND : viandes cuites, ragoût de lapin, lapin cuit'
    ],
    note: 'Le débouché naturel d\'une ferme à poulets ou à vaches : la viande en surplus devient des émeraudes.'
  },
  {
    nom: 'Pêcheur', cat: 'utile',
    tags: [{ txt: 'Tonneau', cls: 'blue' }],
    ou: 'Bloc de métier : le tonneau (6 planches + 2 dalles).',
    drops: [
      'ACHÈTE : ficelle, charbon, poisson cru',
      'VEND : poisson cuit, cannes à pêche enchantées, seaux de poisson, boussole'
    ],
    note: 'Sa canne à pêche enchantée (souvent Chance de la mer) revient bien moins cher que d\'enchanter la vôtre au hasard.'
  },
  {
    nom: 'Tanneur', cat: 'utile',
    tags: [{ txt: 'Chaudron', cls: '' }],
    ou: 'Bloc de métier : le chaudron (7 lingots de fer).',
    drops: [
      'ACHÈTE : cuir, peaux de lapin, écailles de tortue',
      'VEND : armures de cuir teintes, selles, armures de cheval en fer / or / diamant'
    ],
    note: 'La SELLE ne se fabrique pas : le tanneur est l\'un des rares moyens fiables d\'en obtenir, avec la pêche et les coffres.'
  },
  {
    nom: 'Maçon', cat: 'utile',
    tags: [{ txt: 'Tailleur de pierre', cls: '' }],
    ou: 'Bloc de métier : le tailleur de pierre (1 fer + 3 pierres).',
    drops: [
      'ACHÈTE : argile, pierre, granit, diorite, andésite, quartz',
      'VEND : terre cuite de toutes les couleurs, briques, quartz, blocs taillés et polis'
    ],
    note: 'Le meilleur ami des constructeurs : il vend de la terre cuite colorée et des blocs décoratifs par piles, contre de la pierre que vous minez de toute façon.'
  },
  {
    nom: 'Villageois sans métier / Idiot (nitwit)', cat: 'special',
    tags: [{ txt: 'Aucun commerce', cls: 'red' }],
    ou: 'Le villageois sans métier prend un métier si vous lui donnez un bloc. L\'idiot (tenue verte) n\'en prendra JAMAIS.',
    drops: [
      'Sans métier : donnez-lui un bloc de métier libre, il se convertit',
      'Idiot : reconnaissable à sa tunique verte — inutile pour le commerce, mais il compte pour la reproduction'
    ],
    note: 'Vérifiez toujours la couleur avant de transporter un villageois sur 500 blocs : un idiot ne prendra jamais de métier, quoi que vous fassiez.'
  }
];

/* Mécaniques du commerce */
var MECANIQUES = [
  ['Les 5 niveaux', 'Novice → Apprenti → Compagnon → Expert → Maître',
   'Chaque niveau débloque de nouvelles offres. Commercez pour le faire monter ; la barre sous son nom indique sa progression.'],
  ['Le « reroll » d\'offres', 'Cassez et reposez son bloc de métier',
   'Tant qu\'il est encore NOVICE et qu\'il n\'a jamais commercé, ses offres sont retirées au hasard à chaque repose. C\'est ainsi qu\'on obtient Raccommodage à bas prix.'],
  ['Le seuil à ne pas franchir', 'Un seul échange verrouille le métier définitivement',
   'Dès qu\'il a commercé une fois, casser le bloc ne change plus rien. Choisissez l\'offre AVANT de commercer.'],
  ['Réapprovisionnement', 'Deux fois par jour de jeu',
   'Il doit pouvoir ATTEINDRE son bloc de métier pour recharger ses offres. Un villageois muré loin de son lutrin reste bloqué à zéro stock.'],
  ['Inflation par la demande', 'Acheter beaucoup d\'un même objet en fait monter le prix',
   'Le prix redescend au réapprovisionnement suivant. Alternez entre plusieurs villageois pour lisser les coûts.'],
  ['Remise du héros du village', 'Gagnez un raid : effet « Héros du village »',
   'Réduction massive sur tous les prix pendant 40 minutes. C\'est le moment d\'acheter l\'armure en diamant.'],
  ['Remise permanente par soin', 'Zombifier puis soigner un villageois',
   'Ses prix chutent définitivement, souvent à 1 émeraude. C\'est la meilleure optimisation du jeu — voir la procédure ci-dessous.'],
  ['Reproduction', '3 pains, 12 carottes, 12 betteraves ou 12 pommes de terre',
   'Il faut aussi un lit libre accessible par chemin. Deux villageois nourris et disposant de lits font un bébé toutes les ~5 minutes.'],
  ['La variante de biome compte', 'Un villageois du désert n\'a pas les mêmes offres qu\'un villageois de taïga',
   'Certaines offres (cartes de village, bannières, barques) dépendent désormais du biome d\'origine du villageois. Pour une offre précise, il faut parfois aller chercher le bon village.']
];

/* Procédure de soin */
var SOIN = [
  'Passez la difficulté en DIFFICILE : c\'est le seul réglage où un zombie convertit à 100 % au lieu de tuer.',
  'Isolez le villageois dans une cellule sûre, et un zombie dans une cellule adjacente séparée par des barreaux ou une porte.',
  'Laissez le zombie l\'attaquer : le villageois devient un villageois zombifié (il conserve son métier et ses offres).',
  'Éloignez ou tuez le zombie immédiatement.',
  'Lancez une potion de FAIBLESSE jetable sur le villageois zombifié (eau + œil d\'araignée fermenté + poudre à canon).',
  'Donnez-lui une POMME DORÉE (clic droit) : il se met à trembler et émet des particules rouges.',
  'Attendez 2 à 5 minutes : il redevient villageois, avec des prix effondrés — souvent 1 émeraude par échange.',
  'Répétez pour chaque villageois de votre hall de commerce : l\'effet est cumulatif avec la remise du héros du village.'
];

/* Les meilleurs échanges, classés */
var TOP_ECHANGES = [
  ['Papier → émeraude', 'Bibliothécaire', '24 papiers = 1 émeraude', 'Une ferme à canne à sucre automatique rend ce revenu totalement passif'],
  ['Bâtons → émeraude', 'Fléchier', '32 bâtons = 1 émeraude', 'Ferme à bambou : le revenu le moins cher à mettre en place'],
  ['Blé → émeraude', 'Fermier', '20 blés = 1 émeraude', 'Ferme à blé automatique avec villageois fermier : zéro intervention'],
  ['Chair putréfiée → émeraude', 'Clerc', '32 chairs = 1 émeraude', 'Débouché idéal pour une ferme à zombies, sinon la chair ne sert à rien'],
  ['Émeraudes → livre enchanté', 'Bibliothécaire', '5 à 64 émeraudes', 'Raccommodage, Efficacité V, Fortune III — introuvables autrement de façon fiable'],
  ['Émeraudes → armure en diamant', 'Armurier', '12 à 19 émeraudes', 'Souvent déjà enchantée ; imbattable en rapport temps/qualité'],
  ['Émeraudes → carte du manoir', 'Cartographe', '≈ 14 émeraudes + boussole', 'Le seul moyen fiable de localiser un manoir des bois'],
  ['Émeraudes → selle', 'Tanneur', '6 à 8 émeraudes', 'La selle ne se fabrique pas : c\'est la source la plus sûre'],
  ['Émeraudes → perles de l\'Ender', 'Clerc', '≈ 5 émeraudes l\'unité', 'Évite complètement la chasse aux endermen avant le portail de l\'End']
];
