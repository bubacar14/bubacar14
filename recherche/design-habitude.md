# Les applis qui créent l'habitude : ce que Révizo peut en apprendre (design de Duolingo, Quizlet, Anki, Kahoot, Brilliant et Khan Academy)

> Méthode : 18 recherches WebSearch, sans lecture directe des pages. Chaque affirmation sourcée renvoie à une URL. Ce qui vient de ma connaissance générale est marqué **[non vérifié]**. Beaucoup de sources sont secondaires (blogs, wikis, forums), et je le signale quand ça compte.

---

## 1. Fiche par appli

### Duolingo, la référence du genre

**Identité visuelle**
- **Couleur principale** : un vert vif, « Feather Green », #58CC02. Le texte est en gris « Eel » #4B4B4B et les liens et accents en bleu « Macaw » #1CB0F6. Le bord des boutons utilise un vert plus foncé (#58A700) et le survol un vert plus clair (#89E219). Ces valeurs viennent de relevés tiers, pas d'une charte officielle ([canny-creative](https://www.canny-creative.com/brand-breakdown/brand/duolingo/), [shadcn.io](https://www.shadcn.io/design/duolingo/raw), [open-design.ai](https://open-design.ai/plugins/design-system-duolingo/)).
  - Ce bord foncé crée l'effet de bouton « en relief » qui s'enfonce quand on appuie, typique de Duolingo **[non vérifié pour l'animation]**.
- **Typographie** :
  - Pour les titres, une police sur mesure, **Feather Bold**, créée avec Fontsmith lors du rebranding de 2019 par Johnson Banks ([Creative Bloq](https://creativebloq.com/news/feather-bold), [Creative Review](https://www.creativereview.co.uk/duolingo-rebrand-johnson-banks/), [Design Week](https://www.designweek.co.uk/duolingo-rebrand-avoids-silicon-valley-tropes-and-reflects-companys-quirky-personality/)). Ses lettres reprennent la forme des plumes de Duo, par exemple la petite boucle du « g ».
  - Pour l'interface, DIN Round, selon un relevé tiers ([open-design.ai](https://open-design.ai/plugins/design-system-duolingo/)).
- **Illustration** : Duolingo publie ses règles sur [design.duolingo.com/illustration](https://design.duolingo.com/illustration).
  - Tout est construit avec **trois formes** : le rectangle arrondi, le cercle et le triangle arrondi. Les formes pointues sont « hors charte ».
  - On cherche à utiliser le moins de formes possible.
  - Pour les personnages, la tête et le corps font 1 à 2 formes chacun. Les yeux sont géométriques, « pas d'ovales » ([design.duolingo.com/illustration/characters](https://design.duolingo.com/illustration/characters)).
  - Le style est passé de formes dures sur fond gris à des formes rondes vers 2018 ([blog Duolingo, shape language](https://blog.duolingo.com/shape-language-duolingos-art-style/)).
  - Les autres personnages reprennent le langage de Duo, « un corps avec des ailes » ([blog, building character](https://blog.duolingo.com/building-character/)).
- **Animation** : Duolingo utilise Rive et ses machines à états, pour que les personnages réagissent aux actions de l'utilisateur, par exemple Lily dans l'appel vidéo IA ([Rive](https://rive.app/blog/duolingo-s-ai-powered-video-call-brings-lily-to-life)).

**Écrans clés**
- **Série de jours (streak)** :
  - C'est une flamme avec un compteur.
  - Un écran d'animation s'affiche chaque fois que la série est prolongée, avec une version spéciale les jours de palier. D'après Duolingo, cet écran a augmenté de **1,7 %** la part des nouveaux utilisateurs encore actifs 7 jours plus tard ([blog, how streak builds habit](https://blog.duolingo.com/how-duolingo-streak-builds-habit)).
  - L'équipe a remarqué que la métaphore de la flamme (« être en feu ») n'existe pas dans toutes les cultures. Elle a donc imaginé que **Duo lui-même se transforme** les jours de palier, comme un « power-up » de jeu vidéo ([blog, streak milestone design](https://blog.duolingo.com/streak-milestone-design-animation)).
  - Il existe aussi une barre hebdomadaire « Perfect Streak » ([lemon8](https://www.lemon8-app.com/@commoncompetence/7410659810506818054?region=us)). D'après une source secondaire, la flamme change de couleur au-delà de 30 jours ([deconstructoroffun](https://duolingo.deconstructoroffun.com/mechanics/streaks)), mais je n'ai pas pu le confirmer.
- **Gel de série (streak freeze)** : c'est un filet de sécurité qu'on achète avec la monnaie virtuelle pour protéger sa série si on rate un jour ([tearthemdown](https://tearthemdown.substack.com/p/duolingo-gamified-retention)).
- **Engagement à l'inscription** :
  - L'équipe rétention a mené plus de 600 expériences sur la série. Remplacer le bouton « continuer » par « m'engager sur mon objectif » a donné des effets nets ([Lenny's Newsletter](https://lennysnewsletter.com/p/behind-the-product-duolingo-streaks), [videohighlight](https://videohighlight.com/v/_CCwoQZH5hI)).
  - Le premier grand gain est venu de la notification « sauve ta série » ([marishalakhiani](https://marishalakhiani.substack.com/p/breaking-down-duolingos-growth-model)).
- **Ligues** :
  - Elles ont été testées en 2018. On y est groupé avec des apprenants aux habitudes et au fuseau horaire proches.
  - Le niveau le plus haut est la ligue Diamant, et les 10 premiers accèdent à un tournoi en trois phases ([blog, leagues](https://blog.duolingo.com/duolingo-leagues-leaderboards/)).
- **Parcours (Path, 2022)** :
  - C'est un chemin unique et linéaire qui remplace l'arbre de compétences où l'on choisissait sa leçon.
  - Les objectifs affichés étaient de « réduire la confusion » et d'« améliorer les acquis » ([NBC News](https://www.nbcnews.com/tech/tech-news/duolingos-update-redesign-luis-von-ahn-interview-rcna44655), [blog, nouvel écran d'accueil](https://blog.duolingo.com/new-duolingo-home-screen-design)).
- **Vies puis énergie** :
  - Avec les cœurs, on perdait une vie à chaque erreur.
  - Avec l'énergie, chaque exercice consomme de l'énergie, même sans faute. Les abonnés Super et Max ont une énergie illimitée ([Duolingo Wiki](https://duolingo.fandom.com/wiki/Energy), [Android Authority](https://androidauthority.com/quitting-duolingo-energy-system-3599842)).
- **Écran de fin de leçon** : Duo fait la fête (état « cheering » d'une machine à états) ([dev.to](https://dev.to/uianimation/bringing-characters-to-life-with-rive-duolingo-style-animation-for-apps-16j7)). L'affichage de l'XP gagnée, du taux de réussite et du temps vient de ma connaissance **[non vérifié]**.

**Ton des textes**
- Le ton des notifications est voulu « entre gentil et méchant », selon la formule de l'entreprise elle-même ([Daily Dot](https://www.dailydot.com/irl/duolingo-owl-memes/)).
- Un exemple célèbre : « Ces rappels ne semblent pas fonctionner », ce qui fait culpabiliser ([Medium/Debugger](https://debugger.medium.com/duolingo-needs-to-chill-8f1832745ca0)).
- Ce ton a donné naissance au mème « Evil Duo ».

### Quizlet

- **Identité** :
  - Le bleu-violet de la marque varie selon les sources tierces : #4257B2 ou #4255FF, avec des accents bleu clair et rose ([refero](https://styles.refero.design/style/528eb1d4-8508-4dc6-87b4-c7b92d648dac), [webdesignhot](https://www.webdesignhot.com/api/design-md/quizlet.md)).
  - Les titres sont en Hurmes Geometric ([webdesignhot](https://www.webdesignhot.com/api/design-md/quizlet.md)).
  - Le logo a été simplifié en 2016 : bleu plus clair et ajout du « .com » supprimé ([1000logos](https://1000logos.net/quizlet-logo/)).
  - Pas de mascotte connue **[non vérifié]**.
- **Écrans** :
  - **Cartes** qu'on retourne d'un tap, avec mélange et choix du côté affiché en premier ([wiki Winona](https://learn.winona.edu/wiki/Quizlet_from_an_iPad)).
  - **Match** : un jeu chronométré où la carte clignote en rouge si l'association est fausse et en vert si elle est juste (même source, ancienne).
  - **Série de réponses** dans le mode Learn : elle démarre après 5 bonnes réponses d'affilée et retombe à zéro si l'on change de type de question ([aide Quizlet](https://help.quizlet.com/hc/en-au/articles/40011154960653-Studying-with-Answer-Streaks)).
  - Je n'ai trouvé aucune preuve de badges.
- **Modèle** : depuis août 2022, les modes Learn et Test sont limités pour les comptes gratuits (5 séries de Learn par set, 1 test) ([BM Gator](https://bmgator.org/33901/news/changes-to-quizlet-cause-frustration-among-students/)).

### Anki / AnkiDroid

- **Identité** : une interface utilitaire, sans mascotte et sans charte marquée **[non vérifié]**.
- **Écran clé** : après la réponse, quatre boutons, « À revoir / Difficile / Correct / Facile » (Again / Hard / Good / Easy). AnkiDroid propose aussi un mode à deux boutons ([forum Anki](https://forums.ankiweb.net/t/how-to-prevent-users-from-misusing-hard-ideas-are-welcome/49092?page=3)).
- **Débats** :
  - Le bouton « Difficile » est souvent mal utilisé, ce qui dégrade l'algorithme de planification FSRS. L'interface et les tutoriels doivent apprendre aux utilisateurs à bien s'en servir ([forum Anki, onboarding](https://forums.ankiweb.net/t/revisiting-onboarding-decks-and-tutorials/43692?page=5)).
  - Les développeurs ont mené des sondages sur l'interface et sur le design des boutons en 2024 ([r/Anki](https://pol1.lr.ggtyler.dev/r/Anki/comments/1feabjo/survey_answer_buttons_design)).

### Kahoot!

- **Identité** :
  - La charte se décrit comme « LOUD!!! », colorée, audacieuse, énergique et inclusive ([Kahoot Brand Guide 2019](https://kahoot.com/files/2017/08/Kahoot-BrandGuide-July2019.pdf)).
  - Le violet dominant vient de ma connaissance **[non vérifié]**.
- **Écrans** :
  - Quatre réponses, chacune avec **une forme et une couleur**.
  - Les formes aident les élèves malvoyants ou daltoniens, selon des enseignants ([Common Sense](https://www.commonsense.org/education/reviews/kahoot/teacher-reviews/4657633)).
  - Le jeu enchaîne lobby, questions, classement et **podium**, tous personnalisables sur les offres payantes ([Kahoot themes](https://kahoot.com/blog/2022/02/25/introducing-kahoot-themes-customized-experience/)).
  - La correspondance précise entre formes et couleurs (triangle rouge, losange bleu, etc.) et la musique de jeu télévisé viennent de ma connaissance **[non vérifié]**.

### Brilliant

- **Animation** : la refonte des mécaniques de jeu en 2023 est passée à Rive pour la série de jours et les parcours codés par couleur. Les fichiers Rive sont bien plus légers que les vidéos, les GIF ou le JSON Lottie ([Rive, Brilliant](https://rive.app/blog/how-brilliant-org-motivates-learners-with-rive-animations)).
- **Moment clé** : un designer décrit l'animation interactive du « dégel » de série, conçue pour donner de la valeur à la série (cité dans la même recherche).
- **Divers** : les notes de version 7.9.0 indiquent que la progression de série « apparaît à plus d'endroits » ([APKMirror](https://www.apkmirror.com/apk/brilliant-org/brilliant/brilliant-7-9-0-release)). La palette et la typographie ne sont **pas vérifiées**.

### Khan Academy / Khan Academy Kids

- **Kids** :
  - Kodi l'ourse est la narratrice et la guide, avec quatre autres personnages ([blog Khan Academy](https://blog.khanacademy.org/supporting-english-language-acquisition-with-khan-academy-kids/)).
  - L'appli est gratuite, sans publicité ni abonnement.
  - Elle a reçu des prix de design, comme l'Editor's Choice de Children's Technology Review ([learn.khanacademy.org](https://learn.khanacademy.org/khan-academy-kids/.)).
- **Khan Academy** :
  - On y gagne des points d'énergie et des badges ([wiki](https://khanacademy.fandom.com/wiki/Energy_Points)).
  - Une partie de la gamification a disparu vers 2019, puis est revenue avec la série et les niveaux ([forum KA](https://support.khanacademy.org/hc/hy/community/posts/32022835406349/comments/36577316874381)).
  - Un document de travail de Northwestern indique au contraire que Khan Academy a **retiré** sa fonction de série pour des raisons de motivation ([Northwestern WP 26-05](https://www.ipr.northwestern.edu/documents/working-papers/2026/wp-26-05.pdf)). Les deux sources se contredisent sur la chronologie.

---

## 2. Les motifs qui reviennent et pourquoi ils marchent

1. **Une série de jours célébrée au bon moment**
   - À chaque prolongation, un écran animé s'affiche, avec un palier spécial à certains jours. Gain mesuré par Duolingo : +1,7 % de rétention à 7 jours ([blog Duolingo](https://blog.duolingo.com/how-duolingo-streak-builds-habit)).
   - Brilliant a fait la même chose avec Rive ([Rive](https://rive.app/blog/how-brilliant-org-motivates-learners-with-rive-animations)).
   - Le ressort psychologique est l'aversion à la perte et l'effet de dotation : on tient à ce qu'on a déjà accumulé ([Smashing Magazine](https://smashingmagazine.com/2026/02/designing-streak-system-ux-psychology/)).
2. **Un moment d'engagement explicite** : l'élève choisit lui-même son objectif, et ce simple choix augmente la rétention, même si l'objectif n'est jamais réutilisé ensuite ([Lenny's](https://lennysnewsletter.com/p/behind-the-product-duolingo-streaks), [lazyweb](https://lazyweb.com/research/duolingo-streak-goals-retention)).
3. **Le pardon intégré** (gel de série) : une série cassée fait souvent perdre l'utilisateur, donc on l'empêche de casser ([tearthemdown](https://tearthemdown.substack.com/p/duolingo-gamified-retention)).
4. **Un chemin unique plutôt qu'un menu** : il supprime la question « est-ce que je l'utilise bien ? ». Duolingo affirme que les acquis ont progressé, mais l'étude est interne ([blog Duolingo](https://blog.duolingo.com/new-duolingo-home-screen-design)).
5. **Une mascotte à états**, qui réagit au lieu de décorer : repos, encouragement, fête ([Rive](https://rive.app/blog/duolingo-s-ai-powered-video-call-brings-lily-to-life), [dev.to](https://dev.to/uianimation/building-a-duolingo-style-interactive-mascot-in-rive-step-by-step-guide-2d5c)).
6. **Une grammaire visuelle réduite** : trois formes, des angles arrondis et le moins de formes possible ([design.duolingo.com](https://design.duolingo.com/illustration)). Un style aussi simple se produit vite et reste reconnaissable en petite taille.
7. **Un second indice en plus de la couleur** : chez Kahoot, une forme accompagne chaque couleur, ce qui aide les élèves daltoniens ou malvoyants ([Common Sense](https://www.commonsense.org/education/reviews/kahoot/teacher-reviews/4657633)).
8. **Un retour immédiat en deux couleurs** (vert juste, rouge faux), comme dans le Match de Quizlet ([wiki Winona](https://learn.winona.edu/wiki/Quizlet_from_an_iPad)).
9. **Une compétition entre pairs proches** : les ligues regroupent des apprenants au niveau et au fuseau comparables ([blog Duolingo](https://blog.duolingo.com/duolingo-leagues-leaderboards/)).

---

## 3. Ce que les utilisateurs critiquent

- **La culpabilisation** :
  - Le ton passif-agressif est le premier sujet de critique, en France aussi ([LADN](https://www.ladn.eu/tech-a-suivre/duolingo-forest-appli-culpabilisante-best/)).
  - Une étude de 2025 relève des notifications trop fréquentes destinées à fidéliser ([UFRPE](https://arandu.ufrpe.br/items/e55879b3-a7af-4aa1-839b-c91f56e1fbcd/full)).
  - Les enfants y seraient particulièrement sensibles ([UniversityXP](https://www.universityxp.com/news/2025/7/25/we-havent-seen-you-in-a-while-duolingos-passive-aggressive-strategy-for-keeping-users-hooked)).
  - Un article académique parle d'« obligation gamifiée » et de « dérive de l'objectif » chez les enfants ([Deceptive Patterns / IDC](https://deceptive.design/articles/the-evil-bird-and-the-right-to-disconnect-children-s-vulnerability-to-exit-dark-patterns-in-gamified-educational-apps)).
- **L'énergie qui punit même sans faute** :
  - Une pétition dénonce une limite qui peut tomber à deux leçons par jour ([change.org](https://www.change.org/p/duolingo-hearts-not-energy)).
  - Aucun moyen de désactiver le système, et certains utilisateurs disent partir ([Duolingo Wiki](https://duolingo.fandom.com/wiki/Energy), [Android Authority](https://androidauthority.com/quitting-duolingo-energy-system-3599842)).
- **Des ligues qui épuisent ou poussent à tricher** :
  - On farme de l'XP avec des leçons courtes, et on se méfie des tricheurs ([Yahoo](https://malaysia.news.yahoo.com/duolingo-app-language-learning-why-165500197.html), [MetaFilter](https://www.metafilter.com/199369/I-Am-Going-Out-In-A-Blaze-Of-Glory)).
  - Face à des joueurs à plus de 10 000 XP par semaine, la ligue décourage ([Reddit](https://reddit.rtrace.io/r/duolingo/comments/17m0gdd/duolingo_isnt_as_bad_as_people_say)).
  - « Le badge est joli, mais mon japonais n'a pas progressé. »
- **Le parcours imposé** :
  - Les utilisateurs ont perdu le choix de leur leçon et leurs couronnes. L'appli est comparée à Candy Crush et des campagnes d'avis à 1 étoile ont suivi ([PiunikaWeb](https://piunikaweb.com/2022/10/17/duolingo-app-update-with-path-ui-faces-backlash-from-users/), [uxdesign.cc](https://uxdesign.cc/down-the-wrong-path-the-disaster-of-the-latest-duolingo-ui-update-a4cdd1e6ea1c)).
- **Une gamification qui remplace l'apprentissage** : on parle de « pointsification », qui nuit à l'apprentissage et au bien-être ([arXiv 2203.16175](https://arxiv.org/pdf/2203.16175), [Édimbourg 2025](https://blogs.ed.ac.uk/digital_education_conference_2025/?p=232)).
- **Des séries cassées qui démotivent** : une étude citée indique qu'après une longue série perdue, l'engagement tombe sous le niveau de départ. La citation n'est pas vérifiée ([Yu-kai Chou](https://yukaichou.com/gamification-analysis/streak-design-gamification-motivation-burnout/)).
- **Le paywall au mauvais moment** : les étudiants racontent tomber sur le paywall la veille de l'examen, y compris sur des sets qu'ils ont créés eux-mêmes ([NT Daily](https://www.ntdaily.com/opinion/quizlet-s-paywalls-place-priority-on-profits-over-pupils/article_848d54c6-4eca-11ef-b6bd-bba8eff900d3.html), [Bloomington South](https://bloomingtonsouthoptimist.org/17407/opinion/quizlets-paywall-hurts-the-students-it-claims-to-help)).
  - Une source affirme que la note sur l'App Store est tombée de 3,53 à 2,75 en mai 2026, mais ce n'est pas corroboré ([mwm.ai](https://mwm.ai/articles/quizlet-v10-36-moves-core-study-features-behind-paywall-triggering-ratings-drop-in-may-2026)).
- **Anki, interface encombrée** : les réglages sont difficiles, il y a peu d'options d'apparence, et des boutons ambigus faussent l'algorithme ([lemm.ee](https://lemm.ee/post/20457606), [forum Anki](https://forums.ankiweb.net/t/how-to-prevent-users-from-misusing-hard-ideas-are-welcome/49092?page=3)).
- **Kahoot, enfantin et peu accessible** :
  - Les formes aux couleurs primaires sont jugées « enfantines » ([support Kahoot](https://support.kahoot.com/hc/en-us/community/posts/18907099316115-Ability-to-Change-Answer-Icons)).
  - Le chrono gêne les lecteurs d'écran, et la bonne réponse n'est indiquée que visuellement ([CU Boulder](https://www.colorado.edu/digital-accessibility/kahoot-accessibility-summary)).

---

## 4. Ce que Révizo doit copier, adapter ou éviter

### À copier

- **Un écran de prolongation de série animé**, avec une variante spéciale aux paliers (7, 30, 100 jours).
  - Dans la charte : un trait de stylo bleu Bic qui « coche » le jour sur une ligne Seyès, et une pastille jaune soleil au palier.
  - La preuve : +1,7 % de rétention à 7 jours chez Duolingo.
- **Le moment d'engagement** à l'arrivée : « Je m'engage : 10 min par jour jusqu'au BFEM/BAC ».
  - On peut l'écrire en Caveat, comme une promesse notée dans la marge.
  - Ancrer l'objectif sur la date de l'examen est plus parlant au Sénégal ou au Mali qu'un objectif abstrait **[proposition]**.
- **Le pardon de série** (gel), mais gagné et non vendu : par exemple, une révision des erreurs terminée donne un gel. C'est cohérent avec la répétition espacée.
- **Une grammaire de formes réduite** pour les icônes au trait : 2 ou 3 formes de base, une épaisseur unique, des angles arrondis, comme le fait Duolingo pour ses illustrations.
- **Un second indice en plus de la couleur** :
  - Le bleu-vert (juste) et le rouge du prof (faux) doivent toujours être accompagnés d'un signe : une coche et une croix au trait, plus un mot en Caveat (« Bien », « Revois »).
  - La raison : rouge et vert se confondent pour les daltoniens (deutéranomalie), comme le rappelle la recherche sur Kahoot.
- **Une animation légère** :
  - Rive est léger et interactif, et Brilliant l'a choisi pour cette raison. C'est crucial sur une PWA utilisée avec des forfaits data limités.
  - À défaut, du SVG et des animations CSS courtes **[proposition]**.

### À adapter

- **La mascotte** :
  - Révizo n'en a pas et n'utilise pas d'emoji. La charte « Cahier » a déjà un personnage implicite : **le prof et son stylo rouge**.
  - Il vaut mieux donner une voix (annotations en Caveat, bulles en marge) que créer un hibou. Le prof s'adapte au contexte : il encourage, corrige, félicite.
  - Duolingo lui-même s'interroge sur la portée culturelle de la flamme, ce qui pousse à choisir des métaphores locales et scolaires : le cahier, la note sur 20, le tableau d'honneur.
- **Les ligues et duels** :
  - Des duels entre camarades de même classe ou de même examen plutôt que des ligues mondiales.
  - Un plafond quotidien d'XP utile, pour éviter le farming.
  - Afficher la **précision** et non seulement le volume.
- **L'écran de fin de leçon** : montrer ce qui a été appris (la méthode retenue en JetBrains Mono pour un calcul) et les erreurs envoyées en révision, plutôt que seulement des points. Cela répond à la critique de « pointsification ».
- **Le parcours guidé** :
  - Proposer un chemin recommandé vers l'examen, mais garder un accès libre à « Mon exercice » et aux quiz par chapitre.
  - Le parcours imposé de Duolingo a provoqué une révolte.
- **Les boutons d'auto-évaluation** (inspirés d'Anki) : 2 boutons (« Je savais / À revoir ») plutôt que 4, avec des libellés clairs, pour ne pas fausser la répétition espacée.

### À éviter

- **La culpabilisation** : pas de « tu nous déçois », ni de prof triste. Le rouge du prof sert à corriger, pas à faire honte. Les notifications doivent être rares, réglables, et pouvoir s'arrêter avec un message neutre.
- **Une énergie qui punit l'effort** : ne jamais consommer de crédits payés en mobile money pour réviser ses propres erreurs, ni bloquer après une bonne réponse.
  - Les crédits jaunes doivent financer le coût réel, c'est-à-dire l'analyse IA d'une photo, et pas la pratique de base.
- **Le paywall la veille de l'examen** : afficher le solde de crédits à l'avance et prévenir avant qu'il ne tombe à zéro, surtout en période de BFEM et BAC.
- **Les couleurs primaires « enfantines » façon Kahoot** : le public va du collège au lycée. La charte Cahier/Ardoise, sobre et scolaire, est un atout à garder.
- **Une série qui devient une obligation** : prévoir une sortie digne (pause vacances, série hebdomadaire possible), car une longue série cassée peut faire baisser l'engagement sous le niveau de départ.

---

## 5. Sources et nombre de recherches

**Recherches effectuées : 18** (WebSearch). Je n'ai fait aucun WebFetch.

**Duolingo** :
- Chiffres et méthode : https://blog.duolingo.com/how-duolingo-streak-builds-habit · https://blog.duolingo.com/streak-milestone-design-animation · https://lennysnewsletter.com/p/behind-the-product-duolingo-streaks · https://lazyweb.com/research/duolingo-streak-goals-retention
- Identité et illustration : https://design.duolingo.com/illustration · https://design.duolingo.com/illustration/characters · https://blog.duolingo.com/shape-language-duolingos-art-style/ · https://blog.duolingo.com/building-character/ · https://creativebloq.com/news/feather-bold · https://www.creativereview.co.uk/duolingo-rebrand-johnson-banks/ · https://www.canny-creative.com/brand-breakdown/brand/duolingo/ · https://open-design.ai/plugins/design-system-duolingo/
- Ligues et parcours : https://blog.duolingo.com/duolingo-leagues-leaderboards/ · https://blog.duolingo.com/new-duolingo-home-screen-design · https://www.nbcnews.com/tech/tech-news/duolingos-update-redesign-luis-von-ahn-interview-rcna44655 · https://piunikaweb.com/2022/10/17/duolingo-app-update-with-path-ui-faces-backlash-from-users/ · https://uxdesign.cc/down-the-wrong-path-the-disaster-of-the-latest-duolingo-ui-update-a4cdd1e6ea1c
- Énergie : https://duolingo.fandom.com/wiki/Energy · https://www.change.org/p/duolingo-hearts-not-energy · https://androidauthority.com/quitting-duolingo-energy-system-3599842
- Notifications et ton : https://www.dailydot.com/irl/duolingo-owl-memes/ · https://debugger.medium.com/duolingo-needs-to-chill-8f1832745ca0 · https://www.universityxp.com/news/2025/7/25/we-havent-seen-you-in-a-while-duolingos-passive-aggressive-strategy-for-keeping-users-hooked · https://www.ladn.eu/tech-a-suivre/duolingo-forest-appli-culpabilisante-best/
- Animation : https://rive.app/blog/duolingo-s-ai-powered-video-call-brings-lily-to-life · https://dev.to/uianimation/bringing-characters-to-life-with-rive-duolingo-style-animation-for-apps-16j7
- Analyses secondaires : https://tearthemdown.substack.com/p/duolingo-gamified-retention · https://marishalakhiani.substack.com/p/breaking-down-duolingos-growth-model · https://duolingo.deconstructoroffun.com/mechanics/streaks
- Critiques des ligues : https://malaysia.news.yahoo.com/duolingo-app-language-learning-why-165500197.html · https://www.metafilter.com/199369/I-Am-Going-Out-In-A-Blaze-Of-Glory

**Quizlet** : https://help.quizlet.com/hc/en-au/articles/40011154960653-Studying-with-Answer-Streaks · https://learn.winona.edu/wiki/Quizlet_from_an_iPad · https://1000logos.net/quizlet-logo/ · https://styles.refero.design/style/528eb1d4-8508-4dc6-87b4-c7b92d648dac · https://www.webdesignhot.com/api/design-md/quizlet.md · https://bmgator.org/33901/news/changes-to-quizlet-cause-frustration-among-students/ · https://www.ntdaily.com/opinion/quizlet-s-paywalls-place-priority-on-profits-over-pupils/article_848d54c6-4eca-11ef-b6bd-bba8eff900d3.html · https://mwm.ai/articles/quizlet-v10-36-moves-core-study-features-behind-paywall-triggering-ratings-drop-in-may-2026

**Anki** : https://forums.ankiweb.net/t/how-to-prevent-users-from-misusing-hard-ideas-are-welcome/49092?page=3 · https://forums.ankiweb.net/t/revisiting-onboarding-decks-and-tutorials/43692?page=5 · https://pol1.lr.ggtyler.dev/r/Anki/comments/1feabjo/survey_answer_buttons_design · https://lemm.ee/post/20457606

**Kahoot** : https://kahoot.com/files/2017/08/Kahoot-BrandGuide-July2019.pdf · https://kahoot.com/blog/2022/02/25/introducing-kahoot-themes-customized-experience/ · https://support.kahoot.com/hc/en-us/community/posts/18907099316115-Ability-to-Change-Answer-Icons · https://www.commonsense.org/education/reviews/kahoot/teacher-reviews/4657633 · https://www.colorado.edu/digital-accessibility/kahoot-accessibility-summary

**Brilliant** : https://rive.app/blog/how-brilliant-org-motivates-learners-with-rive-animations · https://www.apkmirror.com/apk/brilliant-org/brilliant/brilliant-7-9-0-release

**Khan Academy** : https://blog.khanacademy.org/supporting-english-language-acquisition-with-khan-academy-kids/ · https://learn.khanacademy.org/khan-academy-kids/. · https://khanacademy.fandom.com/wiki/Energy_Points · https://support.khanacademy.org/hc/hy/community/posts/32022835406349/comments/36577316874381

**Recherche et critique générales** : https://www.ipr.northwestern.edu/documents/working-papers/2026/wp-26-05.pdf · https://deceptive.design/articles/the-evil-bird-and-the-right-to-disconnect-children-s-vulnerability-to-exit-dark-patterns-in-gamified-educational-apps · https://arxiv.org/pdf/2203.16175 · https://arandu.ufrpe.br/items/e55879b3-a7af-4aa1-839b-c91f56e1fbcd/full · https://smashingmagazine.com/2026/02/designing-streak-system-ux-psychology/ · https://yukaichou.com/gamification-analysis/streak-design-gamification-motivation-burnout/ · https://blogs.ed.ac.uk/digital_education_conference_2025/?p=232

**Limites** :
- Les hex et polices de Duolingo et Quizlet viennent de relevés tiers et non de chartes officielles.
- La plupart des critiques sont anecdotiques (forums, pétitions, tribunes).
- Les gains de Duolingo (+1,7 %, meilleurs acquis avec le parcours) sont des chiffres internes à l'entreprise.