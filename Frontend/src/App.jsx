import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

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
    <Router>
      <AppLayout>
        <Routes>
          {/* Public */}
          <Route path="/login" element={<Login />} />

          {/* ===== TEACHER ===== */}

          <Route
            path="/"
            element={
              <ProtectedRoute allowedRoles={["teacher"]}>
                <Home />
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
                <AddClass mode="create" />
              </ProtectedRoute>
            }
          />

          <Route
            path="/editClass/:classLevel"
            element={
              <ProtectedRoute allowedRoles={["teacher"]}>
                <AddClass mode="edit" />
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
            path="/student/class"
            element={
              <ProtectedRoute allowedRoles={["student"]}>
                <ClassPage />
              </ProtectedRoute>
            }
          />
        </Routes>
      </AppLayout>
    </Router>
  );
}

export default App;
