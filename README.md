# Integrarea Labdisc în activități practice de cercetare la științe

Ghid deschis pentru profesorii de științe, pe baza cursului cu același nume ținut la Centrul
Național de Inovații Digitale în Educație „Clasa Viitorului”. Autori: Tudor Lapp și Victoria Calistru;
secvențele de lecție, profesorii care le-au scris, fiecare pe pagina lui.

**Site-ul:** https://nudoarmetudor.github.io/ghid-labdisc/

## Identitatea vizuală

Stilul Future Classroom Lab (Clasa Viitorului): culori, logo, tipografie și reguli de scris în
`BRAND-FCL.md`. Același fișier e șablonul pentru alte materiale făcute la fel.

## Cele două părți

| Unde | Ce este |
|---|---|
| `sursa/content/formare/` | **Formare**: sesiunile cursului, tutoriale Labdisc și GlobiLab, demonstrații, autoevaluare, reflecție. |
| `sursa/content/la-clasa/` | **La clasă**: metodologie, implementare, proiectele de lecție ale profesorilor (`proiecte/<disciplină>/`), anexe. |
| `sursa/content/autori/` | Autorii. Lista lecțiilor fiecăruia se face singură din câmpul `autor_slug` al lecțiilor. |
| `sursa/quartz/components/ghid/` | Componentele proprii: antet, subsol, pagina principală, caseta lecției, contribuțiile autorilor. |
| `sursa/quartz.config.ts`, `sursa/quartz.layout.ts` | Configurarea Quartz 4.5.2. |

## O lecție nouă

Un fișier în `sursa/content/la-clasa/proiecte/<disciplină>/`, cu antetul:

```yaml
---
title: "Subiectul lecției"
autor: "Prenume Nume"
autor_slug: "prenume-nume"
realizat: "rândul „Realizat:” din document, cuvânt cu cuvânt"
disciplina: "Fizica"
clasa: "VII"
modul: "..."
echipament: ["Labdisc Physio"]
licenta: "CC BY-SA 4.0"
tags: [fizica, clasa-vii, prenume-nume]
---
```

Pentru un autor nou, adăugați și `sursa/content/autori/<prenume-nume>.md`.
O pagină cu `draft: true` nu apare pe site.

## Cum se publică

La fiecare modificare pe `main`, `.github/workflows/publica.yml` construiește site-ul și îl
publică pe GitHub Pages (în setările depozitului: Pages → Source: GitHub Actions).

## Lucru local

```bash
cd sursa
npm ci
npx quartz build --serve           # http://localhost:8080
CIORNE=1 npx quartz build --serve  # arată și paginile draft
```

## Licență

Conținutul: © 2026 CNIDE „Clasa Viitorului”, CC BY-SA 4.0, fiecare material cu numele autorului lui;
detalii în `LICENTA-CONTINUT.md`.
Codul: MIT (`LICENSE`).
