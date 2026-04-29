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
  ExternalLink,
  Loader2
} from "lucide-react";
import { useGetProjectsQuery, useAddProjectMutation, useUpdateProjectMutation, useDeleteProjectMutation, Project, useGetUsersQuery } from "@/store/apiSlice";
import { toast } from "sonner";
import { uploadFile } from "@/lib/storage";

export function ProjectsManager() {
  const [showForm, setShowForm] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  const { data: projects, isLoading } = useGetProjectsQuery();
  const { data: users } = useGetUsersQuery();
  const [addProject, { isLoading: isAdding }] = useAddProjectMutation();
  const [updateProject, { isLoading: isUpdating }] = useUpdateProjectMutation();
  const [deleteProject] = useDeleteProjectMutation();

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    tech: "",
    status: "Live",
    liveUrl: "",
    githubUrl: "",
    category: "Enterprise Innovation",
    challenge: "",
    solution: "",
    results: "",
    clientId: ""
  });

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      tech: "",
      status: "Live",
      liveUrl: "",
      githubUrl: "",
      category: "Enterprise Innovation",
      challenge: "",
      solution: "",
      results: "",
      clientId: ""
    });
    setEditingProject(null);
    setShowForm(false);
  };

  const handleEdit = (project: Project) => {
    setEditingProject(project);
    setFormData({
      title: project.title,
      description: project.description,
      tech: Array.isArray(project.tech) ? project.tech.join(", ") : project.tech,
      status: project.status,
      liveUrl: project.liveUrl || "",
      githubUrl: project.githubUrl || "",
      category: project.category || "Enterprise Innovation",
      challenge: project.challenge || "",
      solution: project.solution || "",
      results: Array.isArray(project.results) ? project.results.join(", ") : project.results || "",
      clientId: project.clientId || ""
    });
    setShowForm(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    let imageUrl = editingProject?.image || "";
    
    try {
      if (imageFile) {
        toast.info("Uploading image...");
        imageUrl = await uploadFile(imageFile, `projects/${Date.now()}_${imageFile.name}`);
      }

      const projectData = {
        ...formData,
        image: imageUrl,
        tech: formData.tech.split(",").map(t => t.trim()).filter(Boolean),
        results: formData.results.split(",").map(r => r.trim()).filter(Boolean)
      };

      if (editingProject) {
        await updateProject({ id: editingProject.id, ...projectData }).unwrap();
        toast.success("Project updated successfully");
      } else {
        await addProject(projectData).unwrap();
        toast.success("Project added successfully");
      }
      resetForm();
      setImageFile(null);
    } catch (error: any) {
      toast.error(`Error: ${error.message}`);
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this project?")) {
      try {
        await deleteProject(id).unwrap();
        toast.success("Project deleted");
      } catch (error) {
        toast.error("Delete failed");
      }
    }
  };

  const filteredProjects = projects?.filter(p => 
    p.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.description?.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];

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
        <CardTitle>{editingProject ? "Edit Project Case Study" : "Add New Case Study"}</CardTitle>
        <CardDescription>
          {editingProject ? "Update the technical details and results" : "Create a new high-authority portfolio entry"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="title">Project Title</Label>
              <Input 
                id="title" 
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
                placeholder="e.g., Enterprise AI Suite" 
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <select 
                id="category"
                value={formData.category}
                onChange={(e) => setFormData({...formData, category: e.target.value})}
                className="w-full px-3 py-2 rounded-md border border-border bg-background"
              >
                <option>Enterprise Innovation</option>
                <option>Managed Tech Services</option>
                <option>Verified Marketplace</option>
              </select>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="description">Executive Summary</Label>
            <Textarea 
              id="description" 
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              placeholder="High-level overview of the project" 
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="challenge">The Challenge</Label>
              <Textarea 
                id="challenge" 
                value={formData.challenge}
                onChange={(e) => setFormData({...formData, challenge: e.target.value})}
                placeholder="What problem were we solving?" 
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="solution">Engineering Solution</Label>
              <Textarea 
                id="solution" 
                value={formData.solution}
                onChange={(e) => setFormData({...formData, solution: e.target.value})}
                placeholder="How did we build it?" 
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="results">Key Results (comma separated)</Label>
            <Input 
              id="results" 
              value={formData.results}
              onChange={(e) => setFormData({...formData, results: e.target.value})}
              placeholder="99% Uptime, 50% faster checkout, Processed 1M records" 
              required
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="tech">Technologies (comma separated)</Label>
              <Input 
                id="tech" 
                value={formData.tech}
                onChange={(e) => setFormData({...formData, tech: e.target.value})}
                placeholder="React, Python, AWS, Docker" 
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="status">Project Status</Label>
              <select 
                id="status"
                value={formData.status}
                onChange={(e) => setFormData({...formData, status: e.target.value})}
                className="w-full px-3 py-2 rounded-md border border-border bg-background"
              >
                <option>Live</option>
                <option>In Progress</option>
                <option>Completed</option>
              </select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="clientId">Assign to Client (Portal Access)</Label>
            <select 
              id="clientId"
              value={formData.clientId}
              onChange={(e) => setFormData({...formData, clientId: e.target.value})}
              className="w-full px-3 py-2 rounded-md border border-border bg-background"
            >
              <option value="">No Client Assigned (Public Only)</option>
              {users?.filter(u => u.role === 'client').map(user => (
                <option key={user.id} value={user.id}>
                  {user.email} ({user.email?.split('@')[0]})
                </option>
              ))}
            </select>
            <p className="text-[10px] text-muted-foreground">Assigning a client allows them to track this project in their private dashboard.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <Label htmlFor="image">Hero Image</Label>
              <Input 
                id="image" 
                type="file"
                onChange={(e) => setImageFile(e.target.files?.[0] || null)}
                accept="image/*"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="liveUrl">Live URL (optional)</Label>
              <Input 
                id="liveUrl" 
                value={formData.liveUrl}
                onChange={(e) => setFormData({...formData, liveUrl: e.target.value})}
                placeholder="https://example.com" 
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="githubUrl">GitHub URL (optional)</Label>
              <Input 
                id="githubUrl" 
                value={formData.githubUrl}
                onChange={(e) => setFormData({...formData, githubUrl: e.target.value})}
                placeholder="https://github.com/..." 
              />
            </div>
          </div>
          
          <div className="flex gap-2 pt-4">
            <Button disabled={isAdding || isUpdating} className="h-12 px-8">
              {editingProject ? "Update Case Study" : "Publish Case Study"}
            </Button>
            <Button variant="outline" type="button" onClick={resetForm} className="h-12 px-8">
              Cancel
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );

  if (isLoading) {
    return (
      <div className="h-64 flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold">Projects Manager</h2>
          <p className="text-muted-foreground">Manage your portfolio projects</p>
        </div>
        <Button onClick={() => setShowForm(!showForm)} className="gap-2 w-full sm:w-auto">
          <Plus className="h-4 w-4" />
          {showForm ? "Close Form" : "Add Project"}
        </Button>
      </div>

      {/* Add Form */}
      {showForm && <AddProjectForm />}

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
        {filteredProjects.map((project) => (
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
              <div className="aspect-video bg-muted/20 rounded-lg border border-border/50 flex items-center justify-center overflow-hidden">
                {project.image ? (
                  <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
                ) : (
                  <p className="text-sm text-muted-foreground">No Image</p>
                )}
              </div>
              
              <p className="text-sm text-muted-foreground line-clamp-2">
                {project.description}
              </p>
              
              <div className="flex flex-wrap gap-1">
                {project.tech?.map((tech: string, index: number) => (
                  <Badge key={index} variant="secondary" className="text-xs">
                    {tech}
                  </Badge>
                ))}
              </div>
              
              <div className="flex gap-2 pt-2">
                {project.liveUrl && (
                  <Button size="sm" variant="outline" className="flex-1 gap-1" asChild>
                    <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="h-3 w-3" />
                      Live
                    </a>
                  </Button>
                )}
                <Button size="sm" variant="outline" className="flex-1 gap-1" onClick={() => handleEdit(project)}>
                  <Edit className="h-3 w-3" />
                  Edit
                </Button>
                <Button size="sm" variant="outline" className="gap-1 text-destructive hover:text-destructive" onClick={() => handleDelete(project.id)}>
                  <Trash2 className="h-3 w-3" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}