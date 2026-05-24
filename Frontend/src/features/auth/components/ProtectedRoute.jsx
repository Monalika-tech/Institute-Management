import { Navigate } from "react-router-dom";
import { useAuth } from "@/features/auth/context/AuthContext";
import { ROUTES } from "@/shared/constants/routes";

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { isAuthenticated, role, loading, userId } = useAuth();

  if (loading) return null;

  if (!isAuthenticated) {
    return <Navigate to={ROUTES.LOGIN} replace />;
  }

  if (allowedRoles && !allowedRoles.includes(role)) {
    if (role === "teacher") return <Navigate to={ROUTES.HOME} replace />;
    if (role === "student" && userId) {
      return <Navigate to={ROUTES.studentProfile(userId)} replace />;
    }
  }

  return children;
};

export default ProtectedRoute;
