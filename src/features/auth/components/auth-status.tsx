"use client";

import { useAuthStore } from "../store/auth-store";

export function AuthStatus() {

    const isLoading = useAuthStore((state) => state.isLoading);
    const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

    if (isLoading) {
        return <div>در حال بررسی ورود...</div>;
    }

    if (isAuthenticated) {
        return <div>کاربر وارد شده است</div>;
    }

    return <div>کاربر وارد نشده است</div>;
}