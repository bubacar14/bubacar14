import json, subprocess, sys
sys.path.insert(0, '.')
from glyphs import texte_en_tracé

FONT = 'font/bricolage-800.ttf'
ENCRE, CRAIE, BIC, BIC_D, SOLEIL, AILE, BEC, VENTRE = '#141a33', '#eef2ea', '#2340a8', '#8fa8ff', '#f5b301', '#d98f00', '#f2711c', '#ffe39a'

paths, glyphs, width = texte_en_tracé(FONT, 'revizo', 100, -1)
G = {g['ch']: g for g in glyphs}

def goutte(cx, cy, h, angle, couleur):
    # goutte d'encre pointe en haut, hauteur h, centrée en (cx, cy)
    s = h / 24
    return f'<path transform="translate({cx} {cy}) rotate({angle}) scale({s})" d="M0 -14c6 8 9 12.5 9 16.5a9 9 0 0 1-18 0c0-4 3-8.5 9-16.5z" fill="{couleur}"/>'

def tete(x, y, d, crete=BIC):
    # tête de Sanko dans un carré de côté d (coin haut gauche x, y)
    k = d / 100
    return f'''<g transform="translate({x} {y}) scale({k})">
      <path d="M50 2c9 12 13 19 13 25a13 13 0 0 1-26 0c0-6 4-13 13-25z" fill="{crete}"/>
      <circle cx="50" cy="60" r="38" fill="{SOLEIL}"/>
      <path d="M14 66c-3 10 0 20 8 26 2-9 0-18-8-26zM86 66c3 10 0 20-8 26-2-9 0-18 8-26z" fill="{AILE}"/>
      <circle cx="37" cy="55" r="11" fill="#fff"/><circle cx="63" cy="55" r="11" fill="#fff"/>
      <circle cx="39" cy="56" r="5.5" fill="{ENCRE}"/><circle cx="65" cy="56" r="5.5" fill="{ENCRE}"/>
      <circle cx="41" cy="53.5" r="1.8" fill="#fff"/><circle cx="67" cy="53.5" r="1.8" fill="#fff"/>
      <path d="M43.5 66h13l-6.5 9z" fill="{BEC}"/>
    </g>'''

def mot(couleur, accent, variante='accent'):
    out = []
    for g, p in zip(glyphs, paths):
        if variante == 'oeil' and g['ch'] == 'o':
            # le o devient le visage de Sanko
            x0, y0, x1, y1 = g['bounds']
            cx, cy = (x0 + x1) / 2, (y0 + y1) / 2
            out.append(f'<path d="{p}" fill="{couleur}"/>')
            out.append(f'<circle cx="{cx-7}" cy="{cy-3}" r="4.6" fill="{couleur}"/><circle cx="{cx+7}" cy="{cy-3}" r="4.6" fill="{couleur}"/>')
            out.append(f'<path d="M{cx-5} {cy+5}h10l-5 7z" fill="{BEC}"/>')
            out.append(goutte(cx, y0 - 13, 22, 0, accent))
            continue
        out.append(f'<path d="{p}" fill="{couleur}"/>')
    if variante == 'accent':
        x0, y0, x1, y1 = G['e']['bounds']
        out.append(goutte(x0 + (x1 - x0) * 0.62, y0 - 15, 24, 32, accent))
    if variante == 'oeil':
        x0, y0, x1, y1 = G['e']['bounds']
        out.append(f'<path transform="translate({x0 + (x1-x0)*0.62} {y0-14}) rotate(32)" d="M-3 -10h6v14h-6z" fill="{couleur}"/>')
    return '\n'.join(out)

def svg(contenu, w, h, fond=None):
    f = f'<rect width="{w}" height="{h}" fill="{fond}"/>' if fond else ''
    return f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {w} {h}" width="{w}" height="{h}">{f}{contenu}</svg>'

H = 100  # hauteur d'x ≈ 54 ; cadre vertical -85..10
def lockup(fond_clair=True, variante='accent', symbole=True):
    c = ENCRE if fond_clair else CRAIE
    a = BIC if fond_clair else BIC_D
    dx = 118 if symbole else 10
    sym = tete(4, 8, 104, BIC if fond_clair else BIC_D) if symbole else ''
    return svg(f'{sym}<g transform="translate({dx} 98)">{mot(c, a, variante)}</g>', int(dx + width + 14), 118)

def icone(fond=BIC):
    return svg(f'<rect width="512" height="512" rx="114" fill="{fond}"/>{tete(56, 40, 400, "#8fa8ff" if fond == BIC else BIC)}', 512, 512)

open('A-clair.svg','w').write(lockup(True,'accent'))
open('A-sombre.svg','w').write(lockup(False,'accent'))
open('B-clair.svg','w').write(lockup(True,'oeil',False))
open('B-sombre.svg','w').write(lockup(False,'oeil',False))
open('C-clair.svg','w').write(lockup(True,'accent',False))
open('C-sombre.svg','w').write(lockup(False,'accent',False))
open('icone-bic.svg','w').write(icone(BIC))
open('icone-soleil.svg','w').write(icone(SOLEIL))
open('symbole.svg','w').write(svg(tete(0, 0, 100), 100, 100))
print('ok', width)
