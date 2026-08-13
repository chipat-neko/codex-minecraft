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
  }
];
