import { apiClient } from "@/lib/api-client";
import { LoginRequest } from "../view-models/requests/auth-login-request";
import { LoginResponse } from "../view-models/responses/auth-login-response";
import { useAuthStore } from "../store/auth-store";

export async function Login(request: LoginRequest): Promise<LoginResponse> {
    const res: LoginResponse = {
        accessToken: (await apiClient.post("auth/login", request)).data.data.accessToken
    }
    useAuthStore.getState().setAccessToken(res.accessToken)
    return res;
}