import SectionEyebrow from "./SectionEyebrow";

const groups = [
  {
    label: "Infrastruktur",
    items: [
      "Dynamisk RAG-infrastruktur",
      "Agentic Data Lakehouse",
      "Vektordatabaser & embedding-pipelines",
      "Skalerbar serverless AI-infrastruktur",
      "AI-drevet systemarkitektur",
    ],
  },
  {
    label: "Agentarkitektur",
    items: [
      "Multi-agent orkestrering",
      "LLM-optimalisering & prompt-design",
      "MCP-server & tool-use arkitektur",
      "Kontekststyrt agent-minne & state management",
      "Observability & evalueringsrammeverk",
    ],
  },
  {
    label: "Integrasjon",
    items: [
      "Multisystem-integrasjon via MCP / API / CLI",
      "Automasjon med kommersiell intent",
      "AI-drevet innholdspipeline",
    ],
  },
  {
    label: "Vekst",
    items: ["SEO-, AIO- & GEO-optimalisering", "Kommersiell vekstinfrastruktur"],
  },
];

export default function Skills() {
  return (
    <section id="kompetanse" className="px-6 py-28">
      <div className="mx-auto max-w-[1180px]">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
          <div>
            <SectionEyebrow label="Dette leverer vi" />
            <h2 className="mt-4 text-[36px] font-semibold sm:text-[44px]">
              Teknologien under panseret.
            </h2>
          </div>
          <div className="border-l border-[var(--line)] pl-7">
            <p className="text-[15px] leading-[1.7] text-[var(--ink-45)]">
              Vi kombinerer avanserte datamodeller med kommersiell forståelse. Det tekniske er
              aldri et mål i seg selv — det er det som gjør at løsningene skalerer, integrerer
              og leverer verdi over tid.
            </p>
          </div>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-10 sm:grid-cols-2">
          {groups.map((group) => (
            <div key={group.label}>
              <p className="border-b border-[var(--line)] pb-3 font-mono text-[12px] uppercase tracking-[0.14em] text-[var(--chalk)]">
                {group.label}
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <span
                    key={item}
                    className="rounded-sm border border-[var(--line)] px-3 py-1.5 text-[13.5px] leading-[1.4] text-[var(--ink-70)] transition-colors hover:border-[var(--chalk-brd)] hover:text-ink"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
