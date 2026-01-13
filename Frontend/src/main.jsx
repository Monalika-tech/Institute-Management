import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import "./index.css";

import { StudentContextProvider } from "./context/studentContext.jsx";
import { ClassContextProvider } from "./context/classContext.jsx";
import { AuthContextProvider } from "./context/AuthContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <AuthContextProvider>
      <ClassContextProvider>
        <StudentContextProvider>
          <App />
        </StudentContextProvider>
      </ClassContextProvider>
    </AuthContextProvider>
  </BrowserRouter>
);
