// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Canonical domain. Override with SITE_URL for previews.
const site = process.env.SITE_URL || 'https://rzl.si';

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
