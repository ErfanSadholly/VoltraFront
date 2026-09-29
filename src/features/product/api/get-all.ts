import { apiClient } from "@/lib/apiClient";
import { ProductGetAllRequest } from "../view-models/requests/ProductGetAllRequest";
import { ProductGetAllResponse } from "../view-models/responses/ProductGetAllResponse";
import { PagedResponse } from "@/lib/types/paged-response";

export async function GetAll(request: ProductGetAllRequest): Promise<PagedResponse<ProductGetAllResponse>> {
    return (await apiClient.get("Product/GetAll", { params: request })).data;
}