import { apiClient } from "@/lib/api-client";

export async function UserGetIdTitle() {
    return (await apiClient.get("user/getIdTitle")).data
}