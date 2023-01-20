import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import svgLoader from "vite-svg-loader";
import eslintPlugin from "vite-plugin-eslint";
import { VitePWA } from "vite-plugin-pwa";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    eslintPlugin({
      fix: true,
      overrideConfigFile: "./.eslintrc.cjs",
    }),
    vue(),
    svgLoader(),
    VitePWA({
      registerType: "autoUpdate",
      injectRegister: "auto",
      devOptions: {
        enabled: true,
        type: "module",
      },
      workbox: {
        globPatterns: ["**/*.{js,css,html,ico,png,svg}"],
      },
      includeAssets: ["favicon.ico", "apple-touch-icon.png", "masked-icon.svg"],
      manifest: {
        name: "Reblabify",
        short_name: "Reblabify",
        description: "Reblabify is a web app that allows you to create and share your own events with your friends.",
        scope: "./",
        start_url: "./",
        icons: [
          {
            src: "/pwa-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "/pwa-512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
          {
            src: "pwa-512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any maskable",
          },
        ],
        theme_color: "#1b4754",
        background_color: "#1b4754",
        display: "standalone",
        orientation: "portrait",
      },
    }),
  ],

  test: { environment: "happy-dom" },

  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import './src/assets/scss/shared.scss';`,
      },
    },
  },
});
