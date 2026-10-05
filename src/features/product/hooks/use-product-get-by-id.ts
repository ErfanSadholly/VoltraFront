"use client";

import { useQuery } from "@tanstack/react-query";
import { GetById } from "../api/get-by-id";

export function useProductGetById(productId: number | null) {
    return useQuery({
        queryKey: ["product", productId],
        queryFn: () => GetById(productId!),
        enabled: productId !== null,
    });
}