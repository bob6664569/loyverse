import { APIResource } from './base';
import type { Item } from '../types/resources';
import type { PaginationParams } from '../types';

export interface ListItemsParams extends PaginationParams {
    items_ids?: string;
    show_deleted?: boolean;
}

export class Items extends APIResource {
    async get(id: string): Promise<Item> {
        return this.getResource<Item>(`/items/${id}`);
    }

    async list(params: ListItemsParams = {}): Promise<{ items: Item[]; cursor?: string }> {
        return this.getResource<{ items: Item[]; cursor?: string }>('/items', params);
    }

    async *listAll(params: Omit<ListItemsParams, 'cursor'> = {}): AsyncGenerator<Item> {
        yield* this.paginate<Item>('/items', params);
    }

    async create(data: Partial<Item>): Promise<Item> {
        return this.postResource<Item>('/items', data);
    }

    async delete(id: string) {
        return this.deleteResource(`/items/${id}`);
    }

    async uploadImage(id: string, imageData: Buffer | Blob): Promise<void> {
        await this.client.request('POST', `/items/${id}/image`, {
            headers: { 'Content-Type': 'image/png' },
            body: imageData
        });
    }

    async deleteImage(id: string): Promise<void> {
        await this.deleteResource(`/items/${id}/image`);
    }
}