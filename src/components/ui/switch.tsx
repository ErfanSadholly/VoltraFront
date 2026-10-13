"use client"

import { Switch as SwitchPrimitive } from "@base-ui/react/switch"
import { cn } from "cn"

function Switch({
  className,
  size = "default",
  ...props
}: SwitchPrimitive.Root.Props & {
  size?: "sm" | "default"
}) {
  return (
    <SwitchPrimitive.Root
      dir="ltr"
      data-slot="switch"
      data-size={size}
      className={cn(
        "peer group/switch relative inline-flex shrink-0 items-center rounded-full border-2 outline-none",
        "transition-colors duration-300 ease-in-out",
        "focus-visible:ring-3 focus-visible:ring-ring/30",
        "aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20",
        "data-[size=default]:h-5 data-[size=default]:w-11",
        "data-[size=sm]:h-4 data-[size=sm]:w-7",
        "data-checked:border-primary data-checked:bg-primary",
        "data-unchecked:border-border data-unchecked:bg-input",
        "data-disabled:cursor-not-allowed data-disabled:opacity-50",
        className
      )}
      {...props}
    >
      <SwitchPrimitive.Thumb
        data-slot="switch-thumb"
        className={cn(
          "pointer-events-none block aspect-square shrink-0 rounded-full",
          "bg-background shadow-sm ring-0",
          "transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]",
          "group-data-[size=default]/switch:h-4",
          "group-data-[size=sm]/switch:h-3",
          "data-checked:translate-x-6",
          "data-unchecked:translate-x-0",
          "group-data-[size=sm]/switch:data-checked:translate-x-3",
          "dark:data-checked:bg-primary-foreground",
          "dark:data-unchecked:bg-foreground"
        )}
      />
    </SwitchPrimitive.Root>
  )
}

export { Switch }