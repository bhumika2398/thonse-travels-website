import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      "/api": {
        target: "http://localhost:5000",
        changeOrigin: true,
      },
    },
    watch: {
      // Large video files under OneDrive sync can transiently lock
      // (EBUSY) while syncing, which otherwise crashes the dev server's
      // file watcher. They're static assets that never need HMR anyway.
      ignored: ["**/public/videos/**"],
    },
  },
});
