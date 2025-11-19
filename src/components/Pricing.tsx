import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useState } from "react";

// Package Card Component
const PackageCard = ({ pkg, onSelect }: { pkg: any; onSelect: (pkg: any) => void }) => {
  return (
    <div className="glass-card p-8 rounded-xl hover-lift transition-transform flex flex-col justify-between">
      <div>
        <h3 className="text-2xl font-bold mb-2">{pkg.name}</h3>
        <p className="text-muted-foreground mb-4">{pkg.description}</p>
        <p className="text-3xl font-extrabold mb-4">{pkg.price}</p>
        <ul className="space-y-2 mb-6 text-sm">
          {pkg.features.map((f: string, idx: number) => (
            <li key={idx} className="flex items-center">
              <span className="w-2 h-2 bg-primary rounded-full mr-3 opacity-70" />
              <span className="text-muted-foreground">{f}</span>
            </li>
          ))}
        </ul>
      </div>
      {/* <Button variant="hero" size="lg" className="w-full" onClick={() => onSelect(pkg)}>
        Choose Plan
      </Button> */}
    </div>
  );
};

// Pricing Page
const Pricing = () => {
  const navigate = useNavigate();
  const [selectedPackage, setSelectedPackage] = useState<any>(null);

  const packages = [
    {
      name: "Starter",
      price: "150,000 TZS / Month",
      description: "Best for small businesses, NGOs, individuals, churches",
      features: [
        "2 updates per month",
        "Bug fixing",
        "Hosting management",
        "Weekly backups",
        "Basic security",
        "WhatsApp support (Mon–Fri)",
      ],
    },
    {
      name: "Standard",
      price: "300,000 TZS / Month",
      description: "Best for schools, clinics, hotels, SACCOs",
      features: [
        "Up to 6 updates per month",
        "Small new features",
        "Small API integrations",
        "Daily backups",
        "Security monitoring",
        "WhatsApp support (7 days)",
        "Monthly performance report",
      ],
    },
    {
      name: "Growth",
      price: "600,000 TZS / Month",
      description: "Best for large schools, hospitals, companies",
      features: [
        "Unlimited updates",
        "New features every month",
        "Priority support",
        "Dedicated developer (10 hrs/month)",
        "System optimization",
        "Custom dashboards",
        "Full hosting + security",
      ],
    },
    {
      name: "Enterprise",
      price: "1,000,000+ TZS / Month",
      description: "Government institutions, large organizations",
      features: [
        "Dedicated developer or team",
        "Unlimited features",
        "On-site support",
        "Complete system redesign (optional)",
        "Custom integrations",
        "Training & documentation",
      ],
    },
  ];

  return (
    <section className="relative py-24 px-4 overflow-hidden">
      <div className="max-w-6xl mx-auto text-center animate-slide-up mb-16">
        <h2 className="text-5xl md:text-6xl font-black mb-6">
          Pricing & <span className="gradient-text">Packages</span>
        </h2>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
          Twende Digital provides flexible, transparent pricing for businesses of all sizes. Choose a plan that fits your needs and budget.
        </p>
      </div>

      {/* Packages Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto mb-24">
        {packages.map((pkg) => (
          <PackageCard key={pkg.name} pkg={pkg} onSelect={setSelectedPackage} />
        ))}
      </div>

      {/* Optional Add-Ons */}
      <div className="max-w-6xl mx-auto text-center mb-24 animate-slide-up">
        <h3 className="text-3xl font-bold mb-6">Optional Add-On Services</h3>
        <ul className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 list-disc list-inside text-muted-foreground text-left">
          <li>SMS Integration (80–120 TZS per SMS, Setup 50,000 TZS)</li>
          <li>Domain Registration (.tz: 25,000–35,000 TZS/year, .com: 45,000–55,000 TZS/year)</li>
          <li>Web Hosting (Basic: 60,000 TZS/year, Business: 120,000 TZS/year, VPS Setup: 150,000–300,000 TZS)</li>
          <li>Extra Developer Hours (40,000 TZS/hour, bundles available)</li>
          <li>Social Media Management (200,000–700,000 TZS/month depending on package)</li>
          <li>Staff Training & Digital Literacy (100,000 TZS/session, max 10 staff)</li>
          <li>Advanced Security Package (100,000–300,000 TZS/month)</li>
          <li>Data Migration Service (150,000–700,000 TZS depending on size/complexity)</li>
        </ul>
      </div>

      {/* CTA Section */}
      <div className="glass-card p-12 rounded-xl text-center max-w-4xl mx-auto animate-slide-up">
        <h3 className="text-3xl font-bold mb-4">Need Custom Solutions?</h3>
        <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
          Contact Twende Digital today to discuss your requirements, get a tailored quote, or start a subscription.
        </p>
        <Button variant="hero" size="lg" className="group" onClick={() => navigate("/contact")}>
          Get Free Consultation
        </Button>
      </div>

      {/* Background Glow Effects */}
      <div className="absolute top-1/3 right-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl animate-pulse-glow"></div>
      <div className="absolute bottom-1/3 left-10 w-64 h-64 bg-accent/5 rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: '2s' }}></div>
    </section>
  );
};

export default Pricing;
