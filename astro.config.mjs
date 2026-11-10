import { defineConfig } from 'astro/config';
import remarkBase from './src/remark-base.mjs';

// ─────────────────────────────────────────────────────────────
// WHERE THE SITE WILL LIVE (we fill this in during Phase 7)
//
// SITE = the main web address.
// BASE = the sub-folder after the address.
//   • https://USERNAME.github.io/portfolio/  → SITE 'https://USERNAME.github.io', BASE '/portfolio'
//   • https://USERNAME.github.io/            → BASE '/'
//   • your own domain, e.g. https://mahyamirzaee.com → SITE that domain, BASE '/'
// ─────────────────────────────────────────────────────────────
const SITE = 'https://mahyaweber.github.io';
const BASE = '/';

export default defineConfig({
  site: SITE,
  base: BASE,
  trailingSlash: 'ignore',
  markdown: { remarkPlugins: [remarkBase(BASE)] },
});
