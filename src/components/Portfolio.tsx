import { useState } from "react";
import { ExternalLink, Github, ArrowRight, Loader2, Target, Zap, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useGetProjectsQuery, Project } from "@/store/apiSlice";
import { initialProjects } from "@/data/initialData";

const Portfolio = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("All");
  const { data: firestoreProjects, isLoading } = useGetProjectsQuery(undefined);

  const categories = ["All", "Enterprise Innovation", "Managed Tech Services", "Verified Marketplace"];

  if (isLoading) {
    return (
      <div className="py-24 flex justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  const otherProjects = firestoreProjects?.filter(
    fp => !initialProjects.some(ip => ip.title === fp.title)
  ) || [];
  
  const allProjects = [...initialProjects, ...otherProjects] as Project[];

  const filteredProjects = activeTab === "All" 
    ? allProjects 
    : allProjects.filter(p => p.category === activeTab);

  return (
    <div className="relative">
      <section className="py-32 px-4 relative overflow-hidden bg-gradient-to-b from-background to-accent/5">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16 animate-slide-up">
            <h2 className="text-5xl md:text-7xl font-black mb-6">
              Engineering <span className="gradient-text">Excellence</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              We don't just build software; we engineer competitive advantages. Explore our high-impact transformations.
            </p>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-3 mb-16 animate-slide-up" style={{ animationDelay: '0.1s' }}>
            {categories.map((cat) => (
              <Button
                key={cat}
                variant={activeTab === cat ? "hero" : "outline"}
                className={`rounded-full px-8 ${activeTab === cat ? "shadow-lg shadow-primary/20" : "border-white/10"}`}
                onClick={() => setActiveTab(cat)}
              >
                {cat}
              </Button>
            ))}
          </div>

          {/* Projects Grid */}
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            {filteredProjects.map((project, idx) => (
              <div 
                key={project.id || project.title} 
                className="glass-card rounded-3xl overflow-hidden hover-lift group border border-white/10 animate-slide-up"
                style={{ animationDelay: `${0.1 * idx}s` }}
              >
                <div className="relative h-72 overflow-hidden">
                  <img
                    src={project.image || "/api/placeholder/800/600"}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-8">
                    <span className="text-xs font-bold text-primary-glow bg-primary/20 backdrop-blur-md px-4 py-1 rounded-full w-fit mb-4 uppercase tracking-widest">
                      {project.category}
                    </span>
                    <h3 className="text-3xl font-black text-white mb-2 leading-tight">
                      {project.title}
                    </h3>
                  </div>
                  
                  {/* Quick Action Overlay */}
                  <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="flex gap-2">
                       {project.liveUrl && (
                        <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="p-3 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 transition-colors">
                          <ExternalLink className="w-5 h-5 text-white" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>

                <div className="p-8">
                  <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-8">
                    {project.tech?.map((tech, idx) => (
                      <span key={idx} className="text-xs font-bold uppercase tracking-wider bg-white/5 border border-white/5 px-3 py-1 rounded text-muted-foreground">
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between pt-6 border-t border-white/5">
                    <Button 
                      variant="ghost" 
                      className="text-primary hover:text-primary-glow p-0 h-auto gap-2 font-bold group/btn" 
                      onClick={() => navigate(`/portfolio/${project.id}`)}
                    >
                      Explore Case Study
                      <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
                    </Button>
                    <div className="flex gap-4 opacity-40">
                      <Zap className="w-5 h-5" />
                      <Target className="w-5 h-5" />
                      <Award className="w-5 h-5" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Portfolio CTA */}
          <div className="glass-card p-16 rounded-[2.5rem] text-center max-w-4xl mx-auto border border-primary/20 relative overflow-hidden group">
            <div className="absolute inset-0 bg-primary/5 group-hover:bg-primary/10 transition-colors"></div>
            <div className="relative z-10">
              <h3 className="text-4xl font-black mb-6 leading-tight">Ready to Engineer Your <span className="gradient-text">Success?</span></h3>
              <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed">
                Contact Twende Digital today to discuss your enterprise requirements, get a technical audit, or start your digital transformation.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Button variant="hero" size="lg" className="h-16 px-12 text-lg font-bold" onClick={() => navigate("/contact")}>
                  Schedule a Consultation
                </Button>
                <Button variant="outline" size="lg" className="h-16 px-12 text-lg font-bold border-white/10" onClick={() => navigate("/services")}>
                  View Service Models
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Background Elements */}
        <div className="absolute top-40 left-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] -z-10 animate-pulse-glow"></div>
        <div className="absolute bottom-40 right-0 w-[600px] h-[600px] bg-accent/10 rounded-full blur-[120px] -z-10 animate-pulse-glow" style={{ animationDelay: '3s' }}></div>
      </section>
    </div>
  );
};

export default Portfolio;