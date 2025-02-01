// src/client.ts
import { RetryConfig } from './config/retry';
import { LoyverseError } from './errors';
import { Categories, Customers, Inventory, Items } from './resources';
import type { ClientOptions, RequestOptions } from './types';

class Loyverse {
    private baseURL: string;
    private token: string;
    private retryConfig: RetryConfig;

    public categories: Categories;
    public customers: Customers;
    public inventory: Inventory;
    public items: Items;

    constructor(token: string, options: ClientOptions = {}) {
        if (!token) throw new Error('API token is required');

        this.baseURL = 'https://api.loyverse.com/v1.0';
        this.token = token;
        this.retryConfig = options.retryConfig ?? new RetryConfig();

        this.categories = new Categories(this);
        this.customers = new Customers(this);
        this.inventory = new Inventory(this);
        this.items = new Items(this);
    }

    private async sleep(ms: number): Promise<void> {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    async request(method: string, path: string, options: RequestOptions = {}) {
        const { params, data, ...fetchOptions } = options;
        let attempt = 1;
        const maxAttempts = this.retryConfig.maxRetries;

        while (attempt <= maxAttempts) {
            try {
                const url = new URL(path, this.baseURL);
                if (params) {
                    Object.entries(params).forEach(([key, value]) => {
                        if (value !== undefined) url.searchParams.append(key, String(value));
                    });
                }

                const requestOptions: RequestInit = {
                    method,
                    headers: {
                        'Authorization': `Bearer ${this.token}`,
                        'Content-Type': 'application/json',
                        ...options.headers
                    },
                    ...fetchOptions
                };

                if (data) {
                    requestOptions.body = JSON.stringify(data);
                }

                const response = await fetch(url.toString(), requestOptions);
                const responseData = await response.json();

                if (!response.ok) {
                    if (response.status === 429 && attempt <= maxAttempts) {
                        const delay = this.retryConfig.getDelay(attempt);
                        await this.sleep(delay);
                        attempt++;
                        continue;
                    }

                    throw new LoyverseError(
                        responseData.errors?.[0]?.details || 'Unknown error',
                        response.status,
                        responseData.errors
                    );
                }

                return responseData;
            } catch (error) {
                if (error instanceof LoyverseError) throw error;
                if (error instanceof Error) {
                    throw new LoyverseError(error.message, 500);
                }
                throw new LoyverseError('Unknown error', 500);
            }
        }
        throw new LoyverseError('Max retries exceeded', 429);
    }

    async bulkOperation<T, R>(
        items: T[],
        operation: (item: T) => Promise<R>,
        concurrency = 3
    ): Promise<{ results: R[]; errors: Array<{ item: T; error: Error }> }> {
        const results: R[] = [];
        const errors: Array<{ item: T; error: Error }> = [];

        for (let i = 0; i < items.length; i += concurrency) {
            const batch = items.slice(i, i + concurrency);
            const promises = batch.map(async item => {
                try {
                    const result = await operation(item);
                    results.push(result);
                } catch (error) {
                    errors.push({ item, error: error instanceof Error ? error : new Error(String(error)) });
                }
            });

            await Promise.all(promises);
        }

        return { results, errors };
    }
}

export default Loyverse;