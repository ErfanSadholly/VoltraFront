import { z } from "zod";

export const registerSchema = z.object({
    FirstName: z.string().min(3, "نام الزامی است"),
    LastName: z.string().min(3, "نام خانوادگی الزامی است"),
    PhoneNumber: z.string().regex(/^09\d{9}$/, "شماره تلفن باید 11 رقم باشد و با 09 شروع شود"),
    Email: z.email("فرمت ایمیل صحیح نیست").or(z.literal("")),
    Password: z.string().min(8, "رمز عبور باید حداقل 8 کاراکتر باشد").regex(/\d/, "رمز عبور باید حداقل شامل یک رقم باشد"),
    ConfirmPassword: z.string(),
}).refine(
    (data) => data.Password === data.ConfirmPassword, {
    message: "رمز عبور و تکرار رمز عبور یکسان نیستند",
    path: ["ConfirmPassword"]
}
)