import { z } from "zod";

export const addItemFormSchema = z.object({
    name: z.string().min(1, {
        message: "Item name must be at least 1 character.",
    }),
    price: z.coerce.number(),
    unit: z.enum(["each", "per pack", "per kg", "per lb", "per g", "per oz", "per mL", "per L"])
})

