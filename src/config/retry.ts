export interface RetryOptions {
    maxRetries?: number;
    initialDelay?: number;
    maxDelay?: number;
}

export class RetryConfig {
    public maxRetries: number;
    public initialDelay: number;
    public maxDelay: number;

    constructor({ maxRetries = 3, initialDelay = 1000, maxDelay = 10000 }: RetryOptions = {}) {
        this.maxRetries = maxRetries;
        this.initialDelay = initialDelay;
        this.maxDelay = maxDelay;
    }

    getDelay(attempt: number): number {
        const delay = Math.min(
            this.maxDelay,
            this.initialDelay * Math.pow(2, attempt - 1)
        );
        return delay + (Math.random() * 0.1 * delay); // Add jitter
    }
}