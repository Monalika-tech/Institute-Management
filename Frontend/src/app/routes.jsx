import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "@/features/auth/components/ProtectedRoute";
import { ROUTES } from "@/shared/constants/routes";

import LoginPage from "@/features/auth/pages/LoginPage";
import HomePage from "@/features/marketing/pages/HomePage";
import AboutPage from "@/features/marketing/pages/AboutPage";
import TeacherDetailsPage from "@/features/teachers/pages/TeacherDetailsPage";
import ClassPage from "@/features/classes/pages/ClassPage";
import StudentPage from "@/features/students/pages/StudentPage";
import EditProfilePage from "@/features/teachers/pages/EditProfilePage";
import AddEditClassPage from "@/features/classes/pages/AddEditClassPage";
import AddEditStudentPage from "@/features/students/pages/AddEditStudentPage";
import StudentDetailsPage from "@/features/students/pages/StudentDetailsPage";
import ClassDetailPage from "@/features/classes/pages/ClassDetailPage";
import AttendancePage from "@/features/attendance/pages/AttendancePage";
import SettingsPage from "@/features/marketing/pages/SettingsPage";
import NotificationsPage from "@/features/notifications/pages/NotificationsPage";

export function AppRoutes() {
  return (
    <Routes>
      <Route path={ROUTES.LOGIN} element={<LoginPage />} />
      <Route path={ROUTES.HOME} element={<HomePage />} />
      <Route path={ROUTES.ABOUT} element={<AboutPage />} />

      <Route
        path="/Teacher/:_id"
        element={
          <ProtectedRoute allowedRoles={["teacher"]}>
            <TeacherDetailsPage />
          </ProtectedRoute>
        }
      />
      <Route
        path={ROUTES.CLASSES}
        element={
          <ProtectedRoute allowedRoles={["teacher"]}>
            <ClassPage />
          </ProtectedRoute>
        }
      />
      <Route
        path={ROUTES.STUDENTS}
        element={
          <ProtectedRoute allowedRoles={["teacher"]}>
            <StudentPage />
          </ProtectedRoute>
        }
      />
      <Route
        path={ROUTES.ADD_CLASS}
        element={
          <ProtectedRoute allowedRoles={["teacher"]}>
            <AddEditClassPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/editClass/:_id"
        element={
          <ProtectedRoute allowedRoles={["teacher"]}>
            <AddEditClassPage />
          </ProtectedRoute>
        }
      />
      <Route
        path={ROUTES.ADD_STUDENT}
        element={
          <ProtectedRoute allowedRoles={["teacher"]}>
            <AddEditStudentPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/editStudent/:_id"
        element={
          <ProtectedRoute allowedRoles={["teacher"]}>
            <AddEditStudentPage />
          </ProtectedRoute>
        }
      />
      <Route
        path={ROUTES.EDIT_PROFILE}
        element={
          <ProtectedRoute allowedRoles={["teacher"]}>
            <EditProfilePage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/student/:_id"
        element={
          <ProtectedRoute allowedRoles={["student", "teacher"]}>
            <StudentDetailsPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/class/:_id"
        element={
          <ProtectedRoute allowedRoles={["teacher", "student"]}>
            <ClassDetailPage />
          </ProtectedRoute>
        }
      />
      <Route
        path={ROUTES.ATTENDANCE}
        element={
          <ProtectedRoute allowedRoles={["teacher"]}>
            <AttendancePage />
          </ProtectedRoute>
        }
      />
      <Route
        path={ROUTES.SETTINGS}
        element={
          <ProtectedRoute allowedRoles={["teacher", "student"]}>
            <SettingsPage />
          </ProtectedRoute>
        }
      />
      <Route
        path={ROUTES.NOTIFICATIONS}
        element={
          <ProtectedRoute allowedRoles={["teacher", "student"]}>
            <NotificationsPage />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}
