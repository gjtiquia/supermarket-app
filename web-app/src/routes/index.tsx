import { createFileRoute } from '@tanstack/react-router'
import { authClient } from '@/lib/auth'
export const Route = createFileRoute('/')({
    component: Index,
})

function Index() {

    // TODO: Docs: https://www.better-auth.com/docs/authentication/email-password

    async function handleLoginAsync() {
        const response = await authClient.signUp.email({
            email: "test@test.com",
            password: "test",
            name: "test",
        })

        console.log(response)
    }

    return (
        <div className="container mx-auto py-6 space-y-6">
            <input type="email" placeholder="Email" />
            <input type="password" placeholder="Password" />
            <button onClick={handleLoginAsync}>Login</button>
        </div>
    )
}
