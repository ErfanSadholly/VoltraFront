"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Update } from "../api/update";
import type { ProductUpdateFormValues } from "../validation/update-schema";

export function useProductUpdate() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({
            productId,
            values,
        }: {
            productId: number;
            values: ProductUpdateFormValues;
        }) => Update(productId, values),

        onSuccess: async (_, variables) => {
            await Promise.all([
                queryClient.invalidateQueries({
                    queryKey: ["products"],
                }),

                queryClient.invalidateQueries({
                    queryKey: ["product", variables.productId],
                }),
            ]);
        },
    });
}