import { createContext, useContext, useState, useEffect } from "react";
import api from "../api/axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [role, setRole] = useState(localStorage.getItem("role"));
  const [userId, setUserId] = useState(localStorage.getItem("userId"));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
      localStorage.setItem("role", role);
      localStorage.setItem("userId", userId);
    } else {
      localStorage.clear();
    }
    setLoading(false);
  }, [token, role, userId]);


  // Teacher login
  
  const loginTeacher = async (email, password) => {
    try {
      const res = await api.post("/teachers/login", { email, password });

      setToken(res.data.token);
      setRole(res.data.role);
      setUserId(res.data.id);

      return { success: true };
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

      setToken(res.data.token);
      setRole(res.data.role);
      setUserId(res.data.id);

      return { success: true };
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
