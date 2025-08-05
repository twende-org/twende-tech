import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
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
  AlertCircle
} from "lucide-react";

export function ContactMessages() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedMessage, setSelectedMessage] = useState<number | null>(null);

  const messages = [
    {
      id: 1,
      name: "David Wilson",
      email: "david@techstartup.com",
      phone: "+1 (555) 123-4567",
      subject: "Web Development Project",
      message: "Hi, I'm interested in building a modern e-commerce platform for our startup. We need a full-stack solution with payment integration and inventory management. Could we schedule a call to discuss the requirements?",
      status: "New",
      priority: "High",
      date: "2024-01-15",
      time: "10:30 AM"
    },
    {
      id: 2,
      name: "Lisa Anderson",
      email: "lisa@healthcorp.com",
      phone: "+1 (555) 987-6543",
      subject: "Mobile App Development",
      message: "We're looking for a team to develop a healthcare mobile app with patient management features. The app needs to be HIPAA compliant and work on both iOS and Android.",
      status: "In Progress",
      priority: "Medium",
      date: "2024-01-14",
      time: "2:15 PM"
    },
    {
      id: 3,
      name: "Robert Chen",
      email: "robert@financeco.com",
      phone: "+1 (555) 456-7890",
      subject: "UI/UX Design Services",
      message: "Hello, we need help redesigning our financial dashboard. Looking for modern, clean design that improves user experience. Can you provide some examples of similar work?",
      status: "Replied",
      priority: "Low",
      date: "2024-01-13",
      time: "4:45 PM"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "New":
        return "bg-blue-500/10 text-blue-500 border-blue-500/20";
      case "In Progress":
        return "bg-yellow-500/10 text-yellow-500 border-yellow-500/20";
      case "Replied":
        return "bg-green-500/10 text-green-500 border-green-500/20";
      case "Archived":
        return "bg-gray-500/10 text-gray-500 border-gray-500/20";
      default:
        return "bg-gray-500/10 text-gray-500 border-gray-500/20";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "High":
        return "bg-red-500/10 text-red-500 border-red-500/20";
      case "Medium":
        return "bg-yellow-500/10 text-yellow-500 border-yellow-500/20";
      case "Low":
        return "bg-green-500/10 text-green-500 border-green-500/20";
      default:
        return "bg-gray-500/10 text-gray-500 border-gray-500/20";
    }
  };

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case "High":
        return <AlertCircle className="h-4 w-4" />;
      case "Medium":
        return <Clock className="h-4 w-4" />;
      case "Low":
        return <CheckCircle className="h-4 w-4" />;
      default:
        return <Clock className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Contact Messages</h2>
          <p className="text-muted-foreground">Manage incoming client inquiries</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2">
            <Archive className="h-4 w-4" />
            Archive Selected
          </Button>
        </div>
      </div>

      {/* Search and Filter */}
      <Card className="glass-card border-border/50">
        <CardContent className="pt-6">
          <div className="flex gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search messages..."
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

      {/* Messages List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Messages</h3>
          {messages.map((message) => (
            <Card 
              key={message.id} 
              className={`glass-card border-border/50 hover:border-primary/20 transition-all cursor-pointer ${
                selectedMessage === message.id ? "border-primary/50 bg-primary/5" : ""
              }`}
              onClick={() => setSelectedMessage(message.id)}
            >
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarFallback>
                        {message.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle className="text-base">{message.name}</CardTitle>
                      <p className="text-sm text-muted-foreground">{message.email}</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Badge className={getStatusColor(message.status)}>
                      {message.status}
                    </Badge>
                    <Badge className={getPriorityColor(message.priority)} variant="outline">
                      {getPriorityIcon(message.priority)}
                      {message.priority}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent>
                <h4 className="font-medium mb-2">{message.subject}</h4>
                <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                  {message.message}
                </p>
                
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <div className="flex items-center gap-4">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {message.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {message.time}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Message Details */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Message Details</h3>
          {selectedMessage ? (
            (() => {
              const message = messages.find(m => m.id === selectedMessage);
              if (!message) return null;
              
              return (
                <Card className="glass-card border-border/50">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-xl">{message.subject}</CardTitle>
                        <CardDescription className="mt-1">
                          From: {message.name} ({message.email})
                        </CardDescription>
                      </div>
                      <div className="flex gap-2">
                        <Badge className={getStatusColor(message.status)}>
                          {message.status}
                        </Badge>
                        <Badge className={getPriorityColor(message.priority)} variant="outline">
                          {message.priority}
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="space-y-6">
                    {/* Contact Info */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 rounded-lg bg-muted/20">
                      <div className="flex items-center gap-2">
                        <Mail className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">{message.email}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">{message.phone}</span>
                      </div>
                    </div>
                    
                    {/* Message Content */}
                    <div>
                      <h4 className="font-medium mb-3">Message</h4>
                      <div className="p-4 rounded-lg bg-muted/10 border border-border/50">
                        <p className="text-sm leading-relaxed">{message.message}</p>
                      </div>
                    </div>
                    
                    {/* Actions */}
                    <div className="flex gap-2 pt-4 border-t border-border/50">
                      <Button className="gap-2">
                        <Reply className="h-4 w-4" />
                        Reply
                      </Button>
                      <Button variant="outline" className="gap-2">
                        <Archive className="h-4 w-4" />
                        Archive
                      </Button>
                      <Button variant="outline" className="gap-2 text-destructive hover:text-destructive">
                        <Trash2 className="h-4 w-4" />
                        Delete
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
                  <Mail className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">Select a message to view details</p>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}