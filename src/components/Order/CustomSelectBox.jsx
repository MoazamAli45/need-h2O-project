"use client";
import * as React from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "../ui/label";
import OrderContext from "@/context/OrderProvider";

function CustomSelectBox() {
  const { order } = React.useContext(OrderContext);
  const { details } = order;

  const [selectedValue, setSelectedValue] = React.useState("");

  const handleChange = (newValue) => {
    setSelectedValue(newValue);
  };
  console.log("Detailes", details);
  console.log(selectedValue);
  return (
    <div className="flex flex-col gap-4">
      <Label> Service:</Label>
      <Select value={selectedValue} onValueChange={handleChange}>
        <SelectTrigger className="w-full md:w-[80%]">
          <SelectValue placeholder="Select a Service" value={selectedValue} />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Services</SelectLabel>
            <SelectItem value={details[0]?.townWaterPrice}>
              TownWater(${details[0]?.townWaterPrice})
            </SelectItem>
            <SelectItem value={details[0]?.pureWaterPrice}>
              PureWater(${details[0]?.pureWaterPrice})
            </SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}

export default CustomSelectBox;
