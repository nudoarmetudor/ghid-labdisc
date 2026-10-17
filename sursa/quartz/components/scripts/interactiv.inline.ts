// Construiește piesele interactive ale ghidului din blocurile marcate de pluginul
// transformers/interactiv.ts. Fiecare piesă citește textul din <pre class="interactiv-sursa">,
// îl ascunde și desenează în locul lui. Fără JavaScript, textul rămâne lizibil.
// Ce bifează sau răspunde cititorul rămâne doar în browserul lui (localStorage).

type Construieste = (rad: HTMLElement, sursa: string, id: string) => void

const el = <K extends keyof HTMLElementTagNameMap>(
  tag: K,
  cls?: string,
  text?: string,
): HTMLElementTagNameMap[K] => {
  const e = document.createElement(tag)
  if (cls) e.className = cls
  if (text !== undefined) e.textContent = text
  return e
}

const pastreaza = {
  citeste(k: string): string | null {
    try {
      return localStorage.getItem(k)
    } catch {
      return null
    }
  },
  scrie(k: string, v: string) {
    try {
      localStorage.setItem(k, v)
    } catch {
      /* fără stocare: piesa merge oricum */
    }
  },
}

// amestecă determinist, ca ordinea să nu se schimbe la fiecare deschidere
function amesteca<T>(arr: T[], seed: number): T[] {
  const a = [...arr]
  let s = seed || 1
  for (let i = a.length - 1; i > 0; i--) {
    s = (s * 9301 + 49297) % 233280
    const j = Math.floor((s / 233280) * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}
const hash = (s: string) => [...s].reduce((h, c) => (h * 31 + c.charCodeAt(0)) >>> 0, 7)

// cheie: valoare, pe linii; ce urmează după „date:” sau o linie goală e corpul
function antet(sursa: string): { meta: Record<string, string>; corp: string[] } {
  const meta: Record<string, string> = {}
  const linii = sursa.split("\n")
  let i = 0
  for (; i < linii.length; i++) {
    const m = linii[i].match(/^([a-zăâîșț_]+):\s*(.*)$/i)
    if (!m) break
    if (m[1].toLowerCase() === "date") {
      i++
      break
    }
    meta[m[1].toLowerCase()] = m[2].trim()
  }
  return { meta, corp: linii.slice(i).filter((l) => l.trim() !== "") }
}

// ---------- quiz ----------
// ? întrebare / + răspuns corect | feedback / - răspuns greșit | feedback; întrebări despărțite de o linie goală
const quiz: Construieste = (rad, sursa) => {
  const blocuri = sursa.split(/\n\s*\n/).map((b) => b.trim()).filter(Boolean)
  let corecte = 0
  let raspunse = 0
  const scor = el("p", "quiz-scor")
  const intrebari = blocuri.map((b, qi) => {
    const linii = b.split("\n").map((l) => l.trim())
    const text = linii.filter((l) => l.startsWith("?")).map((l) => l.slice(1).trim()).join(" ")
    const variante = linii
      .filter((l) => l.startsWith("+") || l.startsWith("-"))
      .map((l) => {
        const [t, f] = l.slice(1).split("|")
        return { corect: l.startsWith("+"), text: t.trim(), feedback: (f ?? "").trim() }
      })
    const q = el("fieldset", "quiz-intrebare")
    const leg = el("legend", undefined, `${blocuri.length > 1 ? qi + 1 + ". " : ""}${text}`)
    q.appendChild(leg)
    const fb = el("p", "quiz-feedback")
    fb.setAttribute("aria-live", "polite")
    const butoane: HTMLButtonElement[] = []
    variante.forEach((v) => {
      const b = el("button", "quiz-varianta", v.text)
      b.type = "button"
      b.addEventListener("click", () => {
        if (q.dataset.raspuns) return
        q.dataset.raspuns = "1"
        raspunse++
        if (v.corect) corecte++
        butoane.forEach((x, k) => {
          x.disabled = true
          if (variante[k].corect) x.classList.add("corect")
        })
        if (!v.corect) b.classList.add("gresit")
        fb.textContent = (v.corect ? "Corect. " : "Nu chiar. ") + (v.feedback || (v.corect ? "" : "Răspunsul corect e marcat."))
        fb.className = "quiz-feedback " + (v.corect ? "bine" : "rau")
        if (raspunse === blocuri.length && blocuri.length > 1)
          scor.textContent = `Ați răspuns corect la ${corecte} din ${blocuri.length}.`
      })
      butoane.push(b)
      q.appendChild(b)
    })
    q.appendChild(fb)
    return q
  })
  const cap = el("p", "interactiv-eticheta", "Verificați-vă")
  rad.append(cap, ...intrebari, scor)
  const reia = el("button", "interactiv-buton secundar", "Încă o dată")
  reia.type = "button"
  reia.addEventListener("click", () => {
    rad.querySelectorAll(":scope > :not(pre)").forEach((n) => n.remove())
    quiz(rad, sursa, "")
  })
  rad.appendChild(reia)
}

// ---------- cartonase ----------
// Termen :: explicație
const cartonase: Construieste = (rad, sursa) => {
  const cap = el("p", "interactiv-eticheta", "Cartonașe: atingeți ca să întoarceți")
  const grila = el("div", "cartonase-grila")
  sursa
    .split("\n")
    .filter((l) => l.includes("::"))
    .forEach((l) => {
      const [fata, spate] = l.split("::").map((s) => s.trim())
      const c = el("button", "cartonas")
      c.type = "button"
      c.setAttribute("aria-pressed", "false")
      const f = el("span", "cartonas-fata", fata)
      const s = el("span", "cartonas-spate", spate)
      c.append(f, s)
      c.addEventListener("click", () => {
        const intors = c.classList.toggle("intors")
        c.setAttribute("aria-pressed", String(intors))
      })
      grila.appendChild(c)
    })
  rad.append(cap, grila)
}

// ---------- ordine ----------
// titlu: ... (opțional), apoi pașii în ordinea corectă, câte unul pe linie
const ordine: Construieste = (rad, sursa) => {
  const { meta, corp } = antet(sursa)
  const corect = corp.map((l) => l.replace(/^\d+[.)]\s*/, "").trim())
  let curent = amesteca(corect, hash(sursa))
  if (curent.join() === corect.join()) curent = [...corect].reverse()
  const cap = el("p", "interactiv-eticheta", meta.titlu ?? "Puneți pașii în ordine")
  const lista = el("ol", "ordine-lista")
  const fb = el("p", "quiz-feedback")
  fb.setAttribute("aria-live", "polite")
  const deseneaza = () => {
    lista.innerHTML = ""
    curent.forEach((t, i) => {
      const li = el("li", "ordine-pas")
      const txt = el("span", "ordine-text", t)
      const sus = el("button", "ordine-mut", "↑")
      sus.type = "button"
      sus.setAttribute("aria-label", `Mută mai sus: ${t}`)
      sus.disabled = i === 0
      sus.addEventListener("click", () => {
        ;[curent[i - 1], curent[i]] = [curent[i], curent[i - 1]]
        fb.textContent = ""
        deseneaza()
      })
      const jos = el("button", "ordine-mut", "↓")
      jos.type = "button"
      jos.setAttribute("aria-label", `Mută mai jos: ${t}`)
      jos.disabled = i === curent.length - 1
      jos.addEventListener("click", () => {
        ;[curent[i + 1], curent[i]] = [curent[i], curent[i + 1]]
        fb.textContent = ""
        deseneaza()
      })
      li.append(txt, sus, jos)
      lista.appendChild(li)
    })
  }
  deseneaza()
  const verifica = el("button", "interactiv-buton", "Verifică ordinea")
  verifica.type = "button"
  verifica.addEventListener("click", () => {
    const bune = curent.filter((t, i) => t === corect[i]).length
    lista.querySelectorAll("li").forEach((li, i) => {
      li.classList.toggle("corect", curent[i] === corect[i])
      li.classList.toggle("gresit", curent[i] !== corect[i])
    })
    fb.className = "quiz-feedback " + (bune === corect.length ? "bine" : "rau")
    fb.textContent =
      bune === corect.length
        ? "Corect, asta e ordinea."
        : `${bune} din ${corect.length} pași sunt la locul lor. Cei marcați cu roșu trebuie mutați.`
  })
  rad.append(cap, lista, verifica, fb)
}

// ---------- durata ----------
// calculatorul înregistrării: rata de eșantionare × numărul de eșantioane = durata
const durata: Construieste = (rad) => {
  const cap = el("p", "interactiv-eticheta", "Calculator: cât durează înregistrarea?")
  const f = el("div", "durata-forma")
  const rata = el("input", "durata-in") as HTMLInputElement
  rata.type = "number"
  rata.min = "0"
  rata.step = "any"
  rata.value = "10"
  const unit = el("select", "durata-in") as HTMLSelectElement
  ;[
    ["1", "pe secundă"],
    ["0.0166667", "pe minut"],
    ["0.000277778", "pe oră"],
  ].forEach(([v, t]) => {
    const o = el("option", undefined, t)
    o.value = v
    unit.appendChild(o)
  })
  const nr = el("input", "durata-in") as HTMLInputElement
  nr.type = "number"
  nr.min = "1"
  nr.step = "1"
  nr.value = "1000"
  const eticheta = (t: string, ...c: HTMLElement[]) => {
    const l = el("label", "durata-camp")
    l.append(el("span", undefined, t), ...c)
    return l
  }
  const rez = el("p", "durata-rezultat")
  rez.setAttribute("aria-live", "polite")
  const formateaza = (s: number) => {
    if (!isFinite(s) || s <= 0) return "—"
    const h = Math.floor(s / 3600)
    const m = Math.floor((s % 3600) / 60)
    const sec = Math.round((s % 60) * 10) / 10
    return [h && `${h} h`, m && `${m} min`, (sec || (!h && !m)) && `${sec} s`].filter(Boolean).join(" ")
  }
  const calc = () => {
    const r = parseFloat(rata.value) * parseFloat(unit.value)
    const n = parseFloat(nr.value)
    rez.textContent = `Durata: ${formateaza(n / r)}`
  }
  ;[rata, unit, nr].forEach((x) => x.addEventListener("input", calc))
  f.append(eticheta("Rata de eșantionare", rata, unit), eticheta("Numărul de eșantioane", nr))
  calc()
  const nota = el(
    "p",
    "interactiv-nota",
    "Durata = numărul de eșantioane ÷ rata. Valorile posibile depind de modelul de Labdisc și de senzor; verificați-le în „Configurare”.",
  )
  rad.append(cap, f, rez, nota)
}

// ---------- grafic ----------
// titlu, x, y, prezicere: da, nota; apoi „date:” și perechi x, y pe linii
const SVGNS = "http://www.w3.org/2000/svg"
const svg = (tag: string, attrs: Record<string, string | number>) => {
  const e = document.createElementNS(SVGNS, tag)
  for (const [k, v] of Object.entries(attrs)) e.setAttribute(k, String(v))
  return e
}
const grafic: Construieste = (rad, sursa, id) => {
  const { meta, corp } = antet(sursa)
  const pct = corp
    .map((l) => l.split(/[,;\t]/).map((v) => parseFloat(v.replace(/\s/g, ""))))
    .filter((p) => p.length >= 2 && !isNaN(p[0]) && !isNaN(p[1]))
  if (pct.length < 2) return
  const W = 480,
    H = 300,
    ml = 50,
    mr = 12,
    mt = 12,
    mb = 46
  const xs = pct.map((p) => p[0]),
    ys = pct.map((p) => p[1])
  const x0 = Math.min(...xs),
    x1 = Math.max(...xs)
  const pad = (Math.max(...ys) - Math.min(...ys)) * 0.1 || 1
  const y0 = Math.floor(Math.min(...ys) - pad),
    y1 = Math.ceil(Math.max(...ys) + pad)
  const X = (v: number) => ml + ((v - x0) / (x1 - x0)) * (W - ml - mr)
  const Y = (v: number) => mt + (1 - (v - y0) / (y1 - y0)) * (H - mt - mb)
  const invX = (px: number) => x0 + ((px - ml) / (W - ml - mr)) * (x1 - x0)
  const invY = (py: number) => y0 + (1 - (py - mt) / (H - mt - mb)) * (y1 - y0)
  const nice = (a: number, b: number) => {
    const span = b - a
    const step = Math.pow(10, Math.floor(Math.log10(span / 5)))
    const st = [1, 2, 5, 10].map((m) => m * step).find((s) => span / s <= 6) ?? step * 10
    const out = []
    for (let v = Math.ceil(a / st) * st; v <= b + 1e-9; v += st) out.push(Math.round(v * 1e6) / 1e6)
    return out
  }

  const cap = el("p", "interactiv-eticheta", meta.titlu ?? "Grafic")
  const s = svg("svg", { viewBox: `0 0 ${W} ${H}`, class: "grafic-svg", role: "img" })
  s.setAttribute("aria-label", `${meta.titlu ?? "Grafic"}: ${meta.y ?? "y"} în funcție de ${meta.x ?? "x"}`)
  nice(y0, y1).forEach((v) => {
    s.appendChild(svg("line", { x1: ml, x2: W - mr, y1: Y(v), y2: Y(v), class: "grafic-grila" }))
    const t = svg("text", { x: ml - 8, y: Y(v) + 4, class: "grafic-tick", "text-anchor": "end" })
    t.textContent = String(v)
    s.appendChild(t)
  })
  nice(x0, x1).forEach((v) => {
    const t = svg("text", { x: X(v), y: H - mb + 18, class: "grafic-tick", "text-anchor": "middle" })
    t.textContent = String(v)
    s.appendChild(t)
  })
  s.appendChild(svg("line", { x1: ml, x2: W - mr, y1: H - mb, y2: H - mb, class: "grafic-axa" }))
  s.appendChild(svg("line", { x1: ml, x2: ml, y1: mt, y2: H - mb, class: "grafic-axa" }))
  const tx = svg("text", { x: (ml + W - mr) / 2, y: H - 8, class: "grafic-titlu-axa", "text-anchor": "middle" })
  tx.textContent = meta.x ?? ""
  const ty = svg("text", { x: 13, y: (mt + H - mb) / 2, class: "grafic-titlu-axa", "text-anchor": "middle", transform: `rotate(-90 13 ${(mt + H - mb) / 2})` })
  ty.textContent = meta.y ?? ""
  s.append(tx, ty)

  const real = svg("polyline", {
    points: pct.map((p) => `${X(p[0])},${Y(p[1])}`).join(" "),
    class: "grafic-real",
  })
  const prez = svg("polyline", { points: "", class: "grafic-prezis" })
  const marker = svg("g", { class: "grafic-marker" })
  const mLine = svg("line", { y1: mt, y2: H - mb, class: "grafic-marker-linie" })
  const mDot = svg("circle", { r: 5, class: "grafic-marker-punct" })
  marker.append(mLine, mDot)
  s.append(prez, real, marker)

  const fb = el("p", "grafic-valoare")
  fb.setAttribute("aria-live", "polite")
  const slider = el("input", "grafic-slider") as HTMLInputElement
  slider.type = "range"
  slider.min = "0"
  slider.max = String(pct.length - 1)
  slider.value = "0"
  slider.setAttribute("aria-label", "Mutați cursorul de-a lungul datelor")
  const arataMarker = () => {
    const p = pct[parseInt(slider.value)]
    mLine.setAttribute("x1", String(X(p[0])))
    mLine.setAttribute("x2", String(X(p[0])))
    mDot.setAttribute("cx", String(X(p[0])))
    mDot.setAttribute("cy", String(Y(p[1])))
    fb.textContent = `${meta.x ?? "x"}: ${p[0]} · ${meta.y ?? "y"}: ${p[1]}`
  }
  slider.addEventListener("input", arataMarker)

  const prezicere = (meta.prezicere ?? "").toLowerCase().startsWith("d")
  const cheie = `grafic-${id}`
  let puncte: [number, number][] = []
  const deseneazaPrez = () => {
    puncte.sort((a, b) => a[0] - b[0])
    prez.setAttribute("points", puncte.map((p) => `${X(p[0])},${Y(p[1])}`).join(" "))
  }
  const butoane = el("div", "grafic-butoane")
  const instr = el("p", "interactiv-nota")
  const ascunde = (da: boolean) => {
    real.style.display = da ? "none" : ""
    marker.style.display = da ? "none" : ""
    slider.style.display = da ? "none" : ""
    fb.style.display = da ? "none" : ""
  }
  if (prezicere) {
    const salvat = pastreaza.citeste(cheie)
    if (salvat) {
      try {
        puncte = JSON.parse(salvat)
      } catch {
        puncte = []
      }
    }
    deseneazaPrez()
    ascunde(true)
    instr.textContent = "Prezicere: atingeți graficul ca să desenați curba pe care o așteptați, apoi apăsați „Arată datele”."
    s.addEventListener("click", (e) => {
      if (real.style.display !== "none") return
      const r = s.getBoundingClientRect()
      const px = ((e.clientX - r.left) / r.width) * W
      const py = ((e.clientY - r.top) / r.height) * H
      if (px < ml || px > W - mr || py < mt || py > H - mb) return
      puncte.push([invX(px), invY(py)])
      deseneazaPrez()
      pastreaza.scrie(cheie, JSON.stringify(puncte))
    })
    const arata = el("button", "interactiv-buton", "Arată datele")
    arata.type = "button"
    arata.addEventListener("click", () => {
      ascunde(false)
      arata.style.display = "none"
      arataMarker()
      instr.textContent = "Comparați curba voastră (punctată) cu datele. Unde diferă și de ce?"
    })
    const sterge = el("button", "interactiv-buton secundar", "Prezic din nou")
    sterge.type = "button"
    sterge.addEventListener("click", () => {
      puncte = []
      deseneazaPrez()
      pastreaza.scrie(cheie, "[]")
      ascunde(true)
      arata.style.display = ""
      instr.textContent = "Atingeți graficul ca să desenați curba pe care o așteptați, apoi apăsați „Arată datele”."
    })
    butoane.append(arata, sterge)
  } else {
    arataMarker()
  }
  const elemente: HTMLElement[] = [cap]
  if (prezicere) elemente.push(instr)
  const cadru = el("div", "grafic-cadru")
  cadru.appendChild(s)
  elemente.push(cadru, slider, fb, butoane)
  if (meta.nota) elemente.push(el("p", "interactiv-nota", meta.nota))
  rad.append(...elemente)
}

// ---------- simulare ----------
// url, titlu, sursa; se încarcă doar la cerere, ca pagina să nu contacteze alt site fără acord
const simulare: Construieste = (rad, sursa) => {
  const { meta } = antet(sursa)
  if (!meta.url || !/^https:\/\//.test(meta.url)) return
  const cap = el("p", "interactiv-eticheta", meta.titlu ?? "Simulare")
  const cadru = el("div", "simulare-cadru")
  const porneste = el("button", "interactiv-buton", "Pornește simularea")
  porneste.type = "button"
  const gazda = new URL(meta.url).host
  const info = el("p", "interactiv-nota", `Se încarcă de pe ${gazda}. ${meta.sursa ?? ""}`)
  porneste.addEventListener("click", () => {
    const f = el("iframe") as HTMLIFrameElement
    f.src = meta.url
    f.title = meta.titlu ?? "Simulare"
    f.loading = "lazy"
    f.allow = "fullscreen"
    f.setAttribute("allowfullscreen", "")
    cadru.innerHTML = ""
    cadru.appendChild(f)
  })
  cadru.appendChild(porneste)
  const link = el("a", "simulare-link", "Deschideți simularea într-o fereastră nouă ↗") as HTMLAnchorElement
  link.href = meta.url
  link.target = "_blank"
  link.rel = "noopener"
  rad.append(cap, cadru, link, info)
}

// ---------- lori ----------
// Nume :: descriere, pe linii. Fiecare criteriu se notează 1-5 sau „nu se aplică”.
const lori: Construieste = (rad, sursa, id) => {
  const crit = sursa
    .split("\n")
    .filter((l) => l.includes("::"))
    .map((l) => l.split("::").map((s) => s.trim()))
  const cheie = `lori-${id}`
  let note: Record<string, number> = {}
  try {
    note = JSON.parse(pastreaza.citeste(cheie) ?? "{}")
  } catch {
    note = {}
  }
  const cap = el("p", "interactiv-eticheta", "Evaluați o resursă: notați fiecare criteriu de la 1 la 5")
  const total = el("p", "lori-total")
  total.setAttribute("aria-live", "polite")
  const actualizeaza = () => {
    const v = Object.values(note).filter((n) => n > 0)
    total.textContent = v.length
      ? `Media: ${(v.reduce((a, b) => a + b, 0) / v.length).toFixed(1)} din 5, pe ${v.length} criterii notate. Criteriile cu 1-2 sunt primele de îmbunătățit.`
      : "Notați criteriile ca să vedeți media."
    pastreaza.scrie(cheie, JSON.stringify(note))
  }
  const lista = el("div", "lori-lista")
  crit.forEach(([nume, desc], ci) => {
    const fs = el("fieldset", "lori-criteriu")
    fs.appendChild(el("legend", undefined, `${ci + 1}. ${nume}`))
    fs.appendChild(el("p", "lori-desc", desc))
    const r = el("div", "lori-note")
    ;["n/a", "1", "2", "3", "4", "5"].forEach((v) => {
      const b = el("button", "lori-nota", v === "n/a" ? "nu se aplică" : v)
      b.type = "button"
      const val = v === "n/a" ? 0 : parseInt(v)
      if (note[nume] === val && nume in note) b.classList.add("ales")
      b.addEventListener("click", () => {
        note[nume] = val
        r.querySelectorAll("button").forEach((x) => x.classList.remove("ales"))
        b.classList.add("ales")
        actualizeaza()
      })
      r.appendChild(b)
    })
    fs.appendChild(r)
    lista.appendChild(fs)
  })
  const sterge = el("button", "interactiv-buton secundar", "Începe o evaluare nouă")
  sterge.type = "button"
  sterge.addEventListener("click", () => {
    note = {}
    lista.querySelectorAll(".ales").forEach((x) => x.classList.remove("ales"))
    actualizeaza()
  })
  actualizeaza()
  rad.append(cap, lista, total, sterge)
}

const PIESE: Record<string, Construieste> = { quiz, cartonase, ordine, durata, grafic, simulare, lori }

document.addEventListener("nav", () => {
  const pagina = window.location.pathname
  document.querySelectorAll<HTMLElement>(".interactiv:not([data-gata])").forEach((rad, i) => {
    const tip = rad.dataset.tip ?? ""
    const pre = rad.querySelector<HTMLElement>(":scope > pre.interactiv-sursa")
    const f = PIESE[tip]
    if (!f || !pre) return
    rad.dataset.gata = "1"
    pre.hidden = true
    try {
      f(rad, pre.textContent ?? "", `${pagina}-${i}`)
    } catch (e) {
      pre.hidden = false
      console.error("Piesa interactivă nu a putut fi construită", tip, e)
    }
  })
})
