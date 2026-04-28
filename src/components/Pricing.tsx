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
      name: "Starter Support",
      price: "150,000 TZS",
      period: "/ month",
      description: "For small organizations & blogs",
      features: ["2 system updates / month", "Bug fixing & security", "Weekly backups", "Hosting management", "WhatsApp support"],
      color: "border-path-support",
      icon: ShieldCheck
    },
    {
      name: "Standard Support",
      price: "300,000 TZS",
      period: "/ month",
      description: "For schools, clinics & hotels",
      features: ["6 system updates / month", "Daily backups", "Minor feature additions", "Security monitoring", "7-day priority support"],
      color: "border-accent",
      icon: Zap,
      popular: true
    },
    {
      name: "Growth Support",
      price: "600,000 TZS",
      period: "/ month",
      description: "For scaling companies",
      features: ["Unlimited updates", "Dedicated dev (10hrs)", "System optimization", "Advanced security", "Monthly performance audits"],
      color: "border-path-support",
      icon: Rocket
    }
  ];

  return (
    <section className="py-32 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16 animate-slide-up">
          <h1 className="text-5xl md:text-7xl font-black mb-6">Transparent <span className="gradient-text">Pricing</span></h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">Flexible investment models designed to scale with your business growth.</p>
        </div>

        {/* Tab Selector */}
        <div className="flex justify-center mb-16 animate-slide-up" style={{ animationDelay: '0.1s' }}>
          <div className="inline-flex p-1 bg-white/5 border border-white/10 rounded-2xl">
            <button 
              onClick={() => setActiveTab("dev")}
              className={`px-8 py-4 rounded-xl font-bold transition-all ${activeTab === 'dev' ? 'bg-primary text-white shadow-lg' : 'text-muted-foreground hover:text-foreground'}`}
            >
              Development
            </button>
            <button 
              onClick={() => setActiveTab("support")}
              className={`px-8 py-4 rounded-xl font-bold transition-all ${activeTab === 'support' ? 'bg-accent text-white shadow-lg' : 'text-muted-foreground hover:text-foreground'}`}
            >
              Support
            </button>
            <button 
              onClick={() => setActiveTab("product")}
              className={`px-8 py-4 rounded-xl font-bold transition-all ${activeTab === 'product' ? 'bg-white/10 text-white shadow-lg' : 'text-muted-foreground hover:text-foreground'}`}
            >
              Software
            </button>
          </div>
        </div>

        {/* Support Plans Content */}
        {activeTab === "support" && (
          <div className="grid md:grid-cols-3 gap-8 animate-slide-up" style={{ animationDelay: '0.2s' }}>
            {supportPlans.map((plan) => (
              <div key={plan.name} className={`glass-card p-8 rounded-3xl border-t-4 ${plan.color} relative overflow-hidden flex flex-col`}>
                {plan.popular && (
                  <div className="absolute top-4 right-[-35px] bg-accent text-white text-[10px] font-black py-1 px-12 rotate-45 uppercase tracking-widest">
                    Popular
                  </div>
                )}
                <div className="mb-6">
                  <plan.icon className={`w-10 h-10 mb-4 ${plan.popular ? 'text-accent' : 'text-muted-foreground'}`} />
                  <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                  <p className="text-sm text-muted-foreground">{plan.description}</p>
                </div>
                <div className="mb-8">
                  <span className="text-4xl font-black">{plan.price}</span>
                  <span className="text-muted-foreground text-sm font-medium">{plan.period}</span>
                </div>
                <ul className="space-y-4 mb-10 flex-grow">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-center gap-3 text-sm">
                      <div className="w-5 h-5 rounded-full bg-accent/10 flex items-center justify-center">
                        <Check className="w-3 h-3 text-accent" />
                      </div>
                      <span className="text-foreground/80">{f}</span>
                    </li>
                  ))}
                </ul>
                <Button variant={plan.popular ? "secondary" : "outline"} className={`w-full py-6 font-bold ${plan.popular ? 'bg-accent hover:bg-accent/90 text-white border-none' : 'border-white/10'}`}>
                  Get Started
                </Button>
              </div>
            ))}
          </div>
        )}

        {/* Development Pricing Content */}
        {activeTab === "dev" && (
          <div className="glass-card p-12 rounded-3xl border border-primary/20 animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <Rocket className="w-16 h-16 text-primary mb-8" />
                <h2 className="text-4xl font-black mb-6">Custom Projects</h2>
                <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                  Every custom project is unique. We provide a tailored quote after a thorough analysis of your requirements, ensuring you only pay for what you need.
                </p>
                <div className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/5 mb-8">
                  <Info className="w-6 h-6 text-primary" />
                  <span className="text-sm font-medium">Projects typically start from 2,500,000 TZS</span>
                </div>
                <Button variant="hero" size="lg" className="px-10" onClick={() => navigate("/contact")}>
                  Request a Custom Quote
                </Button>
              </div>
              <div className="space-y-6">
                {[
                  { label: "Requirements Gathering", desc: "Detailed analysis of your business needs." },
                  { label: "Milestone-Based Billing", desc: "Pay only as project stages are completed." },
                  { label: "Full Ownership", desc: "100% rights to source code and assets." }
                ].map((item) => (
                  <div key={item.label} className="p-6 rounded-2xl bg-white/5 border border-white/5">
                    <h4 className="font-bold mb-1">{item.label}</h4>
                    <p className="text-sm text-muted-foreground">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Software Marketplace Pricing Content */}
        {activeTab === "product" && (
          <div className="glass-card p-12 rounded-3xl border border-white/10 text-center animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <Package className="w-16 h-16 text-muted-foreground mx-auto mb-8 opacity-40" />
            <h2 className="text-4xl font-black mb-6">Marketplace Licensing</h2>
            <p className="text-lg text-muted-foreground mb-12 max-w-2xl mx-auto">
              Our ready-made software follows a simple one-time licensing model with optional annual support. Fast, affordable, and ready to deploy.
            </p>
            <div className="grid sm:grid-cols-2 gap-8 max-w-3xl mx-auto mb-12">
              <div className="p-8 rounded-2xl bg-white/5 border border-white/5">
                <span className="block text-sm text-muted-foreground mb-2">Standard License</span>
                <span className="text-3xl font-black">450k - 2M TZS</span>
                <span className="block text-xs mt-2 text-muted-foreground">One-time payment</span>
              </div>
              <div className="p-8 rounded-2xl bg-white/5 border border-white/5">
                <span className="block text-sm text-muted-foreground mb-2">Enterprise Plan</span>
                <span className="text-3xl font-black">Custom</span>
                <span className="block text-xs mt-2 text-muted-foreground">Unlimited locations</span>
              </div>
            </div>
            <Button variant="outline" size="lg" className="px-12 border-white/10" onClick={() => navigate("/products")}>
              Browse Software Products
            </Button>
          </div>
        )}

        {/* Trust Badge */}
        <div className="mt-20 text-center animate-slide-up" style={{ animationDelay: '0.4s' }}>
          <div className="inline-flex items-center gap-6 px-8 py-4 rounded-full bg-white/5 border border-white/5">
            <span className="text-sm font-bold text-muted-foreground">Secure Payments via</span>
            <div className="flex gap-4 items-center opacity-60">
              <span className="font-black text-xl">M-PESA</span>
              <span className="font-black text-xl">TIGO PESA</span>
              <span className="font-black text-xl">CRDB</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
