import { includeInSSRBuild } from "../utils/runtimeEnv"
import { HeadContext } from "./Provider"

export class ContextData {
  context: HeadContext
  constructor(context: HeadContext) {
    this.context = context

    // if (this.context.title) {
    //   this.context.title.children = "updated"
    // }
  }

  cleanHeadElements() {
    const head = document.head
    head.querySelector("title")?.remove()

    this.context.head.metas?.forEach((meta) => {
      // const element = head.querySelector(`meta[name="${meta.name}"]`)
    })
  }

  renderHeadElements() {
    if (includeInSSRBuild) return

    if (this.context.head.title) {
      document.title = this.context.head.title
    }

    const head = document.head
  }
}
