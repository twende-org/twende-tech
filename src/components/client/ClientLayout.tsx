import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { 
  LayoutDashboard, 
  FolderOpen, 
  Activity, 
  LifeBuoy, 
  LogOut, 
  Menu, 
  X,
  Bell,
  Settings,
  ShieldCheck
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface ClientLayoutProps {
  children: React.ReactNode;
}

export function ClientLayout({ children }: ClientLayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const menuItems = [
    { icon: LayoutDashboard, label: "Overview", path: "/dashboard" },
    { icon: FolderOpen, label: "My Projects", path: "/dashboard/projects" },
    { icon: Activity, label: "Service Health", path: "/dashboard/health" },
    { icon: LifeBuoy, label: "Support", path: "/dashboard/support" },
  ];

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex">
      {/* Sidebar Overlay for Mobile */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60] md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed inset-y-0 left-0 z-[70] w-64 glass-card border-r border-white/10 p-6 flex flex-col transition-transform duration-300
        ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
        md:translate-x-0
      `}>
        <div className="flex items-center gap-3 mb-12 px-2">
          <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
            <ShieldCheck className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-black">Twende <span className="text-primary">Portal</span></h1>
            <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold">Client Space</p>
          </div>
        </div>

        <nav className="flex-1 space-y-2">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`
                flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium
                ${location.pathname === item.path 
                  ? "bg-primary text-white shadow-lg shadow-primary/20" 
                  : "text-muted-foreground hover:bg-white/5 hover:text-white"}
              `}
              onClick={() => setIsSidebarOpen(false)}
            >
              <item.icon className="w-5 h-5" />
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="mt-auto space-y-4 pt-6 border-t border-white/10">
          <div className="flex items-center gap-3 px-2 mb-4">
            <Avatar className="h-10 w-10 border border-white/10">
              <AvatarFallback className="bg-primary/10 text-primary font-bold">
                {user?.email?.[0].toUpperCase() || "C"}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold truncate">{user?.email?.split('@')[0]}</p>
              <p className="text-[10px] text-muted-foreground truncate italic">Standard Client</p>
            </div>
          </div>
          <Button 
            variant="ghost" 
            className="w-full justify-start gap-3 rounded-xl text-muted-foreground hover:text-red-500 hover:bg-red-500/10 transition-all"
            onClick={handleLogout}
          >
            <LogOut className="w-5 h-5" />
            Sign Out
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 md:ml-64 min-h-screen relative overflow-x-hidden">
        {/* Header */}
        <header className="sticky top-0 z-50 glass-card border-b border-white/10 px-6 h-20 flex items-center justify-between">
          <Button 
            variant="ghost" 
            size="icon" 
            className="md:hidden"
            onClick={() => setIsSidebarOpen(true)}
          >
            <Menu className="w-6 h-6" />
          </Button>

          <div className="flex-1 md:block hidden">
            <h2 className="text-sm font-bold text-muted-foreground uppercase tracking-widest">
              {menuItems.find(i => i.path === location.pathname)?.label || "Client Portal"}
            </h2>
          </div>

          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="relative rounded-full hover:bg-white/5">
              <Bell className="w-5 h-5" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-primary rounded-full animate-pulse"></span>
            </Button>
            <Button variant="ghost" size="icon" className="rounded-full hover:bg-white/5">
              <Settings className="w-5 h-5" />
            </Button>
          </div>
        </header>

        {/* Page Content */}
        <div className="p-6 md:p-10 max-w-7xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
