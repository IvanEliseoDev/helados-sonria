export interface AdminApiResponse<T> {
    status: string;
    message: string;
    statusCode: number;
    data: T;
}