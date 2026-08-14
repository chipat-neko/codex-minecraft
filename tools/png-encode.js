/* ============================================================
   Encodeur PNG minimal, sans dépendance.
   Produit du RGBA 8 bits non entrelacé — largement suffisant
   pour des textures 16 × 16.
   ============================================================ */

const zlib = require('zlib');

/* Table CRC-32 standard (polynôme 0xEDB88320) */
const TABLE_CRC = (() => {
  const t = new Int32Array(256);
  for (let n = 0; n < 256; n++) {
    let c = n;
    for (let k = 0; k < 8; k++) { c = c & 1 ? 0xEDB88320 ^ (c >>> 1) : c >>> 1; }
    t[n] = c;
  }
  return t;
})();

function crc32(buf) {
  let c = -1;
  for (let i = 0; i < buf.length; i++) { c = TABLE_CRC[(c ^ buf[i]) & 0xFF] ^ (c >>> 8); }
  return (c ^ -1) >>> 0;
}

function chunk(type, data) {
  const len = Buffer.alloc(4);
  len.writeUInt32BE(data.length, 0);
  const corps = Buffer.concat([Buffer.from(type, 'ascii'), data]);
  const crc = Buffer.alloc(4);
  crc.writeUInt32BE(crc32(corps), 0);
  return Buffer.concat([len, corps, crc]);
}

/* pixels : Uint8Array RGBA de longueur w * h * 4 */
function encoderPng(pixels, w, h) {
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(w, 0);
  ihdr.writeUInt32BE(h, 4);
  ihdr[8] = 8;   /* profondeur */
  ihdr[9] = 6;   /* type couleur : RVBA */
  ihdr[10] = 0;  /* compression */
  ihdr[11] = 0;  /* filtrage */
  ihdr[12] = 0;  /* entrelacement */

  /* une octet de filtre (0 = aucun) devant chaque ligne */
  const brut = Buffer.alloc(h * (1 + w * 4));
  for (let y = 0; y < h; y++) {
    brut[y * (1 + w * 4)] = 0;
    for (let x = 0; x < w * 4; x++) {
      brut[y * (1 + w * 4) + 1 + x] = pixels[y * w * 4 + x];
    }
  }

  return Buffer.concat([
    Buffer.from([0x89, 0x50, 0x4E, 0x47, 0x0D, 0x0A, 0x1A, 0x0A]),
    chunk('IHDR', ihdr),
    chunk('IDAT', zlib.deflateSync(brut, { level: 9 })),
    chunk('IEND', Buffer.alloc(0))
  ]);
}

module.exports = { encoderPng, crc32 };
