import { APIResource } from './base';
import { InventoryLevel } from '../types/resources';
import type { PaginationParams } from '../types';

export interface GetInventoryParams extends PaginationParams {
    store_ids?: string;
    variant_ids?: string;
    updated_at_min?: string;
    updated_at_max?: string;
}

export class Inventory extends APIResource {
    async getLevels(params: GetInventoryParams = {}): Promise<{ inventory_levels: InventoryLevel[] }> {
        return this.getResource<{ inventory_levels: InventoryLevel[] }>('/inventory', params);
    }

    async update(levels: Partial<InventoryLevel>[]): Promise<{ inventory_levels: InventoryLevel[] }> {
        return this.postResource<{ inventory_levels: InventoryLevel[] }>('/inventory', { inventory_levels: levels });
    }

    async *listAll(params: Omit<GetInventoryParams, 'cursor'> = {}): AsyncGenerator<InventoryLevel> {
        yield* this.paginate<InventoryLevel>('/inventory', params);
    }
}