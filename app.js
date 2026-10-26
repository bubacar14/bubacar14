// Révizo : renforcement scolaire pour l'Afrique de l'Ouest francophone.
// Tout l'état est local (localStorage). Le paiement est simulé.

const COUNTRIES = {
  SN: { nom: "Sénégal", brevet: "BFEM", devise: "FCFA", taux: 1, paiement: ["Wave", "Orange Money", "Free Money"] },
  CI: { nom: "Côte d'Ivoire", brevet: "BEPC", devise: "FCFA", taux: 1, paiement: ["Wave", "Orange Money", "MTN MoMo", "Moov Money"] },
  ML: { nom: "Mali", brevet: "DEF", devise: "FCFA", taux: 1, paiement: ["Orange Money", "Moov Money", "Wave"] },
  BF: { nom: "Burkina Faso", brevet: "BEPC", devise: "FCFA", taux: 1, paiement: ["Orange Money", "Moov Money", "Wave"] },
  GN: { nom: "Guinée", brevet: "BEPC", devise: "GNF", taux: 15, paiement: ["Orange Money", "MTN MoMo"] },
  BJ: { nom: "Bénin", brevet: "BEPC", devise: "FCFA", taux: 1, paiement: ["MTN MoMo", "Moov Money"] },
  TG: { nom: "Togo", brevet: "BEPC", devise: "FCFA", taux: 1, paiement: ["TMoney", "Moov Money"] },
  NE: { nom: "Niger", brevet: "BEPC", devise: "FCFA", taux: 1, paiement: ["Airtel Money", "Moov Money"] },
};

// Un crédit = un exercice expliqué. Prix en FCFA, convertis pour les autres devises.
const OFFRES = [
  { id: "petit", credits: 3, prix: 200 },
  { id: "moyen", credits: 10, prix: 500, badge: "Le plus choisi" },
  { id: "grand", credits: 50, prix: 2000 },
];
const CREDIT_OFFERT_PAR_JOUR = 1;
const QUIZ_LEN = 5;
const BOX_DAYS = [0, 1, 3, 7, 15]; // répétition espacée : délai avant de revoir
const CLASSES = ["Primaire", "6e – 5e", "4e – 3e", "Seconde", "Première", "Terminale"];
const MATIERES = [
  ["", "Je ne sais pas"], ["maths", "Maths"], ["pc", "PC"], ["svt", "SVT"], ["philo", "Philo"],
  ["francais", "Français"], ["hg", "Histoire-Géo"], ["anglais", "Anglais"], ["eco", "Économie"],
];
const MATIERES_QUIZ = [["", "Toutes"], ["Maths", "Maths"], ["PC", "PC"], ["SVT", "SVT"], ["Philo", "Philo"], ["Français", "Français"], ["Histoire-Géo", "Histoire-Géo"]];

// Icônes au trait de la charte (grille 24, trait 2, currentColor).
const ICONES = {
  photo: "M4 8h3l2-3h6l2 3h3v11H4zM15.5 13a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0z",
  juste: "M5 12.5 10 17.5 19 7",
  erreur: "M6 6l12 12M18 6 6 18",
  serie: "M4 6h16v14H4zM4 10h16M8 3v4M16 3v4M9 15l2 2 4-4",
  piece: "M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18zM9 9.5c0-1 1.3-1.5 3-1.5s3 .7 3 2-1.5 1.7-3 2-3 .8-3 2 1.3 2 3 2 3-.5 3-1.5M12 6.5v1.5M12 16v1.5",
  duel: "M4 4l9 9M4 4v4M4 4h4M20 4l-9 9M20 4v4M20 4h-4M7 17l-3 3M17 17l3 3",
  partager: "M12 15V4M8 8l4-4 4 4M5 13v7h14v-7",
  crayon: "M4 20l4-1 11-11-3-3L5 16zM14 7l3 3",
  methode: "M5 4h14v16H5zM9 9h6M9 13h4",
  cible: "M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18zM12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8zM12 12h.01",
  signaler: "M5 21V4M5 4h11l-2 4 2 4H5",
  accueil: "M4 11l8-7 8 7v9h-5v-6H9v6H4z",
  reviser: "M5 4h11a3 3 0 0 1 3 3v13H8a3 3 0 0 1-3-3zM5 17a3 3 0 0 1 3-3h11",
  profil: "M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM4 20c1-4 4-6 8-6s7 2 8 6",
  chevron: "M9 6l6 6-6 6",
  retour: "M15 6l-6 6 6 6",
  fermer: "M6 6l12 12M18 6 6 18",
  quiz: "M9 9a3 3 0 1 1 4 2.8c-.6.3-1 .8-1 1.5V14M12 18h.01M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18z",
  whatsapp: "M4 20l1.3-4A8 8 0 1 1 8 18.7zM9 9c0 3 3 6 6 6l1-1.5-2-1-1 1c-1-.5-2-1.5-2.5-2.5l1-1-1-2z",
};
function icone(nom, cls = "ico") {
  return `<svg class="${cls}" viewBox="0 0 24 24" aria-hidden="true"><path d="${ICONES[nom]}"/></svg>`;
}

// ---------- État ----------

const STORE_KEY = "revizo:v2";

function today() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}
function daysBetween(a, b) {
  return Math.round((new Date(b) - new Date(a)) / 86400000);
}
function addDays(day, n) {
  const d = new Date(day);
  d.setUTCDate(d.getUTCDate() + n);
  return d.toISOString().slice(0, 10);
}
function dateCourte(day) {
  return new Date(day).toLocaleDateString("fr-FR", { weekday: "long", day: "numeric", month: "long", timeZone: "UTC" });
}

function paysParDefaut() {
  const region = (navigator.language || "").split("-")[1];
  return COUNTRIES[region] ? region : null;
}

function loadState() {
  const vide = {
    country: paysParDefaut(), classe: "", matiere: "", pseudo: "", theme: "auto",
    credits: CREDIT_OFFERT_PAR_JOUR, lastRefill: today(), exosFaits: 0,
    streak: 0, lastActive: null, gels: 0, jours: [],
    cards: {}, exos: [], answered: 0, good: 0, studio: "",
  };
  try {
    const s = JSON.parse(localStorage.getItem(STORE_KEY));
    if (s) return Object.assign(vide, s);
    // Reprend la progression des quiz de l'ancienne version.
    const v1 = JSON.parse(localStorage.getItem("revizo:v1"));
    if (v1) Object.assign(vide, { cards: v1.cards || {}, answered: v1.answered || 0, good: v1.good || 0, pseudo: v1.pseudo || "", country: v1.country || vide.country });
  } catch (e) { /* stockage indisponible : on repart de zéro */ }
  return vide;
}
function save() {
  try { localStorage.setItem(STORE_KEY, JSON.stringify(state)); } catch (e) { /* ignoré */ }
}

let state = loadState();
let session = null; // quiz en cours
let exo = null; // exercice en cours : { photo, texte, lecture, correction, ... }

function refillDaily() {
  if (state.lastRefill !== today()) {
    state.credits = Math.max(state.credits, CREDIT_OFFERT_PAR_JOUR);
    state.lastRefill = today();
    save();
  }
}

// La série compte toute activité utile. Un jour manqué consomme un gel s'il en reste.
function marquerActif() {
  const t = today();
  if (state.lastActive === t) return false;
  const ecart = state.lastActive ? daysBetween(state.lastActive, t) : null;
  if (ecart === 1) state.streak += 1;
  else if (ecart === 2 && state.gels > 0) { state.gels -= 1; state.streak += 1; }
  else state.streak = 1;
  state.lastActive = t;
  state.jours = [...(state.jours || []).filter((j) => daysBetween(j, t) < 7), t];
  save();
  return true;
}

// ---------- Utilitaires ----------

const $ = (sel) => document.querySelector(sel);
const view = $("#view");

function esc(s) {
  return String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
}
const multiligne = (t) => esc(t).replace(/\n/g, "<br>");
function toast(msg) {
  document.querySelector(".toast")?.remove();
  const t = document.createElement("div");
  t.className = "toast";
  t.setAttribute("role", "status");
  t.textContent = msg;
  document.body.appendChild(t);
  setTimeout(() => t.remove(), 2600);
}
function pays() { return COUNTRIES[state.country] || null; }
function brevet() { return pays()?.brevet || "brevet"; }
function prix(fcfa) {
  const c = pays() || COUNTRIES.SN;
  return `${(fcfa * c.taux).toLocaleString("fr-FR")} ${c.devise}`;
}
function pluriel(n, mot) { return `${n} ${mot}${n > 1 ? "s" : ""}`; }
function shuffle(arr) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
function matiereLabel(m) { return m === "PC" ? "Physique-Chimie" : m; }
function puces(liste, actif, attr) {
  return `<div class="puces">${liste.map(([k, nom]) => `<button class="puce" data-${attr}="${esc(k)}" aria-pressed="${actif === k}">${esc(nom)}</button>`).join("")}</div>`;
}
function lierPuces(attr, onChoix) {
  view.querySelectorAll(`[data-${attr}]`).forEach((b) => b.addEventListener("click", () => {
    view.querySelectorAll(`[data-${attr}]`).forEach((x) => x.setAttribute("aria-pressed", String(x === b)));
    onChoix(b.dataset[attr]);
  }));
}

function appliquerTheme() {
  if (state.theme === "auto") document.documentElement.removeAttribute("data-theme");
  else document.documentElement.setAttribute("data-theme", state.theme);
}

function majBarre() {
  $("#serie").innerHTML = `${icone("serie")}${state.streak}`;
  $("#serie").setAttribute("aria-label", `Série : ${pluriel(state.streak, "jour")}`);
  $("#credits").innerHTML = `${icone("piece")}${pluriel(state.credits, "crédit")}`;
  $("#horsLigne").hidden = navigator.onLine;
}

function setOnglet(name) {
  document.querySelectorAll(".onglet").forEach((t) => {
    if (t.dataset.go === name) t.setAttribute("aria-current", "page");
    else t.removeAttribute("aria-current");
  });
}

function afficher(html, onglet = "") {
  view.innerHTML = html;
  setOnglet(onglet);
  window.scrollTo(0, 0);
  view.focus({ preventScroll: true });
}

// ---------- Accueil ----------

function cartesDues() {
  const t = today();
  return Object.entries(state.cards).filter(([, c]) => c.due <= t).map(([id]) => id);
}
function exosDus() {
  const t = today();
  return state.exos.filter((e) => e.due && e.due <= t);
}

function renderHome() {
  const dues = cartesDues().length + exosDus().length;
  const premier = state.exosFaits === 0;
  afficher(`
    <section class="cahier bloc-exo" aria-labelledby="titreExo">
      <span class="etiquette">${premier ? "Ton 1er exercice est offert" : "Toutes les matières"}</span>
      <h1 class="display-xl" id="titreExo">Mon exercice</h1>
      <p>Prends ton exercice en photo. On t'explique la méthode, étape par étape.</p>
      <button class="btn btn-principal" id="prendrePhoto">${icone("photo")}Prendre la photo</button>
      <div class="bloc-exo-pied">
        <button class="btn btn-discret" id="ecrire">ou écris-le</button>
        <span class="petit">1 crédit par exercice · il t'en reste ${state.credits}</span>
      </div>
    </section>

    <button class="carte carte-action" id="carteRevoir">
      ${icone("reviser")}
      <span class="grow">
        <span class="titre">${dues ? `${pluriel(dues, "erreur")} à revoir` : "Rien à revoir aujourd'hui"}</span>
        <span class="petit">${dues ? `Environ ${Math.max(2, dues)} min · ` : "Tes erreurs reviennent ici au bon moment · "}<span class="gratuit">gratuit</span></span>
      </span>
      ${icone("chevron", "ico chevron")}
    </button>

    <button class="carte carte-action" id="carteQuiz">
      ${icone("quiz")}
      <span class="grow">
        <span class="titre">Quiz du jour</span>
        <span class="petit">5 questions · environ 2 min · <span class="gratuit">gratuit</span></span>
      </span>
      ${icone("chevron", "ico chevron")}
    </button>

    <button class="carte carte-action" id="carteDuel">
      ${icone("duel")}
      <span class="grow">
        <span class="titre">Défier un ami</span>
        <span class="petit">Les mêmes 5 questions. Le meilleur score gagne.</span>
      </span>
      ${icone("chevron", "ico chevron")}
    </button>`, "home");

  $("#prendrePhoto").addEventListener("click", () => $("#photoInput").click());
  $("#ecrire").addEventListener("click", () => { exo = { photo: null, texte: "" }; renderSaisie(); });
  $("#carteRevoir").addEventListener("click", () => render("reviser"));
  $("#carteQuiz").addEventListener("click", () => demarrerQuiz("quiz"));
  $("#carteDuel").addEventListener("click", () => demarrerQuiz("duel"));
}

// ---------- Mon exercice : photo, énoncé lu, correction ----------

// Réduit la photo avant l'envoi : moins de données mobiles, envoi plus rapide.
function compressImage(file) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      const max = 1280;
      const scale = Math.min(1, max / Math.max(img.width, img.height));
      const cv = document.createElement("canvas");
      cv.width = Math.round(img.width * scale);
      cv.height = Math.round(img.height * scale);
      cv.getContext("2d").drawImage(img, 0, 0, cv.width, cv.height);
      URL.revokeObjectURL(img.src);
      resolve(cv.toDataURL("image/jpeg", 0.72));
    };
    img.onerror = reject;
    img.src = URL.createObjectURL(file);
  });
}
function poidsPhoto(dataUrl) {
  const ko = Math.round((dataUrl.length * 3) / 4 / 1024);
  return ko >= 1024 ? `${(ko / 1024).toFixed(1)} Mo` : `${ko} Ko`;
}

$("#photoInput").addEventListener("change", async (e) => {
  const file = e.target.files[0];
  e.target.value = "";
  if (!file) return;
  try {
    exo = { photo: await compressImage(file), texte: "" };
    renderSaisie();
  } catch {
    toast("Impossible de lire cette photo. Réessaie.");
  }
});

function blocContexte() {
  return `
    <span class="champ-label">Ta classe</span>
    ${puces(CLASSES.map((c) => [c, c]), state.classe, "classe")}
    <span class="champ-label">La matière</span>
    ${puces(MATIERES, state.matiere || "", "matiere")}`;
}
function lierContexte() {
  lierPuces("classe", (v) => { state.classe = v; save(); });
  lierPuces("matiere", (v) => { state.matiere = v; save(); });
}

async function appelApi(route, body) {
  try {
    const res = await fetch(route, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
    return await res.json();
  } catch {
    return { erreur: navigator.onLine ? "Le service ne répond pas. Réessaie dans un instant." : "Pas de connexion internet. Réessaie quand le réseau revient." };
  }
}

function renderSaisie() {
  const avecPhoto = Boolean(exo.photo);
  afficher(`
    <button class="btn btn-discret" id="retour" style="align-self:flex-start">${icone("retour")}Accueil</button>
    <h1 class="display-l">Mon exercice</h1>
    ${avecPhoto ? `
      <img class="apercu-photo" src="${exo.photo}" alt="Ta photo d'exercice">
      <p class="petit">Photo prête · ${poidsPhoto(exo.photo)}. On l'utilise seulement pour lire ton exercice.</p>
      <div class="actions-ligne"><button class="btn" id="reprendre">${icone("photo")}Reprendre la photo</button></div>
    ` : `
      <label class="champ-label" for="texteExo">Ton exercice</label>
      <textarea id="texteExo" rows="6" maxlength="8000" placeholder="Ex. Résoudre 2x² − 3x − 2 = 0">${esc(exo.texte)}</textarea>
    `}
    ${blocContexte()}
    <button class="btn btn-principal btn-large" id="suite">${avecPhoto ? "Lire mon exercice" : `Explique-moi · 1 crédit`}</button>
    ${avecPhoto ? `<p class="petit">La lecture est gratuite. Le crédit n'est utilisé que quand tu confirmes l'énoncé.</p>` : ""}`);

  $("#retour").addEventListener("click", () => render("home"));
  lierContexte();
  if (avecPhoto) {
    $("#reprendre").addEventListener("click", () => $("#photoInput").click());
    $("#suite").addEventListener("click", lireEnonce);
  } else {
    $("#suite").addEventListener("click", () => {
      exo.texte = $("#texteExo").value.trim();
      if (!exo.texte) { toast("Écris ton exercice d'abord."); return; }
      expliquer();
    });
  }
}

function renderAttente(etapes, courante) {
  afficher(`
    <div class="attente" role="status" aria-live="polite">
      <h1 class="display-l">Un instant…</h1>
      <ul class="attente-etapes">
        ${etapes.map((t, i) => `<li class="${i < courante ? "fait" : i === courante ? "encours" : ""}">${i < courante ? icone("juste") : icone("crayon")}${esc(t)}</li>`).join("")}
      </ul>
    </div>`);
}

async function lireEnonce() {
  renderAttente(["Je lis ta photo", "Je recopie l'énoncé"], 0);
  const timer = setTimeout(() => renderAttente(["Je lis ta photo", "Je recopie l'énoncé"], 1), 2500);
  const data = await appelApi("api/lire", { image: exo.photo.split(",")[1], mediaType: "image/jpeg" });
  clearTimeout(timer);
  if (data.erreur || data.lisible === false) {
    renderErreur(data.erreur || data.probleme || "La photo n'est pas lisible.", true);
    return;
  }
  exo.lecture = data;
  if (!state.matiere && data.matiere && data.matiere !== "autre") exo.matiereDetectee = data.matiere;
  renderEnonceLu();
}

function surlignerDoutes(texte, doutes) {
  let html = esc(texte);
  for (const d of doutes || []) {
    const extrait = esc(d.extrait);
    if (extrait && html.includes(extrait)) html = html.replace(extrait, `<mark class="doute">${extrait}</mark>`);
  }
  return html.replace(/\n/g, "<br>");
}

function renderEnonceLu() {
  const l = exo.lecture;
  afficher(`
    <button class="btn btn-discret" id="retour" style="align-self:flex-start">${icone("retour")}Retour</button>
    <h1 class="display-l">Voici ce que j'ai lu</h1>
    <section class="cahier carte">
      <p>${surlignerDoutes(l.enonce, l.doutes)}</p>
      ${l.a_interpreter ? `<span class="annotation annotation-attention">Énoncé à interpréter, vérifie bien.</span>` : ""}
    </section>
    ${l.doutes?.length ? `
      <section class="carte" aria-label="Passages à vérifier">
        <span class="etiquette">À vérifier</span>
        <ul class="liste-doutes">${l.doutes.map((d) => `<li><mark class="doute">${esc(d.extrait)}</mark><span>${esc(d.question)}</span></li>`).join("")}</ul>
      </section>` : ""}
    <label class="champ-label" for="enonceCorrige">Corrige si besoin</label>
    <textarea id="enonceCorrige" rows="6" maxlength="8000">${esc(l.enonce)}</textarea>
    <button class="btn btn-principal btn-large" id="confirmer">C'est bien ça, explique-moi · 1 crédit</button>
    <button class="btn btn-large" id="reprendre">${icone("photo")}Reprendre la photo</button>`);
  $("#retour").addEventListener("click", renderSaisie);
  $("#reprendre").addEventListener("click", () => $("#photoInput").click());
  $("#confirmer").addEventListener("click", () => {
    exo.texte = $("#enonceCorrige").value.trim();
    if (!exo.texte) { toast("L'énoncé est vide."); return; }
    expliquer();
  });
}

async function expliquer() {
  if (state.credits < 1) { renderRecharge("epuise"); return; }
  state.credits -= 1;
  save();
  majBarre();
  const etapes = ["Je relis l'énoncé", "Je cherche la méthode", "J'écris les étapes"];
  let i = 0;
  renderAttente(etapes, 0);
  const timer = setInterval(() => { i = Math.min(i + 1, etapes.length - 1); renderAttente(etapes, i); }, 4000);

  const body = { texte: exo.texte, pays: pays()?.nom || "", classe: state.classe || "", matiere: state.matiere || exo.matiereDetectee || "" };
  if (exo.photo) { body.image = exo.photo.split(",")[1]; body.mediaType = "image/jpeg"; }
  const data = await appelApi("api/resoudre", body);
  clearInterval(timer);

  if (data.erreur || data.lisible === false) {
    state.credits += 1; // pas de correction utilisable : le crédit est rendu
    save();
    majBarre();
    renderErreur(data.erreur || data.probleme || "Je n'ai pas pu traiter cet exercice.", Boolean(exo.photo), true);
    return;
  }
  state.exosFaits += 1;
  marquerActif();
  save();
  majBarre();
  ouvrirCorrection(data);
}

function renderErreur(message, proposerPhoto, creditRendu) {
  afficher(`
    <h1 class="display-l">Petit souci</h1>
    <section class="carte carte-piege">
      <p>${esc(message)}</p>
      ${creditRendu ? `<p class="petit">Ton crédit a été rendu.</p>` : ""}
    </section>
    ${proposerPhoto ? `<button class="btn btn-principal btn-large" id="reprendre">${icone("photo")}Reprendre la photo</button>` : ""}
    <button class="btn btn-large" id="accueil">Retour à l'accueil</button>`);
  $("#reprendre")?.addEventListener("click", () => $("#photoInput").click());
  $("#accueil").addEventListener("click", () => render("home"));
}

// La correction se dévoile progressivement : l'élève essaie d'abord, demande un indice s'il bloque.
function ouvrirCorrection(data, depuisRevision) {
  exo = Object.assign(exo || {}, {
    correction: data,
    palier: 0, // 0 aucun, 1 coup de pouce, 2 méthode, 3+ étapes
    demarrageRepondu: !data.demarrage?.choix?.length,
    etapesVisibles: 1,
    toutVoir: false,
    signale: false,
    depuisRevision: Boolean(depuisRevision),
  });
  renderCorrection();
}

function renderCorrection() {
  const d = exo.correction;
  const n = d.etapes.length;
  const methodeVisible = exo.toutVoir || exo.demarrageRepondu || exo.palier >= 2;
  const visibles = exo.toutVoir ? n : Math.min(exo.etapesVisibles, n);
  const fini = visibles >= n;
  const demarrage = d.demarrage;

  afficher(`
    <button class="btn btn-discret" id="retour" style="align-self:flex-start">${icone("retour")}${exo.depuisRevision ? "Réviser" : "Accueil"}</button>
    <span class="etiquette">${esc(d.matiere)} · ${esc(d.niveau)}</span>
    <div class="correction">
      <section class="carte">
        <h2 class="carte-titre">${icone("cible")}Ce qu'on cherche</h2>
        <p>${multiligne(d.enonce)}</p>
      </section>

      ${exo.palier >= 1 && !methodeVisible ? `
      <section class="carte apparait">
        <h2 class="carte-titre">${icone("crayon")}Coup de pouce</h2>
        <p>${multiligne(d.indice)}</p>
      </section>` : ""}

      ${demarrage?.choix?.length && !exo.toutVoir ? `
      <section class="carte">
        <h2 class="carte-titre">${esc(demarrage.question)}</h2>
        <div class="choix-demarrage">
          ${demarrage.choix.map((c, i) => {
            const etat = exo.choixDemarrage === i ? (c.juste ? "juste" : "erreur") : exo.demarrageRepondu && c.juste ? "juste" : "";
            return `<button class="choix ${etat}" data-demarrage="${i}" ${exo.demarrageRepondu ? "disabled" : ""}>
              <span class="choix-lettre">${"ABC"[i]}</span><span class="choix-texte">${esc(c.texte)}</span>
              ${etat ? `<span class="choix-etat">${icone(etat)}${etat === "juste" ? "Juste" : "À revoir"}</span>` : ""}
            </button>`;
          }).join("")}
        </div>
        ${exo.choixDemarrage !== undefined ? `
        <div class="retour apparait">
          <span class="annotation ${demarrage.choix[exo.choixDemarrage].juste ? "annotation-bravo" : "annotation-attention"}">${demarrage.choix[exo.choixDemarrage].juste ? "Bien vu !" : "Pas tout à fait."}</span>
          <p>${esc(demarrage.choix[exo.choixDemarrage].retour)}</p>
        </div>` : ""}
      </section>` : ""}

      ${methodeVisible ? `
      <section class="carte carte-methode apparait">
        <h2 class="carte-titre">${icone("methode")}La méthode à retenir</h2>
        <ol>${d.methode.map((m) => `<li>${multiligne(m)}</li>`).join("")}</ol>
      </section>

      <section class="carte">
        <h2 class="carte-titre">${icone("crayon")}On le fait ensemble</h2>
        <div class="etapes">
          ${d.etapes.slice(0, visibles).map((e, i) => `
            <div class="etape ${i === visibles - 1 && !exo.toutVoir ? "apparait" : ""}">
              <span class="etape-num" aria-hidden="true">${i + 1}</span>
              <span class="etape-titre">${esc(e.titre)}</span>
              <p>${multiligne(e.explication)}</p>
              ${e.calcul ? `<pre class="calcul">${esc(e.calcul)}</pre>` : ""}
              ${e.marge ? `<span class="annotation">${esc(e.marge)}</span>` : ""}
            </div>`).join("")}
          ${d.etapes.slice(visibles).map(() => `<div class="etape-cachee" aria-hidden="true"><span></span><span></span></div>`).join("")}
        </div>
        ${!fini ? `<p class="petit">Essaie l'étape suivante sur ton cahier avant de la dévoiler.</p>` : ""}
      </section>` : ""}

      ${fini ? `
      <section class="carte carte-reponse apparait">
        <h2 class="carte-titre">${icone("juste")}Réponse</h2>
        <p class="reponse-finale">${multiligne(d.reponse)}</p>
      </section>
      ${d.pieges.length ? `
      <section class="carte carte-piege">
        <h2 class="carte-titre">${icone("erreur")}Pièges à éviter</h2>
        <ul>${d.pieges.map((p) => `<li>${multiligne(p)}</li>`).join("")}</ul>
      </section>` : ""}
      <section class="carte">
        <h2 class="carte-titre">${icone("quiz")}À toi de jouer</h2>
        <p>${multiligne(d.entrainement.enonce)}</p>
        <details><summary class="btn btn-discret">Voir la solution</summary><p>${multiligne(d.entrainement.solution)}</p></details>
        <span class="petit">Tu l'as fait ?</span>
        <div class="actions-ligne">
          <button class="btn" data-bilan="reussi">${icone("juste")}Je l'ai réussi</button>
          <button class="btn" data-bilan="trompe">${icone("erreur")}Je me suis trompé</button>
        </div>
      </section>
      <div class="actions">
        <button class="btn" id="partager">${icone("whatsapp")}Partager la méthode sur WhatsApp</button>
        <button class="btn btn-principal" id="nouvel">${icone("photo")}Nouvel exercice</button>
        <button class="btn btn-discret" id="signaler" ${exo.signale ? "disabled" : ""}>${icone("signaler")}${exo.signale ? "Merci, c'est signalé" : "Une erreur dans la correction ? Signaler"}</button>
      </div>
      <p class="petit">Révizo peut se tromper. En cas de doute, vérifie avec ton professeur.</p>` : ""}
    </div>

    ${!fini ? `
    <div class="barre-aide" role="group" aria-label="Aide">
      <div class="paliers">
        <span class="palier ${exo.palier >= 1 ? "atteint" : ""}">Coup de pouce</span>
        <span class="palier ${methodeVisible ? "atteint" : ""}">Méthode</span>
        <span class="palier ${methodeVisible && visibles > 1 ? "atteint" : ""}">Étapes ${methodeVisible ? `${visibles}/${n}` : ""}</span>
      </div>
      <div class="actions-ligne">
        <button class="btn" id="bloque">Je bloque</button>
        ${methodeVisible ? `<button class="btn btn-principal" id="suivante">Étape suivante</button>` : ""}
      </div>
      <button class="btn btn-discret" id="toutVoir">Tout afficher d'un coup</button>
    </div>` : ""}`);

  $("#retour").addEventListener("click", () => render(exo.depuisRevision ? "reviser" : "home"));
  view.querySelectorAll("[data-demarrage]").forEach((b) => b.addEventListener("click", () => {
    exo.choixDemarrage = Number(b.dataset.demarrage);
    exo.demarrageRepondu = true;
    renderCorrection();
  }));
  $("#bloque")?.addEventListener("click", () => {
    if (!methodeVisible) { exo.palier = exo.palier >= 1 ? 2 : 1; exo.demarrageRepondu = exo.palier >= 2 || exo.demarrageRepondu; }
    else exo.etapesVisibles += 1;
    renderCorrection();
  });
  $("#suivante")?.addEventListener("click", () => { exo.etapesVisibles += 1; renderCorrection(); });
  $("#toutVoir")?.addEventListener("click", () => { exo.toutVoir = true; exo.demarrageRepondu = true; renderCorrection(); });
  view.querySelectorAll("[data-bilan]").forEach((b) => b.addEventListener("click", () => bilanEntrainement(b.dataset.bilan)));
  $("#partager")?.addEventListener("click", partagerMethode);
  $("#nouvel")?.addEventListener("click", () => $("#photoInput").click());
  $("#signaler")?.addEventListener("click", signalerErreur);
}

// Un exercice raté revient en révision ; réussi, il revient plus tard.
function bilanEntrainement(bilan) {
  const d = exo.correction;
  let fiche = state.exos.find((e) => e.id === exo.id);
  if (!fiche) {
    fiche = { id: `exo-${Date.now()}`, date: today(), titre: d.enonce.slice(0, 90), matiere: d.matiere, box: 0, correction: d };
    exo.id = fiche.id;
    state.exos.unshift(fiche);
    state.exos = state.exos.slice(0, 50);
  }
  fiche.box = bilan === "reussi" ? Math.min((fiche.box || 0) + 1, BOX_DAYS.length - 1) : 0;
  fiche.due = addDays(today(), bilan === "reussi" ? BOX_DAYS[fiche.box] || 1 : 1);
  save();
  toast(bilan === "reussi" ? `Bien joué. On te le reproposera le ${dateCourte(fiche.due)}.` : "Ajouté à tes révisions. Il revient demain.");
}

function partagerMethode() {
  const d = exo.correction;
  const texte = `J'ai compris cet exercice avec Révizo :\n${d.enonce}\n\nLa méthode :\n${d.methode.map((m, i) => `${i + 1}. ${m}`).join("\n")}\n\n${location.origin}${location.pathname}`;
  window.open(`https://wa.me/?text=${encodeURIComponent(texte)}`, "_blank", "noopener");
}

function signalerErreur() {
  if (exo.signale) return;
  exo.signale = true;
  state.credits += 1;
  save();
  majBarre();
  renderCorrection();
  toast("Merci. Ton crédit a été rendu pour réessayer.");
}

// ---------- Quiz ----------

function pickQuestions(mode, matiere) {
  const pool = QUESTIONS.filter((q) => !matiere || q.matiere === matiere);
  const due = new Set(cartesDues());
  if (mode === "revoir") return shuffle(pool.filter((q) => due.has(q.id))).slice(0, QUIZ_LEN);
  const dueQs = shuffle(pool.filter((q) => due.has(q.id)));
  const fresh = shuffle(pool.filter((q) => !state.cards[q.id]));
  const rest = shuffle(pool.filter((q) => state.cards[q.id] && !due.has(q.id)));
  return [...dueQs, ...fresh, ...rest].slice(0, QUIZ_LEN);
}

function demarrerQuiz(mode, duel, matiere = state.studio) {
  const qs = duel ? duel.ids.map((id) => QUESTIONS.find((q) => q.id === id)).filter(Boolean) : pickQuestions(mode, matiere);
  if (!qs.length) { toast(mode === "revoir" ? "Rien à revoir aujourd'hui." : "Pas de question pour cette matière."); return; }
  session = { mode, qs, i: 0, score: 0, resultats: [], duel: duel || null };
  renderQuestion();
}

function renderQuestion() {
  const { qs, i, resultats } = session;
  const q = qs[i];
  session.ordre = shuffle(q.choix.map((_, k) => k));
  afficher(`
    <div class="quiz-entete">
      <span class="etiquette">${esc(matiereLabel(q.matiere))} · ${q.niveau === "bac" ? "BAC" : esc(brevet())}${session.mode === "revoir" ? " · Révision" : ""}</span>
      <button class="btn btn-discret" id="quitter" aria-label="Quitter le quiz">${icone("fermer")}</button>
    </div>
    <div class="progression" aria-label="Question ${i + 1} sur ${qs.length}">
      ${qs.map((_, k) => `<span class="${k < resultats.length ? (resultats[k] ? "juste" : "erreur") : k === i ? "courant" : ""}"></span>`).join("")}
    </div>
    <p class="question">${esc(q.q)}</p>
    <div class="actions" id="choix">
      ${session.ordre.map((k, n) => `<button class="choix" data-k="${k}"><span class="choix-lettre">${"ABCD"[n]}</span><span class="choix-texte">${esc(q.choix[k])}</span></button>`).join("")}
    </div>
    <div id="apres"></div>`, session.mode === "revoir" ? "reviser" : "");
  $("#quitter").addEventListener("click", () => { session = null; render("home"); });
  view.querySelectorAll("[data-k]").forEach((b) => b.addEventListener("click", () => repondre(Number(b.dataset.k))));
}

function repondre(k) {
  const q = session.qs[session.i];
  const ok = k === q.bonne;
  view.querySelectorAll("[data-k]").forEach((b) => {
    const bk = Number(b.dataset.k);
    b.disabled = true;
    const etat = bk === q.bonne ? "juste" : bk === k ? "erreur" : "";
    if (etat) {
      b.classList.add(etat);
      b.insertAdjacentHTML("beforeend", `<span class="choix-etat">${icone(etat)}${etat === "juste" ? "Juste" : "À revoir"}</span>`);
    }
  });

  // Répétition espacée : bonne réponse = boîte suivante, erreur = retour à zéro.
  const card = state.cards[q.id] || { box: 0 };
  card.box = ok ? Math.min(card.box + 1, BOX_DAYS.length - 1) : 0;
  card.due = addDays(today(), ok ? BOX_DAYS[card.box] : 1);
  state.cards[q.id] = card;
  state.answered += 1;
  if (ok) { state.good += 1; session.score += 1; }
  session.resultats.push(ok);
  save();

  const dernier = session.i === session.qs.length - 1;
  $("#apres").innerHTML = `
    <div class="retour apparait">
      <span class="annotation ${ok ? "annotation-bravo" : "annotation-attention"}">${ok ? "Juste !" : "Pas tout à fait."}</span>
      <p>${esc(q.explication)}</p>
      ${ok ? "" : `<p class="petit">Cette question reviendra demain.</p>`}
    </div>
    <button class="btn btn-principal btn-large" id="suivante" style="margin-top:12px">${dernier ? "Voir mon bilan" : "Question suivante"}</button>`;
  $("#suivante").addEventListener("click", () => {
    if (dernier) finSeance();
    else { session.i += 1; renderQuestion(); }
  });
}

function finSeance() {
  const { score, qs, duel, mode, resultats } = session;
  const nouveauJour = marquerActif();
  let gelGagne = false;
  if (mode === "revoir" && state.gels < 2) { state.gels += 1; gelGagne = true; save(); }
  majBarre();
  const ratees = qs.filter((_, k) => !resultats[k]);
  const pct = Math.round((score / qs.length) * 100);
  const semaine = Array.from({ length: 7 }, (_, k) => addDays(today(), k - 6));

  let duelLigne = "";
  if (duel) {
    duelLigne = score > duel.score ? `Tu bats ${esc(duel.nom)} (${duel.score}/${qs.length}).`
      : score === duel.score ? `Égalité avec ${esc(duel.nom)}.`
      : `${esc(duel.nom)} gagne avec ${duel.score}/${qs.length}. Revanche ?`;
  }

  afficher(`
    <h1 class="display-l">Séance terminée</h1>
    <section class="carte">
      <span class="etiquette">Ce que tu as retenu</span>
      <p>${ratees.length ? esc(ratees[0].explication) : "Tout est juste. Continue comme ça."}</p>
    </section>
    <section class="carte">
      <span class="score">${score}/${qs.length}</span>
      <span class="petit">${pct} % de bonnes réponses</span>
      ${duelLigne ? `<p><b>${duelLigne}</b></p>` : ""}
    </section>
    ${ratees.length ? `
    <section class="carte">
      <span class="etiquette">Envoyé en révision</span>
      <ul class="liste-simple">${ratees.map((q) => `<li><span>${esc(q.q)}</span><span class="petit">demain</span></li>`).join("")}</ul>
    </section>` : ""}
    <section class="carte">
      <span class="etiquette">Ta série</span>
      <div class="calendrier" aria-label="Série : ${pluriel(state.streak, "jour")}">
        ${semaine.map((j) => {
          const fait = (state.jours || []).includes(j);
          return `<span class="${fait ? "fait" : ""} ${fait && j === today() && nouveauJour ? "aujourdhui" : ""}">${fait ? icone("juste") : new Date(j).toLocaleDateString("fr-FR", { weekday: "narrow", timeZone: "UTC" })}</span>`;
        }).join("")}
      </div>
      <p><b>${pluriel(state.streak, "jour")}</b> d'affilée${state.gels ? ` · ${pluriel(state.gels, "jour")} de repos en réserve` : ""}</p>
      ${gelGagne ? `<span class="annotation annotation-bravo">Tu as gagné 1 jour de repos !</span>` : ""}
    </section>
    <div class="actions">
      <button class="btn btn-principal" id="encore">${cartesDues().length ? "Revoir mes erreurs" : "Encore un quiz"}</button>
      <button class="btn" id="defier">${icone("duel")}Défier un ami sur ces questions</button>
      <button class="btn btn-discret" id="accueil">Retour à l'accueil</button>
    </div>`);
  $("#encore").addEventListener("click", () => demarrerQuiz(cartesDues().length ? "revoir" : "quiz"));
  $("#defier").addEventListener("click", () => partagerDuel(qs, score));
  $("#accueil").addEventListener("click", () => render("home"));
  session = null;
}

// ---------- Duel (boucle virale) ----------

function partagerDuel(qs, score) {
  const nom = state.pseudo || "Un ami";
  const url = `${location.origin}${location.pathname}#duel=${qs.map((q) => q.id).join(",")}&s=${score}&n=${encodeURIComponent(nom)}`;
  const text = `J'ai eu ${score}/${qs.length} sur Révizo. À toi de jouer :`;
  if (navigator.share) {
    navigator.share({ title: "Duel Révizo", text, url }).catch(() => {});
  } else {
    window.open(`https://wa.me/?text=${encodeURIComponent(`${text} ${url}`)}`, "_blank", "noopener");
  }
}

function lireDuel() {
  const m = location.hash.match(/^#duel=([^&]+)&s=(\d+)&n=(.*)$/);
  if (!m) return null;
  history.replaceState(null, "", location.pathname);
  return { ids: m[1].split(","), score: Number(m[2]), nom: decodeURIComponent(m[3]) };
}

// ---------- Réviser ----------

function renderReviser() {
  const dues = cartesDues().length;
  const exos = state.exos;
  afficher(`
    <h1 class="display-l">Réviser</h1>
    <button class="carte carte-action" id="revoirQuiz" ${dues ? "" : "disabled"}>
      ${icone("reviser")}
      <span class="grow">
        <span class="titre">${dues ? `${pluriel(dues, "question")} à revoir` : "Aucune question à revoir"}</span>
        <span class="petit">${dues ? "Tes erreurs de quiz, au bon moment · " : "Quand tu te trompes, la question revient ici · "}<span class="gratuit">gratuit</span></span>
      </span>
      ${dues ? icone("chevron", "ico chevron") : ""}
    </button>

    <h2 class="titre section-titre">Mes exercices</h2>
    ${exos.length ? exos.map((e) => `
      <button class="carte carte-action" data-exo="${esc(e.id)}">
        ${icone("crayon")}
        <span class="grow">
          <span class="etiquette">${esc(e.matiere)}${e.due && e.due <= today() ? " · à refaire aujourd'hui" : ""}</span>
          <span>${esc(e.titre)}</span>
        </span>
        ${icone("chevron", "ico chevron")}
      </button>`).join("") : `
      <section class="carte"><p class="petit">Après une correction, dis si tu as réussi l'exercice « À toi de jouer ». Il sera rangé ici pour le refaire au bon moment.</p></section>`}

    <h2 class="titre section-titre">Quiz par matière</h2>
    ${puces(MATIERES_QUIZ, state.studio || "", "studio")}
    <button class="btn btn-principal btn-large" id="lancerQuiz">Lancer 5 questions · gratuit</button>`, "reviser");

  $("#revoirQuiz").addEventListener("click", () => demarrerQuiz("revoir"));
  view.querySelectorAll("[data-exo]").forEach((b) => b.addEventListener("click", () => {
    const fiche = state.exos.find((e) => e.id === b.dataset.exo);
    if (!fiche) return;
    exo = { id: fiche.id, photo: null, texte: fiche.correction.enonce };
    ouvrirCorrection(fiche.correction, true);
  }));
  lierPuces("studio", (v) => { state.studio = v; save(); });
  $("#lancerQuiz").addEventListener("click", () => demarrerQuiz("quiz", null, state.studio));
}

// ---------- Recharge (paiement simulé) ----------

function renderRecharge(contexte) {
  const c = pays();
  let choisie = "moyen";
  let operateur = c?.paiement[0] || "";
  const titre = contexte === "epuise" ? "Tu n'as plus de crédit" : "Recharge tes crédits";
  const sousTitre = contexte === "epuise"
    ? `Demain, ${pluriel(CREDIT_OFFERT_PAR_JOUR, "crédit")} t'est offert. Tu peux aussi recharger maintenant.`
    : `Il te reste ${pluriel(state.credits, "crédit")}. 1 crédit = 1 exercice expliqué.`;

  const dessiner = () => {
    const o = OFFRES.find((x) => x.id === choisie);
    afficher(`
      <button class="btn btn-discret" id="retour" style="align-self:flex-start">${icone("retour")}Retour</button>
      <h1 class="display-l">${titre}</h1>
      <p class="petit">${sousTitre}</p>

      <div class="offres" role="radiogroup" aria-label="Offres">
        ${OFFRES.map((x) => `
          <button class="offre" role="radio" data-offre="${x.id}" aria-pressed="${x.id === choisie}" aria-checked="${x.id === choisie}">
            ${x.badge ? `<span class="offre-badge">${x.badge}</span>` : ""}
            <span class="offre-credits">${x.credits}</span>
            <span>crédits</span>
            <span class="mono">${prix(x.prix)}</span>
            <span class="petit">soit ${prix(Math.round(x.prix / x.credits))} l'exercice</span>
          </button>`).join("")}
      </div>

      <section class="carte">
        <p class="frise">Tu paies <b class="mono">${prix(o.prix)}</b> ${icone("chevron")} tu reçois <b>${o.credits} crédits</b> ${icone("chevron")} valables toute l'année scolaire.</p>
        <p><b>Aucun prélèvement automatique.</b></p>
      </section>

      <table class="tableau">
        <thead><tr><th>Ce que tu fais</th><th>Prix</th></tr></thead>
        <tbody>
          <tr><td>Quiz et quiz du jour</td><td><span class="gratuit">${icone("juste")} Gratuit</span></td></tr>
          <tr><td>Revoir mes erreurs</td><td><span class="gratuit">${icone("juste")} Gratuit</span></td></tr>
          <tr><td>Duels et série</td><td><span class="gratuit">${icone("juste")} Gratuit</span></td></tr>
          <tr><td>1 exercice expliqué par jour</td><td><span class="gratuit">${icone("juste")} Gratuit</span></td></tr>
          <tr><td>Exercices en plus</td><td class="mono">1 crédit</td></tr>
        </tbody>
      </table>

      ${c ? `
        <span class="champ-label">Payer avec</span>
        <div class="operateurs">
          ${c.paiement.map((m) => `<button class="operateur" data-operateur="${esc(m)}" aria-pressed="${m === operateur}">${esc(m)}</button>`).join("")}
        </div>
        <button class="btn btn-principal btn-large" id="payer">Payer ${prix(o.prix)} avec ${esc(operateur)}</button>
      ` : `
        <span class="champ-label">Ton pays, pour afficher tes moyens de paiement</span>
        ${puces(Object.entries(COUNTRIES).map(([k, v]) => [k, v.nom]), "", "pays")}
      `}
      <button class="btn btn-large" id="parent">${icone("whatsapp")}Demander à un parent de payer</button>
      <p class="demo">Démo : aucun paiement réel. Les crédits sont ajoutés directement.</p>`);

    $("#retour").addEventListener("click", () => render("home"));
    view.querySelectorAll("[data-offre]").forEach((b) => b.addEventListener("click", () => { choisie = b.dataset.offre; dessiner(); }));
    view.querySelectorAll("[data-operateur]").forEach((b) => b.addEventListener("click", () => { operateur = b.dataset.operateur; dessiner(); }));
    lierPuces("pays", (v) => { state.country = v; save(); renderRecharge(contexte); });
    $("#payer")?.addEventListener("click", () => payer(o, operateur));
    $("#parent").addEventListener("click", () => {
      const texte = `Bonjour, peux-tu m'acheter ${o.credits} crédits Révizo (${prix(o.prix)}) pour mes révisions ? ${location.origin}${location.pathname}`;
      window.open(`https://wa.me/?text=${encodeURIComponent(texte)}`, "_blank", "noopener");
    });
  };
  dessiner();
}

function payer(offre, operateur) {
  let reste = 60;
  afficher(`
    <div class="attente" role="status" aria-live="polite">
      <h1 class="display-l">Confirme sur ton téléphone</h1>
      <p>Tu vas recevoir une demande ${esc(operateur)} de <b class="mono">${prix(offre.prix)}</b>. Valide-la avec ton code secret.</p>
      <p class="petit" id="decompte">Temps restant : ${reste} s</p>
    </div>`);
  const tick = setInterval(() => { reste -= 1; const el = $("#decompte"); if (el) el.textContent = `Temps restant : ${reste} s`; }, 1000);
  // Démo : la confirmation de l'opérateur arrive au bout de 3 secondes.
  setTimeout(() => {
    clearInterval(tick);
    state.credits += offre.credits;
    save();
    majBarre();
    const ref = `RZ-${Date.now().toString(36).toUpperCase()}`;
    afficher(`
      <h1 class="display-l">Paiement reçu</h1>
      <section class="carte carte-reponse">
        <h2 class="carte-titre">${icone("juste")}+${offre.credits} crédits</h2>
        <div class="recu">Référence  ${ref}\nMontant    ${prix(offre.prix)}\nOpérateur  ${esc(operateur)}\nSolde      ${pluriel(state.credits, "crédit")}</div>
      </section>
      <button class="btn btn-principal btn-large" id="exercice">${icone("photo")}Prendre un exercice en photo</button>
      <button class="btn btn-large" id="accueil">Retour à l'accueil</button>`);
    $("#exercice").addEventListener("click", () => $("#photoInput").click());
    $("#accueil").addEventListener("click", () => render("home"));
  }, 3000);
}

// ---------- Profil ----------

function renderProfil() {
  const maitrisees = Object.values(state.cards).filter((x) => x.box >= 3).length;
  const taux = state.answered ? Math.round((state.good / state.answered) * 100) : 0;
  afficher(`
    <h1 class="display-l">Mon profil</h1>
    <div class="stats">
      <div class="stat"><b>${state.streak}</b><span class="petit">${state.streak > 1 ? "jours" : "jour"} de série</span></div>
      <div class="stat"><b>${taux} %</b><span class="petit">de réussite</span></div>
      <div class="stat"><b>${maitrisees}</b><span class="petit">notions maîtrisées</span></div>
    </div>
    <label class="champ-label" for="pseudo">Mon prénom (pour les duels)</label>
    <input type="text" id="pseudo" value="${esc(state.pseudo)}" placeholder="Ex. Awa" maxlength="20">
    <span class="champ-label">Mon pays</span>
    ${puces(Object.entries(COUNTRIES).map(([k, v]) => [k, v.nom]), state.country || "", "pays")}
    <span class="champ-label">Ma classe</span>
    ${puces(CLASSES.map((c) => [c, c]), state.classe, "classe")}
    <span class="champ-label">Affichage</span>
    ${puces([["auto", "Comme mon téléphone"], ["cahier", "Cahier (clair)"], ["ardoise", "Ardoise (sombre)"]], state.theme, "theme")}
    <button class="btn btn-principal btn-large" id="recharger">${icone("piece")}Recharger mes crédits</button>`, "profil");
  $("#pseudo").addEventListener("change", (e) => { state.pseudo = e.target.value.trim(); save(); toast("Prénom enregistré"); });
  lierPuces("pays", (v) => { state.country = v; save(); });
  lierPuces("classe", (v) => { state.classe = v; save(); });
  lierPuces("theme", (v) => { state.theme = v; save(); appliquerTheme(); });
  $("#recharger").addEventListener("click", () => renderRecharge());
}

// ---------- Navigation ----------

function render(name) {
  session = null;
  if (name === "reviser") renderReviser();
  else if (name === "profil") renderProfil();
  else renderHome();
}

const ONGLETS = { home: ["accueil", "Accueil"], reviser: ["reviser", "Réviser"], profil: ["profil", "Profil"] };
document.querySelectorAll(".onglet").forEach((b) => {
  const [ic, nom] = ONGLETS[b.dataset.go];
  b.innerHTML = `${icone(ic)}<span>${nom}</span>`;
});
document.querySelectorAll("[data-go]").forEach((b) => b.addEventListener("click", () => render(b.dataset.go)));
$("#credits").addEventListener("click", () => renderRecharge());
window.addEventListener("online", majBarre);
window.addEventListener("offline", majBarre);

appliquerTheme();
refillDaily();
majBarre();
const duelRecu = lireDuel();
if (duelRecu) demarrerQuiz("duel", duelRecu);
else render("home");

if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("sw.js").catch(() => {});
}
