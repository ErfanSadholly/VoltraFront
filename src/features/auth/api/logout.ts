import { apiClient } from "@/lib/apiClient";
import { useAuthStore } from "../store/auth-store";

export async function logout() {
    console.log(useAuthStore.getState().accessToken)
    await apiClient.post("auth/logout")
    useAuthStore.getState().clearAccessToken();
}