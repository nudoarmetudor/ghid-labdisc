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
        title: "Urbanist",
        header: "Urbanist",
        body: "Onest",
        code: "ui-monospace",
      },
      colors: {
        // Lumină: fond alb, legături în turcoaz (Formare), accent portocaliu (La clasă).
        lightMode: {
          light: "#ffffff",
          lightgray: "#e2e8ea",
          gray: "#93a0a6",
          darkgray: "#2f3b40",
          dark: "#152227",
          secondary: "#0b7285",
          tertiary: "#d9480f",
          highlight: "rgba(11, 114, 133, 0.08)",
          textHighlight: "#ffd43b66",
        },
        darkMode: {
          light: "#141c20",
          lightgray: "#2b383d",
          gray: "#6b7b82",
          darkgray: "#d3dcdf",
          dark: "#eef3f4",
          secondary: "#3bc9db",
          tertiary: "#ff922b",
          highlight: "rgba(59, 201, 219, 0.12)",
          textHighlight: "#ffd43b55",
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
