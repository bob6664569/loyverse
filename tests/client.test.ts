import { describe, it, expect, beforeEach, vi } from 'vitest';
import { Loyverse } from '../src';

describe('Loyverse Client', () => {
    let client: Loyverse;

    beforeEach(() => {
        client = new Loyverse('test-token');
        // Mock fetch globally
        global.fetch = vi.fn();
    });

    it('should require token', () => {
        expect(() => new Loyverse('')).toThrow('API token is required');
    });

    it('should handle rate limits', async () => {
        const successResponse = { data: 'success' };
        const rateLimitResponse = {
            ok: false,
            status: 429,
            json: () => Promise.resolve({ errors: [{ details: 'Rate limited' }] })
        };

        // Mock fetch to fail once then succeed
        global.fetch = vi.fn()
            .mockResolvedValueOnce(rateLimitResponse)
            .mockResolvedValueOnce({
                ok: true,
                json: () => Promise.resolve(successResponse)
            });

        const result = await client.request('GET', '/test');
        expect(result).toEqual(successResponse);
        expect(global.fetch).toHaveBeenCalledTimes(2);
    });

});