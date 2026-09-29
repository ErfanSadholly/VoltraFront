import { apiClient } from "@/lib/apiClient";
import type { RefreshTokenResponse } from "../view-models/responses/RefreshTokenResponse";

export function RefreshToken(): Promise<RefreshTokenResponse> {
    return apiClient.post("auth/refreshToken")
}