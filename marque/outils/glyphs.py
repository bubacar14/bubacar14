# Convertit un texte en tracés SVG avec la police (approche « logotype vectorisé »).
import sys, json
from fontTools.ttLib import TTFont
from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.pens.transformPen import TransformPen
from fontTools.pens.boundsPen import BoundsPen

def texte_en_tracé(chemin_police, texte, taille=100, approche=0):
    f = TTFont(chemin_police)
    gs = f.getGlyphSet(); cmap = f.getBestCmap(); upm = f['head'].unitsPerEm
    k = taille / upm
    x = 0; morceaux = []; glyphes = []
    for ch in texte:
        nom = cmap[ord(ch)]
        pen = SVGPathPen(gs)
        tp = TransformPen(pen, (k, 0, 0, -k, x, 0))
        gs[nom].draw(tp)
        bp = BoundsPen(gs); gs[nom].draw(bp)
        b = bp.bounds
        glyphes.append({"ch": ch, "x": x, "bounds": [x + b[0]*k, -b[3]*k, x + b[2]*k, -b[1]*k] if b else None})
        morceaux.append(pen.getCommands())
        x += gs[nom].width * k + approche
    return morceaux, glyphes, x

if __name__ == "__main__":
    m, g, w = texte_en_tracé(sys.argv[1], sys.argv[2], float(sys.argv[3]), float(sys.argv[4]))
    print(json.dumps({"paths": m, "glyphs": g, "width": w}))
