import { PaginationRequest } from "@/lib/types/pagination-request";

export type BrandGetAllRequest = PaginationRequest & {
    name?: string;
}