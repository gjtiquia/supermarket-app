import { Hono } from "hono";

type RecentItems = {
    items: Item[];
};

type Item = {
    name: string;
};

const app = new Hono()
    .get("/recent-items", (c) => {
        return c.json<RecentItems>({
            items: [
                { name: "pumpkin" },
            ],
        });
    });

export default app;