import { useParams, useNavigate } from "react-router-dom";
import { initialProjects } from "@/data/initialData";
import { Button } from "@/components/ui/button";
import { 
  ArrowLeft, 
  ExternalLink, 
  CheckCircle2, 
  Globe, 
  Cpu, 
  Trophy, 
  Target, 
  Zap, 
  TrendingUp,
  Layout,
  Code2,
  Loader2
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import SEO from "@/components/SEO";
import { useGetProjectsQuery } from "@/store/apiSlice";

const ProjectDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: firestoreProjects, isLoading } = useGetProjectsQuery();
  
  // Find project in initialData OR Firestore
  const project = initialProjects.find((p) => p.id === id) || 
                  firestoreProjects?.find((p) => p.id === id);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="w-12 h-12 animate-spin text-primary" />
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-background">
        <SEO title="Project Not Found" />
        <h2 className="text-2xl font-bold mb-4 text-white">Project Not Found</h2>
        <Button onClick={() => navigate("/portfolio")}>Back to Portfolio</Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <SEO 
        title={project.title} 
        description={project.description} 
        ogImage={project.image}
      />
      
      {/* Background Orbs */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[120px] -z-10 translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-accent/5 rounded-full blur-[100px] -z-10 -translate-x-1/2 translate-y-1/2"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-24">
        {/* Navigation */}
        <nav className="flex items-center justify-between mb-16 animate-slide-up">
          <Button 
            variant="ghost" 
            className="gap-2 hover:bg-white/5 text-muted-foreground hover:text-white transition-all rounded-full px-6"
            onClick={() => navigate("/portfolio")}
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Case Studies
          </Button>
          <div className="flex gap-4">
             {project.liveUrl && (
              <Button variant="outline" className="gap-2 border-white/10 rounded-full hover:bg-white/5" asChild>
                <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                  <Globe className="w-4 h-4" />
                  Live Preview
                </a>
              </Button>
            )}
          </div>
        </nav>

        <div className="grid lg:grid-cols-12 gap-16">
          {/* Main Content Column */}
          <div className="lg:col-span-8 space-y-16">
            <header className="animate-slide-up">
              <Badge variant="hero" className="mb-6 uppercase tracking-[0.2em] px-4 py-1.5 text-xs font-black">
                {project.category}
              </Badge>
              <h1 className="text-5xl md:text-7xl font-black mb-8 leading-[1.1] tracking-tight">
                {project.title}
              </h1>
              <p className="text-2xl text-muted-foreground leading-relaxed font-medium">
                {project.description}
              </p>
            </header>

            {/* Hero Image */}
            <div className="relative group overflow-hidden rounded-[2.5rem] border border-white/10 aspect-video shadow-[0_0_50px_rgba(0,0,0,0.5)] animate-slide-up" style={{ animationDelay: '0.1s' }}>
              <img 
                src={project.image} 
                alt={project.title} 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/40 to-transparent"></div>
            </div>

            {/* Case Study Sections */}
            <div className="grid gap-12 animate-slide-up" style={{ animationDelay: '0.2s' }}>
              {/* Challenge */}
              <section className="glass-card p-10 rounded-[2rem] border-white/5 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-8 opacity-5">
                  <Target className="w-24 h-24" />
                </div>
                <h3 className="text-3xl font-black mb-6 flex items-center gap-3">
                  <span className="w-10 h-10 rounded-xl bg-red-500/20 flex items-center justify-center">
                    <Target className="w-5 h-5 text-red-500" />
                  </span>
                  The Challenge
                </h3>
                <p className="text-xl text-muted-foreground leading-relaxed font-medium">
                  {project.challenge || "Detailing the complex business and technical challenges overcome during development."}
                </p>
              </section>

              {/* Solution */}
              <section className="glass-card p-10 rounded-[2rem] border-white/5 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-8 opacity-5">
                  <Cpu className="w-24 h-24" />
                </div>
                <h3 className="text-3xl font-black mb-6 flex items-center gap-3">
                  <span className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center">
                    <Zap className="w-5 h-5 text-primary" />
                  </span>
                  Engineering Solution
                </h3>
                <p className="text-xl text-muted-foreground leading-relaxed font-medium">
                  {project.solution || "Architecting a high-performance, scalable solution tailored to specific enterprise requirements."}
                </p>
              </section>

              {/* Results */}
              <section className="p-10 rounded-[2rem] border border-primary/20 bg-primary/5 relative overflow-hidden">
                <h3 className="text-3xl font-black mb-8 flex items-center gap-3">
                   <span className="w-10 h-10 rounded-xl bg-yellow-500/20 flex items-center justify-center">
                    <Trophy className="w-5 h-5 text-yellow-500" />
                  </span>
                  Business Impact
                </h3>
                <div className="grid sm:grid-cols-2 gap-6">
                  {project.results?.map((result, index) => (
                    <div key={index} className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/5">
                      <TrendingUp className="w-6 h-6 text-primary flex-shrink-0" />
                      <span className="text-lg font-bold text-white leading-tight">{result}</span>
                    </div>
                  )) || (
                    <p className="text-muted-foreground italic col-span-2 text-center">Outcome metrics pending final verification.</p>
                  )}
                </div>
              </section>
            </div>
          </div>

          {/* Sidebar Info Column */}
          <aside className="lg:col-span-4 space-y-8 animate-slide-up" style={{ animationDelay: '0.3s' }}>
            {/* Tech Stack */}
            <div className="glass-card p-8 rounded-[2rem] border-white/5">
              <h4 className="text-sm font-black uppercase tracking-[0.2em] text-muted-foreground mb-8 flex items-center gap-2">
                <Code2 className="w-4 h-4 text-primary" />
                Technical Stack
              </h4>
              <div className="flex flex-wrap gap-3">
                {project.tech?.map((tech) => (
                  <Badge 
                    key={tech} 
                    className="bg-white/5 hover:bg-white/10 text-white border-white/10 px-4 py-2 text-sm font-bold transition-all"
                  >
                    {tech}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Project Info */}
            <div className="glass-card p-8 rounded-[2rem] border-white/5">
               <h4 className="text-sm font-black uppercase tracking-[0.2em] text-muted-foreground mb-8 flex items-center gap-2">
                <Layout className="w-4 h-4 text-accent" />
                Industry Focus
              </h4>
              <div className="space-y-6">
                <div>
                  <p className="text-xs font-black uppercase text-muted-foreground mb-1">Model</p>
                  <p className="text-lg font-bold">{project.category}</p>
                </div>
                <div>
                  <p className="text-xs font-black uppercase text-muted-foreground mb-1">Timeline</p>
                  <p className="text-lg font-bold">12 Weeks Development</p>
                </div>
                <div>
                  <p className="text-xs font-black uppercase text-muted-foreground mb-1">Phase</p>
                  <p className="text-lg font-bold text-primary">Production Live</p>
                </div>
              </div>
            </div>

            {/* Call to Action */}
            <div className="p-10 rounded-[2rem] bg-gradient-to-br from-primary to-accent shadow-xl shadow-primary/20 text-center">
              <h4 className="text-2xl font-black text-white mb-4">Have a similar project?</h4>
              <p className="text-white/80 mb-8 font-medium">Let's discuss how we can engineer a custom solution for your enterprise.</p>
              <Button 
                variant="secondary" 
                className="w-full h-14 rounded-full font-black text-lg shadow-lg hover:shadow-xl transition-all"
                onClick={() => navigate("/contact")}
              >
                Let's Talk
              </Button>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetail;
