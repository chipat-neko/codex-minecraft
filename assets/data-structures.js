/* ============================================================
   Données : structures générées et succès (advancements)
   — STRUCTURES_DETAIL : une fiche par structure du Surworld,
     du souterrain, des océans, du Nether et de l'End. Chaque
     fiche détaille où la trouver, ce que contiennent réellement
     ses coffres, les pièges et la façon de les désamorcer.
   — ADVANCEMENTS : les succès de Java Edition regroupés par
     onglet du jeu, avec la marche à suivre concrète.
   Aucun taux chiffré n'est donné lorsqu'il n'est pas certain :
   la rareté est alors décrite qualitativement.
   ============================================================ */

var STRUCTURES_DETAIL = [

  /* ---------------- SURWORLD — SURFACE ---------------- */
  {
    nom: 'Village de plaines', cat: 'surworld',
    tags: [{ txt: 'Plaines / prairie', cls: 'ok' }, { txt: 'Coffres de métier', cls: 'gold' }],
    ou: 'Plaines, prairies et bords de rivière, entre Y 62 et 80. Bâti en chêne et pierre, avec des champs de blé, carottes, pommes de terre et betteraves. C\'est le type de village le plus fréquent et le plus étalé : les maisons peuvent être séparées de 40 blocs.',
    drops: [
      'Coffre de maison — pain, graines, pommes de terre et carottes, charbon, parfois un lingot de fer ou une émeraude ; utile surtout pour démarrer une ferme',
      'Coffre du forgeron d\'outils — le seul coffre de village qui sort régulièrement des diamants, avec fer, charbon, pioche en fer et émeraudes : c\'est LE coffre à chercher en priorité',
      'Coffre de l\'armurier / du forgeron d\'armes — lingots de fer, pièces d\'armure, obsidienne, lingots d\'or, parfois un diamant',
      'Coffre du cartographe — papier, cartes vierges, boussole, pain : de quoi cartographier sans dépenser de fer',
      'Coffre du pêcheur — poissons crus, seau d\'eau, canne à pêche, ficelle, charbon',
      'Blocs à métier récupérables — établi, fourneau, tonneau, alambic, table de cartographie, chaudron, forge, meule, métier à tisser, pupitre : tous se reposent ailleurs et servent à donner un métier à un villageois',
      'Ressources gratuites — lits (3 laines + 3 planches économisés à chaque fois), cloche, bottes de foin, cultures mûres, lanternes, échelles',
      'Danger — patrouilles de pillards à proximité ; un village sur cinquante environ génère en « village zombie » : villageois zombifiés, portes et torches manquantes'
    ],
    note: 'Ne cassez ni les lits ni les blocs de métier avant d\'avoir choisi l\'emplacement de votre hall de commerce : un villageois sans lit ne se reproduit pas, et un bloc de métier cassé puis reposé permet de re-tirer le métier (et les prix) d\'un villageois tant qu\'il n\'a pas encore commercé avec vous.'
  },
  {
    nom: 'Village du désert', cat: 'surworld',
    tags: [{ txt: 'Désert', cls: 'gold' }, { txt: 'Grès', cls: '' }],
    ou: 'Déserts uniquement, souvent au bord d\'un temple du désert ou d\'un puits. Maisons en grès et grès taillé, toits plats, terrasses ; les champs sont irrigués mais pauvres.',
    drops: [
      'Mêmes coffres de métier que les autres villages — forgeron d\'outils (fer et diamants), armurier, cartographe, boucher, berger',
      'Coffre de maison du désert — nourriture, graines, charbon, parfois un lingot d\'or',
      'Grès et grès taillé en quantité — plusieurs centaines de blocs déjà taillés, sans avoir à cuire du sable',
      'Blocs à métier et lits — comme partout, à démonter et réinstaller ailleurs',
      'Danger — le désert ne fournit aucun abri naturel : les monstres apparaissent en nombre autour du village dès la nuit tombée'
    ],
    note: 'Le village du désert ne contient presque pas de bois : uniquement les portes, quelques échelles et les lits. Emportez vos propres bûches si vous comptez y installer une base, ou repérez d\'abord une savane voisine.'
  },
  {
    nom: 'Village de savane', cat: 'surworld',
    tags: [{ txt: 'Savane', cls: 'gold' }, { txt: 'Acacia', cls: '' }],
    ou: 'Savanes et plateaux de savane. Construit en acacia, avec des toits en terrasses et beaucoup de clôtures ; le relief y est plat, ce qui en fait un excellent point de départ.',
    drops: [
      'Coffres de métier habituels — forgeron d\'outils, armurier, berger (laine teinte, cisailles), boucher',
      'Bois d\'acacia — planches, rondins, escaliers et clôtures déjà façonnés, en grande quantité',
      'Champs et enclos — blé, cultures, foin, animaux d\'élevage à proximité',
      'Blocs à métier et lits récupérables',
      'Danger — la savane est vaste et découverte : les patrouilles de pillards y repèrent le joueur de très loin'
    ],
    note: 'Récupérez quelques pousses d\'acacia en cassant les feuillages avant de partir : la savane est le seul biome qui en produit, et cela évite un aller-retour de plusieurs milliers de blocs si vous voulez ce bois chez vous.'
  },
  {
    nom: 'Village de taïga', cat: 'surworld',
    tags: [{ txt: 'Taïga', cls: 'ok' }, { txt: 'Sapin', cls: '' }],
    ou: 'Taïgas et vieilles taïgas. Maisons en sapin, grandes et hautes, souvent avec un sous-sol ou un grenier ; des citrouilles et des buissons de baies sucrées poussent autour.',
    drops: [
      'Coffres de métier habituels — forgeron d\'outils, armurier, cartographe, fléchier, pêcheur',
      'Bois de sapin — le village de taïga est le plus « bâti » : rondins, escaliers, trappes et clôtures en quantité',
      'Citrouilles et baies sucrées — nourriture immédiate et matière première pour les tartes et les lanternes-citrouilles',
      'Blocs à métier, lits, tonneaux (le tonneau du pêcheur est un coffre qui s\'ouvre même sous un bloc)',
      'Danger — la taïga est sombre en journée sous les sapins : les monstres survivent au petit matin dans les zones ombragées'
    ],
    note: 'Chaque village fait apparaître des chats errants (environ un pour quatre lits). Apprivoisez-en un avec du poisson cru et emmenez-le chez vous : les creepers et les phantoms fuient les chats, ce qui protège une base bien mieux qu\'une clôture.'
  },
  {
    nom: 'Village de toundra enneigée', cat: 'surworld',
    tags: [{ txt: 'Plaines enneigées', cls: 'cyan' }, { txt: 'Rare', cls: '' }],
    ou: 'Plaines enneigées et pentes enneigées. Petits villages compacts en sapin, avec de la neige et de la glace ; c\'est le type de village le moins peuplé et le plus difficile à trouver.',
    drops: [
      'Coffres de métier habituels — même butin qu\'ailleurs, mais moins de bâtiments donc moins de coffres',
      'Neige tassée et glace — à ramasser à la pelle (Toucher de soie pour la glace) : matière première des routes en glace bleue et des ascenseurs à bulles',
      'Blocs à métier et lits récupérables',
      'Ressource rare — les villageois de toundra sont les seuls habillés en fourrure, mais leurs métiers et leurs prix sont identiques',
      'Danger — les squelettes tirent des flèches de lenteur dans les biomes enneigés (stray) : venez avec un bouclier'
    ],
    note: 'Les igloos apparaissent dans le même biome que ces villages. Un igloo avec sous-sol fournit exactement la potion de Faiblesse et la pomme d\'or nécessaires pour soigner un villageois zombifié : soignez-le au village voisin, ses prix chutent durablement.'
  },
  {
    nom: 'Temple du désert', cat: 'surworld',
    tags: [{ txt: 'Désert', cls: 'gold' }, { txt: 'Piège TNT', cls: 'red' }],
    ou: 'Pyramide de grès dans les déserts, à moitié enfouie dans le sable, repérable à ses deux tours orange. Le sol de la salle centrale porte un motif en terre cuite bleue et orange : c\'est le couvercle du puits piégé.',
    drops: [
      'Chambre au trésor — 4 coffres, un à chaque coin du puits, sous le motif du sol',
      'Coffres — diamants, émeraudes, lingots de fer et d\'or, os, chair putréfiée, poudre à canon, selle, armures de cheval (fer, or, plus rarement diamant), livre enchanté, pomme d\'or et, rarement, pomme d\'or enchantée',
      'Modèle de forge « dune » — motif d\'armure exclusif au temple du désert, dans l\'un des coffres',
      'Piège — 9 blocs de TNT sous la plaque de pression en pierre au centre du puits : marcher dessus tue un joueur non équipé et détruit une partie du butin',
      'Désamorçage — cassez la plaque de pression depuis le bord du puits (à la main, sans sauter dedans) AVANT de descendre, ou creusez un tunnel latéral qui débouche au niveau des coffres',
      'Blocs récupérables — grès taillé et grès ciselé par centaines, terre cuite colorée du motif',
      'Bonus — la TNT désamorcée se récupère à la main : 9 blocs de TNT gratuits, précieux pour miner les débris antiques'
    ],
    note: 'Beaucoup de temples génèrent au-dessus d\'une grotte : le sol du puits peut manquer, et la TNT tombe alors dans le vide en explosant au moindre contact. Approchez toujours par le haut de la pyramide et éclairez le puits avant d\'y sauter.'
  },
  {
    nom: 'Temple de la jungle', cat: 'surworld',
    tags: [{ txt: 'Jungle', cls: 'ok' }, { txt: 'Fils de détente', cls: 'red' }],
    ou: 'Jungles et jungles denses, en pierre et pierre moussue, souvent noyé dans la végétation et difficile à repérer depuis le sol. Trois niveaux : terrasse, couloirs pièges, salle basse fermée par une énigme à leviers.',
    drops: [
      'Coffre du couloir piégé — diamants, émeraudes, fer, or, os, chair putréfiée, selle, armures de cheval, livre enchanté',
      'Coffre de la salle basse — même butin, accessible seulement après l\'énigme (ou en creusant)',
      'Modèle de forge « sauvage » — motif d\'armure exclusif au temple de la jungle',
      'Piège à flèches — deux fils de détente reliés à des distributeurs chargés de flèches, dans le couloir du bas',
      'Désamorçage — coupez le fil avec des CISAILLES : le fil se casse sans déclencher le distributeur, et vous récupérez la ficelle intacte',
      'Énigme — trois leviers au mur commandent des pistons collants qui ouvrent la salle basse ; plus simple : creusez directement dans la paroi de la salle',
      'Blocs récupérables — distributeurs, pistons collants, crochets, leviers, poudre de redstone, plaques de pression : le meilleur kit de redstone gratuit du début de partie',
      'Bonus — les flèches restantes dans les distributeurs sont à prendre'
    ],
    note: 'Les pistons collants du temple contiennent chacun une boule de slime, impossible à obtenir avant d\'avoir trouvé une grotte à slimes ou un marais. Démontez-les systématiquement, même si vous ne comptez pas résoudre l\'énigme.'
  },
  {
    nom: 'Hutte de sorcière', cat: 'surworld',
    tags: [{ txt: 'Marais', cls: 'ok' }, { txt: 'Sans coffre', cls: '' }],
    ou: 'Marais et marais de mangrove, sur pilotis au-dessus de l\'eau. Petite cabane en sapin avec un chaudron, un établi et un champignon en pot ; une sorcière et un chat noir y apparaissent à la génération.',
    drops: [
      'Aucun coffre — la valeur de la hutte est sa zone d\'apparition, pas son butin',
      'Chaudron récupérable — 7 lingots de fer économisés, indispensable pour teindre le cuir et remplir des fioles',
      'Chat noir — la seule variante noire du jeu apparaît ici ; à apprivoiser au poisson cru',
      'Zone à sorcières — la hutte fait apparaître des sorcières dans son volume dès qu\'il fait noir, y compris de jour',
      'Butin indirect — les sorcières lâchent poudre de redstone, poudre lumineuse, sucre, fioles, poudre à canon, bâtons et yeux d\'araignée'
    ],
    note: 'Pour transformer la hutte en ferme, il ne suffit pas de la couvrir : il faut supprimer ou éclairer tous les blocs d\'apparition dans un rayon de 128 blocs autour du point de collecte, sinon les sorcières se répartissent partout ailleurs. Deux huttes proches doublent le rendement.'
  },
  {
    nom: 'Manoir des bois', cat: 'surworld',
    tags: [{ txt: 'Forêt sombre', cls: 'red' }, { txt: 'Très rare', cls: 'purple' }, { txt: 'Dangereux', cls: 'red' }],
    ou: 'Uniquement en forêt sombre, et très loin : souvent plusieurs milliers de blocs du point de départ. La carte de l\'explorateur des bois, achetée à un cartographe suffisamment monté en niveau, est de loin le moyen le plus fiable de le localiser.',
    drops: [
      'Totems d\'immortalité — chaque évocateur en lâche un, systématiquement : la seule source du jeu hors raids',
      'Coffres des salles de stockage — lingots de fer et d\'or, diamants, pain, blé, seau, redstone, charbon, livre enchanté, selle',
      'Modèle de forge « vex » — motif d\'armure exclusif au manoir',
      'Salle secrète au bloc de diamant — une pièce sans porte, entourée de laine bleue ou de tapis, abrite un bloc de diamant : sondez les murs et creusez',
      'Salles à énigmes — fausse salle du portail de l\'End, salle aux allays en cage, salle au gâteau, salle à l\'arbre : le butin varie selon les pièces générées',
      'Bannières de mauvais présage — décorations murales, uniques et non craftables',
      'Danger principal — évocateurs (crocs invoqués qui traversent les blocs, vexes volants), vindicateurs (haches qui désactivent le bouclier), pillards',
      'Blocs récupérables — bois de chêne noir en énorme quantité, tapis, laine colorée'
    ],
    note: 'Les vindicateurs portent une hache : elle désactive votre bouclier pendant 5 secondes, ce qui rend la garde inutile en corps à corps. Nettoyez pièce par pièce depuis un couloir, en bouchant les portes derrière vous, et gardez un seau d\'eau pour couper les crocs de l\'évocateur.'
  },
  {
    nom: 'Avant-poste de pillards', cat: 'surworld',
    tags: [{ txt: 'Près des villages', cls: 'gold' }, { txt: 'Réapparition', cls: 'red' }],
    ou: 'Dans tous les biomes où les villages génèrent, souvent à quelques centaines de blocs d\'un village. Grande tour en chêne noir et pierre, entourée de tentes, de cages et parfois d\'un pieu à bannière.',
    drops: [
      'Coffre du sommet de la tour — arbalète, livre enchanté, lingots de fer, bûches de chêne noir, crochet, blé, pommes de terre, carottes, fiole d\'expérience',
      'Modèle de forge « sentinelle » — motif d\'armure exclusif à l\'avant-poste',
      'Cages — certaines contiennent un golem de fer prisonnier (à libérer, il vous suivra le combat), d\'autres un allay',
      'Bannière de mauvais présage — portée par le capitaine, récupérable une fois celui-ci tué',
      'Fiole de mauvais présage — depuis la 1.21, le capitaine lâche une fiole au lieu d\'appliquer l\'effet ; la boire déclenche un raid en entrant dans un village, ou ouvre les coffres-forts sinistres des chambres d\'épreuve',
      'Danger — les pillards réapparaissent en continu dans le volume de l\'avant-poste tant que la structure existe : la nettoyer ne la vide jamais durablement'
    ],
    note: 'Un avant-poste est une ferme à fioles de mauvais présage et à émeraudes : construisez une plateforme de tir en hauteur à 20 blocs, et laissez les pillards remonter. Ne dormez jamais près d\'un avant-poste avec l\'effet de mauvais présage actif si votre village n\'est pas fortifié.'
  },
  {
    nom: 'Igloo', cat: 'surworld',
    tags: [{ txt: 'Toundra / taïga enneigée', cls: 'cyan' }, { txt: 'Sous-sol 1 sur 2', cls: 'gold' }],
    ou: 'Plaines enneigées, taïgas enneigées et pentes enneigées. Petit dôme de neige avec un lit, un four et un établi ; environ un igloo sur deux cache un sous-sol sous le tapis, accessible par une trappe.',
    drops: [
      'Coffre du sous-sol — pomme d\'or (presque toujours), charbon, pommes, blé, lingots d\'or, pierre, hache en pierre',
      'Alambic du laboratoire — chargé d\'une potion jetable de Faiblesse : exactement ce qu\'il faut pour soigner un villageois',
      'Cellule — un villageois zombifié enfermé derrière des barreaux, et un villageois « chercheur » dans la pièce voisine',
      'Blocs récupérables — neige tassée, glace, four, établi, lit, chaudron, barreaux de fer, tapis',
      'Danger — aucun, hormis le villageois zombifié si vous ouvrez la cellule sans l\'avoir affaibli d\'abord'
    ],
    note: 'Le kit du sous-sol (Faiblesse jetable + pomme d\'or) est le démarrage de commerce le plus rentable du jeu : un villageois soigné accorde des remises massives et définitives. Soignez-le DANS sa cellule, il ne peut pas fuir, et posez un bloc de métier à côté avant qu\'il ne redevienne villageois.'
  },
  {
    nom: 'Puits du désert', cat: 'surworld',
    tags: [{ txt: 'Désert', cls: 'gold' }, { txt: 'Archéologie', cls: 'copper' }],
    ou: 'Déserts, isolé au milieu des dunes. Petite construction de grès de 4×4 avec une source d\'eau au centre : rare, et facile à manquer depuis le sol.',
    drops: [
      'Sable suspect — au fond du puits, sous l\'eau : à brosser avec une brosse, jamais à casser',
      'Butin de brossage — tessons de poterie (motifs exclusifs au puits), émeraudes, briques, bâtons',
      'Eau — source infinie en plein désert, à recopier avec deux seaux pour vos cultures',
      'Blocs récupérables — grès, dalles et grès ciselé',
      'Piège de débutant — casser le sable suspect à la pioche ou à la pelle détruit l\'objet caché : il faut impérativement une brosse (plume + lingot de cuivre + bâton)'
    ],
    note: 'Le puits du désert est la seule source de certains motifs de tessons. Comme le sable suspect obéit à la gravité, ne creusez jamais le bloc situé dessous : la chute détruit le contenu.'
  },
  {
    nom: 'Ruines de sentier', cat: 'surworld',
    tags: [{ txt: 'Enfoui', cls: 'gold' }, { txt: 'Archéologie', cls: 'copper' }],
    ou: 'Enterrées sous les taïgas, jungles, forêts de bouleaux, marais de mangrove et plaines enneigées. Seul un petit dôme de terre battue ou quelques blocs affleurants trahissent la structure : le reste est sous terre.',
    drops: [
      'Gravier suspect — des dizaines de blocs à brosser, répartis dans les couloirs enfouis',
      'Tessons de poterie — la plus grande variété de motifs du jeu ; quatre tessons assemblés font une jarre décorée',
      'Modèles de forge — « hôte », « exhausseur », « façonneur » et « guide » : quatre motifs d\'armure qu\'on ne trouve nulle part ailleurs',
      'Butin courant — émeraudes, graines de blé, pépites d\'or, briques, teintures, houe en bois, bougies',
      'Blocs récupérables — terre cuite, boue compactée, briques de boue, mosaïques de pierre : palettes de construction introuvables ailleurs',
      'Méthode — dégagez la terre au-dessus, puis brossez chaque bloc de gravier suspect sans jamais toucher au bloc voisin'
    ],
    note: 'Le gravier suspect est soumis à la gravité et se brise s\'il tombe : creusez toujours par le haut et par les côtés, jamais par en dessous. Une seule ruine bien fouillée fournit assez de tessons pour composer une série complète de jarres et au moins un modèle de forge rare.'
  },
  {
    nom: 'Portail ruiné (Surworld)', cat: 'surworld',
    tags: [{ txt: 'Tous biomes', cls: 'ok' }, { txt: 'Obsidienne pleureuse', cls: 'purple' }],
    ou: 'Partout dans le Surworld, en surface comme enfoui sous terre ou sous l\'eau, à n\'importe quelle altitude. Cadre d\'obsidienne incomplet, entouré de netherrack, de blocs d\'or, de magma et parfois d\'un feu.',
    drops: [
      'Coffre au pied du portail — outils et armures en or enchantés, pomme d\'or (parfois enchantée), carotte dorée, briquet, obsidienne, pépites et lingots d\'or, cloche (rare)',
      'Obsidienne pleureuse du cadre — la seule source non commerciale au début : sert à fabriquer l\'ancre de réapparition du Nether',
      'Obsidienne classique — récupérable à la pioche en diamant, souvent 6 à 10 blocs déjà posés',
      'Blocs d\'or brut — quelques blocs autour de la structure',
      'Bonus — compléter le cadre avec quelques blocs d\'obsidienne donne un portail du Nether gratuit, sans avoir à couler de la lave',
      'Piège — la lave et les blocs de magma génèrent souvent à l\'intérieur ; les portails enfouis peuvent s\'ouvrir sur une grotte profonde'
    ],
    note: 'Un cadre de portail n\'a pas besoin de ses quatre coins : 10 blocs d\'obsidienne suffisent pour un portail complet. Notez les coordonnées d\'un portail ruiné trouvé tôt, l\'armure en or enchantée du coffre vous rendra neutre auprès des piglins dès votre première visite au Nether.'
  },

  /* ---------------- SURWORLD — SOUTERRAIN ---------------- */
  {
    nom: 'Donjon (salle du générateur)', cat: 'souterrain',
    tags: [{ txt: 'Souterrain', cls: 'gold' }, { txt: 'Générateur', cls: 'red' }],
    ou: 'Petites salles de pierre et de pierre moussue (7×7 ou 9×9 avec les murs), enfouies partout entre le fond du monde et la surface, souvent branchées sur une grotte. Un générateur de zombies, de squelettes ou d\'araignées au centre, un ou deux coffres contre les murs.',
    drops: [
      'Coffres — selle, disques de musique (13, Cat, Otherside), pomme d\'or, pomme d\'or enchantée (rare), livre enchanté, étiquette, armures de cheval (fer, or, diamant), lingots de fer et d\'or, poudre de redstone, seau, pain, blé',
      'Générateur — à NE PAS casser : c\'est le cœur d\'une ferme à expérience ou à butin, presque gratuit à aménager',
      'Pierre moussue — non renouvelable sans lianes ; le donjon en fournit une centaine de blocs',
      'Danger — le générateur produit jusqu\'à 4 monstres toutes les 10 à 40 secondes dans un rayon proche tant qu\'un joueur est à moins de 16 blocs',
      'Neutralisation temporaire — posez des torches sur le générateur et tout autour : à luminosité suffisante, les monstres ne peuvent plus apparaître',
      'Aménagement — une fois éclairé, remplacez les torches par un système d\'eau qui pousse les monstres vers un point de chute pour en faire une ferme'
    ],
    note: 'Un générateur ne fonctionne que si un joueur est à 16 blocs ou moins. Construisez votre poste de collecte à exactement 15 blocs du générateur pour rester dans la zone d\'activation tout en étant hors de portée des monstres.'
  },
  {
    nom: 'Mine abandonnée', cat: 'souterrain',
    tags: [{ txt: 'Souterrain', cls: 'gold' }, { txt: 'Rails', cls: '' }],
    ou: 'Réseaux de galeries boisées avec rails et supports, entre le fond du monde et Y 30 environ. Dans les badlands, une variante en chêne noir génère bien plus haut et souvent à ciel ouvert.',
    drops: [
      'Wagons-coffres — diamants, lingots de fer et d\'or, lapis-lazuli, redstone, charbon, pain, graines de melon et de citrouille, pioche en fer, étiquette, pomme d\'or (rarement enchantée)',
      'Rails — plusieurs centaines de rails ordinaires, plus des rails motorisés et détecteurs : de quoi équiper un réseau complet sans dépenser un lingot',
      'Bois — les supports et planches sont en chêne, et en CHÊNE NOIR dans les badlands : le seul moyen d\'en obtenir sans aller en forêt sombre',
      'Toiles d\'araignée — à couper aux cisailles ou à l\'épée pour récupérer la ficelle (arcs, laine, tapis, chargements d\'arbalète)',
      'Générateurs d\'araignées venimeuses — au cœur des zones de toiles ; le poison ne tue pas mais rend la fuite difficile',
      'Danger — les galeries traversent des cavités : chutes, lave, gravier suspendu qui s\'effondre au premier coup de pioche',
      'Bonus — les mines recoupent souvent des grottes luxuriantes et des géodes : c\'est un excellent réseau d\'exploration prêt à l\'emploi'
    ],
    note: 'Éclairez et bouchez les entrées latérales au fur et à mesure : sinon les monstres apparus dans les branches non explorées vous prennent à revers pendant que vous minez. Une mine des badlands, en surface, se pille sans aucun de ces risques.'
  },
  {
    nom: 'Forteresse (Stronghold)', cat: 'souterrain',
    tags: [{ txt: 'Souterrain', cls: 'purple' }, { txt: 'Portail de l\'End', cls: 'purple' }],
    ou: 'Enfouie profondément, en anneaux concentriques autour de l\'origine du monde : les trois premières forteresses se situent à environ 1 280 à 2 800 blocs de la coordonnée (0, 0). On la localise en lançant des yeux de l\'Ender et en suivant leur trajectoire.',
    drops: [
      'Salle du portail — 12 cadres de portail de l\'End, chacun ayant une chance sur dix de contenir déjà un œil ; un générateur de poissons d\'argent surveille l\'escalier',
      'Bibliothèques — coffres avec livres enchantés, livres, papier, cartes vierges, boussoles, pain ; les étagères se récupèrent aux cisailles ou se cassent pour 3 livres chacune',
      'Coffres des couloirs — lingots de fer et d\'or, redstone, pomme, pain, pioche en fer, perle de l\'Ender, diamant (rare), disque « Otherside »',
      'Modèle de forge « œil » — motif d\'armure exclusif à la forteresse',
      'Salles annexes — fontaine, cellules, salle de stockage, salle de la bibliothèque à deux étages',
      'Piège — des blocs infestés se cachent dans les murs : les casser libère des poissons d\'argent qui appellent tous leurs voisins',
      'Interdit — les cadres de portail sont incassables en survie : n\'essayez pas de les récupérer',
      'Blocs récupérables — briques de pierre (normales, fissurées, moussues, ciselées), étagères, barreaux de fer, torches'
    ],
    note: 'Prévoyez 15 yeux de l\'Ender minimum : un lancer sur cinq brise l\'œil, et il en faut jusqu\'à 12 pour compléter le portail. Lancez un œil, courez droit dessus jusqu\'à ce qu\'il plonge vers le sol, puis creusez en escalier : c\'est là que se trouve la forteresse.'
  },
  {
    nom: 'Cité antique', cat: 'souterrain',
    tags: [{ txt: 'Deep Dark', cls: 'purple' }, { txt: 'Warden', cls: 'red' }, { txt: 'Butin unique', cls: 'gold' }],
    ou: 'Uniquement dans le biome Deep Dark, autour de Y -52, sous les massifs montagneux et les hauts plateaux. Immense complexe de pierre des profondeurs recouvert de sculk, avec un monument central en pierre des profondeurs renforcée.',
    drops: [
      'Coffres — livres enchantés dont Marche silencieuse (Swift Sneak), introuvable ailleurs, éclats d\'écho, fragments de disque « 5 », pommes d\'or enchantées, diamants, lingots de fer, bottes en fer enchantées, selles, disque « Otherside »',
      'Modèles de forge « gardien » et « silence » — deux motifs exclusifs, le « silence » étant l\'un des plus rares du jeu',
      'Éclats d\'écho — les 8 éclats nécessaires à la boussole de récupération ne se trouvent QUE dans ces coffres',
      'Blocs de sculk — sculk, veines, catalyseurs, capteurs et hurleurs : à récupérer au Toucher de soie, sinon ils ne lâchent que de l\'expérience',
      'Danger — chaque hurleur (shrieker) touché par une vibration augmente le niveau d\'alerte ; au troisième cri, le Warden surgit du sol',
      'Le Warden — 500 points de vie, aveugle mais guidé par les vibrations et l\'odeur, et son cri sonique traverse les blocs, les armures et les boucliers : il ne se combat pas, il se fuit',
      'Neutralisation — marchez sur de la laine ou des tapis (qui absorbent les vibrations), accroupissez-vous en permanence, et cassez les hurleurs au Toucher de soie',
      'Diversion — une boule de neige ou une flèche lancée au loin attire les capteurs ailleurs, le temps d\'ouvrir un coffre'
    ],
    note: 'Emportez une pile de laine et posez-en un chemin devant vous : ni vos pas ni la pose de blocs de laine ne déclenchent les capteurs. Si le Warden apparaît, ne courez pas en ligne droite : posez de la laine, accroupissez-vous et éloignez-vous de 40 blocs ; il repart sous terre au bout d\'une minute sans cible.'
  },
  {
    nom: 'Chambres d\'épreuve', cat: 'souterrain',
    tags: [{ txt: 'Souterrain', cls: 'copper' }, { txt: '1.21+', cls: 'ok' }, { txt: 'Rejouable', cls: 'gold' }],
    ou: 'Grands complexes de tuf et de cuivre dans la couche de pierre des profondeurs, sous la plupart des biomes du Surworld. Une chambre se reconnaît à ses couloirs de tuf poli, ses ampoules de cuivre et ses salles à générateurs d\'épreuve.',
    drops: [
      'Coffres-forts (vaults) — s\'ouvrent avec une clé d\'épreuve : armures et outils en diamant enchantés, diamants, émeraudes, disques de musique, potions, flèches spéciales, pommes d\'or enchantées',
      'Coffres-forts sinistres (ominous) — s\'ouvrent avec une clé sinistre, obtenue en affrontant les générateurs après avoir bu une fiole de mauvais présage : butin nettement supérieur, dont le noyau lourd (heavy core) qui sert à fabriquer la masse',
      'Modèles de forge « éclair » (bolt) et « flux » (flow) — le premier dans les coffres-forts normaux, le second dans les sinistres',
      'Générateurs d\'épreuve — envoient des vagues de monstres calibrées sur le nombre de joueurs, et lâchent les clés à la fin de la vague',
      'Coffres ordinaires et jarres décorées — flèches, potions de soin, pain, bâtons de vent, émeraudes',
      'Blocs récupérables — cuivre sous toutes ses formes, ampoules de cuivre, tuf poli et ciselé, chandeliers, portes et grilles de cuivre, crafters (artisanat automatique)',
      'Danger — salles à pièges (distributeurs de flèches, pièges à lave, poussée du breeze), et les breezes renvoient vos projectiles',
      'Bâtons de vent — les charges de vent lâchées par les breezes propulsent le joueur : indispensables pour les déplacements verticaux et pour la masse'
    ],
    note: 'Chaque coffre-fort ne peut être vidé qu\'une seule fois PAR JOUEUR, mais il ne se réinitialise jamais : venir avec des clés supplémentaires ne sert à rien sur une chambre déjà pillée. Repérez plutôt deux ou trois chambres et gardez-les en réserve — en multijoueur, chacun peut ouvrir les mêmes coffres-forts.'
  },
  {
    nom: 'Géode d\'améthyste', cat: 'souterrain',
    tags: [{ txt: 'Souterrain', cls: 'purple' }, { txt: 'Renouvelable', cls: 'ok' }],
    ou: 'Poche sphérique creuse entre le fond du monde et Y 30 environ, dans tous les biomes, souvent sous les océans. Trois couches : basalte lisse à l\'extérieur, calcite au milieu, blocs d\'améthyste à l\'intérieur.',
    drops: [
      'Amas d\'améthyste — 4 éclats par amas mature cassé à la pioche (davantage avec Fortune ; rien du tout à la main)',
      'Améthyste bourgeonnante — les blocs qui font pousser les amas : IMPOSSIBLES à récupérer, même au Toucher de soie',
      'Blocs d\'améthyste, calcite, basalte lisse — matériaux de construction rares, à ramasser tant que vous y êtes',
      'Usages des éclats — longue-vue, verre teinté (bloque la lumière sans bloquer la vue), capteur sculk calibré, duplication d\'un allay',
      'Ferme — un piston qui pousse un amas mature le casse et le fait tomber en éclats : une géode devient une ferme automatique renouvelable'
    ],
    note: 'Ne cassez jamais un bloc d\'améthyste bourgeonnante : c\'est la seule chose qui régénère les amas, et rien ne permet de le remplacer. Laissez au contraire de l\'espace libre sur ses six faces pour multiplier les points de pousse.'
  },
  {
    nom: 'Fosse de fossiles', cat: 'souterrain',
    tags: [{ txt: 'Désert / marais', cls: 'gold' }, { txt: 'Blocs d\'os', cls: '' }],
    ou: 'Enfouie profondément sous les déserts, les marais et leurs variantes, dans la couche de pierre ou de pierre des profondeurs. Grande structure en blocs d\'os figurant une colonne vertébrale ou un crâne, parfois mêlée de minerai de charbon.',
    drops: [
      'Blocs d\'os — chaque bloc donne 9 poudres d\'os une fois recraft : une seule fosse remplit un coffre d\'engrais',
      'Minerai de charbon — quelques veines intégrées à la structure',
      'Blocs récupérables — les blocs d\'os eux-mêmes sont un excellent matériau décoratif (rendu ivoire, orientable)',
      'Aucun coffre, aucun monstre propre à la structure',
      'Repérage — les fossiles étant en pleine roche, on ne les croise qu\'en creusant : les tunnels de minage à Y -55 et les mines abandonnées en recoupent régulièrement'
    ],
    note: 'La poudre d\'os d\'une fosse permet de lancer une ferme d\'arbres ou de cultures avant même d\'avoir une ferme à squelettes : c\'est la ressource la plus sous-estimée du début de partie. Comptez 9 poudres par bloc, soit plusieurs centaines par fosse.'
  },

  /* ---------------- OCÉANIQUE ---------------- */
  {
    nom: 'Monument océanique', cat: 'oceanique',
    tags: [{ txt: 'Océan profond', cls: 'blue' }, { txt: 'Gardiens anciens', cls: 'red' }, { txt: 'Sans coffre', cls: '' }],
    ou: 'Océans profonds (toutes variantes), posé sur le fond, entre Y 39 et 61 environ. Immense bâtiment de prismarine visible de loin grâce à ses lanternes marines ; trois gardiens anciens y résident en permanence.',
    drops: [
      'Chambre au trésor — 8 blocs d\'or emmurés dans du prismarine sombre, au cœur de la salle du sommet : le seul « butin » fixe du monument, il n\'y a AUCUN coffre',
      'Salles aux éponges — présentes dans une partie seulement des monuments : des dizaines d\'éponges mouillées, à sécher au four pour assécher un chantier sous-marin',
      'Gardiens anciens — lâchent chacun une éponge mouillée, des éclats de prismarine et le modèle de forge « marée » (tide)',
      'Gardiens ordinaires — éclats et cristaux de prismarine, poisson cru : source infinie une fois le monument transformé en ferme',
      'Blocs récupérables — prismarine, briques de prismarine, prismarine sombre, lanternes marines par centaines',
      'Piège — les gardiens anciens infligent Fatigue de minage III à tout joueur entré dans le monument : miner devient presque impossible',
      'Contre-mesures — boire du lait retire l\'effet (mais il est réappliqué toutes les 5 minutes), tuer les trois gardiens anciens l\'arrête définitivement, et la TNT n\'est pas affectée par la fatigue',
      'Équipement conseillé — Respiration III, Affinité aquatique, Marche aquatique, potion de Vision nocturne, un seau d\'eau et de quoi bâtir une poche d\'air'
    ],
    note: 'Videz d\'abord l\'eau d\'une petite pièce avec une éponge, puis posez-y un lit ou un point de repli : combattre à l\'air libre annule le malus de dégâts sous l\'eau et vous permet de recharger l\'arc. Une fois les trois gardiens anciens tués, le monument devient la meilleure ferme à prismarine et à expérience du jeu.'
  },
  {
    nom: 'Épave', cat: 'oceanique',
    tags: [{ txt: 'Océans / plages', cls: 'blue' }, { txt: 'Carte au trésor', cls: 'gold' }],
    ou: 'Au fond de tous les océans, parfois échouée sur une plage ou à moitié ensablée. Le navire génère droit, penché ou retourné, et il lui manque souvent la proue ou la poupe.',
    drops: [
      'Coffre de la carte (cabine arrière) — carte au trésor enfoui presque systématiquement, plus boussole, papier, cartes vierges, horloge',
      'Coffre de ravitaillement (avant) — nourriture, pommes de terre empoisonnées, charbon, bambou, poudre à canon, TNT, pièces d\'armure en cuir, seau',
      'Coffre du trésor (cale) — lingots de fer et d\'or, pépites, émeraudes, lapis, diamant (rare), bouteilles d\'expérience',
      'Modèle de forge « côte » (coast) — motif d\'armure exclusif aux épaves',
      'Blocs récupérables — planches, escaliers et clôtures de la coque, souvent d\'un bois qu\'on n\'a pas encore chez soi',
      'Danger — noyés autour de l\'épave, dont certains portent un trident ; le manque d\'air est le vrai risque',
      'Astuce d\'accès — les épaves échouées sur les plages se pillent au sec, sans potion ni équipement'
    ],
    note: 'Une épave peut contenir jusqu\'à trois coffres, et ils sont dispersés : fouillez la cabine arrière, la cale ET la proue avant de repartir. La carte au trésor mène toujours à un coffre différent, donc conservez-en plusieurs : chacune vaut un cœur de la mer.'
  },
  {
    nom: 'Ruines sous-marines', cat: 'oceanique',
    tags: [{ txt: 'Océans', cls: 'blue' }, { txt: 'Œufs de sniffer', cls: 'ok' }],
    ou: 'Amas de bâtiments ruinés sur le fond marin, en deux familles : ruines froides en briques de pierre (océans tempérés, froids et gelés) et ruines chaudes en grès (océans chauds et tièdes). Elles génèrent en petits groupes isolés ou en grands villages engloutis.',
    drops: [
      'Coffres — carte au trésor enfoui (plus probable dans les grandes ruines), blé, charbon, lingots d\'or, émeraudes, pièces d\'armure en cuir, canne à pêche, cœur de la mer (rare)',
      'Sable suspect (ruines chaudes) — à brosser : tessons de poterie ET œufs de sniffer, la seule source du jeu pour ressusciter cette créature',
      'Blocs récupérables — grès, briques de pierre moussues, magma, argile, escaliers ruinés',
      'Danger — les noyés apparaissent en surnombre autour des ruines, y compris en plein jour',
      'Repérage — les ruines chaudes, claires, se distinguent nettement du fond bleu-vert : survolez l\'océan en élytres pour les repérer'
    ],
    note: 'Il faut deux œufs de sniffer pour lancer un élevage, mais un seul suffit en réalité : les sniffers adultes déterrent des graines rares, et deux sniffers issus du même œuf ne peuvent pas exister. Brossez donc plusieurs ruines chaudes avant de conclure qu\'il n\'y a plus d\'œufs.'
  },
  {
    nom: 'Trésor enfoui', cat: 'oceanique',
    tags: [{ txt: 'Plages / fonds marins', cls: 'gold' }, { txt: 'Cœur de la mer', cls: 'cyan' }],
    ou: 'Un unique coffre enterré sous le sable, le gravier ou la pierre d\'une plage ou d\'un fond marin. Introuvable sans la carte au trésor obtenue dans une épave ou des ruines sous-marines : la croix rouge marque le bloc exact.',
    drops: [
      'Cœur de la mer — systématiquement présent, et introuvable ailleurs : c\'est l\'ingrédient unique du conduit',
      'Coffre — lingots d\'or et de fer, diamants, émeraudes, TNT, cristaux de prismarine, poisson cuit, pièces d\'armure en cuir',
      'Conduit — 1 cœur de la mer + 8 coquilles de nautile (pêche ou noyés) : donne respiration, vision et vitesse de minage sous l\'eau dans un large rayon',
      'Méthode — placez-vous au centre exact de la croix (le marqueur du joueur doit se superposer à la croix) puis creusez un puits 3×3 : le coffre est rarement à plus de dix blocs sous la surface',
      'Piège — le coffre peut être noyé sous l\'eau ou coincé dans la pierre : gardez une pelle ET une pioche, ainsi qu\'un seau pour l\'eau'
    ],
    note: 'Chaque carte pointe vers un trésor distinct et n\'est jamais réutilisable. Comme le cœur de la mer est garanti à chaque fois, collectionner les cartes des épaves est le seul moyen d\'accumuler plusieurs conduits — un par base sous-marine.'
  },

  /* ---------------- NETHER ---------------- */
  {
    nom: 'Forteresse du Nether', cat: 'nether',
    tags: [{ txt: 'Nether', cls: 'red' }, { txt: 'Blazes', cls: 'gold' }, { txt: 'Verrue', cls: 'purple' }],
    ou: 'Traverse le Nether en longues bandes traversant plusieurs biomes, reconnaissable de très loin à ses ponts de briques du Nether au-dessus des mers de lave. Elle mêle couloirs fermés, escaliers, balcons et salles ouvertes.',
    drops: [
      'Générateurs de blaze — dans une salle carrée à balustrade au sommet d\'un escalier : la seule source de bâtons de blaze, donc de poudre de blaze, donc d\'alambics et d\'yeux de l\'Ender',
      'Verrue du Nether — plantée dans du sable des âmes dans les salles d\'escalier : ramassez la plante ET le sable, tout se replante chez vous',
      'Coffres — selle, armure de cheval en or, épée et pioche en diamant, obsidienne, briquet, lingots d\'or et de fer, diamants, verrue du Nether',
      'Modèle de forge « côte levée » (rib) — motif d\'armure exclusif à la forteresse du Nether',
      'Squelettes wither — n\'apparaissent que dans le volume de la forteresse ; leur crâne tombe environ une fois sur quarante, un peu plus avec Butin III',
      'Blocs récupérables — briques du Nether, clôtures et escaliers de briques, barreaux de fer',
      'Danger — blazes (projectiles de feu), squelettes wither (effet Wither), cubes de magma, ghasts au-dessus des ponts, et le vide de lave sous les passerelles',
      'Équipement — potion de Résistance au feu, bouclier, arc, et des blocs pour condamner les couloirs derrière vous'
    ],
    note: 'Un générateur de blaze se sécurise en posant des dalles ou de la lumière tout autour, puis en montant un mur de 3 blocs à distance : les blazes ne peuvent tirer qu\'en ligne de vue. Faites-le dès votre première visite, même sans matériel de ferme — vous reviendrez y chercher des dizaines de bâtons.'
  },
  {
    nom: 'Portail ruiné (Nether)', cat: 'nether',
    tags: [{ txt: 'Nether', cls: 'red' }, { txt: 'Butin en or', cls: 'gold' }],
    ou: 'Dans tous les biomes du Nether, souvent accroché à une falaise, en surplomb d\'une mer de lave ou noyé dans le netherrack. Même butin que son équivalent du Surworld, mais bien plus accessible car aucun n\'est enfoui sous terre.',
    drops: [
      'Coffre — outils et armures en or enchantés, pomme d\'or (parfois enchantée), carotte dorée, briquet, obsidienne, lingots et pépites d\'or, cloche (rare)',
      'Obsidienne pleureuse — plusieurs blocs dans le cadre : l\'ancre de réapparition en demande 6, plus 3 blocs de verre luisant',
      'Obsidienne — cadre récupérable à la pioche en diamant : de quoi ouvrir un second portail ailleurs',
      'Armure en or — enfilez-en une pièce immédiatement : les piglins deviennent neutres, ce qui rend le reste du Nether nettement plus praticable',
      'Danger — la structure est souvent posée au-dessus du vide ou de la lave, et les piglins zombifiés y traînent en groupe'
    ],
    note: 'Allumer un portail ruiné du Nether crée un portail lié côté Surworld aux coordonnées divisées par 8. C\'est une façon gratuite d\'ouvrir un second accès, mais vérifiez d\'abord où il débouche : un portail mal placé peut vous faire apparaître dans une falaise ou en pleine mer.'
  },
  {
    nom: 'Bastion — salle du trésor', cat: 'nether',
    tags: [{ txt: 'Nether', cls: 'red' }, { txt: 'Débris antiques', cls: 'purple' }, { txt: 'La plus riche', cls: 'gold' }],
    ou: 'Variante de bastion la plus recherchée : une grande construction de pierre noire dont le cœur est une salle à or, gardée par plusieurs piglins brutes et souvent surplombée d\'un pont. Les blocs d\'or sont visibles depuis l\'extérieur, incrustés dans les murs.',
    drops: [
      'Coffres du trésor — le butin le plus riche du jeu : lingots de netherite, débris antiques, blocs d\'or, pommes d\'or enchantées, épées et pioches en diamant enchantées, arbalètes, flèches spectrales, obsidienne pleureuse',
      'Modèle de forge « amélioration en netherite » — introuvable hors des bastions, et obligatoire pour améliorer chaque pièce d\'équipement en netherite',
      'Duplication du modèle — 1 modèle + 7 blocs de netherrack + 1 diamant sur la table de forge : dupliquez-le avant tout, un seul modèle suffit pour une panoplie entière',
      'Modèle de forge « groin » (snout) — motif d\'armure exclusif aux bastions',
      'Blocs récupérables — pierre noire polie et ciselée, blocs d\'or, briques d\'or, chaînes, lanternes',
      'Danger — les piglins brutes attaquent quoi que vous portiez : l\'armure en or ne les calme pas, et ils frappent très fort',
      'Piège des piglins — ouvrir un coffre, miner de l\'or ou casser un bloc d\'or devant un piglin rend TOUS les piglins de la zone hostiles, définitivement',
      'Certaines salles abritent un générateur de cubes de magma : repérez-le avant de vous engager dans un couloir étroit'
    ],
    note: 'La méthode la plus sûre : creusez un tunnel depuis l\'extérieur jusqu\'au dos de la salle au trésor, sortez les coffres de votre ligne de vue des piglins ordinaires, et attirez les brutes une par une dans le tunnel où elles ne peuvent pas vous encercler. Emportez des blocs ignifugés et une potion de Résistance au feu.'
  },
  {
    nom: 'Bastion — pont', cat: 'nether',
    tags: [{ txt: 'Nether', cls: 'red' }, { txt: 'Danger de chute', cls: 'red' }],
    ou: 'Bastion organisé autour d\'un immense pont de pierre noire enjambant le vide ou une mer de lave, avec une rampe à chaque extrémité et une tête de pont fortifiée.',
    drops: [
      'Coffres du pont — lingots et blocs d\'or, arbalètes, pommes d\'or, obsidienne pleureuse, flèches, cordes, selles, briquet',
      'Modèle de forge « groin » — comme dans tous les bastions',
      'Modèle « amélioration en netherite » — possible ici aussi, mais nettement plus rare que dans la salle du trésor',
      'Blocs récupérables — pierre noire (polie, ciselée, briques), chaînes, lanternes, blocs d\'or',
      'Danger principal — la chute : la structure est ouverte, les piglins vous poussent et le vide ou la lave sont en dessous',
      'Contre-mesure — construisez un garde-corps de blocs sur votre trajet avant d\'engager le combat, et gardez une potion de chute lente'
    ],
    note: 'Les piglins ordinaires deviennent neutres si vous portez une seule pièce d\'or, mais ils redeviennent hostiles au premier coffre ouvert devant eux. Sur un pont, cela signifie une bousculade au-dessus du vide : dégagez la zone à l\'arc AVANT de toucher au moindre coffre.'
  },
  {
    nom: 'Bastion — écuries de hoglins', cat: 'nether',
    tags: [{ txt: 'Nether', cls: 'red' }, { txt: 'Hoglins', cls: 'gold' }],
    ou: 'Bastion en forme de grande halle ouverte avec des rampes et des enclos où les piglins parquent des hoglins. On le reconnaît aux enclos clôturés et aux couloirs en pente.',
    drops: [
      'Coffres des écuries — lingots d\'or, arbalètes, selles, pommes d\'or, obsidienne pleureuse, cordes, flèches, briquet',
      'Modèle de forge « groin » — motif exclusif des bastions',
      'Hoglins vivants — viande de porc crue en quantité, et surtout du cuir : la seule source de cuir renouvelable du Nether',
      'Champignon écarlate — sert à attirer et à reproduire les hoglins ; une houe cueille les champignons du biome écarlate voisin',
      'Blocs récupérables — pierre noire, blocs d\'or, chaînes, lanternes, planches écarlates',
      'Danger — les hoglins chargent et projettent en l\'air ; ils fuient en revanche les champignons déformés et les blocs de sable des âmes'
    ],
    note: 'Posez des blocs de sable des âmes ou des champignons déformés autour de vous : les hoglins refusent d\'approcher et vous combattez les piglins tranquillement. Ramenez deux hoglins dans le Surworld par un portail pour un élevage de cuir et de viande — mais gardez-les à l\'écart, ils se transforment en zoglins hostiles.'
  },
  {
    nom: 'Bastion — unités d\'habitation', cat: 'nether',
    tags: [{ txt: 'Nether', cls: 'red' }, { txt: 'Labyrinthe', cls: '' }],
    ou: 'Bastion en forme de tours d\'habitation empilées, reliées par des passerelles et des escaliers étroits : la variante la plus labyrinthique, avec des coffres répartis sur plusieurs niveaux.',
    drops: [
      'Coffres des logements — lingots d\'or, arbalètes, pommes d\'or, obsidienne pleureuse, flèches, selles, cordes, briquet',
      'Modèle de forge « groin » — motif exclusif des bastions',
      'Modèle « amélioration en netherite » — possible mais rare dans cette variante',
      'Blocs récupérables — pierre noire sous toutes ses formes, blocs et briques d\'or, chaînes, lanternes, tapis',
      'Danger — les couloirs sont étroits et les piglins arrivent par plusieurs niveaux à la fois ; la lave coule dans certains puits centraux',
      'Piglins brutes — postés aux points de passage obligés, insensibles à l\'or'
    ],
    note: 'Dans cette variante, marchandez avant de piller : jetez des lingots d\'or aux piglins depuis un couloir sûr, encaissez le troc (perles de l\'Ender, obsidienne, cristaux de quartz, bottes de Marche du feu), et ne déclenchez l\'hostilité qu\'au dernier moment, quand vous êtes prêt à partir.'
  },

  /* ---------------- END ---------------- */
  {
    nom: 'Cité de l\'End', cat: 'end',
    tags: [{ txt: 'Îles extérieures', cls: 'purple' }, { txt: 'Shulkers', cls: 'red' }],
    ou: 'Uniquement sur les îles extérieures de l\'End, au-delà du vide qui entoure l\'île centrale : on y accède par une passerelle de l\'End (après la mort du dragon) en y lançant une perle de l\'Ender. Tours de purpur et de briques d\'end stone, souvent hautes de 50 blocs.',
    drops: [
      'Coffres — diamants, lingots de fer et d\'or, émeraudes, béryl (bâtons de fin), pommes d\'or enchantées, épées, pioches et pelles en diamant enchantées, armure de cheval en fer et en diamant, selles, plastrons en diamant',
      'Modèle de forge « flèche » (spire) — motif d\'armure exclusif aux cités de l\'End',
      'Carapaces de shulker — deux carapaces font une boîte de shulker : le seul conteneur transportable du jeu, celui qui change réellement la gestion d\'inventaire',
      'Blocs récupérables — purpur (blocs, piliers, escaliers, dalles), briques d\'end stone, verre teinté magenta, tiges de chorus (à cuire en béryl)',
      'Danger — les shulkers infligent Lévitation puis une chute mortelle : le vide de l\'End est en dessous',
      'Contre-mesure — potion de Chute lente, un seau d\'eau inutile ici, et surtout des blocs pour boucher les fenêtres avant de traverser une salle',
      'Astuce — les shulkers se téléportent sur les murs : fermez la pièce avant de les tuer, sinon ils se déplacent hors de portée'
    ],
    note: 'Emportez toujours au moins une potion de Chute lente : la Lévitation d\'un shulker vous éjecte au-dessus du vide, et c\'est la première cause de mort dans une cité. Tuez les shulkers avec un arc depuis un couloir, jamais à découvert sur une terrasse.'
  },
  {
    nom: 'Navire de l\'End', cat: 'end',
    tags: [{ txt: 'Élytres', cls: 'purple' }, { txt: 'Pas toujours présent', cls: 'red' }],
    ou: 'Vaisseau flottant à côté de certaines cités de l\'End seulement, en général à hauteur de la plus haute tour et légèrement à l\'écart. Il faut souvent construire une passerelle de 20 à 30 blocs ou lancer une perle pour l\'atteindre.',
    drops: [
      'Élytres — dans un cadre d\'objet au fond de la cale : l\'objet le plus important du jeu après la fin du dragon, et un seul par navire',
      'Deux coffres du pont — diamants, lingots d\'or et de fer, émeraudes, béryl, armures de cheval en diamant, pommes d\'or enchantées, outils en diamant enchantés',
      'Alambic de la cale — chargé de potions de Soin instantané II, à récupérer telles quelles',
      'Tête de dragon — sur la proue : décoration unique et non renouvelable hors têtes de joueur',
      'Blocs récupérables — obsidienne de la coque, purpur, briques d\'end stone',
      'Danger — plusieurs shulkers gardent le pont et la cale, dans un espace très étroit au-dessus du vide'
    ],
    note: 'Toutes les cités n\'ont pas de navire : si vous n\'en voyez pas, poursuivez vers l\'extérieur plutôt que de fouiller la même île. Les élytres se réparent avec des membranes de phantom sur une enclume, ou définitivement avec Raccommodage : posez cet enchantement dessus avant de commencer à voler sérieusement.'
  }
];

var ADVANCEMENTS = [

  /* ---------------- ONGLET MINECRAFT (SURWORLD) ---------------- */
  {
    nom: 'C\'est chaud (Hot Stuff)', cat: 'surworld',
    tags: [{ txt: 'Onglet Minecraft', cls: 'ok' }, { txt: 'Facile', cls: '' }],
    ou: 'Remplir un seau de lave. Le clic droit doit viser une source de lave, pas un courant.',
    drops: [
      'Prérequis — 3 lingots de fer pour le seau',
      'Où trouver la lave — lacs de lave sous Y 0, deltas de lave du Nether, ou coulée de flanc de montagne ; la source est le bloc immobile, en haut de la coulée',
      'Piège — un seau de lave dans la barre d\'accès rapide vous tue si un squelette vous fait tomber dedans ; rangez-le hors de la main'
    ],
    note: 'Un seau de lave est le meilleur combustible du jeu : il cuit 100 objets dans un four, contre 8 pour une bûche. Gardez-en un en réserve avant même de penser au succès.'
  },
  {
    nom: 'Le défi du seau d\'eau glacée (Ice Bucket Challenge)', cat: 'surworld',
    tags: [{ txt: 'Onglet Minecraft', cls: 'ok' }, { txt: 'Facile', cls: '' }],
    ou: 'Obtenir un bloc d\'obsidienne dans son inventaire.',
    drops: [
      'Prérequis — une pioche en diamant et une source d\'eau (l\'obsidienne ne se casse pas autrement)',
      'Méthode — versez de l\'eau sur une source de lave : le bloc se transforme en obsidienne (un courant de lave donne de la pierre, pas de l\'obsidienne)',
      'Alternative sans minage — les portails ruinés en contiennent déjà plusieurs blocs posés',
      'Piège — récupérez l\'eau au seau avant de miner, sinon vous tombez dans la lave restante'
    ],
    note: 'Coulez votre obsidienne en une seule fois : posez 10 blocs de sable en U autour d\'un puits de lave, versez l\'eau, et vous obtenez un cadre de portail complet sans faire d\'aller-retour.'
  },
  {
    nom: 'Des diamants ! (Diamonds!)', cat: 'surworld',
    tags: [{ txt: 'Onglet Minecraft', cls: 'ok' }, { txt: 'Facile', cls: '' }],
    ou: 'Récupérer un diamant, quelle qu\'en soit la provenance.',
    drops: [
      'Prérequis — une pioche en fer minimum, sinon le minerai ne lâche rien',
      'Meilleure altitude — Y -59 : c\'est là que la génération de diamants est la plus dense, juste au-dessus de la couche de bedrock',
      'Méthode — creusez un tunnel de 1×2 en ligne droite sur des centaines de blocs, avec des embranchements tous les 3 blocs',
      'Sans miner — coffres du forgeron d\'outils au village, temple du désert, mine abandonnée, cité de l\'End'
    ],
    note: 'Le minerai de diamant exposé à l\'air libre dans les grottes profondes est bien plus rentable que le minage aveugle : explorez d\'abord les grottes de pierre des profondeurs avec une potion de Vision nocturne, vous couvrirez dix fois plus de blocs à l\'heure.'
  },
  {
    nom: 'Il faut creuser plus profond (We Need to Go Deeper)', cat: 'surworld',
    tags: [{ txt: 'Onglet Minecraft', cls: 'ok' }, { txt: 'Facile', cls: '' }],
    ou: 'Construire un portail du Nether, l\'allumer et le franchir.',
    drops: [
      'Prérequis — 10 blocs d\'obsidienne (les coins sont facultatifs) et un briquet',
      'Sans pioche en diamant — coulez le portail : posez un moule de blocs quelconques, versez de la lave dans chaque case, puis de l\'eau par-dessus',
      'Sans briquet — un briquet se trouve dans les coffres de portail ruiné, ou allumez le portail avec une boule de feu de ghast, un feu de lave voisin ou un lanceur de charge ignée',
      'Piège — notez les coordonnées de votre portail : un retour mal placé crée un second portail à l\'autre bout du monde'
    ],
    note: 'Avant de franchir le portail, entourez-le côté Nether de blocs pleins : vous arriverez souvent en plein territoire de ghasts, et un portail détruit par une boule de feu vous laisse coincé.'
  },
  {
    nom: 'Enchanteur (Enchanter)', cat: 'surworld',
    tags: [{ txt: 'Onglet Minecraft', cls: 'ok' }, { txt: 'Moyen', cls: 'gold' }],
    ou: 'Fabriquer une table d\'enchantement et l\'utiliser pour enchanter un objet.',
    drops: [
      'Prérequis — 4 blocs d\'obsidienne, 2 diamants, 1 livre',
      'Puissance maximale — 15 étagères posées à 2 blocs de la table, en anneau, avec un espace d\'air entre les étagères et la table',
      'Coût — chaque enchantement demande des niveaux ET du lapis-lazuli (jusqu\'à 3 par enchantement)',
      'Rentabilité — enchantez des livres plutôt que des outils : un livre s\'applique ensuite à l\'objet de votre choix sur une enclume'
    ],
    note: 'Enchantez toujours une houe ou un objet sans valeur en premier quand les trois propositions sont mauvaises : cela « re-tire » les enchantements affichés pour vos objets suivants, à moindres frais.'
  },
  {
    nom: 'Couvert de diamants (Cover Me with Diamonds)', cat: 'surworld',
    tags: [{ txt: 'Onglet Minecraft', cls: 'ok' }, { txt: 'Moyen', cls: 'gold' }],
    ou: 'Porter simultanément casque, plastron, jambières et bottes en diamant.',
    drops: [
      'Prérequis — 24 diamants au total (5 + 8 + 7 + 4)',
      'Économie — passez par un commerce : un armurier villageois de haut niveau vend des pièces en diamant enchantées contre des émeraudes',
      'Ordre conseillé — plastron puis jambières d\'abord : ce sont les deux pièces qui absorbent le plus de dégâts',
      'Piège — la pomme d\'or enchantée ne remplace pas l\'armure : sans Inébranlable, une armure en diamant s\'use vite'
    ],
    note: 'Ne posez pas encore Protection IV sur des pièces en diamant si vous visez la netherite : l\'amélioration en netherite conserve les enchantements, donc enchantez d\'abord, améliorez ensuite — mais l\'inverse gaspille des niveaux si vous refondez l\'armure.'
  },
  {
    nom: 'Docteur zombie (Zombie Doctor)', cat: 'surworld',
    tags: [{ txt: 'Onglet Minecraft', cls: 'ok' }, { txt: 'Moyen', cls: 'gold' }],
    ou: 'Affaiblir puis soigner un villageois zombifié.',
    drops: [
      'Prérequis — une potion jetable de Faiblesse et une pomme d\'or ordinaire',
      'Kit gratuit — le sous-sol d\'igloo fournit exactement les deux : la potion est dans l\'alambic, la pomme dans le coffre',
      'Brassage — verrue du Nether non nécessaire : eau + œil d\'araignée fermenté donne la Faiblesse, + poudre à canon pour la version jetable',
      'Méthode — jetez la potion aux pieds du zombie villageois, puis clic droit avec la pomme d\'or : il tremble et se soigne en 2 à 5 minutes',
      'Sécurité — enfermez-le derrière des blocs ou des portes AVANT le soin, sinon il brûle au lever du jour'
    ],
    note: 'Un villageois soigné garde une remise permanente et massive sur tous ses échanges, cumulable pour chaque soin. C\'est le seul moyen d\'obtenir des livres enchantés à 1 émeraude : soignez le même villageois plusieurs fois en le laissant se refaire zombifier.'
  },
  {
    nom: 'À vue d\'œil (Eye Spy)', cat: 'surworld',
    tags: [{ txt: 'Onglet Minecraft', cls: 'ok' }, { txt: 'Moyen', cls: 'gold' }],
    ou: 'Pénétrer dans une forteresse (stronghold).',
    drops: [
      'Prérequis — des yeux de l\'Ender : 1 perle de l\'Ender + 1 poudre de blaze chacun',
      'Méthode — lancez un œil, suivez-le en courant, relancez quand il ralentit ; quand il plonge vers le sol, la forteresse est en dessous',
      'Quantité — 15 yeux minimum : un lancer sur cinq brise l\'œil, et il en faudra jusqu\'à 12 pour le portail',
      'Astuce de triangulation — deux lancers depuis deux points éloignés de 100 blocs permettent de croiser les trajectoires et d\'éviter les allers-retours'
    ],
    note: 'Les perles s\'obtiennent aussi en troquant de l\'or avec les piglins : si les endermen vous coûtent trop cher en équipement, un stock de 40 lingots d\'or suffit souvent à réunir de quoi faire les yeux.'
  },
  {
    nom: 'La Fin ? (The End?)', cat: 'surworld',
    tags: [{ txt: 'Onglet Minecraft', cls: 'ok' }, { txt: 'Moyen', cls: 'gold' }],
    ou: 'Franchir le portail de l\'End dans la salle du portail d\'une forteresse.',
    drops: [
      'Prérequis — compléter les 12 cadres avec des yeux de l\'Ender (certains en contiennent déjà un)',
      'Piège — ne cassez jamais un cadre : il est indestructible en survie et un portail incomplet reste inutilisable',
      'Le générateur de poissons d\'argent surveille l\'escalier : éclairez-le ou cassez-le avant de préparer votre équipement',
      'Préparation — la traversée est à sens unique tant que le dragon n\'est pas mort : emportez arc, flèches, blocs, seau d\'eau, pioche et nourriture'
    ],
    note: 'Posez un lit et une caisse à côté du portail avant d\'entrer, et dormez : votre point de réapparition sera dans la forteresse, à quelques pas du portail, ce qui transforme une mort dans l\'End en simple contretemps.'
  },

  /* ---------------- ONGLET LE NETHER ---------------- */
  {
    nom: 'Une terrible forteresse (A Terrible Fortress)', cat: 'nether',
    tags: [{ txt: 'Onglet Nether', cls: 'red' }, { txt: 'Facile', cls: '' }],
    ou: 'Entrer dans une forteresse du Nether.',
    drops: [
      'Repérage — les forteresses génèrent en longues bandes : parcourez le Nether en ligne droite plein est ou plein ouest, pas en cercles',
      'Vue dégagée — les mers de lave et les vallées de sable des âmes offrent la meilleure visibilité pour repérer les ponts',
      'Sécurité — bâtissez un tunnel de blocs sur votre trajet : les ghasts tirent de très loin en terrain découvert',
      'Piège — une forteresse peut recouper un bastion : vérifiez la pierre noire avant de vous croire en terrain connu'
    ],
    note: 'Placez un portail de secours dès que vous trouvez la forteresse (10 obsidiennes + briquet). Vous y reviendrez pour la verrue du Nether, les bâtons de blaze et les crânes de squelette wither : autant ne plus jamais refaire le trajet.'
  },
  {
    nom: 'Dans le feu (Into Fire)', cat: 'nether',
    tags: [{ txt: 'Onglet Nether', cls: 'red' }, { txt: 'Moyen', cls: 'gold' }],
    ou: 'Récupérer un bâton de blaze.',
    drops: [
      'Prérequis — trouver un générateur de blazes dans une forteresse du Nether',
      'Équipement — potion de Résistance au feu (elle annule totalement les projectiles de blaze), bouclier, armure sans enchantement de vie aquatique',
      'Arme surprenante — les boules de neige infligent des dégâts aux blazes : une pile de neige tassée récoltée en montagne équivaut à une arme à distance gratuite',
      'Combat — placez-vous à couvert derrière un mur de 2 blocs : le blaze doit vous voir pour tirer',
      'Butin — comptez 2 bâtons de blaze par blaze avec Butin III ; chaque bâton donne 2 poudres'
    ],
    note: 'Emmurez le générateur avec des dalles pendant que vous préparez le combat : les blazes n\'apparaissent que sur des blocs pleins, et une simple couronne de dalles autour du générateur suspend les apparitions sans le casser.'
  },
  {
    nom: 'Brasserie locale (Local Brewery)', cat: 'nether',
    tags: [{ txt: 'Onglet Nether', cls: 'red' }, { txt: 'Facile', cls: '' }],
    ou: 'Récupérer une potion dans un alambic.',
    drops: [
      'Prérequis — alambic (1 bâton de blaze + 3 pierres), fioles en verre, poudre de blaze comme combustible',
      'Base obligatoire — la verrue du Nether transforme la fiole d\'eau en potion étrange, point de départ de presque toutes les recettes',
      'Première potion utile — Résistance au feu (crème de magma) : elle rend le Nether presque sûr',
      'Duplication — la poudre à canon rend une potion jetable, la poudre lumineuse renforce l\'effet, la redstone l\'allonge'
    ],
    note: 'Replantez la verrue du Nether chez vous, sur du sable des âmes ramené de la forteresse : elle pousse sans lumière ni eau, et une parcelle de 3×3 suffit à alimenter toute une partie.'
  },
  {
    nom: 'Retour à l\'envoyeur (Return to Sender)', cat: 'nether',
    tags: [{ txt: 'Onglet Nether', cls: 'red' }, { txt: 'Moyen', cls: 'gold' }],
    ou: 'Tuer un ghast avec sa propre boule de feu.',
    drops: [
      'Méthode — frappez la boule de feu au corps à corps (ou d\'une flèche) au moment où elle arrive : elle repart dans l\'axe de votre visée',
      'Placement — visez le ghast AVANT de frapper : la boule suit la direction de votre curseur, pas sa trajectoire d\'origine',
      'Sécurité — restez sur un sol plein, jamais au bord d\'une mer de lave : le recul de l\'explosion est le vrai danger',
      'Alternative — un renvoi réussi tue le ghast en un coup, ce qui donne aussi le succès « Qui épluche des oignons ? » si une larme tombe'
    ],
    note: 'Les ghasts sont bien plus faciles à renvoyer dans les vallées de sable des âmes, dégagées et plates : approchez à environ 20 blocs, attendez le tir, et frappez sans bouger la souris.'
  },
  {
    nom: 'Alliance difficile (Uneasy Alliance)', cat: 'nether',
    tags: [{ txt: 'Onglet Nether', cls: 'red' }, { txt: 'Difficile', cls: 'red' }],
    ou: 'Ramener un ghast dans le Surworld et l\'y tuer.',
    drops: [
      'Contrainte — le ghast mesure 4 blocs : un portail standard est trop petit, il faut un cadre dont l\'intérieur fait au moins 5×5',
      'Méthode — construisez le grand portail près d\'une zone où un ghast dérive, puis tirez-le dedans avec une canne à pêche',
      'Variante — creusez un tunnel large qui force le ghast à dériver vers le portail, en bouchant les échappatoires',
      'Piège — un ghast passé côté Surworld tire aussi sur votre base : combattez-le loin de vos constructions',
      'Sécurité — le ghast doit mourir dans le Surworld, pas dans le portail : achevez-le à l\'arc une fois de l\'autre côté'
    ],
    note: 'Emportez la canne à pêche ET des blocs pour combler le sol autour du portail : un ghast tiré au ras du sol reste bloqué contre les blocs et se laisse pousser dans le portail sans repartir en altitude.'
  },
  {
    nom: 'C\'était le bon temps (Those Were the Days)', cat: 'nether',
    tags: [{ txt: 'Onglet Nether', cls: 'red' }, { txt: 'Moyen', cls: 'gold' }],
    ou: 'Entrer dans un bastion.',
    drops: [
      'Repérage — grande masse de pierre noire, souvent avec des blocs d\'or visibles et des chaînes suspendues',
      'Préparation — portez une pièce d\'armure en or : les piglins ordinaires deviennent neutres (les brutes, non)',
      'Danger — n\'ouvrez aucun coffre et ne minez aucun or dans le champ de vision d\'un piglin, sous peine d\'hostilité générale',
      'Bastion et forteresse peuvent se recouper : la pierre noire signale le bastion, les briques rouges la forteresse'
    ],
    note: 'Repérez le bastion, entrez d\'un pas pour valider le succès, puis ressortez préparer un vrai raid : un bastion mal abordé coûte plus cher en équipement qu\'il ne rapporte.'
  },
  {
    nom: 'Caché dans les profondeurs (Hidden in the Depths)', cat: 'nether',
    tags: [{ txt: 'Onglet Nether', cls: 'red' }, { txt: 'Moyen', cls: 'gold' }],
    ou: 'Obtenir un bloc de débris antiques.',
    drops: [
      'Altitude — les débris antiques sont les plus fréquents autour de Y 15 dans le Nether (également présents entre Y 8 et Y 22)',
      'Outil — pioche en diamant obligatoire ; le bloc résiste aux explosions et ne brûle pas',
      'Méthode « lit » — poser et utiliser un lit dans le Nether provoque une explosion : creusez un tunnel à Y 15, posez le lit dans un renfoncement et déclenchez à couvert',
      'Méthode TNT — plus sûre et répétable : alignez des blocs de TNT dans un tunnel, la roche saute et les débris restent visibles',
      'Sans minage — les coffres des bastions au trésor en contiennent régulièrement'
    ],
    note: 'Emportez une potion de Résistance au feu AVANT de creuser à Y 15 : à cette profondeur, une poche de lave est presque garantie, et c\'est elle, pas les monstres, qui fait perdre les stocks de débris.'
  },
  {
    nom: 'Couvert de débris (Cover Me in Debris)', cat: 'nether',
    tags: [{ txt: 'Onglet Nether', cls: 'red' }, { txt: 'Difficile', cls: 'red' }],
    ou: 'Porter simultanément les quatre pièces d\'armure en netherite.',
    drops: [
      'Coût total — 16 débris antiques et 16 lingots d\'or : 4 débris cuits donnent 4 morceaux, plus 4 lingots d\'or, pour 1 lingot de netherite ; il en faut 4',
      'Modèle obligatoire — le modèle de forge « amélioration en netherite » ne se trouve que dans les bastions',
      'Duplication du modèle — 1 modèle + 7 blocs de netherrack + 1 diamant : dupliquez-le avant de commencer',
      'Ordre — enchantez l\'armure en diamant D\'ABORD, puis améliorez-la : les enchantements sont conservés et vous économisez des niveaux',
      'Avantages — l\'armure en netherite flotte sur la lave, ne brûle pas et donne une résistance au recul'
    ],
    note: 'Ne jetez jamais un lingot de netherite au sol par erreur : il ne brûle pas dans le feu ni dans la lave, donc un objet perdu dans une coulée est toujours récupérable — contrairement à tout le reste de votre inventaire.'
  },
  {
    nom: 'Squelette effrayant (Spooky Scary Skeleton)', cat: 'nether',
    tags: [{ txt: 'Onglet Nether', cls: 'red' }, { txt: 'Difficile', cls: 'red' }],
    ou: 'Obtenir une tête de squelette wither.',
    drops: [
      'Source unique — les squelettes wither, qui n\'apparaissent que dans le volume d\'une forteresse du Nether',
      'Taux — environ 2,5 % par squelette, porté à 5,5 % avec Butin III : c\'est le seul vrai levier',
      'Combat — le squelette wither mesure 3 blocs : un couloir de 2 blocs de haut l\'empêche d\'entrer et vous laisse frapper à l\'épée',
      'Effet Wither — le lait annule l\'effet ; le bouclier bloque l\'épée en pierre du squelette',
      'Rendement — comptez 40 à 60 squelettes pour un crâne, donc une plateforme dégagée dans la forteresse plutôt qu\'un combat de couloir'
    ],
    note: 'Nettoyez une grande salle de la forteresse et éclairez tout SAUF le sol de briques du Nether : les squelettes wither continuent d\'apparaître sur la structure jusqu\'à un niveau de lumière relativement élevé, et vous les récoltez sans jamais courir après.'
  },
  {
    nom: 'Les hauteurs du Wither (Withering Heights)', cat: 'nether',
    tags: [{ txt: 'Onglet Nether', cls: 'red' }, { txt: 'Difficile', cls: 'red' }],
    ou: 'Invoquer le Wither.',
    drops: [
      'Recette — 4 blocs de sable des âmes (ou de terre des âmes) en T, puis 3 têtes de squelette wither posées sur la barre du haut',
      'Explosion d\'invocation — le Wither détruit tout autour de lui à l\'apparition : ne l\'invoquez jamais près de votre base',
      'Lieu sûr — un caisson de bedrock au plafond du Nether, ou un caisson d\'obsidienne dans l\'End où le dragon ne gêne plus',
      'Combat — le Wither est immunisé aux flèches en dessous de la moitié de sa vie : gardez une épée en netherite et des potions de Force',
      'Récompense — l\'étoile du Nether, l\'unique ingrédient de la balise'
    ],
    note: 'Le Wither ne peut pas casser la bedrock ni l\'obsidienne pleureuse. Un piège classique consiste à l\'invoquer dans un tunnel de bedrock du plafond du Nether de 2 blocs de haut, où il reste coincé et se laisse frapper sans jamais voler.'
  },
  {
    nom: 'Balisateur (Beaconator)', cat: 'nether',
    tags: [{ txt: 'Onglet Nether', cls: 'red' }, { txt: 'Marathon', cls: 'purple' }],
    ou: 'Construire une balise à pleine puissance : pyramide complète de quatre niveaux sous la balise.',
    drops: [
      'Balise — 1 étoile du Nether + 3 blocs d\'obsidienne + 5 blocs de verre',
      'Pyramide complète — 164 blocs pleins : 81 + 49 + 25 + 9, en fer, or, diamant, émeraude ou netherite (mélangeables)',
      'Le moins cher — 164 blocs de fer, soit 1 476 lingots : une ferme à golems de fer est le seul moyen réaliste d\'y arriver',
      'Effets — Célérité II et Vitesse II au niveau 4, plus un second effet au choix, sur un rayon de 50 blocs',
      'Prérequis lumineux — la colonne au-dessus de la balise doit rester dégagée jusqu\'au ciel (le verre et l\'eau ne bloquent pas le faisceau)'
    ],
    note: 'Montez la pyramide en fer et gardez vos blocs de diamant pour la couche du haut, seule visible : le jeu ne fait aucune différence de puissance selon le matériau, uniquement selon le nombre de blocs.'
  },
  {
    nom: 'Comment on en est arrivés là ? (How Did We Get Here?)', cat: 'nether',
    tags: [{ txt: 'Onglet Nether', cls: 'red' }, { txt: 'Le plus dur du jeu', cls: 'purple' }],
    ou: 'Avoir tous les effets de statut obtenables en même temps.',
    drops: [
      'Préparation — c\'est une opération logistique : il faut une trentaine d\'effets simultanés, dont plusieurs ne durent que quelques secondes',
      'Lieu idéal — au bord d\'un monument océanique (Fatigue de minage par un gardien ancien, Grâce du dauphin, Puissance du conduit), à portée d\'un village (Héros du village) et d\'une balise (Célérité, Vitesse, Résistance, Force, Saut)',
      'Effets pièges — Lévitation (shulker enfermé dans une boîte à côté de vous), Nausée (poisson-globe), Cécité et Saturation (soupe suspecte), Luminescence (flèche spectrale tirée par un ami ou un lanceur)',
      'Potions à préparer — Poison, Régénération, Force, Vitesse, Lenteur, Faiblesse, Chute lente, Vision nocturne, Invisibilité, Respiration aquatique, Résistance au feu, Bonus de vie, Absorption (pomme d\'or)',
      'Ordre — commencez par les effets longs (potions allongées, balise), gardez Lévitation, Wither et Nausée pour la fin',
      'Astuce multijoueur — un second joueur avec un lanceur de potions et un arc à flèches spectrales divise la difficulté par deux'
    ],
    note: 'Écrivez la liste des effets sur un livre et cochez-les : l\'échec vient presque toujours d\'un effet court expiré pendant qu\'on en applique un autre. Faites tourner les potions allongées en dernier recours et gardez les plus brèves à portée de main dans la barre d\'accès rapide.'
  },

  /* ---------------- ONGLET L'END ---------------- */
  {
    nom: 'Libérer la Fin (Free the End)', cat: 'end',
    tags: [{ txt: 'Onglet End', cls: 'purple' }, { txt: 'Boss', cls: 'red' }],
    ou: 'Tuer le dragon de l\'End.',
    drops: [
      'Étape 1 — détruisez les cristaux au sommet des piliers d\'obsidienne : ceux qui sont en cage doivent être atteints à la main, les autres à l\'arc',
      'Étape 2 — le dragon perd sa régénération une fois tous les cristaux détruits',
      'Étape 3 — frappez-le à l\'épée quand il se pose sur le portail central, à l\'arc quand il vole',
      'Équipement — arc puissant, une centaine de flèches, blocs pour monter, seau d\'eau (il annule les dégâts de chute), pioche, lit posé côté forteresse',
      'Souffle du dragon — le nuage violet inflige des dégâts continus : ne restez jamais dans la zone après un passage',
      'Récompense — environ 12 000 points d\'expérience, l\'œuf de dragon et le portail de sortie qui ouvre les îles extérieures'
    ],
    note: 'Un seau d\'eau posé à vos pieds annule tous les dégâts de chute quand le dragon vous projette du haut d\'un pilier. C\'est l\'objet qui sauve le plus de tentatives, bien avant les potions.'
  },
  {
    nom: 'Il te faudrait un bonbon à la menthe (You Need a Mint)', cat: 'end',
    tags: [{ txt: 'Onglet End', cls: 'purple' }, { txt: 'À faire avant le combat', cls: 'gold' }],
    ou: 'Récupérer du souffle du dragon dans une fiole en verre.',
    drops: [
      'Fenêtre de tir — le dragon doit être VIVANT : une fois tué, il faut le réinvoquer pour recommencer',
      'Méthode — clic droit avec une fiole en verre dans le nuage violet laissé par son attaque au sol',
      'Utilité — le souffle du dragon transforme une potion jetable en potion persistante (nuage au sol)',
      'Quantité — emportez une dizaine de fioles : les potions persistantes sont chères en souffle'
    ],
    note: 'Faites-le au tout début du combat, pendant que le dragon est encore à pleine vie et se pose souvent : chercher à récupérer le souffle en fin de combat, avec deux cœurs restants, est le meilleur moyen de tout perdre.'
  },
  {
    nom: 'La génération suivante (The Next Generation)', cat: 'end',
    tags: [{ txt: 'Onglet End', cls: 'purple' }, { txt: 'Technique', cls: 'gold' }],
    ou: 'Ramasser l\'œuf de dragon apparu au sommet du portail de sortie.',
    drops: [
      'Piège — frapper l\'œuf le téléporte à quelques blocs au hasard, souvent dans le vide',
      'Méthode fiable — creusez sous l\'œuf, posez une torche (ou une dalle) à 2 blocs en dessous, puis cassez le bloc porteur : l\'œuf tombe sur la torche et se casse en objet',
      'Méthode piston — un piston qui pousse l\'œuf le transforme aussi en objet à ramasser',
      'Unique — il n\'y a qu\'un seul œuf par monde, sauf à réinvoquer le dragon (qui en fait alors réapparaître un)'
    ],
    note: 'Bouchez le trou central du portail de sortie avant toute manipulation : la majorité des œufs perdus tombent dans le portail et se retrouvent renvoyés au centre de l\'île — ou dans le vide.'
  },
  {
    nom: 'La Fin... encore... (The End... Again...)', cat: 'end',
    tags: [{ txt: 'Onglet End', cls: 'purple' }, { txt: 'Moyen', cls: 'gold' }],
    ou: 'Réinvoquer le dragon de l\'End.',
    drops: [
      'Recette — 4 cristaux de l\'End, chacun composé de 7 blocs de verre, 1 œil de l\'Ender et 1 larme de ghast',
      'Placement — un cristal sur chacun des quatre côtés du portail de sortie',
      'Effet — les piliers d\'obsidienne se régénèrent avec leurs cristaux, et le dragon revient (avec beaucoup moins d\'expérience à la clé)',
      'Intérêt — refaire le combat pour du souffle de dragon, un second œuf ou simplement le succès'
    ],
    note: 'Chaque réinvocation régénère aussi les cages de fer autour des cristaux des piliers : si vous comptez recommencer plusieurs fois, cassez les cages une bonne fois et emportez de quoi tirer à l\'arc, sinon vous refaites l\'escalade à chaque tour.'
  },
  {
    nom: 'Escapade lointaine (Remote Getaway)', cat: 'end',
    tags: [{ txt: 'Onglet End', cls: 'purple' }, { txt: 'Facile', cls: '' }],
    ou: 'Franchir une passerelle de l\'End (end gateway) vers les îles extérieures.',
    drops: [
      'Apparition — une petite passerelle flottante apparaît près du centre après la mort du dragon',
      'Méthode — lancez une perle de l\'Ender dans le bloc central de la passerelle : vous êtes téléporté à environ 1 000 blocs de l\'île centrale',
      'Sécurité — arrivez avec des blocs : la sortie peut se trouver au-dessus du vide, et il faut se rattraper immédiatement',
      'Retour — la même passerelle fonctionne dans les deux sens'
    ],
    note: 'Posez un bloc sous la passerelle de sortie et notez ses coordonnées dès l\'arrivée : sans repère, retrouver la passerelle depuis une île extérieure est le principal moyen de rester bloqué dans l\'End.'
  },
  {
    nom: 'La cité au bout du monde (The City at the End of the Game)', cat: 'end',
    tags: [{ txt: 'Onglet End', cls: 'purple' }, { txt: 'Moyen', cls: 'gold' }],
    ou: 'Entrer dans une cité de l\'End.',
    drops: [
      'Localisation — uniquement sur les îles extérieures ; elles se densifient à mesure qu\'on s\'éloigne du centre',
      'Déplacement — perles de l\'Ender pour franchir les vides entre les îles, ou ponts de blocs (l\'end stone se mine vite)',
      'Repérage — les tours de purpur violettes tranchent nettement sur l\'end stone jaune, y compris de nuit',
      'Danger — shulkers postés aux portes et aux terrasses : Lévitation puis chute dans le vide'
    ],
    note: 'Suivez toujours la même direction cardinale en quittant la passerelle : les îles de l\'End s\'alignent en bandes, et zigzaguer fait passer à côté de dizaines de cités. Marquez votre route avec des tours de blocs visibles.'
  },
  {
    nom: 'Le ciel est la limite (Sky\'s the Limit)', cat: 'end',
    tags: [{ txt: 'Onglet End', cls: 'purple' }, { txt: 'Objet clé', cls: 'gold' }],
    ou: 'Récupérer une paire d\'élytres.',
    drops: [
      'Emplacement unique — dans un cadre d\'objet, au fond de la cale d\'un navire de l\'End',
      'Toutes les cités n\'ont pas de navire : continuez vers l\'extérieur plutôt que de fouiller deux fois la même île',
      'Accès — le navire flotte à l\'écart : passerelle de blocs ou perle de l\'Ender',
      'Réparation — membranes de phantom sur une enclume, ou Raccommodage pour une réparation définitive à l\'expérience',
      'Vol — les fusées de feu d\'artifice sans étoile propulsent les élytres : 1 papier + 1 poudre à canon en donne 3'
    ],
    note: 'Posez Raccommodage sur vos élytres avant votre premier vol longue distance : sans lui, chaque atterrissage raté coûte des membranes de phantom, qui exigent de passer trois nuits sans dormir pour faire apparaître les phantoms.'
  },
  {
    nom: 'Belle vue d\'ici (Great View From Up Here)', cat: 'end',
    tags: [{ txt: 'Onglet End', cls: 'purple' }, { txt: 'Technique', cls: 'gold' }],
    ou: 'Monter de 50 blocs sous l\'effet de Lévitation infligé par un shulker.',
    drops: [
      'Contrainte — un seul tir de shulker ne fait monter que d\'une dizaine de blocs : il faut être touché plusieurs fois de suite',
      'Méthode — enfermez-vous dans un puits vertical de 1×1 en bordure d\'une cité, avec un shulker au pied : ses projectiles suivent votre position et vous relancent en continu',
      'Alternative — restez dans une pièce où plusieurs shulkers tirent simultanément, sans les tuer',
      'Sécurité — Chute lente ou un bloc d\'eau au sol : la retombée après 50 blocs est mortelle',
      'Ne bouchez pas le plafond : la montée doit être libre sur toute la hauteur'
    ],
    note: 'Emportez un shulker vivant est impossible, mais vous pouvez déplacer le combat : bouchez les fenêtres d\'une tour de cité et creusez un puits vertical à côté du shulker. C\'est bien plus rapide que d\'attendre le bon enchaînement en pleine terrasse.'
  },

  /* ---------------- ONGLET AVENTURE ---------------- */
  {
    nom: 'Exil volontaire (Voluntary Exile)', cat: 'aventure',
    tags: [{ txt: 'Onglet Aventure', cls: 'gold' }, { txt: 'Facile', cls: '' }],
    ou: 'Tuer un capitaine de raid : un pillard portant une bannière de mauvais présage sur la tête.',
    drops: [
      'Où — au sommet ou aux abords d\'un avant-poste de pillards, ou à la tête d\'une patrouille en pleine campagne',
      'Récompense — la bannière de mauvais présage, et depuis la 1.21 une fiole de mauvais présage',
      'Attention — boire la fiole (ou recevoir l\'effet dans les versions antérieures) déclenche un raid dès l\'entrée dans un village',
      'Sécurité — tuez le capitaine à l\'arc depuis une tour : les arbalètes des pillards font mal en groupe'
    ],
    note: 'Faites-le AVANT de préparer votre village : une fois le capitaine tué, vous choisissez le moment du raid en décidant quand boire la fiole, ce qui vous laisse le temps de fortifier et de préparer les golems.'
  },
  {
    nom: 'Héros du village (Hero of the Village)', cat: 'aventure',
    tags: [{ txt: 'Onglet Aventure', cls: 'gold' }, { txt: 'Difficile', cls: 'red' }],
    ou: 'Remporter un raid : vaincre toutes les vagues de pillards attaquant un village.',
    drops: [
      'Déclenchement — entrer dans un village avec l\'effet Mauvais présage (fiole bue depuis la 1.21)',
      'Adversaires — pillards, vindicateurs, évocateurs, ravageurs et sorcières, en 3 à 7 vagues selon la difficulté et le niveau de présage',
      'Préparation — murez le village, éclairez tout, gardez plusieurs golems de fer, un lit pour le point de réapparition et des potions de Force',
      'Positionnement — combattez dans une cour fermée d\'où les villageois ne peuvent pas sortir : un villageois tué annule le village',
      'Ravageur — le seul à casser les feuillages et à traverser les clôtures ; bouclier obligatoire',
      'Récompense — l\'effet Héros du village donne d\'énormes remises sur tous les échanges pendant 40 minutes'
    ],
    note: 'Lancez le raid juste avant une grosse session de commerce : sous Héros du village, des objets à 30 émeraudes tombent à quelques unités. C\'est le meilleur moment pour acheter les livres enchantés et les armures de vos villageois.'
  },
  {
    nom: 'Post-mortel (Postmortal)', cat: 'aventure',
    tags: [{ txt: 'Onglet Aventure', cls: 'gold' }, { txt: 'Moyen', cls: 'gold' }],
    ou: 'Utiliser un totem d\'immortalité pour survivre à une mort certaine.',
    drops: [
      'Source — les évocateurs, au manoir des bois ou dans les vagues de raid : chacun en lâche un à coup sûr',
      'Condition — le totem doit être tenu en main principale ou en main secondaire au moment du coup fatal',
      'Effet — vous revenez à un demi-cœur avec Régénération II, Absorption II et Résistance au feu',
      'Méthode contrôlée — tenez le totem, puis laissez-vous tomber d\'une hauteur maîtrisée ou entrez dans le feu'
    ],
    note: 'Gardez un totem en main secondaire en permanence dès que vous en avez plusieurs : il n\'occupe pas l\'emplacement du bouclier pendant l\'exploration au pic, et il annule à lui seul les morts par lave ou par creeper.'
  },
  {
    nom: 'Duel de snipers (Sniper Duel)', cat: 'aventure',
    tags: [{ txt: 'Onglet Aventure', cls: 'gold' }, { txt: 'Technique', cls: 'gold' }],
    ou: 'Tuer un squelette à 50 blocs de distance ou plus, à l\'arc.',
    drops: [
      'Prérequis — un arc, idéalement avec Puissance, et une flèche qui achève la cible à cette distance',
      'Mesure — appuyez sur F3 et comparez les coordonnées : 50 blocs sur un seul axe, c\'est la distance la plus simple à vérifier',
      'Terrain — une falaise, une tour de 50 blocs ou un désert plat de nuit ; la portée maximale d\'un tir chargé est d\'environ 64 blocs',
      'Astuce — visez légèrement au-dessus de la cible : la flèche décrit un arc sur cette distance',
      'Attention — un squelette qui meurt du soleil ou d\'une chute ne compte pas : le coup fatal doit venir de votre flèche'
    ],
    note: 'Le plus simple est de construire une plateforme au-dessus d\'une ferme à monstres et de tirer sur les squelettes en contrebas : la distance verticale compte, et vous avez des cibles en continu sans les chercher.'
  },
  {
    nom: 'Arbalistique (Arbalistic)', cat: 'aventure',
    tags: [{ txt: 'Onglet Aventure', cls: 'gold' }, { txt: 'Difficile', cls: 'red' }],
    ou: 'Tuer cinq créatures d\'espèces différentes d\'un seul tir d\'arbalète.',
    drops: [
      'Prérequis absolu — l\'enchantement Transpercement V (Piercing) : sans lui, la flèche s\'arrête à la première cible',
      'Contrainte — il faut cinq ESPÈCES différentes : zombie, squelette, creeper, araignée, sorcière… un alignement de cinq zombies ne compte pas',
      'Méthode — affaiblissez cinq monstres à un demi-cœur (chute contrôlée ou dégâts d\'eau), alignez-les dans un couloir d\'un bloc de large et tirez dans l\'axe',
      'Ferme utile — une ferme à monstres classique fournit quatre espèces ; ajoutez une sorcière ou un noyé capturé en bateau',
      'Alternative — un chariot de mine ou un bateau permet de transporter chaque créature une par une jusqu\'au couloir de tir'
    ],
    note: 'Utilisez des chariots de mine plutôt que des bateaux pour aligner les cibles : un monstre en chariot ne bouge plus, et vous pouvez placer les cinq chariots exactement dans l\'axe avant de charger l\'arbalète.'
  },
  {
    nom: 'Très très effrayant (Very Very Frightening)', cat: 'aventure',
    tags: [{ txt: 'Onglet Aventure', cls: 'gold' }, { txt: 'Technique', cls: 'gold' }],
    ou: 'Frapper un villageois avec un trident à Canalisation pendant un orage.',
    drops: [
      'Prérequis — un trident (butin des noyés qui en portent un) et l\'enchantement Canalisation',
      'Météo — il faut un ORAGE, pas une simple pluie : le ciel s\'assombrit et le tonnerre gronde',
      'Ciel ouvert — le villageois doit être exposé au ciel, sans bloc au-dessus',
      'Conséquence — la foudre transforme le villageois en sorcière : utilisez un villageois sans métier, pas votre meilleur commerçant',
      'Astuce — un villageois placé dans un bateau reste immobile et bien visible'
    ],
    note: 'Gardez un villageois « de réserve » en bateau sur le toit de votre base : dès qu\'un orage éclate, le succès se boucle en dix secondes, sans avoir à courir après un villageois sous la pluie.'
  },
  {
    nom: 'Discrétion 100 (Sneak 100)', cat: 'aventure',
    tags: [{ txt: 'Onglet Aventure', cls: 'gold' }, { txt: 'Facile', cls: '' }],
    ou: 'Passer accroupi à côté d\'un capteur sculk ou d\'un hurleur sans qu\'il vous détecte.',
    drops: [
      'Où — le biome Deep Dark, une cité antique, ou n\'importe quel capteur ramené chez vous',
      'Récupération — les capteurs et hurleurs sculk exigent le Toucher de soie pour tomber en objet',
      'Méthode — posez le capteur, accroupissez-vous et déplacez-vous lentement à moins de 8 blocs : aucune vibration ne doit se déclencher',
      'Piège — jeter un objet, poser un bloc ou frapper émet une vibration même accroupi'
    ],
    note: 'L\'enchantement Marche silencieuse (Swift Sneak), trouvable uniquement dans les coffres des cités antiques, supprime la lenteur de l\'accroupissement : c\'est lui, plus que le succès, qui rend le Deep Dark praticable.'
  },
  {
    nom: 'Sous clé (Under Lock and Key) / Coffre-fort sinistre (Revaulting)', cat: 'aventure',
    tags: [{ txt: 'Onglet Aventure', cls: 'gold' }, { txt: '1.21+', cls: 'copper' }],
    ou: 'Ouvrir un coffre-fort avec une clé d\'épreuve, puis un coffre-fort sinistre avec une clé sinistre.',
    drops: [
      'Où — les chambres d\'épreuve, dans la couche de pierre des profondeurs',
      'Clé d\'épreuve — lâchée par un générateur d\'épreuve après avoir vaincu toutes ses vagues',
      'Clé sinistre — même chose, mais après avoir bu une fiole de mauvais présage : les générateurs deviennent sinistres et le butin monte d\'un cran',
      'Fiole de mauvais présage — obtenue en tuant un capitaine de pillards',
      'Limite — chaque coffre-fort ne s\'ouvre qu\'une fois par joueur et ne se réinitialise jamais : prévoyez plusieurs chambres',
      'Butin phare — le noyau lourd (heavy core) des coffres-forts sinistres, qui sert à fabriquer la masse'
    ],
    note: 'Buvez la fiole de mauvais présage AVANT d\'entrer dans la chambre, jamais après avoir vidé les générateurs normaux : un générateur déjà vaincu ne se transforme pas, et vous perdez à la fois la fiole et le potentiel de la salle.'
  },
  {
    nom: 'Surpuissance (Over-Overkill)', cat: 'aventure',
    tags: [{ txt: 'Onglet Aventure', cls: 'gold' }, { txt: 'Technique', cls: 'gold' }],
    ou: 'Infliger 100 points de dégâts en un seul coup de masse (soit 50 cœurs).',
    drops: [
      'Prérequis — une masse : 1 noyau lourd (coffre-fort sinistre des chambres d\'épreuve) + 1 bâton de breeze',
      'Principe — les dégâts de la masse augmentent avec la hauteur de chute au moment de l\'impact',
      'Méthode — bâtissez une tour de plusieurs dizaines de blocs au-dessus d\'une cible qui ne meurt pas trop vite, puis frappez en tombant',
      'Enchantement Densité — augmente fortement les dégâts par bloc de chute : il réduit nettement la hauteur nécessaire',
      'Bonus — un coup de masse en chute annule vos propres dégâts de chute',
      'Cible conseillée — un mob à grande réserve de vie (ravageur, gardien ancien) plutôt qu\'un zombie qui meurt avant le calcul'
    ],
    note: 'Combinez Densité et une chute lancée depuis une plateforme construite avec des blocs d\'échafaudage : ils se démontent en un clic et vous n\'aurez pas à redescendre à pied entre deux essais.'
  },
  {
    nom: 'Monstres chassés (Monsters Hunted)', cat: 'aventure',
    tags: [{ txt: 'Onglet Aventure', cls: 'gold' }, { txt: 'Marathon', cls: 'purple' }],
    ou: 'Tuer au moins un exemplaire de chaque créature hostile du jeu.',
    drops: [
      'Boss inclus — dragon de l\'End, Wither et gardien ancien font partie de la liste',
      'Les plus oubliés — endermite (5 % de chance à chaque perle de l\'Ender lancée), zoglin (un hoglin ramené dans le Surworld), phantom (trois nuits sans dormir), évocateur et vindicateur (manoir des bois ou raid)',
      'Les plus rares — warden (cité antique), poisson d\'argent (blocs infestés d\'une forteresse ou d\'une montagne), creaking (bois pâle)',
      'Nether — piglin brute, hoglin, blaze, ghast, cube de magma, squelette wither, piglin zombifié',
      'Océan — gardien, gardien ancien, noyé ; les variantes de squelettes (stray, bogged) et de zombies (husk) comptent séparément',
      'Chaque version ajoute des créatures : vérifiez la liste dans l\'onglet du jeu, elle affiche précisément ce qui manque'
    ],
    note: 'Ouvrez l\'écran des succès et survolez l\'icône : le jeu liste nommément les créatures encore manquantes. Cela évite de refaire une cité antique alors qu\'il ne vous manquait qu\'un endermite.'
  },
  {
    nom: 'L\'heure de l\'aventure (Adventuring Time)', cat: 'aventure',
    tags: [{ txt: 'Onglet Aventure', cls: 'gold' }, { txt: 'Marathon', cls: 'purple' }],
    ou: 'Visiter tous les biomes du Surworld (plus de quarante).',
    drops: [
      'Validation — il suffit d\'entrer dans le biome : la ligne « Biome » de l\'écran F3 confirme celui où vous vous trouvez',
      'Les plus difficiles — champs de champignons, pics de glace, Deep Dark, grottes luxuriantes, grottes de dripstone, bosquet de cerisiers, marais de mangrove',
      'Variantes à ne pas confondre — badlands / badlands boisés / badlands érodés, jungle / jungle clairsemée / jungle de bambous, taïga / vieille taïga (sapins) / vieille taïga (épicéas)',
      'Montagnes — prairie, bosquet, pentes enneigées, pics déchiquetés, pics gelés, pics pierreux : six biomes distincts sur un même massif',
      'Méthode — élytres et fusées, en suivant les côtes ; les biomes rares sont presque toujours en bord d\'océan ou en altitude',
      'Grottes — les grottes luxuriantes se repèrent aux lianes de baies lumineuses qui pendent du plafond, les grottes de dripstone au bruit d\'égouttement'
    ],
    note: 'Faites ce succès en même temps que la recherche d\'un manoir des bois et d\'une cité antique : ces deux structures exigent de toute façon de survoler des milliers de blocs, et vous cocherez la moitié des biomes manquants en chemin.'
  },

  /* ---------------- ONGLET ÉLEVAGE ---------------- */
  {
    nom: 'Deux par deux (Two by Two)', cat: 'elevage',
    tags: [{ txt: 'Onglet Élevage', cls: 'ok' }, { txt: 'Marathon', cls: 'purple' }],
    ou: 'Reproduire chaque espèce d\'animal reproductible du jeu.',
    drops: [
      'Nourriture par espèce — blé (vache, mouton, chèvre), graines (poule), carotte ou pomme de terre (cochon), os puis viande (loup), poisson cru (chat et ocelot), pomme d\'or ou carotte dorée (cheval, âne), foin (lama), herbes marines (tortue), bambou (panda), baies sucrées (renard), fleurs (abeille)',
      'Nether — hoglin (champignon écarlate) et strider (champignon déformé) : les deux se reproduisent sur place, inutile de les ramener',
      'Aquatique — axolotl : uniquement avec un seau de poisson tropical',
      'Grenouille — boules de slime, et il faut de l\'eau pour que les têtards éclosent',
      'Sniffer — deux œufs issus du sable suspect des ruines sous-marines chaudes, ou une graine de tourbe reniflée',
      'Faux amis — les mulets ne se reproduisent pas et ne comptent pas ; l\'ocelot et le chat comptent séparément'
    ],
    note: 'Construisez un enclos unique compartimenté près de votre base et amenez-y les animaux avec des laisses et des bateaux : les allers-retours entre biomes coûtent bien plus de temps que la reproduction elle-même. Les tortues, elles, doivent pondre sur la plage de sable où elles sont nées.'
  },
  {
    nom: 'Un régime équilibré (A Balanced Diet)', cat: 'elevage',
    tags: [{ txt: 'Onglet Élevage', cls: 'ok' }, { txt: 'Marathon', cls: 'purple' }],
    ou: 'Manger tous les aliments du jeu, y compris ceux qui vous rendent malade.',
    drops: [
      'Le vrai blocage — la pomme d\'or enchantée, qui ne se craft plus : coffres de bastion, de portail ruiné, de temple du désert, de mine abandonnée et de cité antique',
      'Aliments oubliés — pomme de terre empoisonnée, poisson-globe, œil d\'araignée, chair putréfiée, fruit du chorus, kelp séché, baies lumineuses, soupe suspecte',
      'À préparer — soupe de champignons, ragoût de lapin, soupe de betteraves, tarte à la citrouille, gâteau, biscuits, carotte dorée, melon luisant (non comestible : à ne pas confondre)',
      'Astuce — mangez à faim quasi pleine ne fonctionne pas : videz votre barre de faim en courant, sinon les aliments ne s\'utilisent pas',
      'Suivi — l\'écran des succès liste précisément les aliments restants'
    ],
    note: 'La faim est la vraie contrainte : chaque aliment doit être réellement consommé. Sprintez ou nagez entre deux bouchées, et gardez les aliments à faible saturation (chair putréfiée, biscuit) pour enchaîner plus vite.'
  },
  {
    nom: 'Un catalogue complet (A Complete Catalogue)', cat: 'elevage',
    tags: [{ txt: 'Onglet Élevage', cls: 'ok' }, { txt: 'Difficile', cls: 'red' }],
    ou: 'Apprivoiser les onze variantes de chat.',
    drops: [
      'Source — les chats errants apparaissent dans les villages, à raison d\'environ un pour quatre lits, avec une variante aléatoire',
      'Variante noire — n\'apparaît QUE dans une hutte de sorcière, en marais : elle est obligatoire pour le succès',
      'Apprivoisement — approchez lentement, accroupi, et tendez du poisson cru (cabillaud ou saumon) sans bouger',
      'Multiplier les variantes — visitez plusieurs villages : les chats d\'un même village ne se renouvellent pas, mais un village plus grand en fait apparaître davantage',
      'Reproduction — deux chats apprivoisés nourris au poisson donnent un chaton dont la variante est celle d\'un des parents : cela ne crée pas de nouvelle variante'
    ],
    note: 'Ajoutez des lits dans un village pour augmenter le nombre de chats errants qu\'il fait apparaître : c\'est bien plus rapide que de chercher un nouveau village pour chaque couleur manquante.'
  },
  {
    nom: 'Soyez notre invité (Bee Our Guest)', cat: 'elevage',
    tags: [{ txt: 'Onglet Élevage', cls: 'ok' }, { txt: 'Facile', cls: '' }],
    ou: 'Remplir une bouteille de miel dans une ruche pleine sans mettre les abeilles en colère.',
    drops: [
      'Prérequis — une ruche ou un nid au niveau 5 (du miel déborde visiblement des alvéoles)',
      'Méthode sans colère — posez un feu de camp SOUS la ruche (avec une trappe ou une dalle pour que la fumée ne brûle rien)',
      'Sans feu de camp — récolter met toutes les abeilles de la ruche en colère, y compris à la ruche déplacée',
      'Récolte — clic droit avec une fiole en verre pour le miel, cisailles pour les rayons de miel',
      'Déplacer une ruche — Toucher de soie : les abeilles restent dedans si elles y sont rentrées la nuit'
    ],
    note: 'Le feu de camp doit être sous la ruche, jamais à côté sans écran : sa fumée brûle les fleurs et met le feu aux abeilles. Une trappe ou une dalle placée entre les deux règle le problème définitivement.'
  },
  {
    nom: 'Pêche tactique (Tactical Fishing)', cat: 'elevage',
    tags: [{ txt: 'Onglet Élevage', cls: 'ok' }, { txt: 'Facile', cls: '' }],
    ou: 'Capturer un poisson avec un seau d\'eau (et non avec une canne).',
    drops: [
      'Prérequis — un seau rempli d\'eau et un poisson vivant : cabillaud, saumon, poisson-globe ou poisson tropical',
      'Méthode — clic droit avec le seau d\'eau directement sur le poisson : vous obtenez un seau de poisson',
      'Usage — un seau de poisson tropical est le seul moyen de reproduire les axolotls',
      'Bonus — relâcher un poisson d\'un seau le fixe à cet endroit : il ne despawn plus'
    ],
    note: 'Faites le plein de seaux de poissons tropicaux pendant que vous êtes en océan chaud : c\'est la ressource limitante des axolotls, et retourner chercher des poissons plus tard coûte bien plus de temps qu\'un détour de dix minutes.'
  },
  {
    nom: 'Le pouvoir guérisseur de l\'amitié (The Healing Power of Friendship)', cat: 'elevage',
    tags: [{ txt: 'Onglet Élevage', cls: 'ok' }, { txt: 'Technique', cls: 'gold' }],
    ou: 'Faire équipe avec un axolotl et gagner un combat : recevoir l\'effet Régénération d\'un axolotl qui vient de tuer une cible.',
    drops: [
      'Prérequis — un axolotl (grottes luxuriantes, dans l\'eau, sous de l\'argile) transporté dans un seau',
      'Cible — l\'axolotl doit tuer une créature aquatique hostile : noyé ou gardien',
      'Méthode — videz plusieurs axolotls près d\'un monument océanique ou d\'un groupe de noyés, puis participez au combat',
      'Bonus — un axolotl qui joue le mort récupère sa vie et attire l\'attention des gardiens à votre place',
      'Attention — les axolotls attaquent tout ce qui est aquatique, y compris vos poissons d\'ornement'
    ],
    note: 'Lâchez trois ou quatre axolotls d\'un coup : un seul se fait souvent tuer par les gardiens avant d\'avoir achevé sa cible, alors qu\'un groupe finit systématiquement le travail et vous donne la Régénération en quelques secondes.'
  },
  {
    nom: 'Tu as un ami en moi (You\'ve Got a Friend in Me)', cat: 'elevage',
    tags: [{ txt: 'Onglet Élevage', cls: 'ok' }, { txt: 'Technique', cls: 'gold' }],
    ou: 'Dupliquer un allay.',
    drops: [
      'Où trouver un allay — en cage dans un avant-poste de pillards ou dans une salle du manoir des bois',
      'Prérequis — un juke-box en train de jouer un disque, et un éclat d\'améthyste',
      'Méthode — l\'allay doit danser près du juke-box ; donnez-lui alors l\'éclat d\'améthyste : il se dédouble',
      'Délai — la duplication a un temps de recharge de quelques minutes par allay',
      'Utilité — un allay ramasse tous les objets identiques à celui qu\'on lui donne et les rapporte à son point de dépôt : c\'est le meilleur système de tri de récolte du jeu'
    ],
    note: 'Doublez vos allays AVANT de bâtir votre ferme : le juke-box et une pile d\'éclats d\'améthyste suffisent à passer de 2 à 16 allays en une soirée, et chaque duplication supplémentaire est ensuite gratuite.'
  },
  {
    nom: 'Dévouement sérieux (Serious Dedication)', cat: 'elevage',
    tags: [{ txt: 'Onglet Élevage', cls: 'ok' }, { txt: 'Coûteux', cls: 'red' }],
    ou: 'Améliorer une houe en netherite sur la table de forge.',
    drops: [
      'Coût — 1 houe en diamant (2 diamants) + 1 lingot de netherite (4 débris antiques et 4 lingots d\'or) + le modèle d\'amélioration',
      'Modèle — l\'amélioration en netherite se trouve uniquement dans les coffres des bastions ; dupliquez-le (7 netherrack + 1 diamant)',
      'Bilan — la houe en netherite n\'apporte presque rien en jeu : c\'est un succès de prestige, d\'où son nom',
      'Astuce — faites-le avec le 5e lingot de netherite, une fois votre armure et vos outils terminés'
    ],
    note: 'Si vous tenez à ce que la dépense serve à quelque chose, mettez Fortune III sur la houe avant l\'amélioration : elle sert alors à récolter les baies lumineuses, les lianes de pleurs et le verre luisant du Nether à haut rendement.'
  },
  {
    nom: 'Toute la meute (The Whole Pack)', cat: 'elevage',
    tags: [{ txt: 'Onglet Élevage', cls: 'ok' }, { txt: 'Marathon', cls: 'purple' }],
    ou: 'Apprivoiser une variante de chaque pelage de loup.',
    drops: [
      'Principe — chaque variante de loup est liée à un biome précis : forêt, taïga, vieille taïga, savane, badlands, pics enneigés, forêt de bouleaux, bosquet, marais',
      'Apprivoisement — donnez des os jusqu\'aux cœurs ; comptez une dizaine d\'os par loup en moyenne',
      'Transport — laisse plus bateau : un loup apprivoisé suit son maître mais se perd en terrain accidenté',
      'Repérage — la couleur du pelage se voit immédiatement : inutile d\'apprivoiser deux fois la même',
      'Sécurité — une armure de loup (écailles d\'armadillo) évite de perdre un loup rare en chemin'
    ],
    note: 'Notez les coordonnées des biomes visités pendant « L\'heure de l\'aventure » : les deux succès demandent exactement les mêmes déplacements, et un loup apprivoisé peut rester sur place (assis) le temps que vous reveniez le chercher en bateau.'
  }
];

