import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: [["babel-plugin-react-compiler"]],
      },
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@components": path.resolve(__dirname, "./src/components"),
      "@customHooks": path.resolve(__dirname, "./src/customHooks"),
      "@shimmers": path.resolve(__dirname, "./src/shimmers"),
      "@services": path.resolve(__dirname, "./src/services"),
      "@pages": path.resolve(__dirname, "./src/pages"),
      "@utils": path.resolve(__dirname, "./src/utils"),
      "@layouts": path.resolve(__dirname, "./src/layouts"),
      "@app": path.resolve(__dirname, "./src/app"),
    },
  },
  test: {
    globals: true,
    environment: "jsdom",
    coverage: {
      provider: "v8",
      reporter: ["text", "html"],
      reportsDirectory: "test-coverage",
      include: ["src/**/*.{js,jsx}"],
      exclude: [
        "src/assets/**",
        "src/routes/**",
        "src/services/**",
        "src/shimmers/**",
        "src/*.{css, scss}",
        "src/App.jsx",
        "src/main.jsx",
      ],
      all: true,
      reporter: ["text", "lcov"],
    },

    setupFiles: "./src/setupTests.js",
    css: true,
  },
});
