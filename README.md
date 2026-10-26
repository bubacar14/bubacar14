# Révizo

Prototype d'une plateforme de révision « façon Higgsfield » pour les élèves d'Afrique de l'Ouest francophone : Sénégal, Côte d'Ivoire, Mali, Burkina Faso, Guinée, Bénin, Togo et Niger.

C'est une appli web installable (PWA) : on l'ouvre depuis un lien, on l'ajoute à l'écran d'accueil, et elle marche aussi sans connexion.

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

```bash
python3 -m http.server 8000
```

Puis ouvrir http://localhost:8000.

## Mettre en ligne gratuitement

Il n'y a rien à compiler : il suffit d'activer **GitHub Pages** sur ce dépôt (Settings → Pages → branche et dossier racine). Le site sera alors accessible depuis n'importe quel téléphone.
