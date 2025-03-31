import { ReloadOptions, router } from '@inertiajs/core';
import { createElement, ReactElement, useCallback, useEffect, useRef, useState } from 'react';

interface WhenVisibleProps {
    children: ReactElement | number | string;
    fallback: ReactElement | number | string;
    data?: string | string[];
    params?: ReloadOptions;
    buffer?: number;
    as?: string;
    always?: boolean;
    disabled?: boolean;
}

const WhenVisible = ({ children, data, params, buffer, as, always, fallback, disabled }: WhenVisibleProps) => {
    always = always ?? false;
    as = as ?? 'div';
    fallback = fallback ?? null;

    const [loaded, setLoaded] = useState(disabled);
    const hasFetched = useRef<boolean>(false);
    const fetching = useRef<boolean>(false);
    const ref = useRef<HTMLDivElement>(null);

    const getReloadParams = useCallback<() => Partial<ReloadOptions>>(() => {
        if (data) {
            return {
                only: (Array.isArray(data) ? data : [data]) as string[],
            };
        }

        if (!params) {
            throw new Error('You must provide either a `data` or `params` prop.');
        }

        return params;
    }, [params, data]);

    useEffect(() => {
        if (!ref.current) {
            return;
        }

        const observer = new IntersectionObserver(
            (entries) => {
                if (disabled) return;

                if (!entries[0].isIntersecting) {
                    return;
                }

                if (!always && hasFetched.current) {
                    observer.disconnect();
                }

                if (fetching.current) {
                    return;
                }

                hasFetched.current = true;
                fetching.current = true;

                const reloadParams = getReloadParams();

                router.reload({
                    ...reloadParams,
                    onStart: (e) => {
                        fetching.current = true;
                        reloadParams.onStart?.(e);
                    },
                    onFinish: (e) => {
                        setLoaded(true);
                        fetching.current = false;
                        reloadParams.onFinish?.(e);

                        if (!always) {
                            observer.disconnect();
                        }
                    },
                });
            },
            {
                rootMargin: `${buffer || 0}px`,
            },
        );

        observer.observe(ref.current);

        return () => {
            observer.disconnect();
        };

        // eslint-disable-next-line react-compiler/react-compiler
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ref, getReloadParams, buffer, disabled]);

    if (always || !loaded) {
        return createElement(
            as,
            {
                props: null,
                ref,
            },
            loaded ? children : fallback,
        );
    }

    return loaded ? children : null;
};

WhenVisible.displayName = 'InertiaWhenVisible';

export default WhenVisible;
