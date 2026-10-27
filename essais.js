// Exercices d'essai, un par niveau, pour l'élève qui n'a pas d'exercice sous la main au premier lancement.
// Corrigés une fois par l'appli (Haiku 5.5, le 27 octobre 2026), relus à la main : calculs et entraînements justes.
// Aucun pays précis, pour convenir aux 8 pays. Pas d'appel à l'IA, donc gratuit et instantané.
const ESSAIS = {
  "primaire": {
    "texte": "Problème : Awa a 2 500 FCFA. Elle achète 3 cahiers à 350 FCFA l'un et un stylo à 150 FCFA. Combien d'argent lui reste-t-il ?",
    "correction": {
      "matiere": "Mathématiques",
      "niveau": "Primaire",
      "enonce": "Awa a 2 500 FCFA. Elle achète 3 cahiers à 350 FCFA l'un et un stylo à 150 FCFA. Calcule l'argent qui lui reste.",
      "indice": "Avant de savoir ce qui reste, il faut savoir combien Awa dépense en tout. Pense à calculer le prix des 3 cahiers en premier.",
      "demarrage": {
        "question": "Par quoi commencer pour trouver ce qui reste à Awa ?",
        "choix": [
          {
            "texte": "Soustraire 150 FCFA de 2 500 FCFA.",
            "juste": false,
            "retour": "Non. Le stylo n'est qu'un seul des achats : on ne doit pas oublier les cahiers."
          },
          {
            "texte": "Multiplier 2 500 FCFA par 3.",
            "juste": false,
            "retour": "Non. Le 3 concerne les cahiers, pas l'argent de départ d'Awa."
          },
          {
            "texte": "Calculer d'abord le prix total des cahiers et du stylo.",
            "juste": true,
            "retour": "Oui. Pour savoir ce qui reste, il faut d'abord connaître la dépense totale."
          }
        ]
      },
      "methode": [
        "Lire l'énoncé et repérer l'argent de départ.",
        "Calculer le prix de chaque type d'objet acheté : nombre × prix.",
        "Additionner tous les achats pour trouver la dépense totale.",
        "Soustraire la dépense totale de l'argent de départ.",
        "Vérifier en additionnant la dépense et le reste : on doit retrouver l'argent de départ."
      ],
      "etapes": [
        {
          "titre": "Calculer le prix des cahiers",
          "explication": "Awa prend 3 cahiers, chacun à 350 FCFA. On multiplie le nombre de cahiers par leur prix.",
          "calcul": "3 × 350 = 1 050 FCFA",
          "marge": "Multiplication avant addition."
        },
        {
          "titre": "Ajouter le stylo",
          "explication": "On ajoute le prix du stylo au prix des cahiers pour avoir la dépense totale.",
          "calcul": "1 050 + 150 = 1 200 FCFA",
          "marge": ""
        },
        {
          "titre": "Calculer ce qui reste",
          "explication": "On soustrait la dépense totale de l'argent de départ.",
          "calcul": "2 500 − 1 200 = 1 300 FCFA",
          "marge": "Bien poser la soustraction."
        },
        {
          "titre": "Vérifier",
          "explication": "Si le calcul est juste, la dépense et le reste font ensemble l'argent de départ.",
          "calcul": "1 200 + 1 300 = 2 500 FCFA, c'est bien l'argent de départ.",
          "marge": ""
        }
      ],
      "reponse": "Il reste 1 300 FCFA à Awa.",
      "pieges": [
        "Oublier le stylo dans le calcul de la dépense.",
        "Soustraire le prix d'un seul objet au lieu du total des achats.",
        "Oublier d'écrire l'unité FCFA dans la réponse."
      ],
      "entrainement": {
        "enonce": "Fatou a 1 000 FCFA. Elle achète 2 crayons à 125 FCFA l'un et une gomme à 200 FCFA. Combien lui reste-t-il ?",
        "solution": "2 × 125 = 250 ; 250 + 200 = 450 ; 1 000 − 450 = 550. Il reste 550 FCFA à Fatou."
      }
    }
  },
  "college": {
    "texte": "Calcule et donne le résultat sous forme de fraction irréductible : A = 2/3 + 5/6 − 1/4",
    "correction": {
      "matiere": "Maths",
      "niveau": "6e – 5e",
      "enonce": "Calcule A = 2/3 + 5/6 − 1/4 et donne le résultat sous forme de fraction irréductible, c'est-à-dire une fraction qu'on ne peut plus simplifier.",
      "indice": "Pour additionner ou soustraire des fractions, il faut d'abord qu'elles aient le même dénominateur. Cherche un nombre que 3, 6 et 4 divisent tous les trois.",
      "demarrage": {
        "question": "Par quoi commences-tu pour calculer 2/3 + 5/6 − 1/4 ?",
        "choix": [
          {
            "texte": "Additionner les numérateurs entre eux (2 + 5 − 1) et les dénominateurs entre eux (3 + 6 − 4).",
            "juste": false,
            "retour": "Non : on n'additionne jamais les dénominateurs. Cette règle donne un résultat faux."
          },
          {
            "texte": "Mettre toutes les fractions au même dénominateur.",
            "juste": true,
            "retour": "Oui : quand les dénominateurs sont identiques, on peut additionner ou soustraire les numérateurs."
          },
          {
            "texte": "Multiplier les fractions entre elles.",
            "juste": false,
            "retour": "Non : multiplier sert pour un produit, pas pour une somme ou une différence."
          }
        ]
      },
      "methode": [
        "Chercher le plus petit dénominateur commun, c'est-à-dire le plus petit nombre que tous les dénominateurs divisent.",
        "Multiplier le haut et le bas de chaque fraction par le même nombre pour obtenir ce dénominateur.",
        "Additionner ou soustraire les numérateurs, en gardant le dénominateur commun.",
        "Simplifier la fraction finale si possible, en divisant le haut et le bas par leur plus grand diviseur commun.",
        "Vérifier le résultat avec des nombres décimaux."
      ],
      "etapes": [
        {
          "titre": "Trouver le dénominateur commun",
          "explication": "On cherche le plus petit nombre divisible par 3, 6 et 4. Les multiples de 6 sont 6, 12, 18… ; 12 est divisible par 3 et par 4.",
          "calcul": "12 = 3 × 4 = 6 × 2 = 4 × 3",
          "marge": "Plus petit commun, pas forcément le produit."
        },
        {
          "titre": "Convertir chaque fraction en dénominateur 12",
          "explication": "Pour passer de 3 à 12, on multiplie par 4. Pour passer de 6 à 12, on multiplie par 2. Pour passer de 4 à 12, on multiplie par 3. On fait la même chose en haut et en bas.",
          "calcul": "2/3 = (2 × 4)/(3 × 4) = 8/12\n5/6 = (5 × 2)/(6 × 2) = 10/12\n1/4 = (1 × 3)/(4 × 3) = 3/12",
          "marge": ""
        },
        {
          "titre": "Calculer la somme et la différence",
          "explication": "Les trois fractions ont maintenant le même dénominateur. On garde 12 et on calcule avec les numérateurs.",
          "calcul": "A = 8/12 + 10/12 − 3/12 = (8 + 10 − 3)/12 = 15/12",
          "marge": "Attention au signe moins devant 3."
        },
        {
          "titre": "Simplifier la fraction",
          "explication": "15 et 12 sont tous les deux divisibles par 3. Après division, on obtient 5 et 4, qui n'ont plus de diviseur commun autre que 1.",
          "calcul": "15/12 = (15 ÷ 3)/(12 ÷ 3) = 5/4",
          "marge": "Vérifier qu'il reste un seul diviseur commun : 1."
        }
      ],
      "reponse": "A = 5/4",
      "pieges": [
        "Additionner les numérateurs et les dénominateurs entre eux : 2/3 + 5/6 ne donne pas 7/9.",
        "Oublier de simplifier : 15/12 n'est pas irréductible, il faut écrire 5/4.",
        "Oublier le signe moins devant 1/4 et ajouter cette fraction au lieu de la soustraire."
      ],
      "entrainement": {
        "enonce": "Calcule B = 1/2 + 2/3 − 1/6. Donne le résultat sous forme de fraction irréductible ou d'entier.",
        "solution": "Dénominateur commun 6 : 1/2 = 3/6, 2/3 = 4/6, donc B = 3/6 + 4/6 − 1/6 = (3 + 4 − 1)/6 = 6/6 = 1. Réponse : B = 1."
      }
    }
  },
  "brevet": {
    "texte": "Exercice 2 (4 points)\nOn considère l'expression E = (2x − 3)² − (x + 1)(2x − 3).\n1) Développe et réduis E.\n2) Factorise E.\n3) Résous l'équation (2x − 3)(x − 4) = 0.",
    "correction": {
      "matiere": "Maths",
      "niveau": "4e – 3e",
      "enonce": "On te donne l'expression E = (2x − 3)² − (x + 1)(2x − 3). 1) Développe et réduis E. 2) Factorise E. 3) Résous l'équation (2x − 3)(x − 4) = 0.",
      "indice": "Regarde si le facteur (2x − 3) apparaît dans les deux termes de E. Cela peut t'aider pour la question 2.",
      "demarrage": {
        "question": "Pour la question 1, par quoi commences-tu ?",
        "choix": [
          {
            "texte": "Je développe séparément (2x − 3)² puis (x + 1)(2x − 3), en gardant le signe − entre les deux.",
            "juste": true,
            "retour": "Oui : on développe chaque morceau, puis on soustrait le second au premier."
          },
          {
            "texte": "Je calcule directement E pour x = 0.",
            "juste": false,
            "retour": "Cela donne seulement une valeur de E pour x = 0, pas l'expression développée demandée."
          },
          {
            "texte": "Je multiplie 2x par 2x et je m'arrête là.",
            "juste": false,
            "retour": "Il faut développer tous les termes, pas seulement le premier."
          }
        ]
      },
      "methode": [
        "Développer chaque produit avec la règle de distributivité ou une identité remarquable, en gardant les signes.",
        "Réduire : regrouper les termes en x², en x et les nombres.",
        "Pour factoriser, chercher d'abord un facteur commun aux deux termes de l'expression de départ.",
        "Vérifier en développant le résultat factorisé.",
        "Pour résoudre un produit égal à zéro, poser chaque facteur égal à zéro et résoudre chaque équation."
      ],
      "etapes": [
        {
          "titre": "Développer (2x − 3)²",
          "explication": "On utilise l'identité (a − b)² = a² − 2ab + b², avec a = 2x et b = 3.",
          "calcul": "(2x − 3)² = (2x)² − 2 × 2x × 3 + 3² = 4x² − 12x + 9",
          "marge": "Ne pas oublier le double produit."
        },
        {
          "titre": "Développer (x + 1)(2x − 3)",
          "explication": "Chaque terme de la première parenthèse multiplie chaque terme de la seconde.",
          "calcul": "(x + 1)(2x − 3) = 2x² − 3x + 2x − 3 = 2x² − x − 3",
          "marge": ""
        },
        {
          "titre": "Soustraire et réduire",
          "explication": "Le signe − devant la deuxième expression change tous les signes de celle-ci.",
          "calcul": "E = (4x² − 12x + 9) − (2x² − x − 3) = 4x² − 12x + 9 − 2x² + x + 3 = 2x² − 11x + 12",
          "marge": "Attention au signe devant la parenthèse."
        },
        {
          "titre": "Factoriser E",
          "explication": "Le facteur (2x − 3) est présent dans les deux termes de E. On le met en facteur, puis on calcule ce qui reste : (2x − 3) − (x + 1).",
          "calcul": "E = (2x − 3)(2x − 3) − (x + 1)(2x − 3) = (2x − 3)[(2x − 3) − (x + 1)] = (2x − 3)(x − 4)",
          "marge": "Ne pas oublier le facteur commun."
        },
        {
          "titre": "Vérifier le résultat",
          "explication": "On développe la forme factorisée pour retrouver la forme trouvée à la question 1.",
          "calcul": "(2x − 3)(x − 4) = 2x² − 8x − 3x + 12 = 2x² − 11x + 12",
          "marge": "Vérification facile, à faire toujours."
        },
        {
          "titre": "Résoudre (2x − 3)(x − 4) = 0",
          "explication": "Un produit de facteurs est nul si et seulement si l'un des facteurs est nul. On résout donc deux équations.",
          "calcul": "2x − 3 = 0 donc 2x = 3 donc x = 3/2 ; ou x − 4 = 0 donc x = 4. L'ensemble des solutions est S = {3/2 ; 4}.",
          "marge": "Deux solutions, ne pas en oublier une."
        }
      ],
      "reponse": "1) E = 2x² − 11x + 12. 2) E = (2x − 3)(x − 4). 3) Les solutions sont x = 3/2 et x = 4, donc S = {3/2 ; 4}.",
      "pieges": [
        "Oublier le double produit : (2x − 3)² n'est pas égal à 4x² + 9.",
        "Ne pas changer les signes de (x + 1)(2x − 3) quand on soustrait.",
        "Oublier le facteur commun à la question 2 et factoriser de travers.",
        "Écrire 2x − 3 = 0 donc x = −3/2 : le signe de 3 change en passant de l'autre côté, mais il reste positif.",
        "Ne donner qu'une seule solution à l'équation produit."
      ],
      "entrainement": {
        "enonce": "Développe et réduis F = (x + 2)² − (x − 1)(x + 2), puis factorise F.",
        "solution": "F = x² + 4x + 4 − (x² + x − 2) = 3x + 6 = 3(x + 2). Forme factorisée : F = (x + 2)[(x + 2) − (x − 1)] = 3(x + 2)."
      }
    }
  },
  "lycee": {
    "texte": "Au marché, 2 mangues et 3 oranges coûtent 650 FCFA. 1 mangue et 2 oranges coûtent 400 FCFA. Quel est le prix d'une mangue et celui d'une orange ?",
    "correction": {
      "matiere": "Maths",
      "niveau": "Seconde",
      "enonce": "Au marché, 2 mangues et 3 oranges coûtent 650 FCFA. 1 mangue et 2 oranges coûtent 400 FCFA. Quel est le prix d'une mangue et celui d'une orange ?",
      "indice": "Il y a deux inconnues (le prix d'une mangue et celui d'une orange) et deux achats. Il faut donc deux équations, résolues ensemble : c'est ce qu'on appelle un système.",
      "demarrage": {
        "question": "Par quoi commencer ?",
        "choix": [
          {
            "texte": "Additionner 650 et 400 pour trouver le prix total.",
            "juste": false,
            "retour": "Cette somme mélange deux achats différents, elle ne donne le prix d'aucun fruit."
          },
          {
            "texte": "Donner une lettre à chaque inconnue : m pour la mangue, o pour l'orange.",
            "juste": true,
            "retour": "Oui : on traduit d'abord le problème en lettres, avant de calculer."
          },
          {
            "texte": "Diviser 650 par 2 pour trouver le prix d'une mangue.",
            "juste": false,
            "retour": "650 correspond à 2 mangues et 3 oranges : on ne peut pas isoler la mangue ainsi."
          }
        ]
      },
      "methode": [
        "Je suppose que le prix d'une mangue et celui d'une orange sont les mêmes dans les deux achats.",
        "Nommer les inconnues avec une lettre et leur unité (FCFA).",
        "Traduire chaque achat par une équation.",
        "Résoudre le système par substitution : exprimer une inconnue à partir de l'équation la plus simple, puis la remplacer dans l'autre.",
        "Calculer la deuxième inconnue.",
        "Vérifier la solution dans les deux équations.",
        "Conclure par une phrase avec l'unité."
      ],
      "etapes": [
        {
          "titre": "Nommer les inconnues",
          "explication": "On choisit une lettre pour chaque prix inconnu, et on précise l'unité.",
          "calcul": "m : prix d'une mangue (en FCFA) ; o : prix d'une orange (en FCFA)",
          "marge": "Ne pas oublier l'unité"
        },
        {
          "titre": "Traduire en système",
          "explication": "Chaque achat donne une équation. Pour 2 mangues et 3 oranges à 650 FCFA, on écrit 2m + 3o = 650. Pour 1 mangue et 2 oranges à 400 FCFA, on écrit m + 2o = 400.",
          "calcul": "{ 2m + 3o = 650 ; m + 2o = 400 }",
          "marge": ""
        },
        {
          "titre": "Exprimer m avec la deuxième équation",
          "explication": "La deuxième équation est la plus simple : on isole m en lui retirant 2o des deux côtés.",
          "calcul": "m + 2o = 400, donc m = 400 − 2o",
          "marge": ""
        },
        {
          "titre": "Remplacer m dans la première équation",
          "explication": "On remplace m par 400 − 2o. Les parenthèses sont obligatoires pour multiplier correctement par 2.",
          "calcul": "2(400 − 2o) + 3o = 650 ; 800 − 4o + 3o = 650 ; −o = 650 − 800 ; −o = −150 ; o = 150",
          "marge": "Attention au signe moins"
        },
        {
          "titre": "Calculer m",
          "explication": "On reprend m = 400 − 2o et on remplace o par sa valeur, 150.",
          "calcul": "m = 400 − 2 × 150 = 400 − 300 = 100",
          "marge": ""
        },
        {
          "titre": "Vérifier",
          "explication": "On remplace m et o dans les deux équations de départ. Si les deux égalités sont justes, la solution est correcte.",
          "calcul": "2 × 100 + 3 × 150 = 200 + 450 = 650 ✓ ; 100 + 2 × 150 = 100 + 300 = 400 ✓",
          "marge": ""
        },
        {
          "titre": "Conclure",
          "explication": "On répond à la question posée, avec l'unité.",
          "calcul": "Une mangue coûte 100 FCFA et une orange coûte 150 FCFA.",
          "marge": ""
        }
      ],
      "reponse": "Une mangue coûte 100 FCFA et une orange coûte 150 FCFA.",
      "pieges": [
        "Oublier les parenthèses lors de la substitution : écrire 2 × 400 − 2o au lieu de 2(400 − 2o).",
        "Mal gérer le signe moins en passant de −o = −150 à o = 150.",
        "Confondre les deux achats, par exemple en utilisant 3 mangues au lieu de 2.",
        "Ne pas vérifier la solution dans les deux équations : une erreur de calcul peut passer inaperçue."
      ],
      "entrainement": {
        "enonce": "Au marché, 3 mangues et 1 orange coûtent 500 FCFA. 1 mangue et 3 oranges coûtent 300 FCFA. Quel est le prix d'une mangue et celui d'une orange ? Essaie d'abord seul(e) avec la méthode de substitution.",
        "solution": "Mangue : 150 FCFA ; orange : 50 FCFA. Vérification : 3 × 150 + 50 = 500 ✓ ; 150 + 3 × 50 = 300 ✓."
      }
    }
  },
  "bac": {
    "texte": "Dans un lycée, 60 % des élèves déclarent réviser chaque soir, les autres déclarent ne pas réviser. On estime que 15 % de ceux qui déclarent réviser ne révisent pas en réalité, et que 25 % de ceux qui déclarent ne pas réviser révisent en réalité. Le surveillant affirme qu'il y a 61 chances sur 100 qu'un élève choisi au hasard révise effectivement chaque soir. Confirme ou infirme les propos du surveillant. (4 points)",
    "correction": {
      "matiere": "Maths",
      "niveau": "Terminale",
      "enonce": "Dans un lycée, 60 % des élèves déclarent réviser chaque soir. Parmi ceux qui le déclarent, 15 % ne révisent pas en réalité. Parmi ceux qui déclarent ne pas réviser, 25 % révisent en réalité. Le surveillant affirme qu'un élève choisi au hasard a 61 chances sur 100 de réviser vraiment chaque soir. Tu dois confirmer ou infirmer ce propos.",
      "indice": "Sépare les élèves en deux groupes : ceux qui déclarent réviser et ceux qui déclarent ne pas réviser. Dans chaque groupe, un élève révise vraiment ou ne révise pas. Ensuite, additionne les deux cas qui mènent à « révise vraiment ».",
      "demarrage": {
        "question": "Par quoi commencer pour trouver la probabilité qu'un élève révise vraiment ?",
        "choix": [
          {
            "texte": "Calculer directement 0,6 × 0,15 et donner ce résultat.",
            "juste": false,
            "retour": "Ce calcul donne seulement la part des élèves qui déclarent réviser sans réviser, pas la probabilité demandée."
          },
          {
            "texte": "Dessiner un arbre pondéré avec les deux groupes (déclare réviser ou non), puis les deux cas dans chaque groupe.",
            "juste": true,
            "retour": "Oui : l'arbre montre les deux étapes et permet d'appliquer la formule des probabilités totales."
          },
          {
            "texte": "Additionner 60 % et 25 % pour trouver la réponse.",
            "juste": false,
            "retour": "Il faut tenir compte des pourcentages à l'intérieur de chaque groupe, pas seulement des pourcentages de déclaration."
          }
        ]
      },
      "methode": [
        "Nommer les événements (R : l'élève déclare réviser ; V : l'élève révise vraiment).",
        "Relever les probabilités données, y compris celles qui sont conditionnelles.",
        "Dessiner un arbre pondéré : sur chaque branche issue d'un même nœud, la somme vaut 1.",
        "Multiplier le long de chaque chemin qui mène à V, puis additionner (formule des probabilités totales).",
        "Comparer le résultat à la phrase du propos et conclure par une phrase : confirmé ou infirmé."
      ],
      "etapes": [
        {
          "titre": "Nommer les événements et lire les données",
          "explication": "On définit R et V. Les données « 15 % ne révisent pas » et « 25 % révisent » sont des probabilités conditionnelles : elles dépendent du groupe.",
          "calcul": "P(R) = 0,6 ; P(non R) = 0,4 ; P_R(V) = 0,85 (car 1 − 0,15) ; P_(non R)(V) = 0,25.",
          "marge": "Attention au complément de 15 %."
        },
        {
          "titre": "Construire l'arbre pondéré",
          "explication": "Premier niveau : déclare réviser (0,6) ou non (0,4). Deuxième niveau : dans chaque groupe, révise vraiment ou non. Vérifie que les deux branches de chaque nœud ont une somme égale à 1.",
          "calcul": "Groupe R : V 0,85 ; non V 0,15. Groupe non R : V 0,25 ; non V 0,75.",
          "marge": "Somme des branches = 1."
        },
        {
          "titre": "Calculer les probabilités des chemins qui mènent à V",
          "explication": "Un élève révise vraiment s'il est dans le groupe R et révise, OU s'il est dans le groupe non R et révise. Ces deux cas sont incompatibles, donc on additionne.",
          "calcul": "P(R ∩ V) = 0,6 × 0,85 = 0,51 ; P(non R ∩ V) = 0,4 × 0,25 = 0,10 ; P(V) = 0,51 + 0,10 = 0,61.",
          "marge": "Additionner les chemins, pas les multiplier."
        },
        {
          "titre": "Vérifier le résultat",
          "explication": "On contrôle en calculant la probabilité complémentaire : elle doit donner 1 quand on l'ajoute à P(V).",
          "calcul": "P(non V) = 0,6 × 0,15 + 0,4 × 0,75 = 0,09 + 0,30 = 0,39 ; 0,61 + 0,39 = 1.",
          "marge": "Contrôle rapide, à garder sur la copie."
        },
        {
          "titre": "Conclure par rapport au propos",
          "explication": "Le propos dit 61 chances sur 100, soit une probabilité de 0,61. C'est exactement le résultat trouvé.",
          "calcul": "P(V) = 0,61 = 61/100.",
          "marge": "Phrase de conclusion obligatoire."
        }
      ],
      "reponse": "Le surveillant a raison : la probabilité qu'un élève choisi au hasard révise vraiment est 0,61, soit 61 chances sur 100. Propos confirmé. (Barème indicatif, non officiel : arbre ou méthode, calcul des deux chemins, puis conclusion.)",
      "pieges": [
        "Confondre P_R(V) avec P(R ∩ V) : la première est une probabilité conditionnelle, la seconde une probabilité totale.",
        "Oublier le groupe de ceux qui déclarent ne pas réviser et ne retenir que 0,51.",
        "Utiliser 25 % pour P(non R ∩ V) sans multiplier par P(non R) = 0,4.",
        "Oublier la phrase de conclusion qui répond à « confirme ou infirme »."
      ],
      "entrainement": {
        "enonce": "Dans une ville, 70 % des habitants possèdent un téléphone de marque A. Parmi eux, 90 % ont un forfait internet. Parmi les autres, 20 % ont un forfait internet. Un habitant est choisi au hasard. Quelle est la probabilité qu'il ait un forfait internet ? Un journaliste affirme qu'il y a plus d'une chance sur deux. Confirme ou infirme.",
        "solution": "0,7 × 0,9 = 0,63 ; 0,3 × 0,2 = 0,06 ; total 0,63 + 0,06 = 0,69. Il y a 69 chances sur 100, donc plus d'une chance sur deux : le journaliste a raison (propos confirmé)."
      }
    }
  }
};
