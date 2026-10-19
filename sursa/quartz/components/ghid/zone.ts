// Cele două direcții ale ghidului și disciplinele proiectelor, în culorile semnului Future
// Classroom Lab (identitatea FCL). `culoare` e pentru benzi și chenare; `text` e varianta care
// trece de contrastul AA pe alb, pentru etichete scrise.
export const DIRECTII: Record<string, { nume: string; culoare: string; text: string }> = {
  formare: { nume: "Formare", culoare: "#00bce4", text: "#0878be" },
  "la-clasa": { nume: "La clasă", culoare: "#f15c22", text: "#c2410c" },
}

export const DISCIPLINE: Record<string, { nume: string; culoare: string; text: string }> = {
  fizica: { nume: "Fizică", culoare: "#00bce4", text: "#0878be" },
  chimie: { nume: "Chimie", culoare: "#e60e64", text: "#b0094f" },
  biologie: { nume: "Biologie", culoare: "#c1d72e", text: "#5f6b0f" },
  geografie: { nume: "Geografie", culoare: "#f15c22", text: "#c2410c" },
  "clase-primare": { nume: "Științe, clase primare", culoare: "#514e86", text: "#514e86" },
}

export const directiaDin = (slug: string) => DIRECTII[slug.split("/")[0]]

// la-clasa/proiecte/<disciplina>/<lecție>
export function esteLectie(slug: string): boolean {
  const p = slug.split("/")
  return p.length === 4 && p[0] === "la-clasa" && p[1] === "proiecte" && p[3] !== "index"
}
export const disciplinaDin = (slug: string) => slug.split("/")[2]
