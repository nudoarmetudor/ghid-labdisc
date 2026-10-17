import { pathToRoot, joinSegments } from "../../util/path"
import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "../types"
import { classNames } from "../../util/lang"

// Antetul din stânga: logo-ul Clasa Viitorului (cu semnul Future Classroom Lab), numele
// ghidului și banda celor șase culori FCL. Înlocuiește PageTitle. Logo-ul stă pe o placă
// albă și în modul întunecat, pentru că textul lui e gri închis.
const Brand: QuartzComponent = ({ fileData, cfg, displayClass }: QuartzComponentProps) => {
  const baseDir = pathToRoot(fileData.slug!)
  return (
    <div class={classNames(displayClass, "ghid-brand")}>
      <a href={baseDir} class="ghid-brand-link" aria-label="Pagina principală a ghidului">
        <span class="ghid-logo-placa">
          <img src={joinSegments(baseDir, "static", "clasa-viitorului.png")} alt="Clasa Viitorului, Future Classroom Lab" width="180" height="67" />
        </span>
        <span class="ghid-brand-title">{cfg.pageTitle}</span>
        <span class="ghid-brand-scurt">Ghidul Labdisc</span>
      </a>
      <div class="ghid-banda" aria-hidden="true" />
    </div>
  )
}

Brand.css = `
.ghid-brand { margin: 0; }
.ghid-brand-link { display: flex; flex-direction: column; gap: .55rem; color: var(--dark) !important; text-decoration: none; background: none !important; }
.ghid-logo-placa { display: inline-block; align-self: flex-start; background: #fff; border-radius: 10px; padding: 4px 8px 2px; margin-left: -8px; }
.ghid-logo-placa img { display: block; width: 172px; height: auto; }
.ghid-brand-title { font-family: var(--titleFont); font-weight: 700; font-size: 1rem; line-height: 1.3; }
.ghid-brand-scurt { display: none; }
.ghid-banda { height: 4px; border-radius: 2px; background: var(--fcl-banda); margin-top: .7rem; }
@media all and (max-width: 800px) {
  .ghid-brand-link { flex-direction: row; align-items: center; gap: .6rem; }
  .ghid-logo-placa { margin-left: 0; padding: 2px 4px 0; }
  .ghid-logo-placa img { width: 96px; }
  .ghid-brand-title, .ghid-banda { display: none; }
  .ghid-brand-scurt { display: block; font-family: var(--titleFont); font-weight: 700; font-size: 1rem; line-height: 1.1; }
}
`

export default (() => Brand) satisfies QuartzComponentConstructor
