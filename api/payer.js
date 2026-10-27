// Fonction Vercel : POST /api/payer (commence un paiement DexPay).
import { routePayer } from "../routes.js";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();
  const { status, data } = await routePayer(req.body, req.headers);
  res.status(status).json(data);
}
