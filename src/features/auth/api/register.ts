import { apiClient } from "@/lib/apiClient";
import { RegisterRequest } from "../view-models/requests/registerRequest";

export async function Register(request: RegisterRequest) {
    return apiClient("auth/register", {
        method: "POST",
        body: JSON.stringify({
            ...request,
            Email: request.Email || null
        })
    })
}