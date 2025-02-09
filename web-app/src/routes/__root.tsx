import { createRootRoute, Link, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'
import { Toaster } from '@/components/ui/toaster'

export const Route = createRootRoute({
    component: () => (
        <>
            <div className="p-2 flex gap-2">
                <Link to="/" className="[&.active]:font-bold">
                    Home
                </Link>
                <Link to="/search" className="[&.active]:font-bold">
                    Search
                </Link>
                <Link to="/add" className="[&.active]:font-bold">
                    Add
                </Link>
            </div>
            <hr />
            <Outlet />
            <Toaster />
            {import.meta.env.DEV && <TanStackRouterDevtools />}
        </>
    ),
})