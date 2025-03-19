import Heading from '@/components/heading';
import { cn } from '@/lib/utils';
import { type NavItem } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { type PropsWithChildren } from 'react';

const sidebarNavItems: NavItem[] = [
    {
        title: 'Profile',
        url: '/settings/profile',
        icon: null,
    },
    {
        title: 'Password',
        url: '/settings/password',
        icon: null,
    },
];

export default function SettingsLayout({ children }: PropsWithChildren) {
    const { url } = usePage();

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-[250px_1fr] lg:grid-cols-[300px_1fr] xl:gap-16">
                <div className="space-y-6">
                    <div>
                        <Heading title="Settings" description="Manage your profile and account settings" />
                    </div>

                    <nav className="flex flex-col space-y-2">
                        {sidebarNavItems.map((item) => (
                            <Link
                                href={item.url}
                                prefetch
                                className={cn('rounded-md px-4 py-3 font-medium', {
                                    'text-primary bg-primary/10': url === item.url,
                                    'text-muted-foreground hover:bg-muted transition-colors': url !== item.url,
                                })}
                            >
                                {item.title}
                            </Link>
                        ))}
                    </nav>
                </div>

                <div className="space-y-12">
                    <section className="space-y-8">{children}</section>
                </div>
            </div>
        </div>
    );
}
