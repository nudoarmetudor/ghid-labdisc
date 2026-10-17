import { QuartzTransformerPlugin } from "../types"
import { visit } from "unist-util-visit"

// Piesele interactive ale ghidului se scriu în markdown ca blocuri de cod cu un nume:
// ```quiz, ```cartonase, ```ordine, ```grafic, ```durata, ```simulare, ```lori.
// Pluginul le transformă într-un <div class="interactiv"> cu textul blocului păstrat
// într-un <pre> (care rămâne vizibil fără JavaScript și la tipărire); scriptul din
// components/ghid/Interactiv.tsx le construiește în pagină. Formatul fiecărei piese e
// descris în README, „Piese interactive”.
export const TIPURI = new Set(["quiz", "cartonase", "ordine", "grafic", "durata", "simulare", "lori"])

const scapa = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;")

export const Interactiv: QuartzTransformerPlugin = () => ({
  name: "Interactiv",
  markdownPlugins() {
    return [
      () => (tree: any) => {
        visit(tree, "code", (node: any, index: number | undefined, parent: any) => {
          if (!parent || index === undefined || !node.lang || !TIPURI.has(node.lang)) return
          parent.children[index] = {
            type: "html",
            value: `<div class="interactiv interactiv-${node.lang}" data-tip="${node.lang}"><pre class="interactiv-sursa">${scapa(node.value)}</pre></div>`,
          }
        })
      },
    ]
  },
})
