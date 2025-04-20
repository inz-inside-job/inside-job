import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import DashboardLayout from '@/layouts/dashboard/dashboard-layout';
import { moneyToHuman } from '@/lib/utils';
import { Link, useForm } from '@inertiajs/react';
import { ArrowLeft, Pencil, Plus, Trash2 } from 'lucide-react';
import { toast } from 'sonner';

export default function CompanyJobsPage({ jobs, company }: { jobs: App.Data.Jobs.JobData[]; company: App.Data.Jobs.JobCompanyData }) {
    const { delete: submitDelete } = useForm();

    const onDelete = (job: string) => {
        submitDelete(route('dashboard.jobs.destroy', { company: company.slug, job }), {
            onSuccess: () => {
                toast.success('Job deleted successfully');
            },
            onError: () => {
                toast.error('Failed to delete job');
            },
        });
    };

    return (
        <DashboardLayout>
            <div className="mb-6">
                <Link href={route('dashboard.edit', { company: company.slug })}>
                    <Button variant="outline" size="sm">
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back to Company
                    </Button>
                </Link>
            </div>

            <Card>
                <CardHeader className="border-b">
                    <div className="mb-4 flex items-center justify-between">
                        <CardTitle>Company Jobs</CardTitle>
                        <Link href={route('dashboard.jobs.create', { company: company.slug })}>
                            <Button className="bg-orange-500 hover:bg-orange-600">
                                <Plus className="mr-2 h-4 w-4" />
                                Add Job
                            </Button>
                        </Link>
                    </div>
                </CardHeader>
                <CardContent className="p-6">
                    {jobs.length > 0 ? (
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Job Title</TableHead>
                                    <TableHead>Location</TableHead>
                                    <TableHead>Type</TableHead>
                                    <TableHead>Experience</TableHead>
                                    <TableHead>Salary Range</TableHead>
                                    <TableHead>Applications</TableHead>
                                    <TableHead>Posted Date</TableHead>
                                    <TableHead className="text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {jobs.map((job) => (
                                    <TableRow key={job.id}>
                                        <TableCell className="font-medium">{job.title}</TableCell>
                                        <TableCell>{job.location}</TableCell>
                                        <TableCell>
                                            <Badge variant="outline">{job.employment_type}</Badge>
                                        </TableCell>
                                        <TableCell>{job.employment_experience}</TableCell>
                                        <TableCell>
                                            {moneyToHuman(job.salary_min)} - {moneyToHuman(job.salary_max)}
                                        </TableCell>
                                        <TableCell>
                                            <Link href={`/jobs/${job.id}/applications`} className="text-orange-500 hover:underline">
                                                {job.applications_count}
                                            </Link>
                                        </TableCell>
                                        <TableCell>{job.posted_date}</TableCell>
                                        <TableCell className="text-right">
                                            <div className="flex justify-end gap-2">
                                                <Link href={route('dashboard.jobs.edit', { company: company.slug, job: job.slug })}>
                                                    <Button variant="outline" size="sm">
                                                        <Pencil className="h-4 w-4" />
                                                        <span className="sr-only">Edit</span>
                                                    </Button>
                                                </Link>
                                                <Button variant="outline" size="sm" onClick={() => onDelete(job.slug)}>
                                                    <Trash2 className="h-4 w-4 text-red-500" />
                                                    <span className="sr-only">Delete</span>
                                                </Button>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    ) : (
                        <div className="py-10 text-center">
                            <p className="text-gray-500">No jobs found. Create your first job posting!</p>
                        </div>
                    )}
                </CardContent>
            </Card>
        </DashboardLayout>
    );
}
