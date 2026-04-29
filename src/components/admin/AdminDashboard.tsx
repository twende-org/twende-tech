import { useState } from "react";
import { Button } from "@/components/ui/button";
import { 
  Menu,
  LogOut
} from "lucide-react";
import { AdminSidebar } from "./AdminSidebar";
import { DashboardOverview } from "./DashboardOverview";
import { ProjectsManager } from "./ProjectsManager";
import { TestimonialsManager } from "./TestimonialsManager";  
import { ContactMessages } from "./ContactMessages";
import { LeadsManager } from "./LeadsManager";
import { UserManager } from "./UserManager";

interface AdminDashboardProps {
  onLogout: () => void;
}

export function AdminDashboard({ onLogout }: AdminDashboardProps) {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return <DashboardOverview />;
      case "projects":
        return <ProjectsManager />;
      case "testimonials":
        return <TestimonialsManager />;
      case "messages":
        return <ContactMessages />;
      case "leads":
        return <LeadsManager />;
      case "users":
        return <UserManager />;
      case "settings":
        return (
          <div className="flex items-center justify-center h-64 border-2 border-dashed border-border/50 rounded-xl">
            <p className="text-muted-foreground">Settings Management Coming Soon</p>
          </div>
        );
      default:
        return <DashboardOverview />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-accent/10">
      <div className="flex">
        <AdminSidebar 
          activeTab={activeTab}
          onTabChange={setActiveTab}
          onLogout={onLogout}
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
        />
        
        <main className="flex-1 p-4 md:p-8 md:ml-64 transition-all duration-300">
          <div className="max-w-7xl mx-auto">
            <header className="mb-8">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="md:hidden"
                    onClick={() => setIsSidebarOpen(true)}
                  >
                    <Menu className="h-6 h-6" />
                  </Button>
                  <div>
                    <h1 className="text-2xl md:text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                      Admin Dashboard
                    </h1>
                    <p className="text-sm md:text-base text-muted-foreground mt-1">
                      Manage your Twende Digital website
                    </p>
                  </div>
                </div>
                
                <Button variant="outline" onClick={onLogout} className="gap-2 hidden sm:flex">
                  <LogOut className="h-4 w-4" />
                  Logout
                </Button>
                <Button variant="outline" size="icon" onClick={onLogout} className="sm:hidden">
                  <LogOut className="h-4 w-4" />
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