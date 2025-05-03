import AppearanceTabs from '@/components/appearance-tabs';
import DeleteUser from '@/components/delete-user';
import HeadingSmall from '@/components/heading-small';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import SettingsLayout from '@/layouts/settings/layout';
import { type SharedData } from '@/types';
import { Transition } from '@headlessui/react';
import { Head, Link, usePage } from '@inertiajs/react';
import { useForm } from 'laravel-precognition-react-inertia';
import { Mail, User } from 'lucide-react';
import { FormEventHandler } from 'react';

export default function Profile({ mustVerifyEmail, status }: { mustVerifyEmail: boolean; status?: string }) {
    const { auth } = usePage<SharedData>().props;

    const { data, setData, submit, errors, processing, recentlySuccessful, validate } = useForm('patch', route('profile.update'), {
        name: auth.user!.name,
        email: auth.user!.email,
    });

    const onSubmit: FormEventHandler = (e) => {
        e.preventDefault();

        submit({
            preserveScroll: true,
        });
    };

    return (
        <>
            <Head title="Profile settings" />

            <SettingsLayout>
                <HeadingSmall title="Profile information" description="Update your name and email address" />

                <form onSubmit={onSubmit} className="space-y-6">
                    <div className="grid gap-2">
                        <Label htmlFor="name">Name</Label>

                        <div className="relative mt-1 w-full lg:w-auto">
                            <User className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform text-gray-400" />
                            <Input
                                id="name"
                                className="pl-10"
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}
                                onBlur={() => validate('name')}
                                required
                                autoComplete="name"
                                placeholder="Full name"
                            />
                        </div>

                        <InputError className="mt-2" message={errors.name} />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="email">Email address</Label>
                        <div className="relative mt-1 w-full lg:w-auto">
                            <Mail className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform text-gray-400" />
                            <Input
                                id="email"
                                type="email"
                                className="pl-10"
                                value={data.email}
                                onChange={(e) => setData('email', e.target.value)}
                                onBlur={() => validate('email')}
                                required
                                autoComplete="username"
                                placeholder="Email address"
                            />
                        </div>
                        <InputError className="mt-2" message={errors.email} />
                    </div>

                    {mustVerifyEmail && auth.user!.email_verified_at === null && (
                        <div>
                            <p className="text-muted-foreground -mt-4 text-sm">
                                Your email address is unverified.{' '}
                                <Link
                                    href={route('verification.send')}
                                    method="post"
                                    as="button"
                                    className="text-foreground cursor-pointer underline decoration-neutral-300 underline-offset-4 transition-colors duration-300 ease-out hover:decoration-current! dark:decoration-neutral-500"
                                >
                                    Click here to resend the verification email.
                                </Link>
                            </p>

                            {status === 'verification-link-sent' && (
                                <div className="mt-2 text-sm font-medium text-green-600">
                                    A new verification link has been sent to your email address.
                                </div>
                            )}
                        </div>
                    )}

                    <div className="flex items-center gap-4">
                        <Button disabled={processing}>Save changes</Button>

                        <Transition
                            show={recentlySuccessful}
                            enter="transition ease-in-out"
                            enterFrom="opacity-0"
                            leave="transition ease-in-out"
                            leaveTo="opacity-0"
                        >
                            <p className="text-sm text-neutral-600">Saved</p>
                        </Transition>
                    </div>
                </form>
                <div className="space-y-6">
                    <HeadingSmall title="Appearance settings" description="Update your account's appearance settings" />
                    <AppearanceTabs />
                </div>

                <Separator className={'my-8'} />

                <DeleteUser />
            </SettingsLayout>
        </>
    );
}
