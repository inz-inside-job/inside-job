import { usePage } from '@inertiajs/react';
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

type QueryBuilderFilterValuePrimitive = string | number | boolean | null;
type QueryBuilderFilterValue =
    | QueryBuilderFilterValuePrimitive
    | ReadonlyArray<QueryBuilderFilterValuePrimitive>
    | ReadonlyArray<ReadonlyArray<QueryBuilderFilterValuePrimitive>>; // Allow nested arrays

export interface QueryBuilderParams<
    FilterMap extends Record<string, QueryBuilderFilterValue> = Record<string, QueryBuilderFilterValue>,
    SortKeys extends string = string,
> {
    cursor?: string;
    filters?: {
        [K in keyof FilterMap]?: FilterMap[K] | Readonly<FilterMap[K] extends ReadonlyArray<unknown> ? FilterMap[K] : never>;
    };
    sorts?: {
        [K in SortKeys]?: -1 | 0 | 1 | 'asc' | 'desc' | null;
    };
}

/**
 * Helper function that parses a data object provided and builds query parameters
 * for the Laravel Query Builder package automatically. This will apply sorts and
 * filters deterministically based on the provided values.
 */
export const withQueryBuilderParams = (data?: QueryBuilderParams): Record<string, string> => {
    if (!data) return {};

    const filters = Object.keys(data.filters || {}).reduce(
        (obj, key) => {
            const value = data.filters?.[key];

            return value == null || value === '' ? obj : { ...obj, [`filter[${key}]`]: value };
        },
        {} as NonNullable<QueryBuilderParams['filters']>,
    );

    const sorts = Object.keys(data.sorts || {}).reduce((arr, key) => {
        const value = data.sorts?.[key];
        if (!value || !['asc', 'desc', 1, -1].includes(value)) {
            return arr;
        }

        return [...arr, (value === -1 || value === 'desc' ? '-' : '') + key];
    }, [] as string[]);

    const query = { ...filters } as Record<string, string>;

    if (data.cursor) {
        query.cursor = data.cursor;
    }

    if (sorts.length) {
        query.sort = sorts.join(',');
    }

    return query;
};

type RequireKeys<T, K extends keyof T> = Required<Pick<T, K>> & Omit<T, K>;

type RequiredQueryBuilderParams<
    FilterMap extends Record<string, QueryBuilderFilterValue> = Record<string, QueryBuilderFilterValue>,
    SortKeys extends string = string,
> = RequireKeys<QueryBuilderParams<FilterMap, SortKeys>, 'filters' | 'sorts'>;

// Type-safe value parser
const parseFilterValue = (value: string): QueryBuilderFilterValue => {
    if (value === 'null') return null;
    if (value === 'true') return true;
    if (value === 'false') return false;
    if (!Number.isNaN(Number(value)) && value.trim() !== '') return Number(value);
    return value;
};

export const useGetQueryParams = <
    FilterMap extends Record<string, QueryBuilderFilterValue> = Record<string, QueryBuilderFilterValue>,
    SortKeys extends string = string,
>(): RequiredQueryBuilderParams<FilterMap, SortKeys> => {
    const pageUrl = usePage().url;
    const params = new URLSearchParams(pageUrl.split('?')[1] || '');

    const filters: QueryBuilderParams<FilterMap, SortKeys>['filters'] = {};
    const sorts: QueryBuilderParams<FilterMap, SortKeys>['sorts'] = {};
    let cursor: string | undefined;

    params.forEach((value, key) => {
        if (key.startsWith('filter[') && key.endsWith(']')) {
            const filterKey = key.slice(7, -1) as string;
            const parts = filterKey.split('][');
            let current = filters;

            for (let i = 0; i < parts.length; i++) {
                const part = parts[i] as keyof typeof current;

                if (i === parts.length - 1) {
                    const parsedValue = value.includes(',') ? value.split(',').map(parseFilterValue) : parseFilterValue(value);

                    current[part] = parsedValue as FilterMap[keyof FilterMap];
                } else {
                    const nextPart = parts[i + 1];
                    const isArray = /^\d+$/.test(nextPart);

                    if (!current[part]) {
                        current[part] = (isArray ? [] : {}) as FilterMap[keyof FilterMap];
                    }
                    current = current[part] as typeof filters;
                }
            }
        } else if (key === 'sort') {
            value.split(',').forEach((sortKey) => {
                const direction = sortKey.startsWith('-') ? 'desc' : 'asc';
                const key = sortKey.startsWith('-') ? (sortKey.slice(1) as SortKeys) : (sortKey as SortKeys);
                sorts[key] = direction;
            });
        } else if (key === 'cursor') {
            cursor = value;
        }
    });

    return {
        cursor,
        filters: filters as NonNullable<typeof filters>,
        sorts: sorts as NonNullable<typeof sorts>,
    };
};
