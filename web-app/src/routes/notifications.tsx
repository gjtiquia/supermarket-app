import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/notifications')({
    component: NotificationsPage,
})

function NotificationsPage() {
    return (
        <div className="container mx-auto py-6 max-w-md">
            <p>TODO</p>
        </div>
    )
} 