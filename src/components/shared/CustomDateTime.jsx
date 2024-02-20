"use client";

import * as React from "react";

import { Calendar } from "@/components/ui/calendar";
import OrderContext from "@/context/OrderProvider";

function CustomDate() {
  const [dateValue, setDateValue] = React.useState(new Date());

  const { setDate } = React.useContext(OrderContext);
  console.log(dateValue, "Original");
  console.log(dateValue.toISOString());
  React.useEffect(() => {
    setDate(dateValue);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dateValue]);

  return (
    <Calendar
      mode="single"
      selected={dateValue}
      onSelect={setDateValue}
      className="rounded-md border"
    />
  );
}

export default CustomDate;
