import { apiClient } from "@/lib/apiClient";
import { RegisterRequest } from "../view-models/requests/registerRequest";

export async function Register(request: RegisterRequest) {
    return apiClient.post("auth/register", {
        ...request,
        Email: request.Email || null
    })
}