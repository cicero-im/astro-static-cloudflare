import dayjs from "dayjs";
import "dayjs/locale/en";
import "dayjs/locale/es";
import "dayjs/locale/pt";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);

export function parseLastModified(lastModified?: string): Date | undefined {
  if (!lastModified) return undefined;

  const parsed = dayjs(lastModified);
  return parsed.isValid() ? parsed.toDate() : undefined;
}

export function formatLastModified(
  lastModified?: string,
  locale: string = "en",
): string | undefined {
  if (!lastModified) return undefined;

  const parsed = dayjs(lastModified);
  if (!parsed.isValid()) return undefined;

  return parsed.utc().locale(locale).format("HH:mm:ss DD MMMM YYYY [UTC]");
}
