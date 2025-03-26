import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import autoprefixer from "autoprefixer";
import tailwind from "tailwindcss";
import path from "path";
import { VitePWA } from "vite-plugin-pwa";

// https://vite.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },

  plugins: [
    vue(),
    VitePWA({
      registerType: "autoUpdate",
      manifest: {
        name: "Wimhales",
        short_name: "Wimhales",
        description:
          "Track your Wim Hof breathing sessions – all the love, all the power.",
        start_url: "/",
        display: "standalone",
        background_color: "#ffffff",
        theme_color: "#0f172a",
        icons: [
          {
            src: "logo/logo.png",
            sizes: "256x256",
            type: "image/png",
          },
        ],
        screenshots: [
          {
            src: "screenshots/wide.png",
            sizes: "640x320",
            type: "image/png",
            form_factor: "wide",
            label: "Wonder Widgets",
          },
          {
            src: "screenshots/portrait.png",
            sizes: "320x640",
            type: "image/png",
            form_factor: "narrow",
            label: "Wonder Widgets",
          },
        ],
      },
    }),
  ],
  css: {
    postcss: {
      plugins: [tailwind(), autoprefixer()],
    },
  },
});
