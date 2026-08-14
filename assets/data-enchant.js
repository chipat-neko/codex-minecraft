/* ============================================================
   Données : enchantements (Java Edition)
   Niveaux maximaux atteignables à la table ou par livre.
   ============================================================ */

var ENCHANTS = [

  /* ---------------- UNIVERSELS ---------------- */
  {
    nom: 'Solidité III (Unbreaking)', cat: 'universel',
    tags: [{ txt: 'Niveau max III', cls: 'ok' }, { txt: 'Table', cls: '' }],
    ou: 'Tout objet ayant une durabilité : outils, armes, armures, arc, canne à pêche, briquet, cisaille, élytre.',
    drops: [
      'Sur un OUTIL ou une arme : environ 75 % de l\'usure évitée au niveau III — l\'objet dure à peu près quatre fois plus longtemps',
      'Sur une ARMURE : seulement 30 % d\'usure évitée au niveau III. L\'effet y est deux fois moins fort, contrairement à une idée répandue'
    ],
    note: 'À mettre sur absolument tout, sans exception. C\'est l\'enchantement le moins cher et le plus rentable du jeu.'
  },
  {
    nom: 'Raccommodage (Mending)', cat: 'universel',
    tags: [{ txt: 'Niveau max I', cls: 'purple' }, { txt: 'Livre uniquement', cls: 'gold' }],
    ou: 'Tout objet ayant une durabilité.',
    drops: [
      'Chaque point d\'XP ramassé répare l\'objet tenu ou porté au lieu de monter votre barre d\'expérience',
      '2 points de durabilité réparés par point d\'XP',
      'Incompatible avec Infinité sur l\'arc'
    ],
    note: 'IMPOSSIBLE à obtenir à la table d\'enchantement. Uniquement par livre : bibliothécaire, pêche, coffres de structures. Un équipement avec Raccommodage + une ferme à XP ne se casse jamais.'
  },
  {
    nom: 'Malédiction de disparition', cat: 'universel',
    tags: [{ txt: 'Malédiction', cls: 'red' }],
    ou: 'Tout objet.',
    drops: ['L\'objet disparaît définitivement à votre mort au lieu de tomber au sol'],
    note: 'Ne se retire ni à la meule ni autrement. Vérifiez toujours les objets trouvés en coffre avant de les équiper.'
  },
  {
    nom: 'Malédiction du lien éternel', cat: 'universel',
    tags: [{ txt: 'Malédiction', cls: 'red' }],
    ou: 'Armures, élytre, tête.',
    drops: ['Impossible de retirer la pièce une fois équipée, sauf en mourant ou en la cassant'],
    note: 'Piège classique des coffres de manoir et de cité de l\'End. Un casque maudit vous prive de la Vision nocturne d\'une citrouille… ou l\'inverse.'
  },

  /* ---------------- ÉPÉE & COMBAT ---------------- */
  {
    nom: 'Tranchant V (Sharpness)', cat: 'arme',
    tags: [{ txt: 'Niveau max V', cls: 'red' }],
    ou: 'Épée et hache.',
    drops: [
      '+1 dégât au niveau I, puis +0,5 par niveau supplémentaire (soit +3 au niveau V)',
      'Incompatible avec Châtiment et Fléau des arthropodes'
    ],
    note: 'Le choix par défaut : il fonctionne sur tout. Les enchantements spécialisés frappent plus fort mais seulement sur une famille de mobs.'
  },
  {
    nom: 'Châtiment V (Smite)', cat: 'arme',
    tags: [{ txt: 'Niveau max V', cls: 'red' }],
    ou: 'Épée et hache.',
    drops: [
      '+2,5 dégâts par niveau contre les morts-vivants : zombies, squelettes, noyés, momifiés, vagabonds, phantoms, wither, piglins zombifiés',
      'Aucun effet sur les autres mobs'
    ],
    note: 'Une épée dédiée « anti-mort-vivant » avec Châtiment V est le meilleur outil pour vider une ferme à zombies ou affronter le Wither.'
  },
  {
    nom: 'Fléau des arthropodes V', cat: 'arme',
    tags: [{ txt: 'Niveau max V', cls: 'red' }],
    ou: 'Épée et hache.',
    drops: [
      '+2,5 dégâts par niveau contre araignées, araignées venimeuses, poissons d\'argent, endermites, abeilles',
      'Applique aussi une Lenteur IV de 1 à 1,5 s'
    ],
    note: 'Très situationnel. Utile surtout pour nettoyer une mine abandonnée pleine de générateurs d\'araignées venimeuses.'
  },
  {
    nom: 'Butin III (Looting)', cat: 'arme',
    tags: [{ txt: 'Niveau max III', cls: 'gold' }, { txt: 'Essentiel', cls: 'ok' }],
    ou: 'Épée uniquement.',
    drops: [
      '+1 objet maximum par niveau sur les drops courants',
      '+1 point de pourcentage par niveau sur les drops rares : crâne de Wither squelette (2,5 % → 5,5 %), trident, coquille de nautile',
      'Il augmente AUSSI la chance qu\'un mob lâche son équipement porté : +1 % par niveau, à condition que le coup fatal vienne d\'un joueur',
      'Il n\'affecte pas l\'XP'
    ],
    note: 'Indispensable sur toute ferme à mise à mort manuelle. Sans Butin III, une ferme à withers squelettes produit deux fois moins de crânes.'
  },
  {
    nom: 'Aura de feu II (Fire Aspect)', cat: 'arme',
    tags: [{ txt: 'Niveau max II', cls: 'red' }],
    ou: 'Épée.',
    drops: ['Enflamme la cible : 4 s par niveau', 'Cuit automatiquement la viande des animaux tués'],
    note: 'À éviter sur une ferme : le feu peut détruire les objets au sol avant que vous les ramassiez, et il enflamme les creepers.'
  },
  {
    nom: 'Recul II (Knockback)', cat: 'arme',
    tags: [{ txt: 'Niveau max II', cls: '' }],
    ou: 'Épée.',
    drops: ['Projette la cible de 3 blocs par niveau supplémentaire'],
    note: 'Excellent pour survivre en début de partie (repousser un creeper avant l\'explosion), gênant sur une ferme où les mobs doivent rester groupés.'
  },
  {
    nom: 'Affilage III (Sweeping Edge)', cat: 'arme',
    tags: [{ txt: 'Java uniquement', cls: 'cyan' }],
    ou: 'Épée.',
    drops: ['Le coup balayant inflige 50 / 67 / 75 % des dégâts de l\'attaque aux mobs adjacents'],
    note: 'Le coup balayant ne se déclenche qu\'avec une attaque complètement chargée, sans sprinter. Redoutable dans une salle de mise à mort bondée.'
  },

  /* ---------------- OUTILS ---------------- */
  {
    nom: 'Efficacité V', cat: 'outil',
    tags: [{ txt: 'Niveau max V', cls: 'gold' }, { txt: 'Essentiel', cls: 'ok' }],
    ou: 'Pioche, hache, pelle, cisaille.',
    drops: [
      'Accélère fortement le minage : vitesse + (niveau² + 1)',
      'Avec une pioche en diamant Efficacité V + Célérité II d\'une balise : minage instantané de la pierre'
    ],
    note: 'C\'est l\'enchantement qui transforme les grands chantiers. Une tour à mobs se creuse en une soirée au lieu d\'une semaine.'
  },
  {
    nom: 'Fortune III', cat: 'outil',
    tags: [{ txt: 'Niveau max III', cls: 'gold' }],
    ou: 'Pioche, hache (récolte), pelle, houe.',
    drops: [
      'Multiplie les drops : diamant, émeraude, charbon, lapis, redstone, améthyste, quartz, pierre lumineuse, pastèque, carottes, pommes de terre',
      'Diamant : 1 → jusqu\'à 4 par filon',
      'Aucun effet sur les blocs qui se récupèrent tels quels (pierre, minerai de fer/or bruts — sauf en version brute)',
      'Incompatible avec Toucher de soie'
    ],
    note: 'Gardez DEUX pioches : une Fortune III pour les minerais, une Toucher de soie pour les blocs à déplacer. Elles ne peuvent pas coexister.'
  },
  {
    nom: 'Toucher de soie', cat: 'outil',
    tags: [{ txt: 'Niveau max I', cls: 'cyan' }],
    ou: 'Les outils de minage : pioche, hache, pelle, houe. PAS la cisaille.',
    drops: [
      'Récupère le bloc tel quel : minerai intact, verre, vitres, glace, bloc d\'améthyste, catalyseur de sculk, ruche pleine',
      'Le SEUL moyen d\'obtenir : catalyseur de sculk, capteur sculk, hurleur sculk, glace compactée, bloc de mousse, nid d\'abeilles avec ses abeilles',
      'Incompatible avec Fortune'
    ],
    note: 'Casser un générateur de créatures au Toucher de soie ne le récupère PAS : aucun enchantement ne permet de le déplacer.'
  },

  /* ---------------- ARC & PROJECTILES ---------------- */
  {
    nom: 'Puissance V (Power)', cat: 'projectile',
    tags: [{ txt: 'Niveau max V', cls: 'red' }],
    ou: 'Arc.',
    drops: [
      '+1 dégât au niveau I, puis +0,5 par niveau supplémentaire — soit +3 au niveau V. C\'est un bonus PLAT, pas un pourcentage',
      'Même formule que Tranchant sur l\'épée. Un tir chargé au niveau V tue la plupart des mobs d\'une flèche'
    ],
    note: 'Avec Infinité, l\'arc devient l\'arme la plus rentable du jeu : dégâts maximaux et une seule flèche dans l\'inventaire.'
  },
  {
    nom: 'Infinité', cat: 'projectile',
    tags: [{ txt: 'Niveau max I', cls: 'gold' }],
    ou: 'Arc.',
    drops: [
      'Les flèches ordinaires ne sont plus consommées — il en faut une seule dans l\'inventaire',
      'Ne fonctionne pas sur les flèches à effet ni les flèches spectrales',
      'Incompatible avec Raccommodage'
    ],
    note: 'Le choix cornélien de l\'arc : Infinité (flèches gratuites) ou Raccommodage (arc éternel). Avec une ferme à squelettes, Raccommodage gagne.'
  },
  {
    nom: 'Flamme', cat: 'projectile',
    tags: [{ txt: 'Niveau max I', cls: 'red' }],
    ou: 'Arc.',
    drops: ['Les flèches enflamment la cible pendant 5 s', 'Permet aussi d\'allumer un feu de camp ou du TNT à distance'],
    note: 'Pratique pour allumer un portail du Nether à distance… mais impossible sans briquet : la flèche enflammée n\'allume pas l\'obsidienne.'
  },
  {
    nom: 'Frappe II (Punch)', cat: 'projectile',
    tags: [{ txt: 'Niveau max II', cls: '' }],
    ou: 'Arc.',
    drops: ['Augmente le recul infligé par la flèche'],
    note: 'Utile pour faire tomber les mobs d\'une plateforme ou repousser un ravageur pendant un raid.'
  },
  {
    nom: 'Tir multiple / Perforation IV / Charge rapide III', cat: 'projectile',
    tags: [{ txt: 'Arbalète', cls: 'cyan' }],
    ou: 'Arbalète.',
    drops: [
      'Tir multiple : tire 3 flèches pour le prix d\'une (incompatible avec Perforation)',
      'Perforation IV : la flèche traverse jusqu\'à 5 entités alignées',
      'Charge rapide III : rechargement nettement plus rapide'
    ],
    note: 'Arbalète Tir multiple + fusée de feu d\'artifice = l\'arme la plus dévastatrice du jeu contre un groupe. Attention aux dégâts sur vous-même.'
  },
  {
    nom: 'Loyauté III / Impulsion III / Empalement V / Canalisation', cat: 'projectile',
    tags: [{ txt: 'Trident', cls: 'blue' }],
    ou: 'Trident (drop des noyés).',
    drops: [
      'Loyauté III : le trident revient dans votre main après le lancer',
      'Impulsion (Riptide) III : vous propulse avec le trident sous la pluie ou dans l\'eau — incompatible avec Loyauté et Canalisation',
      'Empalement V : +2,5 dégâts par niveau contre les créatures aquatiques',
      'Canalisation (Channeling) : appelle la foudre sur la cible par temps d\'orage'
    ],
    note: 'Trident + Canalisation + orage = le moyen le plus simple de créer un creeper chargé, donc d\'obtenir les têtes de mobs.'
  },
  {
    nom: 'Densité V / Brèche IV / Rafale de vent III', cat: 'projectile',
    tags: [{ txt: 'Masse (1.21)', cls: 'purple' }],
    ou: 'Masse (mace).',
    drops: [
      'Densité V : augmente fortement les dégâts liés à la hauteur de chute',
      'Brèche IV : ignore une partie de l\'armure de la cible',
      'Rafale de vent III : vous relance en l\'air après un coup, pour enchaîner'
    ],
    note: 'La masse inflige des dégâts proportionnels à votre hauteur de chute. Avec Densité V et une chute de 20 blocs, elle dépasse toutes les autres armes du jeu.'
  },

  /* ---------------- ARMURE ---------------- */
  {
    nom: 'Protection IV', cat: 'armure',
    tags: [{ txt: 'Niveau max IV', cls: 'ok' }, { txt: 'Essentiel', cls: 'ok' }],
    ou: 'Toutes les pièces d\'armure.',
    drops: [
      'Réduit tous les types de dégâts (sauf la faim et le vide)',
      'Incompatible avec les protections spécialisées (feu, explosion, projectile) sur une même pièce'
    ],
    note: 'Protection IV sur les 4 pièces couvre 95 % des situations. Les protections spécialisées ne valent le coup que sur une armure dédiée (Nether, raid).'
  },
  {
    nom: 'Protections spécialisées IV', cat: 'armure',
    tags: [{ txt: 'Niveau max IV', cls: '' }],
    ou: 'Toutes les pièces d\'armure.',
    drops: [
      'Protection contre le feu : lave, feu, boules de feu de blaze et de ghast',
      'Protection contre les explosions : creepers, TNT, lits dans le Nether',
      'Protection contre les projectiles : flèches, tirs de pillards, boules de feu'
    ],
    note: 'Une armure « Nether » avec Protection contre le feu IV rend la lave presque inoffensive quand on la combine à une potion de Résistance au feu.'
  },
  {
    nom: 'Chute amortie IV (Feather Falling)', cat: 'armure',
    tags: [{ txt: 'Bottes', cls: 'cyan' }, { txt: 'Essentiel', cls: 'ok' }],
    ou: 'Bottes.',
    drops: ['Réduit les dégâts de chute de 12 % par niveau, cumulé avec Protection'],
    note: 'Avec Chute amortie IV, on survit à presque toutes les chutes. C\'est ce qui rend le vol à l\'élytre et l\'exploration de grottes réellement confortables.'
  },
  {
    nom: 'Épines III (Thorns)', cat: 'armure',
    tags: [{ txt: 'Niveau max III', cls: 'red' }],
    ou: 'Toutes les pièces d\'armure.',
    drops: ['15 % de chance par niveau de renvoyer 1 à 4 dégâts à l\'attaquant', 'Consomme de la durabilité supplémentaire'],
    note: 'Déconseillé : l\'usure supplémentaire ne vaut pas les dégâts renvoyés, sauf sur une armure avec Raccommodage et une ferme à XP.'
  },
  {
    nom: 'Apnée III', cat: 'armure',
    tags: [{ txt: 'Casque', cls: 'blue' }],
    ou: 'Casque.',
    drops: ['+15 s d\'apnée par niveau, et réduit les dégâts de noyade'],
    note: 'Combiné à Affinité aquatique, c\'est le duo obligatoire pour vider un monument océanique — jusqu\'à ce que vous ayez un conduit.'
  },
  {
    nom: 'Affinité aquatique', cat: 'armure',
    tags: [{ txt: 'Casque', cls: 'blue' }],
    ou: 'Casque.',
    drops: ['Supprime la pénalité de vitesse de minage sous l\'eau (× 5 plus rapide)'],
    note: 'Sans cet enchantement, casser un bloc de prismarine sous l\'eau prend un temps absurde. C\'est la première chose à obtenir avant un chantier marin.'
  },
  {
    nom: 'Agilité aquatique III (Depth Strider)', cat: 'armure',
    tags: [{ txt: 'Bottes', cls: 'blue' }],
    ou: 'Bottes.',
    drops: ['Réduit le ralentissement dans l\'eau ; au niveau III, on se déplace à vitesse normale', 'Incompatible avec Semelles givrantes'],
    note: 'Indispensable pour explorer un océan ou un monument à pied plutôt qu\'en bateau.'
  },
  {
    nom: 'Semelles givrantes II (Frost Walker)', cat: 'armure',
    tags: [{ txt: 'Bottes', cls: 'cyan' }, { txt: 'Livre / troc', cls: 'gold' }],
    ou: 'Bottes.',
    drops: ['Gèle l\'eau sous vos pieds : vous marchez sur les océans', 'Incompatible avec Agilité aquatique'],
    note: 'Ne s\'obtient pas à la table d\'enchantement : livre uniquement (troc piglin, pêche, coffres). Traverser un océan à pied devient trivial.'
  },
  {
    nom: 'Agilité des âmes III (Soul Speed)', cat: 'armure',
    tags: [{ txt: 'Bottes', cls: 'gold' }, { txt: 'Troc piglin', cls: 'red' }],
    ou: 'Bottes.',
    drops: ['Accélère fortement la marche sur le sable des âmes et la terre des âmes', 'Consomme de la durabilité en marchant'],
    note: 'Uniquement par troc avec les piglins. Transforme les vallées de sable des âmes, sinon quasi impraticables.'
  },
  {
    nom: 'Furtivité rapide III (Swift Sneak)', cat: 'armure',
    tags: [{ txt: 'Jambières', cls: 'purple' }, { txt: 'Cité antique', cls: 'red' }],
    ou: 'Jambières.',
    drops: ['Marcher accroupi devient presque aussi rapide que marcher normalement'],
    note: 'Se trouve uniquement dans les coffres des cités antiques — l\'endroit précis où l\'on a besoin de rester accroupi en permanence pour ne pas réveiller le Warden.'
  },

  /* ---------------- DIVERS ---------------- */
  {
    nom: 'Élan III (Lunge)', cat: 'arme',
    tags: [{ txt: 'Niveau max III', cls: 'cyan' }, { txt: 'Nouveauté', cls: 'ok' }],
    ou: 'Lance (spear) — l\'arme d\'hast introduite avec cette version.',
    drops: [
      'Enchantement propre aux lances, obtenable à la table d\'enchantement',
      'Les lances acceptent aussi Tranchant, Châtiment, Fléau des arthropodes, Butin, Recul et Aura de feu'
    ],
    note: 'La lance frappe plus loin que l\'épée mais plus lentement : elle demande de jouer sur la portée plutôt que sur la cadence.'
  },
  {
    nom: 'Chance de la mer III / Appât III', cat: 'divers',
    tags: [{ txt: 'Canne à pêche', cls: 'blue' }],
    ou: 'Canne à pêche.',
    drops: [
      'Chance de la mer III : augmente nettement la part de « trésors » (arc et canne enchantés, selle, étiquette, livre enchanté, coquille de nautile)',
      'Appât III : réduit fortement le temps d\'attente entre deux prises'
    ],
    note: 'Une canne Chance de la mer III + Appât III + Raccommodage est une source passive de livres enchantés et de coquilles de nautile (pour le conduit).'
  }
];

/* Coût et fonctionnement des trois postes */
var POSTES_ENCHANT = [
  ['Table d\'enchantement', '2 diamants, 4 obsidiennes, 1 livre',
   'Enchantements aléatoires. Niveau 30 maximum avec 15 bibliothèques. Consomme 1 à 3 lapis et des niveaux d\'XP.'],
  ['Enclume', '3 blocs de fer + 4 lingots (31 lingots)',
   'Applique un livre, combine deux objets, renomme. Chaque usage augmente la « pénalité de travail » : au-delà de 39 niveaux, l\'objet devient « trop coûteux ».'],
  ['Meule (grindstone)', '2 bâtons, 1 dalle de pierre, 2 planches',
   'Retire TOUS les enchantements sauf les malédictions, et vous rend une partie de l\'XP. Répare aussi deux objets identiques sans coût.']
];

/* Astuces d'optimisation à l'enclume */
var ASTUCES_ENCHANT = [
  ['Combinez les livres AVANT l\'objet', 'Fusionnez d\'abord les livres deux à deux, puis appliquez le résultat',
   'Le coût total est bien plus faible que d\'appliquer les livres un par un sur l\'objet'],
  ['Renommez en premier', 'Le renommage coûte 1 niveau seulement sur un objet neuf',
   'Renommer un objet déjà très enchanté peut coûter des dizaines de niveaux'],
  ['Surveillez la pénalité de travail', 'Elle double à chaque passage à l\'enclume : 0, 1, 3, 7, 15, 31…',
   'Passé 6 usages, presque tout devient « trop coûteux ». Planifiez l\'ordre des opérations avant de commencer'],
  ['Enchantez au niveau 30, pas en dessous', 'Les niveaux 1 à 29 donnent des résultats nettement plus faibles',
   'Montez toujours à 30 : c\'est le seul palier qui donne accès aux niveaux maximaux'],
  ['Utilisez la meule pour recycler', 'Un objet enchanté inutile passé à la meule rend de l\'XP',
   'Toute la ferraille enchantée d\'une ferme à mobs devient de l\'expérience au lieu d\'encombrer les coffres'],
  ['Le bibliothécaire bat la table', 'Cassez et reposez son lutrin jusqu\'à voir l\'offre voulue',
   'Efficacité V, Fortune III, Raccommodage : achetables contre des émeraudes, sans hasard ni XP']
];
