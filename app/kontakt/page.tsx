import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Kontakt",
  description: "Ta kontakt med Puzl for å diskutere din neste AI-løsning.",
};

export default function KontaktPage() {
  return (
    <>
      <Nav />
      <main className="flex-1 pt-32 sm:pt-36">
        <Contact />
      </main>
      <Footer />
    </>
  );
}
