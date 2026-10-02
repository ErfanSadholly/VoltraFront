import axios from "axios";
import type { AxiosInstance } from "axios";
import { useAuthStore } from "@/features/auth/store/auth-store";
import createAuthRefreshInterceptor from "axios-auth-refresh";
import { RefreshTokenResponse } from "@/features/auth/view-models/responses/auth-refreshToken-response";
import { ApiError } from "./api-error";

const API_URL = "http://localhost:5052/api/";

export const apiClient: AxiosInstance = axios.create({
    baseURL: API_URL,
    timeout: 5000,
    withCredentials: true,
    headers: {
        "Content-Type": "application/json"
    }
})

apiClient.interceptors.request.use(
    (config) => {
        const token = useAuthStore.getState().accessToken;
        if (token)
            config.headers.Authorization = `Bearer ${token}`;

        return config;
    }
);

apiClient.interceptors.response.use(
    (response) => {
        const data = response.data;
        if (data?.success === false)
            throw new ApiError(data.message, data.code);

        return response;
    },
    
    (error) => {
        const data = error.response?.data;

        if (data?.message) {
            throw new ApiError(data.message, data.code);
        }

        throw error;
    }
);

async function refreshAuthLogic(): Promise<RefreshTokenResponse> {

    const res: RefreshTokenResponse = {
        accessToken: (await axios.post(API_URL + "auth/refreshToken", {}, { withCredentials: true })).data.data.accessToken
    }
    useAuthStore.getState().setAccessToken(res.accessToken);
    return res;
}

createAuthRefreshInterceptor(apiClient, refreshAuthLogic);