/**
 * Page-level descriptors for machine-readable surfaces.
 *
 * Single source for the one-line descriptions used by /llms.txt,
 * /llms-full.txt and the WebMCP search index (`lib/agent-index.ts`). Card- and
 * article-shaped content lives in `lib/services.ts`, `lib/about.ts` and
 * `content/posts`; this file only covers descriptions of the pages themselves,
 * which have no other structured home.
 */

import { SITE_URL } from "@/lib/structured-data";

export type PageDescriptor = {
  /** Site-relative path, e.g. "/tjenester". */
  path: string;
  title: string;
  /** One-line description, used verbatim in llms.txt link lists. */
  description: string;
  /**
   * Fuller text for the agent search index. Omitted where the page's real
   * content is already indexed from its own structured source.
   */
  searchText?: string;
};

export const pages = {
  home: {
    path: "/",
    title: "Puzl",
    description:
      "Forsiden: hva Puzl bygger, hvordan vi jobber, og hvem vi bygger for.",
  },
  tjenester: {
    path: "/tjenester",
    title: "Tjenester",
    description:
      "Katalogen over AI-løsningene Puzl bygger, med hva hver løsning gjør og hvilken type virksomhet den passer for.",
  },
  omOss: {
    path: "/om-oss",
    title: "Om oss",
    description:
      "Hvorfor Puzl finnes, de tre prinsippene som styrer alt vi bygger, og erfaringen bak.",
  },
  artikler: {
    path: "/artikler",
    title: "Artikler",
    description: "Publiserte artikler om skreddersydd AI, netthandel og automatisering.",
  },
  kontakt: {
    path: "/kontakt",
    title: "Kontakt",
    description:
      "Kontaktskjema og kontaktinformasjon. E-post: hei@puzl.no. Skjemaet kan også fylles ut av en agent via WebMCP-verktøyet submit_contact_form.",
    searchText:
      "Kontakt Puzl for å diskutere din neste AI-løsning. Ta kontakt om ditt neste prosjekt, så finner vi ut om vi er riktig match for det du prøver å bygge. E-post hei@puzl.no. LinkedIn: puzlno.",
  },
  personvern: {
    path: "/personvern",
    title: "Personvernerklæring",
    description:
      "Hvordan Puzl behandler personopplysninger sendt inn via kontaktskjemaet.",
    searchText:
      "Personvernerklæring. Puzl samler kun inn det du selv skriver i kontaktskjemaet: navn, e-post, eventuelt telefonnummer og melding. Ingen analyseverktøy, ingen sporing, ingen informasjonskapsler. Opplysningene brukes utelukkende til å svare på henvendelsen, sendes som e-post via Resend, deles ikke med tredjepart og brukes ikke til markedsføring. Du kan be om innsyn eller sletting ved å kontakte hei@puzl.no.",
  },
} as const satisfies Record<string, PageDescriptor>;

/** Absolute URL for a descriptor, for use in llms.txt link lists. */
export function pageUrl(page: PageDescriptor): string {
  return page.path === "/" ? SITE_URL : `${SITE_URL}${page.path}`;
}
