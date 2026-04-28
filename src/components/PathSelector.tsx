import { Rocket, Shield, Package, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const PathSelector = () => {
  const navigate = useNavigate();

  const paths = [
    {
      title: "Custom Development",
      icon: Rocket,
      description: "We design and build complete systems from scratch. Web, mobile, and enterprise solutions.",
      cta: "Start a Project",
      color: "border-path-dev",
      hoverGlow: "group-hover:shadow-[0_0_30px_-5px_rgba(59,130,246,0.3)]",
      onClick: () => navigate("/services?type=dev"),
      path: "dev"
    },
    {
      title: "Support & Maintenance",
      icon: Shield,
      description: "On-demand tech team for your existing systems. Security, updates, and 24/7 support.",
      cta: "View Plans",
      color: "border-path-support",
      hoverGlow: "group-hover:shadow-[0_0_30px_-5px_rgba(16,185,129,0.3)]",
      onClick: () => navigate("/pricing?tab=support"),
      path: "support"
    },
    {
      title: "Software Marketplace",
      icon: Package,
      description: "Ready-to-use business software. School systems, retail, clinics, and more. Launch today.",
      cta: "Browse Software",
      color: "border-path-product",
      hoverGlow: "group-hover:shadow-[0_0_30px_-5px_rgba(148,163,184,0.3)]",
      onClick: () => navigate("/products"),
      path: "product"
    }
  ];

  return (
    <div className="grid md:grid-cols-3 gap-8 w-full max-w-6xl mx-auto px-4">
      {paths.map((path) => (
        <div 
          key={path.title}
          className={`group glass-card p-8 rounded-2xl border-t-4 ${path.color} ${path.hoverGlow} transition-all duration-500 hover:-translate-y-2 flex flex-col`}
        >
          <div className="mb-6 flex items-center justify-between">
            <div className={`p-3 rounded-xl bg-background/50 border border-white/5`}>
              <path.icon className={`w-8 h-8 ${path.path === 'dev' ? 'text-primary' : path.path === 'support' ? 'text-accent' : 'text-muted-foreground'}`} />
            </div>
            <ArrowRight className="w-5 h-5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity translate-x-4 group-hover:translate-x-0" />
          </div>
          
          <h3 className="text-2xl font-bold mb-4 group-hover:text-primary transition-colors">{path.title}</h3>
          <p className="text-muted-foreground mb-8 flex-grow leading-relaxed">
            {path.description}
          </p>
          
          <Button 
            variant={path.path === 'dev' ? 'hero' : path.path === 'support' ? 'secondary' : 'outline'}
            className={`w-full group-hover:scale-105 transition-transform ${path.path === 'support' ? 'bg-accent hover:bg-accent/90 text-white border-none' : ''}`}
            onClick={path.onClick}
          >
            {path.cta}
          </Button>
        </div>
      ))}
    </div>
  );
};

export default PathSelector;
