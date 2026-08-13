# Codex Minecraft

Site statique de référence sur Minecraft Java Edition : drops et lieux d'apparition,
recettes d'artisanat, plans de construction, usines et fermes automatiques.

## Ouvrir le site

Double-cliquez sur `index.html`. Aucune installation, aucun serveur, aucune connexion
internet nécessaire : tout est en HTML/CSS/JS classiques et fonctionne en `file://`.

## Arborescence

```
index.html            Accueil : progression de partie, repères chiffrés, dimensions
drops.html            Catalogue 1 — 87 fiches de drops + table des minerais + troc piglin
craft.html            Catalogue 2 — 127 recettes avec grille 3×3 dessinée + cuisson
potions.html          Catalogue 3 — 18 potions, chaîne de brassage, modificateurs, kits
biomes.html           Catalogue 4 — 26 biomes et leurs ressources exclusives
enchantements.html    Catalogue 5 — 32 enchantements, postes, optimisation de l'enclume
redstone.html         Catalogue 6 — 10 composants + 13 circuits + dépannage
villageois.html       Catalogue 7 — 14 métiers, commerce, remise par soin, hall
plans.html            Catalogue 8 — 19 plans de construction couche par couche
usines.html           Catalogue 9 — 25 usines/fermes automatiques + dépannage
assets/
  style.css           Feuille de style unique (thèmes sombre et clair)
  core.js             Palette de blocs, moteurs de rendu, recherche/filtres,
                      thème, favoris, impression, vue isométrique, sommaire
  data-drops.js       Données : mobs, minerais, structures, troc
  data-craft.js       Données : recettes
  data-potions.js     Données : brassage
  data-biomes.js      Données : biomes
  data-enchant.js     Données : enchantements
  data-redstone.js    Données : composants et circuits
  data-villageois.js  Données : métiers et commerce
  data-plans.js       Données : plans de construction
  data-usines.js      Données : fermes automatiques
```

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
