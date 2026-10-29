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
// Le compte de l'élève : solde et crédits de bienvenue reçus (pour lui annoncer son cadeau).
export const compte = (qui) => rpc("revizo_eleve", { p_cle_hash: qui.cle, p_ip_hash: qui.ip });
export const debiter = (qui) => rpc("revizo_debiter", { p_cle_hash: qui.cle, p_ip_hash: qui.ip });
export const rendre = (qui, mouvement, motif) => rpc("revizo_rendre", { p_cle_hash: qui.cle, p_mouvement: mouvement, p_motif: motif });
export const crediter = (qui, credits) => rpc("revizo_crediter", { p_cle_hash: qui.cle, p_ip_hash: qui.ip, p_credits: credits });

export const creerCommande = (qui, reference, offre, credits, montant, test) =>
  rpc("revizo_commande_creer", { p_cle_hash: qui.cle, p_ip_hash: qui.ip, p_reference: reference, p_offre: offre, p_credits: credits, p_montant: montant, p_test: test });
export const payerCommande = (reference, montant) => rpc("revizo_commande_payer", { p_reference: reference, p_montant: montant });
export const echouerCommande = (reference) => rpc("revizo_commande_echouer", { p_reference: reference });
export const etatCommande = (qui, reference) => rpc("revizo_commande_etat", { p_cle_hash: qui.cle, p_reference: reference });

// Mesures anonymes de l'appli (visite, fin de l'accueil, quiz…) et espace admin.
export const noterEvenement = (qui, type, details) => rpc("revizo_evenement", { p_cle_hash: qui.cle, p_ip_hash: qui.ip, p_type: type, p_details: details });
export const adminStats = (jours) => rpc("revizo_admin_stats", { p_jours: jours });
export const adminEleves = (recherche, limite) => rpc("revizo_admin_eleves", { p_recherche: recherche, p_limite: limite });
export const adminEleve = (id) => rpc("revizo_admin_eleve", { p_id: id });
export const adminCrediter = (id, credits) => rpc("revizo_admin_crediter", { p_id: id, p_credits: credits });
export const adminMarquerTest = (id, test) => rpc("revizo_admin_marquer_test", { p_id: id, p_test: test });
export const adminPlus = (jours) => rpc("revizo_admin_plus", { p_jours: jours });
export const adminReglage = (cle, valeur) => rpc("revizo_admin_reglage", { p_cle: cle, p_valeur: valeur });
export const adminDepense = (source, campagne, depense) => rpc("revizo_admin_depense", { p_source: source, p_campagne: campagne, p_depense: depense });
export const adminAccueil = (jours) => rpc("revizo_admin_accueil", { p_jours: jours });
export const ajouterSignalement = (qui, d) => rpc("revizo_signalement_ajouter", { p_cle_hash: qui.cle, p_mouvement: d.mouvement, p_matiere: d.matiere, p_classe: d.classe, p_pays: d.pays, p_enonce: d.enonce, p_reponse: d.reponse });
export const marquerRobot = (qui) => rpc("revizo_marquer_robot", { p_cle_hash: qui.cle });
export const adminSignalements = (traites) => rpc("revizo_admin_signalements", { p_traites: traites });
export const adminSignalementTraite = (id, traite) => rpc("revizo_admin_signalement_traite", { p_id: id, p_traite: traite });
export const adminCouts = (jours) => rpc("revizo_admin_couts", { p_jours: jours });
export const adminSuspects = () => rpc("revizo_admin_suspects", {});
export const adminEcarterSuspects = () => rpc("revizo_admin_ecarter_suspects", {});
