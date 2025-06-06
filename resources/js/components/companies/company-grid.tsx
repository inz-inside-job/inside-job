import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { QueryBuilderParams, useGetQueryParams, withQueryBuilderParams } from '@/lib/utils';
import type { PageProps } from '@inertiajs/core';
import { router, usePage } from '@inertiajs/react';
import { useCallback, useState } from 'react';
import WhenVisible from '../when-visible';
import CompanyCard from './company-card';
import SubmitCompanyButton from './submit-company-button';

interface CompanyPageProps extends PageProps {
    companies: App.Data.Companies.CompanyData[];
    next_cursor: string | null;
}

export function CompanyGrid() {
    const { companies, next_cursor } = usePage<CompanyPageProps>().props;
    const [sortOption, setSortOption] = useState('rating');

    const queryParams = useGetQueryParams();

    const onSortChange = useCallback(
        (sortValue: string) => {
            setSortOption(sortValue);
            const sorts = {} as NonNullable<QueryBuilderParams['sorts']>;

            if (sortValue !== 'rating') {
                sorts[sortValue] = 'desc';
            }

            const query = withQueryBuilderParams({
                ...queryParams,
                sorts,
                cursor: undefined,
            });

            router.get(route('companies'), query, {
                only: ['companies', 'next_cursor'],
                reset: ['companies'],
                replace: true,
                preserveState: true,
                preserveScroll: true,
            });
        },
        [queryParams],
    );

    const onLoadMore = useCallback(() => {
        router.reload({ data: { cursor: next_cursor! }, replace: true, only: ['companies', 'next_cursor'] });
    }, [next_cursor]);

    return (
        <div>
            <div className="mb-6 flex items-center justify-between">
                <h2 className="text-xl font-bold">{companies.length} Companies</h2>
                <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-500">Sort by:</span>
                    <Select defaultValue="rating" value={sortOption} onValueChange={onSortChange}>
                        <SelectTrigger className="w-[180px] cursor-pointer">
                            <SelectValue placeholder="Sort by" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem className={'cursor-pointer'} value="rating">
                                Highest Rating
                            </SelectItem>
                            <SelectItem className={'cursor-pointer'} value="reviews">
                                Most Reviews
                            </SelectItem>
                            <SelectItem className={'cursor-pointer'} value="recommend">
                                Most Recommended
                            </SelectItem>
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
                <WhenVisible
                    params={{
                        only: ['companies', 'next_cursor'],
                        replace: true,
                        data: { cursor: next_cursor },
                    }}
                    fallback={<p>Loading</p>}
                    always={!!next_cursor}
                    disabled={!next_cursor}
                    buffer={500}
                >
                    <div className="flex flex-col items-center gap-2">
                        <Button variant="outline" className="mx-auto" onClick={onLoadMore} disabled={!next_cursor}>
                            Load More Companies
                        </Button>
                        <SubmitCompanyButton />
                    </div>
                </WhenVisible>
            </div>
        </div>
    );
}
