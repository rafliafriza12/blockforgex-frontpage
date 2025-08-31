// vite.config.js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwind from "@tailwindcss/vite";

export default defineConfig({
  base: "./",
  plugins: [react(), tailwind()],
  build: {
    outDir: "dist",
    assetsDir: "assets",
  },
  server: {
    allowedHosts: ["69b2036e101a.ngrok-free.app"],
  },
});
