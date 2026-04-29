import { useGetClientProjectsQuery } from "@/store/apiSlice";
import { useAuth } from "@/context/AuthContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Loader2, ExternalLink, Code2, Clock, CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";

export function ClientProjects() {
  const { user } = useAuth();
  const { data: projects, isLoading } = useGetClientProjectsQuery(user?.uid || "");

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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {projects.map((project) => (
          <Card key={project.id} className="glass-card border-white/10 hover-lift rounded-[2.5rem] overflow-hidden">
            <div className="aspect-video relative overflow-hidden">
              <img src={project.image} alt={project.title} className="w-full h-full object-cover transition-transform group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <Badge variant="hero" className="mb-3 uppercase tracking-widest text-[10px]">
                  {project.category}
                </Badge>
                <h3 className="text-2xl font-black text-white">{project.title}</h3>
              </div>
            </div>
            
            <CardContent className="p-8 space-y-6">
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

              <div className="pt-4 flex items-center justify-between border-t border-white/5">
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${project.status === 'Live' ? 'bg-green-500 animate-pulse' : 'bg-yellow-500'}`} />
                  <span className="text-sm font-bold uppercase tracking-widest">{project.status}</span>
                </div>
                <Button variant="ghost" className="gap-2 text-primary hover:text-white hover:bg-primary/20 rounded-full" asChild>
                  <Link to={`/portfolio/${project.id}`}>
                    Explore Case Study <ExternalLink className="w-4 h-4" />
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
