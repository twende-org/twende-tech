import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  FolderOpen, 
  MessageSquare, 
  Users, 
  Eye,
  TrendingUp,
  Calendar,
  Globe,
  ArrowUpRight,
  Database
} from "lucide-react";
import { useGetProjectsQuery, useGetMessagesQuery, useGetTestimonialsQuery } from "@/store/apiSlice";
import { seedData } from "@/../seed";
import { toast } from "sonner";
import { useState } from "react";

export function DashboardOverview() {
  const { data: projects } = useGetProjectsQuery(undefined);
  const { data: messages } = useGetMessagesQuery(undefined);
  const { data: testimonials } = useGetTestimonialsQuery(undefined);
  const [isSeeding, setIsSeeding] = useState(false);

  const handleSeed = async () => {
    setIsSeeding(true);
    try {
      await seedData();
      toast.success("Initial data seeded successfully");
    } catch (error) {
      toast.error("Seeding failed");
    } finally {
      setIsSeeding(false);
    }
  };

  const stats = [
    {
      title: "Total Projects",
      value: projects?.length.toString() || "0",
      change: "Live from Firestore",
      icon: FolderOpen,
      color: "text-blue-500"
    },
    {
      title: "Active Inquiries",
      value: messages?.filter(m => m.status === "New").length.toString() || "0",
      change: `${messages?.length || 0} total messages`,
      icon: MessageSquare,
      color: "text-green-500"
    },
    {
      title: "Testimonials",
      value: testimonials?.length.toString() || "0",
      change: `${testimonials?.filter(t => t.status === "Approved").length || 0} approved`,
      icon: Users,
      color: "text-purple-500"
    },
    {
      title: "Engagement Score",
      value: ((messages?.length || 0) * 12 + (projects?.length || 0) * 45).toString(),
      change: "Based on activity",
      icon: Eye,
      color: "text-orange-500"
    }
  ];

  const recentActivity = [
    ...(projects?.slice(0, 2).map(p => ({
      action: "Project updated",
      item: p.title,
      time: "Recent",
      type: "project"
    })) || []),
    ...(messages?.slice(0, 2).map(m => ({
      action: "New inquiry",
      item: `From ${m.name}`,
      time: m.date,
      type: "message"
    })) || []),
  ].slice(0, 4);

  // Fallback if no data
  if (recentActivity.length === 0) {
    recentActivity.push({
      action: "System initialized",
      item: "Welcome to Twende Admin",
      time: "Just now",
      type: "system"
    });
  }

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.title} className="glass-card border-border/50 hover:border-primary/20 transition-all">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </CardTitle>
                <Icon className={`h-5 w-5 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground mt-1">
                  {stat.change}
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <Card className="glass-card border-border/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              Recent Activity
            </CardTitle>
            <CardDescription>
              Latest updates and changes
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-start space-x-3 p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors">
                  <div className="flex-shrink-0">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium">{activity.action}</p>
                    <p className="text-sm text-muted-foreground">{activity.item}</p>
                    <p className="text-xs text-muted-foreground mt-1">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card className="glass-card border-border/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Globe className="h-5 w-5 text-primary" />
              Quick Actions
            </CardTitle>
            <CardDescription>
              Common management tasks
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button className="w-full justify-between" variant="hero" onClick={handleSeed} disabled={isSeeding}>
              {isSeeding ? "Seeding..." : "Seed Initial Data"}
              <Database className="h-4 w-4" />
            </Button>
            <Button className="w-full justify-between" variant="outline">
              Add New Project
              <ArrowUpRight className="h-4 w-4" />
            </Button>
            <Button className="w-full justify-between" variant="outline">
              Review Messages
              <ArrowUpRight className="h-4 w-4" />
            </Button>
            <Button className="w-full justify-between" variant="outline">
              Manage Testimonials
              <ArrowUpRight className="h-4 w-4" />
            </Button>
            <Button className="w-full justify-between" variant="outline">
              View Analytics
              <ArrowUpRight className="h-4 w-4" />
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Website Status */}
      <Card className="glass-card border-border/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-primary" />
            Website Status
          </CardTitle>
          <CardDescription>
            Current status and performance metrics
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-4 rounded-lg bg-green-500/10 border border-green-500/20">
              <div className="text-2xl font-bold text-green-500">Online</div>
              <p className="text-sm text-muted-foreground mt-1">Website Status</p>
            </div>
            <div className="text-center p-4 rounded-lg bg-blue-500/10 border border-blue-500/20">
              <div className="text-2xl font-bold text-blue-500">1.2s</div>
              <p className="text-sm text-muted-foreground mt-1">Load Time</p>
            </div>
            <div className="text-center p-4 rounded-lg bg-purple-500/10 border border-purple-500/20">
              <div className="text-2xl font-bold text-purple-500">99.9%</div>
              <p className="text-sm text-muted-foreground mt-1">Uptime</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}