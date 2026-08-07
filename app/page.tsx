import type { Metadata } from "next";
import Hero from "@/components/Hero";
import Delivered from "@/components/Delivered";
import Approach from "@/components/Approach";
import PricingModel from "@/components/PricingModel";
import WorkflowExample from "@/components/WorkflowExample";
import Skills from "@/components/Skills";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  description:
    "Generiske AI-verktøy passer alle og er derfor perfekte for ingen. Vi skreddersyr AI-løsninger som integreres med systemene dere har og leverer verdi fra dag én.",
  alternates: {
    canonical: "/",
  },
};

export default function Home() {
  return (
    <>
      <main className="flex-1">
        <Hero />
        <Approach />
        <PricingModel />
        <Delivered />
        <WorkflowExample />
        <Skills />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
