import { createContext, useContext, useRef } from "react"
import type { FC, ReactNode, Dispatch, SetStateAction } from "react"
import { ContextData } from "./ContextData"

export type Title = string

export type Meta =
  | {
      charset: string
    }
  | {
      name: string
      content: string
    }
  | {
      property: string
      content: string
    }

export type Link = {
  rel: string
  href: string
  sizes?: string
  type?: string
  media?: string
  as?: string
}

export type HeadContext = {
  head: {
    title?: Title
    metas?: Meta[]
    links?: Link[]
  }
}

type Props = {
  context: HeadContext
  children: ReactNode
}

export const headContext = createContext<ContextData>(
  new ContextData({ head: {} })
)

export const HeadProvider: FC<Props> = (props) => {
  const context = useRef<ContextData>(new ContextData(props.context))

  return (
    <headContext.Provider value={context.current}>
      {props.children}
    </headContext.Provider>
  )
}

export const useContextValue = () => useContext(headContext)
