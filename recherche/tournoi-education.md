# Tournoi : wrappers IA pour aider les élèves à réviser

Résultat d'un tournoi d'agents : 10 agents proposent chacun 2 idées, 3 juges les notent et les attaquent, puis un arbitre rend le verdict. Les chiffres sont des estimations des agents, non vérifiées.

## Verdict de l'arbitre

# Verdict final : tournoi « Higgsfield de la révision » (Afrique de l'Ouest)

## 1. Top 5

| Rang | Nom | Angle | Note | Pitch en une ligne |
|---|---|---|---|---|
| 1 | **Wóoy Quiz** | Révision vocale sur WhatsApp | 6.8 | Un coach qui t'interroge chaque jour en vocal, corrige en 30 s et refait revenir ce que tu as raté. |
| 2 | **ErreurZéro** | Maths et PC (séries S) | 6.7 | Photo de ta copie : il trouve la ligne fausse, nomme l'erreur et t'envoie 3 exercices jumeaux. |
| 3 | **Copie Rouge** | Dissertation et commentaire | 6.7 | Ta dissertation manuscrite annotée en rouge, une fourchette de note et un audio de 2 min sur tes 3 erreurs. |
| 4 | **Kàddu Bac** | Podcast de révision | 6.2 | Ta page de cahier devient en 30 s un épisode radio à deux voix d'environ 1 Mo, à écouter hors ligne. |
| 5 | **Kayit** (ex aequo avec Studio Répét') | Flashcards depuis le cahier | 6.0 | Cahier photographié, fiche BAC et 5 cartes par jour en répétition espacée sur WhatsApp. |

Kayit passe devant Studio Répét' : l'élève l'utilise directement, alors que Studio Répét' laisse de côté l'élève qui n'a pas de répétiteur.

## 2. Grand gagnant : Wóoy Quiz

**Pourquoi il gagne.** C'est le seul projet qui réunit à la fois un usage quotidien, une pédagogie efficace (rappel actif et répétition espacée), un coût unitaire très bas (5 à 10 FCFA par échange) et une viralité intégrée au produit (les duels dans les groupes de classe). Il ne cherche pas à résoudre un problème de recherche comme la lecture d'un brouillon de maths : on peut le livrer en 30 jours.

**Modèles emballés**
- Reconnaissance vocale : Whisper large-v3 ou Gemini audio, avec Meta MMS ou un modèle wolof en repli.
- Notation : Claude Haiku ou Gemini Flash. Le modèle compare la réponse à une grille fermée de points-clés et ne juge jamais librement.
- Voix : TTS français à voix ouest-africaine, avec deux personnages (« Tonton Prof » et « Grande sœur major »).
- Moteur maison de répétition espacée (FSRS) et cache des vocaux de questions et de corrections types. C'est le seul vrai actif propriétaire.

**5 presets**
1. **« 5 questions dans le car »** : 5 vocaux de 20 s. L'élève répond en vocal **ou en texte, ou avec des boutons QCM** (mode discret). Les notions ratées reviennent à J+2 puis à J+6.
2. **« Duel de classe »** : les mêmes 5 questions envoyées à deux camarades, puis le classement et le vocal du gagnant publiés dans le groupe.
3. **« Veille de compo »** : l'élève choisit les chapitres de sa composition trimestrielle et reçoit 15 questions ciblées sur ses points faibles.
4. **« Jury 2nd groupe »** : un oral de 10 minutes avec deux relances, une fourchette de note et les 3 points à corriger.
5. **« Récap parent du dimanche »** : un vocal envoyé au parent (« Awa : 42 questions, 78 % de réussite, à revoir : la méiose »). C'est le parent qui paie.

**Prix (Wave ou Orange Money, par lien de paiement dans WhatsApp)**
- Gratuit : 5 questions par jour, pour installer l'habitude et le streak.
- 300 FCFA la semaine ou 1 000 FCFA le mois, payés par l'élève ou le parent.
- Pass « Compo » à 1 500 FCFA par trimestre et Pass « Examen » à 4 000 FCFA (mars à juin). Ce sont eux qui lissent la saisonnalité, pas le 2nd groupe.
- Pass « Oral 2nd groupe » à 2 000 FCFA : un pic d'acquisition, pas le modèle économique.
- B2B : 500 FCFA par élève et par mois pour les écoles privées et les cours de renforcement, avec un tableau de bord prof.

**Stratégie virale**
- Les duels dans les groupes WhatsApp de classe : chacun expose le bot à 50 à 200 élèves.
- Un classement inter-lycées publié chaque semaine, que les profs relaient.
- Sur TikTok, le format « le jury IA m'a piégé » et les vocaux de corrections cultes.
- Une campagne planifiée le soir des résultats du BAC sur les pages qui publient les résultats.
- Le répétiteur qui utilise le bot comme devoir oral devient prescripteur, sans être remplacé.

**Plan MVP sur 30 jours**
- **J1–7** : API WhatsApp Cloud, webhook vers la chaîne STT, LLM, TTS, puis renvoi en .opus. 300 questions avec grilles (SVT, Histoire-Géo, Philo, PC, en 3e et en Terminale), validées par 2 profs.
- **J8–14** : FSRS, streak, mode texte et QCM, confirmation « tu as dit : … ? », bouton de contestation.
- **J15–21** : duels, récap parent, paiement Wave, PWA de secours.
- **J22–30** : pilote avec 500 élèves dans 5 lycées et 2 cours de renforcement. Objectifs : rétention à J7 au-dessus de 35 %, plus de 4 questions par jour et par utilisateur actif, moins de 5 % de contestations acceptées, conversion payante de 4 %.

**Réponses aux attaques des juges**
- **« Meta AI fait déjà ça. »** Meta AI attend qu'on lui parle. Wóoy pousse la question au bon moment, suit la courbe d'oubli, s'appuie sur des grilles tirées des annales sénégalaises et ajoute duels, classements et récap parent. C'est un produit de discipline, pas un chatbot.
- **« Dépendance à Meta. »** Il faut rester un service de révision structuré, pas un assistant généraliste : les règles WhatsApp Business restreignent les chatbots IA « généralistes ». Il faut aussi garder une liste propre de numéros opt-in, un numéro de secours vérifié et une PWA prête à prendre le relais.
- **« J'ai honte de parler dans le car. »** Le texte et le QCM sont proposés par défaut, et le vocal reste une option. L'oral sert surtout à la maison et au 2nd groupe.
- **« Un 0/3 injuste parce que la transcription a raté. »** On demande toujours confirmation avant de noter, on note par points-clés présents ou absents, on est indulgent sur la forme, et une contestation relue rend le point. On ne promet pas 90 % sur le franco-wolof : on mesure le taux réel.
- **« Le Pass 2nd groupe ne se vend que 4 jours par an. »** C'est vrai. Il sert à l'acquisition. Le revenu vient des compositions, du BFEM, des concours et du B2B.

## 3. Combo : « Wóoy 360 »

Le socle reste Wóoy Quiz (interrogation quotidienne, répétition espacée, duels), auquel on greffe :
- **De Kayit** : « photo du cahier vers questions ». Les questions du bot viennent des cours de **ta** classe, et les ajouts de l'IA sont signalés en couleur.
- **D'ErreurZéro** : un preset « Où j'ai faux ? » limité aux exercices de la banque d'annales, vérifiés avec SymPy. Chaque erreur détectée entre dans la file de répétition espacée.
- **De Copie Rouge** : le preset « Introduction parfaite », avec une fourchette de note et jamais une note sèche, pour couvrir la philo.
- **De Kàddu Bac** : un récap audio de 3 minutes **après** le quiz, une écoute qui récompense l'effort au lieu de le remplacer.
- **De BacBi** : la photo d'un exercice donne un corrigé **guidé**, étape par étape. L'élève doit répondre à chaque étape avant de voir la suivante.

Le tout reste sur un seul numéro WhatsApp, avec un seul abonnement à 1 000 FCFA par mois.

## 4. Les 3 pièges principaux

1. **La confiance se perd à la première erreur.** Une seule note injuste ou un seul cours faux diffusé dans un groupe de 80 élèves suffit à tuer le produit. Il faut des grilles fermées, la confirmation de la transcription, des contestations rapides et le badge « vérifié par un prof ». Ne jamais afficher une précision qu'on n'a pas.
2. **Construire chez Meta.** Prix des messages, bannissement du numéro, changement de règles sur les bots IA : il faut posséder sa base d'utilisateurs, garder la PWA en réserve dès le premier jour et rester dans la fenêtre gratuite de 24 h ouverte par l'élève.
3. **Une saisonnalité et un pouvoir d'achat faibles.** L'élève n'a pas d'argent. C'est le parent qui paie, à condition de voir le résultat (le récap du dimanche) et seulement à l'approche d'une échéance. Il faut caler les offres sur les trois compositions trimestrielles, le BFEM et les concours, et décrocher le B2B tôt pour avoir du revenu récurrent.

## Classement complet

| Note | Idée | Domaine | Pitch |
|---|---|---|---|
| 6.8 | Wóoy Quiz : le coach de révision 100 % vocal sur WhatsApp | Révision audio et mobile (écouter dans le car rapide, hors ligne, vocaux WhatsApp) | Un coach sur WhatsApp qui fait réviser l'élève à l'oral. Chaque jour, il envoie une question en vocal ; l'élève répond en vocal, en français ou avec du wolof mélangé. L'IA comprend la réponse, corrige oralement en 30 secondes et reprogramme les notions ratées en répétition espacée. Le tout sans installer d'app et avec très peu de données. |
| 6.7 | ErreurZéro – le carnet d'erreurs IA des séries S | Maths, physique-chimie et sciences (séries S) : exercices, méthodes, erreurs typiques | L'élève photographie SA copie (devoir rendu, compo ou brouillon) sur WhatsApp, et ErreurZéro trouve la ligne exacte où il s'est trompé, nomme l'erreur type ("oubli du domaine de définition", "mol confondu avec mol/L"), puis lui envoie 3 exercices jumeaux de type BAC/BFEM jusqu'à ce que l'erreur disparaisse. |
| 6.7 | Copie Rouge — le studio dissertation et commentaire qui corrige ta copie manuscrite comme un correcteur du BAC | Philosophie, français, histoire-géo, langues (séries L) : dissertation, commentaire, mémorisation | Tu photographies ta dissertation de philo ou ton commentaire de texte écrit à la main ; en 60 secondes tu reçois ta copie annotée au stylo rouge, une note sur 20 calée sur le barème de l'Office du BAC, et un audio de 2 minutes où un « prof » t'explique en français (avec un résumé en wolof si tu veux) les 3 erreurs qui te coûtent le plus de points. |
| 6.2 | Kàddu Bac : le podcast de révision qui sort de ton cahier | Révision audio et mobile (écouter dans le car rapide, hors ligne, vocaux WhatsApp) | L'élève photographie une page de son cahier ou choisit un chapitre du programme officiel. En 30 secondes, l'app produit un épisode audio de 6 à 8 minutes, joué comme une émission de radio à deux voix. L'épisode fait environ 1 Mo, s'écoute hors ligne dans le car rapide et se transfère en vocal WhatsApp. |
| 6 | Studio Répét' – la boîte à outils IA des profs de renforcement en maths/PC, dont l'élève révise via son prof | Maths, physique-chimie et sciences (séries S) : exercices, méthodes, erreurs typiques | Un studio mobile qui permet au répétiteur de maths ou de physique-chimie de corriger en 10 minutes les 40 copies de son groupe par photo, de générer des variantes d'annales au format BFEM/BAC, et d'envoyer à chaque élève et à ses parents, sur WhatsApp, son plan de révision et ses exercices ciblés, avec la voix clonée du prof. |
| 6 | Kayit (« cahier » en wolof) : du cahier photographié aux flashcards révisées sur WhatsApp | Mémorisation et méthode : flashcards, répétition espacée, fiches à partir de photos du cahier | L'élève photographie les pages de son cahier. En 30 secondes, il reçoit une fiche de synthèse au format BAC/BFEM et un paquet de flashcards. Ensuite, un « coach mémoire » lui envoie chaque jour sur WhatsApp les 5 cartes qu'il est sur le point d'oublier (répétition espacée), sans application lourde ni gros volume de données. |
| 5.5 | Jury : le studio IA de préparation aux concours et aux oraux | Orientation, concours et après-BAC : choix de filière, bourses, concours (ENA, médecine, écoles), université | Un studio mobile qui transforme les annales des concours ouest-africains (écoles d'ingénieurs, médecine, ENA, FASTEF/CRES, police, douane, armée, Prytanée, écoles de commerce) en épreuves blanches chronométrées corrigées, et qui fait passer de vrais oraux face à un jury en avatar vidéo, y compris l'entretien Campus France et les entretiens de bourse. |
| 5.5 | CompoScan : correction de copies et remédiation personnalisée pour écoles privées | Écoles privées, répétiteurs et cours de renforcement : outils B2B qui servent aussi la révision des élèves | L'école photographie les copies papier des compositions et des bacs ou BFEM blancs. L'IA pré-corrige selon le barème, repère les lacunes de chaque élève, puis génère automatiquement pour chacun un pack de révision ciblé (exos, audio, mini-vidéo) envoyé au parent sur WhatsApp, et pour la direction un tableau de bord des classes à risque avant l'examen. |
| 5.3 | Jàngal Diaspora : le contrat de révision payé par la famille | Parents et suivi : planning, motivation, rapports, financement par les parents ou la diaspora | Le parent ou l'oncle de Paris paie des crédits de révision via Wave ou une carte, l'élève révise en 15 minutes par jour sur WhatsApp, et la famille reçoit chaque dimanche un bulletin vocal en wolof ou pulaar, avec une récompense débloquée automatiquement quand les objectifs sont atteints. |
| 5.3 | Répétiteur Studio : l'IA qui transforme chaque répétiteur de quartier en mini-école avec suivi parent | Parents et suivi : planning, motivation, rapports, financement par les parents ou la diaspora | Un studio mobile pour les répétiteurs de cours à domicile et les profs de cours de renforcement : en 1 clic, ils génèrent fiches, devoirs et quiz pour leurs élèves, et envoient automatiquement aux parents un rapport WhatsApp professionnel qui justifie les 15 000 à 30 000 FCFA mensuels. |
| 5.3 | RépétStudio : le cours de renforcement en boîte WhatsApp | Écoles privées, répétiteurs et cours de renforcement : outils B2B qui servent aussi la révision des élèves | Le répétiteur ou l'école privée prend en photo son cours du jour, et en un clic RépétStudio en tire une fiche, un quiz, un audio de 3 minutes avec sa voix (en français et en wolof) et une relance de révision envoyée sur WhatsApp à chaque élève et à ses parents, sous la marque du prof. |
| 5 | DuelBac : duels de révision 1 contre 1 sur WhatsApp | Gamification et compétition (duels, classements, défis entre écoles et quartiers) | Tu prends en photo ton cahier ou une épreuve d'annales, l'IA en fait un duel de 10 questions chronométrées que tu envoies à un camarade sur WhatsApp. Le perdant reçoit la correction expliquée en audio, en français ou en wolof, et chaque victoire fait monter ton lycée et ton quartier au classement national. |
| 5 | SamaVoie : le simulateur d'orientation après-BAC | Orientation, concours et après-BAC : choix de filière, bourses, concours (ENA, médecine, écoles), université | Tu entres tes notes et ta série, SamaVoie te montre en 30 secondes tes vraies chances d'affectation filière par filière (Campusen, écoles, bourses étrangères), te dit quoi réviser pour les atteindre et rédige ta liste de voeux, le tout sur WhatsApp et sur une PWA légère. |
| 4.7 | ProfClone Studio : les vrais profs du Sénégal multipliés par l'IA | Vidéo et avatars : cours courts façon TikTok, profs IA africains, capsules | Un studio mobile où les enseignants et les répétiteurs de cours de renforcement clonent, avec leur consentement, leur visage et leur voix. Ils transforment leurs fiches de cours en capsules vidéo verticales avec leur propre avatar, puis vendent l'abonnement à leur « classe virtuelle » sur WhatsApp. La plateforme encaisse via Wave et prend une commission. |
| 4.5 | KàdduClip : ton cahier devient une capsule vidéo de 90 s | Vidéo et avatars : cours courts façon TikTok, profs IA africains, capsules | L'élève photographie une page de son cahier ou de son manuel. En moins de 2 minutes, il reçoit une capsule verticale de 90 s façon TikTok : un prof IA sénégalais explique la notion en français, avec au besoin un passage en wolof ou en pulaar, puis 3 questions flash. La capsule est légère, se lit hors ligne et se partage sur WhatsApp. |
| 4.2 | Radio Kalan Studio, l'émission de révision en langue locale générée par l'IA pour les radios communautaires, avec quiz par SMS | Accessibilité extrême : feature phones, USSD, SMS, radio, zones rurales, élèves en langue locale | Un studio IA qui fabrique chaque semaine, pour plus de 100 radios communautaires, des émissions de révision BAC, BFEM et CFEE prêtes à diffuser : dialogue prof-élève en français et en langue locale (wolof, pulaar, sérère, mandinka), jeux-concours par SMS ou USSD et classement des écoles. Une seule production touche des milliers d'élèves qui n'ont ni smartphone, ni data, ni électricité stable : le poste radio fonctionne à piles. |
| 4 | Griot Révision — le studio qui transforme tes cours d'histoire-géo, de philo et de littérature en chansons, en mini-podcasts et en débats vidéo à mémoriser | Philosophie, français, histoire-géo, langues (séries L) : dissertation, commentaire, mémorisation | Tu prends en photo une page de cahier (la colonisation, la Guerre froide, la liberté chez Sartre, « Une si longue lettre ») et en un clic elle devient un mini-podcast audio de 3 minutes, une chanson façon mbalax ou rap galsen à apprendre par cœur, ou une vidéo où deux philosophes débattent. Des quiz par note vocale sur WhatsApp, programmés au bon moment, la font ensuite rentrer dans ta tête avant la compo. |
| 3.8 | Navét'Savoir : la ligue de révision inter-quartiers et inter-lycées | Gamification et compétition (duels, classements, défis entre écoles et quartiers) | Le principe des navétanes (championnats de football de quartier, très suivis au Sénégal) appliqué au BAC et au BFEM : des équipes de 5 élèves par quartier ou par lycée s'affrontent chaque semaine dans des « matchs » de révision générés par l'IA, avec un commentateur avatar IA qui produit les résumés vidéo des matchs pour TikTok, et des prix financés par des sponsors. |
| 3.7 | Jàng Ci Telefon (« Réviser au téléphone »), le répétiteur vocal par USSD, SMS et appel, sans internet | Accessibilité extrême : feature phones, USSD, SMS, radio, zones rurales, élèves en langue locale | Un répétiteur IA joignable depuis n'importe quel téléphone, même un « kaani » à 7 000 FCFA, sans données mobiles : on compose un code court (#123*BAC#), on choisit sa matière, et on reçoit un cours audio de 3 minutes en français expliqué en wolof ou en pulaar, un quiz par USSD, ou on pose sa question à voix haute et une IA répond. |
| 3.2 | Mnémo Studio : le studio viral qui transforme une leçon en chanson, en vidéo-mémoire et en « palais de mémoire » partageable | Mémorisation et méthode : flashcards, répétition espacée, fiches à partir de photos du cahier | Les élèves retiennent les sons, les sons des rues et les refrains de mbalax ou d'afrobeat mieux qu'une page de cours. Mnémo Studio transforme n'importe quelle fiche ou flashcard en un clic en refrain de 30 secondes, en vidéo verticale illustrée ou en histoire mnémotechnique. L'outil est couplé à un planning de répétition espacée, qui fait réécouter le bon refrain au bon moment. |
