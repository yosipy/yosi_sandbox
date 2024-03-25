import build from "@hono/vite-cloudflare-pages"
import devServer from "@hono/vite-dev-server"
import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"

export default defineConfig(({ mode }) => {
  if (mode === "client") {
    return {
      publicDir: false,
      build: {
        manifest: true,
        outDir: "dist/static/client",
        rollupOptions: {
          input: "/src/client.tsx",
          output: {
            entryFileNames: "[name].js",
            chunkFileNames: "[name]-[hash].js",
          },
        },
      },
      plugins: [react()],
    }
  } else {
    return {
      ssr: {
        external: ["react", "react-dom"],
      },
      plugins: [
        build(),
        devServer({
          entry: "src/index.tsx",
        }),
      ],
    }
  }
})
