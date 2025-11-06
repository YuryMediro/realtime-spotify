import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { ClerkProvider } from "@clerk/clerk-react";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import AuthProvider from "@/app/AuthProvider";
import { Toaster } from "react-hot-toast";
import { dark } from "@clerk/themes";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/shared/api/queryClient";

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key");
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ClerkProvider
        publishableKey={PUBLISHABLE_KEY}
        appearance={{
          layout: { unsafe_disableDevelopmentModeWarnings: true },
          theme: dark,
        }}
      >
        <AuthProvider>
          <BrowserRouter>
            <Toaster />
            <App />
          </BrowserRouter>
        </AuthProvider>
      </ClerkProvider>
    </QueryClientProvider>
  </StrictMode>,
);
