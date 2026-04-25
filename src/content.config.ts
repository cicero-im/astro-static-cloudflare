import { defineCollection } from "astro:content";
import { skillsLoader } from "astro-skills";
import { glob } from "astro/loaders";
import { z } from "astro/zod";
import { locales } from "./paraglide/runtime.js";

const blog = defineCollection({
  loader: glob({ base: "./src/content/blog", pattern: "**/*.{md,mdx}" }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      pubDate: z.coerce.date(),
      updatedDate: z.coerce.date().optional(),
      heroImage: z.optional(image()),
      ogImage: z.string().optional(),
      locale: z.enum(locales).default("en"),
      translationOf: z.string().optional(),
      category: z.string().optional(),
      tags: z.array(z.string()).default([]),
      slug: z.string().optional(),
      lastModified: z.string().optional(),
      minutesRead: z.string().optional(),
    }),
});

const docs = defineCollection({
  loader: glob({ base: "./src/content/docs", pattern: "**/*.{md,mdx}" }),
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    updatedDate: z.coerce.date().optional(),
    locale: z.enum(locales).default("en"),
    slug: z.string().optional(),
    order: z.number().default(0),
  }),
});

const skills = defineCollection({
  loader: skillsLoader({ base: "./skills" }),
});

export const collections = { blog, docs, skills };
