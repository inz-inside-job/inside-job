import { CompaniesHero } from '@/components/companies-hero';
import { CompanyFilters } from '@/components/company-filters';

export default function CompaniesPage() {
    return (
        <div>
            <CompaniesHero />
            <div className="container mx-auto px-4 py-8">
                <div className="flex flex-col gap-6 lg:flex-row">
                    <aside className="w-full shrink-0 lg:w-64">
                        <CompanyFilters />
                    </aside>
                    <div className="flex-1"></div>
                </div>
            </div>
        </div>
    );
}
