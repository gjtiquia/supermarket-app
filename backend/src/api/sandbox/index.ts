import { Hono } from "hono";
import { db } from "../../../src/db";
import { testTable as usersTable } from "../../../src/db/schema";
import { eq } from "drizzle-orm";

// TODO : production do not allow sandbox

const app = new Hono()
    .get("/create", async (c) => {
        const user: typeof usersTable.$inferInsert = {
            name: 'John',
            age: 30,
            email: 'john@example.com',
        };
        await db.insert(usersTable).values(user);

        console.log(`Added ${user.email}`)
        return c.text(`Added ${user.email}`)
    })

    .get("/read", async (c) => {
        const users = await db.select().from(usersTable);

        console.log("Read:", users);
        return c.json(users);
    })

    .get("/update", async (c) => {
        const email = "john@example.com"
        await db
            .update(usersTable)
            .set({
                age: 31,
            })
            .where(eq(usersTable.email, email));

        console.log(`Updated ${email}`)
        return c.text(`Updated ${email}`)
    })

    .get("/delete", async (c) => {
        const email = "john@example.com"
        await db.delete(usersTable).where(eq(usersTable.email, email));

        console.log(`Deleted ${email}`)
        return c.text(`Deleted ${email}`)
    })

export default app;