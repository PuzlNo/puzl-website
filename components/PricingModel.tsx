import type { CSSProperties } from "react";
import SectionEyebrow from "./SectionEyebrow";

// DRAFT — describes an actual commercial/pricing model, not just marketing
// copy. Needs review/confirmation against the real terms before shipping as
// final (same treatment as the "Slik jobber vi" phases draft on /tjenester).

const AXIS_LABELS = [
  { x: 20, label: "År 1" },
  { x: 200, label: "År 2" },
  { x: 380, label: "År 3" },
  { x: 560, label: "År 4" },
];

// Puzl: one step up at t=0 (the one-time payment), then flat forever.
// Path length below is hand-computed (80 vertical + 560 horizontal = 640)
// and fed into the existing .grainline-draw dash-reveal animation via
// --dash, the same technique GrainlineMark uses for its one-time draw-in.
const PUZL_PATH = "M20,260 L20,180 L580,180";
const PUZL_PATH_LENGTH = 640;

// Other tools: a compounding curve that accelerates and exits the top of
// the frame before the axis ends, reading as "keeps growing, unbounded."
const SAAS_PATH =
  "M20,255 C150,245 250,220 320,180 C400,135 440,70 480,10 C500,-20 520,-60 540,-110";

export default function PricingModel() {
  return (
    <section className="border-t border-[var(--line)] px-6 py-28">
      <div className="mx-auto max-w-[1180px]">
        <SectionEyebrow label="Kostnadsbildet" />
        <h2 className="mt-4 max-w-[680px] text-[32px] font-bold leading-[1.2] sm:text-[38px]">
          Du betaler én gang, ikke hver måned
        </h2>
        <p className="mt-4 max-w-[640px] text-[16px] leading-[1.7] text-[var(--ink-45)]">
          De fleste AI- og SaaS-verktøy er løpende kostnader som vokser år for år. Slik
          ser forskjellen ut over tid.
        </p>

        <div className="mt-10 flex flex-wrap gap-x-8 gap-y-3">
          <div className="flex items-center gap-2.5">
            <span className="h-2 w-2 rounded-full bg-[var(--error)]" />
            <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-[var(--ink-45)]">
              Andre AI- og SaaS-verktøy
            </span>
          </div>
          <div className="flex items-center gap-2.5">
            <span className="h-2 w-2 rounded-full bg-[var(--chalk)]" />
            <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-[var(--chalk)]">
              Puzl
            </span>
          </div>
        </div>

        <svg viewBox="0 0 600 340" className="mt-8 h-auto w-full" aria-hidden="true">
          <line x1="0" y1="260" x2="600" y2="260" stroke="var(--line)" strokeWidth="1" />
          {AXIS_LABELS.map(({ x }) => (
            <line key={x} x1={x} y1="260" x2={x} y2="266" stroke="var(--line)" strokeWidth="1" />
          ))}

          <path
            d={SAAS_PATH}
            fill="none"
            stroke="var(--error)"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeOpacity="0.75"
            className="flow-line is-flowing"
          />
          <path
            d={PUZL_PATH}
            fill="none"
            stroke="var(--chalk)"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="grainline-draw"
            style={{ "--dash": PUZL_PATH_LENGTH } as CSSProperties}
          />

          {AXIS_LABELS.map(({ x, label }) => (
            <text
              key={label}
              x={x}
              y="288"
              fill="currentColor"
              className="font-mono text-[var(--ink-45)] uppercase tracking-[0.1em]"
              style={{ fontSize: "12px" }}
            >
              {label}
            </text>
          ))}
        </svg>

        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2">
          <p className="text-[14.5px] leading-[1.6] text-[var(--ink-45)]">
            Løpende abonnement. Kostnaden fortsetter å øke år etter år, uten at du
            noensinne eier løsningen.
          </p>
          <p className="text-[14.5px] leading-[1.6] text-ink">
            Én betaling for systemet. Kostnaden flater ut med én gang, og deretter er
            det ditt.
          </p>
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
