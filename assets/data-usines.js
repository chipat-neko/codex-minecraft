/* ============================================================
   Données : usines & fermes automatiques
   Chaque usine : principe, schéma (vue de dessus ou de côté),
   matériaux, montage pas à pas, rendement.
   ============================================================ */

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
  }
];
