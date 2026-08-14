/* ============================================================
   Banc d'essai : construire un plan dans un vrai serveur Minecraft
   et regarder ce que le jeu en fait.

   Tout ce que le guide affirme n'est pas vérifiable dans les données.
   Qu'un entonnoir pointe au bon endroit, qu'une lanterne tienne, qu'un
   portail s'allume, qu'un observateur voie ce qu'il doit voir : cela
   ne se lit ni dans un JSON ni dans le bytecode. Cela se constate.

   Ce module lance un serveur local, lui envoie des commandes par sa
   console et lit ses réponses. Aucun port n'est ouvert : le dialogue
   passe par l'entrée et la sortie standard du processus.

   Usage :
     const b = require('./banc.js');
     await b.demarrer();
     await b.cmd('setblock 0 -60 0 minecraft:stone');
     const r = await b.cmd('data get block 0 -60 0');
     await b.arreter();
   ============================================================ */

const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

const RACINE = 'D:/plan-min-banc';
const JAVA = 'C:/Users/chipat/AppData/Local/Packages/Microsoft.4297127D64EC6_8wekyb3d8bbwe/' +
  'LocalCache/Local/runtime/java-runtime-epsilon/windows-x64/java-runtime-epsilon/bin/java.exe';

/* Lignes que le serveur écrit de lui-même, sans rapport avec la
   commande en cours : elles brouilleraient la lecture des réponses. */
const BRUIT = /Saving chunks|All chunks are saved|All dimensions are saved|ThreadedAnvilChunkStorage|Saving the game|Preparing spawn area|Time elapsed/;

let serveur = null;
let tampon = '';
let attentes = [];       /* { motif, resoudre, lignes } */
const journal = [];

/* Chaque ligne de la console est proposée aux attentes en cours. */
function ligneRecue(ligne) {
  journal.push(ligne);
  if (journal.length > 4000) { journal.shift(); }
  for (let i = attentes.length - 1; i >= 0; i--) {
    const a = attentes[i];
    a.lignes.push(ligne);
    if (a.motif.test(ligne)) {
      attentes.splice(i, 1);
      a.resoudre(a.lignes);
    }
  }
}

function attendre(motif, delai) {
  return new Promise((ok, ko) => {
    const a = { motif, lignes: [], resoudre: null };
    a.resoudre = l => { clearTimeout(t); ok(l); };
    const t = setTimeout(() => {
      attentes = attentes.filter(x => x !== a);
      ko(new Error('rien qui corresponde à ' + motif + ' en ' + delai + ' ms\n' +
        '  dernières lignes : ' + a.lignes.slice(-6).join(' | ')));
    }, delai || 30000);
    attentes.push(a);
  });
}

function demarrer(options) {
  const o = options || {};
  if (serveur) { return Promise.resolve(); }
  if (!fs.existsSync(path.join(RACINE, 'server.jar'))) {
    return Promise.reject(new Error('server.jar absent de ' + RACINE));
  }
  serveur = spawn(JAVA, ['-Xms1G', '-Xmx2G', '-jar', 'server.jar', 'nogui'],
    { cwd: RACINE, stdio: ['pipe', 'pipe', 'pipe'] });

  const lire = flux => flux.on('data', d => {
    tampon += d.toString('utf8');
    let i;
    while ((i = tampon.indexOf('\n')) >= 0) {
      const l = tampon.slice(0, i).replace(/\r$/, '');
      tampon = tampon.slice(i + 1);
      if (o.bavard) { console.log('  | ' + l); }
      ligneRecue(l);
    }
  });
  lire(serveur.stdout);
  lire(serveur.stderr);

  serveur.on('exit', code => {
    serveur = null;
    ligneRecue('__SERVEUR_ARRETE__ code=' + code);
  });

  /* le serveur annonce lui-même qu'il est prêt */
  return attendre(/Done \([\d.]+s\)!/, o.delai || 300000).then(async () => {
    /* Sans joueur connecté, aucun chunk n'est chargé et toute commande
       de bloc répond « That position is not loaded ». On épingle donc
       la zone de travail, et on fige ce qui rendrait un essai
       irreproductible : cycle du jour, météo, croissance aléatoire. */
    await cmd('forceload add ' + (o.zone || '-64 -64 64 64'));
    await cmd('gamerule doDaylightCycle false');
    await cmd('gamerule doWeatherCycle false');
    await cmd('gamerule randomTickSpeed 0');
    await cmd('gamerule doFireTick false');
    await cmd('gamerule commandBlockOutput false');
    await cmd('gamerule sendCommandFeedback true');
    await cmd('time set noon');
    await cmd('weather clear');
  });
}

/* Envoie une commande et rend les lignes de console qu'elle a produites.

   Le serveur ne marque pas la fin d'une réponse : on pose donc un
   repère après la commande — un `say` dont on attend l'écho — et tout
   ce qui précède appartient à la commande. */
let compteur = 0;
async function cmd(commande, delai) {
  if (!serveur) { throw new Error('le serveur ne tourne pas'); }
  const marque = 'BANC' + (++compteur);
  const p = attendre(new RegExp('\\[Server\\] ' + marque), delai || 30000);
  serveur.stdin.write(commande + '\n');
  serveur.stdin.write('say ' + marque + '\n');
  const lignes = await p;
  return lignes
    .filter(l => !l.includes(marque))
    .map(l => l.replace(/^\[[^\]]+\]\s*\[[^\]]+\]:\s*/, '').trim())
    .filter(Boolean)
    /* bruit de fond du serveur, sans rapport avec la commande */
    .filter(l => !BRUIT.test(l));
}

async function arreter() {
  if (!serveur) { return; }
  const fin = attendre(/__SERVEUR_ARRETE__/, 60000).catch(() => {});
  serveur.stdin.write('stop\n');
  await fin;
}

/* Vide un volume, pour repartir d'un terrain propre. */
async function nettoyer(x1, y1, z1, x2, y2, z2) {
  return cmd(`fill ${x1} ${y1} ${z1} ${x2} ${y2} ${z2} minecraft:air`, 60000);
}

/* L'état réel d'un bloc, tel que le serveur le voit. */
async function bloc(x, y, z) {
  const r = await cmd(`data get block ${x} ${y} ${z}`);
  return r.join(' ');
}

/* Envoie sans attendre de réponse. Pour les milliers de `setblock`
   d'un plan, attendre chaque écho coûterait des minutes ; on vide la
   file ensuite avec une commande dont on attend la réponse. */
function brut(commande) {
  if (!serveur) { throw new Error('le serveur ne tourne pas'); }
  serveur.stdin.write(commande + '\n');
}

module.exports = { demarrer, arreter, cmd, brut, nettoyer, bloc, journal, RACINE, JAVA };

if (require.main === module) {
  (async () => {
    console.log('démarrage du serveur…');
    const t0 = Date.now();
    await demarrer({ bavard: process.argv.includes('--bavard') });
    console.log('prêt en ' + Math.round((Date.now() - t0) / 1000) + ' s');
    console.log('\nversion : ' + (await cmd('version')).join(' '));
    await cmd('gamerule doDaylightCycle false');
    await cmd('gamerule randomTickSpeed 0');
    await cmd('time set day');
    console.log('essai : on pose une pierre puis on la relit');
    await cmd('setblock 100 -60 100 minecraft:stone');
    console.log('  ' + (await cmd('setblock 100 -59 100 minecraft:lantern')).join(' '));
    console.log('  lanterne posée sur pierre : ' + (await bloc(100, -59, 100)));
    console.log('\narrêt…');
    await arreter();
    console.log('terminé');
  })().catch(e => { console.error('ÉCHEC : ' + e.message); process.exit(1); });
}
