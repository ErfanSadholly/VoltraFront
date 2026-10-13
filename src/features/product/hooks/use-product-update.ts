"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Update } from "../api/update";
import type { ProductUpdateFormValues } from "../validation/update-schema";
import { ApiError } from "@/lib/api-error";
import { toast } from "sonner";

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

        onSuccess: async (_, { productId }) => {
            await Promise.all([
                queryClient.invalidateQueries({ queryKey: ["products"] }),
                queryClient.invalidateQueries({ queryKey: ["product", productId] }),
            ]);

            toast.success("محصول با موفقیت ویرایش شد");
        },

        onError: (error) => {
            toast.error(
                error instanceof ApiError ? error.message : "عملیات شکست خورد"
            );
        },
    });
}
