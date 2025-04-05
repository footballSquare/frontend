import { createRoot } from "react-dom/client";
import { CookiesProvider } from "react-cookie";
import App from "./0_App";

createRoot(document.getElementById("root")!).render(
  <CookiesProvider>
    <App />
  </CookiesProvider>
);
