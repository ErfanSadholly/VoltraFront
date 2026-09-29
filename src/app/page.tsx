'use client';

import { Button } from "@/components/ui/button";
import { LogOutIcon } from "@/components/icons/lucide-log-out";
import { logout } from "@/features/auth/api/logout";
import { ApiError } from "@/lib/ApiError";
import { useRouter } from "next/navigation";
import { ProductGetAllResponse } from "@/features/product/view-models/responses/ProductGetAllResponse";
import { useEffect, useState } from "react";
import { GetAll } from "@/features/product/api/get-all";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function HomePage() {

    const router = useRouter();
    const handleClick = async () => {
        try {
            await logout();
            router.push("/login");
        } catch (error) {
            if (error instanceof ApiError)
                return error.message
        }
    }

    const [products, setProducts] = useState<ProductGetAllResponse[]>([]);
    useEffect(() => {
        const loadProducts = async () => {
            const response = await GetAll({
                pageNo: 1,
                pageSize: 10
            });

            setProducts(response.data);
        };

        loadProducts();
    }, []);

    return (
        <main className="relative mt-5 text-center">
            <div>
                <h1 className="text-3xl">Voltra</h1>
                <p>صفحه اصلی فروشگاه</p>
            </div>
            <div className="absolute left-0 top-0">
                <Button variant="ghost" size="icon" onClick={handleClick}><LogOutIcon className="size-8" /></Button>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {products.map((product) => (
                    <Card key={product.id} onClick={() => router.push(`/product/${product.id}`)} className="cursor-pointer">
                        <CardHeader>
                            <CardTitle> {product.fileIds.length > 0 && (
                                <img
                                    src={`http://localhost:5052/api/FileUpload/Download/${product.fileIds[0]}`}
                                    alt={product.name ?? ""}
                                    className="h-48 w-full object-cover"
                                />
                            )}</CardTitle>
                        </CardHeader>



                        <CardContent>
                            <p>{product.description}</p>
                        </CardContent>
                    </Card>
                ))}
            </div>

        </main>
    );
}