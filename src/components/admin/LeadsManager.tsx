import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import { 
  Mail, 
  Phone, 
  Calendar,
  Reply,
  Archive,
  Trash2,
  Search,
  Filter,
  Clock,
  CheckCircle,
  AlertCircle,
  Loader2,
  DollarSign,
  Briefcase,
  X,
  Send
} from "lucide-react";
import { useGetLeadsQuery, useUpdateLeadMutation, useDeleteLeadMutation } from "@/store/apiSlice";
import { sendLeadResponse } from "@/services/email";
import { toast } from "sonner";

const ResponseModal = ({ 
  isOpen, 
  onClose, 
  lead 
}: { 
  isOpen: boolean; 
  onClose: () => void; 
  lead: any 
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    subject: `Consultation: ${lead?.serviceType} - Twende Digital`,
    message: `Dear ${lead?.name},\n\nThank you for your interest in our ${lead?.serviceType} services. We have received your inquiry regarding "${lead?.projectDetails}" and would like to discuss how we can assist you further.\n\nBest regards,\nTwende Digital Team`
  });

  if (!isOpen || !lead) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const result = await sendLeadResponse(
        lead.name,
        lead.email,
        formData.subject,
        formData.message
      );
      if (result.success) {
        toast.success(`Response sent to ${lead.email}`);
        onClose();
      } else {
        throw new Error("Failed to send email");
      }
    } catch (error) {
      toast.error("Failed to send response. Ensure EmailJS keys are configured.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm">
      <div className="glass-card w-full max-w-xl p-8 rounded-3xl border border-white/10 relative animate-scale-in">
        <button onClick={onClose} className="absolute top-6 right-6 text-muted-foreground hover:text-foreground">
          <X className="w-6 h-6" />
        </button>
        <h3 className="text-2xl font-black mb-2 text-primary">Respond to Lead</h3>
        <p className="text-sm text-muted-foreground mb-6">Send a professional follow-up to {lead.email}</p>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-xs font-bold uppercase text-muted-foreground mb-2 block">Subject</label>
            <Input 
              value={formData.subject}
              onChange={e => setFormData({...formData, subject: e.target.value})}
              className="bg-white/5 border-white/10" 
            />
          </div>
          <div>
            <label className="text-xs font-bold uppercase text-muted-foreground mb-2 block">Message Body</label>
            <Textarea 
              rows={8}
              value={formData.message}
              onChange={e => setFormData({...formData, message: e.target.value})}
              className="bg-white/5 border-white/10 resize-none" 
            />
          </div>
          <Button type="submit" variant="hero" className="w-full h-12 gap-2" disabled={isSubmitting}>
            {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : <><Send className="w-4 h-4" /> Send Email Response</>}
          </Button>
        </form>
      </div>
    </div>
  );
};

export function LeadsManager() {
  const { data: leads, isLoading } = useGetLeadsQuery();
  const [updateLead] = useUpdateLeadMutation();
  const [deleteLead] = useDeleteLeadMutation();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLead, setSelectedLead] = useState<string | null>(null);
  const [isResponseModalOpen, setIsResponseModalOpen] = useState(false);

  const handleStatusUpdate = async (id: string, status: string) => {
    try {
      await updateLead({ id, status }).unwrap();
      toast.success(`Lead marked as ${status}`);
    } catch (error) {
      toast.error("Status update failed");
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this lead?")) {
      try {
        await deleteLead(id).unwrap();
        toast.success("Lead deleted");
        setSelectedLead(null);
      } catch (error) {
        toast.error("Delete failed");
      }
    }
  };

  if (isLoading) {
    return (
      <div className="h-64 flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  const filteredLeads = leads?.filter(lead => 
    lead.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    lead.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    lead.projectDetails?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    lead.company?.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "new":
      case "New":
        return "bg-blue-500/10 text-blue-500 border-blue-500/20";
      case "contacted":
        return "bg-yellow-500/10 text-yellow-500 border-yellow-500/20";
      case "qualified":
        return "bg-green-500/10 text-green-500 border-green-500/20";
      case "Archived":
        return "bg-gray-500/10 text-gray-500 border-gray-500/20";
      default:
        return "bg-gray-500/10 text-gray-500 border-gray-500/20";
    }
  };

  const currentLead = leads?.find(l => l.id === selectedLead);

  return (
    <div className="space-y-6">
      <ResponseModal 
        isOpen={isResponseModalOpen} 
        onClose={() => setIsResponseModalOpen(false)} 
        lead={currentLead} 
      />
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Business Leads</h2>
          <p className="text-muted-foreground">High-value inquiries from Enterprise paths</p>
        </div>
      </div>

      <Card className="glass-card border-border/50">
        <CardContent className="pt-6">
          <div className="flex gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search leads by name, company, or details..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Active Leads</h3>
          {filteredLeads.map((lead) => (
            <Card 
              key={lead.id} 
              className={`glass-card border-border/50 hover:border-primary/20 transition-all cursor-pointer ${
                selectedLead === lead.id ? "border-primary/50 bg-primary/5" : ""
              }`}
              onClick={() => setSelectedLead(lead.id)}
            >
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarFallback>
                        {lead.name.split(' ').map((n: string) => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle className="text-base">{lead.name}</CardTitle>
                      <p className="text-sm text-muted-foreground">{lead.company || lead.email}</p>
                    </div>
                  </div>
                  <Badge className={getStatusColor(lead.status)}>
                    {lead.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex gap-4 mb-3">
                  {lead.budget && (
                    <Badge variant="outline" className="gap-1 border-primary/20 text-primary">
                      <DollarSign className="w-3 h-3" />
                      {lead.budget}
                    </Badge>
                  )}
                  {lead.timeline && (
                    <Badge variant="outline" className="gap-1 border-accent/20 text-accent">
                      <Clock className="w-3 h-3" />
                      {lead.timeline}
                    </Badge>
                  )}
                </div>
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {lead.projectDetails}
                </p>
              </CardContent>
            </Card>
          ))}
          {filteredLeads.length === 0 && (
            <div className="p-8 text-center border-2 border-dashed border-border/50 rounded-xl">
              <p className="text-muted-foreground">No leads found matching your search.</p>
            </div>
          )}
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Lead Details</h3>
          {selectedLead ? (
            (() => {
              const lead = leads?.find(l => l.id === selectedLead);
              if (!lead) return null;
              
              return (
                <Card className="glass-card border-border/50 sticky top-8">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-xl">{lead.serviceType} Consultation</CardTitle>
                        <CardDescription className="mt-1">
                          From: {lead.name}
                        </CardDescription>
                      </div>
                      <Badge className={getStatusColor(lead.status)}>
                        {lead.status}
                      </Badge>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 rounded-lg bg-muted/20">
                      <div className="flex items-center gap-2">
                        <Mail className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">{lead.email}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">{lead.phone || "No phone"}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Briefcase className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">{lead.company || "Individual"}</span>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-3 rounded-lg border border-border/50 bg-primary/5">
                        <p className="text-xs text-muted-foreground mb-1 uppercase font-bold">Budget</p>
                        <p className="font-bold text-primary">{lead.budget || "N/A"}</p>
                      </div>
                      <div className="p-3 rounded-lg border border-border/50 bg-accent/5">
                        <p className="text-xs text-muted-foreground mb-1 uppercase font-bold">Timeline</p>
                        <p className="font-bold text-accent">{lead.timeline || "N/A"}</p>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium mb-3">Project Requirements</h4>
                      <div className="p-4 rounded-lg bg-muted/10 border border-border/50">
                        <p className="text-sm leading-relaxed whitespace-pre-wrap">{lead.projectDetails}</p>
                      </div>
                    </div>
                    
                    <div className="flex gap-2 pt-4 border-t border-border/50">
                      <Button className="gap-2 flex-1" onClick={() => setIsResponseModalOpen(true)}>
                        <Reply className="h-4 w-4" />
                        Respond to Lead
                      </Button>
                      <Button 
                        variant="outline" 
                        className="gap-2"
                        onClick={() => handleStatusUpdate(lead.id, "Archived")}
                      >
                        <Archive className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="outline" 
                        className="gap-2 text-destructive hover:text-destructive"
                        onClick={() => handleDelete(lead.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })()
          ) : (
            <Card className="glass-card border-border/50">
              <CardContent className="flex items-center justify-center h-64">
                <div className="text-center">
                  <Briefcase className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">Select a lead to view enterprise requirements</p>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
