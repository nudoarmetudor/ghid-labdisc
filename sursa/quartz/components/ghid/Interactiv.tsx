import { QuartzComponent, QuartzComponentConstructor } from "../types"
// @ts-ignore
import script from "../scripts/interactiv.inline"

// Nu desenează nimic: aduce scriptul și stilul pieselor interactive pe fiecare pagină.
const Interactiv: QuartzComponent = () => null

Interactiv.afterDOMLoaded = script
Interactiv.css = `
.interactiv { margin: 1.6rem 0; padding: 1rem 1.1rem 1.1rem; border-radius: 14px; border: 1px solid var(--lightgray);
  background: var(--light); box-shadow: 0 1px 0 var(--lightgray); position: relative; }
.interactiv::before { content: ""; position: absolute; left: 0; right: 0; top: 0; height: 4px; border-radius: 14px 14px 0 0; background: var(--fcl-banda); }
.interactiv-sursa { white-space: pre-wrap; font-size: .85rem; }
.interactiv-eticheta { margin: .2rem 0 .8rem; font-size: .78rem; font-weight: 700; letter-spacing: .06em; text-transform: uppercase; color: var(--secondary); }
.interactiv-nota { font-size: .85rem; color: var(--gray); margin: .6rem 0 0; }
.copiaza-tabel { display: block; margin: 1rem 0 -.6rem auto; font: 600 .85rem var(--bodyFont); min-height: 36px; padding: .3rem .8rem; border-radius: 8px; border: 1px solid var(--secondary); background: var(--light); color: var(--secondary); cursor: pointer; }
.copiaza-tabel:hover { background: var(--secondary); color: var(--light); }
.interactiv-buton { font: 600 .92rem var(--bodyFont); min-height: 42px; padding: .5rem 1rem; margin: .6rem .5rem 0 0; border-radius: 10px; cursor: pointer;
  border: 1.5px solid var(--secondary); background: var(--secondary); color: #fff; }
.interactiv-buton.secundar { background: transparent; color: var(--secondary); }
.interactiv button:focus-visible { outline: 3px solid var(--fcl-magenta); outline-offset: 2px; }

.quiz-intrebare { border: 0; padding: 0; margin: 0 0 1.1rem; }
.quiz-intrebare legend { font-weight: 600; color: var(--dark); margin-bottom: .6rem; line-height: 1.45; }
.quiz-varianta { display: block; width: 100%; text-align: left; font: .95rem var(--bodyFont); line-height: 1.4; color: var(--dark); background: var(--highlight);
  border: 1.5px solid var(--lightgray); border-radius: 10px; padding: .65rem .85rem; margin: .4rem 0; cursor: pointer; min-height: 44px; }
.quiz-varianta:hover:not(:disabled) { border-color: var(--secondary); }
.quiz-varianta:disabled { cursor: default; opacity: .75; }
.quiz-varianta.corect { border-color: #2f8f3a; background: rgba(47,143,58,.12); opacity: 1; }
.quiz-varianta.corect::before { content: "✓ "; color: #2f8f3a; font-weight: 700; }
.quiz-varianta.gresit { border-color: var(--fcl-rosu); background: rgba(229,27,36,.08); opacity: 1; }
.quiz-varianta.gresit::before { content: "✗ "; color: var(--fcl-rosu); font-weight: 700; }
.quiz-feedback { margin: .4rem 0 0; font-size: .92rem; min-height: 1.2em; }
.quiz-feedback.bine { color: #2f7a36; }
.quiz-feedback.rau { color: #b4161d; }
.quiz-scor { font-weight: 700; margin: .4rem 0 0; }

.cartonase-grila { display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: .7rem; }
.cartonas { position: relative; min-height: 120px; border-radius: 12px; border: 1.5px solid var(--lightgray); background: var(--highlight); cursor: pointer;
  font: .95rem var(--bodyFont); color: var(--dark); padding: .9rem; text-align: left; line-height: 1.4; }
.cartonas-fata { font-weight: 700; font-size: 1.05rem; }
.cartonas-spate { display: none; }
.cartonas.intors { background: var(--light); border-color: var(--secondary); }
.cartonas.intors .cartonas-fata { display: none; }
.cartonas.intors .cartonas-spate { display: block; }

.ordine-lista { list-style: none; counter-reset: pas; padding: 0; margin: 0; }
.ordine-pas { counter-increment: pas; display: flex; align-items: center; gap: .4rem; padding: .45rem .5rem; margin: .35rem 0; border-radius: 10px;
  border: 1.5px solid var(--lightgray); background: var(--highlight); }
.ordine-pas::before { content: counter(pas); font-weight: 700; color: var(--secondary); min-width: 1.4rem; text-align: center; }
.ordine-text { flex: 1; line-height: 1.35; }
.ordine-mut { min-width: 40px; min-height: 40px; border-radius: 8px; border: 1px solid var(--lightgray); background: var(--light); color: var(--dark); cursor: pointer; font-size: 1rem; }
.ordine-mut:disabled { opacity: .3; cursor: default; }
.ordine-pas.corect { border-color: #2f8f3a; }
.ordine-pas.gresit { border-color: var(--fcl-rosu); }

.durata-forma { display: grid; gap: .7rem; }
.durata-camp { display: grid; gap: .3rem; font-size: .9rem; color: var(--darkgray); }
.durata-camp > :not(span) { font: 1rem var(--bodyFont); }
.durata-in { min-height: 42px; padding: .4rem .6rem; border-radius: 8px; border: 1.5px solid var(--lightgray); background: var(--light); color: var(--dark); margin-right: .4rem; }
.durata-rezultat { font-size: 1.25rem; font-weight: 700; color: var(--dark); margin: .9rem 0 0; }

.grafic-cadru { width: 100%; }
.grafic-svg { width: 100%; height: auto; display: block; touch-action: manipulation; }
.grafic-grila { stroke: var(--lightgray); stroke-width: 1; }
.grafic-axa { stroke: var(--gray); stroke-width: 1.5; }
.grafic-tick { fill: var(--gray); font-size: 14px; font-family: var(--bodyFont); }
.grafic-titlu-axa { fill: var(--darkgray); font-size: 14px; font-weight: 600; font-family: var(--bodyFont); }
.grafic-real { fill: none; stroke: var(--secondary); stroke-width: 3; stroke-linejoin: round; }
.grafic-prezis { fill: none; stroke: var(--fcl-magenta); stroke-width: 2.5; stroke-dasharray: 7 6; }
.grafic-marker-linie { stroke: var(--fcl-portocaliu); stroke-width: 1.5; }
.grafic-marker-punct { fill: var(--fcl-portocaliu); stroke: #fff; stroke-width: 2; }
.grafic-slider { width: 100%; margin: .6rem 0 0; accent-color: var(--fcl-portocaliu); min-height: 32px; }
.grafic-valoare { font-weight: 600; font-size: .95rem; margin: .3rem 0 0; }

.simulare-cadru { position: relative; aspect-ratio: 16 / 10; border-radius: 10px; overflow: hidden; background: var(--highlight);
  display: grid; place-items: center; border: 1px solid var(--lightgray); }
.simulare-cadru iframe { position: absolute; inset: 0; width: 100%; height: 100%; border: 0; }
.simulare-link { display: inline-block; margin-top: .6rem; font-weight: 600; }

.lori-criteriu { border: 0; padding: 0 0 .9rem; margin: 0 0 .9rem; border-bottom: 1px solid var(--lightgray); }
.lori-criteriu legend { font-weight: 700; color: var(--dark); padding: 0; }
.lori-desc { margin: .2rem 0 .5rem; font-size: .9rem; color: var(--darkgray); }
.lori-note { display: flex; flex-wrap: wrap; gap: .35rem; }
.lori-nota { min-width: 42px; min-height: 42px; border-radius: 8px; border: 1.5px solid var(--lightgray); background: var(--light); color: var(--dark);
  font: 600 .9rem var(--bodyFont); cursor: pointer; padding: 0 .6rem; }
.lori-nota.ales { background: var(--secondary); border-color: var(--secondary); color: #fff; }
.lori-total { font-weight: 700; margin-top: 1rem; }

@media print { .interactiv-sursa[hidden] { display: block !important; } .interactiv > :not(pre) { display: none !important; } }
`

export default (() => Interactiv) satisfies QuartzComponentConstructor
