import {
    ResponsiveModal,
    ResponsiveModalDescription,
    ResponsiveModalFooter,
    ResponsiveModalHeader,
    ResponsiveModalTitle,
} from '@/components/responsive-modal';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { type PageProps } from '@inertiajs/core';
import { Head, usePage } from '@inertiajs/react';
import { useForm } from 'laravel-precognition-react-inertia';
import { CheckCircle, Clock, FileText, Search, ThumbsDown, XCircle } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

type ApplicationStatus = 'Applied' | 'Invited' | 'Rejected';

type ApplicationStatusUpdateForm = {
    status: ApplicationStatus;
};

interface PageDataProps extends PageProps {
    slug: string;
}

export default function ApplicationsPage({ applications }: { applications: App.Data.Applications.ApplicationData[] }) {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedApplication, setSelectedApplication] = useState<App.Data.Applications.ApplicationData | null>(null);
    const [confirmationDialogOpen, setConfirmationDialogOpen] = useState(false);
    const [currentTab, setCurrentTab] = useState('all');
    const [modalOpen, setModalOpen] = useState(false);

    const { slug } = usePage<PageDataProps>().props;

    const { data, setData, submit } = useForm<ApplicationStatusUpdateForm>(
        'post',
        route('dashboard.application.update', {
            company: slug,
            application: selectedApplication?.id ?? -1,
        }),
        {
            status: 'Applied',
        },
    );

    const filteredSubmissions = applications.filter((application) => {
        const matchesSearch =
            application.first_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            application.job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            application.user.email.toLowerCase().includes(searchQuery.toLowerCase());

        if (currentTab === 'all') return matchesSearch;
        return matchesSearch && application.status === currentTab;
    });

    const handleStatusChange = () => {
        submit({
            onSuccess: () => {
                toast.success(`Application status updated to ${data.status}`);
                setConfirmationDialogOpen(false);
                setSelectedApplication(null);
            },
            onError: () => {
                toast.error('Failed to update application status');
            },
        });
    };

    const StatusBadge = ({ status }: { status: ApplicationStatus }) => {
        switch (status) {
            case 'Applied':
                return (
                    <Badge variant="outline" className="flex items-center gap-1 border-yellow-200 bg-yellow-50 text-yellow-700">
                        <Clock className="h-3 w-3" /> Applied
                    </Badge>
                );
            case 'Invited':
                return (
                    <Badge variant="outline" className="flex items-center gap-1 border-green-200 bg-green-50 text-green-700">
                        <CheckCircle className="h-3 w-3" /> Invited
                    </Badge>
                );
            case 'Rejected':
                return (
                    <Badge variant="outline" className="flex items-center gap-1 border-red-200 bg-red-50 text-red-700">
                        <XCircle className="h-3 w-3" /> Rejected
                    </Badge>
                );
            default:
                return null;
        }
    };

    return (
        <>
            <Head title="Job Applications" />
            <div className="container mx-auto py-8">
                <div className="mb-6 flex items-center justify-between">
                    <h1 className="text-3xl font-bold">Job Applications</h1>
                    <div className="relative w-64">
                        <Search className="text-muted-foreground absolute top-2.5 left-2 h-4 w-4" />
                        <Input
                            placeholder="Search submissions..."
                            className="pl-8"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                </div>

                <Tabs defaultValue="all" className="mb-6" onValueChange={setCurrentTab}>
                    <TabsList>
                        <TabsTrigger value="all">All Applications</TabsTrigger>
                        <TabsTrigger value="Applied">Applied</TabsTrigger>
                        <TabsTrigger value="Invited">Invited</TabsTrigger>
                        <TabsTrigger value="Rejected">Rejected</TabsTrigger>
                    </TabsList>
                </Tabs>

                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {filteredSubmissions.map((application) => (
                        <Card key={application.id} className="overflow-hidden">
                            <CardHeader className="pb-2">
                                <div className="flex items-start justify-between">
                                    <div>
                                        <CardTitle>
                                            {application.first_name} {application.last_name}
                                        </CardTitle>
                                        <CardDescription>{application.job.title}</CardDescription>
                                    </div>
                                    <StatusBadge status={application.status} />
                                </div>
                            </CardHeader>
                            <CardContent className="pb-2">
                                <div className="grid grid-cols-2 gap-2 text-sm">
                                    <div>
                                        <span className="text-muted-foreground">Applied:</span>{' '}
                                        {new Date(application.applied_date).toLocaleDateString()}
                                    </div>
                                </div>
                            </CardContent>
                            <CardFooter className="flex justify-between pt-2">
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => {
                                        setSelectedApplication(application);
                                        setModalOpen(true);
                                    }}
                                >
                                    <FileText className="mr-1 h-4 w-4" /> View Details
                                </Button>
                                <ResponsiveModal
                                    open={modalOpen && selectedApplication?.id === application.id}
                                    onOpenChange={() => setModalOpen(false)}
                                >
                                    <ResponsiveModalHeader>
                                        <ResponsiveModalTitle className="text-xl">
                                            {application.first_name} {application.last_name} - {application.job.title}
                                        </ResponsiveModalTitle>
                                        <ResponsiveModalDescription>
                                            Applied on {new Date(application.applied_date).toLocaleDateString()} • {application.user.email}
                                        </ResponsiveModalDescription>
                                    </ResponsiveModalHeader>

                                    <div className="grid gap-4 py-4">
                                        <div>
                                            <Label className="text-muted-foreground mb-1 block">Cover Letter</Label>
                                            <div className="bg-muted rounded-md p-3 text-sm">{application.cover_letter}</div>
                                        </div>

                                        <div>
                                            <Label className="text-muted-foreground mb-1 block">Resume</Label>
                                            <Button variant="outline" size="sm">
                                                <FileText className="mr-1 h-4 w-4" /> Download Resume
                                            </Button>
                                        </div>
                                    </div>

                                    <ResponsiveModalFooter className="flex justify-between">
                                        <div className="flex gap-2">
                                            <Button
                                                variant="destructive"
                                                onClick={() => {
                                                    setConfirmationDialogOpen(true);
                                                    setData('status', 'Rejected');
                                                }}
                                                disabled={application.status === 'Rejected'}
                                            >
                                                <ThumbsDown className="mr-1 h-4 w-4" /> Reject
                                            </Button>
                                            <Button
                                                variant="default"
                                                onClick={() => {
                                                    setConfirmationDialogOpen(true);
                                                    setData('status', 'Invited');
                                                }}
                                                disabled={application.status === 'Invited'}
                                            >
                                                <CheckCircle className="mr-1 h-4 w-4" /> Invite
                                            </Button>
                                        </div>
                                        <StatusBadge status={application.status} />
                                    </ResponsiveModalFooter>
                                </ResponsiveModal>

                                <div className="flex gap-2">
                                    {application.status === 'Applied' && (
                                        <>
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                className="text-red-600 hover:bg-red-50 hover:text-red-700"
                                                onClick={() => {
                                                    setConfirmationDialogOpen(true);
                                                    setSelectedApplication(application);
                                                    setData('status', 'Rejected');
                                                }}
                                            >
                                                <ThumbsDown className="h-4 w-4" />
                                            </Button>
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                className="text-green-600 hover:bg-green-50 hover:text-green-700"
                                                onClick={() => {
                                                    setConfirmationDialogOpen(true);
                                                    setSelectedApplication(application);

                                                    setData('status', 'Invited');
                                                }}
                                            >
                                                <CheckCircle className="h-4 w-4" />
                                            </Button>
                                        </>
                                    )}
                                </div>
                            </CardFooter>
                        </Card>
                    ))}
                </div>

                {filteredSubmissions.length === 0 && (
                    <div className="py-12 text-center">
                        <p className="text-muted-foreground">No submissions found matching your criteria.</p>
                    </div>
                )}

                <Dialog open={confirmationDialogOpen} onOpenChange={(open) => !open && setConfirmationDialogOpen(false)}>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>{data.status === 'Invited' ? 'Invite this applicant?' : 'Reject this application?'}</DialogTitle>
                            <DialogDescription>
                                {data.status === 'Invited'
                                    ? 'This will mark the application as invited and notify the candidate.'
                                    : 'This will mark the application as rejected and notify the candidate.'}
                            </DialogDescription>
                        </DialogHeader>
                        <DialogFooter>
                            <Button variant="outline" onClick={() => setConfirmationDialogOpen(false)}>
                                Cancel
                            </Button>
                            <Button variant={data.status === 'Invited' ? 'default' : 'destructive'} onClick={handleStatusChange}>
                                Confirm {data.status === 'Invited' ? 'Invitation' : 'Rejection'}
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>
        </>
    );
}
