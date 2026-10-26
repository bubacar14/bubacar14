// Révizo : prototype de « Higgsfield de la révision » pour l'Afrique de l'Ouest.
// Tout est local (localStorage). Les paiements et le classement sont simulés.

const COUNTRIES = {
  SN: { nom: "Sénégal", flag: "🇸🇳", brevet: "BFEM", devise: "FCFA", taux: 1, villes: ["Dakar", "Thiès", "Saint-Louis", "Kaolack", "Ziguinchor"], paiement: ["Wave", "Orange Money", "Free Money"] },
  CI: { nom: "Côte d'Ivoire", flag: "🇨🇮", brevet: "BEPC", devise: "FCFA", taux: 1, villes: ["Abidjan", "Bouaké", "Yamoussoukro", "Daloa", "San-Pédro"], paiement: ["Wave", "Orange Money", "MTN MoMo", "Moov Money"] },
  ML: { nom: "Mali", flag: "🇲🇱", brevet: "DEF", devise: "FCFA", taux: 1, villes: ["Bamako", "Sikasso", "Ségou", "Kayes", "Mopti"], paiement: ["Orange Money", "Moov Money", "Wave"] },
  BF: { nom: "Burkina Faso", flag: "🇧🇫", brevet: "BEPC", devise: "FCFA", taux: 1, villes: ["Ouagadougou", "Bobo-Dioulasso", "Koudougou", "Ouahigouya", "Banfora"], paiement: ["Orange Money", "Moov Money", "Wave"] },
  GN: { nom: "Guinée", flag: "🇬🇳", brevet: "BEPC", devise: "GNF", taux: 15, villes: ["Conakry", "Kankan", "Labé", "Nzérékoré", "Kindia"], paiement: ["Orange Money", "MTN MoMo"] },
  BJ: { nom: "Bénin", flag: "🇧🇯", brevet: "BEPC", devise: "FCFA", taux: 1, villes: ["Cotonou", "Porto-Novo", "Parakou", "Abomey-Calavi", "Djougou"], paiement: ["MTN MoMo", "Moov Money"] },
  TG: { nom: "Togo", flag: "🇹🇬", brevet: "BEPC", devise: "FCFA", taux: 1, villes: ["Lomé", "Sokodé", "Kara", "Atakpamé", "Kpalimé"], paiement: ["TMoney", "Moov Money"] },
  NE: { nom: "Niger", flag: "🇳🇪", brevet: "BEPC", devise: "FCFA", taux: 1, villes: ["Niamey", "Zinder", "Maradi", "Agadez", "Tahoua"], paiement: ["Airtel Money", "Moov Money"] },
};

// Prix de base en FCFA, convertis pour les autres devises.
const PACKS = [
  { id: "jour", nom: "Recharge", credits: 30, prix: 100 },
  { id: "semaine", nom: "Semaine", credits: 150, prix: 300 },
  { id: "mois", nom: "Mois", credits: 700, prix: 1000 },
  { id: "examen", nom: "Pass Examen", credits: 3500, prix: 4000 },
];

const DAILY_FREE = 10;
const QUIZ_COST = 5;
const QUIZ_LEN = 5;
const BOX_DAYS = [0, 1, 3, 7, 15]; // répétition espacée : délai avant de revoir une question

const STUDIOS = [
  { id: "tous", nom: "Tous", filtre: () => true },
  { id: "bacS", nom: "BAC S", filtre: (q) => q.niveau === "bac" && ["Maths", "PC", "SVT"].includes(q.matiere) },
  { id: "bacL", nom: "BAC L", filtre: (q) => q.niveau === "bac" && ["Philo", "Français", "Histoire-Géo"].includes(q.matiere) },
  { id: "brevet", nom: "Brevet", filtre: (q) => q.niveau === "brevet" },
];

const PRESETS = [
  { id: "quiz", nom: "Quiz Express", desc: "5 questions, 2 minutes", emoji: "⚡", bg: "linear-gradient(160deg,#ff7a18,#af002d)", live: true },
  { id: "revoir", nom: "Mes erreurs", desc: "Ce que tu dois revoir aujourd'hui", emoji: "🔁", bg: "linear-gradient(160deg,#00c6ff,#0072ff)", live: true },
  { id: "duel", nom: "Duel", desc: "Défie un ami sur les mêmes questions", emoji: "⚔️", bg: "linear-gradient(160deg,#f7971e,#ffd200)", live: true },
  { id: "photo", nom: "Où j'ai faux ?", desc: "Photo de ta copie de maths", emoji: "📸", bg: "linear-gradient(160deg,#8e2de2,#4a00e0)" },
  { id: "copie", nom: "Copie Rouge", desc: "Ta dissertation annotée", emoji: "📝", bg: "linear-gradient(160deg,#e52d27,#b31217)" },
  { id: "podcast", nom: "Podcast du cahier", desc: "Ta leçon en audio", emoji: "🎧", bg: "linear-gradient(160deg,#11998e,#38ef7d)" },
  { id: "oral", nom: "Jury oral", desc: "Simulation du 2nd groupe", emoji: "🎤", bg: "linear-gradient(160deg,#fc466b,#3f5efb)" },
  { id: "fiches", nom: "Fiches du cahier", desc: "Photo, puis flashcards", emoji: "🧠", bg: "linear-gradient(160deg,#614385,#516395)" },
];

// ---------- État ----------

const STORE_KEY = "revizo:v1";

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

function loadState() {
  try {
    const s = JSON.parse(localStorage.getItem(STORE_KEY));
    if (s) return s;
  } catch (e) { /* stockage indisponible : on repart de zéro */ }
  return { country: null, ville: null, credits: DAILY_FREE, lastRefill: today(), streak: 0, lastPlayed: null, cards: {}, answered: 0, good: 0, points: 0, studio: "tous" };
}
function save() {
  try { localStorage.setItem(STORE_KEY, JSON.stringify(state)); } catch (e) { /* ignoré */ }
}

let state = loadState();
let session = null; // quiz en cours

function refillDaily() {
  if (state.lastRefill !== today()) {
    state.credits = Math.max(state.credits, DAILY_FREE);
    state.lastRefill = today();
    save();
  }
}

// ---------- Utilitaires ----------

const $ = (sel) => document.querySelector(sel);
const view = $("#view");
const modal = $("#modal");

function esc(s) {
  return String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
}
function toast(msg) {
  const t = document.createElement("div");
  t.className = "toast";
  t.textContent = msg;
  document.body.appendChild(t);
  setTimeout(() => t.remove(), 2200);
}
function country() { return COUNTRIES[state.country] || COUNTRIES.SN; }
function price(fcfa) {
  const c = country();
  return `${(fcfa * c.taux).toLocaleString("fr-FR")} ${c.devise}`;
}
function shuffle(arr) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
function matiereLabel(m) {
  return m === "PC" ? "Physique-Chimie" : m;
}

function updateTopbar() {
  $("#creditsVal").textContent = state.credits;
  $("#countryChip").textContent = state.country ? `${country().flag} ${state.country}` : "🌍";
}

function setActiveTab(name) {
  document.querySelectorAll(".tab").forEach((t) => t.classList.toggle("active", t.dataset.go === name));
}

// ---------- Choix du pays ----------

function openCountryPicker() {
  modal.innerHTML = `
    <h2 style="margin-top:0">Tu es dans quel pays ?</h2>
    <div class="list">
      ${Object.entries(COUNTRIES).map(([code, c]) => `
        <button class="pack" data-country="${code}">
          <span>${c.flag} ${esc(c.nom)}</span><span class="muted">BAC · ${c.brevet}</span>
        </button>`).join("")}
    </div>`;
  modal.querySelectorAll("[data-country]").forEach((b) => b.addEventListener("click", () => {
    state.country = b.dataset.country;
    state.ville = country().villes[0];
    save();
    modal.close();
    updateTopbar();
    render("home");
    if (pendingDuel) { startPreset("duel", pendingDuel); pendingDuel = null; }
  }));
  modal.showModal();
}

// ---------- Recharge (simulée) ----------

function openRecharge() {
  const c = country();
  modal.innerHTML = `
    <h2 style="margin-top:0">Recharger mes crédits ⚡</h2>
    <p class="muted">Tu as ${state.credits} crédits. Un quiz coûte ${QUIZ_COST} crédits. ${DAILY_FREE} crédits sont offerts chaque jour.</p>
    ${PACKS.map((p) => `
      <button class="pack" data-pack="${p.id}">
        <span><b>${p.nom}</b><br><span class="muted">${p.credits} crédits</span></span>
        <b>${price(p.prix)}</b>
      </button>`).join("")}
    <div class="pay">${c.paiement.map((m) => `<span>${esc(m)}</span>`).join("")}</div>
    <p class="muted" style="font-size:12px">Démo : aucun paiement réel, les crédits sont ajoutés directement.</p>
    <button class="btn ghost" id="closeModal">Fermer</button>`;
  modal.querySelectorAll("[data-pack]").forEach((b) => b.addEventListener("click", () => {
    const p = PACKS.find((x) => x.id === b.dataset.pack);
    state.credits += p.credits;
    save();
    updateTopbar();
    modal.close();
    toast(`+${p.credits} crédits ajoutés`);
  }));
  $("#closeModal").addEventListener("click", () => modal.close());
  modal.showModal();
}

// ---------- Accueil ----------

function dueCards() {
  const t = today();
  return Object.entries(state.cards).filter(([, c]) => c.due <= t).map(([id]) => id);
}

function renderHome() {
  const c = country();
  const due = dueCards().length;
  view.innerHTML = `
    <div class="hero">
      <div class="streak">🔥 ${state.streak} jour${state.streak > 1 ? "s" : ""} d'affilée</div>
      <h1>Réviser le BAC et le ${c.brevet}, en jouant.</h1>
      <div class="muted" style="color:#e8e8ff">${due ? `${due} question${due > 1 ? "s" : ""} à revoir aujourd'hui` : "Lance ton quiz du jour"}</div>
    </div>

    <h2>Studios</h2>
    <div class="studios">
      ${STUDIOS.map((s) => `<button class="studio ${state.studio === s.id ? "active" : ""}" data-studio="${s.id}">${s.id === "brevet" ? c.brevet : s.nom}</button>`).join("")}
    </div>

    <h2>Presets</h2>
    <div class="grid">
      ${PRESETS.map((p) => `
        <button class="tile ${p.live ? "" : "soon"}" style="background:${p.bg}" data-preset="${p.id}">
          <span class="emoji">${p.emoji}</span>
          <span class="tag ${p.live ? "live" : ""}">${p.live ? `${QUIZ_COST} ⚡` : "Bientôt"}</span>
          <span class="name">${p.nom}</span>
          <span class="desc">${p.desc}</span>
        </button>`).join("")}
    </div>`;

  view.querySelectorAll("[data-studio]").forEach((b) => b.addEventListener("click", () => {
    state.studio = b.dataset.studio;
    save();
    renderHome();
  }));
  view.querySelectorAll("[data-preset]").forEach((b) => b.addEventListener("click", () => startPreset(b.dataset.preset)));
}

// ---------- Quiz ----------

function pickQuestions(mode) {
  const studio = STUDIOS.find((s) => s.id === state.studio) || STUDIOS[0];
  const pool = QUESTIONS.filter(studio.filtre);
  const due = new Set(dueCards());
  if (mode === "revoir") {
    return shuffle(pool.filter((q) => due.has(q.id))).slice(0, QUIZ_LEN);
  }
  // D'abord les questions à revoir, puis les nouvelles, puis le reste.
  const dueQs = shuffle(pool.filter((q) => due.has(q.id)));
  const fresh = shuffle(pool.filter((q) => !state.cards[q.id]));
  const rest = shuffle(pool.filter((q) => state.cards[q.id] && !due.has(q.id)));
  return [...dueQs, ...fresh, ...rest].slice(0, QUIZ_LEN);
}

function startPreset(id, duel) {
  const preset = PRESETS.find((p) => p.id === id);
  if (preset && !preset.live) {
    toast(`« ${preset.nom} » arrive bientôt`);
    return;
  }
  if (state.credits < QUIZ_COST) {
    openRecharge();
    return;
  }
  let qs;
  if (duel) {
    qs = duel.ids.map((qid) => QUESTIONS.find((q) => q.id === qid)).filter(Boolean);
  } else {
    qs = pickQuestions(id);
    if (!qs.length) {
      toast(id === "revoir" ? "Rien à revoir aujourd'hui 🎉" : "Pas de questions dans ce studio");
      return;
    }
  }
  state.credits -= QUIZ_COST;
  save();
  updateTopbar();
  session = { mode: id, qs, i: 0, score: 0, duel: duel || null };
  renderQuestion();
}

function renderQuestion() {
  const { qs, i } = session;
  const q = qs[i];
  // Mélange des choix en gardant la trace de la bonne réponse.
  const order = shuffle(q.choix.map((_, k) => k));
  view.innerHTML = `
    <div class="progress"><div style="width:${(i / qs.length) * 100}%"></div></div>
    <div class="qmeta"><span>${esc(matiereLabel(q.matiere))} · ${q.niveau === "bac" ? "BAC" : country().brevet}</span><span>${i + 1}/${qs.length}</span></div>
    <div class="question">${esc(q.q)}</div>
    <div class="choices">
      ${order.map((k) => `<button class="choice" data-k="${k}">${esc(q.choix[k])}</button>`).join("")}
    </div>
    <div id="after"></div>`;
  view.querySelectorAll(".choice").forEach((b) => b.addEventListener("click", () => answer(Number(b.dataset.k))));
}

function answer(k) {
  const q = session.qs[session.i];
  const ok = k === q.bonne;
  view.querySelectorAll(".choice").forEach((b) => {
    const bk = Number(b.dataset.k);
    b.disabled = true;
    if (bk === q.bonne) b.classList.add("good");
    else if (bk === k) b.classList.add("bad");
  });

  // Répétition espacée (boîtes de Leitner) : bonne réponse = boîte suivante, erreur = retour à zéro.
  const card = state.cards[q.id] || { box: 0 };
  card.box = ok ? Math.min(card.box + 1, BOX_DAYS.length - 1) : 0;
  card.due = addDays(today(), ok ? BOX_DAYS[card.box] : 1);
  state.cards[q.id] = card;
  state.answered += 1;
  if (ok) { state.good += 1; session.score += 1; }
  save();

  const last = session.i === session.qs.length - 1;
  $("#after").innerHTML = `
    <div class="explain">${ok ? "✅ Bonne réponse !" : "❌ Pas tout à fait."} ${esc(q.explication)}
      ${ok ? "" : '<div class="muted" style="margin-top:6px">Cette question reviendra demain.</div>'}
    </div>
    <button class="btn" id="next">${last ? "Voir mon score" : "Suivante"}</button>`;
  $("#next").addEventListener("click", () => {
    if (last) finishQuiz();
    else { session.i += 1; renderQuestion(); }
  });
}

function finishQuiz() {
  const { score, qs, duel } = session;
  const t = today();
  if (state.lastPlayed !== t) {
    state.streak = state.lastPlayed && daysBetween(state.lastPlayed, t) === 1 ? state.streak + 1 : 1;
    state.lastPlayed = t;
  }
  state.points += score * 10 + (score === qs.length ? 20 : 0);
  save();

  let duelLine = "";
  if (duel) {
    duelLine = score > duel.score ? `🏆 Tu bats ${esc(duel.nom)} (${duel.score}/${qs.length}) !`
      : score === duel.score ? `🤝 Égalité avec ${esc(duel.nom)}.`
      : `😅 ${esc(duel.nom)} gagne avec ${duel.score}/${qs.length}. Revanche ?`;
  }

  view.innerHTML = `
    <div class="score-big">${score}/${qs.length}</div>
    <p class="center muted">${score === qs.length ? "Parfait ! +20 points bonus" : score >= qs.length / 2 ? "Bien joué, continue !" : "Les questions ratées reviendront demain."}</p>
    ${duelLine ? `<p class="center" style="font-weight:700">${duelLine}</p>` : ""}
    <p class="center">🔥 ${state.streak} jour${state.streak > 1 ? "s" : ""} d'affilée · ${state.points} points</p>
    <button class="btn" id="challenge">⚔️ Défier un ami</button>
    <button class="btn ghost" id="shareImg">📤 Partager mon score</button>
    <button class="btn ghost" id="again">Rejouer</button>`;
  $("#challenge").addEventListener("click", () => shareDuel(qs, score));
  $("#shareImg").addEventListener("click", () => shareScoreImage(score, qs.length));
  $("#again").addEventListener("click", () => startPreset("quiz"));
  session = null;
}

// ---------- Partage (boucle virale) ----------

function shareDuel(qs, score) {
  const nom = state.pseudo || "Un ami";
  const url = `${location.origin}${location.pathname}#duel=${qs.map((q) => q.id).join(",")}&s=${score}&n=${encodeURIComponent(nom)}`;
  const text = `J'ai eu ${score}/${qs.length} sur Révizo. Tu fais mieux ? ⚔️`;
  if (navigator.share) {
    navigator.share({ title: "Duel Révizo", text, url }).catch(() => {});
  } else {
    navigator.clipboard?.writeText(`${text} ${url}`);
    toast("Lien du duel copié");
  }
}

function shareScoreImage(score, total) {
  const W = 1080, H = 1350;
  const cv = document.createElement("canvas");
  cv.width = W; cv.height = H;
  const g = cv.getContext("2d");
  const grad = g.createLinearGradient(0, 0, W, H);
  grad.addColorStop(0, "#2b1055");
  grad.addColorStop(1, "#7597de");
  g.fillStyle = grad;
  g.fillRect(0, 0, W, H);
  g.fillStyle = "#fff";
  g.textAlign = "center";
  g.font = "bold 80px system-ui, sans-serif";
  g.fillText("Révizo", W / 2, 180);
  g.font = "900 320px system-ui, sans-serif";
  g.fillText(`${score}/${total}`, W / 2, 680);
  g.font = "bold 60px system-ui, sans-serif";
  g.fillText(`🔥 ${state.streak} jours d'affilée`, W / 2, 860);
  g.font = "48px system-ui, sans-serif";
  g.fillText(`${country().flag} Je révise le BAC et le ${country().brevet}`, W / 2, 980);
  g.fillStyle = "#c6ff3d";
  g.font = "bold 52px system-ui, sans-serif";
  g.fillText("Tu fais mieux ? Joue sur Révizo", W / 2, 1180);

  cv.toBlob((blob) => {
    const file = new File([blob], "revizo-score.png", { type: "image/png" });
    if (navigator.canShare && navigator.canShare({ files: [file] })) {
      navigator.share({ files: [file], title: "Mon score Révizo" }).catch(() => {});
    } else {
      const a = document.createElement("a");
      a.href = URL.createObjectURL(blob);
      a.download = "revizo-score.png";
      a.click();
      toast("Image téléchargée");
    }
  });
}

function readDuelFromHash() {
  const m = location.hash.match(/^#duel=([^&]+)&s=(\d+)&n=(.*)$/);
  if (!m) return null;
  history.replaceState(null, "", location.pathname);
  return { ids: m[1].split(","), score: Number(m[2]), nom: decodeURIComponent(m[3]) };
}

// ---------- Classement (démo) ----------

function renderLeaderboard() {
  const c = country();
  const prenoms = ["Awa", "Moussa", "Fatou", "Ibrahim", "Aïcha", "Kofi", "Mariam", "Seydou", "Adjoua", "Oumar"];
  // Joueurs de démonstration, points fixes pour que le classement reste stable.
  const demo = prenoms.map((p, i) => ({ nom: `${p} · ${c.villes[i % c.villes.length]}`, points: 900 - i * 85 }));
  const me = { nom: `${state.pseudo || "Toi"} · ${state.ville || c.villes[0]}`, points: state.points, me: true };
  const rows = [...demo, me].sort((a, b) => b.points - a.points);
  view.innerHTML = `
    <h1>Classement ${c.flag}</h1>
    <p class="muted">Cette semaine · ${esc(c.nom)} (joueurs de démonstration)</p>
    <div class="list">
      ${rows.map((r, i) => `
        <div class="row ${r.me ? "me" : ""}">
          <span class="rank">${i + 1}</span><span class="grow">${esc(r.nom)}</span><b>${r.points}</b>
        </div>`).join("")}
    </div>`;
}

// ---------- Profil ----------

function renderProfile() {
  const c = country();
  const mastered = Object.values(state.cards).filter((x) => x.box >= 3).length;
  const rate = state.answered ? Math.round((state.good / state.answered) * 100) : 0;
  view.innerHTML = `
    <h1>Mon profil</h1>
    <div class="stats">
      <div class="stat"><b>🔥 ${state.streak}</b><span class="muted">jours</span></div>
      <div class="stat"><b>${rate}%</b><span class="muted">réussite</span></div>
      <div class="stat"><b>${mastered}</b><span class="muted">maîtrisées</span></div>
    </div>
    <h2>Mon pseudo</h2>
    <input id="pseudo" value="${esc(state.pseudo || "")}" placeholder="Ex. Awa" maxlength="20"
      style="width:100%;padding:14px;border-radius:14px;border:1px solid var(--surface-2);background:var(--surface);color:var(--text);font-size:16px">
    <h2>Ma ville</h2>
    <div class="studios">
      ${c.villes.map((v) => `<button class="studio ${state.ville === v ? "active" : ""}" data-ville="${esc(v)}">${esc(v)}</button>`).join("")}
    </div>
    <button class="btn ghost" id="changeCountry">${c.flag} Changer de pays</button>
    <button class="btn" id="recharge">⚡ Recharger mes crédits</button>`;
  $("#pseudo").addEventListener("change", (e) => { state.pseudo = e.target.value.trim(); save(); toast("Pseudo enregistré"); });
  view.querySelectorAll("[data-ville]").forEach((b) => b.addEventListener("click", () => { state.ville = b.dataset.ville; save(); renderProfile(); }));
  $("#changeCountry").addEventListener("click", openCountryPicker);
  $("#recharge").addEventListener("click", openRecharge);
}

// ---------- Navigation ----------

function render(name) {
  session = null;
  setActiveTab(name);
  if (name === "leaderboard") renderLeaderboard();
  else if (name === "profile") renderProfile();
  else renderHome();
  window.scrollTo(0, 0);
}

document.querySelectorAll("[data-go]").forEach((b) => b.addEventListener("click", () => render(b.dataset.go)));
$("#creditsBtn").addEventListener("click", openRecharge);
$("#countryChip").addEventListener("click", openCountryPicker);

refillDaily();
updateTopbar();
render("home");

let pendingDuel = readDuelFromHash();
if (!state.country) openCountryPicker();
else if (pendingDuel) { startPreset("duel", pendingDuel); pendingDuel = null; }

if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("sw.js").catch(() => {});
}
