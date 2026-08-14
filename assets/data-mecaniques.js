/* ============================================================
   Données : mécaniques de jeu (Java Edition)
   ---------------------------------------------------------------
   Les règles de fond qui expliquent pourquoi tout le reste
   fonctionne : faim, combat, apparition des monstres, ticks,
   chunks, expérience. Chaque fiche donne une règle chiffrée,
   sa conséquence concrète et le piège qui va avec.

   Trois jeux de données :
     MECANIQUES_JEU    → fiches rendues par renderEntry()
     REPERES_CHIFFRES  → lignes de tableau (fillTable)
     ERREURS_COURANTES → lignes de tableau (fillTable)
   ============================================================ */

var MECANIQUES_JEU = [

  /* ---------------- SURVIE ---------------- */
  {
    nom: 'Faim et saturation', cat: 'survie',
    tags: [{ txt: 'Barre de faim', cls: 'gold' }, { txt: 'Fondamental', cls: 'ok' }],
    ou: 'La barre de faim compte 20 points, mais chaque aliment remplit aussi une réserve invisible — la saturation — qui se vide en premier.',
    drops: [
      '20 points de faim — soit 10 cuisses ; la saturation ne peut jamais dépasser la faim en cours',
      'Steak ou côtelette cuits — 8 points de faim et 12,8 de saturation : le meilleur aliment courant',
      'Pain — 5 points de faim mais seulement 6 de saturation, vous aurez faim deux fois plus vite',
      'Carotte dorée — 6 de faim et 14,4 de saturation, la meilleure du jeu, et elle se cultive',
      'Épuisement — sprinter, sauter, nager, miner et encaisser des coups remplissent un compteur caché ; sauter en sprintant est de loin l\'action la plus coûteuse',
      'On ne peut pas manger à barre pleine — seules les pommes dorées et le lait passent en toutes circonstances'
    ],
    note: 'Ce n\'est pas la barre qui compte, c\'est la saturation derrière : un steak vous emmène deux fois plus loin que deux pains, alors que la barre affiche la même chose dans les deux cas.'
  },
  {
    nom: 'Régénération des points de vie', cat: 'survie',
    tags: [{ txt: 'Soin naturel', cls: 'ok' }],
    ou: 'La vie ne remonte pas toute seule : elle est payée en nourriture, et à deux vitesses très différentes.',
    drops: [
      'Faim à 18 ou plus (9 cuisses) — régénération lente, environ 1 point de vie toutes les 4 secondes',
      'Faim à 20 avec de la saturation restante — régénération rapide, environ 1 point par demi-seconde',
      'En dessous de 18 — plus aucune régénération naturelle, quel que soit le temps d\'attente',
      'Se soigner coûte de la nourriture — chaque point de vie régénéré creuse la barre de faim, d\'où sa chute après un combat',
      'Potion de Régénération — elle fonctionne même le ventre vide : c\'est sa vraie utilité'
    ],
    note: 'La régénération rapide n\'existe qu\'à 20/20 avec de la saturation. Arrivez au combat vraiment rassasié d\'un aliment riche, pas simplement « pas affamé » : la différence est d\'un facteur huit.'
  },
  {
    nom: 'Dégâts de chute', cat: 'survie',
    tags: [{ txt: 'Cause n° 1 de mort', cls: 'red' }],
    ou: 'La hauteur tue plus de joueurs que les monstres, et la règle est parfaitement linéaire.',
    drops: [
      'Formule — 1 point de dégât (½ cœur) par bloc au-delà des 3 premiers',
      'Seuil mortel — 23 blocs tuent un joueur en pleine santé sans armure',
      'Annulation totale — atterrir dans l\'eau (même sur un seul bloc de profondeur), sur un bloc de slime, dans une toile d\'araignée ou sur un échafaudage',
      'Ballot de foin — réduit les dégâts de chute d\'environ 80 %, à poser au pied des échelles et des tours',
      'Chute amortie IV — environ 48 % de dégâts en moins ; cumulée à Protection, on approche du plafond de 80 %',
      'Piège — l\'armure seule protège très mal de la chute : c\'est Chute amortie qui compte'
    ],
    note: 'Un seau d\'eau posé au sol en pleine descente annule tout. Gardez-en un dans la barre rapide dès que vous montez une tour ou que vous volez à l\'élytre.'
  },
  {
    nom: 'Noyade et réserve d\'air', cat: 'survie',
    tags: [{ txt: 'Sous l\'eau', cls: 'blue' }],
    ou: 'Sous l\'eau, la barre de bulles est un compte à rebours ; une fois vide, les dégâts sont réguliers et l\'armure n\'y change rien.',
    drops: [
      'Réserve d\'air — 10 bulles, soit 15 secondes',
      'Après la dernière bulle — environ 1 cœur par seconde jusqu\'à la surface',
      'Respiration — chaque niveau allonge nettement l\'apnée ; le niveau III triple à peu près la réserve',
      'Carapace de tortue — 10 secondes de Respiration aquatique offertes à chaque sortie de l\'eau',
      'Poche d\'air — une porte, une pancarte, une échelle ou un bloc plein posé sous l\'eau recrée un espace respirable',
      'Conduit — dans une base sous-marine, il donne respiration, vision et vitesse de minage en continu'
    ],
    note: 'Un seau vide est une issue de secours : ramassez la source d\'eau au niveau de votre tête, la poche d\'air ainsi créée recharge instantanément les bulles.'
  },
  {
    nom: 'Feu et lave', cat: 'survie',
    tags: [{ txt: 'Perte d\'objets', cls: 'red' }],
    ou: 'Brûler fait des dégâts modérés mais continus ; la lave, elle, tue en quelques secondes et détruit tout l\'inventaire au passage.',
    drops: [
      'En feu — dégâts réguliers tant que vous brûlez ; l\'eau, la pluie et un chaudron d\'eau éteignent instantanément',
      'Lave — dégâts très rapides, et vous en ressortez en feu pour environ 15 secondes supplémentaires',
      'Résistance au feu — annule totalement feu, lave et boules de feu ; elle ne fait rien contre la chute ni l\'asphyxie',
      'Protection contre le feu — réduit les dégâts ET raccourcit la durée pendant laquelle vous brûlez',
      'Netherite — les objets en netherite ne brûlent pas et flottent sur la lave : c\'est leur meilleur argument, avant même les statistiques',
      'Tout le reste brûle — un inventaire lâché dans la lave est définitivement perdu'
    ],
    note: 'Avant toute descente au Nether ou dans une grotte à lave, buvez une Résistance au feu : elle transforme l\'accident mortel classique en simple détour.'
  },
  {
    nom: 'Ce que les effets font à la barre de vie', cat: 'survie',
    tags: [{ txt: 'Potions', cls: 'purple' }],
    ou: 'Absorption, Poison, Wither et Résistance agissent tous sur la vie, mais aucun de la même façon.',
    drops: [
      'Absorption — ajoute des cœurs jaunes AU-DESSUS du maximum ; ils ne se régénèrent pas et disparaissent avec l\'effet',
      'Pomme dorée — 2 cœurs d\'absorption pendant 2 minutes, plus une courte régénération',
      'Poison — retire de la vie mais s\'arrête à ½ cœur : il ne tue jamais, il empêche surtout de régénérer',
      'Wither (l\'effet) — lui, tue : la barre noircit et rien ne l\'arrête sauf le lait ou un soin',
      'Résistance — 20 % de dégâts en moins par niveau, et cela se cumule avec l\'armure',
      'Lait — supprime TOUS les effets d\'un coup, y compris la Force et la Résistance au feu'
    ],
    note: 'La pomme dorée enchantée donne Résistance et Résistance au feu pendant 5 minutes en plus des cœurs d\'absorption : ce n\'est pas un soin, c\'est un objet de raid à garder pour le Wither ou un avant-poste.'
  },
  {
    nom: 'Sommeil et point de réapparition', cat: 'survie',
    tags: [{ txt: 'Lit', cls: 'gold' }],
    ou: 'Le lit fait trois choses distinctes : passer la nuit, arrêter la météo et enregistrer un point de réapparition.',
    drops: [
      'Fenêtre de sommeil — du crépuscule (vers 12 500 ticks) à l\'aube, ou à tout moment pendant un orage',
      'Clic droit de jour — n\'endort pas mais enregistre quand même le point de réapparition',
      'Dormir — arrête la pluie ou l\'orage en cours et remet le compteur des phantoms à zéro',
      'Monstres à proximité — un hostile dans une zone d\'environ 8 blocs autour du lit bloque le sommeil',
      'Nether et End — le lit explose ; seule l\'ancre de réapparition (chargée en pierre luisante) fonctionne, et uniquement au Nether',
      'Lit détruit ou obstrué à votre mort — retour au point d\'apparition du monde, sans avertissement'
    ],
    note: 'Un lit posé au fond de la mine, même jamais utilisé pour dormir, économise plusieurs minutes de marche à chaque mort. Un clic droit suffit à l\'enregistrer.'
  },
  {
    nom: 'Mort : objets au sol et expérience', cat: 'survie',
    tags: [{ txt: '5 minutes', cls: 'red' }],
    ou: 'À la mort, l\'inventaire tombe sur place et un compte à rebours démarre. Ce qu\'on récupère dépend surtout de la vitesse de retour.',
    drops: [
      'Objets au sol — 5 minutes avant disparition, aussi bien une pile de 64 qu\'un objet unique',
      'Chunk déchargé — le compteur s\'arrête : s\'éloigner assez pour décharger la zone met la disparition en pause',
      'Expérience — vous laissez tomber 7 points par niveau, plafonnés à 100 : au-delà du niveau 7 environ, tout le reste est perdu',
      'Lave, feu, cactus, vide — les objets y sont détruits immédiatement, sans délai de grâce',
      'Boussole de résurrection — fabriquée avec 8 éclats d\'écho autour d\'une boussole, elle pointe le dernier lieu de mort'
    ],
    note: 'Relevez vos coordonnées (F3) avant chaque expédition risquée : les 5 minutes se comptent en temps réel, et le trajet de retour en consomme souvent la moitié.'
  },
  {
    nom: 'Difficulté du monde', cat: 'survie',
    tags: [{ txt: 'Réglage', cls: '' }],
    ou: 'Le curseur de difficulté change les dégâts subis et quelques comportements de monstres — pas le nombre de mobs ni le butin.',
    drops: [
      'Paisible — aucun monstre hostile, la faim ne descend plus et la vie remonte en continu',
      'Facile → Normal → Difficile — les dégâts des monstres sont grossièrement divisés par deux, normaux, puis multipliés par une fois et demie',
      'La faim — elle vous laisse à 5 cœurs en Facile, à ½ cœur en Normal, et vous tue en Difficile',
      'Difficile — les zombies défoncent les portes en bois et appellent des renforts',
      'Ce que la difficulté NE change pas — les taux d\'apparition, les tables de butin et les gains d\'expérience'
    ],
    note: 'Passer en Paisible fait disparaître les hostiles mais aussi leurs ressources (poudre à canon, perles, cordes). Pour survivre à un mauvais moment, basculer en Facile le temps de rentrer suffit largement.'
  },

  /* ---------------- COMBAT ---------------- */
  {
    nom: 'Délai de rechargement d\'attaque', cat: 'combat',
    tags: [{ txt: 'Java uniquement', cls: 'cyan' }, { txt: 'Décisif', cls: 'red' }],
    ou: 'Depuis la 1.9, chaque arme a une cadence. Frapper avant la fin du rechargement divise les dégâts.',
    drops: [
      'Épée — 1,6 attaque par seconde, soit une jauge pleine toutes les 0,625 seconde',
      'Hache — environ 1 attaque par seconde, mais des dégâts de base bien supérieurs',
      'Attaque anticipée — les dégâts suivent le carré de la charge : à mi-jauge, vous n\'infligez qu\'environ 40 % du total',
      'Attaque à répétition — cliquer plus vite ne remplit pas la jauge : c\'est strictement moins efficace que le rythme de l\'arme',
      'Indicateur d\'attaque — activable dans Options → Commandes : il affiche la jauge sous le réticule'
    ],
    note: 'Mettre l\'indicateur d\'attaque en mode « barre » et ne frapper qu\'à jauge pleine est le réglage qui fait le plus progresser en combat, bien avant le moindre enchantement.'
  },
  {
    nom: 'Coup critique et coup balayant', cat: 'combat',
    tags: [{ txt: '+50 %', cls: 'gold' }],
    ou: 'Deux bonus gratuits, chacun avec des conditions strictes — et une condition commune : ne pas sprinter.',
    drops: [
      'Coup critique — +50 % de dégâts, à condition d\'être en train de RETOMBER (pas au sol, pas en montée)',
      'Sprinter annule le critique — le sprint le remplace par un gros recul, utile contre un creeper, coûteux partout ailleurs',
      'Coup balayant — attaque pleinement chargée, à l\'épée, en marchant, sans sauter : elle touche tous les mobs autour',
      'Sans l\'enchantement Balayage — le coup balayant n\'inflige qu\'1 point aux voisins, mais il les repousse tous',
      'Pas de coup critique — sur une échelle, dans l\'eau, sur une monture ou avec l\'effet Cécité'
    ],
    note: 'La routine du corps à corps : approcher en marchant, sauter, frapper en retombant à jauge pleine. Le sprint sert à fuir ou à repousser, jamais à taper.'
  },
  {
    nom: 'Invincibilité d\'une demi-seconde', cat: 'combat',
    tags: [{ txt: '10 ticks', cls: 'cyan' }],
    ou: 'Après chaque dégât reçu, joueur comme mob devient brièvement insensible. Toute la tactique de combat en découle.',
    drops: [
      'Durée — 10 ticks, soit une demi-seconde d\'immunité après chaque coup encaissé',
      'Pendant ces 10 ticks — seule une attaque PLUS forte passe, et uniquement pour la différence de dégâts',
      'Conséquence — trois squelettes qui tirent en même temps ne font pas trois fois plus mal qu\'un seul',
      'Piège — le feu, la lave, le poison ou les cactus consomment vos frames et masquent le gros coup qui arrive derrière',
      'Les mobs en profitent aussi — inutile de frapper une cible plus vite qu\'une demi-seconde, les coups en trop sont perdus'
    ],
    note: 'Ce qui tue n\'est pas le nombre d\'ennemis mais le plus gros coup encaissé. Contre une foule, la priorité est d\'écarter celui qui frappe fort (vindicateur, brute piglin), pas de compter les zombies.'
  },
  {
    nom: 'Armure et ténacité', cat: 'combat',
    tags: [{ txt: '80 % maximum', cls: 'ok' }],
    ou: 'L\'armure réduit un pourcentage des dégâts, mais cette réduction fond quand le coup encaissé est énorme. C\'est là qu\'intervient la ténacité.',
    drops: [
      'Chaque point d\'armure — environ 4 % de dégâts en moins ; le maximum est de 20 points, soit 80 %',
      'Panoplies complètes — cuir 7, or 11, mailles 12, fer 15, diamant 20, netherite 20',
      'Les très gros coups percent l\'armure — plus l\'attaque est puissante, plus la réduction réelle diminue',
      'Ténacité — 8 points pour une panoplie de diamant, 12 pour la netherite : elle limite précisément cette perte',
      'L\'armure ne fait RIEN contre — la faim, la noyade, l\'asphyxie dans un bloc, le vide et les dégâts magiques'
    ],
    note: 'Diamant et netherite protègent à l\'identique au quotidien : la netherite ne se distingue vraiment que sur les très gros dégâts (explosions, brutes) et parce qu\'elle ne brûle pas dans la lave.'
  },
  {
    nom: 'Boucliers et haches', cat: 'combat',
    tags: [{ txt: 'Bouclier', cls: 'blue' }, { txt: 'Contre : hache', cls: 'red' }],
    ou: 'Un bouclier levé annule totalement les dégâts venant de face — mais il s\'arme avec un temps de retard et une hache le neutralise.',
    drops: [
      'Blocage — mêlée, flèches, explosions et boules de feu de ghast sont annulées à 100 % si elles viennent de face',
      'Délai d\'armement — environ un quart de seconde entre le clic droit et le moment où le bouclier bloque réellement',
      'Hache — elle désactive le bouclier pendant 5 secondes : la vôtre contre un joueur, celle des vindicateurs et des brutes piglins contre vous',
      'De dos ou de côté — rien n\'est bloqué : le bouclier ne couvre que la moitié avant',
      'Bannière — appliquée sur le bouclier à l\'établi, purement décorative'
    ],
    note: 'Contre des squelettes, avancer bouclier levé bat le zigzag : une flèche bloquée n\'inflige ni dégâts ni recul, et vous gardez la ligne droite.'
  },
  {
    nom: 'Recul', cat: 'combat',
    tags: [{ txt: 'Positionnement', cls: '' }],
    ou: 'Le recul déplace la cible — et vous aussi. C\'est un outil de survie, et une plaie dès qu\'on veut garder un mob en place.',
    drops: [
      'Sprinter en frappant — ajoute un recul important, celui qui projette le mob à plusieurs blocs',
      'Recul II sur l\'épée — repousse encore plus loin : excellent en début de partie, catastrophique dans une salle de mise à mort',
      'Vous êtes aussi soumis au recul — une explosion ou une flèche vous déplace, y compris au bord d\'un ravin',
      'Bouclier levé — supprime le recul des projectiles bloqués',
      'Un mob dans l\'eau ou dans une toile — beaucoup moins déplacé par le recul'
    ],
    note: 'Le seul vrai contre du creeper au corps à corps : un coup en sprintant pour l\'éjecter hors de son rayon d\'explosion, puis on l\'achève à distance ou on le laisse se calmer.'
  },
  {
    nom: 'Ce qui décide un mob à vous attaquer', cat: 'combat',
    tags: [{ txt: 'Ciblage', cls: 'purple' }],
    ou: 'Chaque famille de monstres a son propre déclencheur : la vue, le regard, l\'or que vous portez ou le coup que vous venez de donner.',
    drops: [
      'Zombies, squelettes, araignées — repérage à vue à quelques dizaines de blocs, et poursuite tant que vous restez dans les chunks chargés',
      'Porter une tête de mob — divise par deux la distance à laquelle CE type de mob vous repère (au prix de votre casque)',
      'Enderman — il s\'énerve si vous regardez sa tête, jusqu\'à 64 blocs ; une citrouille sculptée portée sur la tête l\'en empêche',
      'Piglin — neutre tant que vous portez au moins une pièce d\'armure en or, sauf si vous ouvrez un coffre ou minez de l\'or devant lui',
      'Creeper — environ 1,5 seconde de sifflement avant l\'explosion (puissance 3) ; chats et ocelots les font fuir',
      'Mobs neutres — loups, abeilles, golems de fer, cochons-zombies : tout le groupe vous cible dès que vous en frappez un'
    ],
    note: 'Un chat dans la base, c\'est zéro creeper à l\'intérieur et zéro phantom au-dessus. C\'est la défense la moins chère du jeu.'
  },

  /* ---------------- MONDE ---------------- */
  {
    nom: 'Niveau de lumière et apparition des monstres', cat: 'monde',
    tags: [{ txt: 'Lumière 0', cls: 'gold' }, { txt: '1.18+', cls: 'cyan' }],
    ou: 'Dans l\'Overworld, la règle est devenue binaire : un monstre a besoin d\'un niveau de lumière de bloc égal à 0 pour apparaître.',
    drops: [
      'Lumière de bloc 0 — une seule torche suffit désormais à condamner toute la zone qu\'elle éclaire',
      'Torche — niveau 14 à la source, qui perd 1 par bloc parcouru : au-delà d\'une douzaine de blocs, le sol redevient noir',
      'Ce qui compte — la lumière du bloc où le mob apparaît, pas celle de la surface éclairée juste à côté',
      'Surfaces où rien n\'apparaît — dalle du haut, verre, feuillage, glace, ballot de foin ; une dalle du BAS, elle, laisse passer les apparitions',
      'Au Nether — l\'éclairage ne sécurise pas une zone comme dans l\'Overworld : fermez plutôt les accès'
    ],
    note: 'Éclairer « à peu près » ne sert à rien : c\'est le bloc oublié derrière un coffre qui fait apparaître le creeper au milieu de la base. Un maillage de torches tous les 8 à 10 blocs ne laisse aucun trou.'
  },
  {
    nom: 'Distances d\'apparition et de disparition', cat: 'monde',
    tags: [{ txt: '24 → 128 blocs', cls: 'gold' }, { txt: 'Fermes', cls: 'ok' }],
    ou: 'Les monstres n\'apparaissent que dans une couronne autour de vous, et disparaissent selon leur éloignement. Toute ferme à mobs se conçoit à partir de ces deux nombres.',
    drops: [
      'Rayon d\'apparition — rien n\'apparaît à moins de 24 blocs de vous, ni au-delà de 128',
      'Au-delà de 128 blocs — disparition immédiate du mob, où qu\'il soit',
      'Entre 32 et 128 blocs — le mob a une chance de disparaître à tout instant ; en dessous de 32, il reste',
      'Ne disparaissent jamais — mobs nommés à l\'étiquette, apprivoisés, villageois, et ceux qui ont ramassé un objet',
      'Conséquence — la plateforme d\'apparition doit être à plus de 24 blocs de votre poste d\'attente, et tout doit tenir dans les 128'
    ],
    note: 'La sphère de 128 blocs se mesure depuis VOUS, pas depuis la ferme. Deux blocs de trop sur le poste d\'attente et le rendement tombe à zéro sans que rien d\'autre n\'ait changé.'
  },
  {
    nom: 'Cycle jour/nuit', cat: 'monde',
    tags: [{ txt: '20 minutes', cls: '' }],
    ou: 'Une journée complète dure 24 000 ticks, soit 20 minutes réelles. C\'est l\'unité de temps la plus utile pour planifier.',
    drops: [
      'Journée complète — 24 000 ticks = 20 minutes réelles',
      'Plein jour — les 10 premières minutes (0 à 12 000 ticks) ; la nuit noire dure environ 7 minutes',
      'Les monstres de surface apparaissent dès que la lumière du ciel baisse, avant même qu\'il fasse nuit à l\'écran',
      'Le lit devient utilisable au crépuscule, vers 12 500 ticks',
      '/time query daytime — donne l\'heure exacte du monde si vous avez besoin de synchroniser quelque chose'
    ],
    note: 'Raisonner en jours plutôt qu\'en minutes : une pousse de blé, une fournée de charbon ou un aller-retour au Nether se planifient en unités de 20 minutes, et cela rend les allers-retours beaucoup plus rentables.'
  },
  {
    nom: 'Météo et orages', cat: 'monde',
    tags: [{ txt: 'Orage', cls: 'purple' }],
    ou: 'La pluie gêne un peu ; l\'orage, lui, change les règles d\'apparition en plein jour et ouvre une fenêtre unique.',
    drops: [
      'Orage — la lumière du ciel chute assez pour que des monstres apparaissent en surface en pleine journée',
      'Pluie — éteint les feux à ciel ouvert, remplit les chaudrons, ralentit les déplacements en poudreuse',
      'Foudre — transforme un cochon en cochon-zombie, un villageois en sorcière, un creeper en creeper chargé',
      'Canalisation (trident) — n\'appelle la foudre que pendant un orage, et seulement sur une cible à ciel ouvert',
      'Dormir — met fin à la pluie comme à l\'orage en cours',
      'Nether et End — aucune météo, aucune foudre'
    ],
    note: 'L\'orage est la fenêtre à ne pas rater : c\'est le seul moment où l\'on peut fabriquer un creeper chargé, dont l\'explosion fait tomber la tête du mob qu\'elle tue.'
  },
  {
    nom: 'Propagation du feu', cat: 'monde',
    tags: [{ txt: 'Risque', cls: 'red' }],
    ou: 'Le feu ne se propage qu\'à des blocs inflammables, mais il monte bien plus loin qu\'il ne s\'étale.',
    drops: [
      'Blocs inflammables — bois et planches, feuillage, laine et tapis, ballots de foin, échafaudage, livres',
      'Le feu monte — la propagation vers le haut porte plus loin que sur les côtés : un plafond en bois quelques blocs au-dessus d\'un foyer peut prendre',
      'Netherrack — le feu posé dessus brûle indéfiniment, ce qui en fait la base des cheminées décoratives',
      'La pluie éteint le feu à ciel ouvert, jamais celui qui est sous un toit',
      'Coupe-feu — un rang de blocs non inflammables (pierre, terre, briques) arrête net la propagation horizontale',
      'Feu de camp — il ne propage pas le feu : c\'est la source de flamme sûre dans une maison en bois'
    ],
    note: 'La règle de survie : jamais de seau de lave dans la barre rapide au-dessus d\'un plancher en bois. Sur un monde de construction, la commande /gamerule doFireTick false supprime définitivement le problème.'
  },
  {
    nom: 'Blocs soumis à la gravité', cat: 'monde',
    tags: [{ txt: 'Sable · gravier', cls: 'copper' }],
    ou: 'Quelques blocs tombent dès que leur support disparaît. C\'est un danger en mine et un outil de chantier.',
    drops: [
      'Concernés — sable, sable rouge, gravier, béton en poudre, enclumes, œuf du dragon',
      'Ils tombent dès que le bloc du dessous disparaît, où que vous soyez, tant que le chunk est chargé',
      'Sur un bloc non plein — un bloc qui tombe sur une torche, une dalle ou une pancarte se casse en objet ramassable',
      'Colonne de sable — une torche placée à la base fait s\'effondrer toute la colonne, qui se ramasse d\'un coup',
      'Enclume ou bloc qui tombe sur vous — les dégâts dépendent de la hauteur de chute ; un casque en encaisse une partie et perd de la durabilité',
      'Asphyxie — un bloc de gravité qui vous ensevelit étouffe : c\'est le risque principal du minage sous un désert ou une plage'
    ],
    note: 'Sous un plafond de sable ou de gravier, on pose une torche AVANT de casser : la colonne tombe, se casse en objets, et le passage reste dégagé.'
  },
  {
    nom: 'Cultures : lumière, hydratation, croissance', cat: 'monde',
    tags: [{ txt: 'Ferme', cls: 'ok' }],
    ou: 'Une culture pousse par à-coups, quand le hasard la désigne. Les seuls leviers sont l\'eau, la lumière et le nombre de plants.',
    drops: [
      'Hydratation — une source d\'eau à 4 blocs ou moins suffit : un seul trou d\'eau irrigue un carré de 9 × 9',
      'Lumière — au moins 9 au-dessus de la plante ; une lanterne ou de la pierre luisante fait pousser la nuit',
      'Piétinement — sauter ou retomber sur la terre labourée la retransforme en terre et arrache la pousse : prévoyez un chemin en dalles',
      'Disposition — des rangées d\'une même culture séparées poussent plus vite qu\'un carré compact planté partout',
      'Poudre d\'os — accélère blé, carottes, pommes de terre, betteraves, cacao ; sans effet sur la canne à sucre, le cactus et la verrue du Nether',
      'Tick aléatoire — un plant donné n\'avance en moyenne qu\'une fois toutes les 68 secondes environ'
    ],
    note: 'On n\'accélère pas une culture en la regardant. La seule variable sur laquelle on agit vraiment est le nombre de plants : doublez la surface plutôt que d\'attendre devant le champ.'
  },
  {
    nom: 'Propagation de l\'eau et de la lave', cat: 'monde',
    tags: [{ txt: 'Fluides', cls: 'blue' }],
    ou: 'Les deux fluides suivent la même logique de niveaux décroissants, avec des portées et des vitesses très différentes.',
    drops: [
      'Eau — s\'écoule sur 7 blocs à l\'horizontale depuis une source, en perdant un niveau par bloc',
      'Source infinie — deux sources séparées par un bloc : le trou du milieu se recharge indéfiniment',
      'Lave — 3 blocs d\'écoulement dans l\'Overworld, 7 dans le Nether, et beaucoup plus lentement',
      'Eau sur une SOURCE de lave — obsidienne ; eau sur de la lave qui COULE — pierre',
      'Blocs immergeables — dalles, escaliers, murets, échelles, panneaux et barreaux gardent l\'eau : idéal pour des accès sous-marins',
      'Au Nether — l\'eau versée s\'évapore aussitôt ; seul un chaudron permet d\'en transporter'
    ],
    note: 'Un canal d\'eau reste le moyen le moins cher de déplacer objets et mobs sur de longues distances : une source tous les 8 blocs relance le courant indéfiniment.'
  },

  /* ---------------- PROGRESSION ---------------- */
  {
    nom: 'Expérience et coût des niveaux', cat: 'progression',
    tags: [{ txt: 'Niveau 30', cls: 'gold' }],
    ou: 'La barre d\'XP n\'est pas linéaire : chaque niveau coûte plus cher que le précédent, et l\'enchantement n\'en consomme qu\'une fraction.',
    drops: [
      'Coût d\'un niveau — 2 × niveau + 7 jusqu\'au niveau 15, puis 5 × niveau − 38 jusqu\'à 30, puis 9 × niveau − 158',
      'Total pour atteindre le niveau 30 — 1 395 points ; pour le niveau 50, plus de 5 000',
      'Enchanter au niveau 30 — cela ne consomme que 3 niveaux et 3 lapis, mais il faut posséder les 30 pour débloquer l\'emplacement',
      'Sources — fondre (le four garde l\'XP jusqu\'à la récupération), miner charbon, redstone, lapis, diamant, émeraude, quartz',
      'Minerais de fer, d\'or et de cuivre — aucune XP à la pioche : elle vient de la fonte du minerai brut',
      'Fiole d\'expérience — 3 à 11 points par fiole : le seul moyen de stocker de l\'XP dans un coffre'
    ],
    note: 'Monter au-delà du niveau 30 n\'apporte rien à la table d\'enchantement : chaque niveau supplémentaire coûte de plus en plus cher pour exactement le même résultat.'
  },
  {
    nom: 'Enclume : la pénalité de travail', cat: 'progression',
    tags: [{ txt: 'Trop coûteux !', cls: 'red' }],
    ou: 'Chaque passage à l\'enclume marque l\'objet. Au bout de quelques opérations, il devient définitivement impossible à modifier en survie.',
    drops: [
      'Pénalité de travail — elle double à chaque passage : 0, 1, 3, 7, 15, 31 niveaux ajoutés au coût',
      'Au-delà de 39 niveaux — « Trop coûteux ! » : l\'objet ne peut plus jamais être modifié en survie',
      'La pénalité compte sur les DEUX objets — celui que l\'on garde et celui que l\'on sacrifie',
      'Ordre optimal — fusionner d\'abord les livres deux à deux, puis appliquer le résultat en une seule opération',
      'Renommer — 1 niveau sur un objet neuf, des dizaines sur un objet déjà travaillé : renommez en premier',
      'Meule — remet la pénalité à zéro, mais efface tous les enchantements sauf les malédictions'
    ],
    note: 'Un outil « trop coûteux » équipé de Raccommodage reste utilisable à vie : seul l\'ajout d\'enchantements devient impossible, jamais la réparation par l\'expérience.'
  },
  {
    nom: 'Difficulté régionale', cat: 'progression',
    tags: [{ txt: 'Caché', cls: 'purple' }],
    ou: 'Une valeur invisible, calculée par chunk, qui monte avec le temps que vous y passez et rend les monstres du coin progressivement plus dangereux.',
    drops: [
      'Elle augmente avec le temps passé dans le chunk, l\'âge du monde et la phase de lune, et suit le réglage de difficulté',
      'Effets concrets — monstres équipés d\'armes et d\'armures, équipement parfois enchanté, renforts des zombies',
      'Une base occupée depuis des centaines de jours voit apparaître des monstres nettement mieux armés qu\'ailleurs',
      'Elle ne change ni le nombre de mobs, ni les tables de butin de base',
      'F3 — l\'écran de débogage affiche la difficulté locale du chunk où vous vous trouvez'
    ],
    note: 'Ce n\'est pas une impression : les monstres deviennent réellement plus coriaces autour d\'une vieille base. Un couloir d\'approche éclairé et une porte en fer y valent mieux qu\'une pièce d\'armure de plus.'
  },
  {
    nom: 'Phantoms et compteur de sommeil', cat: 'progression',
    tags: [{ txt: '3 jours', cls: 'red' }],
    ou: 'Les phantoms ne sont pas un mob de plus : ils sont un rappel programmé, déclenché par un compteur personnel.',
    drops: [
      'Déclenchement — 3 jours de jeu sans dormir, soit 72 000 ticks, environ une heure réelle',
      'Apparition — la nuit, au-dessus de vous, uniquement si le ciel est dégagé',
      'Remise à zéro — dormir… ou mourir',
      'Un simple toit suffit — une plateforme de blocs au-dessus de la tête empêche l\'apparition',
      'Chats — leur présence tient les phantoms à distance',
      'Membrane de phantom — répare l\'élytre à l\'enclume et sert à la potion de Chute lente'
    ],
    note: 'Le compteur est personnel et ne se remet pas à zéro en changeant de dimension : trois jours passés au Nether comptent, et les phantoms attendent simplement votre retour en surface.'
  },

  /* ---------------- TECHNIQUE ---------------- */
  {
    nom: 'Ticks : le rythme du jeu', cat: 'technique',
    tags: [{ txt: '20 ticks/s', cls: 'cyan' }],
    ou: 'Tout le jeu avance par pas de 0,05 seconde. Les circuits de redstone, eux, comptent en pas de 0,1 seconde.',
    drops: [
      'Tick de jeu — 20 par seconde, soit 0,05 seconde : toutes les durées du jeu en sont des multiples',
      'Tick de redstone — 2 ticks de jeu, soit 0,1 seconde : c\'est l\'unité de tous les délais de circuit',
      'Répéteur — réglable de 1 à 4 ticks de redstone, soit 0,1 à 0,4 seconde chacun',
      'Torche de redstone et comparateur — un tick de redstone de retard chacun',
      'Poudre de redstone — portée de 15 blocs, un niveau perdu par bloc : au 16e, il faut un répéteur',
      'TPS — quand le monde a trop à calculer, le serveur descend sous 20 ticks par seconde et tout ralentit, horloges comprises'
    ],
    note: 'Un circuit « qui marche une fois sur deux » est presque toujours un problème de synchronisation d\'un ou deux ticks : ajoutez un répéteur avant de tout redessiner.'
  },
  {
    nom: 'Limite d\'entités (mob cap)', cat: 'technique',
    tags: [{ txt: '≈ 70 hostiles', cls: 'gold' }, { txt: 'Fermes', cls: 'ok' }],
    ou: 'Le jeu plafonne le nombre de créatures existant simultanément autour de vous. Quand le quota est plein, plus rien n\'apparaît nulle part.',
    drops: [
      'Quota hostile — environ 70 monstres par joueur sur les chunks chargés',
      'Quotas séparés — une dizaine d\'animaux, une quinzaine de créatures d\'ambiance, quelques créatures aquatiques',
      'Grottes voisines — chaque monstre qui traîne dans une grotte non éclairée vole une place à votre ferme',
      'Objets au sol, wagonnets, cadres — ils ne comptent pas dans le quota mais font chuter les performances bien avant lui',
      'En mer — au-dessus de l\'océan, il n\'y a presque aucune surface d\'apparition concurrente : c\'est là que les tours à mobs rendent le plus'
    ],
    note: 'Une ferme à mobs qui ne produit rien n\'est presque jamais mal construite : c\'est le quota, déjà rempli par les grottes alentour. Éclairez, murez, ou construisez au-dessus de l\'océan.'
  },
  {
    nom: 'Chunks, simulation et chargement', cat: 'technique',
    tags: [{ txt: '16 × 16', cls: '' }],
    ou: 'Le monde est découpé en colonnes de 16 × 16 blocs. Seules celles qui sont simulées font tourner quoi que ce soit.',
    drops: [
      'Un chunk — 16 × 16 blocs sur toute la hauteur du monde, de −64 à 320 dans l\'Overworld',
      'Affichage ≠ simulation — seule la distance de simulation fait tourner mobs, cultures, fours et redstone',
      'Hors simulation — tout est figé : les fours ne cuisent pas, les cultures ne poussent pas, les objets au sol ne disparaissent pas',
      'Chunks du spawn — une zone autour du point d\'apparition du monde reste chargée en permanence, même quand vous êtes ailleurs',
      'F3 + G — affiche les limites de chunks, indispensable pour aligner une ferme ou un stockage'
    ],
    note: 'Toute machine censée tourner « en votre absence » doit être placée dans les chunks du spawn, sinon vous devez rester à portée. En survie vanilla, il n\'y a pas de troisième option.'
  },
  {
    nom: 'Le hasard des tirages de butin', cat: 'technique',
    tags: [{ txt: 'Tables de butin', cls: 'purple' }],
    ou: 'Coffres, mobs et pêche tirent dans des listes pondérées. Comprendre quand le tirage a lieu évite beaucoup de temps perdu.',
    drops: [
      'Table de butin — chaque source tire dans une liste pondérée, pas dans une probabilité unique par objet',
      'Coffres de structure — le contenu dépend de la position et de la graine du monde : recharger une sauvegarde redonne exactement le même coffre',
      'Butin III — un objet possible de plus par niveau sur les drops courants, et quelques points de pourcentage sur les rares',
      'Coup porté par le joueur — sans un coup de votre part juste avant la mort du mob, ni expérience ni drops rares',
      'Le hasard n\'a pas de mémoire — dix échecs d\'affilée ne rapprochent en rien du onzième essai'
    ],
    note: 'Dans une ferme, tuer les mobs par la chute seule supprime l\'expérience et les drops d\'équipement : réglez la hauteur pour les laisser à un demi-cœur et donnez vous-même le dernier coup.'
  }
];

/* ============================================================
   Repères chiffrés — les constantes à connaître par cœur
   ============================================================ */
var REPERES_CHIFFRES = [
  ['Tick de jeu', '20 par seconde (0,05 s)', 'Toutes les durées du jeu sont des multiples de cette valeur'],
  ['Tick de redstone', '2 ticks de jeu (0,1 s)', 'Un répéteur ajoute de 0,1 à 0,4 s : c\'est l\'unité de tout circuit'],
  ['Journée complète', '24 000 ticks = 20 minutes', '10 minutes de plein jour, environ 7 minutes de nuit noire'],
  ['Portée de la poudre de redstone', '15 blocs', 'Au 16e bloc, le signal est mort : il faut un répéteur'],
  ['Barre de faim', '20 points (10 cuisses)', 'En dessous de 18, plus aucune régénération naturelle'],
  ['Dégâts de chute', '1 point par bloc au-delà de 3', '23 blocs tuent un joueur en pleine santé sans armure'],
  ['Réserve d\'air', '10 bulles = 15 secondes', 'Ensuite, environ 1 cœur par seconde, l\'armure n\'y peut rien'],
  ['Armure maximale', '20 points = 80 % de réduction', 'Diamant et netherite plafonnent tous les deux à cette valeur'],
  ['Invincibilité après un coup', '10 ticks (0,5 s)', 'Frapper plus vite que ça ne sert strictement à rien'],
  ['Cadence de l\'épée', '1,6 attaque par seconde (0,625 s)', 'Une attaque à mi-jauge n\'inflige qu\'environ 40 % des dégâts'],
  ['Coup critique', '+50 % de dégâts', 'Il faut retomber et surtout ne pas sprinter'],
  ['Amorçage d\'un creeper', 'Environ 1,5 seconde', 'Le temps d\'un coup en sprint pour l\'éjecter, ou de reculer de 4 blocs'],
  ['Apparition des monstres', 'Lumière de bloc 0', 'Depuis la 1.18, une seule torche condamne toute la zone qu\'elle éclaire'],
  ['Portée d\'une torche', 'Niveau 14, −1 par bloc', 'Un maillage tous les 8 à 10 blocs ne laisse aucun bloc dans le noir'],
  ['Couronne d\'apparition', 'De 24 à 128 blocs du joueur', 'Une ferme doit être à plus de 24 blocs du poste d\'attente'],
  ['Disparition automatique', 'Immédiate au-delà de 128 blocs', 'Aléatoire entre 32 et 128 blocs, jamais en dessous de 32'],
  ['Quota de monstres', 'Environ 70 par joueur', 'Les grottes voisines remplissent le quota à la place de votre ferme'],
  ['Objets au sol après la mort', '5 minutes', 'Le compteur est figé tant que le chunk n\'est pas chargé'],
  ['Expérience perdue à la mort', '7 points par niveau, maximum 100', 'On ne récupère jamais plus de 7 niveaux environ'],
  ['Niveau 30', '1 395 points d\'expérience', 'Le palier d\'enchantement : enchanter plus bas gâche les emplacements'],
  ['Plafond de l\'enclume', '40 niveaux = « Trop coûteux ! »', 'La pénalité de travail double à chaque passage : 0, 1, 3, 7, 15, 31'],
  ['Écoulement des fluides', 'Eau 7 blocs, lave 3 blocs (7 au Nether)', 'Un canal se conçoit par tronçons de 8 blocs ; une coulée de lave traverse une pièce'],
  ['Hydratation d\'un champ', 'Eau à 4 blocs ou moins', 'Un seul trou d\'eau irrigue un carré de 9 × 9'],
  ['Phantoms', 'Après 3 jours sans dormir', 'Dormir ou mourir remet le compteur à zéro ; un toit suffit à les bloquer']
];

/* ============================================================
   Erreurs courantes — ce qui coûte du temps sans qu'on le voie
   ============================================================ */
var ERREURS_COURANTES = [
  ['Cliquer le plus vite possible en combat',
   'La jauge d\'attaque n\'est jamais rechargée : chaque coup n\'inflige qu\'une fraction des dégâts',
   'Frapper au rythme de l\'arme, jauge pleine (0,625 s à l\'épée), indicateur d\'attaque activé'],
  ['Sprinter en frappant',
   'Le sprint annule le coup critique et projette la cible hors de portée',
   'Approcher en marchant, sauter, frapper en retombant ; garder le sprint pour repousser un creeper'],
  ['Manger du pain ou des pommes de terre avant un combat',
   'Faible saturation : la barre redescend vite et la régénération rapide s\'arrête',
   'Steak, côtelette cuite ou carotte dorée, jusqu\'à 20/20 avant d\'engager'],
  ['Creuser droit vers le bas',
   'Lave, ravin ou chute de plusieurs dizaines de blocs sans aucun avertissement',
   'Creuser en escalier, ou deux blocs en quinconce en descendant dans l\'un puis l\'autre'],
  ['Partir en expédition sans poser de lit',
   'Chaque mort renvoie au point d\'apparition du monde, et les objets ne restent que 5 minutes',
   'Poser un lit et cliquer dessus à chaque avancée majeure, même sans dormir'],
  ['Éclairer une grotte « à peu près »',
   'Il suffit d\'un seul bloc à lumière 0 pour que les monstres reviennent en continu',
   'Un maillage régulier de torches tous les 8 à 10 blocs, ou des blocs sur lesquels rien n\'apparaît'],
  ['Construire une ferme à mobs sans traiter les grottes autour',
   'Le quota d\'environ 70 monstres est déjà rempli par les grottes : la ferme ne produit rien',
   'Éclairer ou murer les cavités proches, ou bâtir la tour au-dessus de l\'océan'],
  ['Placer la salle d\'apparition trop près du poste d\'attente',
   'Rien n\'apparaît à moins de 24 blocs du joueur, quelle que soit la qualité du plan',
   'Poste d\'attente à plus de 24 blocs de la plateforme, et tout le mécanisme dans les 128 blocs'],
  ['Enchanter en dessous du niveau 30',
   'Les résultats sont bien plus faibles alors que le coût réel reste de 3 niveaux et 3 lapis',
   'Attendre le niveau 30, et utiliser les niveaux 1 et 2 uniquement pour vider un mauvais emplacement'],
  ['Appliquer les livres un par un sur l\'outil',
   'La pénalité de travail double à chaque passage : l\'objet devient « Trop coûteux » très vite',
   'Fusionner les livres entre eux deux à deux, puis appliquer le résultat en une seule opération'],
  ['Compter sur l\'armure contre tout',
   'Elle ne fait rien contre la faim, la noyade, l\'asphyxie, le vide ni les dégâts magiques',
   'Prévoir la parade adaptée : nourriture, Respiration, Chute amortie, Résistance au feu'],
  ['Laisser une ferme automatique loin de soi',
   'Hors distance de simulation, rien ne tourne : ni fours, ni cultures, ni redstone',
   'Construire dans les chunks du spawn, ou rester à portée pendant que la machine travaille'],
  ['Recharger une sauvegarde pour améliorer le contenu d\'un coffre',
   'Le tirage dépend de la position et de la graine du monde : le coffre redonnera exactement la même chose',
   'Chercher un autre coffre ou une autre structure ; le hasard n\'a pas de mémoire'],
  ['Tuer les mobs d\'une ferme uniquement par la chute',
   'Sans coup du joueur, pas d\'expérience ni de drops rares ou d\'équipement',
   'Régler la hauteur pour les laisser à un demi-cœur et donner soi-même le dernier coup, épée Butin III en main'],
  ['Poser un toit ou une poutre en bois juste au-dessus d\'un foyer',
   'Le feu se propage bien plus loin vers le haut que sur les côtés',
   'Feu de camp plutôt que feu libre, coupe-feu en pierre, et jamais de seau de lave sur un plancher en bois'],
  ['Sauter sur ses propres champs',
   'La retombée piétine la terre labourée et arrache les pousses',
   'Prévoir un chemin en dalles ou en blocs pleins entre les rangs, et récolter en marchant']
];
