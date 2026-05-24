import React from "react";
import ReactDOM from "react-dom/client";
import App from "@/app/App";
import { BrowserRouter } from "react-router-dom";
import "@/index.css";
import { AuthProvider } from "@/features/auth/context/AuthContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <AuthProvider>
      <App />
    </AuthProvider>
  </BrowserRouter>
);
