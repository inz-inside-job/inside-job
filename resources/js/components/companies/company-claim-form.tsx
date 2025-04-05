import { Button } from '@/components/ui/button';
import { DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { usePage } from '@inertiajs/react';
import { useForm } from 'laravel-precognition-react-inertia';
import { Building2, Mail } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';
import { ResponsiveModal, ResponsiveModalDescription, ResponsiveModalHeader, ResponsiveModalTitle } from '../responsive-modal';
import { Label } from '../ui/label';

type CompanyClaimForm = {
    job_title: string | null;
    email: string | null;
    verification_details: string | null;
};

export function CompanyClaimDialog({ company }: { company: App.Data.Company.CompanyData }) {
    const [open, setOpen] = useState(false);
    const page = usePage();
    const { auth } = page.props;

    const { data, setData, errors, submit, reset, processing, validate } = useForm<CompanyClaimForm>(
        'post',
        route('companies.submitClaim', {
            company: company.slug,
        }),
        {
            job_title: null,
            email: null,
            verification_details: null,
        },
    );

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        submit({
            onSuccess: () => {
                toast.success('Claim submitted successfully! We will review your request within 1-2 business days.');
                setOpen(false);
                reset();
            },
            onError: () => {
                toast.error('There was an error submitting your claim. Please try again.');
                reset();
            },
        });
    };

    return (
        <>
            <Button size={'sm'} className="cursor-pointer bg-orange-500 hover:bg-orange-600" onClick={() => setOpen(true)}>
                <Building2 className="mr-2 h-4 w-4" />
                Claim this company
            </Button>
            <ResponsiveModal open={open} onOpenChange={setOpen}>
                <ResponsiveModalHeader>
                    <ResponsiveModalTitle>Claim this company</ResponsiveModalTitle>
                    <ResponsiveModalDescription>
                        As a user, you can claim to be a representative of <span className="font-bold">{company.name}</span>. We'll review your
                        request within 1-2 business days and verify your association with the company.
                    </ResponsiveModalDescription>
                </ResponsiveModalHeader>
                <form onSubmit={onSubmit} className="space-y-4">
                    <div className="bg-muted mb-4 rounded-lg p-4">
                        <p className="text-muted-foreground text-sm">
                            You are submitting this claim as <span className="font-medium">{auth.user?.name}</span> ({auth.user?.email})
                        </p>
                    </div>

                    <div className="bg-muted mb-4 rounded-lg p-4">
                        <Label htmlFor={'job-title'}>Job Title</Label>
                        <div className="relative">
                            <Building2 className="text-muted-foreground absolute top-3 left-3 h-4 w-4" />
                            <Input
                                value={data['job_title'] ?? ''}
                                onChange={(e) => setData('job_title', e.target.value)}
                                onBlur={() => {
                                    validate('job_title');
                                }}
                                id={'job-title'}
                                className="pl-10"
                                placeholder="Marketing Director"
                            />
                            {errors['job_title'] && <p className="text-sm text-red-500">{errors['job_title']}</p>}
                        </div>
                    </div>

                    <div className="bg-muted mb-4 space-y-2 rounded-lg p-4">
                        <Label htmlFor={'email-input'}>Company Email</Label>
                        <div className="relative">
                            <Mail className="text-muted-foreground absolute top-3 left-3 h-4 w-4" />
                            <Input
                                value={data['email'] ?? ''}
                                onChange={(e) => setData('email', e.target.value)}
                                onBlur={() => {
                                    validate('email');
                                }}
                                id={'email-input'}
                                className="pl-10"
                                placeholder={`you@${company.name.replaceAll(' ', '-')}.com`}
                                type="email"
                            />
                            {errors['email'] && <p className="text-sm text-red-500">{errors['email']}</p>}
                        </div>
                        <p className="text-muted-foreground text-sm">Must be an email address from the company domain</p>
                    </div>

                    <div className="bg-muted mb-4 space-y-2 rounded-lg p-4">
                        <Label htmlFor={'verification-details'}>Additional Verification Details</Label>
                        <Textarea
                            value={data['verification_details'] ?? ''}
                            onChange={(e) => setData('verification_details', e.target.value)}
                            onBlur={() => {
                                validate('verification_details');
                            }}
                            id={'verification-details'}
                            placeholder="Please provide any additional information that can help us verify your position at the company..."
                        />
                        {errors['verification_details'] && <p className="text-sm text-red-500">{errors['verification_details']}</p>}
                        <p className="text-muted-foreground text-sm">
                            This could include your company website profile, LinkedIn profile, or other verification details.
                        </p>
                    </div>

                    <DialogFooter>
                        <Button type="button" variant="outline" onClick={() => setOpen(false)} disabled={processing}>
                            Cancel
                        </Button>
                        <Button type="submit" disabled={processing}>
                            {processing ? 'Submitting...' : 'Submit Claim'}
                        </Button>
                    </DialogFooter>
                </form>
            </ResponsiveModal>
        </>
    );
}
