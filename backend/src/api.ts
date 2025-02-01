import { Hono } from "hono";

type RecentItems = {
    items: Item[];
};

type Item = {
    name: string,
    aliases?: string[],
    recentReportedPrice: Price,
    lowestReportedPrice: Price,
};

type Price = {
    price: number,
    unit: PriceUnit,
    discountReason?: string,
    imageUrls?: string[],
}

type Weight = {
    value: number,
    unit: "kg" | "lb"
}

type PriceUnit = {
    type: "each",
    weight?: Weight,
} | {
    type: "per kg" | "per lb",
} | {
    type: "per pack",
    packCount?: number,
    weight?: Weight,
}

// TODO : once type is finalized should put into postgresDB
// TODO : type (schema) should think from the perspective of what information does one input, one row, one transaction
// TODO : everything else is queriable anyways and can be manipulated and cached
const dummyItems: RecentItems = {
    items: [
        {
            name: "small pumpkin",
            aliases: ["kalabasa", "kabocha squash", "mama squash", "japanese pumpkin"],
            recentReportedPrice: {
                price: 1.99,
                unit: { type: "per kg" }
            },
            lowestReportedPrice: {
                price: 1.58,
                unit: { type: "per kg" },
                discountReason: "Special Offer"
            },
        }
    ]
}

const app = new Hono()
    .get("/recent-items", (c) => {
        return c.json<RecentItems>(dummyItems);
    });

export default app;