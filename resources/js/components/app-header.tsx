import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useInitials } from '@/hooks/use-initials';
import { useMediaQuery } from '@/hooks/use-media-query';
import { Link, router, usePage } from '@inertiajs/react';
import clsx from 'clsx';
import { Menu, Search, X } from 'lucide-react';
import { useCallback, useMemo, useState } from 'react';
import AppLogoIcon from './app-logo-icon';
import AppearanceToggleDropdown from './appearance-dropdown';
import LoginModal from './login-modal';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from './ui/dropdown-menu';
import { UserMenuContent } from './user-menu-content';

export function AppHeader() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

    const page = usePage();
    const { auth } = page.props;
    const getInitials = useInitials();

    const isDesktop = useMediaQuery('(min-width: 1024px)');

    const openLoginModal = useCallback(() => {
        setIsMenuOpen(false);
        setIsLoginModalOpen(true);
    }, [setIsMenuOpen, setIsLoginModalOpen]);

    const inAuthPage = useMemo(() => page.url.startsWith('/auth'), [page.url]);

    return (
        <header className="bg-background sticky top-0 z-50 border-b">
            <div className="container mx-auto flex items-center justify-between px-4 py-3">
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
                        <Link href={route('companies')} className="text-sm font-medium transition-colors hover:text-emerald-600">
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
                            {auth.user ? (
                                isMenuOpen && !isDesktop ? (
                                    <div className="flex w-full items-center gap-2">
                                        <Avatar className="size-8 overflow-hidden rounded-full">
                                            <AvatarImage src={auth.user.avatar} alt={auth.user.name} />
                                            <AvatarFallback className="rounded-lg bg-neutral-200 text-black dark:bg-neutral-700 dark:text-white">
                                                {getInitials(auth.user.name)}
                                            </AvatarFallback>
                                        </Avatar>
                                        <div className="flex w-full gap-2">
                                            <Link href={route('profile.edit')} className="w-full" onClick={() => setIsMenuOpen(false)}>
                                                <Button variant="outline" className="w-full cursor-pointer" size="sm">
                                                    Settings
                                                </Button>
                                            </Link>
                                            <Link href={route('logout')} method="post" className="w-full" onClick={() => setIsMenuOpen(false)}>
                                                <Button size="sm" className="bg-primary w-full cursor-pointer hover:bg-orange-600">
                                                    Logout
                                                </Button>
                                            </Link>
                                        </div>
                                    </div>
                                ) : (
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="ghost" className="size-10 rounded-full p-1">
                                                <Avatar className="size-8 overflow-hidden rounded-full">
                                                    <AvatarImage src={auth.user.avatar} alt={auth.user.name} />
                                                    <AvatarFallback className="rounded-lg bg-neutral-200 text-black dark:bg-neutral-700 dark:text-white">
                                                        {getInitials(auth.user.name)}
                                                    </AvatarFallback>
                                                </Avatar>
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent className="w-56" align="end">
                                            <UserMenuContent user={auth.user} />
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                )
                            ) : (
                                <>
                                    <LoginModal open={isLoginModalOpen} onOpenChange={setIsLoginModalOpen} />
                                    <Button
                                        variant="outline"
                                        className="w-full cursor-pointer"
                                        size="sm"
                                        onClick={() => {
                                            setIsMenuOpen(false);

                                            if (inAuthPage) {
                                                router.visit(route('login'));
                                                return;
                                            }

                                            openLoginModal();
                                        }}
                                    >
                                        Log In
                                    </Button>
                                    <Link href={route('register')} onClick={() => setIsMenuOpen(false)} className="w-full">
                                        <Button size="sm" className="bg-primary w-full cursor-pointer hover:bg-orange-600">
                                            Sign Up
                                        </Button>
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}
