// Vite configuration. The bundled preset wires up:
//   TanStack Start, React, Tailwind v4, tsconfig-paths, Cloudflare adapter,
//   path aliases, dedupe rules, and dev-server defaults.
// Do not add those plugins manually — they would duplicate.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

// Point TanStack Start at our custom SSR entry (src/server.ts) which wraps
// the default handler with an error boundary for Cloudflare Workers.
export default defineConfig({
  tanstackStart: {
    server: { entry: "server" },
  },
});
