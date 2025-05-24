import { createRoot } from "react-dom/client";
import { CookiesProvider } from "react-cookie";
import { Analytics } from '@vercel/analytics/react'
import App from "./0_App";

createRoot(document.getElementById("root")!).render(
  <CookiesProvider>
    <Analytics />
    <App />
  </CookiesProvider>
);
