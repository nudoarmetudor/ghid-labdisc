import { PageLayout, SharedLayout } from "./quartz/cfg"
import * as Component from "./quartz/components"

// Ordinea din meniu: cele două direcții, apoi autorii și pagina despre ghid; în interior,
// după numărul din față sau alfabetic. Funcția e trimisă ca text în browser, deci rămâne
// fără referințe din afara ei.
const sortare = (a: any, b: any) => {
  const rang: Record<string, number> = {
    formare: 1, "la-clasa": 2, autori: 3, despre: 4,
    rezultate: 10, labdisc: 11, modele: 12, demonstratii: 13, autoevaluare: 14, reflectie: 15,
    metodologie: 20, implementare: 21, proiecte: 22, anexe: 23,
    fizica: 30, chimie: 31, biologie: 32, geografie: 33, "clase-primare": 34,
  }
  const ra = rang[a.slugSegment] ?? 50
  const rb = rang[b.slugSegment] ?? 50
  if (ra !== rb) return ra - rb
  return a.displayName.localeCompare(b.displayName, "ro", { numeric: true, sensitivity: "base" })
}

export const sharedPageComponents: SharedLayout = {
  head: Component.Head(),
  header: [],
  afterBody: [Component.Contributii()],
  footer: Component.Subsol(),
}

const stanga = [
  Component.Brand(),
  Component.MobileOnly(Component.Spacer()),
  Component.Flex({
    components: [
      { Component: Component.Search(), grow: true },
      { Component: Component.Darkmode() },
    ],
  }),
  Component.Explorer({ title: "Ghidul", folderDefaultState: "collapsed", sortFn: sortare }),
]

export const defaultContentPageLayout: PageLayout = {
  beforeBody: [
    Component.ConditionalRender({
      component: Component.Breadcrumbs({ rootName: "Acasă" }),
      condition: (page) => page.fileData.slug !== "index",
    }),
    Component.ArticleTitle(),
    Component.Fisa(),
    Component.ConditionalRender({
      component: Component.Acasa(),
      condition: (page) => page.fileData.slug === "index",
    }),
  ],
  left: stanga,
  right: [
    Component.DesktopOnly(Component.TableOfContents()),
    Component.Backlinks(),
  ],
}

export const defaultListPageLayout: PageLayout = {
  beforeBody: [Component.Breadcrumbs({ rootName: "Acasă" }), Component.ArticleTitle()],
  left: stanga,
  right: [],
}
