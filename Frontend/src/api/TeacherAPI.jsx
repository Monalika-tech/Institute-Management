import api from "./axios";

// Teacher login
export const loginTeacher = async (email, password) => {
  try {
    const res = await api.post("/teachers/login", { email, password });
    return res.data;
  } catch (error) {
    throw error.response?.data || { message: "Teacher login failed" };
  }
};

// Register teacher (future admin flow)
export const registerTeacher = async (data) => {
  try {
    const res = await api.post("/teachers/register", data);
    return res.data;
  } catch (error) {
    throw error.response?.data || { message: "Teacher registration failed" };
  }
};

// Get teacher by ID
export const getTeacherById = async (id) => {
  try {
    const res = await api.get(`/teachers/${id}`);
    return res.data;
  } catch (error) {
    throw error.response?.data || { message: "Failed to fetch teacher" };
  }
};
