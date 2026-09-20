import { z } from "zod";

export const loginSchema = z.object({
    phoneNumber: z.string().regex(/^09\d{9}$/, "شماره تلفن باید 11 رقم باشد و با 09 شروع شود"),
    Password: z.string().min(8, "رمز عبور باید حداقل 8 کاراکتر باشد").regex(/\d/, "رمز عبور باید حداقل شامل یک رقم باشد"),
});