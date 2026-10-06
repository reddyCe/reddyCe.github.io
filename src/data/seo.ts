import { projects, type Project } from './projects';
import { profile, EMAIL } from './profile';
import { prefix, projectHref, ui, type Lang } from '../i18n/ui';

const abs = (site: URL, p: string) => new URL(p, site).href;

function person(site: URL) {
  return {
    '@type': 'Person',
    '@id': abs(site, '/#redon'),
    name: 'Redon Cela',
    url: abs(site, '/'),
    image: abs(site, '/redon-cela.jpg'),
    email: `mailto:${EMAIL}`,
    jobTitle: 'Senior Full-Stack & AI Engineer',
    description:
      'Freelance full-stack and AI engineer building web platforms, mobile apps, AI assistants and MCP servers.',
    address: { '@type': 'PostalAddress', addressLocality: 'Berlin', addressCountry: 'DE' },
    worksFor: { '@type': 'Organization', name: 'Bettermile', parentOrganization: { '@type': 'Organization', name: 'GLS' } },
    alumniOf: { '@type': 'CollegeOrUniversity', name: 'Università degli Studi di Genova' },
    knowsLanguage: ['sq', 'it', 'en'],
    knowsAbout: [
      'Full-stack web development',
      'Vue.js',
      'Nuxt',
      'TypeScript',
      'Firebase',
      'Kotlin',
      'Mobile app development',
      'AI assistants',
      'Model Context Protocol (MCP)',
      'Large language models',
      'SEO',
    ],
    sameAs: [profile.linkedinUrl, profile.githubUrl],
  };
}

export function homeJsonLd(lang: Lang, site: URL) {
  const url = abs(site, `${prefix(lang)}/`);
  return [
    {
      '@context': 'https://schema.org',
      '@graph': [
        person(site),
        {
          '@type': 'WebSite',
          '@id': abs(site, '/#website'),
          url: abs(site, '/'),
          name: 'Redon Cela',
          inLanguage: ['en', 'it', 'sq'],
          publisher: { '@id': abs(site, '/#redon') },
        },
        {
          '@type': 'ProfilePage',
          '@id': `${url}#page`,
          url,
          name: ui[lang]['meta.title'],
          description: ui[lang]['meta.description'],
          inLanguage: lang,
          mainEntity: { '@id': abs(site, '/#redon') },
          isPartOf: { '@id': abs(site, '/#website') },
        },
        {
          '@type': 'ProfessionalService',
          '@id': abs(site, '/#service'),
          name: 'Redon Cela, software development',
          url: abs(site, '/'),
          email: EMAIL,
          image: abs(site, '/redon-cela.jpg'),
          founder: { '@id': abs(site, '/#redon') },
          areaServed: ['Albania', 'Italy', 'Germany', 'European Union', 'United States', 'Worldwide'],
          availableLanguage: ['English', 'Italian', 'Albanian'],
          serviceType: [
            ui[lang]['services.1.t'],
            ui[lang]['services.2.t'],
            ui[lang]['services.3.t'],
            ui[lang]['services.4.t'],
          ],
        },
        {
          '@type': 'ItemList',
          name: ui[lang]['work.title'],
          itemListElement: projects.map((p, i) => ({
            '@type': 'ListItem',
            position: i + 1,
            url: abs(site, projectHref(lang, p.slug)),
            name: p.name,
          })),
        },
      ],
    },
  ];
}

export function projectJsonLd(p: Project, lang: Lang, site: URL) {
  const url = abs(site, projectHref(lang, p.slug));
  const c = p.i18n[lang];
  return [
    {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'CreativeWork',
          '@id': `${url}#work`,
          name: p.name,
          headline: `${p.name}: ${c.tagline}`,
          description: c.summary,
          url,
          inLanguage: lang,
          genre: p.category,
          keywords: p.stack.join(', '),
          dateCreated: p.period.match(/\d{4}/)?.[0],
          image: p.screenshots.map((s) => abs(site, s.image.src)),
          author: person(site),
          creator: { '@id': abs(site, '/#redon') },
          ...(p.url ? { sameAs: p.url } : {}),
          about: {
            '@type': 'SoftwareApplication',
            name: p.name,
            applicationCategory: p.category,
            operatingSystem: 'Web',
            ...(p.url ? { url: p.url } : {}),
          },
        },
        {
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Redon Cela', item: abs(site, `${prefix(lang)}/`) },
            { '@type': 'ListItem', position: 2, name: ui[lang]['nav.work'], item: abs(site, `${prefix(lang)}/#work`) },
            { '@type': 'ListItem', position: 3, name: p.name, item: url },
          ],
        },
      ],
    },
  ];
}
