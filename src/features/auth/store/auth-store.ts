import { create } from 'zustand'

type AuthItem = {
    accessToken: string | null;
    isAuthenticated: boolean;
    isLoading: boolean;

    setAccessToken: (token: string) => void;
    clearAccessToken: () => void;
    setAuthLoading: (loading: boolean) => void;
}

export const useAuthStore = create<AuthItem>((set) => ({
    accessToken: null,
    isAuthenticated: false,
    isLoading: true,

    setAccessToken: (token) => {
        set({
            accessToken: token,
            isAuthenticated: true
        });
    },

    clearAccessToken: () => {
        set({
            accessToken: null,
            isAuthenticated: false
        });
    },

    setAuthLoading: (loading) => {
        set({
            isLoading: loading,
        });
    },
}));