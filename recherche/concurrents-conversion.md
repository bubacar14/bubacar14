# Rapport : onboarding, premier écran, paywall et passage au payant pour Révizo

## Avertissement : la recherche n'a pas pu être faite

- **Recherches web effectuées : 0.** J'ai lancé 5 requêtes WebSearch (RevenueCat 2025, onboarding Duolingo, paywall Photomath Plus, avis sur Gauth, rétention J1/J7/J30 en éducation). Aucune n'a été exécutée, car le quota de 200 recherches partagé par tous les agents de ce tour était déjà épuisé.
- **Pages lues : 0.** J'ai aussi essayé d'ouvrir directement 3 pages (revenuecat.com, blog.duolingo.com, photomath.com). Les 3 ont échoué : erreur DNS, et le proxy de sortie a répondu 403. Il bloque aussi youtube.com, sigmaths.net, sencampus.com, epreuvesetcorriges.com et fomesoutra.com.
- **Je n'ai pas contourné ces limites.** Pas de moteur de recherche via curl, pas de proxy ni de service d'archive.
- **L'exigence de l'utilisateur n'est donc pas remplie** : « au moins 30 à 50 recherches et citer ses sources ». Le contenu ci-dessous vient de mes connaissances antérieures, pas de recherches faites aujourd'hui.
  - Les chiffres marqués **[NV]** (non vérifié) viennent de ma mémoire. Ils peuvent être faux ou dépassés.
  - Les URL sont celles que je crois exister. **Aucune n'a été ouverte.** Vérifiez-les avant toute citation.
- **Pour faire la vraie recherche**, il faut relancer cette étape dans un nouveau message, une fois le quota libéré ou augmenté (variable `CLAUDE_CODE_MAX_WEB_SEARCHES_PER_SESSION`), et avec un accès réseau à ces domaines.

---

## 1. Ce que font les meilleurs

**Duolingo : la valeur avant l'inscription**
- L'onboarding demande la langue, l'objectif quotidien et le niveau. On fait ensuite une première leçon complète avant de créer un compte. L'inscription vient après le premier « moment de réussite ».
- La croissance récente de Duolingo est attribuée surtout à trois leviers : les séries de jours (*streaks*), les ligues ou classements, et les notifications optimisées. Le porte-parole de cette analyse est Jorge Mazal, ancien CPO, dans la newsletter de Lenny Rachitsky [NV]. URL supposée : https://www.lennysnewsletter.com/p/how-duolingo-reignited-user-growth
- Modèle freemium avec publicités et un système de « cœurs » (vies) dans la version gratuite. Super/Max est l'abonnement, avec un essai gratuit proposé au bon moment, souvent après une leçon réussie [NV].

**Photomath (Google) : le résolveur par photo, le plus proche de Révizo**
- Le premier écran est la caméra. La réponse et les étapes de base sont gratuites.
- Photomath Plus, payant, ajoute les explications animées détaillées et les solutions de manuels [NV]. Le paywall arrive *après* que l'élève a vu que l'outil marche sur son exercice.
- URL supposée : https://photomath.com/en/plus

**Gauth (ByteDance), Brainly, Socratic**
- Gauth : caméra en premier écran, quota de réponses gratuites, puis abonnement Plus. Les publicités TikTok sont massives [NV].
- Brainly : questions-réponses communautaires, nombre limité de réponses gratuites, abonnement Plus/Tutor [NV].
- Socratic (Google) : gratuit, sans paywall [NV].
- Ce qu'ils ont en commun : **résultat visible en moins de 30 secondes**, inscription repoussée ou très légère.

**Les chiffres de référence (abonnements)**
- Rapport annuel de RevenueCat, *State of Subscription Apps* [NV] :
  - Le paywall « dur » (aucun usage sans payer ou sans essai) convertit plusieurs fois mieux en téléchargement→payant que le freemium. Ordre de grandeur souvenu : environ 10 % contre environ 2 % à J35 [NV].
  - Une grande part des essais démarre le jour de l'installation (J0), la majorité selon mes souvenirs [NV]. L'écran affiché au premier lancement est donc décisif.
  - L'éducation a une conversion essai→payant moyenne, mais une rétention annuelle plus faible que d'autres catégories [NV].
  - URL supposée : https://www.revenuecat.com/state-of-subscription-apps-2025/
- Rétention moyenne en éducation, ordres de grandeur souvent cités par Adjust, AppsFlyer ou Business of Apps [NV] :
  - J1 environ 20 à 25 % ;
  - J7 environ 8 à 12 % ;
  - J30 environ 2 à 5 %.
  - Ces chiffres varient fortement selon les pays et selon la source.

**Le paiement mobile money en Afrique de l'Ouest**
- Des agrégateurs permettent d'encaisser Wave, Orange Money, MTN MoMo et Moov dans une appli web : CinetPay, PayDunya, FedaPay, Paystack (MoMo au Ghana et en Côte d'Ivoire), Flutterwave. Ces acteurs existent ; leurs frais, leur couverture par pays et les conditions d'intégration de Wave **ne sont pas vérifiés**.
- Dans la région, l'usage dominant est le **micro-paiement** : forfaits data et crédit d'appel à la journée ou à la semaine. Le modèle « crédits » ou « pass court » de Révizo suit ce comportement. C'est une déduction, pas un chiffre sourcé.

## 2. Ce qui marche et pourquoi

1. **Montrer la valeur avant de demander quoi que ce soit.**
   - Le principe : l'utilisateur doit vivre le « moment aha » avant l'inscription et avant le paywall (logique Duolingo et Photomath [NV]).
   - Pour Révizo, ce moment est : *« J'ai photographié mon exercice et j'ai compris la méthode. »*
2. **Le paywall contextuel plutôt que le paywall générique.**
   - Proposer de payer au moment où un besoin apparaît convertit mieux. Exemple : l'élève veut l'explication détaillée de l'étape 3, ou il a fini son dernier crédit gratuit.
   - C'est un consensus des praticiens (blogs RevenueCat, Superwall, Adapty) [NV]. Superwall publie beaucoup d'exemples A/B de paywalls [NV].
3. **Des formules lisibles, avec une option mise en avant.**
   - 2 ou 3 formules au plus, une option « recommandée », le prix ramené à l'unité (« 50 F par exercice ») et une garantie claire.
   - L'effet d'ancrage (une grosse formule à côté) est une bonne pratique classique [NV].
4. **Les séries et le social pour la rétention J7 et J30.**
   - Séries de jours et ligues chez Duolingo [NV]. Les duels de Révizo sont un équivalent naturel.
5. **Le micro-paiement adapté au pouvoir d'achat.**
   - Le paiement sans carte bancaire est indispensable en Afrique de l'Ouest francophone, où le taux de bancarisation est faible et où le mobile money domine. Cela se retrouve dans les rapports GSMA *State of the Industry on Mobile Money* [NV] : https://www.gsma.com/sotir/ (URL supposée).

## 3. Ce qui échoue ou agace

Je n'ai lu aucun avis aujourd'hui. Les points ci-dessous sont des plaintes récurrentes connues sur les stores ; elles restent à vérifier sur Google Play.

- **Le paywall surprise** : l'élève voit la réponse floutée après avoir pris la photo. Ce reproche revient souvent pour Gauth et Brainly [NV].
- **Les essais à renouvellement automatique mal compris**, puis l'accusation d'« arnaque » et des notes 1 étoile [NV]. C'est moins un risque avec le mobile money, qui demande en général une confirmation à chaque paiement, mais il faut l'expliquer à l'élève.
- **Les réponses fausses de l'IA** sur des exercices de niveau lycée ou d'énoncés locaux. Elles détruisent la confiance très vite [NV].
- **Une inscription trop longue avant toute valeur** : téléphone, OTP par SMS, choix de la classe…
- **Les PWA lentes ou lourdes** sur les téléphones Android d'entrée de gamme avec une data chère. Hypothèse sur le contexte, non chiffrée.
- **La « triche »** : parents et enseignants critiquent les applis qui donnent la réponse sans faire comprendre. Le positionnement « méthode » de Révizo est un atout s'il est réel dans le produit.

## 4. Recommandations pour Révizo, classées par impact

**Impact très élevé**
1. **Le premier écran est le bouton « Envoie ton exercice ».** Photo ou texte, sans compte, avec 1 à 3 explications gratuites (pas de flou sur la première).
   - Demander le numéro de téléphone seulement après la première explication réussie, avec la phrase « Garde ton historique et tes crédits ».
2. **Le paywall arrive à l'épuisement des crédits gratuits, ou sur « explication approfondie ».** Jamais avant la première valeur.
   - Afficher les crédits restants en permanence pour qu'il n'y ait pas de surprise.
3. **Le mobile money en un tap.**
   - Wave et Orange Money en premier selon le pays, détectés par l'indicatif du numéro.
   - Petits paliers : par exemple un pass jour, un pack semaine, un pack mois. Les prix sont à tester ; je n'ai pas vérifié de prix de référence.
   - Un reçu clair et aucun renouvellement automatique caché.
4. **La qualité et la confiance de l'IA.**
   - Un bouton « l'explication est fausse », avec un crédit remboursé.
   - Indiquer le niveau scolaire et le programme suivi.

**Impact élevé**
5. **Mesurer la rétention J1, J7, J30 par source publicitaire.** TikTok, Facebook et Instagram ramènent des publics différents.
   - Se comparer à l'ordre de grandeur cité plus haut (J1 environ 20 à 25 %, J30 environ 2 à 5 %) en le traitant comme une hypothèse, pas une norme.
6. **Les boucles de rétention.**
   - Révision des erreurs envoyée le lendemain : « 3 exercices ratés à revoir ».
   - Série de jours, duels entre camarades et un lien de partage WhatsApp.
7. **Le parrainage payé en crédits** : « Invite un camarade, vous gagnez 2 explications chacun ». Le viral est bon marché, par WhatsApp et par classe.

**Impact moyen**
8. **La publicité montre le vrai parcours.** Photo d'un exercice du BAC, BFEM ou BEPC, puis l'explication en 15 secondes. La page d'arrivée doit être exactement ce même écran.
9. **Une PWA légère.** Mode économie de data, compression des photos avant l'envoi, installation sur l'écran d'accueil proposée après la 2e utilisation.
10. **Un pass « période d'examens »** et une offre pour les parents (payer pour son enfant). Ce sont des hypothèses à tester.

**Le prix.** Je ne peux citer aucun prix concurrent vérifié pour l'Afrique de l'Ouest. Il faut faire des tests A/B de paliers et une étude rapide auprès d'élèves (sondage WhatsApp, 20 entretiens) avant de fixer la grille.

## 5. Sources

Aucune de ces URL n'a été consultée aujourd'hui : elles viennent de ma mémoire. Il faut les vérifier avant toute citation.

- https://www.revenuecat.com/state-of-subscription-apps-2025/ : la page existe peut-être sous une autre forme, et l'accès a été refusé par le proxy.
- https://www.lennysnewsletter.com/p/how-duolingo-reignited-user-growth
- https://photomath.com/en/plus : échec DNS ou proxy.
- https://blog.duolingo.com/ : échec DNS ou proxy.
- https://www.gsma.com/sotir/
- Sites des agrégateurs de paiement, non consultés : https://cinetpay.com, https://paydunya.com, https://www.fedapay.com, https://paystack.com, https://flutterwave.com

**Bilan : 0 recherche aboutie sur 5 tentées, 0 page lue sur 3 tentées.** Il faut relancer cette étape de recherche dans un nouveau message, avec du quota de recherche et un accès réseau, pour produire le rapport sourcé demandé.