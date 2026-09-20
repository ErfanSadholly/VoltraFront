"use client";

import { useForm } from "react-hook-form";
import { LoginRequest } from "../view-models/requests/loginRequest";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "../validation/login-schema";
import { Login } from "../api/login";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircleIcon } from "lucide-react";
import { ApiError } from "@/lib/ApiError";
import Link from "next/link";

export function LoginForm() {
    const [apiError, setApiError] = useState("");
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting }
    } = useForm<LoginRequest>({
        resolver: zodResolver(loginSchema)
    });

    async function OnSubmit(data: LoginRequest) {
        setApiError("");
        try {
            const response = await Login(data);
            console.log(response);
        }
        catch (error) {
            if (error instanceof ApiError) {
                setApiError("شماره تلفن یا رمز عبور اشتباه است")
            }
        }
    }

    return (

        <Card className="w-full sm:max-w-md">
            <CardHeader >
                <CardTitle className="text-center text-2xl">ورود به حساب کاربری</CardTitle>
            </CardHeader>

            <CardContent>

                <form
                    onSubmit={handleSubmit(OnSubmit)}>

                    <Field>
                        <FieldLabel htmlFor="phoneNumber" dir="rtl" className="text-base">
                            شماره موبایل
                        </FieldLabel>


                        <Input
                            id="phoneNumber"
                            aria-invalid={!!errors.phoneNumber}
                            {...register("phoneNumber")}
                        />

                        <FieldError errors={[errors.phoneNumber]} />
                    </Field>


                    <Field>
                        <FieldLabel htmlFor="password" dir="rtl" className="text-base">
                            رمز عبور
                        </FieldLabel>

                        <Input
                            id="password"
                            type="password"
                            aria-invalid={!!errors.Password}
                            {...register("Password")}
                        />

                        <FieldError errors={[errors.Password]} />
                    </Field>

                    <div className="mt-4">
                        {apiError &&
                            <Alert variant="destructive" dir="auto">
                                <AlertCircleIcon />
                                <AlertTitle className="text-right">ورود به حساب کابری موفقیت آمیز نبود</AlertTitle>
                                <AlertDescription className="text-right">
                                    {apiError}
                                </AlertDescription>
                            </Alert>
                        }
                    </div>

                    <div className="flex justify-center mt-4">
                        <Button type="submit" disabled={isSubmitting}>
                            {isSubmitting ? "در حال ورود..." : "ورود به حساب کابری"}
                        </Button>
                    </div>
                    <div className="mt-2 text-center text-sm">
                        <span className="ml-1">حساب کاربری ندارید؟</span>
                        <Link href="/register" className="text-primary underline-offset-5 hover:underline">
                            ثبت نام
                        </Link>
                    </div>
                </form>
            </CardContent>
        </Card >
    );
}