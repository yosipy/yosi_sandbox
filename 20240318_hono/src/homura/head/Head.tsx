import type { FC, ReactNode } from "react"
import { Children, useEffect } from "react"
import { useContextValue } from "./Provider"

type Props = {
  children: ReactNode
}

export const Head: FC<Props> = (props) => {
  const context = useContextValue()
  context.title = "updated title!"

  useEffect(() => {
    const titleElement = Children.toArray(props.children).find(
      (child) => child.type === "title"
    )
    console.log(titleElement)
  })

  return <></>
}
