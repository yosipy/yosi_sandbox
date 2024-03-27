import { createRoot } from "react-dom/client"
import { HomuraProvider } from "./homura/provider/HomuraProvider"

const domNode = document.getElementById("root")!
const root = createRoot(domNode)
root.render(<HomuraProvider />)
