// Serveur Révizo : sert l'appli et expose POST /api/resoudre,
// qui envoie l'exercice de l'élève (texte et/ou photo) à Claude.
import http from "node:http";
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import Anthropic from "@anthropic-ai/sdk";

const ROOT = path.dirname(fileURLToPath(import.meta.url));
const PORT = Number(process.env.PORT) || 3000;
const MODEL = process.env.REVIZO_MODEL || "claude-opus-5-5";
const MAX_BODY = 8 * 1024 * 1024; // une photo de téléphone compressée tient largement
const IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif"];

const client = new Anthropic();

// Guide de correction des maths (méthodes des correcteurs et des profs d'Afrique de l'Ouest).
// Il est envoyé avec chaque requête et mis en cache, donc il coûte peu après le premier appel.
const GUIDE_MATHS = await fs.readFile(path.join(ROOT, "guides", "maths.md"), "utf8");

const SYSTEM = `Tu es Révizo, un professeur particulier bienveillant pour les élèves d'Afrique de l'Ouest francophone (Sénégal, Côte d'Ivoire, Mali, Burkina Faso, Guinée, Bénin, Togo, Niger), du primaire au BAC.

L'élève t'envoie un exercice : texte tapé, photo de son cahier, d'une feuille ou d'un sujet d'examen. Toutes les matières sont possibles : maths, physique-chimie, SVT, philosophie, français, histoire-géographie, anglais, économie, etc.

Ton but n'est pas seulement de donner la réponse : l'élève doit comprendre COMMENT faire, pour savoir refaire seul un exercice du même type le jour de l'examen.

Règles :
- Utilise les méthodes, notations et attentes des programmes et des correcteurs de ces pays (BAC, BFEM, BEPC, DEF, CEPE/CFEE).
- Écris dans un français simple et clair, avec des phrases courtes. Explique chaque mot technique la première fois.
- Écris les formules en texte lisible sur téléphone (ex. x², √2, Δ = b² − 4ac, 3 × 10⁸ m/s). Pas de LaTeX.
- Vérifie chaque calcul avant de le donner. Si l'énoncé est ambigu ou incomplet, dis quelle hypothèse tu prends.
- Pour une dissertation ou un commentaire : donne la méthode, la problématique, un plan détaillé et des exemples d'arguments ; rédige l'introduction en exemple, pas tout le devoir.
- S'il y a plusieurs exercices, traite-les tous dans "etapes", dans l'ordre.
- Si la photo est illisible ou ne contient pas d'exercice, mets lisible à false et explique dans "probleme" ce que l'élève doit refaire (photo plus nette, plus de lumière, cadrer l'énoncé).`;

// Format imposé à la réponse : l'appli l'affiche en cartes.
const SCHEMA = {
  type: "object",
  properties: {
    lisible: { type: "boolean" },
    probleme: { type: "string", description: "Vide si lisible est true." },
    matiere: { type: "string" },
    niveau: { type: "string", description: "Classe ou examen estimé, ex. Terminale S, 3e / BFEM." },
    enonce: { type: "string", description: "Ce qu'on demande à l'élève, reformulé simplement." },
    methode: {
      type: "array",
      items: { type: "string" },
      description: "Les étapes générales à retenir pour tout exercice de ce type.",
    },
    etapes: {
      type: "array",
      items: {
        type: "object",
        properties: {
          titre: { type: "string" },
          explication: { type: "string", description: "Ce qu'on fait et pourquoi." },
          calcul: { type: "string", description: "Le calcul ou la rédaction de l'étape. Vide si sans objet." },
        },
        required: ["titre", "explication", "calcul"],
        additionalProperties: false,
      },
    },
    reponse: { type: "string", description: "La réponse finale, comme à écrire sur la copie." },
    pieges: { type: "array", items: { type: "string" } },
    entrainement: {
      type: "object",
      properties: {
        enonce: { type: "string", description: "Un exercice du même type pour s'entraîner." },
        solution: { type: "string", description: "Sa solution courte." },
      },
      required: ["enonce", "solution"],
      additionalProperties: false,
    },
  },
  required: ["lisible", "probleme", "matiere", "niveau", "enonce", "methode", "etapes", "reponse", "pieges", "entrainement"],
  additionalProperties: false,
};

async function resoudre({ texte, image, mediaType, pays, classe }) {
  const content = [];
  if (image) {
    content.push({ type: "image", source: { type: "base64", media_type: mediaType, data: image } });
  }
  const contexte = [pays && `Pays : ${pays}.`, classe && `Classe ou examen : ${classe}.`].filter(Boolean).join(" ");
  content.push({
    type: "text",
    text: `${contexte}\n\n${texte ? `Exercice :\n${texte}` : "L'exercice est sur la photo."}`.trim(),
  });

  const response = await client.beta.messages.create({
    model: MODEL,
    max_tokens: 16000,
    betas: ["server-side-fallback-2026-07-01"],
    fallbacks: "default",
    thinking: { type: "adaptive" },
    output_config: { effort: "high", format: { type: "json_schema", schema: SCHEMA } },
    system: [
      { type: "text", text: SYSTEM },
      {
        type: "text",
        text: `Voici le guide de correction de Révizo pour les MATHÉMATIQUES. Applique-le quand l'exercice est un exercice de maths : méthodes attendues, rédaction, ordre des étapes, façon d'expliquer des profs (section 11), erreurs fréquentes. Les points marqués « non vérifié » ou « non sourcé » sont moins sûrs : ne les présente pas comme des certitudes. Pour les autres matières, ignore ce guide.\n\n${GUIDE_MATHS}`,
        cache_control: { type: "ephemeral" },
      },
    ],
    messages: [{ role: "user", content }],
  });

  if (response.stop_reason === "refusal") {
    return { erreur: "Cette demande ne peut pas être traitée. Envoie un exercice scolaire." };
  }
  if (response.stop_reason === "max_tokens") {
    return { erreur: "L'exercice est trop long. Envoie-le en plusieurs parties." };
  }
  const textBlock = response.content.find((b) => b.type === "text");
  try {
    return JSON.parse(textBlock?.text ?? "");
  } catch {
    return { erreur: "La correction n'a pas pu être lue. Réessaie." };
  }
}

function readBody(req) {
  return new Promise((resolve, reject) => {
    let size = 0;
    const chunks = [];
    req.on("data", (c) => {
      size += c.length;
      if (size > MAX_BODY) {
        reject(new Error("too_large"));
        req.destroy();
      } else {
        chunks.push(c);
      }
    });
    req.on("end", () => resolve(Buffer.concat(chunks).toString("utf8")));
    req.on("error", reject);
  });
}

function sendJson(res, status, data) {
  res.writeHead(status, { "Content-Type": "application/json; charset=utf-8" });
  res.end(JSON.stringify(data));
}

async function handleResoudre(req, res) {
  let body;
  try {
    body = JSON.parse(await readBody(req));
  } catch (e) {
    return sendJson(res, e.message === "too_large" ? 413 : 400, { erreur: e.message === "too_large" ? "Photo trop lourde." : "Requête invalide." });
  }
  const texte = typeof body.texte === "string" ? body.texte.slice(0, 8000).trim() : "";
  const image = typeof body.image === "string" ? body.image : "";
  if (!texte && !image) return sendJson(res, 400, { erreur: "Écris ton exercice ou envoie une photo." });
  if (image && !IMAGE_TYPES.includes(body.mediaType)) return sendJson(res, 400, { erreur: "Format de photo non pris en charge." });

  try {
    const result = await resoudre({
      texte,
      image,
      mediaType: body.mediaType,
      pays: typeof body.pays === "string" ? body.pays.slice(0, 40) : "",
      classe: typeof body.classe === "string" ? body.classe.slice(0, 40) : "",
    });
    sendJson(res, result.erreur ? 422 : 200, result);
  } catch (error) {
    if (error instanceof Anthropic.RateLimitError) {
      sendJson(res, 429, { erreur: "Beaucoup d'élèves en même temps. Réessaie dans une minute." });
    } else if (error instanceof Anthropic.APIError) {
      console.error(`API error ${error.status}:`, error.message);
      sendJson(res, 502, { erreur: "Le service est momentanément indisponible." });
    } else {
      console.error(error);
      sendJson(res, 500, { erreur: "Erreur inattendue." });
    }
  }
}

const MIME = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".svg": "image/svg+xml",
  ".webmanifest": "application/manifest+json",
};
const PUBLIC = new Set(["index.html", "app.js", "questions.js", "styles.css", "sw.js", "manifest.webmanifest", "icon.svg"]);

async function handleStatic(req, res) {
  const name = decodeURIComponent(new URL(req.url, "http://x").pathname).replace(/^\/+/, "") || "index.html";
  if (!PUBLIC.has(name)) {
    res.writeHead(404);
    return res.end("Not found");
  }
  const data = await fs.readFile(path.join(ROOT, name));
  res.writeHead(200, { "Content-Type": MIME[path.extname(name)] || "application/octet-stream" });
  res.end(data);
}

http
  .createServer((req, res) => {
    if (req.method === "POST" && req.url === "/api/resoudre") return handleResoudre(req, res);
    if (req.method === "GET") return handleStatic(req, res).catch(() => { res.writeHead(500); res.end(); });
    res.writeHead(405);
    res.end();
  })
  .listen(PORT, () => console.log(`Révizo sur http://localhost:${PORT}`));
