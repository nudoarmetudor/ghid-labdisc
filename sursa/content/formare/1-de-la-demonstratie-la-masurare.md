---
title: "Labdisc și GlobiLab: de la demonstrație la măsurare"
description: "Utilizarea dispozitivului Labdisc și a aplicației GlobiLab pentru configurarea unei înregistrări și citirea datelor în timp real."
ordine: 1
tags: [formare, unitate]
---

Unitatea 1 din 4 a cursului.

> [!abstract] Ce veți putea face
> - Să descrie structura dispozitivului Labdisc și senzorii fiecărui model.
> - Să explice parametrii unei înregistrări.
> - Să configureze Labdisc și GlobiLab pentru o înregistrare.
>
> Pe scurt: utilizarea dispozitivului Labdisc și a aplicației GlobiLab pentru configurarea unei înregistrări și citirea datelor în timp real.

> [!tip] De citit pe parcurs
> - [[formare/labdisc/index|Labdisc pe scurt]]
> - [[formare/labdisc/aparatul|Aparatul: taste, ecran, senzori, configurare]]
> - [[formare/labdisc/globilab|GlobiLab: instalare, interfață, colectarea datelor]]
> - [[formare/labdisc/modele/index|Modelele Labdisc și senzorii lor]]
> - [[la-clasa/implementare/ce-labdisc-aveti|Ce Labdisc aveți?]]

> [!question] Înainte să începeți
> Ce lucrare de laborator sau observație nu reușiți să o faceți la clasă și de ce? Scrieți răspunsul în Padletul grupului sau în documentul vostru de curs (de exemplu un Google Doc). Lista aceasta de obstacole o reluați în [[formare/4-lectia-mea-cu-labdisc|unitatea 4]].

## Investigația științifică cu senzori digitali

### Învățarea bazată pe investigație: de la experimentul demonstrativ la măsurarea realizată de elevi

Gândiți-vă la aceeași răcire a unui pahar cu apă, urmărită o dată cu termometrul și o dată cu Labdisc. Diferența nu e precizia, ci ce vede elevul.

| Cu termometrul | Cu Labdisc |
|---|---|
| 3 valori citite pe termometru | o curbă în timp real |
| elevul citește valorile una câte una | elevul are timp să gândească asupra datelor |

> [!quote] Senzorul nu face experimentul în locul elevului. Îi dă timp să gândească asupra datelor.

Asta aduce un data logger în lecția de științe: elevii nu mai privesc o demonstrație, ci pun o întrebare, prevăd, măsoară și explică. Pașii sunt descriși în [[la-clasa/metodologie/ciclul-investigatiei|Ciclul investigației]].

Vocabularul unității, pe cartonașe. Spuneți-vă explicația în gând, apoi întoarceți cartonașul ca să verificați.

```cartonase
Data logger (înregistrator de date) :: Aparat care măsoară cu senzori și păstrează valorile în timp. Labdisc adună mai mulți senzori într-un singur disc.
Senzor integrat :: Senzor montat în disc, de exemplu temperatura ambientală sau presiunea aerului.
Senzor extern :: Se conectează la o intrare a discului: sonda de temperatură externă, electrodul de pH sau de oxigen dizolvat, intrarea universală.
Rata de eșantionare :: Câte valori măsoară senzorul într-o unitate de timp, de exemplu 10 pe secundă.
Numărul de eșantioane :: Câte valori se înregistrează în total. Împreună cu rata, stabilește durata înregistrării.
Durata înregistrării :: Numărul de eșantioane împărțit la rată: 1000 de eșantioane la 10 pe secundă înseamnă 100 s.
USB :: Conexiune prin cablu, stabilă; potrivită pentru laborator.
Bluetooth :: Conexiune fără fir cu laptopul, tableta sau telefonul; utilă pe teren. Trebuie activată pe disc.
Marker :: Punct pus pe grafic în GlobiLab, care arată valoarea exactă și momentul în care a fost măsurată.
Adnotare :: Text sau imagine scrise direct pe grafic, ca să explice ce s-a întâmplat în acel moment.
```

## Dispozitivul Labdisc și aplicația GlobiLab

### Structura dispozitivului Labdisc: taste, ecran, senzori integrați și externi, porturi, alimentare

Luați discul în mână și parcurgeți pașii. Detaliile sunt în [[formare/labdisc/aparatul|Aparatul Labdisc]].

1. Porniți discul, alegeți limba și activați Bluetooth-ul.
2. Găsiți pe disc tastele, ecranul, porturile și senzorii.
3. Alegeți un senzor cu tastele de selecție și citiți valoarea direct pe ecran.

> [!warning]- Dacă nu merge
> Baterie descărcată: puneți discul la încărcat și lucrați între timp cu alt disc. Încărcarea completă durează aproximativ 6 ore, deci discurile se încarcă din ziua dinainte.

### Modelele Labdisc (GenSci, Physio, BioChem, Enviro) și ce măsoară fiecare

1. Identificați modelul pe care îl aveți.
2. Cu [[formare/labdisc/aparatul#1.3 Senzori integrați și senzori externi|tabelul senzorilor pe modele]], stabiliți ce poate și ce nu poate măsura.
3. Comparați modelele: care se potrivește disciplinei voastre și ce aveți la școală.

> [!question] Gândiți-vă
> Ce model aveți? Ce experiment din disciplina voastră nu ați putea face cu el?

> [!example]- Ce model pentru ce disciplină
> Stațiile cursului folosesc Physio sau GenSci la fizică, BioChem la chimie și biologie, Enviro la geografie și GenSci la clasele primare. Senzorul de temperatură externă e pe toate modelele, deci o primă înregistrare merge oriunde.

**Ce produceți:** fișa modelului, în documentul vostru: senzorii disponibili și experimentele posibile. Fiecare model are pagina lui în [[formare/labdisc/modele/index|Modelele Labdisc]], cu un test scurt la final.

### Aplicația GlobiLab: instalare, conectare prin USB și Bluetooth, configurarea înregistrării

1. Instalați GlobiLab, după pașii din [[formare/labdisc/globilab#2.1 Instalare GlobiLab Software|GlobiLab, secțiunea 2.1]].
2. Conectați discul prin USB sau prin Bluetooth.
3. Deschideți „Configurare” și alegeți senzorii, rata de eșantionare și numărul de eșantioane.
4. Calculați durata: număr de eșantioane / rată.

> [!question] Calculați
> 10 eșantioane pe secundă și 1000 de eșantioane: cât durează înregistrarea?

Răspundeți întâi în gând, apoi verificați în calculator. După aceea schimbați rata la 1 pe secundă și urmăriți cum se schimbă durata.

```durata
```

> [!example] Cum alegeți rata
> Rata se alege după cât de repede se schimbă fenomenul. Răcirea unui pahar cu apă e lentă: 1 valoare pe secundă ajunge. Un sunet sau o descărcare electrică se schimbă în fracțiuni de secundă și cer rate mari. O rată prea mare la un fenomen lent nu face graficul mai bun, doar fișierul mai mare.

> [!warning]- Dacă nu merge
> Bluetooth-ul nu găsește discul: verificați că e activat pe disc sau folosiți cablul USB.

Puneți în ordine pașii unei înregistrări. Folosiți săgețile, apoi apăsați „Verifică ordinea”.

```ordine
titlu: Ordonați pașii pentru prima înregistrare în GlobiLab
Porniți Labdisc și activați Bluetooth-ul sau legați cablul USB
Deschideți GlobiLab și conectați discul
Apăsați „Configurare” și bifați senzorii
Setați rata de eșantionare și numărul de eșantioane
Confirmați setările
Apăsați Run și faceți experimentul
Apăsați Stop
Puneți un marker și o adnotare pe grafic
```

### Prima înregistrare: temperatura, a doua mărime după model; citirea graficului în timp real

1. Țineți sonda de temperatură externă în palmă 60 s, apoi eliberați-o. Merge pe toate modelele.
2. Adăugați a doua mărime, după model: lumina, nivelul sonor sau umiditatea.
3. Puneți un marker pe grafic și o adnotare care explică fenomenul.

Înainte să apăsați Run, prevedeți. Desenați pe grafic curba pe care o așteptați pentru sonda ținută în palmă un minut și apoi eliberată, apoi apăsați „Arată datele”.

```grafic
titlu: Sonda de temperatură în palmă 60 s, apoi eliberată
x: Timp (s)
y: Temperatura (°C)
prezicere: da
nota: Date ilustrative, calculate cu o lege exponențială de încălzire și răcire (aer 22 °C, palmă 34 °C); nu sunt o măsurare. Curba voastră va avea alte valori.
date:
0, 22.0
10, 28.8
20, 31.7
30, 33.0
40, 33.6
50, 33.8
60, 33.9
70, 31.5
80, 29.6
90, 28.1
100, 26.9
110, 25.9
120, 25.1
130, 24.5
140, 24.0
```

> [!question] Gândiți-vă
> Puneți markerul acolo unde ați luat mâna. Ce spune graficul după acel moment?

> [!question]- Un răspuns posibil
> Temperatura nu revine dintr-odată la cea a aerului. Scade repede la început și tot mai încet după aceea, pentru că sonda cedează căldură cu atât mai repede cu cât e mai caldă decât aerul. Același lucru se vede și la încălzire: sonda nu sare la temperatura palmei, se apropie de ea treptat. Asta e o adnotare bună pentru grafic.

> [!example]- A doua mărime, după disciplină
> - **Fizică:** lumina, cu senzorul acoperit și descoperit, sau nivelul sonor când cineva vorbește lângă disc.
> - **Chimie:** temperatura apei în care dizolvați clorură de calciu, cu sonda externă (cu ochelari de protecție).
> - **Biologie:** umiditatea relativă când suflați aer expirat spre senzor.
> - **Geografie:** temperatura și umiditatea aerului lângă fereastra deschisă și în mijlocul clasei.
> - **Clasele primare:** lumina la umbră și la soare, cu discul pe pervaz.

**Ce produceți:** un grafic adnotat, primul produs pentru portofoliu.

> [!warning]- Dacă nu merge
> Grafic plat: verificați dacă senzorul e bifat la „Configurare”.

## Verificați-vă

Cinci întrebări: rata, durata, senzorul potrivit și două probleme frecvente. Alegeți o variantă și citiți explicația, mai ales când ați greșit.

```quiz
? Setați 10 eșantioane pe secundă și 1000 de eșantioane. Cât durează înregistrarea?
+ 100 s | 1000 ÷ 10 = 100 s, adică 1 min 40 s.
- 10 000 s | Ați înmulțit rata cu numărul de eșantioane. Durata este numărul de eșantioane împărțit la rată.
- 1000 s | Aceasta ar fi durata la 1 eșantion pe secundă.

? Vreți să urmăriți cum se răcește un pahar cu apă caldă timp de 10 minute. Ce rată alegeți?
+ 1 pe secundă | Răcirea e lentă; 600 de valori în 10 minute dau o curbă netedă.
- 1000 pe secundă | Ați strânge 600 000 de valori pentru un fenomen care se schimbă cu câteva grade pe minut. Fișierul crește, graficul nu devine mai bun.
- 1 pe minut | Ați avea doar 11 puncte și ați pierde detaliile din primele minute, când temperatura scade cel mai repede.

? Oricare ar fi modelul de Labdisc, ce senzor folosiți pentru temperatura apei dintr-un pahar?
+ Sonda de temperatură externă | Există pe toate cele patru modele și se scufundă în apă.
- Senzorul de temperatură ambientală | Măsoară aerul din jurul discului; nu se pune în apă.
- Termocuplul | E doar pe BioChem; e gândit pentru temperaturi foarte joase sau foarte înalte.

? Ați apăsat Run, dar graficul e o linie plată. Ce verificați întâi?
+ Dacă senzorul e bifat la „Configurare” | Se verifică în câteva secunde și e prima cauză din lista „Dacă nu merge”.
- Rata de eșantionare | Rata schimbă cât de des se măsoară, nu dacă senzorul e activ.
- Reinstalați GlobiLab | Programul desenează graficul, deci funcționează; problema e în setări sau în experiment.

? GlobiLab nu găsește discul prin Bluetooth. Ce faceți?
+ Verificați că Bluetooth-ul e activat pe disc sau treceți pe cablul USB | Fără Bluetooth activat, discul nu comunică cu GlobiLab; cablul USB e soluția sigură.
- Schimbați modelul de Labdisc | Problema e de conexiune, nu de model; toate modelele se conectează la fel.
- Reduceți numărul de eșantioane | Setările înregistrării nu influențează conexiunea.
```

## Aplicați

- Instalarea aplicației GlobiLab pe dispozitivul propriu și studierea [[formare/labdisc/index|ghidului de utilizare Labdisc]].
- O înregistrare de probă în laboratorul sau în clasa proprie.

**Produsul:** Grafic adnotat al unei înregistrări proprii. **Evaluarea:** autoevaluare după lista de verificare.

## Autoevaluare

Bifați ce puteți face fără ajutor. Bifele rămân doar în browserul dumneavoastră.

- [ ] Pot descrie structura dispozitivului Labdisc și senzorii fiecărui model.
- [ ] Pot explica parametrii unei înregistrări.
- [ ] Pot configura Labdisc și GlobiLab pentru o înregistrare.

## Reflecție

> [!quote] Ce i-ați spune unui coleg care deschide Labdisc prima dată?

Scrieți sfatul în Padletul grupului, apoi notați în documentul vostru de curs un lucru pe care îl duceți la clasă și un lucru care încă nu e clar.

**Mai departe:** cu discul configurat, treceți la experimente din disciplina voastră în [[formare/2-experimente-in-statii|unitatea 2]].
