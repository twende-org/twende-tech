import { useState } from "react";
import { useGetAuditLogsQuery } from "@/store/apiSlice";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Loader2, Shield, Calendar, Tag, ShieldAlert, ArrowRight, User } from "lucide-react";

export function AuditLogsManager() {
  const { data: logs = [], isLoading } = useGetAuditLogsQuery();
  const [filterAction, setFilterAction] = useState("ALL");

  const getActionColor = (action: string) => {
    switch (action) {
      case "CREATE_PROJECT":
        return "bg-blue-500/10 text-blue-500 border-blue-500/20";
      case "UPDATE_PROJECT":
        return "bg-amber-500/10 text-amber-500 border-amber-500/20";
      case "DELETE_PROJECT":
        return "bg-red-500/10 text-red-500 border-red-500/20";
      case "UPDATE_USER_ROLE":
        return "bg-purple-500/10 text-purple-500 border-purple-500/20";
      case "DELETE_MESSAGE":
        return "bg-orange-500/10 text-orange-500 border-orange-500/20";
      case "UPDATE_LEAD":
        return "bg-teal-500/10 text-teal-500 border-teal-500/20";
      case "UPDATE_SUPPORT_TICKET":
        return "bg-cyan-500/10 text-cyan-500 border-cyan-500/20";
      default:
        return "bg-gray-500/10 text-gray-500 border-gray-500/20";
    }
  };

  const filteredLogs = logs.filter((log) => {
    if (filterAction === "ALL") return true;
    return log.actionType === filterAction;
  });

  const uniqueActions = ["ALL", ...Array.from(new Set(logs.map((l) => l.actionType)))];

  if (isLoading) {
    return (
      <div className="h-64 flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-slide-up">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-3xl font-black mb-1 flex items-center gap-2">
            <Shield className="w-8 h-8 text-primary" /> Security Audit Logs
          </h2>
          <p className="text-muted-foreground">Chronological record of sensitive administrative actions and modifications</p>
        </div>

        {/* Filter Controls */}
        <div className="flex flex-wrap gap-2 max-w-xl bg-white/5 border border-white/10 p-1.5 rounded-xl">
          {uniqueActions.map((action) => (
            <button
              key={action}
              onClick={() => setFilterAction(action)}
              className={`
                px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-wider transition-all
                ${filterAction === action 
                  ? "bg-primary text-white shadow" 
                  : "text-muted-foreground hover:text-white hover:bg-white/5"}
              `}
            >
              {action.replace("_", " ")}
            </button>
          ))}
        </div>
      </div>

      {/* Audit Logs List */}
      <div className="grid gap-4">
        {filteredLogs.length > 0 ? (
          filteredLogs.map((log) => (
            <Card key={log.id} className="glass-card border-white/5 hover:border-white/10 transition-all rounded-2xl">
              <CardContent className="p-6">
                <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-white/5 rounded-xl text-muted-foreground shrink-0 mt-0.5">
                      <ShieldAlert className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="flex flex-wrap items-center gap-3 mb-2">
                        <Badge variant="outline" className={`px-2.5 py-1 text-[10px] font-black uppercase tracking-widest ${getActionColor(log.actionType)}`}>
                          {log.actionType.replace("_", " ")}
                        </Badge>
                        <span className="text-sm font-bold text-white">{log.targetResource}</span>
                      </div>
                      
                      <p className="text-sm text-muted-foreground mb-3 leading-relaxed flex items-center gap-2">
                        <ArrowRight className="w-4 h-4 text-primary shrink-0" />
                        {log.details}
                      </p>
                      
                      <div className="flex flex-wrap items-center gap-x-5 gap-y-1.5 text-[10px] text-muted-foreground uppercase tracking-widest font-black">
                        <span className="flex items-center gap-1.5"><User className="w-3.5 h-3.5 text-primary" /> {log.adminEmail}</span>
                        <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" /> {log.createdAt ? new Date(log.createdAt).toLocaleString() : "Just now"}</span>
                        <span className="flex items-center gap-1.5"><Tag className="w-3.5 h-3.5" /> ID: {log.id?.slice(0, 8)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <div className="text-center py-20 glass-card rounded-[2.5rem] border-white/5">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/5 mb-6">
              <Shield className="w-10 h-10 text-primary/40" />
            </div>
            <h3 className="text-2xl font-black mb-2">No Security Logs</h3>
            <p className="text-muted-foreground">No administrative actions have matching records for this filter.</p>
          </div>
        )}
      </div>
    </div>
  );
}
