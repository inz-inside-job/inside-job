import { CompaniesHero } from '@/components/companies-hero';
import { CompanyFilters } from '@/components/company-filters';
import { CompanyGrid } from '@/components/company-grid';

export default function CompaniesPage() {
    return (
        <div>
            <CompaniesHero />
            <div className="container mx-auto w-full px-4 py-8">
                <div className="flex flex-col gap-6 lg:flex-row lg:gap-8">
                    <aside className="w-full shrink-0 lg:w-80 xl:w-96">
                        <CompanyFilters />
                    </aside>
                    <div className="flex-1">
                        <CompanyGrid />
                    </div>
                </div>
            </div>
        </div>
    );
}
