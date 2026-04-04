import React from "react";
import { Routes, Route } from "react-router-dom";

import NavBar from "./components/NavBar";
import ProtectedRoute from "./components/ProtectedRoute";
import Slidebar from "./components/Slidebar";

// pages
import Login from "./pages/Login";
import Home from "./pages/Home";
import TeacherDetails from "./pages/TeacherDetails";
import ClassPage from "./pages/ClassPage";
import StudentPage from "./pages/StudentPage";
import About from "./pages/About";

// teacher Pages
import EditProfile from "./pages/EditProfile"; // user profile
import AddEditClass from "./pages/AddEditClass";
import AddEditStudent from "./pages/AddEditStudent";

// shared by both users - teacher and student
import StudentDetails from "./pages/StudentDetails";
import ClassDetail from "./pages/ClassDetail";

import { useAuth } from "./context/AuthContext";
import AttendancePage from "./pages/AttendancePage";
import Settings from "./pages/Settings";
import Notification from "./pages/Notification";

// ============================LAYOUT COMPONENT============================
function AppLayout({ children }) {
  const { isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Navbar */}
      {isAuthenticated && <NavBar className="sticky top-0 "  />}

      <div className="flex flex-1">
        {/* Sidebar */}
        {isAuthenticated && <Slidebar />}

        {/* Main */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          <div className="bg-white rounded-2xl shadow-md min-h-full p-4 sm:p-6">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}

function App() {
  return (
    <AppLayout>
      <Routes>
        {/* Public */}
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        {/* ===== TEACHER ===== */}

        <Route
          path="/Teacher/:_id"
          element={
            <ProtectedRoute allowedRoles={["teacher"]}>
              <TeacherDetails />
            </ProtectedRoute>
          }
        />
        <Route
          path="/classes"
          element={
            <ProtectedRoute allowedRoles={["teacher"]}>
              <ClassPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/students"
          element={
            <ProtectedRoute allowedRoles={["teacher"]}>
              <StudentPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/addClass"
          element={
            <ProtectedRoute allowedRoles={["teacher"]}>
              <AddEditClass />
            </ProtectedRoute>
          }
        />
        <Route
          path="/editClass/:_id"
          element={
            <ProtectedRoute allowedRoles={["teacher"]}>
              <AddEditClass />
            </ProtectedRoute>
          }
        />
        <Route
          path="/addStudent"
          element={
            <ProtectedRoute allowedRoles={["teacher"]}>
              <AddEditStudent mode="add" />
            </ProtectedRoute>
          }
        />
        <Route
          path="/editStudent/:_id"
          element={
            <ProtectedRoute allowedRoles={["teacher"]}>
              <AddEditStudent mode="edit" />
            </ProtectedRoute>
          }
        />

        <Route
          path="/editProfile"
          element={
            <ProtectedRoute allowedRoles={["teacher"]}>
              <EditProfile />
            </ProtectedRoute>
          }
        />
        {/* ===== STUDENT ===== */}

        <Route
          path="/student/:_id"
          element={
            <ProtectedRoute allowedRoles={["student", "teacher"]}>
              <StudentDetails />
            </ProtectedRoute>
          }
        />

        <Route
          path="/class/:_id"
          element={
            <ProtectedRoute allowedRoles={["teacher", "student"]}>
              <ClassDetail />
            </ProtectedRoute>
          }
        />

        <Route
          path="/attendance"
          element={
            <ProtectedRoute allowedRoles={["teacher"]}>
              <AttendancePage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/settings"
          element={
            <ProtectedRoute allowedRoles={["teacher", "student"]}>
              <Settings />
            </ProtectedRoute>
          }
        />

        <Route
          path="/notifications"
          element={
            <ProtectedRoute allowedRoles={["teacher", "student"]}>
              <Notification />
            </ProtectedRoute>
          }
        />
      </Routes>
    </AppLayout>
  );
}

export default App;
