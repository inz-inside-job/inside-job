import { type ComponentProps } from 'react';

type AppContentProps = ComponentProps<'main'>;

export function AppContent({ children, ...props }: AppContentProps) {
    return (
        <main className="max-w-8xl mx-auto flex h-full w-full flex-1 flex-col" {...props}>
            {children}
        </main>
    );
}
