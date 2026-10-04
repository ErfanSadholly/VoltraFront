import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { updateSchema, ProductUpdateFormValues } from "../validation/update-schema";
import { ProductGetByIdResponse } from "../view-models/responses/product-getById-response";
import { Update } from "../api/update";
import { toast } from "sonner";
import { ApiError } from "@/lib/api-error";
import { FormLayout } from "@/components/shared/form/form-layout";
import { FormInput } from "@/components/shared/form/form-input";
import { FormCombobox } from "@/components/shared/form/form-combobox";
import { FormTextarea } from "@/components/shared/form/form-textarea";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { BrandGetIdTitle } from "@/features/brand/api/get-idTitle";

type ProductFormProps = {
    onSuccess: () => void;
    product: ProductGetByIdResponse;
};

export function UpdateForm({ onSuccess, product }: ProductFormProps) {
    const form = useForm<ProductUpdateFormValues>({
        resolver: zodResolver(updateSchema),
        defaultValues: {
            name: product.name,
            description: product.description,
            brandId: product.brandId,
        },

    });

    const { formState: { isSubmitting } } = form;
    const { isDirty } = form.formState;

    async function onSubmit(values: ProductUpdateFormValues) {
        try {
            if (!isDirty) {
                onSuccess();
                return;
            }
            await Update(product.id, values);
            onSuccess();
            toast.success("مجصول با موفقیت ویرایش شد");
        } catch (error) {
            if (error instanceof ApiError) {
                return toast.error(error.message);
            }
            else {
                return toast.error("خطایی در ویرایش محصول رخ داد")
            }
        }
    }


    return (
        <FormProvider {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>

                <FormLayout>
                    <FormInput
                        name="name"
                        label="نام محصول"
                        placeholder="نام محصول را وارد کنید"
                    />

                    <FormCombobox
                        name="brandId"
                        label="برند"
                        query={BrandGetIdTitle}
                    />

                    <FormTextarea
                        name="description"
                        label="توضیحات"
                        placeholder="توضیحات محصول را وارد کنید"
                    />
                </FormLayout>


                <div className="flex justify-start mt-4">
                    <Button type="submit" disabled={isSubmitting}>
                        {isSubmitting ? (
                            <>
                                <Spinner data-icon="inline-start" />
                                در حال ویرایش...
                            </>
                        ) : (
                            "ویرایش"
                        )}
                    </Button>
                </div>
            </form >
        </FormProvider >
    )
}