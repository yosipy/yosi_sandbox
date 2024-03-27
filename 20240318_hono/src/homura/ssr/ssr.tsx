import { HonoRequest } from "hono"
import { renderToReadableStream } from "react-dom/server"
import {
  createStaticHandler,
  createStaticRouter,
  StaticRouterProvider,
} from "react-router-dom/server"
import { routeObjects } from "../router/Router"
import { HelmetProvider, HelmetServerState } from "react-helmet-async"
import { HomuraSSRProvider } from "../provider/HomuraProvider"

const createFetchRequest = (req: HonoRequest): Request => {
  if (req.method !== "GET") {
    throw "Only Get request!"
  }
  // const url = new URL(req.url)
  // console.log(`----${url.protocol}://${url.host}${url.pathname}`)

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
  }

  return new Request(req.url, init)
}

export const renderToStreamed = async (
  req: HonoRequest,
  toJsonPath: boolean = false
) => {
  const helmetContext:
    | {
        helmet?: HelmetServerState
      }
    | undefined = {}

  // assets folder にいろいろ吐き出されるのやめたい
  const { query, dataRoutes } = createStaticHandler(routeObjects)
  const context = await query(createFetchRequest(req))

  if (context instanceof Response) {
    throw context
  }

  console.log("dataRoutes")
  console.log(dataRoutes)
  const router = createStaticRouter(dataRoutes, context)
  const stream = await renderToReadableStream(
    <HomuraSSRProvider
      helmet={{ context: helmetContext }}
      reactRouter={{ router: router, context: context }}
    />
  )
  await stream.allReady

  const { helmet } = helmetContext
  console.log("@@@@@@@@@")
  console.log(helmet?.title.toString())

  return {
    head: helmet,
  }
}
