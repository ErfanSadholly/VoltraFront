    import { apiClient } from "@/lib/api-client";

    export async function ProductDelete(id: number) {
        return (await apiClient.delete(`product/delete/${id}`)).data;

    }