// Serveur local de Révizo (npm run dev) : sert l'appli et les deux routes de l'IA.
// En ligne, Vercel fait le même travail avec api/lire.js et api/resoudre.js.
import http from "node:http";
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { MODEL } from "./ia.js";
import { comptesActifs } from "./comptes.js";
import { routeLire, routeResoudre, routeCompte, routeSignaler, routeAchatDemo, routePayer, routeCommande, routeWebhook, routeMoyens } from "./routes.js";
import { PUBLIC } from "./fichiers-publics.js";

const ROOT = path.dirname(fileURLToPath(import.meta.url));
const PORT = Number(process.env.PORT) || 3000;
const MAX_BODY = 8 * 1024 * 1024; // une photo de téléphone compressée tient largement

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

const ROUTES = {
  "/api/lire": routeLire,
  "/api/resoudre": routeResoudre,
  "/api/compte": routeCompte,
  "/api/signaler": routeSignaler,
  "/api/achat-demo": routeAchatDemo,
  "/api/payer": routePayer,
  "/api/moyens": routeMoyens,
  "/api/commande": routeCommande,
};

async function handleApi(req, res, route) {
  let body;
  try {
    body = JSON.parse((await readBody(req)) || "{}");
  } catch (e) {
    return sendJson(res, e.message === "too_large" ? 413 : 400, { erreur: e.message === "too_large" ? "Photo trop lourde." : "Requête invalide." });
  }
  const { status, data } = await route(body, req.headers);
  sendJson(res, status, data);
}

const MIME = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".svg": "image/svg+xml",
  ".webmanifest": "application/manifest+json",
  ".png": "image/png",
};


async function handleStatic(req, res) {
  const name = decodeURIComponent(new URL(req.url, "http://x").pathname).replace(/^\/+/, "") || "index.html";
  if (!PUBLIC.includes(name)) {
    res.writeHead(404);
    return res.end("Not found");
  }
  const data = await fs.readFile(path.join(ROOT, name));
  res.writeHead(200, { "Content-Type": MIME[path.extname(name)] || "application/octet-stream" });
  res.end(data);
}

http
  .createServer((req, res) => {
    if (req.method === "POST" && ROUTES[req.url]) return handleApi(req, res, ROUTES[req.url]);
    if (req.method === "POST" && req.url === "/api/dexpay-webhook") {
      return readBody(req).then(async (brut) => { const { status, data } = await routeWebhook(brut, req.headers); sendJson(res, status, data); }, () => sendJson(res, 400, {}));
    }
    if (req.method === "GET") return handleStatic(req, res).catch(() => { res.writeHead(500); res.end(); });
    res.writeHead(405);
    res.end();
  })
  .listen(PORT, () => console.log(`Révizo sur http://localhost:${PORT} (modèle ${MODEL}, crédits ${comptesActifs ? "sur Supabase" : "dans le téléphone"})`));
