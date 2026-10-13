import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger, } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";

type DeleteActionProps = {
    productId: number;
    onDelete: (productId: number) => void;
};

export function DeleteAction({
    productId,
    onDelete,
}: DeleteActionProps) {
    return (
        <AlertDialog>
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
                        onClick={() => onDelete(productId)}
                    >
                        حذف
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}