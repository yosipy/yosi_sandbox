import { createContext, useContext } from "react"
import type { FC, ReactNode } from "react"

type HeadContext = {
  title?: any // TODO
}

type Props = {
  context: HeadContext
  children: ReactNode
}

export const headContext = createContext<HeadContext>({})

export const HeadProvider: FC<Props> = (props) => {
  return (
    <headContext.Provider value={props.context}>
      {props.children}
    </headContext.Provider>
  )
}

export const useContextValue = () => useContext(headContext)
