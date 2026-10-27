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
- ✅ Guides de correction par matière branchés (maths enrichi par 19 vidéos YouTube, physique-chimie par 10)
- ✅ Charte graphique Cahier/Ardoise dans Claude Design
- ✅ Refonte autour de Sanko : boutons en relief, sons, célébrations, objectif du jour
- ✅ Nouveau logo (tête de Sanko + mot, goutte d'encre en accent)

## Phase 2 : rendre l'IA fiable 🔄

- ⬜ Tester « Mon exercice » sur 20 vrais exercices (2 par matière, plus 2 photos floues) et noter de 1 à 5 : juste, clair, adapté, rapide
- ⬜ Comparer Opus 5.5 et Haiku 5.5 sur ces exercices (qualité et coût réel)
- ⬜ Relancer la vérification des 7 guides en brouillon (PC, SVT, philo, français, histoire-géo, anglais, économie), avec le réseau élargi et un quota de recherche neuf
- ⬜ Faire relire chaque guide par un prof de la matière
- 🟡 Récupérer les transcriptions YouTube des autres matières : script élargi (59 recherches, 8 pays, brevet), liste des vidéos dans youtube/candidats.json. 12 vidéos de PC récupérées, puis YouTube a bloqué l'adresse IP plus de 2 h. Reste : SVT, philo, français, HG, anglais, éco (relancer `python tools/youtube_transcripts.py`, idéalement sur une autre connexion)
- ⬜ Analyser les 20 nouvelles vidéos de maths (39 au total, 19 analysées)
- ✅ Lire les sites de cours sénégalais (Sunudaara, SamaBFEM, TopEducationSN) : guides enrichis pour le BFEM (maths, PC, SVT, français, HG, anglais), synthèse dans recherche/sites-cours-senegal.md
- ⬜ Utiliser les énoncés du BFEM (Sunudaara, TopEducationSN) et leurs corrigés comme banc d'essai des « 20 vrais exercices »
- ✅ Programmes du Sénégal par classe (6e → Terminale) et structure du BAC 2024-2025 ajoutés aux guides (maths, PC, SVT, philo, HG)
- ⬜ Vérifier sur de vrais exercices que l'IA reste au niveau de la classe envoyée (la classe est déjà transmise ; les programmes par classe sont dans les guides)
- ✅ Fiches pays sourcées (guides/pays/) branchées sur l'IA : seule celle du pays de l'élève est envoyée. Testé avec un vrai exercice (Burkina, 3e)
- ✅ Grilles officielles du BAC sénégalais (français, anglais) et barème officiel du BEPC burkinabè (français) ajoutés aux guides
- ⬜ Compléter les fiches Bénin, Togo, Guinée, Niger (formats d'épreuves et coefficients introuvables en ligne) et l'économie (aucune source trouvée)
- ⬜ Contenu des programmes du primaire (on a les examens CFEE et CEPE, pas les programmes détaillés)
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
| 26 octobre 2026 | Refonte « clair et coloré » : fond blanc, thème clair par défaut (même si le téléphone est en sombre), grande carte « Mon exercice » bleu-violet avec bouton jaune, tuiles colorées (orange, bleu, violet, vert). Ardoise reste au choix dans le profil. Puis accueil plus moderne : « Salut [prénom] ! », Sanko dans la carte « Mon exercice », carrousel « Révise par matière » (un quiz par matière en un geste), tuiles à grande icône en filigrane, barre du haut en verre dépoli, blocs qui arrivent en douceur |
| 27 octobre 2026 | Accueil sans doublons : objectif du jour et série réunis (barre en 2 étapes, flamme dans la barre du haut), tuiles « Quiz du jour » et « Série » retirées au profit du carrousel (avec « Tout mélangé »). Correction en mode leçon : jauge de progression, blocs colorés, étapes reliées, étapes à venir sous cadenas, la page ne remonte plus en haut à chaque étape |
| 27 octobre 2026 | Écran de bienvenue au 1er lancement (pays, classe, prénom facultatif). Quiz adapté au niveau (brevet jusqu'en 3e, BAC dès la Seconde, tout si trop peu de questions). Bouton « Continuer » bleu après une erreur (jamais rouge). Crédits et série masqués pendant un quiz ou une correction. Accueil visible tout de suite (animation de 240 ms sans partir du vide) |
| 27 octobre 2026 | Carte « Mon exercice » refaite : une feuille d'exercice dans un viseur d'appareil photo, avec un trait de scan animé et Sanko qui regarde. Sur grand écran, texte à gauche et scène à droite. Puis version plus moderne : fond en dégradé « mesh » avec grille lumineuse, mot « exercice » en dégradé doré, badges en verre flottants (« Méthode trouvée », « Δ = 1 », « 3 étapes »), bouton lumineux |
| 27 octobre 2026 | Collecte YouTube élargie à 59 recherches (8 pays, brevet, méthode). Guide de physique-chimie enrichi d'une section « vidéos des profs » (10 vidéos) ; les 6 autres matières attendent la fin du blocage YouTube |
| 27 octobre 2026 | Carte « Mon exercice » : deux boutons côte à côte, « Photo » (jaune) et « Écrire » (blanc). Petites corrections : l'étiquette de la correction reste courte (« Maths · Terminale ») même si l'IA écrit une phrase ; un élève arrivé par un lien de duel voit l'écran de bienvenue dès qu'il quitte le duel ; bouton « Annuler » pendant « Confirme sur ton téléphone », et message clair si les 60 secondes passent sans paiement |
| 27 octobre 2026 | Sites de cours sénégalais lus. Le BFEM est désormais décrit dans les guides avec des sources réelles : corrigé officiel de SVT 2021 (1 h 30, coef. 2, 5 + 7 + 7 + 1 points), QCM de maths à 0,75 point sans point négatif, médiane par la méthode de Thalès. SamaBFEM noté comme concurrent direct sur le BFEM. Le contenu de ces sites n'est pas recopié dans l'appli (droits d'auteur) |
| 27 octobre 2026 | Expérience élève repensée. « Mon exercice » : la photo est lue tout de suite (un écran en moins), la classe n'est plus redemandée, la matière se choisit pour cet exercice seulement (sinon l'IA la devine), l'énoncé n'est affiché qu'une fois, l'attente montre une jauge et des astuces. Le bouton principal reste toujours visible en bas des parcours. Recharge sur un seul écran (une offre par ligne, bouton Payer fixe). Bienvenue en 2 étapes (pays, puis classe). Plus aucune liste coupée sur le côté. Quiz : réponses en bas, sous le pouce. Fin de quiz : semaine du lundi au dimanche, série en toutes lettres. Réviser sans doublon du quiz par matière. Toucher l'objectif du jour lance l'étape qui manque |
| 27 octobre 2026 | Sites de cours relus pour toutes les classes : programmes sénégalais de la 6e à la Terminale et sujets du BAC 2024-2025 dans les guides. Philo : consigne « texte à expliquer et discuter » confirmée (S 2024). HG : commentaires guidés par des questions au BAC |
| 27 octobre 2026 | Une fiche par pays dans guides/pays/, envoyée seule selon le pays de l'élève (moins de texte envoyé à l'IA, et plus juste). Sources officielles intégrées : grilles du BAC sénégalais en français et en anglais, coefficients du BFEM, réforme du CFEE 2026 (concours d'entrée en 6e supprimé), barème officiel du français au BEPC burkinabè, CEPE ivoirien |
