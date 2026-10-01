import { apiClient } from "@/lib/api-client";
import { PagedResponse } from "@/lib/types/paged-response";
import { BrandGetAllResponse } from "../view-models/responses/brand-getAll-response";
import { BrandGetAllRequest } from "../view-models/requests/brand-getAll-request";

export async function GetAll(request: BrandGetAllRequest): Promise<PagedResponse<BrandGetAllResponse>> {
    return (await apiClient.get("Brand/GetAll", { params: request })).data;
}