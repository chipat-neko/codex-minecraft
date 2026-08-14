/* ============================================================
   Données : redstone — composants et circuits
   Les circuits utilisent le même moteur de schéma que les plans.
   ============================================================ */

var GROUPES_REDSTONE = {
  source:  'Sources & interrupteurs',
  transp:  'Transport du signal',
  logique: 'Portes logiques',
  horloge: 'Horloges & impulsions',
  memoire: 'Mémoire & compteurs',
  usage:   'Montages utiles'
};

/* --- Fiches de composants (rendues comme des « entrées ») --- */
var COMPOSANTS = [
  {
    nom: 'Poudre de redstone', cat: 'base',
    tags: [{ txt: 'Signal 0–15', cls: 'red' }],
    ou: 'Posée au sol, elle transporte le signal et perd 1 point de force par bloc parcouru.',
    drops: [
      'Portée maximale : 15 blocs, puis le signal meurt',
      'Elle monte les escaliers d\'un bloc, mais ne descend pas le long d\'un mur vertical',
      'Elle alimente le bloc plein sur lequel elle finit sa course (« alimentation faible »)'
    ],
    note: 'La règle qui explique 90 % des pannes : au 16ᵉ bloc, il n\'y a plus de signal. Placez un répéteur tous les 15 blocs.'
  },
  {
    nom: 'Torche de redstone', cat: 'source',
    tags: [{ txt: 'Source permanente', cls: 'red' }, { txt: 'Inverseur', cls: 'gold' }],
    ou: 'Sur un bloc ou au sol. Elle émet un signal de force 15 en permanence.',
    drops: [
      'Alimentée par le bloc auquel elle est fixée, elle S\'ÉTEINT : c\'est un inverseur (porte NON)',
      'Elle alimente fortement le bloc situé au-dessus d\'elle',
      'Surcharge : une torche qui clignote trop vite « grille » et s\'éteint jusqu\'à ce qu\'on la touche'
    ],
    note: 'C\'est le composant fondamental. Toutes les portes logiques du jeu se construisent à partir de torches et de blocs pleins.'
  },
  {
    nom: 'Répéteur', cat: 'transp',
    tags: [{ txt: 'Sens unique', cls: 'red' }, { txt: 'Délai 1–4', cls: '' }],
    ou: 'Entre deux segments de poudre.',
    drops: [
      'Régénère le signal à 15 : c\'est ce qui permet de dépasser les 15 blocs',
      'Impose un sens unique — rien ne remonte à contresens',
      'Clic droit : ajoute 1 à 4 ticks de délai (1 tick = 0,1 s)',
      'Verrouillage : un signal venant du CÔTÉ fige le répéteur dans son état — c\'est une mémoire d\'un bit'
    ],
    note: 'Le verrouillage latéral est la façon la plus compacte de mémoriser un état dans un circuit.'
  },
  {
    nom: 'Comparateur', cat: 'transp',
    tags: [{ txt: 'Mesure', cls: 'red' }, { txt: 'Deux modes', cls: '' }],
    ou: 'Derrière un conteneur, ou entre deux lignes de signal.',
    drops: [
      'Mode comparaison (torche éteinte) : laisse passer l\'entrée arrière si elle est ≥ aux entrées latérales',
      'Mode soustraction (torche allumée, après un clic droit) : sortie = arrière − le plus fort des côtés',
      'Derrière un coffre, un four, un entonnoir ou un tonneau : signal proportionnel au remplissage (0 à 15)',
      'Lit aussi : gâteau, chaudron, ruche, jukebox, cadre d\'objet, capteur de sculk'
    ],
    note: 'Le comparateur est ce qui rend possible le tri automatique, les horloges à entonnoir et la détection de conteneur plein.'
  },
  {
    nom: 'Observateur', cat: 'source',
    tags: [{ txt: 'Détecteur', cls: 'red' }, { txt: '1 tick', cls: '' }],
    ou: 'Face au bloc à surveiller (le « visage » regarde la cible).',
    drops: [
      'Émet une impulsion très courte quand le bloc qu\'il regarde CHANGE d\'état',
      'Détecte : croissance des cultures, piston qui bouge, eau qui coule, porte qui s\'ouvre, feuillage qui se décompose',
      'Deux observateurs face à face forment l\'horloge la plus rapide et la plus compacte du jeu'
    ],
    note: 'Il détecte les changements, pas les états. Un bloc immobile ne déclenchera jamais rien, même s\'il est « intéressant ».'
  },
  {
    nom: 'Piston et piston collant', cat: 'usage',
    tags: [{ txt: '12 blocs max', cls: 'red' }],
    ou: 'Partout. Le piston collant ramène le bloc poussé, le piston normal non.',
    drops: [
      'Pousse jusqu\'à 12 blocs à la fois',
      'Ne peut pas pousser : obsidienne, coffres, établis, fourneaux, entités de bloc en général',
      'Bloc de slime et bloc de miel : entraînent les blocs voisins (base des machines volantes)',
      'Slime et miel ne collent PAS entre eux : c\'est ce qui permet de séparer deux parties d\'une machine'
    ],
    note: 'Un piston collant alimenté par une impulsion d\'1 tick pousse puis lâche le bloc au lieu de le ramener. C\'est un bug historique devenu une technique standard.'
  },
  {
    nom: 'Entonnoir (hopper)', cat: 'usage',
    tags: [{ txt: 'Logique inversée', cls: 'gold' }],
    ou: 'Sous ou à côté d\'un conteneur ; il pointe vers la cible au moment de la pose (accroupissez-vous pour viser).',
    drops: [
      'Aspire les objets posés dans le bloc au-dessus de lui',
      'Débit : 2,5 objets par seconde',
      'Un signal de redstone le DÉSACTIVE (contrairement à tout le reste)',
      'Un comparateur derrière lui lit son remplissage'
    ],
    note: 'La logique inversée surprend tout le monde : pour bloquer un entonnoir, il faut l\'alimenter, pas le couper.'
  },
  {
    nom: 'Distributeur et lanceur', cat: 'usage',
    tags: [{ txt: 'Action', cls: 'red' }],
    ou: 'Orientés vers la cible.',
    drops: [
      'Distributeur (dispenser) : UTILISE l\'objet — tire une flèche, verse un seau, plante un plant, tond un mouton, pose du TNT amorcé, met une armure',
      'Lanceur (dropper) : éjecte simplement l\'objet, ou le pousse dans le conteneur qu\'il vise',
      'Une chaîne de lanceurs transporte des objets vers le HAUT, ce qu\'un entonnoir ne sait pas faire'
    ],
    note: 'Le distributeur est le bras mécanique de toutes les fermes : c\'est lui qui agit à votre place.'
  },
  {
    nom: 'Capteur de sculk', cat: 'source',
    tags: [{ txt: 'Vibrations', cls: 'purple' }],
    ou: 'Deep dark, ou posé où vous voulez (Toucher de soie).',
    drops: [
      'Détecte les vibrations dans un rayon de 8 blocs : pas, casse de bloc, projectile, porte',
      'Le comparateur en sortie donne un numéro correspondant au TYPE de vibration',
      'La laine (et les tapis) bloque totalement les vibrations'
    ],
    note: 'Le capteur calibré (calibrated sculk sensor) permet de ne réagir qu\'à un seul type de vibration : la base des portes secrètes modernes.'
  },
  {
    nom: 'Fabricateur (crafter)', cat: 'usage',
    tags: [{ txt: '1.21', cls: 'cyan' }],
    ou: 'Alimenté par un entonnoir, déclenché par un signal.',
    drops: [
      'Fabrique automatiquement la recette configurée dès qu\'il reçoit un signal',
      'Les emplacements se verrouillent d\'un clic pour figer la disposition',
      'Un comparateur lit son remplissage : on peut le déclencher automatiquement quand la grille est complète'
    ],
    note: 'C\'est l\'ajout qui a le plus changé le jeu technique récent : compactage automatique, usines de flèches, de pains, de blocs.'
  }
];

/* --- Circuits (rendus comme des « plans ») --- */
var CIRCUITS = [
  {
    id: 'porte-non', nom: 'Porte NON (inverseur)', cat: 'logique',
    taille: '3 × 1', diff: 'Débutant',
    desc: 'Le circuit le plus simple et le plus utilisé : la sortie est allumée quand l\'entrée est éteinte.',
    mats: ['1 torche de redstone', '1 bloc plein', 'poudre de redstone'],
    couches: [{ t: 'Vue de dessus', vue: 1, g: ['RBR', '.X.'] }],
    etapes: [
      'Amenez le signal d\'entrée dans un bloc plein.',
      'Fixez une torche de redstone sur la face opposée de ce bloc.',
      'Entrée éteinte → la torche brille (sortie 15). Entrée allumée → la torche s\'éteint (sortie 0).'
    ],
    notes: [{ type: 'tip', txt: 'Toutes les autres portes logiques se construisent à partir d\'inverseurs. Comprendre celle-ci suffit pour comprendre la redstone.' }]
  },
  {
    id: 'porte-et', nom: 'Porte ET (AND)', cat: 'logique',
    taille: '5 × 3', diff: 'Intermédiaire',
    desc: 'La sortie ne s\'allume que si les DEUX entrées sont actives. Sert à conditionner une machine à deux verrous.',
    mats: ['2 torches de redstone (les inverseurs d\'entrée)', '1 torche de sortie', '3 blocs pleins', 'poudre'],
    couches: [{ t: 'Vue de dessus', vue: 1, g: ['R.B.X', '....R', 'R.B.X'] }],
    etapes: [
      'Inversez chaque entrée avec une torche sur un bloc plein.',
      'Réunissez les deux sorties inversées sur un même bloc plein.',
      'Une dernière torche sur ce bloc donne la sortie : c\'est un NON-OU des deux inversions, donc un ET.',
      'Vérifiez : 0-0 → 0 · 1-0 → 0 · 0-1 → 0 · 1-1 → 1.'
    ],
    notes: [{ type: 'info', txt: 'Version compacte : deux répéteurs pointant vers un même bloc, avec un comparateur en mode soustraction. Plus petit, mais moins lisible à débuger.' }]
  },
  {
    id: 'porte-ou', nom: 'Porte OU (OR)', cat: 'logique',
    taille: '3 × 3', diff: 'Débutant',
    desc: 'La sortie s\'allume si AU MOINS une entrée est active. C\'est simplement deux fils qui se rejoignent.',
    mats: ['Poudre de redstone uniquement'],
    couches: [{ t: 'Vue de dessus', vue: 1, g: ['R..', '.RR', 'R..'] }],
    etapes: [
      'Faites converger les deux lignes de poudre vers une même ligne de sortie.',
      'C\'est tout : la redstone se combine naturellement en OU.',
      'Ajoutez un répéteur sur chaque entrée si vous voulez éviter que le signal remonte vers l\'autre branche.'
    ],
    notes: [{ type: 'warn', txt: 'Sans répéteur, le signal remonte dans la branche voisine. Sur un circuit complexe, c\'est la cause n° 1 des comportements incompréhensibles.' }]
  },
  {
    id: 'porte-xor', nom: 'Porte OU EXCLUSIF (XOR)', cat: 'logique',
    taille: '5 × 3', diff: 'Avancé',
    desc: 'La sortie s\'allume si UNE SEULE entrée est active. C\'est le circuit d\'un interrupteur « va-et-vient » : deux leviers commandent la même lampe.',
    mats: ['2 comparateurs', '1 répéteur', 'poudre', 'blocs pleins'],
    couches: [{ t: 'Vue de dessus', vue: 1, g: ['R.V.R', '..R..', 'R.V.R'] }],
    etapes: [
      'Placez deux comparateurs en mode soustraction, chacun recevant une entrée à l\'arrière et l\'autre sur le côté.',
      'Réunissez leurs sorties : le signal ne passe que si les deux entrées diffèrent.',
      'Testez les quatre combinaisons : 0-0 → 0 · 1-0 → 1 · 0-1 → 1 · 1-1 → 0.'
    ],
    notes: [{ type: 'tip', txt: 'C\'est le montage à utiliser pour une porte de maison commandée depuis l\'intérieur ET l\'extérieur, sans jamais se retrouver « à l\'envers ».' }]
  },
  {
    id: 'horloge-obs', nom: 'Horloge à observateurs (1 tick)', cat: 'horloge',
    taille: '2 × 1', diff: 'Débutant',
    desc: 'L\'horloge la plus rapide et la plus compacte du jeu : deux observateurs qui se regardent.',
    mats: ['2 observateurs'],
    couches: [{ t: 'Vue de dessus', vue: 1, g: ['QQ'] }],
    etapes: [
      'Posez un observateur, puis un second collé à lui, face à face (chaque « visage » regarde l\'autre).',
      'Ils se déclenchent mutuellement à l\'infini dès la pose.',
      'Pour l\'arrêter : cassez-en un, ou intercalez un bloc que vous poussez avec un piston.'
    ],
    rendement: 'Une impulsion tous les 2 ticks (0,1 s). Trop rapide pour la plupart des usages — à réserver aux fermes qui doivent réagir instantanément.',
    notes: [{ type: 'warn', txt: 'Une horloge qui tourne en permanence sollicite le serveur. Prévoyez toujours un levier pour la couper quand la ferme n\'est pas utilisée.' }]
  },
  {
    id: 'horloge-rep', nom: 'Horloge à répéteurs (réglable)', cat: 'horloge',
    taille: '4 × 3', diff: 'Débutant',
    desc: 'Une boucle de poudre et de répéteurs : le délai se règle au clic. L\'horloge polyvalente par défaut.',
    mats: ['2 à 8 répéteurs', 'poudre de redstone', '1 levier', '1 torche de redstone (amorçage)'],
    couches: [{ t: 'Vue de dessus', vue: 1, g: ['RZRR', 'R..Z', 'RRZR'] }],
    etapes: [
      'Formez une boucle fermée de poudre avec au moins deux répéteurs orientés dans le même sens de circulation.',
      'Amorcez la boucle : posez brièvement une torche de redstone, ou coupez puis rétablissez un segment.',
      'Réglez le délai en cliquant sur les répéteurs — chaque cran ajoute 0,1 s par répéteur.',
      'Insérez un levier sur la boucle pour pouvoir l\'arrêter.'
    ],
    rendement: 'De 0,4 s à plusieurs secondes selon le nombre de répéteurs et leur réglage.',
    notes: [{ type: 'tip', txt: 'Pour un cycle très lent (plusieurs minutes), préférez l\'horloge à entonnoirs : elle est plus compacte et bien plus économe.' }]
  },
  {
    id: 'horloge-hopper', nom: 'Horloge à entonnoirs (lente)', cat: 'horloge',
    taille: '3 × 2', diff: 'Intermédiaire',
    desc: 'Des objets font l\'aller-retour entre deux entonnoirs ; un comparateur lit le passage. La façon la plus économique de cadencer une ferme à la minute.',
    mats: ['2 entonnoirs', '1 comparateur', 'poudre de redstone', 'des objets quelconques (le nombre règle le délai)'],
    couches: [{ t: 'Vue de dessus', vue: 1, g: ['HH', 'V.'] }],
    etapes: [
      'Placez deux entonnoirs face à face, chacun pointant vers l\'autre.',
      'Mettez des objets dans l\'un d\'eux : ils vont faire la navette indéfiniment.',
      'Un comparateur derrière un entonnoir s\'allume quand des objets s\'y trouvent.',
      'Le délai dépend du nombre d\'objets : 1 objet ≈ 0,4 s, une pile de 64 ≈ 25 s. Empilez plusieurs boucles pour des cycles de plusieurs minutes.'
    ],
    rendement: 'De 0,4 s à plusieurs minutes, réglable objet par objet.',
    notes: [{ type: 'tip', txt: 'C\'est l\'horloge idéale pour une ferme d\'améthyste, une ferme à miel ou tout ce qui n\'a besoin d\'être déclenché que toutes les quelques minutes.' }]
  },
  {
    id: 'monostable', nom: 'Impulsion courte (monostable)', cat: 'horloge',
    taille: '4 × 2', diff: 'Intermédiaire',
    desc: 'Transforme un signal long (levier, plaque) en une impulsion brève. Indispensable pour les pistons collants et les portes automatiques.',
    mats: ['1 répéteur', '1 torche de redstone', '1 bloc plein', 'poudre'],
    couches: [{ t: 'Vue de dessus', vue: 1, g: ['RZRR', '.BX.'] }],
    etapes: [
      'Séparez le signal en deux chemins : un direct, un passant par un répéteur puis un inverseur.',
      'Réunissez-les : la sortie n\'est active que pendant le délai du répéteur.',
      'Réglez la durée en jouant sur le cran du répéteur.'
    ],
    notes: [{ type: 'info', txt: 'Un observateur seul produit déjà une impulsion d\'1 tick : c\'est souvent la solution la plus simple si vous détectez un changement de bloc.' }]
  },
  {
    id: 'tflip', nom: 'Verrou T (interrupteur à impulsion)', cat: 'memoire',
    taille: '5 × 3', diff: 'Avancé',
    desc: 'Chaque impulsion bascule l\'état : allumé, éteint, allumé… C\'est ce qui transforme un bouton en interrupteur.',
    mats: ['1 piston collant', '1 bloc de redstone', '2 répéteurs', '1 observateur', 'poudre'],
    couches: [{ t: 'Vue de dessus', vue: 1, g: ['R.S.R', '..B..', '..Q..'] }],
    etapes: [
      'Un piston collant pousse et tire un bloc de redstone entre deux positions.',
      'Chaque impulsion en entrée fait avancer ou reculer le bloc.',
      'La sortie est prise à côté de la position « avancée » du bloc de redstone.',
      'Le circuit garde son état même après un rechargement du monde.'
    ],
    notes: [{ type: 'tip', txt: 'Usage typique : un bouton discret qui ouvre ET ferme une porte secrète, alors qu\'un bouton simple ne fait que l\'ouvrir brièvement.' }]
  },
  {
    id: 'detect-plein', nom: 'Détecter un coffre plein', cat: 'memoire',
    taille: '3 × 2', diff: 'Débutant',
    desc: 'Un comparateur lit le remplissage d\'un conteneur. Sert à couper une ferme quand le stockage est saturé, ou à allumer un voyant.',
    mats: ['1 comparateur', 'poudre', '1 lampe de redstone ou 1 répéteur'],
    couches: [{ t: 'Vue de dessus', vue: 1, g: ['EVR', '...'] }],
    etapes: [
      'Placez le comparateur directement derrière le coffre, dans le sens de sortie.',
      'La force du signal est proportionnelle au remplissage : 0 (vide) à 15 (plein).',
      'Pour ne réagir qu\'au « presque plein », insérez des répéteurs ou un second comparateur en soustraction afin de fixer un seuil.',
      'Branchez la sortie sur une lampe, ou sur l\'entonnoir d\'alimentation pour arrêter la ferme.'
    ],
    notes: [{ type: 'warn', txt: 'Le signal dépend du nombre d\'objets ET de la taille de pile : un coffre plein d\'œufs (pile de 16) sature bien plus vite qu\'un coffre de pierre.' }]
  },
  {
    id: 'porte-2x2', nom: 'Porte cachée 2 × 2 à pistons', cat: 'usage',
    taille: '4 × 4 × 4', diff: 'Avancé',
    desc: 'Un pan de mur qui s\'ouvre sans laisser voir de mécanisme. Le classique de toute base secrète.',
    mats: ['4 pistons collants', '4 blocs de façade identiques au mur', 'poudre, répéteurs, blocs pleins', '2 leviers ou 2 plaques de pression'],
    couches: [
      { t: 'Vue de face · le mur fermé', vue: 1, g: ['bbbb', 'bBBb', 'bBBb', 'bbbb'] },
      { t: 'Vue de dessus · mécanisme (derrière le mur)', vue: 1, g: ['.SS.', 'RRRR', '.ZZ.'] }
    ],
    etapes: [
      'Réservez une cavité de 2 blocs de profondeur derrière le pan de mur à ouvrir.',
      'Placez 4 pistons collants : deux poussent les blocs du haut vers le haut, deux poussent ceux du bas vers le bas.',
      'Câblez les quatre pistons sur une même ligne, avec des répéteurs pour égaliser les délais.',
      'Réglez les répéteurs pour que les quatre blocs bougent exactement en même temps — sinon la porte « saute ».',
      'Commandez par un levier caché, une plaque sous un tapis, ou un capteur de sculk calibré.'
    ],
    notes: [
      { type: 'tip', txt: 'Utilisez pour la façade le même bloc que le mur alentour et évitez les blocs à motif directionnel : la porte devient réellement invisible.' },
      { type: 'warn', txt: 'Un piston collant lâche son bloc s\'il reçoit une impulsion d\'1 tick. Vos répéteurs doivent donc être réglés sur 2 crans minimum.' }
    ]
  },
  {
    id: 'lampe-auto', nom: 'Éclairage automatique à la tombée de la nuit', cat: 'usage',
    taille: '3 × 2', diff: 'Débutant',
    desc: 'Vos lampes s\'allument seules au coucher du soleil et s\'éteignent à l\'aube. Le montage de confort le plus rentable d\'une base.',
    mats: ['1 détecteur de lumière du jour', 'poudre de redstone', 'lampes de redstone', 'répéteurs si la distance dépasse 15 blocs'],
    couches: [{ t: 'Vue de dessus', vue: 1, g: ['KRR', '...'] }],
    etapes: [
      'Posez un détecteur de lumière du jour à ciel ouvert.',
      'Faites un clic droit dessus : il passe en mode inversé et s\'active la NUIT.',
      'Reliez sa sortie à vos lampes de redstone avec de la poudre et des répéteurs tous les 15 blocs.',
      'Enterrez le câblage sous le sol pour ne rien laisser paraître.'
    ],
    notes: [{ type: 'info', txt: 'Le même détecteur non inversé sert à couper une ferme la nuit, ou à ouvrir automatiquement un enclos le jour.' }]
  },
  {
    id: 'canon-eau', nom: 'Sas et rideau d\'eau automatiques', cat: 'usage',
    taille: '5 × 3', diff: 'Intermédiaire',
    desc: 'Un distributeur verse et reprend l\'eau à la demande : rideau d\'entrée, piège, ou évacuation d\'un couloir de ferme.',
    mats: ['1 distributeur', '1 seau d\'eau', '1 plaque de pression ou 1 levier', 'poudre de redstone'],
    couches: [{ t: 'Vue de côté', vue: 1, g: ['.U..', '.w..', '._..'] }],
    etapes: [
      'Placez un distributeur avec un seau d\'eau à l\'intérieur, orienté vers la zone à inonder.',
      'Un signal le déclenche : il verse la source d\'eau. Un second signal la reprend dans le seau.',
      'Pour un rideau permanent commandé, utilisez un levier plutôt qu\'une plaque.',
      'Pour un couloir de ferme, alignez plusieurs distributeurs sur la même ligne de redstone.'
    ],
    notes: [{ type: 'tip', txt: 'C\'est le mécanisme des fermes à cultures « à balayage » : l\'eau lâchée emporte toute la récolte vers les entonnoirs, puis est reprise aussitôt.' }]
  }
];
