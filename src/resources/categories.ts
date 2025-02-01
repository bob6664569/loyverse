import { APIResource } from './base';
import type { Category, ListCategoriesParams } from '../types';

export class Categories extends APIResource {
    async get(id: string): Promise<Category> {
        return this.getResource<Category>(`/categories/${id}`);
    }

    async list(params: ListCategoriesParams = {}): Promise<{ categories: Category[]; cursor?: string }> {
        return this.getResource<{ categories: Category[]; cursor?: string }>('/categories', params);
    }

    async *listAll(params: Omit<ListCategoriesParams, 'cursor'> = {}): AsyncGenerator<Category> {
        yield* this.paginate<Category>('/categories', params);
    }

    async create(data: Partial<Category>): Promise<Category> {
        return this.postResource<Category>('/categories', data);
    }

    async delete(id: string) {
        return this.deleteResource(`/categories/${id}`);
    }
}