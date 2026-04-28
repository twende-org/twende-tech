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
    <section className="relative min-h-[90vh] flex flex-col items-center justify-center overflow-hidden px-4 pt-20">
      {/* Background Glow Effects */}
      <div className="absolute top-[-10%] left-[20%] w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px] animate-pulse-glow"></div>
      <div className="absolute bottom-[10%] right-[10%] w-[400px] h-[400px] bg-accent/10 rounded-full blur-[100px] animate-pulse-glow" style={{ animationDelay: '2s' }}></div>

      <div className="max-w-6xl mx-auto text-center relative z-10 mb-16">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8 animate-slide-up">
          <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
          <span className="text-sm font-medium text-primary-glow">Building the future of African Tech</span>
        </div>

        {/* Main Heading */}
        <div className="animate-slide-up" style={{ animationDelay: '0.1s' }}>
          <h1 className="text-5xl md:text-8xl font-black mb-8 leading-[1.1] tracking-tight">
            Build. Maintain. <br />
            <span className="gradient-text">Launch instantly.</span>
          </h1>

          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto mb-12 leading-relaxed font-medium">
            Custom software development, ongoing technical support, and ready-made business software — <span className="text-foreground">all in one place.</span>
          </p>
        </div>

        {/* CTA Buttons - 3 Path System */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-slide-up" style={{ animationDelay: '0.2s' }}>
          <Button variant="hero" size="xl" className="group min-w-[200px]" onClick={() => navigate("/services?type=dev")}>
            Build a Product
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform ml-2" />
          </Button>
          <Button 
            variant="secondary" 
            size="xl" 
            className="min-w-[200px] bg-accent hover:bg-accent/90 text-white border-none"
            onClick={() => navigate("/pricing?tab=support")}
          >
            Get Support
          </Button>
          <Button variant="outline" size="xl" className="min-w-[200px] border-white/10 hover:bg-white/5" onClick={() => navigate("/products")}>
            Explore Software
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
