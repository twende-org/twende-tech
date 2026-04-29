import { Routes, Route, Navigate } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { SEO } from "./components/SEO";
import { useAuth } from "./context/AuthContext";

import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Contact from "./components/Contact";
import About from "./components/About";
import Services from "./components/Services";
import Pricing from "./components/Pricing";
import Portfolio from "./components/Portfolio";
import Layout from "./components/Layout";
import ProjectDetail from "./pages/ProjectDetail";
import Login from "./pages/Login";
import ClientDashboard from "./pages/ClientDashboard";
import { ClientLayout } from "./components/client/ClientLayout";
import { ClientProjects } from "./components/client/ClientProjects";
import { ClientSupport } from "./components/client/ClientSupport";
import Admin from "./pages/Admin";

import SoftwareProducts from "./pages/SoftwareProducts";
import { Loader2 } from "lucide-react";

const ProtectedRoute = ({ 
  children, 
  requiredRole 
}: { 
  children: React.ReactNode, 
  requiredRole?: 'admin' | 'client' 
}) => {
  const { user, role, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="w-12 h-12 animate-spin text-primary" />
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (requiredRole && role !== requiredRole) {
    return <Navigate to={role === 'admin' ? '/admin' : '/dashboard'} replace />;
  }

  return <>{children}</>;
};

const App = () => (
  <HelmetProvider>
    <SEO />
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Layout><Index /></Layout>} />
      <Route path="/about" element={<Layout><About /></Layout>} />
      <Route path="/services" element={<Layout><Services /></Layout>} />
      <Route path="/products" element={<Layout><SoftwareProducts /></Layout>} />
      <Route path="/pricing" element={<Layout><Pricing /></Layout>} />
      <Route path="/portfolio" element={<Layout><Portfolio /></Layout>} />
      <Route path="/portfolio/:id" element={<Layout><ProjectDetail /></Layout>} />
      <Route path="/contact" element={<Layout><Contact /></Layout>} />
      <Route path="/login" element={<Login />} />

      {/* Client Dashboard Routes */}
      <Route path="/dashboard" element={
        <ProtectedRoute requiredRole="client">
          <ClientLayout>
            <ClientDashboard />
          </ClientLayout>
        </ProtectedRoute>
      } />
      <Route path="/dashboard/projects" element={
        <ProtectedRoute requiredRole="client">
          <ClientLayout>
            <ClientProjects />
          </ClientLayout>
        </ProtectedRoute>
      } />
      <Route path="/dashboard/support" element={
        <ProtectedRoute requiredRole="client">
          <ClientLayout>
            <ClientSupport />
          </ClientLayout>
        </ProtectedRoute>
      } />
      <Route path="/dashboard/health" element={
        <ProtectedRoute requiredRole="client">
          <ClientLayout>
            <div className="h-64 flex items-center justify-center glass-card rounded-[2rem]">
              <p className="text-muted-foreground">Service Health Monitoring Coming Soon</p>
            </div>
          </ClientLayout>
        </ProtectedRoute>
      } />

      {/* Admin Routes */}
      <Route path="/admin/*" element={
        <ProtectedRoute requiredRole="admin">
          <Admin />
        </ProtectedRoute>
      } />

      <Route path="*" element={<Layout><NotFound /></Layout>} />
    </Routes>
  </HelmetProvider>
);

export default App;
