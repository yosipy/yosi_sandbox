import build from "@hono/vite-cloudflare-pages"
import devServer from "@hono/vite-dev-server"
import { defineConfig, splitVendorChunkPlugin } from "vite"

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
      plugins: [splitVendorChunkPlugin()],
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
