import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

import { routeTree } from "./routeTree.gen";
import { createRouter, RouterProvider } from "@tanstack/react-router";
import { AppProvider } from "./hooks/context/AppProvider";
import { SidebarProvider } from "./components/ui/sidebar";
import { localStorageKey } from "./data/status-constant";

const router = createRouter({ routeTree });

const InnerApp = () => {
  const user = localStorage.getItem(localStorageKey.user);

  return <RouterProvider router={router} context={{ login: user }} />;
};

export const App = () => {
  return (
    <AppProvider>
      <SidebarProvider>
        <InnerApp />
      </SidebarProvider>
    </AppProvider>
  );
};

const rootElement = document.getElementById("root")!;
if (!rootElement.innerHTML) {
  const root = createRoot(rootElement);
  root.render(
    <StrictMode>
      <App />
    </StrictMode>
  );
}
