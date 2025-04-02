import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { PageProps } from '@inertiajs/core';
import { Head, Link, usePage } from '@inertiajs/react';
import { useForm } from 'laravel-precognition-react-inertia';
import { ArrowLeft, Building2, Clock, User, Users } from 'lucide-react';

interface Props extends PageProps {
    submission: App.Data.CompanySubmissionData;
}

type SubmissionAction = {
    action: 'approve' | 'reject' | '';
};

export default function SubmissionDetail() {
    const { submission } = usePage<Props>().props;

    const { setData, submit, processing, reset } = useForm<SubmissionAction>(
        'post',
        route('admin.submission.update', {
            submission: submission.id,
        }),
        {
            action: '',
        },
    );

    const submitAction = async () => {
        submit({
            onFinish: () => {
                reset('action');
            },
        });
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <Head title="Submission" />
            <div className="space-y-6">
                <Link href={route('admin.dashboard')}>
                    <Button variant="ghost" className="flex items-center gap-2">
                        <ArrowLeft className="h-4 w-4" /> Back to Dashboard
                    </Button>
                </Link>

                <div className="flex w-fit gap-6 place-self-center md:w-3xl">
                    <Card className="flex-1">
                        <CardHeader>
                            <div className="flex items-center justify-between">
                                <div>
                                    <CardTitle className="text-2xl">{submission.name}</CardTitle>
                                    <CardDescription>{submission.industry}</CardDescription>
                                </div>
                                <Badge
                                    variant={
                                        submission.status === 'pending' ? 'outline' : submission.status === 'approved' ? 'default' : 'destructive'
                                    }
                                >
                                    {submission.status.charAt(0).toUpperCase() + submission.status.slice(1)}
                                </Badge>
                            </div>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="grid gap-4 md:grid-cols-2">
                                <div className="flex items-center gap-2">
                                    <Clock className="text-muted-foreground h-4 w-4" />
                                    <span>Founded: {new Date(submission.founded_year).getFullYear()}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Users className="text-muted-foreground h-4 w-4" />
                                    <span>Size: {submission.employee_count} employees</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <User className="text-muted-foreground h-4 w-4" />
                                    <span>CEO: {submission.ceo}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Building2 className="text-muted-foreground h-4 w-4" />
                                    <span>Type: {submission.type} company</span>
                                </div>
                            </div>

                            <Separator />

                            <div>
                                <h3 className="mb-2 font-medium">Company Description</h3>
                                <p className="text-muted-foreground">{submission.description}</p>
                            </div>

                            <div>
                                <h3 className="mb-2 font-medium">Submitter Information</h3>
                                <div className="grid gap-2">
                                    <div className="flex gap-1">
                                        <span className="text-muted-foreground">Name:</span>
                                        <span>{submission.user.name}</span>
                                    </div>
                                    <div className="flex gap-1">
                                        <span className="text-muted-foreground">Submitted:</span>
                                        <span>{new Date(submission.created_at).toDateString()}</span>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                        <CardFooter className="flex justify-end gap-4">
                            {submission.status === 'pending' && (
                                <>
                                    <AlertDialog>
                                        <AlertDialogTrigger asChild>
                                            <Button variant="outline" disabled={processing} onClick={() => setData('action', 'reject')}>
                                                Reject
                                            </Button>
                                        </AlertDialogTrigger>
                                        <AlertDialogContent>
                                            <AlertDialogHeader>
                                                <AlertDialogTitle>Reject Company Submission</AlertDialogTitle>
                                                <AlertDialogDescription>
                                                    Are you sure you want to reject this company submission? This action cannot be undone.
                                                </AlertDialogDescription>
                                            </AlertDialogHeader>
                                            <AlertDialogFooter>
                                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                <AlertDialogAction
                                                    onClick={() => submitAction()}
                                                    className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                                                >
                                                    Reject
                                                </AlertDialogAction>
                                            </AlertDialogFooter>
                                        </AlertDialogContent>
                                    </AlertDialog>

                                    <AlertDialog>
                                        <AlertDialogTrigger asChild>
                                            <Button disabled={processing} onClick={() => setData('action', 'approve')}>
                                                Approve
                                            </Button>
                                        </AlertDialogTrigger>
                                        <AlertDialogContent>
                                            <AlertDialogHeader>
                                                <AlertDialogTitle>Approve Company Submission</AlertDialogTitle>
                                                <AlertDialogDescription>
                                                    Are you sure you want to approve this company? It will be published on the platform.
                                                </AlertDialogDescription>
                                            </AlertDialogHeader>
                                            <AlertDialogFooter>
                                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                <AlertDialogAction onClick={() => submitAction()}>Approve</AlertDialogAction>
                                            </AlertDialogFooter>
                                        </AlertDialogContent>
                                    </AlertDialog>
                                </>
                            )}
                        </CardFooter>
                    </Card>
                </div>
            </div>
        </div>
    );
}
