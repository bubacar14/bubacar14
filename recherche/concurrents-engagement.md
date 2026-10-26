> **Avertissement sur la méthode, à lire en premier.** Je n'ai pas pu faire les 30 à 50 recherches demandées. Le budget de recherche web de ce tour (200 recherches, partagé entre tous les agents) était déjà épuisé. Mes **5 recherches tentées ont été refusées : 0 recherche effectuée**. Le proxy réseau bloquait aussi presque tous les sites : Duolingo, Kahoot, Khan Academy, PubMed, arXiv, Wikipedia et Reddit sont restés inaccessibles. Seul **GitHub** répondait. Sur **18 lectures de pages tentées, 7 ont abouti** (toutes sur GitHub).
> Chaque affirmation porte donc un marqueur :
> - **[V]** : vérifié dans cette session, en lisant la page citée.
> - **[M]** : vient de mes connaissances antérieures, **non revérifié ici**. L'URL donnée est celle que je connais comme source d'origine, mais je ne l'ai pas rouverte.
>
> Les chiffres [M] doivent être revérifiés avant toute décision ou communication. Il faudra relancer cette recherche avec un budget disponible.

---

## 1. Ce que font les meilleurs (exemples concrets, écrans, parcours, chiffres sourcés)

### Duolingo : la référence de l'habitude quotidienne
- **La série de jours (streak).** Un compteur de jours consécutifs avec au moins une leçon, affiché en haut de l'écran d'accueil avec une flamme. Le gel de série (« streak freeze ») protège un jour manqué. Il a été suivi du pari de série (« streak wager ») et d'un widget iOS qui affiche la série sur l'écran du téléphone. Duolingo a publié que ce widget augmentait l'engagement des utilisateurs d'environ 60 %, et que les apprenants qui atteignent 7 jours de série sont nettement plus susceptibles de rester actifs à long terme (un facteur d'environ 3,6x est cité). **[M]** https://blog.duolingo.com/how-duolingo-streak-builds-habit/
- **Les ligues hebdomadaires.** Des classements de 30 personnes environ, sur 10 divisions (Bronze → Diamant), avec montée et descente chaque semaine selon l'XP gagné. Jorge Mazal, ancien responsable croissance de Duolingo, raconte que les ligues ont fait monter le temps d'apprentissage total d'environ 17 %. Elles ont aussi environ triplé le nombre d'apprenants « très engagés » (au moins 1 h par jour, 5 jours par semaine). **[M]** https://www.lennysnewsletter.com/p/how-duolingo-reignited-user-growth
- **Le pilotage par une métrique de rétention.** Le même témoignage décrit un modèle de croissance qui découpe les utilisateurs actifs en segments (nouveaux, récurrents, réactivés, à risque). L'équipe y a identifié le taux de rétention des utilisateurs récurrents (CURR) comme le levier qui pesait le plus sur les utilisateurs actifs quotidiens (DAU). Les DAU auraient été multipliés par environ 4,5 en 4 ans. **[M]** même source.
- **Les notifications.** Duolingo a publié à KDD 2020 un algorithme de type « bandit endormi et récupérant » (sleeping, recovering bandit). Il choisit chaque jour quel message envoyer parmi des modèles éligibles et pénalise ceux répétés récemment, car un message perd son effet s'il revient trop souvent et le regagne après un temps de repos. Le gain mesuré sur les DAU et les leçons est faible en pourcentage, mais significatif à l'échelle de Duolingo. Je ne cite pas de chiffre exact : je ne l'ai pas revérifié. **[M]** https://research.duolingo.com/papers/yancey.kdd20.pdf
- **La répétition espacée.** Duolingo a publié le modèle « half-life regression » (HLR). Il estime combien de temps un mot reste en mémoire chez un apprenant, à partir d'environ 13 millions de traces d'apprentissage publiées en open data (Settles & Meeder, ACL 2016). **[V]** https://github.com/duolingo/halflife-regression, DOI 10.18653/v1/P16-1174
- **L'onboarding.** L'élève choisit sa langue, son objectif quotidien (5/10/15/20 min) et passe éventuellement un test de niveau. Il fait une première leçon **avant** de créer un compte : on montre la valeur avant de demander l'inscription. **[M]** (pratique largement documentée, non revérifiée ici).
- **Les chiffres d'audience.** Les lettres aux actionnaires de 2025 parlent de plusieurs dizaines de millions de DAU et de plus de 10 millions d'abonnés payants. **[M]** Ordre de grandeur à vérifier sur https://investors.duolingo.com/ (inaccessible dans cette session).

### Anki : la répétition espacée sans habillage ludique
- Son argument repose sur deux principes : le **rappel actif** (essayer de répondre plutôt que relire) et la **répétition espacée**. Le manuel d'Anki s'appuie sur Ebbinghaus (1885), les boîtes de Leitner (1972) et SuperMemo. Le planificateur historique est dérivé de **SM-2**, et **FSRS** est proposé comme alternative. **[V]** https://github.com/ankitects/anki-manual/blob/main/src/background.md
- **Le parcours.** Chaque carte est notée avec 4 boutons : Again / Hard / Good / Easy (« À revoir / Difficile / Correct / Facile »). FSRS modélise pour chaque carte une difficulté (de 1 à 10), une stabilité (l'intervalle pour lequel la probabilité de rappel vaut 90 %) et une probabilité de rappel. **[V]** https://github.com/open-spaced-repetition/awesome-fsrs/wiki/The-Algorithm
- **FSRS contre le modèle de Duolingo.** Un banc d'essai ouvert a porté sur environ 350 millions de révisions, provenant de près de 10 000 collections. FSRS-6 y obtient une perte logarithmique de 0,346 contre 0,469 pour HLR, et une AUC de 0,703 contre 0,637. Toute la famille FSRS fait mieux que HLR sur tous les indicateurs. **[V]** https://github.com/open-spaced-repetition/srs-benchmark
- **Les intervalles concrets.** Une carte notée « Good » à chaque révision est revue après 2 j, 7 j, 21 j, 1,9 mois, 4,8 mois… avec FSRS, contre 1 j, 3 j, 8 j, 20 j, 1,7 mois avec l'algorithme par défaut d'Anki. **[V]** https://github.com/open-spaced-repetition/fsrs4anki/wiki/Compare-Anki's-built-in-scheduler-and-FSRS

### Quizlet
- On crée ou réutilise des listes de cartes. Les modes **Learn** (parcours adaptatif) et **Test** (examen généré) se combinent avec des jeux comme Match ou Gravity. Une grande partie de la valeur vient de la bibliothèque de contenus créée par les utilisateurs. **[M]**
- Vers 2022-2023, Quizlet a placé Learn et Test (en partie) derrière l'abonnement Plus, ce qui a provoqué une forte vague de mécontentement chez les élèves. **[M]** (non revérifié, détail des limites inconnu).

### Kahoot!
- Il s'agit de **quiz en direct en classe**. Le prof projette la question, les élèves répondent sur leur téléphone avec un code PIN. Les points dépendent de la justesse et de la rapidité, avec un podium final et une musique de compte à rebours. Il existe aussi un mode à son rythme (« assigné »). **[M]**
- Une revue de 93 études (Wang & Tahir, 2020) trouve des effets positifs sur l'apprentissage, l'attitude en classe et l'anxiété. Elle signale aussi des problèmes : réseau instable, pression du chrono, élèves qui répondent au hasard pour aller vite. **[M]** DOI 10.1016/j.compedu.2020.103818

### Brilliant
- Le principe est « apprendre en faisant ». Des leçons courtes et interactives de maths et de sciences commencent par un problème à manipuler avant la théorie. On y trouve des séries de jours, une ligue et un écran de fin de leçon qui célèbre la réussite. Le modèle est un abonnement premium avec une partie gratuite limitée. **[M]**

### Khan Academy
- On y trouve des parcours de **maîtrise** par compétence (Familiar → Proficient → Mastered), des points d'énergie et des badges, ainsi que des tableaux de bord pour profs et parents. Khan Academy communique des gains d'apprentissage pour les élèves qui pratiquent régulièrement, de l'ordre d'**au moins 30 minutes par semaine** selon ses études d'efficacité. **[M]** à vérifier sur https://www.khanacademy.org/about/impact
- **Khanmigo**, son tuteur IA, est conçu pour **ne pas donner directement la réponse**. Il guide l'élève par questions, à la manière de Socrate. **[M]** C'est le point de comparaison le plus direct pour la fonction phare de Révizo.

---

## 2. Ce qui marche et pourquoi (avec preuves)

1. **La répétition espacée et le rappel actif sont les techniques les mieux établies.** Une méta-analyse de 254 études confirme l'effet d'espacement (Cepeda et al., 2006, *Psychological Bulletin*, DOI 10.1037/0033-2909.132.3.354) **[M]**. Une revue de 10 techniques d'étude ne classe que deux techniques en « utilité élevée » : la pratique de test et la pratique distribuée (Dunlosky et al., 2013, DOI 10.1177/1529100612453266) **[M]**. L'effet du test est très solide : se tester fait mieux retenir à une semaine que relire (Roediger & Karpicke, 2006, DOI 10.1111/j.1467-9280.2006.01693.x) **[M]**. Sur le plan algorithmique, les modèles récents comme FSRS prédisent mieux l'oubli que HLR **[V]** (srs-benchmark).
   → Pour Révizo, la « révision des erreurs » est la fonction la mieux fondée scientifiquement, plus que les duels.

2. **La série de jours marche parce qu'elle transforme un effort en identité et en perte à éviter.** Une habitude se forme par la répétition d'un geste dans un contexte stable. Il faut en médiane environ 66 jours pour qu'il devienne automatique, avec de grandes variations entre personnes. Surtout, **manquer un jour isolé ne casse pas la formation de l'habitude** (Lally et al., 2010, DOI 10.1002/ejsp.674) **[M]**. C'est la justification scientifique du gel de série.

3. **Le gel de série est essentiel, car une série cassée fait décrocher.** Des travaux en comportement du consommateur montrent qu'une série interrompue réduit l'engagement suivant : l'utilisateur « lâche tout » (Silverman & Barasch, *Journal of Consumer Research*, 2023, DOI 10.1093/jcr/ucac029) **[M]**. Les gels, les réparations de série et le pari de série de Duolingo répondent directement à ce risque. **[M]**

4. **La gamification a un effet positif mais modéré, qui dépend du contexte.** Une méta-analyse en éducation (Sailer & Homner, 2020, DOI 10.1007/s10648-019-09498-w) trouve des effets faibles à moyens et positifs sur l'apprentissage cognitif, la motivation et le comportement. Les effets sont plus solides quand il y a une **fiction ou un récit** et quand la **compétition est combinée à de la collaboration** **[M]**. Une revue plus ancienne (Hamari, Koivisto & Sarsa, 2014, DOI 10.1109/HICSS.2014.377) concluait déjà que les effets existent mais dépendent fortement du contexte et des utilisateurs **[M]**.

5. **Les ligues marchent pour une minorité très compétitive.** Le gain de 17 % de temps et le triplement des « très engagés » chez Duolingo **[M]** montrent qu'un classement **entre personnes de niveau proche, remis à zéro chaque semaine**, motive. Avec un petit groupe et une remise à zéro hebdomadaire, chacun peut encore gagner.

6. **Des notifications personnalisées et variées sont plus efficaces que des notifications répétitives.** C'est le résultat central du papier KDD 2020 : un même message perd de son effet quand il est répété, et le regagne après une pause **[M]**. Les meilleures notifications viennent au moment où l'élève révise d'habitude et parlent de *sa* série, de *ses* erreurs.

7. **Montrer la valeur avant de demander l'inscription.** Faire une leçon avant de créer un compte est une pratique standard de Duolingo **[M]**. Pour Révizo, cela revient à laisser l'élève envoyer **un premier exercice gratuitement**, avant de lui demander son numéro.

---

## 3. Ce qui échoue ou agace les utilisateurs (avis, critiques)

> Je n'ai pas pu lire les forums (Reddit bloqué) ni les avis des magasins d'applications. Cette section s'appuie sur des critiques connues mais **non revérifiées [M]**.

- **La série devient une fin en soi.** Beaucoup d'utilisateurs de Duolingo disent faire « la leçon la plus facile » juste pour sauver leur série, sans vraiment apprendre. C'est la limite classique de la récompense de la régularité plutôt que de la maîtrise **[M]**. La recherche sur l'effet de sur-justification va dans le même sens : des récompenses extrinsèques et contrôlantes peuvent réduire la motivation intrinsèque pour une tâche (Deci, Koestner & Ryan, 1999, DOI 10.1037/0033-2909.125.6.627) **[M]**.
- **La culpabilisation par notification.** Les rappels insistants et passifs-agressifs de la chouette de Duolingo sont devenus un mème. L'effet est drôle, mais certains utilisateurs finissent par couper toutes les notifications ou désinstaller l'appli **[M]**.
- **Les vies, puis l'énergie, qui punissent l'erreur.** Le système des cœurs de Duolingo (on perd une vie à chaque faute et on est bloqué sans abonnement) est très critiqué parce qu'il **punit l'erreur dans une appli d'apprentissage**. Son remplacement par un système d'« énergie » en 2025 a aussi suscité des plaintes **[M]**. Pour Révizo, dont l'objet même est d'apprendre de ses erreurs, ce serait un contresens.
- **La compétition qui démotive.** Une étude en classe a comparé un cours gamifié (classements, badges) à un cours non gamifié. Les élèves du cours gamifié avaient une motivation intrinsèque, une satisfaction et des notes finales **plus basses** (Hanus & Fox, 2015, DOI 10.1016/j.compedu.2014.08.019) **[M]**. Les ligues découragent les élèves régulièrement en bas du classement.
- **Le passage brutal au payant.** Les élèves de Quizlet ont fortement réagi quand des fonctions jusque-là gratuites ont été placées derrière l'abonnement **[M]**. Retirer une fonction gratuite fait plus de dégâts que de ne jamais l'avoir offerte.
- **La surcharge de révisions.** Les utilisateurs d'Anki qui ajoutent trop de cartes se retrouvent avec des centaines de révisions par jour, puis abandonnent. Les témoignages sur ce phénomène sont nombreux **[M]**. L'outil est aussi jugé austère et difficile à prendre en main **[M]**.
- **Kahoot : la vitesse plus que la réflexion.** Le chrono et les points de rapidité poussent à répondre au hasard. Le stress pénalise les élèves lents (Wang & Tahir, 2020) **[M]**.
- **Les applis qui donnent les réponses.** C'est le risque propre à Révizo. Les applis qui résolvent un exercice à partir d'une photo (Photomath, Gauth, Brainly…) sont souvent accusées de favoriser la copie des devoirs. Khanmigo a été conçu à l'inverse, pour éviter cela **[M]**. Une appli qui fournit simplement la réponse remplace l'apprentissage au lieu de le soutenir, et risque d'être mal vue des enseignants et des parents.

---

## 4. Recommandations concrètes pour Révizo, classées par impact

> Le contexte local est **non vérifié dans cette session** : prix des données mobiles, parc de téléphones, usage des moyens de paiement, calendrier du BAC et du BFEM selon les pays. Il faut le valider sur le terrain (entretiens, tests) avant de figer les choix.

### Impact très élevé
1. **Un tuteur IA qui fait réfléchir, pas un fournisseur de réponses (fonctionnalité et design).**
   - L'IA commence par identifier la méthode (« Quel type d'exercice est-ce ? »). Elle donne **un indice**, puis l'étape suivante, et la correction complète seulement à la demande ou après une tentative.
   - Proposer à la fin un **exercice similaire** à faire seul.
   - C'est la logique de Khanmigo **[M]** et de l'effet du test (Roediger & Karpicke) **[M]**. C'est aussi l'argument qui gagne la confiance des parents et des profs, qui sont souvent ceux qui paient.
2. **La révision espacée automatique des erreurs, au cœur de l'habitude.**
   - Chaque exercice raté ou expliqué devient une « carte » à revoir à J+1, J+3, J+7, etc.
   - Commencer avec un algorithme simple de type Leitner ou SM-2, puis passer à FSRS (open source, meilleure prédiction de l'oubli) quand les données suffisent **[V]**.
   - Prévoir un **plafond de révisions par jour** pour éviter la surcharge connue chez Anki **[M]**.
3. **Un objectif du jour minuscule et une série de jours bienveillante.**
   - L'objectif : « 1 révision + 1 quiz de 3 questions », faisable en 2 minutes même avec peu de données mobiles.
   - Donner dès le départ **2 gels de série gratuits**, regagnables en jouant, jamais vendus à prix fort. Prévoir une **réparation de série** gratuite dans les 24 h.
   - Justifications : une série cassée fait décrocher (Silverman & Barasch) **[M]**, et un jour manqué ne compromet pas l'habitude (Lally et al.) **[M]**.
   - Ajouter un « mode examens » (pendant les révisions du BAC) qui compte les **semaines** actives plutôt que les jours.
4. **Le premier exercice gratuit, sans inscription (onboarding).**
   - Écran 1 : « Prends en photo un exercice qui te bloque. »
   - Ensuite seulement : classe, série, pays, puis numéro de téléphone pour enregistrer la progression.
   - On montre la valeur avant de demander quoi que ce soit, comme Duolingo **[M]**.

### Impact élevé
5. **Ne jamais punir l'erreur : pas de vies ni d'énergie.** Une erreur doit **rapporter** quelque chose, par exemple « +5 XP : ajoutée à ta révision ». C'est l'inverse des cœurs de Duolingo, très critiqués **[M]**.
6. **Des notifications personnalisées et sobres.**
   - Une seule notification par jour au maximum, à l'heure habituelle de l'élève. Un message qui parle de *son* contenu (« 3 erreurs de fractions à revoir, 2 min »).
   - Faire tourner plusieurs modèles de messages et éviter de répéter le même (KDD 2020) **[M]**.
   - Pas de culpabilisation. L'élève peut régler ou couper facilement les notifications.
   - Côté technique, la PWA dépend des notifications web. Elles fonctionnent sur Chrome Android, mais sur iPhone seulement si la PWA est installée sur l'écran d'accueil (iOS 16.4 et plus) **[M]**. Prévoir donc des **rappels par WhatsApp ou SMS sur inscription volontaire** comme solution de secours. Leur coût et leurs conditions sont à vérifier.
7. **Des duels et des ligues entre élèves de niveau proche, avec une part de collaboration.**
   - Ligues hebdomadaires de 20 à 30 élèves **de même classe et de même série**, remises à zéro chaque semaine.
   - Ajouter des **défis par classe ou par établissement** (« la Terminale S2 du lycée X contre le lycée Y »), car la gamification marche mieux quand la compétition se combine à la collaboration (Sailer & Homner) **[M]**.
   - Les ligues doivent rester **optionnelles** (Hanus & Fox) **[M]**.
   - Récompenser la **justesse**, pas seulement la vitesse (critique de Kahoot) **[M]**.

### Impact moyen : prix et paiement
8. **Des crédits en petites portions, jamais de fonction gratuite retirée.**
   - Proposer des packs adaptés au mobile money : petits montants, achat immédiat, par exemple un pass jour, un pass semaine et un pass « mois du BAC ». Les montants sont à tester localement.
   - Les révisions et les quiz de base restent **toujours gratuits**. Seules les explications IA, qui coûtent cher à servir, consomment des crédits.
   - Ne jamais rendre payante une fonction qui était gratuite, à cause de la réaction observée chez Quizlet **[M]**.
   - Prévoir un **paiement par un parent** (lien de paiement à envoyer) et des **crédits gagnés par la régularité** (par exemple 7 jours de série = 1 explication offerte).
9. **Un tableau de bord parent ou prof.** Un résumé hebdomadaire envoyé au parent (temps passé, progrès, erreurs récurrentes), sur le modèle des tableaux de bord de Khan Academy **[M]**. C'est un levier de rétention et de paiement, puisque c'est souvent le parent qui paie.

### Impact moyen : acquisition (TikTok, Facebook, Instagram)
10. **Des publicités qui montrent le produit en action.**
    - Format conseillé : une vidéo écran de 15 à 30 s où un élève photographie un exercice de type BAC et l'explication apparaît **étape par étape**.
    - Pousser ensuite l'élève directement vers « essaie gratuitement ton premier exercice », sans inscription.
    - Utiliser des **défis partageables** (« Bats mon score en duel ») avec un lien d'invitation et un bonus de crédits pour les deux élèves.
    - Point de vigilance : les règles publicitaires des plateformes pour les mineurs et l'éducation sont **à vérifier** pour chaque réseau et chaque pays.
11. **Un calendrier aligné sur l'année scolaire.** Prévoir des pics de campagne avant les compositions et le BAC ou le BFEM, et des parcours « J-30 avant l'examen ». **Les dates varient selon les pays** (Sénégal, Côte d'Ivoire, Mali, Burkina, Guinée…) et ne sont pas vérifiées ici.

### À éviter (liste courte)
- Les vies et l'énergie qui bloquent l'élève quand il se trompe.
- Les notifications multiples ou culpabilisantes.
- Le gel de série vendu cher.
- Les classements imposés qui exposent publiquement les derniers.
- Les réponses données directement, sans étapes.
- Les paywalls ajoutés après coup.

---

## 5. Sources (URL)

**Lues et vérifiées dans cette session [V]**
- https://github.com/duolingo/halflife-regression (HLR, Settles & Meeder ACL 2016, DOI 10.18653/v1/P16-1174)
- https://github.com/open-spaced-repetition/srs-benchmark (FSRS contre HLR, environ 350 millions de révisions)
- https://github.com/open-spaced-repetition/fsrs4anki/wiki/ABC-of-FSRS
- https://github.com/open-spaced-repetition/fsrs4anki/wiki/Compare-Anki's-built-in-scheduler-and-FSRS
- https://github.com/open-spaced-repetition/awesome-fsrs/wiki/The-Algorithm
- https://github.com/ankitects/anki-manual/blob/main/src/background.md

**Citées de mémoire, non rouvertes dans cette session [M]**
- https://blog.duolingo.com/how-duolingo-streak-builds-habit/
- https://www.lennysnewsletter.com/p/how-duolingo-reignited-user-growth
- https://research.duolingo.com/papers/yancey.kdd20.pdf
- https://investors.duolingo.com/
- https://www.khanacademy.org/about/impact
- Cepeda et al. 2006 : https://doi.org/10.1037/0033-2909.132.3.354
- Dunlosky et al. 2013 : https://doi.org/10.1177/1529100612453266
- Roediger & Karpicke 2006 : https://doi.org/10.1111/j.1467-9280.2006.01693.x
- Lally et al. 2010 : https://doi.org/10.1002/ejsp.674
- Silverman & Barasch 2023 : https://doi.org/10.1093/jcr/ucac029
- Sailer & Homner 2020 : https://doi.org/10.1007/s10648-019-09498-w
- Hamari, Koivisto & Sarsa 2014 : https://doi.org/10.1109/HICSS.2014.377
- Hanus & Fox 2015 : https://doi.org/10.1016/j.compedu.2014.08.019
- Wang & Tahir 2020 : https://doi.org/10.1016/j.compedu.2020.103818
- Deci, Koestner & Ryan 1999 : https://doi.org/10.1037/0033-2909.125.6.627

**Bilan de la méthode**
- **Recherches web : 5 tentées, 0 effectuée.** Le budget partagé de 200 recherches était épuisé.
- **Lectures de pages : 18 tentées, 7 réussies.** Toutes les réussites sont sur GitHub, dont 6 pages utiles. Les autres ont échoué : DNS ou proxy 403 pour duolingo.com, lennysnewsletter.com, kahoot.com, khanacademy.org, pubmed et ncbi, arxiv.org, wikipedia.org ; reddit.com refusé.
- **L'exigence de 30 à 50 recherches n'est pas remplie.** Il faut relancer cette étude avec un budget de recherche disponible et un accès réseau à ces sites, pour vérifier tous les points marqués [M] : chiffres Duolingo, avis des magasins d'applications et de Reddit, polémique Quizlet, notifications web sur iOS, règles publicitaires, prix du mobile money par pays.