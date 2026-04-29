import { useState, useEffect } from "react";
import { Code, Shield, Package, Check, ArrowRight, Rocket, Server, Users, Target, Palette, Settings, X, Send, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useNavigate, useSearchParams } from "react-router-dom";
import { submitLead } from "@/services/leads";
import { toast } from "sonner";

const InquiryModal = ({ isOpen, onClose, type }: { isOpen: boolean; onClose: () => void; type: string }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    budget: "",
    timeline: "",
    details: ""
  });

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const result = await submitLead({
        name: formData.name,
        email: formData.email,
        company: formData.company,
        budget: formData.budget,
        timeline: formData.timeline,
        projectDetails: formData.details,
        serviceType: type as any
      });
      if (result.success) {
        toast.success("Consultation request sent! We will contact you shortly.");
        onClose();
      }
    } catch (error) {
      toast.error("Failed to send request.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm">
      <div className="glass-card w-full max-w-xl p-8 rounded-3xl border border-white/10 relative animate-scale-in">
        <button onClick={onClose} className="absolute top-6 right-6 text-muted-foreground hover:text-foreground">
          <X className="w-6 h-6" />
        </button>
        <h3 className="text-2xl font-black mb-2">Request {type} Consultation</h3>
        <p className="text-muted-foreground mb-8">Tell us about your project goals and requirements.</p>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <Input 
              placeholder="Full Name" 
              required 
              value={formData.name}
              onChange={e => setFormData({...formData, name: e.target.value})}
              className="bg-white/5 border-white/10" 
            />
            <Input 
              placeholder="Work Email" 
              type="email" 
              required 
              value={formData.email}
              onChange={e => setFormData({...formData, email: e.target.value})}
              className="bg-white/5 border-white/10" 
            />
          </div>
          <Input 
            placeholder="Company Name" 
            value={formData.company}
            onChange={e => setFormData({...formData, company: e.target.value})}
            className="bg-white/5 border-white/10" 
          />
          <div className="grid grid-cols-2 gap-4">
            <select 
              className="w-full p-3 rounded-lg bg-white/5 border border-white/10 text-sm"
              value={formData.budget}
              onChange={e => setFormData({...formData, budget: e.target.value})}
            >
              <option value="">Expected Budget</option>
              <option value="< 5M TZS">&lt; 5M TZS</option>
              <option value="5M - 20M TZS">5M - 20M TZS</option>
              <option value="20M - 50M TZS">20M - 50M TZS</option>
              <option value="50M+ TZS">50M+ TZS</option>
            </select>
            <select 
              className="w-full p-3 rounded-lg bg-white/5 border border-white/10 text-sm"
              value={formData.timeline}
              onChange={e => setFormData({...formData, timeline: e.target.value})}
            >
              <option value="">Desired Timeline</option>
              <option value="< 1 Month">&lt; 1 Month</option>
              <option value="1-3 Months">1-3 Months</option>
              <option value="3-6 Months">3-6 Months</option>
              <option value="6+ Months">6+ Months</option>
            </select>
          </div>
          <Textarea 
            placeholder="Briefly describe your project requirements..." 
            rows={4}
            required
            value={formData.details}
            onChange={e => setFormData({...formData, details: e.target.value})}
            className="bg-white/5 border-white/10 resize-none" 
          />
          <Button type="submit" variant="hero" className="w-full h-12" disabled={isSubmitting}>
            {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : "Submit Request"}
          </Button>
        </form>
      </div>
    </div>
  );
};

const Services = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState(searchParams.get("type") || "dev");
  const [isInquiryModalOpen, setIsInquiryModalOpen] = useState(false);

  useEffect(() => {
    const type = searchParams.get("type");
    if (type) setActiveTab(type);
  }, [searchParams]);

  const tabs = [
    { id: "dev", label: "Enterprise Innovation", icon: Rocket, color: "text-primary", border: "border-primary" },
    { id: "support", label: "Managed Tech Services", icon: Shield, color: "text-accent", border: "border-accent" },
    { id: "product", label: "Verified Marketplace", icon: Package, color: "text-muted-foreground", border: "border-white/20" }
  ];

  return (
    <section className="py-32 px-4">
      <div className="max-w-6xl mx-auto">
        <InquiryModal 
          isOpen={isInquiryModalOpen} 
          onClose={() => setIsInquiryModalOpen(false)} 
          type={activeTab === 'dev' ? 'Innovation' : 'Managed Services'} 
        />
        {/* Header */}
        <div className="text-center mb-16 animate-slide-up">
          <h1 className="text-5xl md:text-7xl font-black mb-6">Strategic <span className="gradient-text">Solutions</span></h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">Future-proof your business with engineering excellence. Choose the path that matches your current growth stage.</p>
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
              <p className="text-sm text-muted-foreground">High-performance digital engineering.</p>
              
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
                  <h2 className="text-4xl font-black mb-6">Custom <span className="text-primary">Enterprise Innovation</span></h2>
                  <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                    We engineer high-performance, bespoke systems tailored to your unique business logic. From high-scale cloud architectures to intuitive enterprise platforms, we turn complex requirements into competitive advantages.
                  </p>
                  <ul className="space-y-4 mb-10">
                    {[
                      "Full-Stack Product Engineering",
                      "Distributed Cloud Architecture (AWS/GCP)",
                      "Enterprise-Grade Security Protocols",
                      "High-Conversion UI/UX Design",
                      "Legacy System Modernization"
                    ].map((item) => (
                      <li key={item} className="flex items-center gap-3">
                        <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center">
                          <Check className="w-3 h-3 text-primary" />
                        </div>
                        <span className="font-medium text-foreground/80">{item}</span>
                      </li>
                    ))}
                  </ul>
                  <Button variant="hero" size="lg" className="group" onClick={() => setIsInquiryModalOpen(true)}>
                    Consult with our Architects
                    <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  {[Code, Palette, Target, Server].map((Icon, idx) => (
                    <div key={idx} className="p-8 rounded-2xl bg-white/5 border border-white/5 flex flex-col items-center text-center group/item hover:bg-white/10 transition-colors">
                      <Icon className="w-10 h-10 text-primary mb-4" />
                      <span className="text-sm font-bold opacity-60">
                        {idx === 0 ? "Backend" : idx === 1 ? "Product Design" : idx === 2 ? "Analytics" : "Infrastructure"}
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
                  <h2 className="text-4xl font-black mb-6">Managed <span className="text-accent">Technology Services</span></h2>
                  <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                    Eliminate downtime and focus on your core business. Our managed services provide a dedicated technical team to maintain, secure, and optimize your digital infrastructure 24/7.
                  </p>
                  <ul className="space-y-4 mb-10">
                    {[
                      "Proactive Security & Patch Management",
                      "System Optimization & Load Balancing",
                      "Automated Cloud Backups & Recovery",
                      "Dedicated Support Desk (2-Hour SLA)",
                      "Continuous Performance Monitoring"
                    ].map((item) => (
                      <li key={item} className="flex items-center gap-3">
                        <div className="w-5 h-5 rounded-full bg-accent/20 flex items-center justify-center">
                          <Check className="w-3 h-3 text-accent" />
                        </div>
                        <span className="font-medium text-foreground/80">{item}</span>
                      </li>
                    ))}
                  </ul>
                  <Button variant="secondary" size="lg" className="bg-accent hover:bg-accent/90 text-white font-bold h-14 px-10" onClick={() => setIsInquiryModalOpen(true)}>
                    Request Service Audit
                  </Button>
                </div>
                <div className="relative">
                  <div className="absolute inset-0 bg-accent/10 blur-3xl rounded-full"></div>
                  <div className="relative p-8 rounded-2xl bg-white/5 border border-white/10">
                    <h4 className="text-xl font-bold mb-6">SLA Performance</h4>
                    <div className="space-y-6">
                      {[
                        { label: "Platform Uptime", value: "99.99%" },
                        { label: "Incident Response", value: "< 60 Mins" },
                        { label: "Security Compliance", value: "Verified" }
                      ].map((stat) => (
                        <div key={stat.label}>
                          <div className="flex justify-between mb-2">
                            <span className="text-sm text-muted-foreground">{stat.label}</span>
                            <span className="text-sm font-bold text-accent">{stat.value}</span>
                          </div>
                          <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
                            <div className="h-full bg-accent" style={{ width: '95%' }}></div>
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
                <h2 className="text-4xl font-black mb-6">Verified <span className="text-muted-foreground">Software Marketplace</span></h2>
                <p className="text-lg text-muted-foreground mb-10 leading-relaxed">
                  Accelerate your launch with industry-proven, white-label solutions. Our marketplace features zero-setup, enterprise-ready software for retail, education, and professional services.
                </p>
                <div className="grid sm:grid-cols-3 gap-6 mb-12">
                  {["Retail Systems", "Legal Tech", "Education ERP"].map((item) => (
                    <div key={item} className="p-6 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors">
                      <span className="font-bold text-foreground/80">{item}</span>
                    </div>
                  ))}
                </div>
                <Button variant="outline" size="lg" className="px-12 h-14 border-white/10 font-bold hover:bg-white/5" onClick={() => navigate("/products")}>
                  Enter the Marketplace
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
