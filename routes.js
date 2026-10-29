// Les routes de l'API, communes au serveur local (server.js) et à Vercel (api/).
// Chaque route reçoit le corps JSON et les en-têtes, et renvoie { status, data }.
import { traiterLire, traiterResoudre } from "./ia.js";
import crypto from "node:crypto";
import { comptesActifs, identifier, solde, compte, debiter, rendre, crediter, creerCommande, payerCommande, echouerCommande, etatCommande, noterEvenement, adminStats, adminEleves, adminEleve, adminCrediter, adminMarquerTest, adminPlus, adminReglage, adminDepense, adminAccueil, ajouterSignalement, marquerRobot, adminSignalements, adminSignalementTraite, adminCouts, adminSuspects, adminEcarterSuspects } from "./comptes.js";
import { paiementActif, modeTest, OFFRES, nouvelleReference, creerSession, etatSession, signatureValide, moyensDePaiement, numeroInternational, lancerTentative } from "./paiement.js";

const PAS_DE_CLE = { status: 400, data: { erreur: "Mets l'appli à jour (Cmd + Maj + R) puis réessaie." } };
const PANNE = { status: 503, data: { erreur: "Le service est momentanément indisponible. Réessaie dans un instant." } };


// Robots (aperçus de liens, vérification des pubs, navigateurs automatisés) : écartés des statistiques.
const ROBOT = /bot|crawl|spider|slurp|facebookexternalhit|facebot|meta-externalagent|headlesschrome|lighthouse|whatsapp|telegram|preview/i;

async function avecCompte(entetes, travail) {
  if (!comptesActifs) return travail(null);
  const qui = identifier(entetes);
  if (!qui) return PAS_DE_CLE;
  try {
    if (ROBOT.test(String(entetes["user-agent"] || ""))) {
      const r = await travail(qui);
      await marquerRobot(qui).catch(() => {});
      return r;
    }
    return await travail(qui);
  } catch (error) {
    console.error(error);
    if (String(error.message).includes("trop_de_comptes")) return { status: 429, data: { erreur: "Trop de nouveaux comptes depuis ce réseau aujourd'hui. Réessaie demain." } };
    if (String(error.message).includes("trop_de_commandes")) return { status: 429, data: { erreur: "Trop de paiements commencés aujourd'hui. Réessaie demain." } };
    return PANNE;
  }
}

// Nom court d'une matière (l'IA écrit parfois « Mathématiques », « Maths », « Physique-Chimie »…).
const MATIERES_COURTES = [["math", "Maths"], ["géom", "Maths"], ["phys", "PC"], ["chim", "PC"], ["svt", "SVT"], ["vie et de la terre", "SVT"], ["philo", "Philo"], ["fran", "Français"], ["hist", "Histoire-Géo"], ["géographie", "Histoire-Géo"], ["angl", "Anglais"], ["économ", "Économie"], ["compta", "Économie"]];
function matiereCourte(m = "") {
  const t = String(m).toLowerCase();
  return MATIERES_COURTES.find(([k]) => t.includes(k))?.[1] || String(m).split(/[.,;:(·]/)[0].trim().slice(0, 30) || "?";
}

// Solde de l'élève (l'exercice offert du jour est ajouté ici).
export function routeCompte(body, entetes) {
  return avecCompte(entetes, async (qui) => {
    // « dexpay » : vrai paiement ; « demo » : paiement simulé (ordinateur du développeur) ; « bientot » : pas encore branché.
    const paiement = paiementActif && comptesActifs ? "dexpay" : process.env.VERCEL ? "bientot" : "demo";
    if (!qui) return { status: 200, data: { local: true, paiement } };
    const e = await compte(qui);
    return { status: 200, data: { credits: e.credits, offerts: e.credits_offerts || 0, paiement } };
  });
}

// La lecture de la photo est gratuite, mais réservée aux appareils connus.
export function routeLire(body, entetes) {
  return avecCompte(entetes, async (qui) => {
    if (qui) await solde(qui);
    const r = await traiterLire(body);
    if (qui && r.cout) noterEvenement(qui, "lecture", { cout: r.cout }).catch(() => {});
    return r;
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
    // Pour les statistiques : la matière et le niveau de l'exercice corrigé (sans l'énoncé).
    noterEvenement(qui, "exercice", { matiere: matiereCourte(resultat.data.matiere), niveau: String(body?.classe || "").slice(0, 30), cout: resultat.cout || 0 }).catch(() => {});
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
    // L'énoncé et la réponse de l'IA sont gardés pour corriger les guides (rien d'autre sur l'élève).
    if (typeof body?.enonce === "string" && body.enonce.trim()) {
      await ajouterSignalement(qui, {
        mouvement,
        matiere: matiereCourte(body.matiere),
        classe: String(body.classe || "").slice(0, 40),
        pays: String(body.pays || "").slice(0, 4),
        enonce: body.enonce.slice(0, 4000),
        reponse: typeof body.reponse === "string" ? body.reponse.slice(0, 3000) : "",
      }).catch((e) => console.error(e));
    }
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

// Les opérateurs proposés dans le pays de l'élève (Wave, Orange Money…), d'après DexPay.
export async function routeMoyens(body) {
  if (!paiementActif) return { status: 200, data: { moyens: [] } };
  try {
    return { status: 200, data: { moyens: await moyensDePaiement(String(body?.pays || "")) } };
  } catch (error) {
    console.error(error);
    return PANNE;
  }
}

// Commence un vrai paiement, sans quitter Révizo : la commande (montant et crédits fixés ici),
// la session DexPay, puis la demande à l'opérateur. Le numéro n'est ni enregistré ni écrit dans les journaux.
export function routePayer(body, entetes) {
  if (!paiementActif || !comptesActifs) return Promise.resolve({ status: 403, data: { erreur: "Le paiement par mobile money arrive bientôt.", code: "paiement_indisponible" } });
  return avecCompte(entetes, async (qui) => {
    const offre = OFFRES[body?.offre];
    if (!offre) return { status: 400, data: { erreur: "Offre inconnue." } };
    const pays = String(body?.pays || "");
    const moyens = await moyensDePaiement(pays);
    if (!moyens.length) return { status: 400, data: { erreur: "Le paiement n'est pas encore disponible dans ton pays.", code: "pays_indisponible" } };
    const moyen = moyens.find((m) => m.code === body?.operateur);
    if (!moyen) return { status: 400, data: { erreur: "Choisis ton moyen de paiement." } };
    const telephone = numeroInternational(body?.telephone, pays);
    if (!telephone) return { status: 400, data: { erreur: "Vérifie ton numéro de téléphone.", code: "numero_invalide" } };
    const reference = nouvelleReference();
    await creerCommande(qui, reference, body.offre, offre.credits, offre.prix, modeTest);
    await creerSession(reference, offre);
    try {
      const t = await lancerTentative(reference, { operateur: moyen.code, pays, telephone, nom: String(body?.nom || "Élève Révizo").slice(0, 40) });
      return { status: 200, data: { reference, lien: t.lien, operateur: moyen.nom } };
    } catch (error) {
      console.error(String(error.message).replace(/\+?\d{8,15}/g, "[numéro]"));
      await echouerCommande(reference).catch(() => {});
      return { status: 502, data: { erreur: `${moyen.nom} n'a pas accepté la demande. Vérifie ton numéro et réessaie.` } };
    }
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

// ---------- Mesures anonymes ----------

// Les seuls événements et détails acceptés : jamais de prénom ni de numéro de téléphone.
const EVENEMENTS = {
  visite: ["source", "campagne", "installee", "version"],
  bienvenue: ["classe", "pays", "version"],
  correction: ["type"],
  prenom: ["donne"],
  essai: ["niveau"],
  quiz: ["mode", "score", "total", "matiere"],
  installation: [],
  recharge: ["contexte"],
  partage: ["quoi"],
};

export function routeEvenement(body, entetes) {
  const champs = EVENEMENTS[body?.type];
  if (!champs || !comptesActifs) return Promise.resolve({ status: 200, data: { ok: false } });
  const details = {};
  for (const c of champs) {
    const v = body.details?.[c];
    if (typeof v === "string") details[c] = v.slice(0, 60);
    else if (typeof v === "number" || typeof v === "boolean") details[c] = v;
  }
  return avecCompte(entetes, async (qui) => {
    await noterEvenement(qui, body.type, details);
    return { status: 200, data: { ok: true } };
  });
}

// ---------- Espace admin (revizo.click/admin) ----------
// Mot de passe ADMIN_PASSWORD (réglage Vercel). La connexion renvoie un jeton signé valable 12 heures.

const MOT_DE_PASSE = process.env.ADMIN_PASSWORD;
const DUREE_JETON = 12 * 60 * 60 * 1000;
const signer = (texte) => crypto.createHmac("sha256", `revizo-admin:${MOT_DE_PASSE}`).update(texte).digest("hex");
const egal = (a, b) => a.length === b.length && crypto.timingSafeEqual(Buffer.from(a), Buffer.from(b));

function jetonValide(jeton) {
  if (!MOT_DE_PASSE || typeof jeton !== "string") return false;
  const [expire, signature] = jeton.split(".");
  return Number(expire) > Date.now() && Boolean(signature) && egal(signer(expire), signature);
}

// Microsoft Clarity (revoir les visites) : chiffres des 3 derniers jours, par source, pour l'onglet « Comportement ».
// Clarity n'autorise que 10 demandes par jour : la réponse est gardée 3 heures (8 demandes par jour au plus).
const CLARITY_TOKEN = process.env.CLARITY_TOKEN;
const CLARITY_GARDE = 3 * 60 * 60 * 1000;
let clarityMemoire = null;

async function adminClarity() {
  if (!CLARITY_TOKEN) return { configure: false };
  if (clarityMemoire && Date.now() - clarityMemoire.quand < CLARITY_GARDE) return clarityMemoire.donnees;
  try {
    const res = await fetch("https://www.clarity.ms/export-data/api/v1/project-live-insights?numOfDays=3&dimension1=Source", {
      headers: { Authorization: `Bearer ${CLARITY_TOKEN}`, "Content-Type": "application/json" },
      signal: AbortSignal.timeout(20000),
    });
    if (!res.ok) {
      const erreur = res.status === 429 ? "limite" : res.status === 401 || res.status === 403 ? "jeton" : "panne";
      // Si Clarity refuse (limite du jour atteinte), on garde les derniers chiffres reçus.
      return clarityMemoire ? { ...clarityMemoire.donnees, avertissement: erreur } : { configure: true, erreur };
    }
    const donnees = { configure: true, metriques: await res.json(), recu: new Date().toISOString() };
    clarityMemoire = { quand: Date.now(), donnees };
    return donnees;
  } catch (error) {
    console.error(error);
    return clarityMemoire ? { ...clarityMemoire.donnees, avertissement: "panne" } : { configure: true, erreur: "panne" };
  }
}

export async function routeAdmin(body, entetes) {
  if (!MOT_DE_PASSE || !comptesActifs) return { status: 503, data: { erreur: "Espace admin non configuré." } };
  if (body?.action === "connexion") {
    const essai = String(body.motDePasse || "");
    // Une petite attente à chaque essai freine ceux qui tenteraient de deviner le mot de passe.
    await new Promise((ok) => setTimeout(ok, 600));
    if (!egal(signer(essai), signer(MOT_DE_PASSE))) return { status: 401, data: { erreur: "Mot de passe incorrect." } };
    const expire = String(Date.now() + DUREE_JETON);
    return { status: 200, data: { jeton: `${expire}.${signer(expire)}` } };
  }
  if (!jetonValide(String(entetes["authorization"] || "").replace(/^Bearer /, ""))) return { status: 401, data: { erreur: "Reconnecte-toi." } };
  try {
    switch (body?.action) {
      case "stats":
        return { status: 200, data: await adminStats(Math.min(Math.max(Number(body.jours) || 30, 1), 365)) };
      case "eleves":
        return { status: 200, data: await adminEleves(String(body.recherche || "").slice(0, 40), 100) };
      case "eleve":
        return { status: 200, data: (await adminEleve(String(body.id || "").slice(0, 36))) || { erreur: "Élève introuvable." } };
      case "crediter": {
        const credits = Math.trunc(Number(body.credits));
        if (!credits || Math.abs(credits) > 500) return { status: 400, data: { erreur: "Nombre de crédits invalide." } };
        return { status: 200, data: await adminCrediter(String(body.id || "").slice(0, 36), credits) };
      }
      case "signalements":
        return { status: 200, data: await adminSignalements(body.traites === true) };
      case "signalement_traite":
        return { status: 200, data: (await adminSignalementTraite(Math.trunc(Number(body.id)), body.traite !== false)) || { ok: false } };
      case "couts":
        return { status: 200, data: await adminCouts(Math.min(Math.max(Number(body.jours) || 30, 1), 365)) };
      case "suspects":
        return { status: 200, data: await adminSuspects() };
      case "ecarter_suspects":
        return { status: 200, data: await adminEcarterSuspects() };
      case "accueil":
        return { status: 200, data: await adminAccueil(Math.min(Math.max(Number(body.jours) || 30, 1), 365)) };
      case "plus":
        return { status: 200, data: await adminPlus(Math.min(Math.max(Number(body.jours) || 30, 1), 365)) };
      case "reglage":
        return { status: 200, data: await adminReglage(String(body.cle || ""), Math.trunc(Number(body.valeur))) };
      case "depense":
        return { status: 200, data: await adminDepense(String(body.source || "").slice(0, 40), String(body.campagne || "").slice(0, 60), Math.trunc(Number(body.depense) || 0)) };
      case "test":
        return { status: 200, data: await adminMarquerTest(String(body.id || "").slice(0, 36), body.test !== false) };
      case "clarity":
        return { status: 200, data: await adminClarity() };
      default:
        return { status: 400, data: { erreur: "Action inconnue." } };
    }
  } catch (error) {
    console.error(error);
    return PANNE;
  }
}
