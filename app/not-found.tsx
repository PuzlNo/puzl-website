import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/Footer";
import SectionEyebrow from "@/components/SectionEyebrow";

export const metadata: Metadata = {
  title: "Side ikke funnet",
  description: "Siden du leter etter finnes ikke, eller har blitt flyttet.",
  robots: {
    index: false,
  },
};

export default function NotFound() {
  return (
    <>
      <main className="flex-1 px-6 pt-32 pb-28 sm:pt-36">
        <div className="mx-auto max-w-[720px] text-center">
          <div className="flex justify-center">
            <SectionEyebrow label="404" />
          </div>
          <h1 className="mt-4 text-[36px] font-bold leading-[1.15] sm:text-[44px]">
            Denne siden finnes ikke
          </h1>
          <p className="mx-auto mt-4 max-w-[480px] text-[17px] leading-[1.6] text-[var(--ink-70)]">
            Siden du prøvde å åpne finnes ikke, eller har blitt flyttet. Sjekk adressen, eller
            finn veien videre herfra.
          </p>

          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="/"
              className="rounded-full bg-ink px-6 py-3 text-[15px] font-medium text-paper transition-colors hover:bg-[var(--thread)]"
            >
              Til forsiden
            </Link>
            <Link
              href="/tjenester"
              className="stitch-link px-1 py-3 text-[15px] font-medium text-ink"
            >
              Se tjenester
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
