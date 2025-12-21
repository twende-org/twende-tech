import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useState } from "react";

// Package Card Component
const PackageCard = ({ pkg }: { pkg: any }) => {
  return (
    <div className="glass-card p-8 rounded-xl hover-lift transition-transform flex flex-col justify-between">
      <div>
        {/* Support badge */}
        <span className="inline-block text-xs uppercase tracking-wide mb-3 px-3 py-1 rounded-full bg-primary/10 text-primary">
          Monthly Support Plan
        </span>

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
    </div>
  );
};

// Pricing Page
const Pricing = () => {
  const navigate = useNavigate();
  const [selectedPackage, setSelectedPackage] = useState<any>(null);

  const packages = [
    {
      name: "Support Starter",
      price: "150,000 TZS / Month",
      description: "Monthly maintenance & support for small organizations",
      features: [
        "Up to 2 content or system updates per month",
        "Bug fixing & minor issues",
        "Hosting management",
        "Weekly backups",
        "Basic security checks",
        "WhatsApp support (Mon–Fri)",
      ],
    },
    {
      name: "Support Standard",
      price: "300,000 TZS / Month",
      description: "Ongoing support for schools, clinics, hotels & SACCOs",
      features: [
        "Up to 6 updates per month",
        "Minor new features",
        "Small API integrations",
        "Daily backups",
        "Security monitoring",
        "WhatsApp support (7 days)",
        "Monthly performance report",
      ],
    },
    {
      name: "Support Growth",
      price: "600,000 TZS / Month",
      description: "Advanced support for large organizations & companies",
      features: [
        "Unlimited updates",
        "Continuous feature improvements",
        "Priority support",
        "Dedicated developer (10 hrs/month)",
        "System optimization",
        "Custom dashboards",
        "Full hosting & security management",
      ],
    },
    {
      name: "Enterprise Support",
      price: "1,000,000+ TZS / Month",
      description: "Government institutions & large-scale systems",
      features: [
        "Dedicated developer or support team",
        "Unlimited improvements",
        "On-site support (when required)",
        "Major redesigns (quoted separately)",
        "Custom integrations",
        "Training & documentation",
      ],
    },
  ];

  return (
    <section className="relative py-24 px-4 overflow-hidden">
      <div className="max-w-6xl mx-auto text-center animate-slide-up mb-12">
        <h2 className="text-5xl md:text-6xl font-black mb-6">
          Support & <span className="gradient-text">Maintenance Plans</span>
        </h2>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
          These are <strong>monthly support subscriptions</strong> for existing websites
          and systems.
          <br />
          <span className="text-base opacity-80">
            New website or software development is quoted separately.
          </span>
        </p>
      </div>

      {/* Included / Not Included */}
      <div className="max-w-4xl mx-auto mb-20 grid md:grid-cols-2 gap-6">
        <div className="glass-card p-6 rounded-lg text-left">
          <h4 className="font-bold mb-2 text-green-500">✔ Included</h4>
          <ul className="text-sm text-muted-foreground space-y-1">
            <li>System updates & improvements</li>
            <li>Bug fixing & maintenance</li>
            <li>Security & backups</li>
            <li>Support for existing systems</li>
          </ul>
        </div>

        <div className="glass-card p-6 rounded-lg text-left">
          <h4 className="font-bold mb-2 text-red-500">✖ Not Included</h4>
          <ul className="text-sm text-muted-foreground space-y-1">
            <li>New system or website development</li>
            <li>Large builds from scratch</li>
            <li>Major redesigns (separate quote)</li>
          </ul>
        </div>
      </div>

      {/* Packages Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto mb-24">
        {packages.map((pkg) => (
          <PackageCard key={pkg.name} pkg={pkg} />
        ))}
      </div>

      {/* Optional Add-Ons */}
      <div className="max-w-6xl mx-auto text-center mb-24 animate-slide-up">
        <h3 className="text-3xl font-bold mb-6">Optional Add-On Services</h3>
        <ul className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 list-disc list-inside text-muted-foreground text-left">
          <li>SMS Integration (80–120 TZS/SMS, Setup 50,000 TZS)</li>
          <li>Domain Registration (.tz / .com)</li>
          <li>Web Hosting & VPS setup</li>
          <li>Extra Developer Hours (40,000 TZS/hour)</li>
          <li>Social Media Management</li>
          <li>Staff Training & Digital Literacy</li>
          <li>Advanced Security Packages</li>
          <li>Data Migration Services</li>
        </ul>
      </div>

      {/* CTA */}
      <div className="glass-card p-12 rounded-xl text-center max-w-4xl mx-auto animate-slide-up">
        <h3 className="text-3xl font-bold mb-4">Need a New System or Website?</h3>
        <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
          Contact Twende Digital for a custom development quote or to start a
          support subscription.
        </p>
        <Button variant="hero" size="lg" onClick={() => navigate("/contact")}>
          Get Free Consultation
        </Button>
      </div>
    </section>
  );
};

export default Pricing;
