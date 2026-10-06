import type { Lang } from '../i18n/ui';

export const about: Record<Lang, { bio: string[]; facts: [string, string][] }> = {
  en: {
    bio: [
      'I’m Redon, a senior engineer based in Berlin with 12+ years of building for the web. By day I work at Bettermile (part of GLS) on last-mile delivery software used by depots and drivers across Europe, where I also lead the work on Bekki, our AI assistant.',
      'Before that I spent six years in Genoa: full-stack developer at USA College Sport, frontend developer at eXact learning solutions, and a freelancer for local businesses. Outside the day job I design, build and run my own products: a healthcare booking platform, a real-estate site with its own CRM, a flight tracker with native apps, an AI-powered quiz tool.',
      'I care about the whole thing: the data model, the UI details, SEO, the App Store listing and the support email afterwards. If you need someone who can take a product from a napkin sketch to paying users, let’s talk.',
    ],
    facts: [
      ['Experience', '12+ years'],
      ['Based in', 'Berlin, works remotely'],
      ['Languages', 'Albanian, Italian, English'],
      ['Focus', 'Vue/Nuxt, TypeScript, Firebase, Kotlin, AI agents and MCP'],
    ],
  },
  it: {
    bio: [
      'Sono Redon, ingegnere senior a Berlino con più di 12 anni di esperienza nello sviluppo web. Di giorno lavoro in Bettermile (parte di GLS) sul software di consegna last-mile usato da depositi e corrieri in tutta Europa, dove guido anche lo sviluppo di Bekki, il nostro assistente AI.',
      'Prima ho passato sei anni a Genova: sviluppatore full-stack per USA College Sport, frontend developer in eXact learning solutions e freelance per aziende del territorio. Fuori dal lavoro progetto, sviluppo e gestisco prodotti miei: una piattaforma di prenotazioni sanitarie, un portale immobiliare con il suo CRM, un tracker di voli con app native, uno strumento per quiz basato sull’AI.',
      'Mi occupo di tutto il prodotto: il modello dei dati, i dettagli dell’interfaccia, la SEO, la scheda sull’App Store e anche le email di supporto. Se ti serve qualcuno che porti un’idea da uno schizzo su un tovagliolo fino ai primi clienti paganti, parliamone.',
    ],
    facts: [
      ['Esperienza', '12+ anni'],
      ['Base', 'Berlino, anche da remoto'],
      ['Lingue', 'Albanese, italiano, inglese'],
      ['Focus', 'Vue/Nuxt, TypeScript, Firebase, Kotlin, agenti AI e MCP'],
    ],
  },
  sq: {
    bio: [
      'Jam Redoni, inxhinier senior me bazë në Berlin, me mbi 12 vjet përvojë në ndërtimin e aplikacioneve web. Gjatë ditës punoj te Bettermile (pjesë e GLS) në softuerin e shpërndarjes last-mile që përdoret nga depot dhe korrierët në gjithë Evropën, ku drejtoj edhe zhvillimin e Bekki-t, asistentit tonë AI.',
      'Më parë kalova gjashtë vjet në Xhenova: zhvillues full-stack te USA College Sport, frontend developer te eXact learning solutions dhe freelancer për biznese vendase. Jashtë punës projektoj, ndërtoj dhe menaxhoj produktet e mia: një platformë rezervimesh shëndetësore, një portal pasurish të paluajtshme me CRM-në e vet, një tracker fluturimesh me aplikacione native, një mjet kuizesh me AI.',
      'Kujdesem për të gjithë produktin: modelin e të dhënave, detajet e ndërfaqes, SEO-në, faqen në App Store dhe email-et e suportit më pas. Nëse të duhet dikush që e çon një ide nga një skicë në letër deri te klientët e parë që paguajnë, le të flasim.',
    ],
    facts: [
      ['Përvoja', '12+ vjet'],
      ['Baza', 'Berlin, edhe në distancë'],
      ['Gjuhët', 'Shqip, italisht, anglisht'],
      ['Fokusi', 'Vue/Nuxt, TypeScript, Firebase, Kotlin, agjentë AI dhe MCP'],
    ],
  },
};
