import type { Loyverse } from '../client';

export abstract class APIResource {
    protected client: Loyverse;

    constructor(client: Loyverse) {
        this.client = client;
    }

    protected async getResource<T, P = Record<string, unknown>>(path: string, params?: P): Promise<T> {
        return this.client.request('GET', path, { params });
    }

    protected async postResource<T>(path: string, data?: Record<string, unknown>): Promise<T> {
        return this.client.request('POST', path, { data });
    }

    protected async deleteResource<T = { deleted_object_ids: string[] }>(path: string): Promise<T> {
        return this.client.request('DELETE', path);
    }

    protected async *paginate<T>(path: string, params = {}) {
        let cursor = null;
        do {
            const response = await this.getResource<{ items: T[]; cursor?: string }>(path, { ...params, cursor });
            yield* response.items || [];
            cursor = response.cursor;
        } while (cursor);
    }
}