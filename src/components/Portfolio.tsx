import { ExternalLink, Github, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import ecotradePlatform from "@/assets/portfolio/ecotrade-platform.webp";
import healthtrackMobile from "@/assets/portfolio/healthtrack-mobile.webp";
import financeflowDashboard from "@/assets/portfolio/financeflow-dashboard.webp";
import educonnectPlatform from "@/assets/portfolio/educonnect-platform.webp";
import restaurantproSystem from "@/assets/portfolio/restaurantpro-system.webp";
import travelguideApp from "@/assets/portfolio/travelguide-app.webp";


const Portfolio = () => {
  const projects = [
    {
      title: "EcoTrade Platform",
      description: "A comprehensive e-commerce platform for sustainable products with advanced filtering and payment integration.",
      image: ecotradePlatform,
      tech: ["React", "Node.js", "Stripe", "MongoDB"],
      category: "E-commerce",
      liveUrl: "#",
      githubUrl: "#"
    },
    {
      title: "HealthTrack Mobile",
      description: "Cross-platform mobile app for health monitoring with real-time data visualization and doctor consultations.",
      image: healthtrackMobile,
      tech: ["React Native", "Firebase", "Chart.js", "Push Notifications"],
      category: "Mobile App",
      liveUrl: "#",
      githubUrl: "#"
    },
    {
      title: "FinanceFlow Dashboard",
      description: "Modern financial dashboard with advanced analytics, real-time data updates, and interactive charts.",
      image: financeflowDashboard,
      tech: ["Next.js", "TypeScript", "D3.js", "PostgreSQL"],
      category: "Web App",
      liveUrl: "#",
      githubUrl: "#"
    },
    {
      title: "EduConnect Platform",
      description: "Educational platform connecting students and teachers with live video sessions and collaborative tools.",
      image: educonnectPlatform,
      tech: ["React", "WebRTC", "Socket.io", "AWS"],
      category: "Education",
      liveUrl: "#",
      githubUrl: "#"
    },
    {
      title: "RestaurantPro System",
      description: "Complete restaurant management system with POS, inventory tracking, and customer analytics.",
      image: restaurantproSystem,
      tech: ["Vue.js", "Laravel", "MySQL", "Payment Gateway"],
      category: "Business System",
      liveUrl: "#",
      githubUrl: "#"
    },
    {
      title: "TravelGuide App",
      description: "Interactive travel guide with offline maps, local recommendations, and social sharing features.",
      image: travelguideApp,
      tech: ["Flutter", "Google Maps", "Firebase", "Offline Storage"],
      category: "Travel App",
      liveUrl: "#",
      githubUrl: "#"
    }
  ];

  return (
    <div>
  

    <section className="py-24 px-4 relative">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-black mb-6">
            Our <span className="gradient-text">Portfolio</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Showcasing our expertise through successful projects that have helped businesses 
            achieve their digital transformation goals.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {projects.map((project, index) => (
            <div key={project.title} className="glass-card rounded-xl overflow-hidden hover-lift group">
              {/* Project Image */}
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={project.image} 
                  alt={`${project.title} - ${project.category}`}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                  <div className="flex gap-3">
                    <Button variant="secondary" size="sm">
                      <ExternalLink className="w-4 h-4" />
                    </Button>
                    <Button variant="secondary" size="sm">
                      <Github className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>

              {/* Project Content */}
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-medium text-primary bg-primary/10 px-3 py-1 rounded-full">
                    {project.category}
                  </span>
                </div>
                
                <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">
                  {project.title}
                </h3>
                
                <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                  {project.description}
                </p>
                
                {/* Tech Stack */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tech.map((tech, techIndex) => (
                    <span key={techIndex} className="text-xs bg-muted/30 px-2 py-1 rounded text-muted-foreground">
                      {tech}
                    </span>
                  ))}
                </div>
                
                {/* Action Links */}
                <div className="flex items-center justify-between">
                  <Button variant="ghost" size="sm" className="p-0">
                    View Details
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Portfolio CTA */}
        <div className="text-center">
          <div className="glass-card p-8 rounded-xl inline-block">
            <h3 className="text-2xl font-bold mb-4">Want to See More?</h3>
            <p className="text-muted-foreground mb-6 max-w-lg">
              Explore our complete portfolio with detailed case studies, client testimonials, 
              and technical deep-dives.
            </p>
            <Button variant="hero" size="lg">
              View Full Portfolio
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </div>
        </div>
      </div>

      {/* Background Elements */}
      <div className="absolute top-40 left-0 w-80 h-80 bg-accent/5 rounded-full blur-3xl animate-pulse-glow"></div>
      <div className="absolute bottom-40 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: '3s' }}></div>
    </section>

    


    </div>
  );
};

export default Portfolio;