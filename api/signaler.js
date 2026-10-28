// Fonction Vercel : POST /api/signaler (erreur signalée : le crédit est rendu).
import { routeSignaler } from "../routes.js";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();
  const { status, data } = await routeSignaler(req.body, req.headers);
  res.status(status).json(data);
}
