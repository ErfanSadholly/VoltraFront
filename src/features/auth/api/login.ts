import { apiClient } from "@/lib/apiClient";
import { LoginRequest } from "../view-models/requests/loginRequest";
import { LoginResponse } from "../view-models/responses/LoginResponse";
import { useAuthStore } from "../store/auth-store";

export async function Login(request: LoginRequest): Promise<LoginResponse> {
    const res: LoginResponse = {
        accessToken: (await apiClient.post("auth/login", request)).data.data.accessToken
    }
    useAuthStore.getState().setAccessToken(res.accessToken)
    return res;
}