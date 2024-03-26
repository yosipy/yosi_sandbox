import { createRoot } from "react-dom/client"
import { RouterProvider, createBrowserRouter } from "react-router-dom"
import { routeObjects } from "./homura/router/Router"

const ROUTES = import.meta.glob("/src/pages/**/[a-z[]*/page.tsx")
console.log(ROUTES)
ROUTES["/src/pages/about/page.tsx"]().then((t) => console.log(t))

const domNode = document.getElementById("root")!
const root = createRoot(domNode)
root.render(<RouterProvider router={createBrowserRouter(routeObjects)} />)
