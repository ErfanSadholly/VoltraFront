"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Add } from "../api/add";
import type { ProductAddRequest } from "../view-models/requests/product-add-request";

export function useProductAdd() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (request: ProductAddRequest) => Add(request),

        onSuccess: async () => {
            await queryClient.invalidateQueries({
                queryKey: ["products"],
            });
        },
    });
}