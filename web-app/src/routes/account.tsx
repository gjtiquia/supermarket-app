import { SignIn } from '@/components/auth/sign-in'
import { createFileRoute } from '@tanstack/react-router'
import { authClient } from '@/lib/auth'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { Button } from '@/components/ui/button'
import { useToast } from '@/components/ui/use-toast'
import { useNavigate } from '@tanstack/react-router'
import { Loader2 } from 'lucide-react'
import { queryClient, QUERY_KEYS } from "@/lib/tanstack";

export const Route = createFileRoute('/account')({
    component: Account,
})

function Account() {
    const { toast } = useToast()
    const navigate = useNavigate()
    const queryClient = useQueryClient()

    const { data: session, isLoading: isSessionLoading } = useQuery({
        queryKey: [QUERY_KEYS.session],
        queryFn: async () => {
            const response = await authClient.getSession()
            if (response.error) {
                return null
            }
            return response.data
        }
    })

    const signOutMutation = useMutation({
        mutationFn: async () => {
            const response = await authClient.signOut()
            if (response.error) {
                throw new Error(response.error.message)
            }
            return response.data
        },
        onError: () => {
            toast({
                variant: "destructive",
                title: "Error",
                description: "Failed to sign out. Please try again.",
            })
        },
        onSuccess: () => {
            toast({
                title: "Success",
                description: "Signed out successfully",
                variant: "default"
            })
            // Invalidate the session query to update the UI
            queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.session] })
            navigate({ to: "/account" })
        }
    })

    if (isSessionLoading) {
        return (
            <div className='h-full flex items-center justify-center'>
                <div>Loading...</div>
            </div>
        )
    }

    return (
        <div className='h-full flex items-center justify-center'>
            <div className='max-w-md w-full px-4'>
                {session ? (
                    <div className='space-y-4'>
                        <h2 className='text-2xl font-semibold'>Welcome, {session.user.name}</h2>
                        <p className='text-muted-foreground'>Email: {session.user.email}</p>
                        <Button
                            onClick={() => signOutMutation.mutate()}
                            variant="destructive"
                            className='w-full'
                            disabled={signOutMutation.isPending}
                        >
                            {signOutMutation.isPending ? (
                                <Loader2 size={16} className="animate-spin mr-2" />
                            ) : null}
                            Sign Out
                        </Button>
                    </div>
                ) : (
                    <SignIn />
                )}
            </div>
        </div>
    )
} 