import { pathToRoot } from "../../util/path"
import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "../types"
import { classNames } from "../../util/lang"

// Antetul din stânga: numele ghidului și banda celor două direcții. Înlocuiește PageTitle.
// Fără logouri: mărcile Labdisc, Globisens și Clasa Viitorului nu intră sub licența ghidului.
const Brand: QuartzComponent = ({ fileData, cfg, displayClass }: QuartzComponentProps) => {
  const baseDir = pathToRoot(fileData.slug!)
  return (
    <div class={classNames(displayClass, "ghid-brand")}>
      <a href={baseDir} class="ghid-brand-link" aria-label="Pagina principală a ghidului">
        <span class="ghid-brand-sus">Ghid deschis pentru profesori</span>
        <span class="ghid-brand-title">{cfg.pageTitle}</span>
        <span class="ghid-brand-scurt">Ghidul Labdisc</span>
      </a>
      <div class="ghid-banda" aria-hidden="true"><span /><span /></div>
    </div>
  )
}

Brand.css = `
.ghid-brand { margin: 0; }
.ghid-brand-link { display: flex; flex-direction: column; gap: .3rem; color: var(--dark) !important; text-decoration: none; background: none !important; }
.ghid-brand-sus { font-size: .74rem; font-weight: 700; letter-spacing: .07em; text-transform: uppercase; color: var(--secondary); }
.ghid-brand-title { font-family: var(--titleFont); font-weight: 800; font-size: 1.05rem; line-height: 1.22; letter-spacing: -.01em; }
.ghid-brand-scurt { display: none; }
.ghid-banda { display: flex; gap: 4px; margin-top: .7rem; }
.ghid-banda span { height: 4px; border-radius: 2px; }
.ghid-banda span:nth-child(1) { flex: 1; background: #0b7285; }
.ghid-banda span:nth-child(2) { flex: 1; background: #d9480f; }
@media all and (max-width: 800px) {
  .ghid-brand-sus, .ghid-brand-title, .ghid-banda { display: none; }
  .ghid-brand-scurt { display: block; font-family: var(--titleFont); font-weight: 800; font-size: 1.05rem; line-height: 1.1; }
}
`

export default (() => Brand) satisfies QuartzComponentConstructor
