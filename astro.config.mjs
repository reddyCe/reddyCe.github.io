// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Set SITE_URL when a custom domain is attached (e.g. https://redoncela.com).
const site = process.env.SITE_URL || 'https://reddyce.github.io';

export default defineConfig({
  site,
  trailingSlash: 'always',
  build: { format: 'directory' },
  integrations: [
    sitemap({
      i18n: { defaultLocale: 'en', locales: { en: 'en', it: 'it', sq: 'sq' } },
    }),
  ],
});
