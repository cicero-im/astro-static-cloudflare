import { assertIsLocale, baseLocale, locales } from "../paraglide/runtime.js";

type LocalizedEntry = {
  id: string;
  data: {
    locale: string;
  };
};

export function getLocalizedStaticPaths() {
  return locales.map((locale) => ({
    params: { locale: locale === baseLocale ? undefined : locale },
  }));
}

export function getLocalizedSlugStaticPaths<T extends LocalizedEntry>(
  entries: T[],
  propName: string,
  getSlug: (entry: T) => string = (entry) => entry.id,
) {
  return locales.flatMap((locale) =>
    entries
      .filter((entry) => entry.data.locale === locale)
      .map((entry) => ({
        params: {
          locale: locale === baseLocale ? undefined : locale,
          slug: getSlug(entry),
        },
        props: { [propName]: entry } as Record<string, T>,
      })),
  );
}

export function getRouteLocale(locale: string | undefined) {
  return assertIsLocale(locale ?? baseLocale);
}
