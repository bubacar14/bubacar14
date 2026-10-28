// Fonction Vercel : POST /api/achat-demo (paiement simulé, désactivé en ligne).
import { routeAchatDemo } from "../routes.js";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();
  const { status, data } = await routeAchatDemo(req.body, req.headers);
  res.status(status).json(data);
}
