/* ============================================================
   Lecture binaire du .jar, en Node pur.

   jar.js passe par PowerShell, ce qui convient pour du texte mais
   abîme le binaire : les .class doivent être lus octet par octet.
   Ce module ouvre l'archive directement et rend des Buffer intacts.
   Il est aussi nettement plus rapide, l'archive n'étant lue qu'une
   fois puis gardée en cache.
   ============================================================ */

const fs = require('fs');
const zlib = require('zlib');
const { trouverJar } = require('./jar.js');

/* Lit le catalogue central de l'archive : il donne la position de
   chaque entrée sans avoir à parcourir le fichier entier. */
function lireCatalogue(chemin) {
  const fd = fs.openSync(chemin, 'r');
  const taille = fs.fstatSync(fd).size;

  /* La fin de catalogue est en queue de fichier, précédée d'un
     commentaire de longueur libre : on remonte à sa signature. */
  const queue = Buffer.alloc(Math.min(66000, taille));
  fs.readSync(fd, queue, 0, queue.length, taille - queue.length);
  let fin = -1;
  for (let i = queue.length - 22; i >= 0; i--) {
    if (queue.readUInt32LE(i) === 0x06054b50) { fin = i; break; }
  }
  if (fin < 0) { fs.closeSync(fd); throw new Error('archive illisible : ' + chemin); }

  const octets = queue.readUInt32LE(fin + 12);
  const debut = queue.readUInt32LE(fin + 16);
  const cat = Buffer.alloc(octets);
  fs.readSync(fd, cat, 0, octets, debut);

  const entrees = [];
  let o = 0;
  while (o < cat.length && cat.readUInt32LE(o) === 0x02014b50) {
    const nomLg = cat.readUInt16LE(o + 28);
    entrees.push({
      nom: cat.toString('utf8', o + 46, o + 46 + nomLg),
      methode: cat.readUInt16LE(o + 10),
      compresse: cat.readUInt32LE(o + 20),
      brut: cat.readUInt32LE(o + 24),
      position: cat.readUInt32LE(o + 42)
    });
    o += 46 + nomLg + cat.readUInt16LE(o + 30) + cat.readUInt16LE(o + 32);
  }
  return { fd, entrees };
}

const cache = {};

function ouvrir(chemin) {
  const c = chemin || trouverJar();
  if (!c) { throw new Error('aucun .jar de Minecraft trouvé'); }
  if (!cache[c]) { cache[c] = lireCatalogue(c); }
  return cache[c];
}

/* Extrait une entrée. L'en-tête local reprend la longueur du nom et
   du champ « extra », qui diffèrent parfois de ceux du catalogue :
   c'est lui qui fait foi pour trouver le début des données. */
function extraire(fd, e) {
  const tete = Buffer.alloc(30);
  fs.readSync(fd, tete, 0, 30, e.position);
  const debut = e.position + 30 + tete.readUInt16LE(26) + tete.readUInt16LE(28);
  const buf = Buffer.alloc(e.compresse);
  fs.readSync(fd, buf, 0, e.compresse, debut);
  return e.methode === 0 ? buf : zlib.inflateRawSync(buf);
}

/* Contenu binaire d'une entrée, ou null si elle n'existe pas. */
function lire(nom, chemin) {
  const z = ouvrir(chemin);
  const e = z.entrees.find(x => x.nom === nom);
  return e ? extraire(z.fd, e) : null;
}

/* Noms des entrées correspondant à une expression régulière.
   Contrairement à jar.js/lister, le motif reste en JavaScript :
   `\.` s'écrit normalement, sans détour par PowerShell. */
function chercher(motif, chemin) {
  const re = motif instanceof RegExp ? motif : new RegExp(motif);
  return ouvrir(chemin).entrees.filter(e => re.test(e.nom)).map(e => e.nom);
}

module.exports = { ouvrir, lire, chercher, trouverJar };

if (require.main === module) {
  const motif = process.argv[2];
  if (!motif) { console.log(ouvrir().entrees.length + ' entrées'); }
  else {
    const r = chercher(motif);
    console.log(r.length + ' correspondance(s)');
    r.slice(0, +(process.argv[3] || 60)).forEach(n => console.log('  ' + n));
  }
}
