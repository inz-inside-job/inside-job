import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type Appearance = 'light' | 'dark' | 'system';

interface AppearanceState {
    appearance: Appearance;
    updateAppearance: (appearance: Appearance) => void;
    // Method to apply the current theme without changing the setting
    applyCurrentTheme: () => void;
}

// Helper functions
const prefersDark = (): boolean => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
};

const setCookie = (name: string, value: string, days = 365): void => {
    if (typeof document === 'undefined') return;
    const maxAge = days * 24 * 60 * 60;
    document.cookie = `${name}=${value};path=/;max-age=${maxAge};SameSite=Lax`;
};

// Apply the theme based on the given appearance setting
const applyTheme = (appearance: Appearance): void => {
    if (typeof document === 'undefined') return;
    const isDark = appearance === 'dark' || (appearance === 'system' && prefersDark());
    document.documentElement.classList.toggle('dark', isDark);
};

// Create the store with persistence
export const useAppearanceStore = create<AppearanceState>()(
    persist(
        (set, get) => ({
            appearance: 'system',
            updateAppearance: (appearance: Appearance) => {
                set({ appearance });
                applyTheme(appearance);
                setCookie('appearance', appearance);
            },
            applyCurrentTheme: () => {
                const { appearance } = get();
                applyTheme(appearance);
            },
        }),
        {
            name: 'appearance',
            onRehydrateStorage: () => (state) => {
                // Apply theme when storage is rehydrated
                if (state) {
                    applyTheme(state.appearance);
                }
            },
        },
    ),
);

// Initialize system theme change listener
if (typeof window !== 'undefined') {
    // Handle system theme changes
    const handleSystemThemeChange = () => {
        const { appearance, applyCurrentTheme } = useAppearanceStore.getState();

        // Only update the visual theme if set to "system"
        if (appearance === 'system') {
            applyCurrentTheme();
        }
    };

    // Add listener for system theme changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', handleSystemThemeChange);
}

// Initialization function to be called in your app entry point
export function initializeAppearance(): void {
    useAppearanceStore.getState().applyCurrentTheme();
}
