import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import SectionEyebrow from "@/components/SectionEyebrow";

export const metadata: Metadata = {
  title: "Tjenester",
  description: "Et overblikk over tjenestene Puzl leverer — kommer snart.",
};

export default function TjenesterPage() {
  return (
    <>
      <Nav />
      <main className="flex-1 px-6 pt-32 pb-28 sm:pt-36">
        <div className="mx-auto max-w-[1180px]">
          <SectionEyebrow label="Tjenester" />
          <h1 className="mt-4 text-[36px] font-bold sm:text-[44px]">Hva vi tilbyr.</h1>
          <p className="mt-4 max-w-[560px] text-[16px] leading-[1.6] text-[var(--ink-45)]">
            Denne siden er under arbeid. I mellomtiden finner du et utvalg av løsningene
            vi har bygget på forsiden.
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}
