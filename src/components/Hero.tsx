import { ArrowRight, Code2, Smartphone, Palette, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate();

  const goToContact = () => {
    navigate("/contact");
  };

  const goToPortfolio = () => {
    navigate("/portfolio");
  };

  return (
    <section className="relative min-h-screen pt-24 md:pt-32 pb-16 overflow-hidden flex items-center">
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-6 md:space-y-8">
          <div className="inline-flex items-center gap-2 px-3 md:px-4 py-1.5 md:py-2 rounded-full bg-white/5 border border-white/10 text-primary-glow text-[10px] md:text-xs font-bold tracking-wider uppercase animate-fade-in mb-4">
            <span className="w-1.5 md:w-2 h-1.5 md:h-2 rounded-full bg-primary animate-pulse"></span>
            Building the future of African Tech
          </div>
          
          <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-black leading-[1.1] md:leading-tight animate-slide-up">
            Build. Scale. <br />
            <span className="text-primary-glow">Innovate faster.</span>
          </h1>
          
          <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto animate-fade-in delay-200 px-4">
            From custom enterprise solutions to ready-to-deploy software products — we provide the <span className="text-foreground font-bold">engineering excellence</span> your business deserves.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 md:gap-4 pt-6 md:pt-10 animate-fade-in delay-300">
            <Button size="lg" className="w-full sm:w-auto h-12 md:h-14 px-8 md:px-10 rounded-xl bg-primary hover:bg-primary/90 text-white font-bold text-base md:text-lg transition-all hover:scale-105 shadow-xl shadow-primary/20 group" onClick={() => navigate('/services?type=build')}>
              Start Building
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button size="lg" variant="secondary" className="w-full sm:w-auto h-12 md:h-14 px-8 md:px-10 rounded-xl bg-accent hover:bg-accent/90 text-white font-bold text-base md:text-lg transition-all hover:scale-105 shadow-xl shadow-accent/10" onClick={() => navigate('/services?type=support')}>
              Managed Support
            </Button>
            <Button size="lg" variant="ghost" className="w-full sm:w-auto h-12 md:h-14 px-8 md:px-10 rounded-xl border border-white/5 bg-white/5 hover:bg-white/10 text-foreground font-bold text-base md:text-lg transition-all" onClick={() => navigate('/products')}>
              Software Marketplace
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
