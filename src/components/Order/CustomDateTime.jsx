"use client";
import { useContext, useEffect, useState } from "react";
import { Label } from "../ui/label";
import OrderContext from "@/context/OrderProvider";

function CustomDateTime() {
  const { setDate } = useContext(OrderContext);

  // Function to format the current date as required by datetime-local input
  const getCurrentDateTime = () => {
    const now = new Date();
    const year = now.getFullYear().toString().padStart(4, "0");
    const month = (now.getMonth() + 1).toString().padStart(2, "0");
    const day = now.getDate().toString().padStart(2, "0");
    const hour = now.getHours().toString().padStart(2, "0");
    const minute = now.getMinutes().toString().padStart(2, "0");
    return `${year}-${month}-${day}T${hour}:${minute}`;
  };

  const [value, onChange] = useState(getCurrentDateTime());

  useEffect(() => {
    setDate(value);
  }, [value]);

  return (
    <div className="flex flex-col gap-4 ">
      <Label>Select Delivery Date and Time</Label>
      {/* Add Tailwind CSS margin top class */}
      <input
        type="datetime-local"
        step={"1800"}
        value={value}
        onChange={(e) => {
          onChange(e.target.value);
          // setDate(value);
        }}
        className="w-full md:w-[80%] border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-[#007bff] focus:border-indigo-500"
        placeholder="Select Date time"
      />
    </div>
  );
}

export default CustomDateTime;
