import { zodResolver } from "@hookform/resolvers/zod"
import { useForm, useWatch } from "react-hook-form"
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
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { client } from "@/backend"
import { useAddItem } from "@/lib/mutations/useAddItem"

import { addItemFormSchema } from "../../../backend/src/api/item/add"

export function AddItemForm() {
    const addItemMutation = useAddItem()
    // Define your form.
    const form = useForm<z.infer<typeof addItemFormSchema>>({
        resolver: zodResolver(addItemFormSchema),
        defaultValues: {
            // === Basic ===
            itemName: "",
            price: 0,
            priceUnit: "each",
            origin: "",

            // === Advanced ===
            // TODO : how to handle validation if these are optional?
            // TODO : and how to let the server know that, these are just defaults...? and should NOT be used in consideration...?
            // TODO : perhaps a... "show advanced settings" bool? but then even so, not all will be input😂
            // TODO : or i guess in the logic that uses the values, gotta ignore invalid values too (ie. dun divide by zero, negative numbers)
            packCount: 0,
            totalWeightOrVolume: 0,
            aliases: [],
            discountReason: "",
        },
    })

    // Subscribe to the value of "priceUnit", rerender if changes (cuz we do conditional rendering with this)
    const priceUnit = useWatch({ control: form.control, name: "priceUnit" })

    // Define a submit handler.
    function onSubmit(values: z.infer<typeof addItemFormSchema>) {
        addItemMutation.mutate(values, {
            onSuccess: () => {
                form.reset()
                // TODO: Show success toast/notification
            },
            onError: (error) => {
                // TODO: Show error toast/notification
                console.error("Failed to add item:", error)
            }
        })
    }

    // TODO : for string array input
    /*
    shadcn didnt implement one yet, despite heavy community pushes
    - https://github.com/shadcn-ui/ui/issues/3647

    react hook form docs has some example code of implementing
    - https://react-hook-form.com/docs/usefieldarray

    i suppose the nicest way would be to hv tag/badge inputs
    but good old (+) button to add item, and (x) to delete item, might just work
    (of cuz thats more work tho😂)
    */

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                    control={form.control}
                    name="itemName"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Item Name</FormLabel>
                            <FormControl>
                                <Input placeholder="eg. Apples" {...field} />
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
                        name="priceUnit"
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

                <FormField
                    control={form.control}
                    name="origin"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Origin</FormLabel>
                            <FormControl>
                                <Input placeholder="eg. Costco" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <Accordion type="single" collapsible>
                    <AccordionItem value="item-1">
                        <AccordionTrigger>Advanced</AccordionTrigger>
                        <AccordionContent className="space-y-4">
                            {
                                priceUnit === "per pack" &&
                                <FormField
                                    control={form.control}
                                    name="packCount"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Pack Count</FormLabel>
                                            <FormControl>
                                                <Input type="number" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            }
                            {
                                (priceUnit === "per pack" || priceUnit === "each") &&
                                <div className="grid grid-cols-2 gap-4">
                                    <FormField
                                        control={form.control}
                                        name="totalWeightOrVolume"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Total Weight or Volume</FormLabel>
                                                <FormControl>
                                                    <Input type="number" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="totalWeightOrVolumeUnit"
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
                                                        <SelectItem value="kg">kg</SelectItem>
                                                        <SelectItem value="lb">lb</SelectItem>
                                                        <SelectItem value="g">g</SelectItem>
                                                        <SelectItem value="oz">oz</SelectItem>
                                                        <SelectItem value="mL">mL</SelectItem>
                                                        <SelectItem value="L">L</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            }


                            {/* // TODO : aliases */}

                            <FormField
                                control={form.control}
                                name="discountReason"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Discount Reason</FormLabel>
                                        <FormControl>
                                            <Input placeholder="eg. Weekend Discount" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <div className="pb-1"></div>
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>

                <div className="py-1"></div>
                <Button
                    type="submit"
                    disabled={addItemMutation.isPending}
                >
                    {addItemMutation.isPending ? "Adding..." : "Submit"}
                </Button>
            </form>
        </Form>
    )
}
