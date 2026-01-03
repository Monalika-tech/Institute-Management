import { createContext, useState, useEffect } from "react";
export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [teacher, setTeacher] = useState(null);

  useEffect(() => {
    const dummyTeacher = {
      _id: 1,
      name: "Babita Institue",
      email: "BAbita.maths@gmail.com",
      password: "teacher123",
      experiencedYears: 10,
      qualification: "BA",
      phone_no: 9876543213,
      address: "Mohar Mohalla Mansa",
    };

    setTeacher(dummyTeacher);
  },[]);

  //   const loginTeacher = (email, password) => {
  //     const dummyTeacher = {
  //       _id: 1,
  //       name: "Babita Institue",
  //       email: "BAbita.maths@gmail.com",
  //       password: "teacher123",
  //       experiencedYears: 10,
  //       qualification: "BA",
  //       phone_no: 9876543213,
  //       address: "Mohar Mohalla Mansa",
  //     };

  //     setTeacher(dummyTeacher);
  //   };

  const logoutTeacher = () => {
    setTeacher(null);
  };

  return (
    <AuthContext.Provider value={{ teacher, logoutTeacher }}>
      {children}
    </AuthContext.Provider>
  );
};
