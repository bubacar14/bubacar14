# Révizo : plan et tableau de bord

Statuts : ✅ fait · 🔄 en cours · ⬜ à faire · ❓ décision à prendre

## Décisions à prendre ❓

| Sujet | Options | Recommandation |
|---|---|---|
| Nom de l'appli | Garder « Révizo » ou en choisir un autre | Vérifier que le nom et le domaine sont libres dans les 8 pays avant de dépenser en marque |
| Lumi (mascotte, ex-Sanko) | Nom choisi : Lumi. Reste à valider le dessin et l'histoire | Faire relire l'histoire Sankofa par quelqu'un de culture akan, puis faire dessiner les poses par un illustrateur |
| Logo | Piste A (retenue), B (le « o » en Sanko) ou C (mot seul) | A |
| Modèle d'IA | **Mesuré le 27 octobre 2026** sur 8 pages du BAC 2026 : Haiku 5.5 environ 7 FCFA par exercice, Sonnet 5.5 environ 90, Opus 5.5 environ 190 (lecture + correction, 1 $ compté 600 FCFA) | Haiku 5.5 : 8 pages sur 8 justes après correction de la limite de longueur, et seul rentable avec des crédits à 33-50 FCFA. Sonnet s'est trompé en probabilités. À confirmer sur de vraies photos d'élèves (cahiers, écriture à la main) |
| Prix des crédits | En ligne : 200 FCFA les 3, 500 FCFA les 10, 2 000 FCFA les 50 | Avec Haiku (environ 7 FCFA l'exercice, mesuré), chaque crédit rapporte environ 25 à 60 FCFA avant frais DexPay (non vérifiés). Proposition en attente : 500 / 1 000 / 2 000 FCFA pour 10 / 25 / 60 crédits, sans pack à 200 FCFA |
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
- 🔄 Comparer les modèles : fait sur 8 pages de sujets du BAC 2026 (Haiku, Sonnet, Opus). Reste à refaire sur de vraies photos d'élèves
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
- ✅ Office du Bac (officedubac.sn) : corrigés officiels 2026 (maths, PC, SVT, anglais), canevas de philo, grilles d'histoire-géo et programmes officiels de Terminale ajoutés aux guides. Testé avec un vrai exercice de probabilités (Sénégal, Terminale S2)
- ⬜ Lire les autres corrigés officiels 2026 : maths S1, PC S1 et L2, SVT S1 et L2, français L, séries techniques (STEG, STIDD)
- ⬜ Contenu des programmes du primaire (on a les examens CFEE et CEPE, pas les programmes détaillés)
- ⬜ Vérifier les calculs de maths automatiquement (SymPy) et afficher un badge « Calcul vérifié »
- ⬜ Enregistrer côté serveur les explications signalées comme fausses, pour corriger les guides

## Phase 3 : prêt pour de vrais élèves ⬜

- 🔄 Vrais comptes : crédits sur Supabase par appareil (fait le 27 octobre 2026). Reste : numéro de téléphone pour retrouver ses crédits sur un autre téléphone, sauvegarde de la progression
- 🔄 Vrai paiement mobile money par **DexPay** : en ligne en **mode réel** depuis le 27 octobre 2026, directement dans l'appli (opérateur + numéro, sans la page DexPay). Opérateurs réels : Sénégal (Wave, Orange Money, Mixx by Yas), Côte d'Ivoire (Orange Money, MTN), Guinée (Orange Money). Reste : un vrai paiement de 200 FCFA par le fondateur (Orange Money et Wave), remplacer le nom « Capture Vision » par « Révizo » dans DexPay, CGU et accord parental
- 🔄 Hébergement en ligne : **Vercel** (projet revizo, https://revizo-three.vercel.app, déployé le 27 octobre 2026). Crédits protégés par Supabase, domaine **https://revizo.click** en service, IA active en ligne (Haiku 5.5)
- ⬜ Banque de 1 500 questions validées par des profs, par pays et par examen
- ⬜ Mode hors ligne : file d'attente des photos quand le réseau manque
- ✅ Mesures d'usage et tableau de bord admin (revizo.click/admin), le 28 octobre 2026 : visiteurs, nouveaux élèves, exercices, revenus, coût de l'IA estimé, parcours de l'arrivée au paiement, pays, classes, résultats par campagne pub. Reste : rétention à J1, J7, J30
- ⬜ Mentions légales, CGU, données personnelles (CDP au Sénégal, ARTCI en Côte d'Ivoire), accord parental pour les mineurs
- ✅ Société enregistrée (NINEA, RCCM), d'après le fondateur le 27 octobre 2026

## Phase 4 : test terrain ⬜

- ⬜ 50 à 500 élèves dans 3 à 5 lycées et 2 cours de renforcement
- ⬜ Objectifs : au moins 35 % des élèves encore actifs à J7, et au moins 4 % qui paient
- ⬜ 5 à 8 entretiens d'élèves sur l'écran « Énoncé lu », le mode « Essaie d'abord » et le paiement

## Phase 5 : lancement et croissance ⬜

- ⬜ Faire vivre Lumi sur TikTok, Instagram et WhatsApp (vidéos, mèmes, stickers)
- ✅ Pub vidéo 20 s en 9:16 : v4 avec la voix « Léo », faite le 28 octobre 2026 (~/Documents/motion-studio, projet revizo-pub, exports RevizoPub-9x16-v4-leo.mp4 et -whatsapp.mp4)
- ⬜ 10 premiers scripts de vidéos TikTok avec Lumi
- 🔄 Première pub Meta publiée le 28 octobre 2026 : « Révizo test 3 jours - Sénégal », objectif Trafic, 18-24 ans au Sénégal, 5 $ par jour jusqu'au 31/10 à 2 h (Dakar), environ 15 $ au total (environ 9 000 FCFA, estimation), vidéo de Léo (v4) avec « 10 exercices offerts ». Résultats dans revizo.click/admin, onglet Campagnes pub (Facebook · test3j)
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
| 27 octobre 2026 | L'Office du Bac devient la source de référence pour le BAC sénégalais : corrigés et grilles officiels 2026, programmes de Terminale. Nouveauté repérée : en maths, un exercice « situation » sans questions guidées (1,5 traduction + 1,5 calcul + 1 interprétation). Deux erreurs de frappe relevées dans les corrigés officiels et signalées dans les guides |
| 27 octobre 2026 | Nom de domaine **revizo.click** acheté. Il servira d'adresse publique (liens de duel, demande de paiement à un parent, retours et notifications du paiement) |
| 27 octobre 2026 | Test des 3 modèles sur 8 pages du BAC 2026 (SVT, français, HG, maths, philo). SVT, français, HG, philo : les 3 justes. Maths probabilités : Opus et Haiku justes, Sonnet faux (parties traitées comme indépendantes). Coût mesuré par exercice : Haiku environ 7 FCFA, Sonnet 90, Opus 190. La correction passe en flux avec une limite de 32 000 tokens (Haiku coupait sur les longs sujets). Le serveur note désormais les tokens de chaque appel |
| 27 octobre 2026 | **Haiku 5.5 devient le modèle par défaut** de l'appli (lecture et correction). Opus reste possible avec REVIZO_MODEL |
| 27 octobre 2026 | Haiku vérifié sur une photo d'exercice écrit à la main (relue sans faute, correction juste) et sur deux exercices déjà corrigés par Opus (mêmes réponses). Coût mesuré : 2,5 à 7 FCFA par exercice selon le cache. Ajouts : le paramètre de bascule n'est plus envoyé à Haiku (il n'en a pas), et une règle oblige la réponse finale à suivre chaque verbe de la consigne (Haiku oubliait de nommer les procédés quand la consigne disait « que vous préciserez ») |
| 27 octobre 2026 | Vidéos YouTube : archive d'un autre outil vérifiée (190 vidéos réelles, pays confirmé pour 189). `youtube/catalogue.json` donne pour chacune le vrai titre, la chaîne, le pays et sa preuve. 50 sont transcrites (dont la version anglaise originale d'un corrigé d'anglais), 1 n'a pas de sous-titres, 139 restent à récupérer : YouTube bloque l'adresse IP par moments, il faut relancer plus tard |
| 27 octobre 2026 | Profil refait : avatar avec l'initiale du prénom, classe et pays sous le nom, 4 statistiques en couleur (série, réussite, exercices expliqués, notions maîtrisées), carte des crédits avec « Recharger », semaine de révision. Réglages rangés en lignes comme sur un téléphone : pays et classe s'ouvrent au toucher, affichage Clair/Sombre/Auto, interrupteur pour les sons, histoire de Sanko repliée |
| 27 octobre 2026 | Sanko redessiné, même personnage (oiseau Sankofa jaune, huppe en goutte d'encre) en plus moderne : corps en œuf avec ombrage, huppe à deux gouttes, grands yeux à reflets, bec arrondi, sourcils et ailes selon l'humeur, « zz » quand il dort. La tête du logo dans l'appli suit le nouveau dessin. Reste à mettre à jour les fichiers du logo dans marque/ |
| 27 octobre 2026 | La mascotte s'appelle désormais **Lumi** (de « lumière » : il éclaire ce que l'élève n'a pas compris). Même dessin ; son histoire garde l'inspiration Sankofa. Vérifier que « Lumi » n'a pas de sens gênant dans les langues locales |
| 27 octobre 2026 | Bienvenue en 3 étapes, dans cet ordre : classe, pays, prénom. Le prénom devient obligatoire (2 lettres minimum) |
| 27 octobre 2026 | Hébergement sur Vercel (au lieu de Render ou Railway) et comptes sur Supabase. Code de l'IA séparé dans ia.js, deux fonctions Vercel (api/lire, api/resoudre, jusqu'à 300 s). Seuls les fichiers de l'appli sont publics. Premier déploiement en ligne, sans clé de l'IA pour l'instant |
| 27 octobre 2026 | **Premier contact** construit : pays deviné (« Tu es au Sénégal ? »), un seul écran centré sur la photo, 5 exercices d'essai corrigés d'avance par niveau (gratuits, sans IA), lecture animée de la photo, énoncé écrit lettre par lettre, « Bien vu [prénom] » au premier bon choix, écran « Exercice compris » avec confettis, petit mot du prof et rendez-vous du lendemain (l'exercice revient en révision), proposition d'installer l'appli. Testé au format téléphone, en clair et en sombre, avec l'essai et avec une vraie photo |
| 27 octobre 2026 | Crédits gardés sur le serveur (Supabase, projet revizo à Paris) : un élève = un appareil, 1 exercice offert par jour compté par le serveur, crédit retiré avant la correction et rendu si elle échoue, signalement remboursé une seule fois, 300 nouveaux comptes au plus par réseau et par jour (10 au départ, trop bas). Paiement simulé désactivé en ligne (« bientôt ») tant que le vrai mobile money n'est pas branché |
| 27 octobre 2026 | revizo.click (Namecheap) et www.revizo.click ajoutés au projet Vercel. Reste à changer les réglages DNS chez Namecheap |
| 27 octobre 2026 | **https://revizo.click** en service (et www.revizo.click), avec HTTPS |
| 27 octobre 2026 | Paiement par DexPay (le fondateur y a un compte marchand, société enregistrée). Les crédits ne sont ajoutés qu'après confirmation de DexPay, une seule fois par paiement, au montant fixé par le serveur |
| 27 octobre 2026 | DexPay testé en mode test sur revizo.click : montants en FCFA (500 = 500 FCFA), clés de test sur api-sandbox.dexpay.africa (choisi automatiquement selon la clé). Après une annulation, DexPay laisse le paiement ouvert 24 h : l'appli dit « annulé » tout de suite, et créditerait quand même si l'élève payait ensuite |
| 27 octobre 2026 | Réglages Vercel simplifiés : DexPay seulement sur le vrai site (Production), Supabase sur le vrai site et sur l'ordinateur, plus rien en Preview. Limite de nouveaux comptes passée de 10 à 300 par réseau et par jour (en 4G et dans un lycée, beaucoup d'élèves partagent la même adresse) |
| 27 octobre 2026 | **L'IA marche en ligne** sur revizo.click (clé ajoutée par le fondateur, Production seulement). Test réel : lecture d'une photo en 5 s, correction en 17 s, crédit retiré. Défaut repéré : la lecture a classé une page de SVT en physique-chimie (la matière se corrige sur l'écran « Vérifie l'énoncé ») |
| 27 octobre 2026 | Installation de l'appli sur le téléphone (PWA, sans Play Store) : vraies icônes PNG avec la tête de Lumi, manifeste à jour (fond blanc, bleu Bic, raccourci « Photo »), étapes illustrées sur iPhone et dans les autres navigateurs, ligne « Installer l'appli » dans le Profil, lien à partager revizo.click/?installer. Chrome juge l'appli installable |
| 27 octobre 2026 | Paiement dans Révizo, sans passer par la page DexPay (intégration directe) : choix de l'opérateur avec son logo, numéro de téléphone, demande sur le téléphone (Orange Money, MTN, Mixx) ou bouton « Ouvrir Wave », attente de la confirmation puis reçu. Testé en mode test de bout en bout. Opérateurs actifs en réel : Sénégal (Wave, Orange Money, Mixx by Yas), Côte d'Ivoire (Orange Money, MTN), Guinée (Orange Money) ; ailleurs, « bientôt » |
| 28 octobre 2026 | Pub vidéo : voix off « Léo » (Higgsfield, moteur ElevenLabs), « Elodie » refusée. Fin : « Teste-le gratuitement. Sur revizo.click ». Pas de « 1er exercice offert », pas d'accent sur les maths (les pages défilent par matière). Promesses à l'écran à garder vraies dans l'appli : « Sans inscription · Sans Play Store », « BFEM · BEPC · BAC » |
| 28 octobre 2026 | Espace admin sur revizo.click/admin (mot de passe dans Vercel et dans ~/.revizo/admin-motdepasse.txt) et mesures anonymes dans l'appli, prêtes avant la pub Meta. Liens de pub : `?utm_source=facebook|instagram&utm_medium=pub&utm_campaign=test3j`. Les 106 appareils et les commandes de test d'avant le lancement sont marqués « test » et exclus des chiffres |
| 28 octobre 2026 | **10 crédits offerts** à chaque élève (valeur de vente 500 FCFA ; coût réel d'IA environ 70 FCFA au maximum par élève, estimation à 7 FCFA l'exercice). Limité à 30 nouveaux appareils par réseau et par jour contre la triche ; réglable dans l'admin. Admin enrichi : en ce moment, retour J1/J7, heures et jours d'utilisation, matières, quiz, dépense et rentabilité par campagne, réglages, exports Excel |
| 28 octobre 2026 | Pub Meta publiée avec l'accord écrit du fondateur (en vérification chez Meta) : Sénégal, 18-24 ans (Meta refuse ce type de pub aux moins de 18 ans), 5 $ par jour pendant 3 jours, lien revizo.click/?utm_source=facebook&utm_medium=pub&utm_campaign=test3j |
| 29 octobre 2026 | Analyse après 1 jour de pub : 2,47 $, 6 045 personnes touchées, 89 visites selon Meta, 113 élèves venus de Facebook dont 21 actifs (19 %). Point faible : 71 % des arrivants quittent l'écran de bienvenue (classe, pays, prénom) avant la fin. Proposition en attente : une seule étape (classe, pays deviné), prénom après le premier exercice, mesure de chaque étape |
| 29 octobre 2026 | **Microsoft Clarity** (projet z53aabeetb) pour revoir les visites : chargé seulement sur revizo.click, champs, images et prénom masqués. Onglet « Comportement » dans l'admin (chiffres des 3 derniers jours via l'API Data Export, jeton `CLARITY_TOKEN` dans Vercel ; 10 demandes par jour au plus, réponse gardée 3 h). À mentionner dans les CGU |
| 29 octobre 2026 | Pub Meta élargie à la demande du fondateur : **18-55 ans** (des élèves utilisent le téléphone d'un parent ; Meta refuse toujours les moins de 18 ans) et **8 pays** (SN, CI, ML, BF, GN, BJ, TG, NE), soit environ 27 à 31 millions de personnes. Budget inchangé : 5 $ par jour jusqu'au 30/10 à 19 h (heure du Pacifique). Le nom de l'ensemble reste « Sénégal 18-24 ans » |
| 29 octobre 2026 | Test A/B de l'accueil **en ligne** (feu vert du fondateur, pendant la pub ; avec Clarity) : B = classe seule, deux choix (photo ou exemple gratuit, sans ouvrir la caméra d'office), prénom facultatif après la première correction. 4 indicateurs par version dans l'admin. Ne juger qu'à partir d'environ 100 élèves par version |
