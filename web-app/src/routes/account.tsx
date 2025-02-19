import { SignIn } from '@/components/auth/sign-in'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/account')({
    component: Account,
})

function Account() {
    // TODO : fix the center alignment
    return (
        <div className='h-full flex items-center justify-center'>
            <div className='max-w-md w-full px-4'>
                <SignIn />
            </div>
        </div>
    )
} 