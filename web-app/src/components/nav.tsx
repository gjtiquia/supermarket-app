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
            <nav className="hidden md:block sticky top-0 z-10 bg-background/80 backdrop-blur-sm">
                <div className="p-3 flex justify-between items-center max-w-7xl mx-auto px-4">
                    <div className="flex gap-6">
                        {navItems.map(({ to, icon: Icon, label }) => (
                            <Link
                                key={to}
                                to={to}
                                className={cn(
                                    'flex items-center gap-2.5 px-4 py-2 rounded-md transition-all duration-200',
                                    'hover:bg-accent/80 hover:scale-105',
                                    '[&.active]:font-medium [&.active]:bg-accent [&.active]:scale-105 [&.active]:shadow-sm'
                                )}
                            >
                                <Icon className="h-[18px] w-[18px]" />
                                <span>{label}</span>
                            </Link>
                        ))}
                    </div>
                    <ThemeToggle />
                </div>
                <hr className="opacity-50" />
            </nav>

            {/* Mobile Navigation */}
            <nav className="md:hidden fixed bottom-0 left-0 right-0 z-10 transition-colors duration-300">
                <div className="bg-gradient-to-t from-background/95 to-background/60 backdrop-blur-md border-t shadow-lg">
                    <div className="flex justify-around items-center max-w-md mx-auto">
                        {navItems.map(({ to, icon: Icon, label }) => (
                            <Link
                                key={to}
                                to={to}
                                className={cn(
                                    'flex flex-col items-center gap-1 px-4 py-2.5 relative transition-all duration-200',
                                    'hover:text-primary active:scale-95',
                                    '[&.active]:text-primary [&.active]:font-medium [&.active]:scale-105',
                                    '[&.active]:before:absolute [&.active]:before:h-1 [&.active]:before:w-6',
                                    '[&.active]:before:bg-primary [&.active]:before:top-0 [&.active]:before:rounded-full',
                                    '[&.active]:before:animate-fade-in'
                                )}
                            >
                                <Icon className="h-5 w-5" />
                                <span className="text-[11px] font-medium opacity-85">{label}</span>
                            </Link>
                        ))}
                        <div className="flex flex-col items-center gap-1 px-4 py-2.5">
                            <ThemeToggle />
                            <span className="text-[11px] font-medium opacity-85">Theme</span>
                        </div>
                    </div>
                </div>
            </nav>
        </>
    )
} 