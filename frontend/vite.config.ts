import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import UnoCSS from "unocss/vite";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    react(),
    UnoCSS(),
    VitePWA({
      registerType: "autoUpdate",
      manifest: false,
      workbox: {
        globPatterns: [
          "**/*.{js,css,html,png,jpg,jpeg,svg,json,ico}",
        ],
        navigateFallback: "/index.html",
        navigateFallbackDenylist: [/^\/admin/],
        runtimeCaching: [
        //   {
        //     urlPattern: /\/api\//,
        //     handler: "NetworkFirst",
        //     options: { cacheName: "api-cache" },
        //   },
          {
            urlPattern: /\.(?:js|css|html|webmanifest)$/,
            handler: "CacheFirst",
            options: { cacheName: "static-assets" },
          },
          {
            urlPattern: /\.(?:png|jpg|svg|jpeg)$/,
            handler: "CacheFirst",
            options: { cacheName: "images" },
          },
        ],
      },
    }),
  ],
  server: {
    host: true,
  },
});
