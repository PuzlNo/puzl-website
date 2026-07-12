import GrainlineMark from "./GrainlineMark";

export default function Hero() {
  return (
    <section className="relative overflow-hidden px-6 pt-40 pb-24 lg:pt-48 lg:pb-32">
      <div
        className="pattern-grid pointer-events-none absolute inset-0"
        style={{
          maskImage: "radial-gradient(ellipse 80% 65% at 50% 40%, black 20%, transparent 80%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 80% 65% at 50% 40%, black 20%, transparent 80%)",
        }}
      />

      <GrainlineMark
        strokeWidth={0.2}
        animated
        className="pointer-events-none absolute -right-8 top-1/2 hidden h-auto w-[220px] -translate-y-1/2 text-[var(--ink-12)] sm:block md:w-[300px] lg:w-[420px] xl:w-[520px]"
      />

      <div className="relative z-10 mx-auto flex max-w-[820px] flex-col items-center text-center">
        <div
          className="animate-fade-up mb-7 inline-flex items-center gap-2.5 border-b border-[var(--chalk-brd)] pb-1 font-mono text-[12px] uppercase tracking-[0.1em] text-[var(--ink-70)]"
        >
          <GrainlineMark size={14} className="text-[var(--chalk)]" />
          Skreddersydde AI-løsninger
        </div>

        <h1 className="animate-fade-up text-[42px] leading-[1.08] font-semibold sm:text-[64px]" style={{ animationDelay: "0.1s" }}>
          Ikke hyllevare.
          <br />
          <span style={{ color: "var(--chalk)" }}>Tilpasset AI.</span>
        </h1>

        <p
          className="animate-fade-up mt-6 max-w-[600px] text-[17px] leading-[1.6] text-[var(--ink-70)]"
          style={{ animationDelay: "0.2s" }}
        >
          Markedet flommer over av generiske verktøy bygget for å passe alle — og dermed
          perfekte for ingen. Vi bygger AI-løsninger skreddersydd til din bedrift, dine
          systemer og dine mål.
        </p>

        <div
          className="animate-fade-up mt-9 flex flex-col items-center gap-3 sm:flex-row"
          style={{ animationDelay: "0.3s" }}
        >
          <a
            href="#kontakt"
            className="rounded-full bg-ink px-6 py-3 text-[15px] font-medium text-paper transition-colors hover:bg-[var(--thread)]"
          >
            La oss ta en kaffe →
          </a>
          <a
            href="#levert"
            className="stitch-link px-1 py-3 text-[15px] font-medium text-ink"
          >
            Se hva vi har bygget
          </a>
        </div>
      </div>
    </section>
  );
}
