import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { useMutation } from "@tanstack/react-query"

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
import { useToast } from "@/components/ui/use-toast"
import { authClient } from '@/lib/auth'

// Define the form schema with Zod
const signUpSchema = z.object({
    email: z.string().email("Please enter a valid email address"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string(),
    name: z.string().min(2, "Name must be at least 2 characters"),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
})

export function SignUpForm() {
    const { toast } = useToast()

    const form = useForm<z.infer<typeof signUpSchema>>({
        resolver: zodResolver(signUpSchema),
        defaultValues: {
            email: "",
            password: "",
            confirmPassword: "",
            name: "",
        },
    })

    const signUpMutation = useMutation({
        mutationFn: async (values: z.infer<typeof signUpSchema>) => {
            const { confirmPassword, ...signUpValues } = values
            const response = await authClient.signUp.email(signUpValues)

            if (response.error) {
                throw new Error(response.error.message)
            }

            return response.data
        }
    })

    function onSubmit(values: z.infer<typeof signUpSchema>) {
        signUpMutation.mutate(values, {
            onSuccess: (data) => {
                toast({
                    title: "Success",
                    description: `Account ${data.user.name} created successfully`,
                    variant: "default"
                })
                form.reset()
            },
            onError: (error) => {
                toast({
                    variant: "destructive",
                    title: "Error",
                    description: "Failed to create account. Please try again.",
                })
                console.error("Failed to create account:", error)
            }
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
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                                <Input placeholder="Enter your name" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input type="email" placeholder="Enter your email" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                                <Input type="password" placeholder="Enter your password" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="confirmPassword"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Confirm Password</FormLabel>
                            <FormControl>
                                <Input type="password" placeholder="Confirm your password" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />



                <Button
                    type="submit"
                    className="w-full"
                    disabled={signUpMutation.isPending}
                >
                    {signUpMutation.isPending ? "Creating account..." : "Sign Up"}
                </Button>
            </form>
        </Form>
    )
} 