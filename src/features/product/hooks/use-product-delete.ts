"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ProductDelete } from "../api/delete";
import { toast } from "sonner";
import { ApiError } from "@/lib/api-error";


export function useProductDelete() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ProductDelete,
        onSuccess: async () => {
            await queryClient.invalidateQueries({
                queryKey: ["products"]
            })
            toast.success("محصول با موفقیت حذف شد.");
        },
        onError: (error) => {
            toast.error(
                error instanceof ApiError ? error.message : "عملیات شکست خورد"
            );
        }
    })
}