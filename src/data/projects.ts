import type { ImageMetadata } from 'astro';
import type { Lang } from '../i18n/ui';

type Localized<T> = Record<Lang, T>;

export interface ProjectCopy {
  tagline: string;
  summary: string;
  useCases: string[];
  highlights: string[];
}

export interface Shot {
  file: string;
  kind: 'desktop' | 'mobile';
  surface: string;
  caption: Localized<string>;
  image: ImageMetadata;
}

export interface Project {
  slug: string;
  name: string;
  url?: string;
  period: string;
  role: string;
  status: string;
  category: string;
  stack: string[];
  facts: string[];
  i18n: Localized<ProjectCopy>;
  screenshots: Shot[];
  surfaces: string[];
  mcpTools?: { name: string; description: string }[];
  year: string;
}

/** Display order on the site. */
export const ORDER = ['saneo', 'alproperty', 'ucs', 'circleon', 'quizmaster', 'tdown', 'pushim'];

const raw = import.meta.glob<{ default: any }>('../../research/*.json', { eager: true });
const images = import.meta.glob<{ default: ImageMetadata }>('../assets/projects/**/*.{png,jpg,jpeg,webp}', {
  eager: true,
});

function resolveImage(file: string): ImageMetadata | undefined {
  // research JSON stores capture paths like "projects/ucs/home.png"; the asset is the converted .webp
  const rel = file.replace(/^\/?(public\/)?/, '').replace(/\.(png|jpe?g)$/i, '.webp');
  return images[`../assets/${rel}`]?.default;
}

export const projects: Project[] = ORDER.map((slug) => raw[`../../research/${slug}.json`]?.default)
  .filter(Boolean)
  .map((p: any): Project => {
    const screenshots: Shot[] = (p.screenshots ?? [])
      .map((s: any) => ({ ...s, image: resolveImage(s.file) }))
      .filter((s: Shot) => s.image);
    const surfaces = [...new Set(screenshots.map((s) => s.surface))];
    const year = String(p.period ?? '').match(/\d{4}(?!.*\d{4})/)?.[0] ?? '';
    return { ...p, screenshots, surfaces, year, facts: p.facts ?? [], stack: p.stack ?? [] };
  });

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);

export const hostOf = (url?: string) => (url ? url.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '') : '');

/** Short, localized field labels used in eyebrows. */
export const boardType: Record<string, Localized<string>> = {
  saneo: { en: 'Health', it: 'Sanità', sq: 'Shëndetësi' },
  alproperty: { en: 'Real estate', it: 'Immobiliare', sq: 'Prona' },
  ucs: { en: 'Sport', it: 'Sport', sq: 'Sport' },
  circleon: { en: 'Social', it: 'Social', sq: 'Social' },
  quizmaster: { en: 'AI · MCP', it: 'AI · MCP', sq: 'AI · MCP' },
  tdown: { en: 'Travel', it: 'Viaggi', sq: 'Udhëtime' },
  pushim: { en: 'Holidays', it: 'Vacanze', sq: 'Pushime' },
};

