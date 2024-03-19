import build from "@hono/vite-cloudflare-pages"
import devServer from "@hono/vite-dev-server"
import { defineConfig } from "vite"
import path from "path"

export default defineConfig(({ mode }) => {
  console.log(mode)
  console.log(path.resolve(__dirname, "/src/client.tsx"))
  if (mode === "client") {
    return {
      build: {
        manifest: true,
        rollupOptions: {
          input: "/src/client.tsx",
          output: {
            entryFileNames: "static/client.js",
          },
        },
      },
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
