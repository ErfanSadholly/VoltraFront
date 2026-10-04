import { apiClient } from "@/lib/api-client";

export async function BrandGetIdTitle() {
    return (await apiClient.get("brand/GetIdTitle")).data;
}