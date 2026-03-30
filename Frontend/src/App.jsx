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
import AddClass from "./pages/AddClass";
import RegisterStudent from "./pages/RegisterStudent";

// shared by both users - teacher and student
import StudentDetails from "./pages/StudentDetails";
import ClassDetail from "./pages/ClassDetail";

import { useAuth } from "./context/AuthContext";

// ============================LAYOUT COMPONENT============================
function AppLayout({ children }) {
  const { isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen flex flex-col ">

      {/* Top Navbar */}
      {isAuthenticated && <NavBar />}

      <div className="flex flex-col sm:flex-row flex-1">
        {/* Sidebar (actions) */}
        {isAuthenticated && (
          <aside className="  sm:min-h-full bg-green-800/30 backdrop-blur-sm sm:rounded-l-2xl ">
            <Slidebar />
          </aside>
        )}

        {/* Main Content Area */}
        <main className="relative flex-1 overflow-hidden sm:rounded-r-2xl">

          {/* Background Layer */}
          <div
            className="absolute inset-0 bg-cover bg-center blur-sm scale-110 "
            style={{
              backgroundImage:
                "url('https://img.freepik.com/free-photo/book-with-green-board-background_1150-3837.jpg?semt=ais_hybrid&w=740&q=80')",
            }}
          />

          {/* Overlay */}
          <div className="absolute inset-0 bg-gray-600/20" />

          {/* Content */}
          <div className="relative z-10 p-1">
            <div className="rounded-2xl bg-white/10  shadow-lg p-4 sm:p-6">
              {children}
            </div>
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
          path="/addStudent"
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
      </Routes>
    </AppLayout>
  );
}

export default App;
