import SectionEyebrow from "./SectionEyebrow";

const cards = [
  {
    tag: "Innhold",
    title: "Innholdsagent",
    text: "AI som skriver, kvalitetssikrer og publiserer produkttekster og kategorisider automatisk — tilpasset merkevare, tone og SEO-krav.",
  },
  {
    tag: "Kunnskap",
    title: "Kunnskapsplattform",
    text: "Intern AI med tilgang til produkter, videoer og dokumentasjon — svarer ansatte og kunder i sanntid med presis, kontekstuell informasjon.",
  },
  {
    tag: "Service",
    title: "Serviceagent",
    text: "Autonom kundeservice integrert mot ordresystem og FAQ — håndterer henvendelser selvstendig og eskalerer til menneske når nødvendig.",
  },
  {
    tag: "Pipeline",
    title: "Innholdspipeline",
    text: "Automatisert SEO-produksjon fra søkedata til publisert innhold — uten manuell innsats. Henter søkeintensjoner, genererer innhold og sender direkte til CMS.",
  },
  {
    tag: "Logistikk",
    title: "Logistikkagent",
    text: "AI som overvåker, koordinerer og optimaliserer logistikkflyt — integrert mot lagersystem og leverandører for sanntidsstyring.",
  },
  {
    tag: "Marked",
    title: "Markedsføringsagent",
    text: "Autonom agent som planlegger, produserer og distribuerer kampanjeinnhold på tvers av kanaler — basert på målgruppe, sesong og ytelsesdata.",
  },
];

function RegistrationMark() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true" className="text-[var(--ink-25)] group-hover:text-[var(--chalk)] transition-colors">
      <circle cx="7" cy="7" r="5.2" stroke="currentColor" strokeWidth="1" />
      <line x1="7" y1="0.5" x2="7" y2="3.4" stroke="currentColor" strokeWidth="1" />
      <line x1="7" y1="10.6" x2="7" y2="13.5" stroke="currentColor" strokeWidth="1" />
      <line x1="0.5" y1="7" x2="3.4" y2="7" stroke="currentColor" strokeWidth="1" />
      <line x1="10.6" y1="7" x2="13.5" y2="7" stroke="currentColor" strokeWidth="1" />
    </svg>
  );
}

export default function Delivered() {
  return (
    <section id="levert" className="border-y border-[var(--line)] bg-paper-2 px-6 py-28">
      <div className="mx-auto max-w-[1180px]">
        <SectionEyebrow label="Løsninger vi har levert" />
        <h2 className="mt-4 text-[36px] font-semibold sm:text-[44px]">Det vi har bygget.</h2>
        <p className="mt-4 max-w-[560px] text-[16px] leading-[1.6] text-[var(--ink-45)]">
          Et utvalg av AI-systemer vi har designet, utviklet og satt i produksjon for reelle
          virksomheter.
        </p>

        <div className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {cards.map((card) => (
            <div
              key={card.title}
              className="group relative overflow-hidden border border-[var(--line)] bg-paper p-7 transition-colors hover:bg-[var(--paper-3)]"
            >
              <div className="flex items-start justify-between">
                <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-[var(--chalk)]">
                  {card.tag}
                </span>
                <RegistrationMark />
              </div>
              <h3 className="mt-4 text-[18px] font-semibold">{card.title}</h3>
              <p className="mt-2.5 text-[14.5px] leading-[1.6] text-[var(--ink-45)]">{card.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
