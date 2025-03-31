'use client';

import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { PageProps } from '@inertiajs/core';
import { Link, router, usePage } from '@inertiajs/react';
import { ArrowUpDown, MoreHorizontal, Search } from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';

type SubmissionStatus = 'pending' | 'approved' | 'rejected';

interface SubmissionsTableProps {
    status: SubmissionStatus;
}

interface Props extends PageProps {
    submissions: App.Data.CompanySubmissionData[];
    next_cursor: string | null;
}

export function SubmissionsTable({ status }: SubmissionsTableProps) {
    const [searchQuery, setSearchQuery] = useState('');
    const [prevSort, setPrevSort] = useState<string>('name');
    const { submissions, next_cursor } = usePage<Props>().props;

    const onSortChange = useCallback(
        (sortValue: string) => {
            const sort = sortValue === prevSort ? `-${sortValue}` : sortValue;

            router.reload({
                only: ['submissions', 'next_cursor'],
                replace: true,
                reset: ['submissions'],
                // Force cursor to be null as this is a new sort
                data: { sort, cursor: null },
            });
        },
        [prevSort],
    );

    useEffect(() => {
        const sort = prevSort.startsWith('-') ? prevSort.slice(1) : prevSort;
        onSortChange(sort);
    }, [prevSort, onSortChange]);

    const onLoadMore = useCallback(() => {
        router.reload({ data: { cursor: next_cursor! }, replace: true, only: ['submissions', 'next_cursor'] });
    }, [next_cursor]);

    const filteredSubmissions = submissions.filter(
        (submission) =>
            submission.status === status &&
            (submission.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                submission.industry.toLowerCase().includes(searchQuery.toLowerCase())),
    );

    return (
        <div className="space-y-4">
            <div className="flex items-center gap-2">
                <div className="relative flex-1">
                    <Search className="text-muted-foreground absolute top-2.5 left-2.5 h-4 w-4" />
                    <Input
                        type="search"
                        placeholder="Search companies..."
                        className="pl-8"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
            </div>

            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[300px]">
                                <Button
                                    variant="ghost"
                                    className="flex items-center gap-1 p-0 font-medium"
                                    onClick={() => setPrevSort((prev) => (prev === 'name' ? '-name' : 'name'))}
                                >
                                    Company Name
                                    <ArrowUpDown className="h-3 w-3" />
                                </Button>
                            </TableHead>
                            <TableHead>
                                <Button
                                    variant="ghost"
                                    className="flex items-center gap-1 p-0 font-medium"
                                    onClick={() => setPrevSort((prev) => (prev === 'industry' ? '-industry' : 'industry'))}
                                >
                                    Industry
                                    <ArrowUpDown className="h-3 w-3" />
                                </Button>
                            </TableHead>
                            <TableHead>Submitted By</TableHead>
                            <TableHead>
                                <Button
                                    variant="ghost"
                                    className="flex items-center gap-1 p-0 font-medium"
                                    onClick={() => setPrevSort((prev) => (prev === 'created_at' ? '-created_at' : 'created_at'))}
                                >
                                    Date
                                    <ArrowUpDown className="h-3 w-3" />
                                </Button>
                            </TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filteredSubmissions.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={5} className="h-24 text-center">
                                    No submissions found.
                                </TableCell>
                            </TableRow>
                        ) : (
                            filteredSubmissions.map((submission) => (
                                <TableRow key={submission.id}>
                                    <TableCell className="font-medium">{submission.name}</TableCell>
                                    <TableCell>{submission.industry}</TableCell>
                                    <TableCell>{submission.user.name}</TableCell>
                                    <TableCell>{new Date(submission.created_at).toDateString()}</TableCell>
                                    <TableCell className="text-right">
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="ghost" className="h-8 w-8 p-0">
                                                    <span className="sr-only">Open menu</span>
                                                    <MoreHorizontal className="h-4 w-4" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end">
                                                <DropdownMenuItem asChild>
                                                    <Link href={`/admin/submissions/${submission.id}`}>View Details</Link>
                                                </DropdownMenuItem>
                                                {status === 'pending' ? (
                                                    <>
                                                        <DropdownMenuItem>Approve</DropdownMenuItem>
                                                        <DropdownMenuItem>Reject</DropdownMenuItem>
                                                    </>
                                                ) : null}
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </div>
            <Button variant="outline" className="mx-auto" onClick={onLoadMore} disabled={!next_cursor}>
                Load More Submissions
            </Button>
        </div>
    );
}
