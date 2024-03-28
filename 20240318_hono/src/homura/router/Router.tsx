import type { RouteObject } from "react-router-dom"
import { filePathToPath } from "./file"

const clientRegex = "/src/pages/**/page.tsx"
const ROUTES = import.meta.glob<{ default: () => JSX.Element }>(
  "/src/pages/**/page.tsx",
  {
    eager: true,
  }
)

export const routeObjects: RouteObject[] = Object.keys(ROUTES).map((route) => {
  console.log(route)
  const path = filePathToPath(route)
  console.log(path)

  const Element = ROUTES[route].default

  return {
    path,
    element: <Element />,
  }
})
