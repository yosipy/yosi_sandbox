import { Hono } from "hono"
import { renderToString } from "react-dom/server"
import { Script } from "../../homura/components/Script/Script"
import { renderToStreamed } from "../../homura/ssr/ssr"

const app = new Hono()

app.get("/about", async (c) => {
  const { head } = await renderToStreamed(c.req)
  console.log("#######")
  console.log(head?.title)
  return c.html(
    renderToString(
      <html>
        <head>
          <meta charSet="utf-8" />
          <meta content="width=device-width, initial-scale=1" name="viewport" />
          <link
            rel="stylesheet"
            href="https://cdn.simplecss.org/simple.min.css"
          />
          <Script />
        </head>
        <body>
          server.tsx
          <div id="root"></div>
        </body>
      </html>
    )
  )
})

export default app
