"""Generează cadrele unei secvențe de instrucțiuni vizuale pas cu pas.

    python3 ilustratii/genereaza.py ilustratii/secvente/pornire-labdisc.json

Scrie în sursa/content/ilustratii/<nume>/ câte un SVG pe pas (pas-1.svg ...) și planșa cu toți
pașii (plansa.svg), pentru documente și slide-uri. Textul pașilor stă în fișierul secvenței; în
ghid îl afișează piesa interactivă `pasi`, în planșă apare sub fiecare cadru.
"""
import json, pathlib, sys
from piese import disc, pos, apasa, lupa, ecran_mare, bifa, INK

W, H = 400, 300
CX, CY = 200, 160

def cadru(n, p, cu_text=False):
    corp = disc(CX, CY, p.get("stare", {}))
    g = p.get("gest", {})
    if "apasa" in g:
        corp += apasa(*pos(CX, CY, g["apasa"]))
    if "lupa_ecran" in g:
        val, unit = g["lupa_ecran"]
        corp += lupa(322, 72, CX + 30, CY - 8, ecran_mare(322, 72, val, unit))
    if g.get("bifa"):
        corp += bifa(360, 118)
    h = H + (50 if cu_text else 0)
    text = (f'<text x="{W/2}" y="{H+22}" text-anchor="middle" font-family="Open Sans, sans-serif" '
            f'font-size="17" fill="{INK}">{p["text"]}</text>') if cu_text else ""
    return (f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {W} {h}" width="{W}" height="{h}" role="img">'
            f'<title>{n}. {p["text"]}</title>'
            f'<rect x="1" y="1" width="{W-2}" height="{h-2}" rx="14" fill="#fff" stroke="#d7dbe0" stroke-width="2"/>'
            f'<text x="24" y="58" font-family="Open Sans, sans-serif" font-weight="700" font-size="44" fill="{INK}">{n}</text>'
            + corp + text + '</svg>')

def main(cale):
    s = json.loads(pathlib.Path(cale).read_text(encoding="utf-8"))
    radacina = pathlib.Path(__file__).resolve().parent.parent
    out = radacina / "sursa/content/ilustratii" / s["nume"]
    out.mkdir(parents=True, exist_ok=True)
    plansa = []
    for i, p in enumerate(s["pasi"], 1):
        (out / f"pas-{i}.svg").write_text(cadru(i, p), encoding="utf-8")
        plansa.append(cadru(i, p, cu_text=True))
    col = 2
    hh = H + 50
    rows = (len(plansa) + col - 1) // col
    inner = []
    for i, c in enumerate(plansa):
        x, y = (i % col) * (W + 20), (i // col) * (hh + 20)
        inner.append(c.replace('<svg xmlns="http://www.w3.org/2000/svg"', f'<svg x="{x}" y="{y}"', 1))
    tw, th = col * W + (col - 1) * 20, rows * hh + (rows - 1) * 20
    (out / "plansa.svg").write_text(
        f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {tw} {th}" width="{tw}" height="{th}">'
        f'<title>{s["titlu"]}</title>' + "".join(inner) + "</svg>", encoding="utf-8")
    print(f"{len(plansa)} cadre în {out}")

if __name__ == "__main__":
    for c in sys.argv[1:]:
        main(c)
