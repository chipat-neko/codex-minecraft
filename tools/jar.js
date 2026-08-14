/* ============================================================
   Accès en lecture au .jar de Minecraft, sans dépendance npm.
   Passe par .NET via PowerShell : présent sur toute machine
   Windows où le jeu est installé.
   ============================================================ */

const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');

/* Trouve le .jar de la version la plus récente, en évitant les snapshots. */
function trouverJar(argument) {
  if (argument) { return path.resolve(argument); }
  const base = path.join(process.env.APPDATA || '', '.minecraft', 'versions');
  if (!fs.existsSync(base)) { return null; }
  const candidats = [];
  for (const d of fs.readdirSync(base)) {
    const j = path.join(base, d, d + '.jar');
    if (fs.existsSync(j)) { candidats.push({ nom: d, chemin: j }); }
  }
  if (!candidats.length) { return null; }
  candidats.sort((a, b) => {
    const s = n => /snapshot|pre|rc/i.test(n) ? 1 : 0;
    return s(a.nom) - s(b.nom) || b.nom.localeCompare(a.nom, 'en', { numeric: true });
  });
  return candidats[0].chemin;
}

/* Liste les entrées dont le chemin correspond à une expression régulière. */
function lister(jar, motif) {
  const ps = `
Add-Type -AssemblyName System.IO.Compression.FileSystem
$z=[System.IO.Compression.ZipFile]::OpenRead(${JSON.stringify(jar)})
foreach($e in $z.Entries){ if($e.FullName -match ${JSON.stringify(motif)}){ Write-Output $e.FullName } }
$z.Dispose()`;
  return execFileSync('powershell', ['-NoProfile', '-NonInteractive', '-Command', ps],
    { encoding: 'utf8', maxBuffer: 1 << 26 })
    .split(/\r?\n/).map(s => s.trim()).filter(Boolean);
}

/* Lit plusieurs entrées d'un coup et renvoie { chemin: contenu }. */
function lireBatch(jar, chemins) {
  if (!chemins.length) { return {}; }
  const tmp = path.join(require('os').tmpdir(), 'jarlist-' + Date.now() + '.txt');
  fs.writeFileSync(tmp, chemins.join('\n'), 'utf8');
  const ps = `
Add-Type -AssemblyName System.IO.Compression.FileSystem
$z=[System.IO.Compression.ZipFile]::OpenRead(${JSON.stringify(jar)})
$idx=@{}; foreach($e in $z.Entries){ $idx[$e.FullName]=$e }
foreach($n in (Get-Content ${JSON.stringify(tmp)})){
  Write-Output ("<<<" + $n)
  if($idx.ContainsKey($n)){ $r=New-Object System.IO.StreamReader($idx[$n].Open()); Write-Output $r.ReadToEnd(); $r.Close() }
  else { Write-Output "__ABSENT__" }
}
$z.Dispose()`;
  const out = execFileSync('powershell', ['-NoProfile', '-NonInteractive', '-Command', ps],
    { encoding: 'utf8', maxBuffer: 1 << 28 });
  fs.rmSync(tmp, { force: true });

  const res = {};
  for (const bloc of out.split('<<<').slice(1)) {
    const nl = bloc.indexOf('\n');
    const nom = bloc.slice(0, nl).trim();
    const corps = bloc.slice(nl + 1).trim();
    res[nom] = corps === '__ABSENT__' ? null : corps;
  }
  return res;
}

function lireJson(jar, chemins) {
  const brut = lireBatch(jar, chemins);
  const res = {};
  for (const k in brut) {
    if (brut[k] === null) { res[k] = null; continue; }
    try { res[k] = JSON.parse(brut[k]); } catch (e) { res[k] = null; }
  }
  return res;
}

module.exports = { trouverJar, lister, lireBatch, lireJson };
