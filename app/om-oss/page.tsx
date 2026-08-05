import type { Metadata } from "next";
import Footer from "@/components/Footer";
import SectionEyebrow from "@/components/SectionEyebrow";
import GrainlineMark from "@/components/GrainlineMark";

export const metadata: Metadata = {
  title: "Om oss",
  description:
    "Hvorfor Puzl finnes, og hvordan vi jobber med skreddersydde AI-løsninger.",
};

const pillars = [
  {
    tag: "MÅL",
    title: "Systemagnostisk",
    text: "Vi møter deg der du er. Enten du har en etablert tech-stack, egne datamodeller bygget internt, eller en samling interne verktøy som har vokst organisk over år — vi bygger AI-en rundt virksomheten din, ikke omvendt. Det betyr ingen tvungen migrering til et nytt økosystem, og ingen krav om at du må bytte ut systemer som allerede fungerer for deg. Vi integrerer der du allerede er.",
  },
  {
    tag: "SNITT",
    title: "Skreddersydd funksjon",
    text: "Ingen unødvendige features. Ingen lisenskostnader for funksjonalitet du aldri bruker. Når vi bygger en løsning for deg, gjør den akkurat det virksomheten din trenger — ingenting mer, ingenting mindre. Det holder løsningen enkel å forstå for de som skal bruke den, enkel å drifte for de som skal vedlikeholde den, og enkel å endre når behovene dine endrer seg over tid.",
  },
  {
    tag: "SØM",
    title: "Kommersiell kjerne",
    text: "Vi bygger ikke teknologi for teknologiens skyld. Hvert eneste valg vi tar — fra arkitektur til hvilken modell som brukes hvor — er forankret i én ting: økt kommersiell verdi for virksomheten din. En generisk løsning optimaliserer for å passe flest mulig kunder samtidig. Vi optimaliserer for å passe akkurat din.",
  },
];

export default function OmOssPage() {
  return (
    <>
      <main className="flex-1 pb-28">
        <section className="px-6 pt-32 sm:pt-36">
          <div className="mx-auto max-w-[1180px]">
            <SectionEyebrow label="Om oss" />
            <h1 className="mt-4 max-w-[720px] text-[36px] font-bold leading-[1.15] sm:text-[44px]">
              Vi bygger AI som passer virksomheten din — ikke omvendt.
            </h1>
            <p className="mt-6 max-w-[680px] text-[16px] leading-[1.7] text-[var(--ink-45)]">
              Puzl bygger skreddersydde AI-løsninger for virksomheter som er lei av å
              tilpasse seg programvaren sin. Vi selger ikke en boks. Vi bygger løsningen
              som passer akkurat din virksomhet — fra første linje kode.
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
              koster mer å bygge i starten, men mindre å drifte over tid — fordi den er
              bygget for akkurat de systemene, den arbeidsflyten og de målene
              virksomheten din faktisk har.
            </p>
          </div>
        </section>

        <section className="px-6 py-28">
          <div className="mx-auto max-w-[1180px]">
            <SectionEyebrow label="Erfaringen bak" />
            <h2 className="mt-4 max-w-[720px] text-[32px] font-bold leading-[1.2] sm:text-[38px]">
              Skreddersøm krever at man har sydd før.
            </h2>

            <div className="mt-8 flex max-w-[760px] flex-col gap-6 text-[16px] leading-[1.75] text-[var(--ink-45)]">
              <p>
                Vi har jobbet med virksomheter fra 0 til 250 millioner kroner i
                omsetning, og har over 15 års erfaring med netthandel, kommersiell
                strategi og systemarkitektur. Det er en kombinasjon du sjelden finner
                samlet — de fleste byråer er enten tekniske spesialister eller
                strategikonsulenter, sjelden begge deler samtidig. Det er denne
                kombinasjonen som gjør at skreddersøm faktisk er mulig i praksis, og
                ikke bare et ord på nettsiden.
              </p>
              <p>
                Den kommersielle siden handler om vekst som lar seg måle. Vi har blant
                annet tatt en virksomhet fra 200 000 til 15 millioner kroner i
                omsetning på halvannet år gjennom kommersiell strategi fremfor
                tilfeldige eksperimenter, og vi har effektivisert og bygget om
                eksisterende systemer på en måte som har spart virksomheter for
                titalls millioner kroner og flere års arbeid.
              </p>
              <p>
                Systemarkitekturen vi bygger er alltid rigget for vekst — ikke bare
                for å løse dagens problem, men for at virksomheten skal kunne bruke
                tiden sin på salg og utvikling i stedet for å drukne i drift når den
                vokser.
              </p>
              <p>
                Vi har også dyp kompetanse på SEO og AIO/GEO — optimalisering for
                KI-drevne søk og generative motorer — og på beste praksis på tvers av
                plattformvalg, kodearkitektur og arbeidsflyt for netthandel, blant
                annet hvordan nettbutikker bør bruke E-E-A-T og topical authority for
                å bygge organisk synlighet over tid.
              </p>
              <p>
                Netthandel er vår spisskompetanse, og der har vi jobbet lengst og
                dypest. Men kompetansen som faktisk ligger bak — å kommersialisere en
                virksomhet på nett — er ikke låst til én bransje. Den samme tenkingen
                som bygger en nettbutikk som konverterer, er det som gjør at for
                eksempel en bilforhandler kan ha nytte av en AI-drevet
                kundeserviceagent. Vi følger kompetansen, ikke en fast bransjemal.
              </p>
            </div>
          </div>
        </section>

        <section className="border-t border-[var(--line)] px-6 py-28">
          <div className="mx-auto max-w-[1180px]">
            <SectionEyebrow label="Hvordan vi jobber" />
            <h2 className="mt-4 text-[32px] font-bold sm:text-[38px]">
              Tre prinsipper, ingen unntak.
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
