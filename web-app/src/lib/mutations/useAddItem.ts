import { useMutation } from "@tanstack/react-query"
import { z } from "zod"
import { client } from "@/backend"
import { addItemFormSchema } from "../../../../backend/src/api/item/add"

export function useAddItem() {
    return useMutation({
        mutationFn: async (values: z.infer<typeof addItemFormSchema>) => {
            const response = await client.api.item.add.$post({
                json: values
            })
            return response
        }
    })
} 