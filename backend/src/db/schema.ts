import { pgTable, text, integer, timestamp, boolean, decimal } from "drizzle-orm/pg-core";
import { pgEnum } from "drizzle-orm/pg-core";

// Define enums
export const priceUnitEnum = pgEnum('price_unit_enum', ['each', 'per pack', 'per kg', 'per lb', 'per g', 'per oz', 'per mL', 'per L']);
export const weightVolumeUnitEnum = pgEnum('weight_volume_unit_enum', ['kg', 'lb', 'oz', 'g', 'mL', 'L']);

export const user = pgTable("user", {
    id: text("id").primaryKey(),
    name: text('name').notNull(),
    email: text('email').notNull().unique(),
    emailVerified: boolean('email_verified').notNull(),
    image: text('image'),
    createdAt: timestamp('created_at').notNull(),
    updatedAt: timestamp('updated_at').notNull()
});

export const session = pgTable("session", {
    id: text("id").primaryKey(),
    expiresAt: timestamp('expires_at').notNull(),
    token: text('token').notNull().unique(),
    createdAt: timestamp('created_at').notNull(),
    updatedAt: timestamp('updated_at').notNull(),
    ipAddress: text('ip_address'),
    userAgent: text('user_agent'),
    userId: text('user_id').notNull().references(() => user.id, { onDelete: 'cascade' })
});

export const account = pgTable("account", {
    id: text("id").primaryKey(),
    accountId: text('account_id').notNull(),
    providerId: text('provider_id').notNull(),
    userId: text('user_id').notNull().references(() => user.id, { onDelete: 'cascade' }),
    accessToken: text('access_token'),
    refreshToken: text('refresh_token'),
    idToken: text('id_token'),
    accessTokenExpiresAt: timestamp('access_token_expires_at'),
    refreshTokenExpiresAt: timestamp('refresh_token_expires_at'),
    scope: text('scope'),
    password: text('password'),
    createdAt: timestamp('created_at').notNull(),
    updatedAt: timestamp('updated_at').notNull()
});

export const verification = pgTable("verification", {
    id: text("id").primaryKey(),
    identifier: text('identifier').notNull(),
    value: text('value').notNull(),
    expiresAt: timestamp('expires_at').notNull(),
    createdAt: timestamp('created_at'),
    updatedAt: timestamp('updated_at')
});

export const item = pgTable("item", {
    id: text("id").primaryKey(),
    itemName: text("item_name").notNull(),
    price: decimal("price", { precision: 10, scale: 2 }).$type<number>().notNull(),
    priceUnit: priceUnitEnum("price_unit").notNull(),
    origin: text("origin"),

    // Pack details
    packCount: integer("pack_count"),

    // Weight/Volume details
    totalWeightOrVolume: decimal("total_weight_or_volume", { precision: 10, scale: 2 }).$type<number>(),
    totalWeightOrVolumeUnit: weightVolumeUnitEnum("total_weight_or_volume_unit"),

    // Additional details
    aliases: text("aliases").array(),
    discountReason: text("discount_reason"),

    // References and timestamps
    userId: text("user_id").notNull().references(() => user.id, { onDelete: 'cascade' }),
    createdAt: timestamp("created_at").notNull(),
    updatedAt: timestamp("updated_at").notNull()
});