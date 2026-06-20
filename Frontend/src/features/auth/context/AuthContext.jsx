import { createContext, useContext, useState, useEffect } from "react";
import api from "@/lib/api/client";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // const [token, setToken] = useState(localStorage.getItem("token"));
  const [role, setRole] = useState();
  const [userId, setUserId] = useState();
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  const fetchMe = async () => {
    try {
      const res = await api.get("/auth/me");

      setRole(res.data.role);
      setUserId(res.data.userId);
      setUser(res.data.user);

      setIsAuthenticated(true);
    } catch {
      setIsAuthenticated(false);
    }

    setLoading(false);
  };

  // cookies are used to store the token, so we don't need to manage it in state
  useEffect(() => {
    fetchMe();
  }, []);

  const loginTeacher = async (email, password) => {
    try {
      const res = await api.post("/teachers/login", { email, password });
      console.log("Login Response:", res.data); // Debugging log

      setRole(res.data.role);
      setUserId(res.data.userId);
      setUser(res.data.user);
      setIsAuthenticated(true);

      return { success: true, userId: res.data.userId, role: res.data.role };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || "Login failed",
      };
    }
  };

  const loginStudent = async (email, password) => {
    try {
      const res = await api.post("/students/login", { email, password });

      setRole(res.data.role);
      setUserId(res.data.userId);
      setUser(res.data.user);
      setIsAuthenticated(true);

      return { success: true, userId: res.data.userId, role: res.data.role };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || "Login failed",
      };
    }
  };

  const logout = async () => {
    await api.post("/auth/logout");

    setRole(null);
    setUserId(null);
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{
        role,
        userId,
        user,
        loading,
        isAuthenticated,
        loginTeacher,
        loginStudent,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
