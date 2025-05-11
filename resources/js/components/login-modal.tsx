import InputError from '@/components/input-error';
import { ResponsiveModal, ResponsiveModalDescription, ResponsiveModalHeader, ResponsiveModalTitle } from '@/components/responsive-modal';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Link, usePage } from '@inertiajs/react';
import { useForm } from 'laravel-precognition-react-inertia';
import { LoaderCircle } from 'lucide-react';
import { FormEventHandler } from 'react';

type LoginForm = {
    email: string;
    password: string;
    remember: boolean;
};

interface LoginModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export default function LoginModal({ open, onOpenChange }: LoginModalProps) {
    const { data, setData, submit, processing, errors, reset, validate } = useForm<LoginForm>('post', route('login'), {
        email: '',
        password: '',
        remember: true,
    });

    const page = usePage();
    const {
        auth: { status },
    } = page.props;

    const onSubmit: FormEventHandler = (e) => {
        e.preventDefault();
        submit({
            onError: () => {
                reset('password');
            },
            onSuccess: () => {
                reset('password', 'email', 'remember');
                onOpenChange(false);
            },
        });
    };

    return (
        <ResponsiveModal open={open} onOpenChange={onOpenChange}>
            <ResponsiveModalHeader className="pb-4">
                <ResponsiveModalTitle>Log in to your account</ResponsiveModalTitle>
                <ResponsiveModalDescription>Enter your email and password below to log in</ResponsiveModalDescription>
            </ResponsiveModalHeader>

            <form className="flex flex-col gap-6 px-4 sm:px-0" onSubmit={onSubmit}>
                <div className="grid gap-6">
                    <div className="grid gap-2">
                        <Label htmlFor="email">Email address</Label>
                        <Input
                            id="email"
                            type="email"
                            required
                            autoFocus
                            tabIndex={1}
                            autoComplete="email"
                            value={data.email}
                            onChange={(e) => setData('email', e.target.value)}
                            onBlur={() => validate('email')}
                            placeholder="email@example.com"
                        />
                        <InputError message={errors.email} />
                    </div>

                    <div className="grid gap-2">
                        <div className="flex items-center">
                            <Label htmlFor="password">Password</Label>
                            <Link href={route('password.request')} className="ml-auto text-sm" tabIndex={5} onClick={() => onOpenChange(false)}>
                                Forgot password?
                            </Link>
                        </div>
                        <Input
                            id="password"
                            type="password"
                            required
                            tabIndex={2}
                            autoComplete="current-password"
                            value={data.password}
                            onChange={(e) => setData('password', e.target.value)}
                            onBlur={() => validate('password')}
                            placeholder="Password"
                        />
                        <InputError message={errors.password} />
                    </div>

                    <div className="flex items-center space-x-3">
                        <Checkbox
                            id="remember"
                            name="remember"
                            tabIndex={3}
                            checked={data.remember}
                            onClick={() => setData('remember', !data.remember)}
                            onBlur={() => validate('remember')}
                        />
                        <Label htmlFor="remember">Remember me</Label>
                    </div>

                    <Button type="submit" className="mt-4 w-full" tabIndex={4} disabled={processing}>
                        {processing && <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />}
                        Log in
                    </Button>
                </div>

                <div className="text-muted-foreground pb-6 text-center text-sm">
                    Don't have an account?{' '}
                    <Link href={route('register')} tabIndex={5} onClick={() => onOpenChange(false)}>
                        Sign up
                    </Link>
                </div>
            </form>

            {status && <div className="mb-4 text-center text-sm font-medium text-green-600">{status}</div>}
        </ResponsiveModal>
    );
}
