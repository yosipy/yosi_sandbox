import { Hono } from "hono"
import { renderToString } from "react-dom/server"
import { renderToStreamed } from "./homura/ssr/ssr"
import { Script } from "./homura/components/Script/Script"
import { routeApps } from "./homura/router/serverRouter"

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

routeApps.forEach((routeApp) => {
  app.route("", routeApp.honoApp)
})

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
  console.log("#######")
  console.log(head)
  console.log(head?.title.toString())

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
          <Script />
        </head>
        <body>
          <div id="root"></div>
        </body>
      </html>
    )
  )
})

export default app
