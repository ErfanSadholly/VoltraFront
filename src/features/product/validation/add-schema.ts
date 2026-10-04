import { z } from "zod";

export const createSchema = z.object({
    name: z
        .string()
        .min(1, "نام محصول الزامی است")
        .max(512, "نام محصول نمی‌تواند بیشتر از 512 کاراکتر باشد"),

    description: z
        .string()
        .max(3000, "توضیحات نمی‌تواند بیشتر از 3000 کاراکتر باشد")
        .nullable(),

    brandId: z
        .number()
        .nullable(),
});

export type ProductAddFormValues = z.infer<typeof createSchema>;