import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "../types"
import { resolveRelative, FullSlug } from "../../util/path"
import { DIRECTII, DISCIPLINE, esteLectie, disciplinaDin } from "./zone"

// Pagina principală: cele două direcții ca două carduri mari, apoi secvențele de lecție,
// filtrabile pe discipline, apoi acces rapid.
const Acasa: QuartzComponent = ({ fileData, allFiles }: QuartzComponentProps) => {
  const aici = fileData.slug! as FullSlug
  const pagina = (s: string) => allFiles.find((f) => f.slug === s)
  const nrSub = (prefix: string) => allFiles.filter((f) => f.slug?.startsWith(prefix) && !f.slug.endsWith("/index")).length
  const lectii = allFiles
    .filter((f) => esteLectie(f.slug ?? ""))
    .map((f) => ({ f, d: disciplinaDin(f.slug!) }))
  const ordine = Object.keys(DISCIPLINE)
  lectii.sort(
    (a, b) =>
      ordine.indexOf(a.d) - ordine.indexOf(b.d) ||
      String(a.f.frontmatter?.title).localeCompare(String(b.f.frontmatter?.title), "ro"),
  )

  return (
    <div class="acasa">
      {fileData.frontmatter?.description && <p class="acasa-lead">{fileData.frontmatter.description}</p>}
      <section class="acasa-directii" aria-label="Cele două direcții ale ghidului">
        {Object.entries(DIRECTII).map(([k, d]) => {
          const p = pagina(`${k}/index`)
          return (
            <a class="acasa-card internal" href={resolveRelative(aici, `${k}/index` as FullSlug)} style={`--zona:${d.culoare}`}>
              <span class="acasa-card-eticheta">{k === "formare" ? "Pentru dumneavoastră" : "Pentru elevi"}</span>
              <span class="acasa-card-titlu">{p?.frontmatter?.title ?? d.nume}</span>
              <span class="acasa-card-desc">{p?.frontmatter?.description}</span>
              <span class="acasa-card-meta">{nrSub(`${k}/`)} pagini</span>
            </a>
          )
        })}
      </section>

      {lectii.length > 0 && (
        <section class="acasa-retete" aria-labelledby="acasa-proiecte-t">
          <h2 id="acasa-proiecte-t">Secvențe de lecție cu Labdisc</h2>
          <p class="acasa-sub">Scrise de profesori care au folosit Labdisc la clasă. Alegeți disciplina.</p>
          <div class="acasa-filtre" role="group" aria-label="Filtrați după disciplină">
            <button type="button" class="acasa-filtru activ" data-zona="toate">Toate</button>
            {ordine
              .filter((d) => lectii.some((l) => l.d === d))
              .map((d) => (
                <button type="button" class="acasa-filtru" data-zona={d} style={`--zona:${DISCIPLINE[d].culoare}`}>
                  {DISCIPLINE[d].nume}
                </button>
              ))}
          </div>
          <ul class="acasa-lista">
            {lectii.map(({ f, d }) => (
              <li data-zona={d} style={`--zona:${DISCIPLINE[d]?.culoare ?? "#d9480f"}`}>
                <a class="internal" href={resolveRelative(aici, f.slug!)}>
                  <span class="acasa-lista-titlu">{f.frontmatter?.title}</span>
                  <span class="acasa-lista-meta">
                    {[f.frontmatter?.clasa && `cl. ${f.frontmatter.clasa}`, f.frontmatter?.autor].filter(Boolean).join(" · ")}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </section>
      )}

      <section class="acasa-rapid" aria-label="Acces rapid">
        <a class="internal" href={resolveRelative(aici, "autori/index" as FullSlug)}>
          <strong>Autori</strong>
          <span>Cine a scris fiecare material.</span>
        </a>
        <a class="internal" href={resolveRelative(aici, "despre" as FullSlug)}>
          <strong>Despre ghid și licență</strong>
          <span>Ce puteți face cu materialele și cum le citați.</span>
        </a>
      </section>
    </div>
  )
}

Acasa.afterDOMLoaded = `
document.addEventListener("nav", () => {
  const root = document.querySelector(".acasa-retete")
  if (!root) return
  const butoane = root.querySelectorAll(".acasa-filtru")
  const elemente = root.querySelectorAll(".acasa-lista li")
  const alege = (zona) => {
    butoane.forEach((b) => b.classList.toggle("activ", b.dataset.zona === zona))
    elemente.forEach((li) => { li.hidden = !(zona === "toate" || li.dataset.zona === zona) })
  }
  const onClick = (e) => alege(e.currentTarget.dataset.zona)
  butoane.forEach((b) => {
    b.addEventListener("click", onClick)
    window.addCleanup(() => b.removeEventListener("click", onClick))
  })
})
`

Acasa.css = `
.acasa h2 { margin-top: 2.2rem; }
.acasa-lead { font-size: 1.2rem; line-height: 1.5; color: var(--darkgray); margin-top: .2rem; max-width: 40rem; }
.acasa-directii { display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 1rem; margin-top: 1.4rem; }
.acasa a.acasa-card { line-height: 1.4; display: flex; flex-direction: column; gap: .45rem; padding: 1.1rem 1.2rem; border-radius: 14px;
  border: 1px solid var(--lightgray); border-top: 6px solid var(--zona); background: var(--light);
  color: var(--darkgray) !important; font-weight: 400 !important; text-decoration: none; transition: transform .15s, box-shadow .15s; }
.acasa a.acasa-card:hover { transform: translateY(-2px); box-shadow: 0 6px 18px rgba(21,34,39,.10); }
.acasa-card-eticheta { font-size: .74rem; font-weight: 700; letter-spacing: .06em; text-transform: uppercase; color: var(--zona); }
.acasa-card-titlu { font-family: var(--headerFont); font-weight: 800; font-size: 1.35rem; color: var(--dark); line-height: 1.2; }
.acasa-card-desc { font-size: .95rem; line-height: 1.45; flex: 1; }
.acasa-card-meta { font-size: .8rem; font-weight: 600; color: var(--zona); }
.acasa-sub { margin-top: -.4rem; }
.acasa-filtre { display: flex; flex-wrap: wrap; gap: .45rem; margin: .8rem 0 1rem; }
.acasa-filtru { font-family: var(--bodyFont); font-size: .88rem; padding: .45rem .85rem; border-radius: 999px; cursor: pointer;
  border: 1.5px solid var(--zona, var(--darkgray)); background: transparent; color: var(--dark); min-height: 40px; }
.acasa-filtru.activ { background: var(--zona, var(--dark)); color: #fff; }
.acasa-filtru[data-zona="toate"].activ { background: var(--dark); color: var(--light); }
.acasa-lista { list-style: none; padding: 0; margin: 0; display: grid; grid-template-columns: minmax(0, 1fr); gap: .5rem; }
.acasa-lista li { margin: 0; }
.acasa-lista li[hidden] { display: none; }
.acasa .acasa-lista a { line-height: 1.4; font-weight: 400; display: flex; justify-content: space-between; gap: 1rem; align-items: baseline; padding: .7rem .9rem;
  border-radius: 10px; border-left: 4px solid var(--zona); background: var(--highlight); color: var(--dark) !important; text-decoration: none; }
.acasa .acasa-lista a:hover { background: var(--lightgray); }
.acasa-lista-titlu { font-weight: 600; }
.acasa-lista-meta { font-size: .8rem; color: var(--gray); white-space: nowrap; }
.acasa-rapid { display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: .8rem; margin-top: 2.2rem; }
.acasa .acasa-rapid a { line-height: 1.4; display: flex; flex-direction: column; gap: .25rem; padding: .9rem 1rem; border-radius: 12px; text-decoration: none;
  background: linear-gradient(135deg, rgba(11,114,133,.10), rgba(217,72,15,.08)); color: var(--darkgray) !important; font-weight: 400 !important; }
.acasa-rapid strong { color: var(--dark); font-family: var(--headerFont); font-size: 1.05rem; }
.acasa-rapid span { font-size: .88rem; }
@media all and (max-width: 800px) {
  .acasa .acasa-lista a { flex-direction: column; gap: .15rem; }
  .acasa-lista-meta { white-space: normal; }
}
`

export default (() => Acasa) satisfies QuartzComponentConstructor
