import { Hono } from "hono";
import { zValidator } from '@hono/zod-validator'
import { type RecentItems, dummyItems } from "@/api/item/recent";
import { addItemFormSchema } from "@/api/item/add";
import { auth } from "@/lib/auth";
import { db } from "@/db";
import { item } from "@/db/schema";
import { v4 as uuidv4 } from 'uuid';

const app = new Hono()
    .get("/recent", (c) => c.json<RecentItems>(dummyItems))

    // For some weird reason "form" only accepts strings in client side RPC, so having a number type screws everything up
    // Solution: use json
    // .post("/add", zValidator("form", addItemFormSchema), (c) => {
    //     const form = c.req.valid("form");
    //     console.log(`${c.req.url}: ${JSON.stringify(form)}`)
    //     return c.body(null);
    // })
    .post("/add", zValidator("json", addItemFormSchema), async (c) => {
        const session = await auth.api.getSession({ headers: c.req.raw.headers })
        if (session === null)
            return c.json({ error: "Unauthorized" }, 401);

        const json = c.req.valid("json");

        console.log(`${c.req.url}`)
        console.log("user:", session.user.email);
        console.log("json:", json);

        const now = new Date();

        // Prepare data for database insertion
        const dbItem: typeof item.$inferInsert = {
            id: uuidv4(),
            itemName: json.itemName,
            price: json.price,
            priceUnit: json.priceUnit,
            origin: json.origin,

            // Optional fields based on priceUnit
            packCount: json.packCount,
            totalWeightOrVolume: json.totalWeightOrVolume,
            totalWeightOrVolumeUnit: json.totalWeightOrVolumeUnit,

            // Additional details
            aliases: json.aliases,
            discountReason: json.discountReason,

            // Required fields
            userId: session.user.id,
            createdAt: now,
            updatedAt: now,
        };

        await db.insert(item).values(dbItem);

        return c.json({
            message: `Added "${json.itemName}" at $${json.price} ${json.priceUnit}${json.origin ? ` from ${json.origin}` : ''}`,
            item: {
                ...json,
                created_at: now.toISOString(),
                modified_at: now.toISOString()
            }
        });
    })

export default app;