import { LucideIcon } from 'lucide-react';
import type { Config } from 'ziggy-js';

export interface Auth {
    status?: string;
    user?: User;
}

export interface BreadcrumbItem {
    title: string;
    href: string;
}

export interface NavItem {
    title: string;
    url: string;
    icon?: LucideIcon | null;
    isActive?: boolean;
}

export interface SharedData {
    name: string;
    auth: Auth;
    ziggy: Config & { location: string };
    [key: string]: unknown;
}

export interface User {
    id: number;
    name: string;
    email: string;
    avatar?: string;
    email_verified_at: string | null;
    created_at: string;
    updated_at: string;
    [key: string]: unknown; // This allows for additional properties...
}

export interface Page {
    default: {
        layout: (page: React.ReactNode) => React.ReactNode;
    };
}

export interface CursorPaginate<T> {
    data: T[];
    links: unknown[];
    meta: Meta;
}
export interface Meta {
    path: string;
    per_page: number;
    next_cursor: string;
    next_page_url: string;
    prev_cursor: string?;
    prev_page_url: string?;
}
