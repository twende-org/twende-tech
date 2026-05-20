import { useGetClientProjectsQuery } from "@/store/apiSlice";
import { useAuth } from "@/context/AuthContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Loader2, ExternalLink, Code2, Check, HelpCircle, Laptop, Rocket } from "lucide-react";
import { Link } from "react-router-dom";

export function ClientProjects() {
  const { user } = useAuth();
  const { data: projects, isLoading } = useGetClientProjectsQuery(user?.uid || "");

  const stages = [
    { label: "Discovery", desc: "Strategy & Scope" },
    { label: "UI/UX Design", desc: "Layout & Wireframes" },
    { label: "Engineering", desc: "Core Development" },
    { label: "QA & Testing", desc: "Integrity Checks" },
    { label: "Launch", desc: "Production Live" }
  ];

  const getActiveStageIndex = (status: string) => {
    const s = status?.toLowerCase() || "";
    if (s === "live" || s === "completed") return 4;
    if (s === "qa" || s === "testing") return 3;
    if (s === "engineering" || s === "development" || s === "in progress") return 2;
    if (s === "design" || s === "wireframing") return 1;
    return 0;
  };

  if (isLoading) {
    return (
      <div className="h-64 flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!projects || projects.length === 0) {
    return (
      <div className="text-center py-20 glass-card rounded-[2.5rem] border-white/5">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/5 mb-6">
          <Code2 className="w-10 h-10 text-primary/40" />
        </div>
        <h3 className="text-2xl font-black mb-2">No Projects Found</h3>
        <p className="text-muted-foreground max-w-md mx-auto">
          We haven't linked any active projects to your portal yet. Contact your account manager to get started.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-slide-up">
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        {projects.map((project) => {
          const activeIndex = getActiveStageIndex(project.status);

          return (
            <Card key={project.id} className="glass-card border-white/10 hover-lift rounded-[2.5rem] overflow-hidden flex flex-col justify-between">
              <div>
                <div className="aspect-video relative overflow-hidden">
                  <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
                  <div className="absolute bottom-6 left-6 right-6">
                    <Badge variant="hero" className="mb-3 uppercase tracking-widest text-[10px]">
                      {project.category}
                    </Badge>
                    <h3 className="text-2xl font-black text-white">{project.title}</h3>
                  </div>
                </div>
                
                <CardContent className="p-8 space-y-8">
                  <p className="text-muted-foreground leading-relaxed line-clamp-3">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((t) => (
                      <Badge key={t} variant="secondary" className="bg-white/5 text-[10px]">
                        {t}
                      </Badge>
                    ))}
                  </div>

                  {/* High-Fidelity Milestone Timeline */}
                  <div className="space-y-6 pt-4 border-t border-white/5">
                    <h4 className="text-[10px] font-black uppercase tracking-widest text-primary">Development Pipeline</h4>
                    
                    {/* Desktop Pipeline (Horizontal Grid) */}
                    <div className="hidden sm:grid grid-cols-5 gap-2 relative">
                      {/* Connection bar */}
                      <div className="absolute top-4 left-[10%] right-[10%] h-0.5 bg-white/10 z-0">
                        <div 
                          className="h-full bg-primary transition-all duration-500" 
                          style={{ width: `${(activeIndex / 4) * 100}%` }}
                        />
                      </div>

                      {stages.map((stage, idx) => {
                        const isCompleted = idx < activeIndex;
                        const isActive = idx === activeIndex;
                        const isPending = idx > activeIndex;

                        return (
                          <div key={idx} className="flex flex-col items-center text-center z-10">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center border transition-all ${
                              isCompleted ? "bg-green-500 border-green-500 text-white" :
                              isActive ? "bg-primary border-primary text-white shadow-lg shadow-primary/30 scale-110 animate-pulse-slow" :
                              "bg-white/5 border-white/10 text-muted-foreground"
                            }`}>
                              {isCompleted ? <Check className="w-4 h-4" /> : 
                               isActive && idx === 4 ? <Rocket className="w-4 h-4" /> :
                               isActive ? <Laptop className="w-4 h-4" /> :
                               <span className="text-[10px] font-bold">{idx + 1}</span>}
                            </div>
                            <span className={`text-[10px] font-black uppercase tracking-wider mt-3 ${isActive ? 'text-primary' : 'text-white'}`}>{stage.label}</span>
                            <span className="text-[9px] text-muted-foreground mt-0.5">{stage.desc}</span>
                          </div>
                        );
                      })}
                    </div>

                    {/* Mobile Pipeline (Vertical List) */}
                    <div className="sm:hidden space-y-4">
                      {stages.map((stage, idx) => {
                        const isCompleted = idx < activeIndex;
                        const isActive = idx === activeIndex;

                        return (
                          <div key={idx} className="flex items-center gap-3">
                            <div className={`w-6 h-6 rounded-full flex items-center justify-center border shrink-0 ${
                              isCompleted ? "bg-green-500 border-green-500 text-white" :
                              isActive ? "bg-primary border-primary text-white" :
                              "bg-white/5 border-white/10 text-muted-foreground"
                            }`}>
                              {isCompleted ? <Check className="w-3.5 h-3.5" /> : <span className="text-[9px] font-bold">{idx + 1}</span>}
                            </div>
                            <div>
                              <p className={`text-xs font-bold ${isActive ? 'text-primary' : 'text-white'}`}>{stage.label}</p>
                              <p className="text-[10px] text-muted-foreground">{stage.desc}</p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </CardContent>
              </div>

              <CardContent className="px-8 pb-8 pt-0">
                <div className="pt-4 flex items-center justify-between border-t border-white/5">
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${project.status === 'Live' ? 'bg-green-500 animate-pulse' : 'bg-yellow-500'}`} />
                    <span className="text-xs font-bold uppercase tracking-widest">{project.status}</span>
                  </div>
                  <Button variant="ghost" className="gap-2 text-primary hover:text-white hover:bg-primary/20 rounded-full h-10 px-5 text-xs font-bold" asChild>
                    <Link to={`/portfolio/${project.id}`}>
                      Explore Case Study <ExternalLink className="w-4 h-4" />
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
