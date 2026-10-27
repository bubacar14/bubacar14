// Comptes et crédits des élèves, gardés dans Supabase (voir supabase/migrations/).
// Un élève = un appareil : l'appli envoie une clé aléatoire (en-tête X-Revizo-Cle),
// le serveur n'en garde que l'empreinte. Sans SUPABASE_URL ni SUPABASE_SECRET_KEY
// (ordinateur du développeur), les crédits restent gérés par l'appli comme avant.
import crypto from "node:crypto";

const URL_SUPABASE = process.env.SUPABASE_URL;
const CLE_SECRETE = process.env.SUPABASE_SECRET_KEY;
export const comptesActifs = Boolean(URL_SUPABASE && CLE_SECRETE);

const empreinte = (texte) => crypto.createHash("sha256").update(texte).digest("hex");

// Lit la clé de l'appareil et l'adresse IP dans les en-têtes de la requête.
export function identifier(entetes) {
  const cle = entetes["x-revizo-cle"];
  if (typeof cle !== "string" || !/^[0-9a-f-]{36}$/i.test(cle)) return null;
  const ip = String(entetes["x-forwarded-for"] || "").split(",")[0].trim();
  return { cle: empreinte(`revizo:${cle}`), ip: empreinte(`ip:${ip}`) };
}

async function rpc(fonction, args) {
  const res = await fetch(`${URL_SUPABASE}/rest/v1/rpc/${fonction}`, {
    method: "POST",
    headers: { apikey: CLE_SECRETE, "Content-Type": "application/json" },
    body: JSON.stringify(args),
  });
  const data = await res.json().catch(() => null);
  if (!res.ok) throw new Error(`Supabase ${fonction} : ${res.status} ${data?.message || ""}`);
  return data;
}

export async function solde(qui) {
  const e = await rpc("revizo_eleve", { p_cle_hash: qui.cle, p_ip_hash: qui.ip });
  return e.credits;
}
export const debiter = (qui) => rpc("revizo_debiter", { p_cle_hash: qui.cle, p_ip_hash: qui.ip });
export const rendre = (qui, mouvement, motif) => rpc("revizo_rendre", { p_cle_hash: qui.cle, p_mouvement: mouvement, p_motif: motif });
export const crediter = (qui, credits) => rpc("revizo_crediter", { p_cle_hash: qui.cle, p_ip_hash: qui.ip, p_credits: credits });

export const creerCommande = (qui, reference, offre, credits, montant) =>
  rpc("revizo_commande_creer", { p_cle_hash: qui.cle, p_ip_hash: qui.ip, p_reference: reference, p_offre: offre, p_credits: credits, p_montant: montant });
export const payerCommande = (reference, montant) => rpc("revizo_commande_payer", { p_reference: reference, p_montant: montant });
export const echouerCommande = (reference) => rpc("revizo_commande_echouer", { p_reference: reference });
export const etatCommande = (qui, reference) => rpc("revizo_commande_etat", { p_cle_hash: qui.cle, p_reference: reference });
