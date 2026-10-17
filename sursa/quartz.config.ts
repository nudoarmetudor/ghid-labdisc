import { QuartzConfig } from "./quartz/cfg"
import * as Plugin from "./quartz/plugins"

/**
 * Ghid deschis: integrarea Labdisc în activități practice de cercetare la științe.
 * Fonturile sunt servite de pe site (quartz/static/fonts), nu de la Google:
 * vizitatorii nu își trimit adresa IP unui terț doar ca să citească ghidul.
 * CIORNE=1 la construire arată și paginile cu `draft: true` (doar pentru verificare locală).
 */
const config: QuartzConfig = {
  configuration: {
    pageTitle: "Integrarea Labdisc în activități practice de cercetare la științe",
    pageTitleSuffix: " · Ghidul Labdisc",
    enableSPA: true,
    enablePopovers: true,
    analytics: null,
    locale: "ro-RO",
    baseUrl: "nudoarmetudor.github.io/ghid-labdisc",
    ignorePatterns: ["private", "templates", ".obsidian"],
    defaultDateType: "modified",
    theme: {
      fontOrigin: "local",
      cdnCaching: false,
      typography: {
        title: "Open Sans",
        header: "Open Sans",
        body: "Open Sans",
        code: "ui-monospace",
      },
      colors: {
        // Culorile Future Classroom Lab (BRAND-FCL.md): text gri FCL, legături în albastrul
        // European Schoolnet, accent magenta. Cyanul și verdele-lime nu sunt culori de text.
        lightMode: {
          light: "#ffffff",
          lightgray: "#e4e5e9",
          gray: "#8e8f96",
          darkgray: "#4a4a4d",
          dark: "#3a3a3c",
          secondary: "#0878be",
          tertiary: "#e60e64",
          highlight: "rgba(0, 188, 228, 0.08)",
          textHighlight: "#c1d72e66",
        },
        darkMode: {
          light: "#16181d",
          lightgray: "#2c2f36",
          gray: "#71747c",
          darkgray: "#d4d5da",
          dark: "#eeeff2",
          secondary: "#00bce4",
          tertiary: "#ff5c9a",
          highlight: "rgba(0, 188, 228, 0.12)",
          textHighlight: "#c1d72e44",
        },
      },
    },
  },
  plugins: {
    transformers: [
      Plugin.FrontMatter(),
      Plugin.CreatedModifiedDate({
        priority: ["frontmatter", "git", "filesystem"],
      }),
      Plugin.SyntaxHighlighting({
        theme: {
          light: "github-light",
          dark: "github-dark",
        },
        keepBackground: false,
      }),
      Plugin.ObsidianFlavoredMarkdown({ enableInHtmlEmbed: false, enableCheckbox: true }),
      Plugin.GitHubFlavoredMarkdown(),
      Plugin.TableOfContents(),
      Plugin.CrawlLinks({ markdownLinkResolution: "absolute", openLinksInNewTab: true }),
      Plugin.Description(),
    ],
    filters: process.env.CIORNE ? [] : [Plugin.RemoveDrafts()],
    emitters: [
      Plugin.AliasRedirects(),
      Plugin.ComponentResources(),
      Plugin.ContentPage(),
      Plugin.FolderPage(),
      Plugin.TagPage(),
      Plugin.ContentIndex({
        enableSiteMap: true,
        enableRSS: false,
      }),
      Plugin.Assets(),
      Plugin.Static(),
      Plugin.Favicon(),
      Plugin.NotFoundPage(),
    ],
  },
}

export default config
