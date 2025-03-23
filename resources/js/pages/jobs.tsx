import { JobFilters } from '@/components/jobs/jobs-filters';
import { JobsHero } from '@/components/jobs/jobs-hero';
import { Head } from '@inertiajs/react';

export default function CompaniesPage() {
    return (
        <>
            <Head title="Jobs" />
            <JobsHero />
            <div className="container mx-auto w-full px-4 py-8">
                <div className="flex flex-col gap-6 lg:flex-row lg:gap-8">
                    <aside className="w-full shrink-0 lg:w-80 xl:w-96">
                        <JobFilters />
                    </aside>
                    <div className="flex-1"></div>
                </div>
            </div>
        </>
    );
}
