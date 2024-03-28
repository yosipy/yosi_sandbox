import { HonoRequest } from "hono"
import { renderToReadableStream } from "react-dom/server"
import {
  createStaticHandler,
  createStaticRouter,
} from "react-router-dom/server"
import { routeObjects } from "../router/Router"
import { HelmetServerState } from "react-helmet-async"
import { HomuraSSRProvider } from "../provider/HomuraSSRProvider"
import { HeadProvider } from "../head/Provider"

const createFetchRequest = (req: HonoRequest): Request => {
  if (req.method !== "GET") {
    throw "Only Get request!"
  }
  // const url = new URL(req.url)
  // console.log(`----${url.protocol}://${url.host}${url.pathname}`)

  const headers = new Headers()

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

  const init: RequestInit = {
    method: req.method,
    headers,
  }

  return new Request(req.url, init)
}

export const renderToStreamed = async (req: HonoRequest) => {
  const helmetContext:
    | {
        helmet?: HelmetServerState
      }
    | undefined = {}

  const { query, dataRoutes } = createStaticHandler(routeObjects)
  const context = await query(createFetchRequest(req))

  if (context instanceof Response) {
    throw context
  }
  const headContext = { title: "before" }

  const router = createStaticRouter(dataRoutes, context)
  const stream = await renderToReadableStream(
    <HeadProvider context={headContext}>
      <HomuraSSRProvider
        helmet={{ context: helmetContext }}
        reactRouter={{ router: router, context: context }}
      />
    </HeadProvider>
  )
  await stream.allReady

  const { helmet } = helmetContext
  console.log(`$$$$$$$$$$$$$$$ -> ${headContext.title}`)

  return {
    head: helmet,
  }
}
