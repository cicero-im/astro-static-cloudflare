---
name: i18n-routing
description: Serve every page in every supported locale under a prefixed URL with hreflang alternates so search engines and agents discover translations.
---

# i18n Routing

Route every page through a `[...locale]` dynamic segment so each canonical page has one URL per supported locale, with the default locale served from the unprefixed path.

## Requirements

- Default locale at `/` (no prefix); other locales at `/<locale>/...`
- Every page emits `<link rel="alternate" hreflang="…">` for every locale plus `x-default`
- Sitemap declares the same locale alternates per URL
- Translations live in `messages/<locale>.json` and are validated in CI

## Implementation Pattern

Use Astro's built-in `i18n` config with `routing: { prefixDefaultLocale: false }`, and Inlang/Paraglide for type-safe message lookups. A small `lib/i18n-routing.ts` helper centralises `getStaticPaths()` for locale-prefixed routes; `lib/routes.ts` wraps `localizeHref()` so all internal links pick up the active locale automatically.
