import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
    component: Index,
})

function Index() {
    return (
        <div className="container mx-auto py-6 max-w-md">
            <p>TODO</p>
        </div>
    )
}
