import { Hono } from "hono";
import item from "./item"
import sandbox from "./sandbox"

const app = new Hono()
    .route("/item", item)
    .route("/sandbox", sandbox)

export default app;