import api from "./axios";

export const markAttendance = async (attendanceData) => {
  const response = await api.post("/attendance", attendanceData);
  return response.data;
};

export const getAttendanceByClassAndDate = async (classId, date) => {
  const response = await api.get(`/attendance?classId=${classId}&date=${date}`);
  return response.data;
};

export const updateAttendance = async (id, attendanceData) => {
  const response = await api.put(`/attendance/${id}`, attendanceData);
  return response.data;
};

export const getStudentAttendanceStats = async (studentId) => {
  const response = await api.get(`/attendance/student/${studentId}`);
  return response.data;
};
