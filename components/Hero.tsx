export default function Hero() {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden px-6 pt-[62px]">
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
          maskImage: "radial-gradient(ellipse 70% 60% at 50% 30%, black 30%, transparent 75%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 70% 60% at 50% 30%, black 30%, transparent 75%)",
        }}
      />
      <div
        className="pointer-events-none absolute -top-40 right-[-10%] h-[560px] w-[560px] rounded-full opacity-40 blur-3xl"
        style={{ background: "radial-gradient(circle, var(--cyan) 0%, transparent 70%)" }}
      />

      <div className="relative z-10 mx-auto flex max-w-[820px] flex-col items-center text-center">
        <div
          className="animate-fade-up mb-7 inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-[13px] text-[var(--w70)]"
          style={{ borderColor: "var(--cbrd)", background: "var(--cdim)" }}
        >
          <span className="animate-pulse-dot h-1.5 w-1.5 rounded-full bg-[var(--cyan)]" />
          Skreddersydde AI-løsninger
        </div>

        <h1
          className="animate-fade-up text-[44px] leading-[1.08] font-semibold sm:text-[64px]"
          style={{ animationDelay: "0.1s" }}
        >
          Ikke hyllevare.
          <br />
          <span style={{ color: "var(--cyan)" }}>Custom AI.</span>
        </h1>

        <p
          className="animate-fade-up mt-6 max-w-[620px] text-[17px] leading-[1.6] text-[var(--w70)]"
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
            className="rounded-full bg-[var(--cyan)] px-6 py-3 text-[15px] font-medium text-[var(--bg)] transition-opacity hover:opacity-90"
          >
            La oss ta en kaffe →
          </a>
          <a
            href="#levert"
            className="rounded-full border border-[var(--w12)] px-6 py-3 text-[15px] font-medium text-[var(--w100)] transition-colors hover:border-[var(--w25)]"
          >
            Se hva vi har bygget
          </a>
        </div>
      </div>
    </section>
  );
}
