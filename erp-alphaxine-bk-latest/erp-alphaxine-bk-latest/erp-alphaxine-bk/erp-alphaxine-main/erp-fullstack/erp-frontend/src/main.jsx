import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";   // Tailwind and global styles
//import "./login.css";   // Login-specific styles

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
