# Guide de correction SVT (Sciences de la vie et de la Terre) pour Révizo

> **Méthode et limites de cette révision (à lire d'abord).**
> - **Aucune des 30 à 50 recherches demandées n'a pu être faite.** Le quota de recherches web de la session était épuisé avant cette étape : mes 3 recherches ont été refusées. Les 5 ouvertures directes de pages ont échoué : erreur DNS sur officedubac.sn, burkina24.com, officedubacbenin.bj et epreuvesetcorriges.com. Un test curl a été refusé par le proxy (403).
> - **Nombre de recherches réellement effectuées dans cette révision : 0.**
> - Les URL de la section 9 viennent du brouillon. Le brouillon s'appuyait lui-même sur des extraits de moteur de recherche, pas sur des pages lues. **Je n'ai pas pu les relire.**
> - Les corrections ci-dessous portent sur ce qui se vérifie par le cours de SVT lui-même (génétique, physiologie). Elles sont signalées « (cours) ». Les données propres à chaque pays (durées, coefficients, barèmes) restent **non vérifiées** et sont marquées comme telles.
>
> **Principales corrections apportées au brouillon :**
> 1. Une F1 de phénotype intermédiaire relève de la **dominance incomplète**, pas de la codominance au sens strict. La codominance, c'est quand les deux phénotypes s'expriment ensemble, comme dans le groupe AB.
> 2. Les proportions 9/3/3/1 supposent deux gènes indépendants **avec dominance complète** pour les deux.
> 3. La règle « moins de 50 % de recombinés, donc gènes liés » et la lecture « parentaux majoritaires » valent pour un **test-cross**, pas pour une F2.
> 4. La règle décisive pour un gène dominant lié à l'X n'est pas « il touche surtout les femmes ». C'est : **un père atteint transmet le caractère à toutes ses filles**.
> 5. Ajout de l'exception du **ver à soie (Bombyx)**. Chez lui, c'est la femelle qui ne fait pas de crossing-over.
> 6. Ajout d'un piège classique de probabilité : un enfant **sain** de deux parents hétérozygotes a une probabilité de 2/3 d'être porteur, pas 1/2.
> 7. Ajout des types d'exercices qui manquaient : construction de graphique, méiose et caryotype, enregistrements électrophysiologiques, myogramme, cycles sexuels, immunodiffusion et agglutination, chronologie relative en géologie.
> 8. Les règles pour l'IA sont durcies : ne pas faire le devoir à la place de l'élève, ne jamais inventer de données et vérifier l'ordre de grandeur des résultats.

---

## 1. Ce que les correcteurs attendent

### 1.1 Brevet (BFEM Sénégal, BEPC Côte d'Ivoire, Burkina, Bénin, Togo, Niger, Guinée, DEF Mali)

- **Sénégal (BFEM) :**
  - Le brouillon indique un coefficient 2 (arrêté n° 018359 du 5 mai 2021, cité par [sencampus](https://www.sencampus.com/dossiers/le-bfem-et-apres/le-bfem-comment-ca-marche)) et une durée de 1 h 30 d'après un corrigé 2025. Un fascicule ancien donne 1 h. **Confirmé (1 h 30, coef. 2) par le corrigé officiel du BFEM 2021, voir 11.1.**
  - Structure rapportée : « maîtrise des connaissances » (environ 5 pts) et « compétences méthodologiques » (environ 14 pts). Thèmes 2025 cités : anticorps et tectonique ([Scribd](https://www.scribd.com/document/893314653/BFEM-2025-SVT-Corrige-G1-Normale)). **Structure confirmée par le corrigé officiel 2021 : 5 + 7 + 7 points, plus 1 point de présentation (voir 11.1).**
- **Bénin (BEPC) :** d'après le brouillon, le corrigé officiel 2025 est organisé autour de trois compétences ([epreuvesetcorriges](https://epreuvesetcorriges.com/categories/benin/examens/bepc/39854-corrige-officiel-epreuve-de-svt-bepc-2025-benin)) :
  - restituer des connaissances ;
  - résoudre un problème à partir de documents ;
  - présenter une production argumentée.
- **Côte d'Ivoire (BEPC) :** sujets publiés par zone, exercices de 6 à 8 pts sur le sang, la reproduction, les sols ou les groupes sanguins ([fomesoutra](https://www.fomesoutra.com/bepc/banque-de-sujets-du-bepc-cote-divoire/21558-bepc-2025-sujets-et-corriges-zone-1-2-3-svt-cote-divoire-by-tehua)).
- **Mali (DEF) :** la matière apparaît sous le nom « Sciences naturelles » ([epreuvesetcorriges](https://epreuvesetcorriges.com/categories/mali/examens/def)). Aucun corrigé officiel n'a été trouvé.
- **Burkina, Togo, Niger, Guinée :** aucune donnée vérifiée sur le format du brevet en SVT.

**Attentes communes au brevet** (pédagogie générale, à confirmer selon le pays) :
- respecter le verbe de consigne ;
- lire un document en relevant des valeurs avec leur unité ;
- utiliser le vocabulaire de base exact ;
- faire un schéma propre, titré et légendé ;
- rédiger des réponses courtes, en phrases complètes.

Thèmes typiques : nutrition et digestion, respiration, circulation et sang, reproduction et santé reproductive, immunité, sol et environnement, géologie simple (séismes, volcans, tectonique).

### 1.2 BAC

**Sénégal.** C'est le modèle le mieux documenté, par les corrigés officiels cités dans le brouillon (non relus ici). L'épreuve compte trois blocs :

1. **Maîtrise des connaissances (MC).** Un exposé structuré (introduction, développement, conclusion), souvent illustré par un schéma. Il vaut environ 5 pts en S2 et 4 pts en S1 (2024) ([corrigé S2 2023](https://officedubac.sn/wp-content/uploads/2025/02/CORRIGE-SVT-S2-1ER-2023.pdf), [corrigé S2 2025](https://officedubac.sn/wp-content/uploads/2025/07/Corrige-SVT-S2-2025.pdf), [sujet S1 2024](https://officedubac.sn/wp-content/uploads/2024/07/SVT-S1-1ER-GR-.pdf)).
2. **Compétences méthodologiques (CM).** Des exercices à documents, d'environ 13 pts en S2 (par exemple 6 + 7) et 14 pts en S1. Le correcteur attend dans l'ordre :
   - analyse ;
   - interprétation ;
   - déduction ;
   - hypothèse ;
   - calcul ;
   - schéma de synthèse.
3. **Communication : 2 pts.** Ils se répartissent en plan de la MC (1 pt), expression (0,5 pt) et présentation (0,5 pt).

Une vidéo intitulée « Correction épreuve APC SVT BAC S2 2025 Sénégal » existe ([YouTube](https://www.youtube.com/watch?v=rNpGZ1IcoHo)). **On ne sait pas si le format sénégalais a changé en 2025** : à faire confirmer.

**Autres pays (séries D, SExp, SE).** Ce sont surtout des exercices à documents ou des « situations » relevant de l'approche par compétences (APC). La génétique et l'immunologie y sont quasi constantes. Deux exemples rapportés par le brouillon, non relus :
- au Burkina, les annales 2020 indiquent un exercice de génétique et un d'immunologie obligatoires ([Burkina24](https://burkina24.com/wp-content/uploads/2020/07/annales_svt_tle_d.pdf)) ;
- au Bénin, le BAC D 2025 comporte trois situations : neurophysiologie, VIH et thérapie génique ([epreuvesetcorriges](https://epreuvesetcorriges.com/categories/benin/examens/bac/39874-corrige-type-baccalaureat-2025-sciences-de-la-vie-et-de-la-terre-serie-d-benin)).

**Séries littéraires (Sénégal L2).** Épreuve de 3 h, coefficient 2 selon les en-têtes cités ([sujet L2 2024](https://officedubac.sn/wp-content/uploads/2024/07/SVT-L2-1ER-GR.pdf), [corrigé L2 2025](https://officedubac.sn/wp-content/uploads/2025/07/Corrige-SVT-L2-1er-groupe-1.pdf)). Thèmes : diabète, groupes sanguins, mémoire immunitaire, pression artérielle. La génétique formelle y est plus légère. Le format MC/CM/communication **n'est pas confirmé** pour cette série.

**Attentes transversales des correcteurs** (cours et méthode) :
- chaque affirmation est appuyée sur un document ou sur une connaissance ;
- les valeurs sont chiffrées avec leur unité ;
- l'élève conclut toujours ;
- le vocabulaire est exact ;
- les schémas sont titrés et légendés ;
- la réponse traite le problème posé, pas « tout le cours ».

---

## 2. Types d'exercices fréquents et méthode pas à pas

### 2.1 Exposé de restitution (MC, ROC)

1. **Analyser le sujet.** Souligner les mots-clés, délimiter ce qui est demandé et ce qui est hors sujet, puis formuler le problème ([Alveus Club](https://www.alveusclub.com/revisions-notions/svt-restitution-organisee-de-connaissances/)).
2. **Brouillon.** Noter les mots-clés du cours, puis les regrouper en 2 ou 3 parties logiques : chronologiques, ou du niveau de l'organe au niveau moléculaire.
3. **Introduction.** Elle contient trois éléments, chacun valant souvent environ 0,25 pt d'après le corrigé L2 2024 ([corrigé L2 2024](https://officedubac.sn/wp-content/uploads/2024/07/Corrige-svt-l2-1er-gr_V.pdf)) :
   - situer le thème ;
   - poser le problème ;
   - annoncer le plan.
4. **Développement.** Des parties titrées (I, II, III), des phrases complètes et les termes du programme. Le schéma est placé à l'endroit où il sert.
5. **Schéma.** Souvent noté à part, de 1 à 1,5 pt. Il porte un titre, des légendes et des flèches orientées.
6. **Conclusion.** Elle répond au problème, sans idée nouvelle. L'ouverture est facultative.

### 2.2 Analyse et interprétation d'un graphique ou d'un tableau

1. **Présenter le document.** « Le document 1 montre l'évolution de [grandeur, unité] en fonction de [variable, unité] chez… »
2. **Analyser (décrire).** Découper en phases et relever les valeurs remarquables : début, fin, maximum, minimum, changement de pente. Parler de la grandeur, jamais de « la courbe » ([sunudaara](https://www.sunudaara.com/svt/m%C3%A9thodologie-danalyse-et-dinterpr%C3%A9tation-dun-graphique-de-svt-savoir-faire-ts)).
3. **Comparer.** Avec plusieurs courbes ou lots, on compare au témoin, valeurs à l'appui.
4. **Interpréter.** Expliquer avec le cours : « Cette augmentation s'explique par… ».
5. **Conclure.** « On en déduit que… ».

Exemple de formulation officielle rapportée par le brouillon (corrigé S2 2024, non relu) :
> « On constate que la glycémie et l'insulinémie des sujets obèses diabétiques sont largement plus importantes que celles des sujets sains. On en conclut que le diabète de type 2 n'est pas dû à un déficit de production d'insuline. »

([corrigé S2 2024](https://officedubac.sn/wp-content/uploads/2024/07/svt-s2-1er-gr-corrige_V.pdf))

### 2.3 Construction d'un graphique à partir d'un tableau (absent du brouillon)

1. Choisir les axes : la variable en abscisse, la grandeur mesurée en ordonnée.
2. Choisir une échelle régulière, indiquée sur les axes.
3. Écrire le nom de chaque axe avec son unité.
4. Placer les points au crayon.
5. Relier les points (ou tracer un histogramme si la variable est qualitative).
6. Donner un titre : « Évolution de … en fonction de … ».
7. Ajouter une légende s'il y a plusieurs courbes.

Ce type d'exercice est connu des méthodes de collège et de lycée ([fiche Claudel Vauréal](https://lyc-claudel-vaureal.ac-versailles.fr/IMG/pdf/Construction_et_analyse_d_une_courbe.pdf)). **Sa fréquence aux examens africains n'est pas vérifiée.**

### 2.4 Exploitation de résultats expérimentaux (physiologie, immunologie)

1. Identifier le problème posé.
2. Repérer le **témoin**, le **facteur variable** et ce qui est **mesuré**.
3. Pour chaque expérience, écrire un constat, puis une interprétation, puis une déduction.
4. Relier les déductions entre elles pour bâtir un mécanisme (cause, puis conséquence).
5. Faire une synthèse, souvent sous forme de schéma fonctionnel.

**Calculs (cas du sujet S2 2025, grand brûlé).** D'après le brouillon, l'exercice demandait le volume de plasma filtré en 24 h, le pourcentage d'eau réabsorbée et la quantité éliminée (1,5 pt). Il demandait ensuite d'expliquer la régulation par l'ADH (4,5 pts), puis un schéma de synthèse (1 pt) ([sujet](https://officedubac.sn/wp-content/uploads/2025/07/Sujet-SVT-S2-2025.pdf), [corrigé](https://officedubac.sn/wp-content/uploads/2025/07/Corrige-SVT-S2-2025.pdf)).

Ordres de grandeur pour contrôler un résultat (cours, valeurs usuelles) :
- environ 180 L de plasma filtrés par jour ;
- environ 1,5 L d'urine ;
- donc plus de 99 % de l'eau filtrée est réabsorbée.

Un résultat très éloigné de ces valeurs doit faire revérifier le calcul ou les données de l'énoncé.

**Thèmes récurrents** (d'après les annales citées) :
- immunité innée et adaptative ;
- VIH (cible : les LT4) ;
- mémoire immunitaire ;
- coopération entre LT4, LT8 (LTc) et LB ;
- glycémie, pression artérielle, rein ;
- réflexe myotatique ;
- synapse ;
- muscle ;
- cycles sexuels.

### 2.5 Enregistrements électrophysiologiques et myogrammes (absent du brouillon)

1. Identifier le montage : où se trouvent l'électrode de stimulation, l'électrode réceptrice et l'électrode de référence.
2. Lire les deux axes : mV et ms.
3. Relever le potentiel de repos (environ −70 mV, cours) et l'amplitude du potentiel d'action.
4. Repérer la loi du tout ou rien pour une fibre isolée, et le recrutement pour un nerf entier.
5. À la synapse : distinguer PPSE (dépolarisation) et PPSI (hyperpolarisation), et la sommation spatiale ou temporelle.
6. Pour un myogramme, distinguer :
   - la secousse isolée et ses phases (latence, contraction, relâchement) ;
   - la fusion incomplète, puis le tétanos parfait.

### 2.6 Génétique formelle (mono- et dihybridisme)

([Oasis SVT](http://diopsvt.blogspot.com/2011/04/methodologie-genetique-en-ts.html), [académie de Strasbourg](https://svt.site.ac-strasbourg.fr/au-lycee/terminale-s/item/217-des-exercices-de-soutien-en-genetique), et cours)

1. **Nombre de gènes et caractères étudiés.**
2. **F1.**
   - Les parents sont généralement donnés comme de lignée pure. La F1 est alors homogène (uniformité des hybrides de 1re génération).
   - Si la F1 ressemble à l'un des parents, l'allèle de ce parent est **dominant**.
   - Si la F1 est **intermédiaire**, on parle de **dominance incomplète**.
   - Si les deux caractères s'expriment ensemble, comme dans le groupe AB, c'est de la **codominance**.
   - Attention : certains manuels africains appellent « codominance » tout phénotype intermédiaire. L'élève adopte le terme de son cours.
3. **Notation.**
   - Phénotypes entre crochets : [L].
   - Génotypes en écriture chromosomique : L/l pour un gène. Pour deux gènes liés, on écrit L n / l v (« L n sur l v »). Pour deux gènes indépendants, on écrit deux fractions : L/l N/n.
4. **Comparer l'observé au théorique.**
   - **Test-cross** : croisement avec un homozygote récessif. Le **back-cross**, lui, est un croisement avec l'un des parents.
     - Gènes indépendants : 4 phénotypes à 25 % chacun.
     - Liaison totale : 2 phénotypes parentaux, à 50 % chacun.
     - Liaison partielle : 4 phénotypes, parentaux majoritaires, recombinés à moins de 50 %.
   - **F2** : 9/16, 3/16, 3/16, 1/16 seulement pour deux gènes indépendants **à dominance complète**. Toute autre proportion (dominance incomplète, gène létal, liaison) se recalcule à l'échiquier.
5. **Interprétation chromosomique.** Écrire les gamètes avec leurs proportions, puis l'échiquier, puis les résultats théoriques, et les confronter aux résultats observés.
6. **Exceptions à connaître** (cours) :
   - le **mâle de drosophile** ne fait pas de crossing-over : il produit seulement des gamètes parentaux. Le corrigé S2 2025 l'utilise, d'après le brouillon ;
   - chez le **ver à soie**, c'est la **femelle** qui n'en fait pas.
7. **Carte factorielle.** 1 % de recombinés = 1 cM. L'approximation est fiable pour des gènes proches ; les doubles crossing-over font sous-estimer les grandes distances. Pour trois gènes, l'ordre se déduit en additionnant les distances.
   - Exemple cité par le brouillon : carte génétique de la drosophile au Togo en 2025 ([epreuvesetcorriges](https://epreuvesetcorriges.com/categories/togo/examens/bac)).
8. **Brassages.** Le brassage interchromosomique a lieu en anaphase I ; le brassage intrachromosomique, par crossing-over, en prophase I.

Le **test du χ²** n'est pas exigé dans les sujets cités. **À confirmer selon le pays** : l'IA ne doit pas l'imposer.

### 2.7 Hérédité humaine (pedigree)

1. **Dominant ou récessif ?**
   - Deux parents sains ont un enfant atteint : l'allèle est **récessif**.
   - Deux parents atteints ont un enfant sain : l'allèle est **dominant**.
2. **Localisation du gène :**
   - **Y** : seuls des hommes sont atteints, et un père atteint transmet à tous ses fils. Une seule fille atteinte suffit à exclure le Y.
   - **X récessif** : une fille atteinte a forcément un père atteint. Un fils atteint d'une mère saine implique que la mère est conductrice.
   - **X dominant** : un père atteint transmet à **toutes** ses filles et à aucun de ses fils. Un seul contre-exemple suffit à rejeter cette hypothèse.
   - Sinon, le gène est **autosomal**.
3. **Rejeter une hypothèse en nommant l'individu qui la contredit.** Exemple : « II-3 est une fille atteinte dont le père I-1 est sain : l'hypothèse X récessif est rejetée. »
4. **Génotypes, puis probabilités.**
   - On multiplie les probabilités des événements indépendants.
   - **Piège :** un enfant **sain** de deux parents hétérozygotes a 2/3 de chances d'être hétérozygote, pas 1/2 (cours).

Sources méthodologiques : [sunudaara](https://www.sunudaara.com/svt/h%C3%A9r%C3%A9dit%C3%A9-humaine-ts2), [Orbitech](https://orbitech-ai-academy.fr/blog/svt/exercices/genetique-humaine-arbres-genealogiques-et-heredite-svt-termi), [NéoSVT](https://neosvt.com/heredite-humaine-2bac-svt/). NéoSVT suit le programme marocain : il sert pour la méthode, pas pour le format d'examen.

**Variantes fréquentes :**
- groupes sanguins ABO et Rhésus (codominance de A et B, récessivité de O) ;
- électrophorèse de l'hémoglobine ou d'ADN, utilisée pour trouver les génotypes, par exemple pour la drépanocytose ;
- caryotypes : trisomie, monosomie, non-disjonction.

### 2.8 Méiose, mitose, caryotype, quantité d'ADN (absent du brouillon)

1. Identifier la cellule : nombre de chromosomes, présence de paires d'homologues, notation 2n ou n.
2. Nommer la phase d'après des critères visibles : alignement des chromosomes, séparation des homologues ou des chromatides.
3. Lire la courbe de quantité d'ADN :
   - réplication en phase S ;
   - division par 2 après la mitose ;
   - deux divisions successives (2Q, puis Q, puis Q/2) en méiose.

### 2.9 Reproduction et régulation hormonale (absent du brouillon)

1. Mettre en relation les courbes d'hormones (FSH, LH, œstradiol, progestérone) avec les événements de l'ovaire et de l'utérus.
2. Identifier les rétrocontrôles : négatif dans l'ensemble, positif avant le pic de LH.
3. Exploiter les expériences d'ablation, de greffe ou d'injection en comparant au témoin.

Ce thème est cité pour le Sénégal (relations ovaire-utérus, S1 2024) et le Togo (axe hypothalamo-hypophysaire, 2025), d'après le brouillon.

### 2.10 Immunologie : techniques de laboratoire (absent du brouillon)

- **Agglutination (groupes sanguins)** : une agglutination indique la présence de l'antigène correspondant à l'anticorps du réactif.
- **Immunodiffusion (Ouchterlony)** : un arc de précipitation indique une réaction antigène-anticorps spécifique.
- **Transfert de lymphocytes ou de sérum** entre animaux : on distingue l'immunité à médiation humorale (sérum, anticorps) de l'immunité à médiation cellulaire (cellules, LTc).

### 2.11 QCM, appariement, texte à trous, vrai/faux

Ces formats sont présents notamment au Mali (QCM en 1re partie du BAC TSExp 2023, [BKalan](https://bkalan.ml/api/files/biologie/12-SCIENCES-EXPERIMENTALES-TSEXP/BAC/BK_BAC-BIO-TSExp-2023.pdf)) et dans les supports APC ivoiriens ([DPFC](https://dpfc-ci.net/wp-content/uploads/dpfc_fichiers/2019-2020/psgouv2019/Modules%20du%20secondaire_Contractuels%202019/Modules%20contractuels_SVT/Supports%20SVT.pdf)).

Méthode :
- lire chaque proposition en entier ;
- éliminer les fausses avec un argument du cours ;
- respecter le format de réponse demandé (« 1-b ; 2-d ») ;
- corriger l'affirmation fausse si la consigne le demande.

### 2.12 Situation d'évaluation APC (Côte d'Ivoire, Bénin, Togo, et peut-être Sénégal)

Le sujet donne un **contexte** puis 3 ou 4 **consignes** hiérarchisées ([DPFC](https://dpfc-ci.net/wp-content/uploads/dpfc_fichiers/2019-2020/psgouv2019/Modules%20du%20secondaire_Contractuels%202019/Modules%20contractuels_SVT/Supports%20SVT.pdf), [AUF](https://apprendre.auf.org/wp-content/uploads/2021/08/9-Module-Outils-pe%CC%81dagogiques-et-strate%CC%81gies-de%CC%81valuation-selon-lAPC-en-Cote-dIvoire.pdf)).

1. Reformuler le problème du personnage.
2. Traiter les consignes dans l'ordre : identifier, puis analyser, puis expliquer, puis argumenter ou proposer.
3. Finir par une réponse explicite à la situation : conseil, diagnostic, décision.

### 2.13 Géologie

La géologie pèse davantage au Mali (TSE, « géologie du Mali ») et en Guinée (« Biologie-Géologie ») ([Scribd, bac blanc TSE](https://fr.scribd.com/document/862803000/Bac-blanc-SVT-TSE-Kodonso-Copie), [exam224](https://exam224.com/sujets/show/bac-se-biologie-geologie-2020)).

Méthode de **chronologie relative** (cours) :
1. Appliquer les principes de superposition, de continuité, de recoupement (la structure qui recoupe est la plus récente) et d'inclusion (les morceaux inclus sont plus anciens que la roche qui les contient).
2. Utiliser les fossiles stratigraphiques.
3. Rédiger la succession des événements, du plus ancien au plus récent.

Le même chapitre comprend aussi :
- la lecture de cartes et de coupes ;
- la reconnaissance de roches : sédimentaires, magmatiques, métamorphiques.

---

## 3. Rédaction et présentation attendues

**Phrases types :**
- Présentation : « Le document X présente l'évolution de … (unité) en fonction de … ».
- Analyse : « De t0 à t1, … augmente de … à … ».
- Déduction : « On constate que … ; or … (connaissance) ; donc … ».
- Hypothèse : « On peut émettre l'hypothèse que … ».
- Génétique : « Les parents étant de lignée pure, la F1 est homogène ; elle présente le phénotype [L], donc l'allèle L est dominant sur l'allèle l ».

**Unités et calculs :**
- toujours écrire la valeur avec son unité : g/L, mV, ms, %, UA ;
- pour un calcul, écrire la formule, puis l'application numérique, puis le résultat avec son unité, puis une phrase biologique ;
- garder des chiffres significatifs cohérents avec les données.

**Justification :** « d'après le document 2… », ou bien une connaissance du cours clairement énoncée.

**Schémas** ([Breval](https://clg-nenuphars-breval.ac-versailles.fr/IMG/pdf/Fiche_methode_no6_-_realiser_un_schema.pdf), [marionsvt](https://marionsvt.fr/ress/fiches_techniques_college/fiche_technique_schema.pdf), [AlloSVT](https://www.allosvt.fr/blog/schema-svt-le-schema-fonctionnel-explique-simplement)) :
- au crayon, assez grand, avec un titre précis ;
- traits de légende à la règle, sans croisement ;
- légendes écrites en toutes lettres.

Le **schéma fonctionnel** suit un sens de lecture unique :
- stimulus, récepteur, voie afférente, centre, voie efférente, effecteur ;
- signes + et − ;
- boucle de rétrocontrôle.

Les conventions de flèches (pleines ou pointillées) varient selon les professeurs. Il faut une légende des flèches.

**Plan :** l'exposé porte des titres numérotés et visibles. Au Sénégal, le plan est noté dans la note de communication (rapporté, non relu).

**Copie :**
- numéroter les réponses comme le sujet ;
- aérer ;
- limiter les ratures ;
- écrire lisiblement.

---

## 4. Le barème

**BAC S2 Sénégal**, d'après le brouillon et les corrigés 2023 à 2025 (non relus ici) :

| Partie | Points |
|---|---|
| Maîtrise des connaissances | environ 5 (4 en S1 2024) |
| Compétences méthodologiques | environ 13 (S2) ; 14 (S1 2024) |
| Communication | 2 (plan 1, expression 0,5, présentation 0,5) |

**Granularité observée** dans le corrigé S2 2024 cité :
- chaque élément de l'introduction, chaque constat chiffré et chaque déduction valent de 0,25 à 0,5 pt ;
- un trajet nerveux décrit vaut de 0,5 à 1 pt ;
- le schéma vaut de 1 à 1,5 pt.

Conséquence pratique : **une réponse juste mais non justifiée rapporte peu.** Le correcteur cherche des éléments précis.

**Autres pays :**
- Burkina : barème par exercice (exemple des annales : 3 pts en immunologie, 7 pts en génétique) ([Burkina24](https://burkina24.com/wp-content/uploads/2020/07/annales_svt_tle_d.pdf)) ;
- Côte d'Ivoire, Bénin, Togo, Niger, Guinée, Mali : **barèmes détaillés non vérifiés.**

**Ce qui fait perdre des points** (convergence des corrigés cités et de la méthode) :
- un constat sans valeur ni unité ;
- un mélange de l'analyse et de l'interprétation quand la consigne les sépare ;
- l'absence de conclusion ;
- une affirmation non rattachée à un document ;
- l'oubli du témoin ;
- en génétique :
  - conclure sans comparer l'observé au théorique ;
  - présenter des gamètes sans proportions ;
  - utiliser une notation incorrecte ;
  - oublier l'exception de la drosophile mâle ;
- un schéma sans titre, sans légende ou avec des flèches non orientées. Le brouillon citait « perte de points immédiate » ; c'est l'avis d'un blog français ([AlloSVT](https://www.allosvt.fr/blog/schema-svt-le-schema-fonctionnel-explique-simplement)), pas un barème officiel ;
- un exposé sans plan, hors sujet ou de type « tout ce que je sais » ;
- un calcul sans démarche ou sans unité ;
- un vocabulaire inexact.

---

## 5. Erreurs fréquentes des élèves

| Erreur | Comment l'éviter |
|---|---|
| « La courbe monte puis descend » | Nommer la grandeur, découper en phases, citer les valeurs avec leurs unités |
| Confondre analyser et interpréter | Analyser : ce que je vois. Interpréter : pourquoi, avec le cours |
| Oublier le témoin | Comparer chaque lot au témoin |
| Prendre une corrélation pour une causalité | « Plus l'IMC est élevé, plus le risque augmente » : c'est un facteur de risque, pas une cause unique |
| Appeler « codominance » une F1 intermédiaire | Parler de dominance incomplète, sauf si le cours local dit autrement. La codominance, c'est l'expression simultanée (AB) |
| Appliquer 9/3/3/1 ou « < 50 % de recombinés » en F2 | Ces repères supposent des conditions précises : dominance complète pour 9/3/3/1, test-cross pour les recombinés |
| Échiquier sans proportions de gamètes | Écrire les gamètes et leurs fréquences avant de croiser |
| Oublier les exceptions de crossing-over | Drosophile mâle et femelle du ver à soie : pas de crossing-over |
| Probabilité 1/2 au lieu de 2/3 pour un enfant sain de deux parents hétérozygotes | Exclure le génotype impossible (homozygote récessif) avant de calculer |
| Confondre autosomal et lié à l'X | Tester chaque hypothèse sur un individu nommé |
| « L'ADH est sécrétée par l'hypophyse » | Elle est produite par l'hypothalamus et libérée par la posthypophyse (cours) |
| « Les LB produisent les anticorps » | Ce sont les plasmocytes, issus de la différenciation des LB |
| « L'hormone agit sur toutes les cellules » | Elle n'agit que sur les cellules cibles, porteuses de récepteurs spécifiques |
| Confondre gène et allèle, chromosome et chromatide | Revoir les définitions et les utiliser exactement |
| Exposé sans introduction ni conclusion | Ces parties sont notées séparément |
| Ne pas répondre au contexte (APC) | Finir par une phrase adressée à la situation |
| Vocabulaire familier (« le virus mange les cellules ») | Utiliser les termes : infection des LT4, réplication virale, lyse |

---

## 6. Différences entre pays

**Avertissement :** ce tableau reprend des données d'en-têtes de sujets et de sites tiers relevées par le brouillon. **Aucune n'a pu être revérifiée lors de cette révision.** Les coefficients et durées changent selon les réformes et les sessions.

| Pays | Brevet | BAC, séries avec SVT | Durée et coefficient du BAC (non vérifiés) | Format et remarques |
|---|---|---|---|---|
| **Sénégal** | BFEM ; coef 2 (arrêté 2021 cité) ; 1 h 30 ou 1 h (contradictoire) | S1/S1A, S2/S2A, L2 ; S4/S5 (techniques, non confirmé) | S2 : 4 h, coef 6 (en-têtes 2024-2025) ; S1 : 2 h, coef 2 ; L2 : 3 h, coef 2 ; 2nd groupe S2 : 2 h | MC + CM + communication ([officedubac.sn](https://officedubac.sn/category/epreuves-corriges/)). Passage à l'APC en 2025 : **non confirmé** |
| **Côte d'Ivoire** | BEPC par zones | C, D (situation de la série A **non vérifiée**) | D : 3 h ou 4 h, coef 4 selon les sources : **contradictoire** | Situations d'évaluation APC ([DPFC](https://dpfc-ci.net/wp-content/uploads/dpfc_fichiers/2019-2020/psgouv2019/Modules%20du%20secondaire_Contractuels%202019/Modules%20contractuels_SVT/Supports%20SVT.pdf)) ; sujet 2024 « en 4 parties » ([examens-concours](https://www.examens-concours.net/sujets_corriges_examen.php?discipline1=SVT)) |
| **Burkina Faso** | BEPC | D (et C) | D : 4 h, coef 5 (annales 2020) | 2 sujets au choix, génétique et immunologie obligatoires (2020). Une réforme évoquée en 2021 est **non confirmée** |
| **Mali** | DEF (« Sciences naturelles ») | TSExp, TSE | TSExp « Sciences de la vie » : 4 h, coef 4 (2023) ; TSE « Géologie/Biologie » : 2 h, coef 2 | QCM en 1re partie (2023) ; géologie du Mali ([BKalan](https://bkalan.ml/api/files/biologie/12-SCIENCES-EXPERIMENTALES-TSEXP/BAC/BK_BAC-BIO-TSExp-2023.pdf)) |
| **Guinée** | BEPC | SE (et SM, SS) | SE « Biologie-Géologie » : 4 h, coef 4 (2020) | Le nom de la matière diffère ([exam224](https://exam224.com/sujets/show/bac-se-biologie-geologie-2020), [savoirguinee](https://mooc.savoirguinee.com/course/section.php?id=11)) |
| **Bénin** | BEPC (APC, 3 compétences) | D (et C) | D : coef 5, 3 h (arrêté de 2003, **ancien**) | Situations-problèmes (3 en 2025) ([Office du BAC Bénin](https://www.officedubacbenin.bj/spip.php?article11)) |
| **Togo** | BEPC | BAC II D (et C) | **Non trouvé** | Épreuve « APC » en 2025 : pression artérielle, carte génétique, axe hypothalamo-hypophysaire ([YouTube](https://www.youtube.com/watch?v=tXkkTWnagO4), [Scribd 2023](https://www.scribd.com/document/722739625/CORRIGE-TYPE-BAC-II-2023-SVT-SERIE-D-TOGO)) |
| **Niger** | BEPC | C, D (1er et 2nd groupe) | **Non trouvé** | Sujets sur [binely.app](https://binely.app/sujets) et [epreuvesetcorriges](https://epreuvesetcorriges.com/categories/niger/examens/bac) |

**Différences de vocabulaire à respecter :**
- le nom de la matière change : « SVT », « Sciences naturelles » (DEF Mali), « Biologie », « Biologie-Géologie » (Guinée, Mali TSE) ;
- les consignes changent : « situation d'évaluation » ou « situation-problème » (pays APC), « maîtrise des connaissances » et « compétences méthodologiques » (Sénégal).

**Noyau commun probable des programmes de terminale scientifique** (d'après les annales citées et le [programme S2 sur Nomad Education](https://www.nomadeducation.fr/revisions/674a0987f560a3140c52f31c-lbf31c51)) :
- système nerveux et muscle ;
- milieu intérieur (glycémie, pression artérielle, rein) ;
- immunologie ;
- reproduction et hormones ;
- génétique formelle et humaine.

La géologie pèse davantage au Mali et en Guinée. **Le détail du programme par pays n'est pas vérifié.**

---

## 7. Comment bien expliquer la SVT à un élève

Les techniques ci-dessous sont des recommandations pédagogiques. **Aucune n'est attribuée au contenu d'une vidéo.** Pour les vidéos, seuls les titres ont été relevés, par le brouillon.

1. **Partir du verbe de consigne.** Faire nommer ce qu'il exige :
   - décrire : des valeurs ;
   - expliquer : un mécanisme ;
   - déduire : une conclusion ;
   - comparer : des différences chiffrées.
2. **La routine « Je vois, je sais, donc ».** C'est la forme « on constate… or… on en déduit… » des corrigés officiels sénégalais cités.
3. **Décomposer avant de rédiger.** Faire tracer les phases au crayon sur le graphique, puis écrire une phrase par phase.
4. **Analogies, à traduire ensuite en vocabulaire exact :**
   - régulation : un thermostat (capteur, centre, effecteur, rétrocontrôle) ;
   - synapse : un relais électrique, puis chimique, puis électrique ;
   - immunité : une armée (macrophages sentinelles, LT4 état-major, LTc tueurs, plasmocytes usines à anticorps) ;
   - liaison génétique : des perles sur un même fil, que le crossing-over échange.

   Il faut préciser les limites de chaque analogie. Par exemple, les LT4 ne « commandent » pas : ils sécrètent des interleukines.
5. **Génétique : une grille fixe** (§ 2.6). Faire écrire les proportions observées à côté des proportions théoriques avant toute conclusion.
6. **Contrôle par l'ordre de grandeur :**
   - une glycémie de 10 g/L, une réabsorption de 120 % ou une distance de 70 cM signalent une erreur ;
   - pour une distance, le pourcentage de recombinés ne peut pas dépasser 50 %.
7. **Faire construire le schéma par l'élève**, étape par étape, puis le lui faire raconter.
8. **Vérifier la compréhension par une question « et si… ? »** :
   - « et si on supprimait l'ADH ? » ;
   - « et si le père de II-3 était atteint ? ».

   On peut aussi proposer une variante de l'exercice avec d'autres données.
9. **S'entraîner sur des sujets réels du pays.** Titres de vidéos relevés par le brouillon, contenu non vérifié :
   - correction de l'épreuve APC SVT BAC S2 2025 au Sénégal ([YouTube](https://www.youtube.com/watch?v=rNpGZ1IcoHo)) ;
   - M. Gnasse, correction BAC S2 2001 en immunologie ([YouTube](https://www.youtube.com/watch?v=0NR_SPwxpBg)) ;
   - sujet-corrigé SVT BAC D 2024 au Togo ([YouTube](https://m.youtube.com/watch?v=acrrVqC-elk)) ;
   - correction écrite S2 2025 sur [samabac.sn](https://samabac.sn/bac-2025-epreuves-corrections-svt-serie-s2-1er-tour).
10. **Relire avec le barème en tête :**
    - constats chiffrés ;
    - unités ;
    - déductions ;
    - schéma titré ;
    - réponse au problème.

---

## 8. Règles pour une IA qui corrige et explique des exercices de SVT

1. **Identifier le pays, le niveau et la série.** S'ils sont inconnus, poser une seule question ou annoncer l'hypothèse retenue. Adapter le format :
   - MC, CM et communication au Sénégal ;
   - situations APC en Côte d'Ivoire, au Bénin et au Togo ;
   - sujets à choix au Burkina, si ce format est encore en vigueur.
2. **Répondre exactement à la consigne posée.** Classer d'abord le verbe et le ou les documents visés.
3. **Ne jamais inventer une donnée.** Si une image, une courbe ou une valeur est illisible, le dire et demander la valeur. Ne pas « lire » un graphique qu'on ne voit pas.
4. **Exploitation de document, toujours dans cet ordre :**
   - constat chiffré avec unité ;
   - interprétation par le cours ;
   - déduction ;
   - comparaison au témoin s'il y en a un.
5. **Génétique :**
   - notation conventionnelle ;
   - nombre de gènes ;
   - dominance (complète, incomplète ou codominance) ;
   - indépendance ou liaison, avec comparaison chiffrée selon le type de croisement (test-cross ou F2) ;
   - gamètes avec leurs proportions, puis échiquier, puis confrontation aux résultats observés ;
   - penser aux exceptions (drosophile mâle, ver à soie femelle).
6. **Pedigree :** tester chaque hypothèse sur un individu nommé et rejeter par contre-exemple. Pour les probabilités, appliquer la règle des 2/3 quand elle s'impose.
7. **Calculs :** formule, application numérique, unité, phrase biologique. **Vérifier l'ordre de grandeur** avant de donner le résultat.
8. **Doute scientifique :** si une réponse est incertaine, ou si plusieurs interprétations sont recevables, le dire clairement. Ne jamais présenter avec assurance une réponse dont on doute.
9. **Respecter le vocabulaire du cours local** (« codominance », « LT8 » ou « LTc », « Sciences naturelles ») tout en restant exact.
10. **Pédagogie, l'aide guidée par défaut :**
    - expliquer d'abord la démarche ;
    - donner un indice et laisser l'élève essayer ;
    - corriger sa tentative élément par élément.

    Une réponse modèle complète ne vient qu'après la tentative de l'élève ou à sa demande explicite, pour un exercice d'entraînement.
11. **Ne pas rédiger un devoir entier à rendre comme travail personnel.** Proposer plutôt le plan, la méthode et la correction de ce que l'élève a écrit.
12. **Indiquer les points en jeu seulement si le barème est connu.** Sinon, dire « éléments qui rapportent habituellement des points ». Ne jamais affirmer un coefficient, une durée ou un barème sans source datée.
13. **Schémas :** dire précisément quoi dessiner (titre, éléments, légendes, flèches, + et −). Proposer un schéma textuel structuré ; ne pas prétendre avoir dessiné.
14. **Analogies :** elles servent à comprendre. La réponse finale utilise le vocabulaire du programme.
15. **Terminer par une question de vérification** ou une variante courte de l'exercice.

---

## 9. Sources (URL)

**Attention :** ces URL viennent du brouillon. **Aucune n'a pu être ouverte lors de cette révision** : les quotas de recherche étaient épuisés et les domaines étaient inaccessibles.

**Officielles ou institutionnelles**
- https://officedubac.sn/category/epreuves-corriges/
- https://officedubac.sn/wp-content/uploads/2025/07/Sujet-SVT-S2-2025.pdf
- https://officedubac.sn/wp-content/uploads/2025/07/Corrige-SVT-S2-2025.pdf
- https://officedubac.sn/wp-content/uploads/2024/07/svt-s2-1er-gr-corrige_V.pdf
- https://officedubac.sn/wp-content/uploads/2024/07/SVT-S2-1ER-GR-.pdf
- https://officedubac.sn/wp-content/uploads/2024/10/SVT-S2-1ER-GR-REMPL-24.pdf
- https://officedubac.sn/wp-content/uploads/2025/02/CORRIGE-SVT-S2-1ER-2023.pdf
- https://officedubac.sn/wp-content/uploads/2025/02/SVT-S2-2E-GR-2023.pdf
- https://officedubac.sn/wp-content/uploads/2024/07/SVT-S1-1ER-GR-.pdf
- https://officedubac.sn/wp-content/uploads/2024/07/SVT-L2-1ER-GR.pdf
- https://officedubac.sn/wp-content/uploads/2024/07/Corrige-svt-l2-1er-gr_V.pdf
- https://officedubac.sn/wp-content/uploads/2025/07/Corrige-SVT-L2-1er-groupe-1.pdf
- https://www.officedubacbenin.bj/spip.php?article11
- https://dpfc-ci.net/wp-content/uploads/dpfc_fichiers/2019-2020/psgouv2019/Modules%20du%20secondaire_Contractuels%202019/Modules%20contractuels_SVT/Supports%20SVT.pdf
- https://apprendre.auf.org/wp-content/uploads/2021/08/9-Module-Outils-pe%CC%81dagogiques-et-strate%CC%81gies-de%CC%81valuation-selon-lAPC-en-Cote-dIvoire.pdf
- https://burkina24.com/wp-content/uploads/2020/07/annales_svt_tle_d.pdf
- https://bkalan.ml/api/files/biologie/12-SCIENCES-EXPERIMENTALES-TSEXP/BAC/BK_BAC-BIO-TSExp-2023.pdf

**Annales et sites tiers**
- https://www.sencampus.com/dossiers/le-bfem-et-apres/le-bfem-comment-ca-marche
- https://www.scribd.com/document/893314653/BFEM-2025-SVT-Corrige-G1-Normale
- https://samabac.sn/bac-2025-epreuves-corrections-svt-serie-s2-1er-tour
- https://www.fomesoutra.com/bepc/banque-de-sujets-du-bepc-cote-divoire/21558-bepc-2025-sujets-et-corriges-zone-1-2-3-svt-cote-divoire-by-tehua
- https://www.examens-concours.net/sujets_corriges_examen.php?discipline1=SVT
- https://epreuvesetcorriges.com/categories/benin/examens/bac/39874-corrige-type-baccalaureat-2025-sciences-de-la-vie-et-de-la-terre-serie-d-benin
- https://epreuvesetcorriges.com/categories/benin/examens/bepc/39854-corrige-officiel-epreuve-de-svt-bepc-2025-benin
- https://epreuvesetcorriges.com/categories/togo/examens/bac
- https://www.scribd.com/document/722739625/CORRIGE-TYPE-BAC-II-2023-SVT-SERIE-D-TOGO
- https://epreuvesetcorriges.com/categories/mali/examens/def
- https://fr.scribd.com/document/862803000/Bac-blanc-SVT-TSE-Kodonso-Copie
- https://exam224.com/sujets/show/bac-se-biologie-geologie-2020
- https://mooc.savoirguinee.com/course/section.php?id=11
- https://binely.app/sujets
- https://epreuvesetcorriges.com/categories/niger/examens/bac
- https://www.nomadeducation.fr/revisions/674a0987f560a3140c52f31c-lbf31c51

**Méthodologie**
- https://www.sunudaara.com/svt/m%C3%A9thodologie-danalyse-et-dinterpr%C3%A9tation-dun-graphique-de-svt-savoir-faire-ts
- https://www.sunudaara.com/svt/h%C3%A9r%C3%A9dit%C3%A9-humaine-ts2
- http://diopsvt.blogspot.com/2011/04/methodologie-genetique-en-ts.html
- https://lyc-claudel-vaureal.ac-versailles.fr/IMG/pdf/Construction_et_analyse_d_une_courbe.pdf
- https://clg-nenuphars-breval.ac-versailles.fr/IMG/pdf/Fiche_methode_no6_-_realiser_un_schema.pdf
- https://www.allosvt.fr/blog/schema-svt-le-schema-fonctionnel-explique-simplement
- https://marionsvt.fr/ress/fiches_techniques_college/fiche_technique_schema.pdf
- https://svt.site.ac-strasbourg.fr/au-lycee/terminale-s/item/217-des-exercices-de-soutien-en-genetique
- https://orbitech-ai-academy.fr/blog/svt/exercices/genetique-humaine-arbres-genealogiques-et-heredite-svt-termi
- https://neosvt.com/heredite-humaine-2bac-svt/ (programme marocain : méthode seulement)
- https://www.alveusclub.com/revisions-notions/svt-restitution-organisee-de-connaissances/
- https://www.morandsvt.fr/TS/methode/bac.pdf

**YouTube** (titres seulement, contenu non vérifié)
- https://www.youtube.com/watch?v=rNpGZ1IcoHo
- https://www.youtube.com/watch?v=0NR_SPwxpBg
- https://www.youtube.com/watch?v=DU15k6lKMuI
- https://www.youtube.com/watch?v=tXkkTWnagO4
- https://m.youtube.com/watch?v=acrrVqC-elk

Les points marqués « (cours) » relèvent du cours standard de terminale. Ils ne sont pas sourcés par URL dans cette révision et doivent être validés par un professeur.

---

## 10. Points encore incertains (à faire valider par un professeur)

1. **Durées et coefficients :**
   - BFEM SVT : 1 h ou 1 h 30 ? Coefficient 2 toujours en vigueur ?
   - BAC D Côte d'Ivoire : 3 h ou 4 h ?
   - Togo et Niger : non trouvés ;
   - Bénin : l'arrêté de 2003 est ancien ;
   - Sénégal S4/S5 : non confirmé.
2. **Sénégal 2025 :** le BAC S2 est-il passé à un format APC ? Quel est le maintien du schéma MC/CM/communication et de ses 2 pts ?
3. **Burkina :** les deux sujets au choix sont-ils maintenus après la réforme évoquée ?
4. **Barèmes détaillés** de la Côte d'Ivoire, du Bénin, du Togo, du Niger, de la Guinée et du Mali.
5. **Programmes officiels par pays :**
   - place de la géologie ;
   - présence de la SVT en série A ivoirienne ;
   - terminologie locale (« codominance » pour un phénotype intermédiaire) ;
   - exigence ou non du test du χ².
6. **Fréquence réelle des formats** QCM, construction de graphique et immunodiffusion selon les pays.
7. **Contenu des vidéos YouTube citées** : non visionné, seuls les titres sont connus.
8. **Exactitude des citations et barèmes** attribués aux corrigés officiels sénégalais : à relire sur les PDF officiels.

**Nombre de recherches effectuées dans cette révision : 0 sur les 30 à 50 demandées.**
- 3 recherches ont été tentées et refusées : le quota de recherches web de la session était épuisé.
- 5 ouvertures directes de pages (WebFetch) ont échoué : erreur DNS sur officedubac.sn, burkina24.com, officedubacbenin.bj et epreuvesetcorriges.com.
- 1 test curl a été refusé par le proxy (403).

Pour faire les vérifications listées ici, il faut relancer avec un nouveau quota de recherches et un accès réseau à ces domaines.
---

## 11. Ce que montrent les sites de cours sénégalais (BFEM)

Sources lues le 27 octobre 2026 : TopEducationSN, qui publie le **corrigé officiel du BFEM 2021** (scan portant le tampon de la Direction des examens et concours), SamaBFEM et Sunudaara. Les codes renvoient au 11.5.

### 11.1 Structure officielle de l'épreuve de SVT du BFEM (session 2021) [TE-BFEM21]

- **Durée 1 h 30, coefficient 2.** Cela confirme les valeurs signalées « non vérifiées » au 1.1.
- **Exercice 1, maîtrise des connaissances (5 points) :** 4 QCM à 1 point chacun, puis 1 question à 1 point (identifier une structure : les glomérules des néphrons).
- **Exercice 2, compétences méthodologiques (7 points) :** immunologie, avec la comparaison entre sérothérapie et vaccination à partir de courbes d'anticorps.
- **Exercice 3, compétences méthodologiques (7 points) :** géologie, avec l'ordre des couches sédimentaires, le principe de superposition, les couches manquantes et l'histoire géologique.
- **Présentation et qualité de l'expression : 1 point.**

### 11.2 Comment le corrigé officiel rédige une exploitation de documents [TE-BFEM21]

1. **Décrire l'évolution avec des chiffres :** grandeur, valeur de départ, valeur d'arrivée, unité et moment. Par exemple : la quantité d'anticorps diminue de 0,5 UI/mL à 0 à la 7ᵉ semaine.
2. **Déduire :** « On en déduit que… ». La conclusion est biologique : le sérum donne une immunité immédiate et brève ; le vaccin, une immunité tardive et durable.
3. **Comparer pour conclure :** quand l'énoncé demande l'avantage des deux techniques réunies, il faut combiner les deux conclusions (sérovaccination : protection immédiate **et** durable).
4. **Barème du raisonnement :**
   - « décrire puis déduire l'avantage » : 2 points par technique ;
   - avantage combiné : 1,5 point ;
   - « deux avantages individuels » : 1,5 point (par exemple, moins de cas de la maladie et moins de décès).
5. **Géologie :**
   - classer les couches de la plus ancienne à la plus récente ;
   - **citer le principe** de superposition : une couche est plus ancienne que celle qui la recouvre ;
   - proposer une hypothèse pour les couches absentes (l'érosion) ;
   - reconstituer les événements dans l'ordre (sédimentation puis érosion).
   Chaque étape vaut 1 à 2 points.

### 11.3 Programme de SVT de 3e au Sénégal (d'après les leçons de SamaBFEM) [SB]

- **Fonctions de l'organisme :**
  - système nerveux ;
  - vision (œil, accommodation, défauts de la vue) ;
  - respiration et phénomènes énergétiques ;
  - fermentation ;
  - rôle des reins dans l'excrétion urinaire.
- **Immunologie** (4 leçons, la partie la plus lourde) :
  - immunité et défense de l'organisme ;
  - système immunitaire ;
  - spécificité immunologique ;
  - aides à l'immunité (sérum, vaccin) ;
  - VIH/sida.
- **Géologie :**
  - tectonique des plaques ;
  - roches métamorphiques ;
  - cycle des roches.

Cela concorde avec le BFEM 2021 (reins, immunité, couches sédimentaires) et avec les thèmes 2025 cités au 1.1 (anticorps, tectonique).

### 11.4 Règles pour l'IA de Révizo (BFEM Sénégal)

1. **Pour un document :** toujours décrire avec des valeurs chiffrées et leurs unités, puis écrire « On en déduit que… ». Une conclusion sans relevé de valeurs perd des points.
2. **Sérum et vaccin :** sérum = anticorps apportés, effet immédiat mais bref ; vaccin = anticorps fabriqués par l'organisme, effet tardif mais durable.
3. **Géologie :** citer le principe utilisé (superposition, recoupement, continuité) avant de l'appliquer.
4. **Rappeler que la présentation et l'expression valent 1 point :** des phrases complètes et une copie propre.
5. Pour un sujet du BFEM sénégalais, ne pas proposer des thèmes hors programme de 3e (génétique, reproduction détaillée) comme s'ils étaient attendus.

### 11.5 Sources et fiabilité

| Code | Source | Ce qu'on en a tiré | Fiabilité |
|---|---|---|---|
| TE-BFEM21 | Corrigé de l'épreuve de SVT du BFEM 2021, 1er groupe, publié par TopEducationSN : https://topeducationsn.com/wp-content/uploads/2022/11/Corrige-epreuve-SVT-BFEM-21.pdf | Structure, barème, rédaction attendue | **Élevée** : document officiel scanné (en-tête du ministère, tampon de la Direction des examens) |
| SB | SamaBFEM, https://www.samabfem.com/subject/svt | Liste des 14 leçons de 3e | Titres seulement |
| SCR | Fiches de révision BFEM sur Scribd, https://fr.scribd.com/document/876660096/Fiches-de-Revision-BFEM-Toutes-Matieres | Rien de retenu | **Faible** : thèmes de SVT (reproduction, écologie) qui ne correspondent pas aux leçons de 3e ni au BFEM 2021 |

### 11.6 Programme de SVT par classe au Sénégal [SD]

- **4e :**
  - géologie : volcanisme, roches magmatiques, séismes et structure du globe, ressources naturelles et gestion durable ;
  - biologie : digestion et absorption, sang (composition, circulation, maladies, pression artérielle), contamination par les micro-organismes ;
  - reproduction : puberté, de la fécondation à l'accouchement, contraception ;
  - hérédité : transmission des caractères héréditaires.
- **3e :** voir 11.3.
- **Première S :**
  - la cellule : techniques d'étude, organisation, bactéries et virus, échanges cellulaires, synthèse des protéines, chromosomes et mitose, mouvements cellulaires ;
  - nutrition : respiration, aliments, digestion, ration alimentaire ;
  - physiologie : introduction ;
  - géologie : introduction, roches magmatiques (granite, basalte), sédimentaires et métamorphiques, structure du globe, tectonique, paléogéographie, ensembles et ressources géologiques du Sénégal.
- **Première L :** la cellule (organisation, bactéries et virus, échanges, protéines, mitose), digestion et absorption, introduction à la géologie, ressources géologiques du Sénégal.
- Pour la 6e, la 5e et la Seconde, les listes n'étaient pas lisibles.

### 11.7 Le BAC de SVT au Sénégal : sujet S2 2024 [SD]

Ce sujet confirme le modèle du 1.2.
- **Partie I, maîtrise des connaissances :** un exposé sur le potentiel d'action, avec ses conditions d'obtention, ses caractéristiques, l'interprétation ionique et des schémas.
- **Partie II, compétences méthodologiques :**
  - exercice 1 : glycémie, diabète de type 2 et obésité (IMC, adipocytes) ;
  - exercice 2 : immunologie (souris nude, chambre de Marbrook, plasmocytes), avec une seule consigne et 4 documents.
- **Communication : 2 points** (plan de l'exposé 1 point, expression 0,5 point, présentation 0,5 point).
- **Verbes de consigne :** « analyse », « tire une conclusion », « émets une hypothèse », « montre le lien », « établis la relation », « explique ». L'IA doit traiter chaque verbe à part, dans l'ordre.

Sources ajoutées : https://www.sunudaara.com/quatrieme, http://www.sunudaara.com/cours-svt-première, https://sunudaara.com/bac-senegal-svt, https://sunudaara.com/bac/bac-svt-1er-groupe-s2-s2a-s4-s5-2024.
