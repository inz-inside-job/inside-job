import { type ComponentProps } from 'react';

type AppContentProps = ComponentProps<'main'>;

export function AppContent({ children, ...props }: AppContentProps) {
    return (
        <main className="mx-auto flex h-full w-full max-w-7xl flex-1 flex-col gap-4 rounded-xl" {...props}>
            {children}
        </main>
    );
}
