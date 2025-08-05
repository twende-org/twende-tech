import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Plus, 
  Edit, 
  Trash2, 
  Check,
  X,
  Star,
  Search,
  Filter
} from "lucide-react";

export function TestimonialsManager() {
  const [showAddForm, setShowAddForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const testimonials = [
    {
      id: 1,
      name: "Sarah Johnson",
      company: "TechCorp Solutions",
      position: "CEO",
      content: "Twende Digital delivered an exceptional e-commerce platform that exceeded our expectations. Their attention to detail and technical expertise is outstanding.",
      rating: 5,
      status: "Approved",
      date: "2024-01-15",
      avatar: "/api/placeholder/40/40"
    },
    {
      id: 2,
      name: "Michael Chen",
      company: "StartupXYZ",
      position: "CTO",
      content: "The mobile app they built for us has been a game-changer. Clean code, beautiful UI, and delivered on time. Highly recommended!",
      rating: 5,
      status: "Pending",
      date: "2024-01-12",
      avatar: "/api/placeholder/40/40"
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      company: "Health Plus",
      position: "Product Manager",
      content: "Professional team with great communication throughout the project. The healthcare dashboard they created is exactly what we needed.",
      rating: 4,
      status: "Approved",
      date: "2024-01-08",
      avatar: "/api/placeholder/40/40"
    }
  ];

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
        <CardTitle>Add New Testimonial</CardTitle>
        <CardDescription>
          Create a new client testimonial entry
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="name">Client Name</Label>
            <Input id="name" placeholder="Enter client name" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="company">Company</Label>
            <Input id="company" placeholder="Company name" />
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="position">Position</Label>
            <Input id="position" placeholder="Job title" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="rating">Rating</Label>
            <select className="w-full px-3 py-2 rounded-md border border-border bg-background">
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
          <Textarea id="content" placeholder="Enter testimonial content" rows={4} />
        </div>
        
        <div className="flex gap-2">
          <Button>Save Testimonial</Button>
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
        {testimonials.map((testimonial) => (
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
                      <Button size="sm" variant="outline" className="gap-1 text-green-600 hover:text-green-600">
                        <Check className="h-3 w-3" />
                        Approve
                      </Button>
                      <Button size="sm" variant="outline" className="gap-1 text-red-600 hover:text-red-600">
                        <X className="h-3 w-3" />
                        Reject
                      </Button>
                    </>
                  )}
                  <Button size="sm" variant="outline" className="gap-1">
                    <Edit className="h-3 w-3" />
                    Edit
                  </Button>
                  <Button size="sm" variant="outline" className="gap-1 text-destructive hover:text-destructive">
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