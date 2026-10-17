---
title: "Chimie"
description: "Secvențe de lecție cu Labdisc la chimie."
---

Cinci lecții de chimie, clasele VII-X, toate scrise de Aliona Baidan: aerul, apa și soluțiile, dizolvarea, pH-ul, clasele de compuși. Mai jos, ce senzori cere fiecare și o simulare pentru lecția despre pH.

## Ce senzori vă trebuie

| Lecția | Senzorii | Modelele |
|---|---|---|
| Aerul, amestec omogen | umiditate relativă | GenSci, BioChem, Enviro |
| Apa ca solvent | presiunea aerului, temperatură | GenSci, Physio, BioChem |
| Dizolvarea. Solubilitatea | temperatură externă | toate |
| Noțiunea de pH | pH | GenSci, BioChem, Enviro |
| Oxizi, acizi, baze, săruri | CO₂ (senzor extern) | vezi nota |

> [!warning] Senzorul de CO₂
> Senzorul de CO₂ nu e în tabelele modelelor. Întrebați dacă școala sau centrul îl are. Detalii în [[la-clasa/implementare/ce-labdisc-aveti|Ce Labdisc aveți?]].

## Scala pH, înainte de măsurare

Elevii pot explora scala pH în simulare, își fac predicțiile pentru soluțiile din lecție și le verifică apoi cu senzorul de pH.

```simulare
url: https://phet.colorado.edu/sims/html/ph-scale/latest/ph-scale_ro.html
titlu: Scala pH
sursa: PhET Interactive Simulations, University of Colorado Boulder, CC BY 4.0.
```

## Verificați-vă

```quiz
? Dizolvați o sare în apă și temperatura scade. Ce fel de proces e?
- Exoterm | La un proces exoterm se degajă căldură și temperatura crește.
+ Endoterm | Corect: dizolvarea absoarbe căldură din apă, iar curba temperaturii coboară.
- Nu se poate spune din grafic | Tocmai graficul temperaturii vă arată dacă procesul degajă sau absoarbe căldură.

? Încălziți apa minerală carbogazoasă într-un vas închis. Ce arată senzorul de presiune?
+ Presiunea crește | Corect: la cald, gazul dizolvat iese din apă și presiunea din vas crește.
- Presiunea scade | La cald, gazele se dizolvă mai puțin, nu mai mult.
- Presiunea rămâne la fel | Vasul e închis, iar gazul care iese din apă nu are unde să plece.

? O soluție are pH 3. Ce este?
+ Acidă | Corect: sub 7, soluția e acidă.
- Neutră | Neutru e pH 7.
- Bazică | Bazic înseamnă peste 7.
```
