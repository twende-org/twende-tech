import { useGetLeadsQuery, useGetProjectsQuery, useGetMessagesQuery, useGetUsersQuery, useGetPageViewsQuery } from "@/store/apiSlice";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  TrendingUp, 
  Users, 
  Activity, 
  BarChart3, 
  PieChart, 
  ArrowUpRight, 
  Loader2,
  Globe,
  Mail,
  Eye,
  MousePointerClick,
  Smartphone
} from "lucide-react";

export function AnalyticsDashboard() {
  const { data: pageViews = [], isLoading: pageViewsLoading } = useGetPageViewsQuery();
  const { data: leads = [], isLoading: leadsLoading } = useGetLeadsQuery();
  const { data: projects = [], isLoading: projectsLoading } = useGetProjectsQuery();
  const { data: messages = [], isLoading: messagesLoading } = useGetMessagesQuery();
  const { data: users = [], isLoading: usersLoading } = useGetUsersQuery();

  if (pageViewsLoading || leadsLoading || projectsLoading || messagesLoading || usersLoading) {
    return (
      <div className="h-64 flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  // 1. Calculate Real Analytics Metrics
  const totalPageViews = pageViews.length;
  
  // Unique Visitors (count of unique session IDs)
  const uniqueSessions = new Set(pageViews.map(pv => pv.sessionId));
  const uniqueVisitorsCount = uniqueSessions.size;

  // Inquiries received (contact messages + leads)
  const totalInquiries = (messages?.length || 0) + (leads?.length || 0);

  // Active Sessions Today (unique sessions on current date)
  const todayStr = new Date().toISOString().split("T")[0];
  const uniqueSessionsToday = new Set(
    pageViews.filter(pv => pv.date === todayStr || (pv.createdAt && pv.createdAt.startsWith(todayStr))).map(pv => pv.sessionId)
  );
  const activeSessionsTodayCount = uniqueSessionsToday.size;

  // Conversion rate (projects / inquiries)
  const conversionRate = totalInquiries > 0 ? ((projects.length / totalInquiries) * 100).toFixed(1) : "0";

  // 2. Calculate most visited pages
  const pathCounts: { [key: string]: number } = {};
  pageViews.forEach(pv => {
    const path = pv.path || "/";
    pathCounts[path] = (pathCounts[path] || 0) + 1;
  });

  const mostVisitedPages = Object.entries(pathCounts)
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value)
    .slice(0, 4);

  const getPathColor = (index: number) => {
    const colors = ["bg-blue-500", "bg-purple-500", "bg-cyan-500", "bg-orange-500"];
    return colors[index % colors.length];
  };

  // 3. Group views by date for the last 7 days
  const last7Days = Array.from({ length: 7 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - i);
    return d.toISOString().split("T")[0];
  }).reverse();

  const dailyViews = last7Days.map(dateStr => {
    const count = pageViews.filter(pv => pv.date === dateStr || (pv.createdAt && pv.createdAt.startsWith(dateStr))).length;
    // Format label as "Mon 15", "Tue 16", etc.
    const dateObj = new Date(dateStr);
    const label = dateObj.toLocaleDateString('en-US', { weekday: 'short', day: 'numeric' });
    return { date: dateStr, label, count };
  });

  const maxDailyCount = Math.max(...dailyViews.map(d => d.count), 1);

  // 4. Get recent 5 visits
  const recentVisits = pageViews.slice(0, 5).map(pv => {
    // Simplify userAgent for display
    let browser = "Browser";
    const ua = pv.userAgent || "";
    if (ua.includes("Chrome")) browser = "Chrome";
    else if (ua.includes("Firefox")) browser = "Firefox";
    else if (ua.includes("Safari") && !ua.includes("Chrome")) browser = "Safari";
    else if (ua.includes("Edge")) browser = "Edge";
    
    let device = "Desktop";
    if (ua.includes("Mobile") || ua.includes("Android") || ua.includes("iPhone")) device = "Mobile";

    return {
      id: pv.id,
      path: pv.path,
      device: `${device} (${browser})`,
      referrer: pv.referrer || "direct",
      time: pv.createdAt ? new Date(pv.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : "Just now",
      date: pv.createdAt ? new Date(pv.createdAt).toLocaleDateString() : todayStr
    };
  });

  return (
    <div className="space-y-8 animate-slide-up">
      {/* Dynamic Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="glass-card border-white/10 hover-lift">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-bold text-muted-foreground uppercase tracking-widest">Total Page Views</CardTitle>
            <Eye className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-black">{totalPageViews.toLocaleString()}</div>
            <div className="flex items-center text-xs text-green-500 mt-1">
              <ArrowUpRight className="h-3 w-3 mr-1" /> Live platform interaction
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card border-white/10 hover-lift">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-bold text-muted-foreground uppercase tracking-widest">Unique Visitors</CardTitle>
            <Users className="h-4 w-4 text-purple-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-black">{uniqueVisitorsCount.toLocaleString()}</div>
            <div className="flex items-center text-xs text-muted-foreground mt-1">
              Based on distinct user sessions
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card border-white/10 hover-lift">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-bold text-muted-foreground uppercase tracking-widest">Inquiries Received</CardTitle>
            <Mail className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-black">{totalInquiries}</div>
            <div className="flex items-center text-xs text-muted-foreground mt-1">
              {messages.length} Messages & {leads.length} Leads in Firebase
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card border-white/10 hover-lift">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-bold text-muted-foreground uppercase tracking-widest">Active Visitors Today</CardTitle>
            <Activity className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-black">{activeSessionsTodayCount}</div>
            <div className="flex items-center text-xs text-muted-foreground mt-1">
              Currently active unique sessions
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Traffic trend and Page Views distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 glass-card border-white/10 p-8">
          <CardHeader className="px-0 pt-0">
            <CardTitle className="text-2xl font-black flex items-center gap-2">
              <BarChart3 className="w-6 h-6 text-primary" /> 7-Day Traffic Trends
            </CardTitle>
            <CardDescription>Daily page views recorded on the platform</CardDescription>
          </CardHeader>
          <CardContent className="px-0 pt-6">
            <div className="h-[260px] flex items-end justify-between gap-4">
              {dailyViews.map((d) => {
                const pct = (d.count / maxDailyCount) * 100;
                // Ensure at least a tiny sliver is shown if there's any views, but default to 4% min height for aesthetics
                const height = pct > 0 ? Math.max(pct, 6) : 4;
                return (
                  <div key={d.date} className="flex-1 flex flex-col items-center gap-3 group">
                    <div className="w-full relative flex flex-col justify-end h-full">
                      <div 
                        className="w-full rounded-t-lg bg-primary/20 border-t border-primary/50 group-hover:bg-primary/40 transition-all duration-300 relative" 
                        style={{ height: `${height}%` }}
                      >
                        <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-black/80 border border-white/10 text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-20">
                          {d.count} Views
                        </div>
                      </div>
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground text-center">
                      {d.label}
                    </span>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Most visited pages */}
        <Card className="glass-card border-white/10 p-8">
          <CardHeader className="px-0 pt-0">
            <CardTitle className="text-2xl font-black flex items-center gap-2">
              <PieChart className="w-6 h-6 text-primary" /> Most Visited Paths
            </CardTitle>
            <CardDescription>Top content paths driving engagement</CardDescription>
          </CardHeader>
          <CardContent className="px-0 pt-8">
            <div className="space-y-5">
              {mostVisitedPages.map((item, index) => (
                <div key={item.name} className="space-y-2">
                  <div className="flex justify-between text-xs font-bold uppercase tracking-widest">
                    <span className="truncate max-w-[170px]">{item.name === "/" ? "/home" : item.name}</span>
                    <span className="text-muted-foreground">{item.value} views</span>
                  </div>
                  <div className="h-2.5 w-full bg-white/5 rounded-full overflow-hidden">
                    <div 
                      className={`h-full transition-all duration-1000 ${getPathColor(index)}`} 
                      style={{ width: `${(item.value / (totalPageViews || 1)) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
              {mostVisitedPages.length === 0 && (
                <div className="text-center py-8 text-muted-foreground">
                  No active traffic tracked yet
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Visits Detail List */}
      <Card className="glass-card border-white/10 p-8">
        <CardHeader className="px-0 pt-0">
          <CardTitle className="text-2xl font-black flex items-center gap-2">
            <Globe className="w-6 h-6 text-primary" /> Recent Visitor Sessions
          </CardTitle>
          <CardDescription>Live feed of users actively browsing the platform</CardDescription>
        </CardHeader>
        <CardContent className="px-0 pt-6">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="py-4 px-2 font-bold text-muted-foreground uppercase text-xs">Visited Path</th>
                  <th className="py-4 px-2 font-bold text-muted-foreground uppercase text-xs">Time</th>
                  <th className="py-4 px-2 font-bold text-muted-foreground uppercase text-xs">Device & Browser</th>
                  <th className="py-4 px-2 font-bold text-muted-foreground uppercase text-xs">Traffic Source</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {recentVisits.map((visit) => (
                  <tr key={visit.id} className="hover:bg-white/5 transition-colors">
                    <td className="py-4 px-2 font-bold flex items-center gap-2">
                      <MousePointerClick className="w-4 h-4 text-primary" />
                      {visit.path}
                    </td>
                    <td className="py-4 px-2 text-sm text-muted-foreground">
                      {visit.date} {visit.time}
                    </td>
                    <td className="py-4 px-2 text-sm text-muted-foreground flex items-center gap-2">
                      <Smartphone className="w-4 h-4 text-purple-500" />
                      {visit.device}
                    </td>
                    <td className="py-4 px-2 text-sm text-muted-foreground">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                        visit.referrer === 'direct' ? 'bg-white/5 text-white' : 'bg-primary/10 text-primary'
                      }`}>
                        {visit.referrer}
                      </span>
                    </td>
                  </tr>
                ))}
                {recentVisits.length === 0 && (
                  <tr>
                    <td colSpan={4} className="py-8 text-center text-muted-foreground">
                      Waiting for incoming traffic logs...
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
