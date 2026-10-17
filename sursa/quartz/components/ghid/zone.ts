// Cele două direcții ale ghidului și disciplinele proiectelor, cu culorile lor.
export const DIRECTII: Record<string, { nume: string; culoare: string }> = {
  formare: { nume: "Formare", culoare: "#0b7285" },
  "la-clasa": { nume: "La clasă", culoare: "#d9480f" },
}

export const DISCIPLINE: Record<string, { nume: string; culoare: string }> = {
  fizica: { nume: "Fizică", culoare: "#1c7ed6" },
  chimie: { nume: "Chimie", culoare: "#ae3ec9" },
  biologie: { nume: "Biologie", culoare: "#2f9e44" },
  geografie: { nume: "Geografie", culoare: "#e8590c" },
  "clase-primare": { nume: "Științe, clase primare", culoare: "#f08c00" },
}

export const directiaDin = (slug: string) => DIRECTII[slug.split("/")[0]]

// la-clasa/proiecte/<disciplina>/<lecție>
export function esteLectie(slug: string): boolean {
  const p = slug.split("/")
  return p.length === 4 && p[0] === "la-clasa" && p[1] === "proiecte" && p[3] !== "index"
}
export const disciplinaDin = (slug: string) => slug.split("/")[2]
