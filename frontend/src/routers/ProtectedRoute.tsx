import { Navigate } from "react-router-dom";
import { JSX } from "react";
import { useHasAccess } from "@/hooks/useHasAccess";
import { useAppSelector } from "@/store/hooks";

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
  const { accessToken } = useAppSelector((state) => state.auth);

  const hasAccess = useHasAccess();

  if (!accessToken) {
    return <Navigate to="/" replace />;
  }

  return hasAccess({
    roles: requiredRoles,
    permissions: requiredPermissions,
  }) ? (
    children
  ) : (
    <Navigate to="/" replace />
  );
};

export default ProtectedRoute;
