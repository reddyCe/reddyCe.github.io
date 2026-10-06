import type { Lang } from '../i18n/ui';

export const about: Record<Lang, { bio: string[]; facts: [string, string][] }> = {
  en: {
    bio: [
      'Red Zone Labs is a software studio based in Berlin. We design, build and run web platforms, mobile apps and AI assistants, and we take a product from the first sketch to paying users.',
      'The studio was founded by Redon Cela, a senior engineer with 12+ years of building for the web. Redon also works at Bettermile (part of GLS) on last-mile delivery software used by depots and drivers across Europe, and leads the work on Bekki, its AI assistant. Before that came six years in Genoa: full-stack developer at USA College Sport, frontend developer at eXact learning solutions, and freelance work for local businesses.',
      'We also build and run our own products: a healthcare booking platform, a real-estate site with its own CRM, a flight tracker with native apps, an AI-powered quiz tool. We care about the whole thing: the data model, the UI details, SEO, the App Store listing and the support email afterwards. If your idea is still a napkin sketch, let’s talk.',
    ],
    facts: [
      ['Founder', 'Redon Cela, 12+ years in web engineering'],
      ['Based in', 'Berlin, working remotely'],
      ['Languages', 'Albanian, Italian, English'],
      ['Focus', 'Vue/Nuxt, TypeScript, Firebase, Kotlin, AI agents and MCP'],
    ],
  },
  it: {
    bio: [
      'Red Zone Labs è uno studio software con base a Berlino. Progettiamo, sviluppiamo e gestiamo piattaforme web, app mobile e assistenti AI, e portiamo un prodotto dal primo schizzo fino ai primi clienti paganti.',
      'Lo studio è stato fondato da Redon Cela, ingegnere senior con più di 12 anni di esperienza nello sviluppo web. Redon lavora anche in Bettermile (parte di GLS) sul software di consegna last-mile usato da depositi e corrieri in tutta Europa, dove guida lo sviluppo di Bekki, l’assistente AI dell’azienda. Prima ci sono stati sei anni a Genova: sviluppatore full-stack per USA College Sport, frontend developer in eXact learning solutions e lavori freelance per aziende del territorio.',
      'Progettiamo e gestiamo anche prodotti nostri: una piattaforma di prenotazioni sanitarie, un portale immobiliare con il suo CRM, un tracker di voli con app native, uno strumento per quiz basato sull’AI. Ci occupiamo di tutto il prodotto: il modello dei dati, i dettagli dell’interfaccia, la SEO, la scheda sull’App Store e anche le email di supporto. Se la tua idea è ancora uno schizzo su un tovagliolo, parliamone.',
    ],
    facts: [
      ['Fondatore', 'Redon Cela, 12+ anni di sviluppo web'],
      ['Base', 'Berlino, anche da remoto'],
      ['Lingue', 'Albanese, italiano, inglese'],
      ['Focus', 'Vue/Nuxt, TypeScript, Firebase, Kotlin, agenti AI e MCP'],
    ],
  },
  sq: {
    bio: [
      'Red Zone Labs është një studio softueri me bazë në Berlin. Projektojmë, ndërtojmë dhe menaxhojmë platforma web, aplikacione mobile dhe asistentë AI, dhe e çojmë një produkt nga skica e parë deri te klientët e parë që paguajnë.',
      'Studion e themeloi Redon Cela, inxhinier senior me mbi 12 vjet përvojë në ndërtimin e aplikacioneve web. Redoni punon edhe te Bettermile (pjesë e GLS) në softuerin e shpërndarjes last-mile që përdoret nga depot dhe korrierët në gjithë Evropën, ku drejton zhvillimin e Bekki-t, asistentit AI të kompanisë. Më parë kaloi gjashtë vjet në Xhenova: zhvillues full-stack te USA College Sport, frontend developer te eXact learning solutions dhe freelancer për biznese vendase.',
      'Ndërtojmë dhe menaxhojmë edhe produktet tona: një platformë rezervimesh shëndetësore, një portal pasurish të paluajtshme me CRM-në e vet, një tracker fluturimesh me aplikacione native, një mjet kuizesh me AI. Kujdesemi për të gjithë produktin: modelin e të dhënave, detajet e ndërfaqes, SEO-në, faqen në App Store dhe email-et e suportit më pas. Nëse ideja jote është ende një skicë në letër, le të flasim.',
    ],
    facts: [
      ['Themeluesi', 'Redon Cela, 12+ vjet në zhvillimin web'],
      ['Baza', 'Berlin, edhe në distancë'],
      ['Gjuhët', 'Shqip, italisht, anglisht'],
      ['Fokusi', 'Vue/Nuxt, TypeScript, Firebase, Kotlin, agjentë AI dhe MCP'],
    ],
  },
};
