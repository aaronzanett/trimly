import { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth, UserRole } from "@/contexts/AuthContext";

interface ProtectedRouteProps {
  children: ReactNode;
  role: UserRole;
  /** Override where to redirect if not authed (defaults per role) */
  redirectTo?: string;
}

const DEFAULT_LOGIN: Record<UserRole, string> = {
  admin: "/admin-login",
  owner: "/login",
  staff: "/login",
  client: "/client/login",
};

export function ProtectedRoute({ children, role, redirectTo }: ProtectedRouteProps) {
  const { user } = useAuth();
  const location = useLocation();

  if (!user) {
    const to = redirectTo ?? DEFAULT_LOGIN[role];
    return <Navigate to={to} state={{ from: location }} replace />;
  }

  if (user.role !== role) {
    // User is logged in but wrong role — redirect them to their own portal
    const homeMap: Record<UserRole, string> = {
      admin: "/admin/dashboard",
      owner: `/${user.tenant ?? "dashboard"}/dashboard`,
      staff: `/${user.tenant ?? "dashboard"}/staff/dashboard`,
      client: "/client",
    };
    return <Navigate to={homeMap[user.role]} replace />;
  }

  return <>{children}</>;
}
