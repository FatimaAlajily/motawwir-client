import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { InputField } from "./features/auth/components/ui/InputField";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <InputField />
  </StrictMode>
);
