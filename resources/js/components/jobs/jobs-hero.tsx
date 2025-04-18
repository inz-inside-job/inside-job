import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useGetQueryParams, withQueryBuilderParams } from '@/lib/utils';
import { router } from '@inertiajs/react';
import { Briefcase, Search } from 'lucide-react';
import { useCallback, useState } from 'react';

export function JobsHero() {
    const queryParams = useGetQueryParams();

    const [searchQuery, setSearchQuery] = useState(queryParams.query || '');

    const handleSearch = useCallback(
        (e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault();

            const query = withQueryBuilderParams({
                ...queryParams,
                query: searchQuery,
                cursor: undefined,
            });

            router.get(route('jobs'), query, { replace: false });
        },
        [searchQuery, queryParams],
    );

    return (
        <div className="bg-gradient-to-r from-orange-500 to-orange-400 text-white">
            <div className="container mx-auto px-4 py-12">
                <div className="mx-auto mb-8 max-w-3xl text-center">
                    <h1 className="mb-4 text-3xl font-bold md:text-4xl">Find The Perfect Job For You</h1>
                    <p className="text-lg opacity-90">Search millions of jobs and get the inside scoop on companies</p>
                </div>

                <form onSubmit={handleSearch}>
                    <div className="bg-background mx-auto max-w-3xl rounded-lg p-4 shadow-lg">
                        <div className="grid grid-cols-1 gap-3 md:grid-cols-4">
                            <div className="relative md:col-span-3">
                                <Briefcase className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform text-gray-400" />
                                <Input
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="text-foreground pl-10"
                                    placeholder="Job title, keywords, or company"
                                />
                            </div>
                            <Button className="cursor-pointer bg-orange-500 hover:bg-orange-600">
                                <Search className="mr-1 h-4 w-4" />
                                Search
                            </Button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}
