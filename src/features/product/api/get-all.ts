import { apiClient } from "@/lib/api-client";
import { ProductGetAllRequest } from "../view-models/requests/product-getAll-request";
import { ProductGetAllResponse } from "../view-models/responses/product-getAll_response";
import { PagedResponse } from "@/lib/types/paged-response";

export async function GetAll(request: ProductGetAllRequest): Promise<PagedResponse<ProductGetAllResponse>> {
    return (await apiClient.get("Product/GetAll", { params: request })).data;
}