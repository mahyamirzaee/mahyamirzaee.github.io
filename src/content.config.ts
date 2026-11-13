import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// Projects: one Markdown file per project, in src/content/projects/en/ (and /de/).
const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    short: z.string(),                    // one line, shown on cards
    year: z.string(),
    tags: z.array(z.string()).default([]),
    role: z.string().optional(),
    context: z.string().optional(),       // e.g. "M.Sc. thesis, University of Siegen"
    links: z.array(z.object({ label: z.string(), url: z.string() })).default([]),
    gallery: z.array(z.object({ src: z.string(), alt: z.string(), caption: z.string().optional() })).default([]),
    status: z.string().optional(),        // e.g. "Work in progress"
    cover: z.string().optional(),         // e.g. /images/safespace/home.png (file inside public/)
    coverAnimation: z.string().optional(),// "tact" = the animated woven-thread cover
    href: z.string().optional(),          // project lives on its own page elsewhere: the card links there
    coverAlt: z.string().optional(),
    order: z.number().default(99),        // smaller number = shown first
    hidden: z.boolean().default(false),   // true = not shown anywhere
    inPortfolio: z.boolean().default(false), // true = included in the print portfolio
  }),
});

// Pages: Home, About, Publications, CV, Contact, Portfolio intro.
const pages = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/pages' }),
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
  }).passthrough(),
});

// Small interface texts (menu, footer, buttons) in en.yaml / de.yaml.
const ui = defineCollection({
  loader: glob({ pattern: '*.yaml', base: './src/content/ui' }),
  schema: z.record(z.any()),
});

export const collections = { projects, pages, ui };
