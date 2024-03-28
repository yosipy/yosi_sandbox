import { createRoot } from "react-dom/client"
import { HomuraProvider } from "./homura/provider/HomuraProvider"

const getHeadElements = () => {
  const head = document.head
  const titleElement = head.querySelector("title")
  const linkElements = head.querySelectorAll("link")
  const metaElements = head.querySelectorAll("meta")

  console.log("Titleタグ:", titleElement?.outerHTML)
  linkElements.forEach((element) => console.log("Linkタグ:", element.outerHTML))
  metaElements.forEach((element) => console.log("Metaタグ:", element.outerHTML))
}
getHeadElements()

const domNode = document.getElementById("root")!
const root = createRoot(domNode)
root.render(<HomuraProvider />)
