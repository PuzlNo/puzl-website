/**
 * Canonical service catalogue.
 *
 * Single source for both the /tjenester page and the `get_services` WebMCP
 * tool (via `lib/agent-index.ts`). Add or edit services here only — nothing
 * downstream re-states this copy.
 */

export type Service = {
  /** Short category label shown above the title, e.g. "Innhold". */
  tag: string;
  title: string;
  /** One-sentence positioning line. */
  summary: string;
  /** Full description: the problem, how the service addresses it, who it fits. */
  detail: string;
};

export const services: Service[] = [
  {
    tag: "Innhold",
    title: "Innholdsagent",
    summary:
      "AI som skriver, kvalitetssikrer og publiserer produkttekster, bloggposter og kategoritekster automatisk, tilpasset merkevare, tone og SEO-krav.",
    detail:
      "Bedrifter med store produktkataloger eller mange kategorisider bruker uforholdsmessig mye tid på å skrive og vedlikeholde tekst manuelt, ofte med inkonsistent tone og SEO som henger etter. Innholdsagenten trenes på virksomhetens egen tone of voice og produktdata, skriver og kvalitetssikrer utkast mot etablerte merkevareretningslinjer, og publiserer direkte til det CMS-et eller PIM-systemet dere allerede bruker. Det er ikke en generisk tekstgenerator satt på toppen, den er bygget rundt katalogen og retningslinjene deres. Passer godt for nettbutikker, forhandlere og markedsplasser med løpende innholdsbehov.",
  },
  {
    tag: "Kunnskap",
    title: "Kunnskapsplattform",
    summary:
      "Intern AI med tilgang til produkter, videoer og dokumentasjon, svarer ansatte og kunder i sanntid med presis informasjon.",
    detail:
      "Kunnskap havner ofte spredt over mange systemer, dokumentasjon, videoer, produktdata, og ansatte og kunder bruker unødvendig tid på å lete, mens support-team svarer på de samme spørsmålene om igjen. Kunnskapsplattformen bygges på virksomhetens egne kilder, henter og kombinerer informasjon fra flere systemer i sanntid, og gir presise, kontekstuelle svar i stedet for generiske gjetninger. Den kobles mot akkurat den dokumentasjonen og de systemene dere faktisk har, ikke en importert kunnskapsbase. Passer godt for virksomheter med komplekse produkter eller tjenester, intern onboarding, og kundesupport med høyt volum av gjentakende spørsmål.",
  },
  {
    tag: "Service",
    title: "Serviceagent",
    summary:
      "Autonom kundeservice integrert mot ordresystem, produkter, dokumentasjon og kundedialoger, håndterer henvendelser selvstendig og presist mens den reduserer arbeidsmengden.",
    detail:
      "Kundeserviceteam oversvømmes ofte av repeterende henvendelser, ordrestatus, retur, bytte, og lang svartid frustrerer kunder som venter på enkle svar. Serviceagenten integreres mot ordresystemet, produktdatabasen og kunnskapsbasen deres, svarer selvstendig på vanlige spørsmål og utfører enkle handlinger uten å vente på en saksbehandler. Den refererer til tidligere lignende saker for konsistente svar, og slår opp hos produsenten når egen dokumentasjon ikke strekker til. Den kjenner igjen når en sak er for kompleks eller sensitiv, og eskalerer da til et menneske med full kontekst i stedet for å la kunden gjenta seg selv. Passer godt for nettbutikker og abonnementsvirksomheter med høyt henvendelsesvolum og faste rutiner for eskalering.",
  },
  {
    tag: "SEO/AIO",
    title: "Innholdspipeline",
    summary:
      "Automatisert SEO og AIO-produksjon fra søkedata til publisert innhold, uten manuell innsats. Henter søkeintensjoner, genererer innhold og sender direkte til nettsiden.",
    detail:
      "SEO-innholdsproduksjon krever kontinuerlig research på søkeintensjon, og mange virksomheter mister vekstmuligheter fordi innholdsproduksjonen ikke følger søkevolum og trender tett nok. Innholdspipelinen overvåker søkedata løpende, identifiserer intensjoner med kommersielt potensial, genererer utkast tilpasset merkevarens tone, og publiserer direkte til CMS-et uten manuelle mellomledd i den daglige driften. Pipelinen kobles mot deres CMS og deres definisjon av relevante søkeord og marked, ikke en generisk SEO-bot som produserer for produksjonens skyld. Passer godt for virksomheter der organisk vekst er en uttalt kommersiell prioritet, og for større nettsteder med mange sider å vedlikeholde.",
  },
  {
    tag: "Logistikk",
    title: "Logistikkagent",
    summary:
      "AI som overvåker, koordinerer, anbefaler og optimaliserer logistikkflyt, integrert mot lagersystem og leverandører for sanntidsstyring med salgs- og innkjøpsanbefaling.",
    detail:
      "Lagerstyring og leverandørkoordinering er ofte reaktivt: avvik oppdages for sent, og manuell koordinering mellom systemer skaper flaskehalser når volumet øker. Logistikkagenten overvåker lagerbeholdning og leverandørstatus kontinuerlig, varsler ansvarlige i teamet når noe krever handling, og beregner hva som bør bestilles basert på forbruk og leveringstid. Den peker også ut hvilke varer som bør prioriteres i salg, for eksempel lager som eldes eller ligger med overskudd. Den bygges rundt akkurat deres lagersystem og leverandørkjede, ikke som en generisk tilleggsmodul til et standard WMS. Passer godt for virksomheter med fysisk vareflyt, flere leverandører, eller flere lagerlokasjoner å holde synkronisert.",
  },
  {
    tag: "Marked",
    title: "Markedsføringsagent",
    summary:
      "Autonom agent som velger hvilke produkter som skal fremheves og foreslår salg og rabatter, og som produserer og distribuerer kampanjeinnhold på tvers av kanaler.",
    detail:
      "Markedsføringsteam bruker mye tid på repeterende kampanjeproduksjon og -distribusjon på tvers av kanaler, og det er vanskelig å skalere personalisering uten å øke bemanningen proporsjonalt. Markedsføringsagenten løser to oppgaver samtidig: den vurderer hvilke produkter som bør fremheves og foreslår salg, kampanjer og rabatter basert på sesong og målgruppedata, og den produserer selve innholdet, annonser, nyhetsbrev og innlegg til sosiale medier, og justerer løpende basert på ytelsesdata. Den settes opp mot deres kanaler, målgruppedefinisjoner og ytelsesmål, ikke en generisk kampanjemal. Passer godt for virksomheter med flere kampanjer eller kanaler samtidig, og sesongbaserte salgsmønstre.",
  },
];
