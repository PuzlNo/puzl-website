import SectionEyebrow from "./SectionEyebrow";

// DRAFT — describes an actual commercial/pricing model, not just marketing
// copy. Needs review/confirmation against the real terms before shipping as
// final (same treatment as the "Slik jobber vi" phases draft on /tjenester).

export default function PricingModel() {
  return (
    <section className="border-t border-[var(--line)] px-6 py-28">
      <div className="mx-auto max-w-[1180px]">
        <SectionEyebrow label="Kostnadsbildet" />
        <h2 className="mt-4 max-w-[680px] text-[32px] font-bold leading-[1.2] sm:text-[38px]">
          Du betaler én gang, ikke hver måned
        </h2>
        <p className="mt-4 max-w-[640px] text-[16px] leading-[1.7] text-[var(--ink-45)]">
          De fleste AI- og SaaS-verktøy er løpende kostnader. Slik ser forskjellen ut i
          praksis.
        </p>

        <div className="mt-16 grid grid-cols-1 gap-14 sm:grid-cols-2 sm:gap-0">
          <div className="sm:pr-12">
            <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-[var(--ink-45)]">
              Andre AI- og SaaS-verktøy
            </p>
            <svg viewBox="0 0 280 32" className="mt-7 h-8 w-full max-w-[320px]" aria-hidden="true">
              <line
                x1="0"
                y1="16"
                x2="240"
                y2="16"
                stroke="var(--error)"
                strokeWidth="2"
                strokeOpacity="0.55"
                className="flow-line is-flowing"
              />
              <circle cx="254" cy="16" r="2" fill="var(--error)" fillOpacity="0.5" />
              <circle cx="264" cy="16" r="2" fill="var(--error)" fillOpacity="0.5" />
              <circle cx="274" cy="16" r="2" fill="var(--error)" fillOpacity="0.5" />
            </svg>
            <p className="mt-5 text-[14.5px] leading-[1.6] text-[var(--ink-45)]">
              Løpende abonnement. Betaling hver måned, år etter år, uten at du noensinne
              eier løsningen.
            </p>
          </div>

          <div className="sm:border-l sm:border-[var(--line)] sm:pl-12">
            <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-[var(--chalk)]">
              Puzl
            </p>
            <svg viewBox="0 0 120 32" className="mt-7 h-8 w-full max-w-[320px]" aria-hidden="true">
              <line x1="0" y1="16" x2="88" y2="16" stroke="var(--chalk)" strokeWidth="2.5" />
              <circle cx="98" cy="16" r="6" fill="var(--chalk)" />
            </svg>
            <p className="mt-5 text-[14.5px] leading-[1.6] text-ink">
              Én betaling for systemet. Deretter er det ditt.
            </p>
          </div>
        </div>

        <p className="mt-14 max-w-[680px] text-[16px] leading-[1.7] text-[var(--ink-45)]">
          Du betaler én gang for systemet, og vi følger opp med support og vedlikehold
          som en del av leveransen, uten løpende kostnader. Over tid blir dette
          betydelig rimeligere enn å leie flere generiske verktøy, samtidig som
          løsningen er skreddersydd akkurat til dine systemer.
        </p>
      </div>
    </section>
  );
}
