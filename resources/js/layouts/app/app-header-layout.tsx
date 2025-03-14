import { AppContent } from '@/components/app-content';
import { AppHeader } from '@/components/app-header';
import { AppShell } from '@/components/app-shell';
import { type BreadcrumbItem } from '@/types';
import { type PropsWithChildren } from 'react';

interface AppHeaderLayoutProps extends PropsWithChildren {
    breadcrumbs?: BreadcrumbItem[];
}

export default function AppHeaderLayout({ children }: AppHeaderLayoutProps) {
    return (
        <AppShell>
            <AppHeader />
            <AppContent>{children}</AppContent>
        </AppShell>
    );
}
