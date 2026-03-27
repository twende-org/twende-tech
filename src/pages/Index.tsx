import Hero from "@/components/Hero";
import About from "@/components/About";
import Services from "@/components/Services";
import Portfolio from "@/components/Portfolio";
import Contact from "@/components/Contact";
import Pricing from "@/components/Pricing";
import Testimonials from "@/components/Testimonials";

const Index = () => {
  return (
    <main className="w-full">
      <section id="home">
        <Hero />
      </section>

      <section id="about">
        <About />
      </section>

      <section id="services">
        <Services />
      </section>

      <section id="portfolio" className="min-h-[400px]">
        <Portfolio />
      </section>
      <section id="pricing">
        <Pricing />
      </section>
      <section id="testimonials" className="min-h-[300px]">
        <Testimonials />
      </section>
      <section id="contact">
        <Contact />
      </section>

    </main>
  );
};

export default Index;
