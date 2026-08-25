import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const thoughtSchema = z.object({
  title: z.string(),
  date: z.coerce.date(),
  topic: z.string(),
  lede: z.string(),
  draft: z.boolean().default(false),
  featured: z.boolean().default(false),
  sample: z.boolean().default(false),
});

const thoughts = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./content/thoughts" }),
  schema: thoughtSchema,
});

const inbox = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./content/inbox" }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    source: z.string().default("dictation"),
  }),
});

export const collections = { thoughts, inbox };
