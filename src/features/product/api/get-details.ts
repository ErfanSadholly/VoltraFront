import { apiClient } from "@/lib/api-client";
import { ApiResponse } from "@/lib/types/api-response";
import { ProductGetDetailsResponse } from "../view-models/responses/product-getDetail-response";

export async function GetDetails(productId: number): Promise<ApiResponse<ProductGetDetailsResponse>> {
    console.log("URL:", `Product/GetDetails/${productId}`);
    return (await apiClient.get(`Product/GetDetails/${productId}`)).data;
}