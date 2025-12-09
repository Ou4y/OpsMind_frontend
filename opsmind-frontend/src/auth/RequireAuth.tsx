import type { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "./AuthContext";
import type { Role } from "./type";

interface RequireAuthProps {
  children: ReactNode;
  allowedRoles?: Role[];
}

export function RequireAuth({ children, allowedRoles }: RequireAuthProps) {
  const { user } = useAuth();
  const location = useLocation();

  // Not logged in → send to /login, remember where they tried to go
  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Logged in but wrong role → redirect to their home portal
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    if (user.role === "student") return <Navigate to="/student/dashboard" replace />;
    if (user.role === "technician")
      return <Navigate to="/technician/queue" replace />;
    if (user.role === "admin") return <Navigate to="/admin/dashboard" replace />;
  }

  // Authorized → render the protected content
  return <>{children}</>;
}