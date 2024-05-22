import React, { Suspense } from "react"
import type { RouteObject } from "react-router-dom"
import { filePathToPath } from "./file"

const LazyImportComponent = (action: any) => {
  const LazyComponent = React.lazy(action)
  return (props: Record<string, any>) => {
    return (
      <Suspense fallback={<></>}>
        <LazyComponent {...props} />
      </Suspense>
    )
  }
}

const clientRegex = "/src/pages/**/page.tsx"
const ROUTES = import.meta.glob<{ default: () => JSX.Element }>(
  "/src/pages/**/page.tsx"
)

const ROUTES_404 = import.meta.glob<{ default: () => JSX.Element }>(
  "/src/pages/_404.tsx"
)

export const lazyRouteObjects: RouteObject[] = [
  ...Object.keys(ROUTES).map((route) => {
    return {
      path: filePathToPath(route),
      element: LazyImportComponent(ROUTES[route])({}),
    }
  }),
  (() => {
    const route = Object.keys(ROUTES_404)[0]
    return {
      path: "*",
      element: LazyImportComponent(ROUTES_404[route])({}),
    }
  })(),
]
