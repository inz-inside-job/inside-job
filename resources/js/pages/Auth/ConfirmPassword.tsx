import InputError from '@/components/InputError';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import GuestLayout from '@/layouts/GuestLayout';
import { Head } from '@inertiajs/react';
import { useForm } from 'laravel-precognition-react-inertia';
import { FormEventHandler } from 'react';

export default function ConfirmPassword() {
    const {
        data,
        setData,
        submit: post,
        processing,
        errors,
        reset,
        validate,
    } = useForm('post', route('password.confirm'), {
        password: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post({
            onFinish: () => reset('password'),
        });
    };

    return (
        <GuestLayout>
            <Head title="Confirm Password" />

            <div className="mb-4 text-sm text-gray-600 dark:text-gray-400">
                This is a secure area of the application. Please confirm your
                password before continuing.
            </div>

            <form onSubmit={submit}>
                <div className="mt-4">
                    <Label htmlFor="password">Password</Label>

                    <Input
                        id="password"
                        type="password"
                        name="password"
                        value={data.password}
                        className="mt-1 block w-full"
                        autoFocus={true}
                        onChange={(e) => setData('password', e.target.value)}
                        onBlur={() => validate('password')}
                    />

                    <InputError message={errors.password} className="mt-2" />
                </div>

                <div className="mt-4 flex items-center justify-end">
                    <Button
                        type="submit"
                        className="ms-4"
                        disabled={processing}
                    >
                        Confirm
                    </Button>
                </div>
            </form>
        </GuestLayout>
    );
}
