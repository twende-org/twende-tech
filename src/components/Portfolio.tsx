import { ExternalLink, Github, ArrowRight, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useGetProjectsQuery, Project } from "@/store/apiSlice";
import { initialProjects } from "@/data/initialData";

const Portfolio = () => {
  const navigate = useNavigate();
  const { data: firestoreProjects, isLoading } = useGetProjectsQuery(undefined);

  if (isLoading) {
    return (
      <div className="py-24 flex justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  // Merge static initial projects with dynamic firestore projects
  // Filter out firestore projects that have the same title as an initial project to avoid duplicates if seeded
  const otherProjects = firestoreProjects?.filter(
    fp => !initialProjects.some(ip => ip.title === fp.title)
  ) || [];
  
  const allProjects = [...initialProjects, ...otherProjects] as Project[];

  return (
    <div className="relative">
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
            {allProjects.map((project) => (
              <div key={project.id || project.title} className="glass-card rounded-xl overflow-hidden hover-lift group">
                {/* Project Image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={project.image || "/api/placeholder/400/300"}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <div className="flex gap-3">
                      {project.liveUrl && (
                        <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                          <Button variant="secondary" size="sm">
                            <ExternalLink className="w-4 h-4" />
                          </Button>
                        </a>
                      )}
                      {project.githubUrl && (
                        <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                          <Button variant="secondary" size="sm">
                            <Github className="w-4 h-4" />
                          </Button>
                        </a>
                      )}
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

                  <p className="text-muted-foreground text-sm mb-4 leading-relaxed line-clamp-2">
                    {project.description}
                  </p>

                  {/* Tech Stack */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tech?.map((tech, idx) => (
                      <span key={idx} className="text-xs bg-muted/30 px-2 py-1 rounded text-muted-foreground">
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Action Links */}
                  <div className="flex items-center justify-between">
                    <Button variant="ghost" size="sm" className="group-hover:text-primary p-0 h-auto" onClick={() => navigate("/contact")}>
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