import React from "react";
import { Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import NavBar from "./components/NavBar";
import ProtectedRoute from "./components/ProtectedRoute";

import Home from "./pages/Home";
import ClassPage from "./pages/ClassPage";
import StudentPage from "./pages/StudentPage";

import EditProfile from "./pages/EditProfile";
import AddClass from "./pages/AddClass";
import RegisterStudent from "./pages/RegisterStudent";
import StudentDetails from "./pages/StudentDetails";

import { useAuth } from "./context/AuthContext";
import ClassDetail from "./pages/ClassDetail";
import TeacherDetails from "./pages/TeacherDetails";

function AppLayout({ children }) {
  const { isAuthenticated } = useAuth();

  return (
    <>
      {isAuthenticated && <NavBar />}
      {children}
    </>
  );
}

function App() {
  return (
    <AppLayout>
      <Routes>
        {/* Public */}
        ✅<Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />} />
        {/* ===== TEACHER ===== */}
        ✅
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
              <AddClass />
            </ProtectedRoute>
          }
        />
        <Route
          path="/editClass/:_id"
          element={
            <ProtectedRoute allowedRoles={["teacher"]}>
              <AddClass />
            </ProtectedRoute>
          }
        />
        <Route
          path="/addStudent/:classLevel"
          element={
            <ProtectedRoute allowedRoles={["teacher"]}>
              <RegisterStudent mode="add" />
            </ProtectedRoute>
          }
        />
        <Route
          path="/editStudent/:_id"
          element={
            <ProtectedRoute allowedRoles={["teacher"]}>
              <RegisterStudent mode="edit" />
            </ProtectedRoute>
          }
        />
        ✅
        <Route
          path="/editProfile"
          element={
            <ProtectedRoute allowedRoles={["teacher"]}>
              <EditProfile />
            </ProtectedRoute>
          }
        />
        {/* ===== STUDENT ===== */}
        ✅
        <Route
          path="/student/:_id"
          element={
            <ProtectedRoute allowedRoles={["student", "teacher"]}>
              <StudentDetails />
            </ProtectedRoute>
          }
        />
        ✅
        <Route
          path="/class/:_id"
          element={
            <ProtectedRoute allowedRoles={["teacher", "student"]}>
              <ClassDetail />
            </ProtectedRoute>
          }
        />
      </Routes>
    </AppLayout>
  );
}

export default App;
