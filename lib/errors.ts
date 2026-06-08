export class AppError extends Error {
    constructor(
        public readonly message: string,
        public readonly statusCode: number = 500,
        public readonly code?: string
    ) {
        super(message);
        this.name = "AppError";
        Object.setPrototypeOf(this, AppError.prototype);
    }
}

export class NotFoundError extends AppError {
    constructor(resource: string) {
        super(`${resource} not found`, 404, "NOT_FOUND");
    }
}

export class ValidationError extends AppError {
    constructor(message: string) {
        super(message, 400, "VALIDATION_ERROR");
    }
}

export class WorkflowError extends AppError {
    constructor(message: string) {
        super(message, 422, "WORKFLOW_ERROR");
    }
}

export class ConflictError extends AppError {
    constructor(message: string) {
        super(message, 409, "CONFLICT_ERROR");
    }
}

export function handleApiError(error: unknown): {
    message: string;
    code?: string;
    statusCode: number;
} {
    if (error instanceof AppError) {
        return { message: error.message, code: error.code, statusCode: error.statusCode };
    }
    if (error instanceof Error) {
        return { message: error.message, statusCode: 500 };
    }
    return { message: "An unexpected error occurred", statusCode: 500 };
}
