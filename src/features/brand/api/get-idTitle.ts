import { apiClient } from "@/lib/api-client";

export async function GetIdTitle() {
    return (await apiClient.get("brand/GetIdTitle")).data;
}