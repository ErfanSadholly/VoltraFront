import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger, } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { useState } from "react";

type DeleteActionProps = {
    productId: number;
    onDelete: (productId: number, onSuccess: () => void) => void;
};


export function DeleteAction({
    productId,
    onDelete,
}: DeleteActionProps) {

    const [open, setOpen] = useState(false);


    return (
        <AlertDialog open={open} onOpenChange={setOpen}>
            <AlertDialogTrigger
                render={
                    <Button
                        variant="ghost"
                        size="icon"
                        title="حذف"
                    />
                }
            >
                <Trash2 className="size-4" />
                <span className="sr-only">حذف</span>
            </AlertDialogTrigger>

            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>حذف محصول</AlertDialogTitle>
                    <AlertDialogDescription>
                        آیا از حذف این محصول مطمئن هستید؟
                    </AlertDialogDescription>
                </AlertDialogHeader>

                <AlertDialogFooter>
                    <AlertDialogCancel>انصراف</AlertDialogCancel>
                    <AlertDialogAction
                        onClick={(event) => {
                            event.preventDefault();

                            onDelete(productId, () => {
                                setOpen(false);
                            });
                        }}
                    >
                        حذف
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog >
    );
}