/* ============================================================
   Données : plans de construction
   Chaque plan est vu de dessus, couche par couche (Y+0, Y+1…).
   Une case = un bloc. « . » = air.
   ============================================================ */

/* Blocs supplémentaires propres aux plans */
(function (extra) {
  for (var k in extra) { if (extra.hasOwnProperty(k)) { BLOCKS[k] = extra[k]; } }
}({
  '&': { n: 'Bibliothèque',            c: '#8a6a3e' },
  '$': { n: 'Table d\'enchantement',   c: '#3b2b4d' },
  '(': { n: 'Enclume',                 c: '#3f3f47' },
  '<': { n: 'Lit',                     c: '#b4392c' },
  '{': { n: 'Composteur',              c: '#7a5a34' },
  '}': { n: 'Cloche',                  c: '#e0b34a' },
  '>': { n: 'Porte en fer',            c: '#b6b6b6' },
  '?': { n: 'Alambic',                 c: '#8f8f8f' },
  ',': { n: 'Tapis / chemin de terre', c: '#8a6f4a' },
  ';': { n: 'Trône / bannière (décor)', c: '#8c2b2b' }
}));

/* Ordre et libellés des groupes du sommaire */
var GROUPES_PLANS = {
  maison:    'Habitations',
  chateau:   'Châteaux',
  ville:     'Village & ouvrages',
  ferme:     'Agricole',
  technique: 'Bâtiments techniques'
};

var PLANS = [

  /* ================= SURVIE ================= */
  {
    id: 'abri', nom: 'Abri de première nuit', cat: 'maison',
    taille: '5 × 5 × 3', diff: 'Débutant',
    desc: 'À construire dans les dix premières minutes. Objectif : survivre à la nuit 1 avec un lit, un four et un coffre — rien de plus.',
    mats: ['≈70 blocs de pierre ou de terre', '1 porte en bois', '1 lit (3 laines + 3 planches)', '1 établi · 1 coffre · 1 four', '4 torches'],
    couches: [
      { t: 'Y+0 · plancher', g: ['ccccc', 'ccccc', 'ccccc', 'ccccc', 'ccccc'] },
      { t: 'Y+1 · murs & mobilier', g: ['ccccc', 'c<<.c', 'c...c', 'cYEUc', 'ccDcc'] },
      { t: 'Y+2 · murs & torches', g: ['ccccc', 'c*..c', 'c...c', 'c..*c', 'ccDcc'] },
      { t: 'Y+3 · toit', g: ['ccccc', 'ccccc', 'ccccc', 'ccccc', 'ccccc'] }
    ],
    etapes: [
      'Creusez ou nivelez un carré de 5×5 — sur une colline, entrer dans le flanc est encore plus rapide.',
      'Montez les quatre murs sur 2 blocs de haut en laissant un trou de 1×2 pour la porte, côté sud.',
      'Fermez le toit intégralement : un plafond ouvert laisse tomber les araignées et les phantoms.',
      'Posez le lit contre le mur nord, puis dormez immédiatement pour fixer votre réapparition.',
      'Installez établi, coffre et four le long du mur sud ; éclairez avec 2 torches (niveau de lumière ≥ 1 partout empêche l\'apparition de monstres).'
    ],
    notes: [
      { type: 'tip', txt: 'Astuce — un mur d\'un seul bloc d\'épaisseur suffit contre tout sauf le creeper : ajoutez une deuxième couche si vous êtes en terrain découvert.' }
    ]
  },
  {
    id: 'maison-bois', nom: 'Maison de colon 9 × 7', cat: 'maison',
    taille: '9 × 7 × 8', diff: 'Débutant',
    desc: 'La maison « qui tient toute la partie » : assez grande pour un atelier, assez simple pour être bâtie en une journée de jeu.',
    mats: ['≈220 planches de chêne', '≈60 rondins (coins et poutres)', '24 vitres', '≈130 escaliers pour le toit', '1 porte · 6 lanternes'],
    couches: [
      {
        t: 'Y+0 · plancher (9×7)',
        g: [
          '...........',
          '.#########.',
          '.#########.',
          '.#########.',
          '.#########.',
          '.#########.',
          '.#########.',
          '.#########.',
          '...........'
        ]
      },
      {
        t: 'Y+1 · murs + porte',
        g: [
          '...........',
          '.o#######o.',
          '.#.......#.',
          '.#.......#.',
          '.#.......#.',
          '.#.......#.',
          '.#.......#.',
          '.o###D###o.',
          '...........'
        ]
      },
      {
        t: 'Y+2 · fenêtres',
        g: [
          '...........',
          '.o#GG#GG#o.',
          '.G.......G.',
          '.#.......#.',
          '.G.......G.',
          '.#.......#.',
          '.G.......G.',
          '.o#GGDGG#o.',
          '...........'
        ]
      },
      {
        t: 'Y+3 · haut de mur',
        g: [
          '...........',
          '.ooooooooo.',
          '.o.......o.',
          '.o.......o.',
          '.o.......o.',
          '.o.......o.',
          '.o.......o.',
          '.ooooooooo.',
          '...........'
        ]
      },
      {
        t: 'Y+4 · toit, anneau 1 (11×9)',
        g: [
          '///////////',
          '/........./',
          '/........./',
          '/........./',
          '/........./',
          '/........./',
          '/........./',
          '/........./',
          '///////////'
        ]
      },
      {
        t: 'Y+5 · toit, anneau 2 (9×7)',
        g: [
          '...........',
          './////////.',
          './......./.',
          './......./.',
          './......./.',
          './......./.',
          './......./.',
          './////////.',
          '...........'
        ]
      },
      {
        t: 'Y+6 · toit, anneau 3 (7×5)',
        g: [
          '...........',
          '...........',
          '..///////..',
          '../...../..',
          '../...../..',
          '../...../..',
          '..///////..',
          '...........',
          '...........'
        ]
      },
      {
        t: 'Y+7 · faîtage (5×3)',
        g: [
          '...........',
          '...........',
          '...........',
          '...-----...',
          '...-----...',
          '...-----...',
          '...........',
          '...........',
          '...........'
        ]
      }
    ],
    etapes: [
      'Tracez l\'emprise 9×7 et posez le plancher : partez d\'un sol parfaitement plat, tout le reste en dépend.',
      'Montez les quatre coins en rondins sur 3 blocs de haut — ce sont vos poteaux, ils structurent visuellement la façade.',
      'Remplissez les murs en planches en laissant les ouvertures de fenêtres à hauteur Y+2 et l\'ouverture de porte au sud.',
      'Ceinturez le sommet du mur d\'une rangée de rondins : ce bandeau sépare le mur du toit et évite l\'effet « boîte ».',
      'Le toit — anneau par anneau : chaque couche est un rectangle d\'escaliers 2 blocs plus étroit que la précédente, décalé d\'un bloc vers l\'intérieur.',
      'Terminez le faîtage avec une ligne de dalles, puis remplissez les pignons (les triangles avant/arrière) en planches.',
      'Intérieur : cheminée en pierre au fond, atelier (établi, four, coffres) contre un mur, lit et coffre personnel de l\'autre côté.'
    ],
    notes: [
      { type: 'tip', txt: 'Règle des 3 matériaux — un bâtiment lisible utilise un matériau principal (planches), un matériau de structure (rondins) et un matériau de détail (escaliers, dalles). Au-delà, ça devient brouillon.' },
      { type: 'warn', txt: 'Éclairage — 6 lanternes à l\'intérieur et 4 en façade. Toute case sombre à l\'intérieur d\'un bâtiment est un point d\'apparition de zombie.' }
    ]
  },
  {
    id: 'tour', nom: 'Tour de guet / phare', cat: 'maison',
    taille: '7 × 7 × 20', diff: 'Intermédiaire',
    desc: 'Repère visible à 200 blocs, poste d\'observation et point de récupération d\'élytre. Sert aussi de cheminée de mine.',
    mats: ['≈400 briques de pierre', '≈60 escaliers en pierre', '24 vitres', '4 lanternes marines ou blocs de lumière', '1 échelle × 20'],
    couches: [
      { t: 'Y+0 · fondation (7×7)', g: ['.bbbbb.', 'bbbbbbb', 'bbbbbbb', 'bbbbbbb', 'bbbbbbb', 'bbbbbbb', '.bbbbb.'] },
      { t: 'Y+1…Y+15 · fût (à répéter)', g: ['.bbbbb.', 'b.....b', 'b..L..b', 'b.....b', 'b.....b', 'b.....b', '.bbbbb.'] },
      { t: 'Y+16 · plateforme', g: ['.bbbbb.', 'bbbbbbb', 'bb...bb', 'bb.L.bb', 'bb...bb', 'bbbbbbb', '.bbbbb.'] },
      { t: 'Y+17 → Y+18 · lanternon vitré (à répéter)', g: ['.GGGGG.', 'G.....G', 'G..*..G', 'G.....G', 'G.....G', 'G.....G', '.GGGGG.'] },
      { t: 'Y+19 · créneaux', g: ['.b.b.b.', 'b.....b', '.......', 'b.....b', '.......', 'b.....b', '.b.b.b.'] }
    ],
    etapes: [
      'Choisissez un point haut : une tour au fond d\'une vallée ne sert à rien comme repère.',
      'Montez le fût 7×7 en briques de pierre sur 15 blocs, avec l\'échelle centrée sur le mur nord.',
      'Tous les 5 blocs, insérez une rangée d\'un matériau contrasté (pierre taillée, escaliers en saillie) : c\'est ce qui empêche la tour de ressembler à un tuyau.',
      'Au sommet, élargissez d\'un bloc pour créer un encorbellement en escaliers inversés — le détail qui donne l\'échelle.',
      'Vitrez le lanternon et posez la source de lumière au centre : une lanterne marine ou un bloc de froglight porte très loin la nuit.',
      'Ajoutez les créneaux, puis un paratonnerre en cuivre au sommet : il détourne la foudre et protège la structure.'
    ],
    notes: [
      { type: 'info', txt: 'Usage pratique — placez un lit au pied de la tour et un coffre à élytre en haut : elle devient votre rampe de lancement pour toute exploration.' }
    ]
  },

  /* ================= CHÂTEAUX ================= */
  {
    id: 'chateau', nom: 'Château fort — plan de masse 25 × 25', cat: 'chateau',
    taille: '25 × 25 × 12', diff: 'Avancé',
    desc: 'Enceinte carrée, quatre tours d\'angle, châtelet d\'entrée au sud et donjon central 9 × 9. Le plan classique, compact et défendable.',
    mats: ['≈3 500 briques de pierre (mur : 25 × 4 × 4 faces)', '≈900 briques moussues et fissurées (pour vieillir)', '≈400 escaliers · 300 dalles', '≈200 murets pour les créneaux', '2 portes en fer + plaques de pression'],
    couches: [
      {
        t: 'Y+0 · plan de masse (mur + tours + donjon)',
        g: [
          'ccccccccccccccccccccccccc',
          'c...c...............c...c',
          'c...c...............c...c',
          'c...c...............c...c',
          'ccccc...............ccccc',
          'c.......................c',
          'c.......................c',
          'c.......................c',
          'c.......bbbbbbbbb.......c',
          'c.......b.......b.......c',
          'c.......b.......b.......c',
          'c.......b.......b.......c',
          'c.......b...;...b.......c',
          'c.......b.......b.......c',
          'c.......b.......b.......c',
          'c.......b.......b.......c',
          'c.......bbbb>bbbb.......c',
          'c.......................c',
          'c.......................c',
          'c.......................c',
          'ccccc...............ccccc',
          'c...c...............c...c',
          'c...c...............c...c',
          'c...c...............c...c',
          'ccccccccccc^^^ccccccccccc'
        ]
      },
      {
        t: 'Y+1 · les murs montent, les deux portes restent ouvertes',
        g: [
          'ccccccccccccccccccccccccc',
          'c...c...............c...c',
          'c...c...............c...c',
          'c...c...............c...c',
          'ccccc...............ccccc',
          'c.......................c',
          'c.......................c',
          'c.......................c',
          'c.......bbbbbbbbb.......c',
          'c.......b.......b.......c',
          'c.......b.......b.......c',
          'c.......b.......b.......c',
          'c.......b.......b.......c',
          'c.......b.......b.......c',
          'c.......b.......b.......c',
          'c.......b.......b.......c',
          'c.......bbbb>bbbb.......c',
          'c.......................c',
          'c.......................c',
          'c.......................c',
          'ccccc...............ccccc',
          'c...c...............c...c',
          'c...c...............c...c',
          'c...c...............c...c',
          'ccccccccccc^^^ccccccccccc'
        ]
      },
      {
        t: 'Y+2 → Y+4 · linteaux posés, murs pleins (à répéter)',
        g: [
          'ccccccccccccccccccccccccc',
          'c...c...............c...c',
          'c...c...............c...c',
          'c...c...............c...c',
          'ccccc...............ccccc',
          'c.......................c',
          'c.......................c',
          'c.......................c',
          'c.......bbbbbbbbb.......c',
          'c.......b.......b.......c',
          'c.......b.......b.......c',
          'c.......b.......b.......c',
          'c.......b.......b.......c',
          'c.......b.......b.......c',
          'c.......b.......b.......c',
          'c.......b.......b.......c',
          'c.......bbbbbbbbb.......c',
          'c.......................c',
          'c.......................c',
          'c.......................c',
          'ccccc...............ccccc',
          'c...c...............c...c',
          'c...c...............c...c',
          'c...c...............c...c',
          'ccccccccccccccccccccccccc'
        ]
      },
      {
        t: 'Y+5 · chemin de ronde',
        g: [
          'ccccccccccccccccccccccccc',
          'c...c...............c...c',
          'c...c...............c...c',
          'c...c...............c...c',
          'ccccc...............ccccc',
          'c.......................c',
          'c.......................c',
          'c.......................c',
          'c.......................c',
          'c.......................c',
          'c.......................c',
          'c.......................c',
          'c.......................c',
          'c.......................c',
          'c.......................c',
          'c.......................c',
          'c.......................c',
          'c.......................c',
          'c.......................c',
          'c.......................c',
          'ccccc...............ccccc',
          'c...c...............c...c',
          'c...c...............c...c',
          'c...c...............c...c',
          'ccccccccccccccccccccccccc'
        ]
      },
      {
        t: 'Y+6 · créneaux',
        g: [
          'M.M.M.M.M.M.M.M.M.M.M.M.M',
          '.........................',
          'M.......................M',
          '.........................',
          'M.......................M',
          '.........................',
          'M.......................M',
          '.........................',
          'M.......................M',
          '.........................',
          'M.......................M',
          '.........................',
          'M.......................M',
          '.........................',
          'M.......................M',
          '.........................',
          'M.......................M',
          '.........................',
          'M.......................M',
          '.........................',
          'M.......................M',
          '.........................',
          'M.......................M',
          '.........................',
          'M.M.M.M.M.M.M.M.M.M.M.M.M'
        ]
      }
    ],
    etapes: [
      'Aplanissez une plateforme de 31 × 31 : il faut 3 blocs de dégagement autour du mur pour le fossé et les abords.',
      'Tracez le carré de 25 × 25 en briques de pierre au sol, puis marquez les quatre tours d\'angle (carrés de 5 × 5).',
      'Montez l\'enceinte à 5 blocs de haut, épaisseur 1. Doublez l\'épaisseur en partie basse (talus) : c\'est ce qui donne une impression de masse.',
      'Montez les quatre tours à 9 blocs — soit 4 de plus que le mur. Une tour qui ne dépasse pas le mur ne se lit pas.',
      'Posez le chemin de ronde : une rangée de dalles à Y+5 le long de la face interne, accessible par des escaliers dans chaque tour.',
      'Créneaux : alternez muret / vide sur tout le périmètre, tours comprises.',
      'Châtelet d\'entrée au sud : deux demi-tours encadrant un passage de 3 blocs de large, herse en barreaux de fer commandée par des leviers.',
      'Donjon central 9 × 9 : montez-le à 12 blocs, plus haut que les tours d\'angle, avec un toit en pente et une salle du trône au rez-de-chaussée.',
      'Vieillissez l\'ensemble : remplacez aléatoirement 15 à 20 % des briques par des briques fissurées et moussues, en concentrant l\'usure en bas des murs.',
      'Creusez le fossé sur 3 blocs de large et 2 de profondeur autour du mur, remplissez-le d\'eau, et jetez un pont de pierre vers le châtelet.'
    ],
    notes: [
      { type: 'tip', txt: 'Silhouette avant détail — construisez d\'abord toute la structure en pierre brute, reculez, corrigez les proportions, et seulement ensuite ajoutez les matériaux fins. Décorer un volume raté ne le sauve pas.' },
      { type: 'warn', txt: 'Éclairage du château — un château est un immense générateur de zombies. Éclairez la cour, le chemin de ronde et TOUTES les tours, ou posez des dalles inversées sur les surfaces où vous ne voulez pas d\'apparitions.' },
      { type: 'info', txt: 'Variante rapide — le même plan à 15 × 15 avec des tours de 3 × 3 se construit en une soirée et reste très convaincant.' }
    ]
  },
  {
    id: 'donjon-keep', nom: 'Donjon central (keep) 9 × 9', cat: 'chateau',
    taille: '9 × 9 × 14', diff: 'Intermédiaire',
    desc: 'Le cœur du château : trois niveaux, escalier en colimaçon, salle du trône, salle des coffres et terrasse crénelée.',
    mats: ['≈900 briques de pierre', '≈120 escaliers', '≈80 dalles', '16 barreaux de fer', '8 lanternes · 4 bannières'],
    couches: [
      {
        t: 'Y+0 · salle du trône',
        g: [
          'bbbbbbbbb',
          'b...;...b',
          'b.......b',
          'b.......b',
          'b.......b',
          'b..///..b',
          'b.......b',
          'b.......b',
          'bbbb>bbbb'
        ]
      },
      {
        t: 'Y+1 · murs, meurtrières basses, linteau de la porte',
        g: [
          'bb.bbb.bb',
          'b.......b',
          '.........',
          'b.......b',
          'b.......b',
          'b./.....b',
          '.........',
          'b.......b',
          'bb.bDb.bb'
        ]
      },
      {
        t: 'Y+2 · rangée haute des meurtrières, l\'escalier tourne',
        g: [
          'bb.bbb.bb',
          'b.......b',
          '.........',
          'b.......b',
          'b./.....b',
          'b.......b',
          '.........',
          'b.......b',
          'bb.bbb.bb'
        ]
      },
      {
        t: 'Y+3 · murs pleins, lanternes suspendues de la salle du trône',
        g: [
          'bbbbbbbbb',
          'b.......b',
          'b.*...*.b',
          'b.......b',
          'b/......b',
          'b.......b',
          'b.*...*.b',
          'b.......b',
          'bbbbbbbbb'
        ]
      },
      {
        t: 'Y+4 · plancher de l\'étage, dernière marche et trémie de l\'escalier',
        g: [
          'bbbbbbbbb',
          'bbbbbbbbb',
          'bbbbbbbbb',
          'bbbbbbbbb',
          'b..bbbbbb',
          'b/bbbbbbb',
          'bbbbbbbbb',
          'bbbbbbbbb',
          'bbbbbbbbb'
        ]
      },
      {
        t: 'Y+5 · étage / réserve',
        g: [
          'bbbbbbbbb',
          'bEEE.EEEb',
          'b.......b',
          'b.......b',
          'G../....G',
          'b.......b',
          'b.......b',
          'b(.....?b',
          'bbbGGGbbb'
        ]
      },
      {
        t: 'Y+6 · fenêtres à barreaux de l\'étage, reprise de l\'escalier',
        g: [
          'bbbbbbbbb',
          'b.......b',
          'b.......b',
          'b.......b',
          '|./.....|',
          'b.......b',
          'b.......b',
          'b.......b',
          'bbb|||bbb'
        ]
      },
      {
        t: 'Y+7 · murs pleins de l\'étage',
        g: [
          'bbbbbbbbb',
          'b.......b',
          'b.......b',
          'b.......b',
          'b.......b',
          'b./.....b',
          'b.......b',
          'b.......b',
          'bbbbbbbbb'
        ]
      },
      {
        t: 'Y+8 · haut de mur, lanternes sous le plancher de la terrasse',
        g: [
          'bbbbbbbbb',
          'b.......b',
          'b.*...*.b',
          'b.......b',
          'b.......b',
          'b/......b',
          'b.*...*.b',
          'b.......b',
          'bbbbbbbbb'
        ]
      },
      {
        t: 'Y+9 · plancher de la terrasse, dernière marche et trémie',
        g: [
          'bbbbbbbbb',
          'bbbbbbbbb',
          'bbbbbbbbb',
          'bbbbbbbbb',
          'b/bbbbbbb',
          'b..bbbbbb',
          'bbbbbbbbb',
          'bbbbbbbbb',
          'bbbbbbbbb'
        ]
      },
      {
        t: 'Y+10 · terrasse',
        g: [
          'bbbbbbbbb',
          'b.......b',
          'b.......b',
          'b.......b',
          'b.../...b',
          'b.......b',
          'b.......b',
          'b.......b',
          'bbbbbbbbb'
        ]
      },
      {
        t: 'Y+11 · créneaux',
        g: [
          'M.M.M.M.M',
          '.........',
          'M.......M',
          '.........',
          'M.......M',
          '.........',
          'M.......M',
          '.........',
          'M.M.M.M.M'
        ]
      }
    ],
    etapes: [
      'Montez la boîte 9 × 9 sur 10 blocs de haut, avec 5 blocs de hauteur sous plafond par niveau.',
      'Placez l\'escalier en colimaçon dans un angle (2 × 2) : il monte d\'un quart de tour par bloc et occupe le minimum de place.',
      'Rez-de-chaussée : salle du trône. Un trône = 1 escalier au centre encadré de 2 escaliers latéraux, sur une estrade de 3 × 3 surélevée d\'un bloc.',
      'Premier étage : coffres, enclume et alambic contre les murs, fenêtres à barreaux.',
      'Terrasse : plancher plein, créneaux sur tout le pourtour, quatre bannières aux angles.',
      'Percez des meurtrières : une case verticale de 2 blocs de haut sur 1 de large, tous les 3 blocs, en façade.'
    ],
    notes: [
      { type: 'tip', txt: 'Hauteur sous plafond — 5 blocs à l\'intérieur d\'un donjon, jamais 3. Une salle basse tue immédiatement l\'impression de monumentalité.' }
    ]
  },

  /* ================= FERMES / AGRICOLE ================= */
  {
    id: 'ferme-ble', nom: 'Parcelle de culture 9 × 9', cat: 'ferme',
    taille: '9 × 9', diff: 'Débutant',
    desc: 'L\'unité de base de toute agriculture : une source d\'eau au centre hydrate exactement 9 × 9 blocs de terre labourée.',
    mats: ['81 blocs de terre', '1 seau d\'eau', '1 houe', '≈80 graines (blé, carottes, pommes de terre ou betteraves)', 'Clôtures ou un mur de 2 blocs autour'],
    couches: [
      {
        /* Les quatre socles de terre battue portent les lanternes.
           Une lanterne posée à même la terre labourée la retasse : le
           champ perd sa case, et la culture qui s'y trouve avec. */
        t: 'Y+0 · terre labourée, source d\'eau et socles des lanternes',
        g: ['fffffffff', 'ftffffftf', 'fffffffff', 'fffffffff', 'ffffwffff', 'fffffffff', 'fffffffff', 'ftffffftf', 'fffffffff']
      },
      {
        t: 'Y+1 · cultures + éclairage',
        g: ['hhhhhhhhh', 'h*.....*h', 'hhhhhhhhh', 'hhhhhhhhh', 'hhhh.hhhh', 'hhhhhhhhh', 'hhhhhhhhh', 'h*.....*h', 'hhhhhhhhh']
      }
    ],
    etapes: [
      'Creusez un trou d\'un bloc au centre exact de la parcelle et versez-y un seau d\'eau.',
      'Labourez les 80 blocs restants à la houe : l\'eau hydrate jusqu\'à 4 blocs dans chaque direction, coins compris.',
      'Semez. Alternez les rangées de cultures différentes : les plants poussent plus vite quand leurs voisins directs sont d\'espèces différentes.',
      'Entourez de clôtures : sans clôture, les mobs piétinent la terre labourée et la reconvertissent en terre.',
      'Éclairez à 4 lanternes minimum. Les cultures poussent aussi la nuit si le niveau de lumière est ≥ 9.',
      'Optionnel : posez une ruche à côté. Les abeilles pollinisent et accélèrent nettement la croissance.'
    ],
    notes: [
      { type: 'tip', txt: 'Récolte instantanée — placez la parcelle 1 bloc au-dessus d\'un canal d\'eau : cassez la source d\'un côté, l\'eau balaie toute la récolte vers un entonnoir. C\'est le principe de la ferme semi-automatique.' },
      { type: 'info', txt: 'Empilable — cette parcelle se superpose tous les 3 blocs de hauteur : 5 étages tiennent dans la hauteur d\'une petite tour.' }
    ]
  },
  {
    id: 'enclos', nom: 'Enclos d\'élevage compartimenté', cat: 'ferme',
    taille: '13 × 9', diff: 'Débutant',
    desc: 'Trois compartiments séparés (vaches, moutons, poulets) avec un couloir central : indispensable pour ne pas mélanger les espèces lors de la reproduction.',
    mats: ['≈70 clôtures', '3 portillons', '≈40 blocs de sol (herbe pour vaches et moutons)', '1 auge à eau', 'Foin pour l\'appât'],
    couches: [
      {
        t: 'Y+0 · sol & compartiments',
        g: [
          '|||||||||||||',
          '|eee|eee|eee|',
          '|eee|eee|eee|',
          '|eee|eee|eee|',
          '|D|||D|||D|||',
          ',,,,,,,,,,,,,',
          '|||||||||||||',
          '|eeeeeeeeeee|',
          '|||||||||||||'
        ]
      },
      {
        t: 'Y+1 · éclairage & abreuvoirs',
        g: [
          '.............',
          '.*.....*...*.',
          '...w...w...w.',
          '.............',
          '.............',
          '.............',
          '.............',
          '.*.........*.',
          '.............'
        ]
      }
    ],
    etapes: [
      'Délimitez trois carrés de 3 × 3 séparés par des lignes de clôture, avec un couloir de terre battue devant.',
      'Chaque compartiment reçoit un portillon : les mobs ne le franchissent pas, vous si.',
      'Attirez les animaux avec l\'aliment correspondant : blé (vache, mouton), graines (poulet), carotte (cochon), foin (cheval, lama).',
      'Reproduction : donnez l\'aliment à deux adultes du même compartiment. Il faut ensuite attendre 5 minutes avant de recommencer.',
      'Le grand compartiment du bas sert de zone d\'abattage : n\'y gardez que les adultes en surnombre.',
      'Éclairez : un enclos sombre est un piège à zombies qui attaquent le bétail.'
    ],
    notes: [
      { type: 'warn', txt: 'Ne jamais utiliser de mur plein de 1 bloc — les animaux sautent par-dessus un bloc plein, jamais par-dessus une clôture (qui compte pour 1,5 bloc).' }
    ]
  },
  {
    id: 'grange', nom: 'Grange à charpente apparente', cat: 'ferme',
    taille: '13 × 9 × 10', diff: 'Intermédiaire',
    desc: 'Le bâtiment agricole de référence : grand volume, charpente visible, portes charretières, grenier à foin. Rend un village crédible instantanément.',
    mats: ['≈300 planches de chêne foncé', '≈150 rondins (charpente)', '≈180 escaliers pour le toit', '≈40 blocs de foin', '2 trappes doubles (portes charretières)'],
    couches: [
      { t: 'Y+0 · dallage', g: [
        '...............',
        '.ccccccccccccc.',
        '.ccccccccccccc.',
        '.ccccccccccccc.',
        '.ccccccccccccc.',
        '.ccccccccccccc.',
        '.ccccccccccccc.',
        '.ccccccccccccc.',
        '.ccccccccccccc.',
        '.ccccccccccccc.',
        '...............'
      ] },
      { t: 'Y+1 · murs + porte charretière', g: [
        '...............',
        '.o##o###o##o##.',
        '.#...........#.',
        '.o...........o.',
        '.#...........#.',
        '.o...........o.',
        '.#...........#.',
        '.o...........o.',
        '.#...........#.',
        '.o##o##DD##o##.',
        '...............'
      ] },
      { t: 'Y+2 · les murs montent, second rang de la porte charretière', g: [
        '...............',
        '.o##o###o##o##.',
        '.#...........#.',
        '.o...........o.',
        '.#...........#.',
        '.o...........o.',
        '.#...........#.',
        '.o...........o.',
        '.#...........#.',
        '.o##o##DD##o##.',
        '...............'
      ] },
      { t: 'Y+3 · poutraison', g: [
        '...............',
        '.ooooooooooooo.',
        '.o...........o.',
        '.o.ooooooooo.o.',
        '.o...........o.',
        '.o.ooooooooo.o.',
        '.o...........o.',
        '.o.ooooooooo.o.',
        '.o...........o.',
        '.ooooooooooooo.',
        '...............'
      ] },
      { t: 'Y+4 · murs du comble, sous le plancher du grenier', g: [
        '...............',
        '.o##o###o##o##.',
        '.#...........#.',
        '.o...........o.',
        '.#...........#.',
        '.o...........o.',
        '.#...........#.',
        '.o...........o.',
        '.#...........#.',
        '.o##o######o##.',
        '...............'
      ] },
      { t: 'Y+5 · grenier (plancher partiel)', g: [
        '...............',
        '.#############.',
        '.#hhhhhhhhhhh#.',
        '.#hhhhhhhhhhh#.',
        '.#...........#.',
        '.#...........#.',
        '.#...........#.',
        '.#hhhhhhhhhhh#.',
        '.#hhhhhhhhhhh#.',
        '.#############.',
        '...............'
      ] },
      { t: 'Y+6 · toit anneau 1 (15×11)', g: [
        '///////////////',
        '/............./',
        '/............./',
        '/............./',
        '/............./',
        '/............./',
        '/............./',
        '/............./',
        '/............./',
        '/............./',
        '///////////////'
      ] },
      { t: 'Y+7 · toit anneau 2 (13×9)', g: [
        '...............',
        './////////////.',
        './.........../.',
        './.........../.',
        './.........../.',
        './.........../.',
        './.........../.',
        './.........../.',
        './.........../.',
        './////////////.',
        '...............'
      ] },
      { t: 'Y+8 · toit anneau 3 (11×7)', g: [
        '...............',
        '...............',
        '..///////////..',
        '../........./..',
        '../........./..',
        '../........./..',
        '../........./..',
        '../........./..',
        '..///////////..',
        '...............',
        '...............'
      ] }
    ],
    etapes: [
      'Posez le dallage en pierre : une grange se pose sur une dalle, pas sur l\'herbe.',
      'Montez les murs en alternant rondins (poteaux tous les 3 blocs) et planches — c\'est le motif « colombage » qui fait tout le style.',
      'Ouvrez la porte charretière : 2 blocs de large sur 3 de haut, avec deux trappes en guise de battants.',
      'Posez la poutraison à Y+3 : des rangées de rondins traversant le volume dans le sens de la largeur.',
      'Le grenier n\'occupe que les deux extrémités : laissez la travée centrale ouverte sur toute la hauteur — c\'est ce vide qui donne l\'impression de volume.',
      'Toit à deux versants : montez les anneaux d\'escaliers comme pour la maison, mais très pentu (1 bloc de recul pour 1 bloc de hauteur).',
      'Remplissez le grenier de blocs de foin et suspendez quelques lanternes à des chaînes.'
    ],
    notes: [
      { type: 'tip', txt: 'Bois foncé + pierre claire — c\'est la combinaison la plus lisible pour un bâtiment agricole. Évitez le chêne clair, qui délave la silhouette de loin.' }
    ]
  },

  /* ================= TECHNIQUE ================= */
  {
    id: 'enchant', nom: 'Salle d\'enchantement niveau 30', cat: 'technique',
    taille: '5 × 5 × 3', diff: 'Intermédiaire',
    desc: 'La disposition optimale : exactement 15 bibliothèques autour de la table, à 2 blocs de distance, avec de l\'air entre les deux.',
    mats: ['15 bibliothèques (45 livres = 45 cuirs + 135 papiers)', '1 table d\'enchantement (2 diamants, 4 obsidiennes, 1 livre)', '1 enclume (31 lingots de fer)', '≈64 lapis-lazuli', 'Tapis ou dalles pour éclairer sans casser l\'alignement'],
    couches: [
      { t: 'Y+0 · sol', g: ['#####', '#####', '#####', '#####', '#####'] },
      { t: 'Y+1 · bibliothèques + table', g: ['&&&&&', '&...&', '&.$.&', '&...&', '&&.&&'] },
      { t: 'Y+2 · vide obligatoire', g: ['.....', '.....', '.....', '.....', '.....'] }
    ],
    etapes: [
      'Posez la table d\'enchantement au centre exact d\'un carré de 5 × 5.',
      'Entourez-la de 15 bibliothèques sur le pourtour, à hauteur du sol (Y+1), en laissant une case libre pour entrer.',
      'Vérifiez : il DOIT y avoir un bloc d\'air entre chaque bibliothèque et la table. Un tapis ou un bloc plein intercalé annule la bibliothèque.',
      'Éclairez avec des lanternes suspendues au plafond ou des blocs lumineux dans le sol : ne posez jamais une torche entre la table et une bibliothèque.',
      'Ajoutez une enclume et une meule à côté : la meule récupère l\'XP des objets enchantés inutiles.',
      'Contrôle : ouvrez la table. Si le troisième emplacement propose bien le niveau 30, la salle est correcte.'
    ],
    notes: [
      { type: 'info', txt: 'Bibliothèques en hauteur — les bibliothèques comptent aussi si elles sont posées un bloc plus haut (Y+2). C\'est ainsi qu\'on fait des salles rondes ou décoratives sans perdre le niveau 30.' },
      { type: 'tip', txt: 'Le vrai raccourci — un villageois bibliothécaire vend n\'importe quel livre enchanté contre des émeraudes, sans XP et sans lapis. Une salle d\'enchantement + un hall de commerce, c\'est la combinaison gagnante.' }
    ]
  },
  {
    id: 'portail', nom: 'Portail du Nether sécurisé', cat: 'technique',
    taille: '7 × 7 × 7', diff: 'Intermédiaire',
    desc: 'Un portail non protégé est une porte ouverte : zombies-piglins, ghasts et hoglins traversent. Ce sas règle le problème des deux côtés.',
    mats: ['12 blocs d\'obsidienne (16 pour un cadre complet avec les coins)', '≈70 briques de pierre ou blocs anti-explosion', '1 briquet ou 1 seau d\'eau + lave', '2 portes en fer + 2 plaques de pression', '4 lanternes'],
    couches: [
      { t: 'Y+0 · sol du sas', g: ['bbbbbbb', 'bbbbbbb', 'bbbbbbb', 'bbbbbbb', 'bbbbbbb', 'bbbbbbb', 'bbbbbbb'] },
      { t: 'Y+1 · seuil du cadre + sas', g: ['bbbbbbb', 'bOOOOOb', 'b.....b', 'b.....b', 'b.....b', 'b..>..b', 'bbbbbbb'] },
      { t: 'Y+2 → Y+4 · portail actif, trois rangs de haut (à répéter)', g: ['bbbbbbb', 'bO^^^Ob', 'b.....b', 'b..*..b', 'b.....b', 'b..>..b', 'bbbbbbb'] },
      { t: 'Y+5 · linteau d\'obsidienne', g: ['bbbbbbb', 'bOOOOOb', 'b.....b', 'b.....b', 'b.....b', 'b.....b', 'bbbbbbb'] },
      { t: 'Y+6 · plafond', g: ['bbbbbbb', 'bbbbbbb', 'bbbbbbb', 'bbbbbbb', 'bbbbbbb', 'bbbbbbb', 'bbbbbbb'] }
    ],
    etapes: [
      'Construisez le cadre : 5 blocs de large sur 5 de haut, soit un passage de 3 × 3. Les 4 coins sont facultatifs, donc 12 blocs d\'obsidienne suffisent. Le minimum absolu du jeu est un passage de 2 × 3, mais un passage de 3 de large laisse traverser un chariot ou un cheval.',
      'Allumez-le au briquet — ou, sans briquet, renvoyez une boule de feu de ghast dedans.',
      'Emmurez le portail dans une pièce fermée de 7 × 7 en briques de pierre : c\'est résistant aux boules de feu des ghasts.',
      'Portes en fer + plaques de pression aux deux extrémités : les mobs ne peuvent pas les ouvrir.',
      'Côté Nether, faites exactement la même chose : c\'est là que le danger est le plus grand.',
      'Notez les coordonnées des deux côtés sur un panneau. Rappel : 1 bloc dans le Nether = 8 blocs dans le Surworld.'
    ],
    notes: [
      { type: 'tip', txt: 'Réseau de transport — creusez des tunnels dans le Nether entre vos portails : 100 blocs parcourus dans le Nether équivalent à 800 blocs en surface. C\'est le métro le plus rapide du jeu.' },
      { type: 'danger', txt: 'Liaison de portails — si deux portails du Surworld sont à moins de 128 blocs l\'un de l\'autre, ils peuvent se lier au même portail du Nether. Espacez-les ou construisez le portail-cible manuellement côté Nether.' }
    ]
  },
  {
    id: 'stockage', nom: 'Entrepôt à tri automatique — module de base', cat: 'technique',
    taille: '6 × 3 par ligne', diff: 'Avancé',
    desc: 'Un module de tri par type d\'objet, à répliquer autant de fois que nécessaire. Les objets circulent dans une ligne d\'entonnoirs et tombent dans le bon coffre.',
    mats: ['Par module : 5 entonnoirs, 1 coffre (ou double coffre), 1 comparateur, 1 torche de redstone, 4 blocs pleins, 1 poudre de redstone', '18 objets « filtre » par module (voir étapes)'],
    couches: [
      { t: 'Vue de côté · un module', vue: 1, g: ['..H...', '.BHB..', '.VRV..', '.E.E..'] },
      { t: 'Vue de dessus · Y+0 (coffres)', vue: 1, g: ['EEEEEE', '......', '......'] },
      { t: 'Vue de dessus · Y+1 (filtres)', vue: 1, g: ['HHHHHH', 'HHHHHH', '......'] },
      { t: 'Vue de dessus · Y+2 (ligne d\'apport)', vue: 1, g: ['HHHHHH', '......', '......'] }
    ],
    etapes: [
      'Ligne d\'apport : une rangée d\'entonnoirs à Y+2 qui pointent tous vers l\'entonnoir suivant, alimentée depuis votre ferme ou un coffre de dépôt.',
      'Sous chaque module, un entonnoir « filtre » à Y+1 pointe vers le coffre de destination.',
      'Configurez le filtre : mettez dans l\'entonnoir 1 exemplaire de l\'objet à trier dans le premier emplacement, et 18 objets « bourre » (blocs de terre, par exemple) répartis sur les 4 autres emplacements.',
      'Le comparateur lit le remplissage de l\'entonnoir filtre. Tant qu\'il n\'a que les 19 objets de configuration, le signal reste faible.',
      'Torche de redstone en inverseur : elle maintient l\'entonnoir filtre bloqué. Dès qu\'un objet correspondant entre, le comparateur monte, la torche s\'éteint et l\'objet descend dans le coffre.',
      'Répliquez le module tous les 2 blocs le long de la ligne. Terminez la ligne par un coffre « débordement » qui reçoit tout ce qui n\'a pas été trié.'
    ],
    notes: [
      { type: 'warn', txt: 'Le piège classique — si vous oubliez les 18 objets de bourre, le comparateur ne fait pas la différence entre « vide » et « un objet vient d\'arriver », et le tri fuit.' },
      { type: 'tip', txt: 'Repérage — posez un cadre d\'objet sur chaque coffre avec l\'objet correspondant : vous retrouvez tout d\'un coup d\'œil, sans ouvrir un seul coffre.' }
    ]
  },

  /* ================= HABITATIONS — SUITE ================= */
  {
    id: 'maison-moderne', nom: 'Maison moderne 13 × 9', cat: 'maison',
    taille: '13 × 9 × 5', diff: 'Intermédiaire',
    desc: 'Volumes nets, toit-terrasse, grandes baies vitrées. Le style le plus simple à réussir : il ne pardonne rien sur les proportions, mais ne demande aucune charpente.',
    mats: ['≈250 blocs de béton blanc (4 sable + 4 gravier + 1 colorant → 8)', '≈120 blocs de deepslate poli ou de béton gris', '≈60 vitres', '≈30 dalles pour la terrasse', 'Éclairage encastré (blocs lumineux sous des tapis)'],
    couches: [
      { t: 'Y+0 · dalle', g: ['WWWWWWWWWWWWW', 'WWWWWWWWWWWWW', 'WWWWWWWWWWWWW', 'WWWWWWWWWWWWW', 'WWWWWWWWWWWWW', 'WWWWWWWWWWWWW', 'WWWWWWWWWWWWW', 'WWWWWWWWWWWWW', 'WWWWWWWWWWWWW'] },
      { t: 'Y+1 · murs & baies', g: ['dWWWWWWWWWWWd', 'G...........G', 'G...........G', 'W...........W', 'G...........G', 'G...........G', 'W...........W', 'G...........G', 'dWWWDDWWWWWWd'] },
      { t: 'Y+2 · idem (répéter 3 fois)', g: ['dWWWWWWWWWWWd', 'G...........G', 'G...........G', 'W...........W', 'G...........G', 'G...........G', 'W...........W', 'G...........G', 'dWWWWWWWWWWWd'] },
      { t: 'Y+4 · toit-terrasse', g: ['ddddddddddddd', 'd...........d', 'd...........d', 'd...........d', 'd...........d', 'd...........d', 'd...........d', 'd...........d', 'ddddddddddddd'] },
      { t: 'Y+5 · garde-corps', g: ['|||||||||||||', '|...........|', '|...........|', '|...........|', '|...........|', '|...........|', '|...........|', '|...........|', '|||||||||||||'] }
    ],
    etapes: [
      'Posez la dalle de béton blanc en débordant d\'un bloc sur tout le pourtour : ce léger socle décolle la maison du sol.',
      'Montez les murs sur 3 blocs, en alternant panneaux pleins et baies vitrées de 2 blocs de large.',
      'Marquez les angles avec un matériau sombre (deepslate poli, béton gris) : c\'est ce contraste qui structure la façade.',
      'Toit plat en dalles sombres, débordant d\'un bloc — un toit moderne qui affleure le mur fait « boîte ».',
      'Garde-corps en barreaux de fer ou en vitres sur toute la terrasse.',
      'Éclairage : creusez le sol d\'un bloc, posez des blocs lumineux et recouvrez de tapis. Aucune source visible, lumière parfaite.',
      'Aménagez la terrasse : quelques blocs de mousse, des feuillages en pot, une piscine de 3 × 5 encastrée.'
    ],
    notes: [
      { type: 'tip', txt: 'La règle du moderne — deux couleurs maximum plus le verre. Blanc + gris foncé, ou beige + noir. Trois couleurs et le bâtiment perd immédiatement son caractère.' },
      { type: 'info', txt: 'Le béton se fabrique en masse : 4 sable + 4 gravier + 1 colorant donnent 8 poudres, à jeter dans l\'eau. Une ferme à cactus (colorant vert) ou à calmars (noir) le rend gratuit.' }
    ]
  },

  /* ================= VILLAGE & OUVRAGES ================= */
  {
    id: 'village', nom: 'Village complet — plan de masse 21 × 21', cat: 'ville',
    taille: '21 × 21', diff: 'Avancé',
    desc: 'Trame de rues, place centrale avec puits et cloche, douze parcelles bâties. Le plan qui transforme un tas de maisons en village crédible.',
    mats: ['≈400 blocs de chemin de terre (pelle sur l\'herbe)', '≈100 dalles pour la place', '1 puits (pierre + eau) · 1 cloche', '12 maisons (voir le plan « Maison de colon »)', 'Lampadaires : clôtures + lanternes'],
    couches: [
      {
        t: 'Plan de masse · rues, place et parcelles',
        g: [
          'eeeee,eeeeeeeee,eeeee',
          'e###e,###eee###,e###e',
          'e###e,###eee###,e###e',
          'e#D#e,#D#eee#D#,e#D#e',
          'eeeee,eeeeeeeee,eeeee',
          ',,,,,,,,,,,,,,,,,,,,,',
          'eeeee,eeeeeeeee,eeeee',
          'e###e,eeeeeeeee,e###e',
          'e###e,ee--}--ee,e###e',
          'e#D#e,ee-----ee,e#D#e',
          'eeeee,ee--w--ee,eeeee',
          'e#D#e,ee-----ee,e#D#e',
          'e###e,ee-----ee,e###e',
          'e###e,eeeeeeeee,e###e',
          'eeeee,eeeeeeeee,eeeee',
          ',,,,,,,,,,,,,,,,,,,,,',
          'eeeee,eeeeeeeee,eeeee',
          'e###e,###eee###,e###e',
          'e###e,###eee###,e###e',
          'e#D#e,#D#eee#D#,e#D#e',
          'eeeee,eeeeeeeee,eeeee'
        ]
      }
    ],
    etapes: [
      'Tracez d\'abord les rues à la pelle (chemin de terre) : deux axes nord-sud et deux axes est-ouest. La trame vient avant les bâtiments, jamais l\'inverse.',
      'Dégagez la place centrale de 5 × 5 en dalles de pierre, avec le puits au milieu et la cloche au nord.',
      'Répartissez les parcelles de 3 × 3 minimum le long des rues. Variez les tailles : trois maisons identiques côte à côte tuent l\'illusion.',
      'Orientez TOUTES les portes vers la rue. C\'est le détail qui distingue un vrai village d\'un alignement de cabanes.',
      'Faites varier les hauteurs : une maison à un étage tous les trois bâtiments, plus une tour ou un clocher près de la place.',
      'Ajoutez les équipements : forge (fourneaux + enclume), grange, étal de marché, bibliothèque, puits secondaires.',
      'Éclairez chaque rue avec des lampadaires (clôture + lanterne) tous les 6 à 8 blocs : sans cela, votre village se remplit de zombies.',
      'Plantez : arbres aux carrefours, buissons, parcelles de culture en périphérie, quelques animaux en enclos.'
    ],
    notes: [
      { type: 'tip', txt: 'Villageois — pour que le jeu reconnaisse un vrai village, il faut des lits et des blocs de métier. 12 lits + 12 blocs de métier permettent la reproduction et l\'apparition d\'un golem de fer.' },
      { type: 'warn', txt: 'Raids — un vrai village peut être attaqué. Prévoyez un mur d\'enceinte ou au moins une porte solide, et gardez un totem d\'immortalité sur vous.' }
    ]
  },
  {
    id: 'pont', nom: 'Pont de pierre à arches', cat: 'ville',
    taille: '17 × 5 × 7', diff: 'Intermédiaire',
    desc: 'Franchit une rivière ou un ravin. La courbe des arches est ce qui distingue un pont d\'une simple passerelle posée sur des piliers.',
    mats: ['≈350 briques de pierre', '≈80 escaliers en pierre (courbe des arches)', '≈40 murets (parapets)', '6 lanternes + 6 clôtures (lampadaires)', 'Quelques briques moussues pour vieillir les piles'],
    couches: [
      {
        t: 'Vue de côté · l\'arche', vue: 1,
        g: [
          '.---------------.',
          'M...............M',
          'b...............b',
          'bb.............bb',
          'bbb...........bbb',
          'wwbbb.......bbbww',
          'wwwwwwwwwwwwwwwww'
        ]
      },
      {
        t: 'Vue de dessus · tablier', vue: 1,
        g: [
          'MMMMMMMMMMMMMMMMM',
          '-----------------',
          '-----------------',
          '-----------------',
          'MMMMMMMMMMMMMMMMM'
        ]
      }
    ],
    etapes: [
      'Repérez les deux rives et posez d\'abord le tablier plat, à hauteur constante : c\'est votre ligne de référence.',
      'Descendez les piles verticalement jusqu\'au fond de l\'eau, en les élargissant vers le bas (1 bloc de plus tous les 2 niveaux).',
      'Creusez la courbe de l\'arche entre les piles : elle doit être plus large en bas qu\'en haut, et se raccorder en douceur au tablier.',
      'Habillez la courbe d\'escaliers inversés pour adoucir l\'escalier de blocs : c\'est l\'étape qui fait toute la différence.',
      'Posez les parapets en murets sur les deux bords du tablier, avec une interruption au milieu pour un lampadaire.',
      'Vieillissez : briques moussues et fissurées en pied de pile, là où l\'eau attaque, et quelques vignes qui retombent.'
    ],
    notes: [
      { type: 'tip', txt: 'Proportion — la hauteur de l\'arche doit valoir environ un tiers de sa portée. Une arche trop plate fait « tuyau », une arche trop haute fait « viaduc ».' }
    ]
  },
  {
    id: 'port', nom: 'Port et quai marchand', cat: 'ville',
    taille: '17 × 13', diff: 'Intermédiaire',
    desc: 'Quai de pierre, deux pontons sur pilotis, entrepôt en retrait. Le point de départ de toute exploration maritime, et le meilleur endroit pour amarrer un bateau-coffre.',
    mats: ['≈200 briques de pierre (quai)', '≈120 planches et rondins (pontons et entrepôt)', '≈40 clôtures (pilotis et bornes d\'amarrage)', '8 lanternes', 'Coffres, tonneaux et cadres d\'objet'],
    couches: [
      {
        t: 'Plan de masse',
        g: [
          'eeeeeeeeeeeeeeeee',
          'ee#######eeeeeeee',
          'ee#.....#eee%%%ee',
          'ee##DD###eee%%%ee',
          'ccccccccccccccccc',
          'www##wwwww##wwwww',
          'www##wwwww##wwwww',
          'www##wwwww##wwwww',
          'www##wwwww##wwwww',
          'wwwwwwwwwwwwwwwww',
          'wwwwwwwwwwwwwwwww',
          'wwwwwwwwwwwwwwwww',
          'wwwwwwwwwwwwwwwww'
        ]
      },
      {
        t: 'Vue de côté · un ponton', vue: 1,
        g: ['..--..', '..||..', '..||..', 'wwwwww']
      }
    ],
    etapes: [
      'Coupez la berge à la verticale et montez un quai en briques de pierre, à 1 bloc au-dessus du niveau de l\'eau.',
      'Avancez les pontons sur l\'eau : un tablier de dalles de bois porté par des clôtures qui descendent jusqu\'au fond.',
      'Laissez un couloir d\'eau de 4 blocs entre les pontons : c\'est la largeur minimale pour manœuvrer un bateau confortablement.',
      'Posez des bornes d\'amarrage (clôtures ou rondins) tous les 3 blocs, et une lanterne au bout de chaque ponton.',
      'Construisez l\'entrepôt en retrait du quai, porte face à l\'eau, avec coffres et tonneaux étiquetés par cadres d\'objet.',
      'Prévoyez un bateau-coffre amarré en permanence : c\'est votre moyen de transport de masse pour les expéditions.'
    ],
    notes: [
      { type: 'tip', txt: 'Un panneau posé sur le côté d\'un bloc immergé crée une poche d\'air : c\'est la façon la plus simple de faire un accès sous-marin depuis le quai.' }
    ]
  },
  {
    id: 'statue', nom: 'Statue monumentale — creeper 20 blocs', cat: 'ville',
    taille: '8 × 8 × 20', diff: 'Intermédiaire',
    desc: 'Un repère visible de très loin. Le principe vaut pour n\'importe quelle statue : on travaille en élévation (vue de face), pas en couches horizontales.',
    mats: ['≈700 blocs verts (mousse, béton vert, feuillage compact)', '≈80 blocs sombres (deepslate, béton noir) pour le visage', 'Échafaudages en quantité', 'Optionnel : blocs lumineux dans les yeux'],
    couches: [
      {
        t: 'Vue de face · tête (8 × 8)', vue: 1,
        g: ['NNNNNNNN', 'NnnNNnnN', 'NnnNNnnN', 'NNNnnNNN', 'NNnnnnNN', 'NNnNNnNN', 'NNNNNNNN', 'NNNNNNNN']
      },
      {
        t: 'Vue de face · corps (8 × 8)', vue: 1,
        g: ['NNNNNNNN', 'NNNNNNNN', 'NNNNNNNN', 'NNNNNNNN', 'NNNNNNNN', 'NNNNNNNN', 'NNNNNNNN', 'NNNNNNNN']
      },
      {
        t: 'Vue de face · pattes (8 × 4)', vue: 1,
        g: ['NN....NN', 'NN....NN', 'NN....NN', 'NN....NN']
      },
      {
        t: 'Vue de dessus · emprise des pattes', vue: 1,
        g: ['NN....NN', 'NN....NN', '........', '........', '........', '........', 'NN....NN', 'NN....NN']
      }
    ],
    etapes: [
      'Montez d\'abord les quatre pattes : deux carrés de 2 × 2 à l\'avant, deux à l\'arrière, sur 4 blocs de haut.',
      'Posez le corps par-dessus : un pavé plein de 8 × 4 × 8 (le creeper est plus mince de profil que de face).',
      'La tête est un cube plein de 8 × 8 × 8 posé directement sur le corps, sans cou.',
      'Creusez le visage en dernier, sur la face avant uniquement : deux yeux carrés de 2 × 2 et la bouche en U.',
      'Encastrez des blocs lumineux au fond des yeux : la nuit, la statue devient un repère visible à des centaines de blocs.',
      'Reculez régulièrement pendant le chantier. Une statue se juge de loin, jamais depuis l\'échafaudage.'
    ],
    notes: [
      { type: 'tip', txt: 'Méthode générale — pour n\'importe quelle statue, dessinez d\'abord la silhouette de face en un seul plan de blocs, puis « épaississez » vers l\'arrière. Sculpter directement en volume mène presque toujours à des proportions ratées.' }
    ]
  },

  /* ================= TECHNIQUE — SUITE ================= */
  {
    id: 'mine', nom: 'Mine aménagée (branch mining à Y −59)', cat: 'technique',
    taille: 'Extensible', diff: 'Débutant',
    desc: 'La méthode de minage la plus efficace du jeu : un tunnel principal, des branches tous les 3 blocs. Cette trame expose le maximum de blocs pour le minimum de coups de pioche.',
    mats: ['Pioche en fer ou mieux, avec Efficacité et Solidité', '≈2 piles de torches', 'Coffres et fourneaux au point d\'entrée', 'Seau d\'eau (lave), échelles ou échafaudages', 'Nourriture et un lit de secours'],
    couches: [
      {
        t: 'Plan de dessus · trame de minage',
        g: [
          'ccccccccccccccccc',
          'c...............c',
          'c...*.......*...c',
          'ccc.ccc.ccc.ccc.c',
          'c.c.c.c.c.c.c.c.c',
          'c.c.c.c.c.c.c.c.c',
          'c.c.c.c.c.c.c.c.c',
          'c.c.c.c.c.c.c.c.c'
        ]
      },
      {
        t: 'Vue de côté · accès en escalier', vue: 1,
        g: ['e*.......', 'cc/......', 'ccc/.....', 'cccc/....', 'ccccc/...', 'cccccc/..', 'ccccccc*.']
      }
    ],
    etapes: [
      'Descendez à Y = −59 : c\'est le pic exact du diamant ET de la redstone. Un escalier à 45° est plus sûr qu\'un puits vertical.',
      'Creusez le tunnel principal sur 2 blocs de haut et 2 de large, en posant une torche tous les 8 blocs (à droite uniquement : c\'est votre boussole pour le retour).',
      'Ouvrez des branches perpendiculaires d\'un bloc de large, espacées de 3 blocs. Cet espacement expose toutes les veines de 2 blocs ou plus.',
      'Avancez chaque branche sur 20 à 30 blocs, puis revenez. Au-delà, le trajet de retour coûte plus que ce que la branche rapporte.',
      'Bouchez systématiquement la lave que vous croisez avec un bloc : une seule coulée peut détruire toute une session de butin.',
      'Installez un « camp de base » tous les 100 blocs : coffre, four, établi, lit. Vous minez plus longtemps sans remonter.'
    ],
    notes: [
      { type: 'tip', txt: 'Torches à droite — posez toujours vos torches du même côté en descendant. Au retour, elles sont à votre gauche : impossible de se perdre, même dans un réseau de 40 branches.' },
      { type: 'info', txt: 'Explorer une grotte profonde ou une cité antique rapporte souvent plus de diamants qu\'un tunnel, car depuis la 1.18 le diamant est plus fréquent quand il est exposé à l\'air.' }
    ]
  },
  {
    id: 'sous-marine', nom: 'Base sous-marine — dôme de verre 13 × 13', cat: 'technique',
    taille: '13 × 13 × 8', diff: 'Avancé',
    desc: 'Une bulle d\'air au fond de l\'océan. Le chantier est difficile (respiration, vision, courants) mais le résultat est l\'une des constructions les plus spectaculaires du jeu.',
    mats: ['≈400 blocs de verre (400 sables à cuire)', '≈150 briques de pierre ou prismarine (base)', '2 à 4 éponges (monument océanique)', '1 conduit (8 coquillages nautiles + 1 cœur de la mer)', 'Potions de Respiration aquatique + Vision nocturne', 'Portes en fer + sas'],
    couches: [
      {
        t: 'Y+0 · plancher (cercle Ø 13)',
        g: [
          '....ccccc....',
          '..ccccccccc..',
          '.ccccccccccc.',
          '.ccccccccccc.',
          'ccccccccccccc',
          'ccccccccccccc',
          'ccccccccccccc',
          'ccccccccccccc',
          'ccccccccccccc',
          '.ccccccccccc.',
          '.ccccccccccc.',
          '..ccccccccc..',
          '....ccccc....'
        ]
      },
      {
        t: 'Y+1 → Y+4 · paroi vitrée (à répéter)',
        g: [
          '....ggggg....',
          '..gg.....gg..',
          '.g.........g.',
          '.g.........g.',
          'g...........g',
          'g...........g',
          'g...........g',
          'g...........g',
          'g...........g',
          '.g.........g.',
          '.g.........g.',
          '..gg.....gg..',
          '....ggggg....'
        ]
      },
      {
        t: 'Y+5 · dôme (Ø 9)',
        g: [
          '.............',
          '.............',
          '.....ggg.....',
          '...gg...gg...',
          '...g.....g...',
          '..g.......g..',
          '..g.......g..',
          '..g.......g..',
          '...g.....g...',
          '...gg...gg...',
          '.....ggg.....',
          '.............',
          '.............'
        ]
      },
      {
        t: 'Y+6 · dôme (Ø 5)',
        g: [
          '.............',
          '.............',
          '.............',
          '.............',
          '.....ggg.....',
          '....g...g....',
          '....g...g....',
          '....g...g....',
          '.....ggg.....',
          '.............',
          '.............',
          '.............',
          '.............'
        ]
      },
      {
        t: 'Y+7 · sommet',
        g: [
          '.............',
          '.............',
          '.............',
          '.............',
          '.............',
          '.....ggg.....',
          '.....ggg.....',
          '.....ggg.....',
          '.............',
          '.............',
          '.............',
          '.............',
          '.............'
        ]
      }
    ],
    etapes: [
      'Posez d\'abord le conduit dans un cadre de prismarine au-dessus du chantier : il donne respiration, vision nocturne et vitesse de minage dans un rayon de 96 blocs. Sans lui, le chantier est un calvaire.',
      'Tracez le cercle du plancher au fond de l\'océan et remblayez tout l\'intérieur.',
      'Montez la paroi vitrée anneau par anneau. Ne videz PAS l\'eau au fur et à mesure : construisez d\'abord l\'enveloppe complète.',
      'Fermez le dôme par le haut en réduisant le diamètre à chaque niveau (13 → 9 → 5 → 3).',
      'Videz l\'intérieur à l\'éponge : une éponge absorbe l\'eau dans un rayon de 7 blocs, puis se sèche au four pour être réutilisée.',
      'Percez l\'entrée en dernier : un sas de deux portes en fer, ou une colonne d\'ascenseur à bulles montant vers la surface.',
      'Éclairez avec des lanternes marines : elles sont thématiques et donnent le niveau de lumière 15.'
    ],
    notes: [
      { type: 'warn', txt: 'Sans éponge, ce chantier est presque impossible. Videz un monument océanique en premier : vous y trouverez la salle aux éponges ET les blocs de prismarine.' },
      { type: 'tip', txt: 'Le panneau qui bloque l\'eau — posé sur la face d\'un bloc, un panneau retient l\'eau. C\'est la solution d\'urgence pour créer une poche d\'air quand vous manquez d\'oxygène en plein chantier.' }
    ]
  },
  {
    id: 'base-nether', nom: 'Fort du Nether — base fortifiée 15 × 15', cat: 'technique',
    taille: '15 × 15 × 6', diff: 'Avancé',
    desc: 'Un avant-poste autour de votre portail, à l\'épreuve des ghasts et des piglins. C\'est la tête de pont indispensable si vous comptez exploiter le Nether sérieusement.',
    mats: ['≈600 briques du Nether ou blocs de pierre (résistants aux boules de feu)', '10 à 14 blocs d\'obsidienne (portail)', '≈30 barreaux de fer (meurtrières anti-ghast)', '4 portes en fer + plaques de pression', 'Lanternes des âmes (elles repoussent les piglins)'],
    couches: [
      {
        t: 'Y+0 · plan de masse',
        g: [
          'rrrrrrrrrrrrrrr',
          'r.............r',
          'r.............r',
          'r.............r',
          'r...rrrrrrr...r',
          'r...r.....r...r',
          'r...r.OOO.r...r',
          'r...r.O^O.r...r',
          'r...r.OOO.r...r',
          'r...r.....r...r',
          'r...rrr>rrr...r',
          'r.............r',
          'r.............r',
          'r.............r',
          'rrrrrr>rrrrrrrr'
        ]
      },
      {
        t: 'Y+1 → Y+2 · les murs montent, les deux portes restent ouvertes (à répéter)',
        g: [
          'rrrrrrrrrrrrrrr',
          'r.............r',
          'r.............r',
          'r.............r',
          'r...rrrrrrr...r',
          'r...r.....r...r',
          'r...r.OOO.r...r',
          'r...r.O^O.r...r',
          'r...r.OOO.r...r',
          'r...r.....r...r',
          'r...rrr>rrr...r',
          'r.............r',
          'r.............r',
          'r.............r',
          'rrrrrr>rrrrrrrr'
        ]
      },
      {
        t: 'Y+3 · linteaux des portes, murs pleins',
        g: [
          'rrrrrrrrrrrrrrr',
          'r.............r',
          'r.............r',
          'r.............r',
          'r...rrrrrrr...r',
          'r...r.....r...r',
          'r...r.OOO.r...r',
          'r...r.O^O.r...r',
          'r...r.OOO.r...r',
          'r...r.....r...r',
          'r...rrrrrrr...r',
          'r.............r',
          'r.............r',
          'r.............r',
          'rrrrrrrrrrrrrrr'
        ]
      },
      {
        t: 'Y+4 · toit fermé (obligatoire)',
        g: [
          'rrrrrrrrrrrrrrr',
          'rrrrrrrrrrrrrrr',
          'rrrrrrrrrrrrrrr',
          'rrrrrrrrrrrrrrr',
          'rrrrrrrrrrrrrrr',
          'rrrrrrrrrrrrrrr',
          'rrrrrrrrrrrrrrr',
          'rrrrrrrrrrrrrrr',
          'rrrrrrrrrrrrrrr',
          'rrrrrrrrrrrrrrr',
          'rrrrrrrrrrrrrrr',
          'rrrrrrrrrrrrrrr',
          'rrrrrrrrrrrrrrr',
          'rrrrrrrrrrrrrrr',
          'rrrrrrrrrrrrrrr'
        ]
      }
    ],
    etapes: [
      'Allumez d\'abord le portail, puis emmurez-le immédiatement : c\'est le moment le plus dangereux, les zombies-piglins traversent dès l\'allumage.',
      'Construisez la salle du portail en briques du Nether : contrairement au netherrack, elles résistent aux boules de feu des ghasts.',
      'Fermez la salle avec une porte en fer et une plaque de pression : aucun mob ne peut l\'ouvrir.',
      'Montez l\'enceinte extérieure de 15 × 15 à 4 blocs de haut, avec des meurtrières en barreaux de fer pour tirer sans être exposé.',
      'Couvrez INTÉGRALEMENT le toit. Un fort à ciel ouvert dans le Nether se fait bombarder par les ghasts en quelques minutes.',
      'Installez à l\'intérieur : coffres, fours, établi, un lit décoratif (ne dormez jamais dedans, il explose) et un point de départ de tunnel.',
      'Notez les coordonnées sur un panneau, des deux côtés du portail. Rappel : coordonnées Surworld ÷ 8 = coordonnées Nether.'
    ],
    notes: [
      { type: 'danger', txt: 'Jamais de lit dans le Nether — il explose violemment. En revanche, cette explosion est la méthode standard pour miner les débris antiques : posez le lit, reculez, faites-le exploser à distance.' },
      { type: 'tip', txt: 'Portez une pièce d\'armure en or en permanence : les piglins vous ignoreront. Mais n\'ouvrez jamais un coffre ni ne minez d\'or devant eux — cela les rend hostiles quoi qu\'il arrive.' }
    ]
  },

/* ================= CATHÉDRALE ================= */
  {
    id: 'cathedrale', nom: 'Cathédrale — nef, transept et clocher', cat: 'ville',
    taille: '21 × 27 × 30', diff: 'Expert',
    desc: 'Le chantier d\'une partie entière : une nef de 9 blocs de large, un transept qui la coupe en croix, un chœur en abside et un clocher-porche. La réussite tient à une seule chose, la hauteur — une cathédrale basse n\'existe pas.',
    mats: ['≈4 500 briques de pierre (murs, piliers, contreforts)', '≈900 blocs de quartz ou de pierre claire (voûtes)', '≈700 escaliers et 400 dalles (toitures et arcs)', '≈350 vitres teintées (verrières et rosace)', '≈60 lanternes · 1 cloche · bannières'],
    couches: [
      {
        t: 'Vue de face · rosace de la façade ouest (11 × 11)',
        vue: 1,
        g: [
          'bbbbbbbbbbb',
          'bbbbGGGbbbb',
          'bbGGGGGGGbb',
          'bGGGGbGGGGb',
          'bGGGbcbGGGb',
          'GGGGcccGGGG',
          'bGGGbcbGGGb',
          'bGGGGbGGGGb',
          'bbGGGGGGGbb',
          'bbbbGGGbbbb',
          'bbbbbbbbbbb'
        ]
      },
      {
        t: 'Y+0 · plan de masse : chœur, nef, transept et clocher',
        g: [
          '........bbbbb........',
          '.......b.....b.......',
          '......b.......b......',
          '......b...;...b......',
          '......b.......b......',
          '......b.c...c.b......',
          '......b.......b......',
          'bbbbbbb.......bbbbbbb',
          'b...................b',
          'b.....c.......c.....b',
          'b...................b',
          'bbbbbbb.......bbbbbbb',
          '......b.c...c.b......',
          '......b.......b......',
          '......b.c...c.b......',
          '......b.......b......',
          '......b.c...c.b......',
          '......b.......b......',
          '......bbb...bbb......',
          '......b.......b......',
          '......b.......b......',
          '......b..*.*..b......',
          '......b.......b......',
          '......b.......b......',
          '......b.......b......',
          '......b.L.....b......',
          '......bbbbDbbbb......'
        ]
      },
      {
        t: 'Y+5 · verrières hautes et arcs des bas-côtés',
        g: [
          '........bGGGb........',
          '.......G.....G.......',
          '......b.......b......',
          '......G...;...G......',
          '......b.......b......',
          '......G.c...c.G......',
          '......b.......b......',
          'bbGbGbb.......bbGbGbb',
          'G...................G',
          'b.....c.......c.....b',
          'G...................G',
          'bbGbGbb.......bbGbGbb',
          '......G.c...c.G......',
          '......b.......b......',
          '......G.c...c.G......',
          '......b.......b......',
          '......G.c...c.G......',
          '......b.......b......',
          '......bbb...bbb......',
          '......b.......b......',
          '......G.......G......',
          '......b.......b......',
          '......G.......G......',
          '......b.......b......',
          '......G.......G......',
          '......b.L.....b......',
          '......bbbGGGbbb......'
        ]
      },
      {
        t: 'Y+13 · toitures de la nef et du transept',
        g: [
          '.......///////.......',
          '.......///////.......',
          '.....///////////.....',
          '.....///////////.....',
          '.....///////////.....',
          '.....///////////.....',
          '.....///////////.....',
          '/////////////////////',
          '/////////////////////',
          '/////////////////////',
          '/////////////////////',
          '/////////////////////',
          '.....///////////.....',
          '.....///////////.....',
          '.....///////////.....',
          '.....///////////.....',
          '.....///////////.....',
          '.....///////////.....',
          '......b.......b......',
          '......b.......b......',
          '......b.......b......',
          '......b.......b......',
          '......b.......b......',
          '......b.......b......',
          '......b.......b......',
          '......b.......b......',
          '......b.......b......'
        ]
      },
      {
        t: 'Y+22 · beffroi du clocher (9 × 9)',
        g: [
          '.....................',
          '.....................',
          '.....................',
          '.....................',
          '.....................',
          '.....................',
          '.....................',
          '.....................',
          '.....................',
          '......bbb+++bbb......',
          '......b.......b......',
          '......b.......b......',
          '......+.......+......',
          '......+...}...+......',
          '......+.......+......',
          '......b.......b......',
          '......b.......b......',
          '......bbb+++bbb......',
          '.....................',
          '.....................',
          '.....................',
          '.....................',
          '.....................',
          '.....................',
          '.....................',
          '.....................',
          '.....................'
        ]
      },
      { t: 'Y+27 · couronnement de la flèche (7 × 7)', g: [
        '.....................',
        '.....................',
        '.....................',
        '.....................',
        '.....................',
        '.....................',
        '.....................',
        '.....................',
        '.....................',
        '.....................',
        '.........///.........',
        '......../---/........',
        '......./-----/.......',
        '......./--*--/.......',
        '......./-----/.......',
        '......../---/........',
        '.........///.........',
        '.....................',
        '.....................',
        '.....................',
        '.....................',
        '.....................',
        '.....................',
        '.....................',
        '.....................',
        '.....................',
        '.....................'
      ] }
    ],
    etapes: [
      'Tracez la croix au sol avant tout : nef de 9 blocs de large sur 19 de long, transept de 5 blocs de profondeur traversant toute la largeur. Cette croix est le seul élément qu\'on ne peut plus corriger ensuite.',
      'Montez uniquement les piliers, en briques de pierre 1 × 1, tous les 2 blocs le long de la nef, sur 12 blocs de haut. Reculez et vérifiez le rythme : c\'est l\'alignement des piliers qui fait la nef, pas les murs.',
      'Reliez les têtes de piliers par des arcs en escaliers inversés, puis fermez les voûtes en quartz. Une voûte se lit de l\'intérieur : ne bouchez pas encore les murs, vous auriez à casser.',
      'Remplissez les murs entre les piliers, en laissant des baies de 3 × 6 blocs pour les verrières. La règle : plus de vide que de plein dans le mur haut, sinon l\'intérieur reste sombre et lourd.',
      'Ajoutez les contreforts extérieurs, un par pilier, saillie de 2 blocs, chapeautés d\'escaliers. Sans eux, les murs hauts paraissent en carton.',
      'Couvrez la nef et le transept d\'un toit à deux pentes en escaliers, faîtage en dalles. Le toit doit démarrer 2 blocs au-dessus du sommet des verrières, jamais au ras.',
      'Bâtissez le clocher-porche à l\'ouest : une tour carrée de 9 × 9 montée à 22 blocs, puis le beffroi ajouré de trappes, puis la flèche. Le clocher doit dépasser le faîtage de la nef d\'au moins la moitié de sa hauteur.',
      'Percez la rosace dans la façade ouest, au-dessus du portail : partez d\'un cercle de 11 blocs de diamètre, posez les meneaux en pierre en croix, puis remplissez en verre teinté du centre vers l\'extérieur.',
      'Aménagez le chœur : estrade de 3 blocs surélevée d\'un bloc, autel, bannières de part et d\'autre, et deux rangées de bancs (dalles + escaliers) dans la nef.',
      'Éclairez au plafond, pas au sol : lanternes suspendues à des chaînes entre les piliers. Une cathédrale éclairée par des torches murales perd instantanément son échelle.'
    ],
    notes: [
      { type: 'tip', txt: 'Proportion clé — la hauteur intérieure de la nef doit valoir environ deux fois sa largeur. Pour 9 blocs de large, visez 18 blocs sous voûte. En dessous de 12, vous construisez une chapelle, pas une cathédrale.' },
      { type: 'warn', txt: 'Chantier — montez des échafaudages sur toute la hauteur avant de commencer les voûtes, et travaillez en mode paisible ou avec le sol entièrement éclairé : la moitié des accidents de chantier sont des chutes depuis un arc inachevé.' },
      { type: 'info', txt: 'Verre teinté — n\'utilisez pas plus de trois couleurs par verrière, et gardez la même dominante sur toute une façade. Un vitrail arc-en-ciel ressemble à une erreur, pas à un vitrail.' }
    ]
  },

  /* ================= QUARTIER MÉDIÉVAL ================= */
  {
    id: 'quartier-medieval', nom: 'Quartier médiéval — îlot mitoyen sur rue', cat: 'ville',
    taille: '25 × 15 × 12', diff: 'Avancé',
    desc: 'Deux rangées de maisons mitoyennes de part et d\'autre d\'une ruelle de 3 blocs. C\'est le plan qui fait passer d\'un « village de cubes espacés » à une vraie ville : les bâtiments se touchent et partagent leurs murs.',
    mats: ['≈600 briques de pierre (rez-de-chaussée et murs mitoyens)', '≈700 planches et rondins (étages)', '≈500 escaliers et 200 dalles (toitures)', '≈90 vitres', '≈200 blocs de chemin de terre ou de gravier (rue)', '16 lanternes · 6 portes'],
    couches: [
      {
        t: 'Y+0 · rez-de-chaussée : boutiques, rue et puits',
        g: [
          'bbbbbbbbbbbbbbbbbbbbbbbbb',
          'b.....b.....b....b......b',
          'b.<E..b..YU.b.E..b.&....b',
          'b.....b.....b....b......b',
          'b..*..b..*..b.*..b...*..b',
          'b.....b.....b....b......b',
          'bbDbbbbbbDbbbbbDbbbbbbDbb',
          ',,,,,,,,,,,,,,,,,,,,,,,,,',
          ',,,,,,,,,,cwc,,,,,,,,,,,,',
          ',,,,,,,,,,,,,,,,,,,,,,,,,',
          'bbbDbbbbbbbDbbbbbbDbbbbbb',
          'b.......b......b........b',
          'b.EEU...b.&....b..h.....b',
          'b..*....b...*..b....*...b',
          'bbbbbbbbbbbbbbbbbbbbbbbbb'
        ]
      },
      {
        t: 'Y+1 · les murs de boutique montent, portes encore ouvertes',
        g: [
          'bbbbbbbbbbbbbbbbbbbbbbbbb',
          'b.....b.....b....b......b',
          'b.....b.....b....b......b',
          'b.....b.....b....b......b',
          'b..*..b..*..b.*..b...*..b',
          'b.....b.....b....b......b',
          'bbDbbbbbbDbbbbbDbbbbbbDbb',
          '.........................',
          '.........................',
          '.........................',
          'bbbDbbbbbbbDbbbbbbDbbbbbb',
          'b.......b......b........b',
          'b.......b......b........b',
          'b..*....b...*..b....*...b',
          'bbbbbbbbbbbbbbbbbbbbbbbbb'
        ]
      },
      {
        t: 'Y+2 · linteaux des portes, murs pleins',
        g: [
          'bbbbbbbbbbbbbbbbbbbbbbbbb',
          'b.....b.....b....b......b',
          'b.....b.....b....b......b',
          'b.....b.....b....b......b',
          'b.....b.....b....b......b',
          'b.....b.....b....b......b',
          'bbbbbbbbbbbbbbbbbbbbbbbbb',
          '.........................',
          '.........................',
          '.........................',
          'bbbbbbbbbbbbbbbbbbbbbbbbb',
          'b.......b......b........b',
          'b.......b......b........b',
          'b.......b......b........b',
          'bbbbbbbbbbbbbbbbbbbbbbbbb'
        ]
      },
      {
        t: 'Y+3 · étages en encorbellement (le mur avance d\'un bloc)',
        g: [
          '##GG###GG####GG###GGG####',
          'G.....#.....#....#......G',
          '#..<..#..<..#.<..#...<..#',
          'G.....#.....#....#......G',
          '#.....#.....#....#......#',
          '#..*..#..*..#.*..#...*..#',
          '#.....#.....#....#......#',
          '##GG####GG#####GG####GG##',
          '.........................',
          '###GG####GG#####GG####G##',
          '#.......#......#........#',
          '#..<....#..<...#...<....#',
          'G.......#......#........G',
          '#..*....#...*..#....*...#',
          '#####GG######GG####GG####'
        ]
      },
      {
        t: 'Y+4 · second rang des fenêtres de l\'étage',
        g: [
          '##GG###GG####GG###GGG####',
          'G.....#.....#....#......G',
          '#.....#.....#....#......#',
          'G.....#.....#....#......G',
          '#.....#.....#....#......#',
          '#.....#.....#....#......#',
          '#.....#.....#....#......#',
          '##GG####GG#####GG####GG##',
          '.........................',
          '###GG####GG#####GG####G##',
          '#.......#......#........#',
          '#.......#......#........#',
          'G.......#......#........G',
          '#.......#......#........#',
          '#####GG######GG####GG####'
        ]
      },
      {
        t: 'Y+5 · sablières : mur plein au-dessus des fenêtres',
        g: [
          '#########################',
          '#.....#.....#....#......#',
          '#.....#.....#....#......#',
          '#.....#.....#....#......#',
          '#.....#.....#....#......#',
          '#.....#.....#....#......#',
          '#.....#.....#....#......#',
          '#########################',
          '.........................',
          '#########################',
          '#.......#......#........#',
          '#.......#......#........#',
          '#.......#......#........#',
          '#.......#......#........#',
          '#########################'
        ]
      },
      {
        t: 'Y+6 · toitures, premier rang',
        g: [
          '/////////////////////////',
          '/////////////////////////',
          '/////////////////////////',
          '/////////////////////////',
          '/////////////////////////',
          '/////////////////////////',
          '/////////////////////////',
          '/////////////////////////',
          '.........................',
          '/////////////////////////',
          '/////////////////////////',
          '/////////////////////////',
          '/////////////////////////',
          '/////////////////////////',
          '/////////////////////////'
        ]
      },
      {
        t: 'Y+7 · toitures, second rang',
        g: [
          '.........................',
          '/////////////////////////',
          '/////////////////////////',
          '/////////////////////////',
          '/////////////////////////',
          '/////////////////////////',
          '/////////////////////////',
          '.........................',
          '.........................',
          '.........................',
          '/////////////////////////',
          '/////////////////////////',
          '/////////////////////////',
          '/////////////////////////',
          '.........................'
        ]
      },
      {
        t: 'Y+8 · faîtages et souches de cheminée',
        g: [
          '.........................',
          '.........................',
          '.........................',
          '---b-------b------b------',
          '-------------------------',
          '.........................',
          '.........................',
          '.........................',
          '.........................',
          '.........................',
          '.........................',
          '----b--------b-----b-----',
          '-------------------------',
          '.........................',
          '.........................'
        ]
      }
    ],
    etapes: [
      'Tracez d\'abord la rue, pas les maisons : une bande de 3 blocs de large, légèrement creusée d\'un demi-bloc (dalles) pour qu\'elle se lise comme une chaussée.',
      'Posez les murs mitoyens perpendiculaires à la rue, en pierre, avant tout le reste. Ils découpent l\'îlot en parcelles et deux maisons voisines les partagent : c\'est ce partage qui crée l\'effet « quartier ».',
      'Donnez à chaque parcelle une largeur DIFFÉRENTE — 5, 6, 4, 7 blocs. Des parcelles égales produisent une caserne, pas une ville.',
      'Montez le rez-de-chaussée en pierre sur 3 blocs : c\'est le niveau des échoppes, il doit être plus massif et plus ouvert que les étages (larges baies, auvents en trappes).',
      'Montez le premier étage en encorbellement : le mur de façade avance d\'un bloc sur la rue, porté par des escaliers inversés en corbeaux. Ce décalage d\'un seul bloc est le détail médiéval le plus rentable du plan.',
      'Faites varier la hauteur de faîtage d\'une maison à l\'autre (un ou deux blocs d\'écart suffisent) et décalez les toitures : deux maisons voisines ne doivent jamais avoir la même silhouette.',
      'Couvrez en escaliers, rang par rang, chaque maison gardant son propre pignon sur rue. Ajoutez une souche de cheminée en pierre par maison, jamais alignées.',
      'Meublez le rez-de-chaussée par métier : forge (fourneaux + enclume), boulangerie, échoppe de tissu, bibliothèque. Un métier visible depuis la rue justifie chaque porte.',
      'Habillez la rue : puits ou fontaine au centre, étals en dalles, tonneaux, cordes à linge en clôtures, lanternes accrochées aux façades tous les 6 blocs.',
      'Terminez par le vieillissement : 15 % de briques fissurées et moussues en bas des murs, quelques blocs de terre entre les pavés, et de la vigne sur un mur d\'angle.'
    ],
    notes: [
      { type: 'tip', txt: 'Largeur de rue — 3 blocs pour une ruelle, 5 pour une rue marchande, jamais plus dans un quartier médiéval. Une rue large tue immédiatement l\'ambiance : c\'est l\'étroitesse qui fait la ville ancienne.' },
      { type: 'warn', txt: 'Apparitions — un îlot dense crée beaucoup de recoins sombres entre les bâtiments. Éclairez les cours arrière et les passages couverts, sinon vous découvrirez des zombies au milieu de votre quartier.' },
      { type: 'info', txt: 'Extensible — l\'îlot se duplique tel quel de l\'autre côté de la rue et se répète en profondeur. Trois îlots et une place suffisent à faire une ville entière.' }
    ]
  },

  /* ================= BASE DANS LA MONTAGNE ================= */
  {
    id: 'base-montagne', nom: 'Base creusée dans la montagne', cat: 'maison',
    taille: '19 × 21 × 12', diff: 'Avancé',
    desc: 'Un portail monumental taillé dans une falaise, un grand hall à colonnes et trois salles creusées au fond. La difficulté n\'est pas de creuser, c\'est de faire croire que la roche a été taillée et non grignotée.',
    mats: ['≈900 blocs de pierre des profondeurs polie (parements)', '≈400 briques de pierre et pierre taillée', '≈150 escaliers et dalles (corniches, arcs)', '≈30 lanternes ou lanternes des âmes', 'Coffres, bibliothèques, table d\'enchantement', 'Beaucoup d\'échafaudages pour le portail'],
    couches: [
      {
        t: 'Y+0 · parvis, portail et grand hall',
        g: [
          ',,,,,,,,,,,,,,,,,,,',
          'ccc,,,,,,,,,,,,,ccc',
          'cc,,,,,,,,,,,,,,,cc',
          'cc,,d,,,,,,,,,d,,cc',
          'cc,,d,,,,,,,,,d,,cc',
          'cccddd^^^^^^^dddccc',
          'cccd...........dccc',
          'cccd..*.....*..dccc',
          'cccd.c.......c.dccc',
          'cccd...........dccc',
          'cccd.c.......c.dccc',
          'cccd...........dccc',
          'cccd..*.....*..dccc',
          'cccddd>dd>dd>dddccc',
          'd.....d.....d.....d',
          'd.EEE.d..$..d.<<..d',
          'd.EEE.d.&&&.d.....d',
          'd.....d..*..d..*..d',
          'd..*..d.....d.....d',
          'ddddddddddddddddddd',
          'ccccccccccccccccccc'
        ]
      },
      {
        t: 'Y+1 · portail ouvert, colonnes, portes des trois salles',
        g: [
          '...................',
          'ccc.............ccc',
          'cc...............cc',
          'cc..d.........d..cc',
          'cc..d.........d..cc',
          'cccddd^^^^^^^dddccc',
          'cccd...........dccc',
          'cccd...........dccc',
          'cccd.c.......c.dccc',
          'cccd...........dccc',
          'cccd.c.......c.dccc',
          'cccd...........dccc',
          'cccd...........dccc',
          'cccdDddddDddddDdccc',
          'd.....d.....d.....d',
          'd.....d.....d.....d',
          'd.....d.....d.....d',
          'd.....d.....d.....d',
          'd.....d.....d.....d',
          'ddddddddddddddddddd',
          'ccccccccccccccccccc'
        ]
      },
      {
        t: 'Y+2 → Y+4 · le hall et les salles montent, portail encore ouvert (à répéter)',
        g: [
          '...................',
          'ccc.............ccc',
          'cc...............cc',
          'cc..d.........d..cc',
          'cc..d.........d..cc',
          'cccddd^^^^^^^dddccc',
          'cccd...........dccc',
          'cccd...........dccc',
          'cccd.c.......c.dccc',
          'cccd...........dccc',
          'cccd.c.......c.dccc',
          'cccd...........dccc',
          'cccd...........dccc',
          'cccdddddddddddddccc',
          'd.....d.....d.....d',
          'd.....d.....d.....d',
          'd.....d.....d.....d',
          'd.....d.....d.....d',
          'd.....d.....d.....d',
          'ddddddddddddddddddd',
          'ccccccccccccccccccc'
        ]
      },
      {
        t: 'Y+5 · voûte du hall et plafonds des salles',
        g: [
          '...................',
          'ccc.............ccc',
          'cc...............cc',
          'cc..d.........d..cc',
          'cc..d.........d..cc',
          'cccddd///////dddccc',
          'cccd...........dccc',
          'cccd...........dccc',
          'cccd..*.....*..dccc',
          'cccd...........dccc',
          'cccd..*.....*..dccc',
          'cccd...........dccc',
          'cccd...........dccc',
          'cccdddddddddddddccc',
          'ddddddd.....ddddddd',
          'ddddddd.....ddddddd',
          'ddddddd..*..ddddddd',
          'ddddddd.....ddddddd',
          'ddddddddddddddddddd',
          'ddddddddddddddddddd',
          'ccccccccccccccccccc'
        ]
      },
      {
        t: 'Y+6 · plafond de la salle centrale, consoles des lanternes du hall',
        g: [
          '...................',
          'ccc.............ccc',
          'cc...............cc',
          'cc..d.........d..cc',
          'cc..d.........d..cc',
          'cccdddddddddddddccc',
          'cccd...........dccc',
          'cccd...........dccc',
          'cccd.cd.....dc.dccc',
          'cccd...........dccc',
          'cccd.cd.....dc.dccc',
          'cccd...........dccc',
          'cccd...........dccc',
          'cccdddddddddddddccc',
          'ddddddddddddddddddd',
          'ddddddddddddddddddd',
          'ddddddddddddddddddd',
          'ddddddddddddddddddd',
          'ddddddddddddddddddd',
          'ddddddddddddddddddd',
          'ccccccccccccccccccc'
        ]
      },
      {
        t: 'Y+7 · chapiteaux et naissance de la voûte du hall',
        g: [
          '...................',
          'ccc.............ccc',
          'cc...............cc',
          'cc..d.........d..cc',
          'cc..d.........d..cc',
          'cccdddddddddddddccc',
          'cccd/........./dccc',
          'cccd/........./dccc',
          'cccd//.......//dccc',
          'cccd/........./dccc',
          'cccd//.......//dccc',
          'cccd/........./dccc',
          'cccd/........./dccc',
          'cccdddddddddddddccc',
          'ddddddddddddddddddd',
          'ddddddddddddddddddd',
          'ddddddddddddddddddd',
          'ddddddddddddddddddd',
          'ddddddddddddddddddd',
          'ddddddddddddddddddd',
          'ccccccccccccccccccc'
        ]
      },
      {
        t: 'Y+8 · plafond du hall fermé (8 rangs libres sous voûte)',
        g: [
          '...................',
          'ccc.............ccc',
          'cc...............cc',
          'cc..d.........d..cc',
          'cc..d.........d..cc',
          'cccdddddddddddddccc',
          'cccdddddddddddddccc',
          'cccdddddddddddddccc',
          'cccdddddddddddddccc',
          'cccdddddddddddddccc',
          'cccdddddddddddddccc',
          'cccdddddddddddddccc',
          'cccdddddddddddddccc',
          'cccdddddddddddddccc',
          'ddddddddddddddddddd',
          'ddddddddddddddddddd',
          'ddddddddddddddddddd',
          'ddddddddddddddddddd',
          'ddddddddddddddddddd',
          'ddddddddddddddddddd',
          'ccccccccccccccccccc'
        ]
      },
      {
        t: 'Y+9 · balcon et arc au-dessus du portail (15 × 7)',
        g: [
          '...................',
          '...................',
          '...................',
          '...................',
          '...................',
          '...................',
          '...................',
          '..M.M.M.M.M.M.M.M..',
          '..---------------..',
          '..ddddd/////ddddd..',
          '..ddddd.....ddddd..',
          '..ddddd.....ddddd..',
          '..ddddddddddddddd..',
          '..ccccccccccccccc..',
          '...................',
          '...................',
          '...................',
          '...................',
          '...................',
          '...................',
          '...................'
        ]
      },
      {
        t: 'Y+10 → Y+11 · paroi nue de la falaise au-dessus du balcon (à répéter)',
        g: [
          '...................',
          'ccc.............ccc',
          'cc...............cc',
          'cc...............cc',
          'cc...............cc',
          'ccccccccccccccccccc',
          'ccccccccccccccccccc',
          'ccccccccccccccccccc',
          'ccccccccccccccccccc',
          'ccccccccccccccccccc',
          'ccccccccccccccccccc',
          'ccccccccccccccccccc',
          'ccccccccccccccccccc',
          'ccccccccccccccccccc',
          'ccccccccccccccccccc',
          'ccccccccccccccccccc',
          'ccccccccccccccccccc',
          'ccccccccccccccccccc',
          'ccccccccccccccccccc',
          'ccccccccccccccccccc',
          'ccccccccccccccccccc'
        ]
      }
    ],
    etapes: [
      'Choisissez une falaise vraiment verticale, ou taillez-la : une base de montagne posée sur une pente molle ne se voit pas. Il faut au moins 15 blocs de paroi nue au-dessus du portail.',
      'Marquez d\'abord le contour du portail à la surface de la roche, avec des blocs colorés temporaires, et regardez-le de loin. Corrigez la largeur AVANT de creuser : un portail trop étroit est irrécupérable.',
      'Creusez le hall en une seule fois jusqu\'au fond, à la hauteur définitive (8 blocs minimum sous plafond). Creuser bas puis « rehausser » laisse toujours des traces au plafond.',
      'Parementez : remplacez toute la roche apparente du hall par de la pierre des profondeurs polie, en gardant volontairement quelques zones de roche brute — c\'est le contraste taillé/brut qui raconte l\'histoire.',
      'Posez les deux rangées de colonnes du hall, alignées sur les colonnes extérieures du parvis. La colonnade doit se poursuivre du dehors vers le dedans, sans rupture.',
      'Habillez le portail : deux colonnes engagées, un arc en escaliers, une corniche en dalles, puis le balcon à créneaux au-dessus. Les trois éléments empilés donnent l\'échelle monumentale.',
      'Percez les trois salles du fond derrière un mur unique à trois portes en fer : réserve et coffres à l\'ouest, enchantement et bibliothèque au centre, chambres à l\'est.',
      'Éclairez par le haut et par les côtés : lanternes suspendues au plafond du hall, et une bande lumineuse cachée derrière la corniche. Aucune torche posée au sol dans un hall monumental.',
      'Aménagez le parvis : chemin de terre ou gravier, marches larges de 5 blocs, deux braseros ou feux de camp de part et d\'autre du portail.',
      'Reliez le fond de la base à votre mine : un couloir en pente douce depuis la salle ouest, pas un escalier vertical — c\'est l\'accès que vous emprunterez le plus souvent.'
    ],
    notes: [
      { type: 'tip', txt: 'Le piège du creusement — un intérieur creusé paraît toujours plus petit qu\'il ne l\'est. Doublez la hauteur que vous jugez suffisante, puis ajoutez 2 blocs. Vous ne regretterez jamais un plafond trop haut.' },
      { type: 'danger', txt: 'Lave et vides — creusez horizontalement, jamais tout droit vers le bas, et gardez un seau d\'eau en barre d\'accès rapide. Une poche de lave dans le mur du hall peut détruire des heures de parement.' },
      { type: 'info', txt: 'Variante — la même composition fonctionne en base naine (roche + fer + lave contenue) ou en temple abandonné (mousse, lianes, blocs fissurés). Seule la palette change, pas le plan.' }
    ]
  },

  /* ================= MAISON DANS LES ARBRES ================= */
  {
    id: 'maison-arbres', nom: 'Maison dans les arbres — trois plateformes', cat: 'maison',
    taille: '21 × 15 × 16', diff: 'Intermédiaire',
    desc: 'Trois cabanes perchées à 8 blocs du sol, reliées par des passerelles en dalles. L\'intérêt n\'est pas la hauteur mais le trajet : on doit pouvoir faire le tour sans jamais redescendre.',
    mats: ['≈120 rondins (troncs et poteaux)', '≈450 planches (planchers et murs)', '≈250 escaliers et 120 dalles (toits et passerelles)', '≈90 clôtures (garde-corps)', '≈30 vitres · 3 portes', '20 échelles · 12 lanternes'],
    couches: [
      {
        t: 'Y+0 · emprise au sol : troncs, échelle et foyer',
        g: [
          'eeeeeeeeeeeeeeeeeeeee',
          'eeeeeeeeeeeeeeeeeeeee',
          'eeeeeeeeeeeeeeeeeeeee',
          'eeeooeeeeeeeeeeeeeeee',
          'eeeooLeeeeeeeeeeeeeee',
          'eeeeeeeeeeeeeeeeeeeee',
          'eeeeeeeeeeooeeeeeeeee',
          'eeeeeeeeeeooeeeeeeeee',
          'eeeeeeeeeFeeeeeeeeeee',
          'eeeeeeeeeeeeeeeeeeeee',
          'eeeeeeeeeeeeeeeeeooee',
          'eeeeeeeeeeeeeeeeeooee',
          'eeeeeeeeeeeeeeeeeeeee',
          'eeeeeeeeeeeeeeeeeeeee',
          'eeeeeeeeeeeeeeeeeeeee'
        ]
      },
      {
        t: 'Y+1 → Y+7 · troncs, poteaux porteurs et échelle (à répéter)',
        g: [
          '.....................',
          '.....................',
          '.....................',
          '...oo...........oo...',
          '...ooL..........oo...',
          '.....................',
          '..........oo.........',
          '..........oo.........',
          '.....................',
          '.....................',
          '.................oo..',
          '.................oo..',
          '.....................',
          '.....................',
          '.....................'
        ]
      },
      {
        t: 'Y+8 · planchers des plateformes et passerelles',
        g: [
          '.....................',
          '..............#######',
          '..............#######',
          '..............#######',
          '#######.......#######',
          '#######-------#######',
          '#######.......#######',
          '#######.........-....',
          '#######.....#######..',
          '#######.....#######..',
          '#######-----#######..',
          '............#######..',
          '............#######..',
          '............#######..',
          '............#######..'
        ]
      },
      {
        t: 'Y+9 · murs des cabanes, portes et garde-corps',
        g: [
          '.....................',
          '..............ooooooo',
          '..............o.....o',
          '..............oG...Go',
          'ooooooo.......o.....o',
          'o.....o|||||||oo.D.oo',
          'oG...Go.......ooooooo',
          'o.....o.........|....',
          'oG...Go.....ooooooo..',
          'o.....o.....o.....o..',
          'oo.D.oo|||||oG...Go..',
          '............o.....o..',
          '............oG...Go..',
          '............o.<<..o..',
          '............ooooooo..'
        ]
      },
      {
        t: 'Y+10 · deuxième rang des murs : fenêtres et portes',
        g: [
          '.....................',
          '..............ooooooo',
          '..............o.....o',
          '..............oG...Go',
          'ooooooo.......o.....o',
          'o.....o.......oo.D.oo',
          'oG...Go.......ooooooo',
          'o.....o..............',
          'oG...Go.....ooooooo..',
          'o.....o.....o.....o..',
          'oooDooo.....oG...Go..',
          '............o.....o..',
          '............oG...Go..',
          '............o.....o..',
          '............ooooooo..'
        ]
      },
      {
        t: 'Y+11 · haut des murs et lanternes suspendues',
        g: [
          '.....................',
          '..............ooooooo',
          '..............o.....o',
          '..............o..*..o',
          'ooooooo.......o.....o',
          'o.....o.......o.....o',
          'o.....o.......ooooooo',
          'o..*..o..............',
          'o.....o.....ooooooo..',
          'o.....o.....o.....o..',
          'ooooooo.....o.....o..',
          '............o..*..o..',
          '............o.....o..',
          '............o.....o..',
          '............ooooooo..'
        ]
      },
      {
        t: 'Y+12 · toitures des trois cabanes',
        g: [
          '.....................',
          '..............///////',
          '..............//---//',
          '..............//---//',
          '///////.......//---//',
          '//---//.......//---//',
          '//---//.......///////',
          '//---//..............',
          '//---//.....///////..',
          '//---//.....//---//..',
          '///////.....//---//..',
          '............//---//..',
          '............//---//..',
          '............//---//..',
          '............///////..'
        ]
      },
      {
        t: 'Y+13 · toitures : deuxième pan des trois cabanes',
        g: [
          '.....................',
          '.....................',
          '.............../////.',
          '.............../---/.',
          '.............../---/.',
          './////........./////.',
          './---/...............',
          './---/...............',
          './---/...............',
          './////......./////...',
          '............./---/...',
          '............./---/...',
          '............./---/...',
          '............./////...',
          '.....................'
        ]
      },
      {
        t: 'Y+14 · toitures : troisième pan',
        g: [
          '.....................',
          '.....................',
          '.....................',
          '................///..',
          '................///..',
          '.....................',
          '..///................',
          '../-/................',
          '..///................',
          '.....................',
          '..............///....',
          '............../-/....',
          '..............///....',
          '.....................',
          '.....................'
        ]
      },
      {
        t: 'Y+15 · faîtages en dalles',
        g: [
          '.....................',
          '.....................',
          '.....................',
          '.................-...',
          '.................-...',
          '.....................',
          '.....................',
          '...-.................',
          '.....................',
          '.....................',
          '.....................',
          '...............-.....',
          '.....................',
          '.....................',
          '.....................'
        ]
      }
    ],
    etapes: [
      'Choisissez trois arbres (ou plantez trois chênes noueux) espacés de 6 à 10 blocs. En dessous de 6, les cabanes se touchent ; au-delà de 10, les passerelles pendent mollement.',
      'Montez d\'abord les poteaux porteurs : 4 rondins par plateforme, descendus jusqu\'au sol. Une plateforme qui flotte sans support visible ruine tout l\'effet, même si le jeu le permet.',
      'Posez les trois planchers À LA MÊME HAUTEUR (Y+8) avant de construire quoi que ce soit dessus. Des plateformes à des hauteurs différentes obligent à des passerelles en pente, beaucoup plus difficiles à réussir.',
      'Jetez les passerelles en dalles de bois, larges de 1 bloc, avec un garde-corps en clôtures des deux côtés. Un demi-bloc de dénivelé au milieu de la travée suffit à leur donner du naturel.',
      'Montez les murs des cabanes sur 3 blocs seulement : perchée, une cabane doit rester basse, sinon elle écrase l\'arbre qui la porte.',
      'Couvrez chaque cabane d\'un toit à quatre pans en escaliers, débordant d\'un bloc sur les murs. Le débord protège visuellement les murs et signale une construction habitée.',
      'Installez l\'accès principal : une échelle contre le tronc le plus large, doublée d\'une trappe au niveau du plancher pour ne pas tomber dans le vide en sortant.',
      'Ramenez le feuillage : replantez des feuilles autour des plateformes et laissez retomber des lianes depuis les passerelles. Une cabane sans feuillage autour ressemble à un échafaudage.',
      'Éclairez avec des lanternes suspendues sous les passerelles et à l\'angle de chaque toit : le niveau de lumière doit couvrir tout le plancher, sinon les monstres apparaissent chez vous, à 8 blocs du sol.',
      'Terminez par le sol : un foyer, quelques coffres et un petit potager au pied des arbres, pour que la base ait aussi une vie au niveau zéro.'
    ],
    notes: [
      { type: 'warn', txt: 'Chute — construisez toujours avec des échafaudages ou en accroupi le long des bords. La plupart des morts sur ce chantier arrivent en posant le garde-corps, pas en montant les murs.' },
      { type: 'tip', txt: 'Feuillage persistant — les feuilles posées à la main ne se dégradent pas, contrairement à celles d\'un arbre coupé. C\'est ce qui permet de sculpter une canopée sur mesure autour des cabanes.' },
      { type: 'info', txt: 'Descente rapide — une colonne d\'eau ou une échelle dans un puits de 1 × 1 depuis la plus haute plateforme évite de refaire le tour des passerelles à chaque fois.' }
    ]
  },

  /* ================= ARÈNE / COLISÉE ================= */
  {
    id: 'colisee', nom: 'Colisée — arène à gradins circulaires', cat: 'ville',
    taille: '21 × 21 × 12', diff: 'Avancé',
    desc: 'Une arène de 13 blocs de diamètre entourée de deux rangs de gradins, deux loges d\'honneur et deux tunnels d\'entrée. Sert de zone de combat PvP, de ferme à mobs spectaculaire ou simplement de place de fête.',
    mats: ['≈2 200 briques de pierre et pierre taillée', '≈600 escaliers (gradins et voûtes)', '≈300 dalles · 180 murets (attique)', '≈120 blocs de quartz (loges)', '≈200 blocs de sable (aire centrale)', '24 lanternes · bannières'],
    couches: [
      {
        t: 'Y+0 · aire centrale, mur de podium et tunnels d\'entrée',
        g: [
          '.......bbbbbbb.......',
          '.....bbbcccccbbb.....',
          '....bbcccccccccbb....',
          '...bccccbbbbbccccb...',
          '..bcccbbbAAAbbbcccb..',
          '.bbccbbAAAAAAAbbccbb.',
          '.bccbbAAAAAAAAAbbccb.',
          'bbccbAAAAAAAAAAAbccbb',
          'bccbbAAAAAAAAAAAbbccb',
          '^^^^AAAAAA*AAAAAA^^^^',
          '^^^^AAAAAAxAAAAAA^^^^',
          '^^^^AAAAAA*AAAAAA^^^^',
          'bccbbAAAAAAAAAAAbbccb',
          'bbccbAAAAAAAAAAAbccbb',
          '.bccbbAAAAAAAAAbbccb.',
          '.bbccbbAAAAAAAbbccbb.',
          '..bcccbbbAAAbbbcccb..',
          '...bccccbbbbbccccb...',
          '....bbcccccccccbb....',
          '.....bbbcccccbbb.....',
          '.......bbbbbbb.......'
        ]
      },
      {
        t: 'Y+1 · galerie basse, arcade et mur du podium',
        g: [
          '.......bbbbbbb.......',
          '.....bbbqqqqqbbb.....',
          '........qqqqq........',
          '........bbbbb........',
          '..b*..bbb...bbb..*b..',
          '.....bb.......bb.....',
          '....bb.........bb....',
          'bb..b...........b..bb',
          'b*.bb...........bb.*b',
          '^^^^.............^^^^',
          '^^^^.............^^^^',
          '^^^^.............^^^^',
          'b*.bb...........bb.*b',
          'bb..b...........b..bb',
          '....bb.........bb....',
          '.....bb.......bb.....',
          '..b*..bbb...bbb..*b..',
          '........bbbbb........',
          '........qqqqq........',
          '.....bbbqqqqqbbb.....',
          '.......bbbbbbb.......'
        ]
      },
      {
        t: 'Y+2 · arcade (suite), passage de ronde et tunnels',
        g: [
          '.......bbbbbbb.......',
          '.....bbbqqqqqbbb.....',
          '........qqqqq........',
          '........bbbbb........',
          '..b...bbb...bbb...b..',
          '.....bb.......bb.....',
          '....bb.........bb....',
          'bb..b...........b..bb',
          'b..bb...........bb..b',
          '^^^^.............^^^^',
          '^^^^.............^^^^',
          '^^^^.............^^^^',
          'b..bb...........bb..b',
          'bb..b...........b..bb',
          '....bb.........bb....',
          '.....bb.......bb.....',
          '..b...bbb...bbb...b..',
          '........bbbbb........',
          '........qqqqq........',
          '.....bbbqqqqqbbb.....',
          '.......bbbbbbb.......'
        ]
      },
      {
        t: 'Y+3 · premier rang de gradins et loges d\'honneur',
        g: [
          '.......bbbbbbb.......',
          '.....bbbqqqqqbbb.....',
          '....bb//;;;;;//bb....',
          '...b////qbbbq////b...',
          '..b////bb...bb////b..',
          '.bb//bb.......bb//bb.',
          '.b///b.........b///b.',
          'bb//b...........b//bb',
          'b///b...........b///b',
          '^//b.............b//^',
          '^//b.............b//^',
          '^//b.............b//^',
          'b///b...........b///b',
          'bb//b...........b//bb',
          '.b///b.........b///b.',
          '.bb//bb.......bb//bb.',
          '..b////bb...bb////b..',
          '...b////qbbbq////b...',
          '....bb//;;;;;//bb....',
          '.....bbbqqqqqbbb.....',
          '.......bbbbbbb.......'
        ]
      },
      {
        t: 'Y+4 · contremarche du second rang de gradins',
        g: [
          '.......bbbbbbb.......',
          '.....bbbqqqqqbbb.....',
          '....bbbb.....bbbb....',
          '...bbb.........bbb...',
          '..bbb...........bbb..',
          '.bbb.............bbb.',
          '.bb...............bb.',
          'bbb...............bbb',
          'bb.................bb',
          'bb.................bb',
          'bb.................bb',
          'bb.................bb',
          'bb.................bb',
          'bbb...............bbb',
          '.bb...............bb.',
          '.bbb.............bbb.',
          '..bbb...........bbb..',
          '...bbb.........bbb...',
          '....bbbb.....bbbb....',
          '.....bbbqqqqqbbb.....',
          '.......bbbbbbb.......'
        ]
      },
      {
        t: 'Y+5 · second rang de gradins et lanternes',
        g: [
          '.......bbbbbbb.......',
          '.....bbb//*//bbb.....',
          '....bb//.....//bb....',
          '...*//.........//*...',
          '..b//...........//b..',
          '.bb/............./bb.',
          '.b/.............../b.',
          'bb/.............../bb',
          'b/................./b',
          'b/................./b',
          'b*.................*b',
          'b/................./b',
          'b/................./b',
          'bb/.............../bb',
          '.b/.............../b.',
          '.bb/............./bb.',
          '..b//...........//b..',
          '...*//.........//*...',
          '....bb//.....//bb....',
          '.....bbb//*//bbb.....',
          '.......bbbbbbb.......'
        ]
      },
      {
        t: 'Y+6 · mur haut de l\'enceinte',
        g: [
          '.......bbbbbbb.......',
          '.....bbb.....bbb.....',
          '....bb.........bb....',
          '...b.............b...',
          '..b...............b..',
          '.bb...............bb.',
          '.b.................b.',
          'bb.................bb',
          'b...................b',
          'b...................b',
          'b...................b',
          'b...................b',
          'b...................b',
          'bb.................bb',
          '.b.................b.',
          '.bb...............bb.',
          '..b...............b..',
          '...b.............b...',
          '....bb.........bb....',
          '.....bbb.....bbb.....',
          '.......bbbbbbb.......'
        ]
      },
      {
        t: 'Y+7 · corniche de pierre sous l\'attique',
        g: [
          '.......ccccccc.......',
          '.....ccc.....ccc.....',
          '....cc.........cc....',
          '...c.............c...',
          '..c...............c..',
          '.cc...............cc.',
          '.c.................c.',
          'cc.................cc',
          'c...................c',
          'c...................c',
          'c...................c',
          'c...................c',
          'c...................c',
          'cc.................cc',
          '.c.................c.',
          '.cc...............cc.',
          '..c...............c..',
          '...c.............c...',
          '....cc.........cc....',
          '.....ccc.....ccc.....',
          '.......ccccccc.......'
        ]
      },
      {
        t: 'Y+8 · attique : créneaux et mâts de vélum',
        g: [
          '.......MM|MM|M.......',
          '.....M|M.....M|M.....',
          '....M|.........MM....',
          '...|.............M...',
          '..M...............|..',
          '.MM...............|M.',
          '.M.................|.',
          'MM.................|M',
          'M...................|',
          'M...................M',
          '|...................M',
          'M...................|',
          'M...................M',
          '|M.................M|',
          '.M.................M.',
          '.|M...............M|.',
          '..M...............M..',
          '...|.............M...',
          '....M|.........MM....',
          '.....|MM.....|MM.....',
          '.......|MM|MM|.......'
        ]
      }
    ],
    etapes: [
      'Tracez le cercle extérieur AVANT tout : posez un bloc au centre, puis marquez les quatre axes à 10 blocs, puis remplissez le cercle bloc par bloc. Un cercle raté au sol donne une arène ratée sur toute la hauteur.',
      'Répétez ce cercle en trois exemplaires concentriques : rayon 10 (mur extérieur), rayon 7 (limite des gradins) et rayon 6 (mur du podium). Ce sont vos trois lignes directrices, tout le reste s\'y raccroche.',
      'Creusez ou remblayez l\'aire centrale pour la mettre 3 blocs SOUS le premier rang de gradins. Un public au même niveau que les combattants ne fonctionne pas.',
      'Percez les deux tunnels d\'entrée sur l\'axe est-ouest, larges de 3 blocs et voûtés en escaliers. Ils traversent le mur extérieur, la galerie et le mur du podium d\'un seul tenant.',
      'Montez les gradins en anneaux : chaque anneau monte de 1 bloc et recule d\'un bloc vers l\'extérieur. Deux anneaux d\'escaliers suffisent pour un colisée de cette taille, trois le rendent illisible.',
      'Aménagez les deux loges au nord et au sud : plancher de quartz surélevé de 2 blocs, bannières au fond, et un toit en dalles porté par quatre colonnes.',
      'Fermez le mur extérieur par une arcade régulière : une baie de 2 blocs de large tous les 3 blocs, en arcs d\'escaliers. C\'est la répétition de cette arcade qui rend le bâtiment antique.',
      'Couronnez d\'un attique en murets alternés, avec un mât en clôture tous les trois créneaux : ce sont les supports du vélum, la toile qui ombrageait les gradins.',
      'Éclairez sous les gradins, pas dessus : lanternes dans la galerie basse et sous les marches. L\'aire centrale doit rester le point le plus lumineux.',
      'Aménagez le sous-sol si vous voulez du spectacle : un couloir sous l\'arène, des portes en fer commandées par leviers, et des blocs de sable au-dessus pour ouvrir des trappes de mobs.'
    ],
    notes: [
      { type: 'tip', txt: 'Cercles — n\'improvisez jamais un cercle en Minecraft. Notez la demi-largeur de chaque rangée une seule fois, puis réutilisez la même liste pour tous les anneaux : c\'est le seul moyen d\'obtenir des courbes concentriques propres.' },
      { type: 'warn', txt: 'Sécurité PvP — le mur du podium doit faire au moins 3 blocs de haut côté arène, sinon les combattants sortent d\'un simple saut. Ajoutez une rangée de blocs lisses en haut pour empêcher l\'escalade.' },
      { type: 'info', txt: 'Usage — avec un générateur de monstres au centre et des gradins vitrés, la même structure devient une salle d\'observation. Avec du sable et de l\'eau, elle devient une arène de course.' }
    ]
  },

  /* ================= FERME FORTIFIÉE ================= */
  {
    id: 'ferme-fortifiee', nom: 'Ferme fortifiée — cour, mur et tour d\'angle', cat: 'ferme',
    taille: '19 × 19 × 10', diff: 'Intermédiaire',
    desc: 'Une exploitation agricole entièrement close : corps de ferme au nord, grange et enclos au sud, potager, puits central et une tour d\'angle qui surveille l\'entrée. Le plan à construire dès qu\'on joue en difficulté difficile.',
    mats: ['≈1 100 blocs de pierre (enceinte et tour)', '≈500 rondins et planches (corps de ferme, grange)', '≈250 escaliers et dalles (toitures)', '≈80 murets (créneaux)', '≈40 clôtures + 2 portillons', '1 porte en fer · 12 lanternes'],
    couches: [
      {
        t: 'Y+0 · plan de masse : bâtiments, cour et enclos',
        g: [
          'ccccccccccccccccccc',
          'c...c.ooooooooooo.c',
          'c...c.o.........o.c',
          'ccccc.o.<...E...o.c',
          'c.....o.........o.c',
          'c.....o.UY......o.c',
          'c.....ooooDoooooo.c',
          'c.................c',
          'c.......cwc.......c',
          'c.......c.c.......c',
          'c.................c',
          'c.....|||||||.....c',
          'c#####|eeeee|.....c',
          'c#hhh#|eeeee|.fff.c',
          'c#hhh#|eeeee|.fwf.c',
          'c#hhh#|eeeee|.fff.c',
          'c##D##|||D|||.....c',
          'c.................c',
          'ccccccccc>ccccccccc'
        ]
      },
      {
        t: 'Y+4 · toitures et chemin de ronde',
        g: [
          'ccccccccccccccccccc',
          'c...c///////////..c',
          'c...c//-------//..c',
          'ccccc//-------//..c',
          'c....//-------//..c',
          'c....//-------//..c',
          'c....///////////..c',
          'c.................c',
          'c.................c',
          'c.................c',
          'c.................c',
          'c.................c',
          'c/////............c',
          'c/---/............c',
          'c/---/............c',
          'c/---/............c',
          'c/////............c',
          'c.................c',
          'ccccccccccccccccccc'
        ]
      },
      {
        t: 'Y+6 · créneaux de l\'enceinte',
        g: [
          'M.M.M.M.M.M.M.M.M.M',
          '...................',
          'M.................M',
          '...................',
          'M.................M',
          '...................',
          'M.................M',
          '...................',
          'M.................M',
          '...................',
          'M.................M',
          '...................',
          'M.................M',
          '...................',
          'M.................M',
          '...................',
          'M.................M',
          '...................',
          'M.M.M.M.M.M.M.M.M.M'
        ]
      },
      {
        t: 'Y+9 · sommet de la tour d\'angle, hourd en encorbellement (7 × 7)',
        g: [
          '...................',
          '...................',
          '...................',
          '...................',
          '...................',
          '...................',
          '......M.M.M.M......',
          '...................',
          '......M.....M......',
          '.........*.........',
          '......M.....M......',
          '...................',
          '......M.M.M.M......',
          '...................',
          '...................',
          '...................',
          '...................',
          '...................',
          '...................'
        ]
      }
    ],
    etapes: [
      'Aplanissez un carré de 19 × 19 et tracez l\'enceinte en pierre AVANT les bâtiments : c\'est le mur qui fixe la ferme, tout le reste vient se coller dessus.',
      'Adossez chaque bâtiment à l\'enceinte plutôt que de le poser au milieu de la cour. Un corps de ferme qui partage un mur avec le rempart économise des blocs et paraît immédiatement plus ancien.',
      'Montez le mur à 4 blocs, puis ajoutez le chemin de ronde à l\'intérieur : une rangée de dalles à Y+4, accessible par un escalier depuis la cour et par la tour.',
      'Bâtissez la tour d\'angle nord-ouest à 9 blocs, soit le double du mur — elle doit surveiller l\'entrée sud, donc placez-la en diagonale de la porte, jamais à côté.',
      'Percez l\'unique entrée au sud, avec une porte en fer et une plaque de pression à l\'intérieur seulement : les zombies n\'ouvriront pas et vous ne serez jamais bloqué dehors.',
      'Installez le corps de ferme au nord : lit, coffres, four et établi, toit à deux pentes en escaliers avec faîtage en dalles.',
      'Découpez la cour en trois usages nets — enclos clôturé au centre-sud, potager irrigué à l\'est, grange à foin à l\'ouest. Une cour sans découpage a l\'air abandonnée.',
      'Creusez le puits au centre : deux blocs d\'eau, margelle en pierre, quatre poteaux et un petit toit. C\'est le repère visuel qui organise toute la cour.',
      'Éclairez le chemin de ronde et la cour à 12 lanternes minimum : une ferme fortifiée mal éclairée fabrique ses propres assiégeants.',
      'Terminez par le vieillissement : pierre moussue en pied de mur, chemins de terre tassés entre les bâtiments, quelques bottes de foin et outils posés contre la grange.'
    ],
    notes: [
      { type: 'tip', txt: 'Hauteur de mur — 4 blocs suffisent contre les zombies et les squelettes ; les araignées grimpent, donc ajoutez une rangée de dalles ou de blocs en surplomb en haut du mur pour les bloquer.' },
      { type: 'warn', txt: 'Raids — si des villageois habitent la ferme, un raid peut apparaître à l\'intérieur de l\'enceinte. Gardez une zone dégagée au centre pour combattre et un golem de fer dans la cour.' },
      { type: 'info', txt: 'Rendement — le potager de 5 × 3 et l\'enclos de 5 × 5 nourrissent largement un joueur. Doublez l\'enclos si vous élevez pour le cuir et la laine plutôt que pour la viande.' }
    ]
  },

  /* ================= AUBERGE ================= */
  {
    id: 'auberge', nom: 'Auberge à deux étages avec écurie', cat: 'maison',
    taille: '17 × 13 × 14', diff: 'Intermédiaire',
    desc: 'Salle commune et cuisine au rez-de-chaussée, quatre chambres à l\'étage, écurie sur la cour. C\'est le bâtiment public qui donne vie à un village : plusieurs lits sous un même toit et un endroit où les joueurs se retrouvent.',
    mats: ['≈250 briques de pierre (soubassement et cheminée)', '≈600 planches et rondins', '≈300 escaliers · 120 dalles (toit, tables, comptoir)', '≈40 vitres', '4 lits · 6 tonneaux · 8 lanternes', '≈30 clôtures (stalles et cour)'],
    couches: [
      {
        t: 'Y+0 · salle commune, comptoir, cuisine et écurie',
        g: [
          'ooooooooooo.,,,,,',
          'o.EUU....&o.,,,,,',
          'o.........o.,,,,,',
          'o.-------.o.,,,,,',
          'o/........o.,,,,,',
          'o.--...--.o.,,,,,',
          'o.--...--.o.ooooo',
          'o./.......o.o,,,o',
          'oooooDooooo.o|||o',
          ',,,,,,,,,,,,o,,,o',
          ',,,,,,,,,,,,o|||o',
          ',,,,,,,,,,,,o,h,o',
          ',,,,,,,,,,,,ooDoo'
        ]
      },
      {
        t: 'Y+1 · murs du rez, fenêtres basses, hauts de portes, écurie',
        g: [
          'o#####GG##o......',
          '#.........#......',
          'G.........G......',
          '#.........#......',
          '#./.......#......',
          '#.........#......',
          'G.........G.o###o',
          '#.........#.#...#',
          'o#GG#D#GG#o.#*..#',
          '............G...G',
          '............#..*#',
          '............#...#',
          '............o#D#o'
        ]
      },
      {
        t: 'Y+2 · haut des murs du rez, lanternes suspendues, écurie',
        g: [
          'o#####GG##o......',
          '#.........#......',
          'G.*.....*.G......',
          '#.........#......',
          '#../......#......',
          '#.........#......',
          'G..*...*..G.o###o',
          '#.........#.#...#',
          'o#GG###GG#o.#...#',
          '............G...G',
          '............#...#',
          '............#...#',
          '............o###o'
        ]
      },
      {
        t: 'Y+3 · plancher de l\'étage, sablière, trémie d\'escalier',
        g: [
          'ooooooooooo......',
          'o#########o......',
          'o#########o......',
          'o#########o......',
          'o#../#####o......',
          'o#########o......',
          'o#########o.ooooo',
          'o#########o.o...o',
          'ooooooooooo.o...o',
          '............o...o',
          '............o...o',
          '............o...o',
          '............ooooo'
        ]
      },
      {
        t: 'Y+4 · étage : quatre chambres et couloir central',
        g: [
          '###########......',
          '#.<<.#.<<.#......',
          '#.E..#..E.#......',
          '###D###D###......',
          '#.........#......',
          '###D###D###......',
          '#.E..#..E.#./////',
          '#.<<.#.<<.#./---/',
          '###########./---/',
          '............/---/',
          '............/---/',
          '............/---/',
          '............/////'
        ]
      },
      {
        t: 'Y+5 · murs des chambres, fenêtres, hauts de portes',
        g: [
          '##G#####G##......',
          'G....#....G......',
          '#....#....#......',
          '###D###D###......',
          '#.........#......',
          '###D###D###......',
          '#....#....#......',
          'G....#....G......',
          '##G#####G##......',
          '.................',
          '.................',
          '.................',
          '.................'
        ]
      },
      {
        t: 'Y+6 · haut des murs de l\'étage, lanternes du couloir',
        g: [
          '##G#####G##......',
          'G....#....G......',
          '#....#....#......',
          '###########......',
          '#.*.....*.#......',
          '###########......',
          '#....#....#......',
          'G....#....G......',
          '##G#####G##......',
          '.................',
          '.................',
          '.................',
          '.................'
        ]
      },
      {
        t: 'Y+7 · sablière haute et plafond de l\'étage',
        g: [
          'ooooooooooo......',
          'o#########o......',
          'o#########o......',
          'o#########o......',
          'o#########o......',
          'o#########o......',
          'o#########o......',
          'o#########o......',
          'ooooooooooo......',
          '.................',
          '.................',
          '.................',
          '.................'
        ]
      },
      {
        t: 'Y+8 · toit, anneau 1 (11 × 9, d\'aplomb sur les murs)',
        g: [
          '///////////......',
          '/........./......',
          '/........./......',
          '/........./......',
          '/........./......',
          '/........./......',
          '/........./......',
          '/........./......',
          '///////////......',
          '.................',
          '.................',
          '.................',
          '.................'
        ]
      },
      {
        t: 'Y+9 · toit, anneau 2 (9 × 7)',
        g: [
          '.................',
          './////////.......',
          './......./.......',
          './......./.......',
          './......./.......',
          './......./.......',
          './......./.......',
          './////////.......',
          '.................',
          '.................',
          '.................',
          '.................',
          '.................'
        ]
      },
      {
        t: 'Y+10 · toit, anneau 3 (7 × 5)',
        g: [
          '.................',
          '.................',
          '..///////........',
          '../...../........',
          '../...../........',
          '../...../........',
          '..///////........',
          '.................',
          '.................',
          '.................',
          '.................',
          '.................',
          '.................'
        ]
      },
      {
        t: 'Y+11 · toit, anneau 4 (5 × 3)',
        g: [
          '.................',
          '.................',
          '.................',
          '.../////.........',
          '.../.../.........',
          '.../////.........',
          '.................',
          '.................',
          '.................',
          '.................',
          '.................',
          '.................',
          '.................'
        ]
      },
      {
        t: 'Y+12 · faîtage (3 × 1)',
        g: [
          '.................',
          '.................',
          '.................',
          '.................',
          '....---..........',
          '.................',
          '.................',
          '.................',
          '.................',
          '.................',
          '.................',
          '.................',
          '.................'
        ]
      }
    ],
    etapes: [
      'Posez l\'emprise 11 × 9 de l\'auberge et laissez au moins 5 blocs de cour libre à côté : l\'écurie et la cour font partie du bâtiment, pas d\'un décor ajouté après.',
      'Montez un soubassement de pierre d\'un bloc sur tout le périmètre avant les planches. Ce socle isole visuellement le bois du sol et évite l\'effet « caisse posée sur l\'herbe ».',
      'Donnez 4 blocs de hauteur sous plafond à la salle commune et seulement 3 à l\'étage : la différence de hauteur entre le niveau public et le niveau privé est ce qui fait lire le bâtiment comme une auberge.',
      'Installez le comptoir en L le long du mur nord (dalles posées sur des barils ou des blocs pleins), avec la cuisine derrière : deux fourneaux, un coffre, un fumoir.',
      'Meublez la salle avec des tables : un bloc de clôture surmonté d\'une dalle de pression, entouré de 2 à 4 escaliers en guise de bancs. Trois tables de tailles différentes valent mieux que six identiques.',
      'Placez l\'escalier dans un angle, visible depuis la porte d\'entrée : dans une auberge, l\'escalier vers les chambres doit être le premier élément que voit le client.',
      'À l\'étage, découpez quatre chambres identiques de 4 × 2 autour d\'un couloir central, chacune avec un lit, un coffre et une fenêtre. Les portes s\'ouvrent toutes sur le couloir.',
      'Montez le toit à quatre pentes en escaliers, rang par rang, avec un débord d\'un bloc sur les murs, puis le faîtage en dalles et deux souches de cheminée en pierre.',
      'Construisez l\'écurie sur la cour : trois stalles de 3 blocs séparées par des clôtures, du foin au fond, un toit à une seule pente adossé au mur de la cour.',
      'Finissez par l\'enseigne et l\'éclairage : un panneau suspendu à une potence au-dessus de la porte, des lanternes de part et d\'autre, et un feu de camp dans la cour.'
    ],
    notes: [
      { type: 'tip', txt: 'Point de réapparition — quatre lits dans une auberge de village permettent à quatre joueurs de fixer leur réapparition au même endroit. C\'est le bâtiment le plus utile d\'un serveur en multijoueur.' },
      { type: 'warn', txt: 'Feu — n\'utilisez jamais de feu de camp ni de lave à l\'intérieur d\'un bâtiment en planches. Le foyer de la salle commune doit être entouré de pierre sur au moins un bloc dans toutes les directions.' },
      { type: 'info', txt: 'Chevaux — une stalle de 3 × 3 avec un portillon suffit à un cheval. Posez une auge (chaudron rempli d\'eau) et une botte de foin : c\'est décoratif, mais cela rend l\'écurie crédible.' }
    ]
  },

/* ================= AGRICOLE ================= */
  {
    id: 'moulin-vent', nom: 'Moulin à vent — corps, ailes et meule', cat: 'ferme',
    taille: '9 × 9 × 16', diff: 'Intermédiaire',
    desc: 'Une tour tronconique en pierre coiffée d\'une calotte en bois, avec une roue d\'ailes de 13 blocs de diamètre et une meule au rez-de-chaussée. Le seul bâtiment agricole qui se voit de l\'autre bout de la plaine.',
    mats: ['≈600 briques de pierre (fût octogonal)', '≈120 planches et 80 escaliers (calotte)', '≈60 rondins écorcés (arbre des ailes et lattes)', '≈40 trappes (toiles des ailes)', '2 blocs de pierre taillée (meule) · 6 blocs de foin', '1 porte · 8 lanternes · 1 paratonnerre'],
    couches: [
      {
        t: 'Vue de face · roue des quatre ailes (13 × 13)',
        vue: 1,
        g: [
          '+k.........k+',
          '.+k.......k+.',
          '..+k.....k+..',
          '...+k...k+...',
          '....+k.k+....',
          '.....+k+.....',
          '......k......',
          '.....k+k.....',
          '....k+.+k....',
          '...k+...+k...',
          '..k+.....+k..',
          '.k+.......+k.',
          'k+.........+k'
        ]
      },
      {
        t: 'Y+0 · fondation octogonale',
        g: [
          '...........',
          '...ccccc...',
          '..ccccccc..',
          '.ccccccccc.',
          '.ccccccccc.',
          '.ccccccccc.',
          '.ccccccccc.',
          '.ccccccccc.',
          '..ccccccc..',
          '...ccccc...',
          '...........'
        ]
      },
      {
        t: 'Y+1 · rez-de-chaussée : meule et escalier',
        g: [
          '...........',
          '...bbbbb...',
          '..bb...bb..',
          '.bb.....bb.',
          '.b...cc..b.',
          '.b...cc..b.',
          '.b.......b.',
          '.bb..../bb.',
          '..bb...bb..',
          '...bbDbb...',
          '...........'
        ]
      },
      {
        t: 'Y+2 · haut de la porte, sommet de la meule et 2e marche',
        g: [
          '...........',
          '...bbbbb...',
          '..bb...bb..',
          '.bb.....bb.',
          '.b...cc..b.',
          '.b...cc..b.',
          '.b.......b.',
          '.bb.../.bb.',
          '..bb...bb..',
          '...bbDbb...',
          '...........'
        ]
      },
      {
        t: 'Y+3 · fût : fenêtres est-ouest et 3e marche',
        g: [
          '...........',
          '...bbbbb...',
          '..bb...bb..',
          '.bb.....bb.',
          '.b.......b.',
          '.G.......G.',
          '.b.......b.',
          '.bb../..bb.',
          '..bb...bb..',
          '...bbbbb...',
          '...........'
        ]
      },
      {
        t: 'Y+4 · fût : lanternes suspendues et 4e marche',
        g: [
          '...........',
          '...bbbbb...',
          '..bb...bb..',
          '.bb.....bb.',
          '.b..*....b.',
          '.b.......b.',
          '.b....*..b.',
          '.bb./...bb.',
          '..bb...bb..',
          '...bbbbb...',
          '...........'
        ]
      },
      {
        t: 'Y+5 · plancher du grenier, trémie et 5e marche',
        g: [
          '...........',
          '...bbbbb...',
          '..bb###bb..',
          '.bb#####bb.',
          '.b#######b.',
          '.b#######b.',
          '.b#######b.',
          '.bb/..##bb.',
          '..bb###bb..',
          '...bbbbb...',
          '...........'
        ]
      },
      {
        t: 'Y+6 · grenier à grain et sacs',
        g: [
          '...........',
          '...bbbbb...',
          '..bb...bb..',
          '.bbhh...bb.',
          '.bhh....Gb.',
          '.b.......b.',
          '.bE.....Eb.',
          '.bb..../bb.',
          '..bb...bb..',
          '...bbGbb...',
          '...........'
        ]
      },
      {
        t: 'Y+7 · grenier : fenêtre nord',
        g: [
          '...........',
          '...bbGbb...',
          '..bb...bb..',
          '.bb.....bb.',
          '.b.......b.',
          '.b.......b.',
          '.b.......b.',
          '.bb.....bb.',
          '..bb...bb..',
          '...bbbbb...',
          '...........'
        ]
      },
      {
        t: 'Y+8 · grenier : dernier rang du fût large, fenêtre ouest décalée et lanternes',
        g: [
          '...........',
          '...bbbbb...',
          '..bb...bb..',
          '.bb.....bb.',
          '.b*......b.',
          '.b.......b.',
          '.G......*b.',
          '.bb.....bb.',
          '..bb...bb..',
          '...bbbbb...',
          '...........'
        ]
      },
      {
        t: 'Y+9 · corniche en dalles et retrait du fût (7 de large)',
        g: [
          '...........',
          '...-----...',
          '..--bbb--..',
          '.--b...b--.',
          '.-b.....b-.',
          '.-b.....b-.',
          '.-b.....b-.',
          '.--b...b--.',
          '..--bbb--..',
          '...-----...',
          '...........'
        ]
      },
      {
        t: 'Y+10 · fût étroit sous la calotte, lanternes du grenier',
        g: [
          '...........',
          '...........',
          '....bbb....',
          '...b...b...',
          '..b.*...b..',
          '..b.....b..',
          '..b...*.b..',
          '...b...b...',
          '....bbb....',
          '...........',
          '...........'
        ]
      },
      { t: 'Y+11 · plancher de la calotte tournante', g: [
        '...........',
        '...........',
        '....###....',
        '...#####...',
        '..#######..',
        '..#######..',
        '..#######..',
        '...#####...',
        '....###....',
        '...........',
        '...........'
      ] },
      {
        t: 'Y+12 · collerette de la calotte en planches',
        g: [
          '...........',
          '...........',
          '....###....',
          '...#...#...',
          '..#.....#..',
          '..#.....#..',
          '..#.....#..',
          '...#...#...',
          '....###....',
          '...........',
          '...........'
        ]
      },
      {
        t: 'Y+13 · calotte, lanternes du comble et poutre-arbre sortant au sud',
        g: [
          '...........',
          '...........',
          '....///....',
          '.../.../...',
          '../.*.*./..',
          '../..k../..',
          '../..k../..',
          '.../.k./...',
          '..../k/....',
          '.....k.....',
          '.....k.....'
        ]
      },
      {
        t: 'Y+14 · voûte de la calotte (escaliers inversés)',
        g: [
          '...........',
          '...........',
          '...........',
          '....///....',
          '.../###/...',
          '.../###/...',
          '.../###/...',
          '....///....',
          '...........',
          '...........',
          '...........'
        ]
      },
      {
        t: 'Y+15 · faîte de la calotte (paratonnerre au-dessus du centre)',
        g: [
          '...........',
          '...........',
          '...........',
          '...........',
          '.....#.....',
          '....###....',
          '.....#.....',
          '...........',
          '...........',
          '...........',
          '...........'
        ]
      }
    ],
    etapes: [
      'Tracez l\'octogone avant tout : un carré de 9 × 9 dont on retire deux blocs à chaque angle. C\'est l\'astuce qui donne un fût « rond » sans une seule courbe compliquée.',
      'Montez le fût sur 11 blocs en le rétrécissant d\'un bloc tous les 5 niveaux : un moulin doit être plus large en bas qu\'en haut, sinon il ressemble à une tour de guet.',
      'Installez la meule au rez-de-chaussée : deux blocs de pierre taillée superposés au centre, entourés d\'un plancher de bois. C\'est le seul mobilier vraiment visible depuis la porte.',
      'Percez les ouvertures en quinconce d\'un étage à l\'autre. Aligner toutes les fenêtres sur la même verticale casse l\'illusion de tour maçonnée.',
      'Posez le plancher de la calotte à Y+11, en débordant d\'un bloc sur le fût : ce débord est la charnière visuelle entre la pierre et le bois.',
      'Construisez la calotte en escaliers inversés, bombée, sur 4 blocs de haut. Terminez par la poutre-arbre qui sort en façade et portera les ailes.',
      'Montez les ailes en croix de Saint-André autour de cette poutre : quatre bras de 6 blocs en rondins écorcés, doublés de trappes pour figurer la toile.',
      'Réglez l\'inclinaison : posez les trappes du même côté de chaque bras et fermez-les à moitié. Toutes ouvertes, la roue devient illisible de loin.',
      'Éclairez le grenier par des lanternes suspendues, et le sol par un foyer près de la meule ; toute case sombre à l\'intérieur d\'un moulin fermé fait apparaître des zombies.',
      'Aménagez le pied : chemin de terre battue, charrette, meules de foin et parcelle de blé — un moulin sans champ autour n\'a aucune raison d\'exister.'
    ],
    notes: [
      { type: 'tip', txt: 'Proportion clé — le diamètre de la roue doit valoir environ 1,5 fois la largeur du fût. Des ailes trop petites font « ventilateur », des ailes trop grandes font « éolienne ».' },
      { type: 'info', txt: 'Ailes animées — quatre pistons collants poussant chacun un bras ne donnent qu\'un tremblement, pas une rotation. Pour un vrai mouvement, il faut une caméra armor stand ou un pack de ressources : mieux vaut assumer des ailes fixes.' }
    ]
  },
  {
    id: 'serre', nom: 'Serre / jardin d\'hiver vitré', cat: 'ferme',
    taille: '13 × 9 × 6', diff: 'Intermédiaire',
    desc: 'Une enveloppe entièrement vitrée sur un soubassement de pierre : quatre bacs de culture hydratés, une allée centrale et un toit à deux versants percé d\'aérateurs. Cultive tout ce qui pousse à la lumière, y compris en biome enneigé.',
    mats: ['≈350 blocs de verre et vitres', '≈120 briques de pierre (soubassement et dallage)', '≈60 dalles et trappes (faîtage et aérateurs)', '44 blocs de terre labourée · 2 seaux d\'eau', '≈10 lanternes suspendues · 1 porte'],
    couches: [
      {
        t: 'Y+0 · dallage, bacs de culture et rigoles',
        g: [
          'ccccccccccccc',
          'cfffffffffffc',
          'cfffffffffffc',
          'cwwwwwwwwwwwc',
          'c,,,,,,,,,,,c',
          'cwwwwwwwwwwwc',
          'cfffffffffffc',
          'cfffffffffffc',
          'ccccccccccccc'
        ]
      },
      {
        t: 'Y+1 · cultures, allée et porte',
        g: [
          'ccccccccccccc',
          'chhhhhhhhhhhc',
          'chhhhhhhhhhhc',
          'c...........c',
          'D...........c',
          'c...........c',
          'chhhhhhhhhhhc',
          'chhhhhhhhhhhc',
          'ccccccccccccc'
        ]
      },
      {
        t: 'Y+2 · vitrage courant (à répéter jusqu\'à Y+3)',
        g: [
          'cGGGGGGGGGGGc',
          'G...........G',
          'G...........G',
          'G...........G',
          'G...........G',
          'G...........G',
          'G...........G',
          'G...........G',
          'cGGGGGGGGGGGc'
        ]
      },
      {
        t: 'Y+4 · toit, premier rang (13 × 9)',
        g: [
          'ggggggggggggg',
          'ggggggggggggg',
          'g...........g',
          'g...........g',
          'g...........g',
          'g...........g',
          'g...........g',
          'ggggggggggggg',
          'ggggggggggggg'
        ]
      },
      {
        t: 'Y+5 · toit, second rang (13 × 5)',
        g: [
          '.............',
          '.............',
          'ggggggggggggg',
          'g...........g',
          'g...........g',
          'g...........g',
          'ggggggggggggg',
          '.............',
          '.............'
        ]
      },
      {
        t: 'Y+6 · faîtage et aérateurs (13 × 3)',
        g: [
          '.............',
          '.............',
          '.............',
          'ggggggggggggg',
          '+---+---+---+',
          'ggggggggggggg',
          '.............',
          '.............',
          '.............'
        ]
      }
    ],
    etapes: [
      'Montez d\'abord le soubassement en pierre sur un bloc de haut, tout autour : c\'est lui qui protège le verre des dégâts au sol et qui pose le bâtiment.',
      'Creusez les deux rigoles d\'eau dans le dallage, à 4 blocs l\'une de l\'autre. Une source hydrate 4 blocs dans chaque direction : deux rigoles suffisent à irriguer les quatre bacs.',
      'Labourez les bacs seulement APRÈS avoir posé l\'eau, sinon les blocs secs se déterrent au premier passage.',
      'Montez l\'enveloppe vitrée sur 3 niveaux. Alternez blocs de verre et vitres-panneaux : les panneaux ne remplissent pas toute la case et créent des joints de menuiserie très nets.',
      'Marquez les quatre angles en pierre du sol au toit. Sans ces montants, une serre entièrement en verre paraît molle et sans structure.',
      'Le toit est un simple prisme : chaque rang couvre deux lignes de moins que le précédent, jusqu\'à une ligne de faîtage.',
      'Percez les aérateurs — des trappes en position ouverte dans le faîtage tous les 4 blocs. Détail purement décoratif, mais c\'est ce qui fait lire « serre » plutôt que « boîte en verre ».',
      'Suspendez les lanternes sous le faîtage par des chaînes : les cultures poussent dès le niveau de lumière 9, la nuit comprise.',
      'Ajoutez une réserve : composteur, tonneau à graines et arrosoir décoratif au bout de l\'allée, plus deux bacs à fleurs à l\'entrée.'
    ],
    notes: [
      { type: 'tip', txt: 'Verre teinté — remplacer 10 % des vitres par du verre teinté de la même famille de couleur suffit à casser la monotonie sans perdre la transparence.' },
      { type: 'warn', txt: 'Pas de plafond opaque — si vous coiffez la serre d\'un toit plein « pour faire joli », plus aucune lumière du ciel n\'entre : il faut alors doubler l\'éclairage artificiel partout.' },
      { type: 'info', txt: 'Sous la neige — en biome enneigé, la neige se dépose sur le verre et le rend opaque de l\'extérieur. Les trappes et les dalles au faîtage empêchent la couche de se former.' }
    ]
  },

  /* ================= VILLAGE & OUVRAGES ================= */
  {
    id: 'phare-recif', nom: 'Phare côtier sur récif', cat: 'ville',
    taille: '13 × 13 × 15', diff: 'Intermédiaire',
    desc: 'Un fût de pierre à bandes claires planté sur un récif artificiel, avec une digue en muret, une galerie en encorbellement et un lanternon vitré. Sert de repère de navigation et de point d\'amarrage au large.',
    mats: ['≈900 briques de pierre et pierre taillée', '≈250 blocs de quartz (bandes claires)', '≈120 murets (digue et galerie)', '≈80 blocs de sable et gravier (récif)', '32 vitres · 40 échelles', '1 lanterne marine ou bloc de froglight · 1 paratonnerre'],
    couches: [
      {
        t: 'Y+0 · récif, banc de sable et socle',
        g: [
          'wwwwwwwwwwwww',
          'wwwwAAAAAwwww',
          'wwwAAcccAAwww',
          'wwAAcccccAAww',
          'wAAcccccccAAw',
          'wAcccccccccAw',
          'wAcccccccccAw',
          'wAcccccccccAw',
          'wAAcccccccAAw',
          'wwAAcccccAAww',
          'wwwAAcccAAwww',
          'wwwwAAAAAwwww',
          'wwwwwwwwwwwww'
        ]
      },
      {
        t: 'Y+1 · terre-plein, digue et porte',
        g: [
          '.............',
          '....MMMMM....',
          '...McccccM...',
          '..MbbbbbbbM..',
          '.Mcb.....bcM.',
          '.Mcb.....bcM.',
          '.Mcb..L..bcM.',
          '.Mcb.....bcM.',
          '.Mcb.....bcM.',
          '..MbbbDbbbM..',
          '...McccccM...',
          '....MMMMM....',
          '.............'
        ]
      },
      {
        t: 'Y+2 → Y+11 · fût du phare (à répéter)',
        g: [
          '.............',
          '.............',
          '.............',
          '.....bbb.....',
          '....bqqqb....',
          '...bq...qb...',
          '...bq.L.qb...',
          '...bq...qb...',
          '....bqqqb....',
          '.....bbb.....',
          '.............',
          '.............',
          '.............'
        ]
      },
      {
        t: 'Y+12 · galerie en encorbellement',
        g: [
          '.............',
          '.............',
          '...-------...',
          '..-ccccccc-..',
          '..-cbbbbbc-..',
          '..-cb...bc-..',
          '..-cb.L.bc-..',
          '..-cb...bc-..',
          '..-cbbbbbc-..',
          '..-ccccccc-..',
          '...-------...',
          '.............',
          '.............'
        ]
      },
      {
        t: 'Y+13 · lanternon vitré',
        g: [
          '.............',
          '.............',
          '.............',
          '....GGGGG....',
          '...G.....G...',
          '...G.....G...',
          '...G..*..G...',
          '...G.....G...',
          '...G.....G...',
          '....GGGGG....',
          '.............',
          '.............',
          '.............'
        ]
      },
      {
        t: 'Y+14 · toiture et paratonnerre',
        g: [
          '.............',
          '.............',
          '.............',
          '.............',
          '.....///.....',
          '..../---/....',
          '..../-*-/....',
          '..../---/....',
          '.....///.....',
          '.............',
          '.............',
          '.............',
          '.............'
        ]
      }
    ],
    etapes: [
      'Choisissez un haut-fond ou une pointe rocheuse à 20-40 blocs de la côte : un phare collé à la plage ne sert à rien, il doit signaler un danger.',
      'Construisez le récif d\'abord, en remblayant sable et gravier depuis le fond. Faites-le déborder de 2 blocs autour du socle : la couronne de sable apparente est ce qui rend l\'ouvrage crédible.',
      'Montez la digue en murets sur le pourtour du terre-plein. Un muret arrête les vagues visuellement et empêche les noyés de grimper.',
      'Élevez le fût sur 10 blocs en alternant 3 rangs de briques et 2 rangs de quartz : les bandes horizontales sont la signature d\'un phare, et elles cassent la verticalité du tube.',
      'Faites décroître le fût d\'un bloc de diamètre au tiers de sa hauteur. Un fût parfaitement cylindrique paraît toujours trop mince en haut.',
      'Posez l\'échelle contre la paroi intérieure côté terre, doublée d\'une trappe à chaque plancher pour ne pas tomber en sortant.',
      'La galerie déborde de 2 blocs sur le fût : rang de dalles porté par des escaliers inversés, puis garde-corps en murets. C\'est le détail qui donne l\'échelle à l\'ensemble.',
      'Vitrez le lanternon et posez la source de lumière au centre, à hauteur d\'œil : une lanterne marine ou un bloc de froglight porte beaucoup plus loin la nuit qu\'une simple torche.',
      'Coiffez d\'un petit toit conique en escaliers, puis plantez un paratonnerre en cuivre : sur un point haut isolé au bord de l\'eau, la foudre tombe régulièrement.',
      'Terminez par les abords : un ponton de dalles jusqu\'à la rive, deux bornes d\'amarrage, quelques blocs de corail et de la prismarine sur le récif.'
    ],
    notes: [
      { type: 'tip', txt: 'Visibilité réelle — placez la lumière au-dessus de la distance de rendu du brouillard bas, soit environ 20 blocs au-dessus du niveau de la mer. En dessous, votre phare disparaît dès que vous vous éloignez.' },
      { type: 'warn', txt: 'Noyés — un ouvrage en pleine eau attire les noyés, qui lancent des tridents. Fermez le terre-plein par des murets et éclairez le socle jusque sous la surface.' }
    ]
  },
  {
    id: 'bibliotheque', nom: 'Bibliothèque monumentale à mezzanine', cat: 'ville',
    taille: '15 × 15 × 14', diff: 'Avancé',
    desc: 'Une salle unique de 13 blocs de haut, ceinturée de rayonnages sur deux niveaux, avec une mezzanine en U ouverte sur le vide central et un lanterneau qui éclaire la nef par le haut.',
    mats: ['≈420 bibliothèques (1 260 livres : prévoyez une ferme à canne à sucre)', '≈1 400 briques de pierre et pierre taillée', '≈300 planches (planchers et mezzanine)', '≈200 escaliers et 150 dalles (toiture et corniches)', '≈90 clôtures (garde-corps) · 60 vitres', '≈30 lanternes · 1 table d\'enchantement'],
    couches: [
      {
        t: 'Y+0 · nef : rayonnages, piliers et table de lecture',
        g: [
          '.................',
          '.bbbbbbbbbbbbbbb.',
          '.b&&&&&&&&&&&&&b.',
          '.b&...........&b.',
          '.b&.c.......c.&b.',
          '.b&...........&b.',
          '.b&...........&b.',
          '.b&....###....&b.',
          '.b&....#*#....&b.',
          '.b&....###....&b.',
          '.b&...........&b.',
          '.b&...........&b.',
          '.b&.c.......c.&b.',
          '.b&.........//&b.',
          '.b&&&&&&&&&&&&&b.',
          '.bbbbbbbDbbbbbbb.',
          '.................'
        ]
      },
      {
        t: 'Y+1 · deuxième rang de rayonnages, dégagement devant la porte',
        g: [
          '.................',
          '.bbbbbbbbbbbbbbb.',
          '.b&&&&&&&&&&&&&b.',
          '.b&...........&b.',
          '.b&.c.......c.&b.',
          '.b&...........&b.',
          '.b&...........&b.',
          '.b&...........&b.',
          '.b&...........&b.',
          '.b&...........&b.',
          '.b&...........&b.',
          '.b&...........&b.',
          '.b&.c.......c.&b.',
          '.b&...........&b.',
          '.b&&&&&&.&&&&&&b.',
          '.bbbbbbbDbbbbbbb.',
          '.................'
        ]
      },
      {
        t: 'Y+2 · murs, piliers et verrières basses',
        g: [
          '.................',
          '.bbGGbbbbbbbGGbb.',
          '.G.............G.',
          '.G.............G.',
          '.b.c.........c.b.',
          '.b.............b.',
          '.G.............G.',
          '.b.............b.',
          '.b.............b.',
          '.G.............G.',
          '.b.............b.',
          '.b.............b.',
          '.b.c.........c.b.',
          '.G.............G.',
          '.G.............G.',
          '.bbGGbbbDbbbGGbb.',
          '.................'
        ]
      },
      {
        t: 'Y+3 · deuxième assise des verrières basses, piliers',
        g: [
          '.................',
          '.bbGGbbbbbbbGGbb.',
          '.G.............G.',
          '.G.............G.',
          '.b..c.......c..b.',
          '.b.............b.',
          '.G.............G.',
          '.b.............b.',
          '.b.............b.',
          '.G.............G.',
          '.b.............b.',
          '.b.............b.',
          '.b..c.......c..b.',
          '.G.............G.',
          '.G.............G.',
          '.bbGGbbbbbbbGGbb.',
          '.................'
        ]
      },
      {
        t: 'Y+4 · murs pleins sous la mezzanine, lanternes suspendues au plancher',
        g: [
          '.................',
          '.bbbbbbbbbbbbbbb.',
          '.b.............b.',
          '.b.*.........*.b.',
          '.b..c.......c..b.',
          '.b.............b.',
          '.b.............b.',
          '.b.............b.',
          '.b.*.........*.b.',
          '.b.............b.',
          '.b.............b.',
          '.b.............b.',
          '.b..c.......c..b.',
          '.b.*.........*.b.',
          '.b.............b.',
          '.bbbbbbbbbbbbbbb.',
          '.................'
        ]
      },
      {
        t: 'Y+5 · plancher de la mezzanine (en U autour du vide)',
        g: [
          '.................',
          '.bbbbbbbbbbbbbbb.',
          '.b#############b.',
          '.b#############b.',
          '.b###.......###b.',
          '.b###.......###b.',
          '.b###.......###b.',
          '.b###.......###b.',
          '.b###.......###b.',
          '.b###.......###b.',
          '.b###.......###b.',
          '.b###.......###b.',
          '.b#############b.',
          '.b#############b.',
          '.b#############b.',
          '.bbbbbbbbbbbbbbb.',
          '.................'
        ]
      },
      {
        t: 'Y+6 · mezzanine : rayonnages et garde-corps',
        g: [
          '.................',
          '.bbGGGbbbbbGGGbb.',
          '.G&&&&&&&&&&&&&G.',
          '.b&&|||||||||&&b.',
          '.b&.|.......|.&b.',
          '.G&.|.......|.&G.',
          '.b&.|.......|.&b.',
          '.b&.|.......|.&b.',
          '.G&.|.......|.&G.',
          '.b&.|.......|.&b.',
          '.b&.|.......|.&b.',
          '.G&.|.......|.&G.',
          '.b&&|||||||||&&b.',
          '.b&...........&b.',
          '.G&&&&&&&&&&&&&G.',
          '.bbGGGbbbbbGGGbb.',
          '.................'
        ]
      },
      {
        t: 'Y+7 · deuxième rang de rayonnages hauts et verrières hautes',
        g: [
          '.................',
          '.bbGGGbbbbbGGGbb.',
          '.G&&&&&&&&&&&&&G.',
          '.b&&.........&&b.',
          '.b&...........&b.',
          '.G&...........&G.',
          '.b&...........&b.',
          '.b&...........&b.',
          '.G&...........&G.',
          '.b&...........&b.',
          '.b&...........&b.',
          '.G&...........&G.',
          '.b&&.........&&b.',
          '.b&...........&b.',
          '.G&&&&&&&&&&&&&G.',
          '.bbGGGbbbbbGGGbb.',
          '.................'
        ]
      },
      {
        t: 'Y+8 → Y+9 · murs pleins au-dessus des rayonnages hauts (à répéter)',
        g: [
          '.................',
          '.bbbbbbbbbbbbbbb.',
          '.b.............b.',
          '.b.............b.',
          '.b.............b.',
          '.b.............b.',
          '.b.............b.',
          '.b.............b.',
          '.b.............b.',
          '.b.............b.',
          '.b.............b.',
          '.b.............b.',
          '.b.............b.',
          '.b.............b.',
          '.b.............b.',
          '.bbbbbbbbbbbbbbb.',
          '.................'
        ]
      },
      {
        t: 'Y+10 · charpente et lanterneau vitré',
        g: [
          '.................',
          '.kkkkkkkkkkkkkkk.',
          '.k.............k.',
          '.k.kkkkkkkkkkk.k.',
          '.k.k.........k.k.',
          '.k.k.ggggggg.k.k.',
          '.k.k.g.....g.k.k.',
          '.k.k.g.....g.k.k.',
          '.k.k.g.....g.k.k.',
          '.k.k.g.....g.k.k.',
          '.k.k.g.....g.k.k.',
          '.k.k.ggggggg.k.k.',
          '.k.k.........k.k.',
          '.k.kkkkkkkkkkk.k.',
          '.k.............k.',
          '.kkkkkkkkkkkkkkk.',
          '.................'
        ]
      },
      {
        t: 'Y+11 · plafond sur la charpente, corniche en dalles, verrière du lanterneau',
        g: [
          '.................',
          '.bbbbbbbbbbbbbbb.',
          '.b-------------b.',
          '.b-###########-b.',
          '.b-###########-b.',
          '.b-##ggggggg##-b.',
          '.b-##ggggggg##-b.',
          '.b-##ggggggg##-b.',
          '.b-##ggggggg##-b.',
          '.b-##ggggggg##-b.',
          '.b-##ggggggg##-b.',
          '.b-##ggggggg##-b.',
          '.b-###########-b.',
          '.b-###########-b.',
          '.b-------------b.',
          '.bbbbbbbbbbbbbbb.',
          '.................'
        ]
      },
      {
        t: 'Y+12 · toiture, premier rang débordant (17 × 17)',
        g: [
          '/////////////////',
          '/.............../',
          '/.............../',
          '/.............../',
          '/.............../',
          '/.............../',
          '/.............../',
          '/.............../',
          '/.............../',
          '/.............../',
          '/.............../',
          '/.............../',
          '/.............../',
          '/.............../',
          '/.............../',
          '/.............../',
          '/////////////////'
        ]
      }
    ],
    etapes: [
      'Montez la boîte 15 × 15 sur 12 blocs AVANT toute décoration. Une bibliothèque monumentale se joue entièrement sur la hauteur sous plafond : en dessous de 10 blocs, l\'effet tombe à plat.',
      'Marquez quatre piliers intérieurs en pierre taillée aux angles de la nef. Ils portent visuellement la mezzanine et rythment les rayonnages.',
      'Doublez tout le pourtour intérieur de bibliothèques au rez-de-chaussée, sauf devant la porte et l\'escalier : c\'est la masse de livres qui fait la pièce, pas le décor.',
      'Posez la mezzanine à Y+5 en U : plancher de 3 blocs de profondeur sur trois côtés, ouvert sur le vide central. Un plancher plein transformerait la salle en deux petites pièces superposées.',
      'Bordez le vide de clôtures ou de murets à hauteur de taille. C\'est le seul garde-corps qui laisse voir la nef depuis l\'étage.',
      'L\'escalier monte dans l\'angle sud-est, en deux volées de 5 marches séparées par un palier — un escalier d\'un seul jet sur 5 blocs paraît toujours trop raide.',
      'Percez les verrières : deux bandes de vitres, une au niveau du rez-de-chaussée et une au niveau de la mezzanine, alignées sur la même trame verticale.',
      'Construisez le lanterneau : un carré vitré de 7 × 7 au centre de la charpente, qui laisse tomber la lumière du ciel au milieu de la nef. C\'est l\'éclairage le plus élégant du jeu.',
      'Coiffez d\'une toiture en escaliers débordant d\'un bloc sur les murs, avec des corniches en dalles au niveau du plafond.',
      'Aménagez enfin : tables de lecture en dalles sur clôtures, tapis dans l\'allée centrale, table d\'enchantement au fond entourée de ses 15 bibliothèques utiles, et cadres d\'objets pour signaler les rayons.'
    ],
    notes: [
      { type: 'warn', txt: 'Coût réel — 420 bibliothèques valent 1 260 livres, soit 1 260 cuirs et 3 780 papiers. Montez la ferme à canne à sucre et l\'élevage de vaches AVANT de commencer ce chantier, ou remplacez une partie des rayonnages par des étagères ciselées.' },
      { type: 'tip', txt: 'Faux rayonnages — au-delà du deuxième niveau, personne ne distingue une bibliothèque d\'un bloc de bois foncé bordé de dalles. Réservez les vraies bibliothèques aux 2 premiers rangs, à hauteur d\'œil.' },
      { type: 'info', txt: 'Niveau 30 — la table d\'enchantement ne compte que les 15 bibliothèques situées à 2 blocs d\'elle avec de l\'air entre les deux. Les 400 autres sont purement décoratives : ne cherchez pas à les « faire compter ».' }
    ]
  },
  {
    id: 'forge-village', nom: 'Forge de village — four, enclume et charbonnière', cat: 'ville',
    taille: '11 × 9 × 8', diff: 'Intermédiaire',
    desc: 'Un atelier ouvert sur la rue par un large auvent : batterie de fourneaux sous la hotte, enclume et bac de trempe au centre, réserve de charbon au fond. Le bâtiment qui donne immédiatement un métier à un village.',
    mats: ['≈300 briques de pierre et pierre taillée', '≈150 planches et 60 rondins écorcés (charpente et auvent)', '≈180 escaliers (toiture à deux versants)', '4 à 6 fourneaux · 1 haut fourneau · 1 enclume', '≈20 blocs de charbon (réserve) · 1 chaudron', '1 établi · 3 coffres · 6 lanternes'],
    couches: [
      {
        t: 'Y+0 · dallage de l\'atelier et sol de la cour',
        g: [
          '.............',
          '.ccccccccccc.',
          '.ccccccccccc.',
          '.ccccccccccc.',
          '.ccccccccccc.',
          '.ccccccccccc.',
          '.ccccccccccc.',
          '.ccccccccccc.',
          '.,,,,,,,,,,,.',
          '.,,,,,,,,,,,.',
          '.............'
        ]
      },
      {
        t: 'Y+1 · murs, fourneaux, enclume et charbonnière',
        g: [
          '.............',
          '.bbbbbbbbbbb.',
          '.bUUU..BBBBb.',
          '.b.....BBBBb.',
          '.b(...w....b.',
          '.b.........b.',
          '.bY.......Eb.',
          '.bbbb...bbbb.',
          '..|.......|..',
          '.,,,,,,,,,,,.',
          '.............'
        ]
      },
      {
        t: 'Y+2 · hotte de cheminée, fenêtres et étagères',
        g: [
          '.............',
          '.bbGGbbbbGGb.',
          '.bccc.....*b.',
          '.b.........b.',
          '.bG.......Gb.',
          '.b.........b.',
          '.b........*b.',
          '.bbbb...bbbb.',
          '..|.......|..',
          '.............',
          '.............'
        ]
      },
      {
        t: 'Y+3 · poutraison et sablière de l\'auvent',
        g: [
          '.............',
          '.kkkkkkkkkkk.',
          '.k.........k.',
          '.k.kkkkkkk.k.',
          '.k.........k.',
          '.k.kkkkkkk.k.',
          '.k.........k.',
          '.kkkkkkkkkkk.',
          '.kkkkkkkkkkk.',
          '.............',
          '.............'
        ]
      },
      {
        t: 'Y+4 · toit, anneau 1 (13 × 11)',
        g: [
          '/////////////',
          '/.........../',
          '/.........../',
          '/.........../',
          '/.........../',
          '/.........../',
          '/.........../',
          '/.........../',
          '/.........../',
          '/.........../',
          '/////////////'
        ]
      },
      {
        t: 'Y+5 · toit, anneau 2 (11 × 9)',
        g: [
          '.............',
          './//////////.',
          './........./.',
          './........./.',
          './........./.',
          './........./.',
          './........./.',
          './........./.',
          './........./.',
          './//////////.',
          '.............'
        ]
      }
    ],
    etapes: [
      'Posez le dallage de pierre en débordant de 2 blocs côté rue : cette avancée dallée sera le sol de l\'auvent, et elle amarre le bâtiment au village.',
      'Montez trois murs pleins seulement. Le quatrième, côté rue, n\'est qu\'un large linteau porté par deux poteaux : une forge se regarde de l\'extérieur, elle ne se ferme pas.',
      'Alignez la batterie de fourneaux contre le mur du fond, tous orientés vers l\'intérieur, avec le haut fourneau au milieu — c\'est lui qui fond les minerais deux fois plus vite.',
      'Montez la hotte au-dessus des fourneaux : trois blocs de pierre en encorbellement qui se resserrent jusqu\'à une cheminée d\'un bloc traversant le toit. Sans hotte, la forge ressemble à une cuisine.',
      'Placez l\'enclume au centre, tournée d\'un quart de tour par rapport aux murs. Un mobilier légèrement désaxé lit tout de suite comme un atelier en activité.',
      'Creusez le bac de trempe à côté de l\'enclume : un chaudron rempli d\'eau, ou une case d\'eau bordée de dalles.',
      'Empilez la réserve de charbon dans l\'angle du fond — les blocs marqués « B » sur le plan sont des blocs de charbon. Un tas irrégulier, à un ou deux blocs de haut, avec une pelle posée dessus.',
      'Charpentez l\'auvent : deux poteaux en rondins écorcés, une sablière qui les relie, et des liens obliques en escaliers dans les angles.',
      'Toiture à deux versants très pente, en escaliers, débordant de 1 bloc de chaque côté ; laissez la cheminée passer au travers.',
      'Éclairez par des lanternes suspendues sous l\'auvent et un feu de camp à l\'écart : la lumière chaude en façade est ce qui rend une forge vivante la nuit.'
    ],
    notes: [
      { type: 'tip', txt: 'Villageois forgeron — posez une table de forge, une table de fabrication d\'armures ou une meule dans le bâtiment, et un villageois sans métier viendra s\'y installer. Le bâtiment devient alors une vraie boutique.' },
      { type: 'warn', txt: 'Feu — la lave décorative et les feux de camp mettent le feu aux blocs de bois adjacents. Isolez toujours la hotte et l\'auvent par au moins un bloc de pierre.' }
    ]
  },
  {
    id: 'halle-marche', nom: 'Halle de marché couverte', cat: 'ville',
    taille: '15 × 11 × 9', diff: 'Intermédiaire',
    desc: 'Une charpente sur colonnade, sans mur : deux rangées d\'étals adossés, un îlot central et deux allées de circulation, le tout couvert d\'un grand toit à quatre pans. Le bâtiment qui structure une place de village.',
    mats: ['≈220 rondins écorcés (colonnade et charpente)', '≈500 escaliers (toiture à quatre pans)', '≈180 dalles (dallage et faîtage)', '≈40 tonneaux et coffres (étals)', '≈30 blocs de chemin de terre (allée centrale)', '12 lanternes · cadres d\'objets · bannières'],
    couches: [
      {
        t: 'Y+0 · dallage, allée centrale et emprise',
        g: [
          '.................',
          '.ccccccccccccccc.',
          '.c-------------c.',
          '.c-------------c.',
          '.c-------------c.',
          '.c-------------c.',
          '.c,,,,,,,,,,,,,c.',
          '.c-------------c.',
          '.c-------------c.',
          '.c-------------c.',
          '.c-------------c.',
          '.ccccccccccccccc.',
          '.................'
        ]
      },
      {
        t: 'Y+1 · colonnade, étals adossés et îlot central',
        g: [
          '.................',
          '.k.k.k.k.k.k.k.k.',
          '.kEEEEEEEEEEEEEk.',
          '.k.............k.',
          '.k.............k.',
          '.k.EEEEE.EEEEE.k.',
          '.k.E.x.E.E.x.E.k.',
          '.k.EEEEE.EEEEE.k.',
          '.k.............k.',
          '.k.............k.',
          '.kEEEEEEEEEEEEEk.',
          '.k.k.k.k.k.k.k.k.',
          '.................'
        ]
      },
      {
        t: 'Y+2 · comptoirs en dalles, deuxième assise des poteaux, lanternes',
        g: [
          '.................',
          '.k.k.k.k.k.k.k.k.',
          '.k-------------k.',
          '.k..*...*...*..k.',
          '.k.............k.',
          '.k.-----.-----.k.',
          '.k.-...-.-...-.k.',
          '.k.-----.-----.k.',
          '.k.............k.',
          '.k..*...*...*..k.',
          '.k-------------k.',
          '.k.k.k.k.k.k.k.k.',
          '.................'
        ]
      },
      {
        t: 'Y+3 · poutraison, entraits et solives',
        g: [
          '.................',
          '.kkkkkkkkkkkkkkk.',
          '.k.............k.',
          '.k.kkkkkkkkkkk.k.',
          '.k.............k.',
          '.k.kkkkkkkkkkk.k.',
          '.k.............k.',
          '.k.kkkkkkkkkkk.k.',
          '.k.............k.',
          '.k.kkkkkkkkkkk.k.',
          '.k.............k.',
          '.kkkkkkkkkkkkkkk.',
          '.................'
        ]
      },
      {
        t: 'Y+4 · toit, anneau 1 (17 × 13)',
        g: [
          '/////////////////',
          '/.............../',
          '/.............../',
          '/.............../',
          '/.............../',
          '/.............../',
          '/.............../',
          '/.............../',
          '/.............../',
          '/.............../',
          '/.............../',
          '/.............../',
          '/////////////////'
        ]
      },
      {
        t: 'Y+5 · toit, anneau 2 (15 × 11)',
        g: [
          '.................',
          './//////////////.',
          './............./.',
          './............./.',
          './............./.',
          './............./.',
          './............./.',
          './............./.',
          './............./.',
          './............./.',
          './............./.',
          './//////////////.',
          '.................'
        ]
      },
      {
        t: 'Y+6 · toit, anneau 3 (13 × 9)',
        g: [
          '.................',
          '.................',
          '../////////////..',
          '../.........../..',
          '../.........../..',
          '../.........../..',
          '../.........../..',
          '../.........../..',
          '../.........../..',
          '../.........../..',
          '../////////////..',
          '.................',
          '.................'
        ]
      },
      {
        t: 'Y+7 · toit, anneau 4 (11 × 7)',
        g: [
          '.................',
          '.................',
          '.................',
          '...///////////...',
          '.../........./...',
          '.../........./...',
          '.../........./...',
          '.../........./...',
          '.../........./...',
          '...///////////...',
          '.................',
          '.................',
          '.................'
        ]
      },
      { t: 'Y+8 · toit, anneau 5 (9 × 5)', g: [
        '.................',
        '.................',
        '.................',
        '.................',
        '..../////////....',
        '..../......./....',
        '..../......./....',
        '..../......./....',
        '..../////////....',
        '.................',
        '.................',
        '.................',
        '.................'
      ] },
      { t: 'Y+9 · toit, anneau 6 (7 × 3)', g: [
        '.................',
        '.................',
        '.................',
        '.................',
        '.................',
        '.....///////.....',
        '...../...../.....',
        '.....///////.....',
        '.................',
        '.................',
        '.................',
        '.................',
        '.................'
      ] },
      { t: 'Y+10 · faîtage en dalles (5 × 1)', g: [
        '.................',
        '.................',
        '.................',
        '.................',
        '.................',
        '.................',
        '......-----......',
        '.................',
        '.................',
        '.................',
        '.................',
        '.................',
        '.................'
      ] }
    ],
    etapes: [
      'Implantez la halle sur la place, pas contre les maisons : il faut au moins 3 blocs de dégagement sur les quatre côtés pour qu\'on puisse en faire le tour.',
      'Posez le dallage complet, puis tracez l\'allée centrale en chemin de terre battue. C\'est ce contraste de sol qui indique par où on entre, en l\'absence de portes.',
      'Plantez la colonnade : un poteau en rondin écorcé tous les 2 blocs sur le pourtour. Deux blocs, c\'est l\'écartement qui donne un rythme lisible ; à 3, la charpente paraît molle.',
      'Montez les poteaux sur 3 blocs seulement. Une halle est un bâtiment bas et large : trop haute, elle devient un préau d\'école.',
      'Adossez les étals aux longs côtés — une rangée de tonneaux et de coffres avec une dalle en guise de comptoir par-dessus.',
      'Construisez l\'îlot central en deux rectangles creux : le marchand se tient à l\'intérieur (repères « x »), les clients tournent autour. C\'est ce vide au milieu qui fait qu\'un étal ressemble à un étal.',
      'Charpentez à Y+3 : sablières sur les poteaux, puis des entraits transversaux tous les 2 blocs. Cette grille de poutres visible depuis le sol est le principal intérêt du bâtiment.',
      'Montez le toit à quatre pans, anneau par anneau, en débordant de 1 bloc au premier rang : le débord protège les étals et donne l\'ombre portée qui ancre la halle au sol.',
      'Terminez par le faîtage en dalles et deux petites lucarnes pour laisser passer la lumière.',
      'Habillez : bannières de couleurs différentes par étal, cadres d\'objets pour annoncer la marchandise, caisses en tonneaux au sol et lanternes suspendues aux entraits tous les 4 blocs.'
    ],
    notes: [
      { type: 'tip', txt: 'Un étal = un objet — mettez un seul type de marchandise par comptoir (pain, poisson, colorants, outils). Un étal fourre-tout ne se lit pas ; huit étals thématiques racontent un marché.' },
      { type: 'warn', txt: 'Bâtiment ouvert et sombre — sans murs, la halle est un excellent point d\'apparition la nuit. Prévoyez une lanterne tous les 4 blocs sous la charpente, ou des dalles inversées sur le dallage.' },
      { type: 'info', txt: 'Villageois marchands — placez les blocs de métier (tonneau, table de cartographie, métier à tisser) directement dans les étals : les villageois viendront réellement s\'y poster en journée.' }
    ]
  },
  {
    id: 'temple-jungle', nom: 'Temple de jungle — sanctuaire à gradins', cat: 'ville',
    taille: '15 × 15 × 13', diff: 'Avancé',
    desc: 'Une pyramide à degrés en pierre moussue, deux terrasses ceintes de lianes, un escalier axial et une cella fermée qui abrite l\'autel. Se construit dans la canopée, à moitié envahi par la végétation.',
    mats: ['≈1 800 briques de pierre moussues et fissurées', '≈400 blocs de mousse et de pierre couverte de lichen', '≈300 escaliers et 200 dalles (gradins et corniches)', '≈150 lianes', '1 table d\'enchantement (autel) · 6 coffres', '12 lanternes ou feux de camp'],
    couches: [
      {
        t: 'Y+0 · terrasse basse, mur d\'enceinte et bassin',
        g: [
          'mmmmmmmmmmmmmmm',
          'mNNNNNNNNNNNNNm',
          'mN...........Nm',
          'mN.mmmmmmmmm.Nm',
          'mN.m.......m.Nm',
          'mN.m.......m.Nm',
          'mN.m.......m.Nm',
          'mN.m...w...m.Nm',
          'mN.m.......m.Nm',
          'mN.m.......m.Nm',
          'mN.m.......m.Nm',
          'mN.mmmm/mmmm.Nm',
          'mN...........Nm',
          'mNNNNN///NNNNNm',
          'mmmmmm///mmmmmm'
        ]
      },
      {
        t: 'Y+3 · deuxième terrasse et rampe axiale',
        g: [
          '...............',
          '...............',
          '..mmmmmmmmmmm..',
          '..mvvvvvvvvvm..',
          '..mv.......vm..',
          '..mv.mmmmm.vm..',
          '..mv.m...m.vm..',
          '..mv.m.w.m.vm..',
          '..mv.m...m.vm..',
          '..mv.mm/mm.vm..',
          '..mv.......vm..',
          '..mvvv///vvvm..',
          '..mmmm///mmmm..',
          '...............',
          '...............'
        ]
      },
      {
        t: 'Y+6 · cella : autel, offrandes et braseros',
        g: [
          '...............',
          '...............',
          '...............',
          '...mmmmmmmmm...',
          '...m*.....*m...',
          '...m.......m...',
          '...m..EEE..m...',
          '...m..E$E..m...',
          '...m..EEE..m...',
          '...m.......m...',
          '...m*.....*m...',
          '...mmmmDmmmm...',
          '...............',
          '...............',
          '...............'
        ]
      },
      {
        t: 'Y+9 · toiture à gradins',
        g: [
          '...............',
          '...............',
          '...............',
          '...............',
          '....///////....',
          '..../-----/....',
          '..../-mmm-/....',
          '..../-m*m-/....',
          '..../-mmm-/....',
          '..../-----/....',
          '....///////....',
          '...............',
          '...............',
          '...............',
          '...............'
        ]
      },
      {
        t: 'Y+11 · couronnement',
        g: [
          '...............',
          '...............',
          '...............',
          '...............',
          '...............',
          '...../////.....',
          '...../mmm/.....',
          '...../m*m/.....',
          '...../mmm/.....',
          '...../////.....',
          '...............',
          '...............',
          '...............',
          '...............',
          '...............'
        ]
      }
    ],
    etapes: [
      'Cherchez un tertre naturel dans la jungle, ou remblayez-en un : un temple posé à plat sur un sol nivelé perd la moitié de son effet.',
      'Montez le socle 15 × 15 en pierre moussue, puis retirez-lui un anneau de 2 blocs à chaque niveau. Le retrait constant est ce qui fait la pyramide à degrés ; l\'improviser donne toujours une silhouette bancale.',
      'Percez l\'escalier axial d\'entrée sur toute la face sud, large de 3 blocs et pentu — une marche par bloc de hauteur. Un temple maya n\'a pas de rampe douce.',
      'Traitez le parement AVANT de monter plus haut : mélangez briques moussues, fissurées et pierre normale, en concentrant la mousse en bas et dans les angles rentrants, là où l\'eau stagne.',
      'Creusez le bassin d\'eau au centre de chaque terrasse : deux cuvettes de 1 bloc bordées de dalles. Ce sont elles qui donnent l\'idée d\'un lieu de culte et non d\'un simple tas de pierre.',
      'Bâtissez la cella au sommet : une pièce fermée de 9 × 9, plafond bas, une seule porte, aucune fenêtre. Le contraste entre les terrasses ouvertes et cette boîte sombre fait tout le mystère.',
      'Installez l\'autel — table d\'enchantement au centre, entourée de coffres à offrandes et de braseros — et éclairez uniquement par des feux de camp posés au sol.',
      'Couronnez par deux gradins décroissants et un petit édicule : c\'est ce qui dépasse de la canopée et signale le temple depuis le sol.',
      'Faites retomber les lianes depuis toutes les arêtes horizontales, sans régularité. Les lianes plantées en ligne droite trahissent immédiatement la main du joueur.',
      'Laissez la jungle reprendre : plantez des arbres contre les flancs, des buissons dans les angles, et remplacez quelques blocs du parement par de l\'air ou de la mousse — un temple intact n\'existe pas.'
    ],
    notes: [
      { type: 'tip', txt: 'Trois pierres, une règle — 60 % de briques moussues, 30 % de briques fissurées, 10 % de pierre nette. Placez les pourcentages à la main par petites taches, jamais un bloc sur deux : l\'aléatoire régulier se voit.' },
      { type: 'danger', txt: 'Pièges d\'origine — si vous rénovez un vrai temple de jungle, désamorcez d\'abord les fils de détente en les cassant avec des cisailles. Casser le fil à la main déclenche les distributeurs de flèches.' },
      { type: 'info', txt: 'Lumière cachée — la cella doit paraître sombre sans être un nid à zombies. Encastrez des blocs lumineux sous des tapis, ou des lanternes des âmes derrière les colonnes : le niveau de lumière monte, l\'ambiance reste.' }
    ]
  },

  /* ================= TECHNIQUE ================= */
  {
    id: 'camp-mineurs', nom: 'Camp de mineurs à l\'entrée d\'une mine', cat: 'technique',
    taille: '15 × 13 × 5', diff: 'Débutant',
    desc: 'La tête de puits : une terrasse taillée dans la falaise, deux cabanes, une batterie de fours et une voie de wagonnets qui sort directement de la galerie. Transforme un trou dans le sol en base d\'exploitation.',
    mats: ['≈500 blocs de pierre et pierre des profondeurs (terrasse et parement)', '≈200 planches et rondins (cabanes)', '≈120 escaliers (toitures)', '≈60 clôtures (palissade)', '≈80 rails + 8 rails motorisés + 2 wagonnets', '6 fourneaux · 8 coffres · 1 lit · 16 lanternes'],
    couches: [
      {
        t: 'Y−1 · première galerie et gare de wagonnets',
        g: [
          'ccccccccccccccc',
          'ccccccccccccccc',
          'cccccc...cccccc',
          'cccccc.=.cccccc',
          'cccccc.=.cccccc',
          'cccccc.=.cccccc',
          'cccccc.=.cccccc',
          'ccccc..=..ccccc',
          'cccc*..=..*cccc',
          'cccc.E.=.E.cccc',
          'cccc...=...cccc',
          'ccccccccccccccc',
          'ccccccccccccccc'
        ]
      },
      {
        t: 'Y+0 · terrasse, gueule de mine et voie',
        g: [
          'ccccccccccccccc',
          'cddddd...dddddc',
          'cd...........dc',
          'cd...........dc',
          'ccccccc=ccccccc',
          'c......=......c',
          'c......=......c',
          'c......=......c',
          'c......=......c',
          'c......=......c',
          'c......=......c',
          'c......=......c',
          'ccccccccccccccc'
        ]
      },
      {
        t: 'Y+1 · cabanes, batterie de fours et palissade',
        g: [
          'ccccccccccccccc',
          'cddddd...dddddc',
          'cd...........dc',
          'cdEUUUUE.....dc',
          'ccccccc=ccccccc',
          'c###...=...###c',
          'c#E#...=...#Y#c',
          'c#<#...=...#E#c',
          'c#D#...=...#D#c',
          'c......=......c',
          'c..F...=...F..c',
          'c......=......c',
          '|||||||=|||||||'
        ]
      },
      {
        t: 'Y+2 · toitures, éclairage et portique',
        g: [
          'ccccccccccccccc',
          'cddddd*.*dddddc',
          'cd...........dc',
          'cd...........dc',
          'ccccccc=ccccccc',
          'c///...=...///c',
          'c/-/...=.../-/c',
          'c/-/...=.../-/c',
          'c///...=...///c',
          'c......=......c',
          'c.*....=....*.c',
          'c......=......c',
          '|*|||||=|||||*|'
        ]
      }
    ],
    etapes: [
      'Choisissez un flanc de colline plutôt qu\'un terrain plat : une entrée de mine taillée dans une paroi est immédiatement lisible, un trou au milieu d\'un pré ne l\'est jamais.',
      'Taillez la terrasse à la verticale sur 4 à 5 blocs de haut. Laissez le front de taille brut, avec quelques blocs qui dépassent : une paroi parfaitement lisse ressemble à une erreur de terraformation.',
      'Ouvrez la galerie sur 3 blocs de large et 3 de haut. Un tunnel de 2 blocs suffit techniquement, mais un wagonnet, un joueur et un cheval n\'y passent pas de front.',
      'Posez la voie AVANT les bâtiments : elle sort de la galerie, traverse la cour et se termine par une boucle. Toute la composition du camp découle de cet axe.',
      'Boisez l\'entrée : deux poteaux et un linteau en rondins, doublés à 4 blocs d\'intervalle dans la galerie. C\'est le détail qui distingue une mine d\'un simple trou.',
      'Montez les deux cabanes de 3 × 3 de part et d\'autre de la voie : l\'une avec un lit et un coffre (le dortoir), l\'autre avec l\'établi et l\'outillage.',
      'Alignez la batterie de fours contre la paroi, sous un auvent de dalles : c\'est là qu\'on fond le minerai avant de le remonter, ce qui divise par deux ce qu\'on transporte.',
      'Éclairez la cour à 16 lanternes minimum, et posez une torche tous les 8 blocs dans la galerie, toujours du même côté : au retour, elles indiquent la sortie sans hésitation.',
      'Fermez la cour par une palissade de clôtures avec un portillon sur la voie : elle empêche le bétail et les mobs d\'errer sur le chantier.',
      'Installez la gare souterraine à Y−1 : deux coffres tampons de part et d\'autre du rail, éclairés, où l\'on vide son inventaire sans remonter.'
    ],
    notes: [
      { type: 'tip', txt: 'Rails motorisés — un rail motorisé tous les 8 rails ordinaires suffit à maintenir un wagonnet à pleine vitesse sur le plat, et tous les 3 dans une pente montante.' },
      { type: 'warn', txt: 'Grottes ouvertes — une galerie qui débouche sur une caverne naturelle non éclairée transforme votre camp en couloir à monstres. Murez ou éclairez toute intersection avant de dormir sur place.' },
      { type: 'info', txt: 'Point de réapparition — un lit dans la cabane évite de refaire tout le trajet depuis la base à chaque mort. C\'est le vrai intérêt du camp, bien avant le décor.' }
    ]
  }

];
