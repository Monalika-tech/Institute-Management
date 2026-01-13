import React, { useContext, createContext, useState, useEffect } from "react";
import api from "../api/axios";

export const studentContext = createContext();

export const StudentContextProvider = ({ children }) => {
  const [students, setStudents] = useState(() => {
    const stored = localStorage.getItem("students");
    return stored ? JSON.parse(stored) : [];
  });

  const [error, setError] = useState(null);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    localStorage.setItem("students", JSON.stringify(students));
  }, [students]);

  // get all students irrespective of class
  const fetchStudents = async () => {
    try {
      setLoading(true);
      const res = await api.get(`/students`);
      console.log("Fetched students:", res.data.students);
      setStudents(res.data.students);
    } catch (error) {
      setError(error.response?.data?.message || "Failed to fetch students");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  // register or create a student
  const addStudent = async (studentData) => {
    try {
      console.log("Entering the create student function with :", studentData);
      setLoading(true);

      const res = await api.post("/students", studentData);

      console.log("getting the res : ", res.data);

      setStudents((prev) => [...prev, res.data.student]);

      return { success: true, student: res.data.student };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message,
      };
    } finally {
      setLoading(false);
    }
  };

  //update student details  by id

  const updateStudDetail = async (_id, updatedData) => {
    try {
      console.log("Updating student:", _id, "with data:", updatedData);
      setLoading(true);
      const res = await api.put(`/students/${_id}`, updatedData);
      setStudents((prev) =>
        prev.map((stud) => (stud._id === _id ? res.data.student : stud))
      );

      return { success: true };

    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message,
      };
    } finally {
      setLoading(false);
    }
  };

  // delete student by id
  const deleteStudByID = async (_id) => {
    try {
      const confirm = window.confirm(
        "Are you sure you want to delete this student?"
      );
      if (!confirm) return;

      setLoading(true);
      const res = await api.delete(`/students/${_id}`);
      setStudents((prev) => prev.filter((stud) => stud._id !== _id));
      console.log("Deleted student:", res.data);
    } catch (error) {
      setError(error.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  const getStudById = (_id) => {
    return students.find((stud) => stud._id === _id);
  };

  return (
    <studentContext.Provider
      value={{
        students,
        addStudent,
        fetchStudents,
        updateStudDetail,
        deleteStudByID,
        getStudById,
        error,
        loading,
      }}
    >
      {children}
    </studentContext.Provider>
  );
};

export const useStudentContext = () => useContext(studentContext);
