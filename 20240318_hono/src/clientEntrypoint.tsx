import { createRoot } from "react-dom/client"
import { RouterProvider, createBrowserRouter } from "react-router-dom"
import { routeObjects } from "./homura/router/Router"

const domNode = document.getElementById("root")!
const root = createRoot(domNode)
root.render(<RouterProvider router={createBrowserRouter(routeObjects)} />)
