import { FC } from "react"
import { RouterProvider, createBrowserRouter } from "react-router-dom"
import { lazyRouteObjects } from "../router/LazyRouter"
import { HelmetProvider } from "react-helmet-async"

export const HomuraProvider: FC = () => {
  return (
    <HelmetProvider>
      <RouterProvider router={createBrowserRouter(lazyRouteObjects)} />
    </HelmetProvider>
  )
}
