# Régénérer le logo

Ces scripts dessinent le logo Révizo : ils transforment le mot « revizo » en tracés à partir de la police Bricolage Grotesque ExtraBold, puis ajoutent la goutte d'encre et la tête de Sanko.

```bash
pip install fonttools
mkdir -p font
curl -s -A "Mozilla/4.0" "https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@96,800" \
  | grep -o "https://[^)]*" | head -1 | xargs curl -s -o font/bricolage-800.ttf
python3 build.py   # les 3 pistes comparées (A, B, C) et les icônes
python3 final.py   # le logo final, dans le dossier final/
```

- `glyphs.py` : convertit un texte en tracés SVG.
- `build.py` : la tête de Sanko, la goutte et les pistes A, B et C.
- `final.py` : les fichiers finaux, déjà copiés dans `marque/`, et `final/app-logo.json`, qui sert à mettre à jour `LOGO_REVIZO` dans `sanko.js`.
