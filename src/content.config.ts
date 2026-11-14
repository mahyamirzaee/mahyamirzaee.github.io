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
    builtWith: z.string().optional(),     // tool the prototype was built with, e.g. "Lovable"
    context: z.string().optional(),       // e.g. "M.Sc. thesis, University of Siegen"
    links: z.array(z.object({ label: z.string(), url: z.string() })).default([]),
    gallery: z.array(z.object({ src: z.string(), alt: z.string(), caption: z.string().optional() })).default([]),
    status: z.string().optional(),        // e.g. "Work in progress"
    cover: z.string().optional(),         // e.g. /images/safespace/home.png (file inside public/)
    coverAnimation: z.string().optional(),// "tact" = the animated woven-thread cover
    href: z.string().optional(),          // project lives on its own page elsewhere: the card links there
    listHref: z.string().optional(),      // only the Design projects card links here; the project page itself still exists
    listYear: z.string().optional(),      // short year shown under the picture on Design projects (default: year)
    listTitle: z.string().optional(),     // short name shown under the picture on Design projects (default: title)
    listShape: z.string().optional(),     // picture shape on Design projects, e.g. "16 / 9" (default: the page rhythm)
    listCover: z.string().optional(),     // picture used only on Design projects (default: cover)
    // Cover made of parts of one picture, shown one after another (e.g. comic panels):
    coverPanels: z.object({
      src: z.string(),
      size: z.array(z.number()),               // [width, height] of the whole picture in pixels
      panels: z.array(z.array(z.number())),    // each part: [left, top, width, height] in pixels
      every: z.number().optional(),            // milliseconds per part (default 2000)
    }).optional(),
    coverAlt: z.string().optional(),
    order: z.number().default(99),        // smaller number = shown first
    hidden: z.boolean().default(false),   // true = not shown anywhere
    draft: z.boolean().default(false),    // true = only in the local preview, not on the live site (delete the line when finished)
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
