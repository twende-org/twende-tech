import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  TrendingUp, 
  Clock, 
  CheckCircle2, 
  ArrowRight, 
  MessageSquare,
  Activity,
  Zap,
  Globe
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import SEO from "@/components/SEO";

export default function ClientDashboard() {
  const { user } = useAuth();

  const stats = [
    { label: "Active Projects", value: "1", icon: Zap, color: "text-primary" },
    { label: "SLA Uptime", value: "99.99%", icon: Activity, color: "text-green-500" },
    { label: "Support Tickets", value: "0", icon: MessageSquare, color: "text-blue-500" },
  ];

  return (
    <div className="space-y-8 animate-slide-up">
      <SEO title="Client Dashboard" />
      
      {/* Welcome Section */}
      <div className="relative glass-card p-12 rounded-[2.5rem] border-white/5 overflow-hidden">
        <div className="relative z-10">
          <h1 className="text-4xl font-black mb-4 tracking-tight">
            Welcome Back, <span className="gradient-text">{user?.email?.split('@')[0]}</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl leading-relaxed">
            Your enterprise systems are running at peak performance. Track your project development and service metrics below.
          </p>
        </div>
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-primary/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/4"></div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat) => (
          <Card key={stat.label} className="glass-card border-white/10 hover-lift rounded-[2rem]">
            <CardContent className="p-8">
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-2xl bg-white/5 ${stat.color}`}>
                  <stat.icon className="w-6 h-6" />
                </div>
                <TrendingUp className="w-4 h-4 text-green-500" />
              </div>
              <h3 className="text-3xl font-black mb-1">{stat.value}</h3>
              <p className="text-sm font-bold text-muted-foreground uppercase tracking-wider">{stat.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Project Roadmap */}
        <Card className="lg:col-span-2 glass-card border-white/10 rounded-[2.5rem]">
          <CardHeader className="p-10 pb-4">
            <CardTitle className="text-2xl font-black">Project Roadmap</CardTitle>
            <CardDescription>Real-time engineering progress tracking</CardDescription>
          </CardHeader>
          <CardContent className="p-10 pt-6">
            <div className="space-y-8">
              <div className="flex items-center gap-6">
                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Globe className="w-8 h-8 text-primary" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-xl font-bold">Custom ERP Transformation</h4>
                    <span className="text-sm font-black text-primary px-3 py-1 bg-primary/10 rounded-full">Phase 3: Integration</span>
                  </div>
                  <div className="w-full h-3 bg-white/5 rounded-full overflow-hidden border border-white/5">
                    <div className="h-full bg-primary w-[65%] rounded-full shadow-[0_0_10px_rgba(var(--primary),0.5)]"></div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
                {[
                  { label: "Infrastructure Setup", completed: true },
                  { label: "API Architecture", completed: true },
                  { label: "Frontend Development", completed: false },
                  { label: "User Acceptance Testing", completed: false },
                ].map((step, idx) => (
                  <div key={idx} className="flex items-center gap-3 p-4 rounded-2xl bg-white/5 border border-white/5">
                    {step.completed ? (
                      <CheckCircle2 className="w-5 h-5 text-green-500" />
                    ) : (
                      <Clock className="w-5 h-5 text-muted-foreground" />
                    )}
                    <span className={`font-bold ${step.completed ? "text-white" : "text-muted-foreground"}`}>
                      {step.label}
                    </span>
                  </div>
                ))}
              </div>
              
              <Button variant="outline" className="w-full h-12 rounded-xl mt-6 border-white/10 gap-2">
                View Full Documentation <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Support & Actions */}
        <div className="space-y-8">
          <Card className="glass-card border-white/10 rounded-[2.5rem] bg-gradient-to-br from-primary/10 to-accent/10 border-primary/20">
            <CardHeader className="p-10 pb-0">
              <CardTitle className="text-2xl font-black">Support</CardTitle>
              <CardDescription>Need assistance with your systems?</CardDescription>
            </CardHeader>
            <CardContent className="p-10 pt-6">
              <p className="text-muted-foreground mb-8 leading-relaxed">
                Our engineering team is standing by to resolve any critical issues or update requests.
              </p>
              <Button className="w-full h-14 rounded-2xl text-lg font-black shadow-lg shadow-primary/20 gap-2">
                <MessageSquare className="w-5 h-5" /> Open Ticket
              </Button>
            </CardContent>
          </Card>

          <Card className="glass-card border-white/10 rounded-[2.5rem]">
            <CardHeader className="p-10 pb-0">
              <CardTitle className="text-xl font-black">Latest Update</CardTitle>
            </CardHeader>
            <CardContent className="p-10 pt-6">
              <div className="flex items-start gap-4">
                <div className="w-2 h-2 rounded-full bg-primary mt-2"></div>
                <div>
                  <p className="text-sm font-bold mb-1">Infrastructure Upgrade</p>
                  <p className="text-xs text-muted-foreground">Redis caching layers deployed to production for faster data retrieval.</p>
                  <p className="text-[10px] text-muted-foreground mt-2 italic">2 hours ago</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
