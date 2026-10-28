# Historique et informations clés (session d'octobre 2026)

Ce document rassemble ce qui a été décidé, calculé et appris pendant la conversation où Révizo est né. Le plan à jour est dans `PLAN.md`. La mémoire du projet, pour Claude, est dans `CLAUDE.md`.

⚠️ Tous les chiffres de marché, de prix, de coûts et de conversion sont des **estimations**. Ils sont à vérifier sur le terrain.

## 1. Comment on est arrivé à Révizo

1. **Point de départ :** trouver des « wrappers IA » à la manière de Higgsfield pour l'Afrique. Le principe : assembler des modèles d'IA existants dans des presets simples, payés en crédits, avec une diffusion virale.
2. **Tournoi n°1** : 10 agents, tous domaines confondus (`recherche/tournoi-wrappers-afrique.md`).
   - Gagnant : **Jaay Studio**, des visuels produits pour les vendeuses WhatsApp.
   - Autres finalistes : Xew Studio (faire-part), PAPIERS (écrivain public IA), KËR (immobilier), Tëgg Studio (couture).
3. **Choix de l'éducation**, puis **tournoi n°2** : 10 agents sur la révision (`recherche/tournoi-education.md`).
   - Gagnant : **Wóoy Quiz**, un coach vocal avec répétition espacée.
   - Autres finalistes : ErreurZéro, Copie Rouge, Kàddu Bac, Kayit.
4. **Décision :** une appli propre, pas un bot WhatsApp, pour toute l'Afrique de l'Ouest francophone.
5. **Retirés du périmètre :** podcast du cahier, jury oral, prof avatar vidéo, appli Play Store, voix de synthèse.
6. **Fonction phare choisie :** « Mon exercice ». N'importe quel exercice, expliqué étape par étape.
7. **Design :**
   - charte Cahier/Ardoise ;
   - recherche sur les concurrents (114 recherches) ;
   - refonte autour de la mascotte **Sanko** ;
   - nouveau logo.

## 2. Modèle économique (version actuelle)

- **1 crédit = 1 exercice expliqué.**
- **Gratuit :** 1 exercice par jour, quiz, révision des erreurs, duels et série.
- **Prix provisoires :** 200 FCFA les 3 crédits, 500 FCFA les 10 (« le plus choisi »), 2 000 FCFA les 50.
- **Pas d'abonnement ni de prélèvement automatique.** C'est un argument de vente : les prélèvements surprises sont la première plainte contre Gauth, Brainly et Kartable.
- **Bouton « Demander à un parent de payer »** via WhatsApp. C'est le parent qui paie le plus souvent.
- **Coût de l'IA par exercice :**
  - environ 30 à 60 FCFA avec Opus 5.5 : le prix de vente couvre à peine ce coût ;
  - environ 1 à 3 FCFA avec Haiku 5.5.
  - **Décision à prendre après un test sur 20 vrais exercices.**
- **Guides de correction mis en cache :** quelques FCFA par exercice quand les élèves sont nombreux, jusqu'à environ 90 FCFA de plus quand le cache a expiré, avec Opus.
- **Paiement :** des agrégateurs comme CinetPay, PayDunya ou FedaPay prennent environ 2 à 4 %. À vérifier : Google Play impose son propre paiement dans les applis du store, d'où le choix d'une appli web.

### Scénarios de revenus (estimations, avec un revenu moyen d'environ 1 500 FCFA par payant et par mois)

| | Année 1, 1 pays | Année 2, 3 pays | Année 3, 8 pays |
|---|---|---|---|
| Budget pub | 500 000 FCFA/mois | 2 M FCFA/mois | 8 M FCFA/mois |
| Élèves actifs | ~25 000 | ~200 000 | ~1 000 000 |
| Payants | 4 % | 5 % | 6 % |
| Revenu / an | ~9 M FCFA | ~173 M FCFA | ~1,15 milliard FCFA |
| Résultat | ≈ -1 M FCFA (sans salaires) | ~60 M FCFA | ~590 M FCFA |

- **Budget de démarrage** (6 mois, 1 pays) : environ 2,6 à 4,5 M FCFA. Il couvre les questions validées par des profs, la pub, les ambassadeurs et les frais juridiques.
- **Les 3 chiffres qui décident de tout :**
  1. le taux de passage en payant ;
  2. le coût d'acquisition (à garder sous environ 4 000 FCFA par payant) ;
  3. le coût de l'IA par exercice.

## 3. Plan d'acquisition (pubs TikTok, Facebook, Instagram)

- **Cibles :**
  - les parents (30 à 55 ans) sur Facebook et Instagram ;
  - les élèves de 18 ans et plus sur TikTok ;
  - la diaspora sur Facebook.
  - Les plateformes limitent fortement le ciblage des moins de 18 ans : on les touche par le contenu gratuit, les ambassadeurs et les écoles.
- **Formats de pub :**
  - démo « photo de l'exercice → méthode » ;
  - avant/après d'une copie ;
  - duel entre amis ;
  - compte à rebours « BAC dans 60 jours » ;
  - message aux parents ;
  - « Offrez le BAC à votre petit frère » pour la diaspora ;
  - témoignages.
- **Calendrier :** 15 % du budget à la rentrée, 20 % pour les compositions, **60 % d'avril à juillet** (examens), 5 % pour des tests en été.
- **Coûts estimés :**
  - environ 100 à 250 FCFA par inscrit ;
  - environ 2 500 à 6 000 FCFA par payant.
  - La pub seule est à peine rentable. Il faut l'associer à la viralité (duels, partage), aux ambassadeurs et aux écoles.
- **Pour la célébrité :** faire vivre Sanko sur les réseaux, comme Duo pour Duolingo : vidéos, mèmes, stickers WhatsApp.

## 4. Enseignements clés de la recherche design (`recherche/design-synthese.md`)

1. **La valeur d'abord, le compte ensuite :** un premier exercice sans inscription.
2. **Toujours faire confirmer à l'élève ce que l'IA a lu**, avant de résoudre.
3. **Donner un indice, pas la réponse.** C'est l'étude Wharton, sur environ 1 000 lycéens :
   - avec la réponse directe, l'examen passé sans IA baisse de 17 % ;
   - avec des indices, il ne baisse pas.
4. Des garde-fous visibles (« Je bloque »), une petite étape à la fois.
5. Ne jamais punir l'effort, ne jamais culpabiliser. Célébrer la série et pardonner un jour manqué.
6. La transparence de facturation fait vendre, l'opacité fait fuir.
7. **En Afrique de l'Ouest :** un format léger, hors ligne et court l'emporte.

## 5. Problèmes techniques rencontrés et solutions

- **GitHub refusait l'envoi du code :** il a fallu connecter GitHub sur https://claude.ai/connect-github et installer l'application Claude sur le dépôt.
- **YouTube bloque les serveurs cloud :** les transcriptions se récupèrent depuis un ordinateur personnel (`tools/youtube_transcripts.py`). YouTube a aussi bloqué le script après la première matière : il faut le relancer avec une pause plus longue.
- **Quota de recherches web d'environ 200 par session**, partagé entre tous les agents. Il a été épuisé lors de la grosse recherche : les 8 vérificateurs n'ont rien pu vérifier. La prochaine fois, lancer au maximum 8 agents à la fois, avec 12 à 20 recherches chacun.
- **Réseau « Limited » :** il bloque la lecture de la plupart des sites. Il faut un niveau d'accès plus large pour la recherche.
- **Clé API :** l'ancienne clé a été collée dans une conversation. **Il faut la supprimer** sur console.anthropic.com, en créer une nouvelle et la mettre seulement dans `.env`. Une limite de dépense mensuelle est conseillée.
- **Test en local :** la session Claude Code sur le Mac exige ton accord pour lancer du code téléchargé avec ta clé. C'est normal : autorise-le pour ce dépôt.

## 6. Où se trouve chaque chose

| Quoi | Où |
|---|---|
| Code de l'appli | GitHub `bubacar14/bubacar14`, branche `claude/phone-control-l2egop` |
| Charte graphique (Claude Design) | https://claude.ai/artifact/JcZrPiXS1hqtb7tbyVPiSF : elle reste disponible même si cette conversation est supprimée |
| Logo et aperçus | `marque/`, `marque/apercus/` |
| Outils pour régénérer le logo | `marque/outils/` (voir le README) |
| Recherches et tournois | `recherche/` |
| Guides de correction | `guides/` |
| Plan et décisions | `PLAN.md` |
