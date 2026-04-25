---
name: sitemap-index
description: Publish a discoverable XML sitemap index at /sitemap-index.xml so crawlers and agents can enumerate every page.
---

# Sitemap Index

Expose a top-level `/sitemap-index.xml` that links to one or more sitemaps covering every canonical URL on the site, including all locale variants.

## Requirements

- Serve `/sitemap-index.xml` with `Content-Type: application/xml`
- Each child sitemap lists `<url>` entries with `<loc>`, `<lastmod>`, and `<xhtml:link rel="alternate" hreflang="…">` for i18n variants
- Reference the sitemap from `robots.txt` via `Sitemap:` and from page `<head>` via `<link rel="alternate" type="application/xml">`

## Implementation Pattern

Use `astro-sitemap` with the `i18n` option set to a `{ defaultLocale, locales }` map matching the project's Paraglide settings. The integration generates the index plus per-shard sitemaps automatically at build time.
