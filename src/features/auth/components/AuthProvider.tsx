"use client";

import { createContext, useEffect, useState } from "react";
import { RefreshAccessToken } from "../api/refresh-token";
import { Login } from "../api/login";
import { LoginRequest } from "../view-models/requests/loginRequest";
import { setAccessToken } from "@/lib/auth-token";

type AuthContextType = {
    isAuthenticated: boolean;
    isLoading: boolean;
    login: (data: LoginRequest) => Promise<void>;
};

export const AuthContext = createContext<AuthContextType>({
    isAuthenticated: false,
    isLoading: true,
    login: async () => { },
});

export function AuthProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    async function login(data: LoginRequest) {

        const loginRes = await Login(data);
        setAccessToken(loginRes.AccessToken);
        setIsAuthenticated(true);
    }

    useEffect(() => {
        let ignore = false;

        async function CheckAuth() {
            try {
                const refreshTokenRes = await RefreshAccessToken();

                if (ignore) return;

                setAccessToken(refreshTokenRes.accessToken);
                setIsAuthenticated(true);
            }
            catch {
                if (ignore) return;

                setIsAuthenticated(false);
            }
            finally {
                if (!ignore) {
                    setIsLoading(false);
                }
            }
        }

        CheckAuth();

        return () => {
            ignore = true;
        };
    }, []);

    return (
        <AuthContext.Provider
            value={{
                isAuthenticated,
                isLoading,
                login,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}