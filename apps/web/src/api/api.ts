export const URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

export type ApiResponse<T> = {
    payload: T;
    message?: string;
};
