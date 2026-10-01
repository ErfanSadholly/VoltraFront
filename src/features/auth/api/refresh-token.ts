import { apiClient } from "@/lib/api-client";
import type { RefreshTokenResponse } from "../view-models/responses/auth-refreshToken-response";

export function RefreshToken(): Promise<RefreshTokenResponse> {
    return apiClient.post("auth/refreshToken")
}