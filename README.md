# Codex Minecraft

Site statique de référence sur Minecraft Java Edition : mécaniques du jeu, drops et lieux
d'apparition, recettes, potions, enchantements, commerce, biomes, structures, blocs,
décoration, transport, plans de construction et fermes automatiques.

## Comment ce contenu est vérifié

Le guide a d'abord été rédigé de mémoire. Il s'est ensuite avéré que **beaucoup d'affirmations
étaient fausses** — des recettes infaisables, des objets qui n'existent pas, des succès qui
envoyaient affronter le mauvais monstre. La méthode ci-dessous a été mise en place pour cela,
et elle reste la bonne à suivre pour toute modification future.

**La source de vérité est le `.jar` du jeu installé**, pas la mémoire ni un wiki. Il contient
les recettes, les tables de butin, les enchantements, les échanges villageois, les succès et
les biomes, tous en JSON lisible. Le fichier de langue `fr_fr.json`, lui, n'est pas dans le
`.jar` : il se trouve dans `%APPDATA%\.minecraft\assets\objects\` via l'index
`assets\indexes\*.json`.

Trois règles pratiques, apprises à leurs dépens :

1. **Ne jamais appliquer une correction sans la relire dans le JSON.** Sur les rapports d'audit
   produits pendant cette session, plusieurs affirmations se sont révélées inexactes — un
   superlatif sur un poids de table, un objet classé dans la mauvaise structure.
2. **Un faux positif coûte plus cher qu'un oubli.** Un outil de vérification qui crie au loup
   finit par être ignoré, et c'est alors qu'il laisse passer les vrais écarts. Quand une donnée
   n'est pas déterminable, il vaut mieux l'écrire « inconnue » que de la deviner.
3. **Certaines valeurs ne sont pas dans les données** : dégâts, durabilité, vitesses et recettes
   de brassage sont codés en Java. Elles restent lisibles — le `.jar` n'est pas obfusqué et
   `tools/classe.js` désassemble les classes concernées — mais cette voie est plus fragile qu'un
   JSON. Ce qui n'est déterminable ni par l'un ni par l'autre s'écrit « inconnu », jamais deviné.

```
node tools/verifier-jeu.js    # compare le guide au .jar installé
node tools/valider.js         # cohérence interne du site
node tools/indexer.js         # reconstruit l'index de recherche
```

À relancer après chaque mise à jour du jeu : c'est ce qui permet de rattraper une recette
modifiée ou un butin déplacé sans tout relire.

## Ouvrir le site

Double-cliquez sur `index.html`. Aucune installation, aucun serveur, aucune connexion
internet nécessaire : tout est en HTML/CSS/JS classiques et fonctionne en `file://`.

## Afficher les vraies textures du jeu

Par défaut, chaque bloc et chaque objet s'affiche avec **la couleur moyenne réelle de sa
texture**, calculée à partir du jeu et stockée dans `assets/couleurs.js` (versionné).

Pour aller plus loin et afficher **les textures elles-mêmes** :

```
node tools/extract-textures.js
```

Le script trouve votre installation Minecraft, ouvre le `.jar` de la version la plus récente
et en extrait les ~160 textures dont le site a besoin, dans `assets/textures/`. Rechargez la
page : grilles de craft, plans et vue 3D utilisent alors les vrais visuels du jeu.

Vous pouvez viser une version précise :

```
node tools/extract-textures.js "C:/Users/moi/AppData/Roaming/.minecraft/versions/1.21.4/1.21.4.jar"
```

**Pourquoi ce n'est pas fourni** — les textures de Minecraft appartiennent à Mojang et ne
peuvent pas être redistribuées. `assets/textures/` est donc dans `.gitignore` : chacun les
extrait depuis sa propre copie du jeu. Sans elles, le site reste parfaitement lisible, avec
ses aplats de couleur. Les couleurs moyennes, elles, sont des valeurs dérivées : elles sont
versionnées et bénéficient à tout le monde.

Le fichier `tools/texture-map.js` fait la correspondance entre les clés du site et les noms
de textures du jeu. Si une version renomme une texture, c'est le seul fichier à corriger :
le script signale toute texture introuvable au lieu d'échouer.

## Arborescence

```
index.html             Accueil : les catalogues, la progression, les repères chiffrés
parcours.html          Parcours guidé — 24 étapes ordonnées, 16 jalons
mecaniques.html        32 mécaniques de fond, 24 constantes, 16 erreurs courantes
drops.html             101 fiches de drops + table des minerais + troc piglin
craft.html             129 recettes avec grille 3×3 dessinée
potions.html           21 potions, toute la chaîne de brassage
enchantements.html     33 enchantements, optimisation de l'enclume
redstone.html          10 composants, 13 circuits, dépannage
villageois.html        14 métiers, commerce, remise permanente par soin
biomes.html            27 biomes et leurs ressources exclusives
structures.html        33 structures, butin et pièges
blocs.html             38 familles de blocs, 17 palettes, formes posables
deco.html              34 montages de décoration, 14 ambiances
transport.html         32 moyens de déplacement et d'orientation
succes.html            49 succès
plans.html             34 plans de construction couche par couche
usines.html            42 usines et fermes automatiques
assets/
  style.css            Feuille de style unique (thèmes sombre et clair)
  core.js              Palette de blocs, moteurs de rendu, recherche/filtres,
                       thème, favoris, impression, vue isométrique, sommaire
  couleurs.js          Couleurs moyennes réelles des textures (généré, versionné)
  textures/            Textures extraites du jeu (généré, NON versionné)
  data-drops.js        Données : mobs, minerais, structures, troc
  data-craft.js        Données : recettes
  data-potions.js      Données : brassage
  data-biomes.js       Données : biomes
  data-enchant.js      Données : enchantements
  data-redstone.js     Données : composants et circuits
  data-villageois.js   Données : métiers et commerce
  data-structures.js   Données : structures et succès
  data-blocs.js        Données : familles de blocs, palettes, techniques
  data-plans.js        Données : plans de construction
  data-usines.js       Données : fermes automatiques
tools/
  extract-textures.js  Extrait les textures depuis votre installation Minecraft
  texture-map.js       Correspondance clés du site → noms de textures du jeu
  png.js               Décodeur PNG minimal (couleur moyenne d'une texture)
  valider.js           Validation complète : données, rendus, pages, encodage
  verifier-jeu.js      Compare le contenu aux données réelles du .jar
  jar.js               Lecture du .jar en texte, via PowerShell (JSON, listes)
  zip.js               Lecture du .jar en binaire, en Node pur (fichiers .class)
  classe.js            Désassemble une classe Java : constantes et instructions
  brassage.js          Recettes de brassage et durées d'effet, lues dans le code
  indexer.js           Construit l'index de la recherche globale
  generer-textures.js  Produit les textures originales publiables
  png-encode.js        Encodeur PNG minimal (pour le générateur)
```

## Après avoir ajouté du contenu

```
node tools/indexer.js      # reconstruit l'index de la recherche globale
node tools/valider.js      # contrôle tout le site
```

L'index de recherche n'est pas régénéré automatiquement : sans cette commande,
les nouvelles entrées restent introuvables depuis <kbd>Ctrl</kbd>+<kbd>K</kbd>.

## Vérifier le contenu contre le jeu

```
node tools/verifier-jeu.js
```

Compare le guide aux données réelles de votre installation Minecraft et signale
les écarts, en citant à chaque fois le fichier JSON du `.jar` qui fait foi :

- **niveaux maximaux des enchantements** (`data/minecraft/enchantment/`)
- **recettes** : existence, quantité produite, nombre de lignes du motif
- **outil requis par chaque minerai** (tags `needs_*_tool`)
- **table de troc des piglins**
- **objets cités dans le butin des mobs**
- **recettes de brassage et durées des potions** (lues dans le bytecode)
- **contenu des coffres de structure**, objet par objet
- **incompatibilités entre enchantements** (tags `exclusive_set`)

À relancer après chaque mise à jour du jeu : c'est ce qui permet de rattraper
une recette modifiée ou un butin déplacé sans tout relire.

### Lire ce qui n'est pas en JSON

Tout n'est pas exposé en données. Les recettes de brassage, par exemple,
n'existent nulle part en JSON : `PotionBrewing.addVanillaMixes()` construit la
table à la main, en Java. Comme le `.jar` n'est pas obfusqué, on peut la lire :

```
node tools/brassage.js        # les 63 recettes de brassage et les durées
node tools/classe.js <chemin.class> [filtre]   # désassemble une classe
node tools/zip.js <motif>     # cherche une entrée dans le .jar
```

`tools/classe.js` ne décompile pas : il rend la table des constantes et la
suite des instructions, ce qui suffit à retrouver quelles valeurs une méthode
enchaîne. `tools/brassage.js` s'en sert pour reconstituer les recettes et les
durées d'effet, que la section [10] du vérificateur compare ensuite au guide.

Cette voie est plus fragile qu'un JSON : elle dépend de la forme du code
compilé. Elle échoue franchement (message d'erreur, pas de silence) si Mojang
renomme la méthode. En contrepartie, elle rend contrôlables des valeurs qui
ne l'étaient pas du tout.

### Les coffres : comparer de la prose à des données

Les fiches de structures décrivent les coffres en français courant, pas en
listes. Le contrôle cherche donc dans le texte les objets « décisifs » — ceux
pour lesquels on fait le déplacement — et vérifie qu'ils sont bien dans la
table de butin. Deux précautions le rendent utilisable :

- seules les lignes qui **décrivent un coffre** sont lues, pour ne pas
  confondre le butin avec les blocs récupérables ou ce que lâchent les mobs ;
- les libellés sont encadrés de **frontières de mots**, sans quoi « seau » se
  déclencherait sur « ré*seau* » et « os » sur « p*os*ez ». Les noms de matière
  écartent en plus la forme « en diamant », qui qualifie un objet au lieu de
  promettre la ressource brute.

Ce contrôle a une contrepartie assumée : reformuler une fiche peut le rendre
aveugle à un objet. Il attrape les affirmations fausses, pas les oublis.

Une limite connue, volontairement gérée : certains objets ne figurent dans
aucune table de butin parce qu'ils sont **portés** par le mob et lâchés par le
mécanisme d'équipement — le trident et le coquillage nautile du noyé, par
exemple. Les signaler produirait de faux écarts, ils sont donc exclus du
contrôle. Toute correction proposée par l'outil doit être relue dans le JSON
cité avant d'être appliquée.

## Vérifier le site

```
node tools/valider.js
```

Contrôle les grilles de schéma (lignes de longueur égale, caractères connus), les items
référencés par les recettes, l'unicité des identifiants, les liens de navigation croisés
entre toutes les pages, la correspondance filtres ↔ catégories, le rendu sans exception de
chaque fiche, la génération des vues 3D, et l'encodage UTF-8 de tous les fichiers.
La commande renvoie un code d'erreur non nul si quelque chose ne va pas.

### Les niveaux d'une construction ont tous la taille du cadre

C'est le contrôle le moins évident, et celui qui a coûté le plus cher avant
d'exister. Quand les couches d'une même construction n'ont pas la même taille,
le rendu les recentre — `floor((max − taille) / 2)` sur les deux axes. Ce
décalage n'apparaît nulle part dans les données et ne correspond à aucune
intention : un toit plus étroit que la maison se retrouve centré sur le cadre,
donc décalé si la maison ne l'est pas ; une échelle, un pilier ou une flèche de
clocher glissent d'un niveau à l'autre.

Trois plans en ont souffert. Le toit de l'auberge tombait trois blocs à l'est du
bâtiment, au-dessus de la cour, parce que le cadre incluait l'écurie. La flèche
de la cathédrale atterrissait au-dessus de la nef.

Les grilles portent donc désormais leur pourtour d'air explicitement. Pour
rattraper une construction saisie autrement :

```
node tools/normaliser-couches.js          # étend chaque grille au cadre
node tools/normaliser-couches.js --essai  # montre ce qui changerait
```

L'outil vérifie que le dessin est identique avant et après — en mémoire, puis
une seconde fois en relisant les fichiers écrits. Cette relecture n'est pas du
zèle : la première version ciblait les couches par leur titre, et deux fermes
partageant dix intitulés mot pour mot, elle en a écrasé une à la place de
l'autre sans que rien ne le signale.


### Faire tourner une usine

```
node tools/tester-usine.js            # tous les protocoles
node tools/tester-usine.js four-auto  # un seul
```

Verifier que les blocs tiennent ne suffit pas : une fonderie dont tous les
blocs tiennent ne fond rien si un entonnoir pointe du mauvais cote. Or un plan
vu de dessus ne dit pas les orientations. Chaque usine a donc son protocole :
ce quon pose, comment on loriente, ce quon met en entree, combien de temps on
laisse tourner, et ce quon doit trouver a larrivee.

Trois essais existent pour linstant : la fonderie produit 7 lingots en 75
secondes, ce qui confirme le rendement annonce par sa fiche ; le portail
corrige sallume ; linverseur inverse bien dans les deux sens.

Le protocole est aussi faillible que le plan : deux des trois essais ont dabord
echoue par ma faute, un entonnoir aspirant ce qui le surmonte et non ce qui est
a cote, une torche devant etre fixee sur son support et non posee pres de lui.
Un echec se relit donc avant daccuser la fiche.

## Fonctions de l'interface

| Fonction | Où | Détail |
|---|---|---|
| Recherche | toutes les pages à catalogue | Raccourci <kbd>/</kbd>, insensible à la casse **et aux accents** |
| Filtres | barre d'outils | Se combinent avec la recherche |
| Favoris | étoile ☆ de chaque fiche | Mémorisés dans le navigateur ; filtre « ★ Favoris » |
| Thème clair / sombre | bouton de l'en-tête | Mémorisé d'une visite à l'autre |
| Impression | bouton sur chaque plan/usine | N'imprime que la fiche choisie |
| Vue 3D | bouton sur les plans empilables | Rendu isométrique SVG des couches, généré au clic |
| Sommaire latéral | plans, usines, redstone — écrans ≥ 1140 px | Groupé par catégorie, suit le défilement |
| Recherche globale | <kbd>Ctrl</kbd>+<kbd>K</kbd> ou la loupe | Cherche dans les 12 catalogues à la fois, navigable au clavier |
| Calcul des matériaux | bouton sur chaque plan/usine | Compte les blocs dessinés dans les schémas, convertit en piles |
| Formes d'un bloc | page Blocs | Montre ce qu'on peut poser : escalier, dalle, muret, clôture… |

## Ajouter une page

Trois fichiers de données suivent le format « fiche » (`renderEntry`) : drops, potions, biomes,
enchantements, composants redstone, métiers. Deux suivent le format « schéma » (`renderBlueprint`) :
plans, usines, circuits redstone. Une nouvelle page se construit en copiant une page existante du
même format et en changeant le fichier de données chargé.

Les `id` des schémas doivent être **uniques sur l'ensemble du site**, toutes listes confondues :
`PLANS`, `USINES` et `CIRCUITS` partagent le même espace de noms pour les ancres.

## Ajouter du contenu

Tout le contenu vit dans les fichiers `data-*.js`. Aucune modification du HTML n'est
nécessaire pour ajouter une entrée.

**Une fiche de drop** (`data-drops.js`) :

```js
{
  nom: 'Nom du mob', cat: 'hostile',        // cat doit exister dans les filtres de drops.html
  tags: [{ txt: 'Surworld', cls: 'ok' }],
  ou: 'Où il apparaît…',
  drops: ['Objet ×0–2 — précision', '…'],
  note: 'Astuce facultative.'
}
```

**Une recette** (`data-craft.js`) : la grille est un tableau de 1 à 3 chaînes de 1 à 3
caractères. `legende` associe chaque caractère à une clé de l'objet `ITEMS`.

```js
{
  nom: 'Objet', cat: 'outil', qte: 1, sortie: 'Objet',
  grille: ['FFF', ' B ', ' B '],
  legende: { F: 'fer', B: 'baton' },
  desc: 'Explication.'
}
```

**Un plan ou une usine** (`data-plans.js`, `data-usines.js`) : chaque couche est un
tableau de chaînes de **longueur identique**. Chaque caractère renvoie à l'objet
`BLOCKS` défini en haut de `core.js` ; `.` et l'espace valent « air ». La légende sous
le plan est générée automatiquement à partir des caractères réellement utilisés.

```js
{
  id: 'mon-plan', nom: 'Nom', cat: 'maison', taille: '9 × 7', diff: 'Débutant',
  desc: '…',
  mats: ['≈200 planches', '…'],
  couches: [ { t: 'Y+0 · plancher', g: ['#####', '#####'] } ],
  etapes: ['Première étape : …'],
  rendement: '…',                            // usines uniquement
  notes: [{ type: 'tip', txt: 'Astuce : …' }]  // type : tip | warn | danger | info
}
```

Les `id` servent d'ancres : `plans.html#mon-plan` ouvre directement la fiche.

Le bouton « Vue 3D » n'apparaît que si le plan compte au moins deux couches **empilables** :
un plan dont un titre de couche contient « côté », « face », « coupe » ou « profil » est
automatiquement exclu, car ces schémas sont des élévations et non des étages superposés.

Toute nouvelle catégorie doit être déclarée à trois endroits : dans `cat`, dans les boutons
`data-cat` de la page, et dans `GROUPES_PLANS` / `GROUPES_USINES` (libellé et ordre du sommaire).

## Version du jeu

Le contenu couvre les mécaniques modernes de Java Edition : distribution des minerais
depuis la 1.18, table de forge et ornements d'armure depuis la 1.20, chambres d'épreuve,
fabricateur (crafter) et masse depuis la 1.21. Les taux de drop sont donnés en difficulté
Normale, sans enchantement.
