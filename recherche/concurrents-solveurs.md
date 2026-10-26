# Rapport : applis qui résolvent les devoirs à partir d'une photo (Photomath, Gauth, Brainly, Socratic/Lens, Question.AI, Mathway, Symbolab, nouveaux venus IA)

## Avertissement : la recherche n'a pas pu être faite

- **Recherches web réussies : 0.** J'ai lancé 4 recherches (`Photomath users downloads 2025 Google acquisition`, `Gauth ByteDance revenue downloads 2025`, `Brainly users revenue 2025`, `Question.AI app revenue downloads Zuoyebang`). Les 4 ont été refusées : le plafond de 200 recherches web par tour, partagé entre tous les agents de ce workflow, était déjà atteint.
- **Pages lues : 0.** J'ai tenté 6 lectures directes. Les 4 pages Wikipédia (Photomath, Brainly, Socratic, Gauth) ont échoué (`ENOTFOUND`). photomath.com et gauthmath.com ont été bloqués par le proxy de sortie (`CONNECT 403`, hôte non autorisé dans cette session). Le journal du proxy montre que officedubac.sn, youtube.com et maths-et-tiques.fr sont aussi bloqués.
- Je n'ai pas contourné ces limites (pas de moteur de recherche via curl, pas de proxy ni d'archive).

**Conséquence :** l'exigence de 30 à 50 recherches sourcées n'est **pas remplie**. Tout le contenu ci-dessous vient de ma connaissance antérieure à cette session. **Aucun chiffre ni aucune affirmation n'a été vérifié ici.** Chaque point important porte la mention **[NV]** (non vérifié). Les URL de la section 5 sont des pistes à vérifier, pas des sources consultées. Pour avoir un rapport sourcé, il faut relancer cette étape avec un budget de recherche disponible et un accès réseau à ces domaines.

---

## 1. Ce que font les meilleurs

**Photomath (Google)**
- **Histoire [NV] :** créé en Croatie par Damir Sabol, issu de la société Microblink. Levée de fonds de série B d'environ 23 M$ en 2021. Rachat par Google annoncé en 2022 et finalisé vers 2023 après l'accord des autorités européennes. Photomath a annoncé plus de 220 M de téléchargements vers 2021-2022, puis plus de 300 M ensuite.
- **Parcours [NV] :**
  1. L'élève vise l'exercice avec la caméra et recadre la zone.
  2. L'appli reconnaît l'écriture, y compris manuscrite.
  3. Elle affiche la réponse, puis une liste d'étapes qu'on déplie une par une.
  4. Chaque étape a une explication « pourquoi » et, pour plusieurs méthodes, un choix (factorisation, formule quadratique…).
  5. Des graphes accompagnent les fonctions.
- **Point clé [NV] :** le moteur historique est **symbolique et déterministe**, pas un modèle de langage. C'est pourquoi les résultats sont fiables sur les exercices reconnus, mais faibles sur les problèmes rédigés en texte.
- **Offre payante « Photomath Plus » [NV] :** explications animées, approfondissements et, aux États-Unis, solutions de manuels scolaires. Le prix tournait autour de 9,99 $/mois ou environ 70 $/an, avec des variations selon le pays.
- **Intégration à Google [NV] :** la fonction « Aide aux devoirs » est arrivée dans Google Lens et dans Circle to Search (2024).

**Gauth (ByteDance)**
- **Origine [NV] :** lancé vers 2020 sous le nom Gauthmath, piloté depuis Singapour, élargi ensuite à toutes les matières grâce à un modèle de langage.
- **Fonctions [NV] :** photo de l'exercice, réponse IA étape par étape, puis bouton « demander à un tuteur en direct » (des experts humains payés à la tâche).
- **Abonnement « Gauth Plus » [NV] :** il débloque les explications détaillées et le tuteur en direct.
- **Audience [NV] :** la presse tech (Financial Times, The Information) l'a classé en 2024-2025 parmi les applis d'éducation les plus téléchargées aux États-Unis, en concurrence directe avec Question.AI. Je n'ai pas de chiffre de revenu ou d'utilisateurs vérifié.

**Brainly**
- **Profil [NV] :** créé en Pologne en 2009. Modèle questions-réponses communautaire. L'entreprise annonçait environ 300 M d'utilisateurs mensuels vers 2021. Série D d'environ 80 M$ en 2020 (Learn Capital), avec Naspers/Prosus parmi les investisseurs.
- **Évolution [NV] :** à partir de 2023, ajout d'outils IA (simplifier ou développer une réponse, scan photo, tuteur IA). Les réponses portent un **badge « Réponse vérifiée »** quand des experts ou des modérateurs les ont validées.
- **Modèle économique [NV] :** freemium avec publicité, plus l'abonnement Brainly Plus/Tutor sans publicité, avec accès illimité.

**Google Socratic / Lens [NV]**
- Socratic a été racheté par Google en 2018. Ses fonctions ont ensuite été fondues dans Google Lens, avec un filtre « Devoirs ».
- Une annonce de fin de l'appli Socratic autonome au profit de Lens/Gemini a circulé en 2024. **Date et statut exacts à vérifier.**

**Question.AI [NV]**
- C'est un solveur IA multi-matières par photo, qui a grimpé dans le classement américain de l'App Store en 2024.
- Des articles l'ont relié à des acteurs chinois de l'edtech (Zuoyebang, via une entité basée à l'étranger). **Lien de propriété non vérifié.**

**Mathway (Chegg) et Symbolab (Course Hero/Learneo) [NV]**
- Mathway a été racheté par Chegg vers 2016. Symbolab (société israélienne EqsQuest) a été racheté par Course Hero vers 2020.
- Les deux donnent la réponse gratuitement et **font payer les étapes**. Prix typique : environ 10 $/mois pour Mathway, moins pour Symbolab Pro.

**Repère sectoriel : Chegg [NV]**
- L'action Chegg s'est effondrée en mai 2023 après que la direction a reconnu l'impact de ChatGPT sur ses inscriptions.
- Le nombre d'abonnés a baissé ensuite. Chegg a attaqué Google en justice en 2025 au sujet des AI Overviews.
- Ce cas montre qu'une réponse brute est devenue une marchandise sans valeur.

**Nouveaux venus IA [NV]**
- ChatGPT : « mode Étude » (été 2025), qui guide par questions au lieu de donner la réponse.
- Gemini : « Guided Learning » (2025).
- Khan Academy : Khanmigo, un tuteur socratique.
- Les géants poussent donc tous vers l'**accompagnement guidé** plutôt que vers la réponse immédiate.

## 2. Ce qui marche et pourquoi (mêmes réserves [NV])

1. **Zéro friction à l'entrée.** On peut photographier sans créer de compte et le résultat tombe en quelques secondes. C'est le moteur de la croissance virale de Photomath et de Gauth.
2. **Des étapes qu'on déplie une à une, avec le « pourquoi ».** Ce format différencie Photomath d'une simple calculatrice. Il permet aussi de défendre le produit auprès des enseignants et des parents (« on apprend la méthode »).
3. **Plusieurs méthodes pour un même exercice.** C'est utile quand le professeur impose une méthode précise, ce qui est très fréquent dans les systèmes d'inspiration française.
4. **Des signaux de confiance.** Badge « vérifiée » chez Brainly, recours à un humain chez Gauth : ce sont des réponses directes à la peur que l'IA se trompe.
5. **Le visuel.** Graphes, animations, couleurs pour la ligne modifiée à chaque étape.
6. **Une acquisition portée par TikTok et le bouche-à-oreille.** Gauth et Question.AI auraient beaucoup investi en publicité sur les réseaux de vidéos courtes aux États-Unis. **Montants non vérifiés.**
7. **La réponse gratuite, la compréhension payante.** Le paywall est placé sur la valeur pédagogique (les étapes et l'animation), pas sur la réponse elle-même.

## 3. Ce qui échoue ou agace (synthèse des critiques courantes, non revérifiée [NV])

- **Paywall placé juste au moment du besoin.** Les étapes sont bloquées ; c'est la plainte n°1 dans les avis Mathway et Symbolab.
- **Facturations surprises.** Fins d'essai gratuit avec renouvellement automatique et difficulté à résilier, signalées dans les avis sur les stores.
- **Erreurs de l'IA présentées avec assurance.** Elles touchent surtout les problèmes rédigés, la géométrie et la physique (Gauth, Question.AI). Les applis à moteur symbolique se trompent moins mais refusent plus souvent l'exercice.
- **Reconnaissance défaillante.** Écriture manuscrite, photos floues, énoncés sur plusieurs lignes, figures.
- **Publicité envahissante chez Brainly, réponses communautaires inégales.**
- **Triche.** Les enseignants signalent des copies identiques. Chegg a été associé à des affaires d'intégrité académique. Les plateformes répondent par des chartes d'honneur, mais aucune n'offre de vrai garde-fou.
- **Programme non adapté.** Notations, méthodes et vocabulaire sont américains ou internationaux, et la couverture du français est variable. **Rien de vérifié sur la couverture des programmes d'Afrique de l'Ouest (BFEM, BEPC, BAC).**

## 4. Recommandations pour Révizo, classées par impact

Ces recommandations relèvent du jugement d'analyste, à confirmer quand la recherche aura pu être faite.

**A. Fonctionnalités et fiabilité (impact maximal)**
1. **Vérifier les calculs par machine.** Pour les maths, contrôler le résultat de l'IA avec un moteur de calcul formel (type SymPy). Si les deux divergent, afficher un indicateur « réponse à vérifier » et donner une possibilité de signalement en un clic. Le signalement doit rembourser le crédit, ce qui crée la confiance et alimente la base d'erreurs.
2. **Aligner sur le programme local.** Utiliser les méthodes et les notations attendues aux examens nationaux (BFEM au Sénégal, BEPC, BAC) et mettre en avant des sujets d'annales. **Les détails varient selon le pays : à vérifier pays par pays** auprès des offices du BAC et des ministères.
3. **Proposer une échelle d'indices avant la solution complète.** Méthode, puis indice, puis étape suivante, puis correction complète. C'est la réponse la plus crédible à l'accusation de triche, et elle colle à la tendance des « modes Étude ».
4. **Boucler vers la pratique.** Après chaque explication, proposer un exercice similaire et un mini-quiz ; une erreur part automatiquement dans « révision des erreurs ». C'est ce qui distingue Révizo d'un simple solveur.

**B. Design**

5. Mettre la caméra en écran d'accueil, avec recadrage, retour visuel « photo nette » et saisie texte en secours.
6. Afficher les étapes en accordéon, en surlignant ce qui change à chaque ligne et en ajoutant une phrase « pourquoi » par étape.
7. Viser la légèreté de la PWA : chargement adapté aux connexions 3G et aux téléphones d'entrée de gamme, cache des explications déjà vues.

**C. Prix**

8. **Afficher la réponse et la méthode gratuitement, faire payer l'approfondissement.** Étapes détaillées, exercices similaires, duels premium.
9. **Proposer des micro-packs de crédits payables en mobile money.** Les montants exacts en FCFA sont à tester par A/B ; je n'ai aucun repère de prix local vérifié. Éviter le renouvellement automatique caché, qui est une source majeure d'avis négatifs chez les concurrents.
10. Créer des offres « période d'examen » (pack BAC ou BFEM) et une option de paiement par le parent.

**D. Acquisition**

11. Faire des vidéos courtes du type « avant / après » (photo d'un exercice local, puis explication claire), tournées avec des professeurs ou des élèves de la région. Utiliser les duels comme ressort de partage.
12. Construire la confiance des adultes : expliquer ouvertement la lutte contre la triche (indices d'abord) et nouer des partenariats avec des professeurs et des établissements.

## 5. Sources (URL)

**Aucune de ces URL n'a été consultée dans cette session.** Ce sont des pistes à vérifier en priorité lors d'une nouvelle exécution :

- https://photomath.com/ (bloqué par le proxy dans cette session)
- https://www.gauthmath.com/ (bloqué par le proxy dans cette session)
- https://brainly.com/
- https://www.mathway.com/
- https://www.symbolab.com/
- https://questionai.com/
- https://en.wikipedia.org/wiki/Photomath (échec DNS)
- https://en.wikipedia.org/wiki/Brainly (échec DNS)
- https://en.wikipedia.org/wiki/Socratic_(app) (échec DNS)
- https://investor.chegg.com/ (résultats de mai 2023, baisse des abonnés)
- https://openai.com/index/chatgpt-study-mode/ (mode Étude)
- https://blog.google/ (annonces Lens homework, Circle to Search, Guided Learning)
- https://officedubac.sn/ (bloqué par le proxy dans cette session)

**Bilan : 0 recherche web effectuée (4 tentées, toutes refusées, budget épuisé) ; 0 page lue (6 tentées, échec DNS ou proxy). Rapport provisoire, non sourcé, à refaire.**