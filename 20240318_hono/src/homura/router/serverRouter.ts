import { Hono } from "hono"
import { BlankSchema, Env } from "hono/types"
import { filePathToPath } from "./file"

export type HonoApp = Hono<Env, BlankSchema, "/">

export const ROUTES = import.meta.glob<{
  default: HonoApp
}>("/src/pages/**/server.tsx", {
  eager: true,
})

export const routeApps: { path: string; honoApp: HonoApp }[] = Object.keys(
  ROUTES
).map((route) => {
  const path = filePathToPath(route)

  return {
    path,
    honoApp: ROUTES[route].default,
  }
})
