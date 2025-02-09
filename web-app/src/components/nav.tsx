import { Home, Search, Plus } from 'lucide-react'
import { Link } from '@tanstack/react-router'
import { ThemeToggle } from './theme-toggle'
import { cn } from '@/lib/utils'

const navItems = [
    { to: '/', icon: Home, label: 'Home' },
    { to: '/search', icon: Search, label: 'Search' },
    { to: '/add', icon: Plus, label: 'Add' },
] as const

export function Nav() {
    return (
        <>
            {/* Desktop Navigation */}
            <nav className="hidden md:block">
                <div className="p-2 flex justify-between items-center">
                    <div className="flex gap-4">
                        {navItems.map(({ to, icon: Icon, label }) => (
                            <Link
                                key={to}
                                to={to}
                                className={cn(
                                    'flex items-center gap-2 px-3 py-2 rounded-md hover:bg-accent [&.active]:font-bold [&.active]:bg-accent'
                                )}
                            >
                                <Icon className="h-4 w-4" />
                                <span>{label}</span>
                            </Link>
                        ))}
                    </div>
                    <ThemeToggle />
                </div>
                <hr />
            </nav>

            {/* Mobile Navigation */}
            <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-background border-t">
                <div className="flex justify-around items-center">
                    {navItems.map(({ to, icon: Icon, label }) => (
                        <Link
                            key={to}
                            to={to}
                            className={cn(
                                'flex flex-col items-center gap-1 px-3 py-2 [&.active]:font-bold'
                            )}
                        >
                            <Icon className="h-5 w-5" />
                            <span className="text-xs">{label}</span>
                        </Link>
                    ))}
                    <div className="flex flex-col items-center gap-1 px-3 py-2">
                        <ThemeToggle />
                        <span className="text-xs">Theme</span>
                    </div>
                </div>
            </nav>
        </>
    )
} 