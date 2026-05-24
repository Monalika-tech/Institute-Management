import api from "./client";

export const createClass = async (data) => {
  const res = await api.post("/classes", data);
  return res.data;
};

export const getAllClasses = async () => {
  const res = await api.get("/classes");
  return res.data;
};

export const getClassById = async (id) => {
  const res = await api.get(`/classes/${id}`);
  return res.data;
};

export const updateClass = async (id, data) => {
  const res = await api.put(`/classes/${id}`, data);
  return res.data;
};

export const deleteClass = async (id) => {
  const res = await api.delete(`/classes/${id}`);
  return res.data;
};
