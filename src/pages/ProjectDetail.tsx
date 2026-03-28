import { useParams, useNavigate } from "react-router-dom";
import { initialProjects } from "@/data/initialData";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ExternalLink, Github, CheckCircle2, Globe, Cpu, Trophy } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const ProjectDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const project = initialProjects.find((p) => p.id === id);

  if (!project) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4">
        <h2 className="text-2xl font-bold mb-4">Project Not Found</h2>
        <Button onClick={() => navigate("/")}>Return Home</Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <Button 
          variant="ghost" 
          className="mb-8 gap-2 hover:bg-primary/10 hover:text-primary transition-colors"
          onClick={() => navigate("/")}
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Portfolio
        </Button>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Project Image & Tech */}
          <div className="space-y-8 animate-slide-up">
            <div className="relative group overflow-hidden rounded-3xl border border-border/50 aspect-video shadow-2xl">
              <img 
                src={project.image} 
                alt={project.title} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-60"></div>
            </div>

            <div className="glass-card p-8 rounded-3xl border-border/50">
              <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                <Cpu className="w-5 h-5 text-primary" />
                Technologies Used
              </h3>
              <div className="flex flex-wrap gap-2">
                {project.tech.map((tech) => (
                  <Badge 
                    key={tech} 
                    variant="secondary" 
                    className="bg-primary/5 hover:bg-primary/10 text-primary border-primary/20 px-3 py-1 text-sm transition-colors"
                  >
                    {tech}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="flex gap-4">
              {project.liveUrl && (
                <Button variant="hero" className="flex-1 gap-2 rounded-xl h-12" asChild>
                  <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                    <Globe className="w-4 h-4" />
                    Live Demo
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </Button>
              )}
              {project.githubUrl && (
                <Button variant="outline" className="flex-1 gap-2 rounded-xl h-12 border-border/50" asChild>
                  <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                    <Github className="w-4 h-4" />
                    View Code
                  </a>
                </Button>
              )}
            </div>
          </div>

          {/* Project Content */}
          <div className="space-y-10 animate-slide-up" style={{ animationDelay: '0.1s' }}>
            <div>
              <Badge variant="outline" className="mb-4 text-primary border-primary/30 px-3 py-1">
                {project.category}
              </Badge>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 leading-tight">
                {project.title}
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed">
                {project.description}
              </p>
            </div>

            {/* Challenge */}
            <div className="relative pl-8 border-l-2 border-primary/20">
              <div className="absolute -left-[5px] top-0 w-2 h-2 bg-primary rounded-full"></div>
              <h3 className="text-2xl font-bold mb-4">The Challenge</h3>
              <p className="text-muted-foreground leading-relaxed italic">
                "{project.challenge}"
              </p>
            </div>

            {/* Solution */}
            <div className="relative pl-8 border-l-2 border-accent/20">
              <div className="absolute -left-[5px] top-0 w-2 h-2 bg-accent rounded-full"></div>
              <h3 className="text-2xl font-bold mb-4">Our Solution</h3>
              <p className="text-muted-foreground leading-relaxed">
                {project.solution}
              </p>
            </div>

            {/* Results */}
            <div className="glass-card p-8 rounded-3xl border-primary/20 bg-primary/5">
              <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <Trophy className="w-6 h-6 text-yellow-500" />
                Key Results
              </h3>
              <ul className="space-y-4">
                {project.results?.map((result, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                    <span className="text-lg font-medium">{result}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetail;
