import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "./components/ui/sonner";
import QueryProviders from "./contexts/query-provider";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryProviders>
      <BrowserRouter>
        <Toaster position="top-center" />
        <App />
      </BrowserRouter>
    </QueryProviders>
  </StrictMode>
);
