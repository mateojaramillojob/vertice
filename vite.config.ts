import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { VitePWA } from "vite-plugin-pwa";
import { urlMaterialSymbols } from "./src/ui/iconos";

export default defineConfig(({ mode }) => ({
  base: mode === "production" ? "/vertice/" : "/",
  server: {
    host: "::",
    port: 8082,
  },
  plugins: [
    react(),
    {
      name: "material-symbols",
      // "pre": antes de que Vite procese los href del HTML (si no, falla con "URI malformed").
      transformIndexHtml: { order: "pre", handler: (html) => html.replace("%MATERIAL_SYMBOLS%", urlMaterialSymbols()) },
    },
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: ["favicon.png", "apple-touch-icon.png"],
      workbox: {
        globPatterns: ["**/*.{js,css,html,svg,png,ico,woff2}"],
        navigateFallback: "index.html",
        runtimeCaching: [
          {
            // Google Fonts puede tardar o no responder: se sirve la copia guardada.
            urlPattern: /^https:\/\/fonts\.(googleapis|gstatic)\.com\//,
            handler: "CacheFirst",
            options: {
              cacheName: "google-fonts",
              expiration: { maxEntries: 20, maxAgeSeconds: 60 * 60 * 24 * 365 },
              cacheableResponse: { statuses: [0, 200] },
            },
          },
          {
            // Las fotos del mock viven en Google y pueden caducar; quien ya las
            // vio las conserva en caché.
            urlPattern: /^https:\/\/lh3\.googleusercontent\.com\//,
            handler: "CacheFirst",
            options: {
              cacheName: "fotos-prendas",
              expiration: { maxEntries: 200, maxAgeSeconds: 60 * 60 * 24 * 30 },
              cacheableResponse: { statuses: [0, 200] },
            },
          },
        ],
      },
      manifest: {
        name: "Vértice",
        short_name: "Vértice",
        lang: "es",
        description: "Moda de segunda mano verificada.",
        start_url: "/vertice/",
        scope: "/vertice/",
        display: "standalone",
        orientation: "portrait",
        background_color: "#FAFAFA",
        theme_color: "#0F172A",
        icons: [
          { src: "icon-192.png", sizes: "192x192", type: "image/png" },
          { src: "icon-512.png", sizes: "512x512", type: "image/png" },
          { src: "icon-maskable-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
        ],
      },
    }),
  ],
  resolve: {
    alias: { "@": path.resolve(__dirname, "./src") },
  },
}));
