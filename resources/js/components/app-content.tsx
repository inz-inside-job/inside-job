import { type ComponentProps } from 'react';

type AppContentProps = ComponentProps<'main'>;

export function AppContent({ children, ...props }: AppContentProps) {
    return (
        <main className="mx-auto flex h-full w-full max-w-8xl flex-1 flex-col" {...props}>
            {children}
        </main>
    );
}
