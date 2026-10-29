// Fonction Vercel : POST /api/evenement (mesure anonyme de l'appli).
import { routeEvenement } from "../routes.js";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();
  const { status, data } = await routeEvenement(req.body, req.headers);
  res.status(status).json(data);
}
