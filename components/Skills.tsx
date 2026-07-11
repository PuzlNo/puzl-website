const skills = [
  "Dynamisk RAG-infrastruktur",
  "Multi-agent orkestrering",
  "Agentic Data Lakehouse",
  "LLM-optimalisering & prompt-design",
  "Vektordatabaser & embedding-pipelines",
  "Automasjon med kommersiell intent",
  "MCP-server & tool-use arkitektur",
  "AI-drevet innholdspipeline",
  "Multisystem-integrasjon via MCP / API / CLI",
  "Kontekststyrt agent-minne & state management",
  "Observability & evalueringsrammeverk",
  "Skalerbar serverless AI-infrastruktur",
  "SEO-, AIO- & GEO-optimalisering",
  "AI-drevet systemarkitektur",
  "Kommersiell vekstinfrastruktur",
];

export default function Skills() {
  return (
    <section id="kompetanse" className="px-6 py-28">
      <div className="mx-auto max-w-[1180px]">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
          <div>
            <p className="text-[13px] font-medium tracking-wide text-[var(--cyan)]">
              Kompetanse
            </p>
            <h2 className="mt-3 text-[36px] font-semibold sm:text-[44px]">
              Teknologien under panseret.
            </h2>
          </div>
          <div className="border-l border-[var(--brd)] pl-7">
            <p className="text-[15px] leading-[1.7] text-[var(--w45)]">
              Vi kombinerer avanserte datamodeller med kommersiell forståelse. Det tekniske er
              aldri et mål i seg selv — det er det som gjør at løsningene skalerer, integrerer
              og leverer verdi over tid.
            </p>
          </div>
        </div>

        <div className="mt-14 grid grid-cols-2 gap-px overflow-hidden rounded-2xl bg-[var(--brd)] sm:grid-cols-3 lg:grid-cols-5">
          {skills.map((skill) => (
            <div
              key={skill}
              className="group flex items-center gap-2.5 bg-[var(--bg-2)] p-5 transition-colors hover:bg-[var(--bg-3)]"
            >
              <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--cyan)] opacity-45 transition-opacity group-hover:opacity-100" />
              <span className="text-[13.5px] leading-[1.4] text-[var(--w45)] transition-colors group-hover:text-[var(--w100)]">
                {skill}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
