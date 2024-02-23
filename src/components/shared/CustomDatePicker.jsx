"use client";

import * as React from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { toast } from "sonner";
import moment from "moment";

function CustomDatePicker({ onSelectDate }) {
  const [date, setDate] = React.useState();

  const handleSelectDate = (selectedDate) => {
    const today = moment(); // Get today's date using moment.js
    const selected = moment(selectedDate);
    if (selected.isBefore(today, "day")) {
      // If selected date is before today, show error toast and don't update the state
      toast.error("Don't Select Past Date.", {
        duration: 2000,
      });
    } else {
      // If selected date is valid, update the state and context
      setDate(selectedDate);
      onSelectDate(selectedDate);
    }
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-[280px] justify-start text-left font-normal",
            !date && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, "PPP") : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={date}
          onSelect={handleSelectDate}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}

export default CustomDatePicker;
