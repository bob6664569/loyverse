import type Loyverse from '../client';
import type { BaseParams, PaginatedResponse } from '../types';

export abstract class APIResource {
    protected client: Loyverse;

    constructor(client: Loyverse) {
        this.client = client;
    }

    protected async getResource<T>(path: string, params?: BaseParams): Promise<T> {
        return this.client.request('GET', path, { params });
    }

    protected async postResource<T>(path: string, data?: Record<string, unknown>): Promise<T> {
        return this.client.request('POST', path, { data });
    }

    protected async deleteResource<T = { deleted_object_ids: string[] }>(path: string): Promise<T> {
        return this.client.request('DELETE', path);
    }

    protected async *paginate<T>(path: string, params: BaseParams = {}) {
        let currentCursor: string | undefined = undefined;
        let nextResponse: PaginatedResponse<T>;

        do {
            nextResponse = await this.getResource<PaginatedResponse<T>>(
                path,
                { ...params, cursor: currentCursor }
            );
            yield* nextResponse.items || [];
            currentCursor = nextResponse.cursor;
        } while (currentCursor);
    }
}