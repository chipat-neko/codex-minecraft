# Codex Minecraft

Site statique de référence sur Minecraft Java Edition : drops et lieux d'apparition,
recettes d'artisanat, plans de construction, usines et fermes automatiques.

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
index.html             Accueil : progression de partie, repères chiffrés, dimensions
drops.html             Catalogue 1  — 87 fiches de drops + minerais + troc piglin
craft.html             Catalogue 2  — 127 recettes avec grille 3×3 dessinée
potions.html           Catalogue 3  — 18 potions, toute la chaîne de brassage
enchantements.html     Catalogue 4  — 32 enchantements, optimisation de l'enclume
redstone.html          Catalogue 5  — 10 composants, 13 circuits, dépannage
villageois.html        Catalogue 6  — 14 métiers, commerce, remise par soin
biomes.html            Catalogue 7  — 26 biomes et ressources exclusives
structures.html        Catalogue 8  — 33 structures, butin et pièges
blocs.html             Catalogue 9  — 38 familles de blocs, 17 palettes
succes.html            Catalogue 10 — 49 succès
plans.html             Catalogue 11 — 26 plans de construction couche par couche
usines.html            Catalogue 12 — 34 usines et fermes automatiques
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
```

## Vérifier le site

```
node tools/valider.js
```

Contrôle les grilles de schéma (lignes de longueur égale, caractères connus), les items
référencés par les recettes, l'unicité des identifiants, les liens de navigation croisés
entre toutes les pages, la correspondance filtres ↔ catégories, le rendu sans exception de
chaque fiche, la génération des vues 3D, et l'encodage UTF-8 de tous les fichiers.
La commande renvoie un code d'erreur non nul si quelque chose ne va pas.

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
