import type { PaginationParams } from './index';

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