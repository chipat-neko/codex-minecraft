# Codex Minecraft

Site statique de référence sur Minecraft Java Edition : drops et lieux d'apparition,
recettes d'artisanat, plans de construction, usines et fermes automatiques.

## Ouvrir le site

Double-cliquez sur `index.html`. Aucune installation, aucun serveur, aucune connexion
internet nécessaire : tout est en HTML/CSS/JS classiques et fonctionne en `file://`.

## Arborescence

```
index.html          Accueil : progression de partie, repères chiffrés, dimensions
drops.html          Catalogue 1 — 87 fiches de drops + table des minerais + troc piglin
craft.html          Catalogue 2 — 85 recettes avec grille 3×3 dessinée + brassage + enchantements
plans.html          Catalogue 3 — 11 plans de construction couche par couche
usines.html         Catalogue 4 — 25 usines/fermes automatiques + dépannage
assets/
  style.css         Feuille de style unique
  core.js           Palette de blocs, moteurs de rendu, moteur de recherche/filtres
  data-drops.js     Données : mobs, minerais, structures, troc
  data-craft.js     Données : recettes
  data-plans.js     Données : plans de construction
  data-usines.js    Données : fermes automatiques
```

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

## Version du jeu

Le contenu couvre les mécaniques modernes de Java Edition : distribution des minerais
depuis la 1.18, table de forge et ornements d'armure depuis la 1.20, chambres d'épreuve,
fabricateur (crafter) et masse depuis la 1.21. Les taux de drop sont donnés en difficulté
Normale, sans enchantement.
