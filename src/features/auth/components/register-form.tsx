"use client";

import { useForm } from "react-hook-form";
import { RegisterRequest } from "../view-models/requests/registerRequest";
import { registerSchema } from "../validation/register-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Register } from "../api/register";
import { ApiError } from "@/lib/ApiError";
import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Field, FieldLabel, FieldError } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { AlertCircleIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function RegisterForm() {
    const [apiError, setApiError] = useState("");
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting }
    } = useForm<RegisterRequest>({
        resolver: zodResolver(registerSchema)
    });

    async function onSubmit(data: RegisterRequest) {
        setApiError("");
        try {
            const res = await Register(data);
            console.log(res);
        } catch (error) {
            if (error instanceof ApiError)
                if (error.code === "IsExistUser")
                    setApiError("شما از قبل ثبت نام کرده اید");
                else
                    setApiError(error.message);
        }
    }

    return (
        <Card className="w-full sm:max-w-md">
            <CardHeader >
                <CardTitle className="text-center text-2xl">ثبت نام</CardTitle>
            </CardHeader>

            <CardContent>
                <form
                    onSubmit={handleSubmit(onSubmit)}>

                    <Field>
                        <FieldLabel htmlFor="FirstName" dir="rtl" className="text-base">
                            نام
                        </FieldLabel>

                        <Input
                            id="FirstName"
                            aria-invalid={!!errors.FirstName}
                            {...register("FirstName")}
                        />

                        <FieldError errors={[errors.FirstName]} />
                    </Field>

                    <Field>
                        <FieldLabel htmlFor="LastName" dir="rtl" className="text-base mt-1">
                            نام خانوادگی
                        </FieldLabel>

                        <Input
                            id="LastName"
                            aria-invalid={!!errors.LastName}
                            {...register("LastName")}
                        />

                        <FieldError errors={[errors.LastName]} />
                    </Field>

                    <Field>
                        <FieldLabel htmlFor="PhoneNumber" dir="rtl" className="text-base mt-1">
                            شماره موبایل
                        </FieldLabel>


                        <Input
                            id="PhoneNumber"
                            aria-invalid={!!errors.PhoneNumber}
                            {...register("PhoneNumber")}
                        />

                        <FieldError errors={[errors.PhoneNumber]} />
                    </Field>

                    <Field>
                        <FieldLabel htmlFor="Email" dir="rtl" className="text-base mt-1">
                            ایمیل
                        </FieldLabel>


                        <Input
                            id="Email"
                            aria-invalid={!!errors.Email}
                            {...register("Email")}
                        />

                        <FieldError errors={[errors.Email]} />
                    </Field>

                    <Field>
                        <FieldLabel htmlFor="Password" dir="rtl" className="text-base mt-1">
                            رمز عبور
                        </FieldLabel>

                        <Input
                            id="Password"
                            type="password"
                            aria-invalid={!!errors.Password}
                            {...register("Password")}
                        />

                        <FieldError errors={[errors.Password]} />
                    </Field>

                    <Field>
                        <FieldLabel htmlFor="ConfirmPassword" dir="rtl" className="text-base mt-1">
                            تکرار رمز عبور
                        </FieldLabel>


                        <Input
                            id="ConfirmPassword"
                            type="password"
                            aria-invalid={!!errors.ConfirmPassword}
                            {...register("ConfirmPassword")}
                        />

                        <FieldError errors={[errors.ConfirmPassword]} />
                    </Field>

                    <div className="mt-4">
                        {apiError &&
                            <Alert variant="destructive" dir="auto">
                                <AlertCircleIcon />
                                <AlertTitle className="text-right">ثبت نام موفقیت آمیز نبود</AlertTitle>
                                <AlertDescription className="text-right">
                                    {apiError}
                                </AlertDescription>
                            </Alert>
                        }
                    </div>

                    <div className="flex justify-center mt-4">
                        <Button type="submit" disabled={isSubmitting}>
                            {isSubmitting ? "در حال ثبت نام..." : "ثبت نام"}
                        </Button>
                    </div>

                    <div className="mt-2 text-center text-sm">
                        <span className="ml-1">حساب کاربری از قبل دارید؟</span>
                        <Link href="/login" className="text-primary underline-offset-5 hover:underline">
                            ورود
                        </Link> 
                    </div>
                </form>
            </CardContent>
        </Card >
    )
}