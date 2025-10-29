"use client";

import { CalendarIcon, ChevronDownIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { useEffect, useState } from "react";

interface DatepickerProps {
  id?: string;
  name?: string;
  onChange?: (value: Date | undefined) => void;
  defaultValue?: Date | undefined;
  disabled?: boolean;
  placeholder?: string;
}

export function Datepicker({
  name,
  id,
  onChange,
  defaultValue,
  disabled,
  placeholder,
}: DatepickerProps) {
  const [date, setDate] = useState<Date | undefined>(defaultValue);

  function handleSelectDate(date: Date | undefined) {
    setDate(date);
    onChange?.(date);
  }

  return (
    <div className="">
      <input name={name} value={date?.toString() || ""} readOnly hidden />
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id={id}
            variant="outline"
            data-empty={!date}
            className="data-[empty=true]:text-muted-foreground w-full justify-start text-left font-normal"
            disabled={disabled}
          >
            <CalendarIcon />
            {date ? format(date, "PPP") : <span>{placeholder}</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0">
          <Calendar mode="single" selected={date} onSelect={handleSelectDate} />
        </PopoverContent>
      </Popover>
    </div>
  );
}
