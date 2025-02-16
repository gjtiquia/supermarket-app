import { integer, pgTable, varchar } from "drizzle-orm/pg-core";

export const testTable = pgTable("test_users_table", {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    name: varchar({ length: 255 }).notNull(),
    age: integer().notNull(),
    email: varchar({ length: 255 }).notNull().unique(),
});
