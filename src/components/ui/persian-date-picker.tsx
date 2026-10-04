"use client"

import * as React from "react"
import { CalendarIcon, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger, } from "@/components/ui/popover"

type PersianDatePickerProps = {
  value?: Date
  onChange?: (date: Date | undefined) => void
  placeholder?: string
}

export function PersianDatePicker({
  value,
  onChange,
  placeholder = "انتخاب تاریخ",
}: PersianDatePickerProps) {
  const [open, setOpen] = React.useState(false)

  function handleClear() {
    onChange?.(undefined)
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger
        render={
          <Button
            variant="outline"
            className="w-full justify-between font-normal"
          />
        }
      >
        <span>
          {value
            ? value.toLocaleDateString("fa-IR")
            : placeholder}
        </span>



        <div className="flex items-center gap-1">
          {value && (
            <span
              role="button"
              tabIndex={0}
              className="flex size-5 items-center justify-center rounded-sm hover:bg-muted"
              onClick={(event) => {
                event.preventDefault()
                event.stopPropagation()
                handleClear()
              }}
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                  event.preventDefault()
                  event.stopPropagation()
                  handleClear()
                }
              }}
            >
              <X className="size-3.5" />
            </span>
          )}

          <CalendarIcon className="size-4" />
        </div>
      </PopoverTrigger>

      <PopoverContent
        className="w-auto p-0"
        align="start"
      >
        <Calendar
          mode="single"
          selected={value}
          onSelect={(date) => {
            onChange?.(date)
            setOpen(false)
          }}
          captionLayout="dropdown"
          startMonth={new Date(2012, 0, 1)}
          endMonth={new Date(2031, 11, 30)}
        />
      </PopoverContent>
    </Popover>
  )
}