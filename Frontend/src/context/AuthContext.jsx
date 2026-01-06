import { createContext, useState, useEffect } from "react";
export const AuthContext = createContext();
import api from "../api/axios";

export const AuthContextProvider = ({ children }) => {
  const [teacher, setTeacher] = useState(() => {
    const storedTeacher = localStorage.getItem("teacher");
    return storedTeacher ? JSON.parse(storedTeacher) : null;
  });

  // Login function for teachers
  const loginTeacher = async (email, password) => {
    try {
      const res = await api.post("/teachers/login", { email, password });

      setTeacher(res.data.teacher);
      localStorage.setItem("teacher", JSON.stringify(res.data.teacher));
      localStorage.setItem("token", res.data.token);

      return { success: true };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || "Login failed",
      };
    }
  };


  // session restore on refresh
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) return;

    const fetchTeacher = async () => {
      try {
        const res = await api.get("/teachers/me");
        setTeacher(res.data.teacher);
        localStorage.setItem("teacher", JSON.stringify(res.data.teacher));
      } catch (error) {
        logoutTeacher();
      }
    };

    fetchTeacher();
  }, []);


// logout function for teachers
  const logoutTeacher = () => {
    setTeacher(null);
    localStorage.removeItem("token");
    localStorage.removeItem("teacher");
  };

  return (
    <AuthContext.Provider value={{ teacher, loginTeacher, logoutTeacher }}>
      {children}
    </AuthContext.Provider>
  );
};
