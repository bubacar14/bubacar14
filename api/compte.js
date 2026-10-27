// Fonction Vercel : POST /api/compte (solde de crédits de l'élève).
import { routeCompte } from "../routes.js";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();
  const { status, data } = await routeCompte(req.body, req.headers);
  res.status(status).json(data);
}
