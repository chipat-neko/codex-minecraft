/* ============================================================
   Données : recettes d'artisanat
   Chaque recette : grille de caractères + légende caractère → item.
   ============================================================ */

/* Items complémentaires utilisés uniquement dans les recettes */
(function (extra) {
  for (var k in extra) { if (extra.hasOwnProperty(k)) { ITEMS[k] = extra[k]; } }
}({
  pepite:     { n: 'Pépite d\'or',            c: '#f5d67a', t: 'PÉ' },
  lait:       { n: 'Seau de lait',            c: '#eef2f5', t: 'LT' },
  melon:      { n: 'Tranche de melon',        c: '#5fae3a', t: 'ME' },
  carotte:    { n: 'Carotte',                 c: '#e08322', t: 'CO' },
  cacao:      { n: 'Fève de cacao',           c: '#7a4426', t: 'FC' },
  dalle:      { n: 'Dalle (bois ou pierre)',  c: '#a08f70', t: 'DA' },
  bibli:      { n: 'Bibliothèque',            c: '#8a6a3e', t: 'BI' },
  four:       { n: 'Fourneau',                c: '#6f6f6f', t: 'FO' },
  etabli:     { n: 'Établi',                  c: '#a9743f', t: 'ÉT' },
  dropper:    { n: 'Distributeur (dropper)',  c: '#5a5a5a', t: 'DR' },
  arc:        { n: 'Arc',                     c: '#a9743f', t: 'AC' },
  coffre:     { n: 'Coffre',                  c: '#8a5f2a', t: 'CF' },
  plaque:     { n: 'Plaque de pression',      c: '#8e8e8e', t: 'PP' },
  piston:     { n: 'Piston',                  c: '#b79a6a', t: 'PS' },
  torche:     { n: 'Torche',                  c: '#ffd257', t: 'TO' },
  torcheR:    { n: 'Torche de redstone',      c: '#ff5f4d', t: 'TR' },
  pierreL:    { n: 'Pierre lisse',            c: '#9a9a9a', t: 'PL' },
  etoile:     { n: 'Étoile du Nether',        c: '#f2f2e0', t: 'ÉN' },
  scrap:      { n: 'Éclat de netherite',      c: '#6b5b52', t: 'ÉC' },
  gravier:    { n: 'Gravier',                 c: '#9a9088', t: 'GR' },
  colorant:   { n: 'Colorant (au choix)',     c: '#c05ab8', t: 'CL' },
  debris:     { n: 'Débris antique',          c: '#4a3f38', t: 'DB' },
  fleur:      { n: 'Fleur',                   c: '#e05a8a', t: 'FR' },
  argileB:    { n: 'Bloc de terre cuite',     c: '#a3603f', t: 'TC' },
  chaine:     { n: 'Chaîne',                  c: '#5a5a62', t: 'CN' },
  livreEnc:   { n: 'Livre',                   c: '#a8763c', t: 'LI' },
  outil:      { n: 'Matériau (bois, pierre, cuivre, fer, or ou diamant)', c: '#7f8c9b', t: 'MA' },
  armeD:      { n: 'Équipement en diamant',   c: '#4fd6e0', t: 'DI' },
  modele:     { n: 'Modèle d\'amélioration',  c: '#c9c2b8', t: 'MO' },
  chorus:     { n: 'Fruit du chorus cuit',    c: '#8a5aa0', t: 'CH' },
  tige:       { n: 'Tige de Breeze',          c: '#a8d8e8', t: 'TB' },
  lourd:      { n: 'Cœur alourdi (heavy core)', c: '#3a4450', t: 'CA' },
  tnt:        { n: 'TNT',                     c: '#c8382c', t: 'TN' },
  seau:       { n: 'Seau',                    c: '#c8c8c8', t: 'SE' },
  oeil:       { n: 'Œil de l\'Ender',         c: '#1c9a7e', t: 'ŒE' },
  carapace:   { n: 'Carapace de shulker',     c: '#9a6ab0', t: 'CS' },
  glowstone:  { n: 'Pierre lumineuse',        c: '#e8c46a', t: 'PM' },
  poudreLum:  { n: 'Poudre lumineuse',        c: '#f0dca0', t: 'PL' },
  tesson:     { n: 'Tesson de poterie',       c: '#b0714e', t: 'TP' },
  foin:       { n: 'Bloc de foin',            c: '#c8a83c', t: 'FN' },
  encreLum:   { n: 'Sac d\'encre luisant',    c: '#4fd6c0', t: 'EL' },
  torcheA:    { n: 'Torche des âmes',         c: '#4fd6e0', t: 'TÂ' },
  bloc:       { n: 'Bloc au choix (pierre, bois, grès…)', c: '#7f8c9b', t: 'BL' },
  dalleP:     { n: 'Dalle de pierre lisse',   c: '#9a9a9a', t: 'DP' },
  boussole:   { n: 'Boussole',                c: '#c05050', t: 'BS' },
  cadre:      { n: 'Cadre d\'objet',          c: '#a9743f', t: 'CA' },
  fleurR:     { n: 'Fleur (coquelicot, rose…)', c: '#d43a3a', t: 'FL' },
  charbonB:   { n: 'Bloc de charbon',         c: '#1c1c20', t: 'BC' },
  ressource:  { n: 'Ressource (fer, or, diamant…)', c: '#c8c8c8', t: 'RE' },
  banniere:   { n: 'Bannière',                c: '#8c2b2b', t: 'BN' },
  bouclier:   { n: 'Bouclier',                c: '#7a6a4a', t: 'BO' },
  citrouilleB:{ n: 'Citrouille (entière)',    c: '#d97a20', t: 'CI' },
  disque:     { n: 'Disque de musique',       c: '#2a2a30', t: 'DM' },
  lapinC:     { n: 'Lapin cuit',              c: '#b06a4a', t: 'LC' },
  patate:     { n: 'Pomme de terre cuite',    c: '#d0a860', t: 'PT' },
  pepiteFer:  { n: 'Pépite de fer',           c: '#d8d8d8', t: 'PF' },
  wagonnet:   { n: 'Wagonnet',                c: '#6a6a72', t: 'WG' },
  etiquette:  { n: 'Étiquette',               c: '#c8c0a8', t: 'ÉT' },
  lance:      { n: 'Lance',                   c: '#9a8a6a', t: 'LA' }
}));

var RECETTES = [

  /* =========== BASE / SURVIE IMMÉDIATE =========== */
  {
    nom: 'Planches', cat: 'base', station: 'Inventaire 2×2', qte: 4,
    sortie: 'Planches', sortieItem: 'planche',
    grille: ['B'], legende: { B: 'bois' },
    desc: '1 bûche de n\'importe quelle essence donne 4 planches de la même essence. Le tout premier craft de chaque partie.'
  },
  {
    nom: 'Bâton', cat: 'base', station: 'Inventaire 2×2', qte: 4,
    sortie: 'Bâton', sortieItem: 'baton',
    grille: ['P', 'P'], legende: { P: 'planche' },
    desc: '2 bambous donnent aussi 1 bâton : utile si vous êtes en jungle sans arbre à portée.'
  },
  {
    nom: 'Établi', cat: 'base', station: 'Inventaire 2×2', qte: 1,
    sortie: 'Établi', sortieItem: 'etabli',
    grille: ['PP', 'PP'], legende: { P: 'planche' },
    desc: 'Débloque la grille 3×3. À poser dans la base ET à emporter dans le sac pour crafter en expédition.'
  },
  {
    nom: 'Fourneau', cat: 'base', qte: 1,
    sortie: 'Fourneau', sortieItem: 'four',
    grille: ['CCC', 'C C', 'CCC'], legende: { C: 'cobble' },
    desc: 'Fait fondre minerais bruts, cuit la nourriture, transforme le sable en verre. 8 pierres suffisent.'
  },
  {
    nom: 'Coffre', cat: 'base', qte: 1,
    sortie: 'Coffre', sortieItem: 'coffre',
    grille: ['PPP', 'P P', 'PPP'], legende: { P: 'planche' },
    desc: 'Deux coffres côte à côte fusionnent en grand coffre (54 emplacements), sauf si un chat dort dessus.'
  },
  {
    nom: 'Torche', cat: 'base', qte: 4,
    sortie: 'Torche', sortieItem: 'torche',
    grille: ['C', 'B'], legende: { C: 'charbon', B: 'baton' },
    desc: 'Le charbon de bois (bûche cuite au four) marche aussi et se renouvelle sans miner.'
  },
  {
    nom: 'Lit', cat: 'base', qte: 1,
    sortie: 'Lit',
    grille: ['LLL', 'PPP'], legende: { L: 'laine', P: 'planche' },
    desc: 'Fixe votre point de réapparition et passe la nuit. ATTENTION : un lit explose dans le Nether et dans l\'End (astuce pour miner les débris antiques).'
  },
  {
    nom: 'Porte en bois', cat: 'base', qte: 3,
    sortie: 'Porte en bois',
    grille: ['PP', 'PP', 'PP'], legende: { P: 'planche' },
    desc: 'Les zombies enfoncent les portes en bois en Difficile. En base exposée, utilisez une porte en fer + plaque de pression.'
  },
  {
    nom: 'Échelle', cat: 'base', qte: 3,
    sortie: 'Échelle',
    grille: ['B B', 'BBB', 'B B'], legende: { B: 'baton' },
    desc: 'Le moyen le moins cher de monter/descendre. Les échelles annulent les dégâts de chute si vous vous y accrochez.'
  },
  {
    nom: 'Seau', cat: 'base', qte: 1,
    sortie: 'Seau', sortieItem: 'seau',
    grille: ['F F', ' F '], legende: { F: 'fer' },
    desc: 'Un seau d\'eau annule toute chute (MLG bucket), éteint le feu et crée des sources infinies (2 sources en diagonale).'
  },
  {
    nom: 'Cisaille', cat: 'base', qte: 1,
    sortie: 'Cisaille',
    grille: [' F', 'F '], legende: { F: 'fer' },
    desc: 'Tond les moutons sans les tuer, récolte feuilles/toiles/lianes intactes et récupère les rayons de miel.'
  },
  {
    nom: 'Briquet', cat: 'base', qte: 1,
    sortie: 'Briquet',
    grille: ['F ', ' S'], legende: { F: 'fer', S: 'silex' },
    desc: 'Allume les portails du Nether, le TNT et les feux de camp. Le silex vient du gravier (10 % de chance).'
  },
  {
    nom: 'Bateau', cat: 'base', qte: 1,
    sortie: 'Bateau',
    grille: ['P P', 'PPP'], legende: { P: 'planche' },
    desc: 'Ajoutez un coffre au bateau pour un bateau-coffre. En bateau, on ne subit ni la fatigue ni les mobs marins.'
  },

  /* =========== OUTILS =========== */
  {
    nom: 'Pioche', cat: 'outil', qte: 1,
    sortie: 'Pioche', tagCls: 'ok',
    grille: ['MMM', ' B ', ' B '], legende: { M: 'outil', B: 'baton' },
    desc: 'Remplacez M par : planches, pierre, lingot de CUIVRE, lingot de fer, lingot d\'or ou diamant. Progression : bois → pierre → cuivre → fer → diamant → netherite.'
  },
  {
    nom: 'Hache', cat: 'outil', qte: 1,
    sortie: 'Hache',
    grille: ['MM ', 'MB ', ' B '], legende: { M: 'outil', B: 'baton' },
    desc: 'Meilleure arme en dégâts bruts, mais plus lente que l\'épée. Elle brise aussi les boucliers pendant 5 secondes.'
  },
  {
    nom: 'Pelle', cat: 'outil', qte: 1,
    sortie: 'Pelle',
    grille: [' M ', ' B ', ' B '], legende: { M: 'outil', B: 'baton' },
    desc: 'Crée aussi les chemins de terre (clic droit sur l\'herbe) : idéal pour tracer les allées d\'un village.'
  },
  {
    nom: 'Houe', cat: 'outil', qte: 1,
    sortie: 'Houe',
    grille: ['MM ', ' B ', ' B '], legende: { M: 'outil', B: 'baton' },
    desc: 'Laboure la terre et récolte plus vite les cultures. En netherite avec Fortune, c\'est l\'outil de récolte définitif.'
  },
  {
    nom: 'Épée', cat: 'outil', qte: 1,
    sortie: 'Épée',
    grille: [' M ', ' M ', ' B '], legende: { M: 'outil', B: 'baton' },
    desc: 'Coup balayant (sprint désactivé + attaque chargée) : touche tous les mobs adjacents. Base de toute ferme manuelle.'
  },
  {
    nom: 'Arc', cat: 'outil', qte: 1,
    sortie: 'Arc', sortieItem: 'arc',
    grille: [' BF', 'B F', ' BF'], legende: { B: 'baton', F: 'ficelle' },
    desc: '3 bâtons en diagonale + 3 ficelles alignées à droite. Enchantez Infinité + Puissance pour un arc éternel.'
  },
  {
    nom: 'Flèche', cat: 'outil', qte: 4,
    sortie: 'Flèche', sortieItem: 'fleche',
    grille: [' S ', ' B ', ' P '], legende: { S: 'silex', B: 'baton', P: 'plume' },
    desc: 'Une ferme à squelettes rend ce craft inutile : elle produit directement des flèches par milliers.'
  },
  {
    nom: 'Lance (spear)', cat: 'outil', qte: 1,
    sortie: 'Lance', sortieItem: 'lance', tagCls: 'cyan',
    grille: ['  M', ' B ', 'B  '], legende: { M: 'outil', B: 'baton' },
    desc: 'Arme d\'hast à longue portée, déclinée dans tous les matériaux (bois à diamant), et améliorable en netherite à la table de forge. Elle frappe plus loin que l\'épée mais plus lentement.'
  },
  {
    nom: 'Étiquette (name tag)', cat: 'outil', qte: 1,
    sortie: 'Étiquette', sortieItem: 'etiquette', tagCls: 'gold',
    grille: [' P', 'A '], legende: { P: 'pepiteFer', A: 'papier' },
    desc: 'Désormais FABRICABLE : 1 papier + 1 pépite de métal en diagonale. Il fallait auparavant la pêcher ou la trouver en coffre. Nommez un mob à l\'enclume pour qu\'il ne disparaisse jamais.'
  },
  {
    nom: 'Bouclier', cat: 'outil', qte: 1,
    sortie: 'Bouclier',
    grille: ['PFP', 'PPP', ' P '], legende: { P: 'planche', F: 'fer' },
    desc: 'Bloque 100 % des dégâts de face, y compris les flèches et les explosions de creeper. À tenir en main secondaire (F).'
  },
  {
    nom: 'Canne à pêche', cat: 'outil', qte: 1,
    sortie: 'Canne à pêche',
    grille: ['  B', ' BF', 'B F'], legende: { B: 'baton', F: 'ficelle' },
    desc: 'Avec Chance de la mer III + Appât III : la pêche devient une source d\'objets enchantés, de selles et de noms de disques.'
  },
  {
    nom: 'Longue-vue', cat: 'outil', qte: 1,
    sortie: 'Longue-vue',
    grille: [' A ', ' C ', ' C '], legende: { A: 'amethyste', C: 'cuivre' },
    desc: 'Zoom ×10. Indispensable pour repérer un manoir, une cité de l\'End ou une structure de loin sans se déplacer.'
  },
  {
    nom: 'Brosse (archéologie)', cat: 'outil', qte: 1,
    sortie: 'Brosse',
    grille: [' U ', ' C ', ' B '], legende: { U: 'plume', C: 'cuivre', B: 'baton' },
    desc: 'Balaie le sable/gravier suspect des ruines de sentier et des sites de fouille : tessons de poterie, œufs de sniffer.'
  },

  /* =========== ARMURES =========== */
  {
    nom: 'Casque', cat: 'armure', qte: 1,
    sortie: 'Casque',
    grille: ['MMM', 'M M'], legende: { M: 'outil' },
    desc: '5 unités de matériau. Enchantez Respiration + Affinité aquatique pour les chantiers sous-marins.'
  },
  {
    nom: 'Plastron', cat: 'armure', qte: 1,
    sortie: 'Plastron',
    grille: ['M M', 'MMM', 'MMM'], legende: { M: 'outil' },
    desc: '8 unités : la pièce la plus chère et la plus protectrice. À prioriser si vos ressources sont limitées.'
  },
  {
    nom: 'Jambières', cat: 'armure', qte: 1,
    sortie: 'Jambières',
    grille: ['MMM', 'M M', 'M M'], legende: { M: 'outil' },
    desc: '7 unités. Deuxième priorité de protection après le plastron.'
  },
  {
    nom: 'Bottes', cat: 'armure', qte: 1,
    sortie: 'Bottes',
    grille: ['M M', 'M M'], legende: { M: 'outil' },
    desc: '4 unités. Chute amortie IV supprime quasiment tous les dégâts de chute : le meilleur enchantement de confort du jeu.'
  },
  {
    nom: 'Amélioration en netherite', cat: 'armure', station: 'Table de forge', qte: 1,
    sortie: 'Équipement en netherite', tagCls: 'purple',
    grille: ['MDN'], legende: { M: 'modele', D: 'armeD', N: 'netherite' },
    desc: 'Table de forge : modèle d\'amélioration netherite (trouvé en bastion) + équipement en diamant + 1 lingot de netherite. L\'objet garde ses enchantements et flotte sur la lave.'
  },
  {
    nom: 'Lingot de netherite', cat: 'armure', qte: 1,
    sortie: 'Lingot de netherite', sortieItem: 'netherite', tagCls: 'purple',
    grille: ['SSS', 'SOO', 'OO '], legende: { S: 'scrap', O: 'or' },
    desc: '4 éclats de netherite (débris antiques fondus) + 4 lingots d\'or, dans n\'importe quelle disposition. Comptez ~4 débris par lingot.'
  },

  /* =========== REDSTONE / MÉCANISMES =========== */
  {
    nom: 'Torche de redstone', cat: 'redstone', qte: 1,
    sortie: 'Torche de redstone', sortieItem: 'torcheR', tagCls: 'red',
    grille: ['R', 'B'], legende: { R: 'redstone', B: 'baton' },
    desc: 'Source d\'énergie permanente et inverseur logique (NON) : c\'est le composant fondamental de toute la logique redstone.'
  },
  {
    nom: 'Répéteur', cat: 'redstone', qte: 1,
    sortie: 'Répéteur', tagCls: 'red',
    grille: ['TRT', 'PPP'], legende: { T: 'torcheR', R: 'redstone', P: 'pierre' },
    desc: 'Régénère le signal à 15, impose un sens unique et ajoute 1 à 4 ticks de délai (clic droit). Verrouillable par un signal latéral.'
  },
  {
    nom: 'Comparateur', cat: 'redstone', qte: 1,
    sortie: 'Comparateur', tagCls: 'red',
    grille: [' T ', 'TQT', 'PPP'], legende: { T: 'torcheR', Q: 'quartz', P: 'pierre' },
    desc: 'Lit le remplissage d\'un conteneur (coffre, entonnoir, four) et compare deux signaux. Cœur des trieurs automatiques et des horloges.'
  },
  {
    nom: 'Piston', cat: 'redstone', qte: 1,
    sortie: 'Piston', sortieItem: 'piston', tagCls: 'red',
    grille: ['PPP', 'CFC', 'CRC'], legende: { P: 'planche', C: 'cobble', F: 'fer', R: 'redstone' },
    desc: 'Pousse jusqu\'à 12 blocs. Certains blocs (obsidienne, coffres, établis) ne peuvent pas être poussés.'
  },
  {
    nom: 'Piston collant', cat: 'redstone', qte: 1,
    sortie: 'Piston collant', tagCls: 'red',
    grille: ['S', 'P'], legende: { S: 'slime', P: 'piston' },
    desc: 'Ramène le bloc poussé. Une boule de miel fonctionne aussi… mais miel et slime ne collent pas entre eux : la base des machines volantes.'
  },
  {
    nom: 'Observateur', cat: 'redstone', qte: 1,
    sortie: 'Observateur', tagCls: 'red',
    grille: ['CCC', 'RRQ', 'CCC'], legende: { C: 'cobble', R: 'redstone', Q: 'quartz' },
    desc: 'Émet une impulsion d\'1 tick quand le bloc devant lui change d\'état. Détecteur universel : cultures, pistons, portes, eau.'
  },
  {
    nom: 'Entonnoir (hopper)', cat: 'redstone', qte: 1,
    sortie: 'Entonnoir', tagCls: 'red',
    grille: ['F F', 'FCF', ' F '], legende: { F: 'fer', C: 'coffre' },
    desc: 'Aspire les objets au-dessus et transfère vers le conteneur qu\'il vise. Un signal de redstone le DÉSACTIVE (logique inversée).'
  },
  {
    nom: 'Distributeur (dispenser)', cat: 'redstone', qte: 1,
    sortie: 'Distributeur', tagCls: 'red',
    grille: ['CCC', 'CAC', 'CRC'], legende: { C: 'cobble', A: 'arc', R: 'redstone' },
    desc: 'Utilise l\'objet (tire une flèche, verse un seau, plante un plant, tond un mouton). Le cœur des fermes automatisées.'
  },
  {
    nom: 'Lanceur (dropper)', cat: 'redstone', qte: 1,
    sortie: 'Lanceur (dropper)', sortieItem: 'dropper', tagCls: 'red',
    grille: ['CCC', 'C C', 'CRC'], legende: { C: 'cobble', R: 'redstone' },
    desc: 'Éjecte simplement l\'objet, sans l\'utiliser. Chaîné, il transporte des objets vers le haut — l\'inverse d\'un entonnoir.'
  },
  {
    nom: 'Fabricateur (crafter)', cat: 'redstone', qte: 1,
    sortie: 'Fabricateur', tagCls: 'red',
    grille: ['FFF', 'FYF', 'RDR'], legende: { F: 'fer', Y: 'etabli', R: 'redstone', D: 'dropper' },
    desc: 'Craft automatiquement dès qu\'il reçoit un signal de redstone : permet des usines de blocs, de flèches, de pains entièrement automatiques.'
  },
  {
    nom: 'Rails', cat: 'redstone', qte: 16,
    sortie: 'Rails',
    grille: ['F F', 'FBF', 'F F'], legende: { F: 'fer', B: 'baton' },
    desc: '6 lingots + 1 bâton pour 16 rails. Les mines abandonnées en fournissent gratuitement des centaines.'
  },
  {
    nom: 'Rail motorisé', cat: 'redstone', qte: 6,
    sortie: 'Rail motorisé',
    grille: ['O O', 'OBO', 'ORO'], legende: { O: 'or', B: 'baton', R: 'redstone' },
    desc: 'Alimenté, il accélère ; non alimenté, il freine. Un rail motorisé tous les 8 rails suffit sur du plat.'
  },
  {
    nom: 'TNT', cat: 'redstone', qte: 1,
    sortie: 'TNT', sortieItem: 'tnt', tagCls: 'red',
    grille: ['PSP', 'SPS', 'PSP'], legende: { P: 'poudre', S: 'sable' },
    desc: '5 poudres à canon + 4 sables. Le sable rouge marche aussi. Base des canons, des fermes à arbres et du minage de débris antiques.'
  },
  {
    nom: 'Plaque de pression', cat: 'redstone', qte: 1,
    sortie: 'Plaque de pression', sortieItem: 'plaque',
    grille: ['MM'], legende: { M: 'pierre' },
    desc: 'En pierre : joueurs et mobs. En bois : tout, y compris les objets au sol. En or/fer : plaques « pesantes », signal proportionnel au nombre d\'entités.'
  },
  {
    nom: 'Levier', cat: 'redstone', qte: 1,
    sortie: 'Levier',
    grille: ['B', 'C'], legende: { B: 'baton', C: 'cobble' },
    desc: 'Le seul interrupteur qui garde son état indéfiniment. À privilégier pour couper une ferme.'
  },

  /* =========== POSTES DE TRAVAIL =========== */
  {
    nom: 'Table d\'enchantement', cat: 'station', qte: 1,
    sortie: 'Table d\'enchantement', tagCls: 'purple',
    grille: [' L ', 'DOD', 'OOO'], legende: { L: 'livre', D: 'diamant', O: 'obsi' },
    desc: 'Entourée de 15 bibliothèques à 2 blocs de distance (avec 1 bloc d\'air entre), elle atteint le niveau 30.'
  },
  {
    nom: 'Bibliothèque', cat: 'station', qte: 1,
    sortie: 'Bibliothèque', sortieItem: 'bibli',
    grille: ['PPP', 'LLL', 'PPP'], legende: { P: 'planche', L: 'livre' },
    desc: '3 livres + 6 planches. Il en faut 15 autour de la table d\'enchantement : prévoyez 45 livres, donc 45 cuirs et 135 papiers.'
  },
  {
    nom: 'Enclume', cat: 'station', qte: 1,
    sortie: 'Enclume', tagCls: 'gold',
    grille: ['III', ' F ', 'FFF'], legende: { I: 'ferB', F: 'fer' },
    desc: '31 lingots de fer au total. Combine deux objets, applique un livre enchanté, répare et renomme. Elle s\'use : gardez-en une de rechange.'
  },
  {
    nom: 'Meule (grindstone)', cat: 'station', qte: 1,
    sortie: 'Meule',
    grille: ['BSB', 'P P'], legende: { B: 'baton', S: 'dalle', P: 'planche' },
    desc: 'Retire les enchantements d\'un objet et RÉCUPÈRE l\'XP. Idéal pour recycler l\'équipement d\'une ferme à mobs.'
  },
  {
    nom: 'Alambic', cat: 'station', qte: 1,
    sortie: 'Alambic', tagCls: 'purple',
    grille: [' Z ', 'CCC'], legende: { Z: 'blaze', C: 'cobble' },
    desc: '1 bâton de Blaze + 3 pierres. Le bâton reste dans l\'alambic comme carburant : 1 bâton = 20 brassages.'
  },
  {
    nom: 'Chaudron', cat: 'station', qte: 1,
    sortie: 'Chaudron',
    grille: ['F F', 'F F', 'FFF'], legende: { F: 'fer' },
    desc: 'Stocke eau, lave ou poudre de neige. Sous un bloc de stalactite, il se remplit tout seul : source d\'eau et de lave renouvelable.'
  },
  {
    nom: 'Balise (beacon)', cat: 'station', qte: 1,
    sortie: 'Balise', tagCls: 'purple',
    grille: ['GGG', 'GEG', 'OOO'], legende: { G: 'verre', E: 'etoile', O: 'obsi' },
    desc: 'Sur une pyramide de 9/34/83/164 blocs (fer, or, diamant, émeraude ou netherite) : Célérité, Hâte, Résistance, Saut, Force sur un large rayon.'
  },
  {
    nom: 'Haut fourneau', cat: 'station', qte: 1,
    sortie: 'Haut fourneau',
    grille: ['FFF', 'FUF', 'LLL'], legende: { F: 'fer', U: 'four', L: 'pierreL' },
    desc: 'Fond minerais et équipements deux fois plus vite qu\'un four (mais donne moitié moins d\'XP). Métier : armurier.'
  },
  {
    nom: 'Fumoir', cat: 'station', qte: 1,
    sortie: 'Fumoir',
    grille: [' O ', 'OUO', ' O '], legende: { O: 'bois', U: 'four' },
    desc: 'Cuit la nourriture deux fois plus vite. Métier : boucher. Indispensable à côté d\'une ferme à animaux.'
  },
  {
    nom: 'Table de forge (smithing)', cat: 'station', qte: 1,
    sortie: 'Table de forge',
    grille: ['FF', 'PP', 'PP'], legende: { F: 'fer', P: 'planche' },
    desc: 'Applique les améliorations netherite et les ornements d\'armure (armor trims). Métier : armurier d\'outils.'
  },
  {
    nom: 'Métier à tisser (loom)', cat: 'station', qte: 1,
    sortie: 'Métier à tisser',
    grille: ['FF', 'PP'], legende: { F: 'ficelle', P: 'planche' },
    desc: 'Applique les motifs de bannière sans consommer la grille 3×3. Métier : berger.'
  },
  {
    nom: 'Table de cartographie', cat: 'station', qte: 1,
    sortie: 'Table de cartographie',
    grille: ['AA', 'PP', 'PP'], legende: { A: 'papier', P: 'planche' },
    desc: '2 papiers + 4 planches. Agrandit, copie et verrouille les cartes. Métier : cartographe (vend les cartes du manoir et du monument).'
  },
  {
    nom: 'Composteur', cat: 'station', qte: 1,
    sortie: 'Composteur',
    grille: ['D D', 'D D', 'DDD'], legende: { D: 'dalle' },
    desc: '7 dalles en bois. Transforme graines, cultures et déchets végétaux en poudre d\'os. Métier : fermier.'
  },
  {
    nom: 'Tonneau', cat: 'station', qte: 1,
    sortie: 'Tonneau',
    grille: ['PSP', 'P P', 'PSP'], legende: { P: 'planche', S: 'dalle' },
    desc: '6 planches + 2 dalles. Même capacité qu\'un coffre, s\'ouvre même avec un bloc au-dessus. Métier : pêcheur.'
  },
  {
    nom: 'Lutrin', cat: 'station', qte: 1,
    sortie: 'Lutrin',
    grille: ['SSS', ' B ', ' S '], legende: { S: 'dalle', B: 'bibli' },
    desc: 'Bloc de métier du bibliothécaire — le commerce le plus rentable du jeu (livres enchantés contre émeraudes).'
  },

  /* =========== NOURRITURE =========== */
  {
    nom: 'Pain', cat: 'nourriture', qte: 1,
    sortie: 'Pain',
    grille: ['WWW'], legende: { W: 'ble' },
    desc: '3 blés. La ressource alimentaire la plus facile à industrialiser (ferme à blé + villageois fermier).'
  },
  {
    nom: 'Carotte dorée', cat: 'nourriture', qte: 1,
    sortie: 'Carotte dorée', tagCls: 'gold',
    grille: ['PPP', 'PCP', 'PPP'], legende: { P: 'pepite', C: 'carotte' },
    desc: 'Le meilleur aliment du jeu en saturation. Ingrédient de la potion de Vision nocturne.'
  },
  {
    nom: 'Pomme dorée', cat: 'nourriture', qte: 1,
    sortie: 'Pomme dorée', tagCls: 'gold',
    grille: ['OOO', 'OAO', 'OOO'], legende: { O: 'or', A: 'pomme' },
    desc: '8 lingots d\'or. Absorption + Régénération. La version « enchantée » ne se craft plus : elle se trouve uniquement en coffre.'
  },
  {
    nom: 'Gâteau', cat: 'nourriture', qte: 1,
    sortie: 'Gâteau',
    grille: ['LLL', 'SES', 'WWW'], legende: { L: 'lait', S: 'sucre', E: 'oeuf', W: 'ble' },
    desc: '3 seaux de lait (rendus vides), 2 sucres, 1 œuf, 3 blés. Se mange posé au sol, 7 parts.'
  },
  {
    nom: 'Soupe de champignons', cat: 'nourriture', qte: 1,
    sortie: 'Soupe de champignons',
    grille: [' C ', ' M ', ' B '], legende: { C: 'champi', M: 'champi', B: 'bol' },
    desc: '1 champignon rouge + 1 brun + 1 bol. Sur une mooshroom : un clic avec un bol suffit, ressource illimitée.'
  },
  {
    nom: 'Cookies', cat: 'nourriture', qte: 8,
    sortie: 'Cookies',
    grille: ['WCW'], legende: { W: 'ble', C: 'cacao' },
    desc: '2 blés + 1 fève de cacao (jungle) donnent 8 cookies : le meilleur rendement calorique par blé.'
  },
  {
    nom: 'Melon scintillant', cat: 'nourriture', qte: 1,
    sortie: 'Melon scintillant', tagCls: 'gold',
    grille: ['PPP', 'PMP', 'PPP'], legende: { P: 'pepite', M: 'melon' },
    desc: 'Ne se mange pas : c\'est l\'ingrédient de la potion de Soin instantané.'
  },

  /* =========== TRANSPORT / STOCKAGE =========== */
  {
    nom: 'Wagonnet', cat: 'transport', qte: 1,
    sortie: 'Wagonnet',
    grille: ['F F', 'FFF'], legende: { F: 'fer' },
    desc: 'Combinez-le avec un coffre, un entonnoir, un TNT ou un four pour des variantes automatisables.'
  },
  {
    nom: 'Boîte de shulker', cat: 'transport', qte: 1,
    sortie: 'Boîte de shulker', tagCls: 'purple',
    grille: [' S ', ' C ', ' S '], legende: { S: 'carapace', C: 'coffre' },
    desc: '2 carapaces de shulker + 1 coffre. Conserve son contenu quand on la casse : LE conteneur portable. Teintable et empilable dans un coffre.'
  },
  {
    nom: 'Cadre d\'objet', cat: 'transport', qte: 1,
    sortie: 'Cadre d\'objet',
    grille: ['BBB', 'BCB', 'BBB'], legende: { B: 'baton', C: 'cuir' },
    desc: 'Sert de repère visuel sur les coffres d\'un système de tri, et d\'affichage pour une carte murale géante.'
  },
  {
    nom: 'Boussole de récupération', cat: 'transport', qte: 1,
    sortie: 'Boussole de récupération', tagCls: 'purple',
    grille: ['EEE', 'ECE', 'EEE'], legende: { E: 'echo', C: 'boussole' },
    desc: '8 éclats d\'écho (Warden) + 1 BOUSSOLE au centre — et non un cœur de la mer, qui sert au conduit. Pointe vers votre dernier lieu de mort.'
  },
  {
    nom: 'Échafaudage', cat: 'transport', qte: 6,
    sortie: 'Échafaudage',
    grille: ['BFB', 'B B', 'B B'], legende: { B: 'bambou', F: 'ficelle' },
    desc: '6 bambous + 1 ficelle, celle-ci en HAUT au centre. Se pose en chaîne vers le haut ou latéralement : l\'outil de construction verticale par excellence.'
  },

  /* =========== NETHER & END =========== */
  {
    nom: 'Œil de l\'Ender', cat: 'end', qte: 1,
    sortie: 'Œil de l\'Ender', tagCls: 'purple',
    grille: ['PB'], legende: { P: 'perle', B: 'poudreBl' },
    desc: '1 perle de l\'Ender + 1 poudre de Blaze. Localise la forteresse et active le portail de l\'End. Prévoyez-en 15 à 20.'
  },
  {
    nom: 'Cristal de l\'End', cat: 'end', qte: 1,
    sortie: 'Cristal de l\'End', tagCls: 'purple',
    grille: ['GGG', 'GEG', 'GTG'], legende: { G: 'verre', E: 'oeil', T: 'larme' },
    desc: 'Réel : 7 verres + 1 œil de l\'Ender + 1 larme de Ghast. Quatre cristaux posés sur le portail de sortie réinvoquent le dragon.'
  },
  {
    nom: 'Bloc de sable des âmes → invocation du Wither', cat: 'end', station: 'Construction', qte: 1,
    sortie: 'Wither (boss)', tagCls: 'red',
    grille: ['TTT', ' S ', 'SSS'], legende: { T: 'tete', S: 'ame' },
    desc: 'Pas un craft mais une construction : un T de 4 sables des âmes surmonté de 3 crânes de squelette wither. Posez le dernier crâne en dernier.'
  },
  {
    nom: 'Masse (Mace)', cat: 'end', qte: 1,
    sortie: 'Masse', tagCls: 'red',
    grille: [' H ', ' B '], legende: { H: 'lourd', B: 'tige' },
    desc: 'Cœur alourdi (coffre-fort ominous des chambres d\'épreuve) posé AU-DESSUS d\'une tige de Breeze, à l\'établi — pas à la table de forge. Ses dégâts augmentent avec la hauteur de chute.'
  },

  /* =========== DÉCORATION / DIVERS =========== */
  {
    nom: 'Lanterne', cat: 'deco', qte: 1,
    sortie: 'Lanterne',
    grille: ['PPP', 'PTP', 'PPP'], legende: { P: 'pepiteFer', T: 'torche' },
    desc: '8 pépites de FER (pas d\'or) + 1 torche. Se suspend aux plafonds et aux chaînes : l\'éclairage le plus élégant du jeu.'
  },
  {
    nom: 'Chaîne', cat: 'deco', qte: 1,
    sortie: 'Chaîne', sortieItem: 'chaine',
    grille: [' P ', ' F ', ' P '], legende: { P: 'pepiteFer', F: 'fer' },
    desc: '2 pépites de fer + 1 lingot de fer. Suspend les lanternes en grappes ou décore les entrepôts et les mines. Une variante en cuivre existe aussi.'
  },
  {
    nom: 'Bougie', cat: 'deco', qte: 1,
    sortie: 'Bougie',
    grille: [' F ', ' C '], legende: { F: 'ficelle', C: 'cire' },
    desc: 'Jusqu\'à 4 par bloc, teintables en 16 couleurs, allumables au briquet. Sur un gâteau, elles servent pour l\'anniversaire.'
  },
  {
    nom: 'Bannière', cat: 'deco', qte: 1,
    sortie: 'Bannière',
    grille: ['LLL', 'LLL', ' B '], legende: { L: 'laine', B: 'baton' },
    desc: '6 laines + 1 bâton. À décorer au métier à tisser. Une bannière copiée sur une carte y ajoute un marqueur nommé.'
  },
  {
    nom: 'Poudre de béton', cat: 'deco', qte: 8,
    sortie: 'Poudre de béton',
    grille: ['SGS', 'GCG', 'SGS'], legende: { S: 'sable', G: 'gravier', C: 'colorant' },
    desc: '4 sables + 4 graviers + 1 colorant = 8 poudres. Au contact de l\'eau, elle durcit en béton : le bloc de construction moderne par excellence.'
  },
  {
    nom: 'Papier', cat: 'deco', qte: 3,
    sortie: 'Papier', sortieItem: 'papier',
    grille: ['CCC'], legende: { C: 'canne' },
    desc: '3 cannes à sucre → 3 papiers. Base des livres, des cartes et des fusées de feu d\'artifice (élytre !).'
  },
  {
    nom: 'Livre', cat: 'deco', qte: 1,
    sortie: 'Livre', sortieItem: 'livre',
    grille: ['PP', 'PC'], legende: { P: 'papier', C: 'cuir' },
    desc: '3 papiers + 1 cuir, sans forme imposée. Multipliez par 45 pour équiper une salle d\'enchantement complète.'
  },
  {
    nom: 'Fusée de feu d\'artifice', cat: 'deco', qte: 3,
    sortie: 'Fusée de feu d\'artifice', tagCls: 'gold',
    grille: ['PGG'], legende: { P: 'papier', G: 'poudre' },
    desc: '1 papier + 1 à 3 poudres à canon (la durée = la portée). Avec l\'élytre, c\'est le moteur : une fusée toutes les 5 secondes de vol.'
  },
  {
    nom: 'Verre', cat: 'deco', station: 'Fourneau', qte: 1,
    sortie: 'Verre', sortieItem: 'verre',
    grille: ['S'], legende: { S: 'sable' },
    desc: 'Cuisson au four. 6 verres → 16 vitres. Le verre teinté (verre + colorant) ne se transforme pas en vitre.'
  },

  /* =========== BLOCS DE CONSTRUCTION =========== */
  {
    nom: 'Escaliers', cat: 'bloc', qte: 4,
    sortie: 'Escaliers',
    grille: ['B  ', 'BB ', 'BBB'], legende: { B: 'bloc' },
    desc: '6 blocs donnent 4 escaliers — une perte de 33 %. Passez par le tailleur de pierre : 1 bloc = 1 escalier, sans perte.'
  },
  {
    nom: 'Dalles', cat: 'bloc', qte: 6,
    sortie: 'Dalles',
    grille: ['BBB'], legende: { B: 'bloc' },
    desc: 'Une dalle inférieure empêche toute apparition de monstre : c\'est le moyen le moins cher de sécuriser une grande surface.'
  },
  {
    nom: 'Muret', cat: 'bloc', qte: 6,
    sortie: 'Muret',
    grille: ['BBB', 'BBB'], legende: { B: 'bloc' },
    desc: 'Le muret compte pour 1,5 bloc de hauteur, comme une clôture. Indispensable pour les créneaux et les balustrades.'
  },
  {
    nom: 'Briques de pierre', cat: 'bloc', qte: 4,
    sortie: 'Briques de pierre',
    grille: ['SS', 'SS'], legende: { S: 'pierre' },
    desc: '4 pierres (pas du cobblestone : il faut la cuire d\'abord). Le matériau de référence des châteaux et des donjons.'
  },
  {
    nom: 'Bloc de briques', cat: 'bloc', qte: 1,
    sortie: 'Bloc de briques',
    grille: ['RR', 'RR'], legende: { R: 'brique' },
    desc: 'La brique s\'obtient en cuisant une boule d\'argile. Comptez 4 briques par bloc : une cheminée en consomme vite plusieurs piles.'
  },
  {
    nom: 'Bloc compact (fer, or, diamant…)', cat: 'bloc', qte: 1,
    sortie: 'Bloc de ressource',
    grille: ['RRR', 'RRR', 'RRR'], legende: { R: 'ressource' },
    desc: '9 unités → 1 bloc, et l\'inverse rend les 9 unités. Vaut pour fer, or, cuivre, diamant, émeraude, redstone, lapis, charbon, netherite et slime. Exception : le bloc d\'améthyste ne demande que 4 éclats, en 2 × 2.'
  },
  {
    nom: 'Bloc de foin', cat: 'bloc', qte: 1,
    sortie: 'Bloc de foin', sortieItem: 'foin',
    grille: ['WWW', 'WWW', 'WWW'], legende: { W: 'ble' },
    desc: '9 blés. Sert au stockage compact, à nourrir chevaux et lamas, et amortit totalement les chutes (avec 1 bloc d\'eau dessus).'
  },
  {
    nom: 'Bloc de laine', cat: 'bloc', qte: 1,
    sortie: 'Laine', sortieItem: 'laine',
    grille: ['FF', 'FF'], legende: { F: 'ficelle' },
    desc: '4 ficelles. Utile quand une ferme à araignées produit plus de ficelle que vous n\'avez de moutons.'
  },
  {
    nom: 'Tapis', cat: 'bloc', qte: 3,
    sortie: 'Tapis',
    grille: ['LL'], legende: { L: 'laine' },
    desc: 'Posé sur un bloc lumineux, il masque la source de lumière : c\'est l\'astuce d\'éclairage invisible des constructeurs.'
  },
  {
    nom: 'Barreaux de fer', cat: 'bloc', qte: 16,
    sortie: 'Barreaux de fer',
    grille: ['FFF', 'FFF'], legende: { F: 'fer' },
    desc: '6 lingots pour 16 barreaux. Fenêtres de donjon, cages, herses de châtelet.'
  },
  {
    nom: 'Verre teinté', cat: 'bloc', qte: 8,
    sortie: 'Verre teinté',
    grille: ['GGG', 'GCG', 'GGG'], legende: { G: 'verre', C: 'colorant' },
    desc: '8 verres + 1 colorant. Le verre teinté ne se transforme pas en vitre — pensez-y avant de tout teindre.'
  },
  {
    nom: 'Pierre lumineuse', cat: 'bloc', qte: 1,
    sortie: 'Pierre lumineuse', sortieItem: 'glowstone',
    grille: ['PP', 'PP'], legende: { P: 'poudreLum' },
    desc: '4 poudres lumineuses (Nether ou sorcières). Lumière 15, et composant de la lampe de redstone.'
  },

  /* =========== ÉCLAIRAGE & DÉCORATION =========== */
  {
    nom: 'Lampe de redstone', cat: 'redstone', qte: 1,
    sortie: 'Lampe de redstone', tagCls: 'red',
    grille: [' R ', 'RGR', ' R '], legende: { R: 'redstone', G: 'glowstone' },
    desc: '4 poudres de redstone + 1 pierre lumineuse. Le seul éclairage commutable du jeu.'
  },
  {
    nom: 'Torche des âmes', cat: 'deco', qte: 4,
    sortie: 'Torche des âmes', sortieItem: 'torcheA',
    grille: ['C', 'B', 'A'], legende: { C: 'charbon', B: 'baton', A: 'ame' },
    desc: 'Charbon + bâton + sable des âmes. Lumière bleue de niveau 10 — et elle repousse les piglins.'
  },
  {
    nom: 'Feu de camp', cat: 'deco', qte: 1,
    sortie: 'Feu de camp',
    grille: [' B ', 'BCB', 'OOO'], legende: { B: 'baton', C: 'charbon', O: 'bois' },
    desc: '3 bâtons + 1 charbon + 3 bûches. Cuit 4 aliments sans carburant, éclaire (15), et sa fumée calme les abeilles.'
  },
  {
    nom: 'Citrouille-lanterne', cat: 'deco', qte: 1,
    sortie: 'Citrouille-lanterne',
    grille: ['C', 'T'], legende: { C: 'citrouille', T: 'torche' },
    desc: 'Citrouille sculptée + torche. Lumière 15 et posable sous l\'eau : très utile pour éclairer un chantier sous-marin.'
  },
  {
    nom: 'Pot de fleurs', cat: 'deco', qte: 1,
    sortie: 'Pot de fleurs',
    grille: ['R R', ' R '], legende: { R: 'brique' },
    desc: '3 briques. Accepte fleurs, pousses, champignons, cactus et bambou : le détail qui rend un intérieur habité.'
  },
  {
    nom: 'Support à armure', cat: 'deco', qte: 1,
    sortie: 'Support à armure',
    grille: ['BBB', ' B ', 'BDB'], legende: { B: 'baton', D: 'dalleP' },
    desc: '6 bâtons + 1 dalle de pierre lisse. Range une armure, sert de mannequin décoratif et de repère de construction.'
  },
  {
    nom: 'Pot décoré', cat: 'deco', qte: 1,
    sortie: 'Pot décoré',
    grille: [' T ', 'T T', ' T '], legende: { T: 'tesson' },
    desc: '4 tessons de poterie (fouilles archéologiques) ou 4 briques. Chaque face garde le motif du tesson utilisé.'
  },
  {
    nom: 'Cadre lumineux', cat: 'deco', qte: 1,
    sortie: 'Cadre lumineux',
    grille: ['CE'], legende: { C: 'cadre', E: 'encreLum' },
    desc: 'Cadre d\'objet + sac d\'encre luisant (calmar luisant). L\'objet exposé reste visible dans le noir.'
  },
  {
    nom: 'Jukebox', cat: 'deco', qte: 1,
    sortie: 'Jukebox',
    grille: ['PPP', 'PDP', 'PPP'], legende: { P: 'planche', D: 'diamant' },
    desc: '8 planches + 1 diamant. Lit les disques ; un comparateur derrière lui indique quel disque est en lecture.'
  },
  {
    nom: 'Bloc de note', cat: 'deco', qte: 1,
    sortie: 'Bloc de note',
    grille: ['PPP', 'PRP', 'PPP'], legende: { P: 'planche', R: 'redstone' },
    desc: 'Le bloc placé DESSOUS détermine l\'instrument (bois = basse, pierre = batterie, or = cloche, laine = guitare…).'
  },
  {
    nom: 'Bouclier orné', cat: 'deco', qte: 1,
    sortie: 'Bouclier orné',
    grille: ['NB'], legende: { N: 'banniere', B: 'bouclier' },
    desc: 'Bannière + bouclier à l\'établi : le motif de la bannière s\'applique au bouclier. Purement esthétique, mais spectaculaire.'
  },
  {
    nom: 'Panneau', cat: 'deco', qte: 3,
    sortie: 'Panneau',
    grille: ['PPP', 'PPP', ' B '], legende: { P: 'planche', B: 'baton' },
    desc: '6 planches + 1 bâton. Un panneau bloque l\'eau : c\'est l\'astuce de base pour créer des poches d\'air sous-marines.'
  },

  /* =========== REDSTONE — COMPLÉMENTS =========== */
  {
    nom: 'Détecteur de lumière du jour', cat: 'redstone', qte: 1,
    sortie: 'Détecteur de lumière', tagCls: 'red',
    grille: ['GGG', 'QQQ', 'DDD'], legende: { G: 'verre', Q: 'quartz', D: 'dalle' },
    desc: 'Signal proportionnel à la lumière du soleil. Un clic droit l\'inverse : il devient un détecteur de nuit, idéal pour l\'éclairage automatique.'
  },
  {
    nom: 'Rail détecteur', cat: 'redstone', qte: 6,
    sortie: 'Rail détecteur',
    grille: ['F F', 'FPF', 'FRF'], legende: { F: 'fer', P: 'plaque', R: 'redstone' },
    desc: 'Émet un signal au passage d\'un wagonnet. Avec un comparateur, il lit même le contenu d\'un wagonnet-coffre.'
  },
  {
    nom: 'Rail activateur', cat: 'redstone', qte: 6,
    sortie: 'Rail activateur',
    grille: ['OBO', 'OTO', 'OBO'], legende: { O: 'fer', B: 'baton', T: 'torcheR' },
    desc: 'Éjecte le passager d\'un wagonnet ou amorce un wagonnet-TNT. Le composant des stations automatiques.'
  },
  {
    nom: 'Cible (target)', cat: 'redstone', qte: 1,
    sortie: 'Cible', tagCls: 'red',
    grille: [' R ', 'RHR', ' R '], legende: { R: 'redstone', H: 'foin' },
    desc: '4 poudres de redstone autour d\'1 bloc de foin. Émet un signal d\'autant plus fort que la flèche touche près du centre : la base des portes à tir.'
  },
  {
    nom: 'Crochet de détente', cat: 'redstone', qte: 2,
    sortie: 'Crochet de détente',
    grille: ['F', 'B', 'P'], legende: { F: 'fer', B: 'baton', P: 'planche' },
    desc: 'Deux crochets reliés par de la ficelle forment un fil de détente : le déclencheur invisible des pièges et des portes secrètes.'
  },
  {
    nom: 'Wagonnet-coffre', cat: 'transport', qte: 1,
    sortie: 'Wagonnet-coffre',
    grille: ['C', 'W'], legende: { C: 'coffre', W: 'wagonnet' },
    desc: 'Coffre + wagonnet déjà fabriqué, sans forme imposée. Transporte 27 emplacements sur rails ; un rail détecteur + comparateur permet de le décharger automatiquement.'
  },

  /* =========== TEINTURES & COULEURS =========== */
  {
    nom: 'Colorant à partir d\'une fleur', cat: 'deco', qte: 1,
    sortie: 'Colorant',
    grille: ['F'], legende: { F: 'fleurR' },
    desc: 'Chaque fleur donne son colorant : coquelicot → rouge, pissenlit → jaune, bleuet → bleu clair, orchidée → rose pâle. Les grandes fleurs en donnent 2.'
  },
  {
    nom: 'Colorants de base (sans fleur)', cat: 'deco', qte: 1,
    sortie: 'Colorant', sortieItem: 'colorant',
    grille: ['O'], legende: { O: 'os' },
    desc: 'Blanc = poudre d\'os · Noir = poche d\'encre · Bleu = lapis · Vert = cactus cuit au four · Marron = fève de cacao · Rouge = coquelicot ou betterave.'
  },
  {
    nom: 'Mélange de colorants', cat: 'deco', qte: 2,
    sortie: 'Colorant secondaire',
    grille: ['CC'], legende: { C: 'colorant' },
    desc: 'Rouge + jaune = orange · Rouge + blanc = rose · Bleu + vert = cyan · Bleu + rouge = violet · Noir + blanc = gris. Les 16 couleurs se déduisent de 6 colorants de base.'
  },
  {
    nom: 'Béton (durcissement)', cat: 'bloc', qte: 1,
    sortie: 'Béton',
    grille: ['W'], legende: { W: 'sable' },
    desc: 'Pas un craft : jetez la poudre de béton dans l\'eau ou versez-y un seau. Elle durcit instantanément. Un bloc de béton durci ne se re-teinte plus.'
  },

  /* =========== NOURRITURE — COMPLÉMENTS =========== */
  {
    nom: 'Ragoût de lapin', cat: 'nourriture', qte: 1,
    sortie: 'Ragoût de lapin',
    grille: [' L ', 'CPM', ' B '], legende: { L: 'lapinC', C: 'carotte', P: 'patate', M: 'champi', B: 'bol' },
    desc: 'Lapin cuit + carotte + pomme de terre cuite + champignon + bol. L\'un des aliments les plus nourrissants, mais coûteux en ingrédients.'
  },
  {
    nom: 'Tarte à la citrouille', cat: 'nourriture', qte: 1,
    sortie: 'Tarte à la citrouille',
    grille: ['CSE'], legende: { C: 'citrouilleB', S: 'sucre', E: 'oeuf' },
    desc: '1 citrouille + 1 sucre + 1 œuf. Bien plus rentable que le gâteau : aucun seau de lait, et elle se mange à la main.'
  },
  {
    nom: 'Pomme dorée enchantée (recette supprimée)', cat: 'nourriture', station: 'Ne se craft plus', qte: 1,
    sortie: 'Pomme dorée enchantée', tagCls: 'red',
    grille: ['BBB', 'BAB', 'BBB'], legende: { B: 'orB', A: 'pomme' },
    desc: 'La recette (8 blocs d\'or + 1 pomme) a été RETIRÉE du jeu. Elle ne se trouve plus que dans les coffres : bastions, manoirs, temples, portails ruinés, mines.'
  },

  /* =========== OBJETS UTILITAIRES =========== */
  {
    nom: 'Carte vierge', cat: 'transport', qte: 1,
    sortie: 'Carte vierge',
    grille: ['PPP', 'PBP', 'PPP'], legende: { P: 'papier', B: 'boussole' },
    desc: '8 papiers + 1 boussole. Sans boussole, la carte existe mais n\'affiche pas votre position. À agrandir à la table de cartographie.'
  },
  {
    nom: 'Livre et plume', cat: 'transport', qte: 1,
    sortie: 'Livre et plume',
    grille: ['LUE'], legende: { L: 'livre', U: 'plume', E: 'encre' },
    desc: 'Livre + plume + poche d\'encre. Permet d\'écrire un journal de coordonnées — bien plus fiable que la mémoire.'
  },
  {
    nom: 'Longe (laisse)', cat: 'transport', qte: 2,
    sortie: 'Longe',
    grille: ['FF ', 'FF ', '  F'], legende: { F: 'ficelle' },
    desc: '5 ficelles, et plus aucune boule de slime : la recette a été simplifiée. Attache les animaux à un piquet de clôture — le moyen le plus simple de déplacer un troupeau.'
  },
  {
    nom: 'Cisaille à citrouille', cat: 'transport', station: 'Clic droit', qte: 1,
    sortie: 'Citrouille sculptée', sortieItem: 'citrouille',
    grille: ['C'], legende: { C: 'citrouilleB' },
    desc: 'Pas un craft : clic droit avec une cisaille sur une citrouille posée. Elle donne 4 pépins et devient sculptée — nécessaire aux golems.'
  },
  {
    nom: 'Bloc de charbon', cat: 'bloc', qte: 1,
    sortie: 'Bloc de charbon', sortieItem: 'charbonB',
    grille: ['CCC', 'CCC', 'CCC'], legende: { C: 'charbon' },
    desc: '9 charbons. Comme carburant, il cuit 80 objets contre 72 pour 9 charbons séparés : un léger gain, et surtout un stockage 9 fois plus compact.'
  }
];
