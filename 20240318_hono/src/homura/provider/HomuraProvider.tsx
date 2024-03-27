import { FC } from "react"
import { RouterProvider, createBrowserRouter } from "react-router-dom"
import {
  StaticRouterProvider,
  StaticHandlerContext,
} from "react-router-dom/server"
import type { Router } from "@remix-run/router"
import { routeObjects } from "../router/Router"
import { HelmetProvider, HelmetServerState } from "react-helmet-async"

export const HomuraProvider: FC = () => {
  return (
    <HelmetProvider>
      <RouterProvider router={createBrowserRouter(routeObjects)} />
    </HelmetProvider>
  )
}

export type HelmetContext =
  | {
      helmet?: HelmetServerState
    }
  | undefined

export const HomuraSSRProvider: FC<{
  helmet: {
    context: HelmetContext
  }
  reactRouter: {
    router: Router
    context: StaticHandlerContext
  }
}> = ({ helmet, reactRouter }) => {
  return (
    <HelmetProvider context={helmet.context}>
      <StaticRouterProvider
        router={reactRouter.router}
        context={reactRouter.context}
      />
    </HelmetProvider>
  )
}
