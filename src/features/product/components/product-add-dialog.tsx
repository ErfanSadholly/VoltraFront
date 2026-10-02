"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ProductForm } from "./product-add-form";

type ProductAddDialogProps = {
    onSuccess: () => void;
};

export function ProductAddDialog({
    onSuccess,
}: ProductAddDialogProps) {
    const [open, setOpen] = useState(false);

    return (
        <Dialog
            open={open}
            onOpenChange={setOpen}
        >
            <DialogTrigger render={<Button />}>
                افزودن محصول
            </DialogTrigger>

            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        افزودن محصول
                    </DialogTitle>

                    <DialogDescription>
                        اطلاعات محصول جدید را وارد کنید
                    </DialogDescription>
                </DialogHeader>

                <ProductForm
                    onSuccess={() => {
                        setOpen(false);
                        onSuccess();
                    }}
                />
            </DialogContent>
        </Dialog>
    );
}