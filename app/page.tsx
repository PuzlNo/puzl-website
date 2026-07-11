import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Delivered from "@/components/Delivered";
import Approach from "@/components/Approach";
import Skills from "@/components/Skills";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Nav />
      <main className="flex-1">
        <Hero />
        <Approach />
        <Delivered />
        <Skills />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
