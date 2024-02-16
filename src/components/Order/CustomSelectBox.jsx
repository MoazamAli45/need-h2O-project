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

  console.log(SelectValue);
  return (
    <div className="flex flex-col gap-4">
      <Label> Service:</Label>
      <Select>
        <SelectTrigger className="w-full md:w-[80%]">
          <SelectValue placeholder="Select a Service" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Services</SelectLabel>
            <SelectItem value={"apple"}>Apple</SelectItem>
            <SelectItem value="banana">Banana</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}

export default CustomSelectBox;
