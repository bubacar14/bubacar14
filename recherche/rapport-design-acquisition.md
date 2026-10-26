# Révizo : rapport final produit et croissance

*Synthèse de 7 rapports de recherche (concurrents solveurs, engagement, edtech africaine, applis IA « wrappers », conversion, publicité, appareils d'entrée de gamme). J'ai aussi relu le code actuel de Révizo dans `/home/user/bubacar14` pour que le plan d'action parte de l'appli telle qu'elle est. Date : 26 octobre 2026.*

---

## 0. À lire avant tout : la consigne des 30 à 50 recherches sourcées n'est pas remplie

Tu as demandé que chaque chercheur fasse au moins 30 à 50 recherches et cite ses sources. **Ce n'est pas le cas.**

| Rapport | Recherches web abouties | Pages lues avec succès | Ce qui est vérifié |
|---|---|---|---|
| Solveurs (Photomath, Gauth…) | 0 sur 4 | 0 sur 6 | rien |
| Engagement (Duolingo, Anki…) | 0 sur 5 | 7 sur 18 (GitHub) | répétition espacée (FSRS, HLR) |
| Afrique (uLesson, Eneza…) | 0 sur 4 | 0 sur 4 | **rien : rapport non produit** |
| Wrappers IA (Higgsfield…) | 0 sur 4 | 0 sur 5, plus 6 lectures du connecteur Higgsfield | tarifs et galeries Higgsfield |
| Conversion (onboarding, paywall) | 0 sur 5 | 0 sur 3 | rien |
| Publicité (TikTok, Meta) | 0 sur 5 | 0 sur 5 | rien |
| Appareils d'entrée de gamme et data | 0 sur 3 | environ 55 sur 97 | études de cas PWA, Android Go, HTTP Archive, MDN |
| **Total** | **0 sur 30** | **environ 62 sur 138** | |

**Ce qui a bloqué :** le quota de 200 recherches web partagé par tous les agents du workflow était épuisé avant leur passage. Le proxy réseau bloquait aussi la plupart des sites (Wikipédia, Duolingo, Meta, TikTok, GSMA, Wave, offices du BAC, YouTube, Reddit, stores d'applis).

**Ce que ça implique :**
- Il n'y a **aucune donnée vérifiée** sur les concurrents ouest-africains, les prix locaux, les CPM ou CPI publicitaires en Afrique de l'Ouest, les dates d'examen ou les frais du mobile money.
- Une nouvelle passe de recherche est nécessaire, avec du quota de recherche et un accès réseau. **Priorités :**
  1. prix publicitaires au Sénégal et en Côte d'Ivoire ;
  2. concurrents locaux ;
  3. frais et prélèvements Wave et Orange Money ;
  4. règles publicitaires pour les mineurs ;
  5. calendriers officiels des examens ;
  6. avis Google Play sur Gauth et Photomath.

**Les marqueurs utilisés dans ce rapport :**
- **[Vérifié]** : source lue pendant les recherches (URL donnée). Attention, une source lue n'est pas une vérité absolue : beaucoup d'études de cas web.dev sont des chiffres annoncés par les entreprises elles-mêmes, en 2016-2017.
- **[Non vérifié]** : connaissance antérieure d'un agent, non relue. Ce sont des ordres de grandeur à confirmer avant de les citer.
- **[Hypothèse]** : jugement d'analyste, à tester.
- **[Code]** : constaté dans le code actuel de Révizo.

---

## 1. Les 10 enseignements clés

### 1. Une appli web légère bat l'appli native là où la data est chère — [Vérifié]
- **Konga (Nigeria)** : sa PWA consomme 92 % de data en moins au premier chargement que l'appli native, et 82 % de moins pour une première transaction. Près des deux tiers de ses utilisateurs étaient en 2G. — https://web.dev/konga/
- **Ola (Inde)** : la PWA pèse environ 200 Ko contre 60 Mo pour l'appli, et une visite répétée environ 10 Ko. La conversion est 30 % plus haute que l'appli native dans les petites villes. 20 % des réservants avaient déjà désinstallé l'appli native. — https://web.dev/ola/
- **Jumia** : le CEO dit que ses clients « redoutent l'impact sur leur facture de données ». — https://web.dev/jumia2016/
- **À comparer :** une page mobile médiane pèse 2 311 Ko en 2024. — HTTP Archive Almanac 2024, chapitre *Page weight*
- **Pour Révizo :** le choix de la PWA est le bon [Code]. Il faut maintenant un budget de poids strict.

### 2. Demander l'installation et les notifications au bon moment, jamais à froid — [Vérifié]
- Sur mobile, les demandes de notification sont acceptées à 19 %, refusées à 35 % et ignorées à 34 %. — Almanac 2022, chapitre *PWA*
- Jumia : 38 % d'ouverture des notifications push, et 9 fois plus de paniers récupérés. — web.dev/jumia2016
- Flipkart Lite : 60 % des visites partent de l'icône sur l'écran d'accueil, avec +70 % de conversion pour ces visiteurs. — web.dev/flipkart
- Aujourd'hui, Révizo ne propose ni l'installation ni les notifications [Code].

### 3. Montrer la valeur avant de demander quoi que ce soit — [Non vérifié], avec un parcours analogue [Vérifié]
- Duolingo fait faire une leçon avant la création du compte. Photomath et Gauth ouvrent directement sur la caméra. [Non vérifié]
- Les PWA Konga et Ola vont du lien au premier usage, sans passer par le store. [Vérifié]
- Aujourd'hui, au premier lancement, Révizo **ouvre d'abord une fenêtre de choix du pays**, avant toute valeur [Code, `app.js` en fin de fichier : `if (!state.country) openCountryPicker()`].

### 4. La réponse brute ne vaut plus rien : la valeur est dans l'accompagnement — [Non vérifié]
- L'action Chegg s'est effondrée en mai 2023 quand la direction a reconnu l'effet de ChatGPT sur ses inscriptions.
- ChatGPT a lancé un « mode Étude » (2025), Gemini un « Guided Learning » (2025). Khanmigo ne donne pas directement la réponse.
- Les géants de l'IA vont tous vers le guidage pas à pas.
- **Pour Révizo [Hypothèse] :** « On t'explique, on ne fait pas à ta place » est à la fois la différenciation face à ChatGPT gratuit et l'argument auprès des parents qui paient.

### 5. La révision espacée des erreurs est la fonction la mieux fondée scientifiquement
- **[Non vérifié] :** Dunlosky et al. (2013) classent la pratique de test et la pratique espacée comme les deux seules techniques d'étude « à utilité élevée ». Cepeda et al. (2006) confirment l'effet d'espacement sur 254 études.
- **[Vérifié] :** sur environ 350 millions de révisions, l'algorithme FSRS prédit l'oubli mieux que le modèle HLR de Duolingo (perte logarithmique 0,346 contre 0,469). — https://github.com/open-spaced-repetition/srs-benchmark
- **[Code] :** Révizo a déjà une répétition espacée (1, 3, 7, 15 jours). Mais elle ne porte que sur les 30 questions de quiz : **les exercices de « Mon exercice » ne l'alimentent pas.**

### 6. Une série de jours bienveillante crée l'habitude, une série cassée fait décrocher — [Non vérifié]
- Lally et al. (2010) : il faut environ 66 jours en médiane pour qu'un geste devienne automatique, et manquer un jour isolé ne casse pas l'habitude.
- Silverman & Barasch (2023) : une série interrompue réduit l'engagement qui suit.
- Duolingo annonce qu'un widget de série a augmenté l'engagement d'environ 60 %, et que les apprenants à 7 jours de série sont environ 3,6 fois plus susceptibles de rester.
- **Ce qu'il faut en retenir :** des gels de série gratuits, et une réparation possible dans les 24 h.

### 7. Ne jamais punir l'erreur dans une appli qui apprend par l'erreur — [Non vérifié]
- Les cœurs de Duolingo, puis son système d'énergie, sont très critiqués.
- Hanus & Fox (2015) : un cours gamifié avec classements imposés a donné une motivation et des notes **plus basses**.
- Kahoot : le chrono pousse à répondre au hasard.
- **Pour Révizo :** une erreur doit **rapporter** quelque chose (XP, ajout à la révision), et les classements doivent rester optionnels et se faire entre élèves de même niveau.

### 8. Faire payer l'approfondissement, sans surprise, et ne jamais retirer une fonction gratuite — [Non vérifié]
- Plainte n°1 contre Mathway et Symbolab : les étapes bloquées juste au moment du besoin.
- Gauth et Brainly : la réponse floutée après la photo.
- Quizlet : forte colère des élèves quand Learn et Test sont passés derrière l'abonnement.
- RevenueCat : un paywall « dur » convertirait environ 10 % des téléchargements en payants à J35, contre environ 2 % en freemium. Ce chiffre est à vérifier, et peu transposable au mobile money.

### 9. Des crédits lisibles, stables, qui n'expirent pas et sans fausse urgence — [Vérifié] par le contre-exemple Higgsfield
Grille Higgsfield lue via le connecteur le 26/10/2026 :
- **Chiffres contradictoires :** l'offre PLUS annonce 1 000 crédits dans un champ et 1 200 dans un autre, puis « ~4 800 images » mais aussi « 600 générations » selon le modèle utilisé.
- **Crédits rechargés qui expirent à 90 jours.**
- **Fausse urgence :** prix barrés sur tous les packs et mention « Buy until: Oct 27 » la veille de cette date.
- **Recharge automatique poussée en premier.**
- **Essai qui exige une carte bancaire.**
- **Ce qui marche chez eux :** traduire les crédits en résultats concrets, et séparer l'illimité bon marché du premium payé au crédit.

**[Code]** Révizo affiche des « ⚡ » abstraits : 10 ⚡ par exercice, 5 ⚡ par quiz. L'élève doit faire le calcul lui-même.

### 10. La fiabilité est le produit : une erreur d'IA dite avec assurance détruit la confiance — [Non vérifié] et [Hypothèse]
- Les erreurs des solveurs IA (Gauth, Question.AI) touchent surtout les problèmes rédigés, la géométrie et la physique.
- Brainly répond par un badge « vérifiée », Gauth par un recours à un humain.
- **[Code] :** Révizo affiche seulement « Révizo peut se tromper. Vérifie avec ton professeur ». Il n'y a ni bouton de signalement ni vérification du calcul.

---

## 2. Le design recommandé

### 2.1 Accueil (ce qu'on voit, de haut en bas)

1. **Barre du haut**
   - 🔥 série : « 4 jours ».
   - Compteur en **explications** et non en ⚡ : « 📸 3 explications ».
   - Le pays passe dans le profil.
2. **Bloc principal « 📸 Mon exercice »** sur environ 40 % de l'écran.
   - Bouton « Prends ton exercice en photo ».
   - En dessous, un lien « ou écris-le ».
   - Pour un nouvel élève, la mention « Ton 1er exercice est offert, sans inscription ». **[Code]** Ce bloc existe déjà.
3. **Pour un nouvel élève seulement : 3 exemples avant / après qui défilent.** Une photo d'un vrai exercice de 3e ou de Terminale, puis le début de la correction. C'est l'équivalent des vidéos d'aperçu des presets Higgsfield [Vérifié : la galerie Viral compte 87 presets, chacun avec une vidéo d'aperçu].
4. **Carte « À revoir aujourd'hui »** : « 3 erreurs · 2 min · gratuit ». Elle remplace le texte actuel du bloc de série.
5. **Défi du jour ou dernier duel reçu** : « Awa t'a défié : 7/10. Revanche ? ».
6. **Studios et tuiles de quiz.** Il faut **retirer les tuiles « Bientôt »**, qui sont aujourd'hui des boutons sans effet [Code].
7. **Barre du bas** : Accueil · Réviser · Duels · Profil.

### 2.2 Écran « Mon exercice » (dans l'ordre)

1. **La caméra s'ouvre directement** (`capture="environment"`, déjà en place [Code]). Juste avant, un rappel : « Cadre seulement l'exercice, avec de la lumière ».
2. **Aperçu et recadrage.** Un repère « photo nette ✓ » ou « trop floue, reprends ». La classe est détectée par l'IA et seulement *confirmée* par l'élève, au lieu des 6 boutons actuels.
3. **Le coût est affiché :** « Envoi : 0,2 Mo · 1 explication ». La crainte de la facture de data est documentée chez Jumia [Vérifié].
4. **Hors connexion :** « Pas de réseau ? On l'envoie dès que ça revient ». L'exercice est mis en file d'attente dans le stockage local (IndexedDB), avec Background Sync sur Chrome et Samsung et un bouton « Réessayer » ailleurs [Vérifié : MDN, Build for Billions].
5. **Pendant l'attente, des étapes visibles :** « Je lis l'énoncé… » → « Je cherche la méthode… » → « J'écris les étapes… ». Le chargement actuel est un seul « Révizo réfléchit… ⏳ » [Code] [Hypothèse].

### 2.3 Présentation de la correction (dévoilement progressif)

Aujourd'hui, tout s'affiche d'un coup, réponse comprise [Code, `renderCorrection`]. Ordre recommandé :

1. **« Voici ce que j'ai lu »** : l'énoncé reconnu, avec un bouton « Corriger le texte » si la lecture est fausse.
2. **🧠 Le type d'exercice et la méthode** en 1 à 3 lignes. C'est ce que l'élève réutilisera.
3. **💡 Un indice**, puis deux boutons : « J'essaie seul » ou « Montre l'étape 1 ».
4. **✍️ Les étapes, une à une, en accordéon.**
   - Chaque étape a un titre, le calcul, et la ligne « pourquoi ? ».
   - La partie qui change d'une ligne à l'autre est **surlignée** (format Photomath [Non vérifié]).
   - Sous chaque étape, un bouton « Pas compris ? », qui reformule plus simplement.
5. **✅ La réponse, encadrée.** En maths, un badge « Calcul vérifié » quand un moteur de calcul formel confirme le résultat [Hypothèse], ou « À vérifier » sinon.
6. **⚠️ Les pièges**, déjà en place [Code].
7. **🔁 « À toi de jouer »**, avec trois choix : « Je l'ai réussi » / « Je me suis trompé » / « Je n'ai pas essayé ». Les deux derniers ajoutent l'exercice à « Mes erreurs », avec « +5 XP · ajouté à ta révision ».
8. **Barre d'actions** : 📤 Partager ma méthode · ⚔️ Défier un ami sur ce type d'exercice · 🚩 Cette explication est fausse (crédit rendu en un geste).
9. **Un lien discret « Tout voir d'un coup »**, toujours présent. Il évite la frustration de l'élève pressé, et c'est une variante à tester par A/B [Hypothèse].

### 2.4 Onboarding (premier lancement)

1. **Pas d'écran pays.** On arrive directement sur l'accueil avec « Ton 1er exercice est offert ». Le pays est déduit plus tard de l'indicatif du numéro, ou demandé au moment du paiement.
2. **Premier exercice → correction complète, sans flou.**
3. **Juste après** : « Garde cette correction et ta série : ton numéro ? ». Puis la classe et la série du BAC (2 choix maximum), et le code de vérification.
4. **Objectif minuscule** : « 1 révision + 1 quiz de 3 questions par jour (2 min) ».
5. **Après la 2e utilisation : « Installer Révizo »**, avec notre propre bouton déclenché par l'événement `beforeinstallprompt` [Vérifié : web.dev, *customize-install*].
6. **Notifications demandées en contexte seulement :** « On te rappelle demain de revoir tes 3 erreurs ? » [Vérifié : 35 % de refus pour les demandes à froid].

### 2.5 Paywall

**Quand il apparaît :** quand l'élève n'a plus d'explication, ou quand il demande un approfondissement. **Jamais avant la première valeur.** C'est un consensus des praticiens [Non vérifié].

**Ce qu'on voit, de haut en bas :**
1. « Il te reste 0 explication aujourd'hui. Demain : 1 offerte. »
2. Trois packs exprimés **en explications**, le prix unitaire affiché, une option « recommandée », **sans faux prix barré**.
3. Un **Pass Examen** pour la période des examens.
4. Le moyen de paiement du pays en premier (Wave et Orange Money au Sénégal, etc. ; la liste par pays existe déjà [Code]).
5. Un bouton **« Demander à un parent »**, qui envoie par WhatsApp un lien de paiement prérempli.
6. **« Gagner des explications »** : parrainage, ou 7 jours de série = 1 explication.
7. Les rassurances : « Pas de renouvellement automatique · Crédits valables toute l'année scolaire · Explication fausse = crédit rendu ».

**Ce qui reste toujours gratuit :** quiz, « Mes erreurs », duels.

### 2.6 Éléments d'habitude

- **Série de jours**
  - Elle compte **toute** activité utile : un exercice, une révision ou un quiz. Aujourd'hui, seule la fin d'un quiz la fait avancer [Code, `finishQuiz`].
  - 2 gels de série offerts, que l'élève regagne en jouant et qui ne sont jamais vendus cher. Une réparation possible dans les 24 h.
  - En période d'examens, un mode qui compte les **semaines** actives plutôt que les jours [Hypothèse].
- **Notifications**
  - **Au maximum 1 par jour**, à l'heure habituelle de l'élève.
  - Le contenu parle de lui : « 3 erreurs de fractions à revoir, 2 min ».
  - Plusieurs messages en rotation, d'après le principe Duolingo selon lequel un message répété s'use [Non vérifié].
  - Aucune culpabilisation.
  - Sur iPhone, les notifications web ne marchent que si la PWA est installée [Non vérifié]. Prévoir un **rappel WhatsApp sur inscription volontaire** en secours (coût à vérifier).
- **Ligues** : 20 à 30 élèves **de même classe et même série**, remises à zéro chaque semaine, **optionnelles**. Elles doivent récompenser la justesse, pas seulement la vitesse.
- **Défis collectifs** classe contre classe, ou lycée contre lycée. La gamification marche mieux quand la compétition se combine à la collaboration (Sailer & Homner [Non vérifié]).
- **Résumé hebdomadaire au parent** par WhatsApp : temps passé, progrès, erreurs récurrentes [Hypothèse ; modèle Khan Academy, Non vérifié].

### 2.7 Partage

- **« Partager ma méthode »** génère une image verticale 9:16 : l'énoncé, la méthode et les 2 étapes clés, le logo, et un **code de parrainage**. WhatsApp (statuts et groupes de classe) est le canal par défaut, puis TikTok et Instagram [Hypothèse : on suppose que WhatsApp domine].
- **Duel** : le lien « Je t'ai battu 8/10, à toi » existe déjà [Code]. Il faut y ajouter le code de parrainage, et un duel « même type d'exercice » à partir d'une correction.
- **Parrainage** : 2 explications pour chacun, débloquées **après la première explication du filleul**, pour limiter la fraude [Hypothèse].
- **Recevoir une photo depuis WhatsApp ou la galerie** (`share_target`) : seulement si la PWA est installée, et la fonction est expérimentale [Vérifié : MDN]. Ce n'est qu'un plus.

---

## 3. Stratégie d'acquisition

> **Aucun chiffre publicitaire (CPM, CPI, coût par inscrit) n'a été vérifié pour l'Afrique de l'Ouest.** Les montants ci-dessous sont des hypothèses de travail.

### 3.1 Les publicités

**Format** — [Non vérifié, c'est le format dominant décrit chez Gauth et Question.AI]
- Vidéo verticale de 15 à 25 s, avec la démonstration du produit **dans les 3 premières secondes** : l'exercice qui bloque, la photo, puis l'explication qui se déroule.
- Style amateur filmé au téléphone (« UGC »), joué par des élèves ou des profs locaux, en français parlé local, avec éventuellement du wolof ou du dioula pour l'accroche.

**Accroches à tester** [Hypothèse]
| Cible | Accroche |
|---|---|
| Élève, besoin immédiat | « Bloqué sur ton exo ? Prends-le en photo. » |
| Élève, gratuité | « Ton 1er exercice expliqué gratuit, sans inscription. » |
| Élève, examen | « J-30 avant le BAC : revois tes erreurs en 2 min par jour. » |
| Élève, social | « Je t'ai battu 8/10. À toi. » (format duel) |
| Parent (Facebook) | « On explique à votre enfant, on ne fait pas à sa place. Paiement Wave ou Orange Money. » |
| Parent | « Chaque dimanche, voyez ce que votre enfant a révisé. » |

**Arrivée depuis la pub**
- La pub mène **directement à l'écran « Mon exercice »**, sans store ni inscription. C'est ce qui distingue le parcours PWA [Vérifié : Konga, Ola].
- Il faut tester l'ouverture dans les navigateurs intégrés de TikTok et Facebook, où l'installation et le service worker peuvent mal fonctionner, et prévoir un bouton « Ouvrir dans Chrome » [Non vérifié].

**Ciblage** — [Non vérifié, à vérifier en priorité]
- Depuis 2023, Meta ne permettrait de cibler les moins de 18 ans que par **âge et lieu**.
- D'où deux campagnes : élèves (créatif très clair, l'algorithme optimise) et **parents** (ciblage normal sur Facebook).

**Mesure**
- Pixel Meta et pixel TikTok sur trois événements : le **premier exercice**, l'**inscription** et le **premier paiement**.
- Optimiser sur le coût par premier exercice, puis par payant. Jamais sur le clic.
- Suivre la rétention J1, J7 et J30 **par source**.
- Repère pour l'éducation, à prendre comme hypothèse : J1 environ 20 à 25 %, J7 environ 8 à 12 %, J30 environ 2 à 5 % [Non vérifié : Adjust, AppsFlyer].

**Budget de test** [Hypothèse : méthode d'abord, montant ensuite]
- **Matrice** : 3 accroches × 3 vidéos = 9 créatifs, sur 2 pays (Sénégal et Côte d'Ivoire), sur 10 à 14 jours.
- **Règle** : chaque créatif reçoit assez de budget pour obtenir environ 50 premiers exercices.
  - Budget = 9 × 50 × (coût par premier exercice mesuré les 48 premières heures).
  - On coupe les créatifs dont le coût dépasse 2 fois la médiane, et on recycle les gagnants.
- **Enveloppe** : à fixer par toi comme une somme que tu acceptes de perdre pour apprendre. **Aucune référence de prix publicitaire locale n'a été trouvée.**
- **Prérequis** : le vrai paiement mobile money doit être en place, sinon on ne mesure pas le coût par payant.

**Production** : le connecteur Higgsfield de ce compte propose des outils de production publicitaire et un prédicteur de viralité. Leur utilité pour Révizo **n'a pas été testée**. Des vidéos tournées par de vrais élèves restent prioritaires [Hypothèse].

### 3.2 Calendrier [Hypothèse ; dates non vérifiées, à prendre sur les sites officiels de chaque pays]

| Période | Moment scolaire (approximatif) | Message |
|---|---|---|
| Maintenant : fin octobre à novembre | Rentrée récente | « Prends de l'avance » · 1er exercice gratuit · lancement des ambassadeurs |
| Novembre à décembre | 1res compositions / devoirs | « Bloqué sur ton exo ? » |
| Février à mars | 2e trimestre, BAC blanc | Défis entre lycées |
| Avril à mai | Préparation | « J-60 », Pass Examen, campagne parents |
| Juin à juillet | BFEM, BEPC, DEF, BAC (en général) | « J-30 », « J-7 », révision des erreurs |
| Août à septembre | Vacances | Budget minimal, contenu organique |

### 3.3 Ambassadeurs [Hypothèse]
- **Un ou deux élèves ambassadeurs par lycée**, avec un code personnel. Récompense en explications et en crédits, plus un statut visible (« Ambassadeur Lycée X »).
- **Profs créateurs** locaux, sur YouTube ou TikTok.
  - Ils signent des « méthodes du jour » dans l'appli, ce qui donne du contenu et de la crédibilité.
  - Ils reçoivent un code de suivi.
  - **Aucune chaîne n'a pu être vérifiée.** Le dépôt contient un script de collecte de transcriptions YouTube de profs (`/home/user/bubacar14/tools/youtube_transcripts.py`), mais YouTube était bloqué pendant la recherche.

### 3.4 Écoles [Hypothèse]
- **Ce qu'on leur propose** : un tableau de bord gratuit pour le prof (erreurs fréquentes de la classe) et des défis inter-classes.
- **L'argument** : la lutte contre la triche (indice d'abord, étapes à la demande).
- **Ce qu'on vise** : la recommandation du prof aux élèves, pas une vente à l'école au départ.
- **Aucune donnée vérifiée** sur les partenariats d'écoles des edtechs africaines : le rapport Afrique n'a rien pu sourcer.

### 3.5 Viralité
- **Les boucles à faire tourner** : duel → lien → nouvel élève ; méthode partagée en statut WhatsApp → code ; parrainage.
- **Les leçons des applis virales** [Vérifié pour Higgsfield ; Non vérifié pour Lensa et Remini] :
  - mettre la viralité *dans* le produit : formats « faits pour être partagés », écran partagé avant / après, publication directe ;
  - un pic viral sans habitude derrière retombe (Lensa).

---

## 4. Prix et conversion

### 4.1 Ce que dit la recherche

| Constat | Chiffre | Statut |
|---|---|---|
| PWA contre appli native : conversion | Ola +30 % (petites villes), BookMyShow +80 %, Flipkart +70 % (visiteurs depuis l'icône) | [Vérifié] web.dev, 2016-2017, e-commerce |
| Notifications push | Jumia : 38 % d'ouverture, conversion 7,85 % contre 4,5 % en natif | [Vérifié] web.dev/jumia2016 |
| Demandes de notification | 19 % acceptées / 35 % refusées / 34 % ignorées | [Vérifié] Almanac 2022 |
| Packs dégressifs (contre-exemple) | Higgsfield : −31 % à −38 % selon la taille, crédits expirant à 90 jours | [Vérifié] connecteur, 26/10/2026 |
| Paywall dur contre freemium | environ 10 % contre environ 2 % (téléchargement → payant, J35) | [Non vérifié] RevenueCat |
| Essais démarrés le jour de l'installation | la majorité | [Non vérifié] RevenueCat |
| Prix des solveurs occidentaux | Photomath Plus environ 9,99 $/mois ou 70 $/an ; Mathway environ 10 $/mois | [Non vérifié] |
| Prix ouest-africains, frais Wave et Orange Money | — | **Aucune donnée** |

### 4.2 La grille actuelle de Révizo [Code]

| Pack | Prix | ⚡ | Explications (10 ⚡ chacune) | Prix par explication |
|---|---|---|---|---|
| Gratuit / jour | 0 | 10 | 1 | — |
| Recharge | 100 FCFA | 30 | 3 | environ 33 FCFA |
| Semaine | 300 FCFA | 150 | 15 | 20 FCFA |
| Mois | 1 000 FCFA | 700 | 70 | environ 14 FCFA |
| Pass Examen | 4 000 FCFA | 3 500 | 350 | environ 11 FCFA |

**Point critique : vérifier la marge unitaire [Hypothèse].**
- Le serveur utilise par défaut le modèle d'IA le plus haut de gamme, avec jusqu'à 16 000 jetons de réponse [Code, `server.js`].
- Une explication vendue 11 à 33 FCFA (environ 0,02 à 0,05 €) risque de **coûter plus cher en IA qu'elle ne rapporte**.
- Il faut mesurer le coût réel moyen par explication (jetons consommés × tarif actuel du fournisseur) **avant toute dépense publicitaire**. Il faut aussi tester un modèle moins cher par défaut, et réserver le modèle haut de gamme aux exercices difficiles ou aux nouvelles tentatives.
- Je ne cite pas de tarif d'API : il n'a pas été vérifié ici.

### 4.3 Recommandations
1. **1 crédit = 1 explication.** Supprimer l'unité ⚡ côté élève.
2. **Gratuit pour toujours** : quiz, « Mes erreurs », duels. Aujourd'hui ils coûtent 5 ⚡ [Code]. Les rendre gratuits maintenant, tant que la base d'utilisateurs est petite, évite plus tard l'erreur Quizlet [Non vérifié].
3. **Gratuit quotidien** : garder 1 explication offerte par jour, ce qui crée une raison de revenir. Tester 1 contre 3 explications offertes au premier jour [Hypothèse].
4. **Trois packs et un pass**, une option « recommandée », une remise dégressive **sans prix barré fictif**, des crédits **valables toute l'année scolaire**.
5. **Paiement réel** via un agrégateur. Les noms cités sont CinetPay, PayDunya, FedaPay, Paystack et Flutterwave, mais **les frais et la couverture ne sont pas vérifiés** : il faut comparer.
   - Le moyen de paiement est choisi selon l'indicatif du numéro.
   - Le reçu est clair.
   - La page de paiement est légère et tolère les coupures : la transaction est enregistrée puis rapprochée plus tard.
6. **Pas de renouvellement automatique par défaut.** Pour les parents seulement, une recharge automatique avec accord explicite et annulation en un geste. La faisabilité avec le mobile money est à vérifier.
7. **Urgence réelle uniquement** (« BAC dans 42 jours »). Jamais de « Buy until » permanent.
8. **Fixer les prix** : faire 20 entretiens et un sondage WhatsApp, puis tester par A/B 2 grilles. Comme les prix actuels sont très bas, la contrainte réelle est probablement la marge et non le pouvoir d'achat [Hypothèse].

---

## 5. Les erreurs à ne pas faire

| Erreur | Vue chez | Statut |
|---|---|---|
| Réponse floutée ou étapes bloquées juste au moment du besoin | Gauth, Brainly, Mathway, Symbolab | [Non vérifié] |
| Rendre payant ce qui était gratuit | Quizlet (Learn et Test) | [Non vérifié] |
| Punir l'erreur (vies, énergie) | Duolingo | [Non vérifié] |
| Notifications multiples ou culpabilisantes | Duolingo (mème de la chouette) | [Non vérifié] |
| Demander les notifications ou l'installation à froid | 35 % de refus mesurés | [Vérifié] |
| Essai avec carte bancaire et renouvellement automatique | Higgsfield, avis des stores | [Vérifié] Higgsfield / [Non vérifié] avis |
| Crédits flous ou variables selon un modèle invisible, crédits qui expirent, prix barrés permanents | Higgsfield | [Vérifié] |
| Donner la réponse sans méthode : image d'outil de triche | Photomath, Gauth, Chegg | [Non vérifié] |
| Erreurs de l'IA dites avec assurance, sans recours | Gauth, Question.AI | [Non vérifié] |
| Effet waouh sans habitude derrière | Lensa | [Non vérifié] |
| Appli lourde, donc désinstallée | 20 % des clients d'Ola avaient désinstallé l'appli native | [Vérifié] |
| Surcharge de révisions | Anki | [Non vérifié] → plafonner les révisions par jour |
| Classements imposés, vitesse plus récompensée que la justesse | Hanus & Fox, Kahoot | [Non vérifié] |
| Méthodes et notations non adaptées au programme local | solveurs américains | [Non vérifié] |
| Se fier à Lighthouse : son profil « Slow 4G » est optimiste | doc Lighthouse | [Vérifié] → tester sur un vrai téléphone de 1 à 2 Go de RAM, en 3G réelle |
| Afficher de faux joueurs comme s'ils étaient réels | **Révizo** (classement de démonstration) | [Code] → risque de confiance, voir le changement n°14 |

**Edtechs africaines qui ont échoué ou pivoté (Eneza, uLesson, Afrilearn…)** : **rien n'a pu être vérifié.** C'est un trou important à combler à la prochaine passe.

---

## 6. Plan d'action : 15 changements dans l'appli

Effort : **F** = faible (moins de 2 jours), **M** = moyen (environ 1 semaine), **É** = élevé (plus de 2 semaines). Les références renvoient à `/home/user/bubacar14/app.js` et `/home/user/bubacar14/server.js`.

### Lot 1 : impact fort, effort faible (à faire maintenant)

| # | Changement | Impact | Effort | Fondement |
|---|---|---|---|---|
| 1 | **Mesurer le coût IA par explication** et passer à un modèle moins cher par défaut (le haut de gamme seulement pour les cas difficiles). Revoir `max_tokens`. | Très élevé (survie) | F | [Code] + [Hypothèse] |
| 2 | **Supprimer l'écran pays au premier lancement** : 1er exercice offert sans compte, pays déduit plus tard. | Très élevé | F | Enseignement 3 |
| 3 | **Rendre gratuits** les quiz, « Mes erreurs » et les duels (`QUIZ_COST` → 0). Crédits réservés à « Mon exercice ». | Très élevé | F | Enseignements 5 et 8 |
| 4 | **Bouton « Cette explication est fausse »** : crédit rendu, et l'exercice est enregistré côté serveur pour améliorer les consignes. | Très élevé | F | Enseignement 10 |
| 5 | **Crédits affichés en explications** (« 📸 3 explications ») sur la barre, le bouton et le paywall. | Élevé | F | Enseignement 9 |
| 6 | **Une série qui compte toute activité**, plus 2 gels gratuits et une réparation dans les 24 h. | Élevé | F | Enseignement 6 |
| 7 | **Nettoyer l'accueil** : retirer les tuiles « Bientôt », ajouter la carte « À revoir aujourd'hui · gratuit » et les exemples avant / après pour les nouveaux. | Moyen | F | Section 2.1 |

### Lot 2 : impact fort, effort moyen

| # | Changement | Impact | Effort | Fondement |
|---|---|---|---|---|
| 8 | **Correction progressive** : méthode → indice → étapes en accordéon avec « pourquoi » et « Pas compris ? » → réponse, avec un lien « Tout voir ». | Très élevé | M | Enseignement 4 |
| 9 | **Brancher « Mon exercice » sur « Mes erreurs »** : l'exercice d'entraînement raté ou non tenté devient une carte à revoir. **Historique local des corrections**, relisible hors ligne, plus `navigator.storage.persist()`. | Très élevé | M | Enseignement 5, [Vérifié] MDN |
| 10 | **Allègement data** : photo autour de 1 280 px et qualité environ 0,7 (aujourd'hui 1 600 px et 0,8), poids affiché, file d'attente hors ligne, mode « Éco data », bouton « Ouvrir dans Chrome » dans les navigateurs intégrés. Budget : premier chargement ≤ 300 Ko. | Élevé | M | Enseignement 1 |
| 11 | **Installation et notifications au bon moment** (`beforeinstallprompt` après la 2e utilisation, notification en contexte, 1 par jour au maximum), plus un rappel WhatsApp sur inscription volontaire. | Élevé | M | Enseignement 2 |
| 12 | **« Partager ma méthode »** (image 9:16 avec code), plus un parrainage de 2 explications chacun après la 1re explication du filleul. Ajouter le code au lien de duel existant. | Élevé | M | Section 2.7 |

### Lot 3 : impact fort, effort élevé (préparer en parallèle)

| # | Changement | Impact | Effort | Fondement |
|---|---|---|---|---|
| 13 | **Vrai paiement mobile money** via un agrégateur. Paywall contextuel, « Demander à un parent », pas de renouvellement automatique, crédits valables un an. Prérequis à toute pub payante. | Très élevé | É | Section 4 |
| 14 | **Comptes et serveur** : numéro et code de vérification après la 1re explication, pixels Meta et TikTok (premier exercice, inscription, paiement), suivi J1, J7, J30 par source. Remplacer le classement de démonstration par de **vraies ligues optionnelles par classe** (ou le masquer d'ici là). | Élevé | É | Sections 3.1 et 2.6 |
| 15 | **Vérification des calculs en maths** par un moteur de calcul formel, avec un badge « Calcul vérifié » ou « À vérifier ». | Élevé | É | Enseignement 10 [Hypothèse] |

**Ordre conseillé**
1. Lot 1 en entier, en une à deux semaines.
2. Le 8, le 9 et le 13 ensuite.
3. Pas de budget publicitaire avant que le 1, le 13 et le 14 soient faits : sinon on ne sait ni ce que coûte un élève, ni ce qu'il rapporte.

---

## Sources

**Lues et vérifiées pendant les recherches**
- web.dev, études de cas : https://web.dev/konga/ · https://web.dev/jumia2016/ · https://web.dev/ola/ · https://web.dev/twitter/ · https://web.dev/bookmyshow/ · https://web.dev/flipkart/ (lues via les fichiers source GitHub de web.dev)
- HTTP Archive Almanac : 2024 *page-weight*, *performance*, *accessibility* ; 2022 *pwa* ; 2021 *mobile-web* (https://github.com/HTTPArchive/almanac.httparchive.org)
- Android : https://developer.android.com/guide/topics/androidgo · https://developer.android.com/docs/quality-guidelines/build-for-billions/connectivity · …/data-cost · …/device-capacity · https://developer.android.com/develop/ui/views/layout/webapps/trusted-web-activities
- MDN : attribut `capture`, Storage quotas, Background Sync, `share_target`, NetworkInformation et SyncManager (browser-compat-data)
- Lighthouse, throttling : https://github.com/GoogleChrome/lighthouse/blob/main/docs/throttling.md
- Répétition espacée : https://github.com/open-spaced-repetition/srs-benchmark · https://github.com/duolingo/halflife-regression · https://github.com/ankitects/anki-manual
- Higgsfield, connecteur en lecture seule le 26/10/2026 : grille tarifaire, galeries Viral, Genjutsu Trending et Marketing Studio, catalogue de modèles

**Citées de mémoire, non relues (à vérifier)**
- https://www.lennysnewsletter.com/p/how-duolingo-reignited-user-growth
- https://blog.duolingo.com/how-duolingo-streak-builds-habit/
- https://research.duolingo.com/papers/yancey.kdd20.pdf
- https://www.revenuecat.com/state-of-subscription-apps-2025/
- https://investor.chegg.com/
- https://openai.com/index/chatgpt-study-mode/
- https://photomath.com · https://www.gauthmath.com · https://brainly.com
- Articles scientifiques :
  - Dunlosky et al. 2013 : https://doi.org/10.1177/1529100612453266
  - Cepeda et al. 2006 : https://doi.org/10.1037/0033-2909.132.3.354
  - Roediger & Karpicke 2006 : https://doi.org/10.1111/j.1467-9280.2006.01693.x
  - Lally et al. 2010 : https://doi.org/10.1002/ejsp.674
  - Silverman & Barasch 2023 : https://doi.org/10.1093/jcr/ucac029
  - Sailer & Homner 2020 : https://doi.org/10.1007/s10648-019-09498-w
  - Hanus & Fox 2015 : https://doi.org/10.1016/j.compedu.2014.08.019
  - Wang & Tahir 2020 : https://doi.org/10.1016/j.compedu.2020.103818
- Règles publicitaires : transparency.meta.com/policies/ad-standards · ads.tiktok.com/help
- Paiement : cinetpay.com · paydunya.com · fedapay.com · paystack.com · flutterwave.com
- Données télécoms : https://www.gsma.com/mobileeconomy/sub-saharan-africa/

**Bilan : 0 recherche web aboutie sur 30 tentées, environ 62 pages lues sur environ 138 tentées, plus 6 lectures du connecteur Higgsfield. La consigne des 30 à 50 recherches sourcées par chercheur n'est pas remplie. Il faut une nouvelle passe de recherche pour vérifier les points marqués [Non vérifié] et combler les trous : Afrique de l'Ouest, prix, publicité, examens.**