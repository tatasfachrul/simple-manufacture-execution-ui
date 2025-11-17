import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

import { routeTree } from "./routeTree.gen";
import { createRouter, RouterProvider } from "@tanstack/react-router";
import { AppProvider } from "./hooks/context/AppProvider";
import { SidebarProvider } from "./components/ui/sidebar";
const router = createRouter({ routeTree });

const rootElement = document.getElementById("root")!;
if (!rootElement.innerHTML) {
  const root = createRoot(rootElement);
  root.render(
    <StrictMode>
      <AppProvider>
        <SidebarProvider>
          <RouterProvider router={router} />
        </SidebarProvider>
      </AppProvider>
    </StrictMode>
  );
}
