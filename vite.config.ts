import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./"),
    },
  },
  server: {
    host: "0.0.0.0",
    port: 5000,
    allowedHosts: [
      "8d00e80b-9f7d-4b08-8345-c60b96a75d5e-00-3hjkw5j1e9zjw.pike.replit.dev",
      "0672a9bb-1293-4ed6-9441-0f9dc35c2088-00-33p8udzgl7t5m.pike.replit.dev",
      "localhost",
    ],
  },
});
