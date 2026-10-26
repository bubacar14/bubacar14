# Rapport : acquisition des applis éducatives sur TikTok, Facebook et Instagram pour Révizo

> **Statut : la recherche n'a pas pu être faite. 0 recherche web a abouti.**
>
> - Les 5 premières requêtes WebSearch ont été refusées : la limite partagée de 200 recherches web pour ce tour était déjà épuisée par les autres agents du workflow.
> - J'ai alors essayé d'ouvrir directement des pages officielles connues avec WebFetch : transparency.meta.com, facebook.com/business, ads.tiktok.com, about.fb.com et en.wikipedia.org. Les 5 ont échoué avec `getaddrinfo ENOTFOUND`, ce qui veut dire qu'il n'y avait aucun accès réseau.
> - **Je n'ai donc pas pu atteindre l'exigence de 30 à 50 recherches sourcées.** Aucune URL n'a été lue. Je ne cite aucune source comme « vérifiée ».
> - Ce qui suit vient uniquement de mes connaissances antérieures. Chaque point porte la mention **[NON VÉRIFIÉ]** et doit être contrôlé avant toute décision.
> - **Pour obtenir le vrai rapport :** relancer cet agent seul, dans un tour où le budget de recherche n'est pas épuisé, ou augmenter `CLAUDE_CODE_MAX_WEB_SEARCHES_PER_SESSION`.

---

## 1. Ce que font les meilleurs [NON VÉRIFIÉ]

- **Gauth (ByteDance) et Question.AI.** Ces aides aux devoirs par photo et IA, concurrentes directes de Révizo, ont acheté beaucoup de publicité sur TikTok en 2023 et 2024. Elles se sont classées très haut en éducation dans plusieurs stores occidentaux. Le format décrit habituellement est simple : une vidéo verticale où l'on photographie un exercice, puis la solution s'affiche étape par étape, en moins de 10 secondes. Je ne dispose d'aucun chiffre de dépenses ni de CPI fiable pour ces applis.
- **Photomath.** Racheté par Google (annonce en 2022, finalisation en 2023), il revendique des centaines de millions de téléchargements. Sa promesse tient en une phrase : « pointe ta caméra, comprends chaque étape ». Le chiffre exact reste à vérifier.
- **Duolingo.** La marque a construit une forte audience sur TikTok avec un contenu organique centré sur sa mascotte, une chouette au ton décalé, plutôt qu'avec des pubs classiques. C'est le cas le plus souvent cité en growth. Le nombre d'abonnés et l'effet mesuré sur les installations restent à vérifier.
- **Edtechs africaines.** uLesson (Nigeria) est un acteur connu de l'Afrique anglophone. Je n'ai pas de données vérifiées sur leurs campagnes payantes. Je ne cite aucun acteur francophone ouest-africain précis, faute de pouvoir le confirmer.

## 2. Ce qui marche et pourquoi : hypothèses à tester [NON VÉRIFIÉ]

- **Une démonstration du produit en moins de 3 secondes** : l'exercice qu'on n'arrive pas à faire, la photo, puis l'explication. C'est le format dominant des pubs « aide aux devoirs ». Il marche parce que la promesse se voit au lieu de se raconter.
- **Des créateurs du même âge ou des profs reconnus, filmés au téléphone dans un style amateur (format UGC).** Sur TikTok, ce style a la réputation de mieux performer que les visuels de marque. C'est la doctrine générale de TikTok, que je n'ai pas vérifiée ici.
- **Un calendrier calé sur les examens.** Les campagnes « J-30 avant le BAC » et les périodes de révision sont des leviers classiques.
  - Au Sénégal, le BAC est organisé par l'Office du Bac (UCAD) et le BFEM a aussi lieu en fin d'année scolaire.
  - En Côte d'Ivoire, le BAC et le BEPC sont organisés par la DECO.
  - Les épreuves tombent en général entre juin et juillet. **Les dates varient selon le pays et l'année** et doivent être prises sur les sites officiels.
- **Des coûts publicitaires bas en Afrique.** Les CPM et les coûts par installation (CPI) sont souvent décrits comme nettement plus bas qu'en Europe ou aux États-Unis. **Je n'ai aucun chiffre sourcé** pour le Sénégal, la Côte d'Ivoire ou le Mali. Les benchmarks publics, comme ceux d'AppsFlyer ou de Business of Apps, sont à consulter. Un point important : Révizo est une PWA, donc il faut raisonner en coût par inscrit et non en CPI d'app store.

## 3. Ce qui échoue ou agace les utilisateurs [NON VÉRIFIÉ]

- **Le paywall surprise** : la solution est floutée tant que l'élève n'a pas payé. C'est une critique fréquente dans les avis des applis de type Gauth ou Photomath Plus.
- **Des réponses fausses** ou des méthodes qui ne correspondent pas au programme local.
- **Une réputation d'outil de triche** auprès des parents et des enseignants.
- **Trop de publicités dans l'appli** et des abonnements difficiles à résilier.

Je n'ai pu lire aucun avis réel des stores ni de forum. Ces points sont des tendances connues, pas des constats sourcés.

## Règles publicitaires sur les mineurs [NON VÉRIFIÉ, À VÉRIFIER EN PRIORITÉ]

- **Meta.**
  - Depuis 2021, le ciblage par centres d'intérêt est retiré pour les moins de 18 ans.
  - Depuis février 2023 (annonce de janvier 2023), les annonceurs ne peuvent cibler les adolescents que par **âge et lieu**. Le genre est retiré, et l'activité de l'ado sur les apps n'est plus utilisée pour lui montrer des pubs.
  - Conséquence pour Révizo : pas de ciblage fin des 13–17 ans. Il faut un créatif très clair et laisser l'algorithme optimiser.
- **TikTok.**
  - L'âge minimum est de 13 ans.
  - Depuis 2023, les 13–17 ans de l'UE, de l'EEE, du Royaume-Uni et de la Suisse ne voient plus de pubs personnalisées selon leur activité.
  - Certaines catégories de produits sont réservées aux 18 ans et plus.
  - Les règles qui s'appliquent en Afrique de l'Ouest n'ont pas été vérifiées.
- **Le paiement mobile money est souvent fait par un parent.** Cela pousse à cibler aussi les parents adultes, qui peuvent être ciblés normalement, sur Facebook en particulier.
- **Pages officielles à lire.** Ce sont des URL que je connais, mais je n'ai pas pu les ouvrir : transparency.meta.com/policies/ad-standards, about.fb.com/news (annonce de janvier 2023 sur les pubs pour ados), ads.tiktok.com/help (TikTok Advertising Policies).

## 4. Recommandations pour Révizo, classées par impact (hypothèses à valider)

1. **Acquisition, créatif.** Produire 10 à 20 vidéos verticales de 15 à 25 secondes :
   - un vrai exercice du programme local, BFEM ou BAC, qu'on photographie puis qu'on voit expliqué étape par étape ;
   - en français parlé local, avec option wolof ou dioula ;
   - jouées par des élèves ou des profs locaux.

   Tester 3 accroches : « Bloqué sur ton exo ? », « J-30 avant le BAC », « Ton prof en poche à 2h du matin ».
2. **Acquisition, double cible.** Une campagne ados (âge et lieu seulement) et une campagne parents sur Facebook, orientée « mon enfant progresse » et paiement Wave ou Orange Money.
3. **Prix.** Pas de paywall surprise. Offrir les premiers exercices gratuitement et afficher clairement le prix en FCFA avant la demande de paiement. Proposer des packs « spécial examen ».
4. **Fonctionnalités et image.** Mettre en avant la méthode plutôt que la réponse (« comprendre, pas copier ») pour désamorcer la critique de la triche. Ajouter un retour « réponse fausse » en un clic.
5. **Ambassadeurs.** Mettre en place un programme d'élèves ambassadeurs par lycée, avec code de parrainage et récompense en crédits. Approcher des profs YouTubeurs ou TikTokeurs locaux. Aucune chaîne précise n'a pu être vérifiée.
6. **Mesure.** Comme Révizo est une PWA, installer le pixel Meta et le pixel TikTok sur l'inscription et le premier paiement. Optimiser sur le coût par inscrit, pas sur les clics.

## 5. Sources (URL)

Aucune source n'a pu être consultée : la limite de recherche était épuisée et le réseau ne répondait pas. Toutes les affirmations ci-dessus sont **[NON VÉRIFIÉ]**.

**Nombre de recherches effectuées : 0 abouties.** 5 requêtes WebSearch refusées et 5 tentatives WebFetch en échec DNS.