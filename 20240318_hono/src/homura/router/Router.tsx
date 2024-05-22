import type { RouteObject } from "react-router-dom"
import { filePathToPath } from "./file"

const clientRegex = "/src/pages/**/page.tsx"
const ROUTES = import.meta.glob<{ default: () => JSX.Element }>(
  "/src/pages/**/page.tsx",
  {
    eager: true,
  }
)

const ROUTES_404 = import.meta.glob<{ default: () => JSX.Element }>(
  "/src/pages/_404.tsx",
  {
    eager: true,
  }
)

export const routeObjects: RouteObject[] = [
  ...Object.keys(ROUTES).map((route) => {
    const Element = ROUTES[route].default

    return {
      path: filePathToPath(route),
      element: <Element />,
    }
  }),
  (() => {
    const route = Object.keys(ROUTES_404)[0]
    const Element = ROUTES_404[route].default
    return {
      path: "*",
      element: <Element />,
    }
  })(),
]
