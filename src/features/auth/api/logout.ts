import { apiClient } from "@/lib/api-client";
import { useAuthStore } from "../store/auth-store";

export async function logout() {
    await apiClient.post("auth/logout")
    useAuthStore.getState().clearAccessToken();
}