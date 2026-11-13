// Récupère les chiffres de l'admin de Révizo pour l'agent « revizo-analyste », en lecture seule.
// Usage : node tools/diagnostic.mjs [jours=7]
// Le mot de passe est lu dans ~/.revizo/admin-motdepasse.txt et n'est jamais affiché.
// Les chiffres sont gardés hors du dépôt, dans ~/.revizo/diagnostics/AAAA-MM-JJ.json.
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const ADRESSE = "https://revizo.click/api/admin";
const jours = Math.min(Math.max(Number(process.argv[2]) || 7, 1), 365);
const dossier = path.join(os.homedir(), ".revizo", "diagnostics");

async function appel(corps, jeton) {
  const res = await fetch(ADRESSE, {
    method: "POST",
    headers: { "Content-Type": "application/json", ...(jeton ? { Authorization: `Bearer ${jeton}` } : {}) },
    body: JSON.stringify(corps),
    signal: AbortSignal.timeout(30000),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw Object.assign(new Error(data.erreur || `HTTP ${res.status}`), { status: res.status });
  return data;
}

let motDePasse;
try {
  motDePasse = fs.readFileSync(path.join(os.homedir(), ".revizo", "admin-motdepasse.txt"), "utf8").trim();
} catch {
  console.error("MOT_DE_PASSE_ABSENT : crée ~/.revizo/admin-motdepasse.txt avec le mot de passe de l'admin.");
  process.exit(2);
}

// Le fichier peut contenir une ligne d'explication en plus du mot de passe : on essaie chaque ligne,
// entière puis après un éventuel « libellé : ».
const lignes = motDePasse.split(/\r?\n/).map((l) => l.trim()).filter(Boolean);
const candidats = [...new Set([...lignes, ...lignes.map((l) => l.split(/:\s+/).pop())])].slice(0, 6);
let jeton;
for (const essai of candidats) {
  try {
    ({ jeton } = await appel({ action: "connexion", motDePasse: essai }));
    break;
  } catch (e) {
    if (e.status !== 401) { console.error(`ADMIN_INJOIGNABLE : ${e.message}`); process.exit(2); }
  }
}
if (!jeton) {
  console.error("MOT_DE_PASSE_REFUSE : le mot de passe de ~/.revizo/admin-motdepasse.txt n'est plus le bon (ADMIN_PASSWORD dans Vercel).");
  process.exit(2);
}

// Seulement des actions de lecture. Jamais « crediter », « test », « reglage », « ecarter_suspects »…
const lectures = {
  stats: { action: "stats", jours },
  plus: { action: "plus", jours },
  accueil: { action: "accueil", jours },
  couts: { action: "couts", jours },
  signalements: { action: "signalements" },
  suspects: { action: "suspects" },
  clarity: { action: "clarity" },
};
const resultat = { recupere_le: new Date().toISOString(), jours };
for (const [nom, corps] of Object.entries(lectures)) {
  try {
    resultat[nom] = await appel(corps, jeton);
  } catch (e) {
    resultat[nom] = { erreur: e.message };
  }
}

fs.mkdirSync(dossier, { recursive: true, mode: 0o700 });
const fichier = path.join(dossier, `${resultat.recupere_le.slice(0, 10)}.json`);
fs.writeFileSync(fichier, JSON.stringify(resultat, null, 2), { mode: 0o600 });
const erreurs = Object.entries(resultat).filter(([, v]) => v && v.erreur).map(([k, v]) => `${k} (${v.erreur})`);
console.log(`Chiffres des ${jours} derniers jours enregistrés dans ${fichier}`);
if (erreurs.length) console.log(`Non récupérés : ${erreurs.join(", ")}`);
