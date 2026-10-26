# Guide de correction : Économie et comptabilité (séries G1/G2/G3, STEG, B, TSECO, Sciences sociales selon les pays)

> **Avertissement sur la recherche (à lire avant d'utiliser ce guide)**
> Dans cette session, je n'ai pu faire aucune recherche web, donc aucune vérification en ligne.
> - J'ai lancé 5 recherches web. Toutes ont été refusées, parce que le budget de recherche partagé du tour (200 recherches) était déjà épuisé.
> - J'ai tenté 3 lectures directes de pages : ohada.org, fr.wikipedia.org et officedubac.sn. Les 3 ont échoué (nom de domaine introuvable).
> - J'ai fait 1 test d'accès réseau : le proxy l'a refusé (erreur 403).
>
> Je n'ai pas cherché à contourner ces blocages. La consigne de 30 à 50 recherches n'est donc **pas remplie**.
> Ce guide corrige le brouillon à partir de mes connaissances. Toute information qui dépend du pays ou qui a pu changer porte la mention **[À VÉRIFIER]**. Je n'ai inventé aucun barème, aucun rapport de jury, aucune URL et aucun contenu de vidéo.
> Pour faire la vérification, il faut l'une de ces deux conditions :
> - relancer la tâche dans un message suivant, quand le budget de recherche est disponible, ou après avoir augmenté `CLAUDE_CODE_MAX_WEB_SEARCHES_PER_SESSION` ;
> - utiliser un environnement qui autorise l'accès à ces domaines.

---

## 1. Ce que les correcteurs attendent

### 1.1 Au brevet (BFEM au Sénégal, BEPC en Côte d'Ivoire, au Burkina, au Bénin, au Togo, au Niger et en Guinée, DEF au Mali)
- **Pas d'épreuve d'économie ni de comptabilité dans l'enseignement général.** C'est la situation habituelle, mais elle n'a pas été vérifiée pays par pays **[À VÉRIFIER]**. Des notions économiques peuvent apparaître en histoire-géographie ou en éducation civique et morale : ressources, développement, UEMOA, CEDEAO, impôt citoyen.
- **Ce qui est attendu dans ce cas :** une définition simple, un exemple local et des phrases complètes.
- **Dans les filières professionnelles** (CAP, BEP, certificats de comptabilité), il peut y avoir de la comptabilité de base : journal, facture, TVA. Les épreuves dépendent de l'organisme de chaque pays **[À VÉRIFIER]**.
- **Pour l'IA :** avec un élève de 3e, pas de numéros de comptes ni de jargon. On suit le schéma « définition, exemple, conclusion ».

### 1.2 Au BAC
**Filières concernées** (le détail est en section 6) :
- séries techniques tertiaires **G1** (techniques administratives), **G2** (techniques quantitatives de gestion, c'est-à-dire la comptabilité), **G3** (techniques commerciales) ;
- **STEG** au Sénégal **[À VÉRIFIER]** ;
- **série B** (économie) dans certains pays, surtout au Bénin **[À VÉRIFIER]** ;
- **TSECO** au Mali ;
- **Sciences sociales** en Guinée.

> Correction du brouillon : l'intitulé « ES » est d'abord une série française, aujourd'hui supprimée par la réforme du bac de 2021. Je ne connais aucun des huit pays qui ait une série officiellement appelée « ES » **[À VÉRIFIER]**. L'IA ne doit pas utiliser cette étiquette, sauf si l'élève l'emploie lui-même.

**Attentes en comptabilité (G2, STEG, techniques de gestion)**
1. **Le référentiel : le SYSCOHADA révisé.** Il est issu de l'Acte uniforme relatif au droit comptable et à l'information financière (AUDCIF), adopté en janvier 2017.
   - Il s'applique aux comptes personnels des entités à partir des exercices ouverts le **1er janvier 2018**, et aux comptes consolidés et combinés à partir du **1er janvier 2019**. Ce sont mes connaissances, sans vérification en ligne **[À VÉRIFIER : ohada.org]**.
   - Les huit pays sont membres de l'OHADA.
   - On n'utilise pas les numéros du PCG français : 607/707 en France, 601/701 en SYSCOHADA.
2. **La démarche visible :** formule, application numérique, résultat avec l'unité (F CFA, ou GNF en Guinée).
3. **Des écritures complètes :** date, numéro et intitulé du compte, libellé, montants. Les débits doivent être égaux aux crédits.
4. **Des tableaux complets et contrôlés :** amortissement, répartition des charges indirectes, fiche de stock, bilan, compte de résultat, tableau des flux de trésorerie.
5. **Une interprétation en une ou deux phrases** quand le sujet la demande.

**Attentes en économie (série B, TSECO, Sciences sociales, économie générale en G)**
1. Des **définitions précises** : PIB, RNB, inflation, chômage, croissance, développement, monnaie, balance des paiements, intégration régionale.
2. Une **exploitation des documents** en trois temps : lecture, calcul, interprétation.
3. Un **sujet de réflexion** construit : introduction (accroche, définitions, problématique, annonce du plan), deux ou trois parties argumentées avec des exemples africains datés, conclusion.
4. Des **exemples locaux et à jour**. Les plans nationaux changent :
   - au Sénégal, le Plan Sénégal émergent a été remplacé en 2024 par l'« Agenda national de transformation – Sénégal 2050 » ;
   - en Côte d'Ivoire, le PND 2021-2025 arrive à son terme et un nouveau PND est probable.

   Ces points n'ont pas été vérifiés **[À VÉRIFIER]**.

---

## 2. Les types d'exercices les plus fréquents et leur méthode pas à pas

> Je n'ai pas pu consulter d'annales. La liste vient des programmes classiques de G2/STEG et d'économie de la zone. La fréquence réelle de chaque type dans chaque pays reste **[À VÉRIFIER]**.

### A. Comptabilité générale

#### A1. Facturation et enregistrement des achats et des ventes (avec TVA)
1. **Qualifier l'opération** : achat, vente, avoir, règlement, immobilisation, emprunt.
2. **Calculer la facture dans l'ordre :**
   - prix brut ;
   - remise, rabais, ristourne (en cascade : chaque réduction s'applique au net précédent) ;
   - net commercial ;
   - escompte (réduction financière) ;
   - net financier ;
   - port et frais ;
   - total HT ;
   - TVA ;
   - net à payer TTC.
3. **Les réductions commerciales qui figurent sur la facture ne s'enregistrent pas.** Les comptes 601 et 701 reçoivent le net commercial. C'est la même règle qu'en France ; le brouillon l'attribuait à tort à une « confusion avec le PCG ».
4. **L'escompte s'enregistre toujours** : 773 Escomptes obtenus pour l'acheteur, 673 Escomptes accordés pour le vendeur.
5. **Réductions accordées après la facture (facture d'avoir)** : chez l'acheteur, 6019 « Rabais, remises et ristournes obtenus (non ventilés) » ; chez le vendeur, 7019 pour les rabais, remises et ristournes accordés.
   > Correction du brouillon : le compte **6011 n'est pas un compte de réductions**. Il désigne, à ma connaissance, les achats de marchandises « dans la Région » **[À VÉRIFIER dans le plan fourni en classe]**.
6. **Passer l'écriture, puis contrôler l'équilibre.**

**Exemple :** achat à crédit de marchandises pour 1 000 000 F HT (net commercial), TVA à 18 %.

| Comptes | Intitulé | Débit | Crédit |
|---|---|---|---|
| 601 | Achats de marchandises | 1 000 000 | |
| 4452 | État, TVA récupérable sur achats | 180 000 | |
| 401 | Fournisseurs | | 1 180 000 |

**Comptes à connaître :**
- 411 Clients ; 401 Fournisseurs ;
- 4431 État, TVA facturée sur ventes ; 4452 État, TVA récupérable sur achats ; 4451 TVA récupérable sur immobilisations ; 4441 État, TVA due ;
- 412 Clients, effets à recevoir ; 402 Fournisseurs, effets à payer ;
- 521 Banques ; 571 Caisse.

**Taux de TVA.** Le taux normal est de **18 %** dans la plupart des pays de la zone, et de **19 % au Niger**, selon mes connaissances. La directive de l'UEMOA encadre le taux normal dans une fourchette d'environ 15 à 20 %. Tout cela est **[À VÉRIFIER]**. **Le taux donné par le sujet prime toujours.**

**Emballages consignés** (exercice fréquent en G2) : 4194 Clients, dettes pour emballages consignés ; 4094 Fournisseurs, créances pour emballages à rendre. Numérotation **[À VÉRIFIER]**.

#### A2. Effets de commerce, escompte et intérêts simples
1. **Intérêt** : I = C × t × n / 360. On utilise l'année commerciale, sauf indication contraire du sujet.
2. **Nombre de jours** : on compte du lendemain de la remise jusqu'à l'échéance incluse, plus les jours de banque si le sujet en donne. Écrire le décompte mois par mois.
3. **Agio** = escompte + commissions + taxe sur les commissions. La taxe varie selon le pays : TAF au Sénégal, taxe sur les opérations bancaires en Côte d'Ivoire, ou TVA. Les taux sont **[À VÉRIFIER]**. On prend ceux du sujet.
4. **Net** = valeur nominale − agio.
5. **Écriture (méthode simple)** :
   - au débit : 521 Banques (le net), 675 Escomptes des effets de commerce, 631 Frais bancaires (les commissions), et éventuellement la taxe si le sujet la rend récupérable ;
   - au crédit : 412 Clients, effets à recevoir.

   D'autres méthodes passent par 415 « Clients, effets escomptés non échus » ou par un compte 56x de crédit d'escompte. **On suit la méthode du cours** **[À VÉRIFIER]**.

#### A3. Travaux d'inventaire (le gros dossier du BAC G2)
**a) Amortissements**
1. **Base amortissable.** Dans le SYSCOHADA révisé, c'est le coût d'acquisition moins la valeur résiduelle, sur la durée d'utilité. Le révisé introduit aussi l'**approche par composants**. Si le sujet ne parle pas de valeur résiduelle, la base est le coût HT (sauf TVA non récupérable).
2. **Annuité linéaire** = base × taux, avec taux = 100 / durée.
3. **Prorata temporis** à partir de la date de mise en service. On compte en mois ou en jours, selon le sujet.
4. **Tableau d'amortissement** : année, base, annuité, cumul, VNC.
5. **Écriture** : 681 Dotations aux amortissements d'exploitation au débit, 28x au crédit.

*Exemple :* matériel mis en service le 1/04/N pour 6 000 000 F HT, amortissable en 5 ans, sans valeur résiduelle.
- Taux = 100 / 5 = 20 %.
- Annuité N = 6 000 000 × 20 % × 9/12 = **900 000 F**.
- VNC au 31/12/N = **5 100 000 F**.

**Amortissement dégressif** : taux linéaire × coefficient. On passe au linéaire dès que l'annuité linéaire sur la durée restante est supérieure ou égale à l'annuité dégressive. Les coefficients sont fixés par le code des impôts de chaque pays **[À VÉRIFIER]** : on utilise ceux du sujet.

**b) Cession d'immobilisation**
1. **Compléter l'amortissement** jusqu'à la date de cession.
2. **Sortir le bien** : 28x au débit (cumul des amortissements), 81x « Valeurs comptables des cessions d'immobilisations » au débit (VNC), compte d'immobilisation au crédit (valeur d'origine).
3. **Constater le prix** : 485 « Créances sur cessions d'immobilisations » ou 521 au débit, 82x « Produits des cessions d'immobilisations » au crédit.
4. **Résultat de cession** = prix − VNC.
5. **Choix des comptes** : à ma connaissance, le révisé a ajouté **654/754** pour les cessions **courantes**. Les cessions **HAO** restent en **81x/82x**. En classe, la cession HAO est le cas le plus traité. L'IA signale les deux possibilités et suit le cours **[À VÉRIFIER]**.

**c) Créances douteuses**
1. **Reclasser** : 416 Clients douteux au débit, 411 au crédit (en TTC).
2. **Base de la dépréciation** = TTC ÷ (1 + taux de TVA), car **la TVA ne se déprécie pas**.
3. **Ajustement** = dépréciation nécessaire − dépréciation existante.
   - S'il est positif : dotation 659x au débit, 491 Dépréciations des comptes clients au crédit.
   - S'il est négatif : reprise, 491 au débit, 759x au crédit.
4. **Créance irrécouvrable** :
   - 651 Pertes sur créances clients (montant HT) et 4431 (TVA) au débit, 416 au crédit ;
   - puis reprise de la dépréciation devenue sans objet.

   Le droit de récupérer la TVA dans ce cas dépend de la loi fiscale du pays **[À VÉRIFIER]**.

**d) Stocks**
- **Inventaire intermittent** :
  - on annule le stock initial (6031 au débit, 31 au crédit) ;
  - on constate le stock final (31 au débit, 6031 au crédit).
- **Variation des stocks** = stock initial − stock final.
- **Méthodes de valorisation admises par le SYSCOHADA révisé** : CMUP et PEPS (FIFO). **Le DEPS (LIFO) est interdit**, selon mes connaissances **[À VÉRIFIER]**.

**e) Régularisations**
- 476 Charges constatées d'avance ; 477 Produits constatés d'avance ;
- 408 Fournisseurs, factures non parvenues ;
- 418 Clients, produits à recevoir (ou factures à établir) ;
- comptes rattachés aux comptes de personnel et à l'État (charges à payer).

#### A4. Salaires (paie), fréquent en G2 **[à confirmer selon le programme]**
- **Salaire brut** : 661 Rémunérations directes versées au personnel national au débit.
- **Retenues salariales** : au crédit de 431 (sécurité sociale), 432 (caisse de retraite), 447 (impôts retenus à la source). Le net va à 422 Personnel, rémunérations dues.
- **Charges patronales** : 664 au débit, 431 et 432 au crédit.
- **Organismes et taux** : ils sont propres à chaque pays (CSS et IPRES au Sénégal, CNPS en Côte d'Ivoire, INPS au Mali, CNSS ailleurs) **[À VÉRIFIER]**. **Seuls les taux du sujet comptent.**

#### A5. États financiers et analyse
1. **Compte de résultat SYSCOHADA révisé**, présenté en liste, soldes dans l'ordre :
   - marge commerciale ;
   - chiffre d'affaires ;
   - valeur ajoutée ;
   - EBE ;
   - résultat d'exploitation ;
   - résultat financier ;
   - résultat des activités ordinaires (RAO) ;
   - résultat HAO ;
   - participation des travailleurs ;
   - impôt sur le résultat ;
   - résultat net.
2. **CAFG, méthode additive** : résultat net + dotations (amortissements, dépréciations, provisions) − reprises − produits de cession + VNC des cessions − quote-part des subventions d'investissement virée au résultat.
3. **Bilan fonctionnel ou financier** :
   - FRNG = ressources stables − emplois stables ;
   - BFG = besoin de financement d'exploitation (BFE) + besoin HAO ;
   - trésorerie nette = FRNG − BFG, à contrôler avec trésorerie actif − trésorerie passif.
4. **Le révisé a remplacé le TAFIRE par le Tableau des flux de trésorerie (TFT).** Un élève qui construit un TAFIRE suit un cours de l'ancien système **[À VÉRIFIER si certains programmes l'enseignent encore]**.
5. **Ratios** : formule, calcul, puis une phrase d'interprétation.

### B. Comptabilité analytique et gestion

#### B1. Coût complet
1. **Répartition primaire** : contrôler que le total réparti est égal au total des charges indirectes.
2. **Répartition secondaire**. Si les prestations entre centres auxiliaires sont réciproques, poser X = a + p·Y et Y = b + q·X, résoudre, puis vérifier.
3. **Coût de l'unité d'œuvre** = total du centre ÷ nombre d'unités d'œuvre.
4. **Cascade des coûts** : coût d'achat, fiche de stock (CMUP), coût de production, coût de revient, résultat analytique = CA − coût de revient.
5. **CMUP de période** = (valeur du stock initial + valeur des entrées) ÷ (quantité du stock initial + quantité des entrées). Le CMUP peut aussi être recalculé après chaque entrée : il faut préciser la variante utilisée.
6. **Concordance** : résultat analytique + charges supplétives − charges non incorporables + produits non incorporés ± différences d'inventaire ± différences d'arrondi = résultat de la comptabilité générale.

#### B2. Coût variable et seuil de rentabilité
- MCV = CA − charges variables ; taux de MCV = MCV ÷ CA.
- SR = charges fixes ÷ taux de MCV.
- Point mort = SR ÷ CA × 360 jours (ou × 12 mois). C'est valable **seulement si l'activité est régulière**. Si elle est saisonnière, on cumule le CA mois par mois.
- Marge de sécurité = CA − SR ; indice de sécurité = marge de sécurité ÷ CA ; levier opérationnel = MCV ÷ résultat.

#### B3. Coûts préétablis et analyse des écarts *(présence au programme [À VÉRIFIER])*
- Écart sur coût = coût réel − coût préétabli adapté à la production réelle.
- Écart sur quantité = (Qr − Qp) × Cp ; écart sur prix = (Cr − Cp) × Qr.
- Indiquer si l'écart est favorable (F) ou défavorable (D).

#### B4. Budgets, dont le budget de trésorerie
- **Encaissements en TTC**, selon les délais clients ; **décaissements**, avec la **TVA due versée le mois suivant**. La date limite de déclaration dépend du pays **[À VÉRIFIER]**.
- Trésorerie fin de mois = trésorerie début de mois + encaissements − décaissements.

#### B5. Mathématiques financières
- Intérêts composés : Cn = C0 × (1 + i)^n.
- Annuité constante : a = C0 × i ÷ (1 − (1 + i)^(−n)).
- Tableau d'emprunt : la somme des amortissements doit être égale au capital emprunté. Le dernier capital restant dû doit être égal à 0.
- Écritures : 162 Emprunts auprès des établissements de crédit, 671 Intérêts des emprunts.

### C. Économie générale et SES

#### C1. Question de cours
Répondre en trois temps : définition, mécanisme, exemple africain.
- *Exemple :* « L'inflation est une hausse générale et durable du niveau des prix. Elle réduit le pouvoir d'achat de la monnaie. La BCEAO vise la stabilité des prix. »
- Objectif de la BCEAO : une inflation **entre 1 % et 3 %** (cible centrale de 2 %). Critère de convergence de l'UEMOA : inflation de 3 % au plus. Ces deux chiffres viennent de mes connaissances **[À VÉRIFIER sur bceao.int]**.

#### C2. Exploitation de documents
1. **Présenter le document** : nature, source, date, unité, champ.
2. **Lire une donnée** : « Selon [source], en [année], [valeur et unité]… »
3. **Calculer :**
   - taux de variation = (V1 − V0) ÷ V0 × 100 ;
   - coefficient multiplicateur = V1 ÷ V0 ;
   - indice base 100 = V1 ÷ V0 × 100 ;
   - part = partie ÷ tout × 100 ;
   - TCAM = (V1 ÷ V0)^(1/n) − 1.
   - **Ne pas confondre point de pourcentage et pourcentage** quand on compare deux taux.
4. **Dégager** la tendance, les ruptures et les exceptions.
5. **Expliquer** avec le cours.

#### C3. Calculs économiques
- **PIB** :
  - optique production : somme des VA + impôts sur les produits − subventions ;
  - optique dépense : C + I + G + (X − M) ;
  - optique revenu.
- **RNB** = PIB + revenus reçus du reste du monde − revenus versés au reste du monde. « PNB » est l'ancien nom.
- **Multiplicateur** : k = 1 ÷ (1 − c) en économie fermée sans impôt. Avec la propension à importer m, en économie ouverte : k = 1 ÷ (1 − c + m).
  - *Exemple :* c = 0,8, donc k = 5. Un investissement supplémentaire de 10 milliards F CFA augmente le revenu de 50 milliards.
- **Équilibre de marché** : poser Qd = Qo, résoudre pour trouver le prix, puis calculer la quantité.
- **Élasticité** = variation de Q en % ÷ variation de P (ou du revenu) en %. Interpréter le signe et la valeur absolue par rapport à 1.
- **Autres calculs** :
  - taux de chômage = chômeurs ÷ population active × 100 ;
  - taux de couverture = X ÷ M × 100 ;
  - PIB réel = PIB nominal ÷ déflateur × 100.

#### C4. Sujet de réflexion ou dissertation
1. **Analyser le sujet** : définir chaque terme et identifier le type (discussion, explication, comparaison).
2. **Formuler une problématique** sous forme de question.
3. **Construire le plan** en deux ou trois parties, avec deux ou trois arguments chacune.
4. **Rédiger chaque argument** en trois temps : affirmation, explication, illustration datée.
5. **Rédiger entièrement l'introduction et la conclusion**, et rendre les transitions visibles.

---

## 3. La rédaction et la présentation attendues sur la copie

**En comptabilité**
- **Calculs avant les écritures**, sous la forme « Formule = application = résultat F ».
- **Journal :**
  - une écriture par opération, encadrée de traits, avec la date ;
  - les comptes débités d'abord, les comptes crédités décalés ;
  - numéro et intitulé du compte, libellé court.
- **Numéros de comptes :** le niveau de détail exigé par le cours, souvent 3 ou 4 chiffres (4452, 4431). Le numéro et l'intitulé doivent correspondre.
- **Montants :** séparateur de milliers (1 180 000), unité, arrondi selon le sujet.
- **Tableaux :** titre, en-têtes, total, ligne de contrôle.
- **Phrases types**
  - « Le résultat de cession est de … F : c'est une plus-value. »
  - « La trésorerie nette est négative : l'entreprise dépend des concours bancaires courants. »
  - « Le seuil de rentabilité est atteint le … : au-delà, chaque vente dégage un bénéfice. »

**En économie**
- **Phrases complètes et vocabulaire précis.** On écrit « le PIB a progressé de 6,2 % », pas « ça monte ».
- **Chaque chiffre avec son unité, son année et sa source.**
- **Plan visible :** titres ou alinéas selon l'usage local **[À VÉRIFIER]**, et sauts de ligne entre les paragraphes.
- **Introduction :** accroche, définitions, problématique, annonce du plan.
- **Conclusion :** réponse à la problématique, puis ouverture.
- **Repères institutionnels prudents** :
  - **AES.** Le Mali, le Burkina Faso et le Niger ont annoncé leur retrait de la CEDEAO en janvier 2024. Ce retrait a été acté début 2025, et les trois pays ont formé l'Alliance des États du Sahel (AES). Leur maintien dans l'UEMOA et la BCEAO est **[À VÉRIFIER à la date de l'examen]**.
  - **Guinée.** Elle est hors UEMOA : franc guinéen (GNF), Banque centrale (BCRG).
  - **Eco.** La réforme du franc CFA vers l'« Eco », annoncée en décembre 2019, est restée partielle. La monnaie unique de la CEDEAO est reportée. Les dates précises sont **[À VÉRIFIER]**.
  - **Zlecaf.** Accord entré en vigueur en 2019 ; les échanges ont démarré en janvier 2021 **[À VÉRIFIER]**.

---

## 4. Le barème : attribution des points et pertes de points

> Je n'ai consulté aucun barème officiel ni aucun rapport de jury. Ce qui suit décrit des **pratiques de correction répandues**, pas des règles officielles.

**Principes**
- **Les points imprimés sur le sujet** (par dossier ou par question) sont la seule donnée fiable. L'IA s'en sert pour hiérarchiser son aide.
- **Écriture comptable** : les points se partagent entre les comptes, le sens, les montants et la présentation. Une écriture déséquilibrée perd en général l'essentiel de ses points.
- **Calculs** : la démarche est souvent valorisée même si le résultat est faux. Un résultat juste sans justification peut être peu ou pas noté.
- **Erreur reportée** : beaucoup de correcteurs ne sanctionnent pas deux fois la même erreur. Ce n'est pas garanti **[À VÉRIFIER]**.
- **Interprétation** : ce sont des points faciles, souvent oubliés par les élèves.
- **Dissertation** : les points vont à l'introduction, à l'argumentation et aux exemples, au plan, à la conclusion et à l'expression.

**Ce qui fait perdre des points**
- Des comptes du PCG français, ou de l'ancien SYSCOHADA quand le révisé est exigé (par exemple un TAFIRE au lieu d'un TFT).
- Un mélange HT/TTC : base d'une dépréciation, budget de trésorerie.
- L'oubli du prorata temporis ou de la valeur résiduelle donnée par le sujet.
- Une erreur de sens : variation des stocks, dotation ou reprise.
- Un chiffre sans unité ou sans calcul.
- En économie : un hors-sujet, une copie sans exemple, des notions confondues, des données non datées.
- Une copie illisible, ou des ratures qui rendent ambigus un compte ou un montant.

---

## 5. Les erreurs les plus fréquentes des élèves et comment les éviter

| Erreur | Cause | Remède |
|---|---|---|
| Inverser débit et crédit | Lecture d'un relevé bancaire, qui est vu du côté de la banque | Emploi au débit, ressource au crédit. Une charge va au débit, un produit au crédit. |
| Enregistrer une remise figurant sur la facture | Confusion avec une réduction hors facture (avoir) | Sur la facture, on enregistre le net commercial. Une réduction par avoir va en 6019 ou 7019. |
| Enregistrer l'escompte en réduction du compte 601 | Confusion entre réduction commerciale et réduction financière | L'escompte est financier : 773 ou 673. |
| Déprécier une créance sur le TTC | Oubli que la TVA ne se déprécie pas | Base = TTC ÷ (1 + t). |
| Oublier le prorata temporis | Lecture rapide de l'énoncé | Souligner les dates et compter les mois ou les jours. |
| Se tromper de signe dans la variation des stocks | Formule mal retenue | Variation = stock initial − stock final. Une hausse du stock donne une variation négative, qui réduit les charges. |
| Mal traiter les prestations réciproques | Système d'équations non posé | Poser les équations, les résoudre, vérifier. |
| Appliquer le point mort à une activité saisonnière | Formule appliquée mécaniquement | Faire le cumul mensuel du CA. |
| Calculer un taux de variation à l'envers | Mauvaise valeur de référence | Diviser par V0. |
| Confondre point de pourcentage et pourcentage | Deux taux comparés | Un taux de chômage qui passe de 10 % à 12 % gagne 2 points, soit une hausse de 20 %. |
| Confondre croissance et développement | Notions proches | Croissance : quantitative (PIB). Développement : qualitatif et structurel (IDH). |
| Utiliser des exemples français | Manuels importés | Prendre des exemples de la zone : BCEAO, UEMOA, cacao ivoirien, coton malien et burkinabè, hydrocarbures sénégalais, uranium nigérien, bauxite guinéenne, ports de Lomé et de Cotonou. |
| Citer un plan national dépassé | Manuel ancien | Vérifier le plan en vigueur (voir section 1.2). |

---

## 6. Les différences entre pays

> **Section la moins fiable** : rien n'a pu être vérifié en ligne. Les cases marquées « ? » sont des hypothèses à confirmer.

**Points communs (probables, mais non vérifiés en ligne)**
- Les huit pays sont membres de l'OHADA et appliquent le SYSCOHADA révisé.
- Sept pays font partie de l'UEMOA (BCEAO, franc CFA). La Guinée est hors UEMOA.
- Le taux de TVA normal est de 18 %, sauf au Niger (19 %) **[À VÉRIFIER]**.

| Pays | Diplôme du 1er cycle | Filières BAC avec économie ou gestion | Organisme du BAC | Remarques **[À VÉRIFIER]** |
|---|---|---|---|---|
| Sénégal | BFEM | STEG (qui a remplacé l'ancienne série G ?) ; BT | Office du Baccalauréat (UCAD) | Coefficients et durées non vérifiés. Pas d'économie en L et S ? |
| Côte d'Ivoire | BEPC | G1, G2, G3 ? Série B à confirmer | DECO (ministère de l'Éducation nationale) ; à confirmer pour le BAC technique | Le brouillon ne précisait pas quel ministère organise le BAC technique. |
| Mali | DEF | TSECO (Terminale Sciences économiques) ; BAC technique | **CNECE** (Centre national des examens et concours de l'éducation), et non « CNECS » comme dans le brouillon ? | Contenu de l'épreuve en TSECO à confirmer. Membre de l'AES. |
| Burkina Faso | BEPC | G1, G2 (G3 ?) | Office du Baccalauréat (Université Joseph Ki-Zerbo) | Membre de l'AES. |
| Guinée | BEPC | Sciences sociales (avec Sciences mathématiques et Sciences expérimentales) ; comptabilité dans l'enseignement technique | Organisme national des examens, à identifier | GNF et BCRG. Suspendue de la CEDEAO après 2021, mais toujours membre. |
| Bénin | BEPC | Série B, G1, G2, G3 | Office du Baccalauréat | Série B probable, à confirmer. |
| Togo | BEPC | G1, G2, G3 ; série B ? | Office du BAC ou direction des examens, à préciser | Existence et statut du BAC I (probatoire) à vérifier. |
| Niger | BEPC | Séries G ou techniques de gestion ? | Office du Baccalauréat (Université Abdou Moumouni) | TVA à 19 %. Membre de l'AES. |

**Conséquences pour l'IA**
- Demander une fois le **pays**, la **série** et la **classe**, ou les déduire de l'en-tête du sujet.
- **Le sujet prime** sur toute valeur par défaut : taux, coefficients, conventions de calcul.
- Ne jamais annoncer une durée d'épreuve ou un coefficient sans source. Écrire plutôt : « vérifie sur ta convocation ou sur le sujet officiel ».

---

## 7. Comment bien expliquer cette matière à un élève

> Je n'ai consulté aucune chaîne YouTube ni aucun site de professeur. Les techniques ci-dessous sont des pratiques pédagogiques reconnues. Elles ne résument le contenu d'aucune vidéo.

1. **Partir du concret local.**
   - La boutique qui achète des sacs de riz : achats et stock.
   - La vente à crédit : compte client.
   - Le mobile money : trésorerie.
   - Le prix du mouton à la Tabaski : offre et demande, hausse saisonnière d'un prix. Ce n'est **pas** de l'inflation, qui est une hausse générale.
2. **Analogies efficaces**
   - Le bilan est une **photo**, le compte de résultat un **film**.
   - La partie double : **d'où vient l'argent, où va l'argent**.
   - L'amortissement : la moto-taxi qui s'use.
   - Le multiplicateur : le salaire dépensé au marché devient le revenu de la vendeuse.
   - Le seuil de rentabilité : le nombre de beignets à vendre pour payer l'étal.
3. **Toujours le même ordre** : lire, qualifier, calculer, choisir les comptes, choisir le sens, écrire, contrôler.
4. **Un exemple résolu, puis un exercice jumeau** avec d'autres chiffres, que l'élève fait seul.
5. **Des contrôles systématiques**
   - Débits égaux aux crédits ; actif égal au passif.
   - Cumul des amortissements égal à la base en fin de plan.
   - Concordance entre résultat analytique et résultat de la comptabilité générale.
   - Vraisemblance des chiffres : un taux de chômage de 300 % est forcément faux.
6. **Travailler par contrastes** : HT et TTC, charge et immobilisation, dotation et reprise, croissance et développement, pourcentage et point de pourcentage.
7. **Fiches mémoire** : comptes clés, formules, connecteurs logiques.
8. **Montrer à l'élève ce qui rapporte des points** : la formule, le calcul posé, la phrase d'interprétation.

---

## 8. Règles pour une IA qui corrige et explique des exercices de cette matière

1. **Identifier le contexte** : pays, série, classe, type d'épreuve. Demander une seule fois s'il manque, ou annoncer l'hypothèse retenue.
2. **Référentiel SYSCOHADA révisé**, jamais le PCG français.
   - Si l'élève utilise l'ancien SYSCOHADA parce que son professeur l'enseigne, l'IA l'accepte en le signalant.
   - Elle signale aussi les cas où deux pratiques coexistent : cessions en 654/754 ou en 81x/82x ; TFT ou TAFIRE.
3. **Données du sujet d'abord** : TVA, coefficients, jours, arrondis, taux sociaux.
4. **Formule, application numérique, résultat avec l'unité**, puis l'écriture, puis l'interprétation.
5. **Refaire chaque calcul avant de répondre.** Vérifier l'équilibre débit/crédit et les totaux, et **écrire ces contrôles**.
6. **Ne jamais affirmer avec assurance** un numéro de compte, un taux, une date institutionnelle, un barème, une statistique ou le contenu d'une vidéo dont l'IA n'est pas sûre. Écrire plutôt : « à vérifier dans ton plan comptable, ton cours ou le sujet officiel ».
7. **Corriger une réponse d'élève** : nommer l'erreur exacte (compte, sens, montant, base HT/TTC, prorata, signe), dire pourquoi elle coûte des points, puis montrer la correction de cette étape.
8. **Ne pas rédiger un devoir noté à la place de l'élève.**
   - Pour une dissertation : aider à analyser le sujet et à construire le plan, donner un exemple de paragraphe, puis relire ce que l'élève rédige.
   - Pour un dossier de comptabilité : détailler une opération modèle, puis laisser l'élève traiter les suivantes et les corriger.
   - Si l'élève dit qu'il est en examen ou en devoir surveillé, refuser poliment.
9. **En économie** : définir les notions, suivre la méthode lecture, calcul, interprétation, construire des arguments « affirmation, explication, exemple », et utiliser des exemples ouest-africains datés et sourcés.
10. **Adapter le niveau** : simple au brevet, technique en terminale. Phrases courtes.
11. **Terminer par une vérification** : une question ou un mini-exercice similaire.
12. **Respecter la monnaie du pays** : F CFA dans l'UEMOA, GNF en Guinée.

---

## 9. Sources (URL)

**Aucune source n'a pu être consultée pendant cette session.**
- Les 5 recherches web ont été refusées (budget de recherche épuisé).
- ohada.org, fr.wikipedia.org et officedubac.sn n'ont pas pu être résolus (nom de domaine introuvable).
- Un accès de test a été refusé par le proxy (403).

Aucune affirmation de ce guide n'est donc adossée à une URL vérifiée. Les sites suivants sont ceux à consulter en priorité. **Je ne les ai pas ouverts, et leur adresse elle-même reste à confirmer.**
- OHADA (AUDCIF, SYSCOHADA révisé, liste des États membres) : https://www.ohada.org **[non vérifiée]**
- BCEAO (objectif d'inflation, données de l'UEMOA) : https://www.bceao.int **[non vérifiée]**
- UEMOA (directive TVA, critères de convergence) : https://www.uemoa.int **[non vérifiée]**
- CEDEAO (retrait des pays de l'AES, projet Eco) : https://www.ecowas.int **[non vérifiée]**
- Office du Baccalauréat du Sénégal : https://officedubac.sn **[non vérifiée, accès bloqué]**
- Autres organismes à identifier :
  - DECO (Côte d'Ivoire) ;
  - CNECE (Mali) ;
  - offices du BAC du Burkina Faso, du Bénin, du Togo et du Niger ;
  - organisme des examens de Guinée ;
  - directions générales des impôts (taux de TVA, coefficients du dégressif, taxes bancaires).

  **Adresses non recherchées.**
- Sites d'annales cités dans la mission (Senevoc, sunubac, examen.sn, fomesoutra, afriquebac, monbac, sujetdebac) : **aucun n'a été consulté.**

**Nombre de recherches effectuées : 0 abouties.** Il y a eu 5 recherches web tentées et refusées, 3 lectures de pages tentées et échouées, et 1 test réseau refusé.

---

## 10. Points encore incertains (à faire valider par un professeur)

**Corrections apportées au brouillon** (à faire confirmer elles aussi)
- Le compte **6011** n'est pas un compte de réductions : les réductions obtenues hors facture vont en **6019** (et 7019 côté vendeur).
- La cause de l'erreur « remise sur facture enregistrée » était fausse. Le PCG français applique la même règle que le SYSCOHADA.
- **TFT et non TAFIRE** dans le SYSCOHADA révisé.
- Dans le révisé, la **valeur résiduelle** et l'**approche par composants** entrent dans le calcul de l'amortissement.
- Le **LIFO (DEPS) est interdit**.
- Le sigle de l'organisme d'examen malien est probablement **CNECE**, et non CNECS.
- Le PSE sénégalais a été remplacé en 2024 par l'Agenda Sénégal 2050.
- « PNB » est l'ancien nom du **RNB**.
- La formule du **multiplicateur en économie ouverte** a été ajoutée.
- Le calcul du **point mort pour une activité saisonnière** a été ajouté.
- Le cas « mouton de Tabaski » illustre une hausse d'un prix, **pas** de l'inflation.
- Une règle anti-« devoir rédigé à la place de l'élève » plus précise a été ajoutée.

**À vérifier en priorité**
1. Les séries, coefficients et durées des épreuves dans chacun des huit pays : existence de STEG, de la série B, de G3, et du BAC I au Togo.
2. Les comptes exacts du SYSCOHADA révisé :
   - 6019 et 7019 ;
   - 654/754 ou 81x/82x pour les cessions, et 485 ou 414 pour la créance sur cession ;
   - 415 et 56x pour l'escompte ;
   - 659x et 759x pour les dépréciations ;
   - 4194 et 4094 pour les emballages ;
   - 6015 « Frais sur achats ».
3. Les taux : TVA (18 %, 19 % au Niger), taxes sur les commissions bancaires, coefficients du dégressif, cotisations sociales.
4. La présence au programme des coûts préétablis, des écarts, de la paie et du TFT selon le pays.
5. La situation institutionnelle à la date de l'examen : AES face à l'UEMOA et la BCEAO, Guinée et CEDEAO, Eco, plans nationaux en vigueur.
6. L'objectif d'inflation de la BCEAO (1 à 3 %) et le critère de convergence de l'UEMOA (3 % au plus).
7. Les pratiques de barème (erreur reportée, poids de la présentation) : à confirmer avec des corrigés officiels ou des correcteurs.
8. Les chaînes YouTube et les sites de professeurs africains de référence : à identifier et à visionner par un humain avant de les citer.