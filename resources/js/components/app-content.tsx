import * as React from 'react';

type AppContentProps = React.ComponentProps<'div'>;

export function AppContent({ children, ...props }: AppContentProps) {
    return (
        <main className="mx-auto flex h-full w-full max-w-7xl flex-1 flex-col gap-4 rounded-xl" {...props}>
            {children}
        </main>
    );
}
