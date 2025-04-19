import type React from 'react';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="container mx-auto py-10">
            <div className="flex-1">{children}</div>
        </div>
    );
}
