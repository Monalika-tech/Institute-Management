import api from "./axios";

// Create notification
export const createNotification = async (data) => {
  try {
    const res = await api.post("/notifications", data);
    console.log("the res we get after creating a notification ", res);
    return res.data;
  } catch (error) {
    throw error.response?.data || { message: "Failed to create notification" };
  }
};

// Get notifications for student
export const getNotifications = async () => {
  try {
    const res = await api.get("/notifications");
    console.log("the res we get after getting notifications ", res);
    return res.data;
  } catch (error) {
    throw error.response?.data || { message: "Failed to fetch notifications" };
  }
};

// Get unread count for student
export const getUnreadCount = async () => {
  try {
    const res = await api.get("/notifications/unread-count");
    console.log("the res we get after getting unread count ", res);
    return res.data;
  } catch (error) {
    throw error.response?.data || { message: "Failed to fetch unread count" };
  }
};

// Mark notification as read
export const markAsRead = async (id) => {
  try {
    const res = await api.post(`/notifications/${id}/mark-read`);
    console.log("the res we get after marking as read ", res);
    return res.data;
  } catch (error) {
    throw error.response?.data || { message: "Failed to mark as read" };
  }
};
