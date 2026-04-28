import Hero from "@/components/Hero";
import About from "@/components/About";
import Services from "@/components/Services";
import Process from "@/components/Process";
import Portfolio from "@/components/Portfolio";
import Contact from "@/components/Contact";
import Pricing from "@/components/Pricing";
import Testimonials from "@/components/Testimonials";
import PathSelector from "@/components/PathSelector";
import HowItWorks from "@/components/HowItWorks";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

  return (
    <main className="w-full">
      <section id="home">
        <Hero />
      </section>

      {/* 3 Pillars Section */}
      <section className="py-24 relative z-20">
        <PathSelector />
      </section>

      <section id="how-it-works">
        <HowItWorks />
      </section>

      <section id="portfolio" className="min-h-[400px]">
        <Portfolio />
      </section>

      <section id="about">
        <About />
      </section>

      {/* Final CTA Section */}
      <section className="py-32 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-primary/5 blur-3xl rounded-full translate-y-1/2"></div>
        <div className="max-w-4xl mx-auto glass-card p-16 rounded-3xl text-center relative z-10 border border-white/10">
          <h2 className="text-4xl md:text-6xl font-black mb-8">Not sure which one <br /><span className="gradient-text">you need?</span></h2>
          <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto">
            Our experts are ready to help you choose the right path for your digital transformation.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Button variant="hero" size="xl" className="min-w-[220px]" onClick={() => navigate("/contact")}>
              Talk to us
            </Button>
            <Button variant="outline" size="xl" className="min-w-[220px] border-white/10" onClick={() => navigate("/pricing")}>
              View Pricing
            </Button>
          </div>
        </div>
      </section>

      <section id="contact">
        <Contact />
      </section>
    </main>
  );
};

export default Index;
