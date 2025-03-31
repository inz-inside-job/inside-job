import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import laravel from 'laravel-vite-plugin';
import { resolve } from 'node:path';
import { defineConfig } from 'vite';
import { run } from 'vite-plugin-run';

export default defineConfig({
    plugins: [
        laravel({
            input: ['resources/css/app.css', 'resources/js/app.tsx'],
            ssr: 'resources/js/ssr.tsx',
            refresh: true,
        }),
        react({
            babel: {
                plugins: ['babel-plugin-react-compiler'],
            },
        }),
        tailwindcss(),
        run({
            silent: false,
            input: [
                {
                    name: 'typescript transform',
                    run: ['php', 'artisan', 'typescript:transform'],
                    pattern: ['app/Data/**/*.php', 'app/Enums/**/*.php'],
                },
                {
                    name: 'ziggy types',
                    run: ['php', 'artisan', 'ziggy:generate', '--types-only', 'resources/js/types/ziggy.d.ts'],
                    pattern: ['routes/*.php'],
                },
                {
                    name: 'ide helper',
                    run: ['php', 'artisan', 'ide-helper:all'],
                    pattern: ['app/Models/**/*.php'],
                    build: false,
                    throttle: 10000,
                },
            ],
        }),
    ],
    esbuild: {
        jsx: 'automatic',
    },
    resolve: {
        alias: {
            'ziggy-js': resolve(__dirname, 'vendor/tightenco/ziggy'),
        },
    },
});
