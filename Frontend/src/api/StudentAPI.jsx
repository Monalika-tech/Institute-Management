import api from "./axios";

// Create student
export const createStudent = async (data) => {
  try {
    const res = await api.post("/students", data);
    return res.data;
  } catch (error) {
    throw error.response?.data || { message: "Failed to create student" };
  }
};

// Get all students (teacher)
export const getAllStudents = async () => {
  try {
    const res = await api.get("/students/my");
    return res.data;
  } catch (error) {
    throw error.response?.data || { message: "Failed to fetch students" };
  }
};

// Get student by ID
export const getStudentById = async (id) => {
  try {
    const res = await api.get(`/students/${id}`);
    return res.data;
  } catch (error) {
    throw error.response?.data || { message: "Failed to fetch student" };
  }
};

// Update student
export const updateStudent = async (id, data) => {
  try {
    const res = await api.put(`/students/${id}`, data);
    return res.data;
  } catch (error) {
    throw error.response?.data || { message: "Failed to update student" };
  }
};

// Delete student
export const deleteStudent = async (id) => {
  try {
    const res = await api.delete(`/students/${id}`);
    return res.data;
  } catch (error) {
    throw error.response?.data || { message: "Failed to delete student" };
  }
};
