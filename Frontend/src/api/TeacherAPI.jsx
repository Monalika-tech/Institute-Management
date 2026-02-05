import api from "./axios";

// Teacher login
// export const loginTeacher = async (email, password) => {
//   try {
//     const res = await api.post("/teachers/login", { email, password });
//     return res.data;
//   } catch (error) {
//     throw error.response?.data || { message: "Teacher login failed" };
//   }
// };

// Register teacher (future admin flow)
export const registerTeacher = async (data) => {
  try {
    console.log("the data sent to register teacher : ", data);
    const res = await api.post("/teachers/register", data);
    console.log("the response we get after registering teacher : ", res);
    return res.data;
  } catch (error) {
    throw error.response?.data || { message: "Teacher registration failed" };
  }
};

// Get teacher by ID
export const getTeacherById = async (_id) => {
  try {
    console.log("getting the teacher :", _id);
    const res = await api.get(`/teachers/${_id}`);
    console.log("the response we get after getting the teacher : ", res);
    return res.data;
  } catch (error) {
    throw error.response?.data || { message: "Failed to fetch teacher" };
  }
};

export const updateTeacher = async (_id, data) => {
  try {
    console.log("the teacher to update ", data);
    const res = await api.put(`/teachers/${_id}`, data);
    return res.data;
  } catch (error) {
    throw error.response?.data || { message: "Failed to update teacher" };
  }
};
