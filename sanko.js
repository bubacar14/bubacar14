// Lumi, la mascotte de Révizo : un oiseau inspiré de Sankofa, l'oiseau adinkra qui se retourne
// pour reprendre ce qu'il a laissé derrière lui. Ses couleurs sont fixes, dans les deux thèmes.
// Humeurs : content, joie, reflechit, encourage, dort, fier.
(function () {
  const C = {
    corps: "#ffc21a",
    ombre: "#f2a50c",
    ventre: "#fff1c7",
    plume: "#f3cf6e",
    aile: "#f5a30a",
    aileOmbre: "#d98400",
    encre: "#141a33",
    bec: "#ff7a1a",
    becBas: "#e0590a",
    bouche: "#7a1f0a",
    huppe: "#2563eb",
    huppeFonce: "#1d47c0",
    joue: "#ff8a5c",
  };

  // Un œil : blanc ovale, pupille et deux reflets. dx/dy orientent le regard.
  function oeil(cx, dx = 0, dy = 0) {
    return `<ellipse cx="${cx}" cy="60" rx="12" ry="13.5" fill="#fff"/>
      <circle cx="${cx + 1 + dx}" cy="${61 + dy}" r="7" fill="${C.encre}"/>
      <circle cx="${cx + 3.5 + dx}" cy="${57.5 + dy}" r="2.6" fill="#fff"/>
      <circle cx="${cx - 1 + dx}" cy="${64 + dy}" r="1.2" fill="#fff"/>`;
  }

  function yeux(humeur) {
    const trait = `fill="none" stroke="${C.encre}" stroke-width="4" stroke-linecap="round"`;
    switch (humeur) {
      case "joie":
      case "fier":
        return `<path d="M37 63q10-12 20 0M63 63q10-12 20 0" ${trait} stroke-width="4.5"/>`;
      case "dort":
        return `<path d="M38 62q9 6 18 0M64 62q9 6 18 0" ${trait}/>`;
      case "reflechit":
        return `<g class="sanko-pupilles">${oeil(47, -3, -5)}${oeil(73, -3, -5)}</g>
          <path d="M63 42q10-7 20 0" ${trait} stroke-width="3.5"/>`;
      case "encourage":
        return `<g class="sanko-pupilles">${oeil(47, 0, 2)}${oeil(73, 0, 2)}</g>
          <path d="M38 44q8-5 16-1M66 43q8-4 16 1" ${trait} stroke-width="3.5"/>`;
      default:
        return `<g class="sanko-pupilles">${oeil(47)}${oeil(73)}</g>`;
    }
  }

  function bec(humeur) {
    if (humeur === "joie") {
      return `<path d="M50 71q10-5 20 0q-2 5-10 6q-8-1-10-6z" fill="${C.bec}"/>
        <path d="M52 76q8 2 16 0q-2 9-8 9t-8-9z" fill="${C.bouche}"/>
        <path d="M55 81q5 3 10 0q-2 4-5 4t-5-4z" fill="${C.becBas}"/>`;
    }
    return `<path d="M50 70q10-5 20 0q-3 9-10 10q-7-1-10-10z" fill="${C.bec}"/>
      <path d="M53 76q7 3 14 0q-3 4-7 4.5q-4-.5-7-4.5z" fill="${C.becBas}"/>`;
  }

  // Ailes : posées, levées (joie), une aile qui salue (encourage) ou au menton (réfléchit).
  function ailes(humeur) {
    const posee = (sens) => `<path d="M${60 - 37 * sens} 70c${-9 * sens} 5 ${-11 * sens} 19 ${-5 * sens} 27c${7 * sens} 0 ${13 * sens}-8 ${13 * sens}-18c0-5 ${-3 * sens}-9 ${-8 * sens}-9z" fill="${C.aile}"/>`;
    const levee = (sens) => `<path d="M${60 - 35 * sens} 74c${-10 * sens}-2 ${-18 * sens}-10 ${-20 * sens}-19c${10 * sens}-2 ${20 * sens} 3 ${25 * sens} 12z" fill="${C.aile}"/>
      <path d="M${60 - 48 * sens} 59l${12 * sens} 8" fill="none" stroke="${C.aileOmbre}" stroke-width="2" stroke-linecap="round"/>`;
    if (humeur === "joie") return `<g class="sanko-aile-g">${levee(1)}</g><g class="sanko-aile-d">${levee(-1)}</g>`;
    if (humeur === "encourage") return `<g class="sanko-aile-g">${posee(1)}</g><g class="sanko-aile-d sanko-salue">${levee(-1)}</g>`;
    if (humeur === "reflechit") {
      return `<g class="sanko-aile-g">${posee(1)}</g>
        <path class="sanko-aile-d" d="M95 72c-6 6-18 9-26 6c0-6 8-12 17-13c5 0 8 3 9 7z" fill="${C.aile}"/>`;
    }
    return `<g class="sanko-aile-g">${posee(1)}</g><g class="sanko-aile-d">${posee(-1)}</g>`;
  }

  // Logo Révizo : tête de Lumi + mot vectorisé (Bricolage Grotesque 800), goutte d'encre en accent.
  window.LOGO_REVIZO = `<svg class="logo-svg" viewBox="0 0 389 116" role="img" aria-label="Révizo"><g transform="translate(0 10)"><g transform="">
      <path d="M36 8c5 6 7 10 7 13a7 7 0 0 1-14 0c0-3 2-7 7-13z" fill="#1d47c0" transform="rotate(-24 36 20)"/>
      <path d="M50 2c9 12 13 19 13 25a13 13 0 0 1-26 0c0-6 4-13 13-25z" fill="var(--bic)"/>
      <circle cx="50" cy="60" r="38" fill="#ffc21a"/>
      <path d="M88 60a38 38 0 0 1-38 38c18-5 31-20 31-39c0-11-4-21-10-28c10 7 17 17 17 29z" fill="#f2a50c" opacity=".7"/>
      <path d="M14 66c-3 10 0 20 8 26 2-9 0-18-8-26zM86 66c3 10 0 20-8 26-2-9 0-18 8-26z" fill="#f5a30a"/>
      <ellipse cx="37" cy="55" rx="11" ry="12" fill="#fff"/><ellipse cx="63" cy="55" rx="11" ry="12" fill="#fff"/>
      <circle cx="38" cy="56" r="6.2" fill="#141a33"/><circle cx="64" cy="56" r="6.2" fill="#141a33"/>
      <circle cx="40.5" cy="52.8" r="2.3" fill="#fff"/><circle cx="66.5" cy="52.8" r="2.3" fill="#fff"/>
      <path d="M41 66q9-5 18 0q-3 8-9 9q-6-1-9-9z" fill="#ff7a1a"/>
    </g></g><g transform="translate(112 98)" fill="currentColor"><path d="M3.6 0.0V-28.700000000000003V-52.800000000000004H17.6V-31.8H18.400000000000002Q19.0 -40.2 20.75 -45.050000000000004Q22.5 -49.900000000000006 25.15 -51.95Q27.8 -54.0 31.1 -54.0Q32.9 -54.0 34.85 -53.5Q36.800000000000004 -53.0 38.7 -51.900000000000006L37.9 -33.9Q35.7 -35.2 33.6 -35.85Q31.5 -36.5 29.6 -36.5Q26.400000000000002 -36.5 24.200000000000003 -34.7Q22.0 -32.9 20.85 -29.4Q19.700000000000003 -25.900000000000002 19.700000000000003 -20.900000000000002V0.0Z"/><path d="M67.7 1.4000000000000001Q60.2 1.4000000000000001 55.150000000000006 -0.7500000000000001Q50.1 -2.9000000000000004 47.0 -6.65Q43.9 -10.4 42.55 -15.2Q41.2 -20.0 41.2 -25.3Q41.2 -31.0 42.650000000000006 -36.2Q44.1 -41.400000000000006 47.150000000000006 -45.45Q50.2 -49.5 55.050000000000004 -51.85Q59.900000000000006 -54.2 66.7 -54.2Q73.5 -54.2 78.35 -51.85Q83.2 -49.5 86.1 -45.3Q89.0 -41.1 89.85 -35.6Q90.7 -30.1 89.6 -23.700000000000003L51.3 -23.1V-31.900000000000002L77.2 -32.4L75.1 -27.3Q75.7 -31.900000000000002 74.95 -35.050000000000004Q74.2 -38.2 72.2 -39.85Q70.2 -41.5 66.7 -41.5Q63.0 -41.5 60.8 -39.6Q58.6 -37.7 57.7 -34.25Q56.8 -30.8 56.8 -26.1Q56.8 -18.0 59.5 -14.3Q62.2 -10.600000000000001 67.8 -10.600000000000001Q70.2 -10.600000000000001 71.80000000000001 -11.200000000000001Q73.4 -11.8 74.4 -12.950000000000001Q75.4 -14.100000000000001 75.80000000000001 -15.750000000000002Q76.2 -17.400000000000002 76.1 -19.5L90.9 -18.7Q91.2 -15.4 90.25 -11.9Q89.30000000000001 -8.4 86.7 -5.4Q84.1 -2.4000000000000004 79.45 -0.5000000000000001Q74.80000000000001 1.4000000000000001 67.7 1.4000000000000001Z"/><path d="M107.9 0.0 92.0 -52.800000000000004H109.2L118.30000000000001 -13.4H118.7L128.2 -52.800000000000004H144.4L128.5 0.0Z"/><path d="M147.29999999999998 0.0V-52.800000000000004H163.5V0.0ZM155.29999999999998 -56.6Q150.7 -56.6 148.25 -58.550000000000004Q145.79999999999998 -60.50000000000001 145.79999999999998 -64.2Q145.79999999999998 -68.0 148.25 -69.94999999999999Q150.7 -71.89999999999999 155.29999999999998 -71.89999999999999Q159.99999999999997 -71.89999999999999 162.45 -69.89999999999999Q164.89999999999998 -67.89999999999999 164.89999999999998 -64.2Q164.89999999999998 -60.6 162.45 -58.6Q159.99999999999997 -56.6 155.29999999999998 -56.6Z"/><path d="M168.1 0.0V-13.600000000000001L193.2 -39.2V-39.800000000000004H168.6V-52.800000000000004H212.1V-39.1L187.0 -13.4V-13.0H212.4V0.0Z"/><path d="M241.60000000000002 1.4000000000000001Q234.0 1.4000000000000001 228.10000000000002 -1.65Q222.20000000000002 -4.7 218.9 -10.85Q215.6 -17.0 215.6 -26.3Q215.6 -36.0 219.05 -42.150000000000006Q222.5 -48.300000000000004 228.45 -51.25Q234.4 -54.2 241.9 -54.2Q249.70000000000002 -54.2 255.55 -51.150000000000006Q261.4 -48.1 264.65 -41.95Q267.9 -35.800000000000004 267.9 -26.400000000000002Q267.9 -16.7 264.45 -10.55Q261.0 -4.4 255.05 -1.5Q249.10000000000002 1.4000000000000001 241.60000000000002 1.4000000000000001ZM242.0 -10.5Q245.10000000000002 -10.5 247.20000000000002 -12.25Q249.3 -14.0 250.4 -17.4Q251.5 -20.8 251.5 -25.5Q251.5 -30.700000000000003 250.3 -34.25Q249.10000000000002 -37.800000000000004 246.85000000000002 -39.7Q244.60000000000002 -41.6 241.4 -41.6Q238.4 -41.6 236.3 -39.85Q234.20000000000002 -38.1 233.10000000000002 -34.7Q232.0 -31.3 232.0 -26.5Q232.0 -18.900000000000002 234.65 -14.700000000000001Q237.3 -10.5 242.0 -10.5Z"/><path transform="translate(71.06320000000001 -70.2) rotate(30) scale(1.0)" d="M0 -14c6 8 9 12.5 9 16.5a9 9 0 0 1-18 0c0-4 3-8.5 9-16.5z" fill="var(--bic)"/></g></svg>`;

  window.sanko = function (humeur = "content", taille = 96, extra = "") {
    const fier = humeur === "fier";
    return `<svg class="sanko sanko-${humeur} ${extra}" width="${taille}" height="${taille}" viewBox="0 0 120 120" role="img" aria-label="Lumi">
      <ellipse cx="60" cy="116" rx="30" ry="3.5" fill="${C.encre}" opacity=".12"/>
      <g class="sanko-corps">
        <path d="M47 106c-6 0-10 4-10 8h20c0-4-4-8-10-8zM73 106c-6 0-10 4-10 8h20c0-4-4-8-10-8z" fill="${C.bec}"/>
        <g class="sanko-huppe">
          <path d="M47 10c5 6 7 10 7 13a7 7 0 0 1-14 0c0-3 2-7 7-13z" fill="${C.huppeFonce}" transform="rotate(-24 47 22)"/>
          <path d="M60 3c8 10 12 16 12 22a12 12 0 0 1-24 0c0-6 4-12 12-22z" fill="${C.huppe}"/>
          <ellipse cx="56" cy="22" rx="2.6" ry="4.2" fill="#fff" opacity=".45" transform="rotate(20 56 22)"/>
        </g>
        <path d="M60 24c28 0 41 23 41 48c0 24-18 39-41 39s-41-15-41-39c0-25 13-48 41-48z" fill="${C.corps}"/>
        <path d="M101 72c0 24-18 39-41 39c19-5 34-19 35-41c1-12-3-23-9-31c10 8 15 20 15 33z" fill="${C.ombre}" opacity=".7"/>
        <ellipse cx="40" cy="38" rx="9" ry="5" fill="#fff" opacity=".35" transform="rotate(-32 40 38)"/>
        <path d="M60 70c14 0 25 9 25 20s-11 17-25 17s-25-6-25-17s11-20 25-20z" fill="${C.ventre}"/>
        <path d="M53 88l3 3l3-3M61 88l3 3l3-3M57 96l3 3l3-3" fill="none" stroke="${C.plume}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        ${ailes(humeur)}
        <ellipse cx="31" cy="75" rx="6.5" ry="4" fill="${C.joue}" opacity=".55"/>
        <ellipse cx="89" cy="75" rx="6.5" ry="4" fill="${C.joue}" opacity=".55"/>
        <g class="sanko-yeux">${yeux(humeur)}</g>
        ${bec(humeur)}
        ${fier ? `<ellipse cx="60" cy="95" rx="10" ry="12" fill="#fffaf0" stroke="${C.aileOmbre}" stroke-width="2"/>
          <path d="M28 82c6 8 16 12 24 10M92 82c-6 8-16 12-24 10" fill="none" stroke="${C.aile}" stroke-width="7" stroke-linecap="round"/>` : ""}
        ${humeur === "dort" ? `<path d="M88 28h8l-8 9h8M100 14h6l-6 7h6" fill="none" stroke="${C.huppe}" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>` : ""}
      </g>
    </svg>`;
  };
})();
