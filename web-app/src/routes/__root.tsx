import { createRootRoute, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'
import { Toaster } from '@/components/ui/toaster'
import { Nav } from '@/components/nav'

export const Route = createRootRoute({
    component: () => (
        <div className="min-h-dvh flex flex-col">
            <div className="flex-1 md:pl-[3.5rem] xl:pl-52 pb-[4.5rem] md:pb-0">
                <Nav />
                <Outlet />
            </div>
            <Toaster />
            {/* {import.meta.env.DEV && <TanStackRouterDevtools />} */}
        </div>
    ),
})