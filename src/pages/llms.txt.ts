import type { APIRoute } from 'astro';
import { projects, hostOf } from '../data/projects';
import { EMAIL, BRAND, FOUNDER, profile } from '../data/profile';
import { services, serviceHref } from '../data/services';

// Plain-text summary for AI assistants and search tools (llmstxt.org).
export const GET: APIRoute = ({ site }) => {
  const abs = (p: string) => new URL(p, site).href;
  const lines = [
    `# ${BRAND}`,
    '',
    `> Software studio based in Berlin. Builds web platforms, mobile apps, AI assistants and MCP servers end to end. Founded by ${FOUNDER}. Open to new projects. Works in English, Italian and Albanian.`,
    '',
    `Contact: ${EMAIL}`,
    `LinkedIn: ${profile.linkedinUrl}`,
    `GitHub: ${profile.githubUrl}`,
    '',
    '## Services',
    '',
    ...services.map((s) => `- [${s.i18n.en.navLabel}](${abs(serviceHref('en', s))}): ${s.i18n.en.lead}`),
    '',
    '## Projects',
    '',
    ...projects.map((p) => `- [${p.name}](${abs(`/projects/${p.slug}/`)}): ${p.i18n.en.tagline}. ${p.i18n.en.summary}${p.url ? ` Live at ${hostOf(p.url)}.` : ''}`),
    '',
    "## Founder's employment",
    '',
    ...profile.experience.map((e) => `- ${e.roles?.length ? e.roles.join(' < ') : e.title}, ${e.company} (${e.start} to ${e.end ?? 'present'})${e.location ? `, ${e.location}` : ''}`),
    '',
    '## Languages',
    '',
    `- English: ${abs('/')}`,
    `- Italiano: ${abs('/it/')}`,
    `- Shqip: ${abs('/sq/')}`,
    '',
  ];
  return new Response(lines.join('\n'), { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
