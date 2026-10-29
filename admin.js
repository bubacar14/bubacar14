// Tableau de bord de Révizo (revizo.click/admin) : chiffres, campagnes de pub, élèves, paiements.
// Toutes les données viennent de /api/admin, protégé par le mot de passe ADMIN_PASSWORD.
(function () {
  const $ = (s) => document.querySelector(s);
  const esc = (t) => String(t ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);
  const nombre = (n) => Number(n || 0).toLocaleString("fr-FR");
  const fcfa = (n) => `${nombre(n)} FCFA`;
  const pct = (a, b) => (b ? `${Math.round((a / b) * 100)} %` : "–");
  const date = (d) => (d ? new Date(d).toLocaleString("fr-FR", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" }) : "–");
  const jourCourt = (d) => new Date(d).toLocaleDateString("fr-FR", { day: "numeric", month: "short", timeZone: "UTC" });
  // Coût moyen d'un exercice avec Haiku 5.5, mesuré le 27 octobre 2026 (estimation : 1 dollar compté 600 FCFA).
  const COUT_EXERCICE = 7;
  const PAYS = { SN: "Sénégal", CI: "Côte d'Ivoire", ML: "Mali", BF: "Burkina Faso", GN: "Guinée", BJ: "Bénin", TG: "Togo", NE: "Niger", "?": "Pas encore choisi" };
  const SOURCES = { facebook: "Facebook", instagram: "Instagram", meta: "Meta", whatsapp: "WhatsApp", tiktok: "TikTok", direct: "Accès direct" };
  const nomSource = (s) => SOURCES[s] || s;

  const ICONES = {
    ensemble: "M3 13h8V3H3zM13 21h8V11h-8zM3 21h8v-6H3zM13 3v6h8V3z",
    campagnes: "M3 11l18-8-8 18-2-8z",
    eleves: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8M22 21v-2a4 4 0 0 0-3-3.9M16 3.1a4 4 0 0 1 0 7.8",
    paiements: "M2 7h20v12H2zM2 11h20M6 15h4",
    visite: "M1 12s4-8 11-8 11 8 11 8-4 8-11 8S1 12 1 12zM12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6",
    nouveau: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8M19 8v6M22 11h-6",
    photo: "M3 7h4l2-3h6l2 3h4v13H3zM12 17a4 4 0 1 0 0-8 4 4 0 0 0 0 8",
    argent: "M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6",
    reglages: "M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1.1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.5-1.1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z",
    retour: "M3 12a9 9 0 1 0 3-6.7L3 8M3 3v5h5",
    horloge: "M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20M12 6v6l4 2",
    cadeau: "M20 12v10H4V12M2 7h20v5H2zM12 22V7M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7zM12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z",
    comportement: "M9 3l-2 9h4l-2 9 8-12h-4l2-6z",
    defilement: "M12 3v18M7 16l5 5 5-5",
  };
  const icone = (n) => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="${ICONES[n]}"/></svg>`;
  const VUES = { ensemble: "Vue d'ensemble", campagnes: "Campagnes pub", comportement: "Comportement", eleves: "Élèves", paiements: "Paiements", reglages: "Réglages" };
  const JOURS = ["", "Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"];

  let jeton = null;
  try { jeton = sessionStorage.getItem("revizo-admin"); } catch { /* stockage indisponible */ }
  let vue = "ensemble";
  let jours = 30;
  let stats = null;
  let plus = null;
  let accueil = [];
  const graphes = [];

  function toast(texte) {
    const t = document.createElement("div");
    t.className = "toast";
    t.textContent = texte;
    document.body.appendChild(t);
    setTimeout(() => t.remove(), 2400);
  }

  async function api(action, donnees = {}) {
    const res = await fetch("api/admin", {
      method: "POST",
      headers: { "Content-Type": "application/json", ...(jeton ? { Authorization: `Bearer ${jeton}` } : {}) },
      body: JSON.stringify({ action, ...donnees }),
    });
    const data = await res.json().catch(() => ({ erreur: "Réponse illisible." }));
    if (res.status === 401 && action !== "connexion") { deconnecter(); throw new Error(data.erreur); }
    if (!res.ok) throw new Error(data.erreur || "Erreur.");
    return data;
  }

  // ---------- Connexion ----------

  $("#formConnexion").addEventListener("submit", async (e) => {
    e.preventDefault();
    $("#boutonConnexion").disabled = true;
    $("#erreurConnexion").textContent = "";
    try {
      const r = await api("connexion", { motDePasse: $("#motDePasse").value });
      jeton = r.jeton;
      try { sessionStorage.setItem("revizo-admin", jeton); } catch { /* stockage indisponible */ }
      demarrer();
    } catch (err) {
      $("#erreurConnexion").textContent = err.message;
    } finally {
      $("#boutonConnexion").disabled = false;
    }
  });

  function deconnecter() {
    jeton = null;
    try { sessionStorage.removeItem("revizo-admin"); } catch { /* stockage indisponible */ }
    $("#ecranAppli").hidden = true;
    $("#ecranConnexion").hidden = false;
  }
  $("#deconnexion").addEventListener("click", deconnecter);

  // ---------- Navigation ----------

  document.querySelectorAll(".onglet").forEach((b) => {
    b.innerHTML = `${icone(b.dataset.vue)}<span>${VUES[b.dataset.vue]}</span>`;
    b.addEventListener("click", () => { vue = b.dataset.vue; afficher(); });
  });
  $("#rafraichir").addEventListener("click", () => charger());

  function demarrer() {
    $("#ecranConnexion").hidden = true;
    $("#ecranAppli").hidden = false;
    charger();
  }

  async function charger() {
    $("#contenu").classList.add("chargement");
    try {
      [stats, plus, accueil] = await Promise.all([api("stats", { jours }), api("plus", { jours }), api("accueil", { jours }).catch(() => [])]);
      $("#majHeure").textContent = `Mis à jour à ${new Date().toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" })}`;
      afficher();
    } catch (err) {
      toast(err.message);
    } finally {
      $("#contenu").classList.remove("chargement");
    }
  }

  function afficher() {
    document.querySelectorAll(".onglet").forEach((b) => b.setAttribute("aria-current", String(b.dataset.vue === vue)));
    graphes.splice(0).forEach((g) => g.destroy());
    if (!stats) return;
    ({ ensemble: vueEnsemble, campagnes: vueCampagnes, comportement: vueComportement, eleves: vueEleves, paiements: vuePaiements, reglages: vueReglages })[vue]();
  }

  const entete = (titre, avecPeriode = true) => `
    <div class="entete">
      <h1>${titre} ${plus ? `<span class="direct" title="Élèves actifs ces 15 dernières minutes"><i></i>${nombre(plus.en_ce_moment)} en ce moment</span>` : ""}</h1>
      ${avecPeriode ? `<div class="periode" role="group" aria-label="Période">${[[1, "Aujourd'hui"], [7, "7 jours"], [30, "30 jours"], [90, "90 jours"]].map(([n, t]) => `<button data-jours="${n}" aria-pressed="${n === jours}">${t}</button>`).join("")}</div>` : ""}
    </div>`;
  function lierPeriode() {
    document.querySelectorAll("[data-jours]").forEach((b) => b.addEventListener("click", () => { jours = Number(b.dataset.jours); charger(); }));
  }

  const kpi = (teinte, ic, titre, valeur, sous) => `
    <div class="carte kpi t-${teinte}"><span class="ico">${icone(ic)}</span><span class="petit">${titre}</span><b>${valeur}</b><span class="sous">${sous}</span></div>`;

  // ---------- Graphiques (Chart.js) ----------

  const couleur = (v) => getComputedStyle(document.documentElement).getPropertyValue(v).trim();
  function graphe(id, config) {
    if (!window.Chart) return;
    Chart.defaults.font.family = '"Atkinson Hyperlegible", system-ui, sans-serif';
    Chart.defaults.color = couleur("--encre-2");
    Chart.defaults.borderColor = couleur("--ligne");
    graphes.push(new Chart(document.getElementById(id), config));
  }

  // ---------- Vue d'ensemble ----------

  function vueEnsemble() {
    const t = stats.totaux;
    const e = stats.entonnoir;
    const coutIa = t.exercices * COUT_EXERCICE;
    $("#contenu").innerHTML = `
      ${entete("Vue d'ensemble")}
      <div class="grille kpis">
        ${kpi("bleu", "visite", "Visiteurs", nombre(t.actifs), `${nombre(t.actifs_aujourdhui)} aujourd'hui`)}
        ${kpi("violet", "nouveau", "Nouveaux élèves", nombre(t.nouveaux), `${nombre(t.eleves)} au total`)}
        ${kpi("orange", "photo", "Exercices corrigés", nombre(t.exercices), `${nombre(t.essais)} essais · ${nombre(t.quiz)} quiz`)}
        ${kpi("vert", "argent", "Revenus", fcfa(t.revenus), `${nombre(t.payeurs)} payeurs · coût IA ≈ ${fcfa(coutIa)}`)}
      </div>
      <div class="grille deux">
        <div class="carte">
          <h2>Activité par jour</h2>
          <p class="aide">Visiteurs (appareils différents), nouveaux élèves et exercices corrigés.</p>
          <div class="graphe"><canvas id="gJours"></canvas></div>
        </div>
        <div class="carte">
          <h2>Parcours des nouveaux élèves</h2>
          <p class="aide">De l'arrivée au paiement, sur la période.</p>
          <div class="entonnoir">
            ${[["Arrivés", e.arrives], ["Accueil terminé", e.bienvenue], ["1er exercice", e.premier_exercice], ["Ont vu les prix", e.recharge], ["Ont payé", e.payeurs]].map(([nom, n]) => `
              <div class="marche"><span>${nom}</span><span class="barre"><span style="width:${e.arrives ? (n / e.arrives) * 100 : 0}%"></span></span><span class="val">${nombre(n)}<small>${pct(n, e.arrives)}</small></span></div>`).join("")}
          </div>
        </div>
      </div>
      <div class="grille moitie">
        <div class="carte"><h2>Pays</h2><p class="aide">Nouveaux élèves de la période.</p><div class="graphe petit-g"><canvas id="gPays"></canvas></div></div>
        <div class="carte"><h2>Classes</h2><p class="aide">Nouveaux élèves de la période.</p><div class="graphe petit-g"><canvas id="gClasses"></canvas></div></div>
      </div>
      <div class="grille kpis">
        ${kpi("soleil", "argent", "Crédits vendus", nombre(t.credits_vendus), `${nombre(t.commandes_payees)} paiements sur ${nombre(t.commandes_commencees)} commencés`)}
        ${kpi("bleu", "nouveau", "Conversion", pct(t.payeurs, t.actifs), "visiteurs qui ont payé")}
        ${kpi("violet", "visite", "Installations", nombre(t.installations), "appli ajoutée à l'écran d'accueil")}
        ${kpi("orange", "photo", "Erreurs signalées", nombre(t.signalements), "corrections jugées fausses")}
      </div>
      <div class="grille kpis">
        ${kpi("bleu", "retour", "Reviennent le lendemain", pct(plus.retour_j1.revenus, plus.retour_j1.base), `${nombre(plus.retour_j1.revenus)} sur ${nombre(plus.retour_j1.base)} élèves`)}
        ${kpi("violet", "retour", "Reviennent après 7 jours", pct(plus.retour_j7.revenus, plus.retour_j7.base), `${nombre(plus.retour_j7.revenus)} sur ${nombre(plus.retour_j7.base)} élèves`)}
        ${kpi("vert", "nouveau", "Score moyen aux quiz", plus.quiz.score_moyen != null ? `${plus.quiz.score_moyen} %` : "–", `${nombre(plus.quiz.nombre)} quiz terminés`)}
        ${kpi("soleil", "cadeau", "Crédits offerts", nombre(plus.credits.offerts), `${nombre(plus.credits.utilises)} utilisés · ${nombre(plus.credits.en_circulation)} en réserve`)}
      </div>
      <div class="grille moitie">
        <div class="carte"><h2>Heures d'utilisation</h2><p class="aide">Actions des élèves par heure (heure de Dakar). Utile pour programmer la pub.</p><div class="graphe petit-g"><canvas id="gHeures"></canvas></div></div>
        <div class="carte"><h2>Jours de la semaine</h2><p class="aide">Actions des élèves par jour.</p><div class="graphe petit-g"><canvas id="gSemaine"></canvas></div></div>
      </div>
      <div class="grille moitie">
        <div class="carte"><h2>Matières des exercices</h2><p class="aide">Exercices corrigés par l'IA, par matière.</p><div class="graphe petit-g"><canvas id="gMatieres"></canvas></div></div>
        <div class="carte"><h2>Quiz par matière</h2><p class="aide">Nombre de quiz et score moyen.</p>
          <div class="tableau-boite"><table><thead><tr><th>Matière</th><th>Quiz</th><th>Score moyen</th></tr></thead>
          <tbody>${plus.quiz_matieres.length ? plus.quiz_matieres.map((q) => `<tr><td>${esc(q.cle)}</td><td>${nombre(q.n)}</td><td>${q.score != null ? `${q.score} %` : "–"}</td></tr>`).join("") : `<tr><td colspan="3" class="vide">Pas encore de quiz.</td></tr>`}</tbody></table></div></div>
      </div>`;
    lierPeriode();
    graphe("gHeures", {
      type: "bar",
      data: { labels: plus.heures.map((h) => `${h.heure} h`), datasets: [{ data: plus.heures.map((h) => h.n), backgroundColor: couleur("--bic"), borderRadius: 6 }] },
      options: { maintainAspectRatio: false, plugins: { legend: { display: false } }, scales: { y: { beginAtZero: true, ticks: { precision: 0 } }, x: { grid: { display: false } } } },
    });
    graphe("gSemaine", {
      type: "bar",
      data: { labels: plus.jours_semaine.map((j) => JOURS[j.jour]), datasets: [{ data: plus.jours_semaine.map((j) => j.n), backgroundColor: couleur("--violet"), borderRadius: 6 }] },
      options: { maintainAspectRatio: false, plugins: { legend: { display: false } }, scales: { y: { beginAtZero: true, ticks: { precision: 0 } }, x: { grid: { display: false } } } },
    });
    const pj = stats.par_jour || [];
    graphe("gJours", {
      type: "line",
      data: {
        labels: pj.map((j) => jourCourt(j.jour)),
        datasets: [
          { label: "Visiteurs", data: pj.map((j) => j.visiteurs), borderColor: couleur("--bic"), backgroundColor: couleur("--bic-doux"), fill: true, tension: 0.35 },
          { label: "Nouveaux", data: pj.map((j) => j.nouveaux), borderColor: couleur("--violet"), tension: 0.35 },
          { label: "Exercices", data: pj.map((j) => j.exercices), borderColor: couleur("--orange"), tension: 0.35 },
        ],
      },
      options: { maintainAspectRatio: false, interaction: { mode: "index", intersect: false }, plugins: { legend: { position: "bottom" } }, scales: { y: { beginAtZero: true, ticks: { precision: 0 } }, x: { grid: { display: false } } } },
    });
    const palette = ["--bic", "--violet", "--orange", "--juste", "--soleil", "--rouge"].map(couleur);
    const matieres = plus.matieres || [];
    graphe("gMatieres", {
      type: "doughnut",
      data: { labels: matieres.length ? matieres.map((m) => m.cle) : ["Pas encore d'exercice"], datasets: [{ data: matieres.length ? matieres.map((m) => m.n) : [1], backgroundColor: matieres.length ? matieres.map((_, i) => palette[i % palette.length]) : [couleur("--ligne")], borderWidth: 0 }] },
      options: { maintainAspectRatio: false, cutout: "62%", plugins: { legend: { position: "right" } } },
    });
    const pays = stats.par_pays || [];
    graphe("gPays", {
      type: "doughnut",
      data: { labels: pays.map((p) => PAYS[p.cle] || p.cle), datasets: [{ data: pays.map((p) => p.n), backgroundColor: pays.map((_, i) => palette[i % palette.length]), borderWidth: 0 }] },
      options: { maintainAspectRatio: false, cutout: "62%", plugins: { legend: { position: "right" } } },
    });
    const classes = stats.par_classe || [];
    graphe("gClasses", {
      type: "bar",
      data: { labels: classes.map((c) => (c.cle === "?" ? "Pas encore choisie" : c.cle)), datasets: [{ data: classes.map((c) => c.n), backgroundColor: couleur("--violet"), borderRadius: 8 }] },
      options: { maintainAspectRatio: false, indexAxis: "y", plugins: { legend: { display: false } }, scales: { x: { beginAtZero: true, ticks: { precision: 0 } }, y: { grid: { display: false } } } },
    });
  }

  // ---------- Campagnes pub ----------

  // Test A/B de l'accueil : les 4 indicateurs, séparément pour chaque version.
  const NOMS_VERSIONS = { A: "A · accueil en 3 étapes", B: "B · classe seule, puis photo ou exemple" };
  function carteAccueil() {
    const ligne = (v) => `<tr><td><b>${esc(NOMS_VERSIONS[v.version] || v.version)}</b></td><td>${nombre(v.nouveaux)}</td>
      <td>${pct(v.premiere_correction, v.nouveaux)} <span class="petit">(${nombre(v.premiere_correction)})</span></td>
      <td>${pct(v.exercice_perso, v.nouveaux)} <span class="petit">(${nombre(v.exercice_perso)})</span></td>
      <td>${pct(v.retour_lendemain, v.base_lendemain)} <span class="petit">(${nombre(v.retour_lendemain)}/${nombre(v.base_lendemain)})</span></td>
      <td>${pct(v.activite_lendemain, v.base_lendemain)} <span class="petit">(${nombre(v.activite_lendemain)}/${nombre(v.base_lendemain)})</span></td></tr>`;
    return `
      <div class="carte" style="margin-bottom:16px">
        <h2>Test de l'accueil (A/B)</h2>
        <p class="aide">Chaque nouvel appareil reçoit au hasard la version A ou B. Pour juger, attends au moins une centaine d'élèves par version : avec quelques élèves, les écarts sont dus au hasard. « Le lendemain » ne compte que les élèves arrivés avant aujourd'hui.</p>
        <div class="tableau-boite"><table>
          <thead><tr><th>Version</th><th>Nouveaux</th><th>1re correction reçue</th><th>Exercice perso envoyé</th><th>Revient le lendemain</th><th>Travaille le lendemain</th></tr></thead>
          <tbody>${accueil.length ? accueil.map(ligne).join("") : `<tr><td colspan="6" class="vide">Pas encore de nouvel élève dans le test sur cette période.</td></tr>`}</tbody>
        </table></div>
      </div>`;
  }

  function vueCampagnes() {
    const sources = stats.par_source || [];
    $("#contenu").innerHTML = `
      ${entete("Campagnes pub")}
      ${carteAccueil()}
      <div class="carte" style="margin-bottom:16px">
        <h2>Créer un lien pour une pub</h2>
        <p class="aide">Mets ce lien dans ta pub : chaque élève qui arrive par lui est compté dans sa campagne.</p>
        <div class="recherche">
          <select class="champ" id="lienSource" style="flex:0 1 180px">
            ${["facebook", "instagram", "whatsapp", "tiktok"].map((s) => `<option value="${s}">${nomSource(s)}</option>`).join("")}
          </select>
          <input class="champ" id="lienCampagne" value="test3j" placeholder="Nom de la campagne (ex. test3j)">
        </div>
        <div class="lien-pub"><code id="lienPub"></code><button class="bouton" id="copierLien">Copier</button></div>
      </div>
      <div class="carte">
        <h2>Résultats par source</h2>
        <p class="aide">Nouveaux élèves de la période, selon le lien par lequel ils sont arrivés. « Actifs » : au moins un exercice (ou l'essai). Écris ce que tu as dépensé pour chaque pub (en FCFA) : le coût par élève et la rentabilité se calculent tout seuls.</p>
        <div class="tableau-boite"><table>
          <thead><tr><th>Source</th><th>Campagne</th><th>Élèves</th><th>Actifs</th><th>Payeurs</th><th>Revenus</th><th>Dépense pub</th><th>Coût / élève</th><th>Coût / actif</th><th>Rentabilité</th></tr></thead>
          <tbody>${sources.length ? sources.map((s) => {
            const d = (plus.depenses || []).find((x) => x.source === s.cle && x.campagne === (s.campagne || ""))?.depense || 0;
            const editable = s.cle !== "direct";
            return `<tr><td><b>${esc(nomSource(s.cle))}</b></td><td>${esc(s.campagne || "–")}</td><td>${nombre(s.n)}</td><td>${nombre(s.actives)} <span class="petit">(${pct(s.actives, s.n)})</span></td><td>${nombre(s.payeurs)}</td><td>${fcfa(s.revenus)}</td>
              <td>${editable ? `<input class="champ champ-depense" type="number" min="0" step="500" value="${d || ""}" placeholder="0" data-source="${esc(s.cle)}" data-campagne="${esc(s.campagne || "")}">` : "–"}</td>
              <td>${d && s.n ? fcfa(Math.round(d / s.n)) : "–"}</td><td>${d && s.actives ? fcfa(Math.round(d / s.actives)) : "–"}</td>
              <td>${d ? `<b class="${s.revenus >= d ? "gain" : "perte"}">${s.revenus >= d ? "+" : ""}${fcfa(s.revenus - d)}</b>` : "–"}</td></tr>`;
          }).join("") : `<tr><td colspan="10" class="vide">Pas encore de visiteurs sur cette période.</td></tr>`}</tbody>
        </table></div>
      </div>`;
    lierPeriode();
    const majLien = () => {
      const c = $("#lienCampagne").value.trim().toLowerCase().replace(/[^a-z0-9_-]+/g, "-") || "pub";
      $("#lienPub").textContent = `https://revizo.click/?utm_source=${$("#lienSource").value}&utm_medium=pub&utm_campaign=${c}`;
    };
    document.querySelectorAll(".champ-depense").forEach((c) => c.addEventListener("change", async () => {
      try {
        await api("depense", { source: c.dataset.source, campagne: c.dataset.campagne, depense: Number(c.value) || 0 });
        toast("Dépense enregistrée");
        charger();
      } catch (err) { toast(err.message); }
    }));
    $("#lienSource").addEventListener("change", majLien);
    $("#lienCampagne").addEventListener("input", majLien);
    $("#copierLien").addEventListener("click", () => navigator.clipboard?.writeText($("#lienPub").textContent).then(() => toast("Lien copié")));
    majLien();
  }

  // ---------- Comportement (Microsoft Clarity) ----------

  const CLARITY_PROJET = "z53aabeetb";
  const CLARITY_URL = `https://clarity.microsoft.com/projects/view/${CLARITY_PROJET}`;
  // Signaux de frustration de Clarity : nom affiché et explication pour quelqu'un qui n'est pas technicien.
  const SIGNAUX = [
    ["RageClickCount", "Clics de colère", "L'élève tape plusieurs fois très vite au même endroit : quelque chose ne répond pas comme il l'attend."],
    ["DeadClickCount", "Clics sans effet", "L'élève touche un élément qui ne fait rien (il croit que c'est un bouton)."],
    ["QuickbackClick", "Retours rapides", "L'élève ouvre une page puis revient aussitôt en arrière : ce n'était pas ce qu'il cherchait."],
    ["ExcessiveScroll", "Défilement excessif", "L'élève fait défiler beaucoup sans s'arrêter : il cherche quelque chose sans le trouver."],
    ["ErrorClickCount", "Clics sur une erreur", "Un clic qui a déclenché une erreur dans l'appli."],
    ["ScriptErrorCount", "Erreurs de l'appli", "Erreurs JavaScript rencontrées pendant les visites."],
  ];
  const nb = (v) => Number(String(v ?? "").replace(",", ".")) || 0;
  const metrique = (donnees, nom) => (donnees.metriques || []).find((m) => String(m.metricName).replace(/\s/g, "").toLowerCase() === nom.toLowerCase())?.information || [];
  const minutes = (s) => (s >= 60 ? `${Math.floor(s / 60)} min ${Math.round(s % 60)} s` : `${Math.round(s)} s`);

  async function chargerClarity(forcer = false) {
    // Clarity n'autorise que 10 demandes par jour : on garde aussi la réponse 3 heures dans le navigateur.
    try {
      const garde = JSON.parse(sessionStorage.getItem("revizo-clarity") || "null");
      if (!forcer && garde && Date.now() - garde.quand < 3 * 60 * 60 * 1000) return garde.donnees;
    } catch { /* stockage indisponible */ }
    const donnees = await api("clarity");
    if (donnees.metriques) try { sessionStorage.setItem("revizo-clarity", JSON.stringify({ quand: Date.now(), donnees })); } catch { /* stockage indisponible */ }
    return donnees;
  }

  async function vueComportement() {
    const liens = `
      <div class="recherche">
        <a class="bouton" href="${CLARITY_URL}/impressions" target="_blank" rel="noopener">Voir les enregistrements</a>
        <a class="bouton secondaire" href="${CLARITY_URL}/heatmaps" target="_blank" rel="noopener">Cartes de chaleur</a>
        <a class="bouton secondaire" href="${CLARITY_URL}/dashboard" target="_blank" rel="noopener">Tableau Clarity</a>
      </div>`;
    $("#contenu").innerHTML = `${entete("Comportement", false)}<div class="carte"><p class="vide">Chargement des chiffres de Clarity…</p></div>`;
    let d;
    try { d = await chargerClarity(); } catch (err) { d = { configure: true, erreur: err.message }; }
    if (vue !== "comportement") return;
    const MESSAGES = {
      limite: "Clarity n'accepte que 10 demandes par jour et la limite est atteinte. Les chiffres reviennent demain ; les enregistrements restent visibles sur Clarity.",
      jeton: "Clarity refuse le jeton. Crée un nouveau jeton dans Clarity (Settings › Data Export) et remplace CLARITY_TOKEN dans Vercel.",
      panne: "Clarity ne répond pas pour le moment. Réessaie dans quelques minutes.",
    };
    if (!d.configure) {
      $("#contenu").innerHTML = `${entete("Comportement", false)}
        <div class="carte"><h2>Clarity n'est pas encore relié</h2>
          <p class="aide">Pour voir ici les chiffres de Clarity : dans Clarity, ouvre Settings › Data Export › Generate new API token, puis ajoute ce jeton dans Vercel sous le nom CLARITY_TOKEN (Production) et redéploie.</p>${liens}</div>`;
      return;
    }
    if (d.erreur && !d.metriques) {
      $("#contenu").innerHTML = `${entete("Comportement", false)}<div class="carte"><h2>Chiffres indisponibles</h2><p class="aide">${esc(MESSAGES[d.erreur] || d.erreur)}</p>${liens}</div>`;
      return;
    }

    const trafic = metrique(d, "Traffic");
    const sessions = trafic.reduce((s, l) => s + nb(l.totalSessionCount), 0);
    const robots = trafic.reduce((s, l) => s + nb(l.totalBotSessionCount), 0);
    const personnes = trafic.reduce((s, l) => s + nb(l.distinctUserCount ?? l.distantUserCount), 0);
    const pages = sessions ? trafic.reduce((s, l) => s + nb(l.PagesPerSessionPercentage ?? l.pagesPerSessionPercentage) * nb(l.totalSessionCount), 0) / sessions : 0;
    const temps = metrique(d, "EngagementTime");
    const moyenne = (lignes, champ) => {
      const total = lignes.reduce((s, l) => s + nb(l[champ]) * (nb(trafic.find((t) => t.Source === l.Source)?.totalSessionCount) || 1), 0);
      const poids = lignes.reduce((s, l) => s + (nb(trafic.find((t) => t.Source === l.Source)?.totalSessionCount) || 1), 0);
      return poids ? total / poids : 0;
    };
    const actif = moyenne(temps, "activeTime");
    const defil = moyenne(metrique(d, "ScrollDepth"), "averageScrollDepth");
    // Pour chaque signal : part des visites concernées, toutes sources confondues.
    const signal = (nom) => {
      const lignes = metrique(d, nom);
      const touchees = lignes.reduce((s, l) => s + nb(l.subTotal ?? l.sessionsCount), 0);
      const part = lignes.length && sessions ? lignes.reduce((s, l) => s + nb(l.sessionsWithMetricPercentage) * (nb(trafic.find((t) => t.Source === l.Source)?.totalSessionCount) || 0), 0) / sessions : 0;
      return { touchees, part };
    };
    const sources = [...trafic].sort((a, b) => nb(b.totalSessionCount) - nb(a.totalSessionCount));
    const colere = metrique(d, "RageClickCount");
    const retours = metrique(d, "QuickbackClick");
    const partSource = (lignes, s) => { const l = lignes.find((x) => x.Source === s); return l ? `${Math.round(nb(l.sessionsWithMetricPercentage))} %` : "–"; };

    $("#contenu").innerHTML = `
      ${entete("Comportement", false)}
      ${d.avertissement ? `<div class="carte" style="margin-bottom:16px"><p class="aide" style="margin:0">${esc(MESSAGES[d.avertissement] || d.avertissement)} Chiffres affichés : ceux reçus le ${esc(date(d.recu))}.</p></div>` : ""}
      <div class="grille kpis">
        ${kpi("bleu", "visite", "Visites enregistrées", nombre(sessions), `${nombre(robots)} robots exclus`)}
        ${kpi("violet", "nouveau", "Personnes", nombre(personnes), `${pages ? pages.toFixed(1).replace(".", ",") : "–"} pages par visite`)}
        ${kpi("orange", "horloge", "Temps actif moyen", actif ? minutes(actif) : "–", "temps où l'élève touche ou fait défiler")}
        ${kpi("vert", "defilement", "Défilement moyen", defil ? `${Math.round(defil)} %` : "–", "de la page vue en moyenne")}
      </div>
      <div class="grille deux">
        <div class="carte">
          <h2>Signaux de frustration</h2>
          <p class="aide">Part des visites où Clarity a repéré le problème, sur les 3 derniers jours.</p>
          <div class="tableau-boite"><table><thead><tr><th>Signal</th><th>Visites</th><th>Part</th></tr></thead><tbody>
            ${SIGNAUX.map(([cle, nom, aide]) => { const s = signal(cle); return `<tr><td style="white-space:normal;min-width:200px"><b>${nom}</b><br><span class="petit">${aide}</span></td><td>${nombre(s.touchees)}</td><td>${s.part ? `${Math.round(s.part)} %` : "–"}</td></tr>`; }).join("")}
          </tbody></table></div>
        </div>
        <div class="carte">
          <h2>Par source</h2>
          <p class="aide">D'où viennent les visites et où il y a le plus de frustration.</p>
          <div class="tableau-boite"><table><thead><tr><th>Source</th><th>Visites</th><th>Clics de colère</th><th>Retours rapides</th></tr></thead><tbody>
            ${sources.length ? sources.map((s) => `<tr><td><b>${esc(nomSource(String(s.Source || "direct").toLowerCase()) || "Accès direct")}</b></td><td>${nombre(s.totalSessionCount)}</td><td>${partSource(colere, s.Source)}</td><td>${partSource(retours, s.Source)}</td></tr>`).join("") : `<tr><td colspan="4" class="vide">Pas encore de visite enregistrée.</td></tr>`}
          </tbody></table></div>
        </div>
      </div>
      <div class="carte" style="margin-top:16px">
        <h2>Revoir les visites</h2>
        <p class="aide">Les enregistrements se regardent sur Clarity (Microsoft ne permet pas de les afficher ici). Astuce : filtre « Source = facebook » et regarde les visites courtes pour voir où les élèves quittent l'écran de bienvenue. Prénoms, champs et photos sont masqués.</p>
        ${liens}
        <p class="petit" style="margin-top:12px">Chiffres des 3 derniers jours, reçus le ${esc(date(d.recu))}. Clarity limite à 10 demandes par jour : ils se mettent à jour toutes les 3 heures. <button class="bouton secondaire" id="majClarity" style="min-height:32px;margin-left:8px">Mettre à jour</button></p>
      </div>`;
    $("#majClarity").addEventListener("click", async () => {
      try { sessionStorage.removeItem("revizo-clarity"); } catch { /* stockage indisponible */ }
      vueComportement();
    });
  }

  // ---------- Élèves ----------

  async function vueEleves(recherche = "") {
    $("#contenu").innerHTML = `
      ${entete("Élèves", false)}
      <div class="carte">
        <div class="recherche">
          <input class="champ" id="rechercheEleve" placeholder="Chercher : identifiant, pays (SN), classe, source (facebook)…" value="${esc(recherche)}">
          <button class="bouton" id="lancerRecherche">Chercher</button>
          <button class="bouton secondaire" id="exporterEleves">Exporter (Excel)</button>
        </div>
        <div class="tableau-boite" id="listeEleves"><p class="vide">Chargement…</p></div>
      </div>`;
    const lancer = () => vueEleves($("#rechercheEleve").value.trim());
    $("#lancerRecherche").addEventListener("click", lancer);
    $("#rechercheEleve").addEventListener("keydown", (e) => { if (e.key === "Enter") lancer(); });
    try {
      const eleves = await api("eleves", { recherche });
      $("#listeEleves").innerHTML = `<table>
        <thead><tr><th>Élève</th><th>Pays</th><th>Classe</th><th>Source</th><th>Crédits</th><th>Exercices</th><th>Quiz</th><th>Dépensé</th><th>Vu le</th></tr></thead>
        <tbody>${eleves.length ? eleves.map((e) => `<tr class="cliquable" data-eleve="${esc(e.id)}"><td class="mono">${esc(e.id)}</td><td>${esc(PAYS[e.pays] || e.pays || "–")}</td><td>${esc(e.classe || "–")}</td><td>${esc(e.source ? nomSource(e.source) : "–")}</td><td>${nombre(e.credits)}</td><td>${nombre(e.exercices)}</td><td>${nombre(e.quiz)}</td><td>${e.depense ? fcfa(e.depense) : "–"}</td><td>${date(e.vu_le)}</td></tr>`).join("") : `<tr><td colspan="9" class="vide">Aucun élève trouvé.</td></tr>`}</tbody>
      </table>`;
      document.querySelectorAll("[data-eleve]").forEach((tr) => tr.addEventListener("click", () => ouvrirFiche(tr.dataset.eleve)));
      $("#exporterEleves").addEventListener("click", () => exporterCsv("eleves-revizo.csv",
        ["Élève", "Pays", "Classe", "Source", "Campagne", "Crédits", "Exercices", "Quiz", "Dépensé (FCFA)", "Arrivé le", "Vu le"],
        eleves.map((e) => [e.id, PAYS[e.pays] || e.pays || "", e.classe || "", e.source || "", e.campagne || "", e.credits, e.exercices, e.quiz, e.depense, e.cree_le, e.vu_le])));
    } catch (err) {
      $("#listeEleves").innerHTML = `<p class="vide">${esc(err.message)}</p>`;
    }
  }

  const MOTIFS = { cadeau: "Cadeau", exercice: "Exercice", remboursement: "Remboursé", signalement: "Erreur signalée", achat: "Achat" };
  async function ouvrirFiche(id) {
    const fond = document.createElement("div");
    fond.className = "fond-fiche";
    fond.innerHTML = `<aside class="fiche" role="dialog" aria-label="Fiche élève"><p class="vide">Chargement…</p></aside>`;
    document.body.appendChild(fond);
    fond.addEventListener("click", (e) => { if (e.target === fond) fond.remove(); });
    const fiche = fond.querySelector(".fiche");
    try {
      const d = await api("eleve", { id });
      if (d.erreur) throw new Error(d.erreur);
      const e = d.eleve;
      fiche.innerHTML = `
        <div class="tete"><h2>Élève <span class="mono">${esc(e.id)}</span></h2><button class="bouton secondaire" id="fermerFiche">Fermer</button></div>
        <div class="infos">
          <div><small>Pays</small>${esc(PAYS[e.pays] || e.pays || "–")}</div>
          <div><small>Classe</small>${esc(e.classe || "–")}</div>
          <div><small>Source</small>${esc(e.source ? nomSource(e.source) : "–")}${e.campagne ? ` · ${esc(e.campagne)}` : ""}</div>
          <div><small>Crédits</small><b id="creditsFiche">${nombre(e.credits)}</b></div>
          <div><small>Arrivé le</small>${date(e.cree_le)}</div>
          <div><small>Vu le</small>${date(e.vu_le)}</div>
        </div>
        <div><h3>Offrir des crédits</h3><p class="petit">Un nombre négatif en retire.</p>
          <div class="offrir"><input class="champ" type="number" id="nbCredits" value="3" min="-500" max="500"><button class="bouton" id="offrir">Valider</button></div></div>
        <div><h3>Appareil de test ?</h3><p class="petit">Toi ou un ami qui essaie l'appli : il disparaît des statistiques et de la liste.</p>
          <button class="bouton secondaire" id="marquerTest">Marquer comme test</button></div>
        <div><h3>Crédits</h3><ul class="liste">${d.mouvements.length ? d.mouvements.map((m) => `<li><span>${MOTIFS[m.motif] || esc(m.motif)}</span><span><b>${m.delta > 0 ? "+" : ""}${m.delta}</b> · ${date(m.quand)}</span></li>`).join("") : `<li>Aucun mouvement</li>`}</ul></div>
        <div><h3>Paiements</h3><ul class="liste">${d.commandes.length ? d.commandes.map((c) => `<li><span class="mono">${esc(c.reference)}</span><span>${fcfa(c.montant)} · ${statut(c)}</span></li>`).join("") : `<li>Aucun paiement</li>`}</ul></div>
        <div><h3>Activité</h3><ul class="liste">${d.evenements.length ? d.evenements.map((v) => `<li><span>${esc(v.type)}${v.details?.score != null ? ` ${v.details.score}/${v.details.total}` : ""}</span><span>${date(v.quand)}</span></li>`).join("") : `<li>Aucune activité mesurée</li>`}</ul></div>`;
      fiche.querySelector("#fermerFiche").addEventListener("click", () => fond.remove());
      fiche.querySelector("#marquerTest").addEventListener("click", async () => {
        try {
          const r = await api("test", { id: e.id, test: true });
          if (!r.ok) throw new Error("Élève introuvable.");
          toast("Marqué comme test");
          fond.remove();
          charger();
        } catch (err) { toast(err.message); }
      });
      fiche.querySelector("#offrir").addEventListener("click", async () => {
        const n = Math.trunc(Number(fiche.querySelector("#nbCredits").value));
        if (!n) return;
        try {
          const r = await api("crediter", { id: e.id, credits: n });
          if (!r.ok) throw new Error("Élève introuvable.");
          fiche.querySelector("#creditsFiche").textContent = nombre(r.credits);
          toast(n > 0 ? `+${n} crédits offerts` : `${n} crédits retirés`);
        } catch (err) { toast(err.message); }
      });
    } catch (err) {
      fiche.innerHTML = `<p class="vide">${esc(err.message)}</p>`;
    }
  }

  // ---------- Paiements ----------

  const statut = (c) => (c.test ? `<span class="pastille p-test">Test</span>` : "") + ({ payee: `<span class="pastille p-payee">Payé</span>`, en_attente: `<span class="pastille p-attente">En attente</span>`, echouee: `<span class="pastille p-echouee">Échoué</span>` }[c.statut] || esc(c.statut));

  function vuePaiements() {
    const t = stats.totaux;
    const commandes = stats.commandes || [];
    $("#contenu").innerHTML = `
      ${entete("Paiements")}
      <div class="grille kpis">
        ${kpi("vert", "argent", "Revenus", fcfa(t.revenus), "paiements réels confirmés")}
        ${kpi("bleu", "paiements", "Paiements réussis", nombre(t.commandes_payees), `sur ${nombre(t.commandes_commencees)} commencés (${pct(t.commandes_payees, t.commandes_commencees)})`)}
        ${kpi("soleil", "argent", "Crédits vendus", nombre(t.credits_vendus), `panier moyen ${t.commandes_payees ? fcfa(Math.round(t.revenus / t.commandes_payees)) : "–"}`)}
        ${kpi("orange", "photo", "Coût de l'IA (estimé)", fcfa(t.exercices * COUT_EXERCICE), `${nombre(t.exercices)} exercices × ${COUT_EXERCICE} FCFA`)}
      </div>
      <div class="carte">
        <div class="entete" style="margin-bottom:4px"><h2>Derniers paiements</h2><button class="bouton secondaire" id="exporterPaiements">Exporter (Excel)</button></div>
        <p class="aide">Les 30 derniers, toutes périodes. « Test » : fait avec les clés de test de DexPay, sans argent réel.</p>
        <div class="tableau-boite"><table>
          <thead><tr><th>Référence</th><th>Montant</th><th>Crédits</th><th>Statut</th><th>Pays</th><th>Élève</th><th>Commencé</th><th>Payé</th></tr></thead>
          <tbody>${commandes.length ? commandes.map((c) => `<tr class="cliquable" data-eleve="${esc(c.eleve)}"><td class="mono">${esc(c.reference)}</td><td>${fcfa(c.montant)}</td><td>${nombre(c.credits)}</td><td>${statut(c)}</td><td>${esc(PAYS[c.pays] || c.pays || "–")}</td><td class="mono">${esc(c.eleve)}</td><td>${date(c.creee_le)}</td><td>${date(c.payee_le)}</td></tr>`).join("") : `<tr><td colspan="8" class="vide">Aucun paiement pour l'instant.</td></tr>`}</tbody>
        </table></div>
      </div>`;
    lierPeriode();
    document.querySelectorAll("[data-eleve]").forEach((tr) => tr.addEventListener("click", () => ouvrirFiche(tr.dataset.eleve)));
    $("#exporterPaiements").addEventListener("click", () => exporterCsv("paiements-revizo.csv",
      ["Référence", "Montant (FCFA)", "Crédits", "Statut", "Test", "Pays", "Élève", "Commencé", "Payé"],
      commandes.map((c) => [c.reference, c.montant, c.credits, c.statut, c.test ? "oui" : "non", PAYS[c.pays] || c.pays || "", c.eleve, c.creee_le, c.payee_le || ""])));
  }

  // ---------- Réglages ----------

  function vueReglages() {
    const r = plus.reglages || {};
    $("#contenu").innerHTML = `
      ${entete("Réglages", false)}
      <div class="grille moitie">
        <div class="carte">
          <h2>Crédits de bienvenue</h2>
          <p class="aide">Crédits offerts à chaque nouvel élève (1 crédit = 1 exercice corrigé, environ ${COUT_EXERCICE} FCFA de coût d'IA). Les élèves déjà inscrits ne changent pas.</p>
          <div class="offrir"><input class="champ" type="number" id="bonus" min="0" max="100" value="${r.credits_bienvenue ?? 10}"><button class="bouton" id="sauverBonus">Enregistrer</button></div>
          <p class="petit" id="coutBonus"></p>
        </div>
        <div class="carte">
          <h2>Protection contre la triche</h2>
          <p class="aide">Nombre de nouveaux appareils, par réseau et par jour, qui reçoivent les crédits de bienvenue. Au-delà, ils n'ont que l'exercice offert du jour (utile si quelqu'un vide l'appli pour recommencer).</p>
          <div class="offrir"><input class="champ" type="number" id="plafond" min="0" max="100" value="${r.bienvenue_max_par_reseau ?? 30}"><button class="bouton" id="sauverPlafond">Enregistrer</button></div>
        </div>
      </div>
      <div class="carte">
        <h2>Exporter les données</h2>
        <p class="aide">Fichiers CSV, à ouvrir dans Excel ou Google Sheets. Aucun prénom ni numéro de téléphone : Révizo ne les garde pas.</p>
        <div class="recherche">
          <button class="bouton secondaire" id="expEleves">Élèves</button>
          <button class="bouton secondaire" id="expJours">Activité par jour</button>
          <button class="bouton secondaire" id="expCampagnes">Campagnes</button>
        </div>
      </div>`;
    const majCout = () => { $("#coutBonus").textContent = `Coût maximum par nouvel élève : environ ${fcfa(Number($("#bonus").value || 0) * COUT_EXERCICE)} (s'il utilise tout).`; };
    $("#bonus").addEventListener("input", majCout);
    majCout();
    const sauver = (cle, champ) => async () => {
      try { await api("reglage", { cle, valeur: Number($(champ).value) }); toast("Enregistré"); charger(); } catch (err) { toast(err.message); }
    };
    $("#sauverBonus").addEventListener("click", sauver("credits_bienvenue", "#bonus"));
    $("#sauverPlafond").addEventListener("click", sauver("bienvenue_max_par_reseau", "#plafond"));
    $("#expEleves").addEventListener("click", async () => {
      const eleves = await api("eleves", { recherche: "" });
      exporterCsv("eleves-revizo.csv", ["Élève", "Pays", "Classe", "Source", "Campagne", "Crédits", "Exercices", "Quiz", "Dépensé (FCFA)", "Arrivé le", "Vu le"],
        eleves.map((e) => [e.id, PAYS[e.pays] || e.pays || "", e.classe || "", e.source || "", e.campagne || "", e.credits, e.exercices, e.quiz, e.depense, e.cree_le, e.vu_le]));
    });
    $("#expJours").addEventListener("click", () => exporterCsv(`activite-${jours}-jours.csv`, ["Jour", "Visiteurs", "Nouveaux", "Exercices", "Quiz", "Revenus (FCFA)"],
      (stats.par_jour || []).map((j) => [j.jour, j.visiteurs, j.nouveaux, j.exercices, j.quiz, j.revenus])));
    $("#expCampagnes").addEventListener("click", () => exporterCsv("campagnes-revizo.csv", ["Source", "Campagne", "Élèves", "Actifs", "Payeurs", "Revenus (FCFA)"],
      (stats.par_source || []).map((s) => [s.cle, s.campagne || "", s.n, s.actives, s.payeurs, s.revenus])));
  }

  // Fichier CSV lisible par Excel (séparateur « ; » et accents conservés).
  function exporterCsv(nom, entetes, lignes) {
    const cellule = (v) => `"${String(v ?? "").replace(/"/g, '""')}"`;
    const texte = "\ufeff" + [entetes, ...lignes].map((l) => l.map(cellule).join(";")).join("\r\n");
    const a = document.createElement("a");
    a.href = URL.createObjectURL(new Blob([texte], { type: "text/csv;charset=utf-8" }));
    a.download = nom;
    a.click();
    setTimeout(() => URL.revokeObjectURL(a.href), 1000);
  }

  if (jeton) demarrer();
})();
