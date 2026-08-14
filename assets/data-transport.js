/* ============================================================
   Données : se déplacer et s'orienter (Java Edition)
   ---------------------------------------------------------------
   Le chaînon manquant du guide : comment aller d'un point à un
   autre, et comment savoir où l'on est. Chaque fiche donne une
   vitesse ou une portée, le coût réel de la mise en place, et la
   limite qui décide de l'usage.

   Les infrastructures déjà décrites ailleurs ne sont pas répétées :
     · « Réseau de transport du Nether » → page Usines (nether-hub)
     · « Ascenseur à bulles »            → page Usines (ascenseur)

   Trois jeux de données :
     TRANSPORT           → fiches rendues par renderEntry()
     COMPARATIF_VITESSE  → lignes de tableau (fillTable)
     ORIENTATION         → lignes de tableau (fillTable)
   ============================================================ */

var TRANSPORT = [

  /* ---------------- À PIED ---------------- */
  {
    nom: 'Marche, sprint et saut', cat: 'pied',
    tags: [{ txt: '4,317 blocs/s', cls: 'ok' }, { txt: 'Mètre étalon', cls: '' }],
    ou: 'Toutes les vitesses du jeu se comparent à celle-ci : avant d\'investir dans un rail ou une élytre, sachez ce que vaut votre propre pas.',
    drops: [
      'Marche — 4,317 blocs par seconde, et aucune faim dépensée',
      'Sprint — 5,612 blocs par seconde, soit environ 30 % de plus',
      'Faim minimale pour sprinter — 6 points, soit 3 cuisses restantes',
      'Sprint sauté — encore plus rapide, mais c\'est l\'action la plus coûteuse en faim du jeu',
      'Hauteur de saut — 1 bloc et quart : on monte une marche, jamais deux',
      'Le saut de 4 — un sprint-saut franchit un vide de 3 blocs de large',
      'Ce qui freine — s\'accroupir, l\'eau, la neige poudreuse, le miel et le sable des âmes'
    ],
    note: 'Sprinter en permanence échange de la nourriture contre 30 % de vitesse. Sur un long trajet c\'est rentable ; en exploration de grotte, marchez et gardez la barre pleine pour la régénération.'
  },
  {
    nom: 'Effet Rapidité', cat: 'pied',
    tags: [{ txt: '+20 % par niveau', cls: 'purple' }],
    ou: 'Le seul moyen d\'accélérer la marche elle-même, en potion pour un trajet ou en balise pour un chantier.',
    drops: [
      'Rapidité I — +20 % de vitesse ; Rapidité II — +40 %',
      'Potion de Vitesse — verrue du Nether puis sucre : 3 minutes, 8 avec de la redstone',
      'Version II — pierre lumineuse dans la potion, mais la durée tombe à 1 min 30',
      'Balise — Rapidité I dès 9 blocs de fer, effet sur 20 blocs autour',
      'Pyramide complète — 164 blocs, portée 50 blocs et accès à Rapidité II',
      'Cumul — l\'effet s\'ajoute au sprint et à la glissade sur la glace',
      'Sans effet — sur un bateau, un wagonnet ou une élytre, la Rapidité ne change rien'
    ],
    note: 'Une balise Rapidité II posée au centre d\'un gros chantier fait gagner plus de temps qu\'aucun véhicule : tous les allers-retours vers les coffres sont raccourcis de 40 %.'
  },
  {
    nom: 'Glace, glace compactée et glace bleue au sol', cat: 'pied',
    tags: [{ txt: 'Sol le plus glissant', cls: 'cyan' }],
    ou: 'Les trois glaces réduisent le frottement du sol : on accélère longtemps, et on ne freine plus du tout.',
    drops: [
      'Trois blocs — la glace normale fond, la compactée et la bleue jamais',
      'Glace bleue — la plus glissante des trois, et de loin',
      'Fonte — la glace normale disparaît dès qu\'une lumière de niveau 12 l\'éclaire',
      'À pied — on va plus vite mais on dépasse les virages : prévoyez des murets',
      'Fabrication — 9 glaces font 1 glace compactée, 9 compactées 1 glace bleue, soit 81 glaces',
      'Récolte — les icebergs des océans gelés contiennent de la glace bleue native',
      'Toucher de soie — obligatoire, sinon la glace se casse en eau ou en rien'
    ],
    note: 'Au sol, la glace sert surtout de piste pour un bateau : à pied, l\'inertie coûte plus de temps qu\'elle n\'en fait gagner. Voir la fiche « Autoroute de glace bleue en bateau ».'
  },
  {
    nom: 'Sable des âmes et Âme rapide', cat: 'pied',
    tags: [{ txt: 'Nether', cls: 'red' }, { txt: 'Troc uniquement', cls: 'gold' }],
    ou: 'Le sol qui ralentit tout le monde peut devenir le plus rapide du jeu, avec le bon enchantement de bottes.',
    drops: [
      'Sable des âmes — ralentit fortement tout ce qui marche dessus, joueur compris',
      'Terre des âmes — elle ne ralentit pas, mais Âme rapide y fonctionne aussi',
      'Âme rapide — enchantement de bottes I à III, obtenu par troc avec les piglins',
      'Niveau III — sur ces blocs, on avance plus vite que sur un sol normal',
      'Coût caché — l\'enchantement use les bottes à chaque pas : Raccommodage indispensable',
      'Usage réel — paver un couloir du Nether en sable des âmes et le parcourir en courant',
      'Effet secondaire — sous l\'eau, ce bloc crée une colonne de bulles montante'
    ],
    note: 'Les monstres subissent le ralentissement, pas vous : un seuil de sable des âmes devant une porte donne le temps de frapper deux fois avant d\'être touché.'
  },
  {
    nom: 'Échelles, vignes et échafaudage', cat: 'pied',
    tags: [{ txt: 'Verticalité', cls: '' }],
    ou: 'Trois façons de monter à pied, qui ne servent pas du tout aux mêmes moments : chantier, accès définitif, ou dépannage gratuit.',
    drops: [
      'Échelle — 7 bâtons pour 3 échelles, montée d\'environ 2 blocs par seconde',
      'Descente contrôlée — accroupi, on reste collé à l\'échelle sans tomber',
      'Vigne — gratuite et infinie, mais lente et envahissante',
      'Échafaudage — 6 bambous et 1 ficelle pour 6 blocs',
      'Conduite — on monte en sautant dedans, on descend en restant accroupi',
      'Porte-à-faux — un échafaudage tient environ 6 blocs à l\'horizontale avant de tomber',
      'Démontage — casser le bloc du bas fait tomber toute la colonne d\'un coup',
      'Chute — atterrir sur un échafaudage annule les dégâts, sur une échelle non'
    ],
    note: 'L\'échafaudage est l\'outil de chantier : une colonne de 30 blocs se monte et se retire en quelques secondes. L\'échelle reste pour les accès permanents, avec une trappe en haut pour boucher le puits.'
  },
  {
    nom: 'Perle de l\'Ender et fruit de chorus', cat: 'pied',
    tags: [{ txt: 'Téléportation', cls: 'purple' }],
    ou: 'Les deux seuls objets qui déplacent instantanément le joueur : l\'un se vise, l\'autre tire au hasard.',
    drops: [
      'Perle de l\'Ender — vous téléporte exactement là où elle retombe',
      'Prix du voyage — 5 points de dégâts, soit 2,5 cœurs, à chaque arrivée',
      'Recharge — environ 1 seconde entre deux jets',
      'Portée — quelques dizaines de blocs au mieux, selon l\'angle de tir',
      'Passe-muraille — une perle glissée dans une ouverture de 1 bloc vous fait franchir un mur',
      'Parachute — une perle lancée en pleine chute remet la distance de chute à zéro',
      'Fruit de chorus — téléportation aléatoire dans un cube de 8 blocs, et 4 points de faim rendus',
      'Arrivée sûre — le chorus ne dépose jamais dans la roche, seulement sur un sol libre'
    ],
    note: 'Gardez toujours deux perles dans la barre rapide : elles sortent d\'un ravin, d\'un piège à sable ou d\'une chute mortelle pour 2,5 cœurs, ce qu\'aucun autre objet ne fait.'
  },

  /* ---------------- MONTURES ---------------- */
  {
    nom: 'Cheval : lire ses statistiques', cat: 'monture',
    tags: [{ txt: '4,7 à 14,2 blocs/s', cls: 'gold' }, { txt: 'Selle obligatoire', cls: '' }],
    ou: 'Deux chevaux identiques à l\'écran vont du simple au triple : tout se joue sur trois valeurs tirées au hasard à la naissance.',
    drops: [
      'Vitesse — de 4,74 à 14,23 blocs par seconde selon l\'individu',
      'Saut — de 1,1 à 5,3 blocs de haut, de quoi franchir un mur d\'enceinte',
      'Points de vie — de 15 à 30 ; la robe n\'indique strictement rien',
      'Sélection — montez tout le troupeau et comparez sur la même ligne droite',
      'Élevage — le poulain tire entre ses deux parents, plus un troisième tirage',
      'Accouplement — carotte dorée ou pomme dorée pour chacun des deux parents',
      'Selle — coffres de structure, pêche, troc avec les piglins ou bourrelier',
      'Armure de cheval — fer, or ou diamant ; elle se trouve, elle ne se fabrique pas'
    ],
    note: 'Testez le saut avant la vitesse : un cheval qui passe 4 blocs franchit murs et falaises, ce qui fait gagner plus de temps que 2 blocs/s de mieux. Et attachez-le, sinon il finit dans un ravin.'
  },
  {
    nom: 'Bêtes de somme : âne, mulet et lama', cat: 'monture',
    tags: [{ txt: 'Coffres mobiles', cls: 'copper' }],
    ou: 'Trois montures lentes dont l\'intérêt n\'est pas la vitesse mais le nombre d\'emplacements qu\'elles emportent.',
    drops: [
      'Âne et mulet — un coffre leur ajoute 15 emplacements',
      'Mulet — croisement d\'un âne et d\'un cheval, définitivement stérile',
      'Coffre posé — impossible à retirer sans tuer la bête',
      'Lama — de 3 à 15 emplacements selon sa force, tirée au hasard',
      'Caravane — attachez un lama en laisse et une dizaine suivent en file',
      'Défense — le lama crache sur ce qui l\'attaque et tient les loups à distance',
      'Tapis — un tapis de couleur sert de code visuel dans un troupeau',
      'Vitesse — toutes ces bêtes restent plus lentes qu\'un bon cheval'
    ],
    note: 'La caravane de lamas est le déménagement de début de partie : dix lamas emportent l\'équivalent de plusieurs coffres sans un seul lingot de fer, là où un rail coûte des centaines de lingots.'
  },
  {
    nom: 'Cochon et strider : les montures à perche', cat: 'monture',
    tags: [{ txt: 'Selle + canne', cls: '' }, { txt: 'Lave', cls: 'red' }],
    ou: 'Deux montures dirigées de la même façon : une selle sur le dos, et une canne à pêche améliorée dans la main.',
    drops: [
      'Carotte au bout d\'un bâton — canne à pêche et carotte, environ 25 utilisations',
      'Cochon — à peine plus rapide que la marche : c\'est une curiosité, pas un transport',
      'Champignon tordu au bout d\'un bâton — même recette, une centaine d\'utilisations',
      'Strider — la seule créature qui marche sur la lave, et il la traverse sans dégâts',
      'Hors de la lave — le strider grelotte, vire au violet et ralentit fortement',
      'Réparation — une carotte ou un champignon sur l\'enclume remet la perche à neuf',
      'Laisse — un strider se mène à pied jusqu\'au lac suivant',
      'Deux places — un strider adulte porte un joueur et un petit strider'
    ],
    note: 'Un lac de lave du Nether se traverse en strider pour le prix d\'une selle, là où un pont coûte des centaines de blocs et une bonne heure. Emportez toujours de quoi rentrer si le strider meurt.'
  },
  {
    nom: 'Chameau', cat: 'monture',
    tags: [{ txt: 'Deux cavaliers', cls: 'ok' }, { txt: 'Hors de portée', cls: 'gold' }],
    ou: 'Grande monture des villages du désert : lente au pas, mais elle place le cavalier au-dessus de tout ce qui frappe au corps à corps.',
    drops: [
      'Où le trouver — dans les villages du désert, et nulle part ailleurs',
      'Deux cavaliers — un second joueur monte derrière vous',
      'Hauteur — zombies, squelettes et araignées au sol ne vous atteignent pas',
      'Enjambement — il passe par-dessus barrières et murets sans sauter',
      'Bond — la touche de saut déclenche un élan en avant, avec un temps de recharge',
      'Position assise — un chameau assis ne bouge plus et met un temps à se relever',
      'Allure — lent au pas, bien plus intéressant lancé',
      'Selle — la même que pour un cheval, et elle est obligatoire'
    ],
    note: 'C\'est la monture de traversée à deux : on ne se bat pas depuis un cheval, on se bat très bien depuis un chameau puisque le corps à corps ne monte pas jusqu\'à vous. Les archers, eux, tirent toujours.'
  },
  {
    nom: 'Le bateau hors de l\'eau', cat: 'monture',
    tags: [{ txt: '5 planches', cls: 'ok' }],
    ou: 'Un bateau posé au sol reste pilotable : presque inutile à plat, il devient irremplaçable sur la glace et pour déplacer une créature.',
    drops: [
      'Coût — 5 planches, soit un tronc et demi',
      'Sur terre — quasi immobile à plat, correct en descente',
      'Sur la glace — il devient le véhicule le plus rapide du jeu',
      'Deux places — vous, plus un passager ou une créature poussée dedans',
      'Déménagement — la façon la plus simple de déplacer un villageois sur terre',
      'Rails — un bateau n\'y monte pas, les deux réseaux ne se mélangent jamais',
      'Lave — un bateau brûle instantanément, contrairement au strider',
      'Récupération — cassez-le, il redevient un objet dans l\'inventaire'
    ],
    note: 'Un bateau dans un couloir de 1 bloc de large reste la méthode la plus fiable pour amener un villageois à quelques centaines de blocs, sans rail, sans wagonnet et sans redstone.'
  },

  /* ---------------- RAILS ---------------- */
  {
    nom: 'Les quatre rails et ce qu\'ils coûtent', cat: 'rail',
    tags: [{ txt: 'Fer et or', cls: 'copper' }],
    ou: 'Une ligne complète ne se compose que de quatre pièces ; le budget se calcule avant de poser le premier bloc, pas après.',
    drops: [
      'Rail — 6 lingots de fer et 1 bâton pour 16 rails ; le seul qui fait des virages',
      'Rail motorisé — 6 lingots d\'or, 1 bâton et 1 redstone pour 6 rails',
      'Rail détecteur — 6 fers, 1 plaque de pression en pierre et 1 redstone pour 6',
      'Rail activateur — 6 fers, 2 bâtons et 1 torche de redstone pour 6',
      'Budget réel — environ 375 lingots de fer pour 1 000 blocs de voie, l\'or en plus',
      'Motorisé non alimenté — il freine le wagonnet jusqu\'à l\'arrêt complet',
      'Comparaison — une piste de glace bleue coûte des blocs à récolter, pas du minerai'
    ],
    note: 'Le rail ne se justifie que pour ce qu\'un bateau ne sait pas faire : monter, traverser une base, transporter du fret tout seul. Pour aller vite en ligne droite, la glace bleue gagne toujours.'
  },
  {
    nom: 'Rails motorisés : espacement et pentes', cat: 'rail',
    tags: [{ txt: '8 blocs/s', cls: 'gold' }],
    ou: 'Le rail motorisé ne rend pas le wagonnet plus rapide, il l\'empêche de ralentir : tout le réglage tient dans son espacement.',
    drops: [
      'Vitesse plafond — 8 blocs par seconde, quel que soit le nombre de rails dorés',
      'À plat — un rail motorisé tous les 8 blocs entretient la vitesse sans réfléchir',
      'Ligne optimisée — avec un joueur à bord, l\'écart peut monter à une trentaine de blocs',
      'En montée — un rail motorisé tous les 2 à 3 blocs, sinon le wagonnet recule',
      'En descente — aucun rail motorisé n\'est nécessaire, la gravité suffit',
      'Alimentation — un bloc de redstone, une torche ou un levier sous chaque rail doré',
      'Freinage — un rail motorisé volontairement éteint sert de frein en gare'
    ],
    note: 'Posez d\'abord la voie entière en rails simples, puis remplacez un rail sur huit et faites un essai : vous verrez précisément où le convoi ralentit, et vous ne densifierez que là.'
  },
  {
    nom: 'Wagonnet : conduite et limites', cat: 'rail',
    tags: [{ txt: '5 lingots de fer', cls: '' }],
    ou: 'Le véhicule le plus lent à mettre en place du jeu, mais le seul qui monte tout seul et sans effort.',
    drops: [
      'Fabrication — 5 lingots de fer',
      'Vitesse — 8 blocs/s au mieux, à peine plus qu\'un bateau sur l\'eau',
      'Démarrage — poussez-le à la main, ou montez dedans sur un rail motorisé alimenté',
      'Sortie — touche de saut, ou un rail activateur qui éjecte le passager',
      'Virages — chaque courbe coûte de la vitesse, une ligne droite la conserve',
      'Chunks non chargés — un wagonnet lancé seul s\'arrête net hors distance de simulation',
      'Oubli fréquent — un wagonnet laissé sur la voie y reste et bloque le suivant'
    ],
    note: 'Le wagonnet brille sur le vertical et l\'interne : remonter 60 blocs depuis la mine, traverser une base sans croiser un monstre. Sur longue distance à plat, c\'est le prix le plus élevé pour la vitesse la plus faible.'
  },
  {
    nom: 'Wagonnet-coffre et fret automatique', cat: 'rail',
    tags: [{ txt: '27 emplacements', cls: 'copper' }],
    ou: 'C\'est là que le rail devient imbattable : une ligne qui transporte des objets pendant que vous faites autre chose.',
    drops: [
      'Fabrication — 1 wagonnet et 1 coffre',
      'Capacité — 27 emplacements, exactement un coffre simple',
      'Déchargement — un entonnoir placé sous le rail vide le wagonnet qui passe dessus',
      'Chargement — un entonnoir qui pointe vers le rail remplit un wagonnet à l\'arrêt',
      'Wagonnet à entonnoir — il aspire les objets au sol tout au long de la voie',
      'Rail détecteur — il déclenche l\'arrêt, la relance ou un compteur au bon moment',
      'Casse — brisé, le wagonnet-coffre lâche tout son contenu au sol'
    ],
    note: 'Une ligne mine vers base avec un entonnoir à chaque bout se rentabilise dès la deuxième expédition : vous chargez au fond, vous appuyez sur un bouton, et le butin vous attend dans le coffre en surface.'
  },
  {
    nom: 'Station de départ et de retour', cat: 'rail',
    tags: [{ txt: 'Redstone simple', cls: 'ok' }],
    ou: 'Une gare, c\'est trois pièces : un rail motorisé éteint qui retient le wagonnet, un bouton qui l\'alimente, un rail détecteur qui le renvoie.',
    drops: [
      'Poste de départ — wagonnet posé sur un rail motorisé non alimenté, il ne bouge pas',
      'Lancement — un bouton sur le bloc voisin alimente le rail et lance le convoi',
      'Retour automatique — un rail détecteur en bout de ligne renvoie la cabine vide',
      'Arrivée douce — deux rails motorisés éteints avant le butoir arrêtent le wagonnet',
      'Rappel — un levier relié en redstone fait revenir la cabine depuis l\'autre gare',
      'Butoir — un bloc plein en fin de voie évite de finir dans le décor',
      'Signalétique — un panneau avec les coordonnées à chaque quai'
    ],
    note: 'Une gare bien réglée se juge à une chose : on arrive, on entre, on appuie sur un bouton. S\'il faut pousser le wagonnet ou le reposer sur les rails, la station n\'est pas terminée.'
  },

  /* ---------------- EAU ---------------- */
  {
    nom: 'Bateau et bateau-coffre', cat: 'eau',
    tags: [{ txt: '5 planches', cls: 'ok' }, { txt: '≈ 8 blocs/s', cls: 'blue' }],
    ou: 'L\'objet le plus rentable du jeu : cinq planches pour aller nettement plus vite qu\'en sprint, sans dépenser une seule cuisse de poulet.',
    drops: [
      'Fabrication — 5 planches ; le bateau-coffre demande un coffre en plus',
      'Vitesse sur l\'eau — de l\'ordre de 8 blocs par seconde',
      'Gain réel — environ 40 % de plus qu\'un sprint, et la faim ne descend pas',
      'Bateau-coffre — 27 emplacements qui voyagent avec vous',
      'Deux places — un passager, ou une créature poussée à l\'intérieur',
      'Pilotage — on avance surtout tout droit, chaque virage coûte de la vitesse',
      'Nénuphar — il casse le bateau à pleine vitesse : évitez les marais',
      'Rangement — cassé, il ne prend qu\'un emplacement d\'inventaire'
    ],
    note: 'Emportez un bateau dès la première expédition, même sans océan en vue : un lac, une rivière ou un ruisseau suffisent à transformer un détour d\'une minute en dix secondes.'
  },
  {
    nom: 'Autoroute de glace bleue en bateau', cat: 'eau',
    tags: [{ txt: '≈ 70 blocs/s', cls: 'cyan' }, { txt: 'Le plus rapide au sol', cls: 'gold' }],
    ou: 'Un couloir de glace bleue parcouru en bateau est le déplacement le plus rapide du jeu hors élytre, et le seul qui reste fiable au Nether.',
    drops: [
      'Vitesse — environ 70 blocs/s sur glace bleue, environ 40 sur glace compactée',
      'Profil — une gouttière : glace au fond, un bloc plein de chaque côté',
      'Coût — 1 bloc de glace bleue vaut 81 blocs de glace normale',
      'Récolte directe — les icebergs des océans gelés en contiennent nativement',
      'Au Nether — 1 bloc parcouru vaut 8 blocs de surface',
      'Élan — quelques blocs suffisent à lancer le bateau, ensuite on ne freine plus',
      'Tunnel fermé — obligatoire au Nether : voir « Réseau de transport du Nether » (Usines)'
    ],
    note: 'Une seule ligne de glace bleue dans un tunnel du Nether relie deux bases distantes de plusieurs milliers de blocs en moins d\'une minute. C\'est le seul chantier qui rend l\'élytre facultative.'
  },
  {
    nom: 'Courants d\'eau et colonnes de bulles', cat: 'eau',
    tags: [{ txt: '7 blocs par source', cls: 'blue' }],
    ou: 'L\'eau déplace gratuitement joueurs, objets et créatures : c\'est la logistique la moins chère du jeu, à condition de connaître sa portée.',
    drops: [
      'Portée d\'un courant — l\'eau coule sur 7 blocs depuis sa source',
      'Canal continu — une source tous les 8 blocs entretient le courant sans trou',
      'Sens de nage — avec le courant on avance vite, contre lui on n\'avance presque plus',
      'Sable des âmes immergé — colonne de bulles qui pousse vers le haut',
      'Bloc de magma immergé — colonne qui aspire vers le bas',
      'Varech — en poser fige une colonne d\'eau courante en blocs sources',
      'Ascenseur complet — voir la fiche « Ascenseur à bulles » (Usines)'
    ],
    note: 'Un canal d\'eau ne demande qu\'un seau et de la pelle : pour transporter des objets à travers une base, il coûte mille fois moins cher qu\'un rail et ne tombe jamais en panne.'
  },
  {
    nom: 'Conduit : respirer et voir sous l\'eau', cat: 'eau',
    tags: [{ txt: 'Cœur de la mer', cls: 'cyan' }],
    ou: 'Le conduit transforme un chantier sous-marin en chantier normal : plus d\'apnée, plus de brouillard, plus de lenteur de minage.',
    drops: [
      'Fabrication — 1 cœur de la mer entouré de 8 coquilles de nautile',
      'Activation — 16 blocs de prismarine au minimum, en cadre autour du conduit',
      'Puissance maximale — 42 blocs, pour une portée d\'environ 96 blocs',
      'Effet — respiration illimitée, vision sous l\'eau et minage accéléré',
      'Défense — à pleine puissance, il blesse les hostiles aquatiques les plus proches',
      'Cœur de la mer — uniquement dans les coffres au trésor enfouis',
      'Coquilles de nautile — pêche, noyés porteurs et marchand ambulant'
    ],
    note: 'Posez le conduit avant de commencer à creuser un monument ou une base océanique, jamais après : c\'est lui qui rend le chantier possible, pas l\'inverse.'
  },
  {
    nom: 'Nager vite : dauphin, trident, Agilité aquatique', cat: 'eau',
    tags: [{ txt: 'Gratuit', cls: 'ok' }],
    ou: 'La nage nue est plus lente que la marche ; trois solutions la rendent plus rapide qu\'un sprint.',
    drops: [
      'Agilité aquatique III — supprime le frein de l\'eau quand on marche au fond',
      'Grâce du dauphin — un dauphin qui nage à côté de vous accélère fortement la nage',
      'Condition — l\'effet ne s\'applique pas si vous êtes assis dans un bateau',
      'Trident — il ne se fabrique pas, il se prend aux noyés qui en portent un',
      'Propulsion aquatique — elle vous lance dans l\'eau, sous la pluie ou sous la neige',
      'Propulsion III — la poussée la plus longue ; incompatible avec Loyauté et Canalisation',
      'Trident et élytre — sous la pluie, la propulsion sert de décollage immédiat'
    ],
    note: 'La Propulsion aquatique est le seul déplacement rapide vraiment gratuit et illimité : sur un lac ou sous l\'averse, on avance par bonds sans consommer la moindre fusée.'
  }
];
