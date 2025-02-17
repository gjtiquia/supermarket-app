import { SignIn } from '@/components/auth/sign-in'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/account')({
    component: Account,
})

function Account() {
    return (
        <div className='container mx-auto py-6 max-w-md'>
            <SignIn />
        </div>
    )
} 