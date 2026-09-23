import { apiClient } from "@/lib/apiClient";

let refreshPromise: Promise<RefreshTokenResponse> | null = null;

export async function RefreshToken(): Promise<RefreshTokenResponse> {
    return apiClient("auth/refreshToken", {
        method: "POST",
    });
}

export function RefreshAccessToken(): Promise<RefreshTokenResponse> {
    if (!refreshPromise) {
        refreshPromise = RefreshToken().finally(() => {
            refreshPromise = null;
        });
    }

    return refreshPromise;
}