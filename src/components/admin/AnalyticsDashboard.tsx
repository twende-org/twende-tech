import { useGetLeadsQuery, useGetProjectsQuery, useGetMessagesQuery, useGetUsersQuery } from "@/store/apiSlice";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  TrendingUp, 
  Users, 
  DollarSign, 
  Activity, 
  BarChart3, 
  PieChart, 
  ArrowUpRight, 
  ArrowDownRight,
  Loader2
} from "lucide-react";

export function AnalyticsDashboard() {
  const { data: leads, isLoading: leadsLoading } = useGetLeadsQuery();
  const { data: projects, isLoading: projectsLoading } = useGetProjectsQuery();
  const { data: messages, isLoading: messagesLoading } = useGetMessagesQuery();
  const { data: users, isLoading: usersLoading } = useGetUsersQuery();

  if (leadsLoading || projectsLoading || messagesLoading || usersLoading) {
    return (
      <div className="h-64 flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  // Calculate some mock analytics based on real data
  const conversionRate = leads && projects ? ((projects.length / leads.length) * 100).toFixed(1) : "0";
  const totalRevenue = projects?.length ? projects.length * 15000000 : 0; // Avg 15M TZS per project
  const monthlyGrowth = "+12.5%";

  const categories = [
    { name: "Web Systems", value: projects?.filter(p => p.category === "Web Systems").length || 0, color: "bg-blue-500" },
    { name: "Mobile Apps", value: projects?.filter(p => p.category === "Mobile Apps").length || 0, color: "bg-purple-500" },
    { name: "Cloud Solutions", value: projects?.filter(p => p.category === "Cloud Infrastructure").length || 0, color: "bg-cyan-500" },
    { name: "UI/UX Design", value: projects?.filter(p => p.category === "UI/UX Design").length || 0, color: "bg-orange-500" },
  ];

  return (
    <div className="space-y-8 animate-slide-up">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="glass-card border-white/10 hover-lift">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground uppercase tracking-widest">Total Revenue (EST)</CardTitle>
            <DollarSign className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-black">{totalRevenue.toLocaleString()} TZS</div>
            <div className="flex items-center text-xs text-green-500 mt-1">
              <ArrowUpRight className="h-3 w-3 mr-1" /> {monthlyGrowth} vs last month
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card border-white/10 hover-lift">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground uppercase tracking-widest">Conversion Rate</CardTitle>
            <TrendingUp className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-black">{conversionRate}%</div>
            <div className="flex items-center text-xs text-muted-foreground mt-1">
              Based on {leads?.length} total leads
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card border-white/10 hover-lift">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground uppercase tracking-widest">Active Clients</CardTitle>
            <Users className="h-4 w-4 text-purple-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-black">{users?.filter(u => u.role === 'client').length}</div>
            <div className="flex items-center text-xs text-muted-foreground mt-1">
              Verified enterprise partners
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card border-white/10 hover-lift">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground uppercase tracking-widest">Avg. Velocity</CardTitle>
            <Activity className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-black">14.2 Days</div>
            <div className="flex items-center text-xs text-red-500 mt-1">
              <ArrowDownRight className="h-3 w-3 mr-1" /> -2.4% vs last project
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 glass-card border-white/10 p-8">
          <CardHeader className="px-0 pt-0">
            <CardTitle className="text-2xl font-black flex items-center gap-2">
              <BarChart3 className="w-6 h-6 text-primary" /> Project Distribution
            </CardTitle>
            <CardDescription>Breakdown of engineering effort by category</CardDescription>
          </CardHeader>
          <CardContent className="px-0 pt-6">
            <div className="h-[300px] flex items-end justify-between gap-4">
              {categories.map((cat) => {
                const height = (cat.value / (projects?.length || 1)) * 100 + 10;
                return (
                  <div key={cat.name} className="flex-1 flex flex-col items-center gap-4 group">
                    <div className="w-full relative flex flex-col justify-end h-full">
                      <div 
                        className={`w-full rounded-t-xl transition-all duration-500 group-hover:brightness-125 ${cat.color}`} 
                        style={{ height: `${height}%` }}
                      >
                        <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-black/80 text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                          {cat.value} Projects
                        </div>
                      </div>
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground text-center line-clamp-1">
                      {cat.name}
                    </span>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card border-white/10 p-8">
          <CardHeader className="px-0 pt-0">
            <CardTitle className="text-2xl font-black flex items-center gap-2">
              <PieChart className="w-6 h-6 text-primary" /> Lead Status
            </CardTitle>
            <CardDescription>Current sales pipeline</CardDescription>
          </CardHeader>
          <CardContent className="px-0 pt-8">
            <div className="space-y-6">
              {[
                { label: "New Inquiries", count: leads?.filter(l => l.status === "New").length || 0, total: leads?.length || 1, color: "bg-blue-500" },
                { label: "Qualified", count: leads?.filter(l => l.status === "Qualified").length || 0, total: leads?.length || 1, color: "bg-yellow-500" },
                { label: "Converted", count: projects?.length || 0, total: leads?.length || 1, color: "bg-green-500" },
                { label: "Lost", count: 2, total: leads?.length || 1, color: "bg-red-500" }
              ].map((item) => (
                <div key={item.label} className="space-y-2">
                  <div className="flex justify-between text-xs font-bold uppercase tracking-widest">
                    <span>{item.label}</span>
                    <span className="text-muted-foreground">{item.count}</span>
                  </div>
                  <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                    <div 
                      className={`h-full transition-all duration-1000 ${item.color}`} 
                      style={{ width: `${(item.count / item.total) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
