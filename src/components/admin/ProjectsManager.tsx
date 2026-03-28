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
import { useGetProjectsQuery, useAddProjectMutation, useUpdateProjectMutation, useDeleteProjectMutation, Project } from "@/store/apiSlice";
import { toast } from "sonner";
import { uploadFile } from "@/lib/storage";

export function ProjectsManager() {
  const [showForm, setShowForm] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  const { data: projects, isLoading } = useGetProjectsQuery();
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
    category: "Web App"
  });

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      tech: "",
      status: "Live",
      liveUrl: "",
      githubUrl: "",
      category: "Web App"
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
      category: project.category || "Web App"
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
        tech: formData.tech.split(",").map(t => t.trim()).filter(Boolean)
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
        <CardTitle>{editingProject ? "Edit Project" : "Add New Project"}</CardTitle>
        <CardDescription>
          {editingProject ? "Update the existing entry" : "Create a new portfolio project entry"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="title">Project Title</Label>
              <Input 
                id="title" 
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
                placeholder="Enter project title" 
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
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
            <Label htmlFor="description">Description</Label>
            <Textarea 
              id="description" 
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              placeholder="Project description" 
              required
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="image">Project Image</Label>
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
          </div>
          
          <div className="flex gap-2">
            <Button disabled={isAdding || isUpdating}>
              {editingProject ? "Update Project" : "Save Project"}
            </Button>
            <Button variant="outline" type="button" onClick={resetForm}>
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