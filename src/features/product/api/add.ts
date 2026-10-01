import { apiClient } from "@/lib/api-client";
import { ProductAddRequest } from "../view-models/requests/product-add-request";

export async function Add(request: ProductAddRequest) {

    return (await apiClient.post("product/add", request)).data;
}