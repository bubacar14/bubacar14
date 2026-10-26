"""Récupère les transcriptions de vidéos YouTube de profs, par matière.

À lancer sur ton ordinateur (YouTube bloque les serveurs cloud) :

    pip install yt-dlp youtube-transcript-api
    python tools/youtube_transcripts.py

Les transcriptions sont enregistrées dans youtube/<matiere>/<id>.md.
Ensuite : git add youtube && git commit -m "Transcriptions YouTube" && git push
"""
import json
import sys
import time
from pathlib import Path

from youtube_transcript_api import YouTubeTranscriptApi
from yt_dlp import YoutubeDL

VIDEOS_PAR_RECHERCHE = 8
PAUSE = 2  # secondes entre deux vidéos, pour ne pas être bloqué

RECHERCHES = {
    "maths": [
        "correction BAC maths Sénégal",
        "correction BAC maths Côte d'Ivoire",
        "méthode exercice maths terminale Afrique",
        "correction BFEM maths",
        "correction BEPC maths",
    ],
    "pc": [
        "correction BAC physique chimie Sénégal",
        "correction BAC physique chimie Côte d'Ivoire",
        "méthode exercice sciences physiques terminale",
        "correction BEPC physique chimie",
    ],
    "svt": [
        "correction BAC SVT Sénégal",
        "correction BAC SVT Côte d'Ivoire",
        "méthode exercice SVT terminale Afrique",
        "correction BEPC SVT",
    ],
    "philo": [
        "méthode dissertation philosophie BAC Sénégal",
        "méthode dissertation philosophie BAC Côte d'Ivoire",
        "méthode commentaire de texte philosophie BAC",
    ],
    "francais": [
        "méthode commentaire composé BAC Sénégal",
        "méthode résumé discussion BAC",
        "méthode dissertation français BAC Afrique",
        "correction BFEM français",
    ],
    "hg": [
        "méthode dissertation histoire BAC Sénégal",
        "méthode commentaire de document histoire géographie BAC",
        "correction BAC histoire géographie Côte d'Ivoire",
    ],
    "anglais": [
        "correction BAC anglais Sénégal",
        "méthode essay anglais BAC",
        "correction BEPC anglais",
    ],
    "eco": [
        "correction BAC économie Sénégal",
        "correction BAC comptabilité série G",
    ],
}


def chercher(requete):
    opts = {"quiet": True, "extract_flat": True, "skip_download": True}
    with YoutubeDL(opts) as ydl:
        res = ydl.extract_info(f"ytsearch{VIDEOS_PAR_RECHERCHE}:{requete}", download=False)
    return [
        {"id": e["id"], "titre": e.get("title", ""), "chaine": e.get("channel") or e.get("uploader", "")}
        for e in res.get("entries", [])
        if e and e.get("id")
    ]


def transcription(api, video_id):
    texte = api.fetch(video_id, languages=["fr", "en"])
    return " ".join(s.text for s in texte.snippets)


def main():
    racine = Path(__file__).resolve().parent.parent / "youtube"
    api = YouTubeTranscriptApi()
    bilan = {}
    for matiere, requetes in RECHERCHES.items():
        dossier = racine / matiere
        dossier.mkdir(parents=True, exist_ok=True)
        vus, ok = set(), 0
        for requete in requetes:
            print(f"[{matiere}] recherche : {requete}")
            try:
                videos = chercher(requete)
            except Exception as e:
                print(f"  recherche impossible : {e}")
                continue
            for v in videos:
                if v["id"] in vus:
                    continue
                vus.add(v["id"])
                fichier = dossier / f"{v['id']}.md"
                if fichier.exists():
                    ok += 1
                    continue
                try:
                    texte = transcription(api, v["id"])
                except Exception as e:
                    print(f"  pas de transcription : {v['titre'][:60]} ({type(e).__name__})")
                    continue
                fichier.write_text(
                    f"# {v['titre']}\n\n"
                    f"- Chaîne : {v['chaine']}\n"
                    f"- Lien : https://www.youtube.com/watch?v={v['id']}\n"
                    f"- Recherche : {requete}\n\n"
                    f"{texte}\n",
                    encoding="utf-8",
                )
                ok += 1
                print(f"  ✓ {v['titre'][:70]}")
                time.sleep(PAUSE)
        bilan[matiere] = {"videos_vues": len(vus), "transcriptions": ok}
    (racine / "bilan.json").write_text(json.dumps(bilan, ensure_ascii=False, indent=2), encoding="utf-8")
    print("\nBilan :", json.dumps(bilan, ensure_ascii=False, indent=2))
    print("\nEnvoie ensuite les fichiers : git add youtube && git commit -m \"Transcriptions YouTube\" && git push")


if __name__ == "__main__":
    sys.exit(main())
