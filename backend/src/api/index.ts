import { Hono } from "hono";
import item from "./item"

const app = new Hono()
    .route("/item", item);

export default app;