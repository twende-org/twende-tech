import { Code, Smartphone, Palette, Settings, Shield, Rocket } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Services = () => {
  const navigate = useNavigate();

  const goToContact = () => {
    navigate("/contact");
  };

  const goToPortfolio = () => {
    navigate("/portfolio");
  };

  const services = [
    {
      icon: Code,
      title: "Web Development",
      description: "Modern, responsive web applications built with React, Next.js, and cutting-edge technologies.",
      features: ["Custom Web Apps", "E-commerce Solutions", "Progressive Web Apps", "API Development"],
      color: "text-primary"
    },
    {
      icon: Smartphone,
      title: "Mobile App Development",
      description: "Native and cross-platform mobile applications that provide exceptional user experiences.",
      features: ["React Native Apps", "Flutter Development", "iOS & Android", "App Store Optimization"],
      color: "text-accent"
    },
    {
      icon: Palette,
      title: "UI/UX Design",
      description: "Beautiful, intuitive designs that convert visitors into customers and drive engagement.",
      features: ["User Interface Design", "User Experience Research", "Design Systems", "Prototyping"],
      color: "text-primary-glow"
    },
    {
      icon: Settings,
      title: "Software Consulting",
      description: "Strategic technology guidance to help you make informed decisions about your digital presence.",
      features: ["Technology Strategy", "Architecture Planning", "Code Reviews", "Performance Optimization"],
      color: "text-accent-glow"
    },
    {
      icon: Shield,
      title: "Maintenance & Support",
      description: "Ongoing support and maintenance to keep your applications running smoothly and securely.",
      features: ["24/7 Monitoring", "Security Updates", "Performance Optimization", "Bug Fixes"],
      color: "text-primary"
    },
    {
      icon: Rocket,
      title: "Custom Software Solutions",
      description: "Tailored software solutions designed specifically for your unique business requirements.",
      features: ["Business Automation", "Custom Integrations", "Legacy System Modernization", "Scalable Architecture"],
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
          Comprehensive software development services designed to bring your digital vision to life
          with precision, creativity, and technical excellence.
        </p>
      </div>

      {/* Services Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto mb-24 animate-slide-up" style={{ animationDelay: '0.2s' }}>
        {services.map((service) => (
          <div key={service.title} className="glass-card p-8 rounded-xl hover-lift group relative overflow-hidden">
            <div className={`absolute -top-10 -right-10 w-20 h-20 ${service.color} opacity-10 rounded-full blur-xl group-hover:opacity-20 transition-opacity`}></div>
            <div className="relative z-10">
              <service.icon className={`w-12 h-12 ${service.color} mb-6 group-hover:scale-110 transition-transform`} />
              <h3 className="text-xl font-bold mb-4 group-hover:text-primary transition-colors">{service.title}</h3>
              <p className="text-muted-foreground mb-6 leading-relaxed">{service.description}</p>
              <ul className="space-y-2 mb-6">
                {service.features.map((feature, index) => (
                  <li key={index} className="flex items-center text-sm">
                    <div className={`w-2 h-2 rounded-full ${service.color} mr-3 opacity-60`} />
                    <span className="text-muted-foreground">{feature}</span>
                  </li>
                ))}
              </ul>
              <Button variant="ghost" className="w-full group-hover:bg-muted/20">
                Learn More
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* CTA Section */}
      <div className="glass-card p-12 rounded-xl text-center max-w-4xl mx-auto animate-slide-up" style={{ animationDelay: '0.4s' }}>
        <h3 className="text-3xl font-bold mb-4">Ready to Start Your Project?</h3>
        <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
          Let’s discuss how we can help transform your ideas into powerful, scalable software solutions that drive real business results.
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

      {/* Background Glow Effects */}
      <div className="absolute top-1/3 right-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl animate-pulse-glow"></div>
      <div className="absolute bottom-1/3 left-10 w-64 h-64 bg-accent/5 rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: '2s' }}></div>
    </section>
  );
};

export default Services;
