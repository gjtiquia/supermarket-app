import { serve } from '@hono/node-server'
import { Hono } from 'hono'

type RecentItems = {
  items: Item[];
};

type Item = {
  name: string;
};

const app = new Hono()
  .get("/api/recent-items", (c) => {
    return c.json<RecentItems>({
      items: [
        { name: "pumpkin" },
      ],
    });
  });

export type AppType = typeof app;

const port = 3000
console.log(`Server is running on http://localhost:${port}`)

serve({
  fetch: app.fetch,
  port
})

