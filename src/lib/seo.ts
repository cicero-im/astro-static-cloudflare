import type { CollectionEntry } from "astro:content";
import { SITE_TITLE, SITE_URL } from "../consts";
import { resolveContentOgImage } from "./content-images";

const LOGO_URL = `${SITE_URL}/favicon.svg`;

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_TITLE,
    url: SITE_URL,
    logo: {
      "@type": "ImageObject",
      url: LOGO_URL,
    },
  };
}

export function blogPostingJsonLd(
  post: CollectionEntry<"blog">,
  url: string,
  locale: string,
  modifiedDate?: Date,
) {
  const d = post.data;
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: d.title,
    description: d.description,
    image: resolveContentOgImage(d.ogImage, d.heroImage) ?? `${SITE_URL}/og/default.png`,
    datePublished: d.pubDate.toISOString(),
    ...((modifiedDate ?? d.updatedDate) && {
      dateModified: (modifiedDate ?? d.updatedDate)?.toISOString(),
    }),
    inLanguage: locale,
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    publisher: {
      "@type": "Organization",
      name: SITE_TITLE,
      url: SITE_URL,
      logo: { "@type": "ImageObject", url: LOGO_URL },
    },
    articleSection: d.category,
    keywords: (d.tags ?? []).join(", "),
  };
}

export function breadcrumbJsonLd(items: Array<{ name: string; url: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  };
}
