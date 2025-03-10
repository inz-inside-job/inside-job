import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAppearance } from '@/hooks/use-appearance';
import { Building2, Menu, Moon, Search, Sun, X } from 'lucide-react';
import { useState } from 'react';

export function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { appearance, updateAppearance } = useAppearance();

    return (
        <header className="foreground sticky top-0 z-50 border-b">
            <div className="mx-auto flex items-center justify-between px-4 py-3">
                <div className="flex items-center gap-8">
                    <a href="/" className="flex items-center gap-2">
                        <Building2 className="h-8 w-8 text-orange-500" />
                        <span className="text-xl font-bold">glassdoor</span>
                    </a>

                    <nav className="hidden items-center gap-6 lg:flex">
                        <a href="#" className="text-sm font-medium transition-colors hover:text-emerald-600">
                            Jobs
                        </a>
                        <a href="#" className="text-sm font-medium transition-colors hover:text-emerald-600">
                            Companies
                        </a>
                        <a href="#" className="text-sm font-medium transition-colors hover:text-emerald-600">
                            Salaries
                        </a>
                        <a href="#" className="text-sm font-medium transition-colors hover:text-emerald-600">
                            Interviews
                        </a>
                    </nav>
                </div>

                <div className="hidden items-center gap-4 lg:flex">
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => updateAppearance(appearance === 'dark' ? 'light' : 'dark')}
                        aria-label="Toggle theme"
                    >
                        {appearance === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                    </Button>
                    <div className="relative">
                        <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform text-gray-400" />
                        <Input className="w-[200px] pl-10 lg:w-[300px]" placeholder="Search jobs, companies..." />
                    </div>
                    <Button variant="outline" size="sm">
                        Sign In
                    </Button>
                    <Button size="sm" className="bg-orange-500 hover:bg-orange-600">
                        Sign Up
                    </Button>
                </div>

                <button className="lg:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                    {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                </button>
            </div>

            {/* Mobile menu */}
            {isMenuOpen && (
                <div className="border-t px-4 py-4 lg:hidden">
                    <nav className="mb-4 flex flex-col gap-4">
                        <a href="#" className="text-sm font-medium transition-colors hover:text-emerald-600">
                            Jobs
                        </a>
                        <a href="#" className="text-sm font-medium transition-colors hover:text-emerald-600">
                            Companies
                        </a>
                        <a href="#" className="text-sm font-medium transition-colors hover:text-emerald-600">
                            Salaries
                        </a>
                        <a href="#" className="text-sm font-medium transition-colors hover:text-emerald-600">
                            Interviews
                        </a>
                    </nav>
                    <div className="flex flex-col gap-3">
                        <div className="relative">
                            <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform text-gray-400" />
                            <Input className="pl-10" placeholder="Search jobs, companies..." />
                        </div>
                        <div className="flex gap-2">
                            <Button variant="outline" size="sm" className="flex-1">
                                Sign In
                            </Button>
                            <Button size="sm" className="flex-1 bg-orange-500 hover:bg-orange-600">
                                Sign Up
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </header>
    );
}
