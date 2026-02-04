import api from "./axios";

// Create student
export const createStudent = async (data) => {
  try {
    console.log("the data sent to register studnet :", data);
    const res = await api.post("/students", data);
    console.log("the res we get after registration of student : ", res);
    return res.data;
  } catch (error) {
    throw error.response?.data || { message: "Failed to create student" };
  }
};

// Get all students (teacher)
export const getAllStudents = async () => {
  try {
    const res = await api.get("/students/my");
    console.log("the res we get after getting  student under a teacher : ", res);
    return res.data;
  } catch (error) {
    throw error.response?.data || { message: "Failed to fetch students" };
  }
};

// get all students of a particular class.
export const getStudentsByCLass = async (_id) => {
  try {
    const res = await api.get(`/students/class/${_id}`);
    console.log("the res we get after getting student under a class : ", res);
    return res.data;
  } catch (error) {
    throw error.response?.data || { message: "Failed to fetch students" };
  }
};

// Get student by ID
export const getStudentById = async (_id) => {
  try {
    const res = await api.get(`/students/${_id}`);
    console.log("the res we get after getting student : ", res);
    
    return res.data;
  } catch (error) {
    throw error.response?.data || { message: "Failed to fetch student" };
  }
};

// Update student
export const updateStudent = async (_id, data) => {
  try {
    const res = await api.put(`/students/${_id}`, data);
    console.log("the res we get after upadting a student : ", res);
    return res.data;
  } catch (error) {
    throw error.response?.data || { message: "Failed to update student" };
  }
};

// Delete student
export const deleteStudent = async (_id) => {
  try {
    const res = await api.delete(`/students/${_id}`);
    console.log("the res we get after deleting a student : ", res);
    return res.data;
  } catch (error) {
    throw error.response?.data || { message: "Failed to delete student" };
  }
};
