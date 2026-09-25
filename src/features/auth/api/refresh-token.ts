import { apiClient } from "@/lib/apiClient";
import type { RefreshTokenResponse } from "../view-models/responses/RefreshTokenResponse";

let refreshPromise: Promise<RefreshTokenResponse> | null = null;

export function RefreshToken(): Promise<RefreshTokenResponse> {
    if (!refreshPromise) {
        refreshPromise = apiClient
            .post("auth/refreshToken")
            .then(res => res.data.data)
            .finally(() => {
                refreshPromise = null;
            });
    }

    return refreshPromise;
}