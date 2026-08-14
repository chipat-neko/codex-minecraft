/* ============================================================
   Données : décoration et aménagement
   Ce que les plans ne disent pas — ce qu'on met DANS le bâtiment
   une fois les murs montés, et ce qu'on pose autour.
   Chaque fiche décrit un montage précis : quels blocs, dans quelle
   disposition, et ce qui casse l'effet si on s'y prend mal.
   ============================================================ */

var DECO = [

  /* ---------------- MOBILIER ---------------- */
  {
    nom: 'Table et chaises', cat: 'mobilier',
    tags: [{ txt: 'Base', cls: 'ok' }, { txt: 'Tous styles', cls: '' }],
    ou: 'Salle à manger, cuisine, taverne, salle de conseil. C\'est le meuble qui fixe la hauteur de lecture de toute la pièce : tout le reste se cale dessus.',
    drops: [
      'Chaise — un escalier tourné vers la table, un panneau planté sur chacune de ses deux faces latérales en accoudoirs. Un troisième panneau dans le dos donne un dossier haut de fauteuil.',
      'Table — des clôtures en pieds, une dalle supérieure posée juste au-dessus en plateau. Le poteau de clôture monte à mi-bloc et rejoint exactement le dessous de la dalle : aucun trou visible.',
      'Tabouret et guéridon — une clôture surmontée d\'une plaque de pression, ou un tonneau isolé le long d\'un comptoir.',
      'Piège — une table d\'un seul bloc de large paraît minuscule. Comptez un bloc de plateau par convive et gardez un bloc de circulation derrière chaque chaise, sinon on ne peut plus passer.'
    ],
    note: 'Le tapis se pose sur n\'importe quel bloc non vide, dalle supérieure comprise : posé sur le plateau, il fait nappe et permet de teinter la table sans changer de bois.'
  },
  {
    nom: 'Banc, canapé et fauteuil', cat: 'mobilier',
    tags: [{ txt: 'Salon', cls: 'blue' }],
    ou: 'Salon, taverne, salle d\'attente, place publique. Un assis pour plusieurs personnes : c\'est ce qui distingue une pièce meublée d\'une pièce remplie.',
    drops: [
      'Banc — une rangée d\'escaliers alignés dans le même sens, un panneau à chaque extrémité en accoudoir. Deux dalles supérieures posées sur des murets donnent la version de pierre, pour un extérieur.',
      'Canapé rustique — assise en escaliers, dossier en trappes fermées plaquées derrière, accoudoirs en panneaux. Les trappes s\'ouvrent réellement, ce qui n\'a aucune importance et ne se voit pas.',
      'Canapé moderne — assise en blocs de laine, tapis de la même teinte posé dessus pour adoucir l\'arête, dossier en trappes de bois foncé, accoudoirs en dalles supérieures.',
      'Piège — un canapé collé au mur du fond fait salle d\'attente. Décalez-le d\'un bloc, glissez le tapis dessous et faites-le regarder quelque chose (cheminée, fenêtre, table basse).'
    ],
    note: 'Le panneau utilisé en accoudoir se pose sur la face latérale du bloc voisin : il ne coûte rien en place, ne bloque pas le passage, et donne l\'épaisseur qui manque à un simple escalier.'
  },
  {
    nom: 'Lit aménagé', cat: 'mobilier',
    tags: [{ txt: 'Chambre', cls: 'purple' }],
    ou: 'Toute chambre. Un lit posé seul contre un mur reste un objet de jeu ; entouré, il devient un meuble.',
    drops: [
      'Tête de lit — deux trappes fermées, deux panneaux muraux ou deux dalles verticales derrière le lit, éventuellement dans un bois plus sombre que le sol.',
      'Chevets — un tonneau, un lutrin ou un bloc coiffé d\'une dalle supérieure de chaque côté, avec une bougie ou une lanterne posée dessus.',
      'Baldaquin — quatre clôtures aux angles montant sur deux blocs, ciel de lit en laine bordée de trappes, rideaux en bannières aux quatre montants.',
      'Piège — le lit occupe deux blocs et se pose sur un sol plein. Prévoyez 2 × 1 pour le lit, un bloc de dégagement sur un côté, et une descente de lit en tapis : sans elle, la chambre reste vide.'
    ],
    note: 'La couleur du lit teinte toute la chambre parce qu\'elle est la seule grande surface saturée de la pièce. Choisissez-la avant la laine, les tapis et les bannières, pas après.'
  },
  {
    nom: 'Bureau, étagère et bibliothèque murale', cat: 'mobilier',
    tags: [{ txt: 'Cabinet', cls: 'gold' }],
    ou: 'Cabinet de travail, tour de mage, comptoir de scribe, coin bureau d\'une chambre.',
    drops: [
      'Bureau — deux tonneaux (ou deux blocs pleins) écartés d\'un ou deux blocs, plateau continu en dalles supérieures. Un lutrin en bout de rangée fait pupitre à écrire, une table de cartographie fait table à dessin.',
      'Étagère — une trappe fermée posée dans le vide contre le mur reste horizontale et forme une planche d\'un bloc de large. Une dalle supérieure isolée donne le même résultat, en plus épais.',
      'Bibliothèque murale — un pan de bibliothèques du sol au plafond, interrompu par une niche d\'un bloc où l\'on met une lanterne ou un pot. La bibliothèque ciselée casse la régularité et montre les livres rangés.',
      'Piège — cinq blocs de bibliothèques en aplat font mur de motif. Coupez avec des rondins verticaux tous les trois blocs, comme des montants d\'ébénisterie.'
    ],
    note: 'La bibliothèque ciselée accepte six livres, affiche ceux qu\'on y range et sort un signal de comparateur selon l\'emplacement rempli : c\'est un meuble décoratif ET un rangement adressable.'
  },
  {
    nom: 'Armoire, penderie et coffres encastrés', cat: 'mobilier',
    tags: [{ txt: 'Rangement', cls: 'copper' }],
    ou: 'Chambre, réserve, vestibule, arrière-boutique. Ranger sans transformer la pièce en entrepôt.',
    drops: [
      'Armoire — deux blocs pleins superposés, deux trappes en façade en guise de portes, un bouton en poignée. Un escalier inversé en corniche au-dessus la termine.',
      'Penderie — une tige de l\'End posée à l\'horizontale au fond d\'une niche fait tringle ; on y accroche des bannières en guise de vêtements pendus.',
      'Coffre encastré — un coffre refuse de s\'ouvrir sous un cube plein, mais une dalle inférieure, un escalier ou une trappe au-dessus laissent passer l\'animation. Le tonneau, lui, s\'ouvre même complètement enterré.',
      'Piège — un coffre double posé au milieu d\'une pièce ne dit rien du lieu. Encastrez-le dans une niche d\'un bloc, encadré de deux escaliers inversés.'
    ],
    note: 'Dans un meuble bas ou sous un plan de travail, remplacez systématiquement les coffres par des tonneaux : ils gardent la même capacité, se posent à l\'horizontale et acceptent n\'importe quoi au-dessus.'
  },
  {
    nom: 'Comptoir, plan de travail et évier', cat: 'mobilier',
    tags: [{ txt: 'Cuisine', cls: 'ok' }],
    ou: 'Cuisine, taverne, laboratoire, boutique. Le comptoir est le meuble le plus long de la maison : c\'est lui qui donne son rythme à la pièce.',
    drops: [
      'Comptoir — une rangée de blocs pleins coiffée d\'une dalle supérieure d\'une autre teinte. L\'ensemble fait un bloc et demi de haut, exactement la bonne hauteur de plan de travail.',
      'Évier — un chaudron encastré dans la rangée du comptoir, un levier planté dans le bloc au-dessus en robinet. Un seau d\'eau versé dans le chaudron remplit la cuve, et l\'eau n\'en sort jamais.',
      'Cuisinière et hotte — un fumoir ou un fourneau inséré dans le comptoir, hotte en escaliers inversés au-dessus, conduit d\'un bloc jusqu\'au plafond.',
      'Réfrigérateur — deux blocs de fer superposés, une trappe de fer en façade, un bouton en poignée. La trappe de fer ne s\'ouvre pas à la main : elle reste fermée quoi qu\'il arrive.'
    ],
    note: 'Un comptoir gagne à changer de matériau sur sa longueur — pierre lisse près du feu, bois près de la table — au lieu d\'être un seul bloc répété sur huit cases.'
  },
  {
    nom: 'Cheminée et conduit de fumée', cat: 'mobilier',
    tags: [{ txt: 'Foyer', cls: 'red' }, { txt: 'Traverse les étages', cls: '' }],
    ou: 'Salon, cuisine, salle commune, chambre de maître. C\'est l\'élément qui organise toute une pièce : le mobilier se tourne vers lui.',
    drops: [
      'Âtre — une niche d\'un bloc de profondeur dans le mur, feu de camp au fond, joues et sol en briques de pierre ou en briques rouges, linteau en escaliers inversés.',
      'Conduit — un puits vertical d\'un bloc traversant les étages et le toit. Le panache d\'un feu de camp monte d\'une dizaine de blocs : sans conduit, il traverse le plafond et l\'illusion tombe.',
      'Souche en toiture — la sortie se cerne de murets, s\'élargit d\'un bloc au sommet et se coiffe d\'un escalier inversé en mitre. Une souche trop courte fait tuyau de poêle.',
      'Feu de signal — un ballot de foin placé sous le feu de camp fait monter la fumée sur une vingtaine de blocs : réservez-le aux forges et aux cheminées d\'usine, jamais à un salon.'
    ],
    note: 'Le feu de camp éclaire à 15 et n\'enflamme aucun bloc voisin, mais il brûle ce qui marche dessus. La pelle l\'éteint sans le casser — un âtre froid pour une maison inhabitée — et le briquet le rallume.'
  },
  {
    nom: 'Établi habillé et postes d\'artisanat', cat: 'mobilier',
    tags: [{ txt: 'Atelier', cls: 'copper' }],
    ou: 'Atelier, forge, arrière-cour, coin technique d\'une base. Les blocs fonctionnels sont laids posés seuls : il faut les monter en meuble.',
    drops: [
      'Paillasse — l\'établi encadré de blocs pleins coiffés de dalles supérieures, pour une surface continue à la même hauteur. L\'établi cesse d\'être un cube isolé au milieu du sol.',
      'Mur d\'outils — des cadres d\'objet alignés au-dessus de la paillasse, un outil dans chacun. Un clic droit fait pivoter l\'objet : huit orientations, de quoi éviter que tout soit aligné pareil.',
      'Postes groupés — meule, tailleur de pierre, table de forge, métier à tisser et enclume rangés le long d\'un même mur, séparés par un bloc de rangement plutôt que collés.',
      'Piège — poser huit postes sur une seule rangée serrée donne une barre d\'outils, pas un atelier. Alternez poste, rangement, poste, et laissez deux blocs de recul devant.'
    ],
    note: 'Une enclume légèrement endommagée, un chaudron d\'eau et un tonneau ouvert suffisent à raconter un atelier en service, là où dix postes neufs alignés ne racontent qu\'un menu.'
  },
  {
    nom: 'Tapis, rideaux et textiles', cat: 'mobilier',
    tags: [{ txt: 'Finition', cls: 'ok' }],
    ou: 'Toutes les pièces habitées. Le textile est ce qui casse la dureté minérale d\'un intérieur, et le seul moyen d\'ajouter de la couleur sans changer de matériau.',
    drops: [
      'Tapis — une zone d\'un seul ton, bordée d\'un rang d\'une teinte voisine plus sombre. Un tapis sert à rassembler un groupe de meubles, jamais à couvrir toute la pièce.',
      'Rideaux — deux colonnes de laine teinte de part et d\'autre de la vitre, ou une bannière de chaque côté. Les trappes fermées contre les tableaux de baie donnent des volets intérieurs.',
      'Chemin — une bande de deux tapis de large qui relie l\'entrée à l\'escalier ou au trône, coupée franchement là où la circulation s\'arrête.',
      'Piège — le tapis rouge partout donne une salle des fêtes. Un textile ne se pose qu\'aux endroits où quelqu\'un s\'arrête ou passe vraiment.'
    ],
    note: 'Le tapis ne bloque pas la lumière et se pose sur tout bloc non vide, y compris une clôture ou un bloc lumineux : c\'est le support de base de l\'éclairage caché au sol.'
  },

  /* ---------------- PIÈCES ---------------- */
  {
    nom: 'Cuisine et salle à manger', cat: 'piece',
    tags: [{ txt: 'Pièce de vie', cls: 'ok' }],
    ou: 'Rez-de-chaussée, de préférence contre un mur extérieur pour la fenêtre au-dessus de l\'évier et la souche de cheminée.',
    drops: [
      'Emprise utile — 7 × 6 suffit largement : comptoir en L sur deux murs, deux blocs de passage devant, table de 2 × 3 dans l\'angle restant.',
      'Trois zones — le feu (fourneau, fumoir, âtre), l\'eau (chaudron évier), le rangement (tonneaux, ballots de foin, pots décorés). Séparez-les, ne les empilez pas.',
      'Garde-manger — une niche fermée par une porte ou deux trappes, tonneaux au sol, ballots de foin et pots décorés en haut, une lanterne au plafond.',
      'Piège — la table plantée au centre d\'une pièce de 9 × 9 vide. Une cuisine se lit par ses murs équipés ; le centre doit rester dégagé ou porter un îlot.'
    ],
    note: 'Un composteur, un seau d\'eau dans un chaudron et deux tonneaux ouverts font plus « cuisine » que dix blocs de nourriture posés dans des cadres.'
  },
  {
    nom: 'Chambre', cat: 'piece',
    tags: [{ txt: 'Pièce de vie', cls: 'purple' }],
    ou: 'Étage ou fond de maison, jamais au passage. Une chambre doit être la pièce la plus petite et la plus basse de la maison.',
    drops: [
      'Emprise utile — 5 × 5 avec un plafond à 3 blocs suffit. La chambre est la seule pièce où un plafond bas est un atout : il resserre et rassure.',
      'Composition — lit contre le mur du fond, chevet et lanterne d\'un côté, coffre ou tonneau au pied, descente de tapis sur le côté libre, fenêtre en tête ou en face.',
      'Variante rustique — sol en planches d\'épicéa, poutre apparente au plafond, coffre à linge sous la fenêtre, bougies sur le chevet.',
      'Variante moderne — sol en pierre lisse, tête de lit en trappes de chêne noir, éclairage caché derrière une corniche, un seul mur d\'accent en béton.'
    ],
    note: 'Une chambre d\'invité se distingue par ce qui manque : pas de coffre plein, pas de poste d\'artisanat, un seul tapis. Le vide est ici une information, pas une négligence.'
  },
  {
    nom: 'Salon', cat: 'piece',
    tags: [{ txt: 'Pièce de vie', cls: 'blue' }],
    ou: 'Cœur de la maison, en général de plain-pied avec l\'entrée et ouvert sur la salle à manger.',
    drops: [
      'Organisation — tout se tourne vers un même point : cheminée, grande fenêtre ou table basse. Sans point de mire, les meubles paraissent posés au hasard.',
      'Composition — canapé face à l\'âtre, deux fauteuils en escaliers de biais, table basse en dalles supérieures sur clôtures, tapis sous l\'ensemble et débordant d\'un bloc.',
      'Hauteur — 4 à 5 blocs de plafond. C\'est la seule pièce qui gagne à être haute : une poutre apparente ou une mezzanine y trouve sa place.',
      'Piège — un salon qui touche les quatre murs. Laissez une bande d\'un bloc entre les meubles et les cloisons : elle donne l\'impression que le groupe est posé, pas encastré.'
    ],
    note: 'Deux hauteurs d\'éclairage valent mieux qu\'une : une source basse (bougies, âtre, lanterne posée) pour l\'ambiance, une source haute (lustre, éclairage caché) pour la lisibilité.'
  },
  {
    nom: 'Salle de bains', cat: 'piece',
    tags: [{ txt: 'Eau', cls: 'cyan' }],
    ou: 'Petite pièce attenante à la chambre, ou sous un escalier. Trois blocs sur quatre suffisent.',
    drops: [
      'Baignoire — une fosse d\'un bloc de profondeur remplie d\'eau, bordée de dalles ou d\'escaliers de quartz, robinet en levier ou en tige de l\'End plantée dans le mur.',
      'Lavabo — un chaudron avec un levier au-dessus, encadré de deux dalles supérieures ; un cadre d\'objet vide sur le mur fait miroir, une vitre fait mieux.',
      'Douche — une trappe ouverte au plafond, une source d\'eau au-dessus, receveur en dalles de quartz cernées de murets pour contenir l\'écoulement.',
      'Piège — une salle de bains carrelée du sol au plafond en un seul bloc blanc. Alternez quartz lisse, dalles de quartz et un bandeau de blocs colorés à mi-hauteur.'
    ],
    note: 'L\'eau d\'un chaudron ne s\'écoule pas et ne gèle pas : c\'est le seul récipient qui reste plein sans travaux d\'étanchéité, et il se remplit tout seul sous la pluie.'
  },
  {
    nom: 'Atelier, cave et réserve', cat: 'piece',
    tags: [{ txt: 'Technique', cls: 'copper' }],
    ou: 'Sous-sol, appentis, arrière-cour. Toutes les pièces où l\'on travaille et où l\'on stocke, et qui doivent le montrer.',
    drops: [
      'Atelier — postes le long des murs, paillasse continue en dalles, mur d\'outils en cadres d\'objet, sol en pierre plutôt qu\'en bois, éclairage franc et haut.',
      'Cave voûtée — plafond en escaliers inversés de part et d\'autre d\'une rangée de dalles, murs en briques de pierre moussues, sol en pierre taillée.',
      'Réserve — tonneaux empilés sur deux niveaux, ballots de foin, pots décorés au sol, un ou deux ballots ouverts et un tonneau de travers pour éviter l\'effet rayonnage.',
      'Piège — une cave éclairée comme un salon. Ici la lumière vient de peu de points, elle laisse des zones sombres, et les torches ou lanternes se voient franchement.'
    ],
    note: 'Une réserve crédible n\'est jamais pleine à ras bord : laissez un angle vide, un sac de foin éventré, un pot cassé. Le désordre maîtrisé se fabrique, il n\'arrive pas tout seul.'
  },
  {
    nom: 'Salle du trône', cat: 'piece',
    tags: [{ txt: 'Apparat', cls: 'gold' }],
    ou: 'Fond du donjon ou du grand hall, dans l\'axe exact de la porte d\'entrée. Le seul cas où la symétrie totale est le bon choix.',
    drops: [
      'Estrade — deux ou trois marches d\'un bloc en escaliers sur toute la largeur du trône, pour que le siège domine sans mur derrière.',
      'Trône — un escalier central, deux dalles supérieures ou deux blocs pleins en accoudoirs, deux blocs d\'or ou deux tiges de l\'End en montants, une bannière au dossier.',
      'Mise en scène — chemin de tapis dans l\'axe, colonnes en piliers de quartz ou en rondins, bannières identiques entre chaque colonne, brasiers en feux de camp de part et d\'autre.',
      'Piège — un trône trop petit pour la salle. Le siège doit occuper au moins trois blocs de large avec ses montants, sinon il disparaît dès qu\'on recule.'
    ],
    note: 'La hauteur fait le pouvoir : trois marches suffisent pour que le regard monte. Un trône de plain-pied dans une salle de 12 blocs de haut ne sera jamais impressionnant.'
  },
  {
    nom: 'Bibliothèque et cabinet de travail', cat: 'piece',
    tags: [{ txt: 'Apparat', cls: 'gold' }],
    ou: 'Étage noble, tour, aile d\'un manoir. Une pièce entièrement définie par ses murs : le mobilier y est presque secondaire.',
    drops: [
      'Murs — bibliothèques du sol au plafond, montants verticaux en rondins tous les trois ou quatre blocs, corniche en escaliers inversés au sommet.',
      'Percements — une niche d\'un bloc de profondeur tous les cinq ou six blocs, avec une lanterne, un pot de fleurs ou une bibliothèque ciselée : c\'est ce qui empêche le mur de devenir un motif.',
      'Mobilier — un lutrin sur estrade, une table longue en dalles, deux tapis longs, une échelle vers la mezzanine, une table d\'enchantement en bout de salle.',
      'Piège — un plafond bas. Une bibliothèque demande 5 blocs de hauteur minimum, sinon les rayonnages ne se lisent plus que sur deux rangs.'
    ],
    note: 'Quinze bibliothèques disposées à deux blocs d\'une table d\'enchantement suffisent pour atteindre le niveau 30 : une salle de lecture peut être décorative ET fonctionnelle, à condition de laisser le couloir d\'air réglementaire.'
  },
  {
    nom: 'Serre intérieure', cat: 'piece',
    tags: [{ txt: 'Végétal', cls: 'ok' }],
    ou: 'Aile vitrée, véranda, dernier étage d\'une tour, cour couverte. Une pièce qui n\'a besoin ni de mobilier ni de couleur ajoutée.',
    drops: [
      'Enveloppe — vitres du sol au plafond entre des montants de bois ou de pierre, toiture en vitres portées par des escaliers inversés, faîtage en dalles.',
      'Bacs de culture — terre labourée cernée de murets ou de dalles, une source d\'eau tous les 4 blocs dans les deux directions pour irriguer tout le carré.',
      'Étagement — bacs bas au centre, jardinières hautes sur les côtés, pots de fleurs sur les rebords, lianes et feuillages suspendus au-dessus des allées.',
      'Piège — des cultures qui refusent de pousser. Il faut un niveau de lumière d\'au moins 9 sur le bloc de la plante : sous un toit épais, ajoutez lanternes ou pierre lumineuse.'
    ],
    note: 'Une serre gagne à mélanger utile et décoratif : deux bacs de blé, un bac de fleurs, un bac d\'azalées. Une serre uniquement agricole redevient un champ couvert.'
  },
  {
    nom: 'Entrée et vestibule', cat: 'piece',
    tags: [{ txt: 'Seuil', cls: 'blue' }],
    ou: 'Derrière la porte d\'entrée. Deux à quatre blocs de profondeur, souvent la pièce la plus négligée alors qu\'elle est vue en premier.',
    drops: [
      'Sas — un décrochement d\'un bloc entre la porte et la pièce principale, sol changé (dalles de pierre au lieu du parquet), plafond d\'un bloc plus bas.',
      'Équipement — un tapis d\'accueil de deux blocs, une patère en cadres d\'objet, un tonneau ou un banc pour poser, un support à armure en portemanteau.',
      'Éclairage — deux lanternes au mur de part et d\'autre de la porte, à l\'intérieur comme à l\'extérieur : c\'est la symétrie qui signale une entrée.',
      'Piège — une porte qui donne directement sur le salon. Un simple changement de sol sur deux blocs suffit à créer un seuil et à rendre la maison lisible.'
    ],
    note: 'La double porte se fait avec deux portes côte à côte, mais elles doivent être posées dans le bon ordre pour s\'ouvrir vers l\'extérieur en même temps : posez celle de gauche en premier et vérifiez avant de finir l\'encadrement.'
  },

  /* ---------------- EXTÉRIEUR ---------------- */
  {
    nom: 'Jardin, parterres et potager', cat: 'exterieur',
    tags: [{ txt: 'Abords', cls: 'ok' }],
    ou: 'Autour de toute maison. Un bâtiment posé sur une pelouse plate a l\'air d\'un objet lâché ; le jardin est ce qui le raccroche au sol.',
    drops: [
      'Parterre — un contour en murets bas, en dalles ou en blocs de terre grossière, remplissage en fleurs d\'une ou deux espèces seulement, jamais de l\'arc-en-ciel complet.',
      'Volume végétal — le buisson d\'azalée et l\'azalée en fleurs sont les seuls arbustes en bloc plein ; complétez avec des feuillages taillés et de grandes fougères pour donner du relief.',
      'Potager décoratif — planches de terre labourée de 2 × 5, séparées par des chemins de terre, une source d\'eau enterrée sous une dalle au centre, un composteur et un épouvantail en support à armure au bout.',
      'Piège — le parterre qui touche le mur. Laissez une bande d\'un bloc en gravier ou en chemin de terre au pied de la façade : c\'est ce que fait toute vraie construction pour l\'eau de pluie.'
    ],
    note: 'La transition pelouse-jardin ne doit jamais être une ligne droite : entremêlez herbe, terre grossière et chemin de terre sur deux ou trois blocs, exactement comme pour une transition de matériaux sur une façade.'
  },
  {
    nom: 'Allée, pavage et banc public', cat: 'exterieur',
    tags: [{ txt: 'Sol', cls: '' }],
    ou: 'Entre la porte et la route, dans une cour, sur une place de village. Le sol est la surface qu\'on regarde le plus et celle qu\'on travaille le moins.',
    drops: [
      'Pavage mélangé — trois blocs proches (pierre, andésite polie, pierre taillée, gravier) posés irrégulièrement, aucun jamais en majorité écrasante ; visez un sur six pour la teinte la plus rare.',
      'Bordure — posez la bordure d\'abord, en dalles inférieures ou en murets, puis remplissez. Une allée sans bordure se dilue dans l\'herbe au bout de trois jours de jeu.',
      'Largeur — 3 blocs pour une allée de maison, 5 à 7 pour une rue de village. En dessous de 3, deux personnages ne se croisent pas et l\'échelle du bâtiment s\'écrase.',
      'Banc public — deux escaliers dos à dos entre deux murets, ou une dalle supérieure sur deux murets, dossier en trappes ; à poser aux carrefours et face aux points de vue.'
    ],
    note: 'Le chemin de terre, obtenu à la pelle sur l\'herbe, redevient de la terre dès qu\'on pose un bloc plein dessus. Faites-le donc en dernier, après les bordures et les lampadaires.'
  },
  {
    nom: 'Clôture, portail et haie', cat: 'exterieur',
    tags: [{ txt: 'Limite', cls: 'copper' }],
    ou: 'Limites de parcelle, enclos, cour de ferme, entrée de domaine. Ce qui transforme un terrain en propriété.',
    drops: [
      'Clôture rythmée — des piliers en blocs pleins tous les 4 ou 5 blocs, coiffés d\'une dalle ou d\'un escalier inversé, reliés par des clôtures ou des murets. Une clôture continue sans pilier fait grillage.',
      'Muret bas surmonté — deux blocs de muret au sol, clôtures ou barreaux de fer au-dessus : la limite reste franchissable du regard sans être franchissable tout court.',
      'Portail — deux portillons côte à côte entre deux piliers plus hauts, coiffés de lanternes ; un panneau suspendu accroché à une traverse achève l\'entrée de domaine.',
      'Haie — feuillages taillés sur deux blocs de haut, avec une rangée d\'azalées en fleurs par endroits ; les feuillages laissent passer la lumière et n\'empêchent aucune apparition de monstre.'
    ],
    note: 'Clôtures et murets font 1,5 bloc de haut pour les créatures : elles ne les franchissent pas, contrairement à un simple bloc plein. Deux blocs pleins empilés valent une clôture, mais coûtent deux fois la place visuelle.'
  },
  {
    nom: 'Puits et fontaine', cat: 'exterieur',
    tags: [{ txt: 'Eau', cls: 'cyan' }],
    ou: 'Place de village, cour de ferme, cloître, jardin clos. Le point autour duquel tout le reste s\'organise naturellement.',
    drops: [
      'Puits — margelle de 3 × 3 en murets avec l\'eau au centre, quatre clôtures aux angles montant de deux blocs, toiture en escaliers, seau suspendu en chaîne terminée par un chaudron.',
      'Fontaine — vasque creusée d\'un bloc bordée d\'escaliers inversés, colonne centrale d\'un ou deux blocs, source d\'eau au sommet qui retombe dans le bassin.',
      'Portée de l\'eau — une source s\'écoule sur 7 blocs à l\'horizontale ; au-delà, le bassin reste sec. Prévoyez une source par palier ou resserrez la vasque.',
      'Piège — un bassin d\'un seul bloc de profondeur avec des parois verticales lisses. Le rebord doit être travaillé (escaliers, dalles, murets), c\'est là que se voit le soin.'
    ],
    note: 'Escaliers, dalles, murets, clôtures et barreaux de fer se remplissent d\'eau au lieu de la chasser : on peut donc détailler l\'intérieur d\'un bassin sans jamais interrompre la nappe.'
  },
  {
    nom: 'Terrasse et pergola', cat: 'exterieur',
    tags: [{ txt: 'Abords', cls: 'ok' }],
    ou: 'Contre la façade sud, au bord de l\'eau, sur un toit plat. La pièce extérieure qui prolonge le salon.',
    drops: [
      'Plancher — dalles ou blocs pleins posés un demi-bloc au-dessus du terrain, bordure en dalles inférieures qui débordent d\'un bloc : la terrasse doit se lire comme une plateforme, pas comme un sol peint.',
      'Pergola — poteaux en rondins écorcés tous les 3 blocs, traverses en clôtures ou en trappes ouvertes au-dessus, couverture en feuillages et lianes pour l\'ombre.',
      'Garde-corps — clôtures pour le rustique, murets pour la pierre, trappes horizontales pour le moderne, barreaux de fer pour l\'industriel : c\'est le détail qui date le style.',
      'Piège — une terrasse aussi large que la maison et complètement vide. Meublez-la comme une pièce : table, deux bancs, un feu de camp, deux pots de fleurs.'
    ],
    note: 'Une pergola n\'a d\'intérêt que si elle porte une ombre. Sans couverture végétale ni traverses serrées, il ne reste que quatre poteaux plantés dans le sol.'
  },
  {
    nom: 'Appontement et berge', cat: 'exterieur',
    tags: [{ txt: 'Rive', cls: 'blue' }],
    ou: 'Bord de lac, de rivière ou de mer, au pied d\'un village de pêcheurs ou d\'un entrepôt.',
    drops: [
      'Pilotis — rondins de chêne noir ou d\'épicéa descendant jusqu\'au fond de l\'eau, tous les 3 ou 4 blocs, jamais alignés parfaitement à la même hauteur.',
      'Tablier — planches ou dalles à un demi-bloc au-dessus de l\'eau, avec deux ou trois planches manquantes remplacées par des trappes pour la trappe d\'accès et l\'usure.',
      'Amarrage — bittes en clôtures coiffées d\'une dalle, chaînes tendues vers l\'eau, échelle plongeant sous la surface, tonneaux et pots décorés posés en vrac.',
      'Piège — une berge coupée net entre l\'herbe et l\'eau. Mélangez sable, gravier et terre grossière sur deux ou trois blocs, et laissez des touffes d\'algues sous la surface.'
    ],
    note: 'Poser des blocs dans l\'eau ne les rend pas étanches : dalles, escaliers et clôtures restent remplis d\'eau. Pour un ponton sec, il faut monter le tablier au moins un demi-bloc au-dessus de la surface.'
  },
  {
    nom: 'Ruines décoratives', cat: 'exterieur',
    tags: [{ txt: 'Décor', cls: 'purple' }],
    ou: 'À l\'écart d\'un bâtiment neuf, dans une clairière, au bord d\'une route. Le moyen le plus rapide de donner un passé à un lieu.',
    drops: [
      'Silhouette cassée — un mur qui monte à 5 blocs d\'un côté et retombe à 1 de l\'autre, avec un arrachement irrégulier plutôt qu\'une découpe en escalier régulier.',
      'Matériaux — briques de pierre fissurées et moussues en majorité, blocs sains uniquement en bas et aux angles protégés, quelques dalles et escaliers ébréchés en linteaux effondrés.',
      'Gravats — les blocs tombés s\'accumulent AU PIED du mur, en dalles et blocs isolés, jamais à cinq blocs de distance ; ajoutez gravier et terre enracinée sous les tas.',
      'Reprise végétale — mousse, tapis de mousse, lianes sur les faces nord, une pousse d\'arbre au milieu de la salle éventrée ; la nature entre par les brèches, pas partout à la fois.'
    ],
    note: 'Une ruine se construit d\'abord entière, puis on retire. Détruire un bâtiment fini donne des effondrements cohérents ; dessiner directement une ruine donne un tas de blocs sans logique.'
  },

  /* ---------------- LUMIÈRE ---------------- */
  {
    nom: 'Éclairage caché', cat: 'lumiere',
    tags: [{ txt: 'Technique', cls: 'gold' }, { txt: 'Anti-monstres', cls: 'ok' }],
    ou: 'Partout où une source visible casserait le style : intérieur soigné, façade moderne, sol de couloir, corniche de plafond.',
    drops: [
      'Sous le sol — pierre lumineuse ou lumigrenouille posée dans le sol, recouverte d\'un tapis. Le tapis ne bloque pas la lumière et masque totalement le bloc.',
      'Dans le plafond — une lanterne ou de la pierre lumineuse dans un caisson d\'un bloc, fermée par une trappe fermée ; la lumière traverse la trappe et le plafond reste régulier.',
      'Derrière une corniche — un rang de blocs lumineux au sommet du mur, masqué par un rang de dalles ou d\'escaliers inversés posés un bloc en avant : la lumière rase le plafond.',
      'À plat sur une face — le lichen luisant se plaque sur n\'importe quelle face, y compris un plafond ou une paroi déjà construite, sans prendre le moindre bloc d\'épaisseur.'
    ],
    note: 'Toute case intérieure à lumière 0 est un point d\'apparition de monstre. L\'éclairage caché n\'est pas une coquetterie : c\'est le seul moyen d\'éclairer entièrement une grande salle sans la constellation de torches.'
  },
  {
    nom: 'Lanternes suspendues, chaînes et lustre', cat: 'lumiere',
    tags: [{ txt: 'Suspension', cls: 'gold' }],
    ou: 'Grande salle, couloir, halle, escalier, extérieur couvert. Dès que le plafond est à plus de 4 blocs, la lumière doit descendre.',
    drops: [
      'Lanterne pendue — une lanterne accrochée sous un bloc prend la version suspendue ; une chaîne intercalée la fait descendre d\'autant de blocs qu\'on veut.',
      'Descente réglée — dans un couloir, alternez les longueurs de chaîne (1, 2, 1, 3) plutôt que de toutes les aligner : la rangée cesse d\'être un peigne.',
      'Lustre — une chaîne centrale, un bloc plein ou une trappe en plateau, quatre clôtures ou quatre trappes en branches autour, une lanterne ou des bougies au bout de chaque branche.',
      'Piège — la lanterne posée au sol dans une pièce haute. Elle éclaire correctement mais laisse le haut de la pièce dans le noir, et rien ne signale la hauteur sous plafond.'
    ],
    note: 'Chaînes et lanternes s\'accrochent aussi sous une clôture ou sous une trappe fermée : on peut donc suspendre une lumière sous une poutre apparente sans percer le plafond.'
  },
  {
    nom: 'Bougies et chandeliers', cat: 'lumiere',
    tags: [{ txt: 'Ambiance', cls: 'red' }],
    ou: 'Table, chevet, autel, cave, chapelle. La seule source qui éclaire peu par construction — ce qui est exactement le but.',
    drops: [
      'Dosage — de 1 à 4 bougies sur un même bloc, pour un niveau de lumière de 3, 6, 9 puis 12. Une bougie seule laisse volontairement l\'ombre gagner.',
      'Allumage — les bougies posées sont éteintes ; il faut un briquet. L\'eau les éteint toutes, et une bougie noyée dans un bloc rempli d\'eau ne se rallume pas.',
      'Chandelier — des bougies posées sur une dalle supérieure suspendue au bout d\'une chaîne, ou sur le plateau d\'un lustre en trappes.',
      'Gâteau d\'anniversaire — une bougie plantée sur un gâteau, allumée : c\'est le seul assemblage du jeu qui combine mobilier, lumière et nourriture.'
    ],
    note: 'Une pièce éclairée uniquement à la bougie contient forcément des cases sombres, donc des monstres. Doublez toujours avec un éclairage caché sous les tapis : l\'ambiance reste, les zombies non.'
  },
  {
    nom: 'Feu de camp d\'intérieur', cat: 'lumiere',
    tags: [{ txt: 'Foyer', cls: 'red' }],
    ou: 'Âtre, forge, campement, salle commune, brasier de salle du trône.',
    drops: [
      'Encastrement — le feu de camp posé au fond d\'une niche ou dans une fosse d\'un bloc, entouré de briques de pierre ou de pierre taillée ; il éclaire à 15 et n\'enflamme aucun bloc voisin.',
      'Feu éteint — une pelle éteint le feu sans casser le bloc : le foyer garde ses bûches et ses cendres, parfait pour une maison inhabitée ou une ruine. Le briquet le rallume.',
      'Feu des âmes — flamme bleue, lumière 10 seulement et deux fois plus de dégâts : réservez-le aux cryptes, aux temples et à tout ce qui doit paraître froid.',
      'Piège — un feu de camp au milieu d\'un passage. Il blesse quiconque marche dessus, y compris les villageois et les animaux : entourez-le de murets ou de dalles pour interdire l\'accès.'
    ],
    note: 'La fumée d\'un feu de camp monte d\'une dizaine de blocs et traverse les plafonds à l\'affichage. Un feu d\'intérieur sans conduit se repère immédiatement : le panache sort du toit n\'importe où.'
  },
  {
    nom: 'Lampes commutables et éclairage extérieur', cat: 'lumiere',
    tags: [{ txt: 'Redstone', cls: 'red' }, { txt: 'Extérieur', cls: '' }],
    ou: 'Façade, rue, quai, cour, mais aussi tout intérieur qu\'on veut pouvoir éteindre.',
    drops: [
      'Interrupteur — une lampe de redstone alimentée par un levier ; le levier se cache dans une alcôve d\'un bloc masquée par un tableau, ou se remplace par une plaque de pression sous le tapis d\'entrée.',
      'Allumage automatique — un capteur de lumière du jour inversé d\'un clic droit alimente les lampes à la tombée de la nuit et les coupe au matin, sans aucune horloge.',
      'Lampadaire — un poteau de 3 à 4 blocs en clôtures ou en rondins, potence en escalier inversé ou en trappe, lanterne suspendue au bout ; espacez-les de 6 à 8 blocs le long d\'une rue.',
      'Piège — un extérieur éclairé aussi uniformément qu\'un intérieur. Dehors, la lumière vient de points isolés et laisse des zones sombres — à condition de les rendre inhabitables aux monstres avec des dalles ou des tapis.'
    ],
    note: 'La lampe de redstone monte à 15 comme la pierre lumineuse, mais s\'éteint : c\'est la seule source qui permet de montrer qu\'un bâtiment est vide ou occupé selon l\'heure.'
  },

  /* ---------------- DÉTAILS ---------------- */
  {
    nom: 'Encadrement de fenêtre et volets', cat: 'detail',
    tags: [{ txt: 'Façade', cls: 'copper' }],
    ou: 'Toutes les baies, dedans comme dehors. Une vitre posée à ras du mur est le signe le plus reconnaissable d\'une construction bâclée.',
    drops: [
      'Retrait — reculez la vitre d\'un bloc par rapport au nu du mur : l\'ombre portée du tableau dessine l\'encadrement toute seule, sans un seul bloc supplémentaire.',
      'Encadrement — escalier inversé en linteau au-dessus, dalle débordante en appui en dessous, montants en rondins ou en blocs d\'une teinte plus soutenue.',
      'Meneau — dans une baie de 2 blocs de large, un muret, un barreau de fer ou une clôture au centre coupe la vitre en deux et fait passer une fenêtre pour une croisée.',
      'Volets — deux trappes de part et d\'autre de la baie, en position ouverte pour des volets rabattus, fermées sur la vitre pour une maison close ; une seule trappe de travers suggère l\'abandon.'
    ],
    note: 'Les panneaux de verre se relient entre eux et forment des croisillons ; le bloc de verre plein donne au contraire une nappe lisse. Le premier convient au médiéval, le second au moderne.'
  },
  {
    nom: 'Corniche, plinthe et poutre apparente', cat: 'detail',
    tags: [{ txt: 'Lignes', cls: 'gold' }],
    ou: 'Jonction mur-plafond, pied de mur, sous-face de plancher. Les trois lignes horizontales qui donnent une échelle à une pièce.',
    drops: [
      'Corniche — un rang d\'escaliers inversés posés un bloc en avant du mur, au ras du plafond, éventuellement doublé d\'un rang de dalles. Elle cache aussi parfaitement un éclairage indirect.',
      'Plinthe — un rang de dalles inférieures en saillie d\'un bloc au pied du mur, ou simplement le premier rang du mur dans un bloc plus sombre. Elle protège l\'œil de la rencontre brutale sol-mur.',
      'Poutre apparente — des rondins écorcés posés à l\'horizontale au plafond, tous les 3 ou 4 blocs, avec un escalier inversé de chaque côté pour la jonction avec le mur.',
      'Piège — les trois lignes dans le même bloc que le mur. Il faut un contraste de teinte, sinon le relief ne se voit pas et le travail est perdu.'
    ],
    note: 'Un rondin change d\'orientation selon la face sur laquelle on le pose : posé sur un côté, les cernes du bois pointent dans le sens de la poutre. Vérifiez toujours le sens avant de faire toute la rangée.'
  },
  {
    nom: 'Gouttière, descente et enseigne', cat: 'detail',
    tags: [{ txt: 'Façade', cls: 'copper' }],
    ou: 'Bas de toit, angles de façade, devanture de boutique, entrée d\'auberge. Les accessoires qui font qu\'un bâtiment paraît utilisé.',
    drops: [
      'Gouttière — un rang de trappes fermées ou de murets sous le débord de toit, dans un matériau métallique (cuivre, fer) différent de la toiture.',
      'Descente — une colonne de chaînes ou de clôtures le long de l\'angle du mur, jusqu\'à un chaudron posé au sol : le chaudron se remplit réellement quand il pleut.',
      'Enseigne — un panneau suspendu accroché sous une potence en trappe ou en escalier inversé, avancée d\'un bloc sur la rue ; un cadre d\'objet contenant l\'article vendu dit le métier sans écrire un mot.',
      'Devanture — auvent en escaliers inversés sur toute la largeur, deux lanternes, un étal en dalles portées par des tonneaux, un ou deux pots décorés au sol.'
    ],
    note: 'Le cuivre est le seul matériau qui vieillit tout seul, du saumon au vert-de-gris. Une gouttière en cuivre non ciré change de couleur au fil des sessions ; cirez-la si vous voulez figer la teinte.'
  },
  {
    nom: 'Pots, cadres, tonneaux et supports à armure', cat: 'detail',
    tags: [{ txt: 'Objets', cls: '' }],
    ou: 'Rebords, coins de pièce, étals, réserves, halls d\'entrée. Les petits objets qui remplissent les vides que le mobilier ne peut pas occuper.',
    drops: [
      'Pot de fleurs — accepte fleurs, pousses, fougères, champignons, cactus, bambou et azalées. Deux pots identiques encadrant une porte valent mieux que six pots différents alignés.',
      'Cadre d\'objet — un clic droit fait pivoter l\'objet sur huit positions ; le cadre lumineux fait briller l\'objet sans éclairer la pièce. Neuf cartes dans neuf cadres forment une carte murale continue.',
      'Tonneau et pot décoré — rangement ET décor : le tonneau s\'ouvre même sous un bloc plein, le pot décoré porte les motifs des tessons utilisés et se casse d\'un seul coup, à manipuler avec soin.',
      'Support à armure — posé sur une dalle ou un bloc pour le surélever, il sert de mannequin d\'armurier, de portemanteau d\'entrée ou d\'épouvantail de potager avec une citrouille sculptée.'
    ],
    note: 'Un objet posé doit avoir une raison d\'être là : l\'outil près de l\'établi, le pot près de la fenêtre, le tonneau contre le mur de la réserve. Les objets répartis régulièrement dans une pièce ressemblent toujours à une vitrine.'
  }
];

/* ============================================================
   Ambiances : ce qu'il faut assembler pour un climat donné
   [ ambiance, blocs et couleurs, éclairage, détails qui la signent ]
   ============================================================ */

var AMBIANCES = [
  ['Chaleureuse / familiale',
   'Bois de chêne et d\'épicéa, terre cuite blanche, laine ocre et rouge brique',
   'Feu de camp dans l\'âtre, lanternes basses, bougies sur la table',
   'Tapis débordant sous les meubles, marmite au feu, ballots de foin, pots de fleurs aux fenêtres'],

  ['Austère / monacale',
   'Briques de pierre, pierre taillée, un seul bois sombre, aucun textile coloré',
   'Bougies isolées, une lanterne par salle, larges zones d\'ombre assumées',
   'Bancs alignés sans coussin, lutrin, murs nus, une seule croisée haute par pièce'],

  ['Luxueuse / palais',
   'Quartz lisse, blocs d\'or, pierre des profondeurs polie, tapis rouges et bleus',
   'Lustres à plusieurs branches, lanternes régulières, éclairage caché en corniche',
   'Colonnes en piliers de quartz, bannières identiques, estrade, symétrie totale et volumes hauts'],

  ['Rustique / ferme',
   'Rondins de chêne, pierre taillée moussue, terre grossière, foin',
   'Lanternes accrochées aux poutres, feu de camp, torches assumées dans la grange',
   'Tonneaux, composteur, outils en cadres d\'objet, sacs de foin éventrés, poutres irrégulières'],

  ['Marine / port',
   'Épicéa vieilli, prismarine, cuivre oxydé, verre coloré cyan',
   'Lanternes marines encastrées, lanternes suspendues aux potences, un phare au loin',
   'Cordages en chaînes, tonneaux, filets en barreaux de fer, coraux séchés, algues sur les pilotis'],

  ['Alchimiste / sorcière',
   'Pierre des profondeurs, briques du Nether, obsidienne, améthyste',
   'Bougies par grappes, lanternes des âmes, une seule lampe de redstone commutable',
   'Chaudrons alignés, alambics, toiles d\'araignée, bibliothèques dépareillées, pots décorés étranges'],

  ['Industrielle / atelier',
   'Briques rouges, pierre lisse, blocs de fer, béton gris',
   'Lanternes nues suspendues à des chaînes, lampes de redstone commandées au levier',
   'Entonnoirs apparents, échafaudages, barreaux de fer, rails, portes de fer, gouttières en cuivre'],

  ['Végétale / serre',
   'Verre et vitres, bois de chêne pâle, mousse, terre labourée',
   'Lumière du jour d\'abord, pierre lumineuse cachée sous les bacs pour la croissance',
   'Bacs bordés de murets, lianes suspendues, azalées en fleurs, pots de fleurs par séries de trois'],

  ['Nordique / chalet',
   'Rondins d\'épicéa, pierre brute, couches de neige, laine écrue',
   'Feu de camp central, lanternes basses, très peu de sources et beaucoup d\'ombre',
   'Peaux en tapis, bois empilé en rondins, boucliers accrochés, charpente apparente, toit très pentu'],

  ['Orientale / désert',
   'Grès lisse et ciselé, terre cuite orange et blanche, bois d\'acacia',
   'Lanternes ajourées suspendues bas, bougies dans les niches, verre teinté qui colore la lumière',
   'Arcs en escaliers, tapis à motifs superposés, coussins en laine, jarres et pots décorés, moucharabiehs en barreaux'],

  ['Funèbre / crypte',
   'Pierre des profondeurs polie, basalte, pierre noire, briques de pierre fissurées',
   'Feux de camp des âmes, bougies noires isolées, aucune source au plafond',
   'Sarcophages en dalles, chaînes pendantes, toiles d\'araignée, bannières délavées, sol jonché de gravier'],

  ['Enfantine / chambre d\'enfant',
   'Laine claire par grands aplats, bois de bouleau, béton pastel',
   'Lanterne unique au plafond, bougie sur le chevet, veilleuse en lampe de redstone',
   'Tapis mosaïque de deux teintes, coffres peints en laine, cadres d\'objet avec des jouets, lit court, plafond bas'],

  ['Savante / cabinet de travail',
   'Chêne noir, briques de pierre, laine vert bouteille, cuivre ciré',
   'Lanternes en applique de part et d\'autre du bureau, bougies sur la table, éclairage caché en corniche',
   'Bibliothèques du sol au plafond, lutrin, table de cartographie, globes en pots décorés, tapis long'],

  ['Abandonnée / envahie',
   'Briques fissurées et moussues, gravier, terre enracinée, bois pourri d\'aspect',
   'Aucune source volontaire — lichen luisant, un feu éteint, la lumière du jour par les brèches',
   'Toit percé, mobilier renversé en escaliers de travers, lianes, tapis de mousse, pots décorés cassés']
];

/* ============================================================
   Erreurs de décoration — ce qui rate et ce qu'il faut faire
   [ erreur, pourquoi ça rate, à faire à la place ]
   ============================================================ */

var ERREURS_DECO = [
  ['Faire les pièces trop grandes',
   'Une salle de 15 × 15 demande dix fois plus de mobilier qu\'on ne veut en poser : elle reste vide quoi qu\'on y mette',
   'Dimensionner par usage : 5 × 5 pour une chambre, 7 × 6 pour une cuisine, 9 × 7 pour un salon, et cloisonner le reste'],

  ['Plafond partout à 3 blocs',
   'La hauteur unique écrase les pièces d\'apparat et rend impossible tout éclairage suspendu',
   'Faire varier : 3 blocs en chambre et couloir, 4 à 5 en salon, 6 et plus en hall et en bibliothèque'],

  ['Torches plantées sur les murs',
   'La torche est le repère du chantier, pas de l\'intérieur fini : elle annule visuellement tout le travail de matériaux',
   'Lanternes, bougies, feu de camp, et éclairage caché sous les tapis ou derrière une corniche pour le fond lumineux'],

  ['Un seul matériau du sol au plafond',
   'Sans changement de teinte, aucun relief ne se lit et la pièce paraît moulée d\'un bloc',
   'Trois niveaux de matériaux : sol, mur, plafond ; plus une plinthe et une corniche pour marquer les jonctions'],

  ['Symétrie parfaite dans une maison',
   'Une pièce parfaitement symétrique paraît générée, jamais habitée',
   'Réserver la symétrie aux salles d\'apparat ; ailleurs, décaler la cheminée, une fenêtre, un meuble'],

  ['Meubles collés aux murs',
   'Tout le mobilier plaqué en périphérie laisse un trou au centre et fait salle d\'attente',
   'Décaler d\'un bloc, orienter les sièges vers un point de mire, poser le tapis en premier et meubler autour'],

  ['Décorer avant de finir le volume',
   'Le mobilier ne rattrape jamais une pièce mal proportionnée ; il faudra tout démonter pour corriger',
   'Monter les murs, régler la hauteur, poser les fenêtres, PUIS meubler — dans cet ordre, sans exception'],

  ['Poser un objet de chaque type',
   'Un exemplaire de chaque poste d\'artisanat aligné produit un catalogue, pas un lieu',
   'Ne garder que ce que le lieu utilise vraiment, en plusieurs exemplaires s\'il le faut, et supprimer le reste'],

  ['Fleurs de toutes les couleurs',
   'Un parterre arc-en-ciel n\'existe nulle part et attire l\'œil au mauvais endroit',
   'Une ou deux espèces par parterre, répétées ; garder une troisième couleur pour un seul accent'],

  ['Vitres posées à ras du mur',
   'Sans retrait, la fenêtre n\'a ni ombre ni épaisseur : la façade redevient une surface plate',
   'Reculer la vitre d\'un bloc, ajouter linteau en escalier inversé et appui en dalle débordante'],

  ['Éclairer partout à l\'identique',
   'Un intérieur uniformément lumineux n\'a ni ambiance ni hiérarchie : rien n\'attire le regard',
   'Éclairer fort là où l\'on agit (plan de travail, table), faible ailleurs, en doublant d\'un éclairage caché anti-monstres'],

  ['Oublier d\'éclairer les recoins',
   'Une case à lumière 0 sous un escalier ou derrière un meuble fait apparaître des monstres dans la maison',
   'Passer la pièce en revue avant de finir : blocs lumineux sous les tapis, dalles inférieures sur les surfaces cachées'],

  ['Sol uniforme d\'une pièce à l\'autre',
   'Sans changement au sol, la maison n\'a pas de seuils et toutes les pièces se ressemblent',
   'Changer de sol à chaque usage : dalles à l\'entrée, planches au salon, pierre à la cuisine et à l\'atelier'],

  ['Bâtiment posé sur une pelouse plate',
   'Sans abords, la construction paraît lâchée sur le terrain, quelle que soit sa qualité',
   'Allée bordée, bande de gravier au pied des murs, deux parterres, une clôture et un point d\'eau ou un banc'],

  ['Multiplier les cadres et bannières',
   'Trop d\'objets accrochés transforment les murs en panneau d\'affichage et masquent les matériaux',
   'Un mur porte au plus un ensemble d\'objets ; les autres restent nus pour laisser respirer le regard'],

  ['Copier un style sans le comprendre',
   'Mélanger arcs orientaux, colombage et béton donne un empilement de citations sans lieu',
   'Choisir une ambiance, dresser sa liste de blocs et de détails, et refuser tout ce qui n\'y figure pas']
];
