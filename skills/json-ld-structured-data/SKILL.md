---
name: json-ld-structured-data
description: Embed schema.org JSON-LD on every page so search engines and AI agents can parse entities, articles, and breadcrumb trails.
---

# JSON-LD Structured Data

Emit one or more `<script type="application/ld+json">` blocks per page declaring the canonical schema.org entity for that route.

## Requirements

- Homepage and brand pages emit `Organization` (or `WebSite`)
- Blog posts emit `BlogPosting` with `headline`, `description`, `datePublished`, `dateModified`, `inLanguage`, `author`, and `publisher`
- Index/list pages emit `BreadcrumbList`
- All `image` URLs resolve absolutely

## Implementation Pattern

Centralise generators in `src/lib/seo.ts` (one function per schema type) and pass the result through the `jsonLd` prop on `BaseHead`. The base layout serializes each entry with `set:html={JSON.stringify(schema)}` inside `<script is:inline type="application/ld+json">`.
