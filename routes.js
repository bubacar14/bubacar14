// Les routes de l'API, communes au serveur local (server.js) et à Vercel (api/).
// Chaque route reçoit le corps JSON et les en-têtes, et renvoie { status, data }.
import { traiterLire, traiterResoudre } from "./ia.js";
import { comptesActifs, identifier, solde, debiter, rendre, crediter, creerCommande, payerCommande, echouerCommande, etatCommande } from "./comptes.js";
import { paiementActif, OFFRES, PAYS_DEXPAY, nouvelleReference, creerSession, etatSession, signatureValide } from "./paiement.js";

const PAS_DE_CLE = { status: 400, data: { erreur: "Mets l'appli à jour (Cmd + Maj + R) puis réessaie." } };
const PANNE = { status: 503, data: { erreur: "Le service est momentanément indisponible. Réessaie dans un instant." } };


async function avecCompte(entetes, travail) {
  if (!comptesActifs) return travail(null);
  const qui = identifier(entetes);
  if (!qui) return PAS_DE_CLE;
  try {
    return await travail(qui);
  } catch (error) {
    console.error(error);
    if (String(error.message).includes("trop_de_comptes")) return { status: 429, data: { erreur: "Trop de nouveaux comptes depuis ce réseau aujourd'hui. Réessaie demain." } };
    if (String(error.message).includes("trop_de_commandes")) return { status: 429, data: { erreur: "Trop de paiements commencés aujourd'hui. Réessaie demain." } };
    return PANNE;
  }
}

// Solde de l'élève (l'exercice offert du jour est ajouté ici).
export function routeCompte(body, entetes) {
  return avecCompte(entetes, async (qui) => {
    // « dexpay » : vrai paiement ; « demo » : paiement simulé (ordinateur du développeur) ; « bientot » : pas encore branché.
    const paiement = paiementActif && comptesActifs ? "dexpay" : process.env.VERCEL ? "bientot" : "demo";
    if (!qui) return { status: 200, data: { local: true, paiement } };
    return { status: 200, data: { credits: await solde(qui), paiement } };
  });
}

// La lecture de la photo est gratuite, mais réservée aux appareils connus.
export function routeLire(body, entetes) {
  return avecCompte(entetes, async (qui) => {
    if (qui) await solde(qui);
    return traiterLire(body);
  });
}

// La correction coûte 1 crédit, retiré avant l'appel à l'IA et rendu si elle échoue.
export function routeResoudre(body, entetes) {
  return avecCompte(entetes, async (qui) => {
    if (!qui) return traiterResoudre(body);
    const debit = await debiter(qui);
    if (!debit.ok) return { status: 402, data: { erreur: "Tu n'as plus de crédit.", code: "plus_de_credit", credits: 0 } };
    const resultat = await traiterResoudre(body);
    if (resultat.status !== 200 || resultat.data.lisible === false) {
      const retour = await rendre(qui, debit.mouvement, "remboursement").catch(() => null);
      return { status: resultat.status, data: { ...resultat.data, credits: retour?.credits ?? debit.credits, rendu: Boolean(retour?.ok) } };
    }
    return { status: 200, data: { ...resultat.data, credits: debit.credits, mouvement: debit.mouvement } };
  });
}

// L'élève signale une erreur dans la correction : son crédit lui est rendu, une seule fois.
export function routeSignaler(body, entetes) {
  return avecCompte(entetes, async (qui) => {
    if (!qui) return { status: 200, data: { local: true } };
    const mouvement = Number(body?.mouvement);
    if (!Number.isInteger(mouvement)) return { status: 400, data: { erreur: "Requête invalide." } };
    const retour = await rendre(qui, mouvement, "signalement");
    return { status: 200, data: { rendu: retour.ok, credits: retour.credits } };
  });
}

// Paiement simulé : seulement sur l'ordinateur du développeur. En ligne, il attend le vrai paiement mobile money.
export function routeAchatDemo(body, entetes) {
  if (process.env.VERCEL) return Promise.resolve({ status: 403, data: { erreur: "Le paiement par mobile money arrive bientôt.", code: "paiement_indisponible" } });
  return avecCompte(entetes, async (qui) => {
    const credits = OFFRES[body?.offre]?.credits;
    if (!credits) return { status: 400, data: { erreur: "Offre inconnue." } };
    if (!qui) return { status: 200, data: { local: true } };
    const r = await crediter(qui, credits);
    return { status: 200, data: { credits: r.credits } };
  });
}

// Commence un vrai paiement : la commande (montant et crédits fixés ici) puis la page de paiement DexPay.
export function routePayer(body, entetes) {
  if (!paiementActif || !comptesActifs) return Promise.resolve({ status: 403, data: { erreur: "Le paiement par mobile money arrive bientôt.", code: "paiement_indisponible" } });
  return avecCompte(entetes, async (qui) => {
    const offre = OFFRES[body?.offre];
    if (!offre) return { status: 400, data: { erreur: "Offre inconnue." } };
    if (!PAYS_DEXPAY.includes(body?.pays)) return { status: 400, data: { erreur: "Le paiement n'est pas encore disponible dans ton pays.", code: "pays_indisponible" } };
    const reference = nouvelleReference();
    await creerCommande(qui, reference, body.offre, offre.credits, offre.prix);
    const url = await creerSession(reference, offre);
    return { status: 200, data: { url, reference } };
  });
}

// Au retour de la page de paiement : l'état de la commande. Si DexPay confirme le paiement
// et que le webhook n'est pas encore arrivé, les crédits sont ajoutés ici (une seule fois).
// L'adresse ?paiement=ok ne prouve rien : seule la réponse de DexPay compte.
export function routeCommande(body, entetes) {
  return avecCompte(entetes, async (qui) => {
    const reference = String(body?.reference || "");
    if (!qui || !/^RZ-[A-Z0-9-]{6,40}$/.test(reference)) return { status: 400, data: { erreur: "Requête invalide." } };
    let etat = await etatCommande(qui, reference);
    if (!etat) return { status: 404, data: { erreur: "Paiement introuvable." } };
    if (etat.statut === "en_attente" && paiementActif) {
      const s = await etatSession(reference).catch(() => null);
      if (s?.statut === "completed") await payerCommande(reference, s.montant);
      if (s && ["failed", "cancelled"].includes(s.statut)) await echouerCommande(reference);
      etat = await etatCommande(qui, reference);
    }
    return { status: 200, data: etat };
  });
}

// DexPay annonce un paiement réussi ou échoué. Signature vérifiée sur le corps brut, puis
// l'état est relu chez DexPay avant d'ajouter les crédits. Répond toujours 200 une fois traité.
export async function routeWebhook(corpsBrut, entetes) {
  if (!paiementActif || !comptesActifs) return { status: 503, data: { erreur: "Paiement inactif." } };
  if (!signatureValide(corpsBrut, entetes["x-webhook-signature"])) return { status: 401, data: { erreur: "Signature invalide." } };
  let evenement;
  try {
    evenement = JSON.parse(corpsBrut);
  } catch {
    return { status: 400, data: { erreur: "Requête invalide." } };
  }
  const reference = String(evenement.reference || evenement.metadata?.reference || "");
  if (!reference.startsWith("RZ-")) return { status: 200, data: { ignore: true } };
  try {
    const s = await etatSession(reference);
    if (s.statut === "completed") await payerCommande(reference, s.montant);
    else if (["failed", "cancelled"].includes(s.statut)) await echouerCommande(reference);
    return { status: 200, data: { ok: true } };
  } catch (error) {
    console.error(error);
    return { status: 500, data: { erreur: "Réessaie plus tard." } };
  }
}
