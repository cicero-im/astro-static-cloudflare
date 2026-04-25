---
name: link-response-headers
description: Add RFC 8288 Link headers on the homepage for API and service discovery.
---

# Link Response Headers

Implement homepage `Link` response headers that advertise machine-readable resources.

## Recommended Relations

- `api-catalog`: `/.well-known/api-catalog`
- `service-desc`: `/.well-known/api-catalog`
- `service-doc`: `/docs/`
- `describedby`: `/sitemap-index.xml`

## Validation

Request the homepage and confirm `Link` headers are present and well-formed.
