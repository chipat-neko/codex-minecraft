/* ============================================================
   Décodeur PNG minimal (sans dépendance) — suffisant pour les
   textures de Minecraft : types couleur 0, 2, 3, 4 et 6,
   profondeurs 1 / 2 / 4 / 8 bits, sans entrelacement.

   Beaucoup de textures du jeu sont des images à palette codées
   sur 4 bits : leur prise en charge n'est pas optionnelle.

   Sert uniquement à calculer la couleur moyenne d'une texture.
   ============================================================ */

const zlib = require('zlib');

function lireChunks(buf) {
  const chunks = [];
  let p = 8; /* saute la signature */
  while (p + 8 <= buf.length) {
    const len = buf.readUInt32BE(p);
    const type = buf.toString('ascii', p + 4, p + 8);
    chunks.push({ type, data: buf.slice(p + 8, p + 8 + len) });
    p += 12 + len; /* longueur + type + données + CRC */
  }
  return chunks;
}

/* nombre de canaux par type de couleur */
const CANAUX = { 0: 1, 2: 3, 3: 1, 4: 2, 6: 4 };

function paeth(a, b, c) {
  const p = a + b - c, pa = Math.abs(p - a), pb = Math.abs(p - b), pc = Math.abs(p - c);
  return pa <= pb && pa <= pc ? a : (pb <= pc ? b : c);
}

/* Renvoie { w, h, pixels: [ {r,g,b,a}, … ] } ou null si non géré */
function decoder(buf) {
  if (buf.length < 8 || buf.readUInt32BE(0) !== 0x89504e47) { return null; }
  const chunks = lireChunks(buf);
  const ihdr = chunks.find(c => c.type === 'IHDR');
  if (!ihdr) { return null; }

  const w = ihdr.data.readUInt32BE(0);
  const h = ihdr.data.readUInt32BE(4);
  const profondeur = ihdr.data[8];
  const typeCouleur = ihdr.data[9];
  const entrelace = ihdr.data[12];
  if (entrelace !== 0) { return null; }
  if (![1, 2, 4, 8].includes(profondeur)) { return null; }
  /* moins de 8 bits n'existe que pour les images à palette ou en niveaux de gris */
  if (profondeur < 8 && typeCouleur !== 3 && typeCouleur !== 0) { return null; }

  const canaux = CANAUX[typeCouleur];
  if (!canaux) { return null; }

  const palette = chunks.find(c => c.type === 'PLTE');
  const trns = chunks.find(c => c.type === 'tRNS');

  /* tRNS a trois significations selon le type de couleur :
     - type 3 : une table d'alpha, un octet par entrée de palette ;
     - type 0 : une valeur de gris entièrement transparente ;
     - type 2 : un triplet RVB entièrement transparent. */
  let clefGris = null, clefRvb = null;
  if (trns && typeCouleur === 0 && trns.data.length >= 2) {
    clefGris = trns.data.readUInt16BE(0) & maxValTemp(profondeur);
  } else if (trns && typeCouleur === 2 && trns.data.length >= 6) {
    clefRvb = [trns.data.readUInt16BE(0) & 0xff, trns.data.readUInt16BE(2) & 0xff, trns.data.readUInt16BE(4) & 0xff];
  }
  function maxValTemp(p) { return (1 << p) - 1; }

  const idat = Buffer.concat(chunks.filter(c => c.type === 'IDAT').map(c => c.data));
  let brut;
  try { brut = zlib.inflateSync(idat); } catch (e) { return null; }

  /* le filtre travaille sur des octets : au moins 1, arrondi au supérieur */
  const bpp = Math.max(1, Math.ceil(canaux * profondeur / 8));
  const parLigne = Math.ceil(w * canaux * profondeur / 8);
  const maxVal = (1 << profondeur) - 1;
  const pixels = [];
  let precedente = Buffer.alloc(parLigne);

  for (let y = 0; y < h; y++) {
    const debut = y * (parLigne + 1);
    if (debut + 1 + parLigne > brut.length) { break; }
    const filtre = brut[debut];
    const ligne = Buffer.from(brut.slice(debut + 1, debut + 1 + parLigne));

    for (let i = 0; i < parLigne; i++) {
      const a = i >= bpp ? ligne[i - bpp] : 0;
      const b = precedente[i];
      const c = i >= bpp ? precedente[i - bpp] : 0;
      let v = ligne[i];
      if (filtre === 1) { v += a; }
      else if (filtre === 2) { v += b; }
      else if (filtre === 3) { v += (a + b) >> 1; }
      else if (filtre === 4) { v += paeth(a, b, c); }
      ligne[i] = v & 0xff;
    }
    precedente = ligne;

    /* lit la valeur brute du canal `c` du pixel `x`, quelle que soit la profondeur */
    const valeur = (x, c) => {
      if (profondeur === 8) { return ligne[x * canaux + c]; }
      const bit = (x * canaux + c) * profondeur;
      const octet = ligne[bit >> 3];
      const decalage = 8 - profondeur - (bit & 7);
      return (octet >> decalage) & maxVal;
    };

    for (let x = 0; x < w; x++) {
      let r, g, bl, al = 255;
      if (typeCouleur === 6) { r = valeur(x, 0); g = valeur(x, 1); bl = valeur(x, 2); al = valeur(x, 3); }
      else if (typeCouleur === 2) {
        r = valeur(x, 0); g = valeur(x, 1); bl = valeur(x, 2);
        if (clefRvb && r === clefRvb[0] && g === clefRvb[1] && bl === clefRvb[2]) { al = 0; }
      }
      else if (typeCouleur === 0) {
        const v = valeur(x, 0);
        if (clefGris !== null && v === clefGris) { al = 0; }
        r = g = bl = Math.round(v * 255 / maxVal);
      }
      else if (typeCouleur === 4) { r = g = bl = valeur(x, 0); al = valeur(x, 1); }
      else if (typeCouleur === 3) {
        if (!palette) { return null; }
        const idx = valeur(x, 0);
        r = palette.data[idx * 3]; g = palette.data[idx * 3 + 1]; bl = palette.data[idx * 3 + 2];
        if (trns && idx < trns.data.length) { al = trns.data[idx]; }
      }
      pixels.push({ r, g, b: bl, a: al });
    }
  }
  return { w, h, pixels };
}

/* Couleur moyenne des pixels suffisamment opaques.
   `frames` : pour une texture animée, on ne prend que la première image. */
function couleurMoyenne(buf, frames) {
  const img = decoder(buf);
  if (!img || !img.pixels.length) { return null; }
  const hauteurUtile = frames > 1 ? Math.floor(img.h / frames) : img.h;
  let r = 0, g = 0, b = 0, n = 0;
  for (let y = 0; y < hauteurUtile; y++) {
    for (let x = 0; x < img.w; x++) {
      const p = img.pixels[y * img.w + x];
      if (!p || p.a < 128) { continue; }
      r += p.r; g += p.g; b += p.b; n++;
    }
  }
  if (!n) { return null; }
  const hex = v => Math.round(v / n).toString(16).padStart(2, '0');
  return '#' + hex(r) + hex(g) + hex(b);
}

module.exports = { decoder, couleurMoyenne };
