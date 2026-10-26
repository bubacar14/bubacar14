# Révizo : ce que le design des applis concurrentes nous apprend

**Rapport final pour le fondateur, par la direction artistique et UX**

---

## 0. À lire d'abord : méthode et fiabilité

**Combien de recherches ont été faites.** Six agents ont fait **114 recherches web** au total :

| Rapport | Recherches |
|---|---|
| Solveurs par photo | 19 |
| Tuteurs IA | 18 |
| Applis qui créent l'habitude | 18 |
| Applis éducatives africaines | 20 |
| Applis de révision francophones | 20 |
| Onboarding, paywall et premiers écrans | 19 |
| **Total** | **114** |

**Ce que les agents n'ont pas pu faire :**
- Ils n'ont ouvert **aucune page** : aucune lecture directe. Toutes les affirmations viennent des résumés que le moteur de recherche donne des pages.
- Ils n'ont pris **aucune capture d'écran** et n'ont **installé aucune appli**.
- Il n'y a **aucune mesure** du poids réel des applis.
- Plusieurs applis du panel ont été cherchées sans résultat : **Kalanso, Sunu Bac, Bac Afrique, Edukoya et « Teachmate » de Snapplify**. Elles ont été remplacées par des équivalents réels : TutoBac IA, BAC CI, OkpaBac, ExamPadi et d'autres.

**Conséquence importante.** Les **mécaniques** sont bien documentées : parcours, paywall, prix, critiques des utilisateurs. Les **identités visuelles** (couleurs, polices, logos) le sont très peu. Les seules sources trouvées sur ce point sont :
- Duolingo : relevés de tiers et site design.duolingo.com ;
- Photomath : DesignRush ;
- Quizlet : relevés de tiers ;
- Kahoot : guide de marque 2019 ;
- Brilliant : offres d'emploi et blog Rive ;
- Brainly : système de design « Pencil » ;
- Khan Academy : avatars.

Pour toutes les autres applis, la description visuelle est **non vérifiée**.

**Légende utilisée dans ce rapport :**
- **[Sourcé]** : l'information vient d'une URL citée par un agent. Elle n'a été vue qu'à travers un résumé de recherche.
- **[Non vérifié]** : connaissance générale d'un agent, sans source.
- **[Hypothèse]** : recommandation de design de ma part, déduite des preuves mais pas testée.

**Données fragiles ou contradictoires à garder en tête :**
- **Gauth** : la limite gratuite est de 11 questions par jour selon une source, de 3 selon une autre. La note est de 4,8 sur l'App Store, mais une moyenne indépendante donne 2,1/5.
- **Prix** : les prix de Brainly et la part de contenu gratuit chez Kartable se contredisent d'une source à l'autre.
- **Paywall** : deux jeux de données Adapty donnent des conclusions opposées sur le meilleur moment pour l'afficher.
- **Chiffres internes** : les gains annoncés par Duolingo (+1,7 % de rétention, environ +20 % d'utilisateurs actifs par jour) sont des chiffres de l'entreprise elle-même.
- **Mobile money** : les chiffres d'abandon viennent tous d'un seul prestataire, Kolonell.
- **Quizlet** : la chute de note de mai 2026 n'est confirmée par aucune autre source.

---

## 1. Tableau comparatif des applis étudiées

« NV » signifie non vérifié.

### Solveurs par photo

| Appli | Identité visuelle | Écran signature | Force | Faiblesse |
|---|---|---|---|---|
| **Photomath** (Google) | Gris avec un accent rouge sur les actions clés [Sourcé, DesignRush]. Pas de mascotte. Police neutre [NV]. | Ouverture directe sur la caméra, puis étapes repliées qui se déplient [Sourcé] | « L'interface est le tutoriel » [Sourcé, Screensdesign]. Explique le « pourquoi » à chaque étape. | Étapes détaillées payantes. Lecture aléatoire de l'écriture manuscrite et des fractions serrées [Sourcé]. |
| **Gauth** (ByteDance) | Logo sur un dégradé doux [Sourcé, Lazyweb]. Couleurs inconnues. | Onboarding en 14 étapes avec la promesse « Instant Answers » [Sourcé] | Recours à un tuteur humain, plus de 30 matières [Sourcé] | Publicité, prélèvements difficiles à arrêter, « ticket » payant pour corriger une erreur de l'IA [Sourcé] |
| **Brainly** | Système de design « Pencil » (14 fondations, 10 composants) [Sourcé]. Couleurs inconnues. | Questions et réponses entre élèves, label « Brainliest » [Sourcé] | Communauté, système de points | Réponses fausses récompensées, vidéos de pub impossibles à passer, essai qui bascule en payant [Sourcé] |
| **Mathway** (Chegg) | Mise en page « inhabituelle », sans Material Design [Sourcé] | Trois onglets (Caméra, Clavier, Historique), puis « View steps », qui ouvre le paywall [Sourcé] | Réponse finale gratuite | Paywall sur les étapes, jugé « pas bon pour apprendre » [Sourcé] |
| **Symbolab** | Orange-rouge [NV] | Étapes de base gratuites, étapes avancées payantes [Sourcé] | Graphes, génération d'exercices | Chat IA réservé aux abonnés Pro, avis mitigés [Sourcé] |
| **Question.AI** | Inconnue | Photo, puis on surligne la partie exacte à résoudre [Sourcé] | Recadrage précis, historique | Abonnement hebdomadaire jugé « sournois » dans la catégorie [Sourcé] |
| **Socratic** (Google, fondu dans Lens en 2025) | Cartes colorées illustrées [NV] | Photo, puis cartes de ressources : concept, étapes, vidéos [Sourcé] | « Facile et intuitive » [Sourcé] | Réponse en un coup qui pousse à copier [Sourcé, Common Sense]. Appli disparue. |
| **Microsoft Math Solver** (retiré en juillet 2025) | Style Fluent [NV] | Trois saisies : dessiner, scanner, taper [Sourcé] | Entièrement gratuit, quiz et exercices générés | Ne lisait pas les énoncés rédigés en phrases. Fermeture [Sourcé]. |

### Tuteurs IA

| Appli | Identité visuelle | Écran signature | Force | Faiblesse |
|---|---|---|---|---|
| **Khanmigo** (Khan Academy) | Avatars nés de la feuille du logo, « Khanmojis » [Sourcé] | Chat dont les suggestions changent selon la page consultée [Sourcé] | Approche socratique : « Quelle serait la première étape selon toi ? » [Sourcé] | Contournement par « je sais pas », usage faible, travail déjà juste non reconnu [Sourcé, Dan Meyer] |
| **ChatGPT, mode Étudier** | Interface ChatGPT standard [NV] | Questions, indices et mini-quiz [Sourcé] | Diagnostic du niveau, mémoire des conversations | Cède si on insiste, se coupe d'un clic, trop d'information d'un coup [Sourcé] |
| **Gemini, Guided Learning** | Dégradés bleu-violet [NV] | Interrupteur dans la zone de saisie, schémas et vidéos insérés, quiz, puis fiches [Sourcé] | Boucle quiz → fiches de révision | Données visuelles non vérifiées |
| **Brilliant** | Langage d'illustration « Pix », animations Rive [Sourcé] | « Interactives », indices, parcours ramifiés, dégel de série animé [Sourcé] | Montre pourquoi une réponse est fausse [Sourcé, G2] | Le prix est la première plainte [Sourcé] |

### Applis qui créent l'habitude

| Appli | Identité visuelle | Écran signature | Force | Faiblesse |
|---|---|---|---|---|
| **Duolingo** | Vert #58CC02 (relevé tiers), police Feather Bold, illustrations à 3 formes, mascotte Duo animée par états [Sourcé] | Écran de prolongation de série, ligues, parcours unique [Sourcé] | +1,7 % de rétention à 7 jours grâce à l'écran de série (chiffre interne) [Sourcé] | Ton culpabilisant, énergie qui se vide même sans faute, parcours imposé mal reçu [Sourcé] |
| **Quizlet** | Bleu-violet #4255FF ou #4257B2 (relevés tiers), titres en Hurmes [Sourcé] | Cartes à retourner, jeu Match (rouge si faux, vert si juste) [Sourcé] | Quota gratuit clair : 5 tours de Learn [Sourcé] | Fonctions gratuites devenues payantes, paywall la veille de l'examen [Sourcé] |
| **Anki** | Utilitaire, sans charte [NV] | Quatre boutons : À revoir, Difficile, Correct, Facile [Sourcé] | Répétition espacée solide | Le bouton « Difficile » est mal utilisé et fausse l'algorithme. Interface encombrée [Sourcé]. |
| **Kahoot** | Charte « LOUD!!! », colorée [Sourcé, guide de marque] | Quatre réponses, chacune avec une forme et une couleur, puis podium [Sourcé] | La forme double la couleur, ce qui aide les daltoniens [Sourcé] | Jugé « enfantin ». Peu accessible aux lecteurs d'écran [Sourcé]. |

### Applis africaines

| Appli | Identité visuelle | Écran signature | Force | Faiblesse |
|---|---|---|---|---|
| **uLesson** (Nigeria) | Inconnue | Vidéos de cours, hors ligne via carte SD et tablettes [Sourcé] | Diffusion massive (45 000 tablettes distribuées par l'État) | Vidéo lente, problèmes de connexion et d'installation [Sourcé, Kimola]. Note 4,08. |
| **Afrilearn** (Nigeria) | Inconnue | Duels, classement, « gagner de l'argent » [Sourcé] | Pensé pour mobile et données chères | Promesse de gains qui brouille la confiance [Hypothèse] |
| **Gradely** (Nigeria) | Inconnue | Test diagnostic, puis recommandations quotidiennes [Sourcé] | Rendez-vous quotidien ciblé sur les points faibles | Aucune donnée de design |
| **Siyavula** (Afrique du Sud) | Sobre, proche d'un manuel web [NV] | Solution entièrement rédigée après l'erreur, puis nouvel essai sur une variante unique [Sourcé] | Difficulté adaptative, accès sans données (zero-rating), marche sur téléphone basique | Confusion « gratuit mais il faut un solde positif » [Sourcé] |
| **Eneza** (Kenya, Ghana, Côte d'Ivoire) | Pas d'interface graphique | 5 questions par SMS ou USSD, puis le corrigé [Sourcé] | 6 millions d'apprenants, paiement avec le crédit téléphonique | Canal très limité |
| **Ubongo** (Tanzanie) | Héroïne africaine, Akili [Sourcé] | Série télévisée en langues locales | Seule mascotte africaine forte du panel | Vise les 3 à 6 ans, registre hors cible |
| **TutoBac IA** (Kajou, Sénégal) | Inconnue | Assistant IA aligné sur le programme sénégalais [Sourcé] | **Gratuit**. Concurrent le plus direct de « Mon exercice ». | Aucune donnée sur l'interface |
| **BAC CI** (Côte d'Ivoire) | Inconnue | Annales classées par matière, série et année, hors ligne [Sourcé] | Hors ligne, mention claire « appli non officielle » | Pas de quiz |

### Applis de révision francophones

| Appli | Identité visuelle | Écran signature | Force | Faiblesse |
|---|---|---|---|---|
| **Nomad Education** | Inconnue | Fiche puis quiz, Nomad'IA à partir d'une photo de cours [Sourcé] | 300 000 membres dans 29 pays d'Afrique, hors ligne gratuit, offre CANAL+ [Sourcé] | Formules multiples |
| **Kartable** | Type manuel numérique [NV] | Cours avec réponses détaillées [Sourcé] | Conforme au programme | 10 contenus gratuits seulement, résiliation difficile, enfant abonné sans l'accord des parents [Sourcé] |
| **SchoolMouv** | Inconnue | Vidéos de 15 min avec infographies animées et acteurs [Sourcé] | Production soignée | Promotions permanentes (« -50 % »), lourd en données [Hypothèse] |
| **Les Bons Profs** | « Pas d'esbroufe » : un prof devant un tableau noir [Sourcé] | Annales corrigées en vidéo [Sourcé] | Authenticité, culture YouTube | Offre bac vendue à part |
| **digiSchool** | Inconnue | Annales avec cadenas premium sur les corrigés [Sourcé] | Contenus rédigés par l'éditeur | Corrigés verrouillés |
| **OkpaBac** (Afrique francophone) | Inconnue | Exercices corrigés, communauté [Sourcé] | Programmes africains | Conditions contradictoires : paiement unique et « renouvellement automatique » [Sourcé] |

---

## 2. Les 12 enseignements de design les plus importants

**1. La valeur d'abord, le compte ensuite.**
- **Preuve :** Photomath s'ouvre directement sur la caméra, sans tutoriel ([Screensdesign](https://screensdesign.com/showcase/photomath)). Chez Duolingo, repousser l'inscription de quelques écrans aurait fait monter les utilisateurs actifs par jour d'environ 20 % ([Taplytics](https://taplytics.com/blog/duolingo-ab-test-onboarding)). Ce chiffre est un témoignage rapporté. [Sourcé]
- **Pour Révizo :** un premier exercice corrigé sans compte.

**2. Toujours confirmer ce que l'IA a lu avant de résoudre.**
- **Preuve :** une mauvaise lecture donne une réponse « fausse mais sûre d'elle ». Les sources recommandent un énoncé modifiable, avec les caractères douteux surlignés ([vp0](https://vp0.com/blogs/photomath-clone-camera-scanner-ui-swiftui), [Screensdesign](https://screensdesign.com/articles/ai-homework-solver-app-onboarding-examples/)). La lecture de l'écriture manuscrite est la critique récurrente faite à Photomath ([My Engineering Buddy](https://www.myengineeringbuddy.com/blog/photomath-reviews-alternatives-pricing-offerings/)). [Sourcé]

**3. Un indice protège l'apprentissage, la réponse directe le détruit.**
- **Preuve (la plus solide de tout le corpus) :** une expérience sur près de 1 000 lycéens.
  - Avec GPT-4 brut, les résultats d'entraînement montent de 48 %, mais l'examen passé sans IA baisse de 17 %.
  - Avec une version qui donne des indices, l'entraînement monte de 127 % et l'examen ne baisse pas.
- **Sources :** [Wharton](https://knowledge.wharton.upenn.edu/article/without-guardrails-generative-ai-can-harm-education), [SSRN](https://papers.ssrn.com/abstract=4895486). [Sourcé]
- **Pour Révizo :** le BFEM, le BEPC, le DEF et le BAC se passent sans IA. L'argument est donc direct.

**4. Le garde-fou doit être visible et compté, pas silencieux.**
- **Preuve :** en répondant « IDK » (« je sais pas ») à chaque relance, on finissait par obtenir la réponse de Khanmigo ([Dan Meyer](https://danmeyer.substack.com/p/the-chatbot-tutors-are-sick-of-your)). Le mode Étudier de ChatGPT cède aussi si on insiste ; OpenAI reconnaît un comportement « incohérent » ([Slashdot / Ars Technica](https://news.slashdot.org/story/25/07/29/2042244/chatgpts-new-study-mode-is-designed-to-help-you-learn-not-just-give-answers)). [Sourcé]
- **Pour Révizo [Hypothèse] :** des paliers d'indice affichés et un bouton « Je bloque » explicite.

**5. Une petite étape à la fois, avec son « pourquoi ».**
- **Preuve :** les « bite-sized steps » de Photomath ([App Store](https://apps.apple.com/ZA/app/id919087726)), le découpage de Gemini ([blog Google](https://blog.google/outreach-initiatives/education/guided-learning/)), le format court de Brilliant. À l'inverse, le testeur d'Edutopia a dû demander au mode Étudier de ChatGPT de ralentir ([Edutopia](https://www.edutopia.org/article/putting-chatgpts-study-mode-through-its-paces/)). [Sourcé]

**6. Expliquer l'erreur, reconnaître ce qui est juste, puis faire réessayer.**
- **Preuve :** chez Siyavula, la solution rédigée montre où l'élève s'est trompé, puis il refait une variante unique de la question ([Siyavula](https://siyavulaeducation.com/products-high-school.html)). Les avis sur Brilliant saluent l'explication de l'erreur ([G2](https://www.g2.com/products/brilliant-worldwide-brilliant/reviews)). Chez Khanmigo, un élève qui avait en partie bon a été requestionné comme s'il ne savait rien ([Dan Meyer](https://danmeyer.substack.com/p/khanmigo-wants-to-love-kids-but-doesnt)). [Sourcé]

**7. Boucler explication → test → révision.**
- **Preuve :** Gemini transforme les résultats de quiz en fiches ([blog Google](https://blog.google/products/gemini/guided-learning-google-gemini/)). Microsoft et Symbolab généraient des exercices après une solution. Nomad place le quiz juste après la fiche ([presse-citron](https://www.presse-citron.net/telecharger/loisirs/education_et_scolarite/nomad-education-brevet-bac-sup-primaire.html)). [Sourcé]
- **Pour Révizo :** c'est exactement la place de la révision des erreurs en répétition espacée.

**8. Faire payer l'explication convertit, mais c'est la première source de colère.**
- **Preuve :** Photomath a été observé avec 18 variantes, dont au moins 14 touchent le paywall ([Lazyweb](https://experiments.lazyweb.com/research/photomath-paywall-cta-experiments)). Selon des données Adapty, 31 % des utilisateurs démarrent un essai face à un paywall dur affiché tout de suite, contre 65 % après avoir vu la valeur ([RocketShip HQ](https://www.rocketshiphq.com/?p=5390)). Mais Mathway est jugé « pas bon pour apprendre sans payer » ([Yahoo](https://news.yahoo.com/mathway-review-054516562.html)). [Sourcé]
- **Attention :** un autre jeu de données Adapty donne le résultat inverse, plus de conversion avec un paywall placé dans l'onboarding ([Airbridge](https://www.airbridge.io/en/blog/paywall-conversion-structural-decisions)).

**9. La transparence de facturation convertit, l'opacité fait fuir.**
- **Preuve :** chez Blinkist, une frise « début de l'essai, rappel, date de prélèvement » a donné +23 % de démarrages d'essai et +4 % de conversions payantes ([UX Planet](https://uxplanet.org/how-solving-our-biggest-customer-complaint-at-blinkist-led-to-a-23-increase-in-conversion-b60ad514134b)). Les prélèvements surprises sont la critique numéro un chez Gauth, Brainly et Kartable ([Trustpilot](https://fr.trustpilot.com/review/www.gauthmath.com), [ÀmonAvis](https://amonavis.fr/services/kartable-avis)). [Sourcé]
- **Pour Révizo :** des crédits sans renouvellement automatique, c'est un argument de vente.

**10. Célébrer la série et la pardonner, ne jamais culpabiliser.**
- **Preuve :** l'écran de prolongation de série a apporté +1,7 % de rétention à 7 jours chez Duolingo ([blog Duolingo](https://blog.duolingo.com/how-duolingo-streak-builds-habit)). Le gel de série empêche les abandons ([tearthemdown](https://tearthemdown.substack.com/p/duolingo-gamified-retention)). Le ton passif-agressif est la première critique faite à Duolingo, en France aussi ([LADN](https://www.ladn.eu/tech-a-suivre/duolingo-forest-appli-culpabilisante-best/)). Les enfants y sont jugés vulnérables ([deceptive.design](https://deceptive.design/articles/the-evil-bird-and-the-right-to-disconnect-children-s-vulnerability-to-exit-dark-patterns-in-gamified-educational-apps)). [Sourcé]
- **À noter :** Duolingo reconnaît que la métaphore de la flamme n'est pas universelle ([blog Duolingo](https://blog.duolingo.com/streak-milestone-design-animation)).

**11. Ne jamais punir l'effort.**
- **Preuve :** l'énergie de Duolingo se vide même sur une bonne réponse. Résultat : une pétition, des départs, et un sondage de plus de 11 000 répondants où 49 % n'aiment pas le système contre 6 % qui le préfèrent aux cœurs ([Android Authority](https://www.androidauthority.com/quitting-duolingo-energy-system-3599842/), [SquaredTech](https://www.squaredtech.co/quitting-duolingo-after-latest-controversy)). [Sourcé]
- **Pour Révizo :** réviser ses erreurs et entretenir sa série ne doit jamais coûter de crédits.

**12. En Afrique de l'Ouest : léger, hors ligne et court gagne.**
- **Preuve :** les critiques sur uLesson portent sur la vidéo lente et la connexion ([Kimola](https://kimola.com/reports/unlock-insights-with-our-ulesson-app-feedback-analysis-report-google-play-en-155021)). Le hors-ligne revient chez uLesson, BAC CI, ExamPadi et Nomad. Eneza vend un format de 5 questions puis le corrigé ([techxlab](https://techxlab.org/solutions/eneza-education/)). Siyavula fonctionne sur téléphone basique. [Sourcé, mais la preuve est **indirecte** : c'est un motif qui se répète, pas un test mesuré.]

---

## 3. Ce qui différencie déjà Révizo, et ce qui manque à sa charte

### Ce qui différencie déjà Révizo

1. **La métaphore de la copie corrigée.**
   - Papier Seyès, marge rouge, prof qui annote en Caveat, ardoise.
   - Aucune des applis étudiées ne semble l'utiliser. [NV pour l'absence chez tous : nous n'avons pas vu les écrans.]
   - C'est le territoire le plus distinctif du marché. Il incarne aussi la promesse pédagogique : on corrige, on ne donne pas les réponses.
2. **Une voix au lieu d'une mascotte.**
   - Tous les rapports convergent : le « prof au stylo rouge » donne de la chaleur sans infantiliser.
   - Ubongo montre qu'une mascotte africaine forte existe, mais pour les 3 à 6 ans.
   - Kahoot est jugé « enfantin » avec ses couleurs primaires.
3. **Des crédits en mobile money, sans abonnement.**
   - C'est le contraire de la critique numéro un de la catégorie : prélèvements récurrents, essais qui basculent en payant, abonnements hebdomadaires.
4. **Une sobriété scolaire adaptée au collège et au lycée.**
   - Le thème Ardoise rejoint le « prof au tableau noir sans esbroufe » des Bons Profs, qui a trouvé son public.
5. **L'ancrage dans les examens locaux** (BFEM, BEPC, DEF, BAC). Les concurrents français ne l'ont pas.

**Menace à intégrer dans le design.** TutoBac IA est **gratuit** et Nomad est offert un mois aux abonnés CANAL+ dans 17 pays. Révizo doit donc **rendre visible la qualité** de sa correction : la méthode, la marge du prof, la confirmation de l'énoncé. Une IA générique ne suffit pas à justifier des crédits. [Hypothèse]

### Ce qui manque à la charte

**Nouveaux composants [Hypothèse, chacun déduit d'un enseignement ci-dessus] :**

| Composant | Rôle | Enseignement |
|---|---|---|
| **Énoncé lu** | Énoncé lu, modifiable, avec les caractères douteux surlignés et une question du type « x ou × ? » | n°2 |
| **Carte étape** | Une étape par ligne Seyès, calcul en mono, formule mise en forme, annotation possible en marge | n°5 |
| **Annotation de marge** | Texte Caveat accompagné d'une icône au trait, dans la marge rouge | n°6 |
| **Paliers d'indice** | Trois pastilles au trait (coup de pouce, méthode, étape) et un bouton « Je bloque » | n°4 |
| **Pastille de coût** | « 1 crédit » affiché **avant** l'envoi, et solde toujours visible | n°8, n°9 |
| **Signaler une erreur de l'IA** | Nouvelle tentative gratuite | Critique faite à Gauth |
| **Validation partielle** | Les lignes déjà justes de l'élève sont cochées en bleu-vert | n°6 |
| **Indicateur hors ligne** | Disponible ou indisponible hors ligne | n°12 |
| **Écran de prolongation de série** et **gel de série gagné** | Célébrer et pardonner | n°10 |
| **Écrans de paiement** | Attente avec compte à rebours, recours par USSD, reçu, échec calme | Rapport 6 |
| **Pré-écran de permission** | Avant l'accès à la caméra, puis avant les notifications | Microblink, UX Collective |
| **Partager sur WhatsApp et « Envoyer à un parent pour payer »** | Partage d'une correction ou d'un duel, et paiement par le parent | Snapplify, Kartable |

**États manquants :**
- lecture incertaine ;
- énoncé rédigé en phrases, à interpréter ;
- étapes pas encore dévoilées ;
- paiement en attente ;
- crédits bientôt épuisés (prévenir **avant** zéro, surtout en période d'examen) ;
- hors ligne ;
- erreur réseau ;
- écrans vides : aucune erreur à revoir, aucun duel en cours.

**Illustrations manquantes :**
- un style pour les **écrans vides** et l'onboarding ;
- des **schémas au trait** : figures de géométrie, tableaux de signes, graphes, en SVG.

**Mascotte : non.** C'est une recommandation, mais un arbitrage conscient. La seule preuve contraire est que Duolingo tire de l'engagement d'une mascotte animée qui change d'état selon les actions ([Rive](https://rive.app/blog/duolingo-s-ai-powered-video-call-brings-lily-to-life)). Révizo peut obtenir le même effet d'état par la **voix du prof** : il encourage, corrige ou félicite, avec trois variantes d'annotation, sans personnage dessiné. [Hypothèse]

---

## 4. Changements recommandés pour la charte graphique

### Couleurs [Hypothèse, sauf mention]

**1. Rouge du prof : sens unique.**
- Réservé aux erreurs, aux pièges et aux annotations.
- **Jamais** sur un bouton, un paywall ou une alerte de série.
- Pourquoi : Photomath met le rouge sur ses actions ([DesignRush](https://www.designrush.com/best-designs/apps/photomath)). Chez Révizo, un paywall rouge ferait de l'achat une « faute ».

**2. Jaune soleil : deux variantes distinctes.**
- **Soleil plein** : crédits, série, récompense.
- **Surligneur translucide** : un nouveau jeton, réservé aux caractères douteux de l'énoncé.
- Pourquoi : sans cette séparation, « attention, lecture incertaine » se confond avec « tu as gagné ».
- Règle : jamais de jaune pour l'urgence commerciale.

**3. Un nouveau gris « crayon » (graphite).**
- Usages : désactivé, en attente, étape pas encore dévoilée, contenu indisponible hors ligne.
- Il remplace le cadenas : on montre des lignes de cahier au crayon, pas un verrou.

**4. Bleu-vert et rouge : toujours un second indice.**
- Une coche ou une croix au trait, plus un mot (« Juste », « À revoir »).
- Pourquoi : Kahoot double chaque couleur d'une forme pour les daltoniens ([Common Sense](https://www.commonsense.org/education/reviews/kahoot/teacher-reviews/4657633)). [Le principe est sourcé]
- Il faut aussi vérifier que le bleu-vert se distingue nettement du **bleu Bic de marque**, sinon « bonne réponse » et « bouton » se confondent.

**5. Thème Ardoise.**
- Prévoir des variantes éclaircies du rouge du prof et du bleu-vert pour garder un contraste suffisant sur fond sombre.
- Texte en « craie blanche », surligneur en « craie jaune ».
- Tester chaque paire de couleurs selon le contraste minimal WCAG AA.

### Typographie [Hypothèse]

- **Atkinson Hyperlegible**
  - Taille de texte de base d'au moins 16 px.
  - Sert aussi aux messages d'erreur et de paiement, qui doivent être limpides.
- **JetBrains Mono**
  - Réservée aux calculs alignés, aux montants en F CFA et aux reçus.
  - Les fractions, racines et exposants sont **mis en forme comme des formules** (KaTeX ou MathML), jamais en texte mono brut, pour éviter le problème des « fractions serrées » reproché à Photomath.
- **Caveat**
  - Annotations courtes uniquement : une ligne au plus, en taille généreuse (environ 20 px ou plus).
  - Toujours accompagnée d'une icône.
  - Ne porte **jamais seule** une information critique : prix, consigne, erreur de paiement.
- **Bricolage Grotesque**
  - Titres d'écran et chiffres-clés : série, solde, score.
- **Poids des polices**
  - Quatre familles, c'est lourd pour une PWA utilisée avec peu de données.
  - Garder un ou deux styles par famille, limiter aux caractères latins, afficher le texte tout de suite avec une police de secours.

### Icônes et illustrations

- **Une grammaire réduite** : deux ou trois formes de base, une épaisseur de trait unique, des angles arrondis. C'est le principe des illustrations de Duolingo ([design.duolingo.com](https://design.duolingo.com/illustration)). [Le principe est sourcé, l'application est une hypothèse]
- **Icônes à prévoir** :
  - crédit : une pièce ;
  - série : **une case de calendrier cochée d'un trait de stylo**, plutôt qu'une flamme, car la flamme n'est pas universelle selon Duolingo lui-même ;
  - gel de série ;
  - hors ligne ;
  - indice : un crayon ;
  - « Je bloque » ;
  - signaler ;
  - partager ;
  - recadrer ;
  - flash.
- **Illustrations au trait** d'élèves ouest-africains en uniforme, avec des contextes locaux (prénoms, F CFA, villes). [NV pour la pratique des concurrents, hypothèse pour Révizo]

### Animation

- D'abord **SVG et CSS** : l'animation d'un trait de stylo qui coche, d'une ligne qui s'écrit sur l'ardoise.
- **Rive** si un état interactif riche est nécessaire. Brilliant l'a choisi parce que ses fichiers sont plus légers que la vidéo, le GIF ou Lottie ([Rive](https://rive.app/blog/how-brilliant-org-motivates-learners-with-rive-animations)). [Sourcé]
- Le poids du lecteur Rive pour le web n'a pas été mesuré.
- Respecter le réglage « réduire les animations » du téléphone.

---

## 5. Le design recommandé, écran par écran

Tout ce qui suit est **[Hypothèse]**. Entre crochets, le motif prouvé dont chaque choix s'inspire.

### 5.1 L'accueil

Dans l'ordre, de haut en bas :
1. **Bandeau sur fond papier.** À gauche, la série : icône de calendrier coché et nombre de jours en Bricolage. À droite, le solde de crédits : pièce en jaune soleil et nombre. Une petite mention discrète « hors ligne » apparaît si le réseau manque. [Solde toujours visible : enseignement n°9]
2. **Compte à rebours de l'examen**, en Caveat dans la marge rouge : « BFEM : J-142 ». [Engagement ancré sur un objectif, Lenny's / Duolingo]
3. **Grande carte « Mon exercice ».** Icône d'appareil photo au trait, titre « Prends ton exercice en photo », bouton plein bleu Bic. Sous le bouton : « 1 crédit par exercice · solde : 8 ». [La photo dès l'accueil, Photomath. Coût affiché avant, n°8]
4. **Carte « Aujourd'hui ».** « 6 erreurs à revoir · environ 5 min », bouton secondaire, mention « gratuit ». [Boucle de révision n°7. Ne jamais punir l'effort, n°11]
5. **Carte « Quiz du jour »** : 5 questions sur le chapitre recommandé. [Format Eneza, recommandations Gradely]
6. **Duels en cours** : une ou deux lignes au plus, avec des adversaires de la même classe ou du même examen. [Ligues entre pairs proches, Duolingo]
7. **Accès libre aux chapitres**, en bas de l'écran. [Le parcours imposé de Duolingo a provoqué une révolte]

Il n'y a pas de pop-up de notification à l'ouverture.

### 5.2 La caméra « Mon exercice »

1. **Première fois seulement** : un pré-écran sur papier Seyès, en Atkinson : « On utilise la photo seulement pour lire ton exercice. » Puis la demande d'autorisation du navigateur. [Microblink]
2. **Viseur en plein écran.** Le cadre de recadrage a des coins réglables en bleu Bic. La consigne courte au-dessus dit : « Cadre un seul exercice ». [Photomath, Question.AI, Mathway]
3. **En bas, de gauche à droite** : un bouton galerie, un grand déclencheur bleu Bic, et un bouton « Taper l'énoncé » comme saisie de secours. [Plusieurs modes de saisie, Microsoft et Photomath]
4. **Au-dessus du déclencheur**, une pastille rappelle le coût : « 1 crédit ». [n°8]
5. **Après la prise** : l'écran « Énoncé lu ».
   - L'énoncé est mis en forme proprement : formules rendues, texte en Atkinson.
   - Les caractères douteux sont **surlignés** avec une question cliquable : « x ou × ? », « − ou – ? ».
   - Si l'énoncé est rédigé en phrases, une annotation en Caveat prévient : « Énoncé à interpréter, vérifie bien. »
   - Bouton principal : « C'est bien ça, explique-moi » (débite 1 crédit).
   - Bouton secondaire : « Corriger ».
   - Le crédit n'est débité qu'à cette confirmation. [n°2]
6. **Premier usage** : aucun compte demandé. Le compte est proposé après la correction, pour « garder cette correction dans ton cahier ». [n°1]

### 5.3 La correction pas à pas

1. **En-tête de la copie** : chapitre détecté et examen (« Équations du 2nd degré · BFEM »).
2. **Carte « Ce qu'on cherche »**, en Atkinson.
3. **Question à l'élève** : « Par quoi commencerais-tu ? », avec deux ou trois choix rapides. Une bonne réponse reçoit une coche bleu-vert et « Bien vu » en Caveat. Une mauvaise reçoit une croix rouge et une explication courte dans la marge. [Khanmigo, Wharton n°3]
4. **La méthode**, en une phrase encadrée : « On factorise, puis on applique le produit nul. »
5. **Les étapes, une par ligne Seyès.**
   - Le calcul est aligné en JetBrains Mono, avec les formules mises en forme.
   - Dans la marge rouge, le « pourquoi » en Caveat : « attention au signe », « au BFEM, on attend la phrase réponse ».
   - Le mode par défaut est **« Essaie d'abord »** : la première étape est visible, les suivantes sont des lignes grisées au crayon.
   - Un bouton « Étape suivante » dévoile la ligne d'après, en animation d'écriture. [n°5]
6. **Barre d'aide fixe en bas.**
   - Trois pastilles d'indice (coup de pouce, méthode, étape), avec le palier atteint visible.
   - Un bouton « Je bloque » qui fait avancer d'un palier.
   - Un lien discret « Tout afficher » : l'élève reste libre. [n°4]
   - Les étapes sont déjà payées : **rien n'est verrouillé par l'argent**.
7. **Si l'élève a photographié un travail à moitié fait** : ses lignes justes sont cochées en bleu-vert **avant** toute correction. [n°6]
8. **La réponse finale encadrée en bleu-vert**, soulignée deux fois comme dans un cahier.
9. **Pied de page** :
   - « Refaire un exercice semblable », qui ouvre un quiz d'un exercice ;
   - « Ajouter à mes erreurs à revoir » ;
   - « Une erreur dans la correction ? Signaler » (nouvel essai gratuit) ;
   - « Partager sur WhatsApp ». [n°7, critique faite à Gauth, Snapplify]

**Option écartée.** Le rapport 6 proposait d'afficher la réponse et la première étape, puis de faire payer la suite (« La suite de la méthode : 1 crédit »). Je la déconseille : elle reproduit le « View steps » détesté (enseignement n°8) et place l'argent au moment de comprendre. Le crédit paie **le volume d'exercices**, pas la compréhension.

### 5.4 Le quiz

1. **Progression en haut** : 5 cases de cahier, qui se cochent une à une. Un bouton pour quitter, sans pénalité. [Format court d'Eneza]
2. **La question**, en Atkinson, avec les formules mises en forme. Un schéma au trait si besoin.
3. **Les réponses** sous forme de grandes cartes papier marquées A, B, C, D. Une lettre plutôt qu'une couleur pour identifier chaque choix. [Second indice, Kahoot]
4. **Retour immédiat.**
   - Juste : bordure bleu-vert, coche, « Juste » en Caveat.
   - Faux : bordure rouge du prof, croix, et **l'explication de l'erreur** dans la marge, puis la bonne réponse. [n°6, Brilliant, Quizlet Match]
5. **En mode révision des erreurs** : deux boutons d'auto-évaluation, « Je savais » et « À revoir ». Pas quatre boutons comme Anki, qui faussent l'algorithme. [Forum Anki]
6. **En duel** : on affiche la **précision** autant que la vitesse, avec un plafond quotidien de points. [Critiques des ligues Duolingo]

### 5.5 La fin de séance

1. **Titre en Bricolage** : « Séance terminée ».
2. **« Ce que tu as retenu »** : la méthode clé en une ligne, avec un calcul en mono. Le titre ne porte pas sur des points. [Critique de la « pointsification »]
3. **Score et précision** : « 4/5 · 80 % ».
4. **« Envoyé en révision »** : la liste des erreurs, avec la date de la prochaine révision. [n°7]
5. **Prolongation de série** : un trait de stylo bleu Bic coche le jour sur une ligne Seyès. Une variante spéciale s'affiche aux paliers de 7, 30 et 100 jours, avec une pastille jaune soleil. [n°10, +1,7 % chez Duolingo]
6. **Gel de série gagné**, si une révision des erreurs a été terminée : « Tu as gagné 1 jour de repos. » Il se gagne, il ne s'achète pas.
7. **Une seule suite proposée** : « Encore un quiz » ou « Revoir mes erreurs ».
8. **La première fois seulement**, après la première série gagnée, une proposition neutre : « Veux-tu un rappel à 18 h ? » [Moment de la demande de notifications, UX Collective]

Le ton reste toujours positif et factuel. Jamais de « tu nous déçois ».

### 5.6 Le paywall (achat de crédits)

**Points d'entrée selon le contexte**, chacun avec son propre texte :
- crédits épuisés ;
- crédits bientôt épuisés (prévenir **avant** zéro) ;
- depuis le solde ;
- depuis un exercice. [Duolingo, environ sept portes d'entrée]

Dans l'ordre, de haut en bas :
1. **Titre** : « Recharge tes crédits ». Solde actuel en jaune soleil.
2. **Trois cartes de recharge.**
   - Prix en F CFA en JetBrains Mono, avec le coût par exercice affiché (« environ X F l'exercice »).
   - La carte du milieu est mise en avant : bordure bleu Bic et étiquette « Le plus choisi ».
   - Les montants sont à définir. [Offre de référence présélectionnée, Duolingo]
3. **Une frise de transparence**, en Atkinson : « Tu paies X F CFA → tu reçois N crédits → ils sont valables jusqu'au … ». Sur une ligne à part : **« Aucun prélèvement automatique. »** [Blinkist n°9]
4. **Un petit tableau « gratuit / avec crédits »** en forme de cahier. Les cases cochées sont en bleu-vert. La révision des erreurs, la série et les quiz y sont marqués gratuits. [n°11]
5. **Le choix de l'opérateur** en grandes tuiles : Wave et Orange Money, et selon le pays MTN MoMo ou Moov (à confirmer). Le numéro et le montant sont préremplis. [Kolonell]
6. **Un bouton secondaire « Envoyer à un parent pour payer »**, qui génère un lien de paiement à partager. [Problème de l'enfant abonné seul chez Kartable]
7. **Écran d'attente.**
   - Message : « Confirme sur ton téléphone avec ton code secret », avec un compte à rebours d'environ 60 s.
   - Après environ 40 s sans confirmation, proposer un code USSD de secours.
   - L'achat n'est validé qu'à réception de la confirmation serveur de l'opérateur. [Kolonell, source unique]
8. **Réussite** : les crédits s'ajoutent en jaune soleil, avec un reçu en mono (référence, montant, nouveau solde).
9. **Échec** : message calme en Atkinson, « Paiement non reçu, rien n'a été débité », et un bouton « Réessayer ».

Aucun rouge et aucun compte à rebours commercial sur tout le parcours.

---

## 6. Les erreurs de design à éviter, vues chez les concurrents

| Erreur | Où elle a été vue | Source |
|---|---|---|
| Faire payer l'explication au moment où l'élève veut comprendre (« View steps ») | Mathway, Photomath | [Yahoo](https://news.yahoo.com/mathway-review-054516562.html), [Screensdesign](https://screensdesign.com/showcase/photomath) |
| Prélèvements récurrents difficiles à arrêter, essai qui bascule en payant | Gauth, Brainly, Kartable | [Trustpilot](https://fr.trustpilot.com/review/www.gauthmath.com), [fast.io](https://fast.io/resources/brainly-ai-review-2026/), [ÀmonAvis](https://amonavis.fr/services/kartable-avis) |
| Faire payer la correction d'une erreur de l'IA | Gauth | [JustUseApp](https://justuseapp.com/en/app/1542571008/gauth-ai-study-companion/reviews) |
| Publicité vidéo impossible à passer pour voir une réponse | Brainly | [Trustpilot](https://ca.trustpilot.com/review/brainly.in) |
| Récompenser une réponse fausse (label de confiance non vérifié) | Brainly | [Trustpilot](https://ca.trustpilot.com/review/brainly.in) |
| Garde-fou pédagogique qui cède en silence | Khanmigo, ChatGPT Étudier | [Dan Meyer](https://danmeyer.substack.com/p/the-chatbot-tutors-are-sick-of-your), [Slashdot](https://news.slashdot.org/story/25/07/29/2042244/chatgpts-new-study-mode-is-designed-to-help-you-learn-not-just-give-answers) |
| Trop d'information d'un coup | ChatGPT Étudier | [Edutopia](https://www.edutopia.org/article/putting-chatgpts-study-mode-through-its-paces/) |
| Ne pas reconnaître le travail déjà juste | Khanmigo | [Dan Meyer](https://danmeyer.substack.com/p/khanmigo-wants-to-love-kids-but-doesnt) |
| Une jauge qui se vide même sur une bonne réponse | Duolingo (énergie) | [Android Authority](https://www.androidauthority.com/quitting-duolingo-energy-system-3599842/) |
| Un ton culpabilisant et des notifications trop fréquentes | Duolingo | [LADN](https://www.ladn.eu/tech-a-suivre/duolingo-forest-appli-culpabilisante-best/), [UFRPE](https://arandu.ufrpe.br/items/e55879b3-a7af-4aa1-839b-c91f56e1fbcd/full) |
| Imposer un chemin unique en supprimant le libre choix | Duolingo (Path) | [PiunikaWeb](https://piunikaweb.com/2022/10/17/duolingo-app-update-with-path-ui-faces-backlash-from-users/) |
| Des ligues qui récompensent le volume et poussent à farmer des points | Duolingo | [Yahoo](https://malaysia.news.yahoo.com/duolingo-app-language-learning-why-165500197.html) |
| Rendre payante une fonction gratuite, ou bloquer la veille de l'examen | Quizlet | [BM Gator](https://bmgator.org/33901/news/changes-to-quizlet-cause-frustration-among-students/), [NT Daily](https://www.ntdaily.com/opinion/quizlet-s-paywalls-place-priority-on-profits-over-pupils/article_848d54c6-4eca-11ef-b6bd-bba8eff900d3.html) |
| Des boutons d'auto-évaluation ambigus qui faussent la répétition espacée | Anki | [Forum Anki](https://forums.ankiweb.net/t/how-to-prevent-users-from-misusing-hard-ideas-are-welcome/49092?page=3) |
| Couleurs primaires « enfantines », bonne réponse indiquée seulement par la couleur | Kahoot | [Support Kahoot](https://support.kahoot.com/hc/en-us/community/posts/18907099316115-Ability-to-Change-Answer-Icons), [CU Boulder](https://www.colorado.edu/digital-accessibility/kahoot-accessibility-summary) |
| La vidéo lourde au cœur du produit | uLesson | [Kimola](https://kimola.com/reports/unlock-insights-with-our-ulesson-app-feedback-analysis-report-google-play-en-155021) |
| Une promesse « gratuit » qui ne l'est pas tout à fait | Siyavula (zero-rating) | [Aide Siyavula](https://help.siyavula.com/en/article/how-to-access-siyavula-without-using-data-1uzpw2f/) |
| Des conditions de prix contradictoires | OkpaBac | [App Store](https://apps.apple.com/ec/app/okpabac/id6738784487) |
| Des promotions permanentes et trop de formules | SchoolMouv, Nomad | [SchoolMouv](https://www.schoolmouv.fr/), [Nomad](https://www.nomadeducation.fr/premium/offre-famille) |
| Promettre des gains en argent dans une appli éducative | Afrilearn | [App Store](https://apps.apple.com/app/afrilearn/id6473706235) (le risque pour la confiance est une hypothèse) |
| Imiter les codes visuels d'un portail officiel | Contexte ivoirien et sénégalais | [BAC CI](https://play.google.com/store/apps/details?id=com.bacci.app), [afrique-sur7](https://www.afrique-sur7.fr/examens-demarches-cote-divoire) |
| Demander les permissions (caméra, notifications) sans contexte ou trop tôt | Duolingo (audit) | [UX Collective](https://uxdesign.cc/the-duolingo-diaries-an-honest-ux-review-part-1-onboarding-ed0165d44c58), [Microblink](https://docs.microblink.com/blinkid/ui-ux-best-practices) |
| Une appli qui disparaît et casse les habitudes des élèves | Socratic, Microsoft Math Solver | [Wikipedia](https://en.wikipedia.org/wiki/Socratic_(Google)), [Microsoft](https://learn.microsoft.com/en-us/answers/a/9508912) |

---

## 7. Prochaines étapes pour passer des hypothèses aux preuves

1. **Observer les écrans directement**, sur Mobbin, Screensdesign, Lazyweb, ou en installant les applis sur un téléphone Android d'entrée de gamme. Priorité à TutoBac IA, Nomad, uLesson, BAC CI et Photomath. Objectifs : capturer les couleurs, les polices et les écrans, et mesurer le poids réel.
2. **Lire les avis Google Play à 1 et 2 étoiles** de ces mêmes applis, filtrés sur « lent », « interface » et « payer ».
3. **Tester avec 5 à 8 élèves** à Dakar, Abidjan ou Bamako, sur maquette :
   - l'écran « Énoncé lu » ;
   - le mode « Essaie d'abord » ;
   - la lisibilité de Caveat sur un écran bas de gamme ;
   - le parcours de paiement mobile money.
4. **Vérifier les contrastes** des deux thèmes (Cahier et Ardoise) avec les nouveaux jetons : surligneur, crayon gris, et variantes éclaircies pour l'Ardoise.