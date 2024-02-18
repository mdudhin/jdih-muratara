import "./styles/index.css";

import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { Toaster } from "./components/ui/toaster.tsx";
import { TokenProvider } from "./utils/context/token.tsx";
import { router } from "./routes/index.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <TokenProvider>
      <RouterProvider router={router} />
      <Toaster />
    </TokenProvider>
  </React.StrictMode>
);
