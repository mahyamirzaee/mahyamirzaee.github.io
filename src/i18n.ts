import { getEntry, getCollection } from 'astro:content';

export type Lang = 'en' | 'de';
export const langs: Lang[] = ['en', 'de'];

const BASE = import.meta.env.BASE_URL.replace(/\/$/, '');

/** Build a link that works with the base folder and the language. link('about', 'de') → /de/about/ */
export function link(path: string, lang: Lang = 'en'): string {
  const clean = path.replace(/^\/|\/$/g, '');
  const prefix = lang === 'de' ? '/de' : '';
  return `${BASE}${prefix}/${clean}${clean ? '/' : ''}`.replace(/\/{2,}/g, '/');
}

/** Link to a file inside public/, e.g. asset('/images/x.png') */
export function asset(path: string): string {
  return `${BASE}/${path.replace(/^\//, '')}`;
}

/** The same page in the other language. */
export function switchLink(url: URL, target: Lang): string {
  let p = url.pathname.slice(BASE.length).replace(/^\/(de)(\/|$)/, '/');
  return link(p, target);
}

/** Turn *words* into <em>words</em> (for short texts written in frontmatter). */
export function emphasis(text = ''): string {
  const safe = text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  return safe.replace(/\*(.+?)\*/g, '<em>$1</em>');
}

export async function ui(lang: Lang) {
  const entry = await getEntry('ui', lang);
  return entry!.data as Record<string, any>;
}

/** A page text (src/content/pages/<lang>/<name>.md). Falls back to English. */
export async function page(name: string, lang: Lang) {
  const all = await getCollection('pages');
  const own = all.find((p) => p.id === `${lang}/${name}`);
  if (own) return { entry: own, fallback: false };
  return { entry: all.find((p) => p.id === `en/${name}`)!, fallback: lang !== 'en' };
}

/** Visible projects for one language (English used where German is missing). */
export async function projects(lang: Lang) {
  // hidden: never shown. draft: shown only in the local preview (npm run dev), never on the live site.
  const all = await getCollection('projects', (p) => !p.data.hidden && (import.meta.env.DEV || !p.data.draft));
  const en = all.filter((p) => p.id.startsWith('en/'));
  return en
    .map((p) => {
      const slug = p.id.slice(3);
      const own = lang === 'de' ? all.find((d) => d.id === `de/${slug}`) : undefined;
      return { slug, entry: own ?? p, fallback: lang === 'de' && !own };
    })
    .sort((a, b) => a.entry.data.order - b.entry.data.order);
}
