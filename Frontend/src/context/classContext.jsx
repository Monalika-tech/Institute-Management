import { createContext, useState, useContext, useEffect } from "react";
import api from "../api/axios";

export const ClassContext = createContext();

export const ClassContextProvider = ({ children }) => {
  const [classes, setClasses] = useState(() => {
    const stored = localStorage.getItem("classes");
    return stored ? JSON.parse(stored) : [];
  });

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState(null);

  useEffect(() => {
    localStorage.setItem("classes", JSON.stringify(classes));
  }, [classes]);

  const fetchClasses = async () => {
    try {
      setLoading(true);
      const res = await api.get("/classes");
      console.log(res.data.classes);
      setClasses(res.data.classes);
    } catch (error) {
      console.error(error);
      setError(error.response?.data?.message || "Failed to fetch classes");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClasses();
  }, []);

  const createClass = async (newClassData) => {
    try {
      console.log("Creating class with data:", newClassData);
      setLoading(true);
      const res = await api.post("/classes", newClassData);

      setClasses((prev) => [...prev, res.data.class]);

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

  const updateClass = async (classLevel, updatedData) => {
    try {
      console.log("Updating class:", classLevel, "with data:", updatedData);
      setLoading(true);
      const res = await api.put(`/classes/${classLevel}`, updatedData);

      setClasses((prev) =>
        prev.map((cls) =>
          cls.classLevel === Number(classLevel) ? res.data.class : cls
        )
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
  const deleteHandler = async (_id) => {
    try {
      console.log("Deleting class with ID:", _id);

      const res = await api.delete(`/classes/${_id}`);
      setClasses((prev) => prev.filter((cls) => cls._id !== _id));

      console.log("Delete response:", res.data);
    } catch (error) {
      console.error("Error deleting class:", error);
    }
  };

  const getClassByLevel = (classLevel) => {
    return classes.find((cls) => cls.classLevel === Number(classLevel));
  };

  return (
    <ClassContext.Provider
      value={{
        classes,
        createClass,
        updateClass,
        loading,
        fetchClasses,
        getClassByLevel,
        error,
        deleteHandler,
      }}
    >
      {children}
    </ClassContext.Provider>
  );
};

export const useClasses = () => useContext(ClassContext);
