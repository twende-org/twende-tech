import { ExternalLink, Github, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import twendedocs from "@/assets/portfolio/twendedocs.png";
import tuleteApp from "@/assets/portfolio/tuleteApp.webp";
import tuleteweb from "@/assets/portfolio/tuleteweb.png";
import twendeAdmin from "@/assets/portfolio/twendeAdmin.png";
import twendedigital from "@/assets/portfolio/twendedigital.png";
// import travelguideApp from "@/assets/portfolio/travelguide-app.webp";
import { useNavigate } from "react-router-dom";


const Portfolio = () => {
  const navigate = useNavigate();
  const projects = [
    {
      title: "Twende Docs",
      description: "Professional document creation platform designed to save you time and help you present yourself effectively",
      image: twendedocs,
      tech: ["React Typescript", "Django", "Azam Pesa", "PostgreSQL"],
      category: "E-Document",
      liveUrl: "https://docs.twendedigital.tech",
      githubUrl: "https://github.com/FineDR/document_project"
    },
    {
      title: "Tulete App",
      description: "Tulete is your one-stop app for anything you need. Order food, shop for anything, anytime, anywhere, and enjoy convenient laundry services.",
      image: tuleteApp,
      tech: ["Flutter", "Firebase", "Google Maps", "Push Notifications"],
      category: "Mobile App",
      liveUrl: "https://tulete.page.link/3Ds",
      githubUrl: "https://github.com/mushi2/Tulete-Client-New/tree/master"
    },
    {
      title: "Tulete Web",
      description: "Tulete connects you to the best vetted restaurants, vetted convenient shopping stores, and laundry services all through one powerful mobile app. Experience convenience like never before in Dodoma, Tanzania.",
      image: tuleteweb,
      tech: ["React Typescript", "Tailwind CSS"],
      category: "Web App",
      liveUrl: "https://tulete.onrender.com",
      githubUrl: "https://github.com/MushiVerse/tulete-dodoma-web"
    },

    {
      title: "Twende Digital Website",
      description: "Professional software development by skilled Tanzanian developers. We create exceptional web applications, mobile solutions, and custom software for international clients.",
      image: twendedigital,
      tech: ["React Typescript", "Tailwind CSS"],
      category: "Website",
      liveUrl: "https://twendedigital.tech",
      githubUrl: "https://github.com/twende-org/twende-tech/"
    },
    {
      title: "Twende Admin",
      description: "The Twende Digital Website Portal",
      image: twendeAdmin,
      tech: ["React Typescript", "Express JS", "Tailwind CSS"],
      category: "Web System",
      liveUrl: "https://twendedigital.tech/admin",
      githubUrl: "https://github.com/twende-org/twende-tech/"
    },

  ];

  return (
    <div>


      <section className="py-24 px-4 relative overflow-hidden">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16 animate-slide-up">
            <h2 className="text-5xl md:text-6xl font-black mb-6">
              Our <span className="gradient-text">Works</span>
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
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Button variant="secondary" size="sm">
                          <ExternalLink className="w-4 h-4" />
                        </Button>
                      </a>
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Button variant="secondary" size="sm">
                          <Github className="w-4 h-4" />
                        </Button>
                      </a>
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
                    <Button variant="ghost" size="sm" className="p-6">
                      View Details
                      <ArrowRight className="w-4 h-4 ml-1" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Portfolio CTA */}
          <div className="glass-card p-12 rounded-xl text-center max-w-4xl mx-auto animate-slide-up">
            <h3 className="text-3xl font-bold mb-4">Need Custom Solutions?</h3>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
              Contact Twende Digital today to discuss your requirements, get a tailored quote, or start yours.
            </p>
            <Button variant="hero" size="lg" className="group" onClick={() => navigate("/contact")}>
              Get Free Consultation
            </Button>
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