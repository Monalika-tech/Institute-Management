import { createContext, useContext, useState, useEffect } from "react";
import api from "../api/axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [role, setRole] = useState(localStorage.getItem("role"));
  const [userId, setUserId] = useState(localStorage.getItem("userId"));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (token && role && userId) {
      localStorage.setItem("token", token);
      localStorage.setItem("role", role);
      localStorage.setItem("userId", userId);
    } else {
      localStorage.removeItem("token");
      localStorage.removeItem("role");
      localStorage.removeItem("userId");
    }
    setLoading(false);
  }, [token, role, userId]);

  // Teacher login

  const loginTeacher = async (email, password) => {
    try {
      const res = await api.post("/teachers/login", { email, password });

      console.log("the respone we get from backend is : ", res.data);

      setToken(res.data.token);
      setRole(res.data.role);
      setUserId(res.data.userId);

      return { success: true , userId: res.data.userId, role: res.data.role};
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || "Login failed",
      };
    }
  };

  // student login
  const loginStudent = async (email, password) => {
    try {
      const res = await api.post("/students/login", { email, password });
      console.log("the respone we get from backend is : ", res);
      setToken(res.data.token);
      setRole(res.data.role);
      setUserId(res.data.userId);

      return { success: true , userId: res.data.userId, role: res.data.role};
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || "Login failed",
      };
    }
  };

  const logout = () => {
    setToken(null);
    setRole(null);
    setUserId(null);
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        role,
        userId,
        loginTeacher,
        loginStudent,
        logout,
        isAuthenticated: !!token,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
