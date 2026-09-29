import { PaginationRequest } from "@/lib/types/pagination-request";

export type ProductGetAllRequest = PaginationRequest & {
    name?: string,
    brandId?: number,
}