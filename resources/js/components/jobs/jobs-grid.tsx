import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { QueryBuilderParams, useGetQueryParams, withQueryBuilderParams } from '@/lib/utils';
import { router, type PageProps } from '@inertiajs/core';
import { usePage } from '@inertiajs/react';
import { useCallback, useState } from 'react';
import WhenVisible from '../when-visible';
import JobCard from './job-card';

interface JobPageProps extends PageProps {
    jobs: App.Data.Jobs.JobData[];
    next_cursor: string | null;
}
export function JobList() {
    const { jobs, next_cursor } = usePage<JobPageProps>().props;

    const [sortOption, setSortOption] = useState('datePosted');

    const queryParams = useGetQueryParams();

    const onSortChange = useCallback(
        (sortValue: string) => {
            setSortOption(sortValue);
            const sorts = {} as NonNullable<QueryBuilderParams['sorts']>;

            if (sortValue !== 'datePosted') {
                sorts[sortValue] = 'desc';
            }

            const query = withQueryBuilderParams({
                ...queryParams,
                sorts,
                cursor: undefined,
            });

            router.get(route('jobs'), query, {
                only: ['jobs', 'next_cursor'],
                reset: ['jobs'],
                replace: true,
                preserveState: true,
                preserveScroll: true,
            });
        },
        [queryParams],
    );

    const onLoadMore = useCallback(() => {
        router.reload({ data: { cursor: next_cursor! }, replace: true, only: ['jobs', 'next_cursor'] });
    }, [next_cursor]);

    return (
        <div>
            <div className="mb-6 flex items-center justify-between">
                <h2 className="text-xl font-bold">{jobs.length} Jobs</h2>
                <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-500">Sort by:</span>
                    <Select defaultValue={sortOption} onValueChange={onSortChange}>
                        <SelectTrigger className="w-[180px] cursor-pointer">
                            <SelectValue placeholder="Sort by" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem className={'cursor-pointer'} value="datePosted">
                                Date Posted
                            </SelectItem>
                            <SelectItem className={'cursor-pointer'} value="relevance">
                                Relevance
                            </SelectItem>
                            <SelectItem className={'cursor-pointer'} value="salary">
                                Salary
                            </SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>

            <div className="space-y-4">
                {jobs.map((job) => (
                    <JobCard key={job.id} job={job} company={job.company} />
                ))}
            </div>

            <div className="mt-8 text-center">
                <WhenVisible
                    params={{
                        only: ['jobs', 'next_cursor'],
                        replace: true,
                        data: { cursor: next_cursor },
                    }}
                    fallback={<p>Loading</p>}
                    always={!!next_cursor}
                    disabled={!next_cursor}
                    buffer={500}
                >
                    <Button variant="outline" className="mx-auto" onClick={onLoadMore} disabled={!next_cursor}>
                        Load More Companies
                    </Button>
                </WhenVisible>
            </div>
        </div>
    );
}
