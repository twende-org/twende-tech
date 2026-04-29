import { useGetUsersQuery, useUpdateUserRoleMutation } from "@/store/apiSlice";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Loader2, Shield, User, Mail, ShieldCheck, UserPlus } from "lucide-react";
import { toast } from "sonner";

export function UserManager() {
  const { data: users, isLoading } = useGetUsersQuery();
  const [updateRole, { isLoading: isUpdating }] = useUpdateUserRoleMutation();

  const handleRoleChange = async (userId: string, newRole: string) => {
    try {
      await updateRole({ id: userId, role: newRole }).unwrap();
      toast.success(`User role updated to ${newRole}`);
    } catch (error) {
      toast.error("Failed to update role");
    }
  };

  if (isLoading) {
    return (
      <div className="h-64 flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">User Management</h2>
          <p className="text-muted-foreground">Manage roles and permissions for portal access</p>
        </div>
      </div>

      <div className="grid gap-4">
        {users?.map((user) => (
          <Card key={user.id} className="glass-card border-white/5 overflow-hidden">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${user.role === 'admin' ? 'bg-primary/10 text-primary' : 'bg-accent/10 text-accent'}`}>
                    {user.role === 'admin' ? <ShieldCheck className="w-6 h-6" /> : <User className="w-6 h-6" />}
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">{user.email?.split('@')[0]}</h3>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Mail className="w-3 h-3" />
                      {user.email}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Badge variant={user.role === 'admin' ? 'default' : 'secondary'} className="px-3 py-1 uppercase text-[10px] font-black tracking-widest">
                    {user.role || 'No Role'}
                  </Badge>
                  
                  <div className="flex gap-2">
                    {user.role !== 'admin' && (
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="gap-2 border-primary/20 hover:bg-primary/5 text-primary"
                        onClick={() => handleRoleChange(user.id, 'admin')}
                        disabled={isUpdating}
                      >
                        <Shield className="w-3 h-3" /> Promote to Admin
                      </Button>
                    )}
                    {user.role !== 'client' && (
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="gap-2 border-accent/20 hover:bg-accent/5 text-accent"
                        onClick={() => handleRoleChange(user.id, 'client')}
                        disabled={isUpdating}
                      >
                        <UserPlus className="w-3 h-3" /> Set as Client
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
