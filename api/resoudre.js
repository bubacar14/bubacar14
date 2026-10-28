// Fonction Vercel : POST /api/resoudre (correction pas à pas, 1 crédit).
import { routeResoudre } from "../routes.js";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();
  const { status, data } = await routeResoudre(req.body, req.headers);
  res.status(status).json(data);
}
