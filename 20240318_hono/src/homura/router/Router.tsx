import type { RouteObject } from "react-router-dom"

const clientRegex = "/src/pages/**/[a-z[]*.tsx"
const ROUTES = import.meta.glob<{ default: () => JSX.Element }>(
  "/src/pages/**/[a-z[]*.tsx",
  {
    eager: true,
  }
)

export const routeObjects: RouteObject[] = Object.keys(ROUTES).map((route) => {
  const path = route
    .replace(/\/src\/pages|page\.tsx$/g, "")
    .replace(/\[\.{3}.+\]/, "*")
    .replace(/\[(.+)\]/, ":$1") // [param] -> :param

  const Element = ROUTES[route].default

  return {
    path,
    element: <Element />,
  }
})
