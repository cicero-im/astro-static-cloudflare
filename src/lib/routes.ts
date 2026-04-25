import { localizeHref, locales } from "../paraglide/runtime.js";
import { SITE_URL } from "../consts";

export type SiteLocale = (typeof locales)[number];

export const routes = {
  home: () => "/",
  blogIndex: () => "/blog/",
  blogPost: (slug: string) => `/blog/${slug}/`,
  docsIndex: () => "/docs/",
  docsPost: (slug: string) => `/docs/${slug}/`,
} as const;

function ensureTrailingSlash(path: string) {
  if (!path.startsWith("/")) {
    return path;
  }

  const url = new URL(path, SITE_URL);
  const hasFileExtension = /\/[^/]+\.[^/]+$/.test(url.pathname);

  if (!hasFileExtension && !url.pathname.endsWith("/")) {
    url.pathname = `${url.pathname}/`;
  }

  return `${url.pathname}${url.search}${url.hash}`;
}

export function toLocalizedPath(path: string, locale?: SiteLocale) {
  const localized = locale ? localizeHref(path, { locale }) : localizeHref(path);
  return ensureTrailingSlash(localized);
}

export function toAbsoluteUrl(path: string) {
  return `${SITE_URL}${path}`;
}
