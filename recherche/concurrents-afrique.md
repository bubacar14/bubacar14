# Rapport non produit : aucune recherche n'a pu être faite

**Recherches réussies : 0.** Je n'ai pas pu faire les 30 à 50 recherches demandées. Je ne rends donc pas le rapport sourcé de 2000 à 3500 mots, parce qu'il serait écrit de mémoire et sans aucune source vérifiée.

## Ce qui a bloqué

1. **Recherche web épuisée.** Mes 4 requêtes ont été refusées : la limite de 200 recherches web pour ce tour, partagée par tous les agents du workflow, était déjà atteinte avant que je commence. Les 4 requêtes étaient :
   - « uLesson funding raised Series B 2026 layoffs »
   - « Eneza Education shut down why »
   - « Afrilearn edtech Nigeria free model users funding »
   - « M-Shule SMS learning Kenya pricing model »
2. **Lecture directe des pages impossible.** Les 4 lectures directes ont échoué (`getaddrinfo ENOTFOUND`) :
   - ulesson.com
   - www.afrilearn.com
   - www.siyavula.com
   - en.wikipedia.org (page Eneza_Education)

   Un test en ligne de commande sur techcabal.com a aussi été refusé par le proxy réseau (403). Le journal du proxy montre les mêmes refus plus tôt dans la session pour officedubac.sn, www.youtube.com, www.sigmaths.net et www.sencampus.com.

## Pistes de mémoire, toutes non vérifiées

Ce sont des souvenirs, sans source consultée. Ils peuvent être faux ou dépassés en octobre 2026 et ne doivent pas être cités tels quels.

- **uLesson (Nigeria)** : fondé vers 2019 par Sim Shagaya. Je crois à une levée seed, puis une Série A (environ 7,5 M$), puis une Série B (environ 15 M$, menée par Owl Ventures, fin 2021). Contenus vidéo dans l'appli et sur support hors ligne (carte SD ou tablette), puis du tutorat en direct. Je ne sais pas s'il y a eu des licenciements ou une réorientation.
- **Eneza Education (Kenya)** : apprentissage par SMS et USSD, avec un abonnement à très bas prix via un opérateur (Safaricom, offre « Shupavu »). Je ne sais pas ce qu'est devenue l'entreprise (fermeture, rachat ?).
- **M-Shule (Kenya)** : apprentissage adaptatif par SMS. Modèle et prix exacts non vérifiés.
- **Siyavula (Afrique du Sud)** : exercices adaptatifs de maths et de sciences, une partie gratuite, accès parfois sans coût de données mobiles. Les études d'impact sont à confirmer.
- **Ubongo (Tanzanie)** : programmes éducatifs pour enfants diffusés à la télé et à la radio (Ubongo Kids, Akili and Me), avec une audience de masse. Chiffres non vérifiés.
- **Snapplify (Afrique du Sud)** : distribution de manuels numériques et plateforme pour les écoles. Levées non vérifiées.
- **Afrilearn, Gradely (Nigeria)** : leçons vidéo pour les examens WAEC (Afrilearn) et apprentissage adaptatif (Gradely). Leur sort (actives, réorientées, fermées) n'est pas vérifié.
- **Kalanso, Sunu Bac, Teachmate, Bac Afrique** : je n'ai pas d'information fiable. Il faut tout vérifier, y compris le pays et le fait que l'entreprise existe encore.

Leçons générales que je pense avoir lues souvent sur la edtech africaine, sans preuve rassemblée ici :
- Le coût des données mobiles et le prix d'un abonnement freinent beaucoup.
- Les canaux à bas débit (SMS, USSD, WhatsApp) et les partenariats avec les opérateurs (accès sans coût de données, facturation par l'opérateur) aident à toucher beaucoup d'élèves.
- Les modèles payés directement par les familles ont souvent eu du mal à devenir rentables.

## Sources à consulter quand l'accès reviendra (aucune consultée)

- Sites des entreprises : ulesson.com, afrilearn.com, siyavula.com, ubongo.org, snapplify.com
- Presse tech africaine : techcabal.com, techpoint.africa, disrupt-africa.com, wearetech.africa
- Offices du BAC : officedubac.sn
- Chaînes YouTube de profs africains et francophones

Pour faire la vraie recherche, il faut relancer cette étape avec un nouveau quota de recherches web (par un message de suite, ou en augmentant `CLAUDE_CODE_MAX_WEB_SEARCHES_PER_SESSION`) et un accès réseau à ces sites. Je n'ai écrit aucun fichier.