/**
 * Structured content for /om-oss.
 *
 * Single source for both the page itself and the `search_site` WebMCP tool
 * (via `lib/agent-index.ts`). The page's narrative prose stays in the JSX;
 * only the card-shaped content lives here, since that is what is worth
 * returning to an agent as discrete, citable results.
 */

export type AboutCard = {
  /** Short uppercase label shown under the title, e.g. "SPENN". */
  tag: string;
  title: string;
  text: string;
};

/** The three operating principles under "Hvordan vi jobber". */
export const pillars: AboutCard[] = [
  {
    tag: "MÅL",
    title: "Systemagnostisk",
    text: "Vi møter deg der du er. Enten du har en etablert tech-stack, egne datamodeller bygget internt, eller en samling interne verktøy som har vokst organisk over år. Vi bygger AI-en rundt virksomheten din, ikke omvendt. Det betyr ingen tvungen migrering til et nytt økosystem, og ingen krav om at du må bytte ut systemer som allerede fungerer for deg. Vi integrerer der du allerede er.",
  },
  {
    tag: "SNITT",
    title: "Skreddersydd funksjon",
    text: "Ingen unødvendige features. Ingen lisenskostnader for funksjonalitet du aldri bruker. Når vi bygger en løsning for deg, gjør den akkurat det virksomheten din trenger, ingenting mer, ingenting mindre. Det holder løsningen enkel å forstå for de som skal bruke den, enkel å drifte for de som skal vedlikeholde den, og enkel å endre når behovene dine endrer seg over tid.",
  },
  {
    tag: "SØM",
    title: "Kommersiell kjerne",
    text: "Vi bygger ikke teknologi for teknologiens skyld. Hvert eneste valg vi tar, fra arkitektur til hvilken modell som brukes hvor, er forankret i én ting: økt kommersiell verdi for virksomheten din. En generisk løsning optimaliserer for å passe flest mulig kunder samtidig. Vi optimaliserer for å passe akkurat din.",
  },
];

/** Track-record cards under "Erfaringen bak". */
export const experience: AboutCard[] = [
  {
    tag: "SPENN",
    title: "Omsetningserfaring",
    text: "Vi har jobbet med virksomheter fra 0 til 250 millioner kroner i omsetning, fra tidlig fase til etablerte aktører med kompleks drift.",
  },
  {
    tag: "BAKGRUNN",
    title: "15+ års erfaring",
    text: "Over 15 års erfaring fra netthandel, kommersiell strategi og systemarkitektur. De fleste byråer er enten tekniske spesialister eller strategikonsulenter, sjelden begge deler samtidig.",
  },
  {
    tag: "VEKST",
    title: "Vekststrategi",
    text: "Vi har tatt en virksomhet fra 200 000 til 15 millioner kroner i omsetning på halvannet år, gjennom kommersiell strategi fremfor tilfeldige eksperimenter.",
  },
  {
    tag: "DRIFT",
    title: "Effektivisering",
    text: "Vi har effektivisert og bygget om eksisterende systemer på måter som har spart virksomheter for titalls millioner kroner og flere års arbeid.",
  },
  {
    tag: "ARKITEKTUR",
    title: "Systemarkitektur for skalering",
    text: "Systemarkitekturen vi bygger er alltid rigget for vekst, ikke bare for å løse dagens problem, men for at virksomheten skal kunne bruke tiden sin på salg og utvikling i stedet for å drukne i drift når den vokser.",
  },
  {
    tag: "SYNLIGHET",
    title: "SEO/AIO/GEO-kompetanse",
    text: "Vi har dyp kompetanse på optimalisering for KI-drevne søk og generative motorer, og på beste praksis på tvers av plattformvalg, kodearkitektur og arbeidsflyt, blant annet hvordan nettbutikker bør bruke E-E-A-T og topical authority for å bygge organisk synlighet over tid.",
  },
];
