"use client";

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, } from "@/components/ui/dialog";
import { useEffect, useState } from "react";
import { GetById } from "../api/get-by-id";
import { UpdateForm } from "./product-update-form";
import { ProductGetByIdResponse } from "../view-models/responses/product-getById-response";

type ProductEditDialogProps = {
    productId: number | null;
    onSuccess: () => void;
    onClose: () => void;
};

export function ProductEditDialog({
    productId,
    onSuccess,
    onClose,
}: ProductEditDialogProps) {
    const [loading, setLoading] = useState(false);
    const [product, setProduct] = useState<ProductGetByIdResponse | null>(null);

    useEffect(() => {
        if (productId === null) {
            setProduct(null);
            return;
        }
        const id = productId;

        async function loadProduct() {
            try {

                setLoading(true);
                const response = (await GetById(id));

                setProduct(response.data);
            } finally {
                setLoading(false);
            }
        }

        loadProduct();
    }, [productId]);

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

                {product && (
                    <UpdateForm
                        product={product}
                        onSuccess={() => {
                            onClose();
                            onSuccess();
                        }}
                    />
                )}
            </DialogContent>
        </Dialog>
    );
}