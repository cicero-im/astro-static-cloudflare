import { defineMiddleware } from "astro:middleware";
import { assertIsLocale, setLocale } from "./paraglide/runtime.js";

export const onRequest = defineMiddleware(async (context, next) => {
  if (context.currentLocale) {
    await setLocale(assertIsLocale(context.currentLocale));
  }
  return next();
});
