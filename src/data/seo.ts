import { projects, type Project } from './projects';
import { profile, EMAIL, BRAND, FOUNDER } from './profile';
import { prefix, projectHref, ui, type Lang } from '../i18n/ui';
import { services, serviceHref, servicesIndexHref, type Service } from './services';

const abs = (site: URL, p: string) => new URL(p, site).href;

function person(site: URL) {
  return {
    '@type': 'Person',
    '@id': abs(site, '/#redon'),
    name: FOUNDER,
    url: abs(site, '/#about'),
    image: abs(site, '/redon-cela.jpg'),
    email: `mailto:${EMAIL}`,
    jobTitle: `Founder, ${BRAND}`,
    description: `Founder of ${BRAND}. Senior full-stack and AI engineer building web platforms, mobile apps, AI assistants and MCP servers.`,
    address: { '@type': 'PostalAddress', addressLocality: 'Berlin', addressCountry: 'DE' },
    worksFor: [
      { '@id': abs(site, '/#studio') },
      { '@type': 'Organization', name: 'Bettermile', parentOrganization: { '@type': 'Organization', name: 'GLS' } },
    ],
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
      'AI transformation',
      'AI workflow automation',
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
          name: BRAND,
          inLanguage: ['en', 'it', 'sq'],
          publisher: { '@id': abs(site, '/#studio') },
        },
        {
          '@type': 'WebPage',
          '@id': `${url}#page`,
          url,
          name: ui[lang]['meta.title'],
          description: ui[lang]['meta.description'],
          inLanguage: lang,
          about: { '@id': abs(site, '/#studio') },
          isPartOf: { '@id': abs(site, '/#website') },
        },
        {
          '@type': 'ProfessionalService',
          '@id': abs(site, '/#studio'),
          name: BRAND,
          alternateName: 'RZL',
          description: ui[lang]['meta.description'],
          url: abs(site, '/'),
          email: EMAIL,
          logo: abs(site, '/apple-touch-icon.png'),
          image: abs(site, '/og/en.png'),
          address: { '@type': 'PostalAddress', addressLocality: 'Berlin', addressCountry: 'DE' },
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
          author: { '@type': 'Organization', '@id': abs(site, '/#studio'), name: BRAND, url: abs(site, '/') },
          creator: { '@id': abs(site, '/#studio') },
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
            { '@type': 'ListItem', position: 1, name: BRAND, item: abs(site, `${prefix(lang)}/`) },
            { '@type': 'ListItem', position: 2, name: ui[lang]['nav.work'], item: abs(site, `${prefix(lang)}/#work`) },
            { '@type': 'ListItem', position: 3, name: p.name, item: url },
          ],
        },
      ],
    },
  ];
}

export function serviceJsonLd(s: Service, lang: Lang, site: URL) {
  const c = s.i18n[lang];
  const url = abs(site, serviceHref(lang, s));
  return [
    {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'Service',
          '@id': `${url}#service`,
          name: c.navLabel,
          serviceType: c.navLabel,
          description: c.metaDescription,
          url,
          inLanguage: lang,
          provider: { '@type': 'ProfessionalService', '@id': abs(site, '/#studio'), name: BRAND, url: abs(site, '/'), founder: person(site) },
          areaServed: ['Albania', 'Kosovo', 'Italy', 'Germany', 'European Union', 'Worldwide'],
          availableLanguage: ['English', 'Italian', 'Albanian'],
          hasOfferCatalog: {
            '@type': 'OfferCatalog',
            name: c.buildTitle,
            itemListElement: c.build.map((b) => ({ '@type': 'Offer', itemOffered: { '@type': 'Service', name: b.title, description: b.text } })),
          },
          subjectOf: s.related.map((p) => ({ '@type': 'CreativeWork', name: p.name, url: abs(site, projectHref(lang, p.slug)) })),
        },
        {
          '@type': 'FAQPage',
          '@id': `${url}#faq`,
          inLanguage: lang,
          mainEntity: c.faq.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
        },
        {
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: BRAND, item: abs(site, `${prefix(lang)}/`) },
            { '@type': 'ListItem', position: 2, name: ui[lang]['nav.services'], item: abs(site, servicesIndexHref(lang)) },
            { '@type': 'ListItem', position: 3, name: c.navLabel, item: url },
          ],
        },
      ],
    },
  ];
}

export function servicesIndexJsonLd(lang: Lang, site: URL) {
  return [
    {
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      name: ui[lang]['svc.index.h1'],
      itemListElement: services.map((s, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        url: abs(site, serviceHref(lang, s)),
        name: s.i18n[lang].navLabel,
      })),
    },
  ];
}
