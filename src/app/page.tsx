'use client';

import { Button } from "@/components/ui/button";
import { LogOutIcon } from "@/components/icons/lucide-log-out";
import { logout } from "@/features/auth/api/logout";
import { ApiError } from "@/lib/ApiError";

export default function HomePage() {


    const handleClick = async () => {
        try {
            await logout();
        } catch (error) {
            if (error instanceof ApiError)
                return error.message
        }
    }

    return (
        <main className="relative mt-5 text-center">
            <div>
                <h1 className="text-3xl">Voltra</h1>
                <p>صفحه اصلی فروشگاه</p>
            </div>
            <div className="absolute left-0 top-0">
                <Button variant="ghost" size="icon" onClick={handleClick}><LogOutIcon className="size-8" /></Button>
            </div>

        </main>
    );
}