/* ============================================================
   Lecture des fichiers .class du jeu.

   Le jar de la 26.2 n'est pas obfusqué : classes, champs et méthodes
   portent leurs vrais noms. Certaines données du jeu ne sont écrites
   nulle part en JSON — les recettes de brassage, par exemple, sont
   construites en dur dans PotionBrewing. Ce module les rend lisibles.

   Il ne cherche pas à décompiler : il donne la table des constantes
   et la suite des instructions, ce qui suffit à retrouver quelles
   valeurs une méthode enchaîne.
   ============================================================ */

const { lire } = require('./zip.js');

function analyser(buf) {
  let o = 0;
  const u1 = () => buf.readUInt8(o++);
  const u2 = () => { const v = buf.readUInt16BE(o); o += 2; return v; };
  const u4 = () => { const v = buf.readUInt32BE(o); o += 4; return v; };

  if (u4() !== 0xCAFEBABE) { throw new Error('ce fichier n\'est pas une classe Java'); }
  u2(); u2(); /* versions mineure et majeure */

  const n = u2();
  const cp = new Array(n);
  for (let i = 1; i < n; i++) {
    const tag = u1();
    switch (tag) {
      case 1: { const lg = u2(); cp[i] = { tag, v: buf.toString('utf8', o, o + lg) }; o += lg; break; }
      case 3: { cp[i] = { tag, v: buf.readInt32BE(o) }; o += 4; break; }
      case 4: { cp[i] = { tag, v: buf.readFloatBE(o) }; o += 4; break; }
      /* long et double occupent deux places dans la table : d'où le i++ */
      case 5: { cp[i] = { tag, v: buf.readBigInt64BE(o) }; o += 8; i++; break; }
      case 6: { cp[i] = { tag, v: buf.readDoubleBE(o) }; o += 8; i++; break; }
      case 7: case 8: case 16: case 19: case 20: { cp[i] = { tag, a: u2() }; break; }
      case 9: case 10: case 11: case 12: case 17: case 18: { cp[i] = { tag, a: u2(), b: u2() }; break; }
      case 15: { cp[i] = { tag, k: u1(), a: u2() }; break; }
      default: throw new Error('constante de type ' + tag + ' inconnue en position ' + i);
    }
  }

  const txt = i => (cp[i] && cp[i].tag === 1) ? cp[i].v : '?' + i;
  function nommer(i) {
    const e = cp[i];
    if (!e) { return '?' + i; }
    switch (e.tag) {
      case 1: return e.v;
      case 3: case 4: return String(e.v);
      case 5: case 6: return String(e.v);
      case 7: return txt(e.a);
      case 8: return '"' + txt(e.a) + '"';
      case 9: case 10: case 11: return nommer(e.a) + '.' + nommer(e.b);
      case 12: return txt(e.a) + ':' + txt(e.b);
      case 15: return 'MH' + nommer(e.a);
      case 16: return 'MT' + txt(e.a);
      case 17: case 18: return 'Dyn#' + e.a + ' ' + nommer(e.b);
      default: return 'tag' + e.tag;
    }
  }
  /* Valeur brute d'une constante littérale, sans mise en forme. */
  function valeur(i) {
    const e = cp[i];
    if (!e) { return null; }
    if (e.tag === 8) { return txt(e.a); }
    if (e.tag === 3 || e.tag === 4 || e.tag === 5 || e.tag === 6) { return e.v; }
    return null;
  }

  u2(); /* accès */
  const soi = nommer(u2());
  const parent = nommer(u2());
  const interfaces = []; { const k = u2(); for (let i = 0; i < k; i++) { interfaces.push(nommer(u2())); } }

  function attributs() {
    const k = u2(); const out = [];
    for (let i = 0; i < k; i++) {
      const nom = txt(u2()); const lg = u4();
      out.push({ nom, data: buf.subarray(o, o + lg) }); o += lg;
    }
    return out;
  }
  function membres() {
    const k = u2(); const out = [];
    for (let i = 0; i < k; i++) {
      out.push({ acces: u2(), nom: txt(u2()), type: txt(u2()), attributs: attributs() });
    }
    return out;
  }

  const champs = membres(), methodes = membres(), attrs = attributs();
  return { cp, nommer, valeur, txt, nom: soi, parent, interfaces, champs, methodes, attributs: attrs };
}

/* ---- Jeu d'instructions ---------------------------------- */

const OPS = {};
const def = (code, nom, taille) => { OPS[code] = { nom, taille }; };

const SANS_ARG = {
  0x00: 'nop', 0x01: 'aconst_null', 0x02: 'iconst_m1', 0x03: 'iconst_0', 0x04: 'iconst_1',
  0x05: 'iconst_2', 0x06: 'iconst_3', 0x07: 'iconst_4', 0x08: 'iconst_5', 0x09: 'lconst_0',
  0x0a: 'lconst_1', 0x0b: 'fconst_0', 0x0c: 'fconst_1', 0x0d: 'fconst_2', 0x0e: 'dconst_0',
  0x0f: 'dconst_1', 0x2e: 'iaload', 0x2f: 'laload', 0x30: 'faload', 0x31: 'daload',
  0x32: 'aaload', 0x33: 'baload', 0x34: 'caload', 0x35: 'saload', 0x4f: 'iastore',
  0x50: 'lastore', 0x51: 'fastore', 0x52: 'dastore', 0x53: 'aastore', 0x54: 'bastore',
  0x55: 'castore', 0x56: 'sastore', 0x57: 'pop', 0x58: 'pop2', 0x59: 'dup', 0x5a: 'dup_x1',
  0x5b: 'dup_x2', 0x5c: 'dup2', 0x5d: 'dup2_x1', 0x5e: 'dup2_x2', 0x5f: 'swap',
  0xbe: 'arraylength', 0xbf: 'athrow', 0xc2: 'monitorenter', 0xc3: 'monitorexit'
};
for (const k in SANS_ARG) { def(+k, SANS_ARG[k], 0); }
for (let i = 0x60; i <= 0x83; i++) { def(i, 'calcul_' + i.toString(16), 0); }
for (let i = 0x85; i <= 0x98; i++) { def(i, 'conv_' + i.toString(16), 0); }
['ireturn', 'lreturn', 'freturn', 'dreturn', 'areturn', 'return']
  .forEach((n, i) => def(0xac + i, n, 0));

['iload', 'lload', 'fload', 'dload', 'aload'].forEach((n, i) => {
  def(0x15 + i, n, 1);
  for (let j = 0; j < 4; j++) { def(0x1a + i * 4 + j, n + '_' + j, 0); }
});
['istore', 'lstore', 'fstore', 'dstore', 'astore'].forEach((n, i) => {
  def(0x36 + i, n, 1);
  for (let j = 0; j < 4; j++) { def(0x3b + i * 4 + j, n + '_' + j, 0); }
});

def(0x10, 'bipush', 1); def(0x11, 'sipush', 2);
def(0x12, 'ldc', 1); def(0x13, 'ldc_w', 2); def(0x14, 'ldc2_w', 2);
def(0x84, 'iinc', 2); def(0xa9, 'ret', 1);

const SAUTS = ['ifeq', 'ifne', 'iflt', 'ifge', 'ifgt', 'ifle', 'if_icmpeq', 'if_icmpne',
  'if_icmplt', 'if_icmpge', 'if_icmpgt', 'if_icmple', 'if_acmpeq', 'if_acmpne', 'goto', 'jsr'];
SAUTS.forEach((n, i) => def(0x99 + i, n, 2));

def(0xb2, 'getstatic', 2); def(0xb3, 'putstatic', 2);
def(0xb4, 'getfield', 2); def(0xb5, 'putfield', 2);
def(0xb6, 'invokevirtual', 2); def(0xb7, 'invokespecial', 2); def(0xb8, 'invokestatic', 2);
def(0xb9, 'invokeinterface', 4); def(0xba, 'invokedynamic', 4);
def(0xbb, 'new', 2); def(0xbc, 'newarray', 1); def(0xbd, 'anewarray', 2);
def(0xc0, 'checkcast', 2); def(0xc1, 'instanceof', 2); def(0xc5, 'multianewarray', 3);
def(0xc6, 'ifnull', 2); def(0xc7, 'ifnonnull', 2); def(0xc8, 'goto_w', 4); def(0xc9, 'jsr_w', 4);

const VERS_CONSTANTE = new Set(['ldc', 'ldc_w', 'ldc2_w', 'getstatic', 'putstatic',
  'getfield', 'putfield', 'invokevirtual', 'invokespecial', 'invokestatic',
  'invokeinterface', 'invokedynamic', 'new', 'anewarray', 'checkcast',
  'instanceof', 'multianewarray']);

function corps(m) {
  const a = m.attributs.find(x => x.nom === 'Code');
  if (!a) { return null; }
  return a.data.subarray(8, 8 + a.data.readUInt32BE(4));
}

/* Suite des instructions d'une méthode, sous forme d'objets
   { pos, op, ref, cst, arg } — `ref` étant la constante nommée
   et `cst` sa valeur brute quand il s'agit d'un littéral. */
function instructions(cl, m) {
  const c = corps(m);
  if (!c) { return []; }
  const out = [];
  let p = 0;
  while (p < c.length) {
    const pos = p;
    const code = c[p++];
    const info = OPS[code];
    if (!info) { out.push({ pos, op: 'INCONNU_0x' + code.toString(16) }); break; }
    const ins = { pos, op: info.nom };

    if (code === 0xaa) { /* tableswitch : aligné sur 4 octets */
      while (p % 4 !== 0) { p++; }
      p += 4;
      const bas = c.readInt32BE(p); p += 4;
      const haut = c.readInt32BE(p); p += 4;
      p += 4 * (haut - bas + 1);
      ins.op = 'tableswitch'; ins.arg = bas + '-' + haut;
    } else if (code === 0xab) { /* lookupswitch */
      while (p % 4 !== 0) { p++; }
      p += 4;
      const k = c.readInt32BE(p); p += 4; p += 8 * k;
      ins.op = 'lookupswitch'; ins.arg = k;
    } else if (code === 0xc4) { /* wide */
      const suivant = c[p++];
      p += (suivant === 0x84) ? 4 : 2;
      ins.op = 'wide';
    } else if (info.taille) {
      const brut = c.subarray(p, p + info.taille);
      p += info.taille;
      if (VERS_CONSTANTE.has(info.nom)) {
        const i = info.taille === 1 ? brut[0] : brut.readUInt16BE(0);
        ins.idx = i;
        ins.ref = cl.nommer(i);
        const v = cl.valeur(i);
        if (v !== null) { ins.cst = v; }
      } else if (info.nom === 'bipush') { ins.arg = brut.readInt8(0); }
      else if (info.nom === 'sipush') { ins.arg = brut.readInt16BE(0); }
      else if (info.nom === 'iinc') { ins.arg = brut[0] + ',' + brut.readInt8(1); }
      else if (SAUTS.includes(info.nom) || info.nom === 'ifnull' || info.nom === 'ifnonnull') {
        ins.arg = '->' + (pos + brut.readInt16BE(0));
      } else if (info.nom === 'goto_w' || info.nom === 'jsr_w') {
        ins.arg = '->' + (pos + brut.readInt32BE(0));
      } else { ins.arg = brut.toString('hex'); }
    }
    out.push(ins);
  }
  return out;
}

/* Rendu lisible d'une instruction. */
function ecrire(i) {
  return i.pos + ': ' + i.op +
    (i.ref !== undefined ? ' ' + i.ref : '') +
    (i.arg !== undefined ? ' ' + i.arg : '');
}

function charger(chemin) {
  const b = lire(chemin);
  if (!b) { throw new Error('classe absente du jar : ' + chemin); }
  return analyser(b);
}

module.exports = { analyser, charger, instructions, ecrire };

if (require.main === module) {
  const cl = charger(process.argv[2]);
  const filtre = process.argv[3];
  console.log('CLASSE ' + cl.nom + ' hérite de ' + cl.parent);
  console.log('\n-- champs --');
  cl.champs.forEach(f => console.log('  ' + f.nom + ' : ' + f.type));
  console.log('\n-- méthodes --');
  cl.methodes.forEach(m => console.log('  ' + m.nom + m.type));
  for (const m of cl.methodes) {
    if (filtre && !new RegExp(filtre).test(m.nom)) { continue; }
    console.log('\n=== ' + m.nom + m.type + ' ===');
    instructions(cl, m).forEach(i => console.log(ecrire(i)));
  }
}
