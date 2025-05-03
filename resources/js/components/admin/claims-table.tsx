import { PageProps } from '@inertiajs/core';
import { Link, router, usePage } from '@inertiajs/react';
import { ArrowUpDown, MoreHorizontal, Search } from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';
import { Button } from '../ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../ui/dropdown-menu';
import { Input } from '../ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';

type SubmissionStatus = 'pending' | 'approved' | 'rejected';

interface ClaimsTableProps {
    status: SubmissionStatus;
}

interface Props extends PageProps {
    claims: App.Data.CompanySubmission.CompanyClaimSubmissionData[];
    next_cursor: string | null;
}

export default function ClaimsTable({ status }: ClaimsTableProps) {
    const { claims, next_cursor } = usePage<Props>().props;
    const [prevSort, setPrevSort] = useState<string>('email');
    const [searchQuery, setSearchQuery] = useState('');

    const onSortChange = useCallback(
        (sortValue: string) => {
            const sort = sortValue === prevSort ? `-${sortValue}` : sortValue;

            router.reload({
                only: ['claims', 'next_cursor'],
                replace: true,
                reset: ['claims'],
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
        router.reload({ data: { cursor: next_cursor! }, replace: true, only: ['claims', 'next_cursor'] });
    }, [next_cursor]);

    const filteredClaims = claims.filter(
        (claim) =>
            claim.status === status &&
            (claim.email.toLowerCase().includes(searchQuery.toLowerCase()) || claim.job_title.toLowerCase().includes(searchQuery.toLowerCase())),
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
                            <TableHead className="w-[300px]">Company Name</TableHead>
                            <TableHead className="w-[300px]">
                                <Button
                                    variant="ghost"
                                    className="flex items-center gap-1 p-0 font-medium"
                                    onClick={() => setPrevSort((prev) => (prev === 'job_title' ? '-job_title' : 'job_title'))}
                                >
                                    Job Title
                                    <ArrowUpDown className="h-3 w-3" />
                                </Button>
                            </TableHead>
                            <TableHead>
                                <Button
                                    variant="ghost"
                                    className="flex items-center gap-1 p-0 font-medium"
                                    onClick={() => setPrevSort((prev) => (prev === 'email' ? '-email' : 'email'))}
                                >
                                    Email
                                    <ArrowUpDown className="h-3 w-3" />
                                </Button>
                            </TableHead>
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
                        {filteredClaims.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={5} className="h-24 text-center">
                                    No submissions found.
                                </TableCell>
                            </TableRow>
                        ) : (
                            filteredClaims.map((claim) => (
                                <TableRow key={claim.id}>
                                    <TableCell className="font-medium">{claim.company.name}</TableCell>
                                    <TableCell className="font-medium">{claim.job_title}</TableCell>
                                    <TableCell>{claim.email}</TableCell>
                                    <TableCell>{new Date(claim.created_at).toDateString()}</TableCell>
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
                                                    <Link className={'cursor-pointer'} href={`/admin/claims/${claim.id}`}>
                                                        View Details
                                                    </Link>
                                                </DropdownMenuItem>
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
