import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "../types"
import { resolveRelative, FullSlug } from "../../util/path"
import { DISCIPLINE, esteLectie, disciplinaDin } from "./zone"

// Pe pagina unui autor (autori/<slug>): secvențele de lecție semnate de el, din câmpul
// `autor_slug` al fiecărei lecții. Pe autori/index: toți autorii, fiecare cu lecțiile lui.
// Așa creditarea pe componentă se ține singură: o lecție nouă apare la autorul ei.
const Contributii: QuartzComponent = ({ fileData, allFiles }: QuartzComponentProps) => {
  const aici = fileData.slug! as FullSlug
  if (!aici.startsWith("autori/")) return null
  const lectii = allFiles
    .filter((f) => esteLectie(f.slug ?? "") && f.frontmatter?.autor_slug)
    .sort((a, b) => String(a.frontmatter?.title).localeCompare(String(b.frontmatter?.title), "ro"))
  const lista = (ls: typeof lectii) => (
    <ul class="contributii">
      {ls.map((f) => (
        <li>
          <a class="internal" href={resolveRelative(aici, f.slug!)}>{f.frontmatter?.title}</a>
          <span class="contributii-meta">
            {[DISCIPLINE[disciplinaDin(f.slug!)]?.nume, f.frontmatter?.clasa && `clasa a ${f.frontmatter.clasa}-a`]
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
        {[...autori.entries()]
          .sort((a, b) => String(a[1][0].frontmatter?.autor).localeCompare(String(b[1][0].frontmatter?.autor), "ro"))
          .map(([k, ls]) => (
            <section>
              <h2>
                {pagini.has(`autori/${k}` as FullSlug) ? (
                  <a class="internal" href={resolveRelative(aici, `autori/${k}` as FullSlug)}>{ls[0].frontmatter?.autor}</a>
                ) : (
                  ls[0].frontmatter?.autor
                )}
              </h2>
              {lista(ls)}
            </section>
          ))}
      </div>
    )
  }

  const ale = lectii.filter((f) => `autori/${f.frontmatter?.autor_slug}` === aici)
  if (ale.length === 0) return null
  return (
    <section>
      <h2>Secvențe de lecție</h2>
      {lista(ale)}
    </section>
  )
}

Contributii.css = `
.contributii { padding-left: 1.1rem; }
.contributii li { margin: .35rem 0; }
.contributii-meta { display: block; font-size: .82rem; color: var(--gray); }
`

export default (() => Contributii) satisfies QuartzComponentConstructor
