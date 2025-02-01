import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { serveStatic } from '@hono/node-server/serve-static'
import api from "./api"

const app = new Hono()
  .get("*", serveStatic({ root: "../web-app/dist" }))
  .get("/hello-world", (c) => c.text("hello world!"))
  .route("/api", api);

export type AppType = typeof app;

const port = 3000
console.log(`Server is running on http://localhost:${port}`)

serve({
  fetch: app.fetch,
  port
})

