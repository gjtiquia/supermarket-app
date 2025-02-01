import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import api from "./api"

const app = new Hono()
  .route("/api", api);

export type AppType = typeof app;

const port = 3000
console.log(`Server is running on http://localhost:${port}`)

serve({
  fetch: app.fetch,
  port
})

