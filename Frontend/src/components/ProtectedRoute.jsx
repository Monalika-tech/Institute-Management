import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { isAuthenticated, role, loading, userId } = useAuth();

  if (loading) return null;

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(role)) {
    if (role === "teacher") return <Navigate to="/" replace />;
    if (role === "student")
      return <Navigate to={`/students/${userId}`} replace />;
  }

  return children;
};

export default ProtectedRoute;
