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
    claim: App.Data.CompanySubmission.CompanyClaimSubmissionData;
}

type ClaimAction = {
    action: 'approve' | 'reject' | '';
};

export default function Claim() {
    const { claim } = usePage<Props>().props;

    const { setData, submit, processing, reset } = useForm<ClaimAction>(
        'post',
        route('admin.claim.update', {
            claim: claim.id,
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
            <Head title="Claim" />
            <div className="space-y-6">
                <Link href={route('admin.claims')}>
                    <Button variant="ghost" className="flex items-center gap-2">
                        <ArrowLeft className="h-4 w-4" /> Back to Claims
                    </Button>
                </Link>

                <div className="flex w-fit gap-6 place-self-center md:w-3xl">
                    <Card className="flex-1">
                        <CardHeader>
                            <div className="flex items-center justify-between">
                                <div>
                                    <CardTitle className="text-2xl">{claim.company.name}</CardTitle>
                                    <CardDescription>{claim.company.industry}</CardDescription>
                                </div>
                                <Badge variant={claim.status === 'pending' ? 'outline' : claim.status === 'approved' ? 'default' : 'destructive'}>
                                    {claim.status.charAt(0).toUpperCase() + claim.status.slice(1)}
                                </Badge>
                            </div>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="flex items-center gap-2">
                                <User className="text-muted-foreground h-4 w-4" />
                                <p className="text-muted-foreground text-sm">Claimed by: {claim.user.name}</p>
                            </div>
                            <Separator />
                            <div className="flex items-center gap-2">
                                <Building2 className="text-muted-foreground h-4 w-4" />
                                <p className="text-muted-foreground text-sm">Company: {claim.company.name}</p>
                            </div>
                            <Separator />
                            <div className="flex items-center gap-2">
                                <Users className="text-muted-foreground h-4 w-4" />
                                <p className="text-muted-foreground text-sm">Job title: {claim.job_title}</p>
                            </div>
                            <Separator />
                            <div className="flex items-center gap-2">
                                <Clock className="text-muted-foreground h-4 w-4" />
                                <p className="text-muted-foreground text-sm">
                                    Claimed submitted on: {new Date(claim.created_at).toLocaleDateString()}
                                </p>
                            </div>
                        </CardContent>
                        <CardFooter className="flex justify-end gap-4">
                            {claim.status === 'pending' && (
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
