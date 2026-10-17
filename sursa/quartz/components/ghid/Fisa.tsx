import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "../types"
import { resolveRelative, FullSlug } from "../../util/path"
import { DIRECTII, DISCIPLINE, directiaDin, esteLectie, disciplinaDin } from "./zone"

// Caseta de sub titlu. Pe o secvență de lecție: autorul (cu legătură la pagina lui),
// disciplina, clasa, modulul, echipamentul și licența. Pe celelalte pagini: banda direcției.
const Fisa: QuartzComponent = ({ fileData }: QuartzComponentProps) => {
  const fm = (fileData.frontmatter ?? {}) as Record<string, any>
  const slug = (fileData.slug ?? "") as FullSlug

  if (esteLectie(slug)) {
    const d = DISCIPLINE[disciplinaDin(slug)]
    const culoare = d?.culoare ?? DIRECTII["la-clasa"].culoare
    const text = d?.text ?? DIRECTII["la-clasa"].text
    const echip = Array.isArray(fm.echipament) ? fm.echipament.join(", ") : fm.echipament
    const rand = (k: string, v: unknown) =>
      v ? (
        <div class="fisa-rand">
          <dt>{k}</dt>
          <dd>{String(v)}</dd>
        </div>
      ) : null
    return (
      <aside class="fisa" style={`--zona:${culoare};--zona-text:${text}`}>
        {d && <span class="fisa-zona">{d.nume}</span>}
        <dl>
          <div class="fisa-rand">
            <dt>Autor</dt>
            <dd>
              {fm.autor_slug ? (
                <a class="internal" href={resolveRelative(slug, `autori/${fm.autor_slug}` as FullSlug)}>
                  {fm.autor}
                </a>
              ) : (
                fm.autor
              )}
            </dd>
          </div>
          {rand("Clasa", fm.clasa)}
          {rand("Modulul", fm.modul)}
          {rand("Echipament", echip)}
          {rand("Licență", fm.licenta)}
        </dl>
      </aside>
    )
  }

  const dir = directiaDin(slug)
  if (fm.autor && fm.autor_slug) {
    return (
      <p class="fisa-autor" style={`--zona:${dir?.culoare ?? "var(--secondary)"}`}>
        {fm.autor_rol ?? "Autor"}:{" "}
        <a class="internal" href={resolveRelative(slug, `autori/${fm.autor_slug}` as FullSlug)}>{fm.autor}</a>
      </p>
    )
  }
  if (dir && slug !== "index") {
    return <div class="fisa-banda" style={`--zona:${dir.culoare}`} aria-hidden="true" />
  }
  return null
}

Fisa.css = `
.fisa { margin: 1rem 0 1.5rem; padding: .9rem 1.1rem; border-radius: 12px; border: 1px solid var(--lightgray);
  border-left: 5px solid var(--zona); background: var(--highlight); }
.fisa-zona { display: inline-block; font-size: .75rem; font-weight: 700; letter-spacing: .06em; text-transform: uppercase;
  color: var(--zona-text, var(--zona)); margin-bottom: .4rem; }
.fisa dl { margin: 0; display: grid; gap: .3rem; }
.fisa-rand { display: grid; grid-template-columns: 8rem 1fr; gap: .6rem; }
.fisa dt { font-weight: 600; color: var(--dark); }
.fisa dd { margin: 0; }
.fisa-autor { margin: .2rem 0 1.2rem; padding-left: .7rem; border-left: 4px solid var(--zona); font-size: .92rem; color: var(--darkgray); }
.fisa-banda { height: 6px; border-radius: 3px; background: var(--zona); margin: .4rem 0 1.2rem; max-width: 120px; }
@media all and (max-width: 800px) { .fisa-rand { grid-template-columns: 1fr; gap: 0; } .fisa-rand + .fisa-rand { margin-top: .35rem; } }
`

export default (() => Fisa) satisfies QuartzComponentConstructor
