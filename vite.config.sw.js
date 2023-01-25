import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// this config is for the service worker, and will only serve the service worker

export default defineConfig({
  plugins: [vue()],
  test: { environment: "happy-dom" },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import './src/assets/scss/shared.scss';`,
      },
    },
  },
  root: "./sw",
  base: "./",
  publicDir: false,
  esbuild: false,
  server: {
    watch: {
      exclude: ["node_modules", "src"],
      include: ["src/firebase-messaging-sw.js"],
    },
    middlewareMode: true,
  },
  build: {
    outDir: "../public",
    emptyOutDir: false,
    rollupOptions: {
      external: (id) => id.startsWith("src/"),
      input: {
        "firebase-messaging-sw": "./src/firebase-messaging-sw.js",
      },
      output: {
        entryFileNames: (assetInfo) =>
          assetInfo.name === "service-worker" ? "firebase-messaging-sw.js" : "firebase-messaging-sw.js",
      },
    },
  },

  files: ["./src/firebase-messaging-sw.js"],
});
