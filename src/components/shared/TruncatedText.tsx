"use client";

import { useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

type TruncatedTextProps = {
    text: string;
    maxLength?: number;
};

export function TruncatedText({
    text,
    maxLength = 80,
}: TruncatedTextProps) {
    const [open, setOpen] = useState(false);

    const isLong = text.length > maxLength;

    const displayedText = isLong
        ? `${text.slice(0, maxLength)}...`
        : text;

    return (
        <>
            <button
                type="button"
                onClick={() => isLong && setOpen(true)}
                className={isLong ? "cursor-pointer hover:underline" : ""}
            >
                {displayedText}
            </button>

            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle className="text-right">توضیحات</DialogTitle>
                    </DialogHeader>

                    <p className="whitespace-pre-wrap">
                        {text}
                    </p>
                </DialogContent>
            </Dialog>
        </>
    );
}