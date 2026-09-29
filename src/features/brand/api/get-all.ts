import { apiClient } from "@/lib/apiClient";
import { PagedResponse } from "@/lib/types/paged-response";
import { BrandGetAllResponse } from "../view-models/responses/BrandGetAllResponse";
import { BrandGetAllRequest } from "../view-models/requests/BrandGetAllRequest ";

export async function GetAll(request: BrandGetAllRequest): Promise<PagedResponse<BrandGetAllResponse>> {
    return (await apiClient.get("Brand/GetAll", { params: request })).data;
}