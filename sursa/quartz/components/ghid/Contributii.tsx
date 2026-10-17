import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "../types"
import { resolveRelative, FullSlug } from "../../util/path"
import { DISCIPLINE, esteLectie, disciplinaDin } from "./zone"

// Pe pagina unui autor (autori/<slug>): paginile semnate de el, din câmpul `autor_slug`
// (secvențe de lecție și alte materiale). Pe autori/index: toți profesorii care au scris
// secvențe de lecție, fiecare cu lecțiile lui. Așa creditarea pe componentă se ține singură:
// o pagină nouă apare la autorul ei.
const Contributii: QuartzComponent = ({ fileData, allFiles }: QuartzComponentProps) => {
  const aici = fileData.slug! as FullSlug
  if (!aici.startsWith("autori/")) return null
  const semnate = allFiles
    .filter((f) => f.frontmatter?.autor_slug)
    .sort((a, b) => String(a.frontmatter?.title).localeCompare(String(b.frontmatter?.title), "ro"))
  const lectii = semnate.filter((f) => esteLectie(f.slug!))
  const lista = (ls: typeof semnate) => (
    <ul class="contributii">
      {ls.map((f) => (
        <li>
          <a class="internal" href={resolveRelative(aici, f.slug!)}>{f.frontmatter?.title}</a>
          <span class="contributii-meta">
            {(esteLectie(f.slug!)
              ? [DISCIPLINE[disciplinaDin(f.slug!)]?.nume, f.frontmatter?.clasa && `clasa a ${f.frontmatter.clasa}-a`]
              : [f.frontmatter?.description])
              .filter(Boolean)
              .join(" · ")}
          </span>
        </li>
      ))}
    </ul>
  )

  if (aici === "autori/index") {
    const autori = new Map<string, typeof lectii>()
    for (const f of lectii) {
      const k = String(f.frontmatter!.autor_slug)
      autori.set(k, [...(autori.get(k) ?? []), f])
    }
    const pagini = new Map(allFiles.filter((f) => f.slug?.startsWith("autori/")).map((f) => [f.slug, f]))
    return (
      <div class="autori">
        <h2>Secvențele de lecție, pe autori</h2>
        {[...autori.entries()]
          .sort((a, b) => String(a[1][0].frontmatter?.autor).localeCompare(String(b[1][0].frontmatter?.autor), "ro"))
          .map(([k, ls]) => (
            <section>
              <h3>
                {pagini.has(`autori/${k}` as FullSlug) ? (
                  <a class="internal" href={resolveRelative(aici, `autori/${k}` as FullSlug)}>{ls[0].frontmatter?.autor}</a>
                ) : (
                  ls[0].frontmatter?.autor
                )}
              </h3>
              {lista(ls)}
            </section>
          ))}
      </div>
    )
  }

  const ale = semnate.filter((f) => `autori/${f.frontmatter?.autor_slug}` === aici)
  const l = ale.filter((f) => esteLectie(f.slug!))
  const alte = ale.filter((f) => !esteLectie(f.slug!))
  if (ale.length === 0) return null
  return (
    <div>
      {l.length > 0 && (
        <section>
          <h2>Secvențe de lecție</h2>
          {lista(l)}
        </section>
      )}
      {alte.length > 0 && (
        <section>
          <h2>Materiale în ghid</h2>
          {lista(alte)}
        </section>
      )}
    </div>
  )
}

Contributii.css = `
.contributii { padding-left: 1.1rem; }
.contributii li { margin: .35rem 0; }
.contributii-meta { display: block; font-size: .82rem; color: var(--gray); }
`

export default (() => Contributii) satisfies QuartzComponentConstructor
