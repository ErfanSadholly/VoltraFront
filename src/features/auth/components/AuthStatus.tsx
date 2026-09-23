"use client";

import { useContext } from "react";
import { AuthContext } from "./AuthProvider";

export function AuthStatus() {
    const { isAuthenticated, isLoading } = useContext(AuthContext);

    if (isLoading) {
        return <div>در حال بررسی ورود...</div>;
    }

    if (isAuthenticated) {
        return <div>کاربر وارد شده است</div>;
    }

    return <div>کاربر وارد نشده است</div>;
}