import GrainlineMark from "./GrainlineMark";
import SectionEyebrow from "./SectionEyebrow";

const pillars = [
  {
    tag: "MÅL",
    title: "Systemagnostisk",
    text: "Vi møter deg der du er. Eksisterende systemer, datamodeller og interne verktøy, AI-verktøyene bygges rundt din virksomhet, ikke omvendt.",
  },
  {
    tag: "SNITT",
    title: "Skreddersydd funksjon",
    text: "Ingen unødvendige funksjoner, ingen lisenskostnader for det du aldri bruker. Løsningen gjør akkurat det din bedrift trenger, ingenting mer.",
  },
  {
    tag: "SØM",
    title: "Kommersiell kjerne",
    text: "Vi bygger ikke teknologi for teknologiens skyld. Hvert valg er forankret i én ting: økt kommersiell verdi for virksomheten din.",
  },
];

export default function Approach() {
  return (
    <section id="tilnærming" className="bg-ink px-6 py-28 text-paper">
      <div className="mx-auto max-w-[1180px]">
        <SectionEyebrow label="Vår tilnærming" />

        <blockquote className="mt-6 max-w-[820px] text-[27px] font-bold leading-[1.35] sm:text-[36px]">
          De fleste selger deg en boks. Vi bygger løsningen som passer{" "}
          <span style={{ color: "var(--chalk)" }}>akkurat</span> din virksomhet.
        </blockquote>

        <p className="mt-6 max-w-[680px] text-[16px] leading-[1.7] text-[var(--paper-70)]">
          De fleste AI-verktøyene på markedet er bygget for å passe alle, og er som oftest
          ikke perfekt for din bedrift. Vi tar en annen tilnærming. Uansett hvilke systemer
          du bruker i dag, skreddersyr vi AI-løsninger som integrerer sømløst, tilpasses din
          arbeidsflyt og leverer kommersiell verdi fra dag én.
        </p>

        <div className="mt-16 grid grid-cols-1 gap-4 sm:grid-cols-3">
          {pillars.map((pillar) => (
            <div
              key={pillar.title}
              className="rounded-box border border-[var(--line-inverse)] p-8"
            >
              <div className="flex items-center gap-2.5">
                <GrainlineMark size={18} className="shrink-0 text-[var(--chalk)]" />
                <h3 className="text-[17px] font-semibold">{pillar.title}</h3>
              </div>
              <p className="mt-1.5 font-mono text-[11px] uppercase tracking-[0.14em] text-[var(--chalk)]">
                {pillar.tag}
              </p>
              <p className="mt-3 text-[14.5px] leading-[1.6] text-[var(--paper-45)]">{pillar.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
