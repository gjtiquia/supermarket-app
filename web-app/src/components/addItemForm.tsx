import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { client } from "@/backend"

import { addItemFormSchema } from "../../../backend/src/api/item/add"

export function AddItemForm() {
    // 1. Define your form.
    const form = useForm<z.infer<typeof addItemFormSchema>>({
        resolver: zodResolver(addItemFormSchema),
        defaultValues: {
            name: "",
            price: 0,
            unit: "each",
        },
    })

    // 2. Define a submit handler.
    function onSubmit(values: z.infer<typeof addItemFormSchema>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        console.log(values)

        // TODO : use Tanstack Query mutation for backend error handling on the frontend
        client.api.item.add.$post({
            json: values
        })
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Item Name</FormLabel>
                            <FormControl>
                                <Input {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <div className="grid grid-cols-2 gap-4">
                    <FormField
                        control={form.control}
                        name="price"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Price ($)</FormLabel>
                                <FormControl>
                                    <Input type="number" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="unit"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Unit</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select a unit" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem value="each">each</SelectItem>
                                        <SelectItem value="per pack">per pack</SelectItem>
                                        <SelectItem value="per kg">per kg</SelectItem>
                                        <SelectItem value="per lb">per lb</SelectItem>
                                        <SelectItem value="per g">per g</SelectItem>
                                        <SelectItem value="per oz">per oz</SelectItem>
                                        <SelectItem value="per mL">per mL</SelectItem>
                                        <SelectItem value="per L">per L</SelectItem>
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <div className="py-1"></div>
                <Button type="submit">Submit</Button>
            </form>
        </Form>
    )
}
