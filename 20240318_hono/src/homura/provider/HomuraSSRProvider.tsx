import { FC } from "react"
import {
  StaticRouterProvider,
  StaticHandlerContext,
} from "react-router-dom/server"
import type { Router } from "@remix-run/router"
import { HelmetProvider, HelmetServerState } from "react-helmet-async"

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
