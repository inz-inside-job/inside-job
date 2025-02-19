import InputError from '@/components/InputError';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useForm } from 'laravel-precognition-react-inertia';
import { FormEventHandler, useRef } from 'react';

export default function DeleteUserForm({
    className = '',
}: {
    className?: string;
}) {
    const passwordInput = useRef<HTMLInputElement>(null);

    const {
        data,
        setData,
        submit: destroy,
        processing,
        reset,
        errors,
        clearErrors,
    } = useForm('delete', route('profile.destroy'), {
        password: '',
    });

    const deleteUser: FormEventHandler = (e) => {
        e.preventDefault();
        console.log(e);

        destroy({
            preserveScroll: true,
            onSuccess: () => onClose(),
            onError: () => passwordInput.current?.focus(),
            onFinish: () => reset(),
        });
    };

    const onClose = () => {
        clearErrors();
        reset();
    };

    return (
        <section className={`space-y-6 ${className}`}>
            <header>
                <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                    Delete Account
                </h2>

                <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                    Once your account is deleted, all of its resources and data
                    will be permanently deleted. Before deleting your account,
                    please download any data or information that you wish to
                    retain.
                </p>
            </header>

            <Dialog
                onOpenChange={(open) => {
                    if (!open) onClose();
                }}
            >
                <DialogTrigger asChild>
                    <Button variant="destructive">Delete Account</Button>
                </DialogTrigger>

                <DialogContent>
                    <form onSubmit={deleteUser}>
                        <DialogHeader>
                            <DialogTitle>
                                Are you sure you want to delete your account?
                            </DialogTitle>
                        </DialogHeader>
                        <DialogDescription>
                            Once your account is deleted, all of its resources
                            and data will be permanently deleted. Please enter
                            your password to confirm you would like to
                            permanently delete your account.
                        </DialogDescription>

                        <div className="my-2">
                            <Label htmlFor="password" className="sr-only">
                                Password
                            </Label>

                            <Input
                                id="password"
                                type="password"
                                name="password"
                                ref={passwordInput}
                                value={data.password}
                                onChange={(e) =>
                                    setData('password', e.target.value)
                                }
                                className="mt-1 block w-3/4"
                                autoFocus
                                placeholder="Password"
                            />

                            <InputError
                                message={errors.password}
                                className="mt-2"
                            />
                        </div>

                        <DialogFooter>
                            <DialogClose asChild>
                                <Button variant="ghost">Cancel</Button>
                            </DialogClose>

                            <Button
                                variant="destructive"
                                type="submit"
                                className="ms-3"
                                disabled={processing}
                            >
                                Delete Account
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </section>
    );
}
