import { apiClient } from "@/lib/api-client";
import { ProductUpdateRequest } from "../view-models/requests/product-update-request";

export async function Update(id: number, request: ProductUpdateRequest) {
    return (await apiClient.put(`product/update/${id}`, request)).data.data;
}