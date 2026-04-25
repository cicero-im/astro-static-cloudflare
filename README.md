# astro-static-cloudflare

A batteries-included **Astro 6 static-site template** that deploys to **Cloudflare Workers** (via the static `[assets]` binding — no SSR, no runtime worker code required).

It ships with the wiring you'd otherwise spend an afternoon assembling:

- **Astro 6 SSG** with i18n routing and trailing slashes
- **Cloudflare Workers** static deployment via `wrangler`
- **Vite+** unified toolchain (`vp dev`, `vp check`, `vp test`) — wraps Vite, Vitest, Oxlint, Oxfmt, tsdown
- **Inlang + Paraglide** for type-safe i18n with locale-prefixed routes
- **OG image generation** (`astro-opengraph-images`, with a build-concurrency patch for low-RAM CI)
- **Sitemaps**, **RSS**, **robots.txt**, **web manifest**
- **PurgeCSS**, **Pagefind** search hooks, **Astro Skills**
- **Self-hosted fonts** (Oswald, Spectral, Inter, Geist) preloaded for FCP/LCP
- **JSON-LD** helpers (Organization, BlogPosting, BreadcrumbList)
- **Reading time** + **last-modified-from-git** remark plugins
- **Renovate** + **Lighthouse CI** + **Ninja i18n** GitHub Action

## Quick start

```bash
# 1. Use this template on GitHub, or:
git clone https://github.com/arthrod/astro-static-cloudflare my-site
cd my-site

# 2. Install
bun install

# 3. Run dev
bun run dev

# 4. Build + preview as a Cloudflare Worker
bun run preview

# 5. Deploy
bunx wrangler login
bun run deploy
```

> Requires Node ≥ 22.12 and Bun. Vite+ wraps the package manager via the `packageManager` field in `package.json`.

## Customise

| What | Where |
| --- | --- |
| Site title, description, URL | `src/consts.ts`, `astro.config.mjs` (`SITE_NAME`, `SITE_DESCRIPTION`) |
| Worker name, routes, custom domains | `wrangler.toml` |
| Locales | `astro.config.mjs` (`LOCALE_LANGUAGE_TAGS`) and `project.inlang/settings.json` |
| Translatable strings | `messages/<locale>.json` |
| Nav / Footer | `src/components/ui/{Nav,Footer}.astro` |
| Design tokens | `src/styles/global.css` (`:root`) |
| Blog posts | `src/content/blog/*.md` |
| Docs pages | `src/content/docs/*.md` |
| Favicon | `public/favicon.svg` |

## Adding a locale

1. Add the locale tag to `LOCALE_LANGUAGE_TAGS` in `astro.config.mjs`.
2. Add it to `locales` in `project.inlang/settings.json`.
3. Create `messages/<locale>.json` (or run `bun run i18n:translate` to machine-translate from `en`).
4. Restart `bun run dev` so Paraglide regenerates `src/paraglide/`.

## Vite+ commands you'll use

```bash
vp check         # format + lint + typecheck
vp check --fix   # auto-fix
vp test          # vitest
vp lint          # oxlint
vp fmt           # oxfmt
```

`bun run dev/build/preview/deploy` are kept as `package.json` scripts because they orchestrate Astro, OG-image memory tuning, and Wrangler.

## Layout

```
.
├── astro.config.mjs           # integrations, i18n, paraglide
├── wrangler.toml              # cloudflare workers static deploy
├── project.inlang/            # i18n project (settings.json only)
├── messages/<locale>.json     # translatable strings
├── patches/                   # bun patches (og-image build concurrency)
├── public/                    # static assets, _headers, favicon
├── remark-modified-time.mjs   # adds lastModified frontmatter from git
├── remark-reading-time.mjs    # adds minutesRead frontmatter
├── lighthouserc.cjs           # lighthouse CI thresholds
└── src/
    ├── components/ui/         # Nav, Footer, Breadcrumb
    ├── content.config.ts      # blog + docs collections
    ├── content/               # markdown sources
    ├── layouts/               # BaseLayout, BlogPost
    ├── lib/                   # routes, i18n-routing, seo, modified-time
    ├── middleware.ts          # paraglide locale binding
    ├── pages/[...locale]/     # locale-prefixed routes
    └── styles/                # global.css, fonts.css, prose.css
```

## License

MIT — see [LICENSE](./LICENSE).
