# Rapport : Higgsfield et les applis IA grand public qui emballent des modèles. Ce que Révizo peut copier

## Avertissement sur la méthode (à lire avant le reste)

**La recherche web demandée (30 à 50 requêtes) n'a pas pu être faite dans cette session.**
- **WebSearch :** les 4 requêtes envoyées ont toutes été refusées. Le quota de 200 recherches partagé entre les agents du workflow était déjà épuisé. Résultat : 0 recherche aboutie.
- **WebFetch et curl :** 5 tentatives (higgsfield.ai/pricing, higgsfield.ai, trustpilot.com, en.wikipedia.org, et un curl vers higgsfield.ai). Toutes ont échoué. Le nom de domaine ne se résout pas (« ENOTFOUND »), ou le proxy de sortie refuse la connexion (« CONNECT 403 »).
- **Ce qui a marché : 6 requêtes en lecture seule sur le connecteur Higgsfield** attaché à ce compte. Il s'agit de la grille tarifaire réelle (`show_plans_and_credits`), de trois galeries de presets (`get_presets` : Viral, Genjutsu Trending, Marketing Studio) et du catalogue de modèles (`models_explore`). Ce sont des **données de première main, à jour au 26/10/2026**. Ce sont les seules données vérifiées de ce rapport.

En conséquence :
- Tout ce qui vient de ces appels est marqué **[Vérifié, connecteur Higgsfield, 26/10/2026]**.
- Tout ce qui vient de mes connaissances antérieures est marqué **[Non vérifié dans cette session]**, avec l'URL où l'on devrait pouvoir le vérifier. Je n'ai pas relu ces URL.
- Je n'invente ni chiffre d'audience, ni contenu d'avis, ni contenu de vidéo.
- Pour compléter, vous pouvez relancer une session avec un quota de recherche disponible (variable `CLAUDE_CODE_MAX_WEB_SEARCHES_PER_SESSION`), ou m'envoyer un message de suite pour reprendre les recherches.

---

## 1. Ce que font les meilleurs (exemples concrets, écrans, parcours, chiffres)

### 1.1 Higgsfield : la grille tarifaire réelle

**Deux abonnements, présentés comme des cartes** [Vérifié, connecteur Higgsfield, 26/10/2026]

| Formule | Crédits / mois | Prix mensuel | Prix annuel (par mois) | Remise affichée | Badges |
|---|---|---|---|---|---|
| PLUS | 1 000 (un autre champ indique 1 200) | non proposé dans cette configuration | 39 $ (prix barré 49 $) | « 20 % » | « Accès à tous les modèles et fonctions », « Accès anticipé » |
| ULTRA | 3 000 | 129 $ | 99 $ (prix barré 129 $) | « 23 % » | « BEST VALUE », « most popular », « 70 % cheaper » par crédit |

- ULTRA existe aussi en engagement **18 mois** et **2 ans**.

**Les crédits sont traduits en résultats concrets, pas en unités abstraites.** Infobulle PLUS : « ~4800 images or ~200 videos or ~60 character generations ». Mise en avant en gras : « = 600 Nano Banana Pro Generations », « ~ 200 Kling 3.0 videos ».

**Une couche « illimité » sur les modèles bon marché.**
- Bloc « 365-DAY UNLIMITED & FREE GENS » : Seedream 5.0 Lite, Flux.2 Pro 1K, Seedream 4.5, Nano Banana, Kling O1 Image, GPT Image. S'y ajoutent « 3 000 FREE GENS » (PLUS) ou « 5 000 / 10 000 FREE GENS » (ULTRA) sur Soul V2.
- Bloc « 7-Day Unlimited » : Nano Banana 2, Kling 3.0. Le modèle premium Nano Banana Pro est barré « NO UNLIMITED » sur PLUS et inclus sur ULTRA. C'est un levier d'upgrade explicite.
- **Chaque infobulle porte une échéance : « Buy until: Oct 27 »**, soit le lendemain de la consultation. C'est de l'urgence datée.

**Les packs de crédits ponctuels** affichent tous un prix barré.

| Pack | Prix | Prix barré | Remise |
|---|---|---|---|
| 500 crédits | 29 $ | 42,50 $ | −31 % |
| 1 000 crédits | 56 $ | 85 $ | −35 % |
| 2 000 crédits | 105 $ | 170 $ | −38 % |
| 4 000 crédits | 211 $ | 340 $ | −38 % (« most popular ») |

- **Ces crédits expirent au bout de 90 jours** (`topup_expire_days: 90`).

**La recharge automatique est poussée en premier.**
- Seuil de déclenchement : 100 crédits. Montants proposés : 10 à 100 $. Taux : environ 18 crédits par dollar.
- Le texte commercial renvoyé par le système dit : « Best move: turn on auto-refill once, then keep generating without surprise credit stops ». Il parle aussi de « hitting a credit wall again ». Le bouton principal : « Turn on auto-refill now ».

**L'essai gratuit.** La description de l'outil mentionne un essai PLUS de 3 jours à 0 $. Il exige une carte bancaire et se renouvelle automatiquement en payant sauf annulation. Le statut de ce compte indique 100 crédits d'essai.

### 1.2 Higgsfield : les galeries de presets

**Galerie « Viral »** [Vérifié, connecteur Higgsfield, 26/10/2026]
- **87 presets** répartis en 4 onglets : All, Motion, Product shot, Effects.
- Chaque carte suit la même formule : nom court et frappant, une vignette, une **vidéo d'aperçu**, puis une phrase-bénéfice qui finit presque toujours par « Built for… ».
- Exemples :
  - « Vanish » : le corps disparaît, les vêtements tombent. « Built for viral hooks, comedic reveals ».
  - « Earth zoom » : plongée depuis l'orbite jusqu'à la rue.
  - « Bullet time », « Clones », « Melting », « Eyes in ».
- « Fallen angel » assume l'objectif : un écran partagé tableau original / votre version, « a split-screen format **built to go viral** ».

**Galerie « Marketing Studio »** [Vérifié, connecteur Higgsfield, 26/10/2026]
- **649 modèles** typés : product_shots, product_shots_people, hypermotion, mixed_media, 2d_motion, saas_motion.
- Exemples : « Chilled Can », « Ice Cube Hover », « 90s Bedroom CRT ».

**Galerie « Genjutsu Trending »** [Vérifié, connecteur Higgsfield, 26/10/2026]
- Ce sont des presets **issus de la communauté**. Les fichiers sont servis depuis un dossier `community-presets/`.
- Principe du transfert de mouvement : on reprend le mouvement d'une vidéo existante et on y met son propre personnage.
- Exemples : « Football Showstopper », « Cash Stack Flex », « Face Replacement », « Street Style Swap ».
- Le curseur de pagination (1016) laisse penser qu'il y a plus de 1 000 entrées. C'est une **déduction non confirmée**.

### 1.3 Higgsfield : l'emballage des modèles

**Higgsfield revend sous sa marque les modèles d'autres fournisseurs** [Vérifié, connecteur Higgsfield, 26/10/2026]
- Google : Nano Banana, Nano Banana Pro, Nano Banana 2.
- OpenAI : GPT Image 2.
- Meta : SAM 3 3D.
- Meshy : passage en 3D.
- Tongyi : Z Image.
- S'y ajoutent ses propres modèles : Soul 2.0, Cinema Studio, Marketing Studio.

**Un mode « Auto » choisit le modèle à la place de l'utilisateur** : « Auto-selects the best image model based on prompt intent ».

**La viralité est intégrée au produit.** La liste des outils du connecteur montre :
- un prédicteur de viralité (`virality_predictor`) ;
- la connexion et la publication directe sur TikTok (`tiktok_connect`, `tiktok_prepare_publish`, `tiktok_music_trending`) ;
- la participation à des concours (`participate_in_contest`).

### 1.4 Les autres applis du même modèle [Non vérifié dans cette session]

- **Lensa AI (Prisma Labs), fin 2022.** Les « Magic Avatars » : environ 10 à 20 selfies, puis un pack d'avatars payant. Pic viral sur TikTok et Instagram, puis forte retombée. À vérifier : https://en.wikipedia.org/wiki/Lensa et la presse tech de décembre 2022 (TechCrunch).
- **Remini (Bending Spoons).** Vagues virales successives sur TikTok autour de filtres-tendances, avec un abonnement hebdomadaire. À vérifier : https://en.wikipedia.org/wiki/Remini_(app)
- **Photomath (racheté par Google en 2022).** Scanner un exercice de maths et obtenir les étapes. Les étapes détaillées étaient réservées à Photomath Plus. À vérifier : https://en.wikipedia.org/wiki/Photomath et https://photomath.com
- **Gauth (ByteDance) et Question.AI.** Applis « photo de devoir, puis réponse IA », très promues sur TikTok, avec crédits et abonnement. À vérifier : https://www.gauthmath.com et les fiches App Store / Google Play.
- **Brainly.** Questions-réponses communautaires puis IA, freemium avec quotas. À vérifier : https://brainly.com
- **Duolingo.** Séries de jours (streaks), ligues et partage, présentés comme les principaux moteurs de rétention. À vérifier : https://blog.duolingo.com et les rapports investisseurs https://investors.duolingo.com
- **CapCut.** Galerie de « templates » tendance réutilisables en un clic, le même principe que les presets Higgsfield. À vérifier : https://www.capcut.com/templates
- **Higgsfield lui-même.** Fondé par Alex Mashrabov (ancien responsable IA générative chez Snap), avec un marketing massif via des créateurs. Je n'ai **aucun chiffre vérifié** d'utilisateurs ou de revenu : ne citez rien sans le vérifier, par exemple sur https://techcrunch.com.

---

## 2. Ce qui marche et pourquoi (avec preuves)

**1. Vendre un résultat, pas une technologie.** Higgsfield ne vend pas « Seedance 2.0 » mais « Vanish », « Earth zoom », « Bullet time ». La carte montre une vidéo du résultat avant toute action, et la phrase « Built for… » dit à quoi ça sert [Vérifié, galerie Viral]. L'utilisateur n'a pas à écrire de prompt, ce qui supprime la barrière du « page blanche ».
*Leçon pour Révizo :* l'élève doit voir **un exemple de correction réussie** avant même d'envoyer son exercice.

**2. Des galeries énormes, rafraîchies et en partie communautaires.** 87 presets viraux, 649 modèles marketing, et probablement plus de 1 000 presets communautaires « Trending » [Vérifié]. La nouveauté permanente donne une raison de revenir. La communauté fournit le contenu gratuitement.

**3. Cacher la complexité des modèles.** Le mode « Auto » et les presets évitent à l'utilisateur de choisir entre plus de 30 modèles [Vérifié, catalogue].
*Leçon pour Révizo :* l'élève n'a jamais besoin de savoir quel modèle d'IA tourne derrière.

**4. Traduire les crédits en « ce que j'obtiens ».** « ~200 vidéos », « 600 générations » [Vérifié]. C'est la bonne intuition : le cerveau compare des résultats, pas des unités.

**5. Séparer l'illimité bon marché et le premium payé au crédit.** L'illimité porte sur les modèles peu coûteux. Le premium (Nano Banana Pro, vidéo) consomme des crédits ou impose l'upgrade (« NO UNLIMITED » sur PLUS) [Vérifié]. L'utilisateur a l'impression de beaucoup recevoir, la marge est protégée, et l'upgrade se justifie par un manque visible.

**6. Les ancrages de prix.** Prix barrés partout, remises croissantes avec la taille du pack (−31 % à −38 %), badges « BEST VALUE » et « 70 % cheaper ». Le pack le plus cher est marqué « most popular » [Vérifié]. C'est l'effet d'ancrage classique, qui pousse vers le haut du panier.

**7. Supprimer le moment où l'utilisateur se demande s'il doit payer.** La recharge automatique est présentée comme la façon d'éviter le « credit wall » [Vérifié]. Elle convertit une décision d'achat répétée en un seul consentement.

**8. Une boucle virale intégrée au produit.** Formats « built to go viral » (écran partagé avant / après), publication TikTok native, musique tendance, prédicteur de viralité, concours [Vérifié]. Chaque création est une pub potentielle.

**9. Le précédent Lensa et Remini.** Le format « mets ta photo, obtiens une version de toi impressionnante » se partage tout seul, parce que le résultat parle de l'utilisateur [Non vérifié dans cette session].
*Pour Révizo, l'équivalent n'est pas un avatar :* c'est la fierté d'avoir compris, ou un score à un duel.

---

## 3. Ce qui échoue ou agace les utilisateurs (avis, critiques)

> **Limite importante :** je n'ai pas pu lire Trustpilot, Reddit ni les avis des stores. Aucune citation d'utilisateur n'est donc reproduite ici. Les points ci-dessous viennent soit d'incohérences constatées dans les données vérifiées, soit de critiques connues avant cette session et marquées comme telles.

**1. Des chiffres de crédits incohérents** [Vérifié]
- PLUS affiche « 1 000 credits/mo » dans un champ et « 1 200 credits per month » dans un autre.
- La même offre promet « ~4 800 images » et « 600 générations Nano Banana Pro ». L'écart d'un facteur 8 dépend du modèle utilisé. L'utilisateur ne peut pas prévoir sa consommation.
- C'est exactement le type de flou qui alimente les plaintes « mes crédits ont fondu ».

**2. Une urgence permanente** [Vérifié]
- « Buy until: Oct 27 », alors que la consultation date du 26/10, et des prix barrés sur tous les packs.
- Quand la remise est permanente, le prix barré perd sa crédibilité. Dans certaines juridictions, c'est aussi un risque réglementaire (prix de référence trompeur). Ce point juridique est [Non vérifié dans cette session].

**3. Des crédits qui expirent** [Vérifié]
- 90 jours pour les crédits rechargés. Pour un utilisateur occasionnel, c'est une perte sèche, souvent vécue comme injuste.

**4. Un « illimité » sous conditions** [Vérifié]
- Illimité seulement sur certains modèles, certaines résolutions (« 1K/2K », « 720p/5s »), pendant 7 ou 365 jours, et « Available on web » uniquement.
- [Non vérifié dans cette session] : des critiques publiques ont visé Higgsfield sur le décalage entre « unlimited » et la réalité, et sur un marketing d'influence très agressif. À vérifier sur https://www.reddit.com/r/HiggsfieldAI/ et https://www.trustpilot.com/review/higgsfield.ai

**5. Un essai qui exige une carte et se renouvelle automatiquement** [Vérifié dans la description de l'outil]
- C'est une source classique de remboursements contestés et d'avis négatifs.
- Pour un public d'élèves sans carte bancaire, c'est **inapplicable** de toute façon.

**6. L'effet waouh qui s'éteint vite (cas Lensa)** [Non vérifié dans cette session]
- Énorme pic puis effondrement : l'usage était ponctuel, sans besoin récurrent.
- *Leçon :* un effet waouh sans habitude derrière ne retient personne.

**7. Les applis « photo, puis réponse » accusées de favoriser la triche** (Photomath, Gauth) [Non vérifié dans cette session]
- Critique d'enseignants : l'élève recopie sans apprendre.
- Pour Révizo, c'est à la fois un **risque d'image auprès des parents et des profs** et une opportunité de se différencier.

---

## 4. Recommandations concrètes pour Révizo, classées par impact

> Les éléments propres à l'Afrique de l'Ouest (frais Wave et Orange Money, coût de la data, place de WhatsApp, équipement des élèves) **n'ont pas pu être vérifiés dans cette session et varient selon les pays** : Sénégal, Côte d'Ivoire, Mali, Burkina Faso, Guinée, Bénin, etc. Je les signale comme hypothèses à valider.

### Impact très élevé

**R1. Un accueil en une seule action, avec preuve immédiate (design)**
- Écran d'accueil : un gros bouton « Photographie ton exercice » (avec l'appareil photo), et en dessous un champ texte.
- Juste en dessous, **3 exemples avant / après qui défilent** : une photo d'exercice manuscrit, puis la correction étape par étape. C'est l'équivalent de la vidéo d'aperçu des presets Higgsfield.
- **Premier exercice expliqué gratuitement, sans compte**. Le compte et le numéro mobile money ne sont demandés qu'après l'effet waouh.
- Ne pas copier l'essai avec carte de Higgsfield.

**R2. Une galerie de « méthodes » à la manière des presets (fonctionnalité)**
- Des cartes nommées comme des presets : « Résoudre une équation du 2nd degré », « Étudier une fonction », « Plan de dissertation philo », « Commentaire de texte », « Équilibrer une réaction chimique ».
- Chaque carte a une phrase-bénéfice (« Pour le BAC série S, chapitre X »), un exemple corrigé et un bouton « Essaie avec ton exercice ».
- Filtres par classe, matière et pays, à la manière des onglets « Motion / Product shot / Effects ».
- **Attention aux programmes :** ils diffèrent selon les pays et les séries. Le rattachement exact aux programmes officiels est à vérifier pays par pays.

**R3. Des crédits lisibles, en FCFA, exprimés en résultats (prix)**
- « 1 crédit = 1 exercice expliqué », et c'est tout.
- Ne jamais faire varier le coût selon un modèle invisible. C'est l'erreur 1 000 / 1 200, 4 800 / 600 constatée chez Higgsfield.
- Afficher un compteur simple : « Il te reste 7 explications ».
- Les fonctions peu coûteuses (quiz, révision des erreurs, duels) restent **gratuites ou illimitées**. Les explications IA, qui coûtent cher en calcul, consomment des crédits. C'est la séparation illimité bon marché / premium qui fonctionne chez Higgsfield.

**R4. Des petits paliers adaptés au mobile money (prix)**
- Des micro-packs (par exemple 5, 15, 40 explications) et un « Pass BAC » ou « Pass mois » payé par un parent.
- Remise croissante avec la taille du pack, mais **pas de faux prix barré**.
- Les montants exacts en FCFA et les frais Wave / Orange Money sont à valider. [Non vérifié dans cette session : grilles tarifaires sur https://www.wave.com/fr/ et https://www.orange.sn]
- **Crédits sans date d'expiration**, ou au minimum valables toute l'année scolaire. Ce serait un argument de confiance face à la pratique à 90 jours.

### Impact élevé

**R5. Une boucle virale propre à l'éducation (acquisition)**
- Bouton « Partager ma méthode » qui génère une **image verticale 9:16** : énoncé, étapes clés, logo Révizo et code de parrainage.
- Lien de duel : « Je t'ai battu 8/10, à toi ». C'est l'équivalent éducatif du format « built to go viral ».
- Hypothèse non vérifiée : WhatsApp (statuts et groupes de classe) serait le canal de partage dominant. Prévoir le partage WhatsApp en priorité, puis TikTok et Instagram.
- Parrainage : X crédits offerts au parrain et au filleul après la première explication du filleul.

**R6. Des créations pub modelées sur les presets viraux (acquisition)**
- Pour TikTok, Facebook et Instagram, produire des formats répétables à la manière de la galerie Viral :
  1. « Photo d'un exo raté, puis explication en 10 secondes » (avant / après, comme le format écran partagé).
  2. « Le prof dit… / Révizo montre… ».
  3. « Duel entre deux élèves en direct ».
- Tester beaucoup de variantes courtes et garder les gagnantes. Le connecteur Higgsfield de ce compte propose justement des outils de production publicitaire et un prédicteur de viralité. Leur utilité réelle pour Révizo est **non testée**.

**R7. La méthode avant la réponse (design et positionnement)**
- Afficher d'abord **la méthode et un indice**, puis les étapes, puis le résultat. Le tout dévoilé progressivement, à la demande de l'élève.
- Cela répond à la critique de la triche adressée à Photomath et Gauth (non vérifiée ici). C'est aussi un argument pour les parents qui paient.
- Message marketing possible : « On t'explique, on ne fait pas à ta place ».

### Impact moyen

**R8. Des « méthodes du jour » et du contenu communautaire (rétention)**
- À la manière de « Genjutsu Trending » : un fil « Les exos les plus demandés cette semaine en Terminale ».
- Des méthodes proposées par des profs partenaires, signées de leur nom. C'est du contenu gratuit et une source de crédibilité.

**R9. Une habitude, pas seulement un effet waouh (rétention)**
- Série de jours de révision, rappel des erreurs à revoir, mini-ligues de duels par classe ou par établissement. C'est le modèle Duolingo [Non vérifié dans cette session].
- Le cas Lensa montre que sans usage récurrent, le pic viral retombe.

**R10. Une recharge automatique en version honnête (prix)**
- Pour les parents, proposer « Recharger automatiquement 15 explications quand il en reste 2 », avec un accord explicite et une annulation en un geste.
- Ne pas en faire l'option poussée par défaut comme Higgsfield.
- La faisabilité d'un prélèvement récurrent par Wave ou Orange Money est **à vérifier** auprès de chaque opérateur ou agrégateur.

**R11. Une urgence liée au calendrier scolaire, jamais fabriquée (prix)**
- Utiliser les vraies échéances : « BAC dans 42 jours », composition du trimestre.
- Proscrire les « Buy until » permanents. Auprès de parents, une fausse urgence détruit la confiance.

**R12. Un PWA léger et peu gourmand en data (design)**
- Compresser les photos avant l'envoi, afficher les explications en texte et LaTeX plutôt qu'en vidéo, et garder hors ligne les quiz et erreurs déjà vus.
- Le coût de la data et le niveau d'équipement en Afrique de l'Ouest sont des **hypothèses à vérifier** (rapports GSMA Mobile Economy Sub-Saharan Africa : https://www.gsma.com/mobileeconomy/sub-saharan-africa/, non relu).

---

## 5. Sources (URL)

### Données vérifiées dans cette session (connecteur Higgsfield, lecture seule, 26/10/2026)
- Grille tarifaire (`show_plans_and_credits`). Liens de paiement renvoyés : https://higgsfield.ai/mcp-pricing (formules) et https://higgsfield.ai/mcp-credits (packs et recharge automatique).
- Galerie Viral (`get_presets source=viral`) : 87 presets. Les aperçus sont hébergés sur https://cdn.higgsfield.ai/viral_hub/
- Galerie Genjutsu Trending (`get_presets source=genjutsu`). Les aperçus sont hébergés sur https://d8j0ntlcm91z4.cloudfront.net/community-presets/
- Galerie Marketing Studio (`get_presets source=marketing_studio`) : 649 modèles.
- Catalogue de modèles (`models_explore list`).

### Sources connues avant cette session, non relues ici (à vérifier)
- https://higgsfield.ai/pricing
- https://www.trustpilot.com/review/higgsfield.ai
- https://www.reddit.com/r/HiggsfieldAI/
- https://en.wikipedia.org/wiki/Lensa
- https://en.wikipedia.org/wiki/Remini_(app)
- https://en.wikipedia.org/wiki/Photomath
- https://photomath.com
- https://www.gauthmath.com
- https://brainly.com
- https://blog.duolingo.com
- https://investors.duolingo.com
- https://www.capcut.com/templates
- https://www.wave.com/fr/
- https://www.orange.sn
- https://www.gsma.com/mobileeconomy/sub-saharan-africa/

### Bilan des recherches
- **Recherches web (WebSearch) :** 4 tentées, **0 exécutée** (quota du workflow épuisé).
- **Lectures de pages (WebFetch et curl) :** 5 tentées, **0 réussie** (domaines bloqués ou non résolus).
- **Requêtes au connecteur Higgsfield :** **6**, toutes réussies.
- **Écart avec l'exigence de 30 à 50 recherches :** non atteinte, pour des raisons techniques. Les sections 3 et 4, sur les avis utilisateurs et le contexte ouest-africain, doivent être complétées par une nouvelle passe de recherche.