import type { Metadata } from "next";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import JsonLd from "@/components/JsonLd";
import { breadcrumbJsonLd, SITE_URL } from "@/lib/structured-data";

export const metadata: Metadata = {
  title: "Kontakt",
  description:
    "Ta kontakt med Puzl for å diskutere din neste AI-løsning, på e-post hei@puzl.no eller via kontaktskjemaet, så finner vi ut om vi er riktig match.",
  alternates: {
    canonical: "/kontakt",
  },
};

const breadcrumbs = breadcrumbJsonLd([
  { name: "Hjem", path: "/" },
  { name: "Kontakt", path: "/kontakt" },
]);

const contactPageJsonLd = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  name: "Kontakt",
  description: "Ta kontakt med Puzl for å diskutere din neste AI-løsning.",
  url: `${SITE_URL}/kontakt`,
  mainEntity: {
    "@type": "Organization",
    name: "Puzl",
    email: "hei@puzl.no",
  },
};

export default function KontaktPage() {
  return (
    <>
      <JsonLd data={breadcrumbs} />
      <JsonLd data={contactPageJsonLd} />
      <main className="flex-1 px-6 pt-32 pb-28 sm:pt-36">
        <Contact standalone />
      </main>
      <Footer />
    </>
  );
}
