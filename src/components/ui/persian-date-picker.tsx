"use client"

import * as React from "react"
import { CalendarIcon } from "lucide-react"
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

        <CalendarIcon className="size-4" />
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