import { useState } from "react";
import { Code, Palette, Settings, Shield, Rocket, Server, Users, Target } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

// Reusable Modal Component
const Modal = ({ service, onClose }: { service: any; onClose: () => void }) => {
  if (!service) return null;

  const Icon = service.icon; // Capitalized for proper JSX rendering

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-background rounded-xl p-8 max-w-2xl w-full relative shadow-xl animate-slide-up overflow-y-auto max-h-[80vh]">
        <button
          className="absolute top-4 right-4 text-muted-foreground hover:text-primary text-2xl font-bold"
          onClick={onClose}
        >
          ✕
        </button>
        <div className="flex items-center mb-6">
          <Icon className="w-10 h-10 text-primary mr-4" />
          <h2 className="text-2xl font-bold">{service.title}</h2>
        </div>
        {/* Detailed Description */}
        <p className="text-muted-foreground mb-4">{service.description}</p>
        <p className="text-muted-foreground mb-4">
          {service.longDescription
            ? service.longDescription
            : "Learn more about this service to understand how we can provide professional solutions tailored for your needs."}
        </p>
        {/* Full Features List */}
        <ul className="list-disc list-inside space-y-2 mb-4">
          {service.features.map((f: string, i: number) => (
            <li key={i}>{f}</li>
          ))}
        </ul>
        <Button variant="hero" className="w-full" onClick={onClose}>
          Close
        </Button>
      </div>
    </div>
  );
};

// Main Services Page
const Services = () => {
  const navigate = useNavigate();
  const [selectedService, setSelectedService] = useState<any>(null);

  const goToContact = () => navigate("/contact");
  const goToPortfolio = () => navigate("/portfolio");

  // Services Array with details
  const services = [
    {
      icon: Users,
      title: "On-Demand Software Team",
      description: "Hire a dedicated development team without full-time costs.",
      longDescription:
        "Our On-Demand Software Team service allows you to scale your team flexibly, ensuring your projects are delivered efficiently without the overhead of permanent hires. Ideal for startups, small businesses, and enterprises seeking technical excellence.",
      features: [
        "System updates",
        "Website maintenance",
        "Bug fixing",
        "Small feature development",
        "App support",
        "Database management",
        "UI/UX updates",
        "Security checks",
        "Backups",
        "Cloud hosting management",
        "WhatsApp & email support",
        "Monthly reporting",
      ],
      color: "text-primary"
    },
    {
      icon: Code,
      title: "Custom Software Development",
      description: "We design and build complete systems from scratch.",
      longDescription:
        "From concept to deployment, we craft tailored software solutions, including web apps, mobile apps, admin dashboards, APIs, and CRM/ERP systems. Our approach ensures scalable, maintainable, and high-performance solutions.",
      features: [
        "Web applications",
        "Mobile apps",
        "Admin dashboards",
        "API development",
        "CRM / ERP systems"
      ],
      color: "text-accent"
    },
    {
      icon: Shield,
      title: "IT Support & Maintenance",
      description: "Continuous management to ensure system performance, security, and reliability.",
      longDescription:
        "Our IT Support & Maintenance service guarantees that your systems run smoothly, remain secure, and are optimized for performance. We provide proactive monitoring, database optimization, security audits, and monthly reports.",
      features: [
        "Monitoring",
        "Database optimization",
        "Security audits",
        "Backup management",
        "Monthly system reports"
      ],
      color: "text-primary-glow"
    },
    {
      icon: Palette,
      title: "UI/UX & Branding Design",
      description: "Improving user experience and visual identity.",
      longDescription:
        "We enhance your brand's digital presence through professional UI/UX design and branding solutions. From redesigning interfaces to creating logos and full brand identities, we make your applications visually appealing and user-friendly.",
      features: [
        "UI redesign",
        "UX improvement",
        "Logos and branding",
        "Design for websites and apps"
      ],
      color: "text-accent-glow"
    },
    {
      icon: Server,
      title: "Cloud Hosting & Deployment",
      description: "Deploy and manage systems on modern cloud platforms.",
      longDescription:
        "We deploy and manage your applications on cloud platforms like AWS, DigitalOcean, Google Cloud, and VPS servers. Our services include performance tuning, scaling, and security management for reliable cloud operations.",
      features: [
        "AWS, DigitalOcean, Google Cloud, VPS servers",
        "Performance tuning",
        "Scaling",
        "Security management"
      ],
      color: "text-primary"
    },
    {
      icon: Settings,
      title: "Tech Consultation",
      description: "Professional advice for digital transformation and technical planning.",
      longDescription:
        "We provide expert guidance for digital transformation and technical planning, helping your business adopt the right technology strategies, improve processes, and plan for scalable growth.",
      features: [
        "Digital transformation guidance",
        "System architecture planning",
        "Improving business operations",
        "Technical planning"
      ],
      color: "text-accent"
    }
  ];

  return (
    <section className="relative py-24 px-4 overflow-hidden">
      {/* Section Header */}
      <div className="max-w-6xl mx-auto text-center animate-slide-up">
        <h2 className="text-5xl md:text-6xl font-black mb-6">
          Our <span className="gradient-text">Services</span>
        </h2>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-16 leading-relaxed">
          Full range of digital services for businesses, schools, startups, and organizations, designed to help you thrive without the cost of a full-time team.
        </p>
      </div>

      {/* Services Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto mb-24">
        {services.map((service) => (
          <div key={service.title} className="glass-card p-8 rounded-xl hover-lift group relative overflow-hidden">
            <div className={`absolute -top-10 -right-10 w-20 h-20 ${service.color} opacity-10 rounded-full blur-xl group-hover:opacity-20 transition-opacity`} />
            <div className="relative z-10">
              <service.icon className={`w-12 h-12 ${service.color} mb-6 group-hover:scale-110 transition-transform`} />
              <h3 className="text-xl font-bold mb-4 group-hover:text-primary transition-colors">{service.title}</h3>
              <p className="text-muted-foreground mb-6 leading-relaxed">{service.description}</p>
              <ul className="space-y-2 mb-6">
                {service.features.slice(0, 5).map((feature, idx) => (
                  <li key={idx} className="flex items-center text-sm">
                    <div className={`w-2 h-2 rounded-full ${service.color} mr-3 opacity-60`} />
                    <span className="text-muted-foreground">{feature}</span>
                  </li>
                ))}
                {service.features.length > 5 && (
                  <li
                    className="text-sm text-primary font-medium cursor-pointer"
                    onClick={() => setSelectedService(service)}
                  >
                    +{service.features.length - 5} more… Learn More
                  </li>
                )}
              </ul>
              <Button
                variant="ghost"
                className="w-full group-hover:bg-muted/20"
                onClick={() => setSelectedService(service)}
              >
                Learn More
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* CTA Section */}
      <div className="glass-card p-12 rounded-xl text-center max-w-4xl mx-auto">
        <h3 className="text-3xl font-bold mb-4">Ready to Start Your Project?</h3>
        <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
          Discuss how Twende Digital can transform your ideas into scalable software solutions that deliver real business results.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button variant="hero" size="lg" className="group" onClick={goToContact}>
            Get Free Consultation
          </Button>
          <Button variant="glass" size="lg" onClick={goToPortfolio}>
            View Portfolio
          </Button>
        </div>
      </div>

      {/* Modal */}
      {selectedService && <Modal service={selectedService} onClose={() => setSelectedService(null)} />}

      {/* Background Glow Effects */}
      <div className="absolute top-1/3 right-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl animate-pulse-glow"></div>
      <div className="absolute bottom-1/3 left-10 w-64 h-64 bg-accent/5 rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: '2s' }}></div>
    </section>
  );
};

export default Services;
