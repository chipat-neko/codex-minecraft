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
  },

  /* ---------------- AIR ---------------- */
  {
    nom: 'Élytre : durabilité et entretien', cat: 'air',
    tags: [{ txt: '432 points', cls: 'purple' }, { txt: 'Cité de l\'End', cls: '' }],
    ou: 'L\'élytre ne casse jamais vraiment : elle s\'arrête à 1 point de durabilité et refuse simplement de s\'ouvrir jusqu\'à réparation.',
    drops: [
      'Où la trouver — cadre d\'objet d\'un vaisseau de cité de l\'End, gardé par un shulker',
      'Durabilité — 432 points, environ un point par seconde de vol',
      'Membrane de phantom — sur l\'enclume, chacune en restaure environ un quart',
      'Raccommodage — l\'enchantement le plus rentable du jeu sur une élytre',
      'Emplacement — elle occupe la place du plastron : aucune armure de torse en vol',
      'Aucune protection — l\'élytre n\'amortit ni la chute ni les coups',
      'Panne sèche — sans fusée ni relief, il ne reste que la marche'
    ],
    note: 'Avec Raccommodage et une réserve d\'expérience, une élytre ne se répare plus jamais à la main. Sans lui, glissez deux membranes de phantom dans le sac à chaque départ.'
  },
  {
    nom: 'Fusées de feu d\'artifice', cat: 'air',
    tags: [{ txt: 'Carburant du vol', cls: 'gold' }],
    ou: 'La fusée est le seul carburant du vol : sa fabrication décide de la distance que vous pouvez parcourir dans une partie.',
    drops: [
      'Fabrication — 1 papier et 1 à 3 poudres à canon donnent 3 fusées',
      'Durée de poussée — plus il y a de poudre, plus la poussée dure longtemps',
      'Vitesse obtenue — de l\'ordre de 30 blocs par seconde en poussée continue',
      'Consommation — une fusée toutes les quelques secondes en vol soutenu',
      'Étoile de feu d\'artifice — une fusée qui en contient vous blesse en vol',
      'Production — canne à sucre plus ferme à creepers rendent les fusées gratuites',
      'Réserve — une pile de 64 traverse facilement plusieurs milliers de blocs'
    ],
    note: 'Ne décollez jamais au-dessus d\'un océan avec moins d\'une pile de fusées : une élytre à sec au milieu de l\'eau, c\'est plusieurs minutes de nage et souvent un noyé au bout.'
  },
  {
    nom: 'Décoller sans montagne', cat: 'air',
    tags: [{ txt: 'Sol plat', cls: 'ok' }],
    ou: 'On peut lancer un vol depuis un terrain parfaitement plat : il suffit d\'un tremplin, d\'une averse ou d\'une poussée violente.',
    drops: [
      'Saut et fusée — sautez, ouvrez l\'élytre en l\'air, tirez une fusée aussitôt',
      'Tour de décollage — 20 à 30 blocs suffisent pour partir confortablement',
      'Trident et Propulsion — sous la pluie, il vous met en l\'air sans rien construire',
      'Charge de vent — lancée à ses pieds, elle projette vers le haut',
      'Colonne de bulles — un ascenseur à bulles sert aussi de rampe de lancement',
      'Canon à propulsion — TNT ou pistons ; il exige Protection contre les explosions IV',
      'Erreur classique — ouvrir l\'élytre trop près du sol et la refermer aussitôt'
    ],
    note: 'Une tour de décollage de 25 blocs à côté du portail est l\'aménagement le plus rentable d\'une base : chaque départ devient un vol immédiat au lieu d\'une marche jusqu\'au premier relief.'
  },
  {
    nom: 'Vol plané : altitude, angle et distance', cat: 'air',
    tags: [{ txt: 'Sans fusée', cls: 'cyan' }],
    ou: 'Sans fusée, le vol est un échange : on convertit de la hauteur en distance, et l\'angle décide du taux de change.',
    drops: [
      'Principe — chaque bloc d\'altitude perdu se transforme en plusieurs blocs parcourus',
      'Angle optimal — un piqué très léger, presque à l\'horizontale',
      'Piqué franc — vitesse maximale, mais l\'altitude fond à vue d\'œil',
      'Redressement — un piqué suivi d\'une remontée regagne un peu de hauteur',
      'Altitude de croisière — plus haut on part, plus loin on va sans dépenser une fusée',
      'Dégâts cinétiques — percuter un mur en vol blesse proportionnellement à la vitesse',
      'Nether — le plafond de roche rend le vol à la fusée particulièrement dangereux'
    ],
    note: 'Depuis un sommet de montagne, un plané sans une seule fusée franchit plusieurs centaines de blocs. Regardez l\'altimètre avant de sauter : c\'est le Y de départ qui décide de la portée.'
  },
  {
    nom: 'Atterrir sans mourir', cat: 'air',
    tags: [{ txt: 'Cause n° 1 de mort en vol', cls: 'red' }],
    ou: 'L\'élytre ne protège de rien : la fin du vol tue bien plus souvent que le vol lui-même.',
    drops: [
      'Règle de base — l\'élytre n\'annule aucun dégât de chute',
      'Eau — un plan d\'eau annule tout, même sur un seul bloc de profondeur',
      'Seau d\'eau — posé au sol juste avant l\'impact, il fait exactement la même chose',
      'Chute lente — la potion supprime totalement les dégâts de chute',
      'Approche rasante — arriver à plat et frôler le sol efface la vitesse verticale',
      'Fusée de rattrapage — tirée vers le haut, elle sauve une approche trop basse',
      'Ballot de foin — au pied d\'une tour, il absorbe l\'essentiel de la chute'
    ],
    note: 'La mort classique à l\'élytre n\'est pas l\'atterrissage mais le mur : à 30 blocs/s, une colline prise de face fait plus de dégâts qu\'une chute de 20 blocs. Volez au-dessus du relief, jamais dedans.'
  },

  /* ---------------- ORIENTATION ---------------- */
  {
    nom: 'Coordonnées et écran de débogage', cat: 'orientation',
    tags: [{ txt: 'F3', cls: '' }, { txt: 'Gratuit', cls: 'ok' }],
    ou: 'Trois nombres suffisent à ne plus jamais être perdu ; encore faut-il savoir dans quel sens ils augmentent.',
    drops: [
      'XYZ — X est l\'axe est-ouest, Z l\'axe nord-sud, Y l\'altitude',
      'Sens de lecture — X augmente vers l\'est, Z augmente vers le sud',
      'Ligne Facing — elle donne la direction regardée, bien plus fiable que le soleil',
      'Repères d\'altitude — la mer vers Y 62, le diamant le plus dense vers Y −59',
      'F3 + G — affiche les limites de chunks, utile pour aligner une ferme',
      'F3 + C — copie une commande de téléportation vers votre position',
      'Conversion Nether — divisez X et Z par 8 pour trouver le point correspondant'
    ],
    note: 'Notez trois coordonnées et le reste suit : la base, le portail, le dernier point d\'intérêt. Un livre et une plume dans le coffre d\'entrée valent toutes les cartes du monde.'
  },
  {
    nom: 'Boussole, magnétite et boussole de réapparition', cat: 'orientation',
    tags: [{ txt: 'Trois aiguilles', cls: 'gold' }],
    ou: 'Trois boussoles différentes, qui pointent trois choses différentes : le spawn du monde, un bloc que vous avez posé, ou votre dernière mort.',
    drops: [
      'Boussole — 4 lingots de fer et 1 redstone ; elle vise le point d\'apparition du monde',
      'Hors de l\'Overworld — l\'aiguille tourne dans le vide, au Nether comme dans l\'End',
      'Magnétite — 1 lingot de netherite et 8 briques de pierre ciselées',
      'Boussole magnétique — utilisez une boussole sur une magnétite, elle vise ce bloc',
      'Portée — elle fonctionne partout, tant que vous êtes dans la dimension de la magnétite',
      'Boussole de réapparition — 8 éclats d\'écho et 1 boussole (recovery compass)',
      'Éclat d\'écho — dans les coffres des cités antiques, et nulle part ailleurs'
    ],
    note: 'Une magnétite dans le hall et une boussole magnétique en poche remplacent toute la signalétique : où que vous soyez dans la dimension, l\'aiguille montre la maison.'
  },
  {
    nom: 'Carte, agrandissement et verrouillage', cat: 'orientation',
    tags: [{ txt: '5 niveaux de zoom', cls: 'blue' }],
    ou: 'Une carte ne dessine que ce que vous avez parcouru en la tenant ouverte : c\'est un carnet de terrain, pas un satellite.',
    drops: [
      'Carte vierge — 8 papiers autour d\'une boussole',
      'Premier usage — elle se centre définitivement là où vous l\'ouvrez',
      'Cinq niveaux — de 128 × 128 blocs jusqu\'à 2 048 × 2 048 blocs',
      'Agrandir — 1 papier à la table de cartographie, ou 8 sur l\'établi',
      'Copier — carte plus carte vierge ; les copies se mettent à jour ensemble',
      'Verrouiller — une vitre à la table de cartographie fige le dessin pour toujours',
      'Remplissage — seule la zone survolée ou parcourue carte en main apparaît'
    ],
    note: 'Neuf cartes de niveau maximal alignées en 3 × 3 couvrent 6 144 blocs de côté : c\'est le mur de contrôle d\'un monde entier. Remplissez-les d\'un seul vol en quadrillage à l\'élytre.'
  },
  {
    nom: 'Marqueurs de bannière et murs de cartes', cat: 'orientation',
    tags: [{ txt: 'Index du monde', cls: 'purple' }],
    ou: 'Le seul moyen d\'inscrire un nom sur une carte, et donc de transformer un dessin en index consultable.',
    drops: [
      'Marqueur — posez une bannière, puis cliquez dessus avec la carte en main',
      'Couleur et nom — le marqueur reprend la couleur de la bannière et son nom',
      'Renommer — une bannière nommée à l\'enclume affiche son nom sur la carte',
      'Effacer — cassez la bannière, puis rouvrez la carte sur place',
      'Cadre d\'objet — une carte encadrée affiche un repère vert à sa propre position',
      'Mur de cartes — neuf cartes agrandies dans neuf cadres, alignées sans trou',
      'Limite — un marqueur n\'apparaît que sur la carte qui couvre sa zone'
    ],
    note: 'Un marqueur par découverte (village, avant-poste, portail, mine) et la carte devient la mémoire du monde. C\'est la seule qui ne dépende pas de la vôtre après trois semaines sans jouer.'
  },
  {
    nom: 'Repères bâtis et signalétique', cat: 'orientation',
    tags: [{ txt: 'Visible de loin', cls: 'gold' }],
    ou: 'Un monde bien balisé se parcourt sans carte : ce sont vos constructions qui font office de panneaux indicateurs.',
    drops: [
      'Balise — son rayon monte jusqu\'au ciel et se voit à toute la distance d\'affichage',
      'Tour repère — un matériau tranché sur l\'horizon vaut mieux qu\'une belle tour discrète',
      'Torches d\'un seul côté — dans une grotte, elles indiquent la sortie au retour',
      'Panneau de portail — coordonnées des deux côtés, Overworld et Nether',
      'Chemins — un sentier de gravier ou de chemin de terre relie ce qui compte',
      'Nuit — une lanterne tous les 8 blocs empêche les monstres et sert de balisage',
      'Raccourci du Nether — le meilleur repère reste un tunnel : voir « Réseau de transport du Nether » (Usines)'
    ],
    note: 'Chaque construction visible de loin économise une carte. Un pilier de quartz de 40 blocs au-dessus de la base coûte une heure et se rentabilise à chaque retour d\'expédition.'
  },
  {
    nom: 'Retrouver sa base après une mort', cat: 'orientation',
    tags: [{ txt: '5 minutes', cls: 'red' }],
    ou: 'Le butin ne dépend pas de votre courage mais d\'une seule variable : la distance que vous pouvez couvrir en cinq minutes.',
    drops: [
      'Compte à rebours — 5 minutes avant la disparition des objets au sol',
      'Chunks déchargés — le compteur est figé tant que personne n\'est à proximité',
      'Boussole de réapparition — elle pointe le dernier lieu de mort, dans la bonne dimension',
      'Lit posé en chemin — un clic droit suffit à enregistrer le point de réapparition',
      'Ancre de réapparition — au Nether, la seule solution ; elle brûle de la pierre lumineuse',
      'Kit de secours — un coffre près du lit avec armure, nourriture, pioche et perles',
      'Lave et vide — inutile de courir, tout a déjà disparu'
    ],
    note: 'Le vrai remède est en amont : un lit tous les 500 blocs et un coffre de secours à côté. Repartir nu et sans point de réapparition proche, c\'est perdre le second tas en allant chercher le premier.'
  }
];

/* ============================================================
   Comparatif des vitesses — du plus lent au plus rapide
   ---------------------------------------------------------------
   Les valeurs certaines sont chiffrées ; les autres sont données
   en ordre de grandeur ou en comparaison relative.
   ============================================================ */
var COMPARATIF_VITESSE = [
  ['Montée à l\'échelle', 'Environ 2 blocs/s vers le haut', '7 bâtons pour 3 échelles',
   'Accès fixes et puits courts ; l\'échafaudage monte plus vite'],
  ['Marche sur sable des âmes', 'Nettement plus lent que la marche', 'Rien, c\'est subi',
   'Nulle part : contournez, ou enchantez des bottes en Âme rapide'],
  ['Strider sur la lave', 'Lent mais imperturbable', 'Selle et champignon tordu au bout d\'un bâton',
   'Traverser un lac de lave sans construire de pont'],
  ['Nage en surface', 'Plus lent que la marche', 'Rien',
   'Quelques dizaines de blocs ; au-delà, prenez un bateau'],
  ['Marche', '4,317 blocs/s', 'Rien',
   'Le seul déplacement qui ne coûte aucune nourriture'],
  ['Cheval du bas de la fourchette', 'Environ 4,8 blocs/s', 'Une selle',
   'À remplacer dès qu\'un meilleur cheval passe à portée'],
  ['Sprint', '5,612 blocs/s', 'De la nourriture en réserve',
   'Déplacement courant dès que la barre de faim le permet'],
  ['Sprint sauté', 'De l\'ordre de 7 blocs/s', 'Beaucoup de nourriture',
   'Trajets courts quand la faim n\'est pas un problème'],
  ['Sprint avec Rapidité II', 'Environ 40 % de plus que le sprint', 'Verrue du Nether, sucre, pierre lumineuse',
   'Chantier, fuite, ou longue exploration à pied'],
  ['Nage avec Grâce du dauphin', 'Plus rapide qu\'un sprint', 'Trouver des dauphins et rester près d\'eux',
   'Longer une côte ; l\'effet ne marche pas en bateau'],
  ['Wagonnet sur rails motorisés', '8 blocs/s au maximum', 'Environ 375 lingots de fer pour 1 000 blocs, plus l\'or',
   'Montées, trajets internes et fret automatique'],
  ['Bateau sur l\'eau', 'De l\'ordre de 8 blocs/s', '5 planches',
   'Le meilleur rapport vitesse/prix de tout le début de partie'],
  ['Bon cheval', 'Jusqu\'à 14,23 blocs/s', 'Une selle et de l\'élevage à la carotte dorée',
   'Grands espaces dégagés, avant d\'avoir une élytre'],
  ['Élytre en vol plané', 'Dépend de l\'altitude de départ', 'Une élytre, rien de plus',
   'Descendre d\'un sommet, franchir un océan sans fusée'],
  ['Élytre et fusées', 'De l\'ordre de 30 blocs/s', 'Élytre, papier et poudre à canon en quantité',
   'Le déplacement de référence en fin de partie'],
  ['Bateau sur glace bleue', 'Environ 70 blocs/s, environ 40 sur glace compactée', '81 glaces par bloc, ou récolte en océan gelé',
   'Liaison permanente entre deux points connus'],
  ['Élytre et fusées au Nether', '8 blocs de surface parcourus par bloc réel', 'Un tunnel sécurisé et une réserve de fusées',
   'Traverser un monde déjà cartographié'],
  ['Bateau sur glace bleue au Nether', 'Le déplacement le plus rapide du jeu', 'Un tunnel fermé et beaucoup de glace',
   'Autoroute permanente entre deux bases très éloignées']
];

/* ============================================================
   S'orienter — la bonne réaction et le réflexe à éviter
   ============================================================ */
var ORIENTATION = [
  ['Perdu sans coordonnées',
   'Monter en hauteur, repérer une côte ou un biome tranché, puis suivre la boussole qui pointe le point d\'apparition du monde',
   'Marcher au hasard en changeant de cap : on tourne en rond sans s\'en rendre compte'],
  ['Mort loin de la base',
   'Repartir immédiatement avec un kit de secours, boussole de réapparition en main',
   'Se rééquiper tranquillement : les objets disparaissent 5 minutes après le rechargement de la zone'],
  ['Retrouver un portail du Nether',
   'Diviser X et Z par 8, aller au point correspondant côté Nether et fouiller dans un rayon de 128 blocs',
   'Rallumer un portail neuf juste à côté : il se reliera à l\'ancien et brouillera tout le réseau'],
  ['Cartographier une région',
   'Survoler la zone en quadrillage, carte agrandie tenue en main, puis la verrouiller à la table de cartographie',
   'Explorer carte rangée dans le sac : une carte fermée ne se remplit jamais'],
  ['Marquer un lieu à revoir',
   'Poser une bannière nommée à l\'enclume et cliquer dessus avec la carte pour créer un marqueur',
   'Se fier à sa mémoire ou à un panneau que la végétation aura recouvert'],
  ['Traverser un océan',
   'Partir en bateau à cap constant, avec du bois de rechange, de la nourriture et un lit posé avant le départ',
   'Traverser à la nage : c\'est plus lent que la marche et un seul noyé suffit à tout perdre'],
  ['Explorer le Nether sans se perdre',
   'Creuser un couloir droit et poser un panneau de coordonnées à chaque embranchement',
   'Suivre les grottes naturelles en espérant reconnaître le chemin au retour'],
  ['Descendre dans une grotte profonde',
   'Poser les torches toujours du même côté à l\'aller : elles montrent la sortie au retour',
   'Éclairer au hasard : tous les embranchements finissent par se ressembler'],
  ['Chercher une structure lointaine',
   'Voler en ligne droite à altitude constante, un axe après l\'autre, en notant les coordonnées explorées',
   'Zigzaguer : on repasse au-dessus des mêmes chunks sans jamais élargir la zone'],
  ['Rentrer à la nuit tombée',
   'Viser le rayon d\'une balise ou une tour éclairée repérable de loin',
   'Compter sur le clair de lune et affronter tout ce qui apparaît en chemin'],
  ['Se repérer dans l\'End',
   'Noter les coordonnées du portail de sortie avant de partir vers les îles, et emporter des perles',
   'Se lancer vers le vide sans perle ni coordonnée : il n\'y a aucun repère naturel'],
  ['Fonder une base secondaire',
   'Noter ses coordonnées, poser un lit, une magnétite et un portail relié au réseau existant',
   'La bâtir sans lien avec le réseau : une base qu\'on ne rejoint pas ne sert jamais']
];

