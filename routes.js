// Les routes de l'API, communes au serveur local (server.js) et à Vercel (api/).
// Chaque route reçoit le corps JSON et les en-têtes, et renvoie { status, data }.
import { traiterLire, traiterResoudre } from "./ia.js";
import { comptesActifs, identifier, solde, debiter, rendre, crediter } from "./comptes.js";

const PAS_DE_CLE = { status: 400, data: { erreur: "Mets l'appli à jour (Cmd + Maj + R) puis réessaie." } };
const PANNE = { status: 503, data: { erreur: "Le service est momentanément indisponible. Réessaie dans un instant." } };

// Les offres de la page Recharge : le serveur ne fait confiance qu'à cette liste.
const OFFRES = { petit: 3, moyen: 10, grand: 50 };

async function avecCompte(entetes, travail) {
  if (!comptesActifs) return travail(null);
  const qui = identifier(entetes);
  if (!qui) return PAS_DE_CLE;
  try {
    return await travail(qui);
  } catch (error) {
    console.error(error);
    return String(error.message).includes("trop_de_comptes")
      ? { status: 429, data: { erreur: "Trop de nouveaux comptes depuis ce réseau aujourd'hui. Réessaie demain." } }
      : PANNE;
  }
}

// Solde de l'élève (l'exercice offert du jour est ajouté ici).
export function routeCompte(body, entetes) {
  return avecCompte(entetes, async (qui) => {
    const paiement = process.env.VERCEL ? "bientot" : "demo";
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
    const credits = OFFRES[body?.offre];
    if (!credits) return { status: 400, data: { erreur: "Offre inconnue." } };
    if (!qui) return { status: 200, data: { local: true } };
    const r = await crediter(qui, credits);
    return { status: 200, data: { credits: r.credits } };
  });
}
