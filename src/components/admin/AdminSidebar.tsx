import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { 
  LayoutDashboard, 
  FolderOpen, 
  MessageSquare, 
  Users, 
  Settings, 
  LogOut,
  BarChart3,
  Navigation,
  ChevronDown,
  ChevronRight,
  Plus,
  Edit,
  Trash2,
  X
} from "lucide-react";
import { useState } from "react";

interface AdminSidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  onLogout: () => void;
  isOpen: boolean;
  onClose: () => void;
}

export function AdminSidebar({ activeTab, onTabChange, onLogout, isOpen, onClose }: AdminSidebarProps) {
  const [isNavigationOpen, setIsNavigationOpen] = useState(false);

  const mainMenuItems = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "leads", label: "Leads", icon: BarChart3 },
    { id: "messages", label: "Messages", icon: MessageSquare },
    { id: "users", label: "User Portal", icon: Users },
    { id: "settings", label: "Settings", icon: Settings },
  ];

  const navigationItems = [
    { id: "projects", label: "Projects" },
    { id: "testimonials", label: "Testimonials" },
    { id: "about", label: "About" },
    { id: "services", label: "Services" },
    { id: "contact", label: "Contact" },
  ];

  const handleTabClick = (id: string) => {
    onTabChange(id);
    if (window.innerWidth < 768) {
      onClose();
    }
  };

  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 md:hidden transition-all duration-300"
          onClick={onClose}
        />
      )}

      <div className={`fixed left-0 top-0 h-full w-64 bg-card/50 backdrop-blur-xl border-r border-border/50 p-6 z-50 transform transition-transform duration-300 ease-in-out ${
        isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
      }`}>
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              Twende Digital
            </h2>
            <p className="text-sm text-muted-foreground">Admin Portal</p>
          </div>
          <Button variant="ghost" size="icon" className="md:hidden" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        </div>
        
        <nav className="space-y-1">
          {/* Overview */}
          <Button
            variant={activeTab === "dashboard" ? "secondary" : "ghost"}
            className={`w-full justify-start gap-3 h-10 ${
              activeTab === "dashboard" ? "bg-primary/10 text-primary border border-primary/20" : ""
            }`}
            onClick={() => handleTabClick("dashboard")}
          >
            <LayoutDashboard className="h-4 w-4" />
            Dashboard
          </Button>

          {/* Navigation Dropdown */}
          <Collapsible open={isNavigationOpen} onOpenChange={setIsNavigationOpen}>
            <CollapsibleTrigger asChild>
              <Button
                variant="ghost"
                className="w-full justify-start gap-3 h-10 hover:bg-muted/50"
              >
                <Navigation className="h-4 w-4" />
                Content Management
                <ChevronDown className={`h-4 w-4 ml-auto transition-transform ${isNavigationOpen ? "rotate-180" : ""}`} />
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent className="space-y-1 mt-1">
              <div className="ml-6 space-y-1">
                {navigationItems.map((item) => {
                  const isActive = activeTab === item.id;
                  return (
                    <Button
                      key={item.id}
                      variant={isActive ? "secondary" : "ghost"}
                      size="sm"
                      className={`w-full justify-start h-9 ${
                        isActive ? "bg-primary/10 text-primary border border-primary/20" : ""
                      }`}
                      onClick={() => handleTabClick(item.id)}
                    >
                      {item.label}
                    </Button>
                  );
                })}
              </div>
            </CollapsibleContent>
          </Collapsible>

          {/* Other Menu Items */}
          {mainMenuItems.slice(1).map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            
            return (
              <Button
                key={item.id}
                variant={isActive ? "secondary" : "ghost"}
                className={`w-full justify-start gap-3 h-10 ${
                  isActive ? "bg-primary/10 text-primary border border-primary/20" : ""
                }`}
                onClick={() => handleTabClick(item.id)}
              >
                <Icon className="h-4 w-4" />
                {item.label}
              </Button>
            );
          })}
        </nav>
        
        <div className="absolute bottom-6 left-6 right-6">
          <Button variant="outline" onClick={onLogout} className="w-full gap-2 h-10">
            <LogOut className="h-4 w-4" />
            Logout
          </Button>
        </div>
      </div>
    </>
  );
}