import HeadingSmall from '@/components/heading-small';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useForm } from 'laravel-precognition-react-inertia';
import { FormEventHandler, useRef, useState } from 'react';
import { ResponsiveModal, ResponsiveModalDescription, ResponsiveModalFooter, ResponsiveModalTitle } from './responsive-modal';

export default function DeleteUser() {
    const passwordInput = useRef<HTMLInputElement>(null);
    const { data, setData, submit, processing, reset, errors, clearErrors, validate } = useForm('delete', route('profile.destroy'), { password: '' });

    const [open, setOpen] = useState(false);

    const deleteUser: FormEventHandler = (e) => {
        e.preventDefault();

        submit({
            preserveScroll: true,
            onSuccess: () => closeModal(),
            onError: () => passwordInput.current?.focus(),
            onFinish: () => reset(),
        });
    };

    const closeModal = () => {
        clearErrors();
        reset();
        setOpen(false);
    };

    return (
        <div className="space-y-6">
            <HeadingSmall title="Delete account" description="Delete your account and all of its resources" />
            <div className="space-y-4 rounded-lg border border-red-100 bg-red-50 p-4 dark:border-red-200/10 dark:bg-red-700/10">
                <div className="relative space-y-0.5 text-red-600 dark:text-red-100">
                    <p className="font-medium">Warning</p>
                    <p className="text-sm">Please proceed with caution, this cannot be undone.</p>
                </div>

                <Button variant="destructive" onClick={() => setOpen(true)} className="cursor-pointer">
                    Delete account
                </Button>

                <ResponsiveModal open={open} onOpenChange={setOpen}>
                    <ResponsiveModalTitle>Are you sure you want to delete your account?</ResponsiveModalTitle>
                    <ResponsiveModalDescription className="mt-2 mb-4">
                        Once your account is deleted, all of its resources and data will also be permanently deleted. Please enter your password to
                        confirm you would like to permanently delete your account.
                    </ResponsiveModalDescription>
                    <form className="space-y-6" onSubmit={deleteUser}>
                        <div className="grid gap-2">
                            <Label htmlFor="password" className="sr-only">
                                Password
                            </Label>

                            <Input
                                id="password"
                                type="password"
                                name="password"
                                ref={passwordInput}
                                value={data.password}
                                onChange={(e) => setData('password', e.target.value)}
                                onBlur={() => validate('password')}
                                placeholder="Password"
                                autoComplete="current-password"
                            />

                            <InputError message={errors.password} />
                        </div>

                        <ResponsiveModalFooter className="gap-2">
                            <Button variant="secondary" onClick={closeModal}>
                                Cancel
                            </Button>

                            <Button variant="destructive" disabled={processing} asChild>
                                <button type="submit">Delete account</button>
                            </Button>
                        </ResponsiveModalFooter>
                    </form>
                </ResponsiveModal>
            </div>
        </div>
    );
}
