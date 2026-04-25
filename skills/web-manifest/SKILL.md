---
name: web-manifest
description: Publish a Web App Manifest at /manifest.webmanifest with localized variants so the site can be installed and rendered as a PWA.
---

# Web App Manifest

Expose `/manifest.webmanifest` describing the site as an installable web application, with one variant per locale.

## Requirements

- Each manifest declares `name`, `short_name`, `description`, `lang`, `start_url`, `scope`, `theme_color`, `background_color`, `display`, and `icons[]`
- Reference the manifest from page `<head>` via `<link rel="manifest">`
- Apple touch icons are linked via `<link rel="apple-touch-icon">`

## Implementation Pattern

Use `astro-webmanifest` with a per-locale `locales` map. Set `insertManifestLink`, `insertThemeColorMeta`, and `insertAppleTouchLinks` so the integration handles `<head>` injection automatically.
