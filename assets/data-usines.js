/* ============================================================
   Données : usines & fermes automatiques
   Chaque usine : principe, schéma (vue de dessus ou de côté),
   matériaux, montage pas à pas, rendement.
   ============================================================ */

/* Ordre et libellés des groupes du sommaire */
var GROUPES_USINES = {
  culture:    'Cultures',
  animal:     'Élevage',
  mob:        'Mobs, XP & combat',
  ressource:  'Ressources & matériaux',
  logistique: 'Logistique & transport'
};

var USINES = [

  /* ================= NIVEAU 1 — PREMIÈRES AUTOMATISATIONS ================= */
  {
    id: 'four-auto', nom: 'Fonderie automatique (super smelter)', cat: 'ressource',
    taille: 'Module de 1 four', diff: 'Débutant',
    desc: 'Un four alimenté par trois entonnoirs : un pour le minerai, un pour le charbon, un pour la sortie. Vous déposez 3 piles de fer brut et vous revenez plus tard. À multiplier par 8 ou 16 fours pour une vraie fonderie.',
    mats: ['Par four : 1 fourneau, 3 entonnoirs (15 lingots de fer), 2 coffres', 'Fonderie 8 fours : 8 fourneaux, 24 entonnoirs (120 fer), 3 grands coffres', 'Carburant : bloc de charbon, ou bambou/kelp séché produit en ferme'],
    couches: [
      { t: 'Vue de côté · un module', g: ['.E.', '.H.', 'EHU', '.H.', '.E.'] },
      { t: 'Vue de dessus · batterie de 4 fours', g: ['EEEE', 'HHHH', 'UUUU', 'HHHH', 'EEEE'] }
    ],
    etapes: [
      'Placez le fourneau. Un entonnoir au-dessus, orienté vers le bas, alimente l\'emplacement du minerai.',
      'Un entonnoir sur le côté, orienté vers le fourneau, alimente l\'emplacement du carburant.',
      'Un entonnoir SOUS le fourneau récupère le produit fini et le pousse vers un coffre.',
      'Coffre d\'entrée sur l\'entonnoir du haut, coffre de carburant sur l\'entonnoir latéral, coffre de sortie sous l\'entonnoir du bas.',
      'Répliquez le module côte à côte : les entonnoirs des différents fours peuvent partager un même coffre d\'entrée en chaînant les entonnoirs.',
      'Carburant recommandé : du bambou séché ou du kelp séché, produits automatiquement — vous n\'aurez plus jamais à miner du charbon.'
    ],
    rendement: '1 objet fondu toutes les 10 s par four. Une batterie de 8 fours vide une pile de 64 minerais en ≈80 secondes.',
    notes: [
      { type: 'tip', txt: 'Bloc de kelp séché — 1 bloc cuit 20 objets, et une ferme à kelp automatique en produit sans limite. C\'est le carburant le plus économique du jeu à long terme.' }
    ]
  },
  {
    id: 'canne', nom: 'Ferme à canne à sucre (observateur + piston)', cat: 'culture',
    taille: 'Extensible par ligne', diff: 'Débutant',
    desc: 'La ferme entièrement automatique la plus simple du jeu. La canne pousse jusqu\'au 3ᵉ bloc, un observateur détecte la pousse et un piston la casse. Papier illimité pour les livres et les fusées.',
    mats: ['Par bloc de canne : 1 observateur, 1 piston, 1 bloc plein', '1 ligne d\'entonnoirs ou un canal d\'eau + entonnoir en bout', 'Sable ou terre au bord d\'un canal d\'eau', 'Coffre de collecte'],
    couches: [
      { t: 'Vue de côté · un module', g: ['..P Q', '..u..', '..u..', '.Auw.', '.HHH.', '.E...'] },
      { t: 'Vue de dessus · ligne de 6', g: ['QQQQQQ', 'PPPPPP', 'uuuuuu', 'AAAAAA', 'wwwwww'] }
    ],
    etapes: [
      'Creusez un canal d\'eau d\'un bloc de large ; à côté, alignez des blocs de sable au même niveau.',
      'Plantez la canne à sucre sur le sable (elle exige de l\'eau adjacente).',
      'À 2 blocs de hauteur au-dessus du sable, placez un observateur qui REGARDE la position du 3ᵉ segment de canne.',
      'Derrière l\'observateur, un piston orienté vers la canne : quand l\'observateur détecte la pousse, il alimente le piston qui casse la tige.',
      'Sous la ligne, un canal d\'eau pousse les objets vers un entonnoir relié à un coffre.',
      'Répliquez horizontalement autant que vous voulez : chaque module est indépendant, la ferme ne se dérègle jamais.'
    ],
    rendement: '≈15 à 20 cannes par heure et par module en chunk chargé. 8 modules = de quoi ne plus jamais manquer de papier.',
    notes: [
      { type: 'info', txt: 'Papier → fusées — 1 papier + 1 poudre à canon = 3 fusées. Combinée à une ferme à creepers, cette ferme vous donne le carburant illimité pour voler à l\'élytre.' }
    ]
  },
  {
    id: 'bambou', nom: 'Ferme à bambou / kelp (carburant illimité)', cat: 'culture',
    taille: 'Colonne de 1 × 1', diff: 'Débutant',
    desc: 'Même principe que la canne à sucre, mais le bambou pousse jusqu\'à 16 blocs de haut et très vite. Combiné à un fabricateur, il produit des blocs de bambou séché : le carburant de vos fours.',
    mats: ['1 observateur, 1 piston, 1 bloc plein par colonne', '1 pousse de bambou (jungle ou coffre d\'épave)', 'Entonnoirs + coffre', 'Optionnel : 1 fabricateur (crafter) pour les blocs de bambou'],
    couches: [
      { t: 'Vue de côté', g: ['.z.', '.z.', 'Qz.', 'Pz.', '.z.', 'tHE'] }
    ],
    etapes: [
      'Plantez le bambou sur de la terre, du sable ou du gravier ; il n\'a pas besoin d\'eau.',
      'Placez l\'observateur face à la colonne, à la hauteur où vous voulez couper (généralement 3 à 4 blocs).',
      'Piston derrière l\'observateur, orienté vers la tige : il casse tout ce qui est au-dessus.',
      'Entonnoirs au sol pour récupérer, coffre relié.',
      'Pour les blocs de bambou : envoyez la récolte dans un fabricateur configuré sur la recette du bloc de bambou, puis vers vos fours.',
      'Les colonnes se collent les unes aux autres : une rangée de 10 tient dans 12 blocs de large.'
    ],
    rendement: 'Le bambou est la plante la plus rapide du jeu. Une rangée de 10 colonnes remplit un grand coffre en une heure.',
    notes: [
      { type: 'tip', txt: 'Bambou vs charbon — 1 bloc de bambou séché cuit 5 objets ; c\'est moins que le charbon, mais c\'est infini et sans minage. Pour une fonderie, préférez le kelp séché (20 objets par bloc).' }
    ]
  },
  {
    id: 'poulet', nom: 'Ferme à poulets auto-cuiseur', cat: 'animal',
    taille: '5 × 5 × 6', diff: 'Débutant',
    desc: 'Les poulets pondent, les œufs sont ramassés par un entonnoir et relancés par un distributeur : les poussins éclosent, grandissent, et la lave au-dessus les cuit à l\'instant où ils deviennent adultes. Poulet rôti + plumes en continu.',
    mats: ['2 distributeurs, ≈8 entonnoirs, 2 coffres', '1 seau de lave + 1 bloc de verre/dalle', '1 horloge de redstone (2 répéteurs en boucle, ou comparateur + entonnoir)', '≈20 blocs pleins pour la chambre', '2 poulets de départ'],
    couches: [
      { t: 'Vue de côté', g: ['.ccc.', '.clc.', '.c.c.', 'RcYc.', '.cHc.', '.cEc.'] },
      { t: 'Vue de dessus · chambre à poulets', g: ['ccccc', 'cHHHc', 'cHHHc', 'cHHHc', 'ccccc'] }
    ],
    etapes: [
      'Construisez une chambre fermée de 3 × 3 avec un plancher entièrement en entonnoirs, reliés à un coffre.',
      'Au-dessus de la chambre, à 2 blocs, posez un bloc de lave retenu par une dalle inférieure ou un bloc de verre : les poussins (petits) passent dessous sans brûler, les adultes brûlent.',
      'Mettez 2 poulets adultes dans la chambre. Ils pondront des œufs qui tomberont dans les entonnoirs.',
      'Les entonnoirs envoient les œufs vers un distributeur pointé dans la chambre.',
      'Branchez une horloge de redstone lente sur le distributeur : il relance les œufs, dont 1 sur 8 fait éclore un poussin.',
      'Le poulet rôti et les plumes tombent dans les entonnoirs du plancher et finissent dans le coffre.'
    ],
    rendement: '≈100 poulets rôtis et 60 plumes par heure. La première ferme à monter : elle règle définitivement le problème de la nourriture.',
    notes: [
      { type: 'warn', txt: 'Limite de population — ne dépassez jamais 20 poulets adultes dans la chambre, sinon les entités surchargent le serveur et la cadence chute.' },
      { type: 'tip', txt: 'Variante sans lave — remplacez la lave par un plancher de dalles et une épée à Butin : vous récoltez à la main mais vous gardez les œufs pour les gâteaux.' }
    ]
  },
  {
    id: 'ble-auto', nom: 'Ferme à blé automatique (villageois fermier)', cat: 'culture',
    taille: '9 × 9 × 4', diff: 'Intermédiaire',
    desc: 'Un villageois fermier enfermé au-dessus de la parcelle sème, récolte et lance les surplus. Un entonnoir capte tout ce qu\'il laisse tomber. Zéro intervention.',
    mats: ['1 villageois sans métier + 1 composteur', '81 blocs de terre labourée + 1 seau d\'eau', '≈12 entonnoirs, 1 grand coffre', '≈40 blocs pleins et vitres pour la cage', 'Graines de départ'],
    couches: [
      { t: 'Y+0 · collecte', g: ['bbbbbbbbb', 'bHHHHHHHb', 'bHHHHHHHb', 'bHHHHHHHb', 'bHHHHHHHb', 'bHHHHHHHb', 'bHHHHHHHb', 'bHHHHHHHb', 'bbbbbEbbb'] },
      { t: 'Y+1 · parcelle', g: ['bbbbbbbbb', 'bfffffffb', 'bfffffffb', 'bfffffffb', 'bfffwfffb', 'bfffffffb', 'bfffffffb', 'bfffffffb', 'bbbbbbbbb'] },
      { t: 'Y+2 · cage du villageois', g: ['bbbbbbbbb', 'b.......b', 'b.......b', 'b.......b', 'b...x...b', 'b.......b', 'b.......b', 'b.......b', 'bbbbbbbbb'] }
    ],
    etapes: [
      'Construisez la parcelle 9 × 9 hydratée normalement, mais posez-la sur une couche complète d\'entonnoirs reliés à un coffre.',
      'Amenez un villageois sans métier au centre (bateau, rails ou couloir de portes) et enfermez-le.',
      'Donnez-lui un composteur : il devient fermier. Donnez-lui ensuite une pile de graines dans son inventaire.',
      'Le fermier sème automatiquement les cases vides et récolte les cultures mûres à sa portée.',
      'Quand son inventaire est plein, il jette le surplus : les entonnoirs le récupèrent.',
      'Fermez le toit et éclairez : sans lumière, les cultures ne poussent pas et des mobs apparaissent dans la cage.'
    ],
    rendement: '≈1 500 blés/heure avec un seul fermier bien nourri, sans jamais rien faire. Avec 2 villageois, la cadence double.',
    notes: [
      { type: 'info', txt: 'Le fermier partage — il donne du pain aux autres villageois. Placez-en un à côté de votre hall de commerce : il nourrira toute la colonie et permettra la reproduction.' }
    ]
  },
  {
    id: 'melon', nom: 'Ferme à melons / citrouilles', cat: 'culture',
    taille: 'Ligne extensible', diff: 'Débutant',
    desc: 'La tige pousse et fait apparaître un melon ou une citrouille sur une case adjacente. Un observateur détecte l\'apparition, un piston le casse.',
    mats: ['Par module : 1 observateur, 1 piston, 1 bloc plein', 'Terre labourée + eau', 'Canal d\'eau ou entonnoirs + coffre', 'Graines de melon (mines abandonnées) ou de citrouille'],
    couches: [
      { t: 'Vue de côté', g: ['.QP.', 'fh..', 'wHE.'] },
      { t: 'Vue de dessus · ligne', g: ['ffffff', 'wwwwww', 'QQQQQQ', 'PPPPPP', 'HHHHHH'] }
    ],
    etapes: [
      'Alternez : une case de terre labourée avec la tige, une case de terre nue où poussera le fruit.',
      'Placez l\'observateur sous ou derrière la case du fruit, orienté vers elle.',
      'Le piston, alimenté par l\'observateur, casse le melon dès son apparition.',
      'Canal d\'eau ou entonnoirs sous la ligne pour la collecte.',
      'Rangez le tout en double ligne dos à dos pour diviser l\'encombrement par deux.'
    ],
    rendement: '≈250 tranches de melon/heure pour 8 modules. Le melon scintillant (potions de soin) et les blocs de citrouille en découlent.',
    notes: [
      { type: 'tip', txt: 'Citrouilles sculptées — une ferme à citrouilles + un distributeur avec cisaille produit des citrouilles sculptées automatiquement : de quoi fabriquer des golems de fer et de neige à la chaîne.' }
    ]
  },

  /* ================= NIVEAU 2 — MOBS & COMBAT ================= */
  {
    id: 'fer', nom: 'Ferme à fer (golems de village)', cat: 'mob',
    taille: '≈12 × 12 × 15', diff: 'Intermédiaire',
    desc: 'Trois villageois effrayés par un zombie appellent un golem de fer, qui apparaît dans une zone de spawn contrôlée puis tombe dans un broyeur. Le fer devient une ressource illimitée.',
    mats: ['3 villageois + 3 lits + 1 zombie (dans un bateau ou derrière des vitres)', '≈10 entonnoirs, 2 grands coffres', 'Eau (canaux de convoyage)', 'Lave ou chute de 24 blocs pour la mise à mort', '≈200 blocs pleins'],
    couches: [
      { t: 'Étage 1 · cellule des villageois (vue de dessus)', g: ['bbbbbbb', 'b<.<.<b', 'b.....b', 'b..x..b', 'b.....b', 'b..@..b', 'bbbbbbb'] },
      { t: 'Étage 2 · plateforme de spawn', g: ['bbbbbbb', 'b.....b', 'b.www.b', 'b.www.b', 'b.www.b', 'b..H..b', 'bbbbbbb'] },
      { t: 'Étage 3 · broyeur & collecte (vue de côté)', g: ['..w..', '..w..', '..I..', '..l..', '.HHH.', '..E..'] }
    ],
    etapes: [
      'Enfermez 3 villageois dans une cellule avec 3 lits : ils doivent pouvoir voir leur lit et dormir, sinon aucun golem n\'apparaît.',
      'Placez un zombie à portée de vue mais inaccessible (dans un bateau derrière des vitres) : les villageois paniquent en permanence, ce qui déclenche l\'invocation.',
      'La plateforme de spawn doit être la SEULE surface valide dans un rayon de 16 blocs autour du village : bouchez, éclairez ou remplacez tout le reste.',
      'Un courant d\'eau sur la plateforme pousse les golems vers un trou central.',
      'Broyeur : une chute de 24 blocs les amène à 1 cœur, puis une lame de lave ou un coup d\'épée les achève. Tuer soi-même donne l\'XP.',
      'Entonnoirs sous la zone de chute, reliés à un grand coffre.',
      'Vérifiez la position du village : la ferme doit être construite loin de tout village naturel, sinon les golems apparaissent ailleurs.'
    ],
    rendement: '≈300 lingots de fer par heure pour une ferme à 1 module, jusqu\'à 1 000+ avec plusieurs cellules superposées.',
    notes: [
      { type: 'warn', txt: 'La règle qui casse tout — les golems apparaissent dans un rayon de 16 blocs autour du centre du village, sur n\'importe quelle surface valide. Si votre plateforme n\'est pas la seule option, les golems se perdront dans le décor.' },
      { type: 'tip', txt: 'Bonus — les coquelicots récoltés en même temps donnent du colorant rouge à volonté.' }
    ]
  },
  {
    id: 'mob-spawner', nom: 'Ferme à XP sur générateur de donjon', cat: 'mob',
    taille: '9 × 9 × 12', diff: 'Intermédiaire',
    desc: 'La première ferme à mobs de toute partie : on récupère un générateur de zombies ou de squelettes trouvé en donjon et on canalise ses mobs vers un point de mise à mort à hauteur de joueur.',
    mats: ['1 générateur de donjon (ne PAS le casser)', '2 seaux d\'eau', '≈15 entonnoirs, 1 grand coffre', '≈150 blocs pleins', '1 panneau ou 1 trappe pour bloquer l\'eau'],
    couches: [
      { t: 'Y+0 · salle de spawn (générateur au centre)', g: ['bbbbbbbbb', 'b~~~~~~~b', 'b~.....~b', 'b~..@..~b', 'b~.....~b', 'b~~~~~~~b', 'bbbb.bbbb', 'bbbbbbbbb', 'bbbbbbbbb'] },
      { t: 'Vue de côté · colonne de chute & mise à mort', g: ['b@b', 'b~b', 'b.b', 'b.b', 'b.b', 'b.b', 'b.b', 'bxb', 'bHb', 'bEb'] }
    ],
    etapes: [
      'Creusez la salle du donjon jusqu\'à 4 blocs autour du générateur dans toutes les directions — c\'est son rayon d\'apparition.',
      'Éclairez tout le reste du donjon pour concentrer les apparitions sur le générateur.',
      'Versez de l\'eau dans les coins de la salle : les courants poussent les mobs vers un trou central.',
      'Colonne de chute de 22 blocs : les zombies et les squelettes tombent à 1 point de vie, mais ne meurent pas — c\'est vous qui portez le coup fatal pour avoir l\'XP.',
      'En bas de la chute, une ouverture d\'un demi-bloc (dalle) laisse dépasser les pieds : frappez-les à l\'épée sans être touché.',
      'Entonnoirs au sol pour récupérer os, flèches, chair et équipements.'
    ],
    rendement: '≈30 niveaux d\'XP en 5 minutes. Une ferme à squelettes fournit aussi des os (poudre d\'os) et des flèches par milliers.',
    notes: [
      { type: 'tip', txt: 'Torches temporaires — posez des torches SUR le générateur pendant les travaux : il ne produit rien tant qu\'il y a de la lumière, vous travaillez tranquillement.' },
      { type: 'danger', txt: 'Ne cassez jamais le générateur. Il ne se récupère pas en survie et ne réapparaît jamais.' }
    ]
  },
  {
    id: 'mobfarm', nom: 'Tour à mobs générale (dark room)', cat: 'mob',
    taille: '20 × 20 × 30 (à hauteur du ciel)', diff: 'Avancé',
    desc: 'Des plateformes obscures suspendues au-dessus de l\'océan ou du vide : tous les monstres du Surworld y apparaissent, sont convoyés par l\'eau puis tués par la chute. Poudre à canon, os, flèches, chair, XP.',
    mats: ['≈2 000 blocs pleins (pierre, terre, n\'importe quoi)', '≈20 seaux d\'eau', '≈20 entonnoirs, 2 grands coffres', '≈30 dalles ou trappes (anti-apparition)', 'Beaucoup d\'échafaudages'],
    couches: [
      { t: 'Une plateforme (vue de dessus)', g: ['bbbbbbbbbbbbb', 'b~~~~~.~~~~~b', 'b...........b', 'b...........b', 'b...........b', 'b~~~~~.~~~~~b', 'bbbbbb.bbbbbb', 'bbbbbbbbbbbbb'] },
      { t: 'Vue de côté · empilement', g: ['bbbbb', 'b~~~b', 'bbbbb', 'b...b', 'bbbbb', 'b~~~b', 'bbbbb', 'b...b', '..|..', '..|..', '..|..', '..x..', '.HHH.', '..E..'] }
    ],
    etapes: [
      'Choisissez l\'emplacement : au-dessus d\'un océan à Y ≈ 130, ou dans le vide de l\'End. Rien d\'autre ne doit pouvoir engendrer de mobs dans un rayon de 128 blocs.',
      'Construisez 4 à 8 plateformes de 20 × 20 espacées de 3 blocs de hauteur, complètement dans le noir.',
      'Sur chaque plateforme, des canaux d\'eau depuis les bords poussent les mobs vers un trou central.',
      'Reliez tous les trous à une colonne de chute unique de 24 blocs minimum.',
      'En bas : plateforme de mise à mort avec entonnoirs. Un mob tombé de 24 blocs a 1 point de vie ; un coup d\'épée = 100 % de l\'XP + le bonus de Butin.',
      'Couvrez toutes les surfaces alentour de dalles inférieures : aucun mob ne doit apparaître ailleurs que sur vos plateformes.',
      'Éclairez votre poste d\'attente : vous devez rester dans un rayon de 24 à 128 blocs pour que les apparitions continuent.'
    ],
    rendement: '≈1 500 objets/heure et un flux d\'XP continu. La source principale de poudre à canon pour les fusées d\'élytre.',
    notes: [
      { type: 'warn', txt: 'Règle des 24 blocs — aucun mob n\'apparaît à moins de 24 blocs du joueur, et les mobs disparaissent au-delà de 128. Votre poste d\'attente doit être exactement dans cette fenêtre.' },
      { type: 'info', txt: 'Sur un serveur, la limite de mobs est partagée entre joueurs : éteignez les autres sources d\'apparition (grottes non éclairées) pour que votre ferme tourne à plein régime.' }
    ]
  },
  {
    id: 'creeper', nom: 'Ferme à creepers (poudre à canon)', cat: 'mob',
    taille: '20 × 20 × 8', diff: 'Avancé',
    desc: 'Une tour à mobs dont le plafond est bas de 2 blocs seulement : seuls les creepers et les araignées passent. Avec des chats à proximité, on élimine aussi les araignées. Poudre à canon en flux continu = fusées à l\'infini.',
    mats: ['≈1 200 blocs pleins', 'Plafond à exactement 2 blocs de hauteur au-dessus des plateformes', '1 à 4 chats apprivoisés (éloignent les creepers, ce qui les pousse vers les canaux)', 'Entonnoirs + coffres', 'Chute de 24 blocs'],
    couches: [
      { t: 'Plateforme · plafond bas (vue de côté)', g: ['bbbbbbb', 'b.....b', 'b~...~b', 'bbb.bbb'] },
      { t: 'Zone de mise à mort', g: ['..|..', '..|..', '..x..', '.HHH.', '..E..'] }
    ],
    etapes: [
      'Construisez des plateformes obscures comme pour une tour à mobs, mais avec un plafond à seulement 2 blocs de hauteur.',
      'Cette hauteur exclut les zombies et squelettes (2 blocs sont acceptables pour eux — utilisez plutôt des dalles au sol pour les bloquer) : la vraie sélection se fait par les chats.',
      'Placez des chats apprivoisés autour de la zone de collecte : les creepers les fuient et se laissent emporter par les courants.',
      'Colonne de chute de 24 blocs pour tuer les creepers sans explosion : ils meurent avant d\'avoir le temps d\'amorcer.',
      'Entonnoirs + coffre en bas. Ne tuez JAMAIS les creepers à l\'épée dans une zone construite.',
      'Optionnel : une plaque de pression + un système de collecte à distance vous évite d\'approcher.'
    ],
    rendement: '≈120 poudres à canon/heure, soit ≈360 fusées : de quoi voler des heures à l\'élytre.',
    notes: [
      { type: 'tip', txt: 'Disques de musique — placez un squelette (dans un bateau, avec un arc) au bord de la ferme : les creepers tués par ses flèches lâchent des disques de musique.' },
      { type: 'danger', txt: 'Un creeper qui explose détruit la ferme. Vérifiez que la chute fait bien 24 blocs et que rien ne les ralentit en route.' }
    ]
  },
  {
    id: 'or', nom: 'Ferme à or (zombies-piglins, Nether)', cat: 'mob',
    taille: '≈30 × 30 dans le Nether', diff: 'Avancé',
    desc: 'Dans une vallée de sable des âmes ou sur une plateforme au-dessus du vide du Nether, les zombies-piglins apparaissent en masse. Convoyés et tués, ils fournissent or, pépites, épées en or et une XP énorme.',
    mats: ['≈1 500 blocs (préférez des blocs résistants aux ghasts : briques du Nether, pierre)', 'Trappes ou dalles pour bloquer les apparitions ailleurs', 'Entonnoirs + coffres', 'Chute de 24 blocs ou un broyeur à magma', 'Potion de Résistance au feu pour la construction'],
    couches: [
      { t: 'Plateforme de spawn (vue de dessus)', g: ['rrrrrrrrr', 'r~~~~~~~r', 'r~.....~r', 'r~..H..~r', 'r~.....~r', 'r~~~~~~~r', 'rrrrrrrrr'] },
      { t: 'Vue de côté', g: ['rrrrr', 'r~~~r', 'r...r', '..|..', '..|..', '..x..', '.HHH.', '..E..'] }
    ],
    etapes: [
      'Choisissez une zone du Nether au-dessus du vide (sous la bedrock) ou une grande vallée de sable des âmes, loin d\'un bastion.',
      'Éteignez toutes les autres surfaces d\'apparition dans un rayon de 128 blocs : dalles, trappes ou destruction pure et simple.',
      'Construisez une plateforme de 21 × 21 avec des canaux d\'eau… impossible dans le Nether : utilisez à la place des plaques de pression et des pistons, ou faites tomber les mobs par des trappes qui s\'ouvrent.',
      'Solution courante : une plateforme avec des trous d\'un bloc, les zombies-piglins tombent en marchant.',
      'Chute de 24 blocs, puis mise à mort manuelle à l\'épée avec Butin III (pour maximiser les lingots).',
      'Attention : dès que vous frappez un zombie-piglin, TOUS ceux à portée deviennent hostiles. Tuez depuis un réduit protégé.'
    ],
    rendement: '≈500 pépites et 40 lingots/heure, plus un flux d\'XP énorme (idéal pour enchanter et réparer).',
    notes: [
      { type: 'tip', txt: 'Variante « portail » — un portail du Nether dans le Surworld engendre des zombies-piglins qui le traversent. Un portail géant + une zone de collecte donnent une ferme à or sans jamais aller dans le Nether.' }
    ]
  },
  {
    id: 'wither-skel', nom: 'Ferme à squelettes wither (crânes)', cat: 'mob',
    taille: 'Forteresse du Nether', diff: 'Expert',
    desc: 'Aménagement d\'un carrefour de forteresse du Nether : on ne garde que les briques du Nether comme surface d\'apparition, ce qui rend les squelettes wither majoritaires. Objectif : les 3 crânes pour invoquer le Wither, puis la balise.',
    mats: ['≈2 000 blocs de briques du Nether (récupérés sur place)', 'Dalles et trappes en quantité', 'Épée avec Butin III (indispensable)', 'Potion de Résistance au feu', 'Entonnoirs + coffres'],
    couches: [
      { t: 'Plateforme de spawn (dessus)', g: ['rrrrrrrrr', 'rrrrrrrrr', 'rr.....rr', 'rr.....rr', 'rr..H..rr', 'rr.....rr', 'rrrrrrrrr'] },
      { t: 'Vue de côté · plafond 2 blocs', g: ['rrrrrrr', 'r.....r', 'r.....r', 'rrr.rrr', '..|....', '..x....', '.HHH...', '..E....'] }
    ],
    etapes: [
      'Trouvez un grand carrefour de forteresse — plus la surface de briques du Nether est vaste, meilleur est le rendement.',
      'Rasez tout le décor autour et couvrez de dalles toute surface qui n\'est pas votre plateforme.',
      'Les squelettes wither n\'apparaissent que sur les briques du Nether, à un niveau de lumière ≤ 11 : n\'éclairez rien sur la plateforme.',
      'Un plafond à 3 blocs autorise le squelette wither (2,4 blocs de haut) mais pas les blazes en vol : c\'est votre filtre.',
      'Convoyez avec des trous dans le sol vers une chute puis une plateforme de mise à mort.',
      'Tuez à l\'épée avec Butin III : le taux de crânes passe de 2,5 % à 5,5 %.'
    ],
    rendement: '≈3 à 6 crânes par heure avec Butin III — largement assez pour plusieurs balises.',
    notes: [
      { type: 'danger', txt: 'L\'effet Wither ne se soigne pas au lait dans toutes les situations et vous empêche de régénérer. Portez une armure en diamant ou netherite et gardez une pomme d\'or.' }
    ]
  },
  {
    id: 'raid', nom: 'Ferme à raids (totems & émeraudes)', cat: 'mob',
    taille: '≈16 × 16 × 20', diff: 'Expert',
    desc: 'Un village artificiel dont le seul villageois déclenche des raids en boucle. Chaque raid rend des totems d\'immortalité, des émeraudes et un flot d\'XP.',
    mats: ['1 villageois + 1 lit + 1 cloche', '≈500 blocs pleins', 'Canaux d\'eau + entonnoirs + coffres', 'Chute de mise à mort de 24 blocs', 'Bouteilles de mauvais présage (ou capitaines pillards à tuer)'],
    couches: [
      { t: 'Y+0 · village artificiel', g: ['bbbbbbb', 'b~~~~~b', 'b~...~b', 'b~.x.~b', 'b~...~b', 'b~~~~~b', 'bbb.bbb'] },
      { t: 'Vue de côté', g: ['b<b', 'bxb', 'b~b', 'b.b', 'b.b', 'b.b', 'bxb', 'bHb', 'bEb'] }
    ],
    etapes: [
      'Construisez une petite plateforme de village en hauteur, contenant 1 villageois et 1 lit — c\'est le minimum pour que le jeu la considère comme un village.',
      'Protégez le villageois derrière des vitres : il doit être visible des pillards mais intouchable, sinon le raid s\'arrête.',
      'Obtenez le « Mauvais présage » : tuez un capitaine pillard (celui à la bannière) dans une patrouille ou un avant-poste.',
      'Entrez dans la zone du village : le raid démarre. Les pillards apparaissent sur les surfaces valides autour.',
      'Aménagez une plateforme d\'apparition unique avec des canaux d\'eau qui poussent tout vers une chute de 24 blocs.',
      'Les évocateurs tombent dans la zone de mise à mort ; leurs totems atterrissent dans vos entonnoirs.',
      'Enchaînez les raids en buvant une bouteille de mauvais présage (obtenue depuis la 1.21 dans les chambres d\'épreuve) ou en retuant un capitaine.'
    ],
    rendement: '≈4 à 6 totems d\'immortalité par raid, plus des piles d\'émeraudes. Environ 10 minutes par cycle complet.',
    notes: [
      { type: 'warn', txt: 'Ravageurs — ils ne se laissent pas emporter par l\'eau aussi facilement et détruisent les feuillages. Prévoyez une zone entièrement minérale.' },
      { type: 'tip', txt: 'Une fois 30 totems accumulés, vous pouvez jouer sans jamais craindre la mort : c\'est la ferme qui change le plus la façon de jouer.' }
    ]
  },
  {
    id: 'enderman', nom: 'Ferme à endermen (XP maximale)', cat: 'mob',
    taille: '≈30 × 30, dans l\'End', diff: 'Expert',
    desc: 'Dans les plaines de l\'End, seuls les endermen apparaissent. Une plateforme au-dessus du vide avec un endermite en appât : c\'est la ferme d\'XP la plus rapide du jeu.',
    mats: ['≈600 blocs (transportés depuis le Surworld ou faits sur place)', '1 endermite en wagonnet (appât)', 'Entonnoirs + coffres', 'Casque ou citrouille sculptée (pour ne pas provoquer les endermen)', 'Chute de 43 blocs'],
    couches: [
      { t: 'Plateforme (vue de dessus)', g: ['..bbbbb..', '.bbbbbbb.', 'bbbb.bbbb', 'bbb...bbb', 'bbbb.bbbb', '.bbbbbbb.', '..bbbbb..'] },
      { t: 'Vue de côté', g: ['bbbbb', 'b...b', 'b.=.b', 'b...b', '..|..', '..|..', '..|..', '..x..', '.HHH.', '..E..'] }
    ],
    etapes: [
      'Allez sur les îles principales de l\'End, à au moins 200 blocs de l\'île centrale, ou construisez au-dessus du vide.',
      'Détruisez ou couvrez toutes les surfaces d\'apparition dans un rayon de 128 blocs sauf votre plateforme.',
      'Placez un endermite dans un wagonnet au centre : les endermen s\'agglutinent autour de lui.',
      'Sous la zone où ils se rassemblent, un trou les fait tomber de 43 blocs (les endermen ont 40 points de vie, il en faut plus qu\'un mob classique).',
      'Portez une citrouille sculptée sur la tête : vous pouvez regarder les endermen sans les provoquer.',
      'Achevez au coup d\'épée dans la zone de mise à mort pour récupérer l\'XP et les perles.'
    ],
    rendement: '30 niveaux en moins d\'une minute. Perles de l\'Ender par piles entières.',
    notes: [
      { type: 'tip', txt: 'Sans endermite — la ferme fonctionne aussi sans appât, un peu plus lentement. Regardez simplement les endermen depuis la plateforme pour les attirer vers le trou.' }
    ]
  },
  {
    id: 'guardian', nom: 'Ferme à gardiens (monument océanique)', cat: 'mob',
    taille: 'Volume du monument entier', diff: 'Expert',
    desc: 'Le monument océanique est la seule zone où les gardiens apparaissent, y compris à travers l\'eau. Vidé de son eau, il devient la ferme la plus productive du jeu.',
    mats: ['≈15 éponges (récupérées sur place)', '≈3 000 blocs pour boucher les ouvertures', 'Potions de Respiration aquatique + Vision nocturne', '1 conduit (8 coquillages nautiles + 1 cœur de la mer)', 'Entonnoirs + coffres, lave ou chute de mise à mort'],
    couches: [
      { t: 'Zone de spawn (schéma simplifié)', g: ['wwwwwwwww', 'w.......w', 'w.......w', 'w...H...w', 'w.......w', 'w.......w', 'wwwwwwwww'] },
      { t: 'Vue de côté · collecte', g: ['wwwww', 'w...w', 'w.|.w', '..|..', '..x..', '.HHH.', '..E..'] }
    ],
    etapes: [
      'Tuez d\'abord les 3 gardiens anciens : leur Fatigue de minage III rend tout chantier impossible (ou buvez du lait en boucle).',
      'Installez un conduit dans un cadre de prismarine : il donne respiration, vision nocturne et vitesse de minage sous l\'eau dans un large rayon.',
      'Videz l\'intérieur du monument à l\'éponge (une éponge se sèche au four et se réutilise).',
      'Bouchez toutes les ouvertures du monument sauf votre zone de collecte.',
      'Les gardiens continuent d\'apparaître dans le volume du monument, même sans eau : ils suffoquent et tombent dans vos entonnoirs.',
      'Ajoutez une chute ou une lame de lave pour accélérer la mise à mort et récupérer l\'XP.'
    ],
    rendement: 'Le meilleur rendement d\'XP et d\'objets du jeu : milliers de cristaux de prismarine, de poissons et de niveaux d\'XP par heure.',
    notes: [
      { type: 'warn', txt: 'C\'est un chantier de plusieurs sessions. Commencez par une version partielle (une seule aile) : elle produit déjà énormément.' }
    ]
  },

  /* ================= NIVEAU 3 — LOGISTIQUE & CONFORT ================= */
  {
    id: 'trieur', nom: 'Trieur automatique multi-lignes', cat: 'logistique',
    taille: '2 blocs par catégorie', diff: 'Avancé',
    desc: 'Le système nerveux d\'une base : toutes vos fermes déversent dans une ligne d\'entonnoirs, et chaque objet finit dans son coffre dédié, sans intervention.',
    mats: ['Par catégorie : 5 entonnoirs, 1 grand coffre, 1 comparateur, 1 torche de redstone, 1 poudre de redstone, 4 blocs pleins', '18 objets « bourre » par filtre', 'Cadres d\'objet pour l\'étiquetage'],
    couches: [
      { t: 'Vue de côté · deux modules', g: ['HHHHHH', 'B.BB.B', 'VRRVRR', 'H..H..', 'E..E..'] },
      { t: 'Vue de dessus · ligne principale', g: ['EHHHHHHHHE', '.HH.HH.HH.', '.EE.EE.EE.'] }
    ],
    etapes: [
      'Ligne principale : une rangée d\'entonnoirs chaînés qui traverse toute la salle de stockage, alimentée par vos fermes.',
      'Sous chaque catégorie, un entonnoir filtre pointe vers le coffre de destination.',
      'Configurez chaque filtre : 1 exemplaire de l\'objet cible dans l\'emplacement 1, puis 18 objets de bourre (terre, cobblestone) répartis dans les 4 autres emplacements.',
      'Comparateur en sortie de l\'entonnoir filtre → poudre de redstone → torche de redstone sous un bloc plein : c\'est l\'inverseur qui verrouille le filtre à vide.',
      'Testez module par module : lancez un objet dans la ligne, il doit atterrir dans le bon coffre.',
      'Terminez la ligne par 2 grands coffres « débordement » : ils reçoivent tout ce qui n\'a pas de catégorie.',
      'Posez un cadre d\'objet sur chaque coffre pour identifier son contenu d\'un coup d\'œil.'
    ],
    rendement: 'Débit d\'un entonnoir : 2,5 objets/seconde. Une seule ligne suffit pour toutes vos fermes ; doublez-la si vous dépassez ce débit.',
    notes: [
      { type: 'tip', txt: 'Alternative moderne — depuis la 1.21, un fabricateur (crafter) permet de compacter automatiquement les ressources en blocs avant le tri : neuf fois moins d\'objets à trier.' }
    ]
  },
  {
    id: 'compacteur', nom: 'Compacteur automatique (fabricateur)', cat: 'logistique',
    taille: '3 × 3 × 3', diff: 'Intermédiaire',
    desc: 'Le fabricateur (crafter) de la 1.21 transforme automatiquement 9 lingots en 1 bloc. Placé en amont du stockage, il divise par neuf le volume à ranger.',
    mats: ['1 fabricateur (5 fer, 2 redstone, 1 établi, 1 lanceur)', '2 entonnoirs, 2 coffres', '1 comparateur, 1 bloc plein, 1 poudre de redstone'],
    couches: [
      { t: 'Vue de côté', g: ['.E.', '.H.', 'RY.', 'VB.', '.H.', '.E.'] }
    ],
    etapes: [
      'Coffre d\'entrée → entonnoir → fabricateur : les objets remplissent la grille 3 × 3 du fabricateur.',
      'Verrouillez les emplacements inutiles en cliquant dessus (ils passent en « désactivé »).',
      'Comparateur en sortie du fabricateur : quand les 9 emplacements sont pleins, il émet un signal fort.',
      'Ce signal alimente le fabricateur, qui produit le bloc et l\'éjecte dans l\'entonnoir de sortie.',
      'Entonnoir de sortie → coffre, ou directement vers votre ligne de tri.',
      'Répliquez pour chaque ressource compactable : fer, or, cuivre, redstone, lapis, charbon, diamant, émeraude.'
    ],
    rendement: 'Instantané dès que les 9 unités sont réunies. Un grand coffre de blocs = 9 grands coffres de lingots.',
    notes: [
      { type: 'info', txt: 'Le fabricateur ne consomme rien et ne s\'use pas : c\'est un composant purement logique, ce qui en fait la meilleure addition récente au jeu technique.' }
    ]
  },
  {
    id: 'cobble', nom: 'Générateur de pierre automatique', cat: 'ressource',
    taille: '5 × 3 × 3', diff: 'Intermédiaire',
    desc: 'Lave + eau = pierre, à l\'infini. Un piston casse le bloc formé, un entonnoir le collecte : la ressource de construction illimitée, pour les remblais et les tours à mobs.',
    mats: ['1 seau de lave, 1 seau d\'eau', '1 piston, 1 observateur (ou horloge de redstone)', '≈10 blocs pleins résistants (pierre)', 'Entonnoirs + coffre', 'Optionnel : 1 fabricateur pour transformer en pierre taillée'],
    couches: [
      { t: 'Vue de côté', g: ['clcwc', 'c.P.c', 'cQHEc'] },
      { t: 'Vue de dessus', g: ['ccccc', 'clcwc', 'c.P.c', 'cHHHc', 'ccEcc'] }
    ],
    etapes: [
      'Creusez un canal : une source de lave d\'un côté, une source d\'eau de l\'autre, séparées par une case vide.',
      'La lave qui coule au contact de l\'eau produit de la pierre (ou du cobblestone selon la configuration) dans la case centrale.',
      'Placez un piston face à la case centrale, alimenté par un observateur qui détecte l\'apparition du bloc.',
      'Le piston pousse la pierre nouvellement formée vers un canal d\'eau ou directement sur des entonnoirs.',
      'Variante « à casser » : un joueur AFK qui mine en boucle avec Efficacité V produit beaucoup plus vite qu\'un piston.',
      'Reliez la sortie à un four (pour la pierre lisse) ou à un fabricateur (pour les briques).'
    ],
    rendement: '≈1 bloc par seconde avec un observateur. En version « joueur AFK », plusieurs milliers par heure.',
    notes: [
      { type: 'tip', txt: 'Pour un chantier de tour à mobs, prévoyez plutôt une ferme à cobblestone à 8 générateurs en parallèle : vous n\'aurez jamais assez de blocs.' }
    ]
  },
  {
    id: 'trading', nom: 'Hall de commerce (villageois)', cat: 'logistique',
    taille: '3 blocs par villageois', diff: 'Intermédiaire',
    desc: 'La véritable « usine à ressources » du jeu : des villageois enfermés en cellules individuelles, chacun avec son bloc de métier. Enchantements, diamants, émeraudes, nourriture, tout devient achetable.',
    mats: ['1 cellule de 1 × 1 par villageois (vitres + dalle)', '1 bloc de métier par villageois (lutrin, forge, étal…)', '1 lit par villageois si vous voulez les reproduire', 'Rails ou bateaux pour le transport', '1 zombie enfermé (pour les remises permanentes)'],
    couches: [
      { t: 'Vue de dessus · rangée de cellules', g: ['bbbbbbbbbbb', 'bGbGbGbGbGb', 'b?b?b?b?b?b', 'bbbbbbbbbbb', ',,,,,,,,,,,'] },
      { t: 'Vue de côté · une cellule', g: ['bbb', 'bGb', 'b?b', 'b-b'] }
    ],
    etapes: [
      'Transportez les villageois en bateau, en wagonnet ou par un couloir d\'eau jusqu\'à vos cellules.',
      'Chaque cellule : 1 bloc de large, un demi-bloc au sol (dalle) pour empêcher le villageois de bouger, une vitre pour commercer.',
      'Posez un bloc de métier devant chaque villageois : il prend le métier correspondant.',
      'Rerollez les offres : cassez et reposez le bloc de métier tant que le villageois n\'a pas atteint le niveau « apprenti » — c\'est ainsi qu\'on obtient Efficacité V ou Fortune III à bas prix.',
      'Pour des prix cassés : zombifiez un villageois (zombie en difficulté Difficile) puis soignez-le (potion de Faiblesse + pomme d\'or). Ses prix chutent définitivement.',
      'Un fermier avec un composteur nourrira toute la colonie et permettra la reproduction si vous ajoutez des lits.'
    ],
    rendement: 'Un bibliothécaire vend n\'importe quel livre enchanté pour 5 à 20 émeraudes. Un fermier achète 20 blés contre 1 émeraude : une ferme à blé automatique devient une monnaie infinie.',
    notes: [
      { type: 'tip', txt: 'Le combo décisif — ferme à blé automatique → fermier (émeraudes) → bibliothécaires (livres enchantés) → armurier (armure en diamant enchantée). C\'est le chemin le plus rapide vers l\'équipement complet, bien avant l\'enchantement classique.' },
      { type: 'warn', txt: 'Les villageois ne rechargent leurs offres que 2 fois par jour de jeu, et seulement s\'ils peuvent atteindre leur bloc de métier.' }
    ]
  },
  {
    id: 'ascenseur', nom: 'Ascenseur à bulles (eau + âme du sable)', cat: 'logistique',
    taille: '1 × 1 × hauteur voulue', diff: 'Débutant',
    desc: 'Le moyen le plus rapide et le moins cher de monter ou descendre de 100 blocs. Deux colonnes côte à côte : une pour monter, une pour descendre.',
    mats: ['1 bloc de sable des âmes (montée) ou 1 bloc de magma (descente)', '1 seau d\'eau par 2 blocs de hauteur (ou des kelp pour figer la source)', 'Blocs pleins pour la gaine', '2 portes ou trappes en entrée/sortie'],
    couches: [
      { t: 'Vue de côté · colonne montante', g: ['b.b', 'bwb', 'bwb', 'bwb', 'bwb', 'bAb'] },
      { t: 'Vue de dessus · double colonne', g: ['bbbbb', 'bw.wb', 'bbbbb'] }
    ],
    etapes: [
      'Creusez une gaine de 1 × 1 sur toute la hauteur voulue, entourée de blocs pleins.',
      'Placez du sable des âmes tout en bas (ascension) ou un bloc de magma (descente).',
      'Remplissez la gaine d\'eau : versez un seau tous les 2 blocs en descendant, ou plantez du kelp du bas vers le haut puis cassez-le (chaque bloc devient une source).',
      'La colonne de bulles du sable des âmes vous propulse vers le haut ; le bloc de magma vous aspire vers le bas.',
      'Placez des portes ou des trappes en entrée et sortie pour ne pas tomber dedans par accident.',
      'Doublez la colonne : une montante, une descendante, séparées d\'un bloc.'
    ],
    rendement: 'Environ 4 blocs/seconde en montée : plus rapide qu\'une échelle et sans dégât de chute.',
    notes: [
      { type: 'info', txt: 'Il faut être en apnée pour monter : le casque avec Respiration ou un conduit évite de perdre de l\'air sur les grandes hauteurs.' }
    ]
  },
  {
    id: 'nether-hub', nom: 'Réseau de transport du Nether', cat: 'logistique',
    taille: 'Tunnels de 2 × 3', diff: 'Intermédiaire',
    desc: 'Ce n\'est pas une machine mais l\'infrastructure la plus rentable du jeu : 1 bloc parcouru dans le Nether = 8 blocs en surface. Un réseau de tunnels relie toute votre carte en quelques secondes.',
    mats: ['Blocs résistants (briques du Nether, pierre) pour les tunnels', 'Glace bleue + bateau (autoroute à grande vitesse) ou rails motorisés', 'Panneaux pour la signalétique et les coordonnées', 'Portails sécurisés (voir le plan correspondant)'],
    couches: [
      { t: 'Coupe d\'un tunnel', g: ['rrrrr', 'r...r', 'r...r', 'riiir'] },
      { t: 'Plan du hub central', g: ['rrr^rrr', 'r.....r', 'r.....r', '^..}..^', 'r.....r', 'r.....r', 'rrr^rrr'] }
    ],
    etapes: [
      'Construisez un hub central dans le Nether : une salle avec un portail par destination, chacun signalé par un panneau (nom + coordonnées).',
      'Creusez les tunnels de 2 blocs de large sur 3 de haut, entièrement fermés et éclairés : un ghast ou un piglin dans un tunnel gâche le voyage.',
      'Pour la vitesse : posez de la glace bleue au sol et déplacez-vous en bateau. Vous atteignez ≈70 blocs/seconde, soit 560 blocs/seconde en équivalent Surworld.',
      'Alternative : rails motorisés (1 rail motorisé tous les 8 rails) — plus lent, mais plus simple à mettre en place.',
      'Notez les coordonnées Surworld ÷ 8 pour placer précisément chaque portail dans le Nether.',
      'Sécurisez chaque extrémité avec le sas décrit dans les plans de construction.'
    ],
    rendement: 'Un trajet de 3 000 blocs en surface se fait en 375 blocs dans le Nether, soit moins d\'une minute en bateau sur glace.',
    notes: [
      { type: 'tip', txt: 'Glace bleue — 9 blocs de glace compactée font 1 bloc de glace bleue. Le marchand ambulant en vend parfois, sinon il faut une ferme à glace (Toucher de soie sur de la glace naturelle).' }
    ]
  },
  {
    id: 'miel', nom: 'Ferme à miel et rayons de miel', cat: 'animal',
    taille: '5 × 5 × 4', diff: 'Débutant',
    desc: 'Un dispensateur avec une bouteille ou une cisaille récolte automatiquement la ruche quand elle atteint le niveau de miel 5, détecté par un comparateur.',
    mats: ['1 à 4 ruches (3 rayons de miel + 6 planches)', '1 distributeur par ruche + bouteilles ou cisailles', '1 comparateur + redstone par ruche', '1 feu de camp sous chaque ruche', 'Fleurs et abeilles'],
    couches: [
      { t: 'Vue de côté', g: ['.y.', 'VyH', '.F.', '.E.'] },
      { t: 'Vue de dessus · module', g: ['.yyy.', 'V.y.H', '.FFF.', '.EEE.'] }
    ],
    etapes: [
      'Attirez des abeilles avec des fleurs, ou déplacez un nid entier avec une pioche à Toucher de soie (attention : les abeilles à l\'intérieur viennent avec).',
      'Placez la ruche à hauteur d\'yeux, avec un feu de camp deux blocs en dessous : la fumée empêche les abeilles de s\'énerver à la récolte.',
      'Un comparateur branché sur la ruche donne un signal de force 5 quand elle est pleine.',
      'Ce signal alimente un distributeur contenant des bouteilles en verre (miel) ou une cisaille (rayons de miel).',
      'Entonnoir sous le distributeur ou canal d\'eau pour récupérer la production.',
      'Plantez un massif de fleurs à proximité : sans fleurs, les abeilles ne produisent rien.'
    ],
    rendement: '≈1 récolte toutes les 5 minutes par ruche. Le miel restaure la faim et annule le poison ; les rayons servent à cirer le cuivre et à faire des bougies.',
    notes: [
      { type: 'tip', txt: 'Bloc de miel — il ralentit les chutes, empêche de sauter et ne colle pas au slime : c\'est le composant clé des machines volantes et des ascenseurs à pistons.' }
    ]
  },
  {
    id: 'arbre', nom: 'Ferme à arbres semi-automatique', cat: 'ressource',
    taille: '9 × 9 par arbre', diff: 'Intermédiaire',
    desc: 'Bois, pousses et pommes en continu. La version simple utilise la poudre d\'os et une hache ; la version automatique utilise du TNT ou une machine volante à pistons.',
    mats: ['Pousses d\'arbre (chêne noir pour la version compacte)', 'Poudre d\'os (ferme à squelettes ou composteur)', 'Version auto : ≈10 observateurs, pistons, TNT ou machine volante', 'Entonnoirs + coffres + canaux d\'eau'],
    couches: [
      { t: 'Vue de dessus · 4 emplacements', g: ['bbbbbbbbb', 'b..%.%..b', 'b.%%.%%.b', 'b...o...b', 'b.%%.%%.b', 'b..%.%..b', 'bHHHHHHHb', 'bbbbEbbbb'] },
      { t: 'Vue de côté', g: ['..%..', '.%%%.', '..o..', '..o..', '..t..', '.HHH.', '..E..'] }
    ],
    etapes: [
      'Préparez une plateforme de terre avec un espacement correct : 2 blocs entre chaque pousse pour un chêne, 5 × 5 pour un chêne noir (qui exige 4 pousses).',
      'Version manuelle rapide : plantez, appliquez de la poudre d\'os, coupez à la hache avec Efficacité, recommencez.',
      'Version automatique : un observateur détecte la pousse de l\'arbre et déclenche un TNT (ou une machine volante à pistons) qui casse tout le tronc.',
      'Sol en entonnoirs ou canaux d\'eau pour tout ramener vers un coffre.',
      'Le feuillage donne des pousses et des pommes : ne les cassez pas manuellement, laissez-les se décomposer au-dessus des entonnoirs.',
      'Reliez la sortie à des fours : les bûches deviennent du charbon de bois, une source de torches infinie.'
    ],
    rendement: '≈500 bûches/heure en version manuelle avec poudre d\'os. Version TNT automatique : plusieurs milliers.',
    notes: [
      { type: 'info', txt: 'Le chêne noir (dark oak) est le meilleur choix : il pousse toujours en gros arbre, ne laisse pas de branches flottantes et donne beaucoup plus de bois par cycle.' }
    ]
  },
  {
    id: 'amethyste', nom: 'Ferme d\'améthyste', cat: 'ressource',
    taille: 'Volume de la géode', diff: 'Intermédiaire',
    desc: 'Les bourgeons d\'améthyste repoussent indéfiniment sur le bloc d\'améthyste en gemme. Un piston les récolte au stade final, un canal d\'eau les convoie.',
    mats: ['1 géode d\'améthyste (Y -64 à 30)', 'Blocs d\'améthyste en gemme (budding amethyst) — NON déplaçables', '≈20 pistons + observateurs ou une horloge lente', 'Canaux d\'eau + entonnoirs + coffre'],
    couches: [
      { t: 'Vue de côté · un module', g: ['bPb', 'b*b', 'bwb', 'bHb', 'bEb'] },
      { t: 'Vue de dessus · mur de récolte', g: ['PPPPP', '*****', 'wwwww', 'HHHHH'] }
    ],
    etapes: [
      'Repérez une géode : sphère de calcite et de basalte lisse, souvent visible depuis un océan ou une grande grotte.',
      'Videz l\'intérieur en conservant les blocs d\'améthyste « bourgeonnants » (plus sombres, avec des amas) : ils ne se récupèrent JAMAIS, même au Toucher de soie.',
      'Face à chaque bloc bourgeonnant, placez un piston à 1 bloc de distance.',
      'Reliez tous les pistons à une horloge de redstone lente (un cycle toutes les 5 minutes suffit).',
      'Le piston casse l\'amas au stade 4, qui lâche 4 éclats d\'améthyste.',
      'Canal d\'eau sous les pistons pour convoyer vers un entonnoir et un coffre.'
    ],
    rendement: '≈100 éclats/heure sur une géode bien aménagée. De quoi fabriquer longues-vues, blocs décoratifs et dupliquer des allays.',
    notes: [
      { type: 'danger', txt: 'Ne cassez jamais un bloc d\'améthyste bourgeonnant : il n\'est pas récupérable et ne se régénère pas. Chaque bloc perdu est une perte définitive de production.' }
    ]
  },
  {
    id: 'sculk-xp', nom: 'Ferme à XP au catalyseur de sculk', cat: 'mob',
    taille: '5 × 5 × 5', diff: 'Expert',
    desc: 'Un catalyseur de sculk placé sous une zone de mise à mort convertit les morts en blocs de sculk. On les mine ensuite pour récupérer une XP considérable, concentrée et déplaçable.',
    mats: ['1 catalyseur de sculk (Toucher de soie, dans une cité antique)', 'Une ferme à mobs existante', 'Houe avec Toucher de soie ou pioche', 'Blocs pleins autour pour contenir la propagation'],
    couches: [
      { t: 'Vue de côté', g: ['b.b', 'bxb', 'bNb', 'bbb'] },
      { t: 'Vue de dessus · zone de conversion', g: ['bbbbb', 'bNNNb', 'bNNNb', 'bNNNb', 'bbbbb'] }
    ],
    etapes: [
      'Récupérez un catalyseur de sculk dans une cité antique, obligatoirement avec une pioche à Toucher de soie.',
      'Placez-le directement sous votre plateforme de mise à mort.',
      'Chaque mob tué dans un rayon de 8 blocs du catalyseur dépose son XP sous forme de blocs de sculk autour de lui.',
      'Le sculk s\'étend sur les blocs adjacents : entourez la zone de blocs qu\'il ne peut pas convertir pour la contenir.',
      'Minez le sculk quand vous voulez l\'XP : chaque bloc rend 1 point, et les capteurs/shriekers formés en rendent beaucoup plus.',
      'Avantage décisif : l\'XP est stockée en blocs, donc conservée même si vous n\'êtes pas là quand les mobs meurent.'
    ],
    rendement: 'Convertit 100 % de l\'XP des mobs en blocs récoltables à la demande. Idéal pour une ferme qui tourne en votre absence.',
    notes: [
      { type: 'tip', txt: 'Ne posez jamais de catalyseur près de votre base sans le contenir : le sculk se propage et transforme le décor.' }
    ]
  },

/* ================= MOBS RARES & DROPS UNIQUES ================= */
  {
    id: 'trident-noyes', nom: 'Ferme à tridents (noyés de rivière)', cat: 'mob',
    taille: '≈21 × 21 × 40', diff: 'Expert',
    desc: 'Une plateforme d\'eau totalement obscure posée dans un biome de rivière : les noyés qui y apparaissent naturellement sont les seuls du jeu à pouvoir tenir un trident. Ils sont convoyés par le courant, affaiblis par une chute, puis achevés à l\'épée.',
    mats: ['≈1 200 blocs pleins pour la cuve et le blindage', '≈30 seaux d\'eau (ou du kelp pour figer les sources)', '≈12 entonnoirs, 2 grands coffres', '1 épée avec Butin III (obligatoire pour le rendement)', '≈40 dalles ou trappes pour condamner les autres surfaces d\'apparition'],
    couches: [
      { t: 'Vue de dessus · cuve d\'apparition immergée', g: [
        'bbbbbbbbbbb',
        'b~~~~~~~~~b',
        'b~wwwwwww~b',
        'b~wwwwwww~b',
        'b~www.www~b',
        'b~wwwwwww~b',
        'b~wwwwwww~b',
        'b~~~~~~~~~b',
        'bbbbbbbbbbb'
      ] },
      { t: 'Vue de côté · chute et poste de mise à mort', g: [
        'bwwwb',
        'b...b',
        '..|..',
        '..|..',
        '..|..',
        '..|..',
        '..|..',
        '..x..',
        '.HHH.',
        '..E..'
      ] }
    ],
    etapes: [
      'Repérez une rivière : c\'est le meilleur biome, car son plafond d\'apparition aquatique est presque vide, donc tous les mobs générés sont des noyés.',
      'Creusez ou construisez une cuve de 21 × 21 sous le niveau de la mer et remplissez-la d\'eau : les noyés n\'apparaissent que dans l\'eau, à un niveau de lumière nul.',
      'Blindez tout : plafond opaque, aucune torche, et dalles ou trappes sur chaque surface exploitable dans un rayon de 128 blocs — sinon la limite de mobs part ailleurs.',
      'Faites converger les courants vers un trou central d\'un bloc, puis vers une colonne de chute.',
      'Chute de 24 blocs exactement : le noyé arrive à 1 point de vie mais n\'est pas mort — c\'est indispensable, car un mob tué autrement que par un joueur ne lâche JAMAIS son équipement, donc jamais son trident.',
      'Achevez à l\'épée avec Butin III : la chance de lâcher le trident passe de 8,5 % à 11,5 %.',
      'Entonnoirs sous la zone de mise à mort, reliés à deux grands coffres — le volume de chair putréfiée est énorme.',
      'Tenez-vous à plus de 24 blocs de la cuve pendant l\'attente : rien n\'apparaît plus près de vous que cette distance.'
    ],
    rendement: '≈1 à 3 tridents par heure avec Butin III, plus des piles de lingots de cuivre et quelques coquillages nautiles.',
    notes: [
      { type: 'warn', txt: 'Noyés convertis = zéro trident — un zombie qui se noie devient un noyé, mais sans équipement. Seuls les noyés apparus naturellement dans l\'eau peuvent porter un trident (6,25 % d\'entre eux). Ne recyclez donc jamais une ferme à zombies pour cet objectif.' },
      { type: 'tip', txt: 'Coquillages nautiles — 3 % des noyés naturels tiennent un nautile en main gauche et le lâchent toujours. Huit nautiles plus un cœur de la mer font un conduit : cette ferme finance à elle seule votre base sous-marine.' }
    ]
  },
  {
    id: 'slime-chunk', nom: 'Ferme à slimes (chunk à slime)', cat: 'mob',
    taille: '16 × 16 × 30', diff: 'Avancé',
    desc: 'Les slimes n\'apparaissent que dans certains chunks tirés au sort par la graine du monde (environ 1 sur 10), sous Y = 40, quelle que soit la lumière. On vide entièrement le chunk sur plusieurs niveaux et on laisse les courants pousser les slimes vers un golem de fer qui les broie.',
    mats: ['≈3 000 blocs pleins (murs, plafonds, plateformes)', '≈24 seaux d\'eau', '1 golem de fer (4 blocs de fer + 1 citrouille sculptée)', '≈10 entonnoirs, 2 grands coffres', 'Beaucoup d\'échafaudages et de torches pour le chantier'],
    couches: [
      { t: 'Vue de dessus · une plateforme (un chunk entier, 16 × 16)', g: [
        'cccccccccccccccc',
        'c~~~~~~~~~~~~~~c',
        'c~cccccccccccc~c',
        'c~cccccccccccc~c',
        'c~ccccc..ccccc~c',
        'c~ccccc..ccccc~c',
        'c~cccccccccccc~c',
        'c~cccccccccccc~c',
        'c~~~~~~~~~~~~~~c',
        'cccccccccccccccc'
      ] },
      { t: 'Vue de côté · empilement des niveaux et broyeur', g: [
        'ccccc',
        'c...c',
        'ccccc',
        'c...c',
        'ccccc',
        'c...c',
        '..|..',
        '..|..',
        'c...c',
        'cI1.c',
        'cHHHc',
        'cEEEc'
      ] }
    ],
    etapes: [
      'Identifiez un chunk à slime : sa position dépend de la graine du monde, pas du biome. Repérez-le en creusant et en attendant sous Y = 40, ou vérifiez la graine dans un outil de cartographie.',
      'Marquez les limites exactes du chunk avec la touche de debug : un slime apparu un bloc à côté n\'apparaîtra jamais. Toute la précision du projet tient là.',
      'Videz le chunk sur 5 à 8 niveaux, chaque plateforme séparée de 3 blocs de hauteur : les gros slimes font 2 blocs de côté et ont besoin de place.',
      'Éclairez le reste de la grotte alentour : la lumière n\'empêche pas les slimes d\'apparaître, mais elle supprime la concurrence des zombies et squelettes qui saturent la limite de mobs.',
      'Sur chaque plateforme, des courants d\'eau depuis les bords poussent tout vers un trou CENTRAL DE 2 × 2 — un trou d\'un seul bloc bloquerait les gros slimes.',
      'Reliez les trous à une colonne unique qui descend vers la chambre de broyage.',
      'Enfermez un golem de fer dans la chambre : les slimes ne subissent aucun dégât de chute, donc la chute seule ne tue rien. Le golem, lui, tue les trois tailles en boucle et sans intervention.',
      'Entonnoirs sous le golem, coffres reliés. Restez à 24–128 blocs pour que les apparitions continuent.'
    ],
    rendement: '≈300 à 800 boules de slime par heure sur un chunk aménagé sur plusieurs niveaux. Rendement strictement nul si le chunk n\'est pas un chunk à slime.',
    notes: [
      { type: 'info', txt: 'Variante marais — dans un biome de marais, les slimes apparaissent entre Y 50 et 70, la nuit, avec une lumière ≤ 7, et selon la phase de lune. C\'est plus simple à monter mais irrégulier : la ferme ne produit rien à la pleine lune inverse ni en journée.' },
      { type: 'tip', txt: 'Blocs de slime — 9 boules font 1 bloc. C\'est la base des machines volantes, des ascenseurs à pistons et des blocs de miel/slime alternés qui déplacent des structures entières.' }
    ]
  },
  {
    id: 'shulker-dup', nom: 'Ferme à shulkers (duplication en cité de l\'End)', cat: 'mob',
    taille: '≈11 × 11 × 20', diff: 'Expert',
    desc: 'Quand le projectile d\'un shulker touche un autre shulker, celui-ci a une chance d\'en engendrer un nouveau : c\'est la seule duplication de mob du jeu. Deux shulkers enfermés face à face se tirent dessus en boucle et alimentent une chambre de mise à mort.',
    mats: ['2 shulkers vivants (récupérés dans une cité de l\'End)', '≈400 blocs de purpur ou de pierre de l\'End', 'Dalles et escaliers pour supprimer les points de téléportation', '≈8 entonnoirs, 2 coffres', '1 épée avec Butin III, 1 arc pour la manipulation'],
    couches: [
      { t: 'Vue de dessus · cellule de duplication', g: [
        'qqqqqqqqq',
        'q.......q',
        'q.1...2.q',
        'q.......q',
        'qqqq.qqqq'
      ] },
      { t: 'Vue de côté · éjection et mise à mort', g: [
        'qqqqqqq',
        'q1...2q',
        'qqq.qqq',
        '...|...',
        '...|...',
        '...|...',
        '...x...',
        '..HHH..',
        '...E...'
      ] }
    ],
    etapes: [
      'Trouvez une cité de l\'End et gardez deux shulkers vivants : ne les tuez pas, poussez-les à coups de piston ou déplacez le bloc auquel ils sont accrochés.',
      'Construisez la cellule : deux shulkers séparés de 4 à 6 blocs, face à face, dans une boîte fermée. Ils se tirent dessus dès qu\'un joueur est à moins de 16 blocs.',
      'Supprimez toute possibilité de téléportation : un shulker blessé se téléporte vers une surface pleine libre à moins de 8 blocs. Habillez l\'intérieur de dalles et d\'escaliers, ou construisez au-dessus du vide, pour qu\'aucune destination ne soit valide.',
      'Un projectile qui touche un shulker a environ une chance sur quatre d\'en faire apparaître un nouveau, sur une case libre adjacente.',
      'Sous la cellule, laissez un trou : les shulkers nouvellement créés qui ne trouvent pas d\'accroche tombent dans la colonne de chute.',
      'Chambre de mise à mort au bas de la chute, elle aussi sans destination de téléportation valide, sinon le shulker blessé s\'échappe.',
      'Frappez à l\'épée avec Butin III : le taux de carapaces monte fortement, et 2 carapaces font une boîte de shulker.',
      'Portez toujours du lait ou un seau : la Lévitation infligée par les projectiles est mortelle au-dessus du vide de l\'End.'
    ],
    rendement: 'Environ 10 à 20 carapaces par heure pour une cellule unique ; 40 à 80 pour un modèle à plusieurs cellules. Variable selon la cadence de tir.',
    notes: [
      { type: 'danger', txt: 'Lévitation au-dessus du vide — la moindre erreur de placement vous fait flotter hors de la plateforme puis tomber dans le vide. Construisez avec un mur plein autour du poste de mise à mort et gardez une perle de l\'Ender en main gauche.' },
      { type: 'tip', txt: 'Boîtes de shulker à volonté — 2 carapaces + 1 coffre = 1 boîte. Avec cette ferme, on transporte 27 emplacements dans un seul emplacement : c\'est ce qui rend les grands chantiers possibles.' }
    ]
  },
  {
    id: 'froglight', nom: 'Ferme à lumigrenouilles (grenouilles + cubes de magma)', cat: 'animal',
    taille: '≈21 × 21 × 25 dans le Nether', diff: 'Expert',
    desc: 'Une grenouille qui avale un PETIT cube de magma le transforme en bloc de lumigrenouille. On monte donc une plateforme à cubes de magma dans un delta de basalte, on découpe les gros cubes, et on envoie les petits dans un enclos de grenouilles.',
    mats: ['≈1 000 blocs de briques du Nether (résistants aux ghasts)', '3 à 6 grenouilles amenées en seau de têtard', '≈12 pistons pour le broyeur, redstone et observateurs', '≈15 entonnoirs, 2 grands coffres', '≈30 trappes pour la plateforme et le blindage', 'Potion de Résistance au feu pour le chantier'],
    couches: [
      { t: 'Vue de dessus · enclos des grenouilles', g: [
        'rrrrrrrrr',
        'r.......r',
        'r.HHHHH.r',
        'r.HHHHH.r',
        'r.HHHHH.r',
        'r.......r',
        'rrrrErrrr'
      ] },
      { t: 'Vue de côté · plateforme, broyeur et enclos', g: [
        'rrrrrrr',
        'r.....r',
        'rrr.rrr',
        '...|...',
        '...|...',
        'rPPPPPr',
        'r.....r',
        'rHHHHHr',
        'rrrErrr'
      ] },
      { t: 'Vue de dessus · plateforme d\'apparition à trappes', g: [
        'rrrrrrrrrrr',
        'r.........r',
        'r.........r',
        'r....+....r',
        'r.........r',
        'r.........r',
        'rrrrrrrrrrr'
      ] }
    ],
    etapes: [
      'Choisissez un delta de basalte : c\'est le biome où les cubes de magma apparaissent le plus densément, à n\'importe quel niveau de lumière.',
      'Construisez une grande plateforme et condamnez toutes les autres surfaces d\'apparition dans un rayon de 128 blocs, sinon la limite de mobs se disperse.',
      'Au centre, une trappe ou un trou d\'un bloc : les cubes marchent dessus et tombent. Pas d\'eau possible dans le Nether, le convoyage se fait donc par gravité.',
      'Sous la chute, un broyeur à pistons découpe les cubes : un gros cube tué se scinde en cubes moyens, puis en petits. Seuls les PETITS cubes intéressent les grenouilles.',
      'Amenez vos grenouilles en seau de têtard : la couleur de la lumigrenouille dépend du biome où le têtard devient adulte — tempéré donne l\'ocre, chaud donne la nacrée, froid donne la verdoyante.',
      'Enclos à sol d\'entonnoirs : la grenouille avale le petit cube, le bloc de lumigrenouille tombe et part directement au coffre.',
      'Limitez-vous à 4 à 6 grenouilles : au-delà, elles se gênent et le débit ne monte plus.',
      'Fermez complètement le dessus : un ghast qui tire dans la ferme détruit des mois de chantier.'
    ],
    rendement: 'De l\'ordre de 200 à 400 lumigrenouilles par heure sur une grande plateforme — très variable selon la surface d\'apparition et le nombre de grenouilles.',
    notes: [
      { type: 'warn', txt: 'Seuls les petits cubes comptent — une grenouille ignore les cubes moyens et gros, et un cube trop grand la piétine. Le broyeur doit impérativement les réduire à la plus petite taille avant l\'enclos.' },
      { type: 'info', txt: 'Les trois couleurs se cultivent séparément : élevez vos têtards dans trois biomes différents (plaines, désert, taïga enneigée) pour obtenir les trois variétés sans dupliquer toute la ferme.' }
    ]
  },

  /* ================= RESSOURCES & MATÉRIAUX ================= */
  {
    id: 'sable-gravier', nom: 'Carrière à sable et gravier (pistons + rails)', cat: 'ressource',
    taille: 'Front de taille de 16 blocs', diff: 'Avancé',
    desc: 'Le sable et le gravier tombent dès qu\'on retire leur support. Une rangée de pistons collants arrache la base d\'une dune, toute la colonne s\'effondre sur des rails, et un bloc qui tombe sur un rail se transforme instantanément en objet ramassé par l\'entonnoir du dessous.',
    mats: ['≈16 pistons collants + 16 blocs pleins de soutien', '≈16 rails (6 lingots de fer pour 16)', '≈16 entonnoirs, 2 grands coffres', '1 levier, ≈20 poudres de redstone', '≈100 blocs pleins pour le bâti'],
    couches: [
      { t: 'Vue de côté · effondrement de la colonne', g: [
        '.AAAAA.',
        '.AAAAA.',
        '.AAAAA.',
        'SBBBBB.',
        'c=====c',
        'cHHHHHc',
        'ccccEcc'
      ] },
      { t: 'Vue de dessus · ligne de collecte', g: [
        'ccccccccc',
        'c=======c',
        'cHHHHHHHc',
        'ccccEcccc'
      ] },
      { t: 'Vue de côté · commande des pistons', g: [
        '!RRRR',
        'SBBBB',
        '=====',
        'HHHHH'
      ] }
    ],
    etapes: [
      'Choisissez un front de taille : un flanc de dune de désert pour le sable, un banc de gravier de grotte ou de rivière pour le gravier et le silex.',
      'Posez d\'abord la ligne d\'entonnoirs reliés au coffre, puis un rail SUR chaque entonnoir : le rail n\'est pas un bloc plein, donc tout bloc qui lui tombe dessus se casse en objet au lieu de s\'empiler.',
      'Juste au-dessus des rails, placez la rangée de blocs de soutien qui retient la colonne de sable ou de gravier.',
      'Derrière chaque bloc de soutien, un piston COLLANT : en se rétractant il ramène le bloc et libère toute la colonne d\'un coup.',
      'Reliez les pistons à une ligne de redstone commandée par un levier ; un répéteur tous les 15 blocs si la ligne est longue.',
      'Actionnez : la dune s\'effondre, chaque bloc touche un rail, se casse et part au coffre. Repoussez les blocs de soutien pour le cycle suivant.',
      'Déplacez la machine d\'un bloc vers la dune à chaque cycle : ce n\'est pas une ferme renouvelable mais une excavatrice, elle consomme le terrain.',
      'Envoyez le gravier vers un second poste : cassé à la main il donne 10 % de silex, mais un fabricateur transforme directement 4 silex en bloc de gravier reconstitué pour la construction.'
    ],
    rendement: 'Une dune de 20 × 20 sur 10 de haut, soit ≈4 000 blocs, se vide en quelques minutes une fois la machine posée. Le sable n\'étant pas renouvelable, la ferme se déplace après chaque secteur.',
    notes: [
      { type: 'tip', txt: 'Variante torches — à défaut de rails, une rangée de torches au sol fait exactement le même travail : tout bloc qui tombe sur une torche se casse. C\'est la version « début de partie », gratuite en fer.' },
      { type: 'warn', txt: 'Variante TNT — le TNT creuse infiniment plus vite mais ne restitue qu\'une partie des blocs détruits, et il faut un duplicateur de TNT monté sur machine volante. Réservez-la aux très gros chantiers de verre.' }
    ]
  },
  {
    id: 'obsidienne-auto', nom: 'Ferme à obsidienne (lave renouvelable)', cat: 'ressource',
    taille: '≈11 × 5 × 8', diff: 'Avancé',
    desc: 'Une stalactite pointue suspendue sous une source de lave remplit un chaudron sans jamais consommer la source : la lave devient renouvelable. Des distributeurs versent cette lave dans un mur de cellules, l\'eau la fige en obsidienne, et il ne reste qu\'à miner.',
    mats: ['1 stalactite pointue + 1 chaudron par générateur (10 à 20 générateurs)', '≈20 distributeurs + seaux (2 fer par générateur)', '1 source de lave « mère » par générateur', '≈12 entonnoirs, 2 coffres, 1 seau d\'eau', '1 pioche en netherite avec Efficacité V (et une balise en Célérité II)'],
    couches: [
      { t: 'Vue de côté · générateur de lave renouvelable', g: [
        'bblbb',
        'bbbbb',
        'bb|bb',
        'bb.bb',
        'bb.bb',
        'bbCbb'
      ] },
      { t: 'Vue de côté · mur de coulée et collecte', g: [
        'bbbbbbbbb',
        'bYYYYYYYb',
        'b~~~~~~~b',
        'bOOOOOOOb',
        'bOOOOOOOb',
        'b.......b',
        'bHHHHHHHb',
        'bbbbEbbbb'
      ] },
      { t: 'Vue de dessus · cellules de coulée', g: [
        'bbbbbbbbbbb',
        'bYbYbYbYbYb',
        'bObObObObOb',
        'bObObObObOb',
        'b~~~~~~~~~b',
        'bHHHHHHHHHb',
        'bbbbbEbbbbb'
      ] }
    ],
    etapes: [
      'Montez le générateur de lave : une source de lave, un bloc plein juste dessous, une stalactite pointue accrochée sous ce bloc (le « | » du schéma), et un chaudron en dessous.',
      'La stalactite goutte de la lave dans le chaudron sans jamais vider la source du dessus : c\'est le seul moyen de rendre la lave renouvelable en survie.',
      'Répliquez le générateur 10 à 20 fois côte à côte : la production de lave est le vrai goulot d\'étranglement, pas le minage.',
      'Chaque cellule de coulée fait 1 bloc de large et est séparée de sa voisine par un bloc plein : sans cette séparation la lave s\'écoule latéralement et donne de la pierre, pas de l\'obsidienne.',
      'Un distributeur chargé d\'un seau de lave verse une SOURCE dans la cellule — une simple lave qui coule ne donne jamais d\'obsidienne, uniquement le bloc source figé.',
      'Faites couler l\'eau depuis le haut du mur : au contact, chaque source de lave devient un bloc d\'obsidienne.',
      'Minez le mur avec une pioche en netherite Efficacité V sous une balise en Célérité II : le temps par bloc tombe de 9,4 s à environ 0,35 s.',
      'Sol en entonnoirs sous le mur pour récupérer, et un canal d\'eau si le mur est long.'
    ],
    rendement: '≈4 blocs d\'obsidienne par minute avec 20 générateurs, soit ≈240 par heure. Chaque chaudron se remplit en 5 à 6 minutes environ.',
    notes: [
      { type: 'info', txt: 'Pourquoi pas de piston — l\'obsidienne est immobile : aucun piston ne la pousse ni ne la tire. Toute « ferme à obsidienne » reste donc semi-automatique, la partie minage revient au joueur.' },
      { type: 'tip', txt: 'Version rapide en début de partie — un lac de lave du Nether donne des centaines d\'obsidiennes tout de suite, mais il est fini. Le générateur à stalactite est le seul montage qui tient sur des années de partie.' }
    ]
  },

  /* ================= ÉLEVAGE & VILLAGEOIS ================= */
  {
    id: 'villageois-repro', nom: 'Reproduction et tri automatiques de villageois', cat: 'logistique',
    taille: '9 × 7 × 6', diff: 'Avancé',
    desc: 'Deux couples de villageois nourris automatiquement se reproduisent en boucle. Les bébés, deux fois moins hauts que les adultes, s\'échappent seuls par un passage d\'un bloc de haut que les adultes ne peuvent pas franchir, et partent en wagonnet vers le hall de commerce.',
    mats: ['4 villageois de départ + 6 lits minimum', '1 distributeur + 1 horloge de redstone lente', '≈12 entonnoirs reliés à une ferme à blé ou à carottes', '1 dalle, 1 seau d\'eau, quelques rails et 1 wagonnet', '≈150 blocs pleins et vitres'],
    couches: [
      { t: 'Vue de dessus · chambre de reproduction', g: [
        'bbbbbbbbb',
        'b<.<.<.<b',
        'b.......b',
        'b.1...2.b',
        'b.......b',
        'bbbbbbb.b'
      ] },
      { t: 'Vue de côté · sas à bébés (1 bloc de haut)', g: [
        'bbbbbbbb',
        'b......b',
        'b.11..-b',
        'bbbbbb.b',
        'bbbbbb~b',
        'bbbbb..b',
        'bbbbb=.b',
        'bbbbbbbb'
      ] },
      { t: 'Vue de côté · distributeur de nourriture', g: [
        'bbEbb',
        'bbHbb',
        'bbYbb',
        'b...b',
        'b.1.b',
        'bbbbb'
      ] }
    ],
    etapes: [
      'Construisez une chambre fermée de 7 × 5 et posez au moins 6 lits accessibles : un couple ne se reproduit que s\'il reste un lit LIBRE pour le bébé.',
      'Amenez 4 villageois (bateau, wagonnet ou couloir d\'eau) et fermez la chambre avec des vitres pour garder un œil dessus.',
      'Nourriture : un coffre alimenté par votre ferme à blé descend dans un entonnoir puis un distributeur, déclenché par une horloge lente. Le distributeur JETTE le pain au sol — un entonnoir ne peut pas nourrir un villageois, il faut qu\'il ramasse l\'objet lui-même.',
      'Comptez 3 pains, ou 12 carottes, ou 12 pommes de terre par villageois pour qu\'il devienne « volontaire ». C\'est le seul déclencheur de la reproduction.',
      'Le tri se fait par la taille : un adulte mesure environ 1,95 bloc, un bébé moins d\'un bloc. Ouvrez dans un coin un passage haut d\'un seul bloc (une dalle inférieure au plafond du passage) : seuls les bébés s\'y engagent.',
      'Un filet d\'eau dans ce passage pousse les bébés vers un trou puis vers un rail où attend un wagonnet.',
      'Expédiez les bébés vers le hall de commerce : ils grandissent en 20 minutes de jeu et prennent ensuite le métier du bloc que vous leur présentez.',
      'Gardez la chambre parfaitement éclairée : un zombie qui entre transforme toute la colonie en une nuit.'
    ],
    rendement: '≈1 villageois toutes les 20 à 30 secondes avec deux couples bien nourris, soit plus de 100 par heure — de quoi remplir un hall de commerce complet en une soirée.',
    notes: [
      { type: 'warn', txt: 'Lits et portes — depuis la refonte des villages, seul le nombre de LITS libres compte, plus les portes. Un lit inaccessible (bloqué par un bloc au-dessus ou hors de portée) ne compte pas.' },
      { type: 'tip', txt: 'Couplez avec la ferme à blé automatique : le fermier envoie le blé, un fabricateur le transforme en pain, le pain part au distributeur. La ferme s\'auto-alimente et ne demande plus jamais rien.' }
    ]
  },
  {
    id: 'tortue-ecailles', nom: 'Ferme à œufs de tortue et écailles', cat: 'animal',
    taille: '11 × 11 × 5', diff: 'Intermédiaire',
    desc: 'Une tortue ne pond que sur le sable de la plage où elle est née. Les œufs éclosent la nuit, les bébés s\'échappent par un couloir d\'un bloc de large trop étroit pour les adultes, et chaque bébé devenu adulte lâche une écaille sur un sol d\'entonnoirs.',
    mats: ['2 tortues adultes + de l\'herbe marine (cisaille sur les fonds marins)', '≈60 blocs de sable pour la plage de ponte', '≈15 entonnoirs, 1 grand coffre', '1 distributeur + horloge lente pour l\'herbe marine', '≈120 blocs pleins et vitres pour l\'enceinte'],
    couches: [
      { t: 'Vue de dessus · plage de ponte', g: [
        'bbbbbbbbbbb',
        'bwwwwwwwwwb',
        'bwAAAAAAAwb',
        'bwA.....Awb',
        'bwA.1.2.Awb',
        'bwA.....Awb',
        'bwAAAAAAAwb',
        'bwwww.wwwwb',
        'bbbbb~bbbbb'
      ] },
      { t: 'Vue de côté · couloir filtrant et enclos de croissance', g: [
        'bbbbbbbbb',
        'b..b....b',
        'bA1~.2..b',
        'bAAAHHHHb',
        'bbbbEbbbb'
      ] },
      { t: 'Vue de dessus · enclos de croissance', g: [
        'bbbbbbb',
        'bHHHHHb',
        'bHHHHHb',
        'bHHHHHb',
        'bbbEbbb'
      ] }
    ],
    etapes: [
      'Récoltez de l\'herbe marine à la cisaille : c\'est le seul aliment des tortues, à la fois pour la reproduction et pour accélérer la croissance des bébés.',
      'Construisez la plage : une dalle de sable bordée d\'eau. Une tortue ne pond QUE sur la plage où elle a elle-même éclos, donc faites naître vos deux premières tortues sur place avant tout.',
      'Nourrissez les deux adultes : l\'une porte alors des œufs et va pondre 1 à 4 œufs dans le sable en quelques minutes.',
      'Enfermez complètement la plage : les zombies et les squelettes cherchent activement à piétiner les œufs, et un joueur qui marche dessus les casse aussi.',
      'Les œufs n\'éclosent que la nuit et plus vite sur du sable : ne les couvrez pas et n\'éclairez pas la plage.',
      'Le filtre est une affaire de largeur : un adulte fait 1,2 bloc de large, un bébé 0,36. Un couloir d\'UN bloc de large avec un filet d\'eau évacue les bébés et retient les adultes.',
      'Enclos de croissance à sol d\'entonnoirs : quand un bébé devient adulte, il lâche exactement une écaille, qui part directement au coffre.',
      'Un distributeur d\'herbe marine sur horloge lente accélère nettement la croissance : chaque herbe donnée retire 10 % du temps restant.',
      'Cinq écailles font un casque de tortue : respiration aquatique permanente, et l\'ingrédient de la potion du Maître des tortues.'
    ],
    rendement: '≈10 à 30 écailles par heure avec un nourrissage automatique à l\'herbe marine. Sans nourrissage, comptez une écaille par bébé toutes les 50 minutes environ.',
    notes: [
      { type: 'warn', txt: 'Ne cassez jamais un œuf sans Toucher de soie : il ne se récupère pas autrement, et une ponte perdue coûte plusieurs minutes de production.' },
      { type: 'info', txt: 'Les adultes ne sont jamais consommés : ils restent sur la plage et repondent indéfiniment tant qu\'on les nourrit. C\'est une des rares fermes animales sans mise à mort.' }
    ]
  },
  {
    id: 'mouton-laine', nom: 'Ferme à laine automatique (distributeur à cisailles)', cat: 'animal',
    taille: '9 × 4 × 5', diff: 'Intermédiaire',
    desc: 'Un mouton posé sur un bloc d\'herbe finit toujours par la brouter : le bloc devient de la terre, un observateur détecte le changement et déclenche un distributeur chargé d\'une cisaille. La laine tombe et un wagonnet-entonnoir la ramasse à travers le sol.',
    mats: ['1 mouton par module (jusqu\'à 8)', '1 distributeur + 1 cisaille + 1 observateur par module', '≈9 blocs d\'herbe (à la houe ou déplacés à la pelle)', '1 wagonnet-entonnoir + ≈16 rails + 1 rail motorisé', '2 entonnoirs, 1 grand coffre, ≈20 poudres de redstone'],
    couches: [
      { t: 'Vue de dessus · rangée de 7 enclos', g: [
        'bbbbbbbbb',
        'bYYYYYYYb',
        'beeeeeeeb',
        'bbbbbbbbb'
      ] },
      { t: 'Vue de côté · un module', g: [
        'bbbbb',
        'bY1.b',
        'bQeQb',
        'b.=.b',
        'b.H.b',
        'b.E.b'
      ] },
      { t: 'Vue de dessus · boucle du wagonnet-entonnoir', g: [
        'bbbbbbbbb',
        'b=======b',
        'b=bbbbb=b',
        'b=======b',
        'bbbHbbbbb'
      ] }
    ],
    etapes: [
      'Creusez une rangée d\'enclos d\'un bloc de large : un mouton par case, sinon ils se déplacent et ratent le jet de la cisaille.',
      'Le sol de chaque enclos est un bloc d\'herbe. Un mouton tondu ne récupère sa laine qu\'en broutant : sans herbe, la ferme s\'arrête définitivement.',
      'Placez un observateur contre le bloc d\'herbe : quand le mouton broute, l\'herbe devient de la terre, ce changement d\'état est détecté et fournit le signal — c\'est le déclencheur le plus fiable, aucun besoin d\'horloge.',
      'Le signal alimente un distributeur, à hauteur de tête du mouton, chargé d\'une cisaille : il tond automatiquement et rend 1 à 3 laines.',
      'Prévoyez la repousse de l\'herbe : laissez des blocs d\'herbe éclairés autour des enclos, l\'herbe se propage vers la terre nue en quelques minutes.',
      'Collecte : la laine tombe sur le sol en herbe, donc un entonnoir classique ne peut rien attraper. Faites passer un wagonnet-entonnoir sur un rail JUSTE en dessous : il ramasse les objets à travers le bloc au-dessus de lui.',
      'Bouclez le rail avec un rail motorisé et faites passer le wagonnet au-dessus d\'un entonnoir relié au coffre : il s\'y vide à chaque tour.',
      'Teignez chaque mouton d\'une couleur différente : la couleur est permanente et la laine repousse teintée. Une rangée de 8 moutons donne 8 couleurs en continu.'
    ],
    rendement: '≈150 à 300 laines par heure pour une rangée de 8 moutons — très variable, tout dépend de la vitesse de repousse de l\'herbe.',
    notes: [
      { type: 'tip', txt: 'Laine et lits — 3 laines + 3 planches font un lit, 1 laine fait un tapis et 3 laines une bannière. C\'est aussi la matière première du bloc de laine insonorisant utilisé sur les capteurs sculk.' },
      { type: 'info', txt: 'Le distributeur n\'use pas la cisaille au même rythme qu\'un joueur, mais elle finit par casser : ajoutez un entonnoir d\'approvisionnement depuis un coffre de cisailles de rechange.' }
    ]
  }

];
