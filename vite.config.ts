import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

<<<<<<< HEAD
export default () => {
  return defineConfig({
    server: {
      proxy: {
        "/api": {
          target: "https://api.footballsquare.co.kr",
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ""),
        },
      },
    },
    plugins: [react(), tailwindcss()],
  });
};
=======
export default defineConfig({
  plugins: [react(), tailwindcss()],
});
>>>>>>> develop
