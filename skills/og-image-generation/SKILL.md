---
name: og-image-generation
description: Generate a unique Open Graph image for every page so link previews on social platforms and chat apps render correctly.
---

# Open Graph Image Generation

Render a per-page OG image (1200×630) at build time and reference it from each page's `<meta property="og:image">`.

## Requirements

- Every page emits `og:image`, `og:title`, `og:description`, `og:url`, `og:site_name`
- Image URL resolves to a real file colocated next to the rendered HTML (e.g. `/blog/post/index.html` → `/blog/post/index.png`)
- Twitter Card meta (`twitter:card=summary_large_image`, `twitter:image`) mirrors the OG image

## Implementation Pattern

Use `astro-opengraph-images` with a render preset and self-hosted woff fonts loaded from `node_modules/@fontsource/*`. In the shared `<head>` component, derive the default `og:image` URL from `Astro.url.pathname` so every page works without manual configuration.

## Performance Note

OG image generation is memory-hungry. On constrained CI runners, set `OG_CONCURRENCY=2` and bump `--max-old-space-size`. The patched `astro-opengraph-images` in this template caps concurrency via that env var.
