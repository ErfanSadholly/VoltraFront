export class ApiError extends Error {
    code: string | null;

    constructor(message: string, code: string | null) {
        super(message);
        this.name = "ApiError";
        this.code = code;
    }
}