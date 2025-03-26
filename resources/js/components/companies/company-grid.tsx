import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useGetQueryParams, withQueryBuilderParams } from '@/lib/utils';
import { router } from '@inertiajs/react';
import { useCallback, useState } from 'react';
import CompanyCard from './company-card';

export function CompanyGrid({ companies }: { companies: App.Data.CompanyData[] }) {
    const queryParameters = useGetQueryParams();
    const [sortOption, setSortOption] = useState('rating');

    const onSortChange = useCallback((sortValue: string) => {
        setSortOption(sortValue);
        const sort = sortValue === 'rating' ? null : sortValue;

        const query = withQueryBuilderParams({
            filters: queryParameters.filters,
            sorts: sort === null ? {} : { [sort]: 'desc' },
        });

        router.get(route('companies', query), undefined, { replace: true, preserveState: true, preserveScroll: true });
    }, [queryParameters.filters]);

    return (
        <div>
            <div className="mb-6 flex items-center justify-between">
                <h2 className="text-xl font-bold">{companies.length} Companies</h2>
                <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-500">Sort by:</span>
                    <Select defaultValue="rating" value={sortOption} onValueChange={onSortChange}>
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Sort by" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="rating">Highest Rating</SelectItem>
                            <SelectItem value="reviews">Most Reviews</SelectItem>
                            <SelectItem value="recommend">Most Recommended</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-1 lg:grid-cols-1 xl:grid-cols-2 2xl:grid-cols-2">
                {companies.map((company) => (
                    <CompanyCard key={company.id} company={company} />
                ))}
            </div>

            <div className="mt-8 text-center">
                <Button variant="outline" className="mx-auto">
                    Load More Companies
                </Button>
            </div>
        </div>
    );
}
