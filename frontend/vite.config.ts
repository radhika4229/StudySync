import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  vite: {
    define: {
      global: "globalThis",
    },
  },
  tanstackStart: {
    server: { port: 5173 },
  },
});