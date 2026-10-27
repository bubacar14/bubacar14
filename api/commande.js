// Fonction Vercel : POST /api/commande (état d'un paiement au retour de l'élève).
import { routeCommande } from "../routes.js";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();
  const { status, data } = await routeCommande(req.body, req.headers);
  res.status(status).json(data);
}
