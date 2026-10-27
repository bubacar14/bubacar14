// Fonction Vercel : POST /api/lire (lecture de la photo, gratuite).
import { routeLire } from "../routes.js";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();
  const { status, data } = await routeLire(req.body, req.headers);
  res.status(status).json(data);
}
