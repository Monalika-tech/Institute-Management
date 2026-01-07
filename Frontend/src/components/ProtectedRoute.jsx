import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";

const ProtectedRoute = ({ children }) => {
  const { teacher } = useContext(AuthContext);

  if (!teacher) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
