const cards = [
  {
    index: "01",
    title: "Innholdsagent",
    text: "AI som skriver, kvalitetssikrer og publiserer produkttekster og kategorisider automatisk — tilpasset merkevare, tone og SEO-krav.",
  },
  {
    index: "02",
    title: "Kunnskapsplattform",
    text: "Intern AI med tilgang til produkter, videoer og dokumentasjon — svarer ansatte og kunder i sanntid med presis, kontekstuell informasjon.",
  },
  {
    index: "03",
    title: "Serviceagent",
    text: "Autonom kundeservice integrert mot ordresystem og FAQ — håndterer henvendelser selvstendig og eskalerer til menneske når nødvendig.",
  },
  {
    index: "04",
    title: "Innholdspipeline",
    text: "Automatisert SEO-produksjon fra søkedata til publisert innhold — uten manuell innsats. Henter søkeintensjoner, genererer innhold og sender direkte til CMS.",
    span: true,
  },
  {
    index: "05",
    title: "Logistikkagent",
    text: "AI som overvåker, koordinerer og optimaliserer logistikkflyt — integrert mot lagersystem og leverandører for sanntidsstyring.",
  },
  {
    index: "06",
    title: "Markedsføringsagent",
    text: "Autonom agent som planlegger, produserer og distribuerer kampanjeinnhold på tvers av kanaler — basert på målgruppe, sesong og ytelsesdata.",
  },
];

export default function Delivered() {
  return (
    <section id="levert" className="px-6 py-28">
      <div className="mx-auto max-w-[1180px]">
        <p className="text-[13px] font-medium tracking-wide text-[var(--cyan)]">
          Løsninger vi har levert
        </p>
        <h2 className="mt-3 text-[36px] font-semibold sm:text-[44px]">Det vi har bygget.</h2>
        <p className="mt-4 max-w-[560px] text-[16px] leading-[1.6] text-[var(--w45)]">
          Et utvalg av AI-systemer vi har designet, utviklet og satt i produksjon for reelle
          virksomheter.
        </p>

        <div className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {cards.map((card) => (
            <div
              key={card.index}
              className={`group relative overflow-hidden rounded-2xl border border-[var(--brd)] bg-[var(--bg-2)] p-7 transition-colors hover:bg-[var(--bg-3)] ${
                card.span ? "lg:col-span-2" : ""
              }`}
            >
              <div
                className="pointer-events-none absolute inset-x-0 bottom-0 h-px scale-x-0 bg-[var(--cyan)] opacity-0 transition-all duration-300 group-hover:scale-x-100 group-hover:opacity-60"
              />
              <span className="text-[13px] font-medium text-[var(--cyan)]">{card.index}</span>
              <h3 className="mt-4 text-[18px] font-semibold">{card.title}</h3>
              <p className="mt-2.5 text-[14.5px] leading-[1.6] text-[var(--w45)]">{card.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
