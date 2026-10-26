// Sanko, la mascotte de Révizo : un oiseau inspiré de Sankofa, l'oiseau adinkra qui se retourne
// pour reprendre ce qu'il a laissé derrière lui. Ses couleurs sont fixes, dans les deux thèmes.
// Humeurs : content, joie, reflechit, encourage, dort, fier.
(function () {
  const C = {
    corps: "#f5b301",
    ventre: "#ffe39a",
    aile: "#d98f00",
    encre: "#141a33",
    bec: "#f2711c",
    huppe: "#3558d8",
    joue: "#f79a5b",
  };

  function yeux(humeur) {
    const blancs = `<circle cx="47" cy="60" r="12" fill="#fff"/><circle cx="73" cy="60" r="12" fill="#fff"/>`;
    switch (humeur) {
      case "joie":
      case "fier":
        return `<path d="M38 63q9-11 18 0M64 63q9-11 18 0" fill="none" stroke="${C.encre}" stroke-width="4.5" stroke-linecap="round"/>`;
      case "dort":
        return `<path d="M39 62q8 5 16 0M65 62q8 5 16 0" fill="none" stroke="${C.encre}" stroke-width="4" stroke-linecap="round"/>`;
      case "reflechit":
        return `${blancs}<g class="sanko-pupilles"><circle cx="44" cy="55" r="6" fill="${C.encre}"/><circle cx="70" cy="55" r="6" fill="${C.encre}"/><circle cx="46" cy="53" r="2" fill="#fff"/><circle cx="72" cy="53" r="2" fill="#fff"/></g>
          <path d="M64 43q9-5 17 1" fill="none" stroke="${C.encre}" stroke-width="3.5" stroke-linecap="round"/>`;
      case "encourage":
        return `${blancs}<g class="sanko-pupilles"><circle cx="48" cy="63" r="6" fill="${C.encre}"/><circle cx="74" cy="63" r="6" fill="${C.encre}"/><circle cx="50" cy="61" r="2" fill="#fff"/><circle cx="76" cy="61" r="2" fill="#fff"/></g>
          <path d="M38 46q8-4 15 0M67 46q7-4 15 0" fill="none" stroke="${C.encre}" stroke-width="3.5" stroke-linecap="round"/>`;
      default:
        return `${blancs}<g class="sanko-pupilles"><circle cx="49" cy="61" r="6" fill="${C.encre}"/><circle cx="75" cy="61" r="6" fill="${C.encre}"/><circle cx="51" cy="58.5" r="2" fill="#fff"/><circle cx="77" cy="58.5" r="2" fill="#fff"/></g>`;
    }
  }

  function bec(humeur) {
    if (humeur === "joie" || humeur === "fier") {
      return `<path d="M52 71h16l-8 7z" fill="${C.bec}"/><path d="M54 79h12l-6 6z" fill="#c4520c"/>`;
    }
    return `<path d="M53 71h14l-7 10z" fill="${C.bec}"/>`;
  }

  window.sanko = function (humeur = "content", taille = 96, extra = "") {
    const fier = humeur === "fier";
    return `<svg class="sanko sanko-${humeur} ${extra}" width="${taille}" height="${taille}" viewBox="0 0 120 120" role="img" aria-label="Sanko">
      <ellipse cx="60" cy="114" rx="30" ry="4" fill="${C.encre}" opacity=".12"/>
      <g class="sanko-corps">
        <ellipse cx="49" cy="108" rx="7" ry="4" fill="${C.bec}"/>
        <ellipse cx="71" cy="108" rx="7" ry="4" fill="${C.bec}"/>
        <path class="sanko-huppe" d="M60 3c8 11 12 17 12 23a12 12 0 0 1-24 0c0-6 4-12 12-23z" fill="${C.huppe}"/>
        <ellipse cx="60" cy="68" rx="38" ry="40" fill="${C.corps}"/>
        <path class="sanko-aile-g" d="M24 66c-6 6-8 18-3 28 6-1 11-8 12-17-1-6-4-10-9-11z" fill="${C.aile}"/>
        <path class="sanko-aile-d" d="M96 66c6 6 8 18 3 28-6-1-11-8-12-17 1-6 4-10 9-11z" fill="${C.aile}"/>
        <ellipse cx="60" cy="86" rx="23" ry="19" fill="${C.ventre}"/>
        <circle cx="35" cy="75" r="5" fill="${C.joue}" opacity=".55"/>
        <circle cx="85" cy="75" r="5" fill="${C.joue}" opacity=".55"/>
        <g class="sanko-yeux">${yeux(humeur)}</g>
        ${bec(humeur)}
        ${fier ? `<ellipse cx="60" cy="96" rx="9" ry="11" fill="#fffaf0" stroke="${C.aile}" stroke-width="2"/>` : ""}
      </g>
    </svg>`;
  };
})();
