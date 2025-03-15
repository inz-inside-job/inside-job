import '../css/app.css';

import AppLayout from '@/layouts/app-layout';
import { Page } from '@/types';
import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { createRoot } from 'react-dom/client';
import {initializeAppearance} from '@/store/appearance'

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: async (name) => {
        const page = await (resolvePageComponent(`./pages/${name}.tsx`, import.meta.glob('./pages/**/*.tsx')) as Promise<Page>);
        page.default.layout = page.default.layout || ((page) => <AppLayout children={page} />);
        return page;
    },
    setup({ el, App, props }) {
        const root = createRoot(el);
        root.render(<App {...props} />);
    },
    progress: {
        color: '#4B5563',
    },
});

// This will set light / dark mode on load...
initializeAppearance();
