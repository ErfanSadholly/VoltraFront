"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { AddForm } from "./product-add-form";


export function ProductAddDialog() {
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

                <AddForm
                    onSuccess={() => {
                        setOpen(false);
                    }}
                />
            </DialogContent>
        </Dialog>
    );
}