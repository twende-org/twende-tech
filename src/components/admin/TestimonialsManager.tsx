import { useState } from "react";
import { 
  Plus, 
  Edit, 
  Trash2, 
  Check,
  X,
  Star,
  Search,
  Filter,
  Loader2
} from "lucide-react";
import { useGetTestimonialsQuery, useAddTestimonialMutation, useUpdateTestimonialMutation, useDeleteTestimonialMutation, Testimonial } from "@/store/apiSlice";
import { toast } from "sonner";
import { uploadFile } from "@/lib/storage";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

export function TestimonialsManager() {
  const { data: testimonials, isLoading } = useGetTestimonialsQuery();
  const [addTestimonial, { isLoading: isAdding }] = useAddTestimonialMutation();
  const [updateTestimonial, { isLoading: isUpdating }] = useUpdateTestimonialMutation();
  const [deleteTestimonial] = useDeleteTestimonialMutation();
  
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingTestimonial, setEditingTestimonial] = useState<Testimonial | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    position: "",
    content: "",
    rating: 5,
    status: "Pending",
    avatar: "/api/placeholder/40/40"
  });

  const resetForm = () => {
    setFormData({
      name: "",
      company: "",
      position: "",
      content: "",
      rating: 5,
      status: "Pending",
      avatar: "/api/placeholder/40/40"
    });
    setEditingTestimonial(null);
    setShowAddForm(false);
  };

  const handleEdit = (testimonial: Testimonial) => {
    setEditingTestimonial(testimonial);
    setFormData({
      name: testimonial.name,
      company: testimonial.company,
      position: testimonial.position,
      content: testimonial.content,
      rating: testimonial.rating,
      status: testimonial.status,
      avatar: testimonial.avatar || "/api/placeholder/40/40"
    });
    setShowAddForm(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    let avatarUrl = editingTestimonial?.avatar || "/api/placeholder/40/40";
    
    try {
      if (avatarFile) {
        toast.info("Uploading avatar...");
        avatarUrl = await uploadFile(avatarFile, `testimonials/${Date.now()}_${avatarFile.name}`);
      }

      const testimonialData = {
        ...formData,
        avatar: avatarUrl
      };

      if (editingTestimonial) {
        await updateTestimonial({ id: editingTestimonial.id, ...testimonialData }).unwrap();
        toast.success("Testimonial updated successfully");
      } else {
        await addTestimonial(testimonialData).unwrap();
        toast.success("Testimonial added successfully");
      }
      resetForm();
      setAvatarFile(null);
    } catch (error: any) {
      toast.error(`Error: ${error.message}`);
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this testimonial?")) {
      try {
        await deleteTestimonial(id).unwrap();
        toast.success("Testimonial deleted");
      } catch (error) {
        toast.error("Delete failed");
      }
    }
  };

  const handleStatusUpdate = async (id: string, status: string) => {
    try {
      await updateTestimonial({ id, status }).unwrap();
      toast.success(`Testimonial ${status}`);
    } catch (error) {
      toast.error("Status update failed");
    }
  };

  const filteredTestimonials = testimonials?.filter(t => 
    t.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    t.content?.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Approved":
        return "bg-green-500/10 text-green-500 border-green-500/20";
      case "Pending":
        return "bg-yellow-500/10 text-yellow-500 border-yellow-500/20";
      case "Rejected":
        return "bg-red-500/10 text-red-500 border-red-500/20";
      default:
        return "bg-gray-500/10 text-gray-500 border-gray-500/20";
    }
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
      />
    ));
  };

  const AddTestimonialForm = () => (
    <Card className="glass-card border-border/50 mb-6">
      <CardHeader>
        <CardTitle>{editingTestimonial ? "Edit Testimonial" : "Add New Testimonial"}</CardTitle>
        <CardDescription>
          {editingTestimonial ? "Update the existing client feedback" : "Create a new client testimonial entry"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Client Name</Label>
              <Input 
                id="name" 
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                placeholder="Enter client name" 
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="company">Company</Label>
              <Input 
                id="company" 
                value={formData.company}
                onChange={(e) => setFormData({...formData, company: e.target.value})}
                placeholder="Company name" 
                required
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="position">Position</Label>
              <Input 
                id="position" 
                value={formData.position}
                onChange={(e) => setFormData({...formData, position: e.target.value})}
                placeholder="Job title" 
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="avatar">Client Avatar</Label>
              <Input 
                id="avatar" 
                type="file"
                onChange={(e) => setAvatarFile(e.target.files?.[0] || null)}
                accept="image/*"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="rating">Rating</Label>
              <select 
                id="rating"
                value={formData.rating}
                onChange={(e) => setFormData({...formData, rating: parseInt(e.target.value)})}
                className="w-full px-3 py-2 rounded-md border border-border bg-background"
              >
                <option value="5">5 Stars</option>
                <option value="4">4 Stars</option>
                <option value="3">3 Stars</option>
                <option value="2">2 Stars</option>
                <option value="1">1 Star</option>
              </select>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="content">Testimonial Content</Label>
            <Textarea 
              id="content" 
              value={formData.content}
              onChange={(e) => setFormData({...formData, content: e.target.value})}
              placeholder="Enter testimonial content" 
              rows={4} 
              required
            />
          </div>
          
          <div className="flex gap-2">
            <Button disabled={isAdding}>
              {isAdding ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
              Save Testimonial
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
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Testimonials Manager</h2>
          <p className="text-muted-foreground">Manage client testimonials and reviews</p>
        </div>
        <Button onClick={() => setShowAddForm(!showAddForm)} className="gap-2">
          <Plus className="h-4 w-4" />
          Add Testimonial
        </Button>
      </div>

      {/* Add Form */}
      {showAddForm && <AddTestimonialForm />}

      {/* Search and Filter */}
      <Card className="glass-card border-border/50">
        <CardContent className="pt-6">
          <div className="flex gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search testimonials..."
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

      {/* Testimonials List */}
      <div className="space-y-4">
        {filteredTestimonials.map((testimonial) => (
          <Card key={testimonial.id} className="glass-card border-border/50 hover:border-primary/20 transition-all">
            <CardHeader className="pb-4">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage src={testimonial.avatar} />
                    <AvatarFallback>
                      {testimonial.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-lg">{testimonial.name}</CardTitle>
                    <p className="text-sm text-muted-foreground">
                      {testimonial.position} at {testimonial.company}
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                      <div className="flex">
                        {renderStars(testimonial.rating)}
                      </div>
                      <Badge className={getStatusColor(testimonial.status)}>
                        {testimonial.status}
                      </Badge>
                    </div>
                  </div>
                </div>
                
                <div className="flex gap-2">
                  {testimonial.status === "Pending" && (
                    <>
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="gap-1 text-green-600 hover:text-green-600"
                        onClick={() => handleStatusUpdate(testimonial.id, "Approved")}
                      >
                        <Check className="h-3 w-3" />
                        Approve
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="gap-1 text-red-600 hover:text-red-600"
                        onClick={() => handleStatusUpdate(testimonial.id, "Rejected")}
                      >
                        <X className="h-3 w-3" />
                        Reject
                      </Button>
                    </>
                  )}
                  <Button size="sm" variant="outline" className="gap-1" onClick={() => handleEdit(testimonial)}>
                    <Edit className="h-3 w-3" />
                    Edit
                  </Button>
                  <Button size="sm" variant="outline" className="gap-1 text-destructive hover:text-destructive" onClick={() => handleDelete(testimonial.id)}>
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            
            <CardContent>
              <p className="text-muted-foreground leading-relaxed">
                "{testimonial.content}"
              </p>
              
              <div className="flex justify-between items-center mt-4 pt-4 border-t border-border/50">
                <p className="text-xs text-muted-foreground">
                  Received: {testimonial.date}
                </p>
                <div className="flex items-center gap-1">
                  <span className="text-xs text-muted-foreground">Rating:</span>
                  <div className="flex">
                    {renderStars(testimonial.rating)}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}