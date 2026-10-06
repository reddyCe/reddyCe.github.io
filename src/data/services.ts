import type { Lang } from '../i18n/ui';
import { getProject, type Project } from './projects';

export interface ServiceCopy {
  slug: string;
  navLabel: string;
  metaTitle: string;
  metaDescription: string;
  eyebrow: string;
  h1: string;
  lead: string;
  problemsTitle: string;
  problems: string[];
  buildTitle: string;
  build: { title: string; text: string }[];
  processTitle: string;
  process: { title: string; text: string }[];
  proofTitle: string;
  proofText: string;
  faqTitle: string;
  faq: { q: string; a: string }[];
  ctaTitle: string;
  ctaText: string;
}

export interface Service {
  id: string;
  icon: string;
  related: Project[];
  heroShot?: string;
  i18n: Record<Lang, ServiceCopy>;
}

/** Display order. */
export const SERVICE_ORDER = [
  'ai-transformation',
  'web-platforms',
  'custom-crm',
  'mobile-apps',
  'digital-transformation',
  'mcp-servers',
];

const raw = import.meta.glob<{ default: any }>('./services/*.json', { eager: true });

export const services: Service[] = SERVICE_ORDER.map((id) => raw[`./services/${id}.json`]?.default)
  .filter(Boolean)
  .map((s: any) => ({
    ...s,
    related: (s.related ?? []).map((slug: string) => getProject(slug)).filter(Boolean),
  }));

/** Localized section folder for service pages. */
export const servicesDir: Record<Lang, string> = { en: '/services', it: '/it/servizi', sq: '/sq/sherbime' };
export const servicesIndexHref = (lang: Lang) => `${servicesDir[lang]}/`;
export const serviceHref = (lang: Lang, s: Service) => `${servicesDir[lang]}/${s.i18n[lang].slug}/`;
export const serviceAlternates = (s: Service) =>
  Object.fromEntries((['en', 'it', 'sq'] as Lang[]).map((l) => [l, serviceHref(l, s)])) as Record<Lang, string>;
export const indexAlternates = () =>
  Object.fromEntries((['en', 'it', 'sq'] as Lang[]).map((l) => [l, servicesIndexHref(l)])) as Record<Lang, string>;

/** Which screenshot best proves each service, by surface name or kind. */
const proofPick: Record<string, (s: Project['screenshots'][number]) => boolean> = {
  'custom-crm': (x) => x.kind === 'desktop' && /crm|admin|coach|doctor|internal/i.test(x.surface),
  'mobile-apps': (x) => x.kind === 'mobile',
  'ai-transformation': (x) => /mcp|ai|search|offer/i.test(`${x.surface} ${x.file}`),
  'mcp-servers': (x) => /mcp/i.test(`${x.surface} ${x.file}`),
  'digital-transformation': (x) => x.kind === 'desktop' && /crm|doctor|admin/i.test(x.surface),
};
export const proofShot = (serviceId: string, p: Project) =>
  p.screenshots.find((x) => proofPick[serviceId]?.(x)) ?? p.screenshots.find((x) => x.kind === 'desktop') ?? p.screenshots[0];
