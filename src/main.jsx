import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

// Unchanged from Week One. StrictMode stays (it matters in Week 3's fetch lesson).
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
