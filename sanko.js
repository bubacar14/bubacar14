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

  // Logo Révizo : tête de Sanko + mot vectorisé (Bricolage Grotesque 800), goutte d'encre en accent.
  window.LOGO_REVIZO = `<svg class="logo-svg" viewBox="0 0 389 116" role="img" aria-label="Révizo"><g transform="translate(0 10)"><g transform="">
      <path d="M50 2c9 12 13 19 13 25a13 13 0 0 1-26 0c0-6 4-13 13-25z" fill="var(--bic)"/>
      <circle cx="50" cy="60" r="38" fill="#f5b301"/>
      <path d="M14 66c-3 10 0 20 8 26 2-9 0-18-8-26zM86 66c3 10 0 20-8 26-2-9 0-18 8-26z" fill="#d98f00"/>
      <circle cx="37" cy="55" r="11" fill="#fff"/><circle cx="63" cy="55" r="11" fill="#fff"/>
      <circle cx="39" cy="56" r="5.5" fill="#141a33"/><circle cx="65" cy="56" r="5.5" fill="#141a33"/>
      <circle cx="41" cy="53.5" r="1.8" fill="#fff"/><circle cx="67" cy="53.5" r="1.8" fill="#fff"/>
      <path d="M43.5 66h13l-6.5 9z" fill="#f2711c"/>
    </g></g><g transform="translate(112 98)" fill="currentColor"><path d="M3.6 0.0V-28.700000000000003V-52.800000000000004H17.6V-31.8H18.400000000000002Q19.0 -40.2 20.75 -45.050000000000004Q22.5 -49.900000000000006 25.15 -51.95Q27.8 -54.0 31.1 -54.0Q32.9 -54.0 34.85 -53.5Q36.800000000000004 -53.0 38.7 -51.900000000000006L37.9 -33.9Q35.7 -35.2 33.6 -35.85Q31.5 -36.5 29.6 -36.5Q26.400000000000002 -36.5 24.200000000000003 -34.7Q22.0 -32.9 20.85 -29.4Q19.700000000000003 -25.900000000000002 19.700000000000003 -20.900000000000002V0.0Z"/><path d="M67.7 1.4000000000000001Q60.2 1.4000000000000001 55.150000000000006 -0.7500000000000001Q50.1 -2.9000000000000004 47.0 -6.65Q43.9 -10.4 42.55 -15.2Q41.2 -20.0 41.2 -25.3Q41.2 -31.0 42.650000000000006 -36.2Q44.1 -41.400000000000006 47.150000000000006 -45.45Q50.2 -49.5 55.050000000000004 -51.85Q59.900000000000006 -54.2 66.7 -54.2Q73.5 -54.2 78.35 -51.85Q83.2 -49.5 86.1 -45.3Q89.0 -41.1 89.85 -35.6Q90.7 -30.1 89.6 -23.700000000000003L51.3 -23.1V-31.900000000000002L77.2 -32.4L75.1 -27.3Q75.7 -31.900000000000002 74.95 -35.050000000000004Q74.2 -38.2 72.2 -39.85Q70.2 -41.5 66.7 -41.5Q63.0 -41.5 60.8 -39.6Q58.6 -37.7 57.7 -34.25Q56.8 -30.8 56.8 -26.1Q56.8 -18.0 59.5 -14.3Q62.2 -10.600000000000001 67.8 -10.600000000000001Q70.2 -10.600000000000001 71.80000000000001 -11.200000000000001Q73.4 -11.8 74.4 -12.950000000000001Q75.4 -14.100000000000001 75.80000000000001 -15.750000000000002Q76.2 -17.400000000000002 76.1 -19.5L90.9 -18.7Q91.2 -15.4 90.25 -11.9Q89.30000000000001 -8.4 86.7 -5.4Q84.1 -2.4000000000000004 79.45 -0.5000000000000001Q74.80000000000001 1.4000000000000001 67.7 1.4000000000000001Z"/><path d="M107.9 0.0 92.0 -52.800000000000004H109.2L118.30000000000001 -13.4H118.7L128.2 -52.800000000000004H144.4L128.5 0.0Z"/><path d="M147.29999999999998 0.0V-52.800000000000004H163.5V0.0ZM155.29999999999998 -56.6Q150.7 -56.6 148.25 -58.550000000000004Q145.79999999999998 -60.50000000000001 145.79999999999998 -64.2Q145.79999999999998 -68.0 148.25 -69.94999999999999Q150.7 -71.89999999999999 155.29999999999998 -71.89999999999999Q159.99999999999997 -71.89999999999999 162.45 -69.89999999999999Q164.89999999999998 -67.89999999999999 164.89999999999998 -64.2Q164.89999999999998 -60.6 162.45 -58.6Q159.99999999999997 -56.6 155.29999999999998 -56.6Z"/><path d="M168.1 0.0V-13.600000000000001L193.2 -39.2V-39.800000000000004H168.6V-52.800000000000004H212.1V-39.1L187.0 -13.4V-13.0H212.4V0.0Z"/><path d="M241.60000000000002 1.4000000000000001Q234.0 1.4000000000000001 228.10000000000002 -1.65Q222.20000000000002 -4.7 218.9 -10.85Q215.6 -17.0 215.6 -26.3Q215.6 -36.0 219.05 -42.150000000000006Q222.5 -48.300000000000004 228.45 -51.25Q234.4 -54.2 241.9 -54.2Q249.70000000000002 -54.2 255.55 -51.150000000000006Q261.4 -48.1 264.65 -41.95Q267.9 -35.800000000000004 267.9 -26.400000000000002Q267.9 -16.7 264.45 -10.55Q261.0 -4.4 255.05 -1.5Q249.10000000000002 1.4000000000000001 241.60000000000002 1.4000000000000001ZM242.0 -10.5Q245.10000000000002 -10.5 247.20000000000002 -12.25Q249.3 -14.0 250.4 -17.4Q251.5 -20.8 251.5 -25.5Q251.5 -30.700000000000003 250.3 -34.25Q249.10000000000002 -37.800000000000004 246.85000000000002 -39.7Q244.60000000000002 -41.6 241.4 -41.6Q238.4 -41.6 236.3 -39.85Q234.20000000000002 -38.1 233.10000000000002 -34.7Q232.0 -31.3 232.0 -26.5Q232.0 -18.900000000000002 234.65 -14.700000000000001Q237.3 -10.5 242.0 -10.5Z"/><path transform="translate(71.06320000000001 -70.2) rotate(30) scale(1.0)" d="M0 -14c6 8 9 12.5 9 16.5a9 9 0 0 1-18 0c0-4 3-8.5 9-16.5z" fill="var(--bic)"/></g></svg>`;

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
