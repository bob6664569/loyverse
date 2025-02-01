import type { RetryConfig } from '../config/retry';

export interface ClientOptions {
    retryConfig?: RetryConfig;
}

export interface RequestOptions {
    params?: Record<string, string | number | boolean | undefined>;
    data?: Record<string, unknown>;
    headers?: Record<string, string>;
    [key: string]: unknown;
}

export interface PaginationParams {
    limit?: number;
    cursor?: string;
    [key: string]: unknown;
}

export interface Category {
    id: string;
    name: string;
    color?: string;
    created_at: string;
    updated_at: string;
    deleted_at?: string;
}

export interface ListCategoriesParams extends PaginationParams {
    categories_ids?: string;
    show_deleted?: boolean;
}

