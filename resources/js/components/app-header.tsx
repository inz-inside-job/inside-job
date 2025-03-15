import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Link } from '@inertiajs/react';
import clsx from 'clsx';
import { Menu, Search, X } from 'lucide-react';
import { useState } from 'react';
import AppLogoIcon from './app-logo-icon';
import AppearanceToggleDropdown from './appearance-dropdown';

export function AppHeader() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <header className="bg-background sticky top-0 z-50 border-b">
            <div className="mx-auto flex items-center justify-between px-4 py-3">
                <div className="flex items-center gap-8">
                    <Link href="/" className="flex items-center gap-2">
                        <AppLogoIcon className="text-primary h-8 w-8" />
                        <span className="text-xl font-bold">InsideJob</span>
                    </Link>
                </div>

                <div className="flex items-center gap-4 lg:hidden">
                    <AppearanceToggleDropdown />
                    <Button className="bg-primary cursor-pointer hover:bg-orange-600" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                        {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                    </Button>
                </div>

                <div
                    className={clsx(
                        'bg-background absolute top-15 right-0 left-0 z-40 flex-col border-t px-4 py-4',
                        { flex: isMenuOpen },
                        'lg:static lg:ml-8 lg:flex lg:w-full lg:flex-row lg:border-t-0 lg:px-0 lg:py-0',
                        { hidden: !isMenuOpen },
                    )}
                >
                    <nav className="mb-4 flex flex-col gap-4 lg:mb-0 lg:w-full lg:flex-row lg:items-center lg:gap-6">
                        <Link href="#" className="text-sm font-medium transition-colors hover:text-emerald-600">
                            Jobs
                        </Link>
                        <Link href="#" className="text-sm font-medium transition-colors hover:text-emerald-600">
                            Companies
                        </Link>
                        <Link href="#" className="text-sm font-medium transition-colors hover:text-emerald-600">
                            Salaries
                        </Link>
                        <Link href="#" className="text-sm font-medium transition-colors hover:text-emerald-600">
                            Interviews
                        </Link>
                    </nav>

                    <div className="flex flex-col gap-3 lg:ml-auto lg:flex-row lg:items-center lg:gap-4">
                        <div className="hidden lg:block">
                            <AppearanceToggleDropdown />
                        </div>
                        <div className="relative w-full lg:w-auto">
                            <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform text-gray-400" />
                            <Input className="w-full pl-10 lg:w-[300px]" placeholder="Search jobs, companies..." />
                        </div>
                        <div className="flex w-full gap-3 lg:w-auto">
                            <Button variant="outline" className="w-full cursor-pointer" size="sm">
                                Login
                            </Button>
                            <Button size="sm" className="bg-primary w-full cursor-pointer hover:bg-orange-600">
                                Sign Up
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}
