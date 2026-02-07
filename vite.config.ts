import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import fs from "fs";
import { componentTagger } from "lovable-tagger";

/** Copy index.html to 404.html for GitHub Pages SPA fallback (client routes get correct document). */
function copyIndexTo404() {
  return {
    name: "copy-index-to-404",
    closeBundle() {
      const outDir = path.resolve(__dirname, "dist");
      const indexPath = path.join(outDir, "index.html");
      const notFoundPath = path.join(outDir, "404.html");
      if (fs.existsSync(indexPath)) {
        fs.copyFileSync(indexPath, notFoundPath);
      }
    },
  };
}

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  base: "/salesarena/",
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    mode === "development" && componentTagger(),
    copyIndexTo404(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
