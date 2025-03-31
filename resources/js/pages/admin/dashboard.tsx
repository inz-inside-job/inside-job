import { Stats } from '@/components/admin/stats';
import { SubmissionsTable } from '@/components/admin/submissions-table';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import AdminLayout from '@/layouts/admin/layout';
import { Head } from '@inertiajs/react';

export default function AdminDashboard() {
    return (
        <>
            <Head title="Admin" />
            <AdminLayout>
                <div className="mb-8 flex flex-col gap-2">
                    <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
                    <p className="text-muted-foreground">Manage company submissions and review pending requests.</p>
                </div>

                <Stats />

                <Tabs defaultValue="pending" className="space-y-4">
                    <TabsList>
                        <TabsTrigger value="pending">Pending</TabsTrigger>
                        <TabsTrigger value="approved">Approved</TabsTrigger>
                        <TabsTrigger value="rejected">Rejected</TabsTrigger>
                    </TabsList>
                    <TabsContent value="pending" className="space-y-4">
                        <Card>
                            <CardHeader>
                                <CardTitle>Pending Submissions</CardTitle>
                                <CardDescription>Review and process company submissions awaiting approval.</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <SubmissionsTable status="pending" />
                            </CardContent>
                        </Card>
                    </TabsContent>
                    <TabsContent value="approved" className="space-y-4">
                        <Card>
                            <CardHeader>
                                <CardTitle>Approved Submissions</CardTitle>
                                <CardDescription>Companies that have been approved and are live on the platform.</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <SubmissionsTable status="approved" />
                            </CardContent>
                        </Card>
                    </TabsContent>
                    <TabsContent value="rejected" className="space-y-4">
                        <Card>
                            <CardHeader>
                                <CardTitle>Rejected Submissions</CardTitle>
                                <CardDescription>Companies that have been rejected from the platform.</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <SubmissionsTable status="rejected" />
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>
            </AdminLayout>
        </>
    );
}
