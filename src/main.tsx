import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { PROFILE } from "./constants/profile";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
