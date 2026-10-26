# Révizo

Prototype d'une plateforme de révision « façon Higgsfield » pour les élèves d'Afrique de l'Ouest francophone : Sénégal, Côte d'Ivoire, Mali, Burkina Faso, Guinée, Bénin, Togo et Niger.

C'est une appli web installable (PWA) : on l'ouvre depuis un lien, on l'ajoute à l'écran d'accueil, et elle marche aussi sans connexion.

## Fonction phare : Mon exercice

Sur l'accueil, le grand bouton vert **📸 Mon exercice** est la fonction principale. L'élève envoie n'importe quel exercice, en photo ou en texte, dans n'importe quelle matière. Révizo lui renvoie :

- 🎯 ce qu'on lui demande ;
- 🧠 la méthode à retenir pour tous les exercices de ce type ;
- ✍️ la résolution étape par étape, avec le pourquoi de chaque étape ;
- ✅ la réponse finale ;
- ⚠️ les pièges à éviter ;
- 🔁 un exercice du même type pour s'entraîner, avec sa solution cachée.

Un exercice coûte 10 crédits. Si la photo est illisible ou si le service échoue, les crédits sont rendus. Le serveur (`server.js`) envoie l'exercice à Claude, réduit la photo avant l'envoi et impose un format de réponse fixe.

## Ce qui fonctionne

- **Choix du pays** : le nom de l'examen (BFEM, BEPC, DEF), la devise (FCFA ou GNF), les moyens de paiement et les villes s'adaptent.
- **Galerie de presets** et **studios** (BAC S, BAC L, Brevet), comme sur Higgsfield.
- **Quiz Express** : 5 questions avec correction expliquée.
- **Mes erreurs** : répétition espacée. Une question ratée revient le lendemain, une question réussie revient de plus en plus tard (1, 3, 7, puis 15 jours).
- **Duel** : un lien à partager. L'ami joue les mêmes questions et voit qui gagne.
- **Partage de score** : une image prête pour TikTok, Instagram ou les Statuts WhatsApp.
- **Crédits** : 10 offerts par jour, 5 par quiz, et des packs de recharge.
- **Classement** par pays et **profil** (série de jours, taux de réussite, notions maîtrisées).

## Ce qui est simulé

- **Paiement** : les packs ajoutent les crédits sans paiement réel. À brancher sur un agrégateur mobile money (PayDunya, CinetPay, FedaPay…).
- **Classement** : des joueurs de démonstration. Il faudra un serveur (par exemple Supabase) pour un vrai classement.
- **Presets « Bientôt »** : Où j'ai faux ?, Copie Rouge, Fiches du cahier. Ils demandent des API d'IA (vision, texte) côté serveur.
- **Banque de questions** : 30 questions de démonstration dans `questions.js`, à faire valider et compléter par des profs.

## Lancer en local

Il faut Node.js 18 ou plus récent et une clé API Anthropic (console.anthropic.com).

```bash
npm install
ANTHROPIC_API_KEY=ta_cle npm start
```

Puis ouvrir http://localhost:3000.

Le modèle par défaut est `claude-opus-5-5`. Pour un modèle moins cher, il suffit de changer la variable `REVIZO_MODEL`, par exemple `REVIZO_MODEL=claude-haiku-5-5`.

## Mettre en ligne

« Mon exercice » a besoin d'un serveur Node : GitHub Pages ne suffit plus. Render, Railway ou Fly.io conviennent. Il faut y définir la variable `ANTHROPIC_API_KEY`, et ne jamais mettre la clé dans le code.
