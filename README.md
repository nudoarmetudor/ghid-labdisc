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

## Piese interactive

Un bloc de cod cu unul dintre numele de mai jos devine o piesă interactivă pe pagină
(`sursa/quartz/plugins/transformers/interactiv.ts` îl recunoaște,
`sursa/quartz/components/scripts/interactiv.inline.ts` îl desenează). Ce bifează sau
desenează cititorul rămâne doar în browserul lui.

| Bloc | Ce face | Format |
|---|---|---|
| `quiz` | Întrebări cu răspuns imediat și explicație | `? întrebare`, apoi `+ corect \| de ce`, `- greșit \| de ce`; o linie goală între întrebări |
| `cartonase` | Cartonașe care se întorc: termen și explicație | `Termen :: explicație`, câte unul pe linie |
| `ordine` | Ordonare cu săgeți, apoi verificare | `titlu: ...` opțional, apoi pașii în ordinea corectă (se amestecă singuri) |
| `grafic` | Grafic cu cursor; cu `prezicere: da`, cititorul își desenează întâi curba | `titlu:`, `x:`, `y:`, `prezicere: da`, `nota:`, apoi `date:` și linii `x, y` |
| `durata` | Calculator: rată de eșantionare × număr de eșantioane = durată | bloc gol |
| `simulare` | Simulare încorporată, se încarcă la clic | `url:`, `titlu:`, `sursa:` |
| `lori` | Fișă de evaluare LORI, note 1-5, cu media | `Dimensiune :: descriere`, câte una pe linie |

Datele unui `grafic` care nu vin dintr-o măsurare reală se marchează în `nota:` ca
ilustrative. Diagramele se scriu în ```mermaid; o etichetă nu începe cu „1. ” (Mermaid o citește ca listă), scrieți „1 · ” sau „Unitatea 1: ”.
Un tabel primește singur butonul „Copiază tabelul”. Simulările PhET în română: `https://phet.colorado.edu/sims/html/<sim>/latest/<sim>_ro.html`.

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
