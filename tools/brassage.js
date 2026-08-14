/* ============================================================
   Recettes de brassage, lues dans le code du jeu.

   Contrairement aux recettes d'établi, le brassage n'existe sous
   aucune forme JSON dans le jar : PotionBrewing.addVanillaMixes()
   construit la table à la main. On lit donc ses instructions.

   Le motif est régulier : chaque recette est une suite de
   `getstatic` (les ingrédients, dans l'ordre des arguments) suivie
   d'un `invokevirtual` vers le constructeur correspondant. Il
   suffit d'empiler les constantes et de les consommer à l'appel.
   ============================================================ */

const { charger, instructions } = require('./classe.js');

const CLASSE = 'net/minecraft/world/item/alchemy/PotionBrewing.class';

/* Nombre d'arguments attendu par chaque méthode du constructeur. */
const APPELS = {
  addContainer: 1,
  addContainerRecipe: 3,
  addMix: 3,
  addStartMix: 2
};

/* `Items.NETHER_WART` -> `nether_wart` ; `Potions.AWKWARD` -> `awkward` */
function identifiant(ref) {
  const m = /\.([A-Z0-9_]+):/.exec(ref);
  return m ? m[1].toLowerCase() : null;
}

function extraire() {
  const cl = charger(CLASSE);
  const m = cl.methodes.find(x => x.nom === 'addVanillaMixes');
  if (!m) { throw new Error('addVanillaMixes introuvable : le jeu a changé de structure'); }

  const mixes = [];      /* potion de base + ingrédient -> potion */
  const contenants = []; /* fiole de base + ingrédient -> fiole */
  const flacons = [];    /* types de flacon acceptés */
  let pile = [];

  for (const i of instructions(cl, m)) {
    if (i.op === 'getstatic') {
      const id = identifiant(i.ref);
      if (id) { pile.push({ id: id, potion: /alchemy\/Potions\./.test(i.ref) }); }
      continue;
    }
    if (i.op !== 'invokevirtual' || !/PotionBrewing\$Builder\./.test(i.ref || '')) {
      /* aload_0 et autres : sans effet sur la pile de constantes */
      continue;
    }
    const nom = /Builder\.([a-zA-Z]+):/.exec(i.ref);
    const n = nom ? APPELS[nom[1]] : undefined;
    if (n === undefined) { continue; }

    const args = pile.slice(-n);
    pile = pile.slice(0, -n);
    if (args.length < n) { continue; }

    switch (nom[1]) {
      case 'addContainer':
        flacons.push(args[0].id);
        break;
      case 'addContainerRecipe':
        contenants.push({ de: args[0].id, avec: args[1].id, vers: args[2].id });
        break;
      case 'addMix':
        mixes.push({ de: args[0].id, avec: args[1].id, vers: args[2].id });
        break;
      case 'addStartMix':
        /* raccourci : l'eau donne la potion banale, la potion
           étrange donne l'effet visé */
        mixes.push({ de: 'water', avec: args[0].id, vers: 'mundane' });
        mixes.push({ de: 'awkward', avec: args[0].id, vers: args[1].id });
        break;
    }
  }
  return { mixes, contenants, flacons };
}

/* Durée d'un brassage, en secondes.

   C'est un `static final int` : le compilateur ne l'affecte pas dans
   <clinit>, il la range dans l'attribut ConstantValue du champ, qui
   pointe vers la table des constantes. */
function dureeBrassage() {
  const cl = charger(CLASSE);
  const champ = cl.champs.find(f => f.nom === 'BREWING_TIME_SECONDS');
  if (!champ) { return null; }
  const a = champ.attributs.find(x => x.nom === 'ConstantValue');
  if (!a) { return null; }
  return cl.valeur(a.data.readUInt16BE(0));
}

/* ------------------------------------------------------------
   Effets portés par chaque potion : durée et amplitude.

   Potions.<clinit> construit chaque potion en enchaînant des
   MobEffectInstance. Le constructeur existe en deux formes :
   (effet, durée) et (effet, durée, amplitude) — l'amplitude vaut
   zéro dans le premier cas. Une durée d'un tick signale un effet
   instantané (Soin, Dégâts), qui s'applique d'un coup.
   ------------------------------------------------------------ */

/* Valeur numérique poussée par une instruction de chargement. */
function nombre(i) {
  if (i.cst !== undefined && typeof i.cst === 'number') { return i.cst; }
  if (typeof i.arg === 'number') { return i.arg; }
  const c = /^iconst_(m?\d)$/.exec(i.op);
  if (c) { return c[1] === 'm1' ? -1 : +c[1]; }
  return null;
}

function effets() {
  const cl = charger('net/minecraft/world/item/alchemy/Potions.class');
  const cli = cl.methodes.find(m => m.nom === '<clinit>');
  if (!cli) { return {}; }
  const ins = instructions(cl, cli);

  const res = {};
  let courant = [];
  for (let i = 0; i < ins.length; i++) {
    const x = ins[i];

    if (x.op === 'invokespecial' && /MobEffectInstance\.<init>/.test(x.ref || '')) {
      /* On remonte jusqu'à l'effet, en relevant les nombres au passage. */
      const args = [];
      let effet = null;
      for (let j = i - 1; j >= 0 && j > i - 12; j--) {
        if (ins[j].op === 'getstatic' && /MobEffects\./.test(ins[j].ref || '')) {
          effet = /MobEffects\.([A-Z0-9_]+):/.exec(ins[j].ref)[1].toLowerCase();
          break;
        }
        const n = nombre(ins[j]);
        if (n !== null) { args.unshift(n); }
      }
      /* Deux arguments au plus après l'effet : durée puis amplitude. */
      if (effet) {
        courant.push({ effet, ticks: args[0] !== undefined ? args[0] : null,
          niveau: (args[1] || 0) + 1 });
      }
      continue;
    }

    if (x.op === 'putstatic' && /Potions\.[A-Z]/.test(x.ref || '')) {
      const nom = /Potions\.([A-Z0-9_]+):/.exec(x.ref)[1].toLowerCase();
      res[nom] = courant;
      courant = [];
    }
  }
  return res;
}

/* mm:ss à partir d'un nombre de ticks (20 ticks par seconde).

   Le jeu tronque les secondes au lieu de les arrondir : la
   Régénération II dure 450 ticks, soit 22,5 s, et s'affiche 0:22.
   On tronque donc aussi, pour pouvoir comparer au guide. */
function duree(ticks) {
  if (ticks === null || ticks === undefined) { return '?'; }
  if (ticks <= 1) { return 'instantané'; }
  const s = Math.floor(ticks / 20);
  return Math.floor(s / 60) + ':' + String(s % 60).padStart(2, '0');
}

module.exports = { extraire, dureeBrassage, effets, duree };

if (require.main === module) {
  const r = extraire();
  console.log('flacons acceptés  : ' + r.flacons.join(', '));
  console.log('durée de brassage : ' + dureeBrassage() + ' s');
  console.log('\nchangements de flacon (' + r.contenants.length + ') :');
  r.contenants.forEach(c => console.log('  ' + c.de + ' + ' + c.avec + ' -> ' + c.vers));
  console.log('\nrecettes de potion (' + r.mixes.length + ') :');
  r.mixes.forEach(c => console.log('  ' + c.de + ' + ' + c.avec + ' -> ' + c.vers));

  const e = effets();
  const avecEffet = Object.keys(e).filter(k => e[k].length);
  console.log('\neffets (' + avecEffet.length + ' potions actives) :');
  for (const k of avecEffet) {
    console.log('  ' + k.padEnd(24) + e[k].map(x =>
      x.effet + ' ' + duree(x.ticks) + (x.niveau > 1 ? ' niveau ' + x.niveau : '')).join(' + '));
  }
}
