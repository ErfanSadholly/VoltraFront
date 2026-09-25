"use client";

import { useEffect } from "react";
import { RefreshToken } from "../api/refresh-token";
import { useAuthStore } from "../store/auth-store";

export function AuthProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    useEffect(() => {
        async function restoreSession() {
            try {
                const response = await RefreshToken();
                useAuthStore.getState().setAccessToken(response.accessToken);
            } catch {
                useAuthStore.getState().clearAccessToken();
            } finally {
                useAuthStore.getState().setAuthLoading(false);
            }
        }
        restoreSession();
    }, []);

    return children;
}