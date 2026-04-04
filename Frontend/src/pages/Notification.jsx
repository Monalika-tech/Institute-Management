import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  createNotification,
  getNotifications,
  getUnreadCount,
} from "../api/NotificationAPI";
import { useAuth } from "../context/AuthContext";

// ================= TEACHER PANEL =================
export function TeacherPanel() {
  const { userId } = useAuth();
  const [form, setForm] = useState({
    title: "",
    message: "",
    type: "general",
    classId: "",
    priority: "normal",
    expiresAt: "",
    createdBy: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await createNotification(form);
      alert("Notification Created");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Create Notification</h2>
      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          name="title"
          placeholder="Title"
          onChange={handleChange}
          className="border p-2 w-full"
        />
        <textarea
          name="message"
          placeholder="Message"
          onChange={handleChange}
          className="border p-2 w-full"
        />

        <select
          name="type"
          onChange={handleChange}
          className="border p-2 w-full"
        >
          <option value="general">General</option>
          <option value="class">Class</option>
        </select>

        {form.type === "class" && (
          <input
            name="classId"
            placeholder="Class ID"
            onChange={handleChange}
            className="border p-2 w-full"
          />
        )}

        <select
          name="priority"
          onChange={handleChange}
          className="border p-2 w-full"
        >
          <option value="normal">Normal</option>
          <option value="important">Important</option>
          <option value="urgent">Urgent</option>
        </select>

        <input
          type="datetime-local"
          name="expiresAt"
          onChange={handleChange}
          className="border p-2 w-full"
        />
        <div className="text-sm text-gray-500 hidden">
          {/* created by will be set to your user ID automatically */}
          Created By: {userId}
        </div>
        <button className="bg-blue-500 text-white px-4 py-2">Create</button>
      </form>
    </div>
  );
}

// ================= STUDENT PANEL =================
export function StudentPanel() {
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);

  const fetchNotifications = async () => {
    const res = await getNotifications();
    setNotifications(res);
  };

  const fetchUnread = async () => {
    const res = await getUnreadCount();
    setUnreadCount(res.unreadCount);
  };

  const markAsRead = async (id) => {
    const res = await markAsRead(id);
    fetchNotifications();
    fetchUnread();
  };

  useEffect(() => {
    fetchNotifications();
    fetchUnread();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-2">Notifications</h2>
      <div className="mb-4">Unread: {unreadCount}</div>

      <div className="space-y-3">
        {notifications.map((n) => (
          <div
            key={n._id}
            className={`border p-3 ${n.isRead ? "bg-gray-100" : "bg-white"}`}
          >
            <div className="flex justify-between">
              <h3 className="font-semibold">{n.title}</h3>
              <span className="text-sm">{n.priority}</span>
            </div>
            <p>{n.message}</p>
            {!n.isRead && (
              <button
                onClick={() => markAsRead(n._id)}
                className="text-blue-500 mt-2"
              >
                Mark as Read
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// ================= MAIN APP =================
export default function App() {
  const role = localStorage.getItem("role");

  return <div>{role === "teacher" ? <TeacherPanel /> : <StudentPanel />}</div>;
}
