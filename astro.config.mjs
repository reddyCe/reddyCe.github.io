// @ts-check
import { defineConfig, fontProviders } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { execSync } from 'node:child_process';
import fs from 'node:fs';

// Canonical domain. Override with SITE_URL for previews.
const site = process.env.SITE_URL || 'https://rzl.si';
const langs = ['en', 'it', 'sq'];

// Service pages have translated slugs, so the sitemap plugin can't pair them by path.
const servicesDir = { en: '/services', it: '/it/servizi', sq: '/sq/sherbime' };
const serviceFiles = fs.readdirSync('src/data/services').filter((f) => f.endsWith('.json'));
/** Page path -> { lang: path } for every service page and the services index. */
const serviceAlternates = new Map();
/** Page path -> source file, for lastmod. */
const serviceSource = new Map();
for (const f of serviceFiles) {
  const s = JSON.parse(fs.readFileSync(`src/data/services/${f}`, 'utf8'));
  const alts = Object.fromEntries(langs.map((l) => [l, `${servicesDir[l]}/${s.i18n[l].slug}/`]));
  for (const p of Object.values(alts)) {
    serviceAlternates.set(p, alts);
    serviceSource.set(p, `src/data/services/${f}`);
  }
}
const indexAlts = Object.fromEntries(langs.map((l) => [l, `${servicesDir[l]}/`]));
for (const p of Object.values(indexAlts)) serviceAlternates.set(p, indexAlts);

/** Last commit date touching any of the paths, or undefined outside git. */
function lastCommit(...paths) {
  try {
    return execSync(`git log -1 --format=%cI -- ${paths.join(' ')}`, { encoding: 'utf8' }).trim() || undefined;
  } catch {
    return undefined;
  }
}
const lastmod = {
  home: lastCommit('src/i18n', 'src/components', 'src/data/projects.ts', 'src/data/about.ts', 'research'),
  project: lastCommit('src/data/projects.ts', 'src/components/ProjectPage.astro', 'src/components/ProjectCase.astro', 'research'),
  servicesIndex: lastCommit('src/data/services', 'src/components/ServicesIndex.astro'),
};

export default defineConfig({
  site,
  trailingSlash: 'always',
  build: { format: 'directory' },
  fonts: [
    {
      provider: fontProviders.google(),
      name: 'Manrope',
      cssVariable: '--font-manrope',
      weights: [400, 500, 600, 700],
      subsets: ['latin'],
      fallbacks: ['ui-sans-serif', 'system-ui', '-apple-system', 'Segoe UI', 'sans-serif'],
    },
    {
      provider: fontProviders.google(),
      name: 'Geist Mono',
      cssVariable: '--font-geist-mono',
      weights: [500],
      subsets: ['latin'],
      fallbacks: ['ui-monospace', 'SF Mono', 'Menlo', 'monospace'],
    },
  ],
  integrations: [
    sitemap({
      i18n: { defaultLocale: 'en', locales: { en: 'en', it: 'it', sq: 'sq' } },
      // Readable view in browsers; crawlers ignore it.
      xslURL: '/sitemap.xsl',
      serialize(item) {
        const path = new URL(item.url).pathname;
        const alts = serviceAlternates.get(path);
        if (alts) {
          item.links = langs.map((l) => ({ lang: l, url: new URL(alts[l], site).href }));
        }
        const en = item.links?.find((l) => l.lang === 'en');
        if (en) item.links = [...item.links, { lang: 'x-default', url: en.url }];

        const src = serviceSource.get(path);
        item.lastmod = src
          ? lastCommit(src, 'src/components/ServicePage.astro')
          : path.includes('/projects/')
            ? lastmod.project
            : alts
              ? lastmod.servicesIndex
              : lastmod.home;
        return item;
      },
    }),
  ],
});
