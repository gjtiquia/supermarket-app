import { Hono } from "hono";

const app = new Hono();

app.get("/api/recent-items", (c) => {
    return c.json<RecentItems>({
        items: [
            { name: "pumpkin" },
        ],
    });
});

type RecentItems = {
    items: Item[];
};

type Item = {
    name: string;
};

Deno.serve(app.fetch);
