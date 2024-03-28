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
  "/src/pages/**/[a-z[]*.tsx"
)

export const lazyRouteObjects: RouteObject[] = Object.keys(ROUTES).map(
  (route) => {
    const path = filePathToPath(route)

    return {
      path,
      element: LazyImportComponent(ROUTES[route])({}),
    }
  }
)
