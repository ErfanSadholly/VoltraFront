import { useMutation, useQueryClient } from "@tanstack/react-query";
import { UpdateActiveStatus } from "../api/update-active-status";
import { toast } from "sonner";
import { ApiError } from "@/lib/api-error";

export function useProductUpdateActiveStatus() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (productId: number) =>
            UpdateActiveStatus(productId),

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["products"],
            });
        },
        onError: (error) => {
            toast.error(
                error instanceof ApiError ? error.message : "عملیات با شکست مواجه شد"
            )
        }
    });
}