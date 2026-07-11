import GrainlineMark from "./GrainlineMark";

export default function Hero() {
  return (
    <section className="relative flex min-h-screen items-center overflow-hidden px-6 pt-16">
      <div
        className="pattern-grid pointer-events-none absolute inset-0"
        style={{
          maskImage: "radial-gradient(ellipse 80% 65% at 50% 40%, black 20%, transparent 80%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 80% 65% at 50% 40%, black 20%, transparent 80%)",
        }}
      />

      <div className="relative z-10 mx-auto grid w-full max-w-[1180px] grid-cols-1 items-center gap-12 lg:grid-cols-[auto_1fr]">
        <div className="hidden lg:flex flex-col items-center gap-3 text-ink">
          <GrainlineMark size={28} animated className="text-ink" />
          <p className="animate-fade-up font-mono text-[11px] uppercase tracking-[0.15em] text-[var(--ink-45)]" style={{ animationDelay: "0.5s" }}>
            Rett<br />på grad
          </p>
        </div>

        <div>
          <div
            className="animate-fade-up mb-7 inline-flex items-center gap-2 border-b border-[var(--chalk-brd)] pb-1 font-mono text-[12px] uppercase tracking-[0.1em] text-[var(--ink-70)]"
          >
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
            className="animate-fade-up mt-9 flex flex-col items-start gap-3 sm:flex-row sm:items-center"
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
      </div>
    </section>
  );
}
