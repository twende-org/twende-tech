import { useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { Check, Info, ShieldCheck, Zap, Rocket, Package } from "lucide-react";

const Pricing = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState(searchParams.get("tab") || "support");

  useEffect(() => {
    const tab = searchParams.get("tab");
    if (tab) setActiveTab(tab);
  }, [searchParams]);

  const supportPlans = [
    {
      name: "Standard Tier",
      price: "150,000 TZS",
      period: "/ month",
      description: "Optimized for startups and professional blogs",
      features: [
        "Bi-weekly Security Patching",
        "Automated Daily Backups",
        "Performance Monitoring",
        "Infrastructure Management",
        "Standard Email Support"
      ],
      color: "border-path-support",
      icon: ShieldCheck
    },
    {
      name: "Enterprise Tier",
      price: "300,000 TZS",
      period: "/ month",
      description: "Mission-critical support for growing businesses",
      features: [
        "Weekly System Optimization",
        "Advanced Security Hardening",
        "Real-time Threat Monitoring",
        "Minor Feature Engineering",
        "2-Hour Priority SLA Support"
      ],
      color: "border-accent",
      icon: Zap,
      popular: true
    },
    {
      name: "Elite Managed",
      price: "600,000 TZS",
      period: "/ month",
      description: "Full-scale outsourced technical department",
      features: [
        "Unlimited System Iterations",
        "Dedicated DevOps Engineer",
        "Disaster Recovery Drills",
        "Compliance & Audit Reports",
        "24/7 Dedicated Support Line"
      ],
      color: "border-path-support",
      icon: Rocket
    }
  ];

  return (
    <section className="py-24 md:py-32 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16 animate-slide-up">
          <h1 className="text-4xl md:text-7xl font-black mb-4 md:mb-6">Transparent <span className="gradient-text">Pricing</span></h1>
          <p className="text-base md:text-xl text-muted-foreground max-w-2xl mx-auto px-4">Flexible investment models designed to scale with your business growth.</p>
        </div>

        {/* Tab Selector */}
        <div className="flex justify-center mb-12 md:mb-16 animate-slide-up" style={{ animationDelay: '0.1s' }}>
          <div className="inline-flex p-1 bg-white/5 border border-white/10 rounded-xl md:rounded-2xl w-full max-w-md md:w-auto overflow-hidden">
            <button 
              onClick={() => setActiveTab("dev")}
              className={`flex-1 md:flex-none px-4 md:px-8 py-3 md:py-4 rounded-lg md:rounded-xl text-xs md:text-sm lg:text-base font-bold transition-all ${activeTab === 'dev' ? 'bg-primary text-white shadow-lg' : 'text-muted-foreground hover:text-foreground'}`}
            >
              Development
            </button>
            <button 
              onClick={() => setActiveTab("support")}
              className={`flex-1 md:flex-none px-4 md:px-8 py-3 md:py-4 rounded-lg md:rounded-xl text-xs md:text-sm lg:text-base font-bold transition-all ${activeTab === 'support' ? 'bg-accent text-white shadow-lg' : 'text-muted-foreground hover:text-foreground'}`}
            >
              Support
            </button>
            <button 
              onClick={() => setActiveTab("product")}
              className={`flex-1 md:flex-none px-4 md:px-8 py-3 md:py-4 rounded-lg md:rounded-xl text-xs md:text-sm lg:text-base font-bold transition-all ${activeTab === 'product' ? 'bg-white/10 text-white shadow-lg' : 'text-muted-foreground hover:text-foreground'}`}
            >
              Software
            </button>
          </div>
        </div>

        {/* Support Plans Content */}
        {activeTab === "support" && (
          <div className="grid md:grid-cols-3 gap-6 md:gap-8 animate-slide-up" style={{ animationDelay: '0.2s' }}>
            {supportPlans.map((plan) => (
              <div key={plan.name} className={`glass-card p-6 md:p-8 rounded-2xl md:rounded-3xl border-t-4 ${plan.color} relative overflow-hidden flex flex-col transition-all hover:scale-[1.01]`}>
                {plan.popular && (
                  <div className="absolute top-4 right-[-35px] bg-accent text-white text-[9px] md:text-[10px] font-black py-1 px-12 rotate-45 uppercase tracking-widest">
                    Popular
                  </div>
                )}
                <div className="mb-6">
                  <plan.icon className={`w-8 h-8 md:w-10 md:h-10 mb-4 ${plan.popular ? 'text-accent' : 'text-muted-foreground'}`} />
                  <h3 className="text-xl md:text-2xl font-bold mb-2 text-foreground">{plan.name}</h3>
                  <p className="text-xs md:text-sm text-muted-foreground">{plan.description}</p>
                </div>
                <div className="mb-6 md:mb-8">
                  <span className="text-3xl md:text-4xl font-black text-foreground">{plan.price}</span>
                  <span className="text-muted-foreground text-xs md:text-sm font-medium">{plan.period}</span>
                </div>
                <ul className="space-y-3 md:space-y-4 mb-8 md:mb-10 flex-grow">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-center gap-3 text-xs md:text-sm">
                      <div className="w-5 h-5 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
                        <Check className="w-3 h-3 text-accent" />
                      </div>
                      <span className="text-foreground/80 leading-tight">{f}</span>
                    </li>
                  ))}
                </ul>
                <Button variant={plan.popular ? "secondary" : "outline"} className={`w-full py-5 md:py-6 font-bold text-sm md:text-base ${plan.popular ? 'bg-accent hover:bg-accent/90 text-white border-none shadow-lg shadow-accent/20' : 'border-white/10 hover:bg-white/5 text-foreground'}`}>
                  Get Started
                </Button>
              </div>
            ))}
          </div>
        )}

        {/* Development Pricing Content */}
        {activeTab === "dev" && (
          <div className="glass-card p-6 md:p-12 rounded-2xl md:rounded-3xl border border-primary/20 animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-center">
              <div>
                <Rocket className="w-12 h-12 md:w-16 md:h-16 text-primary mb-6 md:mb-8" />
                <h2 className="text-3xl md:text-4xl font-black mb-4 md:mb-6 text-foreground">Custom Projects</h2>
                <p className="text-base md:text-lg text-muted-foreground mb-6 md:mb-8 leading-relaxed">
                  Every custom project is unique. We provide a tailored quote after a thorough analysis of your requirements, ensuring you only pay for what you need.
                </p>
                <div className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/5 mb-6 md:mb-8">
                  <Info className="w-5 h-5 md:w-6 md:h-6 text-primary flex-shrink-0" />
                  <span className="text-xs md:text-sm font-medium text-foreground">Projects typically start from 2,500,000 TZS</span>
                </div>
                <Button variant="hero" size="lg" className="w-full md:w-auto px-10 h-12 md:h-14 font-bold" onClick={() => navigate("/contact")}>
                  Request a Custom Quote
                </Button>
              </div>
              <div className="space-y-4 md:space-y-6">
                {[
                  { label: "Requirements Gathering", desc: "Detailed analysis of your business needs." },
                  { label: "Milestone-Based Billing", desc: "Pay only as project stages are completed." },
                  { label: "Full Ownership", desc: "100% rights to source code and assets." }
                ].map((item) => (
                  <div key={item.label} className="p-5 md:p-6 rounded-xl md:rounded-2xl bg-white/5 border border-white/5 transition-all hover:bg-white/10">
                    <h4 className="font-bold mb-1 text-sm md:text-base text-foreground">{item.label}</h4>
                    <p className="text-xs md:text-sm text-muted-foreground leading-snug">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Software Marketplace Pricing Content */}
        {activeTab === "product" && (
          <div className="glass-card p-6 md:p-12 rounded-2xl md:rounded-3xl border border-white/10 text-center animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <Package className="w-12 h-12 md:w-16 md:h-16 text-muted-foreground mx-auto mb-6 md:mb-8 opacity-40" />
            <h2 className="text-3xl md:text-4xl font-black mb-4 md:mb-6 text-foreground">Marketplace Licensing</h2>
            <p className="text-base md:text-lg text-muted-foreground mb-8 md:mb-12 max-w-2xl mx-auto px-4">
              Our ready-made software follows a simple one-time licensing model with optional annual support. Fast, affordable, and ready to deploy.
            </p>
            <div className="grid sm:grid-cols-2 gap-6 md:gap-8 max-w-3xl mx-auto mb-8 md:mb-12">
              <div className="p-6 md:p-8 rounded-xl md:rounded-2xl bg-white/5 border border-white/5 transition-all hover:bg-white/10">
                <span className="block text-xs md:text-sm text-muted-foreground mb-2">Standard License</span>
                <span className="text-2xl md:text-3xl font-black text-foreground">450k - 2M TZS</span>
                <span className="block text-[10px] md:text-xs mt-2 text-muted-foreground uppercase tracking-widest">One-time payment</span>
              </div>
              <div className="p-6 md:p-8 rounded-xl md:rounded-2xl bg-white/5 border border-white/5 transition-all hover:bg-white/10">
                <span className="block text-xs md:text-sm text-muted-foreground mb-2">Enterprise Plan</span>
                <span className="text-2xl md:text-3xl font-black text-foreground">Custom Quote</span>
                <span className="block text-[10px] md:text-xs mt-2 text-muted-foreground uppercase tracking-widest">Unlimited locations</span>
              </div>
            </div>
            <Button variant="outline" size="lg" className="w-full md:w-auto px-12 h-12 md:h-14 font-bold border-white/10 hover:bg-white/5" onClick={() => navigate("/products")}>
              Browse Software Products
            </Button>
          </div>
        )}

        {/* Trust Badge */}
        <div className="mt-16 md:mt-20 text-center animate-slide-up" style={{ animationDelay: '0.4s' }}>
          <div className="inline-flex flex-col md:flex-row items-center gap-4 md:gap-6 px-6 md:px-8 py-4 md:py-4 rounded-2xl md:rounded-full bg-white/5 border border-white/5 w-full md:w-auto">
            <span className="text-xs md:text-sm font-bold text-muted-foreground">Secure Payments via</span>
            <div className="flex flex-wrap justify-center gap-4 md:gap-6 items-center opacity-60">
              <span className="font-black text-lg md:text-xl">M-PESA</span>
              <span className="font-black text-lg md:text-xl">TIGO PESA</span>
              <span className="font-black text-lg md:text-xl">CRDB</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
