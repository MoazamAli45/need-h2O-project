"use client";

import * as React from "react";
import moment from "moment"; // Import moment.js library
import { toast } from "sonner"; // Import the toast function from the sonner library
import { Calendar } from "@/components/ui/calendar";
import OrderContext from "@/context/OrderProvider";

function CustomDate() {
  const [dateValue, setDateValue] = React.useState(new Date());
  const { setDate } = React.useContext(OrderContext);

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
      setDateValue(selectedDate);
    }
  };

  return (
    <Calendar
      mode="single"
      selected={dateValue}
      onSelect={handleSelectDate}
      className="rounded-md border-[1px] border-solid border-[#CCCCCC]"
    />
  );
}

export default CustomDate;
