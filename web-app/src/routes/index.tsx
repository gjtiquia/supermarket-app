import { createFileRoute } from '@tanstack/react-router'
import { SignUpForm } from '@/components/signUpForm'

export const Route = createFileRoute('/')({
    component: Index,
})

function Index() {
    return (
        <div className="container mx-auto py-6 max-w-md">
            <SignUpForm />
        </div>
    )
}
