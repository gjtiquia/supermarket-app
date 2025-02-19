import { useMutation } from "@tanstack/react-query"
import { client } from "@/lib/hono"
import { addItemFormSchema } from "backend/src/api/item/add"
import { z } from "zod"

export const useAddItem = () => {
    return useMutation({
        mutationFn: async (values: z.infer<typeof addItemFormSchema>) => {
            const response = await client.api.item.add.$post({
                json: values
            })

            const json = await response.json();
            if ("error" in json) {
                throw new Error(json.error)
            }

            return json
        }
    })
}

export const ITEM_MUTATIONS = {
    useAddItem,
} as const 