import Contact from "@/components/Home/Contact";
import Faq from "@/components/Home/Faq";
import Footer from "@/components/Home/Footer";
import Hero from "@/components/Home/Hero";
import Services from "@/components/Home/Services";
import Navigation from "@/components/shared/Navigation";

export default function Home() {
  return (
    <>
      <Navigation />
      <Hero />
      <Services />
      <Faq />
      <Contact />
      <Footer />
    </>
  );
}
