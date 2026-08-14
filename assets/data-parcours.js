/* ============================================================
   Codex Minecraft — le parcours d'une partie
   ---------------------------------------------------------------
   Le reste du site est un ouvrage de référence : on y va chercher
   une fiche. Ce fichier donne l'ORDRE — quoi faire, quand, et vers
   quelle fiche aller à chaque étape.

   PARCOURS : 24 étapes ordonnées (rendu type « fiche »).
   JALONS   : les repères qui prouvent qu'une phase est franchie.

   Script classique (var, pas de module) pour rester ouvrable en
   file:// sans serveur, comme tous les autres jeux de données.
   ============================================================ */

var GROUPES_PARCOURS = {
  debut:        'Les premiers jours',
  installation: 'S\'installer',
  equipement:   'Diamant, enchantement, XP',
  nether:       'Le Nether',
  end:          'L\'End',
  industrie:    'Industrialiser'
};

var PARCOURS = [

  /* ================= LES PREMIERS JOURS ================= */
  {
    id: 'p01',
    nom: 'Étape 1 — Les dix premières minutes',
    cat: 'debut',
    tags: [{ txt: 'Jour 1', cls: 'ok' }, { txt: 'Bloquant', cls: 'red' }],
    ou: 'Passer des mains nues à un jeu d\'outils en pierre. L\'étape est finie quand vous avez pioche, hache et épée en pierre, un four, et une pile de bûches en réserve.',
    drops: [
      'À faire — abattre 4 arbres, fabriquer un établi, une pioche en bois, puis miner 30 pierres',
      'À rapporter — outils en pierre, 1 four, 16 torches, 1 pile de bûches',
      'Optionnel — tuer 3 moutons croisés en chemin, leur laine servira au lit ce soir',
      'Voir — <a href="craft.html">les recettes de départ</a>',
      'Voir aussi — <a href="mecaniques.html">faim, saturation et délai d\'attaque</a>'
    ],
    note: 'L\'erreur classique est de repartir explorer avec huit bûches. Une pile entière couvre tout le premier jour, et revenir au bois coûte systématiquement une nuit.'
  },
  {
    id: 'p02',
    nom: 'Étape 2 — Survivre à la première nuit',
    cat: 'debut',
    tags: [{ txt: 'Nuit 1', cls: 'ok' }, { txt: 'Bloquant', cls: 'red' }],
    ou: 'Ne pas mourir et fixer un point de réapparition. C\'est gagné quand vous vous réveillez au matin dans un abri fermé, avec un lit posé et un coffre.',
    drops: [
      'À faire — creuser ou monter un abri fermé, y poser lit, four et coffre, murer l\'entrée',
      'À rapporter — un point de réapparition fixé et vos coordonnées notées',
      'Bloquant — sans 3 laines, pas de lit ; murez-vous alors et minez jusqu\'au matin',
      'Voir — <a href="plans.html#abri">l\'abri de première nuit</a>',
      'Voir aussi — <a href="drops.html">ce que lâchent les monstres de la nuit</a>'
    ],
    note: 'Dormir remet à zéro le compteur des phantoms. Trois nuits blanches d\'affilée et ils vous suivent partout, y compris pendant que vous construisez en hauteur.'
  },
  {
    id: 'p03',
    nom: 'Étape 3 — Le premier fer',
    cat: 'debut',
    tags: [{ txt: 'Jours 2–3', cls: 'ok' }],
    ou: 'Sortir de l\'âge de pierre. L\'étape est atteinte quand vous portez une armure de fer complète et que vous avez un seau, un bouclier et une pioche en fer.',
    drops: [
      'À faire — suivre une grotte éclairée à la torche, ou creuser droit vers Y 16',
      'À rapporter — armure complète, épée, pioche, seau, bouclier, 20 lingots d\'avance',
      'Raccourci — en montagne le fer affleure à ciel ouvert vers Y 232, sans creuser',
      'Voir — <a href="drops.html">la profondeur de chaque minerai</a>',
      'Voir aussi — <a href="plans.html#forge-village">la forge de village</a>'
    ],
    note: 'Le bouclier vaut plus que l\'armure au début. Il annule entièrement un tir de squelette et amortit l\'explosion d\'un creeper, pour deux planches et un lingot.'
  },
  {
    id: 'p04',
    nom: 'Étape 4 — Manger sans y penser',
    cat: 'debut',
    tags: [{ txt: 'Jours 3–6', cls: 'ok' }],
    ou: 'Supprimer définitivement la question de la nourriture. C\'est réglé quand vous produisez plus que vous ne consommez, sans y penser.',
    drops: [
      'À faire — labourer une parcelle autour d\'une source d\'eau et clôturer un enclos',
      'À rapporter — un coffre dédié qui contient en permanence 2 piles de vivres',
      'Raccourci — deux bêtes nourries au blé se reproduisent, tout l\'élevage part de là',
      'Voir — <a href="plans.html#ferme-ble">la parcelle de culture 9 × 9</a>',
      'Voir aussi — <a href="plans.html#enclos">l\'enclos d\'élevage compartimenté</a>',
      'Optionnel — <a href="usines.html#poulet">la ferme à poulets auto-cuiseur</a> règle la question pour de bon'
    ],
    note: 'Une culture ne pousse qu\'à partir d\'un niveau de lumière 9. Une ferme souterraine a donc besoin de lanternes autant que d\'eau, sinon elle reste bloquée.'
  },

  /* ================= S'INSTALLER ================= */
  {
    id: 'p05',
    nom: 'Étape 5 — Bâtir la vraie base',
    cat: 'installation',
    tags: [{ txt: 'Jours 6–12', cls: 'gold' }],
    ou: 'Remplacer le trou de survie par un atelier. L\'étape est finie quand tous vos postes de travail sont réunis au même endroit avec un mur de coffres étiquetés.',
    drops: [
      'À faire — monter un bâtiment fermé et éclairé, y rassembler établi, fours, enclume et coffres',
      'À rapporter — une base où rien n\'apparaît la nuit et où tout se retrouve en dix secondes',
      'Raccourci — voyez large tout de suite, agrandir plus tard coûte plus cher que bâtir grand',
      'Voir — <a href="plans.html#maison-bois">la maison de colon 9 × 7</a>',
      'Voir aussi — <a href="plans.html#stockage">l\'entrepôt à tri automatique</a>',
      'Confort — <a href="redstone.html#lampe-auto">l\'éclairage automatique</a> s\'allume à la tombée de la nuit'
    ],
    note: 'Éclairez aussi le toit et les vingt blocs autour du bâtiment. Les monstres n\'apparaissent pas à l\'intérieur mais juste derrière le mur, et vous attendent au matin.'
  },
  {
    id: 'p06',
    nom: 'Étape 6 — Les premières automatisations',
    cat: 'installation',
    tags: [{ txt: 'Jours 10–20', cls: 'gold' }],
    ou: 'Arrêter de fabriquer à la main ce que le jeu produit seul. C\'est atteint quand carburant, pierre et bois arrivent dans un coffre sans que vous interveniez.',
    drops: [
      'À faire — poser une fonderie, un générateur de pierre et une réserve de carburant',
      'À rapporter — un stock de charbon ou de bambou qui se remplit tout seul',
      'Voir — <a href="usines.html#four-auto">la fonderie automatique</a>',
      'Voir aussi — <a href="usines.html#cobble">le générateur de pierre</a>',
      'Carburant — <a href="usines.html#bambou">la ferme à bambou</a> ou <a href="usines.html#charbon-de-bois">le charbon de bois en boucle</a>',
      'Optionnel — <a href="usines.html#canne">la canne à sucre</a> pour le papier, puis les livres',
      'Optionnel — <a href="usines.html#arbre">la ferme à arbres</a> évite de repartir en forêt'
    ],
    note: 'Ces machines sont les moins spectaculaires du site et les seules dont vous vous servirez à chaque session pendant tout le reste de la partie.'
  },
  {
    id: 'p07',
    nom: 'Étape 7 — Le village et le commerce',
    cat: 'installation',
    tags: [{ txt: 'Dès que possible', cls: 'cyan' }, { txt: 'Gros raccourci', cls: 'ok' }],
    ou: 'Transformer les émeraudes en raccourci permanent. C\'est atteint quand un bibliothécaire vous vend Raccommodage et qu\'un autre villageois achète votre surplus.',
    drops: [
      'À faire — repérer un village, sécuriser ses lits, poser des lutrins pour choisir les métiers',
      'À rapporter — un livre de Raccommodage et un acheteur régulier pour vos cultures',
      'Raccourci — soigner un villageois zombifié donne une remise permanente sur toutes ses offres',
      'Voir — <a href="villageois.html">les 13 métiers et leurs offres</a>',
      'Voir aussi — <a href="usines.html#trading">le hall de commerce</a>',
      'Optionnel — <a href="usines.html#villageois-repro">la reproduction automatique</a> si le village est trop petit',
      'Optionnel — <a href="plans.html#village">le plan d\'un village complet</a> à bâtir de zéro'
    ],
    note: 'Tant qu\'un villageois n\'a jamais commercé, ses offres se relancent en cassant puis reposant son bloc de métier. Après le premier échange, elles sont figées à vie.'
  },

  /* ================= DIAMANT, ENCHANTEMENT, XP ================= */
  {
    id: 'p08',
    nom: 'Étape 8 — Descendre au diamant',
    cat: 'equipement',
    tags: [{ txt: 'Jours 12–20', cls: 'gold' }, { txt: 'Y −59', cls: '' }],
    ou: 'Ramener de quoi tailler une pioche en diamant et une table d\'enchantement. C\'est fini quand vous avez au moins 10 diamants, 30 lapis et une pile de redstone.',
    drops: [
      'À faire — creuser un tunnel principal à Y −59, puis des galeries parallèles tous les 3 blocs',
      'À rapporter — pioche en diamant, table d\'enchantement, lapis et redstone en réserve',
      'Bloquant — descendez avec un seau d\'eau, 3 piles de blocs pleins et de quoi manger',
      'Voir — <a href="plans.html#mine">la mine aménagée à Y −59</a>',
      'Voir aussi — <a href="plans.html#camp-mineurs">le camp de mineurs</a>',
      'Optionnel — <a href="usines.html#amethyste">la géode d\'améthyste</a> se croise souvent sur le trajet'
    ],
    note: 'Diamant et redstone culminent sur la même couche : un seul tunnel bien placé rapporte les deux. Deux expéditions séparées coûtent deux fois plus de temps pour le même butin.'
  },
  {
    id: 'p09',
    nom: 'Étape 9 — La table niveau 30',
    cat: 'equipement',
    tags: [{ txt: 'Après le diamant', cls: 'gold' }],
    ou: 'Pouvoir lancer des enchantements de niveau 30 à volonté. C\'est atteint quand la table affiche 30 et qu\'un stock de lapis permet de relancer sans attendre.',
    drops: [
      'À faire — disposer 15 bibliothèques autour de la table, un bloc d\'air entre elles et vous',
      'À rapporter — table niveau 30, enclume, meule, et de quoi les alimenter',
      'Bloquant — 15 bibliothèques valent 45 livres, donc 45 cuirs ; prévoyez les vaches en amont',
      'Voir — <a href="plans.html#enchant">la salle d\'enchantement niveau 30</a>',
      'Voir aussi — <a href="enchantements.html">les enchantements à viser en priorité</a>',
      'Raccourci — <a href="usines.html#trading">un bibliothécaire</a> vend les mêmes livres contre des émeraudes',
      'Optionnel — <a href="plans.html#bibliotheque">la bibliothèque monumentale</a> pour loger tout cela'
    ],
    note: 'La seizième bibliothèque est purement décorative. La meule, elle, sert vraiment : elle désenchante un objet raté et vous rend une partie de l\'XP dépensée.'
  },
  {
    id: 'p10',
    nom: 'Étape 10 — Une ferme à XP qui tourne',
    cat: 'equipement',
    tags: [{ txt: 'Après la table', cls: 'gold' }],
    ou: 'Ne plus jamais manquer de niveaux. L\'étape est finie quand vous remontez de 0 à 30 en moins de dix minutes sans quitter votre base.',
    drops: [
      'À faire — aménager un générateur de donjon trouvé en grotte, ou monter une tour à mobs',
      'À rapporter — un poste de mise à mort où l\'XP et les objets arrivent au même endroit',
      'Raccourci — un générateur existant demande dix fois moins de blocs qu\'une tour complète',
      'Voir — <a href="usines.html#mob-spawner">la ferme à XP sur générateur</a>',
      'Voir aussi — <a href="usines.html#mobfarm">la tour à mobs générale</a>',
      'Optionnel — <a href="usines.html#creeper">la ferme à creepers</a> pour la poudre à canon des fusées'
    ],
    note: 'Une chute de 24 blocs laisse le mob à un point de vie. Vous l\'achevez d\'un coup et récupérez la totalité de l\'XP, ce qu\'une chute franchement mortelle ne donne pas.'
  },
  {
    id: 'p11',
    nom: 'Étape 11 — L\'équipement avant le Nether',
    cat: 'equipement',
    tags: [{ txt: 'Avant le portail', cls: 'red' }, { txt: 'Bloquant', cls: 'red' }],
    ou: 'Partir dans le Nether avec du matériel qui pardonne les erreurs. C\'est prêt quand votre armure est enchantée et qu\'un jeu de secours dort dans un coffre.',
    drops: [
      'À faire — enchanter armure, épée, arc et pioche, puis entretenir le tout au Raccommodage',
      'À rapporter — Protection IV, Solidité III, Efficacité IV, et Fortune III sur une pioche à part',
      'Bloquant — au moins une pièce d\'armure en or, sans quoi les piglins attaquent à vue',
      'Voir — <a href="enchantements.html">les quatre équipements à viser</a>',
      'Voir aussi — <a href="craft.html">les recettes des postes de travail</a>'
    ],
    note: 'Rangez un briquet et 10 obsidiennes dans une boîte à part. Un ghast qui détruit votre portail vous laisse sinon coincé côté Nether, sans aucun moyen de rentrer.'
  },

  /* ================= LE NETHER ================= */
  {
    id: 'p12',
    nom: 'Étape 12 — Ouvrir et sécuriser le portail',
    cat: 'nether',
    tags: [{ txt: 'Le Nether', cls: 'red' }, { txt: 'Bloquant', cls: 'red' }],
    ou: 'Entrer dans le Nether et pouvoir en ressortir à coup sûr. L\'étape est réussie quand l\'arrivée est enfermée dans une salle close et signalée par un panneau.',
    drops: [
      'À faire — poser 10 obsidiennes en cadre, allumer, puis murer aussitôt l\'arrivée d\'en face',
      'À rapporter — les coordonnées des deux portails écrites sur un panneau, des deux côtés',
      'Bloquant — aucune ouverture vers l\'extérieur, un ghast tire dans un couloir droit',
      'Voir — <a href="plans.html#portail">le portail du Nether sécurisé</a>',
      'Voir aussi — <a href="mecaniques.html">le rapport 1 pour 8 entre les dimensions</a>',
      'Optionnel — <a href="plans.html#base-nether">un fort du Nether</a> comme camp de base avancé'
    ],
    note: 'Deux portails du Surworld distants de moins de 128 blocs se relient au même portail côté Nether. C\'est la cause numéro un des arrivées au mauvais endroit.'
  },
  {
    id: 'p13',
    nom: 'Étape 13 — La forteresse du Nether',
    cat: 'nether',
    tags: [{ txt: 'Le Nether', cls: 'red' }, { txt: 'Bloquant', cls: 'red' }],
    ou: 'Ramener les bâtons de Blaze et la verrue du Nether. Sans eux il n\'y a ni potion ni œil de l\'Ender ; c\'est fait quand un alambic peut être posé.',
    drops: [
      'À faire — longer les couloirs de briques du Nether jusqu\'à un générateur de blazes',
      'À rapporter — 10 bâtons de Blaze, 3 verrues du Nether, une pile de sable des âmes',
      'Bloquant — pas de bâton de Blaze, pas d\'alambic, donc pas de poudre et pas d\'œil de l\'Ender',
      'Voir — <a href="structures.html">le butin de la forteresse</a>',
      'Optionnel — <a href="usines.html#wither-skel">la ferme à crânes de wither</a> se construit sur place'
    ],
    note: 'Un mur de deux blocs devant le générateur casse la ligne de tir des blazes, et les boules de neige les blessent. C\'est plus efficace qu\'une meilleure armure.'
  },
  {
    id: 'p14',
    nom: 'Étape 14 — Bastion, or et débris antiques',
    cat: 'nether',
    tags: [{ txt: 'Le Nether', cls: 'red' }],
    ou: 'Ramener de quoi passer à la netherite. L\'étape est atteinte quand vous avez le modèle de forge d\'amélioration et au moins 4 débris antiques.',
    drops: [
      'À faire — piller un vestige de bastion, puis creuser autour de Y 15 à la pioche ou au lit',
      'À rapporter — le modèle d\'amélioration netherite, 4 débris antiques, une pile de lingots d\'or',
      'Raccourci — troquer de l\'or avec les piglins rend perles de l\'Ender, obsidienne et flèches',
      'Voir — <a href="structures.html">les coffres du bastion</a>',
      'Voir aussi — <a href="usines.html#or">la ferme à or automatique</a>'
    ],
    note: 'Un lit posé dans le Nether explose, et c\'est précisément ce qui sert à dégager les débris antiques. Placez-le au bout du tunnel, activez-le deux blocs en retrait, recommencez.'
  },
  {
    id: 'p15',
    nom: 'Étape 15 — Passer à la netherite',
    cat: 'nether',
    tags: [{ txt: 'Le Nether', cls: 'red' }, { txt: 'Optionnel', cls: '' }],
    ou: 'Mettre l\'équipement critique à l\'abri du feu et de la perte. C\'est fait quand pioche et plastron flottent sur la lave au lieu de brûler.',
    drops: [
      'À faire — fondre les débris en éclats, puis assembler 4 éclats et 4 lingots d\'or',
      'À rapporter — au minimum une pioche et un plastron en netherite',
      'Optionnel — le reste de l\'armure peut attendre, le gain par pièce supplémentaire est faible',
      'Raccourci — 1 modèle, 7 diamants et 1 netherrack rendent 2 modèles de forge',
      'Voir — <a href="craft.html">l\'amélioration à la table de forge</a>'
    ],
    note: 'La netherite n\'ajoute presque pas de protection. Ce qu\'elle apporte, c\'est de ne plus brûler et de ne plus couler : c\'est une assurance, pas un gain de puissance.'
  },
  {
    id: 'p16',
    nom: 'Étape 16 — Ouvrir l\'atelier de brassage',
    cat: 'nether',
    tags: [{ txt: 'Après la forteresse', cls: 'red' }],
    ou: 'Avoir des potions sous la main en permanence. C\'est en place quand un coffre contient Résistance au feu, Vision nocturne et Force sans que vous ayez à brasser dans l\'urgence.',
    drops: [
      'À faire — poser un alambic, planter la verrue sur du sable des âmes, brasser par lots',
      'À rapporter — 8 potions de Résistance au feu et 4 de Vision nocturne en réserve',
      'Bloquant — la Résistance au feu est ce qui rend le minage des débris antiques supportable',
      'Voir — <a href="potions.html">toute la chaîne de brassage</a>',
      'Raccourci — la redstone allonge la durée, la poudre de lueur renforce l\'effet'
    ],
    note: 'Brassez toujours par trois fioles à la fois : l\'alambic en traite trois pour un seul ingrédient. Les faire une par une triple la consommation de verrue du Nether.'
  },

  /* ================= L'END ================= */
  {
    id: 'p17',
    nom: 'Étape 17 — Les yeux et la forteresse',
    cat: 'end',
    tags: [{ txt: 'L\'End', cls: 'purple' }, { txt: 'Bloquant', cls: 'red' }],
    ou: 'Trouver le portail de l\'End et l\'allumer. C\'est fait quand les 12 cadres sont pourvus et que le vide étoilé apparaît sous vos pieds.',
    drops: [
      'À faire — assembler perles et poudre de Blaze, lancer les yeux et suivre leur trajectoire',
      'À rapporter — 15 yeux de l\'Ender, un lit posé près du portail, des vivres pour deux jours',
      'Bloquant — un œil lancé sur cinq se brise, comptez large avant de partir',
      'Voir — <a href="structures.html">la forteresse et ses coffres</a>',
      'Raccourci — <a href="usines.html#trading">un clerc</a> vend des perles de l\'Ender contre des émeraudes'
    ],
    note: 'Certains cadres sont déjà pourvus à la génération. Comptez-les avant de gaspiller vos yeux, il est rare qu\'il en manque douze.'
  },
  {
    id: 'p18',
    nom: 'Étape 18 — Le dragon de l\'Ender',
    cat: 'end',
    tags: [{ txt: 'L\'End', cls: 'purple' }],
    ou: 'Abattre le dragon. C\'est terminé quand le portail de sortie s\'ouvre et que la passerelle vers les îles extérieures apparaît.',
    drops: [
      'À faire — détruire au tir les cristaux des tours, en gérant à part ceux qui sont grillagés',
      'À rapporter — l\'œuf du dragon et une belle réserve de perles ramassées sur place',
      'Bloquant — n\'emportez rien que vous ne puissiez perdre, ce qui tombe dans le vide est perdu',
      'Voir — <a href="succes.html">les succès liés au dragon</a>',
      'Raccourci — un lit activé au bon moment inflige des dégâts énormes à la tête du dragon'
    ],
    note: 'Regardez vos pieds quand un enderman passe, ou portez une citrouille sculptée. Un seul regard croisé transforme un combat maîtrisé en mêlée générale.'
  },
  {
    id: 'p19',
    nom: 'Étape 19 — Ramener l\'élytre',
    cat: 'end',
    tags: [{ txt: 'L\'End', cls: 'purple' }, { txt: 'Change tout', cls: 'cyan' }],
    ou: 'Obtenir une élytre. C\'est réussi quand vous décollez à la fusée depuis votre base et traversez la carte sans toucher le sol.',
    drops: [
      'À faire — prendre la passerelle, rejoindre une cité de l\'End, y chercher le navire amarré',
      'À rapporter — une élytre, une tête de dragon, et de quoi fabriquer des fusées',
      'Bloquant — l\'élytre ne se trouve que dans le navire de l\'End, nulle part ailleurs',
      'Voir — <a href="structures.html">la cité et le navire de l\'End</a>',
      'Raccourci — la poudre à canon d\'<a href="usines.html#creeper">une ferme à creepers</a> alimente les fusées à vie'
    ],
    note: 'Mettez Raccommodage sur l\'élytre dès que possible, sinon il faut la réparer à l\'enclume avec des membranes de phantom. Elle lâche toujours au pire moment.'
  },
  {
    id: 'p20',
    nom: 'Étape 20 — Les boîtes de shulker',
    cat: 'end',
    tags: [{ txt: 'L\'End', cls: 'purple' }],
    ou: 'Régler le problème de l\'inventaire une fois pour toutes. C\'est atteint quand vous transportez un chantier entier en une seule fournée.',
    drops: [
      'À faire — piller plusieurs cités, tuer les shulkers, assembler carapaces et coffres',
      'À rapporter — au moins 6 boîtes de shulker et un stock de blocs de purpur',
      'Voir — <a href="usines.html#shulker-dup">la ferme à shulkers par duplication</a>',
      'Voir aussi — <a href="usines.html#enderman">la ferme à endermen</a>, la plus rentable en XP du jeu',
      'Optionnel — les coffres de cité rendent souvent une armure en diamant déjà enchantée'
    ],
    note: 'Deux carapaces suffisent pour une boîte, et une boîte cassée conserve son contenu. C\'est le seul conteneur du jeu qui se transporte plein.'
  },

  /* ================= INDUSTRIALISER ================= */
  {
    id: 'p21',
    nom: 'Étape 21 — Les fermes de production',
    cat: 'industrie',
    tags: [{ txt: 'Fin de partie', cls: 'cyan' }],
    ou: 'Faire produire la base pendant que vous jouez ailleurs. C\'est en place quand fer, or et émeraudes s\'accumulent sans que vous y touchiez.',
    drops: [
      'À faire — installer une ferme à fer, puis une ferme à raids pour les totems et les émeraudes',
      'À rapporter — un coffre de fer qui déborde et 3 totems d\'immortalité en réserve',
      'Voir — <a href="usines.html#fer">la ferme à fer</a>',
      'Voir aussi — <a href="usines.html#raid">la ferme à raids</a>',
      'Optionnel — <a href="usines.html#guardian">le monument océanique</a> pour la prismarine et les éponges',
      'Optionnel — <a href="usines.html#compacteur">le compacteur automatique</a> range la production en blocs'
    ],
    note: 'Trois villageois et trois lits suffisent à faire apparaître un golem. Toute ferme à fer plus compliquée que cela augmente le débit, elle ne change pas la mécanique.'
  },
  {
    id: 'p22',
    nom: 'Étape 22 — Tri automatique et réseau',
    cat: 'industrie',
    tags: [{ txt: 'Fin de partie', cls: 'cyan' }],
    ou: 'Ne plus ranger à la main ni voyager à pied. C\'est fini quand vider son inventaire prend un clic et rejoindre n\'importe quel point de la carte, une minute.',
    drops: [
      'À faire — poser une ligne de tri sous l\'entrepôt et relier tous les portails à un hub central',
      'À rapporter — un mur de coffres étiquetés et une carte des tunnels affichée au hub',
      'Voir — <a href="usines.html#trieur">le trieur automatique</a>',
      'Voir aussi — <a href="usines.html#nether-hub">le réseau de transport du Nether</a>',
      'Optionnel — <a href="usines.html#tri-double">le rangement à double tri</a> pour les blocs compactés',
      'Confort — <a href="usines.html#ascenseur">un ascenseur à bulles</a> relie les étages en deux secondes',
      'Confort — <a href="redstone.html#detect-plein">détecter un coffre plein</a> évite les objets au sol'
    ],
    note: 'Un entonnoir avale 2,5 objets par seconde. Au-delà, doublez la ligne : une ferme rapide branchée sur une seule ligne de tri finit toujours par recracher au sol.'
  },
  {
    id: 'p23',
    nom: 'Étape 23 — Balise et conduit',
    cat: 'industrie',
    tags: [{ txt: 'Fin de partie', cls: 'cyan' }],
    ou: 'Installer les effets permanents. C\'est atteint quand Hâte II couvre votre zone de chantier et qu\'un conduit rend l\'eau respirable autour du site sous-marin.',
    drops: [
      'À faire — invoquer le Wither très loin de la base, puis monter la pyramide sous la balise',
      'À rapporter — une balise à 4 niveaux, soit 164 blocs de fer, d\'or, de diamant ou d\'émeraude',
      'Bloquant — 3 crânes de squelette wither, qui tombent rarement sans Butin III',
      'Voir — <a href="usines.html#wither-skel">la ferme à crânes de wither</a>',
      'Voir aussi — <a href="plans.html#sous-marine">la base sous-marine et son conduit</a>',
      'Optionnel — <a href="plans.html#tour">une tour de guet</a> pour poser la balise en hauteur'
    ],
    note: 'Hâte II double la vitesse de minage sur tous vos chantiers. C\'est le seul objet du jeu dont le gain se ressent littéralement à chaque minute de jeu.'
  },
  {
    id: 'p24',
    nom: 'Étape 24 — Les grands chantiers',
    cat: 'industrie',
    tags: [{ txt: 'Sans fin', cls: '' }],
    ou: 'Se servir de tout ce qui précède pour construire ce qui vous plaît. Il n\'y a plus de condition de sortie, seulement des projets.',
    drops: [
      'À faire — choisir un plan, préparer les matériaux en boîtes de shulker, bâtir d\'une traite',
      'À rapporter — rien, cette étape ne produit que des bâtiments',
      'Voir — <a href="plans.html#chateau">le château fort</a>',
      'Voir aussi — <a href="plans.html#cathedrale">la cathédrale</a>',
      'Palettes — <a href="blocs.html">les 17 palettes de styles</a> évitent les façades monotones',
      'Optionnel — <a href="plans.html#grange">la grange à charpente</a> pour s\'échauffer avant le reste',
      'Optionnel — <a href="redstone.html#porte-2x2">une porte cachée à pistons</a> pour l\'entrée principale'
    ],
    note: 'Chaque plan du site calcule sa propre liste de matériaux. Lancez le calcul avant de partir miner, pas au milieu du chantier avec trois coffres à moitié vides.'
  }
];

/* ============================================================
   Les jalons : pas des étapes, mais des preuves.
   [ Jalon, Comment savoir qu'il est franchi, Ce qu'il débloque ]
   ============================================================ */

var JALONS = [
  ['Premier lit posé',
    'Vous vous réveillez au matin exactement où vous vous êtes couché',
    'Point de réapparition fixé, et plus aucun phantom au-dessus de la base'],

  ['Armure de fer complète',
    'Les quatre pièces portées, un bouclier dans la main gauche',
    'Grottes, ravins et nuits en extérieur cessent d\'être des paris'],

  ['Nourriture autonome',
    'Le coffre à vivres se remplit plus vite qu\'il ne se vide',
    'Des expéditions de plusieurs jours sans repasser par la base'],

  ['Pioche en diamant',
    'Trois diamants dépensés, l\'obsidienne devient minable',
    'Le portail du Nether et la table d\'enchantement'],

  ['Table d\'enchantement niveau 30',
    '15 bibliothèques posées, la table propose bien 30 dans le troisième emplacement',
    'Protection IV, Efficacité IV, Fortune III, Raccommodage'],

  ['Ferme à XP en service',
    'De 0 à 30 niveaux en moins de dix minutes sans quitter la base',
    'Enchanter et réparer à l\'enclume sans jamais compter ses niveaux'],

  ['Première ferme automatique',
    'Un coffre s\'est rempli pendant que vous faisiez autre chose',
    'Le temps de jeu bascule de la récolte vers la construction'],

  ['Portail du Nether sécurisé',
    'Les deux portails sont murés, signalés, et leurs coordonnées notées',
    'Le Nether, et le voyage rapide au rapport 1 pour 8'],

  ['Bâtons de Blaze en poche',
    'Un alambic est posé et la verrue pousse sur du sable des âmes',
    'Toutes les potions, et les yeux de l\'Ender'],

  ['Modèle de forge netherite',
    'Le modèle est en coffre et les débris sont déjà fondus en éclats',
    'Un équipement qui ne brûle plus et ne coule plus dans la lave'],

  ['Dragon vaincu',
    'Le portail de sortie s\'est ouvert au centre de l\'île principale',
    'La passerelle, les îles extérieures et les cités de l\'End'],

  ['Élytre équipée',
    'Vous décollez à la fusée depuis la base et atterrissez où vous voulez',
    'Toute la carte devient accessible en quelques minutes'],

  ['Six boîtes de shulker',
    'Le coffre de voyage contient six boîtes prêtes à partir',
    'Les grands chantiers et les déménagements en une seule fournée'],

  ['Totem d\'immortalité',
    'Un totem reste en permanence dans la main secondaire',
    'Une erreur ne coûte plus l\'inventaire complet'],

  ['Balise à 4 niveaux',
    'Hâte II est active sur toute la zone de base, sans interruption',
    'Un minage deux fois plus rapide sur tous les chantiers'],

  ['Tri automatique en service',
    'Vider son inventaire tient en un clic dans le coffre d\'entrée',
    'Une base qui reste rangée toute seule, définitivement']
];
