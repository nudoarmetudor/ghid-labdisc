# Mini-ghid de identitate: materiale Future Classroom Lab (Clasa Viitorului)

Pentru ghiduri, cursuri și resurse educaționale deschise (RED) ale Centrului Național de
Inovații Digitale în Educație „Clasa Viitorului”, făcute ca acest ghid: site Quartz, sursă
markdown, licență deschisă. Ghidul Labdisc din acest depozit e primul exemplu și șablonul.

Clasa Viitorului este iterația din Moldova a conceptului Future Classroom Lab (FCL) și e
compatibilă cu FCL de la European Schoolnet. Identitatea de mai jos vine din cele două
logouri și din site-ul clasaviitorului.md. **Nu este manualul oficial de brand.** Dacă
Centrul sau European Schoolnet are unul, acela are întâietate, iar fișierul acesta se
corectează după el.

---

## 1. Ce semnează materialul

- **Titularul:** © {an} Centrul Național de Inovații Digitale în Educație „Clasa Viitorului”.
- **Autorii:** numiți pe nume, la nivel de material și la nivel de componentă (lecție,
  fișă, capitol). Fiecare componentă poartă numele celui care a scris-o.
- **Licența:** CC BY-SA 4.0 pentru conținut; MIT pentru codul site-ului.
- **Fără alte mărci.** Nicio mențiune, logo sau legătură spre firme sau proiecte personale
  ale autorilor. Materialele ajung ca RED pe clasaviitorului.md și
  trebuie să poată sta acolo așa cum sunt.
- **Ce rămâne în afara licenței**, spus explicit: logourile Clasa Viitorului, FCL și
  European Schoolnet, mărcile producătorilor de echipamente, fotografiile de produs,
  capturile din programele lor și imaginile preluate din alte surse (cu sursa lângă ele).

## 2. Logoul

| Fișier | Când |
|---|---|
| `sursa/quartz/static/clasa-viitorului.png` | Antetul site-ului. Logoul Clasa Viitorului cu semnul FCL „by European Schoolnet”, preluat de pe clasaviitorului.md. |

- Folosiți logoul Clasa Viitorului; el conține deja semnul Future Classroom Lab. Logoul
  European Schoolnet separat apare doar când materialul e făcut împreună cu European
  Schoolnet.
- Pe fond închis, logoul stă pe o placă albă cu colțuri rotunjite, pentru că textul lui e
  gri închis. Nu se recolorează și nu se inversează.
- Lățime minimă pe ecran: 96 px. Spațiu liber în jur: cel puțin înălțimea literei „c”.
- **De cerut de la Centru:** logoul vectorial (SVG sau PDF). Fișierul de pe site are doar
  270 × 100 px și se vede ușor neclar pe ecranele dense.

## 3. Culorile

Șase culori, luate din semnul FCL (pixel cu pixel din logoul European Schoolnet), plus
gri-ul textului și albastrul European Schoolnet.

| Nume | Culoare | Contrast pe alb | Ca text? | Variantă de text |
|---|---|---|---|---|
| Portocaliu FCL | `#f15c22` | 3,3:1 | doar titluri mari | `#c2410c` (5,2:1) |
| Magenta FCL | `#e60e64` | 4,6:1 | da | `#b0094f` (7,0:1) pentru text mic |
| Lime FCL | `#c1d72e` | 1,6:1 | nu | `#5f6b0f` (5,8:1) |
| Cyan FCL | `#00bce4` | 2,3:1 | nu | `#0878be` (4,7:1) |
| Roșu FCL | `#e51b24` | 4,7:1 | da | |
| Mov FCL | `#514e86` | 7,5:1 | da | |
| Gri text | `#3a3a3c` | 11,4:1 | textul de bază | |
| Albastru European Schoolnet | `#0878be` | 4,7:1 | legăturile | |

**Roluri:**

- Textul e gri FCL, nu negru. Legăturile sunt albastrul European Schoolnet; la trecerea
  mouse-ului, magenta.
- Culorile pline (cyan, lime, portocaliu) merg pe benzi, chenare, carduri și pictograme,
  nu pe text mic. Unde o culoare trebuie să fie text, se folosește varianta de text.
- Când un material are părți, fiecare parte ia o culoare FCL. În ghidul Labdisc:
  Formare = cyan, La clasă = portocaliu; disciplinele: fizică cyan, chimie magenta,
  biologie lime, geografie portocaliu, clasele primare mov.
- **Banda FCL**: cele șase culori, în ordinea din logo (portocaliu, magenta, mov, roșu,
  cyan, lime), ca o linie de 4 px sub antet și deasupra subsolului. E semnătura vizuală a
  materialelor; nu se folosește ca fundal mare.
- Culoarea nu poartă singură un sens: o etichetă colorată are și text.
- În modul întunecat, etichetele colorate trec pe gri deschis, iar culoarea rămâne pe
  benzi și chenare. Fundalul întunecat: `#16181d`.

## 4. Tipografia

- **Open Sans** (fontul site-ului clasaviitorului.md), pentru titluri și text. Greutăți:
  400 text, 600 legături și etichete, 700 titluri. Licența: SIL Open Font License.
- Fontul se servește de pe site (`static/fonts/`), nu de la Google: cititorii nu își
  trimit adresa IP unui terț ca să citească un material public.
- Textul de bază la 17 px pe ecran mare și 16 px pe telefon.

## 5. Scrisul

- Română cu diacritice corecte: ș și ț cu virgulă, nu cu sedilă.
- „AI”, niciodată „IA”.
- Cât mai puține linii de pauză (—); virgula, punctul și două puncte fac aceeași treabă.
- Textul preluat din documente (lecții, ghiduri, curriculum) se copiază literal, cu numele
  autorului lângă el. Ce scriem noi nu se amestecă fără semn cu ce au scris alții.
- Pentru termenii de specialitate nesiguri în română, scriem termenul în engleză, îl
  marcăm și întrebăm.
- Fără prețuri și fără numărul de participanți din grupuri.

## 6. Structura unui material

Șablonul e acest depozit: `sursa/quartz.config.ts`, `sursa/quartz.layout.ts`,
`sursa/quartz/components/ghid/` și `sursa/quartz/styles/custom.scss`.

- Pagina principală: o propoziție despre ce e materialul, apoi părțile lui ca carduri
  mari, câte unul pe culoare FCL.
- Fiecare pagină scrisă de un autor are în antet `autor`, `autor_slug` și, la nevoie,
  `autor_rol` („Autoare”); pagina autorului îi listează singură materialele.
- O pagină „Autori” și o pagină „Despre și licență” în fiecare material.
- Totul se citește pe telefon: fără tabele late cu paragrafe în celule, butoane de cel
  puțin 40 px înălțime, imagini de cel mult 1400 px lățime și câteva sute de KB.
- Bifele (autoevaluări, liste de verificare) rămân doar în browserul cititorului.
