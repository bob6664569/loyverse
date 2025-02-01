import type { PaginationParams } from './index';

export interface Item {
    id: string;
    handle: string;
    item_name: string;
    reference_id?: string;
    category_id?: string;
    track_stock: boolean;
    sold_by_weight: boolean;
    variants: ItemVariant[];
    created_at: string;
    updated_at: string;
    deleted_at?: string;
}

export interface ItemVariant {
    variant_id: string;
    item_id: string;
    sku: string;
    barcode?: string;
    cost: number;
    default_price: number;
    stores: VariantStore[];
}

export interface VariantStore {
    store_id: string;
    price: number;
    available_for_sale: boolean;
    optimal_stock?: number;
    low_stock?: number;
}

export interface Customer {
    id: string;
    name: string;
    email?: string;
    phone_number?: string;
    address?: string;
    city?: string;
    customer_code?: string;
    total_points: number;
    created_at: string;
    updated_at: string;
}

export interface CustomerParams extends PaginationParams {
    customer_ids?: string;
    email?: string;
    created_at_min?: string;
    created_at_max?: string;
    updated_at_min?: string;
    updated_at_max?: string;
}

export interface InventoryLevel {
    variant_id: string;
    store_id: string;
    in_stock: number;
    updated_at: string;
}

export * from './categories';// src/types/resources.ts
export interface Item {
    id: string;
    handle: string;
    item_name: string;
    reference_id?: string;
    category_id?: string;
    track_stock: boolean;
    sold_by_weight: boolean;
    variants: ItemVariant[];
    created_at: string;
    updated_at: string;
    deleted_at?: string;
}

export interface ItemVariant {
    variant_id: string;
    item_id: string;
    sku: string;
    barcode?: string;
    cost: number;
    default_price: number;
    stores: VariantStore[];
}

export interface VariantStore {
    store_id: string;
    price: number;
    available_for_sale: boolean;
    optimal_stock?: number;
    low_stock?: number;
}

export interface Customer {
    id: string;
    name: string;
    email?: string;
    phone_number?: string;
    address?: string;
    city?: string;
    customer_code?: string;
    total_points: number;
    created_at: string;
    updated_at: string;
}

export interface InventoryLevel {
    variant_id: string;
    store_id: string;
    in_stock: number;
    updated_at: string;
}