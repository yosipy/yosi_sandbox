import { HonoRequest } from "hono"
import { renderToReadableStream } from "react-dom/server"
import {
  createStaticHandler,
  createStaticRouter,
} from "react-router-dom/server"
import { lazyRouteObjects } from "../router/LazyRouter"
import { HelmetServerState } from "react-helmet-async"
import { HomuraSSRProvider } from "../provider/HomuraProvider"

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

  // assets folder にいろいろ吐き出されるのやめたい
  const { query, dataRoutes } = createStaticHandler(lazyRouteObjects)
  const context = await query(createFetchRequest(req))

  if (context instanceof Response) {
    throw context
  }

  const router = createStaticRouter(dataRoutes, context)
  const stream = await renderToReadableStream(
    <HomuraSSRProvider
      helmet={{ context: helmetContext }}
      reactRouter={{ router: router, context: context }}
    />
  )
  await stream.allReady

  const { helmet } = helmetContext

  return {
    head: helmet,
  }
}
