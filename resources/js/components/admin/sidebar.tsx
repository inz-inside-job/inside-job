import { Link, usePage } from '@inertiajs/react';
import clsx from 'clsx';
import { Building2, LayoutDashboard } from 'lucide-react';

export function AdminSidebar() {
    const pathname = usePage().url;

    const navItems = [
        {
            title: 'Submissions',
            href: '/admin',
            icon: LayoutDashboard,
        },
        {
            title: 'Claims',
            href: '/admin/claims',
            icon: Building2,
        },
    ];

    return (
        <div>
            <div className="flex h-full max-h-screen flex-col gap-2">
                <div className="flex items-center border-b px-4 py-2">
                    <Link href="/admin" className="flex items-center gap-2 font-semibold">
                        <Building2 className="h-6 w-6" />
                        <span>Dashboard</span>
                    </Link>
                </div>
                <div className="flex-1 overflow-auto py-2">
                    <nav className="grid items-start px-2 text-sm font-medium">
                        {navItems.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={clsx(
                                    'text-muted-foreground hover:text-primary flex items-center gap-3 rounded-lg px-3 py-2 transition-all',
                                    pathname === item.href && 'bg-muted text-primary',
                                )}
                            >
                                <item.icon className="h-4 w-4" />
                                {item.title}
                            </Link>
                        ))}
                    </nav>
                </div>
            </div>
        </div>
    );
}
