
export class ApiResponse<T> {
    public readonly status: string = "true";
    public readonly message: string;
    public readonly statusCode: number;
    public readonly data?: T;

    constructor(message: string, statusCode: number = 200, data?: T) {
        this.message = message;
        this.statusCode = statusCode;
        this.data = data;
    }
}