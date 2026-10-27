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
- **Premier lancement :** un écran de bienvenue en 2 étapes demande le pays, puis la classe (prénom facultatif). La classe n'est plus redemandée ensuite ; la matière se choisit par exercice. Le pays sert à l'IA pour corriger comme l'examen du pays, la classe choisit le niveau des quiz (brevet ou BAC).
- **Gratuit :** quiz, révision des erreurs en répétition espacée, duels, série de jours (avec jours de repos), et 1 exercice offert par jour.
- **Crédits :** 1 crédit = 1 exercice. Pas d'abonnement ni de prélèvement automatique. Le paiement mobile money est encore **simulé**.
- **Sanko, la mascotte** (`sanko.js`) : un oiseau jaune soleil avec une huppe en goutte d'encre bleue. Il vient de Sankofa, l'oiseau adinkra : « il n'est jamais interdit de revenir chercher ce que tu as oublié ». Il « ramène » les erreurs à l'élève et a six humeurs : content, joie, réfléchit, encourage, dort, fier.

## Le code

| Fichier | Rôle |
|---|---|
| `index.html`, `styles.css`, `app.js` | L'interface, en JavaScript sans framework. Tout l'état est dans `localStorage` (clé `revizo:v2`) |
| `sanko.js` | La mascotte et le logo (`LOGO_REVIZO`) |
| `questions.js` | La banque de questions de quiz, à faire valider par des profs |
| `server.js` | Serveur Node : fichiers statiques, `/api/lire` et `/api/resoudre` (SDK `@anthropic-ai/sdk`) |
| `guides/` | Guides de correction par matière, envoyés à l'IA selon la matière. Maths et PC sont enrichis de vidéos YouTube ; les guides ont aussi des sections tirées de sources officielles (Office du Bac, corrigés de profs, annales). Le reste est encore à vérifier |
| `guides/pays/` | Une fiche par pays (SN, CI, ML, BF, GN, BJ, TG, NE) : examens, épreuves, barèmes, vocabulaire. Seule la fiche du pays de l'élève est envoyée à l'IA (`server.js`) |
| `recherche/` | Études : concurrents, design, acquisition, pays |
| `youtube/` | Transcriptions de vidéos de profs, toutes matières. `catalogue.json` liste les vidéos vérifiées : vrai titre, chaîne, pays et preuve du pays, statut. Ce sont des sous-titres automatiques non corrigés |
| `marque/` | Les fichiers du logo et son guide |
| `tools/youtube_transcripts.py` | Récupère les transcriptions. À lancer sur un ordinateur personnel : YouTube bloque les serveurs cloud |

- **Lancer l'appli :** `npm install`, puis `cp .env.example .env`, puis `npm run dev`, et ouvrir http://localhost:3000.
- **La clé** `ANTHROPIC_API_KEY` va dans `.env`, jamais dans le code ni dans une conversation.
- **Le modèle** est `claude-opus-5-5` par défaut. `REVIZO_MODEL=claude-haiku-5-5` coûte beaucoup moins cher : à comparer sur de vrais exercices.
- **La branche de travail** est `claude/phone-control-l2egop`.

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
