// Fonction Vercel : POST /api/admin (espace admin, protégé par mot de passe).
import { routeAdmin } from "../routes.js";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();
  const { status, data } = await routeAdmin(req.body, req.headers);
  res.status(status).json(data);
}
