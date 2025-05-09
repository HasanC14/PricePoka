import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: ["favicon.svg", "favicon.ico", "robots.txt"],
      manifest: {
        name: "PricePoka",
        short_name: "PricePoka",
        description:
          "Your app descriptionCompare PC part prices from all major sites in one place. Stay updated with the best deals.",
        theme_color: "#ffffff",
        icons: [
          {
            src: "logo-s.png",
            // src: 'pwa-192x192.png',
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "logo-l.jpg",
            // src: 'pwa-512x512.png',
            sizes: "512x512",
            type: "image/png",
          },
        ],
      },
    }),
  ],
});
