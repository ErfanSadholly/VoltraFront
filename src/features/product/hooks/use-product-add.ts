"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Add } from "../api/add";
import type { ProductAddRequest } from "../view-models/requests/product-add-request";
import { ApiError } from "@/lib/api-error";
import { toast } from "sonner";

export function useProductAdd() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (request: ProductAddRequest) => Add(request),

        onSuccess: async () => {
            await queryClient.invalidateQueries({
                queryKey: ["products"],
            });

            toast.success("محصول با موفقیت اضافه شد.");
        },
        onError: (error) => {
            toast.error(
                error instanceof ApiError ? error.message : "عملیات شکست خورد"
            );
        }
    });
}