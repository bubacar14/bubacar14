import sys, json, os
sys.path.insert(0, '.')
from build import texte_en_tracé, tete, goutte, svg, FONT, ENCRE, CRAIE, BIC, BIC_D
paths, glyphs, width = texte_en_tracé(FONT, 'revizo', 100, -1)
e = next(g for g in glyphs if g['ch'] == 'e')['bounds']
ACX, ACY = e[0] + (e[2] - e[0]) * 0.6, e[1] - 16

def mot_svg(couleur, accent):
    corps = ''.join(f'<path d="{p}" fill="{couleur}"/>' for p in paths)
    return corps + goutte(ACX, ACY, 24, 30, accent)

out = 'final'; os.makedirs(out, exist_ok=True)
W_MOT = int(width + 8)
def ecrire(nom, contenu): open(f'{out}/{nom}', 'w').write(contenu)
for theme, c, a in [('clair', ENCRE, BIC), ('sombre', CRAIE, BIC_D)]:
    ecrire(f'revizo-logo-{theme}.svg', svg(f'{tete(0, 10, 100, a)}<g transform="translate(112 98)">{mot_svg(c, a)}</g>', 112 + W_MOT, 116))
    ecrire(f'revizo-logotype-{theme}.svg', svg(f'<g transform="translate(2 88)">{mot_svg(c, a)}</g>', W_MOT, 96))
ecrire('revizo-symbole.svg', svg(tete(0, 0, 100), 100, 100))
ecrire('revizo-icone.svg', svg(f'<rect width="512" height="512" rx="114" fill="{BIC}"/>{tete(56, 44, 400, "#8fa8ff")}', 512, 512))

# Versions « currentColor » pour l'appli : le mot prend la couleur du texte, l'accent celle de --bic.
mot_app = ''.join(f'<path d="{p}"/>' for p in paths)
accent_app = goutte(ACX, ACY, 24, 30, 'var(--bic)')
json.dump({"mot": mot_app, "accent": accent_app, "largeur": W_MOT, "symbole": tete(0, 0, 100, "var(--bic)")}, open(f'{out}/app-logo.json', 'w'))
print(len(mot_app), W_MOT)
