# Révizo : mémoire du projet

Révizo est une appli web (PWA) de renforcement scolaire pour les élèves d'Afrique de l'Ouest francophone : Sénégal, Côte d'Ivoire, Mali, Burkina Faso, Guinée, Bénin, Togo et Niger, du primaire au BAC (BFEM, BEPC, DEF). Le fondateur est bubacar14. Il n'est pas développeur : explique simplement, en français, et donne les commandes exactes.

Le plan, les tâches et les décisions sont dans `PLAN.md`. Lis-le au début de chaque session et tiens-le à jour.

## Le produit

- **Fonction phare, « Mon exercice » :**
  1. l'élève photographie (ou écrit) n'importe quel exercice ;
  2. l'IA recopie l'énoncé (`/api/lire`, gratuit) ;
  3. l'élève confirme l'énoncé, ce qui coûte 1 crédit ;
  4. l'IA explique la méthode pas à pas (`/api/resoudre`).
- **La correction se dévoile progressivement :** question de départ, indices (« Je bloque »), méthode, étapes une à une. On ne donne pas la réponse d'emblée : une étude sur environ 1 000 lycéens montre que les réponses directes font baisser les notes à l'examen.
- **Premier lancement :** un écran de bienvenue en 3 étapes demande d'abord la classe, puis le pays, puis le prénom (obligatoire, 2 lettres minimum). La classe choisit le niveau des quiz, le pays sert à l'IA pour corriger comme l'examen du pays, le prénom sert à l'accueil et aux duels. Rien n'est redemandé ensuite ; la matière se choisit par exercice. Ensuite vient le **premier contact** (`renderPremierContact`, `state.decouverte`) : un seul écran avec l'appareil photo, ou un exercice d'essai déjà corrigé (`essais.js`) ; Lumi lit le cahier, l'énoncé s'écrit lettre par lettre, l'élève trouve lui-même la première étape, puis « Exercice compris » et le rendez-vous du lendemain (l'exercice revient en révision).
- **Gratuit :** quiz, révision des erreurs en répétition espacée, duels, série de jours (avec jours de repos), et 1 exercice offert par jour.
- **Crédits :** 1 crédit = 1 exercice. Pas d'abonnement ni de prélèvement automatique. Le paiement mobile money est encore **simulé**.
- **Lumi, la mascotte** (de « lumière », ancien nom Sanko changé le 27 octobre 2026 ; le code garde les noms `sanko.js`, `sanko()`, `.sanko`) : un oiseau jaune soleil en forme d'œuf, avec une huppe en deux gouttes d'encre bleue. Dessin du 27 octobre 2026 : volume par ombrage, grands yeux à reflets, sourcils et ailes qui changent selon l'humeur (ailes levées pour la joie, une aile qui salue pour encourager). Il vient de Sankofa, l'oiseau adinkra : « il n'est jamais interdit de revenir chercher ce que tu as oublié ». Il « ramène » les erreurs à l'élève et a six humeurs : content, joie, réfléchit, encourage, dort, fier.

## Le code

| Fichier | Rôle |
|---|---|
| `index.html`, `styles.css`, `app.js` | L'interface, en JavaScript sans framework. Tout l'état est dans `localStorage` (clé `revizo:v2`) |
| `sanko.js` | La mascotte et le logo (`LOGO_REVIZO`) |
| `questions.js` | La banque de questions de quiz, à faire valider par des profs |
| `ia.js` | Tout ce qui parle à l'IA : lecture de la photo, correction, guides envoyés (SDK `@anthropic-ai/sdk`) |
| `server.js` | Serveur local (`npm run dev`) : sert l'appli et `/api/lire`, `/api/resoudre` en appelant `ia.js` |
| `routes.js` | Les routes de l'API (lire, resoudre, compte, signaler, achat-demo), communes au serveur local et à Vercel |
| `comptes.js` | Crédits gardés dans Supabase : un élève = un appareil, reconnu par la clé aléatoire `state.cle` (en-tête `X-Revizo-Cle`, seule son empreinte est stockée) |
| `supabase/migrations/` | Tables `eleves` et `mouvements`, fonctions `revizo_eleve`, `revizo_debiter`, `revizo_rendre`, `revizo_crediter` (accessibles seulement avec la clé secrète) |
| `paiement.js` | Paiement mobile money par DexPay : session de paiement, état, signature des webhooks (HMAC-SHA256 avec la clé secrète). Pays : SN, CI, ML, BF, GN |
| `api/*.js` | Une fonction Vercel par route, qui appelle `routes.js` |
| `fichiers-publics.js`, `build.mjs`, `vercel.json`, `.vercelignore` | Seuls les fichiers de `fichiers-publics.js` sont servis ; `build.mjs` les copie dans `public/` pour Vercel. Les guides, notes et recherches restent privés. Un nouveau fichier chargé par `index.html` doit être ajouté à `fichiers-publics.js` |
| `guides/` | Guides de correction par matière, envoyés à l'IA selon la matière. Maths et PC sont enrichis de vidéos YouTube ; les guides ont aussi des sections tirées de sources officielles (Office du Bac, corrigés de profs, annales). Le reste est encore à vérifier |
| `guides/pays/` | Une fiche par pays (SN, CI, ML, BF, GN, BJ, TG, NE) : examens, épreuves, barèmes, vocabulaire. Seule la fiche du pays de l'élève est envoyée à l'IA (`server.js`) |
| `recherche/` | Études : concurrents, design, acquisition, pays |
| `youtube/` | Transcriptions de vidéos de profs, toutes matières. `catalogue.json` liste les vidéos vérifiées : vrai titre, chaîne, pays et preuve du pays, statut. Ce sont des sous-titres automatiques non corrigés |
| `marque/` | Les fichiers du logo et son guide |
| `tools/youtube_transcripts.py` | Récupère les transcriptions. À lancer sur un ordinateur personnel : YouTube bloque les serveurs cloud |

- **Lancer l'appli :** `npm install`, puis `cp .env.example .env`, puis `npm run dev`, et ouvrir http://localhost:3000.
- **La clé** `ANTHROPIC_API_KEY` va dans `.env`, jamais dans le code ni dans une conversation.
- **Le modèle** est `claude-haiku-5-5` par défaut (choisi le 27 octobre 2026 après un test sur 8 pages du BAC 2026 : aussi juste qu'Opus, environ 7 FCFA par exercice contre 190). `REVIZO_MODEL=claude-opus-5-5` reste possible. Haiku n'a pas de bascule automatique si l'IA refuse une demande. **Garder chaque appel sous 100 000 tokens** : au-delà, Haiku coûte 5 fois plus cher (une correction de maths en envoie déjà environ 68 000).
- **La branche de travail** est `claude/phone-control-l2egop`.
- **Supabase :** projet `revizo` (réf. `ynwiifbtykaotbjlasmi`, région Paris), organisation de bubacar14. Réglages Vercel : `SUPABASE_URL` et `SUPABASE_SECRET_KEY` (Production et Development), `DEXPAY_PUBLIC_KEY` et `DEXPAY_SECRET_KEY` (Production seulement) ; rien en Preview ; `vercel env pull .env.local --environment=development` les copie pour `npm run dev`. Le mot de passe de la base est dans `~/.revizo/supabase-motdepasse.txt`, sur le Mac du fondateur.
- **Crédits :** le serveur retire 1 crédit avant la correction et le rend si elle échoue ; « Signaler une erreur » le rend une seule fois. **Paiement :** `/api/payer` crée la commande (montant fixé par le serveur) et la session DexPay ; les crédits ne s'ajoutent qu'après confirmation par DexPay (webhook signé `/api/dexpay-webhook`, ou état relu chez DexPay au retour de l'élève), une seule fois par référence. Actif seulement si `DEXPAY_PUBLIC_KEY` et `DEXPAY_SECRET_KEY` sont dans Vercel ; sinon l'appli annonce « bientôt » en ligne, et le paiement simulé ne marche qu'en local.
- **En ligne :** projet Vercel `revizo` (compte bubacar14, équipe bouba-devs-projects), adresse https://revizo-three.vercel.app. Domaine **revizo.click** (acheté chez Namecheap) et www.revizo.click en service depuis le 27 octobre 2026 (réglages DNS chez Namecheap : 2 lignes A vers 216.198.79.1 et 64.29.17.1, CNAME www vers Vercel ; HTTPS Let's Encrypt géré par Vercel). L'adresse publique de l'appli est **https://revizo.click**. Déployer : `vercel deploy` (aperçu) ou `vercel deploy --prod`. La clé `ANTHROPIC_API_KEY` se met dans les réglages Vercel, jamais dans le code.

## Règles de design (charte Révizo)

- **Clair et coloré :** fond blanc, bleu vif, soleil, vert, violet et orange (façon Duolingo). L'élève n'a pas aimé l'ancien design sombre.
- **Deux thèmes :** « Cahier » (clair, **par défaut**) et « Ardoise » (sombre, au choix dans le profil). Les couleurs sont des variables CSS dans `styles.css` : `--papier`, `--encre`, `--bic`, `--soleil`, `--juste`, `--violet`, `--orange`, `--rouge`, chacune avec `-doux` (fond) et `-fonce` (relief).
- **Polices :**
  - Bricolage Grotesque pour les titres ;
  - Atkinson Hyperlegible pour le texte ;
  - JetBrains Mono pour les calculs ;
  - Caveat pour les annotations du prof.
- **Pas d'emoji dans l'interface :** on utilise les icônes au trait de `ICONES` dans `app.js`.
- **Couleurs à sens unique :**
  - le rouge sert seulement aux erreurs et aux pièges, jamais aux boutons ni au paiement ;
  - « Juste » et « À revoir » sont toujours accompagnés d'un mot et d'une icône.
- **Boutons en relief** qui s'enfoncent, panneau de réponse qui glisse d'en bas, sons (désactivables), confettis à l'objectif atteint.
- **Ton :** on tutoie l'élève, les phrases sont courtes, et l'erreur n'est jamais punie.
- **La charte complète** est dans Claude Design : https://claude.ai/artifact/JcZrPiXS1hqtb7tbyVPiSF

## Façon de travailler

- Teste au format téléphone (390 px), en clair et en sombre, avant de pousser.
- Les chiffres de marché, de prix et de coûts sont des estimations : dis toujours ce qui est vérifié et ce qui ne l'est pas.
- Mets à jour `PLAN.md` à chaque tâche terminée ou décision prise.
