---
name: rss-feed
description: Publish an RSS 2.0 feed at /rss.xml that mirrors the blog collection so readers and agents can subscribe.
---

# RSS Feed

Expose a valid RSS 2.0 feed at `/rss.xml` for every published blog post in the default locale.

## Requirements

- Serve `/rss.xml` with `Content-Type: application/rss+xml; charset=utf-8`
- Include `<title>`, `<description>`, `<link>`, `<pubDate>` for every item
- Reference the feed from page `<head>` via `<link rel="alternate" type="application/rss+xml">`

## Implementation Pattern

Use `@astrojs/rss` from a route file at `src/pages/rss.xml.js`. Pull entries from the blog content collection and map them to RSS items using the post slug for the `link` field.
