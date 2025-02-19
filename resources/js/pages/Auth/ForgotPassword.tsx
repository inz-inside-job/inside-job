import InputError from '@/components/InputError';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import GuestLayout from '@/layouts/GuestLayout';
import { Head } from '@inertiajs/react';
import { useForm } from 'laravel-precognition-react-inertia';
import { FormEventHandler } from 'react';

export default function ForgotPassword({ status }: { status?: string }) {
    const {
        data,
        setData,
        submit: post,
        processing,
        errors,
        validate,
    } = useForm('post', route('password.email'), {
        email: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post();
    };

    return (
        <GuestLayout>
            <Head title="Forgot Password" />

            <div className="mb-4 text-sm text-gray-600 dark:text-gray-400">
                Forgot your password? No problem. Just let us know your email
                address and we will email you a password reset link that will
                allow you to choose a new one.
            </div>

            {status && (
                <div className="mb-4 text-sm font-medium text-green-600 dark:text-green-400">
                    {status}
                </div>
            )}

            <form onSubmit={submit}>
                <Input
                    id="email"
                    type="email"
                    name="email"
                    value={data.email}
                    className="mt-1 block w-full"
                    autoFocus={true}
                    onChange={(e) => setData('email', e.target.value)}
                    onBlur={() => validate('email')}
                />

                <InputError message={errors.email} className="mt-2" />

                <div className="mt-4 flex items-center justify-end">
                    <Button
                        type="submit"
                        className="ms-4"
                        disabled={processing}
                    >
                        Email Password Reset Link
                    </Button>
                </div>
            </form>
        </GuestLayout>
    );
}
