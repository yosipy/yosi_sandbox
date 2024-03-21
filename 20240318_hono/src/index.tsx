import { Hono } from "hono"
import { renderToString } from "react-dom/server"

const app = new Hono()

app.get("*", (c) => {
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
          {import.meta.env.PROD ? (
            <script type="module" src="/static/client.js"></script>
          ) : (
            <>
              <script
                type="module"
                src="http://localhost:5173/static/devClientScript.js"
              ></script>
              <script
                type="module"
                src="http://localhost:5174/src/client.tsx"
              ></script>
            </>
          )}
        </head>
        <body>
          <div id="root"></div>
        </body>
      </html>
    )
  )
})

export default app
