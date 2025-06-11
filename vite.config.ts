import tailwindcss from "@tailwindcss/vite";
import { TanStackRouterVite } from "@tanstack/router-plugin/vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { defineConfig, loadEnv } from "vite";
import { VitePWA } from "vite-plugin-pwa";

const ICONS = [
  {
    src: "/icons/android/android-launchericon-192-192.png",
    sizes: "192x192",
  },
  {
    src: "/icons/android/android-launchericon-144-144.png",
    sizes: "144x144",
  },
  {
    src: "/icons/android/android-launchericon-96-96.png",
    sizes: "96x96",
  },
  {
    src: "/icons/android/android-launchericon-72-72.png",
    sizes: "72x72",
  },
  {
    src: "/icons/android/android-launchericon-48-48.png",
    sizes: "48x48",
  },
  {
    src: "/icons/ios/16.png",
    sizes: "16x16",
  },
  {
    src: "/icons/ios/20.png",
    sizes: "20x20",
  },
  {
    src: "/icons/ios/29.png",
    sizes: "29x29",
  },
  {
    src: "/icons/ios/32.png",
    sizes: "32x32",
  },
  {
    src: "/icons/ios/40.png",
    sizes: "40x40",
  },
  {
    src: "/icons/ios/50.png",
    sizes: "50x50",
  },
  {
    src: "/icons/ios/57.png",
    sizes: "57x57",
  },
  {
    src: "/icons/ios/58.png",
    sizes: "58x58",
  },
  {
    src: "/icons/ios/60.png",
    sizes: "60x60",
  },
  {
    src: "/icons/ios/64.png",
    sizes: "64x64",
  },
  {
    src: "/icons/ios/72.png",
    sizes: "72x72",
  },
  {
    src: "/icons/ios/76.png",
    sizes: "76x76",
  },
  {
    src: "/icons/ios/80.png",
    sizes: "80x80",
  },
  {
    src: "/icons/ios/87.png",
    sizes: "87x87",
  },
  {
    src: "/icons/ios/100.png",
    sizes: "100x100",
  },
  {
    src: "/icons/ios/114.png",
    sizes: "114x114",
  },
  {
    src: "/icons/ios/120.png",
    sizes: "120x120",
  },
  {
    src: "/icons/ios/128.png",
    sizes: "128x128",
  },
  {
    src: "/icons/ios/144.png",
    sizes: "144x144",
  },
  {
    src: "/icons/ios/152.png",
    sizes: "152x152",
  },
  {
    src: "/icons/ios/167.png",
    sizes: "167x167",
  },
  {
    src: "/icons/ios/180.png",
    sizes: "180x180",
  },
  {
    src: "/icons/ios/192.png",
    sizes: "192x192",
  },
  {
    src: "/icons/ios/256.png",
    sizes: "256x256",
  },
];

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  return {
    base: "/AlvBeats/",
    plugins: [
      react(),
      tailwindcss(),
      TanStackRouterVite({ target: "react", autoCodeSplitting: true }),
      VitePWA({
        registerType: "autoUpdate",
        includeAssets: ["icon.png", "favicon.ico", "robots.txt"],
        manifest: {
          name: "AlvBeats",
          short_name: "AlvBeats",
          icons: ICONS,
        },
      }),
    ],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
        "@components": path.resolve(__dirname, "./src/components"),
        "@constants": path.resolve(__dirname, "./src/constants"),
        "@assets": path.resolve(__dirname, "./src/assets"),
        "@i18n": path.resolve(__dirname, "./src/i18n"),
        "@shared": path.resolve(__dirname, "./src/shared"),
        "@features": path.resolve(__dirname, "./src/features"),
        "@pkg": path.resolve(__dirname, "./package.json"),
      },
    },
    server: {
      port: 3000,
      allowedHosts: env.VITE_ALLOWED_HOSTS?.split(","),
    },
  };
});
