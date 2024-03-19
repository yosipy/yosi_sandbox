import { createRoot } from "react-dom/client"
import { Routes } from "@generouted/react-router/lazy"

const domNode = document.getElementById("root")!
const root = createRoot(domNode)
root.render(<Routes />)
