import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  LayoutDashboard, 
  FolderOpen, 
  MessageSquare, 
  Users, 
  Settings, 
  LogOut,
  BarChart3,
  Mail,
  Eye,
  Edit,
  Trash2
} from "lucide-react";
import { AdminSidebar } from "./AdminSidebar";
import { DashboardOverview } from "./DashboardOverview";
import { ProjectsManager } from "./ProjectsManager";
import { TestimonialsManager } from "./TestimonialsManager";  
import { ContactMessages } from "./ContactMessages";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Services from "@/components/Services";
import Portfolio from "@/components/Portfolio";
import Contact from "@/components/Contact";

interface AdminDashboardProps {
  onLogout: () => void;
}

export function AdminDashboard({ onLogout }: AdminDashboardProps) {
  const [activeSection, setActiveSection] = useState("overview");

  const renderContent = () => {
    switch (activeSection) {
      case "overview":
        return <DashboardOverview />;
      case "projects":
        return <ProjectsManager />;
      case "testimonials":
        return <TestimonialsManager />;
      case "messages":
        return <ContactMessages />;
      case "hero":
        return <Hero />;
      case "about":
        return <About />;
      case "services":
        return <Services />;
      case "portfolio":
        return <Portfolio />;
      case "contact":
        return <Contact />;
      default:
        return <DashboardOverview />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-accent/10">
      <div className="flex">
        <AdminSidebar 
          activeSection={activeSection}
          onSectionChange={setActiveSection}
          onLogout={onLogout}
        />
        
        <main className="flex-1 p-6 ml-64">
          <div className="max-w-7xl mx-auto">
            <header className="mb-8">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                    Admin Dashboard
                  </h1>
                  <p className="text-muted-foreground mt-1">
                    Manage your Twende Digital website
                  </p>
                </div>
                
                <Button variant="outline" onClick={onLogout} className="gap-2">
                  <LogOut className="h-4 w-4" />
                  Logout
                </Button>
              </div>
            </header>
            
            {renderContent()}
          </div>
        </main>
      </div>
    </div>
  );
}