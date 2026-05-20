import { useState, useEffect } from "react";
import { useGetAllSupportTicketsQuery, useUpdateSupportTicketMutation } from "@/store/apiSlice";
import { useAuth } from "@/context/AuthContext";
import { db } from "@/lib/firebase";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import { submitTicketReply } from "@/services/ticketReplies";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  MessageSquare, 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  Send, 
  Loader2, 
  ChevronDown, 
  ChevronUp, 
  ShieldCheck, 
  User 
} from "lucide-react";
import { toast } from "sonner";

export function SupportTicketsManager() {
  const { user } = useAuth();
  const { data: tickets = [], isLoading } = useGetAllSupportTicketsQuery();
  const [updateTicket] = useUpdateSupportTicketMutation();

  const [expandedTicketId, setExpandedTicketId] = useState<string | null>(null);
  const [replies, setReplies] = useState<any[]>([]);
  const [newReplyText, setNewReplyText] = useState("");
  const [isSendingReply, setIsSendingReply] = useState(false);
  const [statusFilter, setStatusFilter] = useState("all");

  // Subscribe to replies for the expanded ticket
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
        senderEmail: user.email || "Admin",
        senderRole: "admin",
        text: newReplyText.trim()
      });

      if (res.success) {
        setNewReplyText("");
        toast.success("Response sent! Ticket marked as In Progress.");
      } else {
        toast.error("Failed to send reply");
      }
    } catch {
      toast.error("Failed to send reply");
    } finally {
      setIsSendingReply(false);
    }
  };

  const handleToggleStatus = async (ticketId: string, currentStatus: string) => {
    const nextStatus = currentStatus === "Completed" ? "Open" : "Completed";
    try {
      await updateTicket({ id: ticketId, status: nextStatus }).unwrap();
      toast.success(`Ticket marked as ${nextStatus} successfully!`);
    } catch {
      toast.error("Failed to update status");
    }
  };

  const filteredTickets = tickets.filter(ticket => {
    if (statusFilter === "all") return true;
    return ticket.status.toLowerCase() === statusFilter.toLowerCase();
  });

  if (isLoading) {
    return (
      <div className="h-64 flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-slide-up">
      {/* Header and Filter Controls */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-3xl font-black mb-1">Support Center</h2>
          <p className="text-muted-foreground">Review and reply to client engineering tickets in real-time</p>
        </div>
        
        <div className="flex items-center gap-2 bg-white/5 border border-white/10 p-1.5 rounded-xl shrink-0">
          {["all", "open", "in progress", "completed"].map((filter) => (
            <button
              key={filter}
              onClick={() => setStatusFilter(filter)}
              className={`
                px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all
                ${statusFilter === filter 
                  ? "bg-primary text-white shadow" 
                  : "text-muted-foreground hover:text-white hover:bg-white/5"}
              `}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      {/* Tickets List */}
      <div className="grid gap-6">
        {filteredTickets.length > 0 ? (
          filteredTickets.map((ticket) => (
            <Card key={ticket.id} className="glass-card border-white/10 hover:border-white/20 transition-all rounded-[2rem]">
              <CardContent className="p-8">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                  <div className="flex items-start gap-5">
                    <div className={`p-4 rounded-2xl shrink-0 ${
                      ticket.status === 'Open' ? 'bg-blue-500/10 text-blue-500' : 
                      ticket.status === 'In Progress' ? 'bg-yellow-500/10 text-yellow-500' : 
                      'bg-green-500/10 text-green-500'
                    }`}>
                      <MessageSquare className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="flex flex-wrap items-center gap-3 mb-1.5">
                        <h3 className="text-xl font-black">{ticket.subject}</h3>
                        <Badge variant="outline" className={`text-[10px] uppercase tracking-tighter ${
                          ticket.priority === 'High' ? 'border-red-500 text-red-500' : 'border-white/20 text-muted-foreground'
                        }`}>
                          {ticket.priority} PRIORITY
                        </Badge>
                      </div>
                      
                      <p className="text-muted-foreground mb-4 max-w-2xl leading-relaxed">{ticket.description}</p>
                      
                      <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-[10px] text-muted-foreground uppercase tracking-widest font-bold">
                        <span className="flex items-center gap-1.5"><User className="w-3.5 h-3.5 text-primary" /> CLIENT ID: {ticket.clientId?.slice(0, 10) || "Unknown"}</span>
                        <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" /> {ticket.createdAt ? new Date(ticket.createdAt).toLocaleDateString() : "Pending"}</span>
                        <span className="flex items-center gap-1.5"><AlertCircle className="w-3.5 h-3.5" /> ID: {ticket.id.slice(0, 8)}</span>
                      </div>
                    </div>
                  </div>

                  {/* Actions Panel */}
                  <div className="flex flex-wrap items-center gap-4 shrink-0 lg:self-center">
                    <Button 
                      variant="outline" 
                      onClick={() => setExpandedTicketId(expandedTicketId === ticket.id ? null : ticket.id)}
                      className="rounded-full h-10 px-5 text-xs font-bold gap-1.5 border-white/10 hover:bg-white/5"
                    >
                      {expandedTicketId === ticket.id ? (
                        <>Close Timeline <ChevronUp className="w-4 h-4" /></>
                      ) : (
                        <>Open Timeline <ChevronDown className="w-4 h-4" /></>
                      )}
                    </Button>

                    <Button
                      variant={ticket.status === 'Completed' ? "outline" : "hero"}
                      onClick={() => handleToggleStatus(ticket.id, ticket.status)}
                      className="rounded-full h-10 px-5 text-xs font-bold gap-1.5"
                    >
                      {ticket.status === 'Completed' ? (
                        <>Reopen Ticket</>
                      ) : (
                        <><ShieldCheck className="w-4 h-4" /> Mark Resolved</>
                      )}
                    </Button>

                    <Badge className={`px-4 py-2.5 rounded-full font-black tracking-widest text-[10px] uppercase ${
                      ticket.status === 'Open' ? 'bg-blue-500/20 text-blue-500' : 
                      ticket.status === 'In Progress' ? 'bg-yellow-500/20 text-yellow-500' : 
                      'bg-green-500/20 text-green-500'
                    }`}>
                      {ticket.status === 'Completed' ? <CheckCircle2 className="w-3.5 h-3.5 mr-1 inline" /> : null}
                      {ticket.status}
                    </Badge>
                  </div>
                </div>

                {/* Expanded replies thread */}
                {expandedTicketId === ticket.id && (
                  <div className="mt-8 pt-8 border-t border-white/10 space-y-6">
                    <h4 className="text-sm font-bold uppercase tracking-widest text-primary">Response Timeline</h4>
                    
                    <div className="space-y-4 max-h-72 overflow-y-auto pr-2 custom-scrollbar flex flex-col">
                      {replies.map((reply) => (
                        <div 
                          key={reply.id} 
                          className={`flex flex-col space-y-1 p-4 rounded-2xl text-sm max-w-[80%] ${
                            reply.senderRole === "admin" 
                              ? "bg-primary/20 border border-primary/20 self-end" 
                              : "bg-white/5 border border-white/5 self-start"
                          }`}
                        >
                          <div className="flex justify-between items-center text-[10px] uppercase tracking-wider font-bold text-muted-foreground gap-8">
                            <span>{reply.senderRole === "admin" ? "You (Admin)" : "Client"}</span>
                            <span>{reply.createdAt?.seconds ? new Date(reply.createdAt.seconds * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : "Just now"}</span>
                          </div>
                          <p className="text-white mt-1 leading-relaxed">{reply.text}</p>
                        </div>
                      ))}
                      {replies.length === 0 && (
                        <div className="text-center py-6 text-xs text-muted-foreground">
                          No replies in this thread. Write a message below to reply to the client.
                        </div>
                      )}
                    </div>

                    {ticket.status !== "Completed" ? (
                      <form onSubmit={(e) => handleSendReply(e, ticket.id)} className="flex gap-3 pt-2">
                        <Input 
                          value={newReplyText}
                          onChange={(e) => setNewReplyText(e.target.value)}
                          placeholder="Type an engineering response to the client..."
                          className="bg-white/5 border-white/10 h-12 rounded-xl text-sm"
                          disabled={isSendingReply}
                        />
                        <Button 
                          type="submit" 
                          disabled={!newReplyText.trim() || isSendingReply}
                          className="h-12 px-6 rounded-xl bg-primary hover:scale-105 transition-transform"
                        >
                          {isSendingReply ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-4 h-4" />}
                        </Button>
                      </form>
                    ) : (
                      <div className="text-center py-3 bg-green-500/10 border border-green-500/20 rounded-xl text-xs text-green-500 font-bold uppercase tracking-wider">
                        Ticket is marked resolved. Reopen to post more responses.
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
            <h3 className="text-2xl font-black mb-2">No Support Tickets</h3>
            <p className="text-muted-foreground">All client accounts are clear of support inquiries.</p>
          </div>
        )}
      </div>
    </div>
  );
}
