import api from "./axios";

// Create class
export const createClass = async (data) => {
  try {
    const res = await api.post("/classes", data);
    console.log("the res we get after registering a class " , res);
    return res.data;
  } catch (error) {
    throw error.response?.data || { message: "Failed to create class" };
  }
};

// Get all classes (teacher)
export const getAllClasses = async () => {
  try {
    const res = await api.get("/classes");
    console.log("the res we get after getting all classes " , res);
    return res.data;
  } catch (error) {
    throw error.response?.data || { message: "Failed to fetch classes" };
  }
};

// Get class by ID
export const getClassById = async (id) => {
  try {
    const res = await api.get(`/classes/${id}`);
    console.log("the res we get after getting a class " , res);
    return res.data;
  } catch (error) {
    throw error.response?.data || { message: "Failed to fetch class" };
  }
};

// Update class
export const updateClass = async (id, data) => {
  try {
    const res = await api.put(`/classes/${id}`, data);
    console.log("the res we get after updating a class " , res);
    return res.data;
  } catch (error) {
    throw error.response?.data || { message: "Failed to update class" };
  }
};

// Delete class
export const deleteClass = async (id) => {
  try {
    const res = await api.delete(`/classes/${id}`);
    console.log("the res we get after deleting a class " , res);
    return res.data;
  } catch (error) {
    throw error.response?.data || { message: "Failed to delete class" };
  }
};
