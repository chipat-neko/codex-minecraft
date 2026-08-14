/* ============================================================
   Génère des textures 16 × 16 ORIGINALES, dans l'esprit des blocs
   de Minecraft mais dessinées ici par programme : aucun pixel
   n'est copié du jeu. Elles sont donc versionnées et visibles
   par tout le monde, y compris sur le site publié.

   Usage : node tools/generer-textures.js

   Ordre de priorité à l'affichage :
     textures du jeu (locales, non versionnées)
       > textures générées (ici, versionnées)
         > aplat de couleur
   ============================================================ */

const fs = require('fs');
const path = require('path');
const { encoderPng } = require('./png-encode.js');

const DEST = path.resolve(__dirname, '..', 'assets', 'textures-libres');
const T = 16;

/* ---------- générateur pseudo-aléatoire déterministe ---------- */
function graine(nom) {
  let h = 2166136261;
  for (let i = 0; i < nom.length; i++) { h = Math.imul(h ^ nom.charCodeAt(i), 16777619); }
  return h >>> 0;
}
function alea(etat) {
  return function () {
    etat ^= etat << 13; etat >>>= 0;
    etat ^= etat >> 17;
    etat ^= etat << 5; etat >>>= 0;
    return etat / 4294967296;
  };
}

/* ---------- utilitaires couleur ---------- */
function hex2rgb(h) {
  h = h.replace('#', '');
  return [parseInt(h.slice(0, 2), 16), parseInt(h.slice(2, 4), 16), parseInt(h.slice(4, 6), 16)];
}
const borne = v => Math.max(0, Math.min(255, Math.round(v)));
function eclaircir(c, f) { return [borne(c[0] * f), borne(c[1] * f), borne(c[2] * f)]; }
function melanger(a, b, t) { return [borne(a[0] + (b[0] - a[0]) * t), borne(a[1] + (b[1] - a[1]) * t), borne(a[2] + (b[2] - a[2]) * t)]; }

/* ---------- toile ---------- */
function toile() {
  const p = new Uint8Array(T * T * 4);
  return {
    px: p,
    set(x, y, c, a) {
      if (x < 0 || y < 0 || x >= T || y >= T) { return; }
      const i = (y * T + x) * 4;
      p[i] = c[0]; p[i + 1] = c[1]; p[i + 2] = c[2]; p[i + 3] = a === undefined ? 255 : a;
    },
    remplir(c) { for (let y = 0; y < T; y++) { for (let x = 0; x < T; x++) { this.set(x, y, c); } } }
  };
}

/* ---------- motifs ---------- */

/* Grain irrégulier : la base de la pierre, de la terre, du sable. */
function grain(t, base, amplitude, r, densite) {
  for (let y = 0; y < T; y++) {
    for (let x = 0; x < T; x++) {
      const v = 1 + (r() - 0.5) * amplitude;
      let c = eclaircir(base, v);
      /* quelques taches plus marquées, pour éviter l'aspect « bruit uniforme » */
      if (densite && r() < densite) { c = eclaircir(c, r() < 0.5 ? 0.82 : 1.16); }
      t.set(x, y, c);
    }
  }
}

/* Cailloux jointoyés : cobblestone, pierre moussue. */
function cailloux(t, base, r) {
  grain(t, base, 0.18, r, 0.1);
  const joint = eclaircir(base, 0.62);
  /* lignes de mortier irrégulières */
  const lignes = [0, 5, 10, 15];
  for (const y of lignes) {
    for (let x = 0; x < T; x++) { if (r() > 0.18) { t.set(x, y, joint); } }
  }
  for (let bande = 0; bande < lignes.length - 1; bande++) {
    const y0 = lignes[bande], y1 = lignes[bande + 1];
    let x = Math.floor(r() * 6);
    while (x < T) {
      for (let y = y0; y <= y1; y++) { if (r() > 0.2) { t.set(x, y, joint); } }
      x += 4 + Math.floor(r() * 4);
    }
  }
}

/* Appareil de briques régulier, rangs décalés. */
function briques(t, base, r) {
  grain(t, base, 0.12, r, 0.05);
  const mortier = melanger(base, [210, 205, 195], 0.45);
  for (let y = 0; y < T; y++) {
    if (y % 4 === 0) { for (let x = 0; x < T; x++) { t.set(x, y, mortier); } }
  }
  for (let rang = 0; rang < 4; rang++) {
    const decal = rang % 2 ? 0 : 4;
    for (let x = decal; x < T; x += 8) {
      for (let y = rang * 4; y < rang * 4 + 4; y++) { t.set(x, y, mortier); }
    }
  }
}

/* Lattes horizontales veinées : les planches. */
function planches(t, base, r) {
  for (let y = 0; y < T; y++) {
    const latte = Math.floor(y / 4);
    const teinte = 1 + (latte % 2 ? 0.05 : -0.04);
    for (let x = 0; x < T; x++) {
      let c = eclaircir(base, teinte * (1 + (r() - 0.5) * 0.1));
      /* veines longitudinales */
      if (r() < 0.12) { c = eclaircir(c, 0.88); }
      t.set(x, y, c);
    }
  }
  const rainure = eclaircir(base, 0.66);
  for (let y = 3; y < T; y += 4) { for (let x = 0; x < T; x++) { t.set(x, y, rainure); } }
  /* têtes de clou */
  const clou = eclaircir(base, 0.55);
  for (let latte = 0; latte < 4; latte++) {
    const x = 1 + Math.floor(r() * 13);
    t.set(x, latte * 4 + 1, clou);
  }
}

/* Écorce verticale : les rondins. */
function rondin(t, base, r) {
  for (let x = 0; x < T; x++) {
    const colonne = 1 + (r() - 0.5) * 0.22;
    for (let y = 0; y < T; y++) {
      let c = eclaircir(base, colonne * (1 + (r() - 0.5) * 0.12));
      t.set(x, y, c);
    }
  }
  const creux = eclaircir(base, 0.6);
  for (let i = 0; i < 5; i++) {
    const x = Math.floor(r() * T);
    const h = 4 + Math.floor(r() * 10);
    const y0 = Math.floor(r() * (T - h));
    for (let y = y0; y < y0 + h; y++) { t.set(x, y, creux); }
  }
}

/* Feuillage : masse dense percée de trous. */
function feuillage(t, base, r) {
  for (let y = 0; y < T; y++) {
    for (let x = 0; x < T; x++) {
      const v = 1 + (r() - 0.5) * 0.5;
      if (r() < 0.14) { t.set(x, y, [0, 0, 0], 0); }
      else { t.set(x, y, eclaircir(base, v)); }
    }
  }
}

/* Minerai : gangue de pierre + inclusions colorées. */
function minerai(t, gangue, filon, r) {
  grain(t, gangue, 0.2, r, 0.08);
  const amas = 3 + Math.floor(r() * 2);
  for (let i = 0; i < amas; i++) {
    const cx = 2 + Math.floor(r() * (T - 4));
    const cy = 2 + Math.floor(r() * (T - 4));
    const rayon = 1 + Math.floor(r() * 2);
    for (let y = cy - rayon; y <= cy + rayon; y++) {
      for (let x = cx - rayon; x <= cx + rayon; x++) {
        const d = Math.hypot(x - cx, y - cy);
        if (d <= rayon + 0.2) {
          t.set(x, y, eclaircir(filon, d < rayon * 0.6 ? 1.12 : 0.86));
        }
      }
    }
  }
}

/* Métal : surface lisse avec un léger relief. */
function metal(t, base, r) {
  for (let y = 0; y < T; y++) {
    for (let x = 0; x < T; x++) {
      const v = 1 + (r() - 0.5) * 0.08 + (x + y < 10 ? 0.06 : 0);
      t.set(x, y, eclaircir(base, v));
    }
  }
  /* liseré sombre en bas et à droite, pour asseoir le volume */
  const ombre = eclaircir(base, 0.78);
  for (let i = 0; i < T; i++) { t.set(i, T - 1, ombre); t.set(T - 1, i, ombre); }
  const lumiere = eclaircir(base, 1.18);
  for (let i = 0; i < T; i++) { t.set(i, 0, lumiere); t.set(0, i, lumiere); }
}

/* Verre : cadre net, intérieur presque transparent. */
function verre(t, base, r) {
  for (let y = 0; y < T; y++) {
    for (let x = 0; x < T; x++) {
      const bord = x === 0 || y === 0 || x === T - 1 || y === T - 1;
      if (bord) { t.set(x, y, eclaircir(base, 1.1), 235); }
      else { t.set(x, y, base, 46); }
    }
  }
  /* reflet en diagonale */
  for (let i = 3; i < 9; i++) { t.set(i, 12 - i, eclaircir(base, 1.35), 190); }
  for (let i = 4; i < 8; i++) { t.set(i + 1, 12 - i, eclaircir(base, 1.25), 140); }
}

/* Liquide : ondulations horizontales. */
function liquide(t, base, r) {
  for (let y = 0; y < T; y++) {
    for (let x = 0; x < T; x++) {
      const onde = Math.sin((x + y * 0.6) * 0.9) * 0.08 + Math.sin(y * 1.7) * 0.05;
      t.set(x, y, eclaircir(base, 1 + onde + (r() - 0.5) * 0.06));
    }
  }
}

/* Bloc lumineux : cœur clair et halo. */
function lumineux(t, base, r) {
  for (let y = 0; y < T; y++) {
    for (let x = 0; x < T; x++) {
      const d = Math.hypot(x - 7.5, y - 7.5) / 11;
      t.set(x, y, eclaircir(base, 1.25 - d * 0.55 + (r() - 0.5) * 0.1));
    }
  }
}

/* Tissu : trame régulière. */
function tissu(t, base, r) {
  for (let y = 0; y < T; y++) {
    for (let x = 0; x < T; x++) {
      const trame = ((x + y) % 2) ? 1.04 : 0.96;
      t.set(x, y, eclaircir(base, trame * (1 + (r() - 0.5) * 0.07)));
    }
  }
}

/* Redstone : poussière rouge sur pierre. */
function poussiere(t, gangue, filon, r) {
  grain(t, gangue, 0.15, r, 0.05);
  for (let i = 0; i < 26; i++) {
    const x = Math.floor(r() * T), y = Math.floor(r() * T);
    t.set(x, y, eclaircir(filon, 0.9 + r() * 0.4));
  }
}

/* ---------- motifs d'objets (fond transparent) ---------- */

/* Lingot : barre vue de trois quarts. */
function lingot(t, base, r) {
  const clair = eclaircir(base, 1.25), sombre = eclaircir(base, 0.7);
  for (let y = 5; y < 12; y++) {
    const marge = y < 7 ? 11 - y : 4;
    for (let x = marge; x < T - marge + (y < 7 ? 0 : 0); x++) {
      if (x < 3 || x > 12) { continue; }
      let c = base;
      if (y <= 6) { c = clair; } else if (y >= 10) { c = sombre; }
      t.set(x, y, eclaircir(c, 1 + (r() - 0.5) * 0.08));
    }
  }
  /* contour */
  for (let x = 4; x <= 12; x++) { t.set(x, 4, sombre); t.set(x, 12, eclaircir(base, 0.55)); }
}

/* Gemme : losange facetté. */
function gemme(t, base, r) {
  const clair = eclaircir(base, 1.35), sombre = eclaircir(base, 0.65);
  for (let y = 0; y < T; y++) {
    for (let x = 0; x < T; x++) {
      const d = Math.abs(x - 7.5) + Math.abs(y - 7.5);
      if (d > 7.5) { continue; }
      let c = base;
      if (x - 7.5 + (y - 7.5) < -3) { c = clair; }
      else if (x - 7.5 + (y - 7.5) > 3) { c = sombre; }
      t.set(x, y, c);
    }
  }
  for (let i = 0; i < 4; i++) { t.set(6 - i + 2, 5 + i, clair); }
}

/* Tas de poudre. */
function tas(t, base, r) {
  for (let i = 0; i < 60; i++) {
    const a = r() * Math.PI * 2, d = r() * 5.4;
    const x = Math.round(7.5 + Math.cos(a) * d), y = Math.round(9 + Math.sin(a) * d * 0.6);
    t.set(x, y, eclaircir(base, 0.85 + r() * 0.4));
  }
}

/* Pastille ronde : perles, yeux, œufs, cœurs. */
function pastille(t, base, r) {
  const clair = eclaircir(base, 1.3), sombre = eclaircir(base, 0.62);
  for (let y = 0; y < T; y++) {
    for (let x = 0; x < T; x++) {
      const d = Math.hypot(x - 7.5, y - 7.5);
      if (d > 5.6) { continue; }
      let c = base;
      if (d > 4.6) { c = sombre; }
      else if (x + y < 13) { c = clair; }
      t.set(x, y, eclaircir(c, 1 + (r() - 0.5) * 0.1));
    }
  }
  t.set(5, 5, eclaircir(clair, 1.15));
}

/* Feuille plate : papier, cuir, membrane. */
function feuille(t, base, r) {
  const bord = eclaircir(base, 0.72);
  for (let y = 2; y < 14; y++) {
    for (let x = 2; x < 14; x++) {
      const cadre = x === 2 || x === 13 || y === 2 || y === 13;
      t.set(x, y, cadre ? bord : eclaircir(base, 1 + (r() - 0.5) * 0.09));
    }
  }
  /* pli en diagonale */
  for (let i = 0; i < 5; i++) { t.set(9 + i, 3 + i, eclaircir(base, 0.85)); }
}

/* Fiole : contenant en verre avec un fond coloré. */
function fiole(t, base, r) {
  const verre = [190, 205, 215];
  for (let y = 3; y < 14; y++) {
    const largeur = y < 6 ? 2 : 4;
    for (let x = 7 - largeur; x <= 8 + largeur - 1; x++) {
      const bord = x === 7 - largeur || x === 8 + largeur - 1;
      if (y >= 9) { t.set(x, y, eclaircir(base, bord ? 0.8 : 1)); }
      else { t.set(x, y, eclaircir(verre, bord ? 0.85 : 1.05), bord ? 235 : 150); }
    }
  }
  for (let x = 6; x <= 9; x++) { t.set(x, 2, eclaircir(verre, 0.9)); }
}

/* Éclat anguleux : silex, échos, prismarine, écailles. */
function eclat(t, base, r) {
  const clair = eclaircir(base, 1.28), sombre = eclaircir(base, 0.66);
  const pts = [[7, 3], [10, 5], [11, 9], [8, 12], [5, 10], [4, 6]];
  for (let y = 0; y < T; y++) {
    for (let x = 0; x < T; x++) {
      /* test d'appartenance au polygone */
      let dedans = false;
      for (let i = 0, j = pts.length - 1; i < pts.length; j = i++) {
        const [xi, yi] = pts[i], [xj, yj] = pts[j];
        if ((yi > y) !== (yj > y) && x < (xj - xi) * (y - yi) / (yj - yi) + xi) { dedans = !dedans; }
      }
      if (!dedans) { continue; }
      t.set(x, y, x + y < 14 ? clair : (x + y > 19 ? sombre : base));
    }
  }
}

/* Fibre enroulée : ficelle, corde. */
function fibre(t, base, r) {
  for (let i = 0; i < 40; i++) {
    const a = r() * Math.PI * 2, d = 2 + r() * 3.6;
    t.set(Math.round(7.5 + Math.cos(a) * d), Math.round(7.5 + Math.sin(a) * d * 0.8),
      eclaircir(base, 0.85 + r() * 0.35));
  }
}

/* Tige en diagonale. */
function tige(t, base, r) {
  const clair = eclaircir(base, 1.2), sombre = eclaircir(base, 0.72);
  for (let i = 0; i < 11; i++) {
    const x = 3 + i, y = 12 - i;
    t.set(x, y, base); t.set(x, y + 1, sombre); t.set(x + 1, y, clair);
  }
}

/* ---------- catalogue des textures à produire ---------- */
/* clé : nom de fichier ; valeur : [motif, couleur(s)] */
const CATALOGUE = {
  planches_chene:   ['planches', '#b0865a'],
  planches_epicea:  ['planches', '#7a5a34'],
  planches_bouleau: ['planches', '#d7c185'],
  planches_sombre:  ['planches', '#4b3218'],
  planches_cerisier:['planches', '#e0a9a0'],
  rondin_chene:     ['rondin', '#6f5133'],
  rondin_ecorce:    ['rondin', '#b99a68'],
  pierre:           ['grain', '#7f7f7f'],
  cobblestone:      ['cailloux', '#6f6f6f'],
  pierre_moussue:   ['cailloux', '#6b7a5e'],
  briques_pierre:   ['briques', '#7c7c7c'],
  briques_rouges:   ['briques', '#9b5b4a'],
  briques_nether:   ['briques', '#40222a'],
  deepslate:        ['grain', '#3d3d45'],
  pierre_noire:     ['grain', '#2b2730'],
  gres:             ['grain', '#ded6a5'],
  terre:            ['grain', '#6e4f34'],
  terre_labouree:   ['grain', '#4d3421'],
  sable:            ['grain', '#ded6a5'],
  gravier:          ['cailloux', '#8f8880'],
  herbe:            ['grain', '#5f9e46'],
  feuillage:        ['feuillage', '#38702a'],
  mousse:           ['feuillage', '#4e7d3a'],
  obsidienne:       ['grain', '#17102a'],
  netherrack:       ['grain', '#6b3033'],
  pierre_end:       ['grain', '#dcdfa6'],
  quartz:           ['grain', '#ece7e0'],
  prismarine:       ['grain', '#5fa39a'],
  neige:            ['grain', '#f0f5fa'],
  glace:            ['liquide', '#9fd6ef'],
  argile:           ['grain', '#a3a8b8'],
  terre_cuite:      ['grain', '#a3603f'],
  beton_blanc:      ['grain', '#d8dade'],
  laine:            ['tissu', '#e2e5e5'],
  laine_rouge:      ['tissu', '#a02b26'],
  foin:             ['tissu', '#c8a83c'],
  verre:            ['verre', '#8fc7dd'],
  eau:              ['liquide', '#3a6fd0'],
  lave:             ['liquide', '#e0672a'],
  bloc_fer:         ['metal', '#d6d6d6'],
  bloc_or:          ['metal', '#f0c040'],
  bloc_diamant:     ['metal', '#4fd6e0'],
  bloc_cuivre:      ['metal', '#c06a3a'],
  bloc_emeraude:    ['metal', '#2fd47a'],
  bloc_redstone:    ['metal', '#a01c14'],
  bloc_lapis:       ['metal', '#2c53b8'],
  bloc_charbon:     ['grain', '#1c1c20'],
  minerai_fer:      ['minerai', '#7f7f7f', '#c8a583'],
  minerai_or:       ['minerai', '#7f7f7f', '#f0c040'],
  minerai_diamant:  ['minerai', '#7f7f7f', '#4fd6e0'],
  minerai_charbon:  ['minerai', '#7f7f7f', '#23232a'],
  minerai_cuivre:   ['minerai', '#7f7f7f', '#d97a4a'],
  minerai_lapis:    ['minerai', '#7f7f7f', '#2c53b8'],
  minerai_emeraude: ['minerai', '#7f7f7f', '#2fd47a'],
  minerai_redstone: ['poussiere', '#7f7f7f', '#c8382c'],
  glowstone:        ['lumineux', '#e8c46a'],
  lanterne_marine:  ['lumineux', '#a8d8c8'],
  amethyste:        ['lumineux', '#a06cf0'],
  bloc_slime:       ['verre', '#7fc46a'],
  bloc_miel:        ['verre', '#e8a52a'],
  sable_ames:       ['grain', '#4a3a30'],
  basalte:          ['rondin', '#4a4a52'],
  purpur:           ['grain', '#a86ca8'],
  bambou:           ['rondin', '#79b83c'],
  cactus:           ['grain', '#4f8a3d'],
  champignon_rouge: ['grain', '#c33c34'],
  bloc_ame:         ['grain', '#503a2e'],
  tuff:             ['grain', '#6c6c62'],
  calcite:          ['grain', '#dfdfd6'],

  /* objets */
  lingot_fer:       ['lingot', '#d8d8d8'],
  lingot_or:        ['lingot', '#f0c040'],
  lingot_cuivre:    ['lingot', '#d97a4a'],
  lingot_netherite: ['lingot', '#6b5b52'],
  gemme_diamant:    ['gemme', '#4fd6e0'],
  gemme_emeraude:   ['gemme', '#2fd47a'],
  gemme_lapis:      ['gemme', '#2c53b8'],
  gemme_amethyste:  ['gemme', '#a06cf0'],
  gemme_quartz:     ['gemme', '#ece7e0'],
  tas_redstone:     ['tas', '#c8382c'],
  tas_poudre:       ['tas', '#8c8c8c'],
  tas_blaze:        ['tas', '#e8a52a'],
  tas_charbon:      ['tas', '#26262a'],
  tas_ble:          ['tas', '#d3b23c'],
  tige_baton:       ['tige', '#8a6a3e'],
  tige_blaze:       ['tige', '#f0b429'],
  tige_os:          ['tige', '#e8e4d8'],

  /* objets ronds */
  bille_perle:      ['pastille', '#1c7a6e'],
  bille_oeil:       ['pastille', '#8c3232'],
  bille_oeuf:       ['pastille', '#e9dcc0'],
  bille_coeur:      ['pastille', '#79d6d0'],
  bille_pomme:      ['pastille', '#c93b2e'],
  bille_argile:     ['pastille', '#a3a8b8'],
  bille_encre:      ['pastille', '#22222a'],
  bille_citrouille: ['pastille', '#d97a20'],

  /* objets plats */
  feuille_papier:   ['feuille', '#efeade'],
  feuille_cuir:     ['feuille', '#8a5f34'],
  feuille_livre:    ['feuille', '#a8763c'],
  feuille_membrane: ['feuille', '#6a6a80'],
  feuille_chair:    ['feuille', '#7a5a44'],
  feuille_plume:    ['feuille', '#f2f2f2'],

  /* contenants */
  fiole_vide:       ['fiole', '#a8d8e8'],
  fiole_larme:      ['fiole', '#dff0ee'],
  fiole_bol:        ['fiole', '#8a6a3e'],

  /* fragments */
  eclat_silex:      ['eclat', '#565660'],
  eclat_echo:       ['eclat', '#1b3a45'],
  eclat_prisma:     ['eclat', '#6fd0bc'],
  eclat_ecaille:    ['eclat', '#8a6a4a'],
  eclat_tortue:     ['eclat', '#5aa84a'],
  eclat_crane:      ['eclat', '#3a3a3a'],
  eclat_nautile:    ['eclat', '#c8b88c'],
  eclat_brique:     ['eclat', '#a05a48'],
  eclat_cire:       ['eclat', '#c08a3e'],

  /* fibres et divers */
  fibre_ficelle:    ['fibre', '#e8e8e8'],
  fibre_corde:      ['fibre', '#9a9a9a'],
  tas_sucre:        ['tas', '#f0f0f0'],
  tige_canne:       ['tige', '#8ec96a'],
  tige_fleche:      ['tige', '#b8b8b8'],
  grain_nether:     ['grain', '#8c2020'],
  grain_ame:        ['grain', '#4a3a30']
};

/* Correspondance entre les clés du site et ces textures.
   Les caractères sont ceux des schémas de plans (voir BLOCKS dans core.js). */
const POUR_BLOCS = {
  '#': 'planches_chene', 'o': 'rondin_chene', 'k': 'rondin_ecorce',
  'b': 'briques_pierre', 'c': 'cobblestone', 'm': 'pierre_moussue',
  'd': 'deepslate', 'n': 'pierre_noire', 'a': 'gres', 'r': 'briques_nether',
  'q': 'quartz', 'g': 'verre', 'G': 'verre', 'w': 'eau', 'l': 'lave',
  't': 'terre', 'f': 'terre_labouree', 'e': 'herbe', '%': 'feuillage',
  '*': 'glowstone', 'D': 'planches_chene', '/': 'planches_chene',
  '-': 'pierre', '|': 'planches_chene', '+': 'planches_chene',
  'W': 'laine', 'L': 'planches_chene', 'M': 'cobblestone', 'O': 'obsidienne',
  'A': 'sable', 'B': 'pierre', 's': 'planches_chene', '~': 'eau',
  'R': 'bloc_redstone', 'X': 'bloc_redstone', 'Z': 'pierre', 'V': 'pierre',
  'P': 'planches_epicea', 'S': 'bloc_slime', 'Q': 'pierre', 'H': 'bloc_fer',
  'E': 'planches_epicea', 'U': 'cobblestone', 'Y': 'planches_chene',
  'I': 'bloc_fer', 'J': 'bloc_slime', '=': 'bloc_fer', '_': 'pierre',
  '!': 'planches_chene', 'T': 'bloc_fer', 'K': 'planches_chene',
  'N': 'mousse', 'C': 'bloc_fer', 'F': 'rondin_chene', 'p': 'cactus',
  'u': 'bambou', 'z': 'bambou', 'v': 'feuillage', 'h': 'foin',
  'i': 'glace', 'j': 'bloc_miel', 'y': 'rondin_ecorce',
  '&': 'planches_chene', '$': 'obsidienne', '(': 'bloc_fer', '<': 'laine_rouge',
  '{': 'planches_epicea', '}': 'bloc_or', '>': 'bloc_fer', '?': 'cobblestone',
  ',': 'terre', ';': 'laine_rouge'
};

const POUR_ITEMS = {
  planche: 'planches_chene', bois: 'rondin_chene', baton: 'tige_baton',
  pierre: 'pierre', cobble: 'cobblestone', fer: 'lingot_fer', or: 'lingot_or',
  cuivre: 'lingot_cuivre', cuivreLg: 'lingot_cuivre', netherite: 'lingot_netherite',
  diamant: 'gemme_diamant', emeraude: 'gemme_emeraude', lapis: 'gemme_lapis',
  amethyste: 'gemme_amethyste', quartz: 'gemme_quartz', charbon: 'tas_charbon',
  redstone: 'tas_redstone', poudre: 'tas_poudre', poudreBl: 'tas_blaze',
  blaze: 'tige_blaze', os: 'tige_os', ble: 'tas_ble', obsi: 'obsidienne',
  sable: 'sable', gravier: 'gravier', verre: 'verre', laine: 'laine',
  ferB: 'bloc_fer', orB: 'bloc_or', diamB: 'bloc_diamant', cuivreB: 'bloc_cuivre',
  charbonB: 'bloc_charbon', foin: 'foin', glowstone: 'glowstone',
  neige: 'neige', ame: 'sable_ames', argileB: 'terre_cuite', slime: 'bloc_slime',
  miel: 'bloc_miel', bambou: 'bambou', cactus: 'cactus', champi: 'champignon_rouge',
  pierreL: 'pierre', dalle: 'pierre', dalleP: 'pierre', bloc: 'pierre',
  ressource: 'lingot_fer', outil: 'lingot_fer', pepiteFer: 'lingot_fer',
  pepite: 'lingot_or', tnt: 'briques_rouges', debris: 'lingot_netherite',
  scrap: 'lingot_netherite',

  /* objets ajoutés pour couvrir tout le catalogue de recettes */
  silex: 'eclat_silex', ficelle: 'fibre_ficelle', cuir: 'feuille_cuir',
  plume: 'feuille_plume', oeuf: 'bille_oeuf', sucre: 'tas_sucre',
  canne: 'tige_canne', papier: 'feuille_papier', livre: 'feuille_livre',
  livreEnc: 'feuille_livre', argile: 'bille_argile', brique: 'eclat_brique',
  perle: 'bille_perle', larme: 'fiole_larme', chair: 'feuille_chair',
  araignee: 'bille_oeil', bol: 'fiole_bol', pomme: 'bille_pomme',
  echo: 'eclat_echo', citrouille: 'bille_citrouille', citrouilleB: 'bille_citrouille',
  tete: 'eclat_crane', crampon: 'eclat_nautile', carapace: 'eclat_nautile',
  coeurMer: 'bille_coeur', prisma: 'eclat_prisma', encre: 'bille_encre',
  encreLum: 'bille_encre', cire: 'eclat_cire', corde: 'fibre_corde',
  fleche: 'tige_fleche', bouteille: 'fiole_vide', nether: 'grain_nether',
  ecaille: 'eclat_ecaille', scute: 'eclat_tortue', membrane: 'feuille_membrane',
  ame_torch: 'grain_ame', oeil: 'bille_perle', boussole: 'bille_coeur',
  colorant: 'tas_poudre', fleur: 'bille_pomme', fleurR: 'bille_pomme',
  patate: 'bille_argile', lapinC: 'feuille_chair', melon: 'bille_pomme',
  carotte: 'tige_canne', cacao: 'bille_argile', miel: 'fiole_larme',
  etoile: 'gemme_quartz', lourd: 'eclat_crane', tige: 'tige_blaze',
  lance: 'tige_fleche', etiquette: 'feuille_papier', wagonnet: 'lingot_fer',
  pepiteFer: 'lingot_fer', seau: 'lingot_fer', arc: 'tige_baton',
  cadre: 'feuille_papier', banniere: 'feuille_papier', bouclier: 'feuille_cuir',
  disque: 'bille_encre', tesson: 'eclat_brique', modele: 'feuille_papier',
  armeD: 'gemme_diamant', chorus: 'bille_pomme', chaine: 'lingot_fer',
  glowstone: 'glowstone', poudreLum: 'tas_poudre', plaque: 'pierre',
  torche: 'tige_blaze', torcheR: 'tige_blaze', torcheA: 'tige_blaze',
  piston: 'planches_epicea', dropper: 'cobblestone', coffre: 'planches_epicea',
  four: 'cobblestone', etabli: 'planches_chene', bibli: 'planches_chene'
};

/* Tous les motifs exposent la même signature (toile, couleur, aléa),
   sauf ceux à deux couleurs qui reçoivent (toile, gangue, filon, aléa). */
const MOTIFS = {
  grain: function (t, base, r) { grain(t, base, 0.22, r, 0.08); },
  cailloux, briques, planches, rondin, feuillage, metal, verre, liquide, lumineux, tissu,
  minerai, poussiere,
  lingot, gemme, tas, tige,
  pastille, feuille, fiole, eclat, fibre
};

/* ---------- production ---------- */
fs.mkdirSync(DEST, { recursive: true });
let n = 0;
const index = {};

for (const nom in CATALOGUE) {
  const [motif, c1, c2] = CATALOGUE[nom];
  const fn = MOTIFS[motif];
  if (!fn) { console.log('  ⚠ motif inconnu :', motif); continue; }

  const t = toile();
  const r = alea(graine(nom) || 1);
  const base = hex2rgb(c1);

  if (motif === 'minerai' || motif === 'poussiere') { fn(t, base, hex2rgb(c2), r); }
  else { fn(t, base, r); }

  fs.writeFileSync(path.join(DEST, nom + '.png'), encoderPng(t.px, T, T));
  index[nom] = nom + '.png';
  n++;
}

/* index au même format que celui des textures du jeu, pour que
   l'affichage puisse basculer de l'un à l'autre sans cas particulier */
const sortie = { blocs: {}, items: {} };
let manquants = 0;
for (const cle in POUR_BLOCS) {
  const tex = POUR_BLOCS[cle];
  if (!index[tex]) { console.log('  ⚠ bloc "' + cle + '" → texture inconnue : ' + tex); manquants++; continue; }
  sortie.blocs[cle] = { f: index[tex] };
}
for (const cle in POUR_ITEMS) {
  const tex = POUR_ITEMS[cle];
  if (!index[tex]) { console.log('  ⚠ item "' + cle + '" → texture inconnue : ' + tex); manquants++; continue; }
  sortie.items[cle] = { f: index[tex] };
}

fs.writeFileSync(path.join(DEST, 'index.js'),
  '/* Textures générées par tools/generer-textures.js.\n' +
  '   Dessinées par programme : aucun pixel ne provient du jeu.\n' +
  '   Versionnées, donc visibles aussi sur le site publié. */\n' +
  'var TEXTURES_LIBRES = ' + JSON.stringify(sortie, null, 1) + ';\n', 'utf8');

console.log(`✅ ${n} textures générées dans assets/textures-libres/`);
console.log(`   ${Object.keys(sortie.blocs).length} blocs et ${Object.keys(sortie.items).length} items associés` +
  (manquants ? ` (${manquants} correspondance(s) invalide(s))` : ''));
