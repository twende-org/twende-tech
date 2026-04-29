import { AdminDashboard } from "@/components/admin/AdminDashboard";
import { useAuth } from "@/context/AuthContext";
import { Loader2 } from "lucide-react";

export default function Admin() {
  const { role, logout, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  // The ProtectedRoute handles the actual auth check, 
  // but we keep this here for internal safety
  if (role !== "admin") {
    return null;
  }

  return <AdminDashboard onLogout={logout} />;
}