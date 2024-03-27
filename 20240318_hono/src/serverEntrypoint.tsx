import { Hono, HonoRequest } from "hono"
import { renderToReadableStream, renderToString } from "react-dom/server"
import {
  createStaticHandler,
  createStaticRouter,
  StaticRouterProvider,
} from "react-router-dom/server"
import { routeObjects } from "./homura/router/Router"
import { Helmet, HelmetProvider } from "react-helmet-async"

const app = new Hono()

export const createFetchRequest = (
  req: HonoRequest
  // res: Response
): Request => {
  // let origin = `${req.protocol}://${req.get("host")}`
  // // Note: This had to take originalUrl into account for presumably vite's proxying
  // let url = new URL(req.originalUrl || req.url, origin)

  let controller = new AbortController()
  // res.on("close", () => controller.abort())

  let headers = new Headers()

  for (let [key, values] of Object.entries(req.header)) {
    if (values) {
      if (Array.isArray(values)) {
        for (let value of values) {
          headers.append(key, value)
        }
      } else {
        headers.set(key, values)
      }
    }
  }

  let init: RequestInit = {
    method: req.method,
    headers,
    signal: controller.signal,
  }

  if (req.method !== "GET") {
    throw "Only Get request!"
  }

  return new Request(req.url, init)
}

let title: string | null = null
let description: string | null = null
app.get("/about", async (c) => {
  const helmetContext = {}
  const decoder = new TextDecoder("utf-8")

  // assets folder にいろいろ吐き出されるのやめたい
  let { query, dataRoutes } = createStaticHandler(routeObjects)
  let context = await query(createFetchRequest(c.req))
  console.log("%%%%%%%%%%%")
  const router = createStaticRouter(dataRoutes, context)
  const stream = await renderToReadableStream(
    <HelmetProvider context={helmetContext}>
      <StaticRouterProvider router={router} context={context} />
    </HelmetProvider>
  )
  await stream.allReady

  const reader = stream.getReader()
  while (true) {
    const { done, value } = await reader.read()

    const html = decoder.decode(value)
    console.log(html)

    // タイトルと説明を取り出すための正規表現パターン
    const titleRegex = /<div id="title">(.*?)<\/div>/
    const descriptionRegex = /<div id="description">(.*?)<\/div>/

    // タイトルと説明を抽出する
    const titleMatch = html.match(titleRegex)
    const descriptionMatch = html.match(descriptionRegex)

    // 抽出した結果を変数に格納
    title = titleMatch ? titleMatch[1] : null
    description = descriptionMatch ? descriptionMatch[1] : null

    if (title && description) break
    if (done) break
    if (value === undefined) break
  }

  const { helmet } = helmetContext
  console.log("@@@@@@@@@")
  console.log(helmet.title.toString())
  return c.json({ title, description })
})

app.get("*", async (c) => {
  console.log(c.req.header("protocol"))
  const host = c.req.header("host")
  console.log(host)
  console.log(new URL(c.req.url).origin)
  try {
    const res = await fetch(new URL(c.req.url).origin + "/api/app")
    const data = (await res.json()) as any
    console.log(data)
    title = data["title"]
    description = data["description"]
  } catch (e) {
    console.error(e)
  }

  return c.html(
    renderToString(
      <html>
        <head>
          {title && <title>{title}</title>}
          {description && <meta name="description" content={description} />}
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
