import api from "./client";

export const createStudent = async (data) => {
  const res = await api.post("/students", data);
  return res.data;
};

export const getAllStudents = async () => {
  const res = await api.get("/students/my");
  return res.data;
};

export const getStudentsByClass = async (classId) => {
  const res = await api.get(`/students/class/${classId}`);
  return res.data;
};

/** @deprecated use getStudentsByClass */
export const getStudentsByCLass = getStudentsByClass;

export const getStudentById = async (id) => {
  const res = await api.get(`/students/${id}`);
  return res.data;
};

export const updateStudent = async (id, data) => {
  const res = await api.put(`/students/${id}`, data);
  return res.data;
};

export const deleteStudent = async (id) => {
  const res = await api.delete(`/students/${id}`);
  return res.data;
};
