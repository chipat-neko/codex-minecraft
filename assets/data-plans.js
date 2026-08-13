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
        g: ['#########', '#########', '#########', '#########', '#########', '#########', '#########']
      },
      {
        t: 'Y+1 · murs + porte',
        g: ['o#######o', '#.......#', '#.......#', '#.......#', '#.......#', '#.......#', 'o###D###o']
      },
      {
        t: 'Y+2 · fenêtres',
        g: ['o#GG#GG#o', 'G.......G', '#.......#', 'G.......G', '#.......#', 'G.......G', 'o#GGDGG#o']
      },
      {
        t: 'Y+3 · haut de mur',
        g: ['ooooooooo', 'o.......o', 'o.......o', 'o.......o', 'o.......o', 'o.......o', 'ooooooooo']
      },
      {
        t: 'Y+4 · toit, anneau 1 (11×9)',
        g: ['///////////', '/........./', '/........./', '/........./', '/........./', '/........./', '/........./', '/........./', '///////////']
      },
      {
        t: 'Y+5 · toit, anneau 2 (9×7)',
        g: ['/////////', '/......./', '/......./', '/......./', '/......./', '/......./', '/////////']
      },
      {
        t: 'Y+6 · toit, anneau 3 (7×5)',
        g: ['///////', '/...../', '/...../', '/...../', '///////']
      },
      {
        t: 'Y+7 · faîtage (5×3)',
        g: ['-----', '-----', '-----']
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
      { t: 'Y+17 · lanternon vitré', g: ['.GGGGG.', 'G.....G', 'G..*..G', 'G.....G', 'G.....G', 'G.....G', '.GGGGG.'] },
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
      { t: 'Y+0 · salle du trône', g: ['bbbbbbbbb', 'b...;...b', 'b.......b', 'b.......b', 'b.......b', 'b..///..b', 'b.......b', 'b.......b', 'bbbb>bbbb'] },
      { t: 'Y+5 · étage / réserve', g: ['bbbbbbbbb', 'bEEE.EEEb', 'b.......b', 'b.......b', 'G../....G', 'b.......b', 'b.......b', 'b(.....?b', 'bbbGGGbbb'] },
      { t: 'Y+10 · terrasse', g: ['bbbbbbbbb', 'b.......b', 'b.......b', 'b.......b', 'b.../...b', 'b.......b', 'b.......b', 'b.......b', 'bbbbbbbbb'] },
      { t: 'Y+11 · créneaux', g: ['M.M.M.M.M', '.........', 'M.......M', '.........', 'M.......M', '.........', 'M.......M', '.........', 'M.M.M.M.M'] }
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
        t: 'Y+0 · terre labourée + source d\'eau',
        g: ['fffffffff', 'fffffffff', 'fffffffff', 'fffffffff', 'ffffwffff', 'fffffffff', 'fffffffff', 'fffffffff', 'fffffffff']
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
      { t: 'Y+0 · dallage', g: ['ccccccccccccc', 'ccccccccccccc', 'ccccccccccccc', 'ccccccccccccc', 'ccccccccccccc', 'ccccccccccccc', 'ccccccccccccc', 'ccccccccccccc', 'ccccccccccccc'] },
      { t: 'Y+1 · murs + porte charretière', g: ['o##o###o##o##', '#...........#', 'o...........o', '#...........#', 'o...........o', '#...........#', 'o...........o', '#...........#', 'o##o##DD##o##'] },
      { t: 'Y+3 · poutraison', g: ['ooooooooooooo', 'o...........o', 'o.ooooooooo.o', 'o...........o', 'o.ooooooooo.o', 'o...........o', 'o.ooooooooo.o', 'o...........o', 'ooooooooooooo'] },
      { t: 'Y+5 · grenier (plancher partiel)', g: ['#############', '#hhhhhhhhhhh#', '#hhhhhhhhhhh#', '#...........#', '#...........#', '#...........#', '#hhhhhhhhhhh#', '#hhhhhhhhhhh#', '#############'] },
      { t: 'Y+6 · toit anneau 1 (15×11)', g: ['///////////////', '/............./', '/............./', '/............./', '/............./', '/............./', '/............./', '/............./', '/............./', '/............./', '///////////////'] },
      { t: 'Y+7 · toit anneau 2 (13×9)', g: ['/////////////', '/.........../', '/.........../', '/.........../', '/.........../', '/.........../', '/.........../', '/.........../', '/////////////'] },
      { t: 'Y+8 · toit anneau 3 (11×7)', g: ['///////////', '/........./', '/........./', '/........./', '/........./', '/........./', '///////////'] }
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
    taille: '7 × 7 × 6', diff: 'Intermédiaire',
    desc: 'Un portail non protégé est une porte ouverte : zombies-piglins, ghasts et hoglins traversent. Ce sas règle le problème des deux côtés.',
    mats: ['10 blocs d\'obsidienne (14 pour un cadre complet)', '≈60 briques de pierre ou blocs anti-explosion', '1 briquet ou 1 seau d\'eau + lave', '2 portes en fer + 2 plaques de pression', '4 lanternes'],
    couches: [
      { t: 'Y+0 · sol du sas', g: ['bbbbbbb', 'bbbbbbb', 'bbbbbbb', 'bbbbbbb', 'bbbbbbb', 'bbbbbbb', 'bbbbbbb'] },
      { t: 'Y+1 · cadre + sas', g: ['bbbbbbb', 'bOOOOOb', 'b.....b', 'b.....b', 'b.....b', 'b..>..b', 'bbbbbbb'] },
      { t: 'Y+2 · portail actif', g: ['bbbbbbb', 'bO^^^Ob', 'b.....b', 'b..*..b', 'b.....b', 'b..>..b', 'bbbbbbb'] },
      { t: 'Y+4 · plafond', g: ['bbbbbbb', 'bbbbbbb', 'bbbbbbb', 'bbbbbbb', 'bbbbbbb', 'bbbbbbb', 'bbbbbbb'] }
    ],
    etapes: [
      'Construisez le cadre du portail : 4 × 5 blocs d\'obsidienne (les 4 coins sont facultatifs, donc 10 blocs suffisent).',
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
      { t: 'Vue de dessus · Y+2 (ligne d\'apport)', g: ['HHHHHH', '......', '......'] },
      { t: 'Vue de dessus · Y+1 (filtres)', g: ['HHHHHH', 'HHHHHH', '......'] },
      { t: 'Vue de dessus · Y+0 (coffres)', g: ['EEEEEE', '......', '......'] },
      { t: 'Vue de côté · un module', g: ['..H...', '.BHB..', '.VRV..', '.E.E..'] }
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
        t: 'Vue de côté · l\'arche',
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
        t: 'Vue de dessus · tablier',
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
        t: 'Vue de côté · un ponton',
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
        t: 'Vue de face · tête (8 × 8)',
        g: ['NNNNNNNN', 'NnnNNnnN', 'NnnNNnnN', 'NNNnnNNN', 'NNnnnnNN', 'NNnNNnNN', 'NNNNNNNN', 'NNNNNNNN']
      },
      {
        t: 'Vue de face · corps (8 × 8)',
        g: ['NNNNNNNN', 'NNNNNNNN', 'NNNNNNNN', 'NNNNNNNN', 'NNNNNNNN', 'NNNNNNNN', 'NNNNNNNN', 'NNNNNNNN']
      },
      {
        t: 'Vue de face · pattes (8 × 4)',
        g: ['NN....NN', 'NN....NN', 'NN....NN', 'NN....NN']
      },
      {
        t: 'Vue de dessus · emprise des pattes',
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
        t: 'Vue de côté · accès en escalier',
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
        g: ['....ccccc....', '..ccccccccc..', '.ccccccccccc.', '.ccccccccccc.', 'ccccccccccccc', 'ccccccccccccc', 'ccccccccccccc', 'ccccccccccccc', 'ccccccccccccc', '.ccccccccccc.', '.ccccccccccc.', '..ccccccccc..', '....ccccc....']
      },
      {
        t: 'Y+1 → Y+4 · paroi vitrée (à répéter)',
        g: ['....ggggg....', '..gg.....gg..', '.g.........g.', '.g.........g.', 'g...........g', 'g...........g', 'g...........g', 'g...........g', 'g...........g', '.g.........g.', '.g.........g.', '..gg.....gg..', '....ggggg....']
      },
      {
        t: 'Y+5 · dôme (Ø 9)',
        g: ['...ggg...', '.gg...gg.', '.g.....g.', 'g.......g', 'g.......g', 'g.......g', '.g.....g.', '.gg...gg.', '...ggg...']
      },
      {
        t: 'Y+6 · dôme (Ø 5)',
        g: ['.ggg.', 'g...g', 'g...g', 'g...g', '.ggg.']
      },
      {
        t: 'Y+7 · sommet',
        g: ['ggg', 'ggg', 'ggg']
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
  }
];
