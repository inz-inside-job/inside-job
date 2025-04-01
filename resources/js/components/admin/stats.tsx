import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PageProps } from '@inertiajs/core';
import { usePage } from '@inertiajs/react';
import { Building2, CheckCircle, Clock, XCircle } from 'lucide-react';

interface Props extends PageProps {
    aggregates: App.Data.CompanySubmissionCountsData;
}

export function Stats() {
    const { aggregates } = usePage<Props>().props;

    return (
        <div className="mb-4 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Submissions</CardTitle>
                    <Building2 className="text-muted-foreground h-4 w-4" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold text-orange-500">{aggregates.total}</div>
                    <p className="text-muted-foreground text-xs">All company submissions</p>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Pending Review</CardTitle>
                    <Clock className="text-muted-foreground h-4 w-4" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold text-orange-500">{aggregates.pending}</div>
                    <p className="text-muted-foreground text-xs">Awaiting admin review</p>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Approved</CardTitle>
                    <CheckCircle className="text-muted-foreground h-4 w-4" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold text-orange-500">{aggregates.approved}</div>
                    <p className="text-muted-foreground text-xs">Published on platform</p>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Rejected</CardTitle>
                    <XCircle className="text-muted-foreground h-4 w-4" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold text-orange-500">{aggregates.rejected}</div>
                    <p className="text-muted-foreground text-xs">Not approved for platform</p>
                </CardContent>
            </Card>
        </div>
    );
}
