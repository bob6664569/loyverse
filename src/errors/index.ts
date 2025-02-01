export interface LoyverseErrorDetails {
    code?: string;
    details?: string;
    field?: string;
}

export class LoyverseError extends Error {
    public status: number;
    public errors: LoyverseErrorDetails[];

    constructor(message: string, status: number, errors: LoyverseErrorDetails[] = []) {
        super(message);
        this.name = 'LoyverseError';
        this.status = status;
        this.errors = errors;
    }
}