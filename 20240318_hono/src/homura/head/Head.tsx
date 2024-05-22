import type { FC } from "react"
import { useMemo, useState } from "react"
import { Link, Meta, Title, useContextValue } from "./Provider"
import { includeInCSRBuild } from "../utils/runtimeEnv"

type Props = {
  title?: Title
  metas?: Meta[]
  links?: Link[]
}

export const Head: FC<Props> = (props) => {
  const data = useContextValue()

  useMemo(() => {
    console.log("aaaaaaaaaaaaaaaa")
    if (props.title) {
      data.cleanHeadElements()
      data.context.head = props
      data.renderHeadElements()
    }

    console.log("head effect")
  }, [JSON.stringify(props)])

  return <></>
}
