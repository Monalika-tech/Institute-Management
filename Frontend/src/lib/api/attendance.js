import api from "./client";

export const markAttendance = async (attendanceData) => {
  const res = await api.post("/attendance", attendanceData);
  return res.data;
};

export const getAttendanceByClassAndDate = async (classId, date) => {
  const res = await api.get(`/attendance?classId=${classId}&date=${date}`);
  return res.data;
};

export const updateAttendance = async (id, attendanceData) => {
  const res = await api.put(`/attendance/${id}`, attendanceData);
  return res.data;
};

export const getStudentAttendanceStats = async (studentId) => {
  const res = await api.get(`/attendance/student/${studentId}`);
  return res.data;
};
