import { apiClient } from "@/lib/apiClient";
import { LoginRequest } from "../view-models/requests/loginRequest";
import { LoginResponse } from "../view-models/responses/LoginResponse";

export async function Login(request: LoginRequest) : Promise<LoginResponse> {
    return apiClient("auth/login", {
        method: "POST",
        body: JSON.stringify(request)
    });
}