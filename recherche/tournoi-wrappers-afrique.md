# Tournoi : wrappers IA façon Higgsfield pour l'Afrique

Résultat d'un tournoi d'agents : 10 agents proposent chacun 2 idées, 3 juges les notent et les attaquent, puis un arbitre rend le verdict. Les chiffres sont des estimations des agents, non vérifiées.

## Verdict de l'arbitre

# Verdict final : wrappers IA façon Higgsfield pour l'Afrique

## 1. TOP 5

| Rang | Nom | Domaine | Note | Pitch en une ligne |
|---|---|---|---|---|
| 1 | **Jaay Studio** | Commerce WhatsApp / e-commerce informel | 7.5 | Tu envoies une photo floue de ton produit, tu reçois en 2 min des visuels de catalogue et un Statut vidéo avec le prix en FCFA et une voix wolof. |
| 2 | **Xew Studio** | Événements familiaux | 7.5 | Faire-part vidéo de mariage, de baptême ou de Tabaski avec voix de griot, envoyé à 300 invités. |
| 3 | **PAPIERS** | Administratif / juridique | 6.7 | L'écrivain public IA : une note vocale en wolof devient un document officiel avec la checklist des pièces. |
| 4 | **KËR** | Immobilier | 6.2 | Photos et vidéo de visite pro pour les courtiers, puis bail et quittances automatiques. |
| 5 | **Tëgg Studio** | Couture / mode | 6.2 | Tu photographies un tissu, tu obtiens le vêtement porté en photo et en vidéo pour le Statut. |

---

## 2. GRAND GAGNANT : Jaay Studio

### Pourquoi il gagne
- **Il est utilisé chaque semaine.** Xew a la même note, mais on ne s'en sert qu'au moment d'un mariage ou d'une fête. Une vendeuse, elle, poste des Statuts tous les jours. C'est ce qui décide entre les deux ex aequo.
- **C'est le plus simple à construire** : détourage, composition et template. Les juges le disent faisable en 3 semaines.
- **La boucle virale est dans le produit.** Les contacts qui voient les Statuts d'une vendeuse sont souvent vendeurs eux-mêmes. C'est la mécanique de Higgsfield à l'état pur.
- **Le client paie parce que ça lui rapporte.** Une meilleure photo, c'est plus de ventes. 500 FCFA, c'est le prix d'un pass internet.

### Comment il copie Higgsfield
- **Modèles tiers emballés, rien à entraîner** : détourage (BiRefNet ou remove.bg), retouche (Flux, Nano Banana), image vers vidéo (Kling ou Seedance en 480p), voix (ElevenLabs ou une TTS wolof), montage FFmpeg.
- **5 presets en un clic :**
  1. **Boutique Almadies** : fond marbre et doré, prix en gros, numéro WhatsApp. Formats 1:1 et 9:16.
  2. **Statut qui bouge** : 8 s, zoom et particules, « Arrivage ! », voix off en wolof, fichier de moins de 2 Mo.
  3. **Catalogue 7 jours** : 7 produits donnent 7 visuels datés, un à poster chaque jour.
  4. **Promo Flash** : prix barré, compte à rebours « Jusqu'à dimanche », bandeau rouge.
  5. **Mannequin Wax / Tabaski** : le preset saisonnier, lancé en version encadrée (voir les réponses aux juges).
- **Crédits payés en Wave et Orange Money**, via PayDunya ou CinetPay, avec crédit automatique par webhook :
  - Ndanane : 500 FCFA = 5 photos ou 1 vidéo.
  - Semaine : 1 500 FCFA = 20 photos + 3 vidéos.
  - Pro : 5 000 FCFA/mois = 100 photos + 15 vidéos + logo.
  - Pack Tabaski en édition limitée.
  - Marge brute visée : 50 à 75 %.
- **Stratégie virale :**
  - Filigrane « fait avec Jaay, envoie ta photo au +221… ».
  - Parrainage : 3 vendeuses invitées = 10 photos offertes.
  - « Grandes sœurs » des groupes de grossistes payées 20 % des recharges de leur réseau.
  - Vidéos TikTok avant/après (photo prise au marché, puis photo studio).
  - Campagnes calées sur Tabaski, Korité, rentrée scolaire et Noël.

### Plan MVP sur 30 jours
- **Semaines 1-2** : bot WhatsApp (Cloud API, Node ou Python, file de jobs) avec 3 presets (Boutique, Statut qui bouge, Promo Flash). Paiement par lien Wave.
- **Semaine 3** : 50 vendeuses de 3 groupes de revendeuses de Dakar, 10 photos offertes à chacune. On mesure la conversion, le temps de génération et le nombre de Statuts postés.
- **Semaine 4** : on ajoute le filigrane, le parrainage et 2 ambassadrices. On supprime les presets que personne n'utilise.
- **Objectifs** : au moins 20 % de testeuses qui achètent un pack, et au moins 30 % de nouvelles utilisatrices venues du filigrane ou du parrainage.
- **Moyens** : 1 développeur, 1 profil growth wolophone, moins de 300 000 FCFA d'API.

### Réponses aux attaques des juges
- **« Meta AI le fera gratuitement. »**
  - Meta saura retoucher une photo. Ce qu'il ne fera pas, c'est un preset local complet : prix en FCFA, numéro incrusté, voix wolof, fichier sous 2 Mo, catalogue de 7 jours, thèmes de Tabaski. La valeur est dans le workflow et la communauté, comme chez Higgsfield face à Kling.
  - Il faut verrouiller la relation client : historique des produits, logo enregistré, réseau d'ambassadrices.
  - Il faut ouvrir tôt une sortie hors de WhatsApp : une PWA légère et des comptes grossistes.
- **« À 500 FCFA, impossible d'atteindre 1 M$ d'ARR. »**
  - Le B2B porte le chiffre : les grossistes en cosmétiques et en électroménager achètent des packs en gros pour leurs revendeuses, à 50 000-200 000 FCFA par mois.
  - L'expansion visée est l'UEMOA, puis le Nigeria et le Kenya avec MoMo et M-Pesa.
- **« Le try-on déforme les motifs wax. »**
  - Au lancement, on garde la vraie photo du tissu et on l'incruste par composition, sans le régénérer.
  - Le mannequin génératif est réservé aux coupes simples et porte la mention « aperçu ».
  - Ce n'est pas le preset d'acquisition.
- **Politique WhatsApp contre les chatbots IA.** Jaay est un outil métier qui produit des médias, pas un assistant généraliste. C'est le cas d'usage que la politique autorise.

---

## 3. Idée combo : « Jaay + Xew », le studio des moments qui vendent

Le cœur reste **Jaay** pour le revenu récurrent. On y greffe :
- **De Xew : un module événementiel saisonnier.** Les vœux de Tabaski et les faire-part sont vendus comme produits d'appel aux mêmes vendeuses (« tes vœux à tes clientes avec ton logo »). Les 300 invités d'un faire-part deviennent un canal d'acquisition, et le pic de Tabaski est financé par les abonnés Pro.
- **De Tëgg : un preset « tissu », avec la licence grossiste de tissus.** Le grossiste offre une génération à chaque cliente.
- **De KËR, plus tard : le même moteur appliqué aux courtiers** (photos et vidéo d'annonce), sans les villas simulées.

On a un seul moteur, un seul bot et un seul système de crédits, et chaque domaine devient un « studio » de plus, exactement comme Higgsfield Ads, Shorts et Influencer.

---

## 4. Les 3 pièges principaux

1. **Dépendre d'un seul canal et d'un seul modèle.** WhatsApp peut changer sa politique et Meta peut sortir la fonction gratuite. Il faut des modèles interchangeables (fal.ai ou Replicate), une PWA de secours et une relation client qui vous appartient : numéros, historique, ambassadrices.
2. **Mentir sur le produit.** Un motif wax déformé, une pièce inventée dans un appartement ou une villa simulée sur un terrain nu font perdre la confiance du marché. Il faut respecter le produit réel : composition plutôt que génération, et la mention « aperçu IA » quand on génère.
3. **Brûler la marge avec la vidéo.** Les rendus vidéo coûtent en dollars, les clients paient en FCFA, et les régénérations ratées s'additionnent. Il faut des durées fixes en 480p, des templates FFmpeg plutôt que de l'IA vidéo quand c'est possible, du cache, un plafond de régénérations par crédit, et un coût par génération suivi chaque jour.

**À faire en premier** : lancer Jaay Studio à Dakar ce mois-ci, valider la conversion à 20 %, puis greffer le module événementiel avant la prochaine Tabaski.

## Classement complet

| Note | Idée | Domaine | Pitch |
|---|---|---|---|
| 7.5 | Jaay Studio : le studio photo et vidéo produit qui tourne dans WhatsApp | Commerce & marketing (vendeurs WhatsApp/Instagram, marchés, e-commerce informel) | Le vendeur envoie sur WhatsApp une photo floue de son produit prise avec un Android à 50 000 FCFA. En moins de 2 minutes, il reçoit 4 visuels de catalogue, un Statut vidéo vertical de 8 secondes avec le prix en FCFA et une voix off en wolof ou en français. Il paie avec Wave ou Orange Money, sans application à installer. |
| 7.5 | Xew Studio (faire-part et vidéos d'événements familiaux : mariage, ngénte, Tabaski, Magal) | Mode, beauté, couture, artisanat, événements (mariages, baptêmes, tabaski) | En 2 minutes sur WhatsApp, n'importe quelle famille transforme une photo et trois infos (noms, date, lieu) en faire-part vidéo animé avec voix de griot ou de présentateur en wolof ou en français, musique et texte élégant. La vidéo est envoyée ensuite à 300 invités, et c'est cette diffusion qui fait connaître le produit. |
| 6.7 | PAPIERS. Le studio administratif et juridique sur WhatsApp ("ton écrivain public IA") | Services publics, juridique, administratif, immobilier, documents officiels | L'écrivain public devant la mairie, en version IA sur WhatsApp : tu envoies une photo ou une note vocale en wolof, et tu reçois en 2 minutes un document officiel prêt à imprimer ou à envoyer (demande, lettre, contrat, procuration), avec la liste exacte des pièces à fournir et le chemin à suivre. |
| 6.2 | KËR. Le studio IA des annonces immobilières et du bail, pour courtiers et propriétaires | Services publics, juridique, administratif, immobilier, documents officiels | Le « Higgsfield Ads Studio » de l'immobilier africain : le courtier prend 6 photos de mauvaise qualité avec un Android d'entrée de gamme, et reçoit en 3 minutes des photos pro, une vidéo de visite verticale de 20 secondes avec voix off en wolof et en français, l'annonce prête pour WhatsApp, Facebook, TikTok et les sites d'annonces, puis le bail et les quittances mensuelles une fois le locataire trouvé. |
| 6.2 | Tëgg Studio (Couture & Mode Studio pour tailleurs, couturières et vendeuses de tissus) | Mode, beauté, couture, artisanat, événements (mariages, baptêmes, tabaski) | Le tailleur ou la vendeuse photographie un tissu (wax, bazin, brodé, kente) et choisit un modèle : en 20 secondes il obtient des photos catalogue et une vidéo de 5 s du vêtement porté, prêtes pour le statut WhatsApp, TikTok et le catalogue WhatsApp Business. C'est un studio photo et un mannequin dans la poche, pour la couture sur mesure. |
| 5.8 | BacBi : le répétiteur IA sur WhatsApp (photo de l'exo, corrigé en français et note vocale en wolof) | Éducation & formation (élèves, examens BAC/BFEM, langues locales, profs) | L'élève prend en photo n'importe quel exercice ou sujet de BAC/BFEM et reçoit sur WhatsApp, en moins d'une minute, un corrigé pas à pas conforme au programme sénégalais, avec une note vocale d'explication en français ou en wolof, sans télécharger d'appli. |
| 5.8 | Natt Studio : la tontine intelligente sur WhatsApp, sans toucher à l'argent | Finance, mobile money, tontines, micro-crédit, comptabilité des PME | Une présidente de tontine (natt, mbootaay, susu, likelemba) ajoute Natt Studio à son groupe WhatsApp. Le bot suit les cotisations en lisant les preuves de paiement Wave et Orange Money, relance les retardataires en voix et en wolof, organise le tirage au sort en vidéo et génère des reçus et des bilans visuels : la confiance de la tontine est automatisée, sans jamais détenir les fonds. |
| 5.8 | SabarClip Studio : le kit promo IA des artistes et promoteurs de soirées | Médias, musique, divertissement, créateurs de contenu africains (mbalax, afrobeats, Nollywood) | Tu envoies ton son (MP3 ou note vocale WhatsApp) et une photo. En 3 minutes, tu récupères un pack promo prêt à poster : teaser vertical TikTok/Reels, statut WhatsApp de 30 s, lyric video, visualizer, pochette et affiche de soirée animée, avec des presets taillés pour le mbalax, l'afrobeats, le coupé-décalé et le rap galsen. |
| 5.8 | Kër Live (suivi de chantier IA pour la diaspora) | Transport, logistique, BTP, artisans et métiers informels | Le maçon envoie chaque soir sur WhatsApp ses photos et une note vocale en wolof ; l'IA les transforme en rapport hebdomadaire vidéo en français pour le propriétaire émigré. Le rapport compare l'avancement réel au rendu 3D de la future maison, détecte les incohérences de matériaux et prévient avant chaque nouvel envoi d'argent. |
| 5.7 | Wax Ads : le studio de pubs 'UGC' avec des influenceurs IA africains qui parlent wolof, bambara, nouchi et lingala | Commerce & marketing (vendeurs WhatsApp/Instagram, marchés, e-commerce informel) | L'équivalent africain du 'UGC Ad' et du 'AI Influencer' de Higgsfield. Une PME, une marque locale ou une vendeuse ambitieuse choisit une 'influenceuse IA' au visage, à l'accent et au style local, téléverse la photo de son produit, et obtient en 10 minutes une pub TikTok ou Statut de 15 à 30 s où l'avatar présente le produit dans sa langue. La même pub produite par un vrai influenceur local coûte 50 000 à 300 000 FCFA ; ici, elle coûte 2 000 FCFA. |
| 5.7 | Wax Broadcast : messages vocaux IA en langues locales, à grande échelle, pour les organisations | Langues & voix : traduction / doublage / voix en wolof, pulaar, haoussa, swahili, yoruba, bambara… | Un 'Ads Studio' pour la voix : une organisation tape un message en français, et la plateforme produit et envoie des centaines de milliers de vocaux WhatsApp ou d'appels automatiques personnalisés (nom, montant, date) dans la langue de chaque destinataire, pour toucher les populations qui ne lisent pas le français. |
| 5.5 | Jaay Bi Studio (« le studio de vente ») : le Higgsfield Ads Studio pour vendre bêtes et récoltes sur WhatsApp et TikTok, avec l'estimation du prix juste | Agriculture & élevage (diagnostic, conseils, prix, en langues locales) | Un éleveur ou un producteur prend 2 photos ou une vidéo de 10 s de son mouton, de son lot de poulets ou de ses sacs d'oignons. En un clic, il obtient une annonce pro (photo nettoyée, vidéo verticale avec voix off en wolof, fiche prix) prête pour les Statuts WhatsApp, les groupes et TikTok, avec une estimation du poids et du prix du marché pour ne plus se faire arnaquer par les intermédiaires. |
| 5.5 | ProfStudio : le studio IA du prof africain (compos, fiches et capsules vidéo en un clic) | Éducation & formation (élèves, examens BAC/BFEM, langues locales, profs) | Le « Higgsfield des enseignants » : un prof choisit sa classe, sa matière et sa leçon du programme officiel, et obtient en un clic une épreuve avec barème et corrigé imprimable, une fiche de cours, et une capsule vidéo verticale de 60 secondes avec avatar parlant français ou wolof, à partager dans le groupe WhatsApp de la classe ou sur TikTok. |
| 5.3 | Kaalis : le comptable vocal WhatsApp du commerçant informel | Finance, mobile money, tontines, micro-crédit, comptabilité des PME | Le boutiquier, la vendeuse de marché ou le grossiste envoie une note vocale en wolof ou en français (« j'ai vendu 3 sacs de riz à Modou, il doit 15 000 ») ou une capture de reçu Wave/Orange Money. Kaalis tient son cahier de ventes, de dépenses et de crédits clients, relance les débiteurs et produit en un clic un dossier de crédit prêt à déposer en microfinance. |
| 5.2 | Doktoor Tool (« le docteur des champs et des bêtes ») : le Higgsfield du diagnostic agricole sur WhatsApp, en wolof et en pulaar | Agriculture & élevage (diagnostic, conseils, prix, en langues locales) | L'éleveur ou le paysan envoie sur WhatsApp une photo et un vocal en wolof ou en pulaar. En moins de 60 secondes, il reçoit en réponse un vocal dans sa langue avec le diagnostic, le traitement, le dosage, le prix du produit et l'adresse du point de vente ou du vétérinaire le plus proche. |
| 5.2 | Ndaw Pro (« Atelier Studio » pour artisans) | Transport, logistique, BTP, artisans et métiers informels | Un studio IA sur WhatsApp qui transforme 3 photos prises à l'atelier et une note vocale en wolof en catalogue pro, vidéo TikTok « avant/après » et devis PDF. C'est le Higgsfield des menuisiers, tailleurs, soudeurs, maçons et coiffeurs. |
| 4.8 | Tekki Dub : doublage, sous-titrage et clipping IA des séries, podcasts et créateurs africains | Médias, musique, divertissement, créateurs de contenu africains (mbalax, afrobeats, Nollywood) | Une plateforme qui prend un épisode de série sénégalaise, un film Nollywood, un live TikTok, un podcast ou un prêche, et le transforme en un clic en 10 shorts viraux sous-titrés, puis le double en wolof, français, anglais, hausa, bambara ou swahili, avec la voix clonée de l'acteur et le lip-sync. Le but : faire passer un contenu d'un seul pays à tout le continent et à la diaspora. |
| 4.3 | OfficineStudio (WhatsApp Pharma Copilot) | Santé & pharmacie (pré-diagnostic, info, agents de santé communautaires) — attention au cadre légal | Le 'Higgsfield des pharmacies' : un studio IA sur WhatsApp qui permet à chaque officine de lire les ordonnances, répondre aux clients en wolof/pulaar/français, envoyer des rappels de prise vocaux et produire en un clic des contenus de prévention viraux pour son statut WhatsApp et TikTok. |
| 4.3 | Kàddu Studio : le Higgsfield du doublage en langues africaines | Langues & voix : traduction / doublage / voix en wolof, pulaar, haoussa, swahili, yoruba, bambara… | Une app Android légère, avec un bot WhatsApp, qui transforme en un clic une vidéo, une photo produit ou un texte en français en pub, tuto ou statut WhatsApp doublé et sous-titré en wolof, pulaar, bambara, haoussa, yoruba ou swahili, avec une voix clonée ou une voix IA locale. |
| 3.2 | Relais Santé Studio (copilote des agents de santé communautaires) | Santé & pharmacie (pré-diagnostic, info, agents de santé communautaires) — attention au cadre légal | Un wrapper IA vocal, hors ligne en partie, qui donne aux agents de santé communautaires, aux bajenu gox et aux relais un kit de sensibilisation prêt à l'emploi en langues locales, un aide-mémoire de triage conforme aux protocoles nationaux et un rapport d'activité dicté en wolof qui se remplit tout seul. Le service est payé par les ONG et les districts, pas par l'agent. |
