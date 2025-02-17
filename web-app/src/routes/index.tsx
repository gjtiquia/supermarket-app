import { createFileRoute } from '@tanstack/react-router'
import { SignUpForm } from '@/components/signUpForm'
import { SignIn } from '@/components/auth/sign-in'
import { SignUp } from '@/components/auth/sign-up'

export const Route = createFileRoute('/')({
    component: Index,
})

function Index() {
    return (
        <div className="container mx-auto py-6 max-w-md">
            <SignUpForm />
            {/* <SignIn /> */}
            {/* <SignUp /> */}
        </div>
    )
}
