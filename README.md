# Redon Cela, portfolio

Personal site in English, Italian and Albanian. Static [Astro](https://astro.build) build with no client framework, cookies or trackers.

## Run it

```sh
npm install
npm run dev        # http://localhost:4321
npm run build      # static output in dist/
npm run og         # regenerate social preview images in public/og/
```

Set `SITE_URL` for canonical URLs, hreflang and the sitemap (it defaults to `https://reddyce.github.io`):

```sh
SITE_URL=https://redoncela.com npm run build
```

## Where things live

| What | Where |
| --- | --- |
| UI copy in en / it / sq | `src/i18n/ui.ts` |
| About text | `src/data/about.ts` |
| Projects (copy, stack, screenshot list) | `research/<slug>.json` |
| Experience and Bettermile AI copy | `research/linkedin.json` |
| Project order, board labels | `src/data/projects.ts` |
| Screenshots | raw PNG captures in `captures/<slug>/` (not committed), converted by `npm run shots` into WebP in `src/assets/projects/<slug>/` |
| Styles | `src/styles/global.css` |

To add a project, drop a `research/<slug>.json` that follows the existing files, put the PNG captures in `captures/<slug>/` and run `npm run shots`, add the slug to `ORDER` (and `boardType` and `boardName`) in `src/data/projects.ts`, then run `npm run og`.

All screenshots show invented people and data.

## SEO

- One URL per language (`/`, `/it/`, `/sq/`) and one page per project in each language, with `hreflang` alternates and `x-default`.
- JSON-LD: `Person`, `ProfessionalService`, `ProfilePage`, `ItemList`, and `CreativeWork` plus `BreadcrumbList` on project pages.
- Open Graph and Twitter images per page, built by `scripts/og.mjs`.
- `sitemap-index.xml`, `robots.txt` and `llms.txt` are generated at build time.

## Deploy

`.github/workflows/deploy.yml` builds and publishes to GitHub Pages on every push to `main`. To turn it on: make the repo public (or use a plan with private Pages), then go to Settings → Pages → Source and pick "GitHub Actions". For a custom domain, add it under Pages, set the repo variable `SITE_URL` to it, and push again.
