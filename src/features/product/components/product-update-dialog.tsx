"use client";

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, } from "@/components/ui/dialog";
import { UpdateForm } from "./product-update-form";
import { useProductGetById } from "../hooks/use-product-get-by-id";
import { ApiError } from "@/lib/api-error";

type ProductEditDialogProps = {
    productId: number | null;
    onClose: () => void;
};

export function ProductEditDialog({
    productId,
    onClose,
}: ProductEditDialogProps) {
    const {
        data,
        isLoading,
        isError,
        error,
    } = useProductGetById(productId);

    const product = data?.data;

    return (
        <Dialog
            open={productId !== null}
            onOpenChange={(open) => {
                if (!open) {
                    onClose();
                }
            }}
        >
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        ویرایش محصول
                    </DialogTitle>

                    <DialogDescription>
                        اطلاعات محصول را ویرایش کنید
                    </DialogDescription>
                </DialogHeader>

                {isLoading && (
                    <div className="flex justify-center py-6">
                        در حال دریافت اطلاعات محصول...
                    </div>
                )}

                {isError && (
                    <div className="py-6 text-center text-destructive">
                        {error instanceof ApiError
                            ? error.message
                            : "خطایی در دریافت اطلاعات محصول رخ داد"}
                    </div>
                )}

                {product && (
                    <UpdateForm
                        product={product}
                        onSuccess={onClose}
                    />
                )}
            </DialogContent>
        </Dialog>
    );
}