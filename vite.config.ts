import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig(() => ({
  server: {
    host: "::",
    port: 8080,
    hmr: {
      overlay: false,
    },
  },
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      // ─── @acme/* monorepo-style aliases ───────────────────────
      "@acme/contracts": path.resolve(__dirname, "./src/packages/contracts"),
      "@acme/api-client": path.resolve(__dirname, "./src/packages/api-client"),
      "@acme/core": path.resolve(__dirname, "./src/packages/core"),
      "@acme/ui": path.resolve(__dirname, "./src/packages/ui-universal"),
      "@acme/features": path.resolve(__dirname, "./src/packages/features"),
      "@acme/platform": path.resolve(__dirname, "./src/packages/platform"),
      "@acme/config": path.resolve(__dirname, "./src/packages/config"),
      "@acme/observability": path.resolve(__dirname, "./src/packages/observability"),
    },
    // Three is imported from app code (three, three/webgpu, three/tsl) and
    // transitively by r3f/drei. Without dedupe vite bundles multiple copies
    // and three.js prints "Multiple instances" then class-instance checks
    // fail across boundaries (e.g. Vector3 from copy A is not instanceof
    // Vector3 from copy B). Also breaks drei preset URL resolution.
    dedupe: ["three", "@react-three/fiber", "@react-three/drei"],
  },
  optimizeDeps: {
    // three/webgpu and three/tsl rely on Proxy-based TSL machinery that
    // breaks under esbuild's CommonJS-style pre-bundling. Demo's working V7
    // runs with no optimizeDeps config — vite serves the prebuilt
    // three.webgpu.js bundle natively which keeps the Proxies intact.
    // dedupe (in resolve) still prevents multiple-three instances.
    exclude: ["three", "three/webgpu", "three/tsl"],
  },
}));
