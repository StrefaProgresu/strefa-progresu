import ScrollProgress from "@/components/ScrollProgress";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Values from "@/components/Values";
import Products from "@/components/Products";
import Testimonials from "@/components/Testimonials";
import FAQ from "@/components/FAQ";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <ScrollProgress />
      <Navbar />
      <main>
        <Hero />
        <Values />
        <Products />
        <Testimonials />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
