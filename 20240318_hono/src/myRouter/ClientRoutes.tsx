import React, { Suspense, FC } from "react"
import { RouterProvider, createBrowserRouter } from "react-router-dom"

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

const ROUTES = import.meta.glob("/src/pages/**/[a-z[]*.tsx")

const routes = Object.keys(ROUTES).map((route) => {
  const path = route
    .replace(/\/src\/pages|page\.tsx$/g, "")
    .replace(/\[\.{3}.+\]/, "*")
    .replace(/\[(.+)\]/, ":$1") // [param] -> :param

  return { path, element: LazyImportComponent(ROUTES[route])({}) }
})
console.log(routes)

export const MyRouter: FC = () => (
  <RouterProvider router={createBrowserRouter(routes)} />
)
