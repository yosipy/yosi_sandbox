import { createRoot } from "react-dom/client"
import { MyRouter } from "./myRouter/ClientRoutes"

const ROUTES = import.meta.glob("/src/pages/**/[a-z[]*/page.tsx")
console.log(ROUTES)
ROUTES["/src/pages/about/page.tsx"]().then((t) => console.log(t))

const domNode = document.getElementById("root")!
const root = createRoot(domNode)
root.render(<MyRouter />)
