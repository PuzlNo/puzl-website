const pillars = [
  {
    title: "Systemagnostisk",
    text: "Vi møter deg der du er. Eksisterende stack, egne datamodeller, interne verktøy — AI-en bygges rundt din virksomhet, ikke omvendt.",
  },
  {
    title: "Skreddersydd funksjon",
    text: "Ingen unødvendige features, ingen lisenskostnader for det du aldri bruker. Løsningen gjør akkurat det din bedrift trenger — ingenting mer.",
  },
  {
    title: "Kommersiell kjerne",
    text: "Vi bygger ikke teknologi for teknologiens skyld. Hvert valg er forankret i én ting: økt kommersiell verdi for virksomheten din.",
  },
];

export default function Approach() {
  return (
    <section
      id="tilnærming"
      className="border-y border-[var(--brd)] bg-[var(--bg-2)] px-6 py-28"
    >
      <div className="mx-auto max-w-[1180px]">
        <p className="text-[13px] font-medium tracking-wide text-[var(--cyan)]">
          Vår tilnærming
        </p>

        <blockquote className="mt-6 max-w-[820px] text-[28px] font-semibold leading-[1.35] sm:text-[36px]">
          De fleste selger deg en boks. Vi bygger løsningen som passer{" "}
          <span style={{ color: "var(--cyan)" }}>akkurat</span> din virksomhet.
        </blockquote>

        <p className="mt-6 max-w-[680px] text-[16px] leading-[1.7] text-[var(--w45)]">
          Markedet flommer over av generiske SaaS-verktøy bygget for å passe alle — og dermed
          perfekte for ingen. Vi tar en annen tilnærming. Uansett hvilke systemer du bruker i
          dag, skreddersyr vi AI-løsninger som integrerer sømløst, tilpasses din arbeidsflyt og
          leverer kommersiell verdi fra dag én.
        </p>

        <div className="mt-16 grid grid-cols-1 rounded-2xl border border-[var(--brd)] sm:grid-cols-3">
          {pillars.map((pillar, i) => (
            <div
              key={pillar.title}
              className={`p-8 ${
                i !== 0 ? "border-t border-[var(--brd)] sm:border-t-0 sm:border-l" : ""
              }`}
            >
              <h3 className="text-[17px] font-semibold">{pillar.title}</h3>
              <p className="mt-3 text-[14.5px] leading-[1.6] text-[var(--w45)]">{pillar.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
