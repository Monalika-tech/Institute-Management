import { useEffect, useState } from "react";
import {
  getNotifications,
  getUnreadCount,
  markNotificationAsRead,
} from "@/lib/api/notifications";

export function StudentNotificationPanel() {
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

  const handleMarkAsRead = async (id) => {
    await markNotificationAsRead(id);
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
                onClick={() => handleMarkAsRead(n._id)}
                className="text-blue-500 mt-2"
                type="button"
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
