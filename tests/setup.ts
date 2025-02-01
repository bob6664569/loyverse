import { vi } from 'vitest';

// Mock global fetch
global.fetch = vi.fn();

// Reset all mocks after each test
afterEach(() => {
    vi.clearAllMocks();
});