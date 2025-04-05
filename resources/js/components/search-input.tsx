import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useInitials } from '@/hooks/use-initials';
import { Link } from '@inertiajs/react';
import axios from 'axios';
import { Loader2, Search, XCircle } from 'lucide-react';
import type React from 'react';
import { useEffect, useRef, useState } from 'react';
import { useDebounce } from 'use-debounce';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';

export default function SearchInput() {
    const [query, setQuery] = useState('');
    const [debouncedQuery] = useDebounce(query, 250);
    const [results, setResults] = useState<App.Data.Search.SearchResultData[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [showResults, setShowResults] = useState(false);
    const searchRef = useRef<HTMLDivElement>(null);
    const getInitials = useInitials();

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
                setShowResults(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    // Fetch results when debounced query changes
    useEffect(() => {
        if (!debouncedQuery.trim()) {
            setResults([]);
            setShowResults(false);
            return;
        }

        setIsLoading(true);
        setError(null);
        setShowResults(true);

        axios
            .get('/search', { params: { query: debouncedQuery } })
            .then((response) => {
                setResults(response.data);
            })
            .catch((error) => {
                console.error('Error fetching search results:', error);
                setError('Failed to fetch search results');
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, [debouncedQuery]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setQuery(e.target.value);
        if (e.target.value.trim().length === 0) {
            setShowResults(false);
        } else {
            setShowResults(true); // Show results immediately when typing
            setIsLoading(true); // Set loading state immediately
        }
    };

    const clearSearch = () => {
        setQuery('');
        setResults([]);
        setShowResults(false);
    };

    return (
        <div className="w-full lg:w-auto" ref={searchRef}>
            <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform" />
            <Input
                type="text"
                placeholder="Search jobs, companies..."
                value={query}
                onChange={handleInputChange}
                className="w-full pr-10 pl-10 lg:w-[300px]"
                onFocus={() => query.trim().length > 0 && setShowResults(true)}
            />
            {query.length > 0 && (
                <Button
                    variant="ghost"
                    size="sm"
                    className="absolute top-1/2 right-0 aspect-square h-full -translate-y-1/2 transform p-0"
                    onClick={clearSearch}
                >
                    <XCircle className="h-4 w-4" />
                    <span className="sr-only">Clear search</span>
                </Button>
            )}

            {showResults && (
                <Card className="absolute z-10 mt-1 max-h-80 w-full py-0 shadow-md">
                    <CardContent className="overflow-y-auto p-0">
                        {isLoading ? (
                            <div className="flex items-center justify-center p-4">
                                <Loader2 className="text-muted-foreground h-5 w-5 animate-spin" />
                                <span className="text-muted-foreground ml-2 text-sm">Searching...</span>
                            </div>
                        ) : error ? (
                            <div className="p-4 text-sm text-red-500">{error}</div>
                        ) : results.length === 0 ? (
                            <div className="text-muted-foreground p-4 text-sm">No results found</div>
                        ) : (
                            <ul className="py-2">
                                {results.map((result) => (
                                    <Link href={result.link} key={result.id} as={'li'} className="hover:bg-muted cursor-pointer px-4 py-2">
                                        <div className="flex items-center gap-3">
                                            <Avatar className="h-8 w-8">
                                                <AvatarImage src={result.logo ?? ''} alt={result.name} />
                                                <AvatarFallback>{getInitials(result.name)}</AvatarFallback>
                                            </Avatar>
                                            <div className="min-w-0 flex-1">
                                                <div className="text-sm font-medium">{result.name}</div>
                                                <div className="text-muted-foreground truncate text-xs">{result.description}</div>
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </ul>
                        )}
                    </CardContent>
                </Card>
            )}
        </div>
    );
}
