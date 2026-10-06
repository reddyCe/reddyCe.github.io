import type { ImageMetadata } from 'astro';
import type { Lang } from '../i18n/ui';

const raw = import.meta.glob<{ default: any }>('../../research/linkedin.json', { eager: true });
const li: any = Object.values(raw)[0]?.default ?? {};

const photos = import.meta.glob<{ default: ImageMetadata }>('../assets/me.{jpg,jpeg,png,webp}', { eager: true });

export const EMAIL = 'redoncela@gmail.com';
export const BRAND = 'Red Zone Labs';
export const FOUNDER = 'Redon Cela';

export const profile = {
  name: 'Redon Cela',
  headline: li.headline ?? 'Full-stack & AI engineer',
  location: li.location ?? '',
  linkedinUrl: li.linkedinUrl ?? 'https://www.linkedin.com/in/redoncela/',
  githubUrl: li.githubUrl ?? 'https://github.com/reddyCe',
  experience: (li.experience ?? []).map((e: any) => ({
    ...e,
    title: String(e.title ?? '').replace(/\s*\(.*\)\s*$/, ''),
    location: String(e.location ?? '')
      .replace(/Greater (\w+) Metropolitan Area/, '$1')
      .replace(/, Liguria/, ''),
  })) as {
    company: string;
    title: string;
    start: string;
    end?: string;
    location?: string;
    description?: string;
    /** Promotions within one company, newest first. Rendered under the company, without dates. */
    roles?: string[];
  }[],
  education: (li.education ?? []) as any[],
  skills: (li.skills ?? []) as string[],
  languages: (li.languages ?? []) as any[],
  bettermileAI: li.bettermileAI as
    | (Record<Lang, { title: string; summary: string; bullets: string[] }> & { stack?: string[] })
    | undefined,
  photo: Object.values(photos)[0]?.default as ImageMetadata | undefined,
};
