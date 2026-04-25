---
name: robots-txt
description: Publish a /robots.txt that allows reputable crawlers and points them at the sitemap index.
---

# robots.txt

Expose `/robots.txt` with allow rules and a `Sitemap:` line referencing the canonical sitemap index URL.

## Requirements

- `User-agent: *` and `Allow: /` (or specific deny rules where needed)
- One absolute `Sitemap:` URL per sitemap index
- Served with `Content-Type: text/plain`

## Implementation Pattern

Use `astro-robots-txt` (auto-generates from `site` in `astro.config.mjs`) or commit a static `public/robots.txt` and keep the `Sitemap:` URL in sync with the deployed origin.
