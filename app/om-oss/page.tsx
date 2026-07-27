import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import SectionEyebrow from "@/components/SectionEyebrow";

export const metadata: Metadata = {
  title: "Om oss",
  description: "Bli bedre kjent med Puzl — kommer snart.",
};

export default function OmOssPage() {
  return (
    <>
      <Nav />
      <main className="flex-1 px-6 pt-32 pb-28 sm:pt-36">
        <div className="mx-auto max-w-[1180px]">
          <SectionEyebrow label="Om oss" />
          <h1 className="mt-4 text-[36px] font-bold sm:text-[44px]">Hvem vi er.</h1>
          <p className="mt-4 max-w-[560px] text-[16px] leading-[1.6] text-[var(--ink-45)]">
            Denne siden er under arbeid. Ta gjerne kontakt direkte hvis du vil vite mer
            om oss i mellomtiden.
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}
