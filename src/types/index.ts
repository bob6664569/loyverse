import type { RetryConfig } from '../config/retry';

export interface ClientOptions {
    retryConfig?: RetryConfig;
}

export interface RequestOptions {
    params?: Record<string, string | number | boolean | null | undefined>;
    data?: Record<string, unknown>;
    headers?: Record<string, string>;
    body?: BodyInit;
}

export interface BaseParams {
    [key: string]: string | number | boolean | undefined;
}

export interface PaginationParams extends BaseParams {
    limit?: number;
    cursor?: string;
    created_at_min?: string;
    created_at_max?: string;
    updated_at_min?: string;
    updated_at_max?: string;
}

export interface PaginatedResponse<T> {
    items: T[];
    cursor?: string;
    total_count?: number;
}

export * from './resources';
export * from './categories';