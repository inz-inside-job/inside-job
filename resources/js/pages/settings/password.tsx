import HeadingSmall from '@/components/heading-small';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import SettingsLayout from '@/layouts/settings/layout';
import { Transition } from '@headlessui/react';
import { Head } from '@inertiajs/react';
import { useForm } from 'laravel-precognition-react-inertia';
import { AlertCircle, Check, Eye, EyeOff, Lock, Shield } from 'lucide-react';
import { FormEventHandler, useRef, useState } from 'react';

export default function Password() {
    const passwordInput = useRef<HTMLInputElement>(null);
    const currentPasswordInput = useRef<HTMLInputElement>(null);

    const { data, setData, errors, submit, reset, processing, recentlySuccessful, validate } = useForm('put', route('password.update'), {
        current_password: '',
        password: '',
        password_confirmation: '',
    });

    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [passwordStrength, setPasswordStrength] = useState(0);

    const updatePassword: FormEventHandler = (e) => {
        e.preventDefault();
        submit({
            preserveScroll: true,
            onSuccess: () => reset(),
            onError: (errors) => {
                if (errors.password) {
                    reset('password', 'password_confirmation');
                    passwordInput.current?.focus();
                }

                if (errors.current_password) {
                    reset('current_password');
                    currentPasswordInput.current?.focus();
                }
            },
        });
    };

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newPassword = e.target.value;

        // Simple password strength calculation
        let strength = 0;
        if (newPassword.length > 0) strength += 20;
        if (newPassword.length > 7) strength += 20;
        if (/[A-Z]/.test(newPassword)) strength += 20;
        if (/[0-9]/.test(newPassword)) strength += 20;
        if (/[^A-Za-z0-9]/.test(newPassword)) strength += 20;

        setPasswordStrength(strength);
    };

    const getStrengthColor = () => {
        if (passwordStrength < 40) return 'bg-destructive';
        if (passwordStrength < 80) return 'bg-amber-500';
        return 'bg-emerald-500';
    };

    const getStrengthText = () => {
        if (passwordStrength < 40) return 'Weak';
        if (passwordStrength < 80) return 'Good';
        return 'Strong';
    };

    return (
        <>
            <Head title="Profile settings" />

            <SettingsLayout>
                <HeadingSmall title="Update password" description="Ensure your account is using a long, random password to stay secure" />

                <form onSubmit={updatePassword} className="space-y-6">
                    <div className="space-y-8">
                        <div className="space-y-6">
                            <div className="space-y-2">
                                <label
                                    htmlFor="current-password"
                                    className="text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                >
                                    Current Password
                                </label>
                                <div className="relative">
                                    <div className="relative mt-1 w-full lg:w-auto">
                                        <Lock className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
                                        <Input
                                            id="current-password"
                                            className="pr-10 pl-10"
                                            value={data.current_password}
                                            onChange={(e) => setData('current_password', e.target.value)}
                                            onBlur={() => validate('current_password')}
                                            type={showCurrentPassword ? 'text' : 'password'}
                                            placeholder="Enter your current password"
                                        />
                                        <Button
                                            type="button"
                                            variant="ghost"
                                            size="icon"
                                            className="absolute top-1/2 right-1 h-7 w-7 -translate-y-1/2"
                                            onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                                        >
                                            {showCurrentPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                            <span className="sr-only">Toggle password visibility</span>
                                        </Button>
                                    </div>

                                    <InputError message={errors.current_password} />
                                </div>
                            </div>

                            <Separator className="my-4" />

                            <div className="space-y-2">
                                <label
                                    htmlFor="new-password"
                                    className="text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                >
                                    New Password
                                </label>
                                <div className="relative">
                                    <div className="relative mt-1 w-full lg:w-auto">
                                        <Shield className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />

                                        <Input
                                            id="new-password"
                                            className="pr-10 pl-10"
                                            type={showNewPassword ? 'text' : 'password'}
                                            placeholder="Enter your new password"
                                            value={data.password}
                                            onBlur={() => validate('password')}
                                            onChange={(e) => {
                                                handlePasswordChange(e);
                                                setData('password', e.target.value);
                                            }}
                                        />
                                        <Button
                                            type="button"
                                            variant="ghost"
                                            size="icon"
                                            className="absolute top-1/2 right-1 h-7 w-7 -translate-y-1/2"
                                            onClick={() => setShowNewPassword(!showNewPassword)}
                                        >
                                            {showNewPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                            <span className="sr-only">Toggle password visibility</span>
                                        </Button>
                                    </div>

                                    <InputError message={errors.password} />
                                </div>

                                {data.password && (
                                    <div className="mt-2 space-y-2">
                                        <div className="flex items-center justify-between">
                                            <span className="text-muted-foreground text-sm">Password strength:</span>
                                            <span
                                                className={`text-sm font-medium ${
                                                    passwordStrength < 40
                                                        ? 'text-destructive'
                                                        : passwordStrength < 80
                                                          ? 'text-amber-500'
                                                          : 'text-emerald-500'
                                                }`}
                                            >
                                                {getStrengthText()}
                                            </span>
                                        </div>
                                        <Progress value={passwordStrength} className={`h-2 ${getStrengthColor()}`} />

                                        <div className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2">
                                            <div className="flex items-center gap-2 text-sm">
                                                <div className={`rounded-full p-0.5 ${data.password.length > 7 ? 'bg-emerald-500' : 'bg-muted'}`}>
                                                    <Check
                                                        className={`h-3 w-3 ${data.password.length > 7 ? 'text-white' : 'text-muted-foreground'}`}
                                                    />
                                                </div>
                                                <span className={data.password.length > 7 ? 'text-foreground' : 'text-muted-foreground'}>
                                                    At least 8 characters
                                                </span>
                                            </div>
                                            <div className="flex items-center gap-2 text-sm">
                                                <div className={`rounded-full p-0.5 ${/[A-Z]/.test(data.password) ? 'bg-emerald-500' : 'bg-muted'}`}>
                                                    <Check
                                                        className={`h-3 w-3 ${/[A-Z]/.test(data.password) ? 'text-white' : 'text-muted-foreground'}`}
                                                    />
                                                </div>
                                                <span className={/[A-Z]/.test(data.password) ? 'text-foreground' : 'text-muted-foreground'}>
                                                    Uppercase letter
                                                </span>
                                            </div>
                                            <div className="flex items-center gap-2 text-sm">
                                                <div className={`rounded-full p-0.5 ${/[0-9]/.test(data.password) ? 'bg-emerald-500' : 'bg-muted'}`}>
                                                    <Check
                                                        className={`h-3 w-3 ${/[0-9]/.test(data.password) ? 'text-white' : 'text-muted-foreground'}`}
                                                    />
                                                </div>
                                                <span className={/[0-9]/.test(data.password) ? 'text-foreground' : 'text-muted-foreground'}>
                                                    Number
                                                </span>
                                            </div>
                                            <div className="flex items-center gap-2 text-sm">
                                                <div
                                                    className={`rounded-full p-0.5 ${/[^A-Za-z0-9]/.test(data.password) ? 'bg-emerald-500' : 'bg-muted'}`}
                                                >
                                                    <Check
                                                        className={`h-3 w-3 ${/[^A-Za-z0-9]/.test(data.password) ? 'text-white' : 'text-muted-foreground'}`}
                                                    />
                                                </div>
                                                <span className={/[^A-Za-z0-9]/.test(data.password) ? 'text-foreground' : 'text-muted-foreground'}>
                                                    Special character
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>

                            <div className="space-y-2">
                                <label
                                    htmlFor="confirm-password"
                                    className="text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                >
                                    Confirm New Password
                                </label>
                                <div className="relative">
                                    <div className="relative mt-1 w-full lg:w-auto">
                                        <Shield className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
                                        <Input
                                            id="confirm-password"
                                            className="pr-10 pl-10"
                                            type={showConfirmPassword ? 'text' : 'password'}
                                            value={data.password_confirmation}
                                            onChange={(e) => setData('password_confirmation', e.target.value)}
                                            placeholder="Confirm your new password"
                                        />
                                        <Button
                                            type="button"
                                            variant="ghost"
                                            size="icon"
                                            className="absolute top-1/2 right-1 h-7 w-7 -translate-y-1/2"
                                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                        >
                                            {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                            <span className="sr-only">Toggle password visibility</span>
                                        </Button>
                                    </div>
                                    <InputError message={errors.password_confirmation} />
                                </div>
                            </div>

                            <div className="pt-4">
                                <div className="bg-muted/50 flex items-start gap-4 rounded-lg border p-4">
                                    <AlertCircle className="mt-0.5 h-5 w-5 text-amber-500" />
                                    <div className="space-y-1">
                                        <p className="text-sm font-medium">Password requirements</p>
                                        <p className="text-muted-foreground text-sm">
                                            Ensure your new password is at least 8 characters long and includes a mix of uppercase letters, numbers,
                                            and special characters for better security.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center gap-4">
                                <Button disabled={processing}>Save password</Button>

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
                        </div>
                    </div>
                </form>
            </SettingsLayout>
        </>
    );
}
