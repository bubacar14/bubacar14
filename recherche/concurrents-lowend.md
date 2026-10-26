# Concevoir Révizo pour des Android d'entrée de gamme et une data lente ou chère : rapport de recherche

> **Méthode et limites, à lire en premier**
> - **Aucune recherche web n'a abouti.** Le quota de recherches partagé entre les agents de cette exécution était épuisé (limite de 200 par tour). Mes 3 tentatives ont été refusées. L'exigence de l'utilisateur (30 à 50 recherches) **n'est donc pas remplie**.
> - **Lectures directes à la place.** J'ai fait environ 97 lectures de pages (WebFetch) sur des adresses connues. Environ 55 ont abouti. Les autres ont échoué : domaine bloqué par la politique réseau, ou page inexistante (erreur 404).
> - **Domaines inaccessibles :** Wikipedia, GSMA, Opera, Wave, Meta/engineering.fb.com, Google Play, YouTube, Banque mondiale, Our World in Data, A4AI, cable.co.uk, web.dev, MDN et W3C en direct.
> - **Ce qui a marché :** developer.android.com et GitHub. J'ai pu lire le contenu source de web.dev, MDN et du Web Almanac, qui y est publié en markdown.
> - **Conséquence :** les chiffres sur **Facebook Lite, Google Go, Opera Mini et Wave**, ainsi que les statistiques **par pays** d'Afrique de l'Ouest (prix du Go, taux de smartphones), **n'ont pas pu être vérifiés dans cette session**. Ils sont signalés comme tels.
> - **Pour compléter :** l'utilisateur peut relancer une demande pour faire les recherches manquantes, ou augmenter la variable CLAUDE_CODE_MAX_WEB_SEARCHES_PER_SESSION.

---

## 1. Ce que font les meilleurs (exemples concrets, écrans, parcours, chiffres sourcés)

### 1.1 Les PWA « Lite » des marchés émergents : des chiffres vérifiés

**Konga (Nigeria, e-commerce)**
- **Contexte :** près des deux tiers des utilisateurs nigérians de Konga se connectaient en 2G, et beaucoup hésitaient à télécharger l'appli native à cause du coût des données.
- **Résultats de la PWA :**
  - **92 % de données en moins** pour le premier chargement par rapport à l'appli native ;
  - **82 % de données en moins** pour réaliser une première transaction ;
  - **63 % de moins** que l'ancien site mobile pour le premier chargement.
- **Hors ligne :** on peut continuer à parcourir les catégories et revoir ses recherches sans connexion. On peut même finaliser une commande hors ligne en appelant le service client.
- Source : https://web.dev/konga/ (lu via https://raw.githubusercontent.com/GoogleChrome/web.dev/main/src/site/content/en/blog/konga/index.md)

**Jumia (Afrique, e-commerce)**
- **Contexte :** plus de 65 % du trafic web venait des navigateurs mobiles. Environ un quart des paniers mobiles étaient abandonnés chaque jour.
- **Notifications push web :**
  - **38 % de taux d'ouverture** sur mobile ;
  - **9 fois plus de paniers récupérés** qu'avant ;
  - **7,85 % de conversion**, contre 4,5 % pour l'appli native.
- **Citation du CEO :** les clients « redoutent l'impact [du téléchargement de nos applis] sur leur facture de données ».
- **Ce que l'étude ne donne pas :** aucune mesure de consommation de données ni de performance en 2G.
- Source : https://web.dev/jumia2016/ (raw : …/blog/jumia2016/index.md)

**Ola (Inde, VTC, villes de « Tier 2 et 3 »)**
- **Poids :** la PWA pèse environ **200 Ko**, soit environ 300 fois moins que l'appli Android (60 Mo). Une visite répétée peut ne consommer que **10 Ko**.
- **Vitesse en 2G/3G :** environ 3,4 s à la première visite, moins d'1 s ensuite.
- **Conversion :** dans les villes de Tier 3, elle est **supérieure de 30 % à l'appli native**.
- **Retour d'anciens utilisateurs :** **20 % des réservants avaient déjà désinstallé l'appli native**.
- **Stratégie :** Ola garde les deux, appli native et PWA, et laisse l'utilisateur choisir selon sa bande passante.
- Source : https://web.dev/ola/ (raw : …/blog/ola/index.md)

**Twitter Lite**
- **Poids :** environ **600 Ko transférés**, contre 23,5 Mo pour l'appli Android. Il occupe moins de 3 % du stockage de l'appli native.
- **Engagement :** +65 % de pages par session, +75 % de tweets envoyés, −20 % de taux de rebond.
- **Mode économie de données :** les médias ne se téléchargent qu'à la demande. L'optimisation des images réduit la data jusqu'à 70 % pendant le défilement.
- **Vitesse :** premier chargement en moins de 5 s en 3G.
- Source : https://web.dev/twitter/ (raw : …/blog/twitter/index.md)
- Complément : avec le mode Data Saver, les aperçus d'images sont en basse résolution et l'image complète s'ouvre au toucher. Résultat : environ −50 % de data image sur les applis, −80 % sur le web. Source : …/blog/adaptive-loading-cds-2019/index.md

**BookMyShow (Inde)**
- PWA d'environ **440 Ko**, 54 fois plus légère que l'appli Android.
- **+80 % de conversions.**
- Premier chargement en 2G d'environ 4 s.
- Source : https://web.dev/bookmyshow/

**Flipkart Lite (Inde)**
- 3 fois moins de data pour une première transaction.
- **60 % des visites lancées depuis l'icône de l'écran d'accueil.**
- **+70 % de conversion** pour ces visiteurs.
- Source : https://web.dev/flipkart/
- Attention : ces études datent de 2016-2017.

**Le parcours commun à ces cas :**
1. Un lien (pub, recherche, partage) ouvre directement l'appli web : aucun passage par le store.
2. Le service worker met en cache la coquille de l'appli.
3. Les visites suivantes coûtent quelques Ko.
4. L'utilisateur se voit proposer « Ajouter à l'écran d'accueil ».
5. Il est relancé par notification push.

### 1.2 Android (Go edition) : les seuils officiels

- **Mémoire minimale :** Android Go vise les appareils à faible mémoire :
  - 512 Mo jusqu'à Android 10 ;
  - 1 Go pour Android 11-12 ;
  - 2 Go pour Android 13.
  - Source : https://developer.android.com/guide/topics/androidgo
- **Cibles pour une appli Go :**
  - taille installée **< 40 Mo** ;
  - mémoire utilisée (PSS) **≤ 90 Mo** (150 Mo pour les jeux) ;
  - démarrage **< 5 s**.
  - Source : https://developer.android.com/docs/quality-guidelines/build-for-billions/device-capacity
- **Deux stratégies admises par Google :** une seule appli optimisée pour tous, ou une appli « lite » séparée. Source : https://developer.android.com/guide/topics/androidgo/best-practices
- **Fonctions désactivées par défaut :** fenêtre flottante (picture-in-picture), écran partagé, fonds d'écran animés, raccourcis du lanceur, etc. Source : https://developer.android.com/guide/topics/androidgo

### 1.3 Facebook Lite, Google Go, Opera Mini, Wave : non vérifié

Je n'ai pu accéder à aucune source primaire ou secondaire sur ces quatre produits : domaines bloqués.

**Ce qui est généralement connu, mais n'a pas été vérifié ici :**
- **Facebook Lite :** appli de quelques Mo conçue pour la 2G.
- **Google Go :** appli Google allégée, avec lecture à voix haute des pages.
- **Opera Mini :** compresse les pages côté serveur. Il est historiquement très utilisé en Afrique.
- **Wave :** interface volontairement minimale, modèle de frais bas.

**Chiffres à ne pas réutiliser sans vérification :** taille d'APK, part de marché, pourcentage de compression, frais de Wave.

### 1.4 L'état du web « normal », pour comparaison

- **Poids médian d'une page mobile en 2024 : 2 311 Ko.** Dont environ 900 Ko d'images et 558 Ko de JavaScript. Ce poids a augmenté de 357 % en 10 ans. Source : https://raw.githubusercontent.com/HTTPArchive/almanac.httparchive.org/main/src/content/en/2024/page-weight.md
- **Écart avec les « Lite » :** une page « normale » pèse environ **10 fois plus** que la PWA Ola.
- **Signaux de performance de Google (Core Web Vitals) :** seulement **43 % des sites mobiles** passent les trois. Pour le temps d'affichage du contenu principal (LCP), 59 % sont « bons ». Le rapport attribue ces résultats à une puissance de calcul plus faible et à des réseaux souvent médiocres. Source : …/2024/performance.md

---

## 2. Ce qui marche et pourquoi (avec preuves)

**1. Supprimer le téléchargement depuis le store.**
- Le premier frein en Afrique est le coût en data de l'installation (Jumia, Konga).
- Une PWA est utilisable dès le premier clic. Dans le cas Konga, elle demande 92 % de data en moins au premier chargement.
- Pour une appli promue par des pubs TikTok, Facebook et Instagram, chaque étape supprimée entre la pub et le premier usage compte directement.

**2. Faire le premier chargement avec très peu, puis mettre en cache.**
- Ola, BookMyShow et Twitter Lite pèsent entre 200 et 600 Ko.
- Les visites suivantes ne coûtent presque rien (10 Ko pour Ola).
- Méthode recommandée par web.dev :
  - pré-mettre en cache le strict minimum à l'installation (page de départ, CSS, JS requis, données de base) ;
  - mettre en cache le reste au fil de l'usage ;
  - afficher sa propre page hors ligne plutôt que l'erreur du navigateur.
  - Source : …/learn/pwa/caching/index.md
- Workbox, la bibliothèque de Google pour les service workers, est utilisée par **54 % des PWA mobiles**. Source : …/2022/pwa.md

**3. S'adapter au réseau et à l'appareil (« adaptive loading »).**
- **Signaux disponibles :** `navigator.connection.effectiveType` (slow-2g / 2g / 3g / 4g), `saveData`, `deviceMemory` et `hardwareConcurrency`.
- **Exemples :**
  - **Tinder** coupe la lecture automatique des vidéos et limite le préchargement en mode éco.
  - **eBay** ne sert le zoom et le carrousel qu'aux appareils puissants.
  - Source : …/blog/adaptive-loading-cds-2019/index.md
- **Navigateurs compatibles :**
  - `saveData` : Chrome Android 65+, Samsung Internet, Opera Android ;
  - **pas supporté** par Safari iOS ni Firefox Android.
  - Source : https://raw.githubusercontent.com/mdn/browser-compat-data/main/api/NetworkInformation.json
- **Garder la version allégée complète :** réduire la résolution ou le nombre d'éléments, ne pas retirer de fonctions. Toujours proposer un interrupteur manuel. Source : …/blog/optimizing-content-efficiency-save-data/index.md

**4. Compresser les images, avant même l'envoi.**
- Le WebP est en général **25 à 35 % plus léger** que le JPEG ou le PNG. Facebook a mesuré environ 80 % d'économie sur les PNG. Source : …/fast/serve-images-webp/index.md
- Pour les icônes et logos, le SVG est recommandé. Les GIF sont à éviter. Source : …/fast/choose-the-right-image-format/index.md
- Pour Révizo, l'enjeu est **l'envoi** des photos d'exercices. Des bibliothèques comme *browser-image-compression* compressent et redimensionnent dans le navigateur avant l'envoi (options `maxSizeMB`, `maxWidthOrHeight`, calcul hors du fil principal). Source : https://raw.githubusercontent.com/Donaldcwl/browser-image-compression/master/README.md

**5. Fonctionner hors ligne et mettre les envois en file d'attente.**
- Google recommande de lire d'abord le local, de mettre les requêtes en file et de les envoyer au retour du réseau. Il conseille aussi de ne signaler la perte de connexion que si l'action en a besoin. Source : https://developer.android.com/docs/quality-guidelines/build-for-billions/connectivity
- Sur le web, l'API Background Sync fait cela : envoi automatique quand la connexion revient.
  - Elle est supportée par Chrome Android 49+ et Samsung Internet, mais pas par Safari ni Firefox.
  - Elle est encore marquée expérimentale.
  - Sources : https://raw.githubusercontent.com/mdn/content/main/files/en-us/web/api/background_synchronization_api/index.md et …/browser-compat-data/main/api/SyncManager.json

**6. Envoyer d'abord le texte.**
- « Fetch text before rich media » : le texte est plus petit et plus rapide, donc l'utilisateur voit plus tôt un contenu utile. Source : Build for Billions, Connectivity (ci-dessus)

**7. Faire installer l'appli au bon moment.**
- 60 % des visites de Flipkart Lite venaient de l'icône d'accueil, avec +70 % de conversion pour ces visiteurs.
- **Méthode recommandée :**
  - intercepter l'événement `beforeinstallprompt` (déclenché quand la PWA devient installable) ;
  - afficher son propre bouton d'installation, lié à l'usage réel ;
  - mesurer les installations avec `appinstalled`.
  - Source : …/progressive-web-apps/customize-install/index.md
- **Sur Android :** Chrome et Samsung Internet installent une vraie **WebAPK** (icône dans le lanceur, entrée dans les Paramètres). D'autres navigateurs ne créent qu'un simple raccourci. Source : …/learn/pwa/installation/index.md

**8. Publier sur Google Play sans réécrire l'appli.**
- Une Trusted Web Activity (TWA) emballe la PWA dans une appli Android très légère.
- Le rendu est fait par Chrome 72+, qui se met à jour indépendamment.
- La propriété du site doit être vérifiée par Digital Asset Links.
- Source : https://developer.android.com/develop/ui/views/layout/webapps/trusted-web-activities

---

## 3. Ce qui échoue ou agace les utilisateurs (avis, critiques)

> Limite importante : je n'ai pu lire **aucun avis d'utilisateur** (Google Play, forums, Reddit, YouTube inaccessibles). Ce qui suit vient d'indicateurs mesurés et de témoignages d'entreprises, pas de verbatims d'élèves.

**1. Les applis natives lourdes sont évitées ou désinstallées.**
- 20 % des clients de la PWA Ola avaient désinstallé l'appli native (https://web.dev/ola/).
- Les clients de Jumia « redoutent l'impact sur leur facture de données » (https://web.dev/jumia2016/).
- Google rappelle que, dans certains pays, la data peut coûter **plus de 10 % du revenu mensuel**, et que le manque de stockage pousse à désinstaller. Source : https://developer.android.com/docs/quality-guidelines/build-for-billions/data-cost
- Ce chiffre n'est pas propre à l'Afrique de l'Ouest. Les prix par pays (Sénégal, Côte d'Ivoire, Mali…) **n'ont pas pu être vérifiés ici**.

**2. Les demandes de notifications sont rejetées.**
- Sur mobile, les demandes d'autorisation de notifications sont :
  - acceptées à 19 % seulement ;
  - **refusées à 35 %** ;
  - ignorées à 34 %.
- Source : …/2022/pwa.md
- Une demande au premier écran gaspille l'opportunité.

**3. Le zoom est bloqué, les zones tactiles sont trop petites, les contrastes sont faibles.**
- En 2024, **16 % des sites mobiles** bloquent le zoom, et seulement **29 %** ont des contrastes de texte suffisants. Source : …/2024/accessibility.md
- En 2021, environ 61 % des sites n'avaient pas des zones tactiles assez grandes. Source : …/2021/mobile-web.md
- Sur un petit écran peu net, en plein soleil, ce sont des causes directes de frustration.

**4. Les données hors ligne peuvent disparaître.**
- Sans stockage persistant, le navigateur peut effacer les données d'une origine quand l'appareil manque de place. Il supprime d'abord les données utilisées le moins récemment.
- Safari efface les données créées par script après 7 jours sans interaction.
- Source : https://raw.githubusercontent.com/mdn/content/main/files/en-us/web/api/storage_api/storage_quotas_and_eviction_criteria/index.md
- Sur un téléphone de 16 ou 32 Go plein de vidéos WhatsApp, les révisions hors ligne peuvent disparaître. Le cas « téléphone plein » est une **hypothèse probable, non mesurée**.

**5. L'installation est fragmentée.**
- Hors Chrome et Samsung Internet, on obtient un simple raccourci, sans les fonctions d'une appli installée.
- Sur iOS, il n'y a pas de bouton d'installation : il faut 4 étapes manuelles dans Safari.
- Source : …/learn/pwa/installation/index.md

**6. Les tests en laboratoire sont trop optimistes.**
- Lighthouse simule par défaut une « Slow 4G » : 150 ms de latence, 1,6 Mbit/s, processeur ralenti 4 fois. Ce profil correspond aux 3G les plus rapides. Source : https://raw.githubusercontent.com/GoogleChrome/lighthouse/main/docs/throttling.md
- Les données réelles de Chrome (CrUX) ne représentent pas toutes les régions du monde (Almanac 2024, chapitre Performance).
- Une appli « verte » sur Lighthouse peut rester lente sur un appareil à 1 Go de RAM en 3G instable.

**7. Les API des PWA ne marchent pas partout.**
- Le partage de fichiers vers la PWA (`share_target`), Background Sync et `saveData` sont expérimentaux ou absents sur Safari et Firefox.
- Sans solution de repli, une partie des utilisateurs voit des fonctions cassées.

---

## 4. Recommandations concrètes pour Révizo, classées par impact

### A. Impact très élevé

**1. Fixer un budget de poids strict, inspiré des PWA Lite.**
- Premier chargement **≤ 300 Ko transférés** pour l'accueil et la soumission d'un exercice. Ola fait 200 Ko, Twitter Lite 600 Ko.
- Visite répétée **≤ 20 Ko** hors contenu. Ola fait 10 Ko.
- Contrôler ce budget à chaque déploiement.
- Utiliser les polices système, sans police web : le fichier de police médian pèse 39 Ko (…/2024/fonts.md).
- Pas de framework lourd au premier écran. Afficher les formules mathématiques avec un moteur chargé à la demande, seulement quand une réponse en contient. C'est une préconisation de ma part, pas un chiffre sourcé.

**2. Optimiser la photo d'exercice, la fonction phare.**
- `<input type="file" accept="image/*" capture="environment">` ouvre directement la caméra arrière. Source : https://raw.githubusercontent.com/mdn/content/main/files/en-us/web/html/reference/attributes/capture/index.md
- Recadrer, puis compresser **dans le navigateur avant l'envoi** :
  - côté le plus long autour de 1 280 à 1 600 px ;
  - JPEG ou WebP de qualité moyenne ;
  - objectif indicatif de 150 à 300 Ko.
  - Ces seuils sont à valider par des tests de lecture des photos (OCR) et de qualité des réponses de l'IA. Ils ne sont pas sourcés.
- Afficher le coût : « Envoi : 0,2 Mo ».
- Proposer une alternative **texte**, encore moins chère.

**3. Mettre les envois en file d'attente hors ligne.**
- L'élève prend la photo dans le bus sans réseau. Révizo la garde dans le stockage local (IndexedDB) et l'envoie au retour du réseau.
- Utiliser Background Sync sur Chrome et Samsung, avec un bouton « Réessayer » ailleurs.
- Ne pas afficher « Pas de connexion » tant que l'action ne l'exige pas (Build for Billions).

**4. Envoyer d'abord le texte, l'enregistrer, le relire hors ligne.**
- Afficher l'explication étape par étape au fil de l'eau, en texte.
- L'enregistrer localement : la révision des erreurs et l'historique se relisent alors sans data.
- Appeler `navigator.storage.persist()` pour éviter l'effacement des données.
- Limiter la taille des caches, comme le recommande Google.

**5. Faire de la pub le point d'entrée de l'appli elle-même.**
- La pub TikTok ou Meta mène directement à la PWA, sans détour par le store.
- Résoudre un premier exercice gratuitement, sans compte (modèle Konga : −92 % de data par rapport à l'appli native).
- **Point non vérifié :** les pubs s'ouvrent souvent dans le navigateur intégré de TikTok ou Facebook, où l'installation et le service worker peuvent mal fonctionner. Il faut le tester et prévoir un bouton « Ouvrir dans Chrome ».

### B. Impact élevé

**6. Un mode « Éco data » visible.**
- Activé automatiquement si `saveData` est actif ou si la connexion est en 2G ou 3G.
- Toujours désactivable manuellement.
- En mode Éco : pas d'images ni d'animations décoratives, quiz chargés par lots plus petits, avatars de duel en initiales. C'est le modèle Twitter Lite et Tinder.
- Afficher un compteur « Data utilisée ce mois-ci ».

**7. Proposer l'installation au bon moment.**
- Juste après la première explication réussie, pas à l'arrivée sur l'appli, via `beforeinstallprompt`.
- Mesurer avec `appinstalled`.
- Demander la permission des notifications **en contexte** : « Te rappeler demain de revoir tes 3 erreurs ? ».
- Jumia obtenait 38 % d'ouverture. Les demandes « à froid » sont refusées dans 35 % des cas.

**8. Partage vers Révizo depuis WhatsApp ou la galerie.**
- Déclarer un `share_target` en POST multipart pour recevoir des images. Source : …/manifest/reference/share_target/index.md
- Ne fonctionne que si la PWA est installée ; la fonction est expérimentale.
- Garder la caméra intégrée comme solution par défaut.

**9. Viser les seuils Android Go même en PWA.**
- Démarrage < 5 s et mémoire maîtrisée, sur un vrai appareil à 1 ou 2 Go de RAM, en 3G réelle.
- Ne pas se fier au seul profil « Slow 4G » de Lighthouse.

### C. Impact moyen

**10. Lisibilité et accessibilité.**
- Zones tactiles **≥ 48 dp**.
- Contraste **≥ 4,5:1** pour le texte courant.
- Source : https://developer.android.com/guide/topics/ui/accessibility/apps
- Ne jamais bloquer le zoom.
- Grand corps de texte pour les étapes de résolution.
- Mode sombre et mode « plein soleil » à contraste élevé.

**11. Langues locales, prudemment.**
- **Couverture :** le jeu de données de traduction FLORES-200 (Meta) inclut wolof, bambara, peul (variante nigériane), mooré, dioula, éwé, fon, haoussa, yoruba, twi et kabiyè. Il n'inclut ni le mandingue ni le soninké. Source : https://raw.githubusercontent.com/facebookresearch/flores/main/flores200/README.md
- **Qualité non vérifiée :** la qualité des traductions automatiques n'a pas été évaluée ici.
- **Recommandation :**
  - garder le français pour le contenu scolaire, puisque les examens sont en français ;
  - proposer des **reformulations ou encouragements** en langue locale, relus par des locuteurs natifs ;
  - éventuellement des notes vocales.
- La communauté Masakhane travaille sur le traitement automatique des langues africaines (https://github.com/masakhane-io).

**12. Une version Google Play plus tard, via TWA.**
- Pour la visibilité dans le store et la confiance, sans maintenir une appli native.
- Une appli 100 % native n'est pas recommandée au lancement : elle coûte plus en data et en stockage pour l'utilisateur, et les cas Ola, Konga et Jumia montrent l'intérêt du web.

### D. Prix et monétisation

**13. Annoncer le coût en data à côté du coût en crédits.**
- « 1 explication ≈ 1 crédit et environ 0,1 à 0,3 Mo ». Ces valeurs sont à mesurer.
- La crainte de la facture de data est documentée (Jumia).

**14. Petits paquets de crédits par mobile money.**
- Les frais et plafonds de Wave et Orange Money **n'ont pas pu être vérifiés** dans cette session, et ils varient selon les pays.
- La page de paiement doit être ultra-légère et marcher en cas de coupure : enregistrer la transaction et la réconcilier ensuite.

**15. Fonctions gratuites hors ligne pour garder les utilisateurs.**
- Révision des erreurs et quiz déjà téléchargés, consultables sans data ni crédit.
- Le coût d'usage quotidien reste ainsi proche de zéro, comme les 10 Ko par visite d'Ola.

---

## 5. Sources (URL)

**Pages lues avec succès**
- https://developer.android.com/guide/topics/androidgo
- https://developer.android.com/guide/topics/androidgo/optimize-size
- https://developer.android.com/guide/topics/androidgo/optimize-startup
- https://developer.android.com/guide/topics/androidgo/optimize-memory
- https://developer.android.com/guide/topics/androidgo/best-practices
- https://developer.android.com/docs/quality-guidelines/build-for-billions/device-capacity
- https://developer.android.com/docs/quality-guidelines/build-for-billions/connectivity
- https://developer.android.com/docs/quality-guidelines/build-for-billions/data-cost
- https://developer.android.com/docs/quality-guidelines/build-for-billions/battery-consumption
- https://developer.android.com/training/basics/network-ops/data-saver
- https://developer.android.com/guide/topics/ui/accessibility/apps
- https://developer.android.com/topic/performance/vitals
- https://developer.android.com/develop/ui/views/layout/webapps/trusted-web-activities
- https://developer.android.com/guide/app-bundle
- https://developer.android.com/stories
- https://web.dev/konga/ (https://raw.githubusercontent.com/GoogleChrome/web.dev/main/src/site/content/en/blog/konga/index.md)
- https://web.dev/jumia2016/ (…/blog/jumia2016/index.md)
- https://web.dev/ola/ (…/blog/ola/index.md)
- https://web.dev/twitter/ (…/blog/twitter/index.md)
- https://web.dev/bookmyshow/ (…/blog/bookmyshow/index.md)
- https://web.dev/flipkart/ (…/blog/flipkart/index.md)
- https://raw.githubusercontent.com/GoogleChrome/web.dev/main/src/site/content/en/blog/adaptive-loading-cds-2019/index.md
- https://raw.githubusercontent.com/GoogleChrome/web.dev/main/src/site/content/en/blog/optimizing-content-efficiency-save-data/index.md
- https://raw.githubusercontent.com/GoogleChrome/web.dev/main/src/site/content/en/fast/why-speed-matters/index.md
- https://raw.githubusercontent.com/GoogleChrome/web.dev/main/src/site/content/en/fast/choose-the-right-image-format/index.md
- https://raw.githubusercontent.com/GoogleChrome/web.dev/main/src/site/content/en/fast/serve-images-webp/index.md
- https://raw.githubusercontent.com/GoogleChrome/web.dev/main/src/site/content/en/fast/adaptive-serving-based-on-network-quality/index.md
- https://raw.githubusercontent.com/GoogleChrome/web.dev/main/src/site/content/en/learn/pwa/installation/index.md
- https://raw.githubusercontent.com/GoogleChrome/web.dev/main/src/site/content/en/learn/pwa/caching/index.md
- https://raw.githubusercontent.com/GoogleChrome/web.dev/main/src/site/content/en/progressive-web-apps/customize-install/index.md
- https://raw.githubusercontent.com/google/WebFundamentals/main/src/content/en/showcase/_redirects.yaml
- https://raw.githubusercontent.com/HTTPArchive/almanac.httparchive.org/main/src/content/en/2024/page-weight.md
- https://raw.githubusercontent.com/HTTPArchive/almanac.httparchive.org/main/src/content/en/2024/performance.md
- https://raw.githubusercontent.com/HTTPArchive/almanac.httparchive.org/main/src/content/en/2024/accessibility.md
- https://raw.githubusercontent.com/HTTPArchive/almanac.httparchive.org/main/src/content/en/2024/media.md
- https://raw.githubusercontent.com/HTTPArchive/almanac.httparchive.org/main/src/content/en/2024/fonts.md
- https://raw.githubusercontent.com/HTTPArchive/almanac.httparchive.org/main/src/content/en/2022/pwa.md
- https://raw.githubusercontent.com/HTTPArchive/almanac.httparchive.org/main/src/content/en/2021/mobile-web.md
- https://raw.githubusercontent.com/mdn/content/main/files/en-us/web/api/networkinformation/savedata/index.md
- https://raw.githubusercontent.com/mdn/content/main/files/en-us/web/api/storage_api/storage_quotas_and_eviction_criteria/index.md
- https://raw.githubusercontent.com/mdn/content/main/files/en-us/web/progressive_web_apps/manifest/reference/share_target/index.md
- https://raw.githubusercontent.com/mdn/content/main/files/en-us/web/html/reference/attributes/capture/index.md
- https://raw.githubusercontent.com/mdn/content/main/files/en-us/web/api/background_synchronization_api/index.md
- https://raw.githubusercontent.com/mdn/browser-compat-data/main/api/NetworkInformation.json
- https://raw.githubusercontent.com/mdn/browser-compat-data/main/api/SyncManager.json
- https://raw.githubusercontent.com/GoogleChrome/lighthouse/main/docs/throttling.md
- https://github.com/GoogleChrome/workbox
- https://raw.githubusercontent.com/GoogleChromeLabs/react-adaptive-hooks/master/README.md
- https://raw.githubusercontent.com/GoogleChromeLabs/squoosh/dev/README.md
- https://raw.githubusercontent.com/Donaldcwl/browser-image-compression/master/README.md
- https://raw.githubusercontent.com/facebookresearch/flores/main/flores200/README.md
- https://github.com/masakhane-io

**Sources tentées mais inaccessibles** (domaine bloqué ou page introuvable)
- gsma.com (Mobile Economy Afrique subsaharienne)
- engineering.fb.com (Facebook Lite)
- en.wikipedia.org (Facebook Lite, Android Go, Opera Mini, Google Go)
- opera.com, wave.com, a4ai.org
- cable.co.uk (prix du Go par pays)
- itu.int, worldbank.org, ourworldindata.org
- play.google.com, youtube.com, medium.com, techcabal.com, restofworld.org
- blog.google, android.com

**Compteur**
- **Recherches web (WebSearch) : 3 tentées, 0 abouties.** Quota partagé épuisé ; l'exigence de 30 à 50 recherches n'est pas remplie.
- **Lectures de pages (WebFetch) : environ 97 tentées, environ 55 abouties.**
- 2 commandes shell de diagnostic réseau.
- À faire lors d'une prochaine passe : prix de la data par pays, part d'Android Go et des appareils à 1-2 Go de RAM en Afrique de l'Ouest, avis Google Play sur Facebook Lite, Google Go et Wave, frais de Wave et Orange Money, comportement des PWA dans les navigateurs intégrés de TikTok et Facebook.