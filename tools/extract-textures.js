/* ============================================================
   Extrait les textures du jeu depuis VOTRE installation Minecraft
   vers assets/textures/, pour un affichage authentique en local.

   Usage :   node tools/extract-textures.js [chemin/vers/version.jar]

   Sans argument, le script cherche automatiquement le .jar de la
   version la plus récente dans %APPDATA%\.minecraft\versions.

   Les textures extraites restent LOCALES : assets/textures/ est
   ignoré par git, car les assets de Minecraft appartiennent à Mojang
   et ne peuvent pas être redistribués. Sans elles, le site retombe
   automatiquement sur ses aplats de couleur.
   ============================================================ */

const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');
const { MAP_BLOCS, MAP_ITEMS, TEINTES } = require('./texture-map.js');
const { couleurMoyenne } = require('./png.js');

const RACINE = path.resolve(__dirname, '..');
const DEST = path.join(RACINE, 'assets', 'textures');

/* ---------- localiser le .jar ---------- */
function trouverJar() {
  if (process.argv[2]) { return path.resolve(process.argv[2]); }
  const base = path.join(process.env.APPDATA || '', '.minecraft', 'versions');
  if (!fs.existsSync(base)) { return null; }
  const candidats = [];
  for (const d of fs.readdirSync(base)) {
    const j = path.join(base, d, d + '.jar');
    if (fs.existsSync(j)) { candidats.push({ nom: d, chemin: j, taille: fs.statSync(j).size }); }
  }
  if (!candidats.length) { return null; }
  /* on privilégie les versions stables (sans « snapshot »), puis la plus récente */
  candidats.sort((a, b) => {
    const sa = /snapshot|pre|rc/i.test(a.nom) ? 1 : 0;
    const sb = /snapshot|pre|rc/i.test(b.nom) ? 1 : 0;
    return sa - sb || b.nom.localeCompare(a.nom, 'en', { numeric: true });
  });
  return candidats[0].chemin;
}

/* ---------- lire les dimensions d'un PNG (chunk IHDR) ---------- */
function dimensionsPng(buf) {
  if (buf.length < 24) { return null; }
  return { w: buf.readUInt32BE(16), h: buf.readUInt32BE(20) };
}

/* ---------- extraction via .NET (aucune dépendance npm) ---------- */
function extraire(jar, entrees, dossierTmp) {
  const liste = path.join(dossierTmp, '_entrees.txt');
  fs.writeFileSync(liste, entrees.join('\n'), 'utf8');
  const ps = `
$ErrorActionPreference='Stop'
Add-Type -AssemblyName System.IO.Compression.FileSystem
$zip=[System.IO.Compression.ZipFile]::OpenRead(${JSON.stringify(jar)})
$noms=Get-Content ${JSON.stringify(liste)}
$index=@{}
foreach($e in $zip.Entries){ $index[$e.FullName]=$e }
foreach($n in $noms){
  if($index.ContainsKey($n)){
    $dest=Join-Path ${JSON.stringify(dossierTmp)} ($n -replace '.*/','')
    [System.IO.Compression.ZipFileExtensions]::ExtractToFile($index[$n],$dest,$true)
  } else { Write-Output ("MISS:"+$n) }
}
$zip.Dispose()
`;
  const out = execFileSync('powershell', ['-NoProfile', '-NonInteractive', '-Command', ps],
    { encoding: 'utf8', maxBuffer: 1 << 26 });
  return out.split(/\r?\n/).filter(l => l.startsWith('MISS:')).map(l => l.slice(5));
}

/* ---------- programme ---------- */
const jar = trouverJar();
if (!jar || !fs.existsSync(jar)) {
  console.error('Aucun .jar Minecraft trouvé.');
  console.error('Passez le chemin en argument : node tools/extract-textures.js "C:/.../1.21.jar"');
  process.exit(1);
}
console.log('Version utilisée :', path.basename(jar));

/* on ne demande que ce dont le site a besoin */
const besoins = new Map();          // chemin dans le jar -> [ {type, cle} ]
const ajoute = (type, cle, tex) => {
  if (!tex) { return; }
  const p = 'assets/minecraft/textures/' + tex + '.png';
  if (!besoins.has(p)) { besoins.set(p, []); }
  besoins.get(p).push({ type, cle });
};
for (const k in MAP_BLOCS) { ajoute('bloc', k, MAP_BLOCS[k]); }
for (const k in MAP_ITEMS) { ajoute('item', k, MAP_ITEMS[k]); }

const tmp = fs.mkdtempSync(path.join(require('os').tmpdir(), 'mctex-'));
console.log(`${besoins.size} textures distinctes demandées…`);
const manquantes = extraire(jar, [...besoins.keys()], tmp);

/* ---------- assemblage ---------- */
fs.mkdirSync(DEST, { recursive: true });
const index = { blocs: {}, items: {} };
const couleurs = { blocs: {}, items: {} };
let ok = 0, anim = 0, sansCouleur = 0;

/* Applique une teinte multiplicative, comme le fait le jeu pour l'herbe et le feuillage */
function teinter(hex, teinte) {
  const c = h => [1, 3, 5].map(i => parseInt(h.substr(i, 2), 16));
  const [r1, g1, b1] = c(hex), [r2, g2, b2] = c(teinte);
  const m = (a, b) => Math.round(a * b / 255).toString(16).padStart(2, '0');
  return '#' + m(r1, r2) + m(g1, g2) + m(b1, b2);
}

for (const [chemin, usages] of besoins) {
  if (manquantes.includes(chemin)) { continue; }
  const nomFichier = chemin.replace(/.*\//, '');
  const src = path.join(tmp, nomFichier);
  if (!fs.existsSync(src)) { continue; }

  const buf = fs.readFileSync(src);
  const dim = dimensionsPng(buf);
  /* une texture animée est une bande verticale : hauteur multiple de la largeur */
  const frames = dim && dim.h > dim.w && dim.h % dim.w === 0 ? dim.h / dim.w : 1;
  if (frames > 1) { anim++; }

  const moyenne = couleurMoyenne(buf, frames);
  if (!moyenne) { sansCouleur++; }

  fs.writeFileSync(path.join(DEST, nomFichier), buf);
  ok++;

  for (const u of usages) {
    const entree = { f: nomFichier };
    if (frames > 1) { entree.n = frames; }
    const teinte = u.type === 'bloc' ? TEINTES[u.cle] : null;
    if (teinte) { entree.t = teinte; }
    index[u.type === 'bloc' ? 'blocs' : 'items'][u.cle] = entree;
    if (moyenne) {
      couleurs[u.type === 'bloc' ? 'blocs' : 'items'][u.cle] = teinte ? teinter(moyenne, teinte) : moyenne;
    }
  }
}

fs.writeFileSync(path.join(DEST, 'index.js'),
  '/* Généré par tools/extract-textures.js — ne pas modifier à la main.\n' +
  '   Textures extraites de ' + path.basename(jar) + ' pour un usage local. */\n' +
  'var TEXTURES = ' + JSON.stringify(index, null, 1) + ';\n', 'utf8');

/* Les couleurs moyennes sont des valeurs dérivées, pas des assets :
   elles sont versionnées et servent de repli fidèle quand les textures
   ne sont pas présentes (notamment sur le site publié). */
fs.writeFileSync(path.join(RACINE, 'assets', 'couleurs.js'),
  '/* Couleurs moyennes réelles des textures du jeu, calculées par\n' +
  '   tools/extract-textures.js à partir de ' + path.basename(jar) + '.\n' +
  '   Valeurs dérivées : elles servent de repli quand les textures\n' +
  '   ne sont pas installées. Ne pas modifier à la main. */\n' +
  'var COULEURS_JEU = ' + JSON.stringify(couleurs, null, 1) + ';\n', 'utf8');

fs.rmSync(tmp, { recursive: true, force: true });

console.log(`\n✅ ${ok} textures écrites dans assets/textures/ (dont ${anim} animées)`);
console.log(`   ${Object.keys(index.blocs).length} blocs et ${Object.keys(index.items).length} items associés`);
console.log(`   couleurs moyennes : ${Object.keys(couleurs.blocs).length} blocs, ${Object.keys(couleurs.items).length} items` +
  (sansCouleur ? ` (${sansCouleur} texture(s) non décodée(s))` : ''));
if (manquantes.length) {
  console.log(`\n⚠ ${manquantes.length} texture(s) introuvable(s) dans cette version — le site gardera un aplat de couleur pour celles-ci :`);
  manquantes.forEach(m => console.log('   ' + m.replace('assets/minecraft/textures/', '')));
}
console.log('\nOuvrez le site : les textures sont utilisées automatiquement.');
