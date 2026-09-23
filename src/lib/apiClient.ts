import { ApiError } from "./ApiError";
import { getAccessToken } from "./auth-token";

const API_URL = "http://localhost:5052/api/";

export async function apiClient(
    endpoint: string,
    options?: RequestInit
) {
    const token = getAccessToken();

    const headers = {
        "Content-Type": "application/json",
        ...(token && {
            Authorization: `Bearer ${token}`,
        }),
        ...options?.headers,
    };

    const response = await fetch(`${API_URL}${endpoint}`, {
        ...options,
        credentials: "include",
        headers
    });

    const result = await response.json();
    if (!response.ok || !result.success)
        throw new ApiError(result.message, result.code);

    return result;
}