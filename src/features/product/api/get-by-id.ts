import { apiClient } from "@/lib/api-client";
import { ProductGetByIdResponse } from "../view-models/responses/product-getById-response";
import { ApiResponse } from "@/lib/types/api-response";

export async function GetById(productId: number): Promise<ApiResponse<ProductGetByIdResponse>> {
    return (await apiClient.get(`Product/GetProductById/${productId}`)).data;
}