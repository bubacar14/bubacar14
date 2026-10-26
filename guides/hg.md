> **Avertissement méthodologique (à lire avant usage).** Cette passe de vérification n'a pas pu se faire en ligne. Mes 3 recherches web ont été refusées, car le quota de 200 recherches de la session, partagé entre les agents, était déjà épuisé. Mes 4 consultations directes ont aussi échoué : fr.wikipedia.org et officedubac.sn ont été bloqués par le proxy (ENOTFOUND / 403 CONNECT), et un test curl sur Wikipédia a été refusé. Le journal du proxy montre aussi des refus pour fomesoutra.com, sunudaara.com, youtube.com et abicours.com. **L'objectif de 30 à 50 recherches sourcées n'est donc pas atteint : 0 recherche aboutie.**
> Pour corriger le brouillon, je me suis appuyé sur des connaissances générales stables : dates d'histoire africaine bien établies, appartenance aux organisations régionales, règles de cartographie et de construction graphique, didactique de la dissertation et du commentaire. Je n'ai pas pu les recouper en ligne. Ce qui dépend des pays (durées, coefficients, barèmes, structure des sujets, noms des offices) reste marqué **[à vérifier]**. Pour obtenir les 30 à 50 recherches demandées, il faut relancer une session avec un quota disponible, ou augmenter `CLAUDE_CODE_MAX_WEB_SEARCHES_PER_SESSION`.
>
> **Principales corrections apportées au brouillon** (détail en section 10) :
> 1. **Guinée.** Le brouillon proposait un « volet UEMOA » pour tous les pays, ce qui est faux pour la Guinée : elle n'est pas membre de l'UEMOA et n'utilise pas le franc CFA.
> 2. **AES et CEDEAO.** Le brouillon oubliait l'Alliance des États du Sahel (charte du Liptako-Gourma du 16 septembre 2023, confédération en juillet 2024). Il oubliait aussi la sortie du Mali, du Burkina Faso et du Niger de la CEDEAO (annoncée en janvier 2024, effective fin janvier 2025). Un corrigé qui présente encore ces trois pays comme membres de la CEDEAO est daté.
> 3. **Chiffre non attribué.** Le brouillon citait « 330 millions d'habitants » sans dire de quel pays il s'agit.
> 4. **Croquis.** Le brouillon calquait la méthode française du « croquis de synthèse ». Or la place du croquis au BAC ouest-africain n'est pas établie : c'est un risque d'importer des exigences françaises.
> 5. **Formats manquants.** La méthode de la situation d'évaluation (APC) manquait, comme les questions à verbes-consignes, l'étude de photographie ou de paysage et la carte à compléter. La règle du demi-cercle (% × 1,8°) aussi.
> 6. **Affirmations non fondées.** La « tolérance plus grande en séries scientifiques » et les barèmes chiffrés étaient présentés comme des tendances sans source.

---

# Guide de correction : Histoire-Géographie (dissertation, commentaire de document, croquis)

## 1. Ce que les correcteurs attendent, par niveau

### 1.1 Brevet (BFEM au Sénégal, DEF au Mali, BEPC dans les six autres pays)

Au collège, le correcteur vérifie surtout des **connaissances exactes** et des **savoir-faire simples**. La dissertation complète n'est en général pas demandée : la structure exacte de l'épreuve varie selon le pays **[à vérifier]**.

- **Connaissances précises** : dates clés, acteurs, définitions de notions, localisation des grands ensembles (continents, océans, grands fleuves comme le Niger, le Sénégal, la Volta ou le Congo, pays, capitales, reliefs de l'Afrique de l'Ouest et du pays de l'élève).
- **Réponses aux verbes-consignes** : *citer / relever* (une liste suffit), *identifier* (nommer), *localiser* (situer sur la carte ou par rapport à des repères), *décrire* (dire ce qu'on voit, avec chiffres), *expliquer* (donner les causes : « parce que… »), *justifier* (prouver avec le document ou une connaissance), *comparer* (ressemblances et différences). Une réponse en un seul mot à « expliquer » ou « justifier » perd des points.
- **Lecture de documents** : prélever une information dans un texte, une carte, un tableau, un graphique ou une photographie, puis la reformuler. Recopier sans expliquer rapporte peu.
- **Savoir-faire cartographiques et graphiques** : compléter un fond de carte (nomenclature et légende), construire un diagramme (titre, axes gradués, unités, légende).
- **Éducation civique** : selon le pays, elle fait partie de l'épreuve d'histoire-géographie ou forme une épreuve à part. En Côte d'Ivoire, elle s'appelle EDHC (Éducation aux droits de l'homme et à la citoyenneté). Ailleurs, on rencontre surtout « ECM » (éducation civique et morale) ou « éducation civique » **[intitulé et rattachement à vérifier pays par pays]**.
- **Pays en approche par compétences (APC)** : le Bénin et la Côte d'Ivoire en sont les cas les plus connus. Les sujets peuvent prendre la forme d'une **situation d'évaluation** : un contexte, un ou plusieurs supports, puis des consignes ou tâches numérotées. La méthode est en section 2.5. **[À vérifier : la présence de ce format au BEPC et au BAC de chaque pays, et pour quelles années.]**

### 1.2 BAC (toutes séries)

Au BAC, on attend une **production argumentée et organisée** :

1. **Comprendre le sujet** : définir les termes, délimiter l'espace et la période, voir l'enjeu.
2. **Poser une problématique** : une question centrale qui guide toute la copie.
3. **Construire un plan logique** : deux ou trois parties équilibrées, chacune avec une idée directrice.
4. **Mobiliser des connaissances exactes** : dates, chiffres datés, acteurs, lieux, exemples africains et mondiaux, vocabulaire disciplinaire (décolonisation, bipolarisation, non-alignement, mondialisation, IDH, PIB, etc.).
5. **Rédiger correctement** : introduction, développement et conclusion bien visibles, transitions, orthographe soignée.
6. **Exploiter le ou les documents** dans un commentaire : présenter, expliquer à l'aide de ses connaissances, puis montrer la portée et les limites.
7. **Pour un croquis ou une carte, s'ils sont demandés** : un titre, une légende organisée et des figurés corrects. **Attention** : je n'ai pas pu vérifier dans quels pays et quelles séries le croquis est une épreuve ou un exercice régulier au BAC. Il ne faut pas supposer qu'il est obligatoire comme dans le BAC français.

**Selon la série.** Il est très probable que le coefficient d'histoire-géographie soit plus élevé dans les séries littéraires et de sciences sociales que dans les séries scientifiques. **Les coefficients, les durées et une éventuelle différence d'exigence n'ont pas été vérifiés.** L'IA ne doit jamais dire à un élève de série scientifique qu'on attend moins de lui : le cadre méthodologique est le même.

## 2. Les types d'exercices fréquents et la méthode pas à pas

### 2.1 La dissertation (histoire ou géographie)

Exemples de sujets : « La guerre froide (1947-1991) », « La décolonisation en Afrique noire francophone », « Les États-Unis, première puissance mondiale ? », « Les problèmes de développement de l'Afrique ».

**Méthode** (environ 20 à 25 % du temps au brouillon) :

1. **Lire, souligner et classer les mots du sujet.** Repérer le type de sujet :
   - **sujet-tableau** (« La puissance du Japon ») : décrire et expliquer ;
   - **sujet-relation** (« Guerre froide et décolonisation ») : montrer les liens dans les deux sens ;
   - **sujet-question** (« L'Union européenne est-elle une puissance ? ») : discuter, nuancer ;
   - **sujet avec consigne** (« Montrez que… », « Analysez les causes… ») : obéir strictement à la consigne.
2. **Définir chaque terme et délimiter le sujet.**
   - Dans le temps : justifier les dates bornes (1947, c'est la doctrine Truman et la doctrine Jdanov ; 1991, c'est la disparition de l'URSS).
   - Dans l'espace : l'Afrique entière ? l'Afrique noire ? l'AOF ? le monde ?
3. **Mobiliser ses connaissances au brouillon** : dates, acteurs, faits, chiffres datés, exemples, notions.
4. **Formuler la problématique** : une question qui pose le vrai problème, pas une répétition du sujet. Exemple : « Comment l'affrontement indirect entre les deux Grands a-t-il structuré les relations internationales de 1947 à 1991 ? »
5. **Choisir le plan** :
   - **chronologique** pour une évolution. Exemple de découpage possible pour la guerre froide : 1947-1962, 1962-1975, 1975-1991. Le découpage du manuel national prime ;
   - **thématique** pour un sujet-tableau ;
   - **analytique** (causes, manifestations, conséquences), fréquent sur la décolonisation ;
   - **discussion** (oui, mais, nuance) pour un sujet-question.

   En géographie, le plan « atouts / réalisations / limites ou problèmes » est un classique des sujets sur une puissance ou un pays. Il ne faut pas l'appliquer mécaniquement à un sujet de relation ou de discussion.
6. **Rédiger l'introduction en entier au brouillon**, puis faire le plan détaillé : parties, sous-parties, exemples placés.
7. **Rédiger au propre** : introduction, développement avec transitions, conclusion.
8. **Se relire** : dates, noms propres, orthographe, équilibre des parties.

**Introduction (environ 10 à 15 lignes)** : amorce, puis définitions et délimitation, puis problématique, puis annonce du plan.

**Chaque partie** : une phrase d'annonce, puis deux ou trois paragraphes construits sur le schéma idée, explication, exemple précis (date, chiffre daté, lieu, acteur), puis une phrase de transition.

**Conclusion** : un bilan qui répond à la problématique, puis une ouverture pertinente si le professeur l'attend. Certains enseignants la jugent facultative **[usage variable]**.

### 2.2 Le commentaire de document (texte, carte, tableau, graphique, image)

1. **Lire la consigne et le paratexte** (titre, auteur, date, source, nature) avant le document.
2. **Présenter le document** :
   - sa **nature** (discours, traité, article, extrait de mémoires, carte, tableau…) ;
   - son **auteur** (fonction, point de vue, engagement) ;
   - sa **date et son contexte** ;
   - son **destinataire** ;
   - son **idée générale** en une phrase.
3. **Lire activement** : souligner les mots clés, numéroter les idées, repérer les allusions (noms, dates, notions).
4. **Dégager la structure du document** : souvent deux ou trois idées. Elle sert de plan si elle est logique ; sinon, faire un plan thématique.
5. **Expliquer** : (a) citer brièvement entre guillemets avec la ligne, (b) expliquer, (c) **compléter avec ses connaissances** (ce que le document ne dit pas).
6. **Montrer la portée et les limites** : intérêt du document, subjectivité de l'auteur, silences, propagande, conséquences de l'événement.
7. **Conclure** : idée générale, portée, intérêt du document pour comprendre la période.

**Deux formats possibles [répartition par pays et par série à vérifier]** :
- le **commentaire rédigé libre** (introduction, développement, conclusion) ;
- le **commentaire guidé par des questions** : on répond dans l'ordre, en phrases rédigées, en citant le document. Une question de synthèse finale peut demander un court paragraphe organisé.

**Règle d'or** : ni paraphrase, ni récitation du cours. Il faut faire des allers-retours entre le document et les connaissances.

**Documents statistiques** :
- décrire l'évolution ou la répartition avec des **chiffres cités et leurs unités** : valeurs extrêmes, écarts, rangs ;
- calculer si c'est utile : un coefficient multiplicateur (valeur finale ÷ valeur initiale), un taux de variation ((valeur finale − valeur initiale) ÷ valeur initiale × 100), une part en % ;
- expliquer les causes, puis les conséquences ;
- toujours rappeler l'**année et la source** des données.

**Photographie ou paysage** : décrire par plans (premier plan, arrière-plan), identifier le type d'espace (urbain, rural, littoral, sahélien…), interpréter (activités, aménagements, problèmes), puis rattacher à une notion du cours.

### 2.3 Le croquis, le schéma, la carte à compléter (géographie)

Formats possibles : **compléter une carte** (le plus probable au brevet), réaliser un **croquis** à partir d'un fond de carte, ou un **schéma** simplifié. **La fréquence au BAC selon le pays n'est pas vérifiée.**

1. **Analyser le sujet** : quel espace, quel thème ?
2. **Sélectionner** 8 à 12 informations : pôles, axes et flux, zones, limites.
3. **Construire d'abord la légende au brouillon**, en **deux ou trois parties titrées**. La légende est le plan dessiné.
4. **Choisir les figurés** :
   - **surfaces** : aplats ou hachures ; couleurs chaudes pour le dynamique, froides pour le moins dynamique ; le bleu est réservé à l'eau ;
   - **points** : cercles de taille hiérarchisée, symboles ;
   - **lignes et flux** : flèches d'épaisseur proportionnelle à l'importance, traits pour les limites.
5. **Réaliser le croquis** dans cet ordre : surfaces, lignes, points, nomenclature. Écrire horizontalement et lisiblement ; usage courant : États en majuscules, villes en minuscules.
6. **Ajouter le titre, l'orientation et l'échelle** si le fond n'en comporte pas.
7. **Vérifier la concordance** : chaque figuré du croquis est dans la légende, et chaque élément de la légende est sur le croquis.

### 2.4 Exercices courts (surtout au brevet)

- **Questions de cours** : réponse courte mais complète, en phrases.
- **Définitions** : précises, avec un exemple. Exemple : « La décolonisation est le processus par lequel une colonie se libère de la domination de la métropole et accède à l'indépendance ; exemple : la Guinée, indépendante le 2 octobre 1958. »
- **Construction graphique** :
  - **courbe** pour une évolution dans le temps, **barres** pour une comparaison, **cercle** ou **demi-cercle** pour une répartition en % ;
  - échelle adaptée, axes gradués avec unités, intervalles de temps respectés sur l'axe des abscisses ;
  - titre, légende, tracé à la règle ;
  - **cercle : angle = % × 3,6°**, **demi-cercle : angle = % × 1,8°**. Vérifier que le total fait 360° (ou 180°).
- **Frise chronologique** : une échelle régulière (exemple : 1 cm = 10 ans), un titre, des périodes et des événements bien distingués.
- **Vrai/faux, appariement, texte à trous** : formats possibles au brevet **[à vérifier par pays]**. Si l'énoncé demande de justifier, une réponse sans justification est incomplète.

### 2.5 La situation d'évaluation (pays APC)

Structure fréquente : un **contexte** (un court récit), un ou plusieurs **supports** (texte, carte, tableau), puis des **consignes** ou **tâches** numérotées. **[Structure et vocabulaire officiels à vérifier, notamment pour le Bénin et la Côte d'Ivoire.]**

1. Lire le contexte et repérer le **problème posé** (ce que le personnage du contexte doit comprendre ou résoudre).
2. Lire chaque consigne et souligner le **verbe d'action**.
3. Répondre consigne par consigne, dans l'ordre, en **numérotant** comme le sujet.
4. Appuyer chaque réponse sur le support (citation ou chiffre) **et** sur une connaissance.
5. Pour une consigne « proposer » ou « donner ton avis » : formuler une position, puis la justifier par deux arguments au moins, réalistes et liés au contexte.
6. Vérifier qu'aucune consigne n'a été oubliée.

## 3. La rédaction et la présentation attendues sur la copie

### Présentation matérielle

- Indiquer clairement le sujet choisi (exemple : « Sujet 2 : commentaire de document »).
- Sauter des lignes entre l'introduction, chaque partie et la conclusion. Commencer chaque paragraphe par un alinéa.
- **Titres apparents** : la tradition de la dissertation francophone attend un texte continu, avec un plan rendu visible par les annonces et les transitions. Certains professeurs tolèrent les titres, voire les demandent **[usage variable]**. En cas de doute, ne pas mettre de titres.
- Écriture lisible, pas d'abréviations (« gvt », « pb »), noms propres bien orthographiés (Kwame Nkrumah, Félix Houphouët-Boigny, Léopold Sédar Senghor, Modibo Keïta, Sékou Touré).

### Phrases types

- **Amorce** : « Au lendemain de la Seconde Guerre mondiale, … » ; « En 1960, dix-sept pays africains accèdent à l'indépendance… ».
- **Problématique** : « Dans quelle mesure… ? » ; « Comment… ? ».
- **Annonce du plan** : « Nous étudierons d'abord…, ensuite…, avant de montrer enfin… ».
- **Transition** : « Après avoir montré que…, il convient à présent d'analyser… ».
- **Présentation d'un document** : « Ce document est un [nature] rédigé par [auteur], [fonction], le [date], dans un contexte de… ».
- **Explication** : « L'auteur affirme (l. 5-7) que « … » ; il fait allusion à… ».
- **Critique** : « Ce texte reflète le point de vue de… ; il passe sous silence… ».
- **Conclusion** : « En définitive, … ».

### Justification et précision

- Chaque affirmation s'appuie sur un fait : date, chiffre, lieu ou acteur.
- Un chiffre se donne **avec son unité, son année et, si possible, sa source**. Exemple : « les États-Unis comptent environ 335 à 340 millions d'habitants au milieu des années 2020 ». Ce chiffre vient de connaissances générales, il est à actualiser avec le manuel ou une source officielle.
- Les citations du document sont courtes, entre guillemets, avec la ligne.
- **Dates délicates à manier avec précision.** Le Sénégal fête son indépendance le 4 avril (accords de transfert de compétences, 1960). L'éclatement de la Fédération du Mali date d'août 1960, et le Mali proclame son indépendance le 22 septembre 1960. La Guinée est indépendante le 2 octobre 1958, après le « non » au référendum du 28 septembre 1958. Ces dates relèvent de connaissances générales stables, mais il faut vérifier la formulation retenue par le manuel national.

## 4. Le barème : comment les points sont attribués

> **Aucun barème officiel n'a pu être consulté.** Les grilles ci-dessous sont des **ordres de grandeur pédagogiques**, à présenter toujours comme indicatifs. Les grilles réelles varient selon le pays, la commission de correction et le sujet. Dans les corrigés, une grille du type introduction environ 4 / développement environ 12 / conclusion environ 2 / expression et présentation environ 2 semble répandue **[à vérifier sur des corrigés officiels]**.

### Dissertation (sur 20, indicatif)

| Critère | Points indicatifs |
|---|---|
| Introduction (amorce, définitions et cadre, problématique, annonce du plan) | 3 à 4 |
| Développement : pertinence du plan et de l'argumentation | 4 à 5 |
| Développement : connaissances exactes, exemples précis | 6 à 8 |
| Conclusion (bilan qui répond à la problématique, ouverture) | 2 à 3 |
| Expression, orthographe, présentation | 1 à 2 |

### Commentaire de document (sur 20, indicatif)

| Critère | Points indicatifs |
|---|---|
| Présentation du document (nature, auteur, date, contexte, idée générale) | 3 à 4 |
| Explication des idées du document | 6 à 8 |
| Apport de connaissances personnelles | 3 à 4 |
| Portée et critique | 2 à 3 |
| Conclusion, expression, présentation | 1 à 2 |

### Croquis (si noté à part, indicatif)

La légende organisée, les figurés justes, la nomenclature et le titre, puis le soin sont les critères habituels. **Aucune répartition chiffrée ne doit être affirmée.**

### Ce qui fait perdre le plus de points

- **Hors-sujet**, ou bornes chronologiques et spatiales non respectées.
- **Pas de problématique ni de plan** : un catalogue de faits.
- **Paraphrase** en commentaire, ou au contraire **récitation** du cours sans le document.
- **Erreurs factuelles** : dates, acteurs, pays confondus. Faits **datés** aussi : organisations dont un pays est sorti, chiffres périmés.
- **Copie inachevée**, sans conclusion.
- **Consigne APC oubliée**, ou réponse sans justification.
- **Croquis ou graphique** sans titre, sans légende ou sans unités, ou avec une échelle fausse.
- **Expression** très fautive, ou illisibilité.

## 5. Les erreurs les plus fréquentes des élèves et comment les éviter

| Erreur | Comment l'éviter |
|---|---|
| Se lancer sans analyser le sujet | Souligner et définir les mots clés, délimiter l'espace et la période |
| Problématique qui répète le sujet | Chercher la tension ; formuler avec « comment » ou « dans quelle mesure » |
| Introduction incomplète | Vérifier les 4 éléments : amorce, définitions et cadre, problématique, annonce du plan |
| Parties déséquilibrées | Plan détaillé au brouillon, temps réparti à l'avance |
| Exemples vagues (« beaucoup de pays ») | Au moins un fait daté et localisé par idée |
| Paraphrase | Après chaque citation, se demander : « Qu'est-ce que je sais d'autre là-dessus ? » |
| Oublier l'auteur et le contexte | Toujours présenter nature, auteur, date, contexte, destinataire |
| Confondre décolonisation et indépendance, guerre froide et coexistence pacifique, CEDEAO et UEMOA | Un lexique de notions, et savoir quels pays appartiennent à quelle organisation |
| Utiliser des faits dépassés (exemple : le Mali « membre de la CEDEAO » en 2025) | Dater ses faits, vérifier dans le manuel ou les actualités récentes |
| Croquis surchargé ou légende en vrac | Pas plus de 8 à 12 éléments, une légende en 2 ou 3 parties titrées |
| Graphique faux (axe du temps irrégulier, total du cercle ≠ 360°) | Vérifier les intervalles et refaire le calcul des angles |
| Rédiger toute la dissertation au brouillon | Au brouillon : l'introduction (et la conclusion) en entier, le reste en plan détaillé |
| Mal choisir son sujet | En 3 minutes, lister ses connaissances pour chaque sujet avant de choisir |

## 6. Les différences entre pays

> **Cette section n'a pas pu être vérifiée en ligne.** Les noms d'organismes, les séries et les formats viennent de connaissances générales et peuvent avoir changé : réformes, changements de ministère, transitions politiques. **Aucune durée et aucun coefficient ne sont donnés, faute de vérification.**

| Pays | Organismes (à confirmer) | Séries de BAC (usage courant) | Points d'attention |
|---|---|---|---|
| **Sénégal** | BFEM : Direction des examens et concours (DEXCO). BAC : Office du Baccalauréat (rattaché à l'UCAD) | L (L1, L2, L'…), S (S1 à S5), G, T | Au BAC, on observe fréquemment un choix entre plusieurs sujets, d'histoire et de géographie (dissertation, commentaire) **[nombre et répartition à vérifier]**. Place du croquis au BAC **non vérifiée** |
| **Côte d'Ivoire** | DECO (Direction des examens et concours) | A1, A2, C, D, séries techniques | APC. Éducation civique sous le nom d'EDHC. Format exact des sujets de BEPC et de BAC **[à vérifier]** |
| **Mali** | DEF, puis BAC ; organisme probable : CNECE (Centre national des examens et concours de l'éducation) **[à vérifier]** | TLL, TAL, TSS, TSECO, TSE, TSEXP | Sortie de la CEDEAO (effective en 2025) et AES : les contenus d'actualité ont pu changer **[programme à vérifier]** |
| **Burkina Faso** | BEPC : direction des examens du ministère. BAC : Office du Baccalauréat **[rattachement actuel à vérifier]** | A4, C, D, E, séries techniques | Même remarque que pour le Mali sur l'AES et la CEDEAO |
| **Guinée** | Organisme national des examens du ministère de l'enseignement pré-universitaire **[nom exact à vérifier]** | Sciences sociales (SS), sciences mathématiques (SM), sciences expérimentales (SE) | **Pas membre de l'UEMOA**, monnaie : franc guinéen. Le 2 octobre 1958 est un repère national central. Poids de l'histoire-géographie en SS **[à vérifier]** |
| **Bénin** | BEPC : direction des examens du ministère. BAC : Office du Baccalauréat | A1, A2, B, C, D, E, F, G | APC : situations d'évaluation (contexte, supports, tâches) **[format exact à vérifier]** |
| **Togo** | BEPC : DECC. BAC : Office du Baccalauréat | A4, C, D, E, F, G | Historiquement BAC I (en première) et BAC II (en terminale). **Maintien actuel du BAC I à vérifier** : demander à l'élève de quel examen il s'agit |
| **Niger** | BEPC : ministère. BAC : organisme rattaché à l'université Abdou Moumouni ou au ministère **[à vérifier]** | A, C, D | Même remarque que pour le Mali sur l'AES et la CEDEAO. Formats **[à vérifier]** |

**Contenus communs probables.** Seconde Guerre mondiale et ses conséquences, guerre froide, décolonisation (Asie, Afrique), Tiers-monde et non-alignement, unité africaine, mondialisation, puissances mondiales, développement. S'y ajoute un volet national et régional, à adapter au pays :
- **organisations** : l'UEMOA compte 8 membres (Bénin, Burkina Faso, Côte d'Ivoire, Guinée-Bissau, Mali, Niger, Sénégal, Togo) ; pour la CEDEAO, tenir compte du retrait des pays de l'AES ;
- **repères** : conférence de Brazzaville (1944), RDA (Bamako, 1946), loi-cadre Defferre (1956), Communauté (1958), Bandung (1955), OUA (1963), Union africaine (2002), CEDEAO (1975), UEMOA (1994).

**Règle pratique pour l'IA.** Si le pays ou la série ne sont pas connus, appliquer le tronc méthodologique commun. Ne jamais affirmer une durée, un coefficient, un barème ou une structure d'épreuve nationale sans source.

## 7. Comment bien EXPLIQUER cette matière à un élève

> Aucune chaîne YouTube ni aucun site de professeur n'a pu être consulté : youtube.com est bloqué par le proxy. Les techniques ci-dessous sont des pratiques pédagogiques courantes. **Elles ne sont attribuées à aucune chaîne.**

1. **Commencer par le sujet, pas par le cours** : « Qu'est-ce qu'on te demande exactement ? » Faire souligner les mots clés.
2. **Analogies** :
   - la dissertation est un **procès** : la problématique est la question posée au tribunal, les parties sont les plaidoiries, les exemples sont les preuves, la conclusion est le verdict ;
   - l'introduction est un **entonnoir** ;
   - la légende du croquis est le **plan dessiné**.
3. **Le paragraphe argumenté** : idée, explication, exemple, lien avec le sujet. Le montrer sur un exemple, puis le faire produire à l'élève.
4. **Toujours la même routine** : analyse, connaissances, problématique, plan, introduction, développement, conclusion, relecture.
5. **Ancrer dans le pays de l'élève** : exemples nationaux exacts. Pour la Guinée : 1958. Pour le Sénégal : la Fédération du Mali. Pour la Côte d'Ivoire : le RDA et Houphouët-Boigny. En géographie : fleuve Sénégal, delta intérieur du Niger, port autonome d'Abidjan, port de Lomé, corridors Abidjan-Ouagadougou ou Dakar-Bamako.
6. **Frises et cartes mentales** : une frise pour les périodes, une carte mentale pour une notion (puissance : économique, militaire, diplomatique, culturelle).
7. **Corriger sur une production réelle**, une amélioration à la fois : d'abord la problématique, ensuite les exemples, puis les transitions.
8. **Méthode « je fais, nous faisons, tu fais »** : un modèle commenté, puis une production guidée, puis une production autonome.
9. **Vérification par l'élève** : une check-list (section 8) et une question de contrôle (« Ta partie II répond-elle à ta problématique ? »).
10. **Gestion du temps** : un minutage proportionnel à la durée réelle de l'épreuve, à demander à l'élève. Environ 20 à 25 % pour le brouillon, environ 65 % pour la rédaction, environ 10 % pour la relecture.

## 8. Règles à donner à une IA qui corrige et explique des exercices de cette matière

1. **Identifier d'abord** le type d'exercice (dissertation, commentaire libre ou guidé, situation d'évaluation APC, croquis ou carte, graphique, questions de cours), le **niveau**, le **pays** et la **série**. Si une information manque et qu'elle change la réponse, la demander. Sinon, appliquer la méthode commune et dire qu'on le fait.
2. **Ne jamais rédiger d'emblée toute la copie.** Guider étape par étape : analyse, problématique, plan, puis introduction modèle. Ne rédiger un développement complet que si l'élève le demande explicitement, en le présentant comme un **modèle à étudier**, avec explication de chaque choix. Ensuite, faire réécrire à l'élève une partie avec ses mots.
3. **Analyser le sujet** : termes définis, bornes justifiées, type de sujet repéré.
4. **Proposer une problématique** sous forme de question, et un plan en 2 ou 3 parties, avec le type de plan justifié.
5. **Commentaire** : présentation obligatoire (nature, auteur, date, contexte, destinataire, idée générale), allers-retours entre citation, explication et connaissances, puis portée et limites. Interdire la paraphrase.
6. **Situation APC** : traiter chaque consigne dans l'ordre et numérotée, appuyée sur le support et sur une connaissance.
7. **Croquis** : donner une légende en parties titrées, avec pour chaque élément le type de figuré (surface, point, ligne ou flèche) et la couleur. Rappeler le titre, la nomenclature et l'orientation. Ne pas prétendre dessiner : décrire quoi tracer et où.
8. **Exactitude factuelle stricte** : ne donner que des dates, chiffres et acteurs certains, avec leur unité et leur année. En cas de doute : « à vérifier dans ton manuel ». **Dater l'actualité** (AES, CEDEAO, chiffres de population ou de PIB) et signaler qu'elle évolue.
9. **Ne jamais inventer** un barème, une durée, un coefficient, une structure d'épreuve, une citation, un auteur ou le contenu d'un document ou d'une vidéo. Les barèmes donnés sont toujours **indicatifs**.
10. **Ne pas importer le programme français** : croquis de synthèse obligatoire, thèmes du lycée français, « réponse organisée ». Ne le faire que si l'élève indique que c'est son format.
11. **Corriger avec bienveillance et précision** : ce qui rapporte, ce qui fait perdre des points, et une estimation de note **par critère** présentée comme indicative.
12. **Registre de copie** : français soigné, pas d'abréviations, pas de titres apparents, sauf si le professeur de l'élève les exige.
13. **Sujets sensibles** (colonisation, coups d'État récents, conflits) : rester factuel et nuancé, présenter les points de vue, ne pas prendre parti politiquement.
14. **Document illisible ou partiel** : le dire et demander la partie manquante, sans deviner.
15. **Terminer par une check-list** :
    - sujet et bornes respectés ?
    - problématique posée et reprise en conclusion ?
    - un exemple précis par paragraphe ?
    - transitions présentes ?
    - pour un croquis ou un graphique : titre, légende, unités, nomenclature ?

## 9. Sources (URL)

**Aucune source n'a pu être lue pendant cette session** : le quota de recherche était épuisé et le proxy a refusé l'accès aux domaines testés. Les adresses ci-dessous sont **à consulter en priorité** lors d'une passe de vérification. **Aucune affirmation du guide ne s'appuie sur elles.**

- Office du Baccalauréat du Sénégal : https://officedubac.sn (ENOTFOUND pendant cette session)
- Fomesoutra, sujets et corrigés pour la Côte d'Ivoire : https://www.fomesoutra.com (403 au proxy)
- Sunudaara, ressources pour le Sénégal : https://sunudaara.com (403 au proxy)
- Wikipédia, pages « Baccalauréat au Sénégal », « Brevet de fin d'études moyennes », « BEPC » : https://fr.wikipedia.org (403 au proxy)
- Sunubac (Sénégal) : https://www.sunubac.com (non consulté)
- Éduscol, cadre méthodologique en France, utile seulement à titre de comparaison : https://eduscol.education.fr (non consulté)
- Ministères de l'Éducation et offices du BAC de Côte d'Ivoire, du Mali (CNECE), du Burkina Faso, de la Guinée, du Bénin, du Togo et du Niger : **domaines à identifier**, non consultés
- YouTube, chaînes de professeurs d'histoire-géographie africains : https://www.youtube.com (403 au proxy)

**Nombre de recherches effectuées : 0 aboutie.** 3 recherches web ont été lancées, toutes refusées (quota de 200 de la session épuisé). 4 consultations ont échoué : fr.wikipedia.org deux fois, officedubac.sn, plus un test curl. L'objectif de 30 à 50 recherches n'est **pas atteint**.

## 10. Points encore incertains (à faire valider par un professeur)

1. **Structure des épreuves d'histoire-géographie par pays et par niveau** : nombre de sujets au choix, part de l'histoire et de la géographie, commentaire libre ou guidé, présence du croquis au BAC.
2. **Durées et coefficients par série** : non vérifiés pour tous les pays.
3. **Barèmes officiels de correction** : la répartition introduction environ 4 / développement environ 12 / conclusion environ 2 / présentation environ 2 est une hypothèse à confirmer sur des corrigés officiels.
4. **Format APC au BEPC et au BAC** au Bénin et en Côte d'Ivoire (vocabulaire exact : contexte, support, consigne, tâche), et son éventuelle présence dans d'autres pays.
5. **Noms et rattachements actuels des organismes** : CNECE au Mali, office du BAC au Burkina Faso et au Niger, organisme guinéen, DECC au Togo.
6. **Togo** : le BAC I est-il toujours en vigueur ?
7. **Programmes de terminale après les réformes récentes** (notamment au Mali, au Burkina Faso et au Niger depuis la création de l'AES), et intitulés exacts de l'éducation civique dans chaque pays.
8. **Titres apparents dans la dissertation** : quelle est la consigne réelle des correcteurs dans chaque pays ?
9. **Chiffres d'actualité** (population, PIB, IDH) : à prendre dans le manuel national ou dans une source officielle récente, jamais de mémoire.
10. **Techniques de chaînes YouTube de professeurs africains** : non identifiées, à documenter lors d'une session avec accès au web.