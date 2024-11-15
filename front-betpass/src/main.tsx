import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ToastContainer } from "react-toastify";
import "./index.css";
import "react-toastify/dist/ReactToastify.css";

import { DealsProvider } from "./context/DealsContext";
import Deals from "./pages/Deals/Deals";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <DealsProvider>
      <Deals />
      <ToastContainer />
    </DealsProvider>
  </StrictMode>
);
