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
  outil:      { n: 'Matériau (bois/pierre/fer/or/diamant)', c: '#7f8c9b', t: 'MA' },
  armeD:      { n: 'Équipement en diamant',   c: '#4fd6e0', t: 'DI' },
  modele:     { n: 'Modèle d\'amélioration',  c: '#c9c2b8', t: 'MO' },
  chorus:     { n: 'Fruit du chorus cuit',    c: '#8a5aa0', t: 'CH' },
  tige:       { n: 'Tige de Breeze',          c: '#a8d8e8', t: 'TB' },
  lourd:      { n: 'Cœur alourdi (heavy core)', c: '#3a4450', t: 'CA' },
  tnt:        { n: 'TNT',                     c: '#c8382c', t: 'TN' },
  seau:       { n: 'Seau',                    c: '#c8c8c8', t: 'SE' },
  oeil:       { n: 'Œil de l\'Ender',         c: '#1c9a7e', t: 'ŒE' },
  carapace:   { n: 'Carapace de shulker',     c: '#9a6ab0', t: 'CS' }
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
    desc: 'Remplacez M par : planches, pierre, lingot de fer, lingot d\'or ou diamant. Progression obligatoire : bois → pierre → fer → diamant → netherite.'
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
    grille: ['FFF', 'RYR', 'FDF'], legende: { F: 'fer', R: 'redstone', Y: 'etabli', D: 'dropper' },
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
    grille: ['AA', 'PP'], legende: { A: 'papier', P: 'planche' },
    desc: 'Agrandit, copie et verrouille les cartes. Métier : cartographe (vend les cartes du manoir et du monument).'
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
    grille: ['EEE', 'ECE', 'EEE'], legende: { E: 'echo', C: 'coeurMer' },
    desc: '8 éclats d\'écho (Warden) + 1 cœur de la mer. Pointe vers votre dernier lieu de mort : sauve un stuff complet.'
  },
  {
    nom: 'Échafaudage', cat: 'transport', qte: 6,
    sortie: 'Échafaudage',
    grille: ['B B', 'BFB', 'B B'], legende: { B: 'bambou', F: 'ficelle' },
    desc: '6 bambous + 1 ficelle. Se pose en chaîne vers le haut ou latéralement : l\'outil de construction verticale par excellence.'
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
    nom: 'Masse (Mace)', cat: 'end', station: 'Table de forge', qte: 1,
    sortie: 'Masse', tagCls: 'red',
    grille: ['HB'], legende: { H: 'lourd', B: 'tige' },
    desc: 'Cœur alourdi (coffre-fort ominous des chambres d\'épreuve) + tige de Breeze, à la table de forge. Ses dégâts augmentent avec la hauteur de chute.'
  },

  /* =========== DÉCORATION / DIVERS =========== */
  {
    nom: 'Lanterne', cat: 'deco', qte: 1,
    sortie: 'Lanterne',
    grille: ['PPP', 'PTP', 'PPP'], legende: { P: 'pepite', T: 'torche' },
    desc: '8 pépites d\'or + 1 torche. Se suspend aux plafonds et aux chaînes : l\'éclairage le plus élégant du jeu.'
  },
  {
    nom: 'Chaîne', cat: 'deco', qte: 1,
    sortie: 'Chaîne', sortieItem: 'chaine',
    grille: [' P ', ' F ', ' P '], legende: { P: 'pepite', F: 'fer' },
    desc: 'Suspend les lanternes en grappes ou décore les entrepôts et les mines.'
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
    grille: ['PP', 'C '], legende: { P: 'papier', C: 'cuir' },
    desc: '3 papiers + 1 cuir. Multipliez par 45 pour équiper une salle d\'enchantement complète.'
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
  }
];
