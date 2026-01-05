import { createContext, useState, useEffect } from "react";
export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [teacher, setTeacher] = useState(null);

  const loginTeacher = async (email, password) => {
    try {
      const res = await fetch("http://localhost:1337/api/teachers/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      console.log(" res we get from backend : ", res);
      const data = await res.json();

      if (!res.ok) {
        return { success: false, message: data.message };
      }

      setTeacher(data.teacher);
      return { success: true };
    } catch (error) {
      return { success: false, message: "Server not reachable" };
    }
  };

  const logoutTeacher = () => {
    setTeacher(null);
  };

  return (
    <AuthContext.Provider value={{ teacher, loginTeacher, logoutTeacher }}>
      {children}
    </AuthContext.Provider>
  );
};
