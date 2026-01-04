import { createContext, useState, useEffect } from "react";
export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [teacher, setTeacher] = useState(null);

  const loginTeacher = (email, password) => {
    // dummy authentication (replace with API later)
    const dummyTeacher = {
      _id: 1,
      name: "Babita Institute",
      email: "Babita.maths@gmail.com",
      password: "teacher123",
      experiencedYears: 10,
      qualification: "BA",
      phone_no: 9876543213,
      address: "Mohar Mohalla Mansa",
    };

    if (email === dummyTeacher.email && password === dummyTeacher.password) {
      setTeacher(dummyTeacher);
      return { success: true };

    }

    return { success: false, message: "Invalid credentials" };
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
