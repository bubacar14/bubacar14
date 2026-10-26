// Banque de questions commune aux programmes francophones d'Afrique de l'Ouest.
// niveau : "bac" (Terminale) ou "brevet" (BFEM / BEPC / DEF).
const QUESTIONS = [
  // SVT
  { id: "svt1", matiere: "SVT", niveau: "bac", q: "Quel organite est le siège de la respiration cellulaire ?", choix: ["Le noyau", "La mitochondrie", "Le chloroplaste", "Le ribosome"], bonne: 1, explication: "La mitochondrie oxyde le glucose et produit l'ATP : c'est la « centrale énergétique » de la cellule." },
  { id: "svt2", matiere: "SVT", niveau: "brevet", q: "Combien de chromosomes possède une cellule somatique humaine ?", choix: ["23", "44", "46", "48"], bonne: 2, explication: "46 chromosomes, soit 23 paires. Les gamètes n'en ont que 23." },
  { id: "svt3", matiere: "SVT", niveau: "bac", q: "À la fin de la méiose, une cellule mère donne :", choix: ["2 cellules diploïdes", "2 cellules haploïdes", "4 cellules diploïdes", "4 cellules haploïdes"], bonne: 3, explication: "Deux divisions successives donnent 4 cellules haploïdes (n chromosomes)." },
  { id: "svt4", matiere: "SVT", niveau: "bac", q: "Quelle hormone fait baisser la glycémie ?", choix: ["Le glucagon", "L'adrénaline", "L'insuline", "Le cortisol"], bonne: 2, explication: "L'insuline, sécrétée par les cellules β du pancréas, est la seule hormone hypoglycémiante." },
  { id: "svt5", matiere: "SVT", niveau: "brevet", q: "Où se déroule la photosynthèse dans la cellule végétale ?", choix: ["Dans le chloroplaste", "Dans la vacuole", "Dans la mitochondrie", "Dans la paroi"], bonne: 0, explication: "Le chloroplaste contient la chlorophylle qui capte l'énergie lumineuse." },
  { id: "svt6", matiere: "SVT", niveau: "brevet", q: "Quelle molécule porte l'information génétique ?", choix: ["Le glucose", "L'ADN", "L'ATP", "L'hémoglobine"], bonne: 1, explication: "L'ADN, dans le noyau, porte les gènes." },

  // Physique-Chimie
  { id: "pc1", matiere: "PC", niveau: "brevet", q: "Quelle est l'unité de la résistance électrique ?", choix: ["Le volt", "L'ampère", "L'ohm", "Le watt"], bonne: 2, explication: "La résistance se mesure en ohms (Ω)." },
  { id: "pc2", matiere: "PC", niveau: "brevet", q: "La loi d'Ohm s'écrit :", choix: ["U = R × I", "U = R / I", "P = U / I", "I = U × R"], bonne: 0, explication: "U (V) = R (Ω) × I (A)." },
  { id: "pc3", matiere: "PC", niveau: "brevet", q: "Quel est le pH d'une solution neutre à 25 °C ?", choix: ["0", "5", "7", "14"], bonne: 2, explication: "pH = 7 : neutre. En dessous, c'est acide, au-dessus, basique." },
  { id: "pc4", matiere: "PC", niveau: "bac", q: "L'énergie cinétique d'un solide en translation vaut :", choix: ["m·g·h", "½·m·v²", "m·v", "½·m·v"], bonne: 1, explication: "Ec = ½ m v², avec m en kg et v en m/s : le résultat est en joules." },
  { id: "pc5", matiere: "PC", niveau: "bac", q: "Valeur approchée de la vitesse de la lumière dans le vide :", choix: ["3 × 10⁵ m/s", "3 × 10⁸ m/s", "3 × 10⁸ km/s", "340 m/s"], bonne: 1, explication: "c ≈ 3 × 10⁸ m/s. 340 m/s, c'est le son dans l'air." },
  { id: "pc6", matiere: "PC", niveau: "bac", q: "Charge élémentaire de l'électron :", choix: ["+1,6 × 10⁻¹⁹ C", "−1,6 × 10⁻¹⁹ C", "−9,1 × 10⁻³¹ C", "−1 C"], bonne: 1, explication: "q = −e = −1,6 × 10⁻¹⁹ C. La valeur 9,1 × 10⁻³¹ est sa masse en kg." },

  // Maths
  { id: "m1", matiere: "Maths", niveau: "bac", q: "La dérivée de f(x) = x² est :", choix: ["x", "2x", "x²/2", "2"], bonne: 1, explication: "(xⁿ)' = n·xⁿ⁻¹, donc (x²)' = 2x." },
  { id: "m2", matiere: "Maths", niveau: "bac", q: "ln(1) est égal à :", choix: ["0", "1", "e", "Non défini"], bonne: 0, explication: "ln(1) = 0 car e⁰ = 1." },
  { id: "m3", matiere: "Maths", niveau: "bac", q: "La dérivée de eˣ est :", choix: ["x·eˣ⁻¹", "eˣ", "ln x", "1/x"], bonne: 1, explication: "La fonction exponentielle est sa propre dérivée." },
  { id: "m4", matiere: "Maths", niveau: "brevet", q: "La somme des angles d'un triangle vaut :", choix: ["90°", "180°", "270°", "360°"], bonne: 1, explication: "Dans tout triangle, la somme des angles fait 180°." },
  { id: "m5", matiere: "Maths", niveau: "bac", q: "Le discriminant de ax² + bx + c est :", choix: ["b² − 4ac", "b² + 4ac", "4ac − b²", "−b / 2a"], bonne: 0, explication: "Δ = b² − 4ac. Si Δ > 0, l'équation a deux solutions réelles." },
  { id: "m6", matiere: "Maths", niveau: "bac", q: "Une primitive de 1/x sur ]0 ; +∞[ est :", choix: ["−1/x²", "ln x", "eˣ", "x²/2"], bonne: 1, explication: "(ln x)' = 1/x, donc ln x est une primitive de 1/x." },

  // Histoire-Géo
  { id: "hg1", matiere: "Histoire-Géo", niveau: "brevet", q: "En quelle année la plupart des pays d'Afrique de l'Ouest francophone deviennent-ils indépendants ?", choix: ["1945", "1958", "1960", "1975"], bonne: 2, explication: "1960, « l'année de l'Afrique ». La Guinée, elle, est indépendante dès 1958." },
  { id: "hg2", matiere: "Histoire-Géo", niveau: "brevet", q: "Qui fonde l'empire du Mali au XIIIᵉ siècle ?", choix: ["Soundiata Keïta", "Kankou Moussa", "Sonni Ali Ber", "El Hadj Omar"], bonne: 0, explication: "Soundiata Keïta, après la bataille de Kirina (vers 1235)." },
  { id: "hg3", matiere: "Histoire-Géo", niveau: "brevet", q: "Quelle organisation régionale est créée à Lagos en 1975 ?", choix: ["L'UEMOA", "L'OUA", "La CEDEAO", "L'UA"], bonne: 2, explication: "La CEDEAO (Communauté économique des États de l'Afrique de l'Ouest) est créée le 28 mai 1975." },
  { id: "hg4", matiere: "Histoire-Géo", niveau: "brevet", q: "Quel est le plus long fleuve d'Afrique de l'Ouest ?", choix: ["Le Sénégal", "La Volta", "Le Niger", "La Gambie"], bonne: 2, explication: "Le Niger, environ 4 200 km, traverse la Guinée, le Mali, le Niger, le Bénin et le Nigeria." },
  { id: "hg5", matiere: "Histoire-Géo", niveau: "bac", q: "La conférence de Berlin, qui organise le partage de l'Afrique, se tient en :", choix: ["1815", "1884-1885", "1914", "1945"], bonne: 1, explication: "De novembre 1884 à février 1885." },
  { id: "hg6", matiere: "Histoire-Géo", niveau: "bac", q: "Premier pays d'Afrique subsaharienne colonisée à devenir indépendant (1957) :", choix: ["Le Sénégal", "Le Ghana", "La Guinée", "Le Nigeria"], bonne: 1, explication: "Le Ghana de Kwame Nkrumah, le 6 mars 1957." },

  // Philosophie
  { id: "ph1", matiere: "Philo", niveau: "bac", q: "« Je pense, donc je suis » est de :", choix: ["Platon", "Descartes", "Kant", "Sartre"], bonne: 1, explication: "René Descartes, Discours de la méthode (1637)." },
  { id: "ph2", matiere: "Philo", niveau: "bac", q: "Qui a écrit « Nations nègres et culture » ?", choix: ["Léopold S. Senghor", "Frantz Fanon", "Cheikh Anta Diop", "Aimé Césaire"], bonne: 2, explication: "Cheikh Anta Diop, 1954. Il y défend l'antériorité des civilisations nègres." },
  { id: "ph3", matiere: "Philo", niveau: "bac", q: "L'allégorie de la caverne est de :", choix: ["Aristote", "Socrate", "Platon", "Épicure"], bonne: 2, explication: "Platon, La République, livre VII." },
  { id: "ph4", matiere: "Philo", niveau: "bac", q: "« L'homme est condamné à être libre » :", choix: ["Sartre", "Nietzsche", "Rousseau", "Hegel"], bonne: 0, explication: "Jean-Paul Sartre, L'existentialisme est un humanisme." },

  // Français
  { id: "fr1", matiere: "Français", niveau: "brevet", q: "Qui a écrit « L'Enfant noir » ?", choix: ["Camara Laye", "Ousmane Sembène", "Bernard Dadié", "Mongo Beti"], bonne: 0, explication: "Camara Laye (Guinée), 1953." },
  { id: "fr2", matiere: "Français", niveau: "brevet", q: "« Une si longue lettre » est un roman de :", choix: ["Aminata Sow Fall", "Mariama Bâ", "Ken Bugul", "Fatou Diome"], bonne: 1, explication: "Mariama Bâ (Sénégal), 1979." },
  { id: "fr3", matiere: "Français", niveau: "bac", q: "Qui a écrit « Les Soleils des indépendances » ?", choix: ["Ahmadou Kourouma", "Amadou Hampâté Bâ", "Seydou Badian", "Yambo Ouologuem"], bonne: 0, explication: "Ahmadou Kourouma (Côte d'Ivoire), 1968." },
];
