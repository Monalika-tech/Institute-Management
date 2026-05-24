import { TeacherNotificationPanel } from "@/features/notifications/components/TeacherNotificationPanel";
import { StudentNotificationPanel } from "@/features/notifications/components/StudentNotificationPanel";
import { useAuth } from "@/features/auth/context/AuthContext";

export default function NotificationsPage() {
  const { role } = useAuth();
  return (
    <div>{role === "teacher" ? <TeacherNotificationPanel /> : <StudentNotificationPanel />}</div>
  );
}
