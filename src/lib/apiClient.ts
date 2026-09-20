import { ApiError } from "./ApiError";

const API_URL = "http://localhost:5052/api/";

export async function apiClient(
    endpoint: string,
    options?: RequestInit
) {
    const response = await fetch(`${API_URL}${endpoint}`, {
        ...options,
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
            ...options?.headers,
        },
    });

    const result = await response.json();
    if (!response.ok || !result.success)
        throw new ApiError(result.message, result.code);

    return result;
}