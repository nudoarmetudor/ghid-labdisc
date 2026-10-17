import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "../types"
import { pathToRoot, joinSegments } from "../../util/path"

const Subsol: QuartzComponent = ({ fileData, displayClass }: QuartzComponentProps) => {
  const baseDir = pathToRoot(fileData.slug!)
  return (
    <footer class={`ghid-subsol ${displayClass ?? ""}`}>
      <div class="ghid-banda" aria-hidden="true"><span /><span /></div>
      <p>
        Ghid realizat pe baza cursului „Integrarea Labdisc în activități practice de cercetare la
        științe”, Centrul Național de Inovații Digitale în Educație „Clasa Viitorului”. Autor și
        formator: <strong>Tudor Lapp</strong>. Secvențele de lecție sunt semnate de autorii lor, pe
        fiecare pagină și în <a href={joinSegments(baseDir, "autori")}>lista autorilor</a>.
      </p>
      <p class="ghid-subsol-mic">
        Conținut sub licența{" "}
        <a href="https://creativecommons.org/licenses/by-sa/4.0/deed.ro" target="_blank" rel="noopener">
          CC BY-SA 4.0
        </a>
        , fiecare material cu titularul lui; mărcile Labdisc, Globisens, GlobiLab și Clasa
        Viitorului aparțin titularilor și nu intră sub licență.{" "}
        <a href={joinSegments(baseDir, "despre")}>Despre ghid și licență</a>.
      </p>
      <p class="ghid-subsol-mic">
        Construit cu <a href="https://quartz.jzhao.xyz/" target="_blank" rel="noopener">Quartz</a>;
        sursa pe{" "}
        <a href="https://github.com/nudoarmetudor/ghid-labdisc" target="_blank" rel="noopener">GitHub</a>
        , cod sub licența MIT.
      </p>
    </footer>
  )
}

Subsol.css = `
.ghid-subsol { margin: 3rem 0 4rem; font-size: .92rem; color: var(--darkgray); }
.ghid-subsol .ghid-banda { display: flex; gap: 4px; margin-bottom: 1.2rem; }
.ghid-subsol .ghid-banda span { height: 4px; flex: 1; border-radius: 2px; }
.ghid-subsol .ghid-banda span:nth-child(1) { background: #0b7285; }
.ghid-subsol .ghid-banda span:nth-child(2) { background: #d9480f; }
.ghid-subsol-mic { opacity: .78; font-size: .82rem; margin-top: .8rem; }
`

export default (() => Subsol) satisfies QuartzComponentConstructor
