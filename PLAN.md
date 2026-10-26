# Révizo : plan et tableau de bord

Statuts : ✅ fait · 🔄 en cours · ⬜ à faire · ❓ décision à prendre

## Décisions à prendre ❓

| Sujet | Options | Recommandation |
|---|---|---|
| Nom de l'appli | Garder « Révizo » ou en choisir un autre | Vérifier que le nom et le domaine sont libres dans les 8 pays avant de dépenser en marque |
| Sanko (mascotte) | Valider le nom, le dessin et l'histoire | Faire relire l'histoire Sankofa par quelqu'un de culture akan, puis faire dessiner les poses par un illustrateur |
| Logo | Piste A (retenue), B (le « o » en Sanko) ou C (mot seul) | A |
| Modèle d'IA | Opus 5.5 (meilleur, environ 30 à 60 FCFA par exercice) ou Haiku 5.5 (environ 1 à 3 FCFA) | Tester les deux sur 20 vrais exercices, puis garder le moins cher qui corrige juste |
| Prix des crédits | Provisoire : 200 FCFA les 3, 500 FCFA les 10, 2 000 FCFA les 50 | À recalculer une fois le modèle choisi |
| Premier pays | Sénégal ou Côte d'Ivoire | Le pays où tu peux tester avec de vrais élèves et des profs |

## Phase 1 : prototype ✅

- ✅ Appli web installable, 8 pays, quiz, révision des erreurs, duels, série
- ✅ « Mon exercice » : lecture de l'énoncé, correction pas à pas, indices
- ✅ Guides de correction par matière branchés (maths enrichi par 19 vidéos YouTube)
- ✅ Charte graphique Cahier/Ardoise dans Claude Design
- ✅ Refonte autour de Sanko : boutons en relief, sons, célébrations, objectif du jour
- ✅ Nouveau logo (tête de Sanko + mot, goutte d'encre en accent)

## Phase 2 : rendre l'IA fiable 🔄

- ⬜ Tester « Mon exercice » sur 20 vrais exercices (2 par matière, plus 2 photos floues) et noter de 1 à 5 : juste, clair, adapté, rapide
- ⬜ Comparer Opus 5.5 et Haiku 5.5 sur ces exercices (qualité et coût réel)
- ⬜ Relancer la vérification des 7 guides en brouillon (PC, SVT, philo, français, histoire-géo, anglais, économie), avec le réseau élargi et un quota de recherche neuf
- ⬜ Faire relire chaque guide par un prof de la matière
- ⬜ Récupérer les transcriptions YouTube des autres matières (script à relancer plus lentement)
- ⬜ Vérifier les calculs de maths automatiquement (SymPy) et afficher un badge « Calcul vérifié »
- ⬜ Enregistrer côté serveur les explications signalées comme fausses, pour corriger les guides

## Phase 3 : prêt pour de vrais élèves ⬜

- ⬜ Vrais comptes : numéro de téléphone après le 1er exercice, sauvegarde en ligne (Supabase)
- ⬜ Vrai paiement mobile money (CinetPay, PayDunya ou FedaPay), avec Wave et Orange Money
- ⬜ Hébergement en ligne (Render ou Railway) et nom de domaine
- ⬜ Banque de 1 500 questions validées par des profs, par pays et par examen
- ⬜ Mode hors ligne : file d'attente des photos quand le réseau manque
- ⬜ Mesures d'usage (PostHog) : rétention à J1, J7 et J30, conversion en payant, coût par exercice
- ⬜ Mentions légales, CGU, données personnelles (CDP au Sénégal, ARTCI en Côte d'Ivoire), accord parental pour les mineurs
- ⬜ Création de la société

## Phase 4 : test terrain ⬜

- ⬜ 50 à 500 élèves dans 3 à 5 lycées et 2 cours de renforcement
- ⬜ Objectifs : au moins 35 % des élèves encore actifs à J7, et au moins 4 % qui paient
- ⬜ 5 à 8 entretiens d'élèves sur l'écran « Énoncé lu », le mode « Essaie d'abord » et le paiement

## Phase 5 : lancement et croissance ⬜

- ⬜ Faire vivre Sanko sur TikTok, Instagram et WhatsApp (vidéos, mèmes, stickers)
- ⬜ 10 premiers scripts de vidéos TikTok avec Sanko
- ⬜ Campagnes Meta et TikTok calées sur les examens (60 % du budget de mars à juin)
- ⬜ Ambassadeurs dans les lycées, offre pour les cours de renforcement et les écoles
- ⬜ 2e et 3e pays

## Journal des décisions

| Date | Décision |
|---|---|
| Octobre 2026 | Éducation choisie comme premier domaine, avec une appli propre plutôt qu'un bot WhatsApp |
| Octobre 2026 | Podcast, jury oral, prof avatar, appli Play Store et voix retirés du périmètre |
| Octobre 2026 | Correction progressive avec indices plutôt que la réponse directe |
| Octobre 2026 | Crédits sans abonnement ; révision, quiz et série gratuits |
| Octobre 2026 | Mascotte Sanko et nouveau logo (piste A) |
