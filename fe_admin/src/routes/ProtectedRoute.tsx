import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "@/store";
import { JSX } from "react";

interface ProtectedRouteProps {
  children: JSX.Element;
  requiredRoles?: string[];
  requiredPermissions?: string[];
}

const ProtectedRoute = ({
  children,
  requiredRoles = [],
  requiredPermissions = [],
}: ProtectedRouteProps) => {
  const { accessToken, roles, permissions } = useSelector(
    (state: RootState) => state.auth
  );

  if (!accessToken) {
    return <Navigate to="/login" replace />;
  }

  const hasRole = requiredRoles.length
    ? requiredRoles.some((r) => roles.includes(r))
    : true;

  const hasPermission = requiredPermissions.length
    ? requiredPermissions.some((p) => permissions.includes(p))
    : true;

  return hasRole && hasPermission ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
