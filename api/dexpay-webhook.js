// Fonction Vercel : POST /api/dexpay-webhook (DexPay annonce un paiement).
// Le corps est lu brut : la signature HMAC se calcule sur les octets reçus, pas sur le JSON relu.
import { routeWebhook } from "../routes.js";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();
  const morceaux = [];
  for await (const m of req) morceaux.push(m);
  const { status, data } = await routeWebhook(Buffer.concat(morceaux).toString("utf8"), req.headers);
  res.status(status).json(data);
}
