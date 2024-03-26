import React, { Suspense } from "react"

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

const clientRegex = "/src/pages/**/[a-z[]*.tsx"
const ROUTES = import.meta.glob("/src/pages/**/[a-z[]*.tsx")

export const routeObjects = Object.keys(ROUTES).map((route) => {
  const path = route
    .replace(/\/src\/pages|page\.tsx$/g, "")
    .replace(/\[\.{3}.+\]/, "*")
    .replace(/\[(.+)\]/, ":$1") // [param] -> :param

  return { path, element: LazyImportComponent(ROUTES[route])({}) }
})
