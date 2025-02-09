import { createRootRoute, Link, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'
import { Toaster } from '@/components/ui/toaster'
import { ThemeToggle } from '@/components/theme-toggle'

export const Route = createRootRoute({
    component: () => (
        <div className="min-h-screen">
            <div className="p-2 flex justify-between items-center">
                <div className="flex gap-2">
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
                <ThemeToggle />
            </div>
            <hr />
            <Outlet />
            <Toaster />
            {import.meta.env.DEV && <TanStackRouterDevtools />}
        </div>
    ),
})