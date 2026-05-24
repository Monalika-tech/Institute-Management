import api from "./client";

export const createNotification = async (data) => {
  const res = await api.post("/notifications", data);
  return res.data;
};

export const getNotifications = async () => {
  const res = await api.get("/notifications");
  return res.data;
};

export const getUnreadCount = async () => {
  const res = await api.get("/notifications/unread-count");
  return res.data;
};

export const markNotificationAsRead = async (id) => {
  const res = await api.post(`/notifications/${id}/mark-read`);
  return res.data;
};
