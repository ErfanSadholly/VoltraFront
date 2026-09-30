"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";

export function ModeToggle() {
    const { theme, setTheme } = useTheme();

    return (
        <Button
            variant="outline"
            size="icon"
            onClick={() =>
                setTheme(theme === "dark" ? "light" : "dark")
            }
        >
            <Sun className="size-4 dark:hidden" />
            <Moon className="hidden size-4 dark:block" />

            <span className="sr-only">
                تغییر حالت نمایش
            </span>
        </Button>
    );
}