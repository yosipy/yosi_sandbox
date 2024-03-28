import { FC } from "react"

export const Script: FC = () => {
  return import.meta.env.PROD ? (
    <script type="module" src="/static/client/clientEntrypoint.js"></script>
  ) : (
    <>
      <script
        type="module"
        src="http://localhost:5173/static/devClientScript.js"
      ></script>
      <script type="module" src="http://localhost:5174/src/client.tsx"></script>
    </>
  )
}
