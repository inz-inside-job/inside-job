import { AdminSidebar } from '@/components/admin/sidebar';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="container mx-auto flex flex-col px-4 py-8 lg:flex-row">
            <AdminSidebar />
            <div className={'w-full px-4'}>{children}</div>
        </div>
    );
}
