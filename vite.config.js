import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import svgLoader from "vite-svg-loader";
import eslintPlugin from "vite-plugin-eslint";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), svgLoader(), eslintPlugin()],

  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import './src/assets/scss/shared.scss';`,
      },
    },
  },
});
