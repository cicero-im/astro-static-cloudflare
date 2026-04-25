---
name: cloudflare-workers-static
description: Deploy a fully static Astro build to Cloudflare Workers via the [assets] binding so every page is served from the global edge.
---

# Cloudflare Workers (Static Assets)

Ship the `dist/` output from `astro build` to a Cloudflare Worker that serves only static assets — no runtime worker code, no SSR.

## Requirements

- `wrangler.toml` declares `[assets] directory = "dist"`
- `not_found_handling = "404-page"` so a custom `404.html` is served on miss
- `html_handling = "auto-trailing-slash"` so the deploy matches Astro's `trailingSlash: "always"` setting
- Routes are attached via `[[routes]]` with either `custom_domain = true` or `zone_name`

## Implementation Pattern

`astro build` emits `dist/`. `wrangler deploy` uploads it to the Worker. No `main` entrypoint is needed when the deploy is assets-only. Use `wrangler dev --config wrangler.toml` (after a build) to preview the exact production routing locally.

## Headers

Place a `public/_headers` file to attach response headers (CSP, security, RFC 8288 `Link:` discovery hints). The file is copied verbatim into `dist/` and applied by Cloudflare on every response.
