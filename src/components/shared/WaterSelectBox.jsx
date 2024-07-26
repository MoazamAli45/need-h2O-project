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

function WaterSelectBox() {
  const { order, setPrice } = React.useContext(OrderContext);
  const { details } = order;

  const [selectedValue, setSelectedValue] = React.useState("");

  const [activateTownWater, setActivateTownWater] = React.useState(false);
  const [activatePureWater, setActivatePureWater] = React.useState(false);

  React.useEffect(() => {
    const townWaterStatus = localStorage.getItem("activateTownWater");
    const pureWaterStatus = localStorage.getItem("activatePureWater");

    console.log(
      townWaterStatus,
      "townWaterStatus",
      pureWaterStatus,
      "pureWaterStatus"
    );
    setActivateTownWater(townWaterStatus === "true");
    setActivatePureWater(pureWaterStatus === "true");
  }, []);

  React.useEffect(() => {
    if (selectedValue === details?.townWaterPrice) {
      setPrice(details?.townWaterPrice);
    } else if (selectedValue === details?.pureWaterPrice) {
      setPrice(details?.pureWaterPrice);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedValue]);

  const handleChange = (newValue) => {
    setSelectedValue(newValue);
  };

  return (
    <div className="flex flex-col gap-4 w-[80%] mx-auto ">
      <Label> Service:</Label>
      <Select value={selectedValue} onValueChange={handleChange}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select a Service" value={selectedValue} />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Services</SelectLabel>
            {activateTownWater && (
              <SelectItem
                value={details?.townWaterPrice ? details?.townWaterPrice : 0}
              >
                TownWater(${details?.townWaterPrice})
              </SelectItem>
            )}
            {activatePureWater && (
              <SelectItem
                value={details?.pureWaterPrice ? details?.pureWaterPrice : 1}
              >
                PureWater(${details?.pureWaterPrice})
              </SelectItem>
            )}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}

export default WaterSelectBox;
