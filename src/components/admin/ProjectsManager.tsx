import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { 
  Plus, 
  Edit, 
  Trash2, 
  Eye,
  Search,
  Filter,
  ExternalLink
} from "lucide-react";

export function ProjectsManager() {
  const [showAddForm, setShowAddForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const projects = [
    {
      id: 1,
      title: "EcoTrade Platform",
      description: "Sustainable trading marketplace with real-time analytics",
      tech: ["React", "Node.js", "MongoDB"],
      status: "Live",
      image: "/api/placeholder/300/200",
      liveUrl: "https://ecotrade.example.com",
      lastUpdated: "2024-01-15"
    },
    {
      id: 2,
      title: "HealthTrack Mobile",
      description: "Personal health monitoring and fitness tracking app",
      tech: ["React Native", "Firebase", "TypeScript"],
      status: "In Progress",
      image: "/api/placeholder/300/200",
      liveUrl: "",
      lastUpdated: "2024-01-10"
    },
    {
      id: 3,
      title: "FinanceFlow Dashboard",
      description: "Comprehensive financial management dashboard",
      tech: ["Next.js", "PostgreSQL", "Chart.js"],
      status: "Live",
      image: "/api/placeholder/300/200",
      liveUrl: "https://financeflow.example.com",
      lastUpdated: "2024-01-08"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Live":
        return "bg-green-500/10 text-green-500 border-green-500/20";
      case "In Progress":
        return "bg-yellow-500/10 text-yellow-500 border-yellow-500/20";
      default:
        return "bg-gray-500/10 text-gray-500 border-gray-500/20";
    }
  };

  const AddProjectForm = () => (
    <Card className="glass-card border-border/50 mb-6">
      <CardHeader>
        <CardTitle>Add New Project</CardTitle>
        <CardDescription>
          Create a new portfolio project entry
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="title">Project Title</Label>
            <Input id="title" placeholder="Enter project title" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="status">Status</Label>
            <select className="w-full px-3 py-2 rounded-md border border-border bg-background">
              <option>Live</option>
              <option>In Progress</option>
              <option>Completed</option>
            </select>
          </div>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="description">Description</Label>
          <Textarea id="description" placeholder="Project description" />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="tech">Technologies (comma-separated)</Label>
            <Input id="tech" placeholder="React, Node.js, MongoDB" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="liveUrl">Live URL (optional)</Label>
            <Input id="liveUrl" placeholder="https://example.com" />
          </div>
        </div>
        
        <div className="flex gap-2">
          <Button>Save Project</Button>
          <Button variant="outline" onClick={() => setShowAddForm(false)}>
            Cancel
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Projects Manager</h2>
          <p className="text-muted-foreground">Manage your portfolio projects</p>
        </div>
        <Button onClick={() => setShowAddForm(!showAddForm)} className="gap-2">
          <Plus className="h-4 w-4" />
          Add Project
        </Button>
      </div>

      {/* Add Form */}
      {showAddForm && <AddProjectForm />}

      {/* Search and Filter */}
      <Card className="glass-card border-border/50">
        <CardContent className="pt-6">
          <div className="flex gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search projects..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button variant="outline" className="gap-2">
              <Filter className="h-4 w-4" />
              Filter
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {projects.map((project) => (
          <Card key={project.id} className="glass-card border-border/50 hover:border-primary/20 transition-all">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-lg">{project.title}</CardTitle>
                  <div className="flex items-center gap-2 mt-2">
                    <Badge className={getStatusColor(project.status)}>
                      {project.status}
                    </Badge>
                    {project.liveUrl && (
                      <Badge variant="outline" className="gap-1">
                        <ExternalLink className="h-3 w-3" />
                        Live
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <div className="aspect-video bg-muted/20 rounded-lg border border-border/50 flex items-center justify-center">
                <p className="text-sm text-muted-foreground">Project Image</p>
              </div>
              
              <p className="text-sm text-muted-foreground line-clamp-2">
                {project.description}
              </p>
              
              <div className="flex flex-wrap gap-1">
                {project.tech.map((tech, index) => (
                  <Badge key={index} variant="secondary" className="text-xs">
                    {tech}
                  </Badge>
                ))}
              </div>
              
              <div className="flex gap-2 pt-2">
                <Button size="sm" variant="outline" className="flex-1 gap-1">
                  <Eye className="h-3 w-3" />
                  View
                </Button>
                <Button size="sm" variant="outline" className="flex-1 gap-1">
                  <Edit className="h-3 w-3" />
                  Edit
                </Button>
                <Button size="sm" variant="outline" className="gap-1 text-destructive hover:text-destructive">
                  <Trash2 className="h-3 w-3" />
                </Button>
              </div>
              
              <p className="text-xs text-muted-foreground">
                Updated: {project.lastUpdated}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}