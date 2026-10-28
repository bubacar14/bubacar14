"""Récupère les transcriptions de vidéos YouTube de profs, par matière.

À lancer sur ton ordinateur (YouTube bloque les serveurs cloud) :

    pip install yt-dlp youtube-transcript-api
    python tools/youtube_transcripts.py              # toutes les matières
    python tools/youtube_transcripts.py pc svt       # seulement certaines

Le script se fait en deux temps :
1. il cherche les vidéos (rapide) et garde la liste dans youtube/candidats.json ;
2. il récupère les transcriptions une à une, lentement. Si YouTube bloque
   l'adresse IP, il attend puis reprend. On peut l'arrêter et le relancer :
   les vidéos déjà enregistrées sont sautées.

Les transcriptions sont enregistrées dans youtube/<matiere>/<id>.md.
Ensuite : git add youtube && git commit -m "Transcriptions YouTube" && git push
"""
import json
import random
import sys
import time
from pathlib import Path

from youtube_transcript_api import YouTubeTranscriptApi
from yt_dlp import YoutubeDL

VIDEOS_PAR_RECHERCHE = 10
MAX_PAR_MATIERE = 30  # transcriptions gardées par matière au plus
PAUSE = (12, 25)  # secondes entre deux vidéos (tirées au hasard), pour ne pas être bloqué
ATTENTE_BLOCAGE = 20 * 60  # secondes d'attente quand YouTube bloque l'adresse IP
ESSAIS_BLOCAGE = 6  # au-delà, on s'arrête : relancer plus tard

RECHERCHES = {
    "maths": [
        "correction BAC maths Sénégal",
        "correction BAC maths Côte d'Ivoire",
        "correction BAC maths Mali",
        "correction BAC maths Burkina",
        "correction BAC maths Bénin",
        "correction BAC maths Togo",
        "correction BAC maths Guinée",
        "correction BAC maths Niger",
        "méthode exercice maths terminale Afrique",
        "correction BFEM maths",
        "correction BEPC maths",
        "correction DEF maths Mali",
    ],
    "pc": [
        "correction BAC physique chimie Sénégal",
        "correction BAC physique chimie Côte d'Ivoire",
        "correction BAC physique chimie Mali",
        "correction BAC physique chimie Burkina",
        "correction BAC physique chimie Bénin Togo",
        "méthode exercice sciences physiques terminale",
        "exercice corrigé mécanique terminale S",
        "exercice corrigé chimie organique terminale D",
        "correction BEPC physique chimie",
        "correction BFEM sciences physiques",
    ],
    "svt": [
        "correction BAC SVT Sénégal",
        "correction BAC SVT Côte d'Ivoire",
        "correction BAC SVT Mali",
        "correction BAC SVT Burkina",
        "correction BAC SVT Bénin Togo",
        "méthode exercice SVT terminale Afrique",
        "méthode exploitation de documents SVT",
        "exercice génétique corrigé terminale",
        "situation d'évaluation SVT corrigé",
        "correction BEPC SVT",
        "correction BFEM SVT",
    ],
    "philo": [
        "méthode dissertation philosophie BAC Sénégal",
        "méthode dissertation philosophie BAC Côte d'Ivoire",
        "dissertation philosophie BAC Mali Burkina",
        "méthode commentaire de texte philosophie BAC",
        "introduction dissertation philosophie problématique",
        "correction sujet philosophie BAC",
        "étude de texte philosophie méthode",
    ],
    "francais": [
        "méthode commentaire composé BAC Sénégal",
        "méthode résumé discussion BAC",
        "méthode dissertation français BAC Afrique",
        "contraction de texte méthode BAC",
        "correction BAC français Côte d'Ivoire",
        "correction BFEM français",
        "correction BEPC français",
        "explication de texte BEPC méthode",
        "rédaction BEPC méthode",
        "correction DEF français Mali",
    ],
    "hg": [
        "méthode dissertation histoire BAC Sénégal",
        "méthode commentaire de document histoire géographie BAC",
        "correction BAC histoire géographie Côte d'Ivoire",
        "correction BAC histoire géographie Burkina Mali",
        "croquis géographie BAC méthode",
        "étude de document histoire méthode",
        "correction BEPC histoire géographie",
        "correction BFEM histoire géographie",
    ],
    "anglais": [
        "correction BAC anglais Sénégal",
        "correction BAC anglais Côte d'Ivoire",
        "méthode essay anglais BAC",
        "reading comprehension BAC anglais méthode",
        "méthode writing BAC anglais",
        "correction BEPC anglais",
        "correction BFEM anglais",
    ],
    "eco": [
        "correction BAC économie Sénégal",
        "correction BAC comptabilité série G",
        "correction BAC G2 comptabilité Côte d'Ivoire",
        "correction BAC série G Burkina",
        "méthode dissertation économique BAC",
        "cours économie générale terminale",
        "exercice corrigé comptabilité générale terminale",
    ],
}


def chercher(requete):
    opts = {"quiet": True, "extract_flat": True, "skip_download": True}
    with YoutubeDL(opts) as ydl:
        res = ydl.extract_info(f"ytsearch{VIDEOS_PAR_RECHERCHE}:{requete}", download=False)
    return [
        {"id": e["id"], "titre": e.get("title", ""), "chaine": e.get("channel") or e.get("uploader", ""),
         "duree": e.get("duration"), "recherche": requete}
        for e in res.get("entries", [])
        if e and e.get("id")
    ]


def transcription(api, video_id):
    texte = api.fetch(video_id, languages=["fr", "en"])
    return " ".join(s.text for s in texte.snippets)


def bloque(erreur):
    return type(erreur).__name__ in ("IpBlocked", "RequestBlocked", "YouTubeRequestFailed")


def candidats(racine, matieres):
    """Étape 1 : chercher les vidéos. On alterne les recherches pour varier pays et niveaux."""
    fichier = racine / "candidats.json"
    tous = json.loads(fichier.read_text(encoding="utf-8")) if fichier.exists() else {}
    for matiere in matieres:
        if tous.get(matiere):
            continue
        listes = []
        for requete in RECHERCHES[matiere]:
            print(f"[{matiere}] recherche : {requete}")
            try:
                listes.append(chercher(requete))
            except Exception as e:
                print(f"  recherche impossible : {e}")
            time.sleep(2)
        vus, ordre = set(), []
        for rang in range(VIDEOS_PAR_RECHERCHE):
            for liste in listes:
                if rang < len(liste) and liste[rang]["id"] not in vus:
                    vus.add(liste[rang]["id"])
                    ordre.append(liste[rang])
        tous[matiere] = ordre
        fichier.write_text(json.dumps(tous, ensure_ascii=False, indent=2), encoding="utf-8")
    return tous


def main():
    racine = Path(__file__).resolve().parent.parent / "youtube"
    matieres = sys.argv[1:] or list(RECHERCHES)
    inconnues = [m for m in matieres if m not in RECHERCHES]
    if inconnues:
        print("Matières inconnues :", ", ".join(inconnues), "· possibles :", ", ".join(RECHERCHES))
        return 1
    tous = candidats(racine, matieres)

    api = YouTubeTranscriptApi()
    bilan_fichier = racine / "bilan.json"
    bilan = json.loads(bilan_fichier.read_text(encoding="utf-8")) if bilan_fichier.exists() else {}
    for matiere in matieres:
        dossier = racine / matiere
        dossier.mkdir(parents=True, exist_ok=True)
        ok = len(list(dossier.glob("*.md")))
        sans = 0
        for v in tous[matiere]:
            if ok >= MAX_PAR_MATIERE:
                break
            fichier = dossier / f"{v['id']}.md"
            if fichier.exists():
                continue
            for essai in range(ESSAIS_BLOCAGE + 1):
                try:
                    texte = transcription(api, v["id"])
                    break
                except Exception as e:
                    if not bloque(e):
                        print(f"  pas de transcription : {v['titre'][:60]} ({type(e).__name__})")
                        texte = None
                        break
                    if essai == ESSAIS_BLOCAGE:
                        print("\nYouTube bloque toujours l'adresse IP. Relance le script plus tard : il reprendra ici.")
                        bilan_fichier.write_text(json.dumps(bilan, ensure_ascii=False, indent=2), encoding="utf-8")
                        return 2
                    print(f"  YouTube bloque l'adresse IP : pause de {ATTENTE_BLOCAGE // 60} min "
                          f"(essai {essai + 1}/{ESSAIS_BLOCAGE})")
                    time.sleep(ATTENTE_BLOCAGE)
            if texte is None:
                sans += 1
                continue
            fichier.write_text(
                f"# {v['titre']}\n\n"
                f"- Chaîne : {v['chaine']}\n"
                f"- Lien : https://www.youtube.com/watch?v={v['id']}\n"
                f"- Recherche : {v['recherche']}\n\n"
                f"{texte}\n",
                encoding="utf-8",
            )
            ok += 1
            print(f"  ✓ [{matiere} {ok}] {v['titre'][:70]}")
            time.sleep(random.uniform(*PAUSE))
        bilan[matiere] = {"videos_trouvees": len(tous[matiere]), "transcriptions": ok, "sans_sous_titres": sans}
        bilan_fichier.write_text(json.dumps(bilan, ensure_ascii=False, indent=2), encoding="utf-8")
    print("\nBilan :", json.dumps(bilan, ensure_ascii=False, indent=2))
    print("\nEnvoie ensuite les fichiers : git add youtube && git commit -m \"Transcriptions YouTube\" && git push")


if __name__ == "__main__":
    sys.exit(main())
