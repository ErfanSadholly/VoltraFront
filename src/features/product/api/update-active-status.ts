import { apiClient } from "@/lib/api-client";

export async function UpdateActiveStatus(productId: number) {
    return ((await apiClient.put(`Product/UpdateActiveStatus/${productId}`))).data;
}