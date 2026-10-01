import { apiClient } from "@/lib/api-client";
import { RegisterRequest } from "../view-models/requests/auth-register-request";

export async function Register(request: RegisterRequest) {
    return apiClient.post("auth/register", {
        ...request,
        Email: request.Email || null
    })
}