import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NavBar from "./components/NavBar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import ClassPage from "./pages/ClassPage";
import StudentDetails from "./pages/StudentDetails";
import ProtectedRoute from "./components/ProtectedRoute";
import EditProfile from "./pages/EditProfile";
import AddClass from "./pages/AddClass";

function App() {
  return (
    <div>
      <NavBar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/editProfile"
          element={
            <ProtectedRoute>
              <EditProfile />
            </ProtectedRoute>
          }
        />
        
        <Route
          path="/addClass"
          element={
            <ProtectedRoute>
              <AddClass />
            </ProtectedRoute>
          }
        />
        <Route
          path="/class/:classLevel"
          element={
            <ProtectedRoute>
              <ClassPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/students/:_id"
          element={
            <ProtectedRoute>
              <StudentDetails />
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
