import type { Metadata } from "next";
import Footer from "@/components/Footer";
import SectionEyebrow from "@/components/SectionEyebrow";
import GrainlineMark from "@/components/GrainlineMark";
import JsonLd from "@/components/JsonLd";
import { breadcrumbJsonLd } from "@/lib/structured-data";
import { pillars, experience } from "@/lib/about";

const breadcrumbs = breadcrumbJsonLd([
  { name: "Hjem", path: "/" },
  { name: "Om oss", path: "/om-oss" },
]);

export const metadata: Metadata = {
  title: "Om oss",
  description:
    "Hvorfor Puzl finnes, og hvordan vi jobber med skreddersydde AI-løsninger.",
};



export default function OmOssPage() {
  return (
    <>
      <JsonLd data={breadcrumbs} />
      <main className="flex-1 pb-28">
        <section className="px-6 pt-32 sm:pt-36">
          <div className="mx-auto max-w-[1180px]">
            <SectionEyebrow label="Om oss" />
            <h1 className="mt-4 max-w-[720px] text-[36px] font-bold leading-[1.15] sm:text-[44px]">
              Vi bygger AI som passer virksomheten din. Ikke omvendt
            </h1>
            <p className="mt-6 max-w-[680px] text-[16px] leading-[1.7] text-[var(--ink-45)]">
              Puzl bygger skreddersydde AI-løsninger for virksomheter som er lei av å
              tilpasse seg programvaren sin. Vi selger ikke en boks. Vi bygger løsningen
              som passer akkurat din virksomhet, fra første linje kode.
            </p>
          </div>
        </section>

        <section className="mt-20 bg-ink px-6 py-28 text-paper">
          <div className="mx-auto max-w-[1180px]">
            <SectionEyebrow label="Hvorfor vi finnes" />
            <blockquote className="mt-6 max-w-[820px] text-[24px] font-bold leading-[1.4] sm:text-[30px]">
              Markedet flommer over av generiske AI-verktøy bygget for å passe alle
              virksomheter samtidig. Problemet er at{" "}
              <span style={{ color: "var(--chalk)" }}>&laquo;alle virksomheter&raquo;</span>{" "}
              ikke finnes.
            </blockquote>
            <p className="mt-6 max-w-[680px] text-[16px] leading-[1.7] text-[var(--paper-70)]">
              Det finnes bare din virksomhet, med dine systemer, dine kunder og dine
              prosesser. Et generisk verktøy tvinger deg til å tilpasse arbeidsflyten
              din til programvaren. Det betyr kompromisser: funksjoner du aldri bruker
              men betaler for, integrasjoner som nesten fungerer, og en løsning som
              passer middels for alle i stedet for perfekt for deg.
            </p>
            <p className="mt-6 max-w-[680px] text-[16px] leading-[1.7] text-[var(--paper-70)]">
              Vi startet Puzl fordi vi mener det finnes en bedre vei. Skreddersydd AI
              koster mer å bygge i starten, men mindre å drifte over tid, fordi den er
              bygget for akkurat de systemene, den arbeidsflyten og de målene
              virksomheten din faktisk har.
            </p>
          </div>
        </section>

        <section className="px-6 py-28">
          <div className="mx-auto max-w-[1180px]">
            <SectionEyebrow label="Erfaringen bak" />
            <h2 className="mt-4 max-w-[720px] text-[32px] font-bold leading-[1.2] sm:text-[38px]">
              Skreddersøm krever at man har sydd før
            </h2>
            <p className="mt-6 max-w-[680px] text-[16px] leading-[1.7] text-[var(--ink-45)]">
              Netthandel er vår spisskompetanse, og der har vi jobbet lengst og
              dypest. Men kompetansen som faktisk ligger bak, å kommersialisere en
              virksomhet på nett, er ikke låst til én bransje. En bilforhandler kan
              ha like stor nytte av en AI-drevet kundeserviceagent.
            </p>

            <div className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {experience.map((card) => (
                <div
                  key={card.title}
                  className="rounded-box border border-[var(--line)] bg-paper p-7 transition-colors hover:bg-[var(--paper-3)]"
                >
                  <div className="flex items-center gap-2.5">
                    <GrainlineMark size={18} className="shrink-0 text-[var(--chalk)]" />
                    <h3 className="text-[18px] font-semibold">{card.title}</h3>
                  </div>
                  <p className="mt-1.5 font-mono text-[11px] uppercase tracking-[0.12em] text-[var(--chalk)]">
                    {card.tag}
                  </p>
                  <p className="mt-2.5 text-[14.5px] leading-[1.6] text-[var(--ink-45)]">{card.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="border-t border-[var(--line)] px-6 py-28">
          <div className="mx-auto max-w-[1180px]">
            <SectionEyebrow label="Hvordan vi jobber" />
            <h2 className="mt-4 text-[32px] font-bold sm:text-[38px]">
              Tre prinsipper, ingen unntak
            </h2>

            <div className="mt-14 flex flex-col gap-10">
              {pillars.map((pillar) => (
                <div key={pillar.title} className="max-w-[760px] border-t border-[var(--line)] pt-8">
                  <div className="flex items-center gap-2.5">
                    <GrainlineMark size={16} className="shrink-0 text-[var(--chalk)]" />
                    <h3 className="text-[20px] font-semibold">{pillar.title}</h3>
                  </div>
                  <p className="mt-1.5 font-mono text-[11px] uppercase tracking-[0.14em] text-[var(--chalk)]">
                    {pillar.tag}
                  </p>
                  <p className="mt-3 text-[15.5px] leading-[1.75] text-[var(--ink-45)]">
                    {pillar.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="border-t border-[var(--line)] px-6 py-20">
          <div className="mx-auto flex max-w-[1180px] flex-col items-start gap-5 sm:flex-row sm:items-center sm:justify-between">
            <h2 className="max-w-[480px] text-[26px] font-bold leading-[1.3] sm:text-[30px]">
              Vil du diskutere hvordan dette ser ut for din virksomhet?
            </h2>
            <a
              href="/kontakt"
              className="shrink-0 rounded-full bg-ink px-6 py-3 text-[15px] font-medium text-paper transition-colors hover:bg-[var(--thread)]"
            >
              Ta kontakt →
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
