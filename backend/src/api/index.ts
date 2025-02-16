import { Hono } from "hono";
import item from "./item"
import sandbox from "./sandbox"
import auth from "./auth"

const app = new Hono()
    .route("/sandbox", sandbox)
    .route("/item", item)
    .route("/auth", auth)

export default app;