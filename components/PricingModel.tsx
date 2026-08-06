import SectionEyebrow from "./SectionEyebrow";

// DRAFT — describes an actual commercial/pricing model, not just marketing
// copy. Needs review/confirmation against the real terms before shipping as
// final (same treatment as the "Slik jobber vi" phases draft on /tjenester).

export default function PricingModel() {
  return (
    <section className="px-6 py-28">
      <div className="mx-auto max-w-[1180px]">
        <SectionEyebrow label="Kostnadsbildet" />
        <div className="mt-8 rounded-box border border-[var(--chalk-brd)] bg-[var(--chalk-dim)] p-8 sm:p-10">
          <h2 className="max-w-[640px] text-[28px] font-bold leading-[1.25] sm:text-[34px]">
            Du eier løsningen, ikke abonnementet
          </h2>
          <p className="mt-5 max-w-[680px] text-[16px] leading-[1.7] text-[var(--ink-45)]">
            De fleste AI- og SaaS-verktøy er løpende abonnementer, du betaler år etter år
            for noe du aldri eier. Vi bygger annerledes: du betaler én gang for systemet,
            og vi følger opp med support og vedlikehold som en del av leveransen, uten
            løpende kostnader. Over tid blir dette betydelig rimeligere enn å leie flere
            generiske verktøy, samtidig som løsningen er skreddersydd akkurat til dine
            systemer.
          </p>
        </div>
      </div>
    </section>
  );
}
