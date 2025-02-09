import { createFileRoute } from '@tanstack/react-router'
import { useState, useEffect } from 'react';
import { client } from '@/lib/hono';

type WeightUnit = "kg" | "lb" | "g" | "oz";
type VolumeUnit = "mL" | "L";

type WeightOrVolume = {
    value: number;
    unit: WeightUnit | VolumeUnit;
}

type PriceUnit = {
    type: "each";
    weightOrVolume?: WeightOrVolume;
} | {
    type: "per kg" | "per lb" | "per oz" | "per g" | "per mL" | "per L";
} | {
    type: "per pack";
    packCount?: number;
    weightOrVolume?: WeightOrVolume;
}

type Price = {
    price: number;
    unit: PriceUnit;
    origin: string;
    discountReason?: string;
    imageUrls?: string[];
}

type Item = {
    name: string;
    aliases?: string[];
    recentReportedPrice: Price;
    lowestReportedPrice: Price;
}

type RecentItems = {
    items: Item[];
}

export const Route = createFileRoute('/')({
    component: Index,
})

function Index() {
    const [items, setItems] = useState<Item[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        getItemsAsync();

        async function getItemsAsync() {
            try {
                const response = await client.api.item.recent.$get();
                const json = await response.json() as RecentItems;
                setItems(json.items);
            } catch (error) {
                console.error('Failed to fetch items:', error);
            } finally {
                setIsLoading(false);
            }
        }
    }, [])

    return (
        <div className="container mx-auto py-6 space-y-6">
            <div>
                <h1 className="text-3xl font-bold">Recent Items</h1>
                <p className="text-muted-foreground">View recently added items in the database</p>
            </div>

            <div className="space-y-4">
                {isLoading ? (
                    <div className="rounded-lg border p-4">
                        <p className="text-muted-foreground">Loading items...</p>
                    </div>
                ) : items.length === 0 ? (
                    <div className="rounded-lg border p-4">
                        <p className="text-muted-foreground">No items found. Try adding some items first!</p>
                    </div>
                ) : (
                    <div className="grid gap-4">
                        {items.map((item, index) => (
                            <div key={index} className="rounded-lg border p-4 space-y-2">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <h3 className="text-lg font-semibold">{item.name}</h3>
                                        {item.aliases && item.aliases.length > 0 && (
                                            <p className="text-sm text-muted-foreground">Also known as: {item.aliases.join(", ")}</p>
                                        )}
                                    </div>
                                    <div className="text-right">
                                        <p className="font-medium">${item.recentReportedPrice.price} {item.recentReportedPrice.unit.type}</p>
                                        <p className="text-sm text-muted-foreground">From: {item.recentReportedPrice.origin}</p>
                                    </div>
                                </div>

                                {item.lowestReportedPrice.price < item.recentReportedPrice.price && (
                                    <div className="mt-2 text-sm">
                                        <p className="text-green-600">
                                            Lowest seen: ${item.lowestReportedPrice.price} {item.lowestReportedPrice.unit.type}
                                            {item.lowestReportedPrice.discountReason && ` (${item.lowestReportedPrice.discountReason})`}
                                        </p>
                                        <p className="text-muted-foreground">At: {item.lowestReportedPrice.origin}</p>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}
