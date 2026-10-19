"""Piesele vectoriale: Labdisc (vedere izometrică de sus) și gesturile.

Fiecare funcție întoarce un fragment SVG. Stilul și regulile: instrucțiuni vizuale pas cu pas
(linie curată, gri pentru obiecte, portocaliu FCL pentru acțiunea pasului).
"""
import math
INK="#3a3a3c"; BODY="#ffffff"; RIM="#e4e7eb"; RIM2="#cfd4da"; GRAY="#9aa0a6"
ACT="#f15c22"; ACTL="#fde3d8"; SCR_OFF="#d5dadf"; SCR_ON="#c9eef8"; OK="#5f6b0f"; LIME="#c1d72e"
K=0.577; R=120; T=26
def iso(cx,cy,x,y): return cx+x, cy+y*K
def disc(cx,cy,st):
    o=[]
    # side
    o.append(f'<path d="M{cx-R},{cy} L{cx-R},{cy+T} A{R},{R*K} 0 0 0 {cx+R},{cy+T} L{cx+R},{cy} Z" fill="{RIM}" stroke="{INK}" stroke-width="2.5" stroke-linejoin="round"/>')
    o.append(f'<path d="M{cx-R+6},{cy+T*0.55} A{R-6},{(R-6)*K} 0 0 0 {cx+R-6},{cy+T*0.55}" fill="none" stroke="{RIM2}" stroke-width="2"/>')
    g=[f'<g transform="translate({cx},{cy}) scale(1,{K})">']
    g.append(f'<circle r="{R}" fill="{BODY}" stroke="{INK}" stroke-width="{2.5/K*0.75}"/>')
    g.append(f'<circle r="74" fill="none" stroke="{RIM2}" stroke-width="2"/>')
    scr = SCR_ON if st.get("ecran") else SCR_OFF
    g.append(f'<rect x="-44" y="-24" width="88" height="48" rx="7" fill="{scr}" stroke="{INK}" stroke-width="2.5"/>')
    if st.get("ecran"):
        txt = st.get("valoare","0.0")
        g.append(f'<text x="0" y="12" text-anchor="middle" font-family="Open Sans, sans-serif" font-weight="700" font-size="26" fill="{INK}">{txt}</text>')
    g.append(f'<text x="0" y="-36" text-anchor="middle" font-family="Open Sans, sans-serif" font-weight="600" font-size="13" fill="{GRAY}">Labdisc</text>')
    # sensor keys
    for i,a in enumerate([165,140,115,90,65,40,15]):
        x=97*math.cos(math.radians(a)); y=-97*math.sin(math.radians(a))
        hl = (a==40 and st.get("tasta")=="temp")
        g.append(f'<circle cx="{x:.1f}" cy="{y:.1f}" r="13" fill="{ACT if hl else BODY}" stroke="{INK}" stroke-width="2.2"/>')
        if a==40:
            c = "#fff" if hl else INK
            g.append(f'<line x1="{x:.1f}" y1="{y-7:.1f}" x2="{x:.1f}" y2="{y+3:.1f}" stroke="{c}" stroke-width="2.6" stroke-linecap="round"/><circle cx="{x:.1f}" cy="{y+5:.1f}" r="3.4" fill="{c}"/>')
        else:
            g.append(f'<circle cx="{x:.1f}" cy="{y:.1f}" r="4.5" fill="none" stroke="{GRAY}" stroke-width="1.6"/>')
    # control keys
    for a,kind in [(228,"sel"),(270,"pwr"),(312,"run")]:
        x=95*math.cos(math.radians(a)); y=-95*math.sin(math.radians(a)); rot=-(a-270)
        hl = st.get("tasta")==kind
        g.append(f'<g transform="translate({x:.1f},{y:.1f}) rotate({rot})"><rect x="-22" y="-12" width="44" height="24" rx="12" fill="{ACT if hl else BODY}" stroke="{INK}" stroke-width="2.2"/>')
        c = "#fff" if hl else INK
        if kind=="pwr":
            g.append(f'<path d="M-5,-4 A7,7 0 1 0 5,-4" fill="none" stroke="{c}" stroke-width="2.4" stroke-linecap="round"/><line x1="0" y1="-8" x2="0" y2="0" stroke="{c}" stroke-width="2.4" stroke-linecap="round"/>')
        else:
            g.append(f'<circle r="4" fill="none" stroke="{GRAY}" stroke-width="1.6"/>')
        g.append('</g>')
    g.append('</g>')
    return "".join(o+g)
def pos(cx,cy,kind):
    a={"pwr":270,"temp":40}[kind]; r={"pwr":95,"temp":97}[kind]
    return cx+r*math.cos(math.radians(a)), cy-r*math.sin(math.radians(a))*K
def apasa(x,y):
    # sageata in jos spre tasta + unde
    return (f'<g><path d="M{x},{y-58} L{x},{y-30}" stroke="{ACT}" stroke-width="7" stroke-linecap="round"/>'
            f'<path d="M{x-13},{y-34} L{x},{y-16} L{x+13},{y-34} Z" fill="{ACT}" stroke="{ACT}" stroke-width="3" stroke-linejoin="round"/>'
            f'<ellipse cx="{x}" cy="{y}" rx="30" ry="{30*K}" fill="none" stroke="{ACT}" stroke-width="2.2" stroke-dasharray="5 5"/></g>')
def lupa(cx,cy,tx,ty,cont):
    return (f'<line x1="{tx}" y1="{ty}" x2="{cx}" y2="{cy}" stroke="{INK}" stroke-width="1.8" stroke-dasharray="4 4"/>'
            f'<circle cx="{tx}" cy="{ty}" r="5" fill="{INK}"/>'
            f'<circle cx="{cx}" cy="{cy}" r="60" fill="#fff" stroke="{INK}" stroke-width="2.5"/>'+cont)
def ecran_mare(cx,cy,val,unit):
    return (f'<rect x="{cx-46}" y="{cy-30}" width="92" height="60" rx="8" fill="{SCR_ON}" stroke="{INK}" stroke-width="2.2"/>'
            f'<rect x="{cx+22}" y="{cy-24}" width="16" height="8" rx="2" fill="none" stroke="{INK}" stroke-width="1.6"/><rect x="{cx+24}" y="{cy-22}" width="10" height="4" fill="{INK}"/>'
            f'<text x="{cx-36}" y="{cy+10}" font-family="Open Sans, sans-serif" font-weight="700" font-size="24" fill="{INK}">{val}</text>'
            f'<text x="{cx-36}" y="{cy+24}" font-family="Open Sans, sans-serif" font-size="10" fill="{INK}">{unit}</text>')
def bifa(x,y):
    return f'<circle cx="{x}" cy="{y}" r="17" fill="{LIME}" stroke="{INK}" stroke-width="2"/><path d="M{x-8},{y} L{x-2},{y+6} L{x+9},{y-6}" fill="none" stroke="{INK}" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round"/>'
