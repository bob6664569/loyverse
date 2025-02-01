import { APIResource } from './base';
import type { Customer, CustomerParams } from '../types/resources';

export class Customers extends APIResource {
    async get(id: string): Promise<Customer> {
        return this.getResource<Customer>(`/customers/${id}`);
    }

    async list(params: CustomerParams = {}): Promise<{ customers: Customer[]; cursor?: string }> {
        return this.getResource<{ customers: Customer[]; cursor?: string }>('/customers', params);
    }

    async *listAll(params: Omit<CustomerParams, 'cursor'> = {}): AsyncGenerator<Customer> {
        yield* this.paginate<Customer>('/customers', params);
    }

    async create(data: Partial<Customer>): Promise<Customer> {
        return this.postResource<Customer>('/customers', data);
    }

    async delete(id: string) {
        return this.deleteResource(`/customers/${id}`);
    }

    async search(email: string) {
        return this.getResource<{ customers: Customer[] }>('/customers', { email });
    }
}