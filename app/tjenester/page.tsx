import type { Metadata } from "next";
import Footer from "@/components/Footer";
import SectionEyebrow from "@/components/SectionEyebrow";
import GrainlineMark from "@/components/GrainlineMark";

export const metadata: Metadata = {
  title: "Tjenester",
  description:
    "Et utvalg av AI-løsningene Puzl bygger og skreddersyr til virksomheten din.",
};

const services = [
  {
    tag: "Innhold",
    title: "Innholdsagent",
    summary:
      "AI som skriver, kvalitetssikrer og publiserer produkttekster og kategorisider automatisk — tilpasset merkevare, tone og SEO-krav.",
    detail:
      "Bedrifter med store produktkataloger eller mange kategorisider bruker uforholdsmessig mye tid på å skrive og vedlikeholde tekst manuelt — ofte med inkonsistent tone og SEO som henger etter. Innholdsagenten trenes på virksomhetens egen tone of voice og produktdata, skriver og kvalitetssikrer utkast mot etablerte merkevareretningslinjer, og publiserer direkte til det CMS-et eller PIM-systemet dere allerede bruker. Det er ikke en generisk tekstgenerator satt på toppen — den er bygget rundt katalogen og retningslinjene deres. Passer godt for nettbutikker, forhandlere og markedsplasser med løpende innholdsbehov.",
  },
  {
    tag: "Kunnskap",
    title: "Kunnskapsplattform",
    summary:
      "Intern AI med tilgang til produkter, videoer og dokumentasjon — svarer ansatte og kunder i sanntid med presis, kontekstuell informasjon.",
    detail:
      "Kunnskap havner ofte spredt over mange systemer — dokumentasjon, videoer, produktdata — og ansatte og kunder bruker unødvendig tid på å lete, mens support-team svarer på de samme spørsmålene om igjen. Kunnskapsplattformen bygges på virksomhetens egne kilder, henter og kombinerer informasjon fra flere systemer i sanntid, og gir presise, kontekstuelle svar i stedet for generiske gjetninger. Den kobles mot akkurat den dokumentasjonen og de systemene dere faktisk har, ikke en importert kunnskapsbase. Passer godt for virksomheter med komplekse produkter eller tjenester, intern onboarding, og kundesupport med høyt volum av gjentakende spørsmål.",
  },
  {
    tag: "Service",
    title: "Serviceagent",
    summary:
      "Autonom kundeservice integrert mot ordresystem og FAQ — håndterer henvendelser selvstendig og eskalerer til menneske når nødvendig.",
    detail:
      "Kundeserviceteam oversvømmes ofte av repeterende henvendelser — ordrestatus, retur, bytte — og lang svartid frustrerer kunder som venter på enkle svar. Serviceagenten integreres direkte mot ordresystemet og FAQ-en deres, henter ordrestatus og svarer på vanlige spørsmål selvstendig, og utfører enkle handlinger uten å vente på en saksbehandler. Den er trent på å kjenne igjen når en sak er for kompleks eller sensitiv, og eskalerer da til et menneske med full kontekst i stedet for å la kunden gjenta seg selv. Passer godt for nettbutikker og abonnementsvirksomheter med høyt henvendelsesvolum og faste rutiner for eskalering.",
  },
  {
    tag: "Pipeline",
    title: "Innholdspipeline",
    summary:
      "Automatisert SEO-produksjon fra søkedata til publisert innhold — uten manuell innsats. Henter søkeintensjoner, genererer innhold og sender direkte til CMS.",
    detail:
      "SEO-innholdsproduksjon krever kontinuerlig research på søkeintensjon, og mange virksomheter mister vekstmuligheter fordi innholdsproduksjonen ikke følger søkevolum og trender tett nok. Innholdspipelinen overvåker søkedata løpende, identifiserer intensjoner med kommersielt potensial, genererer utkast tilpasset merkevarens tone, og publiserer direkte til CMS-et uten manuelle mellomledd i den daglige driften. Pipelinen kobles mot deres CMS og deres definisjon av relevante søkeord og marked — ikke en generisk SEO-bot som produserer for produksjonens skyld. Passer godt for virksomheter der organisk vekst er en uttalt kommersiell prioritet, og for større nettsteder med mange sider å vedlikeholde.",
  },
  {
    tag: "Logistikk",
    title: "Logistikkagent",
    summary:
      "AI som overvåker, koordinerer og optimaliserer logistikkflyt — integrert mot lagersystem og leverandører for sanntidsstyring.",
    detail:
      "Lagerstyring og leverandørkoordinering er ofte reaktivt: avvik oppdages for sent, og manuell koordinering mellom systemer skaper flaskehalser når volumet øker. Logistikkagenten overvåker lagerbeholdning og leverandørstatus kontinuerlig, varsler og handler proaktivt på avvik, og koordinerer mellom flere systemer slik at beslutninger tas i sanntid i stedet for i etterkant. Den bygges rundt akkurat deres lagersystem og leverandørkjede, ikke som en generisk tilleggsmodul til et standard WMS. Passer godt for virksomheter med fysisk vareflyt, flere leverandører, eller flere lagerlokasjoner å holde synkronisert.",
  },
  {
    tag: "Marked",
    title: "Markedsføringsagent",
    summary:
      "Autonom agent som planlegger, produserer og distribuerer kampanjeinnhold på tvers av kanaler — basert på målgruppe, sesong og ytelsesdata.",
    detail:
      "Markedsføringsteam bruker mye tid på repeterende kampanjeproduksjon og -distribusjon på tvers av kanaler, og det er vanskelig å skalere personalisering uten å øke bemanningen proporsjonalt. Markedsføringsagenten planlegger kampanjer basert på sesong og målgruppedata, produserer innhold tilpasset hver enkelt kanal, og distribuerer og justerer løpende basert på ytelsesdata etter hvert som kampanjen kjører. Den settes opp mot deres kanaler, målgruppedefinisjoner og ytelsesmål — ikke en generisk kampanjemal. Passer godt for virksomheter med flere kampanjer eller kanaler samtidig, og sesongbaserte salgsmønstre.",
  },
];

// DRAFT — describes actual operational process, not pure marketing copy.
// Needs review/editing against how projects genuinely run before shipping as final.
const phases = [
  {
    title: "Oppdagelse / Kartlegging",
    text: "Vi starter med å forstå systemene, arbeidsflytene og dataene dere faktisk har — ikke med en ferdig løsning vi skal tilpasse i etterkant. Det innebærer samtaler med de som bruker systemene daglig, og en ærlig vurdering av hvor AI faktisk kan tilføre verdi. Noen ganger ender kartleggingen med at vi anbefaler noe mindre enn det som opprinnelig ble diskutert.",
  },
  {
    title: "Design / Skreddersøm",
    text: "Basert på kartleggingen definerer vi den konkrete løsningen: hvilke systemer den skal integreres med, hva den skal automatisere, og hvor grensen går for hva agenten gjør selv versus overlater til et menneske. Her blir «skreddersydd» konkret — en spesifikk spesifikasjon for akkurat deres virksomhet, ikke et prinsipp på et slide.",
  },
  {
    title: "Bygging / Implementering",
    text: "Vi bygger og integrerer mot systemene dere allerede bruker, og tester fortløpende mot reelle data og faktiske arbeidsflyter — ikke generiske testscenarioer. Dere ser fremdrift underveis, i stedet for å vente på et ferdig produkt ved slutten.",
  },
  {
    title: "Levering / Oppfølging",
    text: "Ved levering går vi gjennom løsningen sammen med teamet deres, slik at dere forstår hvordan den fungerer og kan justere den videre selv. Vi følger opp etter lansering, men vi er et lite team uten formaliserte SLA-er ennå — oppfølging avtales konkret per prosjekt, ikke som en generisk supportpakke.",
  },
];

export default function TjenesterPage() {
  return (
    <>
      <main className="flex-1 pb-28">
        <section className="px-6 pt-32 sm:pt-36">
          <div className="mx-auto max-w-[1180px]">
            <SectionEyebrow label="Tjenester" />
            <h1 className="mt-4 text-[36px] font-bold sm:text-[44px]">Hva vi bygger.</h1>
            <p className="mt-4 max-w-[640px] text-[16px] leading-[1.7] text-[var(--ink-45)]">
              Vi skreddersyr AI-løsninger til virksomheten din — ikke omvendt. Under er
              et utvalg av det vi bygger, og hvordan hver løsning tilpasses systemene og
              prosessene du allerede har.
            </p>
          </div>
        </section>

        <section className="px-6 py-16">
          <div className="mx-auto flex max-w-[1180px] flex-col gap-4">
            {services.map((service) => (
              <div
                key={service.title}
                className="rounded-box border border-[var(--line)] bg-paper p-8 sm:p-10"
              >
                <div className="flex items-center gap-2.5">
                  <GrainlineMark size={18} className="shrink-0 text-[var(--chalk)]" />
                  <h2 className="text-[21px] font-semibold">{service.title}</h2>
                </div>
                <p className="mt-1.5 font-mono text-[11px] uppercase tracking-[0.12em] text-[var(--chalk)]">
                  {service.tag}
                </p>
                <p className="mt-4 max-w-[760px] text-[16px] font-medium leading-[1.6] text-ink">
                  {service.summary}
                </p>
                <p className="mt-3 max-w-[760px] text-[14.5px] leading-[1.75] text-[var(--ink-45)]">
                  {service.detail}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="border-y border-[var(--line)] bg-paper-2 px-6 py-28">
          <div className="mx-auto max-w-[1180px]">
            <SectionEyebrow label="Slik jobber vi" />
            <h2 className="mt-4 text-[32px] font-bold sm:text-[38px]">
              Fra kartlegging til levering.
            </h2>
            <p className="mt-4 max-w-[640px] text-[16px] leading-[1.7] text-[var(--ink-45)]">
              Fire faser. Ingen snarveier, og ingen ferdigpakket løsning før vi har
              forstått hva dere faktisk trenger.
            </p>

            <div className="mt-14 grid grid-cols-1 gap-8 lg:grid-cols-4 lg:gap-6">
              {phases.map((phase, i) => (
                <div
                  key={phase.title}
                  className={
                    i > 0
                      ? "border-t border-dashed border-[var(--line)] pt-8 lg:border-t-0 lg:border-l lg:pt-0 lg:pl-8"
                      : ""
                  }
                >
                  <p className="font-mono text-[13px] text-[var(--chalk)]">0{i + 1}</p>
                  <h3 className="mt-2 text-[18px] font-semibold">{phase.title}</h3>
                  <p className="mt-3 text-[14.5px] leading-[1.7] text-[var(--ink-45)]">
                    {phase.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="px-6 py-20">
          <div className="mx-auto flex max-w-[1180px] flex-col items-start gap-5 sm:flex-row sm:items-center sm:justify-between">
            <h2 className="max-w-[480px] text-[26px] font-bold leading-[1.3] sm:text-[30px]">
              Vil du diskutere hvilken av disse som passer din virksomhet — eller noe
              helt annet?
            </h2>
            <a
              href="/kontakt"
              className="shrink-0 rounded-full bg-ink px-6 py-3 text-[15px] font-medium text-paper transition-colors hover:bg-[var(--thread)]"
            >
              Ta kontakt →
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
