/* ============================================================
   Données : blocs de construction — familles, palettes, techniques
   Point de vue du constructeur : quelles variantes existent,
   quelle teinte réelle a le bloc, avec quoi il se marie,
   et ce qui manque au moment de bâtir.
   ============================================================ */

var FAMILLES_BLOCS = [

  /* ---------------- BOIS ---------------- */
  {
    nom: 'Chêne', cat: 'bois',
    tags: [{ txt: 'Partout', cls: 'ok' }, { txt: 'Brun moyen', cls: '' }],
    ou: 'Plaines, forêts, marais, montagnes : le bois le plus commun du jeu. Une bûche donne 4 planches.',
    drops: [
      'Variantes disponibles — la panoplie complète : planches, rondin, rondin écorcé, bois (écorce sur les 6 faces), escalier, dalle, clôture, portillon, porte, trappe, panneau, panneau suspendu, bouton, plaque de pression.',
      'Ce qu\'on en fait — charpentes, planchers, maisons de village. C\'est le brun moyen de référence auquel tous les autres bois se comparent.',
      'Piège ou limite — sa teinte est si neutre qu\'une maison entièrement en chêne paraît fade ; il lui faut un bois sombre en contraste (chêne noir, épicéa) ou de la pierre.'
    ],
    note: 'Le rondin de chêne écorcé est nettement plus clair et plus jaune que la planche. En poutres apparentes, il crée un relief visible sans jamais quitter la famille du chêne.'
  },
  {
    nom: 'Épicéa', cat: 'bois',
    tags: [{ txt: 'Taïga', cls: 'cyan' }, { txt: 'Brun foncé', cls: '' }],
    ou: 'Taïgas et versants de montagne. Les vieilles taïgas portent des épicéas 2×2 qui donnent des piles entières de bûches.',
    drops: [
      'Variantes disponibles — panoplie complète ; le rondin écorcé quitte le brun froid pour un orangé chaud très différent de la planche.',
      'Ce qu\'on en fait — le bois sombre le plus polyvalent : chalets, quais, ponts, toitures en escaliers, mobilier.',
      'Piège ou limite — sa texture pleine de nœuds « bruite » vite une grande surface ; alternez planches, rondins et dalles pour casser la répétition.'
    ],
    note: 'Trappes d\'épicéa et clôtures d\'épicéa donnent le meilleur rendu de bois vieilli du jeu : c\'est la base des styles nordique et rustique de montagne.'
  },
  {
    nom: 'Bouleau', cat: 'bois',
    tags: [{ txt: 'Clair', cls: '' }],
    ou: 'Forêts de bouleaux et forêts tempérées, partout en zone modérée.',
    drops: [
      'Variantes disponibles — panoplie complète ; l\'écorce blanche mouchetée de noir n\'a pas d\'équivalent dans le jeu.',
      'Ce qu\'on en fait — intérieurs clairs, mobilier, style scandinave, ossature claire posée sur un mur sombre.',
      'Piège ou limite — la planche est jaune pâle : à côté du quartz ou du béton blanc, elle vire au jaune sale.'
    ],
    note: 'Le rondin de bouleau est le seul « blanc rayé » du jeu. Posé en colonnes verticales sur une façade sombre, il imite des piliers de pierre blanche pour un coût dérisoire.'
  },
  {
    nom: 'Bois de jungle (acajou)', cat: 'bois',
    tags: [{ txt: 'Jungle', cls: 'ok' }],
    ou: 'Jungles et bambouseraies uniquement. Les arbres géants 2×2 fournissent des bûches en masse.',
    drops: [
      'Variantes disponibles — panoplie complète ; le rondin écorcé est un brun orangé très chaud, l\'un des plus beaux blocs de bois du jeu.',
      'Ce qu\'on en fait — planchers et mobilier « bois exotique » ; il s\'entend parfaitement avec le cuivre neuf, la terre cuite orange et le grès.',
      'Piège ou limite — la planche tire sur le rouge-rosé : elle jure avec l\'acacia et avec le cerisier, deux teintes déjà saturées.'
    ],
    note: 'Rondin de jungle écorcé plus bloc de cuivre neuf : le duo le plus efficace du jeu pour un intérieur chaud et cossu, sans une seule couleur artificielle.'
  },
  {
    nom: 'Acacia', cat: 'bois',
    tags: [{ txt: 'Savane', cls: 'gold' }, { txt: 'Très saturé', cls: 'red' }],
    ou: 'Savanes uniquement. Les arbres poussent en escalier, la récolte demande de grimper.',
    drops: [
      'Variantes disponibles — panoplie complète ; planche orange vif, écorce gris pâle légèrement rosée.',
      'Ce qu\'on en fait — accents orange, portes, mobilier, toitures colorées ; excellent en petites touches sur du grès ou de la terre cuite blanche.',
      'Piège ou limite — c\'est le bois le plus saturé du jeu : passé quelques dizaines de blocs, il écrase toute la palette.'
    ],
    note: 'Les faces latérales du rondin d\'acacia non écorcé sont d\'un gris pâle presque neutre : utilisées seules, personne ne devine qu\'il s\'agit d\'acacia.'
  },
  {
    nom: 'Chêne noir', cat: 'bois',
    tags: [{ txt: 'Forêt sombre', cls: 'purple' }, { txt: 'Bois de structure', cls: 'gold' }],
    ou: 'Forêts sombres, toujours en arbres 2×2 : c\'est le bois qui se récolte le plus vite du jeu.',
    drops: [
      'Variantes disponibles — panoplie complète ; le rondin écorcé reste très sombre, à peine plus chaud que la planche.',
      'Ce qu\'on en fait — LE bois de structure : poutres, colombages, encadrements, contreventements. Il découpe une façade claire comme un trait de crayon.',
      'Piège ou limite — en aplat, il avale la lumière et rend un intérieur illisible ; réservez-le aux lignes, pas aux surfaces.'
    ],
    note: 'Colombage classique : murs en terre cuite blanche ou en bouleau, ossature en rondins de chêne noir, remplissage entre les poutres. Rien ne fait plus « médiéval » pour aussi peu de blocs.'
  },
  {
    nom: 'Mangrove', cat: 'bois',
    tags: [{ txt: 'Marais', cls: 'ok' }],
    ou: 'Marais de mangrove. La propagule se replante partout, y compris dans l\'eau.',
    drops: [
      'Variantes disponibles — panoplie complète, plus deux blocs exclusifs : les racines de palétuvier (ajourées, traversées par la lumière) et les racines boueuses.',
      'Ce qu\'on en fait — un rouge-brun profond, situé entre le chêne noir et la jungle : toitures, pontons, passerelles sur fond vert.',
      'Piège ou limite — l\'arbre pousse très large et sur plusieurs blocs de haut : ne plantez jamais une propagule contre un mur fini.'
    ],
    note: 'Les racines de palétuvier laissent passer la lumière et l\'eau. En grappes sous un plancher ou autour d\'un tronc, elles créent une profondeur organique impossible à obtenir avec un bloc plein.'
  },
  {
    nom: 'Cerisier', cat: 'bois',
    tags: [{ txt: 'Cerisaie', cls: 'purple' }, { txt: 'Rose', cls: '' }],
    ou: 'Cerisaies, sur les versants de montagne tempérés.',
    drops: [
      'Variantes disponibles — panoplie complète ; planches rose saumon, écorce gris-brun clair, feuillage rose et tapis de pétales au sol.',
      'Ce qu\'on en fait — le seul bois rose : toitures japonaises, pavillons, intérieurs doux. Il fonctionne remarquablement avec la pierre des profondeurs polie et le blanc.',
      'Piège ou limite — le rose se dispute avec le rouge et l\'orange : ne le mélangez ni à l\'acacia, ni au bois de jungle, ni aux briques.'
    ],
    note: 'Cerisier, pierre des profondeurs polie et quartz : la palette la plus sûre pour tout ce qui doit paraître raffiné — temple, pavillon de thé, jardin clos.'
  },
  {
    nom: 'Chêne pâle', cat: 'bois',
    tags: [{ txt: 'Forêt pâle', cls: 'cyan' }, { txt: 'Récent', cls: '' }],
    ou: 'Forêt pâle (Pale Garden) uniquement, une variante blafarde et rare de la forêt sombre.',
    drops: [
      'Variantes disponibles — panoplie complète ; planches beige très clair presque grises, écorce blanchâtre striée de gris.',
      'Ce qu\'on en fait — le bois clair le plus neutre du jeu : il ne jaunit pas comme le bouleau et se marie sans faute avec la pierre, le béton clair et le quartz.',
      'Piège ou limite — le biome est rare et limité en surface : installez une plantation près de la base plutôt que d\'y faire des allers-retours.'
    ],
    note: 'Le même biome fournit la mousse pâle, la mousse suspendue et la résine (bloc, briques et briques ciselées) : un orange ambré unique qui contraste violemment avec le bois pâle.'
  },
  {
    nom: 'Bambou', cat: 'bois',
    tags: [{ txt: 'Renouvelable', cls: 'ok' }, { txt: 'Jaune-vert', cls: '' }],
    ou: 'Jungles et bambouseraies. Le bambou repousse tout seul : c\'est le seul « bois » entièrement automatisable sans ferme à arbres.',
    drops: [
      'Variantes disponibles — bloc de bambou, bloc écorcé, planches, escalier, dalle, clôture, porte, trappe, panneaux, plus la mosaïque de bambou (motif tressé) avec son escalier et sa dalle.',
      'Ce qu\'on en fait — teinte jaune-vert claire : parquets, cloisons, plafonds tressés, échafaudages, tout le vocabulaire asiatique.',
      'Piège ou limite — la mosaïque n\'existe qu\'en bloc, escalier et dalle : ni clôture, ni trappe, ni muret, ni porte.'
    ],
    note: 'La mosaïque de bambou est le seul bloc du jeu au motif tressé lisible de près : en plancher intérieur ou en plafond, elle remplace un parquet entier sans aucun assemblage.'
  },
  {
    nom: 'Bois écarlate et bois difforme (Nether)', cat: 'bois',
    tags: [{ txt: 'Nether', cls: 'red' }, { txt: 'Ininflammable', cls: 'ok' }],
    ou: 'Forêts écarlate (rouge) et déformée (turquoise) du Nether. La poudre d\'os sur du nylium fait repousser des champignons géants.',
    drops: [
      'Variantes disponibles — panoplie complète pour les deux essences ; les tiges écorcées sont bien plus vives (rouge framboise, turquoise clair) que les planches.',
      'Ce qu\'on en fait — les deux seules couleurs de bois froides et saturées du jeu : rouge sombre pour l\'infernal, turquoise pour tout ce qui doit paraître étrange ou magique.',
      'Piège ou limite — ce bois ne brûle pas… mais ne sert pas non plus de combustible dans un four et ne donne pas de charbon de bois.'
    ],
    note: 'Comme il est ininflammable, c\'est le seul bois qu\'on peut poser contre de la lave ou un feu décoratif : indispensable pour les cheminées ouvertes et toute construction dans le Nether.'
  },

  /* ---------------- PIERRE ET MINÉRAUX ---------------- */
  {
    nom: 'Pierre, pierre taillée et pierre lisse', cat: 'pierre',
    tags: [{ txt: 'Partout', cls: 'ok' }],
    ou: 'Sous vos pieds partout. La pierre taillée se cuit en pierre, et la pierre se recuit en pierre lisse.',
    drops: [
      'Variantes disponibles — pierre (escalier, dalle), pierre taillée (escalier, dalle, muret), pierre taillée moussue (idem), pierre lisse : DALLE UNIQUEMENT.',
      'Ce qu\'on en fait — fondations, remparts, pavements ; la pierre lisse est la grande surface grise la plus propre du jeu, parfaite en intérieur moderne.',
      'Piège ou limite — la pierre lisse n\'a ni escalier ni muret : faites vos angles avec des dalles, ou passez à l\'andésite polie qui possède, elle, des escaliers.'
    ],
    note: 'La tailleuse de pierre divise par deux ou trois le coût de tous les dérivés : un bloc y donne un escalier, là où l\'établi en réclame six pour quatre escaliers.'
  },
  {
    nom: 'Briques de pierre', cat: 'pierre',
    tags: [{ txt: 'Château', cls: 'gold' }],
    ou: '4 pierres à l\'établi. On les trouve toutes faites dans les igloos, les ruines océaniques et les portails ruinés.',
    drops: [
      'Variantes disponibles — briques (escalier, dalle, muret), briques moussues (idem, obtenues avec une liane ou de la mousse), briques fissurées (en cuisant des briques), briques ciselées.',
      'Ce qu\'on en fait — le matériau de château par excellence ; les versions moussues et fissurées vieillissent un mur sans en changer la couleur.',
      'Piège ou limite — ni les briques fissurées ni les briques ciselées n\'ont d\'escalier, de dalle ou de muret : ce sont des blocs d\'accent, pas de structure.'
    ],
    note: 'Un mur de briques de pierre pures paraît plat. Remplacez au hasard 1 bloc sur 6 par des briques fissurées et 1 sur 10 par de la pierre taillée : le mur devient vivant sans qu\'on sache dire pourquoi.'
  },
  {
    nom: 'Andésite, diorite et granite', cat: 'pierre',
    tags: [{ txt: 'Grottes', cls: '' }],
    ou: 'Filons énormes dans toutes les grottes. 1 diorite + 1 pierre taillée = 2 andésites ; 1 diorite + 1 quartz = 2 granites.',
    drops: [
      'Variantes disponibles — les trois roches brutes ont escalier, dalle et muret ; les trois versions polies ont escalier et dalle, mais AUCUN muret.',
      'Ce qu\'on en fait — l\'andésite polie est le gris clair uniforme le plus utile du jeu (moderne, brutaliste) ; la diorite polie est presque blanche ; le granite poli est rose-orangé.',
      'Piège ou limite — brutes, la diorite et le granite ont une texture très tachetée qui salit les grandes surfaces : polissez-les systématiquement.'
    ],
    note: 'Andésite polie et pierre lisse ne sont pas interchangeables : l\'andésite est un peu plus claire et plus froide, et surtout elle possède escaliers ET dalles. Pour un volume complet, c\'est elle qu\'il faut.'
  },
  {
    nom: 'Pierre des profondeurs (deepslate)', cat: 'pierre',
    tags: [{ txt: 'Sous Y 0', cls: '' }, { txt: 'Gris bleuté', cls: 'purple' }],
    ou: 'Sous Y 8 environ. À la pioche elle donne de la pierre des profondeurs taillée ; le bloc lisse et orientable exige le Toucher de soie.',
    drops: [
      'Variantes disponibles — taillée, polie, briques, tuiles, ciselée, plus les versions fissurées. Escalier, dalle et muret pour la taillée, la polie, les briques et les tuiles.',
      'Ce qu\'on en fait — un gris très sombre, froid et légèrement bleuté : toitures, socles, gothique, et contraste net sous un bois clair.',
      'Piège ou limite — la version ciselée et les versions fissurées n\'ont aucun dérivé ; et la pierre des profondeurs se mine bien plus lentement que la pierre.'
    ],
    note: 'Les tuiles ont un motif plus fin que les briques : en toiture et en sol, elles restent lisibles à distance là où les briques deviennent bruyantes. Réservez les briques aux murs verticaux.'
  },
  {
    nom: 'Tuf', cat: 'pierre',
    tags: [{ txt: 'Gris verdâtre', cls: 'cyan' }],
    ou: 'Autour des filons de minerai et dans les grottes profondes, en très gros amas.',
    drops: [
      'Variantes disponibles — tuf brut, tuf poli, briques de tuf, plus tuf ciselé et briques ciselées. Escalier, dalle et muret pour le brut, le poli et les briques.',
      'Ce qu\'on en fait — un gris légèrement verdâtre qui fait la transition parfaite entre la pierre claire et la pierre des profondeurs.',
      'Piège ou limite — les deux blocs ciselés n\'ont aucun dérivé et servent uniquement de panneaux d\'accent.'
    ],
    note: 'Le tuf est le seul gris du jeu qui ne soit ni bleuté ni jaunâtre. Placé entre la pierre et le deepslate, il empêche la transition de couper brutalement.'
  },
  {
    nom: 'Grès et grès rouge', cat: 'pierre',
    tags: [{ txt: 'Désert', cls: 'gold' }, { txt: 'Illimité', cls: 'ok' }],
    ou: '4 sables = 1 grès. Le grès rouge vient du sable rouge des badlands. Un désert en fournit sans aucune limite.',
    drops: [
      'Variantes disponibles — grès (escalier, dalle, muret), grès lisse (escalier, dalle), grès coupé (DALLE seulement), grès ciselé (aucun dérivé). Liste identique pour le rouge.',
      'Ce qu\'on en fait — beige chaud pour l\'architecture désertique, méditerranéenne et antique ; le grès lisse est une excellente grande surface claire.',
      'Piège ou limite — le grès coupé n\'a pas d\'escalier et le grès ciselé (motif de creeper ou de wither) n\'existe qu\'en bloc plein : prévoyez vos corniches en grès ordinaire.'
    ],
    note: 'Grès lisse, terre cuite blanche et planches de bouleau sont presque exactement de la même teinte : assemblés, ils donnent une façade claire riche en textures sans le moindre écart de couleur.'
  },
  {
    nom: 'Quartz', cat: 'pierre',
    tags: [{ txt: 'Nether', cls: 'red' }, { txt: 'Blanc chaud', cls: '' }],
    ou: 'Minerai de quartz du Nether, très abondant, surtout dans les deltas de basalte. 4 quartz = 1 bloc.',
    drops: [
      'Variantes disponibles — bloc, pilier (orientable), quartz ciselé, briques de quartz, quartz lisse. Escalier et dalle uniquement pour le bloc et pour le quartz lisse.',
      'Ce qu\'on en fait — le blanc chaud le moins cher en grande quantité : colonnes, sols, temples, architecture moderne, intérieurs lumineux.',
      'Piège ou limite — les briques de quartz n\'ont ni escalier ni dalle, et l\'escalier de quartz ordinaire montre une tranche différente du bloc, ce qui casse les grandes surfaces.'
    ],
    note: 'Pour un blanc parfaitement uniforme, prenez le quartz LISSE : c\'est la seule variante dont les six faces, les escaliers et les dalles partagent exactement la même texture.'
  },
  {
    nom: 'Cuivre et ses états d\'oxydation', cat: 'pierre',
    tags: [{ txt: 'Oxydation', cls: 'copper' }, { txt: '4 états', cls: '' }],
    ou: 'Filons géants dans les grottes de dripstone et vers Y 48 ; les noyés en laissent tomber, la ressource est donc renouvelable. 9 lingots = 1 bloc.',
    drops: [
      'Variantes disponibles — bloc, cuivre coupé (escalier, dalle), cuivre ciselé, grille de cuivre, ampoule de cuivre, porte et trappe en cuivre. Chaque forme existe en 4 états d\'oxydation, cirée ou non.',
      'Ce qu\'on en fait — la seule famille qui va du orange vif au vert-de-gris : toitures, dômes, machines, ferronnerie, décor steampunk.',
      'Piège ou limite — un bloc non ciré s\'oxyde tout seul, au hasard, et pas au même rythme que ses voisins : une toiture non cirée devient un patchwork involontaire.'
    ],
    note: 'Cirez chaque bloc au rayon de miel dès qu\'il a la teinte voulue. Une hache retire la cire et fait reculer l\'oxydation d\'un cran, et un éclair décape entièrement le bloc touché : c\'est ainsi qu\'on obtient un dégradé maîtrisé du orange au vert sur une même toiture.'
  },

  /* ---------------- TERRE, ARGILE ET VÉGÉTAL ---------------- */
  {
    nom: 'Terre cuite', cat: 'terre',
    tags: [{ txt: 'Badlands', cls: 'gold' }, { txt: '16 couleurs', cls: '' }],
    ou: 'Cuisez un bloc d\'argile. Les badlands en offrent des montagnes entières, déjà colorées en strates.',
    drops: [
      'Variantes disponibles — terre cuite naturelle (brun-orangé) et 16 couleurs (8 terres cuites + 1 teinture = 8 blocs). Aucun escalier, aucune dalle.',
      'Ce qu\'on en fait — le meilleur nuancier du jeu : toutes ses teintes sont désaturées, donc elles se mélangent sans se battre. Murs, toitures, dégradés, terrassement.',
      'Piège ou limite — pas un seul dérivé : une façade en terre cuite doit emprunter ses corniches et ses toits à une autre famille (grès, briques, bois).'
    ],
    note: 'Ne cherchez pas la bonne couleur, cherchez le bon mélange : trois teintes voisines posées au hasard (blanche, jaune claire et orange par exemple) valent mieux que n\'importe quelle couleur unique.'
  },
  {
    nom: 'Briques, argile et briques de boue', cat: 'terre',
    tags: [{ txt: 'Rouge bâti', cls: 'red' }],
    ou: 'Argile au fond des rivières et des grottes luxuriantes : 1 bloc = 4 boules, cuites en briques, 4 briques = 1 bloc. La boue s\'obtient en versant une bouteille d\'eau sur de la terre.',
    drops: [
      'Variantes disponibles — bloc de briques (escalier, dalle, muret) ; bloc d\'argile (gris-bleu pâle, sans dérivé) ; boue, boue compactée et briques de boue (escalier, dalle, muret).',
      'Ce qu\'on en fait — la brique est le seul rouge-orangé « bâti » du jeu : cheminées, usines, maisons de ville. Les briques de boue apportent un beige-gris terreux idéal pour le torchis.',
      'Piège ou limite — le bloc d\'argile brut tire nettement sur le bleu : ce n\'est en aucun cas un substitut de béton blanc.'
    ],
    note: 'Un mur de briques rouges vire vite au mur de plastique. Coupez-le de rangs de terre cuite blanche ou de bandeaux de pierre : c\'est exactement ce qui distingue une maison de ville d\'un pavé rouge.'
  },
  {
    nom: 'Mousse, azalée et blocs végétaux', cat: 'terre',
    tags: [{ txt: 'Grottes luxuriantes', cls: 'ok' }],
    ou: 'Grottes luxuriantes, ou marchand ambulant. La poudre d\'os sur un bloc de mousse le propage et convertit la pierre alentour.',
    drops: [
      'Variantes disponibles — bloc de mousse, tapis de mousse (également en version murale), racines suspendues, terre enracinée, azalée et azalée en fleurs ; mousse pâle et mousse suspendue pâle en forêt pâle.',
      'Ce qu\'on en fait — le vert le plus dense du jeu : sols de forêt, toitures envahies, jonction entre un bâtiment et son terrain.',
      'Piège ou limite — la mousse en aplat est parfaitement uniforme et paraît plate ; mélangez-la à du bloc d\'herbe, du podzol et des tapis pour lui rendre du relief.'
    ],
    note: '1 bloc de mousse + 1 pierre taillée = 2 pierres moussues, et la même recette fonctionne avec les briques de pierre. C\'est le moyen le moins cher de vieillir un mur entier, sans dépendre des lianes.'
  },
  {
    nom: 'Feuillages', cat: 'terre',
    tags: [{ txt: 'Vert', cls: 'ok' }],
    ou: 'Sur tous les arbres ; il faut des cisailles (ou le Toucher de soie) pour récupérer le bloc.',
    drops: [
      'Variantes disponibles — un feuillage par essence, chacun avec sa teinte, plus le feuillage d\'azalée, l\'azalée en fleurs et les pétales roses du cerisier.',
      'Ce qu\'on en fait — volumes d\'arbres sculptés à la main, haies, toitures végétalisées, remplissage sous un bâtiment sur pilotis.',
      'Piège ou limite — le feuillage posé par un joueur ne se décompose jamais, mais celui d\'un arbre abattu disparaît : sculptez toujours vos arbres avec des feuillages posés à la main.'
    ],
    note: 'Chêne, jungle, acacia, chêne noir et mangrove prennent la teinte du biome : le même bloc est jaunâtre en savane et vert profond en jungle. Bouleau, épicéa, cerisier et azalée gardent la même couleur partout — ce sont les seuls verts prévisibles.'
  },
  {
    nom: 'Foin et blocs de champignon', cat: 'terre',
    tags: [{ txt: 'Chaume', cls: 'gold' }],
    ou: '9 blés = 1 botte de foin (récupérable en blé). Les blocs de champignon se récoltent au Toucher de soie sur les champignons géants.',
    drops: [
      'Variantes disponibles — botte de foin (orientable comme un rondin) ; bloc de champignon rouge, bloc de champignon brun et pied de champignon (crème uni).',
      'Ce qu\'on en fait — le foin imite le chaume des toits de village ; le pied de champignon est l\'un des rares blancs cassés parfaitement mats, excellent en plafond et en façade.',
      'Piège ou limite — le foin est inflammable et amortit 80 % des dégâts de chute : mauvaise toiture près d\'une cheminée, mais parfaite zone de réception au pied d\'une tour.'
    ],
    note: 'Récoltés au Toucher de soie, les blocs de champignon affichent leur texture sur les six faces une fois reposés : c\'est ainsi qu\'on obtient de grands aplats rouges ou crème absolument uniformes.'
  },

  /* ---------------- COULEUR ---------------- */
  {
    nom: 'Béton et poudre de béton', cat: 'couleur',
    tags: [{ txt: '16 couleurs', cls: 'blue' }, { txt: 'Uni', cls: '' }],
    ou: '4 sables + 4 graviers + 1 teinture = 8 poudres. La poudre durcit dès qu\'elle touche de l\'eau.',
    drops: [
      'Variantes disponibles — 16 couleurs, en poudre et en bloc durci. Ni escalier, ni dalle, ni muret.',
      'Ce qu\'on en fait — les seules couleurs franches et parfaitement unies du jeu : architecture moderne, intérieurs, logos, pixel art, signalétique.',
      'Piège ou limite — la poudre tombe comme du sable, et une fois durci le béton ne se re-teinte plus : il faut le casser et refaire de la poudre dans la bonne couleur.'
    ],
    note: 'Le plus rapide : creusez un trou d\'un bloc, remplissez-le d\'eau et jetez-y la poudre, elle durcit à l\'instant. Sur un mur déjà monté, faites couler une seule source le long de la surface : tout ce que l\'eau touche durcit.'
  },
  {
    nom: 'Terre cuite vernissée', cat: 'couleur',
    tags: [{ txt: 'Motifs', cls: 'purple' }],
    ou: 'Cuisez une terre cuite colorée : chacune des 16 couleurs donne un motif différent.',
    drops: [
      'Variantes disponibles — 16 motifs, uniquement en bloc plein orientable ; la rotation change le dessin obtenu.',
      'Ce qu\'on en fait — carrelages, tapis de sol, frises, mosaïques : posés en carré de 2×2 dans le bon sens, la plupart des motifs se raccordent en un dessin complet.',
      'Piège ou limite — un piston peut la pousser mais jamais la tirer, et le motif est si voyant qu\'il se dose au mètre carré, pas au bâtiment.'
    ],
    note: 'L\'orientation dépend de la direction dans laquelle vous regardez au moment de la pose. Posez les quatre blocs d\'un carré en tournant d\'un quart de tour à chaque fois pour obtenir la rosace complète.'
  },
  {
    nom: 'Laine et tapis', cat: 'couleur',
    tags: [{ txt: '16 couleurs', cls: '' }, { txt: 'Inflammable', cls: 'red' }],
    ou: 'Tondez des moutons — teindre un mouton rend sa laine colorée renouvelable à l\'infini. Sinon, 4 ficelles = 1 laine.',
    drops: [
      'Variantes disponibles — 16 laines, 16 tapis (2 laines = 3 tapis), et toute la famille des lits et des bannières qui en dérive.',
      'Ce qu\'on en fait — les seules surfaces vraiment mates et « textiles » : plafonds, coussins, toitures colorées, et les tapis pour habiller un sol sans en changer la hauteur.',
      'Piège ou limite — la laine brûle très bien et propage le feu : jamais à côté d\'une cheminée ouverte, d\'un feu de camp ou dans le Nether.'
    ],
    note: 'La laine est le seul bloc qui étouffe les vibrations : un capteur à sculk et le Warden lui-même ne perçoivent rien derrière elle. C\'est l\'équipement de survie obligatoire du Deep Dark.'
  },
  {
    nom: 'Verre, vitres et verre teinté', cat: 'couleur',
    tags: [{ txt: 'Transparent', cls: 'cyan' }],
    ou: 'Cuisez du sable. 6 verres = 16 vitres ; 8 verres + 1 teinture = 8 verres colorés ; 4 éclats d\'améthyste autour d\'un verre = 1 verre teinté.',
    drops: [
      'Variantes disponibles — verre, 16 verres colorés, vitres et 16 vitres colorées, plus le verre teinté à l\'améthyste.',
      'Ce qu\'on en fait — fenêtres, serres, vitraux, aquariums ; la vitre est plus fine et se raccorde aux autres vitres, aux murets et aux barreaux de fer.',
      'Piège ou limite — le verre teinté n\'existe PAS en vitre, et le verre ordinaire ne se récupère qu\'au Toucher de soie (le verre teinté, lui, se ramasse toujours).'
    ],
    note: 'Le verre teinté est le seul bloc à la fois transparent à l\'œil et opaque à la lumière : parfait pour un plafond de ferme à monstres, une cabine d\'observation dans le noir, ou une fenêtre qui ne laisse pas fuir la lumière du jour.'
  },

  /* ---------------- NETHER ---------------- */
  {
    nom: 'Netherrack et briques du Nether', cat: 'nether',
    tags: [{ txt: 'Nether', cls: 'red' }],
    ou: 'Le Nether entier. Le netherrack se cuit en brique du Nether ; 4 briques = 1 bloc.',
    drops: [
      'Variantes disponibles — briques du Nether (escalier, dalle, muret et CLÔTURE), briques rouges (verrue du Nether + brique), briques fissurées, briques ciselées. Le netherrack n\'a aucun dérivé.',
      'Ce qu\'on en fait — un brun très sombre légèrement violacé : forteresses, donjons, cheminées, tout ce qui doit paraître calciné.',
      'Piège ou limite — la clôture en briques du Nether ne se connecte pas aux clôtures en bois, et le feu posé sur du netherrack ne s\'éteint jamais tout seul.'
    ],
    note: 'La clôture en briques du Nether est l\'un des rares barreaudages sombres du jeu : en fenêtre de donjon, en garde-corps ou en grille de cheminée, elle vaut bien mieux que les barreaux de fer, trop clairs.'
  },
  {
    nom: 'Pierre noire (blackstone)', cat: 'nether',
    tags: [{ txt: 'Le plus sombre', cls: 'purple' }],
    ou: 'Deltas de basalte et bastions. C\'est la roche la plus sombre du jeu, plus noire encore que la pierre des profondeurs.',
    drops: [
      'Variantes disponibles — pierre noire, pierre noire polie, briques de pierre noire polie, plus les versions fissurée et ciselée ; escalier, dalle et muret pour les trois principales, plus bouton et plaque de pression.',
      'Ce qu\'on en fait — elle remplace la pierre taillée dans TOUTES les recettes (fours, outils en pierre) et sert de noir profond en architecture : socles, toitures, gothique, moderne.',
      'Piège ou limite — la pierre noire dorée ne se ramasse telle quelle qu\'au Toucher de soie ; sans lui, elle éclate en pépites d\'or.'
    ],
    note: 'Pierre noire polie et pierre des profondeurs polie se confondent de loin mais pas de près : la première est neutre-violacée, la seconde franchement bleutée. Choisissez-en une par bâtiment, jamais les deux côte à côte.'
  },
  {
    nom: 'Basalte, blocs des âmes et magma', cat: 'nether',
    tags: [{ txt: 'Nether', cls: 'red' }, { txt: 'Colonnes', cls: '' }],
    ou: 'Deltas de basalte, vallées du sable des âmes. Le basalte se fabrique aussi à l\'infini avec de la lave, de la glace bleue et de la terre des âmes.',
    drops: [
      'Variantes disponibles — basalte (colonne orientable), basalte poli, basalte lisse, sable des âmes, terre des âmes, bloc de magma. Aucun de ces blocs n\'a d\'escalier ni de dalle.',
      'Ce qu\'on en fait — le basalte poli est la meilleure colonne du jeu : sa texture verticale marquée fait un pilier crédible sans le moindre assemblage. Le basalte lisse, uni et très sombre, habille les grandes surfaces.',
      'Piège ou limite — le sable des âmes ralentit et enfonce, le bloc de magma brûle au contact : ne les mettez jamais dans un sol de circulation.'
    ],
    note: 'Le basalte lisse se trouve tout fait autour des géodes d\'améthyste, mais il se cuit aussi depuis le basalte ordinaire : c\'est le gris-violet le plus profond et le plus uni disponible en grande quantité.'
  },

  /* ---------------- END ---------------- */
  {
    nom: 'Pierre de l\'End', cat: 'end',
    tags: [{ txt: 'End', cls: 'purple' }, { txt: 'Anti-explosion', cls: 'ok' }],
    ou: 'Toutes les îles de l\'End. 4 pierres de l\'End = 4 briques de l\'End.',
    drops: [
      'Variantes disponibles — pierre de l\'End (aucun dérivé) et briques de l\'End (escalier, dalle, muret).',
      'Ce qu\'on en fait — un jaune très pâle légèrement verdâtre, sans équivalent : architecture extraterrestre, temples blafards, contraste avec le mauve du purpur.',
      'Piège ou limite — sa teinte se dispute avec le grès et le quartz, qui sont chauds ; elle rend beaucoup mieux avec des gris froids et des violets.'
    ],
    note: 'La pierre de l\'End encaisse les explosions bien mieux que la pierre ordinaire : c\'est un matériau de façade valable pour une base exposée aux creepers ou aux ghasts.'
  },
  {
    nom: 'Purpur', cat: 'end',
    tags: [{ txt: 'Renouvelable', cls: 'ok' }, { txt: 'Mauve', cls: 'purple' }],
    ou: 'Cités de l\'End. Les fruits du chorus cuits donnent des fruits éclatés, et 4 fruits éclatés = 4 blocs : c\'est la seule ressource violette illimitée du jeu.',
    drops: [
      'Variantes disponibles — bloc de purpur, pilier de purpur (orientable), escalier, dalle. Pas de muret.',
      'Ce qu\'on en fait — un mauve grisâtre finement moucheté : architecture de l\'End, temples magiques, accents sur du blanc ou du noir.',
      'Piège ou limite — c\'est un violet désaturé : posé contre du béton violet ou de la laine magenta, il paraît terne et sale.'
    ],
    note: 'Alterner bloc et pilier suffit à texturer un mur entier : le pilier posé à l\'horizontale fait un bandeau, à la verticale une colonne — sans jamais changer de matériau.'
  },

  /* ---------------- AQUATIQUE ---------------- */
  {
    nom: 'Prismarine', cat: 'aquatique',
    tags: [{ txt: 'Monument', cls: 'blue' }],
    ou: 'Monuments océaniques. 4 éclats = 1 prismarine ; 9 éclats = 4 briques ; 8 éclats + poche d\'encre = 8 prismarines sombres.',
    drops: [
      'Variantes disponibles — prismarine (escalier, dalle et MURET), briques de prismarine (escalier, dalle), prismarine sombre (escalier, dalle), plus la lanterne marine.',
      'Ce qu\'on en fait — la seule famille bleu-vert minérale : bases sous-marines, temples, digues, tout ce qui doit paraître immergé depuis longtemps.',
      'Piège ou limite — la texture de la prismarine brute s\'anime en permanence et scintille : sur un grand mur, elle fatigue l\'œil. Prenez les briques pour les surfaces, la brute en petites touches.'
    ],
    note: 'Prismarine sombre plus lanterne marine, c\'est la palette du monument lui-même. Ajoutez-y du cuivre oxydé : les deux verts se répondent et une base sous-marine devient immédiatement crédible.'
  },
  {
    nom: 'Glace, neige et blancs froids', cat: 'aquatique',
    tags: [{ txt: 'Froid', cls: 'cyan' }],
    ou: 'Biomes glacés. 9 glaces = 1 glace compactée, 9 compactées = 1 glace bleue. La calcite vient des géodes d\'améthyste.',
    drops: [
      'Variantes disponibles — glace, glace compactée, glace bleue, bloc de neige, couche de neige (8 hauteurs empilables), neige poudreuse, et la calcite pour compléter la famille.',
      'Ce qu\'on en fait — igloos, banquises, vitrages laiteux, toitures enneigées ; les couches de neige servent de demi-dalles très fines pour adoucir un terrain.',
      'Piège ou limite — la glace ordinaire fond près d\'une source de lumière, la compactée et la bleue jamais. La neige poudreuse fait tomber dedans et gèle.'
    ],
    note: 'La calcite est le blanc le plus froid et le plus mat du jeu : là où le quartz jaunit et le béton blanc paraît plastique, elle donne un blanc de pierre parfaitement neutre.'
  },

  /* ---------------- LUMIÈRE ---------------- */
  {
    nom: 'Pierre lumineuse et lanterne marine', cat: 'lumiere',
    tags: [{ txt: 'Niveau 15', cls: 'gold' }],
    ou: 'La pierre lumineuse pend au plafond du Nether (4 poussières = 1 bloc) ; la lanterne marine se fabrique avec 4 éclats et 5 cristaux de prismarine.',
    drops: [
      'Variantes disponibles — deux blocs pleins de niveau 15 : la pierre lumineuse, jaune chaud, et la lanterne marine, blanc froid.',
      'Ce qu\'on en fait — l\'éclairage de masse : sous un plancher, derrière une grille, dans un plafond à caissons, ou en luminaire parfaitement assumé.',
      'Piège ou limite — cassée à main nue, la pierre lumineuse ne rend que 2 à 4 poussières alors qu\'il en faut 4 : récoltez-la au Toucher de soie ou vous y perdez à chaque bloc.'
    ],
    note: 'Une pierre lumineuse recouverte d\'un tapis reste totalement invisible et éclaire toujours : c\'est l\'éclairage de sol le plus discret du jeu, et il empêche l\'apparition des monstres.'
  },
  {
    nom: 'Froglights, shroomlight et lumières organiques', cat: 'lumiere',
    tags: [{ txt: 'Niveau 15', cls: 'gold' }, { txt: 'Rare', cls: 'purple' }],
    ou: 'Le shroomlight pousse dans les forêts du Nether ; les froglights s\'obtiennent quand une grenouille avale un petit cube de magma.',
    drops: [
      'Variantes disponibles — shroomlight (orange), froglight ocre (jaune), perlescente (rose) et verdoyante (vert) : quatre blocs pleins de niveau 15.',
      'Ce qu\'on en fait — des blocs colorés qui éclairent au maximum : plafonds, motifs lumineux, mobilier design, éclairage de façade.',
      'Piège ou limite — les froglights exigent une ferme à grenouilles fastidieuse à monter : traitez-les comme un matériau précieux, en accents.'
    ],
    note: 'La couleur dépend du biome où le têtard a grandi : tempéré donne l\'ocre, chaud la perlescente, froid la verdoyante. Transportez les têtards dans un seau vers le bon biome AVANT de les faire éclore.'
  },
  {
    nom: 'Bougies, lanternes et lumières d\'appoint', cat: 'lumiere',
    tags: [{ txt: 'Détail', cls: '' }],
    ou: 'Bougie : 1 rayon de miel + 1 ficelle, teintable en 16 couleurs. Lanterne : 8 pépites de fer + 1 torche. Le lichen luisant se récolte aux cisailles dans les grottes.',
    drops: [
      'Variantes disponibles — bougies (1 à 4 par bloc, +3 niveaux de lumière par bougie), lanternes et lanternes des âmes (posées ou suspendues), feux de camp, tiges de l\'End, lichen luisant, ampoules de cuivre.',
      'Ce qu\'on en fait — l\'éclairage d\'ambiance et de détail, celui qui donne l\'échelle et le réalisme pendant que la lumière de masse reste cachée.',
      'Piège ou limite — les bougies s\'éteignent sous l\'eau et une seule n\'éclaire qu\'au niveau 3 : ce sont des objets de décor, pas des remparts contre les monstres.'
    ],
    note: 'Le lichen luisant se plaque sur n\'importe quelle face, plafonds et parois comprises : c\'est la seule lumière qu\'on peut ajouter à un mur déjà construit sans lui donner un bloc d\'épaisseur.'
  }
];

/* ============================================================
   Palettes de construction : quoi assembler pour un style donné
   [ style, bloc principal, structure, détail & accents ]
   ============================================================ */

var PALETTES = [
  ['Médiéval à colombage',
   'Terre cuite blanche et planches de chêne',
   'Rondins de chêne noir en poutres, soubassement en pierre taillée',
   'Trappes d\'épicéa en volets, lanternes, tonneaux, escaliers de chêne noir en corniche'],

  ['Japonais traditionnel',
   'Quartz lisse ou terre cuite blanche en remplissage',
   'Ossature en chêne noir écorcé, toitures en escaliers de pierre des profondeurs polie',
   'Cerisier, bambou, pétales roses, lanternes suspendues, murets de pierre lisse'],

  ['Gothique',
   'Briques de pierre et pierre des profondeurs polie',
   'Contreforts en escaliers de deepslate, arcs brisés, flèches en pierre noire polie',
   'Vitraux en verre coloré, chaînes, barreaux de fer, bougies, tiges de l\'End'],

  ['Désertique / oriental',
   'Grès lisse et grès coupé',
   'Arcs en escaliers de grès, coupoles en grès lisse, murets de grès rouge',
   'Grès ciselé, terre cuite orange et blanche, tapis colorés, portes d\'acacia'],

  ['Viking / nordique',
   'Planches et rondins d\'épicéa',
   'Soubassement en pierre taillée moussue, toiture en escaliers d\'épicéa ou en bottes de foin',
   'Poutres saillantes de chêne noir, feux de camp, chaînes, boucliers, bannières'],

  ['Steampunk',
   'Cuivre coupé, du neuf à l\'oxydé',
   'Ossature en briques rouges et pierre lisse, planchers en chêne noir',
   'Grilles et ampoules de cuivre, chaînes, entonnoirs, chaudrons, barreaux de fer, lanternes'],

  ['Cottage anglais',
   'Planches de chêne et terre cuite blanche',
   'Soubassement en pierre taillée, toit en escaliers de chêne noir ou en foin',
   'Pots de fleurs, feuillages, ruches, tonneaux, clôtures de chêne, vitres à petits carreaux'],

  ['Industriel / entrepôt',
   'Briques rouges et pierre lisse',
   'Poutres en blocs de fer, corniches en dalles de pierre lisse, dalles de béton gris',
   'Entonnoirs, chaînes, échafaudages, portes et barreaux de fer, lanternes nues'],

  ['Méditerranéen',
   'Terre cuite blanche et grès lisse',
   'Toiture en escaliers de briques rouges, arcades en escaliers de grès',
   'Balustrades en clôtures de chêne, feuillages, terre cuite orange, vitres, pots de fleurs'],

  ['Brutaliste',
   'Béton gris clair et béton gris',
   'Volumes massifs en andésite polie, planchers en pierre lisse',
   'Verre teinté, éclairage caché derrière des dalles, blocs de fer, une seule masse végétale'],

  ['Elfique / féerique',
   'Calcite, quartz lisse et bouleau',
   'Arcs en escaliers de quartz, planchers de chêne pâle, colonnes de pilier de quartz',
   'Lanternes marines, prismarine, mousse, feuillages d\'azalée, verre coloré très clair'],

  ['Infernal (Nether)',
   'Briques du Nether et pierre noire polie',
   'Colonnes en basalte poli, planchers et charpente en bois écarlate',
   'Shroomlight, lanternes des âmes, chaînes, magma, clôtures en briques du Nether'],

  ['Sous-marin',
   'Briques de prismarine et prismarine sombre',
   'Structure en pierre taillée moussue, hublots cerclés de murets',
   'Lanternes marines, cuivre oxydé, verre coloré cyan, coraux, algues, tapis de mousse'],

  ['Futuriste',
   'Quartz lisse et béton blanc',
   'Ossature en blocs de fer et andésite polie, sols en pierre lisse',
   'Verre coloré gris, ampoules de cuivre, dalles noires en liserés, lanternes marines encastrées'],

  ['Chalet de montagne',
   'Rondins et planches d\'épicéa',
   'Soubassement en pierre taillée et andésite, toit en escaliers de chêne noir',
   'Bottes de foin, feux de camp, couches de neige, lanternes, tapis, clôtures'],

  ['Ruine envahie',
   'Pierre taillée moussue et briques de pierre fissurées',
   'Colonnes brisées en piliers et murets, escaliers ébréchés, planchers effondrés',
   'Mousse et tapis de mousse, lianes, feuillages, gravier, terre enracinée, racines suspendues'],

  ['Manoir victorien',
   'Planches de chêne noir et terre cuite blanche',
   'Cheminées et soubassement en briques rouges, encadrements en pierre lisse',
   'Vitres, garde-corps en clôtures, lanternes, tapis, bibliothèques, escaliers de chêne noir']
];

/* ============================================================
   Techniques de construction
   [ technique, comment faire, effet obtenu ]
   ============================================================ */

var TECHNIQUES_BLOCS = [
  ['Dégradé de blocs',
   'Choisissez 3 à 5 blocs de teintes voisines et passez de l\'un à l\'autre en mélangeant les deux voisins sur 2 ou 3 rangs, jamais d\'un seul coup',
   'La transition devient invisible : le mur paraît peint et non carrelé'],

  ['Bruit (texturing) d\'un mur',
   'Remplacez au hasard 1 bloc sur 6 à 1 sur 10 par une variante de la même famille : fissurée, moussue, taillée, ou une dalle enfoncée',
   'Le motif répétitif de la texture disparaît ; l\'œil lit une matière, pas un carrelage de 16 pixels'],

  ['Encorbellement',
   'Faites déborder l\'étage supérieur d\'un bloc sur la façade et soutenez le débord par des escaliers ou des dalles inversés',
   'Une ombre portée franche sur le rez-de-chaussée et une silhouette médiévale immédiate'],

  ['Arcs et voûtes',
   'Montez l\'arc avec deux escaliers en vis-à-vis, un bloc plein à la clé, et des escaliers inversés pour les retombées ; pour une portée large, intercalez un rang de dalles',
   'Une ouverture cesse d\'être un trou carré et devient un élément d\'architecture'],

  ['Toiture en escaliers',
   'Empilez les escaliers en marche (1 bloc de côté pour 1 de haut pour une pente raide, 1 pour 2 avec des dalles pour une pente douce) et fermez le dessous avec des escaliers inversés',
   'Un toit net, sans dents de scie, et un sous-toit propre vu de l\'intérieur'],

  ['Éclairage caché',
   'Enfermez la pierre lumineuse sous un tapis, derrière une trappe, dans un plafond à caissons, ou plaquez du lichen luisant sur la face cachée d\'une poutre',
   'La pièce est éclairée, aucun monstre n\'apparaît, et aucune source ne saute aux yeux'],

  ['Cassage de symétrie',
   'Construisez d\'abord parfaitement symétrique, puis déplacez la cheminée, décalez une fenêtre et ajoutez un appentis d\'un seul côté',
   'Le bâtiment paraît habité et construit au fil du temps, pas généré automatiquement'],

  ['Profondeur de façade',
   'Travaillez sur trois plans : mur de fond, pilastres en saillie d\'un bloc, puis détails (trappes, escaliers, dalles) en saillie d\'un demi-bloc',
   'De vraies ombres se dessinent selon l\'heure du jour ; le mur cesse d\'être une surface plate'],

  ['Transition entre matériaux',
   'Ne changez jamais de matériau sur une ligne droite : entremêlez les deux sur 2 ou 3 blocs, ou séparez-les par un bandeau de dalles ou d\'escaliers',
   'La rencontre pierre/bois paraît construite au lieu de sembler collée'],

  ['Blocs de détail',
   'Trappes en volets et en persiennes, clôtures en poteaux, chaînes en tirants, tiges de l\'End en tuyauterie, barreaux et échelles en ferronnerie',
   'Une échelle intermédiaire apparaît entre le bloc plein et le vide : c\'est ce qui sépare une construction finie d\'une boîte'],

  ['Échelle et proportions',
   'Comptez 3 blocs de hauteur libre minimum pour une pièce d\'habitation, 4 à 5 pour une salle noble, 2 blocs de large pour une porte principale et 5 à 7 pour une tour crédible',
   'Le bâtiment est à l\'échelle d\'un personnage de 2 blocs au lieu de paraître tassé'],

  ['Ossature d\'abord',
   'Posez les angles, les poutres maîtresses et la ligne de toiture avant tout remplissage, puis reculez en vue à la troisième personne pour juger la silhouette',
   'Les erreurs de volume se corrigent en 20 blocs au lieu de 2 000'],

  ['Ancrage au terrain',
   'Faites descendre les fondations en escalier dans la pente, ajoutez des contreforts, et végétalisez la jonction avec de la mousse, des tapis et des racines',
   'Le bâtiment sort du sol au lieu d\'être simplement posé dessus'],

  ['Embrasures de fenêtres',
   'Reculez la vitre d\'un bloc vers l\'intérieur, encadrez-la d\'escaliers ou de dalles, et ajoutez un appui saillant plus un linteau',
   'La fenêtre gagne épaisseur et ombre propre : c\'est le détail qui trahit le plus une construction bâclée'],

  ['Piliers composites',
   'N\'utilisez jamais une colonne d\'un seul bloc : base en escaliers ou en muret, fût en rondin ou en pilier orientable, chapiteau en dalle ou en escaliers inversés',
   'Une colonne crédible en trois matériaux, avec base et chapiteau, pour le même encombrement au sol'],

  ['Végétalisation maîtrisée',
   'Posez feuillages, lianes, tapis de mousse et pots de fleurs par grappes irrégulières, jamais un bloc isolé ni une ligne régulière',
   'La verdure paraît avoir poussé là ; elle adoucit les angles sans masquer l\'architecture']
];
