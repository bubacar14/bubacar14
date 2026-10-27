// Paiement mobile money par DexPay (https://docs.dexpay.africa).
// 1. /api/payer crée la commande (Supabase) puis la session DexPay, et renvoie la page de paiement.
// 2. DexPay prévient /api/dexpay-webhook (signé en HMAC-SHA256 avec la clé secrète) : les crédits sont ajoutés.
// 3. Au retour de l'élève, /api/commande vérifie l'état (et interroge DexPay si le webhook n'est pas encore arrivé).
import crypto from "node:crypto";

const CLE_PUBLIQUE = process.env.DEXPAY_PUBLIC_KEY;
const CLE_SECRETE = process.env.DEXPAY_SECRET_KEY;
// Les clés de test (pk_test_…) ne marchent que sur l'adresse de test de DexPay, et inversement.
export const modeTest = Boolean(CLE_PUBLIQUE?.startsWith("pk_test_"));
const API = process.env.DEXPAY_API_URL || (modeTest ? "https://api-sandbox.dexpay.africa/api/v1" : "https://api.dexpay.africa/api/v1");
const SITE = process.env.REVIZO_SITE_URL || "https://revizo.click";
export const paiementActif = Boolean(CLE_PUBLIQUE && CLE_SECRETE);

// Les offres de la page Recharge : le serveur ne fait confiance qu'à cette liste.
export const OFFRES = {
  petit: { credits: 3, prix: 200 },
  moyen: { credits: 10, prix: 500 },
  grand: { credits: 50, prix: 2000 },
};
// Pays où DexPay encaisse le mobile money (Wave, Orange Money, MTN, Moov).
export const PAYS_DEXPAY = ["SN", "CI", "ML", "BF", "GN"];

async function dexpay(chemin, options = {}) {
  const res = await fetch(`${API}${chemin}`, {
    ...options,
    headers: { "x-api-key": CLE_PUBLIQUE, "Content-Type": "application/json", ...options.headers },
  });
  const data = await res.json().catch(() => null);
  if (!res.ok) throw new Error(`DexPay ${chemin} : ${res.status} ${data?.message || ""}`);
  return data?.data ?? data;
}

export function nouvelleReference() {
  return `RZ-${Date.now().toString(36).toUpperCase()}-${crypto.randomBytes(3).toString("hex").toUpperCase()}`;
}

export async function creerSession(reference, offre) {
  const retour = (etat) => `${SITE}/?paiement=${etat}&ref=${encodeURIComponent(reference)}`;
  const session = await dexpay("/checkout-sessions", {
    method: "POST",
    body: JSON.stringify({
      reference,
      item_name: `Révizo : ${offre.credits} crédits`,
      amount: offre.prix,
      currency: "XOF",
      success_url: retour("ok"),
      failure_url: retour("echec"),
      webhook_url: `${SITE}/api/dexpay-webhook`,
      is_one_shot_payment: true,
      metadata: { reference },
    }),
  });
  return session.payment_url;
}

export async function etatSession(reference) {
  const s = await dexpay(`/checkout-sessions/${encodeURIComponent(reference)}`);
  return { statut: s.status, montant: Number(s.amount) };
}

// Vérifie la signature d'un webhook : HMAC-SHA256 du corps brut, en hexadécimal, avec la clé secrète.
export function signatureValide(corpsBrut, signature) {
  if (typeof signature !== "string" || !/^[0-9a-f]{64}$/i.test(signature)) return false;
  const attendue = crypto.createHmac("sha256", CLE_SECRETE).update(corpsBrut).digest("hex");
  return crypto.timingSafeEqual(Buffer.from(attendue, "hex"), Buffer.from(signature.toLowerCase(), "hex"));
}
