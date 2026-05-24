import { useEffect, useState } from "react";
import { createNotification, getNotifications } from "@/lib/api/notifications";
import { useAuth } from "@/features/auth/context/AuthContext";

export function TeacherNotificationPanel() {
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
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const res = await getNotifications();
        setNotifications(res);
      } catch (err) {
        console.error(err);
      }
    };
    fetchNotifications();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createNotification(form);
      alert("Notification Created");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Notifications</h2>
      <div>
        {notifications.map((n) => (
          <div key={n._id} className="border rounded-lg p-3 mb-2">
            <div className="flex justify-between">
              <h3 className="font-semibold">{n.title}</h3>
              <span className="text-sm">{n.priority}</span>
            </div>
            <p>{n.message}</p>
          </div>
        ))}
      </div>

      <h2 className="text-xl font-bold mb-4">Create Notification</h2>
      <form onSubmit={handleSubmit} className="space-y-3">
        <input name="title" placeholder="Title" onChange={handleChange} className="border p-2 w-full" />
        <textarea
          name="message"
          placeholder="Message"
          onChange={handleChange}
          className="border p-2 w-full"
        />
        <select name="type" onChange={handleChange} className="border p-2 w-full">
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
        <select name="priority" onChange={handleChange} className="border p-2 w-full">
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
        <div className="text-sm text-gray-500 hidden">Created By: {userId}</div>
        <button className="bg-blue-500 text-white px-4 py-2" type="submit">
          Create
        </button>
      </form>
    </div>
  );
}
