import { Navigate } from "react-router-dom";
import { JSX } from "react";
import { useHasAccess } from "@/hook/useHasAccess";
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
    return <Navigate to="/login" replace />;
  }

  return hasAccess({
    roles: requiredRoles,
    permissions: requiredPermissions,
  }) ? (
    children
  ) : (
    <Navigate to="/login" replace />
  );
};

export default ProtectedRoute;
