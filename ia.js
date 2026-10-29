// L'IA de Révizo : lecture de la photo (/api/lire) et correction pas à pas (/api/resoudre).
// Utilisé par le serveur local (server.js) et par les fonctions Vercel (api/).
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import Anthropic from "@anthropic-ai/sdk";

const ROOT = path.dirname(fileURLToPath(import.meta.url));
// Haiku 5.5 : aussi juste qu'Opus sur les sujets du BAC 2026 testés, pour environ 7 FCFA par exercice au lieu de 190.
export const MODEL = process.env.REVIZO_MODEL || "claude-haiku-5-5";
// Bascule vers un autre modèle si l'IA refuse une demande. Haiku n'en a pas : on ne l'envoie qu'aux autres modèles.
const SECOURS = MODEL.startsWith("claude-haiku") ? {} : { betas: ["server-side-fallback-2026-07-01"], fallbacks: "default" };
export const IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif"];

const client = new Anthropic();

// Guides de correction par matière (dossier guides/). Seul le guide de la matière
// de l'exercice est envoyé, avec les règles communes et les fiches pays.
const MATIERES = {
  maths: "Mathématiques",
  pc: "Physique-Chimie",
  svt: "SVT",
  philo: "Philosophie",
  francais: "Français",
  hg: "Histoire-Géographie",
  anglais: "Anglais",
  eco: "Économie / comptabilité",
};
const GUIDES = Object.fromEntries(
  await Promise.all(
    Object.keys(MATIERES).map(async (k) => [k, await fs.readFile(path.join(ROOT, "guides", `${k}.md`), "utf8")]),
  ),
);
const REGLES = await fs.readFile(path.join(ROOT, "guides", "regles-et-pays.md"), "utf8");

// Fiches pays (dossier guides/pays/) : seule celle du pays de l'élève est envoyée.
// L'appli envoie le nom du pays ; on accepte aussi le code.
const PAYS = {
  SN: "Sénégal",
  CI: "Côte d'Ivoire",
  ML: "Mali",
  BF: "Burkina Faso",
  GN: "Guinée",
  BJ: "Bénin",
  TG: "Togo",
  NE: "Niger",
};
const FICHES_PAYS = Object.fromEntries(
  await Promise.all(
    Object.keys(PAYS).map(async (k) => [k, await fs.readFile(path.join(ROOT, "guides", "pays", `${k}.md`), "utf8")]),
  ),
);
function codePays(pays) {
  if (PAYS[pays]) return pays;
  return Object.keys(PAYS).find((k) => PAYS[k] === pays) || null;
}
const AVERTISSEMENT = "Les points marqués « non vérifié » ou « non sourcé » sont moins sûrs : ne les présente jamais comme des certitudes.";

const SYSTEM = `Tu es Révizo, un professeur particulier bienveillant pour les élèves d'Afrique de l'Ouest francophone (Sénégal, Côte d'Ivoire, Mali, Burkina Faso, Guinée, Bénin, Togo, Niger), du primaire au BAC.

L'élève t'envoie un exercice : texte tapé, photo de son cahier, d'une feuille ou d'un sujet d'examen. Toutes les matières sont possibles : maths, physique-chimie, SVT, philosophie, français, histoire-géographie, anglais, économie, etc.

Ton but n'est pas seulement de donner la réponse : l'élève doit comprendre COMMENT faire, pour savoir refaire seul un exercice du même type le jour de l'examen.

Règles :
- Utilise les méthodes, notations et attentes des programmes et des correcteurs de ces pays (BAC, BFEM, BEPC, DEF, CEPE/CFEE).
- Écris dans un français simple et clair, avec des phrases courtes. Explique chaque mot technique la première fois.
- Écris les formules en texte lisible sur téléphone (ex. x², √2, Δ = b² − 4ac, 3 × 10⁸ m/s). Pas de LaTeX.
- Vérifie chaque calcul avant de le donner. Si l'énoncé est ambigu ou incomplet, dis quelle hypothèse tu prends.
- Respecte chaque verbe de la consigne : si elle demande de préciser, nommer, justifier ou conclure, la réponse finale le fait aussi (ex. « que vous préciserez » : nommer le procédé à côté de chaque phrase).
- Pour une dissertation ou un commentaire : donne la méthode, la problématique, un plan détaillé et des exemples d'arguments ; rédige l'introduction en exemple, pas tout le devoir.
- S'il y a plusieurs exercices, traite-les tous dans "etapes", dans l'ordre.
- "indice" aide à démarrer sans rien dévoiler. "demarrage" propose 2 ou 3 choix courts, dont un seul juste.
- "marge" est une annotation de prof très courte, seulement quand elle aide (un piège, une exigence du correcteur).
- Si la photo est illisible ou ne contient pas d'exercice, mets lisible à false et explique dans "probleme" ce que l'élève doit refaire (photo plus nette, plus de lumière, cadrer l'énoncé).`;

// Format imposé à la réponse : l'appli l'affiche en cartes.
const SCHEMA = {
  type: "object",
  properties: {
    lisible: { type: "boolean" },
    probleme: { type: "string", description: "Vide si lisible est true." },
    matiere: { type: "string", description: "Nom court de la matière, un ou deux mots, ex. Maths, PC, SVT, Philo." },
    niveau: { type: "string", description: "Classe estimée en un à trois mots, ex. Terminale S, 3e. Jamais de phrase ni de remarque." },
    enonce: { type: "string", description: "Ce qu'on demande à l'élève, reformulé simplement." },
    indice: { type: "string", description: "Un coup de pouce pour démarrer seul, sans donner la méthode ni la réponse." },
    demarrage: {
      type: "object",
      description: "Une question pour faire réfléchir l'élève avant de montrer la méthode : par quoi commencer ?",
      properties: {
        question: { type: "string" },
        choix: {
          type: "array",
          items: {
            type: "object",
            properties: {
              texte: { type: "string" },
              juste: { type: "boolean" },
              retour: { type: "string", description: "Une phrase : pourquoi ce choix est bon ou non." },
            },
            required: ["texte", "juste", "retour"],
            additionalProperties: false,
          },
        },
      },
      required: ["question", "choix"],
      additionalProperties: false,
    },
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
          marge: { type: "string", description: "Remarque de prof en marge, 6 mots au plus (ex. « attention au signe »). Vide si rien d'utile." },
        },
        required: ["titre", "explication", "calcul", "marge"],
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
  required: ["lisible", "probleme", "matiere", "niveau", "enonce", "indice", "demarrage", "methode", "etapes", "reponse", "pieges", "entrainement"],
  additionalProperties: false,
};

const SCHEMA_LECTURE = {
  type: "object",
  properties: {
    lisible: { type: "boolean" },
    probleme: { type: "string", description: "Si illisible : ce que l'élève doit refaire. Vide sinon." },
    enonce: { type: "string", description: "L'énoncé recopié fidèlement, formules en texte lisible (x², √2, Δ). Vide si illisible." },
    matiere: { type: "string", enum: [...Object.keys(MATIERES), "autre"] },
    doutes: {
      type: "array",
      description: "Les passages lus avec un doute (écriture, symbole) et la question à poser à l'élève. Liste vide si aucun.",
      items: {
        type: "object",
        properties: { extrait: { type: "string" }, question: { type: "string", description: "Ex. « x ou × ? »" } },
        required: ["extrait", "question"],
        additionalProperties: false,
      },
    },
    a_interpreter: { type: "boolean", description: "Vrai si l'énoncé est rédigé en phrases et demande une interprétation." },
  },
  required: ["lisible", "probleme", "enonce", "matiere", "doutes", "a_interpreter"],
  additionalProperties: false,
};

// Lit la photo et recopie l'énoncé, pour que l'élève le vérifie avant la correction.
async function lire({ image, mediaType }) {
  const response = await client.beta.messages.create({
    model: MODEL,
    max_tokens: 8000,
    ...SECOURS,
    output_config: { effort: "low", format: { type: "json_schema", schema: SCHEMA_LECTURE } },
    system: "Tu recopies fidèlement l'énoncé d'un exercice scolaire photographié (cahier, feuille, sujet d'examen d'Afrique de l'Ouest francophone). Ne résous rien. Signale chaque passage où tu hésites sur un caractère ou un symbole.",
    messages: [{ role: "user", content: [{ type: "image", source: { type: "base64", media_type: mediaType, data: image } }, { type: "text", text: "Recopie l'énoncé." }] }],
  });
  const cout = journal("lecture", response);
  return { resultat: readJson(response), cout };
}

function userContent({ texte, image, mediaType, pays, classe }) {
  const content = [];
  if (image) {
    content.push({ type: "image", source: { type: "base64", media_type: mediaType, data: image } });
  }
  const contexte = [pays && `Pays : ${pays}.`, classe && `Classe ou examen : ${classe}.`].filter(Boolean).join(" ");
  content.push({
    type: "text",
    text: `${contexte}\n\n${texte ? `Exercice :\n${texte}` : "L'exercice est sur la photo."}`.trim(),
  });
  return content;
}

// Une ligne par appel à l'IA : sert à mesurer le coût réel d'un exercice.
// Tarifs en dollars par million de tokens : entrée, sortie, lecture du cache, écriture du cache (5 min).
// Haiku 5.5 : tarif des appels de moins de 100 000 tokens (Révizo reste en dessous).
const TARIFS = {
  "claude-haiku-5-5": [0.1, 0.5, 0.01, 0.125],
  "claude-sonnet-5-5": [2, 10, 0.2, 2.5],
  "claude-opus-5-5": [4, 20, 0.2, 5],
};

// Une ligne par appel à l'IA dans les journaux, et son coût en millionièmes de dollar (pour l'admin).
function journal(etape, response) {
  const u = response.usage || {};
  const [e, s, l, c] = TARIFS[MODEL] || TARIFS["claude-haiku-5-5"];
  const cout = Math.round((u.input_tokens || 0) * e + (u.output_tokens || 0) * s + (u.cache_read_input_tokens || 0) * l + (u.cache_creation_input_tokens || 0) * c);
  console.log(JSON.stringify({
    etape, modele: response.model, fin: response.stop_reason,
    entree: u.input_tokens, cache_lu: u.cache_read_input_tokens, cache_ecrit: u.cache_creation_input_tokens, sortie: u.output_tokens, cout,
  }));
  return cout;
}

function readJson(response) {
  if (response.stop_reason === "refusal") return { erreur: "Cette demande ne peut pas être traitée. Envoie un exercice scolaire." };
  if (response.stop_reason === "max_tokens") return { erreur: "L'exercice est trop long. Envoie-le en plusieurs parties." };
  const textBlock = response.content.find((b) => b.type === "text");
  try {
    return JSON.parse(textBlock?.text ?? "");
  } catch {
    return { erreur: "La correction n'a pas pu être lue. Réessaie." };
  }
}

// Reconnaît la matière quand l'élève ne l'a pas choisie.
async function detecterMatiere(content) {
  const response = await client.beta.messages.create({
    model: MODEL,
    max_tokens: 2000,
    ...SECOURS,
    output_config: {
      effort: "low",
      format: {
        type: "json_schema",
        schema: {
          type: "object",
          properties: { matiere: { type: "string", enum: [...Object.keys(MATIERES), "autre"] } },
          required: ["matiere"],
          additionalProperties: false,
        },
      },
    },
    system: `Indique la matière scolaire de cet exercice : ${Object.entries(MATIERES).map(([k, v]) => `${k} = ${v}`).join(", ")}, autre = toute autre matière ou pas un exercice.`,
    messages: [{ role: "user", content }],
  });
  const cout = journal("matiere", response);
  const data = readJson(response);
  return { cle: MATIERES[data.matiere] ? data.matiere : null, cout };
}

async function resoudre({ texte, image, mediaType, pays, classe, matiere }) {
  const content = userContent({ texte, image, mediaType, pays, classe });
  const detection = MATIERES[matiere] ? { cle: matiere, cout: 0 } : await detecterMatiere(content);
  const cle = detection.cle;

  // L'ordre compte pour le cache : consignes et règles communes d'abord (identiques pour
  // tous les exercices), puis le guide de la matière.
  const system = [
    { type: "text", text: SYSTEM },
    {
      type: "text",
      text: `Règles communes de Révizo et fiches pays. ${AVERTISSEMENT}\n\n${REGLES}`,
      cache_control: { type: "ephemeral" },
    },
  ];
  if (cle) {
    system.push({
      type: "text",
      text: `Guide de correction de Révizo pour la matière ${MATIERES[cle]}. Applique-le : méthodes attendues, rédaction, ordre des étapes, façon d'expliquer, erreurs fréquentes. ${AVERTISSEMENT}\n\n${GUIDES[cle]}`,
      cache_control: { type: "ephemeral" },
    });
  }
  const code = codePays(pays);
  if (code) {
    system.push({
      type: "text",
      text: `Fiche pays de l'élève (${PAYS[code]}) : examens, épreuves, barèmes et vocabulaire. En cas de contradiction avec la partie A des règles communes, cette fiche fait foi. ${AVERTISSEMENT}\n\n${FICHES_PAYS[code]}`,
      cache_control: { type: "ephemeral" },
    });
  }

  // En flux : une longue réflexion sur un gros sujet (probabilités, plusieurs exercices) ne coupe pas la réponse.
  const response = await client.beta.messages.stream({
    model: MODEL,
    max_tokens: 32000,
    ...SECOURS,
    thinking: { type: "adaptive" },
    output_config: { effort: "high", format: { type: "json_schema", schema: SCHEMA } },
    system,
    messages: [{ role: "user", content }],
  }).finalMessage();
  const cout = journal("correction", response) + detection.cout;
  return { resultat: readJson(response), cout };
}

// Vérifie la demande de l'appli, appelle l'IA et renvoie { status, data, cout } (cout en millionièmes de dollar).
function erreurApi(error) {
  if (error instanceof Anthropic.RateLimitError) {
    return { status: 429, data: { erreur: "Beaucoup d'élèves en même temps. Réessaie dans une minute." } };
  }
  if (error instanceof Anthropic.APIError) {
    console.error(`API error ${error.status}:`, error.message);
    return { status: 502, data: { erreur: "Le service est momentanément indisponible." } };
  }
  console.error(error);
  return { status: 500, data: { erreur: "Erreur inattendue." } };
}

export async function traiterLire(body) {
  if (typeof body?.image !== "string" || !body.image) return { status: 400, data: { erreur: "Envoie une photo." } };
  if (!IMAGE_TYPES.includes(body.mediaType)) return { status: 400, data: { erreur: "Format de photo non pris en charge." } };
  try {
    const { resultat, cout } = await lire({ image: body.image, mediaType: body.mediaType });
    return { status: resultat.erreur ? 422 : 200, data: resultat, cout };
  } catch (error) {
    return erreurApi(error);
  }
}

export async function traiterResoudre(body) {
  const texte = typeof body?.texte === "string" ? body.texte.slice(0, 8000).trim() : "";
  const image = typeof body?.image === "string" ? body.image : "";
  if (!texte && !image) return { status: 400, data: { erreur: "Écris ton exercice ou envoie une photo." } };
  if (image && !IMAGE_TYPES.includes(body.mediaType)) return { status: 400, data: { erreur: "Format de photo non pris en charge." } };
  try {
    const { resultat, cout } = await resoudre({
      texte,
      image,
      mediaType: body.mediaType,
      pays: typeof body.pays === "string" ? body.pays.slice(0, 40) : "",
      classe: typeof body.classe === "string" ? body.classe.slice(0, 40) : "",
      matiere: typeof body.matiere === "string" ? body.matiere : "",
    });
    return { status: resultat.erreur ? 422 : 200, data: resultat, cout };
  } catch (error) {
    return erreurApi(error);
  }
}
