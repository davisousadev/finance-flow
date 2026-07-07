export const URL = "http://localhost:3000";

export type ApiResponse<T> = {
    payload: T;
    message?: string;
};
