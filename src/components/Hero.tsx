import { ArrowRight, Code2, Smartphone, Palette, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";

const Hero = () => {
  const scrollToContact = () => {
    const contactSection = document.getElementById("contact");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  //Ina navigate kupitia ID ya section ya portfolio
  const scrollToPortfolio = () => {
    const portfolioSection = document.getElementById("portfolio");
    if (portfolioSection) {
      portfolioSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-4">
      {/* Floating Tech Icons */}
      <div className="absolute inset-0 pointer-events-none">
        <Code2 className="absolute top-20 left-10 w-8 h-8 text-primary/30 animate-tech-float" style={{ animationDelay: '0s' }} />
        <Smartphone className="absolute top-32 right-20 w-6 h-6 text-accent/40 animate-tech-float" style={{ animationDelay: '2s' }} />
        <Palette className="absolute bottom-40 left-16 w-7 h-7 text-primary-glow/30 animate-tech-float" style={{ animationDelay: '4s' }} />
        <Zap className="absolute bottom-60 right-32 w-9 h-9 text-accent-glow/40 animate-tech-float" style={{ animationDelay: '1s' }} />
        <Code2 className="absolute top-1/2 left-1/4 w-5 h-5 text-primary/20 animate-tech-float" style={{ animationDelay: '3s' }} />
        <Smartphone className="absolute top-1/3 right-1/3 w-6 h-6 text-accent/30 animate-tech-float" style={{ animationDelay: '5s' }} />
      </div>

      <div className="max-w-6xl mx-auto text-center relative z-10">
        {/* Main Heading */}
        <div className="animate-slide-up">
          <h1 className="text-6xl md:text-8xl font-black mb-6 leading-tight">
            <span className="gradient-text">Twende</span>
            <br />
            <span className="text-foreground">Digital</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto mb-8 leading-relaxed">
            Professional software development by skilled Tanzanian developers. 
            We create exceptional web applications, mobile solutions, and custom software for international clients.
          </p>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16 animate-slide-up" style={{ animationDelay: '0.2s' }}>
          <Button variant="hero" size="xl" className="group" onClick={scrollToContact}>
            Start Your Project
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Button>
          <Button variant="glass" size="xl" onClick={scrollToPortfolio}>
            View Our Work
          </Button>
        </div>

        {/* Tech Stack Preview */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto animate-slide-up" style={{ animationDelay: '0.4s' }}>
          {[
            { name: "React & Next.js", icon: Code2 },
            { name: "Mobile Apps", icon: Smartphone },
            { name: "UI/UX Design", icon: Palette },
            { name: "Fast & Scalable", icon: Zap }
          ].map((tech, index) => (
            <div key={tech.name} className="glass-card p-6 rounded-xl hover-lift group">
              <tech.icon className="w-8 h-8 text-primary mb-3 mx-auto group-hover:text-primary-glow transition-colors" />
              <p className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors">
                {tech.name}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Background Glow Effects */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse-glow"></div>
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent/10 rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: '1.5s' }}></div>
    </section>
  );
};

export default Hero;