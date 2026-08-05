import type { Metadata } from "next";
import Footer from "@/components/Footer";
import SectionEyebrow from "@/components/SectionEyebrow";

export const metadata: Metadata = {
  title: "Personvern",
  description: "Hvordan Puzl behandler personopplysninger fra kontaktskjemaet.",
};

export default function PersonvernPage() {
  return (
    <>
      <main className="flex-1 px-6 pt-32 pb-28 sm:pt-36">
        <article className="mx-auto max-w-[70ch]">
          <SectionEyebrow label="Personvern" />
          <h1 className="mt-4 text-[32px] font-bold leading-[1.15] sm:text-[42px]">
            Personvernerklæring
          </h1>
          <p className="mt-4 font-mono text-[12px] uppercase tracking-[0.1em] text-[var(--ink-45)]">
            Sist oppdatert 5. august 2026
          </p>

          <div className="article-body mt-10">
            <p>
              Denne siden forklarer hvilke personopplysninger Puzl samler inn gjennom
              nettsiden, hvorfor, og hvordan de behandles. Vi holder dette enkelt fordi
              det vi faktisk gjør er enkelt: vi har ikke analyseverktøy, sporing eller
              informasjonskapsler på siden, og vi samler ikke inn noe uten at du selv
              sender det til oss.
            </p>

            <h2>Hvilke opplysninger vi samler inn</h2>
            <p>
              Når du fyller ut kontaktskjemaet på{" "}
              <a href="/kontakt">/kontakt</a>, samler vi inn det du selv skriver: navn,
              e-post, eventuelt telefonnummer, og meldingen din. Det er alt — vi ber ikke
              om, og lagrer ikke, noe utover dette.
            </p>

            <h2>Hvorfor vi samler inn opplysningene</h2>
            <p>
              Opplysningene brukes utelukkende til å svare på henvendelsen din. Ingen
              nyhetsbrev, ingen deling med tredjepart, og ingen bruk til markedsføring.
            </p>

            <h2>Hvordan opplysningene behandles</h2>
            <p>
              Når du sender skjemaet, blir innholdet sendt direkte som en e-post til{" "}
              <a href="mailto:hei@puzl.no">hei@puzl.no</a> via e-posttjenesten Resend, med
              din e-postadresse satt som svar-til-adresse. Opplysningene lagres ikke i noen
              database eller CRM hos oss — de finnes kun i selve e-posten, på samme måte
              som om du hadde sendt oss en e-post direkte.
            </p>

            <h2>Hvor lenge vi oppbevarer opplysningene</h2>
            <p>
              Vi har ingen formell slettefrist, men opplysningene beholdes ikke lenger enn
              det som er nødvendig for å følge opp henvendelsen din — normalt så lenge
              e-posttråden er relevant for dialogen mellom oss.
            </p>

            <h2>Dine rettigheter</h2>
            <p>
              Du kan når som helst be om innsyn i, eller sletting av, opplysninger du har
              sendt oss. Send en e-post til{" "}
              <a href="mailto:hei@puzl.no">hei@puzl.no</a>, så ordner vi det.
            </p>

            <h2>Kontakt</h2>
            <p>
              Spørsmål om personvern kan rettes til{" "}
              <a href="mailto:hei@puzl.no">hei@puzl.no</a>.
            </p>
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
