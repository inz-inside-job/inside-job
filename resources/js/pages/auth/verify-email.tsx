import { Button } from '@/components/ui/button';
import AuthLayout from '@/layouts/auth-layout';
import { Head, Link, usePage } from '@inertiajs/react';
import { useForm } from 'laravel-precognition-react-inertia';
import { LoaderCircle } from 'lucide-react';
import { FormEventHandler } from 'react';

export default function VerifyEmail() {
    const { submit, processing } = useForm('post', route('verification.send'), {});

    const page = usePage();
        const {
            auth: { status },
        } = page.props;

    const onSubmit: FormEventHandler = (e) => {
        e.preventDefault();

        submit();
    };

    return (
        <AuthLayout title="Verify email" description="Please verify your email address by clicking on the link we just emailed to you.">
            <Head title="Email verification" />

            {status === 'verification-link-sent' && (
                <div className="mb-4 text-center text-sm font-medium text-green-600">
                    A new verification link has been sent to the email address you provided during registration.
                </div>
            )}

            <form onSubmit={onSubmit} className="space-y-6 text-center">
                <Button disabled={processing} variant="secondary">
                    {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                    Resend verification email
                </Button>

                <Link href={route('logout')} method="post" className="mx-auto block text-sm">
                    Log out
                </Link>
            </form>
        </AuthLayout>
    );
}
