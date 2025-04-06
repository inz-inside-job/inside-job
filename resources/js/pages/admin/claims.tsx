import ClaimsTable from '@/components/admin/claims-table';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import AdminLayout from '@/layouts/admin/admin-layout';
import { Head } from '@inertiajs/react';

export default function CompanyClaims() {
    return (
        <AdminLayout>
            <Head title="Claims" />
            <div className="mb-8 flex flex-col gap-2">
                <h1 className="text-3xl font-bold tracking-tight">Claims</h1>
                <p className="text-muted-foreground">Manage users that want to claim a company as a representative</p>
            </div>
            <Tabs defaultValue="pending" className="space-y-4">
                <TabsList>
                    <TabsTrigger value="pending">Pending</TabsTrigger>
                    <TabsTrigger value="approved">Approved</TabsTrigger>
                    <TabsTrigger value="rejected">Rejected</TabsTrigger>
                </TabsList>
                <TabsContent value="pending" className="space-y-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Pending Claims</CardTitle>
                            <CardDescription>Companies that have pending claims from users</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <ClaimsTable status="pending" />
                        </CardContent>
                    </Card>
                </TabsContent>
                <TabsContent value="approved" className="space-y-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Approved Claims</CardTitle>
                            <CardDescription>Companies that have been claimed by users</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <ClaimsTable status="approved" />
                        </CardContent>
                    </Card>
                </TabsContent>
                <TabsContent value="rejected" className="space-y-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Rejected Claims</CardTitle>
                            <CardDescription>Companies that have been claimed by users and rejected by the admin.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <ClaimsTable status="rejected" />
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </AdminLayout>
    );
}
