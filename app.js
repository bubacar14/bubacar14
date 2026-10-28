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
  maths: "M7 4v6M4 7h6M14 7h6M14 15l5 5M19 15l-5 5M4 16h6M4 19.5h6",
  pc: "M9 3h6M10 3v6l-5 9a2 2 0 0 0 1.8 3h10.4a2 2 0 0 0 1.8-3l-5-9V3M7.5 14h9",
  svt: "M5 19c0-8 5-14 15-14 0 10-6 15-14 15M5 19l8-8",
  philo: "M9 18h6M10 21h4M12 3a6 6 0 0 0-4 10.5c.7.7 1 1.5 1 2.5h6c0-1 .3-1.8 1-2.5A6 6 0 0 0 12 3z",
  livre: "M4 5c3-1 6-1 8 1 2-2 5-2 8-1v14c-3-1-6-1-8 1-2-2-5-2-8-1zM12 6v14",
  globe: "M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18zM3 12h18M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18",
  etincelle: "M12 3l1.8 4.7 4.7 1.8-4.7 1.8L12 16l-1.8-4.7-4.7-1.8 4.7-1.8zM19 15l.8 2.2 2.2.8-2.2.8L19 21l-.8-2.2-2.2-.8 2.2-.8z",
  cadenas: "M7 11V8a5 5 0 0 1 10 0v3M5 11h14v10H5zM12 15v2",
  flamme: "M12 3c.5 3.5 5 5.5 5 10.5a5 5 0 0 1-10 0c0-2.4 1.3-4 2.5-5 .2 1.5.9 2.5 2 3 .2-3-1-5.5.5-8.5z",
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

// Le pays se devine d'après la langue du téléphone (fr-SN…), sinon d'après son fuseau horaire.
const FUSEAUX = {
  "Africa/Dakar": "SN", "Africa/Abidjan": "CI", "Africa/Bamako": "ML", "Africa/Ouagadougou": "BF",
  "Africa/Conakry": "GN", "Africa/Porto-Novo": "BJ", "Africa/Lome": "TG", "Africa/Niamey": "NE",
};
function paysParDefaut() {
  const region = (navigator.language || "").split("-")[1];
  if (COUNTRIES[region]) return region;
  try { return FUSEAUX[Intl.DateTimeFormat().resolvedOptions().timeZone] || null; } catch { return null; }
}
function auPays(code) {
  return `${["CI", "GN"].includes(code) ? "en" : "au"} ${COUNTRIES[code].nom}`;
}

// Clé aléatoire de l'appareil : le serveur s'en sert pour retrouver les crédits de l'élève.
function nouvelleCle() {
  if (crypto.randomUUID) return crypto.randomUUID();
  const o = crypto.getRandomValues(new Uint8Array(16));
  o[6] = (o[6] & 0x0f) | 0x40;
  o[8] = (o[8] & 0x3f) | 0x80;
  const h = [...o].map((x) => x.toString(16).padStart(2, "0")).join("");
  return `${h.slice(0, 8)}-${h.slice(8, 12)}-${h.slice(12, 16)}-${h.slice(16, 20)}-${h.slice(20)}`;
}

function loadState() {
  const vide = {
    country: paysParDefaut(), classe: "", matiere: "", pseudo: "", theme: "cahier", themeChoisi: false,
    credits: CREDIT_OFFERT_PAR_JOUR, lastRefill: today(), exosFaits: 0,
    streak: 0, lastActive: null, gels: 0, jours: [],
    cards: {}, exos: [], answered: 0, good: 0, studio: "",
    sons: true, objectif: { date: today(), exo: false, revision: false },
    decouverte: "", // "en_cours" de la fin de l'accueil au premier exercice compris, puis "faite"
    cle: nouvelleCle(),
  };
  try {
    const s = JSON.parse(localStorage.getItem(STORE_KEY));
    // Le thème clair devient le défaut : « auto » n'est gardé que si l'élève l'a choisi lui-même.
    if (s && !s.themeChoisi && s.theme === "auto") s.theme = "cahier";
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

// Objectif du jour : un exercice compris et une révision ou un quiz.
function objectif() {
  if (!state.objectif || state.objectif.date !== today()) state.objectif = { date: today(), exo: false, revision: false };
  return state.objectif;
}
function cocherObjectif(cle) {
  const o = objectif();
  const avant = o.exo && o.revision;
  o[cle] = true;
  save();
  return !avant && o.exo && o.revision; // vrai si l'objectif vient d'être atteint
}

// Sons courts générés sur place (aucun fichier à télécharger) et vibration sur Android.
let audio = null;
function son(type) {
  if (!state.sons) return;
  try {
    audio = audio || new (window.AudioContext || window.webkitAudioContext)();
    const notes = { juste: [660, 880], erreur: [220, 185], fin: [523, 659, 784, 1047], tap: [440] }[type] || [440];
    notes.forEach((f, i) => {
      const o = audio.createOscillator(), g = audio.createGain();
      const t = audio.currentTime + i * 0.09;
      o.type = type === "erreur" ? "triangle" : "sine";
      o.frequency.value = f;
      g.gain.setValueAtTime(0.0001, t);
      g.gain.exponentialRampToValueAtTime(0.18, t + 0.02);
      g.gain.exponentialRampToValueAtTime(0.0001, t + 0.18);
      o.connect(g).connect(audio.destination);
      o.start(t);
      o.stop(t + 0.2);
    });
  } catch (e) { /* audio indisponible */ }
  if (navigator.vibrate) navigator.vibrate(type === "erreur" ? [40, 60, 40] : type === "fin" ? [30, 40, 30, 40, 60] : 25);
}

function sankoDit(humeur, html, taille = 88, extra = "") {
  return `<div class="sanko-dit">${sanko(humeur, taille, extra)}<div class="bulle">${html}</div></div>`;
}

function confettis() {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const couleurs = ["#ffc21a", "#2563eb", "#12893f", "#7c3aed", "#ea6a0a"];
  const box = document.createElement("div");
  box.className = "confettis";
  box.innerHTML = Array.from({ length: 40 }, (_, i) => `<i style="left:${(i * 37) % 100}%;background:${couleurs[i % couleurs.length]};animation-delay:${(i % 10) * 0.06}s"></i>`).join("");
  document.body.appendChild(box);
  setTimeout(() => box.remove(), 2400);
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

// L'IA écrit parfois une phrase entière pour la matière ou le niveau : on garde deux mots.
const MATIERES_COURTES = [["math", "Maths"], ["géom", "Maths"], ["phys", "PC"], ["chim", "PC"], ["svt", "SVT"], ["vie et de la terre", "SVT"], ["philo", "Philo"], ["fran", "Français"], ["hist", "Histoire-Géo"], ["géographie", "Histoire-Géo"], ["angl", "Anglais"], ["économ", "Économie"], ["compta", "Économie"]];
function court(t = "") { return t.split(/[.,;:(·]/)[0].trim(); }
function matiereCourte(m = "") {
  const t = m.toLowerCase();
  return MATIERES_COURTES.find(([k]) => t.includes(k))?.[1] || court(m).slice(0, 20);
}
function etiquetteExo(d) {
  const niveau = court(d.niveau);
  return [matiereCourte(d.matiere), niveau && niveau.length <= 20 ? niveau : state.classe].filter(Boolean).join(" · ");
}
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
  $("#serie").innerHTML = `${icone("flamme")}${pluriel(state.streak, "jour")}`;
  $("#serie").classList.toggle("eteinte", !state.streak);
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

function afficher(html, onglet = "", immersif = false) {
  document.querySelector(".feuille")?.remove();
  document.body.classList.toggle("immersif", immersif);
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

function messageSanko(dues) {
  if (state.exosFaits === 0 && !dues) return ["content", "Moi c'est Lumi, ton prof de poche."];
  if (dues) return ["reflechit", `J'ai ramené ${pluriel(dues, "chose")} que tu avais oubliée${dues > 1 ? "s" : ""}. On ${dues > 1 ? "les" : "la"} revoit ? Ça prend 2 minutes.`];
  if (state.streak >= 2) return ["joie", `${state.streak} jours d'affilée ! On continue ?`];
  return ["content", "On attaque quel exercice aujourd'hui ?"];
}

// Carrousel « Révise par matière » de l'accueil : un quiz en un geste.
const MATIERES_ACCUEIL = [
  ["Maths", "Maths", "maths"], ["PC", "Physique-Chimie", "pc"], ["SVT", "SVT", "svt"],
  ["Philo", "Philo", "philo"], ["Français", "Français", "livre"], ["Histoire-Géo", "Histoire-Géo", "globe"],
];
function carrouselMatieres() {
  const melange = `<button class="matiere melange" data-quiz-matiere="">
      <span class="matiere-ico">${icone("quiz")}</span>
      <span class="matiere-nom">Tout mélangé</span>
      <span class="matiere-info">${QUIZ_LEN} questions</span>
    </button>`;
  return melange + MATIERES_ACCUEIL.map(([cle, nom, ico], i) => {
    const n = QUESTIONS.filter((q) => q.matiere === cle).length;
    return n ? `<button class="matiere m${i}" data-quiz-matiere="${esc(cle)}">
      <span class="matiere-ico">${icone(ico)}</span>
      <span class="matiere-nom">${esc(nom)}</span>
      <span class="matiere-info">${pluriel(n, "question")}</span>
    </button>` : "";
  }).join("");
}

// Objectif du jour et série réunis : une barre en deux étapes et la flamme de la série.
function carteObjectif(o) {
  const fait = (o.exo ? 1 : 0) + (o.revision ? 1 : 0);
  const sousTitre = fait === 2 ? "Objectif atteint, ta série est sauvée !"
    : fait === 1 ? "Plus qu'une étape pour garder ta série."
    : "2 petites étapes pour garder ta série.";
  return `
    <button class="objectif ${fait === 2 ? "atteint" : ""}" id="carteObjectif">
      <span class="objectif-haut">
        <span class="objectif-titre">Objectif du jour</span>
        <span class="objectif-compte">${fait}/2</span>
      </span>
      <span class="objectif-sous">${sousTitre}</span>
      <span class="objectif-barre" role="progressbar" aria-label="Objectif du jour" aria-valuemin="0" aria-valuemax="2" aria-valuenow="${fait}"><span style="width:${fait * 50}%"></span></span>
      <span class="objectif-taches">
        <span class="tache ${o.exo ? "fait" : ""}">${icone(o.exo ? "juste" : "photo")}1 exercice</span>
        <span class="tache ${o.revision ? "fait" : ""}">${icone(o.revision ? "juste" : "quiz")}1 quiz ou révision</span>
      </span>
      ${state.gels ? `<span class="petit">${pluriel(state.gels, "jour")} de repos en réserve</span>` : ""}
    </button>`;
}

function renderHome() {
  const dues = cartesDues().length + exosDus().length;
  const premier = state.exosFaits === 0;
  const o = objectif();
  const [humeur, message] = messageSanko(dues);
  afficher(`
    <div class="salut">
      <h1 class="display-l">Salut${state.pseudo ? ` ${esc(state.pseudo)}` : ""} !</h1>
      <p class="salut-message">${message}</p>
    </div>

    <section class="hero" aria-labelledby="titreExo">
      <div class="hero-texte">
        <span class="hero-etiquette">${icone("etincelle")}${premier ? "1er exercice offert" : "Toutes les matières"}</span>
        <h2 class="hero-titre" id="titreExo">Mon <span class="hero-titre-accent">exercice</span></h2>
        <p>Une photo, et Lumi t'explique la méthode pas à pas.</p>
      </div>
      <div class="hero-scene" aria-hidden="true">
        <div class="hero-viseur">
          <div class="hero-feuille">
            <span class="hero-feuille-titre">Exercice 2</span>
            <span class="hero-feuille-eq">x² − 5x + 6 = 0</span>
            <span class="hero-feuille-ligne"></span>
            <span class="hero-feuille-ligne court"></span>
            <i class="hero-scan"></i>
          </div>
        </div>
        <span class="hero-badge badge-methode"><span class="badge-coche">${icone("juste")}</span>Méthode trouvée</span>
        <span class="hero-badge badge-calcul">Δ = 1</span>
        <span class="hero-badge badge-etapes">${icone("etincelle")}3 étapes</span>
        ${sanko(humeur, 76, "hero-sanko")}
      </div>
      <div class="hero-actions">
        <div class="hero-boutons">
          <button class="btn btn-soleil" id="prendrePhoto">${icone("photo")}Photo</button>
          <button class="btn hero-ecrire" id="ecrire">${icone("crayon")}Écrire</button>
        </div>
        <span class="hero-prix">1 crédit par exercice</span>
      </div>
    </section>

    ${carteObjectif(o)}

    <section class="matieres-bloc" aria-labelledby="titreMatieres">
      <div class="section-entete">
        <h2 class="titre" id="titreMatieres">Quiz par matière</h2>
        <span class="petit">Gratuit · 2 min</span>
      </div>
      <div class="matieres">${carrouselMatieres()}</div>
    </section>

    <div class="tuiles">
      <button class="tuile orange" id="carteRevoir">
        ${icone("reviser", "ico tuile-filigrane")}
        <span class="tuile-ico">${icone("reviser")}</span>
        <span class="titre">Mes erreurs ${dues ? `<span class="badge-nombre">${dues}</span>` : ""}</span>
        <span class="petit">${dues ? "Lumi les a ramenées" : "Rien à revoir"}</span>
      </button>
      <button class="tuile violet" id="carteDuel">
        ${icone("duel", "ico tuile-filigrane")}
        <span class="tuile-ico">${icone("duel")}</span>
        <span class="titre">Duel</span>
        <span class="petit">Défie un ami</span>
      </button>
    </div>`, "home");

  $("#prendrePhoto").addEventListener("click", () => $("#photoInput").click());
  $("#ecrire").addEventListener("click", () => { exo = { photo: null, texte: "" }; renderSaisie(); });
  $("#carteObjectif").addEventListener("click", () => {
    const o = objectif();
    if (!o.revision) demarrerQuiz(cartesDues().length ? "revoir" : "quiz");
    else if (!o.exo) $(".hero").scrollIntoView({ behavior: "smooth", block: "center" });
    else render("profil");
  });
  $("#carteRevoir").addEventListener("click", () => (cartesDues().length ? demarrerQuiz("revoir") : render("reviser")));
  $("#carteDuel").addEventListener("click", () => demarrerQuiz("duel"));
  view.querySelectorAll("[data-quiz-matiere]").forEach((b) => b.addEventListener("click", () => demarrerQuiz("quiz", null, b.dataset.quizMatiere)));
}

// ---------- Premier contact : un seul geste, son exercice ----------

// Le premier écran après l'accueil : rien d'autre que l'exercice. Ni quiz, ni crédits, ni onglets.
function renderPremierContact() {
  afficher(`
    <div class="premier">
      ${sankoDit("joie", `${esc(state.pseudo || "Salut")}, montre-moi l'exercice qui te bloque. Je t'explique comment le faire.`, 88, "sanko-flotte")}
      <button class="viseur-premier" id="premierePhoto">
        <span class="viseur-coins" aria-hidden="true"></span>
        ${icone("photo")}
        <span class="viseur-titre">Prendre la photo</span>
        <span class="petit">Ton cahier, une feuille ou un sujet</span>
      </button>
      <button class="btn btn-large" id="premierEcrire">${icone("crayon")}Écrire l'exercice</button>
      <div class="sans-exo">
        <span class="petit">Pas d'exercice sous la main ?</span>
        <button class="btn btn-principal btn-large" id="essai">${icone("etincelle")}Essaie un exercice de ton niveau</button>
      </div>
      <p class="petit centre">Offert, sans inscription</p>
      <button class="lien-discret" id="plusTard">Découvrir l'appli d'abord</button>
    </div>`, "", true);
  $("#premierePhoto").addEventListener("click", () => $("#photoInput").click());
  $("#premierEcrire").addEventListener("click", () => { exo = { photo: null, texte: "" }; renderSaisie(); });
  $("#essai").addEventListener("click", lancerEssai);
  $("#plusTard").addEventListener("click", () => { state.decouverte = "faite"; save(); render("home"); });
}

// Exercice d'essai (essais.js) adapté à la classe : corrigé d'avance, donc gratuit et instantané.
function cleEssai() {
  return { "Primaire": "primaire", "6e – 5e": "college", "4e – 3e": "brevet", "Seconde": "lycee", "Première": "lycee", "Terminale": "bac" }[state.classe] || "brevet";
}
function lancerEssai() {
  const essai = ESSAIS[cleEssai()];
  exo = { photo: null, texte: essai.texte, essai, lecture: { enonce: essai.texte, doutes: [] } };
  renderLecture();
  setTimeout(renderEnonceLu, 1800);
}

// Lumi « lit » : la photo (ou la feuille d'essai) balayée par un trait de lumière.
function renderLecture() {
  const visuel = exo.photo ? `<img src="${exo.photo}" alt="Ta photo">` : `<div class="cahier-essai">${multiligne(exo.texte)}</div>`;
  afficher(`
    <div class="lecture" role="status" aria-live="polite">
      <div class="lecture-visuel">${visuel}<i class="scan" aria-hidden="true"></i></div>
      ${sankoDit("reflechit", exo.photo ? "Je lis ton cahier…" : "Je lis l'exercice…", 64)}
    </div>`, "", true);
}

// Fait apparaître un texte lettre par lettre, en 1,5 s environ quelle que soit sa longueur.
function ecrireLettreALettre(ecrire, texte) {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) { ecrire(texte); return; }
  const pas = Math.max(1, Math.ceil(texte.length / 60));
  let n = 0;
  const t = setInterval(() => {
    n = Math.min(texte.length, n + pas);
    if (ecrire(texte.slice(0, n)) === false || n >= texte.length) clearInterval(t);
  }, 25);
}

// L'exercice revient en révision le lendemain : c'est la promesse faite à la fin du premier contact.
function planifierRetour() {
  if (state.exos.some((e) => e.id === exo.id)) return;
  const d = exo.correction;
  const fiche = { id: `exo-${Date.now()}`, date: today(), titre: d.enonce.slice(0, 90), matiere: d.matiere, box: 0, due: addDays(today(), 1), correction: d };
  exo.id = fiche.id;
  state.exos = [fiche, ...state.exos].slice(0, 50);
  save();
}

// L'invitation du navigateur à installer l'appli, gardée pour le bon moment : juste après le premier exercice compris.
let invitationInstall = null;
window.addEventListener("beforeinstallprompt", (e) => { e.preventDefault(); invitationInstall = e; });
window.addEventListener("appinstalled", () => { invitationInstall = null; toast("Révizo est sur ton écran d'accueil !"); });

const appliInstallee = () => window.matchMedia("(display-mode: standalone)").matches || navigator.standalone === true;
const surIphone = () => /iphone|ipad|ipod/i.test(navigator.userAgent) || (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);
// Le bouton d'installation a du sens si le navigateur propose l'installation, ou sur iPhone (étapes à suivre).
const installationPossible = () => !appliInstallee() && (Boolean(invitationInstall) || surIphone());

// Installer l'appli : la fenêtre du navigateur quand il en donne une (Android, Chrome),
// sinon les étapes à suivre, sur iPhone (Safari) ou dans les autres navigateurs.
async function installerAppli() {
  if (appliInstallee()) { toast("Révizo est déjà installée sur ce téléphone."); return; }
  if (invitationInstall) {
    const invitation = invitationInstall;
    invitationInstall = null;
    invitation.prompt();
    return;
  }
  const etapes = surIphone()
    ? [`Touche le bouton <b>Partager</b> ${icone("partager")} en bas de Safari.`, "Fais défiler et choisis <b>Sur l'écran d'accueil</b>.", "Touche <b>Ajouter</b> en haut à droite."]
    : ["Ouvre le <b>menu</b> du navigateur (les trois points ⋮ en haut à droite).", "Choisis <b>Installer l'application</b> ou <b>Ajouter à l'écran d'accueil</b>.", "Confirme : Lumi apparaît à côté de tes autres applis."];
  document.querySelector(".feuille")?.remove();
  const feuille = document.createElement("div");
  feuille.className = "feuille feuille-install";
  feuille.setAttribute("role", "dialog");
  feuille.setAttribute("aria-label", "Installer Révizo");
  feuille.innerHTML = `
    <div class="feuille-titre">${sanko("joie", 64)}<h2>Mets Lumi sur ton écran d'accueil</h2></div>
    <ol class="etapes-install">${etapes.map((t) => `<li>${t}</li>`).join("")}</ol>
    ${surIphone() ? `<p class="petit">Ça marche dans <b>Safari</b>. Si tu es dans une autre appli (WhatsApp, Facebook…), ouvre d'abord revizo.click dans Safari.</p>` : ""}
    <p class="petit">Gratuit, sans Play Store, et elle prend très peu de place.</p>
    <button class="btn btn-principal btn-large" id="compris">J'ai compris</button>`;
  document.body.appendChild(feuille);
  $("#compris").focus();
  $("#compris").addEventListener("click", () => feuille.remove());
}

function blocVictoire(d) {
  const motDuProf = d.etapes.map((e) => e.marge).find(Boolean);
  return `
    <section class="carte victoire apparait">
      ${sanko("fier", 96, "sanko-saute")}
      <h2 class="victoire-titre">Exercice compris</h2>
      <p>Bravo ${esc(state.pseudo)}, tu as la méthode. C'est elle qui compte le jour de l'examen.</p>
      ${motDuProf ? `<p class="mot-prof"><span class="etiquette">Le petit mot du prof</span><span class="annotation">${esc(motDuProf)}</span></p>` : ""}
    </section>
    <section class="carte rendezvous">
      ${sankoDit("content", "Demain, je te ramène cet exercice. Si tu retrouves la méthode tout seul, c'est gagné : tu sais le refaire.", 56)}
      ${calendrierSemaine(true)}
      <span class="petit centre">${state.streak > 1 ? `${state.streak} jours de série` : "Jour 1 de ta série"}</span>
      ${installationPossible() ? `<button class="btn btn-soleil btn-large" id="installer">${icone("etincelle")}Mettre Lumi sur mon écran d'accueil</button>` : ""}
      <div class="actions-ligne">
        <button class="btn" id="defier">${icone("duel")}Défier un ami</button>
        <button class="btn btn-principal" id="continuer">Continuer</button>
      </div>
    </section>`;
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
    lireEnonce();
  } catch {
    toast("Impossible de lire cette photo. Réessaie.");
  }
});

// La classe vient de l'écran de bienvenue : on ne demande que la matière, pour cet exercice seulement.
function blocMatiere() {
  return `
    <span class="champ-label">La matière <span class="petit">(sinon je la devine)</span></span>
    ${puces(MATIERES, exo.matiere ?? exo.matiereDetectee ?? "", "matiere")}`;
}
function lierMatiere() {
  lierPuces("matiere", (v) => { exo.matiere = v; });
}
function enteteFlux(titre, retour) {
  return `
    <div class="entete-flux">
      <button class="btn btn-discret" id="retour" aria-label="${retour}">${icone("fermer")}</button>
      <h1 class="titre-flux">${titre}</h1>
    </div>`;
}

async function appelApi(route, body) {
  try {
    const res = await fetch(route, { method: "POST", headers: { "Content-Type": "application/json", "X-Revizo-Cle": state.cle }, body: JSON.stringify(body) });
    return await res.json();
  } catch {
    return { erreur: navigator.onLine ? "Le service ne répond pas. Réessaie dans un instant." : "Pas de connexion internet. Réessaie quand le réseau revient." };
  }
}

function renderSaisie() {
  afficher(`
    ${enteteFlux("Mon exercice", "Retour à l'accueil")}
    <label class="champ-label" for="texteExo">Écris ou colle ton exercice</label>
    <textarea id="texteExo" rows="7" maxlength="8000" placeholder="Ex. Résoudre 2x² − 3x − 2 = 0">${esc(exo.texte)}</textarea>
    <button class="lien-photo" id="plutotPhoto">${icone("photo")}Plutôt prendre une photo</button>
    ${blocMatiere()}
    <div class="cta-fixe">
      <button class="btn btn-principal btn-large" id="suite">Explique-moi · ${state.decouverte === "en_cours" ? "offert" : "1 crédit"}</button>
    </div>`, "", true);

  $("#retour").addEventListener("click", () => render("home"));
  $("#plutotPhoto").addEventListener("click", () => $("#photoInput").click());
  lierMatiere();
  const zone = $("#texteExo");
  if (!exo.texte) zone.focus({ preventScroll: true });
  $("#suite").addEventListener("click", () => {
    exo.texte = zone.value.trim();
    if (!exo.texte) { toast("Écris ton exercice d'abord."); zone.focus(); return; }
    expliquer();
  });
}

const ASTUCES = [
  "Pendant ce temps, relis la question : que cherche-t-on exactement ?",
  "Astuce : souligne les données de l'énoncé avant de calculer.",
  "Au BAC, la méthode rapporte souvent plus de points que le résultat.",
  "Une erreur, c'est une question que Lumi te ramènera. Rien de grave.",
  "Écris chaque étape : le correcteur doit pouvoir te suivre.",
];

// Affiche l'attente une seule fois et renvoie une fonction pour passer à l'étape suivante.
function renderAttente(etapes, duree) {
  afficher(`
    <div class="attente" role="status" aria-live="polite">
      ${sanko("reflechit", 120, "sanko-flotte")}
      <p class="attente-titre" id="attenteTitre">${esc(etapes[0])}…</p>
      <div class="attente-jauge" aria-hidden="true"><span style="animation-duration:${duree}s"></span></div>
      <ul class="attente-etapes">
        ${etapes.map((t, i) => `<li data-etape="${i}" class="${i === 0 ? "encours" : ""}">${icone("crayon")}${esc(t)}</li>`).join("")}
      </ul>
      <p class="attente-astuce" id="astuce">${ASTUCES[Math.floor(Math.random() * ASTUCES.length)]}</p>
    </div>`, "", true);
  let n = ASTUCES.indexOf($("#astuce").textContent);
  const rotation = setInterval(() => {
    const el = $("#astuce");
    if (!el) { clearInterval(rotation); return; }
    n = (n + 1) % ASTUCES.length;
    el.textContent = ASTUCES[n];
  }, 6000);
  return (courante) => {
    if (!$("#attenteTitre")) return;
    $("#attenteTitre").textContent = `${etapes[courante]}…`;
    view.querySelectorAll("[data-etape]").forEach((li) => {
      const k = Number(li.dataset.etape);
      li.className = k < courante ? "fait" : k === courante ? "encours" : "";
      li.querySelector(".ico").outerHTML = icone(k < courante ? "juste" : "crayon");
    });
  };
}

async function lireEnonce() {
  renderLecture();
  const data = await appelApi("api/lire", { image: exo.photo.split(",")[1], mediaType: "image/jpeg" });
  if (data.erreur || data.lisible === false) {
    renderErreur(data.erreur || data.probleme || "La photo n'est pas lisible.", true);
    return;
  }
  exo.lecture = data;
  if (data.matiere && data.matiere !== "autre") exo.matiereDetectee = data.matiere;
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
  const decouverte = state.decouverte === "en_cours";
  const visuel = exo.photo ? `<img src="${exo.photo}" alt="Ta photo">` : `<div class="cahier-essai mini" aria-hidden="true">${multiligne(exo.texte)}</div>`;
  const bulle = l.doutes?.length ? "J'ai un doute sur un passage. Vérifie-le, puis corrige si besoin."
    : exo.essai ? "Voici l'exercice. On le fait ensemble ?"
    : decouverte ? "Voici ce que j'ai lu. C'est bien ça ?"
    : "Voici ce que j'ai lu. Corrige si je me suis trompé.";
  afficher(`
    ${enteteFlux("Vérifie l'énoncé", "Annuler")}
    <div class="lu-photo">
      ${visuel}
      ${sankoDit("content", bulle, 52)}
    </div>
    ${l.doutes?.length ? `
      <section class="carte carte-doutes" aria-label="Passages à vérifier">
        <ul class="liste-doutes">${l.doutes.map((d) => `<li><mark class="doute">${esc(d.extrait)}</mark><span>${esc(d.question)}</span></li>`).join("")}</ul>
      </section>` : ""}
    ${l.a_interpreter ? `<span class="annotation annotation-attention">Énoncé à interpréter, vérifie bien.</span>` : ""}
    <label class="champ-label" for="enonceCorrige">L'énoncé</label>
    <textarea id="enonceCorrige" rows="6" maxlength="8000" ${exo.essai ? "readonly" : ""}>${esc(l.enonce)}</textarea>
    ${exo.essai ? "" : blocMatiere()}
    <div class="cta-fixe">
      <button class="btn btn-principal btn-large" id="confirmer">${decouverte ? "C'est bien ça, explique-moi · offert" : "C'est bon, explique-moi · 1 crédit"}</button>
      ${exo.essai ? "" : `<button class="btn btn-discret" id="reprendre">${icone("photo")}Reprendre la photo</button>`}
    </div>`, "", true);
  $("#retour").addEventListener("click", () => render("home"));
  $("#reprendre")?.addEventListener("click", () => $("#photoInput").click());
  lierMatiere();
  const zone = $("#enonceCorrige");
  zone.style.height = `${Math.max(zone.scrollHeight + 4, 120)}px`;
  // La première fois, l'énoncé s'écrit sous les yeux de l'élève : son cahier devient du texte.
  let ecritureFinie = !decouverte;
  if (decouverte) {
    zone.value = "";
    ecrireLettreALettre((t) => {
      if (!zone.isConnected) return false;
      zone.value = t;
      ecritureFinie = t === l.enonce;
    }, l.enonce);
  }
  $("#confirmer").addEventListener("click", () => {
    if (exo.essai) { expliquerEssai(); return; }
    exo.texte = (ecritureFinie ? zone.value : l.enonce).trim(); // un appui pendant l'écriture garde l'énoncé entier
    if (!exo.texte) { toast("L'énoncé est vide."); return; }
    expliquer();
  });
}

// L'essai est corrigé d'avance : une courte attente pour le suivre, sans crédit ni appel à l'IA.
function expliquerEssai() {
  const etape = renderAttente(["Je relis l'énoncé", "Je cherche la méthode", "J'écris les étapes"], 3);
  setTimeout(() => etape(1), 900);
  setTimeout(() => etape(2), 1800);
  setTimeout(() => {
    marquerActif();
    cocherObjectif("exo");
    save();
    majBarre();
    ouvrirCorrection(exo.essai.correction);
  }, 2700);
}

async function expliquer() {
  if (state.credits < 1) { renderRecharge("epuise"); return; }
  state.credits -= 1;
  save();
  majBarre();
  const etapes = ["Je relis l'énoncé", "Je cherche la méthode", "J'écris les étapes"];
  let i = 0;
  const etape = renderAttente(etapes, 45);
  const timer = setInterval(() => { i = Math.min(i + 1, etapes.length - 1); etape(i); }, 6000);

  const body = { texte: exo.texte, pays: pays()?.nom || "", classe: state.classe || "", matiere: exo.matiere || exo.matiereDetectee || "" };
  if (exo.photo) { body.image = exo.photo.split(",")[1]; body.mediaType = "image/jpeg"; }
  const data = await appelApi("api/resoudre", body);
  clearInterval(timer);

  // En ligne, le serveur tient le solde : il renvoie le nombre de crédits restant.
  if (data.code === "plus_de_credit") {
    state.credits = 0;
    save();
    majBarre();
    renderRecharge("epuise");
    return;
  }
  if (data.erreur || data.lisible === false) {
    if (typeof data.credits === "number") state.credits = data.credits;
    else state.credits += 1; // pas de correction utilisable : le crédit est rendu
    save();
    majBarre();
    renderErreur(data.erreur || data.probleme || "Je n'ai pas pu traiter cet exercice.", Boolean(exo.photo), data.rendu !== false);
    return;
  }
  if (typeof data.credits === "number") state.credits = data.credits;
  exo.mouvement = data.mouvement;
  state.exosFaits += 1;
  marquerActif();
  if (cocherObjectif("exo")) setTimeout(() => { son("fin"); confettis(); toast("Objectif du jour atteint !"); }, 400);
  save();
  majBarre();
  ouvrirCorrection(data);
}

function renderErreur(message, proposerPhoto, creditRendu) {
  afficher(`
    ${sankoDit("encourage", `${esc(message)}${creditRendu ? `<br><span class="petit">Ton crédit t'a été rendu.</span>` : ""}`, 100)}
    ${proposerPhoto ? `<button class="btn btn-principal btn-large" id="reprendre">${icone("photo")}Reprendre la photo</button>` : ""}
    <button class="btn btn-large" id="accueil">Retour à l'accueil</button>`);
  $("#reprendre")?.addEventListener("click", () => $("#photoInput").click());
  $("#accueil").addEventListener("click", () => render("home"));
}

function ouvrirCorrection(data, depuisRevision) {
  exo = Object.assign(exo || {}, {
    correction: data,
    palier: 0, // 0 aucun, 1 coup de pouce, 2 méthode, 3+ étapes
    demarrageRepondu: !data.demarrage?.choix?.length,
    etapesVisibles: 1,
    toutVoir: false,
    signale: false,
    depuisRevision: Boolean(depuisRevision),
    decouverte: state.decouverte === "en_cours" && !depuisRevision,
  });
  renderCorrection();
}

// Après le choix de démarrage. Le tout premier bon choix est fêté par Lumi, avec le prénom de l'élève.
function retourDemarrage(choix) {
  if (choix.juste && exo.decouverte) {
    return `<div class="retour apparait">${sankoDit("joie", `Bien vu ${esc(state.pseudo)} ! Tu as trouvé tout seul par où commencer.`, 64, "sanko-saute")}<p>${esc(choix.retour)}</p></div>`;
  }
  return `
    <div class="retour apparait">
      <span class="annotation ${choix.juste ? "annotation-bravo" : "annotation-attention"}">${choix.juste ? "Bien vu !" : "Pas tout à fait."}</span>
      <p>${esc(choix.retour)}</p>
    </div>`;
}

function renderCorrection() {
  const d = exo.correction;
  const n = d.etapes.length;
  const methodeVisible = exo.toutVoir || exo.demarrageRepondu || exo.palier >= 2;
  const visibles = exo.toutVoir ? n : Math.min(exo.etapesVisibles, n);
  const fini = visibles >= n;
  const demarrage = d.demarrage;
  // Progression : la méthode compte pour une étape, puis chaque étape dévoilée.
  const y = window.scrollY;
  const avance = fini ? n + 1 : methodeVisible ? visibles : exo.palier >= 1 ? 0.5 : 0;

  afficher(`
    <div class="barre-lecon">
      <button class="btn btn-discret" id="retour" aria-label="${exo.depuisRevision ? "Retour aux révisions" : "Retour à l'accueil"}">${icone("fermer")}</button>
      <div class="jauge" role="progressbar" aria-label="Avancement de la correction" aria-valuemin="0" aria-valuemax="${n + 1}" aria-valuenow="${avance}"><span style="width:${(avance / (n + 1)) * 100}%"></span></div>
    </div>
    <span class="puce-matiere">${esc(etiquetteExo(d))}</span>
    <div class="correction">
      <section class="carte carte-cible">
        <h2 class="carte-titre">${icone("cible")}Ce qu'on cherche</h2>
        <p>${multiligne(d.enonce)}</p>
      </section>

      ${exo.palier >= 1 && !methodeVisible ? sankoDit("encourage", `<span class="etiquette">Coup de pouce</span><br>${multiligne(d.indice)}`, 72, "apparait") : ""}

      ${demarrage?.choix?.length && !exo.toutVoir ? `
      <section class="carte">
        ${sankoDit("reflechit", esc(demarrage.question), 64)}
        <div class="choix-demarrage">
          ${demarrage.choix.map((c, i) => {
            const etat = exo.choixDemarrage === i ? (c.juste ? "juste" : "erreur") : exo.demarrageRepondu && c.juste ? "juste" : "";
            return `<button class="choix ${etat}" data-demarrage="${i}" ${exo.demarrageRepondu ? "disabled" : ""}>
              <span class="choix-lettre">${"ABC"[i]}</span><span class="choix-texte">${esc(c.texte)}</span>
              ${etat ? `<span class="choix-etat">${icone(etat)}${etat === "juste" ? "Juste" : "À revoir"}</span>` : ""}
            </button>`;
          }).join("")}
        </div>
        ${exo.choixDemarrage !== undefined ? retourDemarrage(demarrage.choix[exo.choixDemarrage]) : ""}
      </section>` : ""}

      ${methodeVisible ? `
      <section class="carte carte-methode apparait">
        <h2 class="carte-titre">${icone("methode")}La méthode à retenir</h2>
        <ol class="liste-num">${d.methode.map((m) => `<li>${multiligne(m)}</li>`).join("")}</ol>
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
          ${d.etapes.slice(visibles).map((_, j) => `<div class="etape-cachee" aria-hidden="true">${icone("cadenas")}Étape ${visibles + j + 1}</div>`).join("")}
        </div>
        ${!fini ? `<p class="petit">Essaie l'étape suivante sur ton cahier avant de la dévoiler.</p>` : ""}
      </section>` : ""}

      ${fini ? `
      ${exo.decouverte ? blocVictoire(d) : sankoDit("joie", "Et voilà ! Tu as la méthode. Essaie maintenant l'exercice « À toi de jouer ».", 72, "sanko-saute")}
      <section class="carte carte-reponse apparait">
        <h2 class="carte-titre">${icone("juste")}Réponse</h2>
        <p class="reponse-finale">${multiligne(d.reponse)}</p>
      </section>
      ${d.pieges.length ? `
      <section class="carte carte-piege">
        <h2 class="carte-titre">${icone("erreur")}Pièges à éviter</h2>
        <ul>${d.pieges.map((p) => `<li>${multiligne(p)}</li>`).join("")}</ul>
      </section>` : ""}
      <section class="carte carte-defi">
        <h2 class="carte-titre">${icone("quiz")}À toi de jouer</h2>
        <p>${multiligne(d.entrainement.enonce)}</p>
        <details><summary class="btn btn-discret">Voir la solution</summary><p>${multiligne(d.entrainement.solution)}</p></details>
        <span class="petit">Tu l'as fait ?</span>
        <div class="actions-ligne">
          <button class="btn btn-juste" data-bilan="reussi">${icone("juste")}Je l'ai réussi</button>
          <button class="btn" data-bilan="trompe">${icone("erreur")}Je me suis trompé</button>
        </div>
      </section>
      <div class="actions">
        <button class="btn" id="partager">${icone("whatsapp")}Partager la méthode sur WhatsApp</button>
        <button class="btn btn-principal" id="nouvel">${icone("photo")}Nouvel exercice</button>
        <button class="btn btn-discret" id="signaler" ${exo.signale ? "disabled" : ""}>${icone("signaler")}${exo.signale ? "Merci, c'est signalé" : "Signaler une erreur"}</button>
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
        <button class="btn btn-soleil" id="bloque">Je bloque</button>
        ${methodeVisible ? `<button class="btn btn-principal" id="suivante">Étape suivante</button>` : ""}
      </div>
      <button class="btn btn-discret" id="toutVoir">Tout afficher d'un coup</button>
    </div>` : ""}`, "", true);

  // afficher() remonte en haut : on revient où était l'élève, puis on montre ce qui vient d'apparaître.
  window.scrollTo(0, y);
  if (y) [...view.querySelectorAll(".apparait")].pop()?.scrollIntoView({ block: "center", behavior: "smooth" });

  $("#retour").addEventListener("click", () => render(exo.depuisRevision ? "reviser" : "home"));
  view.querySelectorAll("[data-demarrage]").forEach((b) => b.addEventListener("click", () => {
    exo.choixDemarrage = Number(b.dataset.demarrage);
    exo.demarrageRepondu = true;
    son(exo.correction.demarrage.choix[exo.choixDemarrage].juste ? "juste" : "erreur");
    renderCorrection();
    // Le retour de Lumi passerait sous la barre d'aide : on le montre.
    view.querySelector(".retour")?.scrollIntoView({ block: "center", behavior: "smooth" });
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

  // Premier exercice compris : on fête une seule fois, et l'exercice reviendra demain comme promis.
  if (fini && exo.decouverte) {
    if (!exo.fete) {
      exo.fete = true;
      planifierRetour();
      state.decouverte = "faite";
      save();
      setTimeout(() => { son("fin"); confettis(); $(".victoire")?.scrollIntoView({ block: "center", behavior: "smooth" }); }, 250);
    }
    $("#installer")?.addEventListener("click", () => { $("#installer").remove(); installerAppli(); });
    $("#defier").addEventListener("click", () => demarrerQuiz("duel"));
    $("#continuer").addEventListener("click", () => render("home"));
  }
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

async function signalerErreur() {
  if (exo.signale) return;
  exo.signale = true;
  renderCorrection();
  const r = exo.mouvement ? await appelApi("api/signaler", { mouvement: exo.mouvement }) : { local: true };
  if (r.local) state.credits += 1;
  else if (typeof r.credits === "number") state.credits = r.credits;
  save();
  majBarre();
  toast(r.local || r.rendu ? "Merci. Ton crédit a été rendu pour réessayer." : "Merci, c'est noté.");
}

// ---------- Quiz ----------

// Brevet jusqu'en 3e, BAC à partir de la Seconde. Sans classe connue, on mélange.
function niveauEleve() {
  if (["Seconde", "Première", "Terminale"].includes(state.classe)) return "bac";
  return state.classe ? "brevet" : null;
}

function pickQuestions(mode, matiere) {
  const tout = QUESTIONS.filter((q) => !matiere || q.matiere === matiere);
  const auNiveau = tout.filter((q) => q.niveau === niveauEleve());
  // La banque est encore petite : si le niveau a trop peu de questions, on garde tout.
  const pool = mode !== "revoir" && auNiveau.length >= 3 ? auNiveau : tout;
  const due = new Set(cartesDues());
  if (mode === "revoir") return shuffle(pool.filter((q) => due.has(q.id))).slice(0, QUIZ_LEN);
  const dueQs = shuffle(pool.filter((q) => due.has(q.id)));
  const fresh = shuffle(pool.filter((q) => !state.cards[q.id]));
  const rest = shuffle(pool.filter((q) => state.cards[q.id] && !due.has(q.id)));
  return [...dueQs, ...fresh, ...rest].slice(0, QUIZ_LEN);
}

function demarrerQuiz(mode, duel, matiere = "") {
  const qs = duel ? duel.ids.map((id) => QUESTIONS.find((q) => q.id === id)).filter(Boolean) : pickQuestions(mode, matiere);
  if (!qs.length) { toast(mode === "revoir" ? "Rien à revoir aujourd'hui." : "Pas de question pour cette matière."); return; }
  session = { mode, matiere, qs, i: 0, score: 0, resultats: [], duel: duel || null };
  renderQuestion();
}

function renderQuestion() {
  const { qs, i } = session;
  const q = qs[i];
  session.ordre = shuffle(q.choix.map((_, k) => k));
  const combo = session.combo >= 2 ? `<span class="serie-combo">${session.combo} d'affilée !</span>` : "";
  afficher(`
    <div class="quiz">
    <div class="barre-lecon">
      <button class="btn btn-discret" id="quitter" aria-label="Quitter le quiz">${icone("fermer")}</button>
      <div class="jauge" role="progressbar" aria-valuemin="0" aria-valuemax="${qs.length}" aria-valuenow="${i}"><span style="width:${(i / qs.length) * 100}%"></span></div>
    </div>
    <span class="etiquette">${esc(matiereLabel(q.matiere))} · ${q.niveau === "bac" ? "BAC" : esc(brevet())}${session.mode === "revoir" ? " · Lumi te l'a ramenée" : ""}</span>
    ${combo}
    <p class="question">${esc(q.q)}</p>
    <div class="actions" id="choix">
      ${session.ordre.map((k, n) => `<button class="choix" data-k="${k}"><span class="choix-lettre">${"ABCD"[n]}</span><span class="choix-texte">${esc(q.choix[k])}</span></button>`).join("")}
    </div>
    </div>
    <div class="espace-feuille" aria-hidden="true"></div>`, "", true);
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
  if (ok) { state.good += 1; session.score += 1; session.combo = (session.combo || 0) + 1; } else session.combo = 0;
  session.resultats.push(ok);
  save();
  son(ok ? "juste" : "erreur");
  const jauge = view.querySelector(".jauge span");
  if (jauge) jauge.style.width = `${((session.i + 1) / session.qs.length) * 100}%`;

  const dernier = session.i === session.qs.length - 1;
  const bravo = ["Juste !", "Bien vu !", "Excellent !", "C'est ça !"][session.i % 4];
  document.querySelector(".toast")?.remove();
  const feuille = document.createElement("div");
  feuille.className = `feuille ${ok ? "feuille-juste" : "feuille-erreur"}`;
  feuille.setAttribute("role", "status");
  feuille.innerHTML = `
    <div class="feuille-titre">${sanko(ok ? "joie" : "encourage", 64, ok ? "sanko-saute" : "")}<h2>${ok ? bravo : "Pas tout à fait"}</h2></div>
    ${ok ? `<p>${esc(q.explication)}</p>` : `<p><b>Bonne réponse : ${esc(q.choix[q.bonne])}</b></p><p>${esc(q.explication)}</p><p class="petit">Pas grave : Lumi te la ramènera demain.</p>`}
    <button class="btn ${ok ? "btn-juste" : "btn-principal"} btn-large" id="suivante">${dernier ? "Voir mon bilan" : "Continuer"}</button>`;
  document.body.appendChild(feuille);
  // Les réponses restent visibles au-dessus du panneau.
  requestAnimationFrame(() => window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" }));
  $("#suivante").focus({ preventScroll: true });
  $("#suivante").addEventListener("click", () => {
    if (dernier) finSeance();
    else { session.i += 1; renderQuestion(); }
  });
}

// La semaine du lundi au dimanche : jours révisés cochés, aujourd'hui entouré.
function calendrierSemaine(animer = false) {
  const lundi = addDays(today(), -((new Date(`${today()}T00:00:00Z`).getUTCDay() + 6) % 7));
  const semaine = Array.from({ length: 7 }, (_, k) => addDays(lundi, k));
  return `
    <div class="calendrier" aria-label="Série : ${pluriel(state.streak, "jour")}">
      ${semaine.map((j) => {
        const fait = (state.jours || []).includes(j);
        const lettre = new Date(j).toLocaleDateString("fr-FR", { weekday: "narrow", timeZone: "UTC" });
        return `<span class="${fait ? "fait" : ""} ${j === today() ? "jour-j" : ""} ${j > today() ? "a-venir" : ""} ${fait && j === today() && animer ? "aujourdhui" : ""}"><small>${lettre}</small>${fait ? icone("juste") : ""}</span>`;
      }).join("")}
    </div>`;
}

function finSeance() {
  const { score, qs, duel, mode, matiere, resultats } = session;
  const nouveauJour = marquerActif();
  const objectifAtteint = cocherObjectif("revision");
  let gelGagne = false;
  if (mode === "revoir" && state.gels < 2) { state.gels += 1; gelGagne = true; save(); }
  majBarre();
  const ratees = qs.filter((_, k) => !resultats[k]);
  const pct = Math.round((score / qs.length) * 100);
  const titre = pct === 100 ? "Parfait !" : pct >= 60 ? "Bien joué !" : "Séance terminée";
  const humeur = pct >= 60 ? "fier" : "encourage";

  let duelLigne = "";
  if (duel) {
    duelLigne = score > duel.score ? `Tu bats ${esc(duel.nom)} (${duel.score}/${qs.length}) !`
      : score === duel.score ? `Égalité avec ${esc(duel.nom)}.`
      : `${esc(duel.nom)} gagne avec ${duel.score}/${qs.length}. Revanche ?`;
  }

  afficher(`
    <div class="celebration">
      ${sanko(humeur, 140, "sanko-saute")}
      <h1 class="display-xl">${titre}</h1>
      ${duelLigne ? `<p class="titre">${duelLigne}</p>` : ""}
      <div class="chiffres">
        <div class="chiffre soleil"><span>Score</span><b>${score}/${qs.length}</b></div>
        <div class="chiffre juste"><span>Précision</span><b>${pct} %</b></div>
        <div class="chiffre bic"><span>Série</span><b>${pluriel(state.streak, "jour")}</b></div>
      </div>
    </div>
    ${ratees.length ? `
    <section class="carte">
      ${sankoDit("reflechit", `Je garde ${ratees.length > 1 ? "ces questions" : "cette question"} dans mon bec. Je te ${ratees.length > 1 ? "les" : "la"} ramène demain.`, 56)}
      <ul class="liste-simple">${ratees.map((q) => `<li><span>${esc(q.q)}</span><span class="petit">demain</span></li>`).join("")}</ul>
    </section>` : ""}
    <section class="carte">
      <span class="etiquette">Ta semaine</span>
      ${calendrierSemaine(nouveauJour)}
      ${gelGagne ? `<span class="annotation annotation-bravo">Tu as gagné 1 jour de repos pour ta série !</span>` : ""}
      ${objectifAtteint ? `<span class="annotation annotation-bravo">Objectif du jour atteint !</span>` : ""}
    </section>
    <div class="actions">
      <button class="btn btn-principal btn-large" id="encore">${cartesDues().length ? "Revoir mes erreurs" : "Encore un quiz"}</button>
      <button class="btn btn-large" id="defier">${icone("duel")}Défier un ami sur ces questions</button>
      <button class="btn btn-discret" id="accueil">Retour à l'accueil</button>
    </div>`, "", true);
  son("fin");
  if (pct >= 60 || objectifAtteint) confettis();
  $("#encore").addEventListener("click", () => demarrerQuiz(cartesDues().length ? "revoir" : "quiz", null, matiere));
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
          <span class="etiquette">${esc(matiereCourte(e.matiere))}${e.due && e.due <= today() ? " · à refaire aujourd'hui" : ""}</span>
          <span>${esc(e.titre)}</span>
        </span>
        ${icone("chevron", "ico chevron")}
      </button>`).join("") : `
      ${sankoDit("dort", "Rien ici pour l'instant. Après une correction, dis-moi si tu as réussi « À toi de jouer » : je rangerai l'exercice ici pour te le ramener au bon moment.", 64)}`}`, "reviser");

  $("#revoirQuiz").addEventListener("click", () => demarrerQuiz("revoir"));
  view.querySelectorAll("[data-exo]").forEach((b) => b.addEventListener("click", () => {
    const fiche = state.exos.find((e) => e.id === b.dataset.exo);
    if (!fiche) return;
    exo = { id: fiche.id, photo: null, texte: fiche.correction.enonce };
    ouvrirCorrection(fiche.correction, true);
  }));
}

// ---------- Recharge (paiement simulé) ----------

function renderRecharge(contexte) {
  const c = pays();
  let choisie = "moyen";
  let operateur = c?.paiement[0] || "";
  // Paiement réel : opérateurs de DexPay (null tant qu'ils ne sont pas chargés), moyen choisi et numéro tapé.
  let moyens = paiement === "dexpay" ? moyensParPays[state.country] || null : [];
  let moyen = moyens?.[0] || null;
  let telephone = "";
  if (paiement === "dexpay" && c && !moyens) {
    moyensDuPays(state.country).then((m) => { moyens = m || []; moyen = moyens[0] || null; if (document.querySelector("#zonePaiement")) dessiner(); });
  }
  const titre = contexte === "epuise" ? "Tu n'as plus de crédit" : "Recharge tes crédits";
  const sousTitre = contexte === "epuise"
    ? `Demain, ${pluriel(CREDIT_OFFERT_PAR_JOUR, "crédit")} t'est offert. Tu peux aussi recharger maintenant.`
    : `Il te reste ${pluriel(state.credits, "crédit")}. 1 crédit = 1 exercice expliqué.`;

  const dessiner = () => {
    const o = OFFRES.find((x) => x.id === choisie);
    afficher(`
      ${enteteFlux(titre, "Retour")}
      ${sankoDit("content", sousTitre, 56)}

      <div class="offres" role="radiogroup" aria-label="Offres">
        ${OFFRES.map((x) => `
          <button class="offre" role="radio" data-offre="${x.id}" aria-checked="${x.id === choisie}" aria-pressed="${x.id === choisie}">
            <span class="offre-radio" aria-hidden="true"></span>
            <span class="offre-gauche">
              <span class="offre-credits">${x.credits} crédits</span>
              ${x.badge ? `<span class="offre-badge">${x.badge}</span>` : ""}
            </span>
            <span class="offre-droite">
              <b class="offre-prix">${prix(x.prix)}</b>
              <span class="petit">${prix(Math.round(x.prix / x.credits))} l'exercice</span>
            </span>
          </button>`).join("")}
      </div>
      ${c && paiement === "dexpay" ? `
        <div id="zonePaiement">
        ${!moyens ? `<p class="petit">Je charge les moyens de paiement…</p>`
          : !moyens.length ? `<p class="rassure">${icone("etincelle")}<span>Le paiement mobile money arrive bientôt ${esc(auPays(state.country))}. En attendant, ton exercice offert revient chaque jour.</span></p>`
          : `
          <span class="champ-label">Payer avec</span>
          <div class="operateurs">
            ${moyens.map((m) => `<button class="operateur operateur-logo" data-moyen="${esc(m.code)}" aria-pressed="${m.code === moyen?.code}">${m.logo ? `<img src="${esc(m.logo)}" alt="" width="28" height="28">` : ""}<span>${esc(m.nom)}</span></button>`).join("")}
          </div>
          <label class="champ-label" for="telPaiement">Ton numéro ${esc(moyen?.nom || "")}</label>
          <div class="champ-tel">
            <span class="indicatif">+${INDICATIFS_TEL[state.country] || ""}</span>
            <input type="tel" id="telPaiement" inputmode="tel" autocomplete="tel-national" placeholder="77 123 45 67" value="${esc(telephone)}">
          </div>`}
        </div>
      ` : c ? `
        <span class="champ-label">Payer avec</span>
        <div class="operateurs">
          ${c.paiement.map((m) => `<button class="operateur" data-operateur="${esc(m)}" aria-pressed="${m === operateur}">${esc(m)}</button>`).join("")}
        </div>
      ` : `
        <span class="champ-label">Ton pays, pour afficher tes moyens de paiement</span>
        ${puces(Object.entries(COUNTRIES).map(([k, v]) => [k, v.nom]), "", "pays")}
      `}
      <p class="rassure">${icone("juste")}<span>Valables toute l'année. <b>Aucun prélèvement automatique.</b> Quiz, révisions, duels et 1 exercice par jour restent gratuits.</span></p>
      <button class="btn btn-discret" id="parent">${icone("whatsapp")}Demander à un parent de payer</button>
      ${paiement === "demo" ? `<p class="demo">Démo : aucun paiement réel. Les crédits sont ajoutés directement.</p>` : ""}
      ${c && (paiement !== "dexpay" || moyen) ? `<div class="cta-fixe"><button class="btn btn-principal btn-large" id="payer">Payer ${prix(o.prix)} avec ${esc(paiement === "dexpay" ? moyen.nom : operateur)}</button></div>` : ""}`, "", true);

    $("#retour").addEventListener("click", () => render("home"));
    view.querySelectorAll("[data-offre]").forEach((b) => b.addEventListener("click", () => { choisie = b.dataset.offre; dessiner(); }));
    view.querySelectorAll("[data-operateur]").forEach((b) => b.addEventListener("click", () => { operateur = b.dataset.operateur; dessiner(); }));
    view.querySelectorAll("[data-moyen]").forEach((b) => b.addEventListener("click", () => { telephone = $("#telPaiement")?.value || telephone; moyen = moyens.find((m) => m.code === b.dataset.moyen); dessiner(); }));
    $("#telPaiement")?.addEventListener("input", (e) => { telephone = e.target.value; });
    lierPuces("pays", (v) => { state.country = v; save(); renderRecharge(contexte); });
    $("#payer")?.addEventListener("click", () => {
      if (paiement === "dexpay") {
        telephone = $("#telPaiement").value.trim();
        if (telephone.replace(/\D/g, "").length < 8) { toast("Écris ton numéro de téléphone."); $("#telPaiement").focus(); return; }
      }
      payer(o, operateur, moyen, telephone);
    });
    $("#parent").addEventListener("click", () => {
      const texte = `Bonjour, peux-tu m'acheter ${o.credits} crédits Révizo (${prix(o.prix)}) pour mes révisions ? ${location.origin}${location.pathname}`;
      window.open(`https://wa.me/?text=${encodeURIComponent(texte)}`, "_blank", "noopener");
    });
  };
  dessiner();
}

const INDICATIFS_TEL = { SN: "221", CI: "225", ML: "223", BF: "226", GN: "224", BJ: "229", TG: "228", NE: "227" };

function messagePaiement(texte) {
  afficher(`
    ${sankoDit("encourage", texte, 100)}
    <button class="btn btn-principal btn-large" id="recharge">Revenir aux offres</button>
    <button class="btn btn-large" id="accueil">Retour à l'accueil</button>`);
  $("#recharge").addEventListener("click", () => renderRecharge());
  $("#accueil").addEventListener("click", () => render("home"));
}

// Les opérateurs du pays (Wave, Orange Money…), demandés au serveur qui les tient de DexPay.
const moyensParPays = {};
async function moyensDuPays(code) {
  if (!moyensParPays[code]) {
    const r = await appelApi("api/moyens", { pays: code });
    if (!Array.isArray(r.moyens)) return null;
    moyensParPays[code] = r.moyens;
  }
  return moyensParPays[code];
}

// Paiement sans quitter Révizo : le serveur crée la commande et envoie la demande à l'opérateur.
// Wave renvoie un lien vers son appli ; Orange Money, MTN, Moov et Mixx envoient une demande à valider sur le téléphone.
async function payerDirect(offre, moyen, telephone) {
  renderAttente([`Je contacte ${moyen.nom}`], 8);
  const r = await appelApi("api/payer", { offre: offre.id, pays: state.country, operateur: moyen.code, telephone, nom: state.pseudo || "" });
  if (!r.reference) {
    messagePaiement(esc(r.erreur || "Le paiement n'a pas pu commencer. Réessaie dans un instant."));
    return;
  }
  attendreConfirmation({ ...r, offre, nomMoyen: moyen.nom });
}

// En attendant la confirmation de l'opérateur : le serveur est interrogé toutes les 4 secondes pendant 3 minutes.
// Les crédits ne viennent que de la confirmation de DexPay ; « Annuler » arrête seulement l'attente.
function attendreConfirmation({ reference, lien, offre, nomMoyen }) {
  let fini = false;
  afficher(`
    <div class="attente attente-paiement" role="status" aria-live="polite">
      ${sanko("encourage", 104, "sanko-flotte")}
      <h1 class="display-l">${lien ? `Paie avec ${esc(nomMoyen)}` : "Confirme sur ton téléphone"}</h1>
      <p>${lien
        ? `Touche le bouton : ${esc(nomMoyen)} s'ouvre sur le paiement de <b class="mono">${prix(offre.prix)}</b>. Valide, puis reviens ici.`
        : `Une demande de <b class="mono">${prix(offre.prix)}</b> arrive sur ton téléphone. Valide-la avec ton code secret ${esc(nomMoyen)}.`}</p>
      ${lien ? `<a class="btn btn-soleil btn-large" id="ouvrirLien" href="${esc(lien)}" target="_blank" rel="noopener">Ouvrir ${esc(nomMoyen)}</a>` : ""}
      <div class="attente-jauge" aria-hidden="true"><span style="animation-duration:180s"></span></div>
      <p class="petit" id="etatAttente">J'attends la confirmation…</p>
    </div>
    <button class="btn btn-large" id="annuler">Annuler</button>`, "", true);
  const arreter = () => { fini = true; };
  $("#annuler").addEventListener("click", () => {
    arreter();
    messagePaiement(`Attente arrêtée. Si tu valides quand même le paiement, tes crédits arriveront tout seuls.<br><span class="petit">Référence ${esc(reference)}</span>`);
  });
  const debut = Date.now();
  const verifier = async () => {
    if (fini) return;
    const etat = await appelApi("api/commande", { reference });
    if (fini) return;
    if (typeof etat.credits === "number") { state.credits = etat.credits; save(); majBarre(); }
    if (etat.statut === "payee") { arreter(); afficherRecu(etat, reference); return; }
    if (etat.statut === "echouee") { arreter(); messagePaiement(`Le paiement n'a pas abouti, aucun crédit n'a été ajouté.<br><span class="petit">Référence ${esc(reference)}</span>`); return; }
    if (Date.now() - debut > 180000) {
      arreter();
      messagePaiement(`Pas encore de confirmation. Si tu as validé, tes crédits arriveront tout seuls dans quelques minutes.<br><span class="petit">Référence ${esc(reference)}</span>`);
      return;
    }
    setTimeout(verifier, 4000);
  };
  setTimeout(verifier, 4000);
}

// Retour de la page de paiement (?paiement=ok|echec&ref=…). L'adresse ne prouve rien :
// on demande au serveur, qui vérifie chez DexPay, et on attend jusqu'à 30 secondes la confirmation.
function lireRetourPaiement() {
  const p = new URLSearchParams(location.search);
  const reference = p.get("ref");
  if (!p.get("paiement") || !reference) return null;
  history.replaceState(null, "", location.pathname);
  return { reference, annule: p.get("paiement") === "echec" };
}

// Après une annulation, une seule vérification : DexPay garde le paiement ouvert 24 h,
// et les crédits arriveront tout seuls si l'élève paie finalement.
function afficherRecu(etat, reference) {
  son("fin");
  confettis();
  afficher(`
    <h1 class="display-l">Paiement reçu</h1>
    <section class="carte carte-reponse">
      <h2 class="carte-titre">${icone("juste")}+${etat.credits_achetes} crédits</h2>
      <div class="recu">Référence  ${esc(reference)}\nMontant    ${prix(etat.montant)}\nSolde      ${pluriel(state.credits, "crédit")}</div>
    </section>
    <button class="btn btn-principal btn-large" id="exercice">${icone("photo")}Prendre un exercice en photo</button>
    <button class="btn btn-large" id="accueil">Retour à l'accueil</button>`);
  $("#exercice").addEventListener("click", () => $("#photoInput").click());
  $("#accueil").addEventListener("click", () => render("home"));
}

async function renderRetourPaiement({ reference, annule }) {
  renderAttente(["Je vérifie ton paiement"], annule ? 4 : 30);
  let etat = null;
  for (let essai = 0; essai < (annule ? 1 : 10); essai += 1) {
    etat = await appelApi("api/commande", { reference });
    if (etat.statut !== "en_attente") break;
    await new Promise((ok) => setTimeout(ok, 3000));
  }
  if (typeof etat?.credits === "number") { state.credits = etat.credits; save(); majBarre(); }
  if (etat?.statut === "payee") {
    afficherRecu(etat, reference);
    return;
  }
  if (etat?.statut === "en_attente" && annule) {
    messagePaiement(`Paiement annulé : aucun crédit n'a été ajouté, et rien n'a été retiré.<br><span class="petit">Référence ${esc(reference)}</span>`);
    return;
  }
  if (etat?.statut === "en_attente") {
    messagePaiement(`Ton paiement est en cours de vérification. Tes crédits arriveront tout seuls dès qu'il sera confirmé.<br><span class="petit">Référence ${esc(reference)}</span>`);
    return;
  }
  messagePaiement(`Le paiement n'a pas abouti, aucun crédit n'a été ajouté. Si de l'argent a quand même été retiré, garde cette référence et écris-nous.<br><span class="petit">Référence ${esc(reference)}</span>`);
}

function payer(offre, operateur, moyen, telephone) {
  if (paiement === "dexpay") {
    payerDirect(offre, moyen, telephone);
    return;
  }
  if (paiement === "bientot") {
    afficher(`
      ${sankoDit("encourage", `Le paiement par ${esc(operateur)} arrive très bientôt. En attendant, ton exercice offert revient chaque jour.`, 100)}
      <button class="btn btn-large" id="accueil">Retour à l'accueil</button>`);
    $("#accueil").addEventListener("click", () => render("home"));
    return;
  }
  let reste = 60;
  afficher(`
    <div class="attente" role="status" aria-live="polite">
      <h1 class="display-l">Confirme sur ton téléphone</h1>
      <p>Tu vas recevoir une demande ${esc(operateur)} de <b class="mono">${prix(offre.prix)}</b>. Valide-la avec ton code secret.</p>
      <p class="petit" id="decompte">Temps restant : ${reste} s</p>
    </div>
    <button class="btn btn-large" id="annuler">Annuler</button>`, "", true);
  const arreter = () => { clearInterval(tick); clearTimeout(confirmation); };
  const tick = setInterval(() => {
    reste -= 1;
    if (reste > 0) { $("#decompte").textContent = `Temps restant : ${reste} s`; return; }
    arreter();
    afficher(`
      ${sankoDit("encourage", "Le temps est écoulé et rien n'a été payé. Tu peux réessayer quand tu veux.", 100)}
      <button class="btn btn-principal btn-large" id="reessayer">Réessayer</button>
      <button class="btn btn-large" id="accueil">Retour à l'accueil</button>`);
    $("#reessayer").addEventListener("click", () => renderRecharge());
    $("#accueil").addEventListener("click", () => render("home"));
  }, 1000);
  $("#annuler").addEventListener("click", () => { arreter(); son("tap"); renderRecharge(); });
  // Démo : la confirmation de l'opérateur arrive au bout de 3 secondes.
  const confirmation = setTimeout(async () => {
    arreter();
    const r = await appelApi("api/achat-demo", { offre: offre.id });
    if (typeof r.credits === "number") state.credits = r.credits;
    else state.credits += offre.credits;
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
  const nomPays = () => COUNTRIES[state.country]?.nom || "À choisir";
  const sousTitre = () => [state.classe, COUNTRIES[state.country]?.nom].filter(Boolean).join(" · ") || "Choisis ta classe et ton pays";
  const avatar = () => state.pseudo ? `<span class="avatar-lettre">${esc(state.pseudo[0].toUpperCase())}</span>` : sanko("content", 56);
  afficher(`
    <section class="profil-tete">
      <div class="avatar" id="avatar">${avatar()}</div>
      <div class="grow">
        <h1 class="display-l" id="nomProfil">${esc(state.pseudo) || "Mon profil"}</h1>
        <p class="petit" id="sousProfil">${esc(sousTitre())}</p>
      </div>
    </section>

    <div class="stats stats-profil">
      <div class="stat stat-orange">${icone("flamme")}<b>${state.streak}</b><span class="petit">${state.streak > 1 ? "jours" : "jour"} de série</span></div>
      <div class="stat stat-vert">${icone("juste")}<b>${taux} %</b><span class="petit">de réussite aux quiz</span></div>
      <div class="stat stat-violet">${icone("photo")}<b>${state.exosFaits}</b><span class="petit">${state.exosFaits > 1 ? "exercices expliqués" : "exercice expliqué"}</span></div>
      <div class="stat stat-bleu">${icone("etincelle")}<b>${maitrisees}</b><span class="petit">${maitrisees > 1 ? "notions maîtrisées" : "notion maîtrisée"}</span></div>
    </div>

    <section class="carte carte-credits">
      <span class="credits-ico">${icone("piece")}</span>
      <div class="grow">
        <b class="credits-solde">${pluriel(state.credits, "crédit")}</b>
        <span class="petit">+1 offert chaque jour</span>
      </div>
      <button class="btn btn-soleil" id="recharger">Recharger</button>
    </section>

    <section class="carte">
      <div class="carte-entete"><span class="etiquette">Ta semaine</span>${state.gels ? `<span class="petit">${pluriel(state.gels, "jour")} de repos en réserve</span>` : ""}</div>
      ${calendrierSemaine()}
    </section>

    <h2 class="titre section-titre">Mes infos</h2>
    <div class="reglages">
      <label class="reglage-ligne" for="pseudo">
        <span class="reglage-nom">Prénom</span>
        <input type="text" id="pseudo" value="${esc(state.pseudo)}" placeholder="Pour les duels" maxlength="20" autocomplete="given-name">
      </label>
      <details class="reglage" id="reglagePays">
        <summary class="reglage-ligne"><span class="reglage-nom">Pays</span><span class="reglage-valeur" id="valeurPays">${esc(nomPays())}</span>${icone("chevron", "ico chevron")}</summary>
        <p class="petit">Je corrige comme ton correcteur d'examen.</p>
        <div class="grille-choix">${Object.entries(COUNTRIES).map(([k, v]) => `<button class="puce" data-pays="${k}" aria-pressed="${state.country === k}">${esc(v.nom)}</button>`).join("")}</div>
      </details>
      <details class="reglage" id="reglageClasse">
        <summary class="reglage-ligne"><span class="reglage-nom">Classe</span><span class="reglage-valeur" id="valeurClasse">${esc(state.classe || "À choisir")}</span>${icone("chevron", "ico chevron")}</summary>
        <p class="petit">Tes quiz s'adaptent à ton niveau.</p>
        <div class="grille-choix">${CLASSES.map((c) => `<button class="puce" data-classe="${esc(c)}" aria-pressed="${state.classe === c}">${esc(c)}</button>`).join("")}</div>
      </details>
    </div>

    <h2 class="titre section-titre">Réglages</h2>
    <div class="reglages">
      <div class="reglage-ligne reglage-bloc">
        <span class="reglage-nom">Affichage</span>
        <div class="segments" role="group" aria-label="Affichage">
          ${[["cahier", "Clair"], ["ardoise", "Sombre"], ["auto", "Auto"]].map(([k, nom]) => `<button class="segment" data-affichage="${k}" aria-pressed="${state.theme === k}">${nom}</button>`).join("")}
        </div>
      </div>
      <div class="reglage-ligne">
        <span class="reglage-nom">Sons et vibrations</span>
        <button class="interrupteur" id="sons" role="switch" aria-checked="${state.sons}" aria-label="Sons et vibrations"><span></span></button>
      </div>
      ${appliInstallee() ? "" : `
      <button class="reglage-ligne reglage-bouton" id="installerProfil">
        <span class="reglage-nom">Installer l'appli sur mon téléphone</span>${icone("chevron", "ico chevron")}
      </button>`}
    </div>

    <details class="reglage reglage-seul">
      <summary class="reglage-ligne"><span class="reglage-nom">Qui est Lumi ?</span>${icone("chevron", "ico chevron")}</summary>
      <div class="histoire">
        ${sanko("fier", 64)}
        <div>
          <p>Lumi est un petit oiseau soleil : il éclaire ce que tu n'as pas compris. Il s'inspire de <b>Sankofa</b>, l'oiseau des symboles adinkra qui se retourne pour reprendre l'œuf laissé derrière lui.</p>
          <blockquote>« Il n'est jamais interdit de revenir chercher ce que tu as oublié. »</blockquote>
          <p class="petit">C'est ce qu'il fait pour toi : il te ramène tes erreurs au bon moment.</p>
        </div>
      </div>
    </details>`, "profil");

  const majTete = () => {
    $("#nomProfil").textContent = state.pseudo || "Mon profil";
    $("#sousProfil").textContent = sousTitre();
    $("#avatar").innerHTML = avatar();
  };
  $("#pseudo").addEventListener("change", (e) => { state.pseudo = e.target.value.trim(); save(); majTete(); toast("Prénom enregistré"); });
  lierPuces("pays", (v) => {
    state.country = v; save(); son("tap");
    $("#valeurPays").textContent = nomPays(); majTete();
    $("#reglagePays").open = false;
  });
  lierPuces("classe", (v) => {
    state.classe = v; save(); son("tap");
    $("#valeurClasse").textContent = v; majTete();
    $("#reglageClasse").open = false;
  });
  lierPuces("affichage", (v) => { state.theme = v; state.themeChoisi = true; save(); appliquerTheme(); });
  $("#sons").addEventListener("click", (e) => {
    state.sons = !state.sons; save();
    e.currentTarget.setAttribute("aria-checked", String(state.sons));
    son("tap");
  });
  $("#recharger").addEventListener("click", () => renderRecharge());
  $("#installerProfil")?.addEventListener("click", installerAppli);
}

// ---------- Bienvenue (premier lancement) ----------

// Trois petites étapes : la classe, le pays, puis le prénom.
function renderBienvenue(etape = 1, choisirPays = false) {
  const points = `<div class="points-etapes" aria-label="Étape ${etape} sur 3">${[1, 2, 3].map((k) => `<span class="${k <= etape ? "fait" : ""}"></span>`).join("")}</div>`;
  const entete = etape === 1 ? points : `
    <div class="entete-flux">
      <button class="btn btn-discret" id="retour" aria-label="Étape précédente">${icone("retour")}</button>
      ${points}
    </div>`;
  const suivante = () => setTimeout(() => renderBienvenue(etape + 1), 180);

  if (etape === 1) {
    afficher(`
      ${entete}
      <div class="bienvenue">
        ${sanko("joie", 104, "sanko-flotte")}
        <h1 class="display-l">Bienvenue sur Révizo !</h1>
        <p class="salut-message">Moi c'est Lumi. Pour commencer, tu es en quelle classe ?</p>
      </div>
      <div class="grille-choix">
        ${CLASSES.map((c) => `<button class="puce" data-classe="${esc(c)}" aria-pressed="${state.classe === c}">${esc(c)}</button>`).join("")}
      </div>`, "", true);
    lierPuces("classe", (v) => { state.classe = v; save(); son("tap"); suivante(); });
    return;
  }

  // Le pays deviné se confirme d'un geste ; sinon, ou si l'élève veut changer, la liste des 8 pays.
  if (etape === 2 && pays() && !choisirPays) {
    afficher(`
      ${entete}
      <div class="bienvenue">
        ${sanko("joie", 96, "sanko-flotte")}
        <h1 class="display-l">Tu es ${esc(auPays(state.country))} ?</h1>
        <p class="salut-message">Je corrigerai comme ton correcteur d'examen.</p>
      </div>
      <div class="cta-fixe">
        <button class="btn btn-soleil btn-large" id="paysOui">Oui, ${esc(pays().nom)}</button>
        <button class="btn btn-large" id="paysNon">Non, je change</button>
      </div>`, "", true);
    $("#retour").addEventListener("click", () => renderBienvenue(1));
    $("#paysOui").addEventListener("click", () => { son("tap"); suivante(); });
    $("#paysNon").addEventListener("click", () => renderBienvenue(2, true));
    return;
  }

  if (etape === 2) {
    afficher(`
      ${entete}
      <div class="bienvenue">
        ${sanko("content", 80)}
        <h1 class="display-l">Tu es dans quel pays ?</h1>
        <p class="salut-message">Je corrigerai comme ton correcteur d'examen.</p>
      </div>
      <div class="grille-choix">
        ${Object.entries(COUNTRIES).map(([k, v]) => `<button class="puce" data-pays="${k}" aria-pressed="${state.country === k}">${esc(v.nom)}</button>`).join("")}
      </div>`, "", true);
    $("#retour").addEventListener("click", () => renderBienvenue(1));
    lierPuces("pays", (v) => { state.country = v; save(); son("tap"); suivante(); });
    return;
  }

  afficher(`
    ${entete}
    <div class="bienvenue">
      ${sanko("encourage", 80)}
      <h1 class="display-l">Comment tu t'appelles ?</h1>
      <p class="salut-message">C'est le nom que verront tes amis quand tu les défies.</p>
    </div>
    <label class="champ-label" for="pseudoBienvenue">Ton prénom</label>
    <input type="text" id="pseudoBienvenue" maxlength="20" placeholder="Ex. Awa" value="${esc(state.pseudo)}" autocomplete="given-name" enterkeyhint="go">
    <div class="cta-fixe">
      <button class="btn btn-soleil btn-large" id="cestParti" disabled>C'est parti !</button>
    </div>`, "", true);
  const champ = $("#pseudoBienvenue");
  const pret = () => champ.value.trim().length >= 2;
  const maj = () => { $("#cestParti").disabled = !pret(); };
  const valider = () => {
    if (!pret()) return;
    state.pseudo = champ.value.trim();
    state.bienvenue = true;
    // Un nouvel élève passe d'abord par le premier contact : un seul geste, son exercice.
    if (state.exosFaits === 0 && !state.decouverte) state.decouverte = "en_cours";
    save();
    son("tap");
    render("home");
  };
  maj();
  champ.focus({ preventScroll: true });
  champ.addEventListener("input", maj);
  champ.addEventListener("keydown", (e) => { if (e.key === "Enter") valider(); });
  $("#retour").addEventListener("click", () => renderBienvenue(2));
  $("#cestParti").addEventListener("click", valider);
}

// ---------- Navigation ----------

function render(name) {
  session = null;
  // Un élève arrivé par un lien de duel n'a pas encore vu l'accueil : on lui demande d'abord classe, pays et prénom.
  if (!state.bienvenue && !(state.country && state.classe && state.pseudo)) renderBienvenue();
  else if (name === "reviser") renderReviser();
  else if (name === "profil") renderProfil();
  else if (state.decouverte === "en_cours") renderPremierContact();
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

document.querySelector(".logo").innerHTML = LOGO_REVIZO;
appliquerTheme();
// « demo » sur l'ordinateur du développeur, « bientot » en ligne tant que le vrai paiement n'est pas branché.
let paiement = "demo";
async function syncCompte() {
  const r = await appelApi("api/compte", {});
  if (r.paiement) paiement = r.paiement;
  if (typeof r.credits !== "number") return;
  state.credits = r.credits;
  save();
  majBarre();
}

refillDaily();
majBarre();
syncCompte();
const demandeInstall = new URLSearchParams(location.search).has("installer");
if (demandeInstall) history.replaceState(null, "", location.pathname);
const retourPaiement = lireRetourPaiement();
const duelRecu = lireDuel();
if (retourPaiement) renderRetourPaiement(retourPaiement);
else if (duelRecu) demarrerQuiz("duel", duelRecu);
else render("home");
// Laisse au navigateur le temps de proposer son invitation (Android) avant d'ouvrir les étapes.
if (demandeInstall) setTimeout(installerAppli, 1200);

if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("sw.js").catch(() => {});
}
