import { createContext, useState, useEffect } from "react";
export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [teacher, setTeacher] = useState(() => {
    const storedTeacher = localStorage.getItem("teacher");
    return storedTeacher ? JSON.parse(storedTeacher) : null;
  });

  const loginTeacher = async (email, password) => {
    try {
      console.log("Logging in with:", { email, password });

      
      const res = await fetch("http://localhost:1337/api/teachers/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      console.log(" res we get from backend : ", res);
      const data = await res.json();
      console.log("Response data:", data.error);

      if (!res.ok) {
        return { success: false, message: data.message , error: data.error};
      }
      setTeacher(data.teacher);
      localStorage.setItem("teacher", JSON.stringify(data.teacher));
      localStorage.setItem("token", data.token);
      return { success: true };
    } catch (error) {
      return { success: false, message: "Server not reachable" };
    }
  };

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
