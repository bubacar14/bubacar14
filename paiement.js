// Paiement mobile money par DexPay (https://docs.dexpay.africa).
// Intégration directe : l'élève choisit son opérateur et tape son numéro dans Révizo, sans passer par la page DexPay.
// 1. /api/payer crée la commande (Supabase), la session DexPay et la tentative de paiement :
//    Orange Money, MTN, Moov, Mixx envoient une demande à valider sur le téléphone ; Wave renvoie un lien vers l'appli Wave.
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
// Indicatifs téléphoniques des 8 pays de Révizo.
const INDICATIFS = { SN: "221", CI: "225", ML: "223", BF: "226", GN: "224", BJ: "229", TG: "228", NE: "227" };

// La clé secrète n'est envoyée que pour les appels qui l'exigent (opérateurs, tentative de paiement).
async function dexpay(chemin, options = {}, avecSecret = false) {
  const res = await fetch(`${API}${chemin}`, {
    ...options,
    headers: { "x-api-key": CLE_PUBLIQUE, ...(avecSecret ? { "x-api-secret": CLE_SECRETE } : {}), "Content-Type": "application/json", ...options.headers },
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

// Les opérateurs mobile money actifs dans un pays, d'après DexPay (gardés 10 minutes en mémoire).
const memoire = new Map();
export async function moyensDePaiement(pays) {
  if (!INDICATIFS[pays]) return [];
  const garde = memoire.get(pays);
  if (garde && garde.jusqua > Date.now()) return garde.moyens;
  const data = await dexpay(`/payment-providers?filters%5Bprovider_country%5D=${pays}&filters%5Bprovider_status%5D=active`, {}, true);
  const liste = Array.isArray(data) ? data : data?.data || data?.items || [];
  const moyens = liste
    .filter((m) => m.provider_type === "mobile_money" && m.provider_country === pays)
    .map((m) => ({ code: m.provider_short_name, nom: String(m.provider_name || "").trim(), logo: m.provider_logo || "" }));
  memoire.set(pays, { moyens, jusqua: Date.now() + 10 * 60 * 1000 });
  return moyens;
}

// Met le numéro au format international (+221…). Renvoie null s'il ne ressemble pas à un numéro.
export function numeroInternational(numero, pays) {
  let n = String(numero || "").replace(/[\s.()-]/g, "");
  if (n.startsWith("00")) n = `+${n.slice(2)}`;
  // En Côte d'Ivoire et au Bénin, le 0 du début fait partie du numéro (07…, 01…) ; ailleurs, on l'enlève.
  if (!n.startsWith("+")) n = `+${INDICATIFS[pays]}${["CI", "BJ"].includes(pays) ? n : n.replace(/^0+/, "")}`;
  return /^\+\d{10,15}$/.test(n) ? n : null;
}

// Lance le paiement chez l'opérateur. Wave renvoie un lien (cashout_url) ; les autres envoient une demande sur le téléphone.
export async function lancerTentative(reference, { operateur, pays, telephone, nom }) {
  const t = await dexpay(`/checkout-sessions/${encodeURIComponent(reference)}/transaction-attempt`, {
    method: "POST",
    body: JSON.stringify({ payment_method: "mobile_money", operator: operateur, countryISO: pays, customer: { name: nom, phone: telephone } }),
  }, true);
  return { lien: t?.cashout_url || null, statut: t?.status };
}
