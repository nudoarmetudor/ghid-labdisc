---
title: "Fișele celor trei stații"
description: "Trei experimente de fizică cu Labdisc, pentru lucrul pe stații: mișcare, fenomene termice, electricitate."
ordine: 1
tags: [anexe, fizica]
---

Stațiile cer senzorul de distanță, sonda de temperatură externă și senzorii de tensiune și curent. Le au modelele **GenSci** și **Physio**. Verificați în [[la-clasa/implementare/ce-labdisc-aveti|Ce Labdisc aveți?]].

**Regula la fiecare stație:** scrieți predicția înainte să apăsați Run, faceți înregistrarea, apoi explicați. Salvați graficul înainte să treceți la stația următoare. O predicție greșită e la fel de utilă ca una corectă.

## Stația 1. Mișcare

**Aveți nevoie de:** Labdisc cu senzor de distanță, un plan înclinat, un cărucior, 2-3 m de spațiu liber, o carte ca țintă.

1. **Predicție.** Profesorul vă arată un grafic x(t). Scrieți cum trebuie să meargă un coleg în fața senzorului ca să obțineți acel grafic.
2. **Înregistrare.** Un membru al echipei merge în fața senzorului și încearcă să reproducă graficul. Apoi lăsați căruciorul să coboare pe planul înclinat și înregistrați.
3. **Explicație.** În GlobiLab, aplicați funcția „Derivată” pe graficul x(t) ca să obțineți v(t).

**Întrebări:**

- Cum trebuie să mergi ca graficul să fie o linie orizontală?
- Ce înseamnă panta graficului x(t)?
- Cum arată v(t) pentru căruciorul de pe planul înclinat? Ce vă spune despre mișcarea lui?

**Dacă valorile sar:** obiectul e prea aproape de senzor (sub 0,4 m) sau suprafața nu reflectă bine. Folosiți o carte ca țintă.

## Stația 2. Fenomene termice

**Aveți nevoie de:** Labdisc cu sondă de temperatură externă, un pahar, apă caldă.

> [!warning] Siguranță
> Apa fierbinte stă doar pe masa stației. O toarnă profesorul.

1. **Predicție.** Desenați cum credeți că va scădea temperatura apei în 10 minute.
2. **Înregistrare.** Puneți sonda externă în apă. Înregistrați o valoare pe secundă, 10 minute, cu temperatura aerului din clasă pe același grafic.
3. **Explicație.** Comparați primul și ultimul minut.

**Întrebări:**

- Unde scade temperatura mai repede și de ce?
- Ce vă spune panta graficului?
- Până unde va scădea temperatura apei dacă așteptați mult?

## Stația 3. Electricitate

**Aveți nevoie de:** Labdisc cu senzori de tensiune și de curent, o sursă de curent sau baterii, un rezistor, cabluri, un calculator cu foaie de calcul (Excel sau alta).

1. **Predicție.** Cum credeți că se schimbă intensitatea curentului când creșteți tensiunea?
2. **Înregistrare.** Montați circuitul: sursa, rezistorul, senzorii de tensiune și de curent. Luați 5 valori ale tensiunii, câte o citire stabilă pentru fiecare.
3. **Explicație.** Exportați datele în format .CSV și faceți graficul I = f(U) în foaia de calcul.

**Întrebări:**

- Ce reprezintă panta dreptei?
- Dacă dublăm rezistența și păstrăm sursa, cum se schimbă dreapta?

**Dacă nu merge:** dacă intensitatea depășește domeniul senzorului (±1 A), folosiți un rezistor mai mare. Fără sursă reglabilă, folosiți 1, 2 și 3 baterii în serie.
