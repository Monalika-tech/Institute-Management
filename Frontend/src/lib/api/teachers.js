import api from "./client";

export const registerTeacher = async (data) => {
  const res = await api.post("/teachers/register", data);
  return res.data;
};

export const getTeacherById = async (id) => {
  const res = await api.get(`/teachers/${id}`);
  return res.data;
};

export const updateTeacher = async (id, data) => {
  const res = await api.put(`/teachers/${id}`, data);
  return res.data;
};
