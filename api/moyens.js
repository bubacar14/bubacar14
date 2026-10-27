// Fonction Vercel : POST /api/moyens (opérateurs mobile money du pays de l'élève).
import { routeMoyens } from "../routes.js";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();
  const { status, data } = await routeMoyens(req.body, req.headers);
  res.status(status).json(data);
}
