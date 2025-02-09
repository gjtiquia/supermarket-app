import { createFileRoute } from '@tanstack/react-router'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

const searchFormSchema = z.object({
    query: z.string().min(1, "Please enter a search term")
})

export const Route = createFileRoute('/search')({
    component: Search,
})

function Search() {
    const form = useForm<z.infer<typeof searchFormSchema>>({
        resolver: zodResolver(searchFormSchema),
        defaultValues: {
            query: "",
        },
    })

    function onSubmit(values: z.infer<typeof searchFormSchema>) {
        // TODO: Implement search functionality
        console.log(values)
    }

    return (
        <div className="container mx-auto py-6 space-y-6">
            <div>
                <h1 className="text-3xl font-bold">Search Items</h1>
                <p className="text-muted-foreground">Search for items in the database</p>
            </div>

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <FormField
                        control={form.control}
                        name="query"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Search Term</FormLabel>
                                <FormControl>
                                    <Input placeholder="eg. Apples" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <Button type="submit">Search</Button>
                </form>
            </Form>

            <div className="space-y-4">
                <h2 className="text-2xl font-semibold">Results</h2>
                <div className="rounded-lg border p-4">
                    <p className="text-muted-foreground">No results yet. Try searching for something!</p>
                </div>
            </div>
        </div>
    )
}
