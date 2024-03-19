import build from "@hono/vite-cloudflare-pages"
import devServer from "@hono/vite-dev-server"
import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import generouted from "@generouted/react-router/plugin"

export default defineConfig(({ mode }) => {
  if (mode === "client") {
    return {
      build: {
        manifest: true,
        rollupOptions: {
          input: "/src/client.tsx",
          output: {
            entryFileNames: "static/[name].js",
            chunkFileNames: "static/[hash].js",
          },
        },
      },
      plugins: [react(), generouted()],
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
