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
  Trash2
} from "lucide-react";
import { useState } from "react";

interface AdminSidebarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
  onLogout: () => void;
}

export function AdminSidebar({ activeSection, onSectionChange, onLogout }: AdminSidebarProps) {
  const [isNavigationOpen, setIsNavigationOpen] = useState(false);

  const mainMenuItems = [
    { id: "overview", label: "Overview", icon: LayoutDashboard },
    { id: "messages", label: "Messages", icon: MessageSquare },
    { id: "analytics", label: "Analytics", icon: BarChart3 },
    { id: "settings", label: "Settings", icon: Settings },
  ];

  const navigationItems = [
    { id: "about", label: "About" },
    { id: "services", label: "Services" },
    { id: "projects", label: "Projects" },
    { id: "contact", label: "Contact" },
  ];

  return (
    <div className="fixed left-0 top-0 h-full w-64 bg-card/50 backdrop-blur-xl border-r border-border/50 p-6">
      <div className="mb-8">
        <h2 className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
          Twende Digital
        </h2>
        <p className="text-sm text-muted-foreground">Admin Portal</p>
      </div>
      
      <nav className="space-y-2">
        {/* Overview */}
        <Button
          variant={activeSection === "overview" ? "secondary" : "ghost"}
          className={`w-full justify-start gap-3 ${
            activeSection === "overview" ? "bg-primary/10 text-primary border border-primary/20" : ""
          }`}
          onClick={() => onSectionChange("overview")}
        >
          <LayoutDashboard className="h-4 w-4" />
          Overview
        </Button>

        {/* Navigation Dropdown */}
        <Collapsible open={isNavigationOpen} onOpenChange={setIsNavigationOpen}>
          <CollapsibleTrigger asChild>
            <Button
              variant="ghost"
              className="w-full justify-start gap-3 hover:bg-muted/50"
            >
              <Navigation className="h-4 w-4" />
              Navigation
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent className="space-y-1 mt-1">
            <div className="ml-6 space-y-1">
              {navigationItems.map((item) => {
                const isActive = activeSection === item.id;
                return (
                  <Button
                    key={item.id}
                    variant={isActive ? "secondary" : "ghost"}
                    size="sm"
                    className={`w-full justify-start ${
                      isActive ? "bg-primary/10 text-primary border border-primary/20" : ""
                    }`}
                    onClick={() => onSectionChange(item.id)}
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
          const isActive = activeSection === item.id;
          
          return (
            <Button
              key={item.id}
              variant={isActive ? "secondary" : "ghost"}
              className={`w-full justify-start gap-3 ${
                isActive ? "bg-primary/10 text-primary border border-primary/20" : ""
              }`}
              onClick={() => onSectionChange(item.id)}
            >
              <Icon className="h-4 w-4" />
              {item.label}
            </Button>
          );
        })}
      </nav>
      
      <div className="absolute bottom-6 left-6 right-6">
        <Button variant="outline" onClick={onLogout} className="w-full gap-2">
          <LogOut className="h-4 w-4" />
          Logout
        </Button>
      </div>
    </div>
  );
}