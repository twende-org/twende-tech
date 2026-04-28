import { useState, useEffect } from "react";
import { Code, Shield, Package, Check, ArrowRight, Rocket, Server, Users, Target, Palette, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate, useSearchParams } from "react-router-dom";

const Services = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState(searchParams.get("type") || "dev");

  useEffect(() => {
    const type = searchParams.get("type");
    if (type) setActiveTab(type);
  }, [searchParams]);

  const tabs = [
    { id: "dev", label: "Build Something New", icon: Rocket, color: "text-primary", border: "border-primary" },
    { id: "support", label: "System Support", icon: Shield, color: "text-accent", border: "border-accent" },
    { id: "product", label: "Buy Ready Software", icon: Package, color: "text-muted-foreground", border: "border-white/20" }
  ];

  return (
    <section className="py-32 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16 animate-slide-up">
          <h1 className="text-5xl md:text-7xl font-black mb-6">Expert <span className="gradient-text">Solutions</span></h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">Choose the path that fits your current business needs. From raw ideas to ready-to-use products.</p>
        </div>

        {/* Intent Selector */}
        <div className="grid md:grid-cols-3 gap-6 mb-20 animate-slide-up" style={{ animationDelay: '0.1s' }}>
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`p-8 rounded-2xl border-2 transition-all duration-300 text-left relative overflow-hidden group ${
                activeTab === tab.id 
                  ? `${tab.border} bg-white/5 shadow-xl` 
                  : "border-white/5 bg-transparent hover:border-white/20"
              }`}
            >
              <div className={`mb-6 p-3 rounded-xl bg-background border border-white/5 inline-block`}>
                <tab.icon className={`w-8 h-8 ${activeTab === tab.id ? tab.color : 'text-muted-foreground'}`} />
              </div>
              <h3 className={`text-xl font-bold mb-2 ${activeTab === tab.id ? 'text-foreground' : 'text-muted-foreground'}`}>{tab.label}</h3>
              <p className="text-sm text-muted-foreground">Tailored solutions for your digital path.</p>
              
              {activeTab === tab.id && (
                <div className={`absolute bottom-0 left-0 h-1 w-full bg-current ${tab.color}`}></div>
              )}
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div className="animate-slide-up" style={{ animationDelay: '0.2s' }}>
          {activeTab === "dev" && (
            <div className="glass-card p-12 rounded-3xl border border-primary/20">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div>
                  <h2 className="text-4xl font-black mb-6">Custom Software <span className="text-primary">Development</span></h2>
                  <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                    We specialize in building unique, high-performance systems from the ground up. Whether it's a revolutionary web app or a complex enterprise CRM, our team handles everything from architecture to deployment.
                  </p>
                  <ul className="space-y-4 mb-10">
                    {[
                      "End-to-End Product Engineering",
                      "Scalable Cloud Architecture (AWS/Azure)",
                      "Modern Web Apps (React, Next.js, Node)",
                      "Cross-Platform Mobile Apps (Flutter, RN)",
                      "API Design & System Integration"
                    ].map((item) => (
                      <li key={item} className="flex items-center gap-3">
                        <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center">
                          <Check className="w-3 h-3 text-primary" />
                        </div>
                        <span className="font-medium">{item}</span>
                      </li>
                    ))}
                  </ul>
                  <Button variant="hero" size="lg" className="group" onClick={() => navigate("/contact")}>
                    Start a Free Consultation
                    <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  {[Code, Palette, Target, Server].map((Icon, idx) => (
                    <div key={idx} className="p-8 rounded-2xl bg-white/5 border border-white/5 flex flex-col items-center text-center">
                      <Icon className="w-10 h-10 text-primary mb-4" />
                      <span className="text-sm font-bold opacity-60">
                        {idx === 0 ? "Frontend" : idx === 1 ? "UI/UX" : idx === 2 ? "Strategy" : "Backend"}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === "support" && (
            <div className="glass-card p-12 rounded-3xl border border-accent/20">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div>
                  <h2 className="text-4xl font-black mb-6">On-Demand Support & <span className="text-accent">Maintenance</span></h2>
                  <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                    Don't let technical debt slow you down. Our maintenance plans provide you with a dedicated tech team to keep your existing systems secure, updated, and optimized.
                  </p>
                  <ul className="space-y-4 mb-10">
                    {[
                      "24/7 Proactive System Monitoring",
                      "Security Patches & Performance Tuning",
                      "Monthly Feature Updates & Bug Fixes",
                      "Database Optimization & Backups",
                      "WhatsApp/Email Priority Support"
                    ].map((item) => (
                      <li key={item} className="flex items-center gap-3">
                        <div className="w-5 h-5 rounded-full bg-accent/20 flex items-center justify-center">
                          <Check className="w-3 h-3 text-accent" />
                        </div>
                        <span className="font-medium">{item}</span>
                      </li>
                    ))}
                  </ul>
                  <Button variant="secondary" size="lg" className="bg-accent hover:bg-accent/90 text-white" onClick={() => navigate("/pricing?tab=support")}>
                    View Support Plans
                  </Button>
                </div>
                <div className="relative">
                  <div className="absolute inset-0 bg-accent/10 blur-3xl rounded-full"></div>
                  <div className="relative p-8 rounded-2xl bg-white/5 border border-white/10">
                    <h4 className="text-xl font-bold mb-6">Support Efficiency</h4>
                    <div className="space-y-6">
                      {[
                        { label: "Uptime Guarantee", value: "99.9%" },
                        { label: "Response Time", value: "< 2 Hours" },
                        { label: "Security Score", value: "A+" }
                      ].map((stat) => (
                        <div key={stat.label}>
                          <div className="flex justify-between mb-2">
                            <span className="text-sm text-muted-foreground">{stat.label}</span>
                            <span className="text-sm font-bold text-accent">{stat.value}</span>
                          </div>
                          <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
                            <div className="h-full bg-accent" style={{ width: '90%' }}></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "product" && (
            <div className="glass-card p-12 rounded-3xl border border-white/10">
              <div className="text-center max-w-3xl mx-auto">
                <Package className="w-16 h-16 text-muted-foreground mx-auto mb-8 opacity-20" />
                <h2 className="text-4xl font-black mb-6">Ready-Made Software <span className="text-muted-foreground">Marketplace</span></h2>
                <p className="text-lg text-muted-foreground mb-10 leading-relaxed">
                  Why wait months for development when you can launch today? Explore our suite of pre-built, white-label solutions for schools, retail, and healthcare.
                </p>
                <div className="grid sm:grid-cols-3 gap-6 mb-12">
                  {["School Systems", "E-commerce", "Health ERP"].map((item) => (
                    <div key={item} className="p-6 rounded-xl bg-white/5 border border-white/5">
                      <span className="font-bold">{item}</span>
                    </div>
                  ))}
                </div>
                <Button variant="outline" size="lg" className="px-12 border-white/10" onClick={() => navigate("/products")}>
                  Browse the Marketplace
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* Comparison Table Section */}
        <div className="mt-32 animate-slide-up" style={{ animationDelay: '0.3s' }}>
          <h3 className="text-3xl font-black mb-12 text-center">Path Comparison</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="py-6 px-4 font-bold text-muted-foreground uppercase text-xs">Feature</th>
                  <th className="py-6 px-4 font-bold text-primary uppercase text-xs">Custom Dev</th>
                  <th className="py-6 px-4 font-bold text-accent uppercase text-xs">Support</th>
                  <th className="py-6 px-4 font-bold text-muted-foreground uppercase text-xs">Products</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {[
                  { feature: "Time to Launch", dev: "3-6 Months", support: "Instant", product: "1-3 Days" },
                  { feature: "Ownership", dev: "Full Source Code", support: "Maintenance", product: "Licence" },
                  { feature: "Customization", dev: "100% Unique", support: "Existing System", product: "Standard + Setup" },
                  { feature: "Pricing Model", dev: "Project Based", support: "Monthly Sub", product: "One-time / Annual" }
                ].map((row) => (
                  <tr key={row.feature} className="hover:bg-white/5 transition-colors group">
                    <td className="py-6 px-4 font-medium text-muted-foreground group-hover:text-foreground">{row.feature}</td>
                    <td className="py-6 px-4 font-bold">{row.dev}</td>
                    <td className="py-6 px-4 font-bold">{row.support}</td>
                    <td className="py-6 px-4 font-bold">{row.product}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
