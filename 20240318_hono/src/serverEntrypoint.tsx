import { Hono } from "hono"
import { renderToString } from "react-dom/server"
import { renderToStreamed } from "./homura/ssr/ssr"

const app = new Hono()

// app.get("/_homura/about", async (c) => {
//   console.log("@@@@@@@@@")
//   // console.log(head?.title.toComponent())

//   // console.log(head?.link.toString())
//   // console.log(
//   //   renderToString(
//   //     <html>
//   //       <head>
//   //         {head?.title.toString()}
//   //         <>{head && head?.title.toComponent()}</>
//   //       </head>
//   //     </html>
//   //   )
//   // )
//   return c.json({ title: head?.title.toComponent()[0].props })
// })

app.get("*", async (c) => {
  const { head } = await renderToStreamed(c.req)
  console.log(c.req.header("protocol"))
  const host = c.req.header("host")
  console.log(host)
  console.log(new URL(c.req.url).origin)
  // let data
  // try {
  //   console.log(
  //     new URL(c.req.url).origin + "/" + routeObjectPathToJsonPath("/about")
  //   )
  //   const res = await fetch(
  //     new URL(c.req.url).origin + "/" + routeObjectPathToJsonPath("/about")
  //   )
  //   data = (await res.json()) as any
  //   console.log(data)
  // } catch (e) {
  //   console.error(e)
  // }

  return c.html(
    renderToString(
      <html>
        <head>
          <>{head && head?.title.toComponent()}</>
          <meta charSet="utf-8" />
          <meta content="width=device-width, initial-scale=1" name="viewport" />
          <link
            rel="stylesheet"
            href="https://cdn.simplecss.org/simple.min.css"
          />
          {import.meta.env.PROD ? (
            <script
              type="module"
              src="/static/client/clientEntrypoint.js"
            ></script>
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
