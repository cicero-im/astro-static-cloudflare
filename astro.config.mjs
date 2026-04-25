// @ts-check

import mdx from "@astrojs/mdx";
import { paraglideVitePlugin } from "@inlang/paraglide-js";
import opengraphImages, { presets } from "astro-opengraph-images";
import purgecss from "astro-purgecss";
import robotsTxt from "astro-robots-txt";
import astroSitemap from "astro-sitemap";
import skills from "astro-skills";
import markdownExport from "@louisbrulenaudet/astro-markdown-export";
import webmanifest from "astro-webmanifest";
import { defineConfig } from "astro/config";
import * as fs from "node:fs";
import { visualizer } from "rollup-plugin-visualizer";
import { remarkModifiedTime } from "./remark-modified-time.mjs";
import { remarkReadingTime } from "./remark-reading-time.mjs";

const SITE_URL = process.env.SITE_URL ?? "https://example.com";
const SITE_NAME = "Astro Static Cloudflare";
const SITE_DESCRIPTION =
  "An Astro 6 static-site template deployed to Cloudflare Workers with i18n, OG images, sitemaps, and Vite+ tooling.";

// Add locales here as you translate `messages/<locale>.json`. Each entry maps
// the inlang locale tag to a BCP-47 language tag used in metadata/manifests.
const LOCALE_LANGUAGE_TAGS = {
  en: "en-US",
};

const WEBMANIFEST_LOCALES = Object.fromEntries(
  Object.entries(LOCALE_LANGUAGE_TAGS)
    .filter(([locale]) => locale !== "en")
    .map(([locale, lang]) => [
      locale,
      {
        name: SITE_NAME,
        short_name: SITE_NAME,
        description: SITE_DESCRIPTION,
        lang,
        start_url: `/${locale}/`,
        scope: `/${locale}/`,
      },
    ]),
);

/**
 * @param {import("vite").Plugin | import("vite").Plugin[]} plugin
 * @returns {import("vite").Plugin[]}
 */
function asPluginList(plugin) {
  return Array.isArray(plugin) ? plugin : [plugin];
}

// @ts-expect-error TS2321: defineConfig inference hits excessive stack depth on this integration-heavy config.
export default defineConfig({
  site: SITE_URL,
  output: "static",
  trailingSlash: "always",

  prerenderConflictBehavior: "error",

  build: {
    format: "directory",
  },

  markdown: {
    remarkPlugins: [remarkReadingTime, remarkModifiedTime],
  },

  integrations: [
    markdownExport(),
    mdx(),
    astroSitemap({
      i18n: {
        defaultLocale: "en",
        locales: LOCALE_LANGUAGE_TAGS,
      },
    }),
    opengraphImages({
      options: {
        fonts: [
          {
            name: "Inter",
            weight: 700,
            style: "normal",
            data: fs.readFileSync(
              "node_modules/@fontsource/inter/files/inter-latin-700-normal.woff",
            ),
          },
          {
            name: "Oswald",
            weight: 700,
            style: "normal",
            data: fs.readFileSync(
              "node_modules/@fontsource/oswald/files/oswald-latin-700-normal.woff",
            ),
          },
          {
            name: "Spectral",
            weight: 300,
            style: "normal",
            data: fs.readFileSync(
              "node_modules/@fontsource/spectral/files/spectral-latin-300-normal.woff",
            ),
          },
        ],
      },
      render: presets.blackAndWhite,
    }),
    purgecss(),
    skills(),
    robotsTxt(),
    webmanifest({
      name: SITE_NAME,
      short_name: SITE_NAME,
      description: SITE_DESCRIPTION,
      lang: LOCALE_LANGUAGE_TAGS.en,
      dir: "ltr",
      start_url: "/",
      scope: "/",
      theme_color: "#111111",
      background_color: "#ffffff",
      display: "standalone",
      icon: "public/favicon.svg",
      locales: WEBMANIFEST_LOCALES,
      config: {
        outfile: "manifest.webmanifest",
        crossOrigin: "anonymous",
        insertThemeColorMeta: true,
        insertManifestLink: true,
        insertAppleTouchLinks: true,
      },
    }),
  ],

  i18n: {
    defaultLocale: "en",
    locales: Object.keys(LOCALE_LANGUAGE_TAGS),
    routing: { prefixDefaultLocale: false },
  },

  vite: {
    optimizeDeps: {
      include: ["lenis"],
      entries: ["src/pages/**/index.astro"],
    },
    plugins: [
      visualizer({
        brotliSize: true,
        filename: "dist/stats.html",
        gzipSize: true,
        open: false,
      }),
      ...asPluginList(
        paraglideVitePlugin({
          project: "./project.inlang",
          outdir: "./src/paraglide",
        }),
      ),
    ],
  },
});
