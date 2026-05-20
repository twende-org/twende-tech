import { useState, useEffect } from "react";
import { useGetSupportTicketsQuery, useAddSupportTicketMutation } from "@/store/apiSlice";
import { useAuth } from "@/context/AuthContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Loader2, MessageSquare, Clock, CheckCircle2, AlertCircle, Plus, Send, ChevronDown, ChevronUp } from "lucide-react";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { db } from "@/lib/firebase";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import { submitTicketReply } from "@/services/ticketReplies";

export function ClientSupport() {
  const { user } = useAuth();
  const { data: tickets, isLoading } = useGetSupportTicketsQuery(user?.uid || "");
  const [addTicket, { isLoading: isAdding }] = useAddSupportTicketMutation();
  const [isOpen, setIsOpen] = useState(false);

  const [formData, setFormData] = useState({
    subject: "",
    description: "",
    priority: "Medium"
  });

  const [expandedTicketId, setExpandedTicketId] = useState<string | null>(null);
  const [replies, setReplies] = useState<any[]>([]);
  const [newReplyText, setNewReplyText] = useState("");
  const [isSendingReply, setIsSendingReply] = useState(false);

  // Subscribe to replies in real-time when expanded
  useEffect(() => {
    if (!expandedTicketId) {
      setReplies([]);
      return;
    }
    const q = query(
      collection(db, "tickets", expandedTicketId, "replies"),
      orderBy("createdAt", "asc")
    );
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const repliesList = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setReplies(repliesList);
    });
    return () => unsubscribe();
  }, [expandedTicketId]);

  const handleSendReply = async (e: React.FormEvent, ticketId: string) => {
    e.preventDefault();
    if (!newReplyText.trim() || !user) return;

    setIsSendingReply(true);
    try {
      const res = await submitTicketReply(ticketId, {
        senderId: user.uid,
        senderEmail: user.email || "Client",
        senderRole: "client",
        text: newReplyText.trim()
      });

      if (res.success) {
        setNewReplyText("");
      } else {
        toast.error("Failed to submit reply");
      }
    } catch {
      toast.error("Failed to submit reply");
    } finally {
      setIsSendingReply(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await addTicket({
        ...formData,
        clientId: user?.uid
      }).unwrap();

      toast.success("Support ticket created. Our engineers will review it shortly. ✅");
      setIsOpen(false);
      setFormData({ subject: "", description: "", priority: "Medium" });
    } catch (error) {
      toast.error("Failed to create ticket");
    }
  };

  if (isLoading) {
    return (
      <div className="h-64 flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-slide-up">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-black mb-1">Support Center</h2>
          <p className="text-muted-foreground">Submit and track your engineering requests</p>
        </div>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button variant="hero" className="gap-2 rounded-2xl h-12 px-6">
              <Plus className="w-5 h-5" /> Open New Ticket
            </Button>
          </DialogTrigger>
          <DialogContent className="glass-card border-white/10 sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle className="text-2xl font-black">Open Support Ticket</DialogTitle>
              <DialogDescription>
                Provide details about your request. High-priority tickets are typically reviewed within 2 hours.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-6 pt-4">
              <div className="space-y-2">
                <Label htmlFor="subject">Subject</Label>
                <Input 
                  id="subject" 
                  value={formData.subject}
                  onChange={(e) => setFormData({...formData, subject: e.target.value})}
                  placeholder="e.g., Performance Issue in Dashboard"
                  className="bg-white/5 border-white/10 h-12"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="priority">Priority Level</Label>
                <select 
                  id="priority"
                  value={formData.priority}
                  onChange={(e) => setFormData({...formData, priority: e.target.value})}
                  className="w-full h-12 px-4 rounded-xl border border-white/10 bg-white/5 text-sm"
                >
                  <option value="Low">Low - Maintenance / Query</option>
                  <option value="Medium">Medium - Feature Update</option>
                  <option value="High">High - Critical System Issue</option>
                </select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Detailed Description</Label>
                <Textarea 
                  id="description" 
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  placeholder="Explain the issue or request in detail..."
                  className="bg-white/5 border-white/10 min-h-[120px]"
                  required
                />
              </div>
              <Button type="submit" className="w-full h-14 rounded-2xl text-lg font-black gap-2" disabled={isAdding}>
                {isAdding ? <Loader2 className="w-5 h-5 animate-spin" /> : <><Send className="w-5 h-5" /> Submit Request</>}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-6">
        {tickets && tickets.length > 0 ? (
          tickets.map((ticket) => (
            <Card key={ticket.id} className="glass-card border-white/10 hover:border-white/20 transition-all rounded-[2rem]">
              <CardContent className="p-8">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                  <div className="flex items-start gap-5">
                    <div className={`p-4 rounded-2xl ${
                      ticket.status === 'Open' ? 'bg-blue-500/10 text-blue-500' : 
                      ticket.status === 'In Progress' ? 'bg-yellow-500/10 text-yellow-500' : 
                      'bg-green-500/10 text-green-500'
                    }`}>
                      <MessageSquare className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="flex items-center gap-3 mb-1">
                        <h3 className="text-xl font-black">{ticket.subject}</h3>
                        <Badge variant="outline" className={`text-[10px] uppercase tracking-tighter ${
                          ticket.priority === 'High' ? 'border-red-500 text-red-500' : 'border-white/20 text-muted-foreground'
                        }`}>
                          {ticket.priority} PRIORITY
                        </Badge>
                      </div>
                      <p className="text-muted-foreground mb-4 max-w-2xl">{ticket.description}</p>
                      <div className="flex items-center gap-4 text-[10px] text-muted-foreground uppercase tracking-widest font-bold">
                        <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {new Date(ticket.createdAt?.seconds * 1000).toLocaleDateString()}</span>
                        <span className="flex items-center gap-1"><AlertCircle className="w-3 h-3" /> TICKET ID: {ticket.id.slice(0, 8)}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <Button 
                      variant="outline" 
                      onClick={() => setExpandedTicketId(expandedTicketId === ticket.id ? null : ticket.id)}
                      className="rounded-full h-9 px-4 text-xs font-bold gap-1 border-white/10 hover:bg-white/5"
                    >
                      {expandedTicketId === ticket.id ? (
                        <>Close Details <ChevronUp className="w-3.5 h-3.5" /></>
                      ) : (
                        <>View Thread <ChevronDown className="w-3.5 h-3.5" /></>
                      )}
                    </Button>
                    <Badge className={`px-4 py-2 rounded-full font-black tracking-widest text-[10px] ${
                      ticket.status === 'Open' ? 'bg-blue-500/20 text-blue-500' : 
                      ticket.status === 'In Progress' ? 'bg-yellow-500/20 text-yellow-500' : 
                      'bg-green-500/20 text-green-500'
                    }`}>
                      {ticket.status === 'Completed' ? <CheckCircle2 className="w-3 h-3 mr-1 inline" /> : null}
                      {ticket.status.toUpperCase()}
                    </Badge>
                  </div>
                </div>

                {expandedTicketId === ticket.id && (
                  <div className="mt-8 pt-8 border-t border-white/10 space-y-6">
                    <h4 className="text-sm font-bold uppercase tracking-widest text-primary">Discussion History</h4>
                    
                    <div className="space-y-4 max-h-60 overflow-y-auto pr-2 custom-scrollbar flex flex-col">
                      {replies.map((reply) => (
                        <div 
                          key={reply.id} 
                          className={`flex flex-col space-y-1 p-4 rounded-2xl text-sm max-w-[80%] ${
                            reply.senderRole === "client" 
                              ? "bg-white/5 border border-white/5 self-end" 
                              : "bg-primary/10 border border-primary/10 self-start"
                          }`}
                        >
                          <div className="flex justify-between items-center text-[10px] uppercase tracking-wider font-bold text-muted-foreground gap-8">
                            <span>{reply.senderRole === "client" ? "You" : "Twende Support"}</span>
                            <span>{reply.createdAt?.seconds ? new Date(reply.createdAt.seconds * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : "Just now"}</span>
                          </div>
                          <p className="text-white mt-1 leading-relaxed">{reply.text}</p>
                        </div>
                      ))}
                      {replies.length === 0 && (
                        <div className="text-center py-6 text-xs text-muted-foreground">
                          No replies yet. Our engineering team has been notified.
                        </div>
                      )}
                    </div>

                    {ticket.status !== "Completed" ? (
                      <form onSubmit={(e) => handleSendReply(e, ticket.id)} className="flex gap-3">
                        <Input 
                          value={newReplyText}
                          onChange={(e) => setNewReplyText(e.target.value)}
                          placeholder="Type a message to our engineers..."
                          className="bg-white/5 border-white/10 h-11 rounded-xl text-sm"
                          disabled={isSendingReply}
                        />
                        <Button 
                          type="submit" 
                          disabled={!newReplyText.trim() || isSendingReply}
                          className="h-11 px-5 rounded-xl bg-primary hover:scale-105 transition-transform"
                        >
                          {isSendingReply ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                        </Button>
                      </form>
                    ) : (
                      <div className="text-center py-3 bg-green-500/10 border border-green-500/20 rounded-xl text-xs text-green-500 font-bold uppercase tracking-wider">
                        This ticket has been resolved and closed
                      </div>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          ))
        ) : (
          <div className="text-center py-20 glass-card rounded-[2.5rem] border-white/5">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/5 mb-6">
              <MessageSquare className="w-10 h-10 text-primary/40" />
            </div>
            <h3 className="text-2xl font-black mb-2">No Active Tickets</h3>
            <p className="text-muted-foreground">All systems are operational. If you need help, open a new ticket above.</p>
          </div>
        )}
      </div>
    </div>
  );
}
