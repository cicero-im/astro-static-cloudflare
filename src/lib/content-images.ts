import { toAbsoluteUrl } from "./routes";

type ContentImage = {
  src: string;
};

export function resolveContentOgImage(ogImage?: string, heroImage?: ContentImage) {
  if (ogImage) {
    return ogImage.startsWith("http://") || ogImage.startsWith("https://")
      ? ogImage
      : toAbsoluteUrl(ogImage);
  }

  if (heroImage?.src) {
    return toAbsoluteUrl(heroImage.src);
  }

  return undefined;
}
