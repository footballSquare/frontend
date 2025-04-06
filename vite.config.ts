import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default () => {
  return defineConfig({
    server: {
      proxy: {
        "/api": {
          target: "https://api.footballsquare.co.kr",
          changeOrigin: true,
          secure: false,
          rewrite: (path) => path.replace(/^\/api/, ""),
        },
      },
    },
    plugins: [react(), tailwindcss()],
  });
};
