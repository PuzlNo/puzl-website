import Hero from "@/components/Hero";
import Delivered from "@/components/Delivered";
import Approach from "@/components/Approach";
import PricingModel from "@/components/PricingModel";
import WorkflowExample from "@/components/WorkflowExample";
import Skills from "@/components/Skills";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

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
